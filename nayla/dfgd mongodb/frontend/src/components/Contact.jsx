import {isMobile,isDesktop,isWindows,isFirefox} from "react-device-detect"
      

export default function Contact() {
  console.log(isMobile,isDesktop,isWindows,isFirefox)
  return (
    <div className="lawyer-contact">
      <style>{`
        .lawyer-contact {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          background: #9dec09;
          border-radius: 32px;
          padding: 2.8rem 3rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 20, 40, 0.04);
          border: 1px solid rgba(11, 26, 46, 0.06);
          color: #0b1a2e;
          line-height: 1.6;
          max-width: 1200px;
          margin: 1.5rem 0;
        }
        .lawyer-contact h2 {
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          border-left: 6px solid #c9a05c;
          padding-left: 1.4rem;
          margin-bottom: 1.2rem;
          color: #0b1a2e;
        }
        .lawyer-contact .subtitle {
          font-size: 1.1rem;
          color: #2d405a;
          margin-bottom: 1.8rem;
        }
        .lawyer-contact .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin: 1.5rem 0;
        }
        .lawyer-contact .contact-item {
          background: #f8fafd;
          padding: 1.2rem 1.8rem;
          border-radius: 24px;
          border-left: 4px solid #c9a05c;
          transition: 0.2s;
        }
        .lawyer-contact .contact-item:hover {
          background: #fcf8f0;
          transform: translateY(-2px);
        }
        .lawyer-contact .contact-item strong {
          display: block;
          font-weight: 700;
          color: #0b1a2e;
          margin-bottom: 0.3rem;
          font-size: 0.95rem;
        }
        .lawyer-contact .contact-item span {
          color: #2d405a;
          font-size: 1rem;
        }
        .lawyer-contact .contact-urgent {
          background: #f7f9fc;
          padding: 1.2rem 1.8rem;
          border-radius: 24px;
          margin: 1.5rem 0;
          border: 1px solid #e8edf4;
        }
        .lawyer-contact .contact-urgent p {
          margin: 0;
          font-weight: 500;
          color: #0b1a2e;
        }
        .lawyer-contact .contact-urgent strong {
          color: #c9a05c;
        }
        .lawyer-contact .component-footer {
          margin-top: 2rem;
          padding-top: 1.2rem;
          border-top: 2px solid #eef2f7;
          font-size: 0.95rem;
          color: #4b637e;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .lawyer-contact .badge {
          display: inline-block;
          background: #eef3f9;
          padding: 0.2rem 1.2rem;
          border-radius: 40px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #1f3b57;
        }
        @media (max-width: 640px) {
          .lawyer-contact { padding: 1.8rem 1.2rem; }
          .lawyer-contact h2 { font-size: 1.7rem; }
        }
      `}</style>

      <h2>📬 Contact Us</h2>
      <p className="subtitle">We are here to help. Reach out for a confidential consultation.</p>

      <div className="contact-grid">
        <div className="contact-item">
          <strong>📞 Phone</strong>
          <span>+44 20 7946 0132</span>
          <button onClick={()=> window.location.href = "tel:+98031..."}>call us:+9803155555</button>
        </div>
        <div className="contact-item">
          <strong>✉️ Email</strong>
          <span>contact@lexandco.uk</span>
        </div>
        <div className="contact-item">
          <strong>📍 Office</strong>
          <span>42 Chancery Lane, London WC2A 1JL</span>
        </div>
        <div className="contact-item">
          <strong>🕒 Working Hours</strong>
          <span>Mon – Fri, 9:00 – 18:00</span>
        </div>
      </div>

      <div className="contact-urgent">
        <p>📋 For urgent matters, call our emergency line: <strong>+44 7700 900 123</strong> (available 24/7)</p>
      </div>

      <div className="component-footer">
        <span className="badge">🔒 privileged</span>
        <span className="badge">📋 response within 24h</span>
        <span style={{ marginLeft: 'auto' }}>All communications are strictly confidential.</span>
      </div>
    </div>
  );
}