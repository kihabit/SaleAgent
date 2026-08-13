/* KDS ERP Crew — Agent & Solution data (converted from catalogue.ts) */

var AGENTS = [
  // Order to Cash
  { cat: "O2C", name: "Sales Order Creation Agent", demo: true, desc: "Automatically creates sales orders from quotations, CRM opportunities, customer emails, or online requests, validating customer details, pricing, inventory availability, and delivery schedules within Microsoft Dynamics 365." },
  { cat: "O2C", name: "Contract & Agreement Management Agent", demo: true, desc: "Converts approved customer contracts and service agreements into sales orders, subscriptions, or recurring transactions while ensuring compliance with agreed pricing and delivery terms." },
  { cat: "O2C", name: "Invoice Generation Agent", demo: true, desc: "Automatically generates customer invoices from completed deliveries or fulfilled services, applying the correct tax rules, payment terms, and billing preferences through Microsoft Dynamics 365 Finance." },
  { cat: "O2C", name: "Order Validation & Exception Resolution Agent", demo: true, desc: "Identifies and resolves order processing issues caused by pricing discrepancies, inventory shortages, customer credit limits, or incomplete master data before order fulfilment." },
  { cat: "O2C", name: "Sales Quotation Agent", demo: false, desc: "Generates intelligent quotations using customer history, pricing agreements, product availability, and discount policies." },
  { cat: "O2C", name: "Inventory Availability Agent", demo: false, desc: "Checks available inventory across warehouses and recommends fulfilment options in real time." },
  { cat: "O2C", name: "Delivery Scheduling Agent", demo: false, desc: "Coordinates warehouse operations, transportation, and customer delivery schedules for timely fulfilment." },
  { cat: "O2C", name: "Payment Collection Agent", demo: false, desc: "Monitors outstanding invoices, automates reminders, and provides collection recommendations." },
  { cat: "O2C", name: "Order Status Agent", demo: false, desc: "Provides real-time order tracking and shipment updates through conversational AI." },

  // Procure to Pay
  { cat: "P2P", name: "Purchase Requisition Agent", demo: true, desc: "Automatically captures purchase requests from users, inventory shortages, or demand forecasts, creating purchase requisitions with the correct departments, cost centers, approval workflows, and procurement policies in Microsoft Dynamics 365." },
  { cat: "P2P", name: "Procurement Management Agent", demo: true, desc: "Manages the complete procurement lifecycle, including supplier selection, purchase order creation, approval routing, contract validation, and procurement tracking to ensure efficient and compliant purchasing." },
  { cat: "P2P", name: "Invoice Matching Agent", demo: true, desc: "Performs intelligent two-way and three-way invoice matching between purchase orders, goods receipts, and supplier invoices, automatically identifying discrepancies for faster resolution." },
  { cat: "P2P", name: "Goods Receipt Agent", demo: true, desc: "Automates goods receipt processing by validating received quantities, updating inventory records, and synchronizing warehouse transactions with Microsoft Dynamics 365 in real time." },
  { cat: "P2P", name: "Invoice Exception Agent", demo: true, desc: "Detects and resolves invoice exceptions such as pricing differences, quantity mismatches, duplicate invoices, or missing purchase orders through intelligent workflow automation." },
  { cat: "P2P", name: "Vendor Onboarding Agent", demo: true, desc: "Guides new suppliers through registration, document verification, compliance checks, tax validation, and vendor master creation to accelerate supplier onboarding within Microsoft Dynamics 365." },
  { cat: "P2P", name: "Supplier Performance Agent", demo: true, desc: "Continuously monitors supplier performance by analyzing delivery timelines, quality metrics, pricing compliance, and contract adherence, providing AI-driven recommendations to improve procurement decisions." },
  { cat: "P2P", name: "Supplier Recommendation Agent", demo: false, desc: "Identifies preferred suppliers based on pricing, quality, delivery performance, and contracts." },
  { cat: "P2P", name: "Purchase Order Agent", demo: false, desc: "Creates purchase orders automatically from approved requisitions in Microsoft Dynamics 365." },
  { cat: "P2P", name: "Vendor Payment Agent", demo: false, desc: "Schedules supplier payments based on payment terms and approvals." },
  { cat: "P2P", name: "Contract Compliance Agent", demo: false, desc: "Monitors supplier contracts and purchasing compliance." },
  { cat: "P2P", name: "Procurement Analytics Agent", demo: false, desc: "Provides procurement spend analysis and supplier performance insights." },

  // Supply Chain
  { cat: "Supply Chain", name: "Predictive Equipment Maintenance Agent", demo: true, desc: "Uses AI, IoT sensor data, and equipment performance history to predict machine failures before they cause production disruptions, enabling proactive maintenance and minimizing unplanned downtime." },
  { cat: "Supply Chain", name: "Production Quality Monitoring Agent", demo: true, desc: "Continuously monitors production parameters and quality metrics, detecting deviations early to maintain product consistency, reduce waste, and ensure compliance with manufacturing standards." },
  { cat: "Supply Chain", name: "Downtime Intelligence Agent", demo: true, desc: "Analyzes production downtime events to identify root causes, eliminate false downtime records, and provide AI-driven recommendations that improve equipment utilization and overall manufacturing efficiency." },
  { cat: "Supply Chain", name: "Demand Forecasting Agent", demo: false, desc: "Predicts future demand using AI and historical sales data." },
  { cat: "Supply Chain", name: "Inventory Optimization Agent", demo: false, desc: "Maintains optimal inventory levels while minimizing excess stock." },
  { cat: "Supply Chain", name: "Warehouse Operations Agent", demo: false, desc: "Optimizes warehouse picking, packing, and inventory movement." },
  { cat: "Supply Chain", name: "Shipment Tracking Agent", demo: false, desc: "Provides real-time shipment visibility across logistics partners." },
  { cat: "Supply Chain", name: "Replenishment Planning Agent", demo: false, desc: "Automatically recommends replenishment based on inventory thresholds." },
  { cat: "Supply Chain", name: "Supplier Collaboration Agent", demo: false, desc: "Improves supplier communication and delivery coordination." },
  { cat: "Supply Chain", name: "Distribution Planning Agent", demo: false, desc: "Optimizes warehouse allocation and product distribution." },
  { cat: "Supply Chain", name: "Supply Chain Visibility Agent", demo: false, desc: "Provides end-to-end supply chain monitoring and exception alerts." },

  // Finance
  { cat: "Finance", name: "Accounts Payable Agent", demo: false, desc: "Automates supplier invoice processing and approvals." },
  { cat: "Finance", name: "Accounts Receivable Agent", demo: false, desc: "Tracks customer invoices, collections, and payment status." },
  { cat: "Finance", name: "Bank Reconciliation Agent", demo: false, desc: "Matches bank transactions with financial records automatically." },
  { cat: "Finance", name: "Budget Planning Agent", demo: false, desc: "Monitors budgets and forecasts financial performance." },
  { cat: "Finance", name: "Cash Flow Forecasting Agent", demo: false, desc: "Predicts cash inflows and liquidity requirements." },
  { cat: "Finance", name: "Financial Close Agent", demo: false, desc: "Accelerates month-end and year-end financial closing." },
  { cat: "Finance", name: "Expense Management Agent", demo: false, desc: "Validates employee expenses and reimbursement requests." },
  { cat: "Finance", name: "Financial Reporting Agent", demo: false, desc: "Generates financial statements and executive reports." },

  // Platform
  { cat: "Platform", name: "Approval Workflow Agent", demo: true, desc: "Automates multi-level approval workflows for procurement, finance, sales, and HR by routing requests based on business rules, approval hierarchies, and organizational policies within Microsoft Dynamics 365." },
  { cat: "Platform", name: "Workflow Automation Agent", demo: true, desc: "Streamlines cross-functional business processes by automating task assignments, notifications, escalations, and approvals, ensuring seamless collaboration across departments and Microsoft Dynamics 365 applications." },
  { cat: "Platform", name: "Document Intelligence Agent", demo: true, desc: "Extracts, validates, and processes data from invoices, purchase orders, contracts, and business documents using AI, reducing manual data entry and improving operational accuracy." },
  { cat: "Platform", name: "Management Insight Assistant", demo: true, desc: "Provides executives and business users with real-time dashboards, KPIs, predictive analytics, and conversational insights by connecting Microsoft Dynamics 365, Power BI, Microsoft Fabric, and enterprise data sources." },
  { cat: "Platform", name: "Natural Language Query Agent", demo: false, desc: "Allows users to ask business questions using conversational AI." },
  { cat: "Platform", name: "AI Recommendation Agent", demo: false, desc: "Suggests business actions using predictive analytics." },
  { cat: "Platform", name: "Copilot Productivity Agent", demo: false, desc: "Assists employees with content generation, summaries, and task automation." },
  { cat: "Platform", name: "Cross-System Integration Agent", demo: false, desc: "Connects Microsoft Dynamics 365 with Microsoft 365, Power Platform, Power BI, Microsoft Fabric, Azure AI, and third-party applications." },

  // Insurance
  { cat: "Insurance", name: "Policy Management Agent", demo: false, desc: "Automates policy issuance, renewals, and endorsements." },
  { cat: "Insurance", name: "Claims Processing Agent", demo: false, desc: "Accelerates claim registration, validation, and settlement." },
  { cat: "Insurance", name: "Underwriting Assistant", demo: false, desc: "Supports risk evaluation and policy recommendations." },
  { cat: "Insurance", name: "Customer Service Agent", demo: false, desc: "Provides policyholders with real-time assistance." },
  { cat: "Insurance", name: "Fraud Detection Agent", demo: false, desc: "Identifies suspicious claims using AI." },
  { cat: "Insurance", name: "Premium Collection Agent", demo: false, desc: "Automates premium billing and payment tracking." },
  { cat: "Insurance", name: "Regulatory Compliance Agent", demo: false, desc: "Monitors insurance compliance requirements." },
  { cat: "Insurance", name: "Insurance Analytics Agent", demo: false, desc: "Generates business performance and risk insights." },

  // Manufacturing
  { cat: "Manufacturing", name: "Production Planning Agent", demo: false, desc: "Optimizes production schedules based on demand." },
  { cat: "Manufacturing", name: "Shop Floor Monitoring Agent", demo: false, desc: "Provides real-time production visibility." },
  { cat: "Manufacturing", name: "Quality Control Agent", demo: false, desc: "Detects quality deviations during manufacturing." },
  { cat: "Manufacturing", name: "Predictive Maintenance Agent", demo: false, desc: "Predicts equipment failures before breakdowns occur." },
  { cat: "Manufacturing", name: "Bill of Materials Agent", demo: false, desc: "Manages product structures and engineering changes." },
  { cat: "Manufacturing", name: "Production Cost Analysis Agent", demo: false, desc: "Monitors manufacturing costs and profitability." },
  { cat: "Manufacturing", name: "Capacity Planning Agent", demo: false, desc: "Optimizes production resource utilization." },
  { cat: "Manufacturing", name: "Manufacturing Analytics Agent", demo: false, desc: "Provides operational insights and production KPIs." },

  // Retail & CPG
  { cat: "Retail & CPG", name: "Demand Forecasting Agent", demo: false, desc: "Predicts consumer demand across stores and channels." },
  { cat: "Retail & CPG", name: "Inventory Replenishment Agent", demo: false, desc: "Automates replenishment for retail locations." },
  { cat: "Retail & CPG", name: "Pricing Optimization Agent", demo: false, desc: "Recommends pricing strategies based on demand." },
  { cat: "Retail & CPG", name: "Promotion Management Agent", demo: false, desc: "Tracks promotional campaigns and sales performance." },
  { cat: "Retail & CPG", name: "Customer Loyalty Agent", demo: false, desc: "Analyzes customer purchasing behavior." },
  { cat: "Retail & CPG", name: "Store Operations Agent", demo: false, desc: "Monitors retail store performance." },
  { cat: "Retail & CPG", name: "Order Fulfilment Agent", demo: false, desc: "Coordinates omnichannel fulfilment." },
  { cat: "Retail & CPG", name: "Retail Analytics Agent", demo: false, desc: "Provides sales and inventory insights." },

  // Healthcare
  { cat: "Healthcare", name: "Patient Scheduling Agent", demo: false, desc: "Optimizes appointment scheduling." },
  { cat: "Healthcare", name: "Clinical Documentation Agent", demo: false, desc: "Generates and summarizes clinical records." },
  { cat: "Healthcare", name: "Medical Inventory Agent", demo: false, desc: "Tracks medical supplies and pharmaceuticals." },
  { cat: "Healthcare", name: "Regulatory Compliance Agent", demo: false, desc: "Supports healthcare compliance and reporting." },
  { cat: "Healthcare", name: "Laboratory Workflow Agent", demo: false, desc: "Coordinates diagnostic workflows." },
  { cat: "Healthcare", name: "Asset Management Agent", demo: false, desc: "Monitors medical equipment utilization." },
  { cat: "Healthcare", name: "Procurement Agent", demo: false, desc: "Automates medical procurement." },
  { cat: "Healthcare", name: "Healthcare Analytics Agent", demo: false, desc: "Provides operational and patient-care insights." },

  // Trade Finance
  { cat: "Trade Finance", name: "Letter of Credit Agent", demo: false, desc: "Automates LC processing and document validation." },
  { cat: "Trade Finance", name: "Export Documentation Agent", demo: false, desc: "Generates customs and export documents." },
  { cat: "Trade Finance", name: "Customs Compliance Agent", demo: false, desc: "Ensures regulatory compliance for international trade." },
  { cat: "Trade Finance", name: "Freight Booking Agent", demo: false, desc: "Coordinates logistics providers and shipping schedules." },
  { cat: "Trade Finance", name: "Container Tracking Agent", demo: false, desc: "Provides real-time shipment tracking." },
  { cat: "Trade Finance", name: "Import Documentation Agent", demo: false, desc: "Validates import documentation." },
  { cat: "Trade Finance", name: "Freight Cost Optimization Agent", demo: false, desc: "Optimizes transportation costs." },
  { cat: "Trade Finance", name: "Trade Analytics Agent", demo: false, desc: "Provides visibility into international trade operations." },

  // BFSI
  { cat: "BFSI", name: "Customer Onboarding Agent", demo: false, desc: "Automates KYC and customer verification." },
  { cat: "BFSI", name: "Loan Processing Agent", demo: false, desc: "Accelerates loan origination and approvals." },
  { cat: "BFSI", name: "Credit Risk Assessment Agent", demo: false, desc: "Evaluates borrower creditworthiness." },
  { cat: "BFSI", name: "Fraud Detection Agent", demo: false, desc: "Monitors suspicious financial activities." },
  { cat: "BFSI", name: "Payment Processing Agent", demo: false, desc: "Automates payment validation and reconciliation." },
  { cat: "BFSI", name: "Regulatory Reporting Agent", demo: false, desc: "Supports financial compliance reporting." },
  { cat: "BFSI", name: "Collections Management Agent", demo: false, desc: "Optimizes debt collection workflows." },
  { cat: "BFSI", name: "Financial Analytics Agent", demo: false, desc: "Provides executive banking insights." },

  // D365
  { cat: "D365", name: "Dynamics 365 Sales Agent", demo: false, desc: "Automates lead management, quotations, and sales orders." },
  { cat: "D365", name: "Dynamics 365 Finance Agent", demo: false, desc: "Manages accounting, financial reporting, and budgeting." },
  { cat: "D365", name: "Dynamics 365 Supply Chain Agent", demo: false, desc: "Optimizes procurement, inventory, manufacturing, and logistics." },
  { cat: "D365", name: "Dynamics 365 Customer Service Agent", demo: false, desc: "Automates case management and customer support." },
  { cat: "D365", name: "Dynamics 365 Field Service Agent", demo: false, desc: "Optimizes work orders, scheduling, and technician dispatch." },
  { cat: "D365", name: "Dynamics 365 Project Operations Agent", demo: false, desc: "Manages projects, resources, and billing." },
  { cat: "D365", name: "Dynamics 365 Business Central Agent", demo: false, desc: "Supports finance, sales, purchasing, warehouse, and operations for SMBs." },
  { cat: "D365", name: "Microsoft Copilot Agent", demo: false, desc: "Enhances productivity with AI-powered assistance across Microsoft Dynamics 365, Microsoft 365, Power Platform, and Microsoft Fabric." },

  // D365 BA
  { cat: "D365 BA", name: "Management Insight Assistant", demo: false, desc: "Ask questions in natural language and instantly interact with Microsoft Dynamics 365 using AI. Query customers, vendors, sales, inventory, finance, and operations — and retrieve records across Dynamics 365 modules." },
  { cat: "D365 BA", name: "Customer & Vendor Management Agent", demo: true, desc: "Create new customers or vendors, or update existing records using natural language. Features intelligent duplicate detection, AI-powered data validation and corrections, and direct create and update in Microsoft Dynamics 365." },
  { cat: "D365 BA", name: "Sales Quotation & Order Agent", demo: true, desc: "Upload PDFs, Excel files, emails, or customer documents and automatically generate quotations or sales orders using AI-powered document extraction (OCR + LLM) with customer and product matching." },
  { cat: "D365 BA", name: "Accounts Receivable & Payable Agent", demo: true, desc: "Automates invoice processing for customers and suppliers with intelligent financial validation, AI-powered invoice data extraction, purchase order and invoice matching, and automated posting in Microsoft Dynamics 365 Finance." },
  { cat: "D365 BA", name: "Customer Service Agent", demo: true, desc: "Manage customer service requests from creation through resolution using AI-powered automation with intelligent case routing, prioritization, SLA monitoring, and knowledge-based resolution recommendations." },
  { cat: "D365 BA", name: "Activity & Task Management Agent", demo: true, desc: "Automatically creates activities, appointments, follow-ups, and tasks across Microsoft Dynamics 365, linking them to customers, sales opportunities, service cases, and projects with intelligent follow-up scheduling." }
];

