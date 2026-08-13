KDS ERP Crew — Static Website Export
=====================================

QUICK START
-----------
1. Unzip the Static-Website folder to any location on your computer.
2. Open index.html in Chrome, Edge, Firefox, or Safari by double-clicking it.
3. Navigate using the menu or internal links. No server required.


PAGES
-----
- index.html          Home page (Hero, Highlights, AI Co-Worker, Demo Steps, Solutions)
- agent-library.html  Complete AI Agent Catalogue with search and filters


FOLDER STRUCTURE
----------------
Static-Website/
├── index.html
├── agent-library.html
├── css/
│   └── styles.css          Compiled Tailwind CSS (all styles, fully self-contained)
├── js/
│   ├── data.js             Agent and solution data
│   ├── home.js             Home page interactivity (carousel, animations, modals)
│   └── agent-library.js    Agent Library search, filter, and modal logic
├── assets/
│   ├── images/             All page images and logos
│   └── fonts/              Inter font files (woff2, included for offline use)
└── README.txt              This file


COMPATIBILITY
-------------
Tested and works correctly when opened directly from the local file system (file://)
in the following browsers:
  - Google Chrome 120+
  - Microsoft Edge 120+
  - Mozilla Firefox 120+
  - Apple Safari 17+

No Node.js, npm, React, Vite, or local web server is required.


FONT
----
The Inter typeface is loaded from bundled WOFF2 files in assets/fonts/ for full
offline support. If the font files are missing, the browser will fall back to the
system UI font (San Francisco on macOS, Segoe UI on Windows).


FEATURES INCLUDED
-----------------
✓ Hero carousel with 6 slides, auto-play, crossfade backgrounds, count-up statistics
✓ Agent Highlights section with O2C / P2P / Supply Chain / Platform / D365 tabs
✓ Demo modals for featured agents (video placeholder)
✓ AI Co-Worker infinite wheel-picker animation
✓ "Book Your Demo" scroll-driven sticky stacked card section (500 vh)
✓ End-to-End Business Process Automation solutions grid with detail modals
✓ Complete Agent Library with 112+ agents, category filter, and live search
✓ Sticky header navigation
✓ Fully responsive (mobile, tablet, desktop)
✓ All animations and transitions preserved from the React version


SHARING
-------
Zip the entire Static-Website/ folder and send it to the client. The recipient
only needs to unzip and open index.html — no installation required.


© 2026 Key Dynamics Solutions. All rights reserved.
