export default function About() {
  return (
    <div className="lawyer-services">
      <style>{`
        .lawyer-services {
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
          transition: all 0.2s;
        }
        .lawyer-services h2 {
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          border-left: 6px solid #c9a05c;
          padding-left: 1.4rem;
          margin-bottom: 1.2rem;
          color: #0b1a2e;
        }
        .lawyer-services .subtitle {
          font-size: 1.1rem;
          color: #2d405a;
          margin-bottom: 2rem;
          font-weight: 400;
        }
        .lawyer-services .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin: 1.8rem 0 1.2rem;
        }
        .lawyer-services .service-item {
          background: #f8fafd;
          padding: 1.5rem 1.8rem;
          border-radius: 20px;
          border: 1px solid #e8edf4;
          transition: 0.2s;
        }
        .lawyer-services .service-item:hover {
          border-color: #c9a05c;
          background: #fcf8f0;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.04);
        }
        .lawyer-services .service-item h4 {
          font-weight: 700;
          font-size: 1.05rem;
          color: #0b1a2e;
          margin-bottom: 0.4rem;
        }
        .lawyer-services .service-item p {
          font-size: 0.95rem;
          color: #3a516e;
          margin-bottom: 0;
        }
        .lawyer-services .component-footer {
          margin-top: 2rem;
          padding-top: 1.2rem;
          border-top: 2px solid #eef2f7;
          font-size: 0.95rem;
          color: #4b637e;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .lawyer-services .badge {
          display: inline-block;
          background: #eef3f9;
          padding: 0.2rem 1.2rem;
          border-radius: 40px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #1f3b57;
          letter-spacing: 0.3px;
          margin-right: 0.5rem;
        }
        @media (max-width: 640px) {
          .lawyer-services { padding: 1.8rem 1.2rem; }
          .lawyer-services h2 { font-size: 1.7rem; }
        }
      `}</style>

      <h2>⚖️ Our Legal Services</h2>
      <p className="subtitle">Strategic counsel across every practice area, delivered with precision and integrity.</p>
      
      <div className="service-grid">
        <div className="service-item">
          <h4>Corporate & Commercial</h4>
          <p>Mergers, acquisitions, joint ventures, corporate governance, and commercial contracts.</p>
        </div>
        <div className="service-item">
          <h4>Civil Litigation</h4>
          <p>Dispute resolution, arbitration, mediation, and representation in civil courts.</p>
        </div>
        <div className="service-item">
          <h4>Family & Estate Law</h4>
          <p>Divorce, child custody, prenuptial agreements, wills, trusts, and probate.</p>
        </div>
        <div className="service-item">
          <h4>Employment & HR</h4>
          <p>Workplace disputes, unfair dismissal, discrimination, and employment contracts.</p>
        </div>
        <div className="service-item">
          <h4>Intellectual Property</h4>
          <p>Trademark registration, copyright, patents, and IP licensing and enforcement.</p>
        </div>
        <div className="service-item">
          <h4>Real Estate & Property</h4>
          <p>Property transactions, leasing, development agreements, and landlord-tenant matters.</p>
        </div>
      </div>

      <div className="component-footer">
        <span className="badge">📌 tailored strategy</span>
        <span className="badge">📊 risk management</span>
        <span className="badge">⚡ results-driven</span>
        <span style={{ marginLeft: 'auto' }}>Every case handled with the utmost diligence.</span>
      </div>
    </div>
  );
}
