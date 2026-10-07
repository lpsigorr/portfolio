import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// Public "site key" of the Google reCAPTCHA v2 checkbox (VITE_RECAPTCHA_SITE_KEY in .env).
// Without it the form still works, protected by a hidden honeypot field and a minimum fill time.
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// Loads the reCAPTCHA script once and resolves with window.grecaptcha
let recaptchaPromise = null;
const loadRecaptcha = () => {
  if (!recaptchaPromise) {
    recaptchaPromise = new Promise((resolve, reject) => {
      window.onRecaptchaLoad = () => resolve(window.grecaptcha);
      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        recaptchaPromise = null;
        reject(new Error("reCAPTCHA failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return recaptchaPromise;
};

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiry: "",
    hp_field: "", // honeypot: real visitors never see or fill this
  });

  const [status, setStatus] = useState({ type: "", msg: "" });
  const [isSending, setIsSending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef(null);
  const widgetId = useRef(null);
  const openedAt = useRef(Date.now());

  // Init EmailJS once
  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  // Show the real "I'm not a robot" checkbox when a site key is configured
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    let cancelled = false;

    loadRecaptcha()
      .then((grecaptcha) => {
        grecaptcha.ready(() => {
          if (cancelled || !recaptchaRef.current || widgetId.current !== null) return;
          const width = recaptchaRef.current.parentElement.clientWidth;
          widgetId.current = grecaptcha.render(recaptchaRef.current, {
            sitekey: RECAPTCHA_SITE_KEY,
            theme: "dark",
            // the normal widget is 304px wide, use the compact one on narrow screens
            size: width && width < 304 ? "compact" : "normal",
            callback: (token) => setCaptchaToken(token),
            "expired-callback": () => setCaptchaToken(""),
            "error-callback": () => setCaptchaToken(""),
          });
        });
      })
      .catch(() => {
        setStatus({
          type: "error",
          msg: "The security check could not load. Please refresh the page or email me directly.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // A reCAPTCHA token can only be used once, so get a fresh one after each attempt
  const resetCaptcha = () => {
    setCaptchaToken("");
    if (window.grecaptcha && widgetId.current !== null) {
      window.grecaptcha.reset(widgetId.current);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    // honeypot: only bots fill the hidden field, so quietly pretend it worked
    if (form.hp_field) {
      setForm({ name: "", email: "", inquiry: "", hp_field: "" });
      return setStatus({ type: "success", msg: "Message sent" });
    }

    // validation
    if (!form.name.trim()) {
      return setStatus({ type: "error", msg: "Please enter your name." });
    }
    if (!validateEmail(form.email)) {
      return setStatus({ type: "error", msg: "Please enter a valid email." });
    }
    if (form.inquiry.trim().length < 10) {
      return setStatus({
        type: "error",
        msg: "Please write a short message (at least 10 characters).",
      });
    }
    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      return setStatus({ type: "error", msg: "Please confirm you’re not a robot." });
    }
    // humans need more than a few seconds to write a message
    if (Date.now() - openedAt.current < 3000) {
      return setStatus({
        type: "error",
        msg: "That was quick! Please wait a moment and try again.",
      });
    }

    if (isSending) return;
    setIsSending(true);

    try {
      // These keys MUST match your EmailJS template variables
      const templateParams = {
        title: "Portfolio Contact",      // used by Subject: Contact Us: {{title}}
        name: form.name,                 // used by From Name: {{name}}
        email: form.email,               // used by Reply To: {{email}}
        message: form.inquiry,           // used by Content: {{message}}
        time: new Date().toLocaleString(), // optional (you have {{time}} in the template)
        // checked by EmailJS when reCAPTCHA is enabled on the template
        ...(captchaToken ? { "g-recaptcha-response": captchaToken } : {}),
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

      setStatus({ type: "success", msg: "Message sent" });
      setForm({ name: "", email: "", inquiry: "", hp_field: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({ type: "error", msg: "Failed to send. Please try again later." });
    } finally {
      resetCaptcha();
      setIsSending(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact</h1>
        <p>
          Want to work together or have a question? Send me a message and I’ll
          get back to you.
        </p>
      </div>

      <div className="contact-card">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <div className="contact-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                disabled={isSending}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                disabled={isSending}
              />
            </div>
          </div>

          <div className="contact-field">
            <label htmlFor="inquiry">Inquiry</label>
            <textarea
              id="inquiry"
              name="inquiry"
              placeholder="Tell me what you need..."
              value={form.inquiry}
              onChange={handleChange}
              rows={6}
              disabled={isSending}
            />
          </div>

          {/* Hidden honeypot field, invisible to people */}
          <div className="contact-hp" aria-hidden="true">
            <label htmlFor="hp_field">Leave this field empty</label>
            <input
              id="hp_field"
              name="hp_field"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.hp_field}
              onChange={handleChange}
            />
          </div>

          {/* Google reCAPTCHA "I'm not a robot" checkbox */}
          {RECAPTCHA_SITE_KEY && <div className="contact-recaptcha" ref={recaptchaRef}></div>}

          {status.msg && (
            <div className={`contact-status ${status.type}`}>{status.msg}</div>
          )}

          <button className="contact-btn-submit" type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </div>

      <div className="contact-links">
        <h2>Links</h2>
        <div className="contact-links-row">
          <a href="https://www.linkedin.com/in/igor-lopes-oliveira-60169a212/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/lpsigorr" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="mailto:lopesigor101@gmail.com">Email</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
