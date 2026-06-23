// Project content, ordered strongest-first. CTA buttons are driven off whichever
// link fields exist per project (see `links`) — not every project has a live demo.
export const projects = [
  {
    num: '01',
    category: 'Data · Live Dashboard',
    title: 'Real Madrid Scouting Analysis',
    image: '/images/realmadrid.webp',
    imgH: 563,
    tags: ['Python', 'Pandas', 'Streamlit', 'Matplotlib'],
    blurb:
      "Role-based scouting tool that distilled 7,000+ player-seasons from Europe's big-5 leagues into a ranked shortlist of 641 players via a custom three-lens tactical model, deployed as a live Streamlit dashboard with per-player percentile radars.",
    links: {
      live: 'https://data-driven-rm-scouting.streamlit.app/',
      repo: 'https://github.com/GilbertImmanuel/real-madrid-scouting',
    },
  },
  {
    num: '02',
    category: 'Data · Tableau',
    title: 'Global Financial Inclusion',
    image: '/images/finance.webp',
    imgH: 800,
    tags: ['Python', 'Tableau', 'Data Analysis'],
    blurb:
      'Analysis of global financial-inclusion data surfaced through an interactive Tableau dashboard that reveals how account ownership tracks with income, education, and mobile-money adoption across 140+ economies.',
    links: {
      live: 'https://public.tableau.com/app/profile/gilbert.immanuel3630/viz/FinanceInclusion/GlobalDashboard',
      repo: 'https://github.com/GilbertImmanuel/global-financial-inclusion-analysis',
    },
  },
  {
    num: '03',
    category: 'Thesis · AI / OCR',
    title: 'Indonesian Essay AI Scoring System',
    image: '/images/essay.webp',
    imgH: 449,
    tags: ['Python', 'PyTorch', 'TrOCR', 'LLM', 'OpenCV'],
    blurb:
      'End-to-end pipeline that reads handwritten Indonesian essays and scores them with contextual feedback. Fine-tuned TrOCR to 87.6% character accuracy, beating EasyOCR and Tesseract, with multi-level correction (SymSpell + LLM) and RAGAS-evaluated output.',
    links: {
      slides: 'https://drive.google.com/file/d/1VQ7osvPetOdF775BuaycsoZuUaY34nvd/view?usp=sharing',
      repo: 'https://github.com/GilbertImmanuel/tugas-akhir',
    },
  },
  {
    num: '04',
    category: 'Award-winning · Web',
    title: 'Summasphere',
    image: '/images/summasphere.webp',
    imgH: 539,
    tags: ['React', 'D3.js', 'Express', 'TailwindCSS'],
    blurb:
      'Award-winning research-paper summarizer that helps researchers extract key insights fast, with AI summarization and topic-modeling. Led the front-end with interactive D3 visualizations over an Express backend.',
    links: {
      org: 'https://github.com/Summasphere/',
    },
  },
  {
    num: '05',
    category: 'Bangkit Capstone · Mobile',
    title: 'FoodWise',
    image: '/images/foodwise.webp',
    imgH: 558,
    tags: ['Python', 'TensorFlow Lite', 'Flask'],
    blurb:
      'Bangkit capstone mobile app that cuts household food waste via grocery/expiry tracking, content-based recipe recommendations, and a TF-Lite freshness-detection model served through a Flask API.',
    links: {
      org: 'https://github.com/TeamFoodWise',
    },
  },
]
