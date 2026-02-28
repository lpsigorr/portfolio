import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_3nxfbd2";
const TEMPLATE_ID = "template_mpnkkc5";
const PUBLIC_KEY = "wNTiGkm3V26Uie-Lo";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiry: "",
    robot: false,
  });

  const [status, setStatus] = useState({ type: "", msg: "" });
  const [isSending, setIsSending] = useState(false);

  // Init EmailJS once
  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

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
    if (!form.robot) {
      return setStatus({ type: "error", msg: "Please confirm you’re not a robot." });
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
        time: new Date().toLocaleString() // optional (you have {{time}} in the template)
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

      setStatus({ type: "success", msg: "Message sent ✅" });
      setForm({ name: "", email: "", inquiry: "", robot: false });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({ type: "error", msg: "Failed to send. Please try again later." });
    } finally {
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

          <div className="contact-captcha">
            <input
              id="robot"
              name="robot"
              type="checkbox"
              checked={form.robot}
              onChange={handleChange}
              disabled={isSending}
            />
            <label htmlFor="robot">I'm not a robot</label>
          </div>

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
          <a href="https://www.linkedin.com/in/igor-lopes-oliveira-60169a212?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B5aOm1DC%2FTiaopcu8ZZseVw%3D%3D" target="_blank" rel="noreferrer">
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
