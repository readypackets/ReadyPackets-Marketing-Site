function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

export const packetGroups = [
  {
    number: "01",
    slug: "idea-ip-protection",
    category: "Intellectual Property",
    title: "Idea & IP Protection",
    description: "Document, structure, and protect ideas and inventions before an attorney, partner, or next-stage development conversation.",
    tiers: [
      {
        name: "Basic",
        timeline: "48–72 hours",
        outcome: "A clear, organized invention summary that turns an idea into something concrete and ready to move forward.",
        features: [
          "20–50 Minute Intake Session",
          "Core Invention Architecture (5–8 pages)",
          "1 Simple Logic Figure (Line Diagram)",
          "Core Feature List + Alternatives",
          "Basic Friction Analysis",
          "Filing Checklist + Next Steps",
        ],
      },
      {
        name: "Standard",
        timeline: "4–6 business days",
        inheritedFrom: "Everything in Basic, plus:",
        outcome: "A structured, defensible invention packet suitable for patent discussions, partners, or next-stage development.",
        features: [
          "Full Inventor Packet (8–14 pages)",
          "1–3 Complex Figures",
          "\"Teaching-Away\" Argument",
          "Residual Risk Matrix",
          "Alternative Embodiments (A-B-C Options)",
          "Light Prior-Art Scan (Standard)",
        ],
      },
      {
        name: "Premium",
        timeline: "7–10 business days",
        inheritedFrom: "Everything in Standard, plus:",
        outcome: "A polished, attorney-ready invention package designed to maximize protection options and reduce future rework.",
        features: [
          "Attorney-Ready Patent Dossier (15+ pages)",
          "1–5 High-Fidelity Diagrams",
          "Preliminary FTO (Freedom-To-Operate) Analysis",
          "Claim-Theme Map",
          "Strategic Pivot Recommendations",
          "Deep \"Teaching-Away\" Analysis",
          "Two Revision Rounds",
        ],
      },
    ],
  },
  {
    number: "02",
    slug: "business-foundation",
    category: "Business Foundation",
    title: "Business Foundation",
    description: "Build foundational strategic documents for a new business to launch with clarity, structure, and investor-ready confidence.",
    tiers: [
      {
        name: "Basic",
        timeline: "48–72 hours",
        outcome: "A clean, executable 30-day roadmap that eliminates launch-phase uncertainty.",
        features: [
          "Comprehensive Intake Session",
          "Core Business Concept Map (5–8 pages)",
          "Core Value Proposition Architecture",
          "Target Audience Avatar",
          "Basic Logic Stress Test",
          "30-Day Prioritized Action Roadmap",
        ],
      },
      {
        name: "Standard",
        timeline: "3–5 business days",
        inheritedFrom: "Everything in Basic, plus:",
        outcome: "A deeper plan that structures your build, launch, and early operations with professional confidence.",
        features: [
          "Comprehensive Foundation Dossier (8–14 pages)",
          "MVP Scope (Minimum Viable Product)",
          "Basic Go-To-Market (GTM) Strategy",
          "Corporate Governance & Formation Roadmap",
          "Competitor Friction Analysis",
          "90-Day Strategic Execution Roadmap",
        ],
      },
      {
        name: "Premium",
        timeline: "5–7 business days",
        inheritedFrom: "Everything in Standard, plus:",
        outcome: "A robust, long-range strategic dossier providing the modeling and capital alignment needed to execute and scale.",
        features: [
          "Investor-Grade Foundation Dossier (15+ pages)",
          "Unit Economics Audit",
          "Competitive Positioning & Differentiation Matrix",
          "Scalable Team & Operations Planning Framework",
          "Investor-Readiness & Capital Alignment",
          "12-Month Phased Strategic Dossier",
          "Two Revision Rounds",
        ],
      },
    ],
  },
  {
    number: "03",
    slug: "business-plans",
    category: "Business Planning",
    title: "Business Plans",
    description: "Prepare professional business-plan documents for lenders, investors, and institutional stakeholders.",
    tiers: [
      {
        name: "Basic",
        timeline: "48–72 hours",
        outcome: "A professional, structured funding narrative designed to capture lender interest and provide clarity on your financial mission.",
        features: [
          "Comprehensive Narrative Intake",
          "Narrative Architecture (5–8 pages)",
          "Executive Summary Tailored to Funding Goals",
          "Core Mission, Vision, & Value Prop Architecture",
          "1-Year Pro-Forma Financial Summary",
          "Basic Marketing & Sales Strategy Logic",
        ],
      },
      {
        name: "Standard",
        timeline: "3–5 business days",
        inheritedFrom: "Everything in Basic, plus:",
        outcome: "A high-status investor-ready architecture that demonstrates market viability and financial strategy to secure growth capital.",
        features: [
          "Growth-Stage Business Plan (8–14 pages)",
          "Comprehensive Market & Competitive Analysis",
          "SWOT & Risk Mitigation Framework",
          "Operations & Implementation Roadmap",
          "Detailed Unit Economics Analysis",
          "5-Year Pro-Forma Forecast",
        ],
      },
      {
        name: "Premium",
        timeline: "5–7 business days",
        inheritedFrom: "Everything in Standard, plus:",
        outcome: "A full-spectrum institutional capital package designed for angel, VC, and institutional stakeholders.",
        features: [
          "60+ Page Strategic Business Dossier",
          "Full-Spectrum Capital Package (15+ pages)",
          "In-Depth Industry Data & Benchmarking",
          "Investor Narrative & Valuation Logic",
          "Executive Summary Tailored for VC/Institutional Review",
          "Two Revision Rounds",
        ],
      },
    ],
  },
  {
    number: "04",
    slug: "operating-design",
    category: "Operations",
    title: "Operating Design",
    description: "Define the workflows, systems, and operating design needed for more consistent execution and scalable operations.",
    tiers: [
      {
        name: "Basic",
        timeline: "1–4 business days",
        outcome: "Clarified core operations and a 30-day roadmap ready for immediate team execution.",
        features: [
          "Tactical Process Intake & Gap Identification",
          "Core Workflow Map (5–8 pages)",
          "Core Workflow Architecture (Mermaid.js Diagrams)",
          "Primary SOP (Standard Operating Procedure) Framework",
          "Tech-Stack Logic Audit (Basic)",
          "30-Day Efficiency Roadmap",
        ],
      },
      {
        name: "Standard",
        timeline: "3–6 business days",
        inheritedFrom: "Everything in Basic, plus:",
        outcome: "Integrated workflows and optimized tech-stack logic that significantly reduces operational friction.",
        features: [
          "Integrated Operations Dossier (8–14 pages)",
          "Detailed Functional Process Mapping",
          "Workflow Optimization & Bottleneck Remediation",
          "Integrated Tech-Stack Implementation Priority List",
          "Department-Level SOP Design",
          "One-Hour Operational Implementation Call",
          "Tech-Stack Logic Audit (Advanced)",
        ],
      },
      {
        name: "Premium",
        timeline: "5–7 business days",
        inheritedFrom: "Everything in Standard, plus:",
        outcome: "A robust, end-to-end operating system designed to scale the business with minimal founder dependency.",
        features: [
          "End-to-End Operating System (15+ pages)",
          "End-to-End Operational Analysis (Stakeholder Logic)",
          "Complete Workflow & Custom SOP Library Design",
          "Implementation Checklists & Management Templates",
          "6-Month Phased Operational Scaling Roadmap",
          "Two-Hour Senior Architect Strategy Session",
        ],
      },
    ],
  },
  {
    number: "05",
    slug: "execution-partnerships",
    category: "Execution & Partnerships",
    title: "Execution & Partnerships",
    description: "Prepare bid packets, partnership frameworks, and execution documents for contractors, consultants, and project-based businesses.",
    tiers: [
      {
        name: "Basic",
        timeline: "48–72 hours",
        outcome: "A professional bid packet that eliminates scope creep and allows projects to move forward with documented confidence.",
        features: [
          "20–50 min Intake Session",
          "Partnership Strategy Outline (5–8 pages)",
          "Strategic Project Scope Definition",
          "Standardized Bid/Proposal Architecture",
          "Budget Framework for Pricing Clarity",
          "High-Level Project Execution Timeline",
        ],
      },
      {
        name: "Standard",
        timeline: "3–5 business days",
        inheritedFrom: "Everything in Basic, plus:",
        outcome: "A structured decision-ready packet that speeds up client approvals and significantly reduces project financial risk.",
        features: [
          "Strategic Execution Dossier (8–14 pages)",
          "Detailed Milestone & Deliverable Mapping",
          "Full Budget & Material Allowance Structure",
          "Vendor Comparison Matrix",
          "Bid Scope Architecture",
          "Editable Bid Packet Source Files",
        ],
      },
      {
        name: "Premium",
        timeline: "5–7 business days",
        inheritedFrom: "Everything in Standard, plus:",
        outcome: "A robust governance package designed for complex, high-stakes projects requiring institutional-level decision-making.",
        features: [
          "Investor-Grade Execution Package (15+ pages)",
          "Partnership Governance Framework",
          "Supply Chain De-Risking Strategy",
          "End-to-End Multi-Phase Bid Package Creation",
          "Advanced Change-Order & Risk Planning Framework",
          "Structural Contract Template (Non-Binding)",
        ],
      },
    ],
  },
  {
    number: "06",
    slug: "launch-revenue-ready",
    category: "Launch & Revenue",
    title: "Launch & Revenue Ready",
    description: "Build the digital launch system, customer-facing presence, and revenue infrastructure needed for an organized market entry.",
    tiers: [
      {
        name: "Basic",
        timeline: "5–7 business days",
        outcome: "A professional, ready-to-launch digital presence designed to convert visitors into documented leads immediately.",
        features: [
          "Strategic Launch Kickoff & Discovery",
          "Launch Sequence Outline (5–8 pages)",
          "One-Page Custom Framer Website",
          "High-Conversion Lead Capture Architecture",
          "Domain Mapping & Primary SEO Setup",
          "Basic Go-Live Checklist",
        ],
      },
      {
        name: "Standard",
        timeline: "7–10 business days",
        inheritedFrom: "Everything in Basic, plus:",
        outcome: "A comprehensive digital build blueprint for your storefront.",
        features: [
          "Comprehensive Deployment Dossier (8–14 pages)",
          "Up to 5-Page Integrated Framer Site",
          "Full Brand Messaging & Professional Copywriting",
          "Lead Routing & Basic CRM Integration",
          "Integrated Site Analytics & Tracking",
          "Digital Build Logic",
        ],
      },
      {
        name: "Premium",
        timeline: "10–14 business days",
        inheritedFrom: "Everything in Standard, plus:",
        outcome: "A high-performance revenue engine ready for scale, featuring advanced integrations and professional-grade performance tuning.",
        features: [
          "End-to-End Launch System (15+ pages)",
          "Payment Gateway or Membership Integration",
          "Advanced SEO & Performance Optimization",
          "Content Management System (Blog/Portfolio)",
          "One-Time Deployment Protocol",
          "Day-1 Crisis Mitigation Plan",
          "60-Day Post-Launch Technical Guidance",
        ],
      },
    ],
  },
  {
    number: "07",
    slug: "the-all-in-master-bundle",
    category: "Master Bundle",
    title: "The All-In (Master Bundle)",
    description: "Bring the six core packet groups together as one comprehensive enterprise-architecture engagement.",
    tiers: [
      {
        name: "Premium Vault",
        timeline: "30–45 business days",
        outcome: "The Complete Enterprise Architecture. A polished, fully-functional business professionally vetted, documented, and built from the ground up for maximum market velocity.",
        features: [
          "The Model — Commit to the full journey from Idea to Launch, with Basic, Standard, and Premium selections across Packets 1 through 6.",
          "The Advantage — A full 6-Packet bundle.",
          "The Deliverable — A fully audited, legally defended, and operationally scalable enterprise vehicle with priority intake and direct alignment of IP strategy with 5-year financial models.",
        ],
      },
    ],
  },
  {
    number: "08",
    slug: "capital-valuation-services",
    category: "Strategic Reserve",
    title: "Capital & Valuation Services",
    description: "Prepare a financial and narrative foundation designed for venture-capital and institutional due diligence.",
    tiers: [
      {
        name: "Institutional",
        timeline: "14–21 business days",
        outcome: "A rigorous financial and narrative fortress designed to withstand the due diligence of Venture Capital and Institutional partners.",
        features: [
          "Advanced 3-Scenario Financial Modeling (Best/Worst/Expected)",
          "Full Investor Pitch Deck Design (10–15 Slides)",
          "Strategic Data Room Construction",
          "Valuation Logic Defense",
        ],
      },
    ],
  },
];