var CATEGORY_COUNTS = {
  "O2C": 9, "P2P": 12, "Supply Chain": 11, "Finance": 8, "Platform": 8,
  "Insurance": 8, "Manufacturing": 8, "Retail & CPG": 8, "Healthcare": 8,
  "Trade Finance": 8, "BFSI": 8, "D365": 8, "D365 BA": 6
};

var FILTER_LABELS = {
  "O2C": "O2C", "P2P": "P2P", "Supply Chain": "Supply Chain",
  "Finance": "Finance", "Platform": "Platform", "Insurance": "Insurance",
  "Manufacturing": "Manufacturing", "Retail & CPG": "Retail & CPG",
  "Healthcare": "Healthcare", "Trade Finance": "Trade Finance",
  "BFSI": "BFSI", "D365": "D365", "D365 BA": "D365 Business"
};

var SOLUTIONS = [
  { steps: 9, title: "Order to Cash — Intelligent Revenue Management", automation: "90% Automation", outcome: "Hours Instead of Days", desc: "From opportunity creation to customer payment, AI agents streamline the complete sales lifecycle. Sales opportunities convert into quotations, which automatically generate sales orders in Microsoft Dynamics 365. Inventory availability is validated, deliveries are scheduled, invoices are generated, and collections are intelligently monitored for faster cash realization." },
  { steps: 8, title: "Procure to Pay — Smart Procurement Automation", automation: "88% Automation", outcome: "Same-Day Procurement", desc: "Automate procurement from purchase requests to supplier payments. AI agents validate demand, recommend suppliers, create purchase orders, monitor receipts, perform three-way invoice matching, and optimize vendor payments through Microsoft Dynamics 365 Supply Chain Management." },
  { steps: 6, title: "Vendor Lifecycle Management", automation: "80% Automation", outcome: "Rapid Vendor Onboarding", desc: "Digitize supplier onboarding, compliance, contract management, and performance monitoring. AI agents continuously evaluate supplier risk, monitor KPIs, and maintain vendor records to strengthen procurement efficiency." },
  { steps: 8, title: "Manufacturing & Production Operations", automation: "85% Automation", outcome: "Real-Time Production Visibility", desc: "Optimize production planning, shop floor execution, inventory movement, and quality control using Microsoft Dynamics 365. AI agents monitor production, predict equipment issues, and ensure product quality through intelligent automation." },
  { steps: 7, title: "Financial Close & Reporting", automation: "87% Automation", outcome: "Close in Days, Not Weeks", desc: "Accelerate month-end and year-end financial closing. AI agents automate journal validation, reconciliations, approvals, compliance checks, and financial reporting to reduce manual effort and improve accuracy." },
  { steps: 7, title: "Inventory & Warehouse Operations", automation: "84% Automation", outcome: "Real-Time Inventory Control", desc: "Manage inventory across warehouses with AI-driven forecasting, replenishment, picking, packing, and shipment optimization. Warehouse agents continuously monitor stock levels and improve fulfillment accuracy." },
  { steps: 7, title: "Customer Service Lifecycle", automation: "83% Automation", outcome: "Faster Issue Resolution", desc: "Deliver exceptional customer experiences with AI-powered case management, service scheduling, knowledge recommendations, SLA tracking, and automated issue resolution through Microsoft Dynamics 365 Customer Service." },
  { steps: 8, title: "Project Operations Management", automation: "82% Automation", outcome: "Improved Project Delivery", desc: "Coordinate project planning, resource allocation, budgeting, execution, and billing with AI agents that optimize schedules, monitor progress, and provide real-time project insights." },
  { steps: 6, title: "Human Resources & Employee Experience", automation: "86% Automation", outcome: "Smarter HR Operations", desc: "Automate employee onboarding, leave management, payroll inputs, performance reviews, and workforce analytics using AI agents integrated with Microsoft Dynamics 365 Human Resources." },
  { steps: 8, title: "Sustainability & Compliance", automation: "81% Automation", outcome: "Continuous Compliance Monitoring", desc: "Monitor ESG initiatives, regulatory compliance, audits, emissions tracking, and sustainability reporting. AI agents proactively identify compliance risks and generate intelligent recommendations." },
  { steps: 7, title: "Demand Planning & Supply Chain Intelligence", automation: "89% Automation", outcome: "Continuous Planning", desc: "Predict demand, optimize inventory, recommend replenishment strategies, and synchronize procurement with production using AI-driven forecasting integrated with Microsoft Dynamics 365 Supply Chain Management." },
  { steps: 6, title: "Employee Expense Management", automation: "92% Automation", outcome: "24-Hour Reimbursement Cycle", desc: "Automate expense submission, policy validation, approvals, reimbursement processing, and financial reconciliation through intelligent workflows." },
  { steps: 5, title: "Management Insight Assistant", automation: "100% AI-Powered Insights", outcome: "Instant Business Intelligence", desc: "Ask business questions in natural language and receive real-time insights from Microsoft Dynamics 365, Power BI, Microsoft Fabric, and connected business applications. The AI assistant consolidates data across departments to deliver analytics, KPI tracking, and actionable recommendations." },
  { steps: 7, title: "Microsoft Dynamics 365 Sales Automation", automation: "91% Automation", outcome: "Accelerated Revenue Cycle", desc: "Manage the complete sales journey with AI — from lead qualification and opportunity management to quotations, sales orders, invoicing, and customer payments. AI agents eliminate repetitive tasks while improving sales productivity and forecasting accuracy." },
  { steps: 7, title: "Microsoft Dynamics 365 Procurement Automation", automation: "89% Automation", outcome: "End-to-End Procurement", desc: "Automate purchasing from supplier onboarding to invoice processing. AI agents create purchase orders, validate invoices, perform three-way matching, reconcile payments, and optimize procurement performance." },
  { steps: 6, title: "Microsoft Dynamics 365 Field Service", automation: "84% Automation", outcome: "SLA-Driven Service Delivery", desc: "Deliver intelligent field service experiences with automated work order creation, technician scheduling, predictive maintenance, spare parts management, and service invoicing powered by AI." }
];
