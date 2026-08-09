
export default function About() {
  return (
    <div className="lawyer-about">
      <style>{`
        .lawyer-about {
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
        .lawyer-about h2 {
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          border-left: 6px solid #c9a05c;
          padding-left: 1.4rem;
          margin-bottom: 1.2rem;
          color: #0b1a2e;
        }
        .lawyer-about .subtitle {
          font-size: 1.1rem;
          color: #2d405a;
          margin-bottom: 1.8rem;
        }
        .lawyer-about .about-mission {
          background: #f8fafd;
          padding: 1.5rem 2rem;
          border-radius: 24px;
          margin: 1.5rem 0;
          border: 1px solid #e4eaf1;
        }
        .lawyer-about .about-mission h3 {
          margin-top: 0;
          border-left: 4px solid #c9a05c;
          padding-left: 1rem;
          font-weight: 700;
          color: #0b1a2e;
        }
        .lawyer-about .about-mission p {
          margin-bottom: 0;
          color: #1e2f44;
        }
        .lawyer-about .about-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin: 1.5rem 0;
        }
        .lawyer-about .about-stats div {
          background: #f8fafd;
          padding: 0.8rem 1.8rem;
          border-radius: 40px;
          font-weight: 600;
          color: #0b1a2e;
          border: 1px solid #e4eaf1;
        }
        .lawyer-about .about-stats div strong {
          font-size: 1.4rem;
          color: #c9a05c;
          margin-right: 0.3rem;
        }
        .lawyer-about .about-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin: 1.2rem 0;
        }
        .lawyer-about .badge {
          display: inline-block;
          background: #eef3f9;
          padding: 0.3rem 1.4rem;
          border-radius: 40px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #1f3b57;
          letter-spacing: 0.3px;
        }
        .lawyer-about .component-footer {
          margin-top: 2rem;
          padding-top: 1.2rem;
          border-top: 2px solid #eef2f7;
          font-size: 0.95rem;
          color: #4b637e;
        }
        @media (max-width: 640px) {
          .lawyer-about { padding: 1.8rem 1.2rem; }
          .lawyer-about h2 { font-size: 1.7rem; }
        }
      `}</style>

      <h2>🏅 About Lex & Co.</h2>
      <p className="subtitle">Built on integrity, clarity, and a relentless pursuit of justice since 2005.</p>

      <div className="about-mission">
        <h3>Our Mission</h3>
        <p>We make justice accessible. Our team combines deep legal expertise with a human centred approach, serving individuals and businesses alike. We believe in clear communication, strategic thinking, and unwavering dedication to our clients.</p>
      </div>

      <div className="about-stats">
        <div><strong>15+</strong> legal professionals</div>
        <div><strong>98%</strong> client satisfaction</div>
        <div><strong>6</strong> jurisdictions covered</div>
        <div><strong>20+</strong> years of combined experience</div>
      </div>

      <p style={{ color: '#1e2f44', marginTop: '0.5rem' }}>
        Our partners are members of the Law Society and accredited mediators. We are committed to continuous professional development and staying at the forefront of legal innovation.
      </p>

      <div className="about-badges">
        <span className="badge">📜 since 2005</span>
        <span className="badge">⚖️ SRA regulated</span>
        <span className="badge">🏆 recognised excellence</span>
        <span className="badge">🌍 global network</span>
      </div>

      <div className="component-footer">
        We are proud to be a trusted legal partner for our clients.
      </div>
    </div>
  );
}