export function packetExplorerHtml(prefix, portalUrl) {
  return `<div class="packet-explorer">${packetGroups.map((group) => {
    const cardId = `${prefix}-${group.slug}`;
    const tiers = group.tiers.map((tier, index) => {
      const features = tier.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("");
      const inherited = tier.inheritedFrom ? `<p class="packet-tier__inherited">${escapeHtml(tier.inheritedFrom)}</p>` : "";
      return `<section class="packet-tier" aria-labelledby="${cardId}-tier-${index}"><div class="packet-tier__heading"><h4 id="${cardId}-tier-${index}">${escapeHtml(tier.name)}</h4><p class="packet-tier__timeline">${escapeHtml(tier.timeline)}</p></div><p class="packet-tier__outcome">${escapeHtml(tier.outcome)}</p>${inherited}<p class="packet-tier__label">Included offerings</p><ul class="packet-tier__features">${features}</ul></section>`;
    }).join("");
    return `<article class="packet-card" data-packet-card><details class="packet-card__details"><summary><span class="packet-card__summary"><span class="icon-badge" aria-hidden="true">${escapeHtml(group.number)}</span><span><span class="packet-card__category">${escapeHtml(group.category)}</span><h3>${escapeHtml(group.title)}</h3><p>${escapeHtml(group.description)}</p></span></span><span class="packet-card__prompt"><span>View all tiers</span><span aria-hidden="true">↓</span></span></summary><div class="packet-card__body"><p class="packet-card__all-tiers">Open details for every tier, timeline, outcome, and included offering.</p>${tiers}<a class="packet-explorer__cta" href="${portalUrl}/register" data-portal-link>Explore this packet in the portal <span aria-hidden="true">→</span></a></div></details></article>`;
  }).join("")}</div>`;
}
