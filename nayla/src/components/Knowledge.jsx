export default function About() {
  return (
    <div className="lawyer-knowledge">
      <style>{`
        .lawyer-knowledge {
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
        .lawyer-knowledge h2 {
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          border-left: 6px solid #c9a05c;
          padding-left: 1.4rem;
          margin-bottom: 1.2rem;
          color: #0b1a2e;
        }
        .lawyer-knowledge .subtitle {
          font-size: 1.1rem;
          color: #2d405a;
          margin-bottom: 1.8rem;
        }
        .lawyer-knowledge .knowledge-list {
          list-style: none;
          padding: 0;
          margin: 1.2rem 0;
        }
        .lawyer-knowledge .knowledge-list li {
          padding: 0.9rem 0 0.9rem 2.4rem;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%23c9a05c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>') left center no-repeat;
          background-size: 1.2rem;
          border-bottom: 1px solid #f0f3f7;
          font-size: 0.98rem;
          color: #1e2f44;
        }
        .lawyer-knowledge .knowledge-list li strong {
          color: #0b1a2e;
          font-weight: 600;
        }
        .lawyer-knowledge .knowledge-featured {
          background: #f7f9fc;
          padding: 1.2rem 1.8rem;
          border-radius: 20px;
          margin: 1.5rem 0;
          border-left: 4px solid #c9a05c;
        }
        .lawyer-knowledge .knowledge-featured p {
          margin: 0;
          font-weight: 500;
          color: #0b1a2e;
        }
        .lawyer-knowledge .knowledge-featured span {
          color: #3a516e;
          font-weight: 400;
        }
        .lawyer-knowledge .component-footer {
          margin-top: 2rem;
          padding-top: 1.2rem;
          border-top: 2px solid #eef2f7;
          font-size: 0.95rem;
          color: #4b637e;
        }
        .lawyer-knowledge .tag {
          display: inline-block;
          background: #eef3f9;
          padding: 0.2rem 1.2rem;
          border-radius: 40px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #1f3b57;
          margin-right: 0.5rem;
        }
        @media (max-width: 640px) {
          .lawyer-knowledge { padding: 1.8rem 1.2rem; }
          .lawyer-knowledge h2 { font-size: 1.7rem; }
        }
      `}</style>

      <h2>📚 Legal Knowledge & Insights</h2>
      <p className="subtitle">Curated briefings, case analyses, and regulatory updates to keep you informed.</p>

      <ul className="knowledge-list">
        <li><strong>Data Protection Update (2026)</strong> – New compliance requirements for SMEs under the revised UK GDPR.</li>
        <li><strong>Employment Tribunal Trends</strong> – Recent rulings on flexible working and constructive dismissal.</li>
        <li><strong>Property Law Reform</strong> – Changes to leasehold enfranchisement and commonhold.</li>
        <li><strong>International Arbitration</strong> – Enforcement of foreign awards in UK courts.</li>
        <li><strong>AI & Legal Due Diligence</strong> – How machine learning is transforming contract review.</li>
      </ul>

      <div className="knowledge-featured">
        <p>📖 <strong>Featured:</strong> “The evolving role of AI in legal due diligence” – <span>read our full analysis.</span></p>
      </div>

      <div className="component-footer">
        <span className="tag">📰 weekly updates</span>
        <span className="tag">🔍 deep dives</span>
        <span style={{ marginLeft: 'auto' }}>For specific briefings, contact our research team.</span>
      </div>
    </div>
  );
}