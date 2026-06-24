export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  dashboard?: string;
  archSrc?: string;
  diagramTitle?: string;
  status: 'Active DW' | 'Live Dashboard' | 'T-SQL Scripts';
  specCard: {
    val1: string;
    lbl1: string;
    val2: string;
    lbl2: string;
    val3: string;
    lbl3: string;
  };
}

export interface SkillCategory {
  title: string;
  iconName: 'code-2' | 'library' | 'bar-chart-3' | 'layers' | 'cloud' | 'brain' | 'binary';
  skills: string[];
}

export interface WorkExperience {
  role: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  link: string;
}

export interface Education {
  degree: string;
  school: string;
  duration: string;
  grade: string;
}

export const personalInfo = {
  name: "G. Chanakya Sree Harsha",
  title: "Data Analyst Portfolio",
  roles: ["Data Analyst", "SQL & Power BI Developer"],
  bio: "I turn messy data into decisions that actually make sense. B.Tech CS Graduate from Malla Reddy University (2025). Ex-Data Analytics Intern at Automotive Robotics India (ARi). Open to work — Data Analyst roles.",
  resumePath: "/Resume/chanakyaSreeHarsha.pdf",
  email: "chanakyasreeharsha@gmail.com",
  phone: "+91 9121451468",
  location: "Hyderabad, India",
  preferredLocations: ["Hyderabad", "Bangalore", "Pune", "Delhi/NCR"],
  github: "https://github.com/ChanakyaSreeHarshaG",
  linkedin: "https://www.linkedin.com/in/chanakyasreeharsha",
};

export const aboutParagraph = "Data Analyst with hands-on experience transforming raw data into actionable business insights through SQL, Python, Power BI, and data warehousing projects. Improved decision-making visibility by building analytics solutions such as an Enterprise Data Warehouse using Medallion Architecture, a Financial Performance Intelligence Dashboard, and Marketing Analytics dashboards, while applying data modeling, ETL workflows, and KPI analysis. Strengthened analytical and problem-solving skills by working on customer behavior analysis, machine learning, and NLP projects, gaining experience across the complete data lifecycle from data preparation to insight generation.";

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages & Query",
    iconName: "code-2",
    skills: ["Python", "SQL / T-SQL", "DAX", "Power Query"]
  },
  {
    title: "Libraries",
    iconName: "library",
    skills: ["Pandas", "NumPy"]
  },
  {
    title: "BI & Visualization",
    iconName: "bar-chart-3",
    skills: ["Power BI", "Tableau", "Advanced Excel"]
  },
  {
    title: "Data Engineering",
    iconName: "layers",
    skills: ["ETL", "Data Warehousing", "Star Schema", "Medallion Architecture", "EDA"]
  },
  {
    title: "Cloud & DevOps",
    iconName: "cloud",
    skills: ["AWS S3", "GIT", "GitHub"]
  },
  {
    title: "AI / ML (Self-Initiated)",
    iconName: "brain",
    skills: ["Deep Learning", "NLP", "LSTM", "Machine Learning"]
  },
  {
    title: "Analytical Concepts",
    iconName: "binary",
    skills: ["Statistical Data Analysis", "Business Intelligence", "Analytical Skills", "Data Visualization"]
  }
];

export const experiences: WorkExperience[] = [
  {
    role: "Data Analytics Intern",
    company: "Automotive Robotics India (ARi)",
    duration: "Apr 2025 – Jul 2025",
    location: "📍 Hyderabad, India",
    responsibilities: [
      "Improved reporting accuracy by approximately 25% by analyzing operational datasets using Python and SQL to support stakeholder reporting.",
      "Enhanced data reliability by reducing missing values through data cleaning, preprocessing, and validation workflows.",
      "Reduced manual reporting effort by nearly 40% through ETL optimization and Power BI dashboard automation."
    ]
  }
];

export const projects: Project[] = [
  {
    id: "proj3",
    title: "Enterprise Data Warehouse — Medallion Architecture",
    date: "Jan 2026",
    status: "Active DW",
    description: "Designed and implemented a SQL-based Enterprise Data Warehouse using Medallion Architecture (Bronze → Silver → Gold layers). Integrates ERP/CRM data into a Star Schema optimized for corporate sales analytics.",
    longDescription: `This project demonstrates the design and deployment of an Enterprise Data Warehouse (EDW) using the Medallion (Bronze/Silver/Gold) data engineering pattern.
    <br><br>
    <strong>Key Project Phases & Contributions:</strong>
    <ul>
      <li><strong>Data Integration (Bronze Layer):</strong> Ingested raw transactional records from disparate ERP and CRM databases into a landing schema, preserving original history.</li>
      <li><strong>Data Cleansing (Silver Layer):</strong> Applied clean, robust T-SQL cleaning procedures to deduplicate records, enforce schema validation, handle missing fields, and conform data formats.</li>
      <li><strong>Business Modeling (Gold Layer):</strong> Designed a high-performance Star Schema structure containing Fact and Dimension tables (conformed dimensions) optimized for corporate sales analytics.</li>
      <li><strong>ETL Pipelines:</strong> Implemented efficient incremental load procedures with change detection and metadata auditing.</li>
      <li><strong>Analytics-Ready:</strong> Connected the Gold layer to business reporting tools, achieving instant query response times for key sales KPI metrics.</li>
    </ul>`,
    tech: ["SQL Server", "T-SQL", "ETL", "Star Schema", "Data Warehousing", "Medallion Architecture"],
    github: "https://github.com/ChanakyaSreeHarshaG/SQl-Data_Warehouse_Project",
    archSrc: "https://raw.githubusercontent.com/ChanakyaSreeHarshaG/SQl-Data_Warehouse_Project/main/docs/Architecture_Diagram.jpg",
    diagramTitle: "Architecture Diagram",
    specCard: {
      val1: "Medallion",
      lbl1: "Layers",
      val2: "Star Schema",
      lbl2: "Model",
      val3: "Incremental",
      lbl3: "ETL"
    }
  },
  {
    id: "proj1",
    title: "Social Media Ad Campaign Dashboard",
    date: "Jun 2026",
    status: "Live Dashboard",
    description: "Built an end-to-end Power BI marketing analytics solution for a simulated Meta ads environment, turning raw event-level data into a star-schema model and interactive dashboard.",
    longDescription: `This project is a comprehensive end-to-end Power BI marketing analytics solution designed for a simulated Meta (Facebook) Ads environment. It turns raw, event-level marketing data into an optimized star-schema data model and highly interactive dashboard to reveal campaign spend efficiency and ROAS tracking.
    <br><br>
    <strong>Key Project Phases & Contributions:</strong>
    <ul>
      <li><strong>Data Ingestion & Cleaning:</strong> Processed raw event logs, ad impressions, clicks, and conversion events using Power Query, handling missing data and data type conversions.</li>
      <li><strong>Data Modeling (Star Schema):</strong> Designed and implemented a performance-optimized star-schema consisting of a central Fact table (Ad Performance) and conformed Dimension tables (Campaigns, Ad Sets, Time, Platforms).</li>
      <li><strong>DAX Measure Engineering:</strong> Wrote complex DAX formulas to calculate critical marketing KPIs including Cost per Click (CPC), Click-through Rate (CTR), Cost per Acquisition (CPA), and Return on Ad Spend (ROAS).</li>
      <li><strong>Interactive Dashboarding:</strong> Built a multi-page executive dashboard visualizing campaign delivery, audience segmentation, spend efficiency, and ROAS tracking to drive budget allocation decisions.</li>
    </ul>`,
    tech: ["Power BI", "Power Query", "DAX", "Data Modeling", "Star Schema", "Marketing Analytics"],
    github: "https://github.com/ChanakyaSreeHarshaG/Social_Media_Ad_Campaign_Dashboard",
    dashboard: "https://app.powerbi.com/groups/me/reports/a598e58c-a636-4eaa-9510-ae8a25e6dddb/9777a38c9b4384394b2b?experience=power-bi",
    archSrc: "https://raw.githubusercontent.com/ChanakyaSreeHarshaG/Social_Media_Ad_Campaign_Dashboard/main/Resources/Social_media_campaign_dashboard.png",
    diagramTitle: "Power BI Dashboard Overview",
    specCard: {
      val1: "4.2x",
      lbl1: "ROAS",
      val2: "$0.18",
      lbl2: "CPC",
      val3: "Star Schema",
      lbl3: "Model"
    }
  },
  {
    id: "proj5",
    title: "Financial Performance Intelligence Dashboard",
    date: "Jun 2026",
    status: "Live Dashboard",
    description: "Built a comprehensive Power BI financial analytics dashboard tracking transaction counts, amounts, fees, and tax distributions across customer segments and states using a star-schema model.",
    longDescription: `This project is a comprehensive Business Intelligence solution developed using Power BI to monitor, analyze, and optimize financial transaction performance across customer segments, transaction categories, and geographic regions.
    <br><br>
    <strong>Key Project Phases & Contributions:</strong>
    <ul>
      <li><strong>Data Modeling (Star Schema):</strong> Designed and implemented an optimized star schema consisting of a central Fact table (Fact_Transactions) and conformed Dimension tables (Dim_Date, Dim_Customer, Dim_Transaction, Dim_Geography).</li>
      <li><strong>DAX Measure Engineering:</strong> Developed complex DAX formulas and measures to compute overall financial metrics, transaction growth trends, and transaction success rates.</li>
      <li><strong>Interactive Dashboarding:</strong> Built an intuitive financial dashboard utilizing map-based visualizations, monthly trend graphs, and customer segment drill-downs.</li>
      <li><strong>Operational Analytics:</strong> Monitored fees and taxes generated by transactions, enabling stakeholders to optimize fee structure and identify high-performing segments.</li>
    </ul>`,
    tech: ["Power BI", "DAX", "Power Query", "Data Modeling", "Star Schema", "Financial Analytics"],
    github: "https://github.com/ChanakyaSreeHarshaG/Financial-Performance-Intelligence-Dashboard",
    dashboard: "https://app.powerbi.com/groups/me/reports/791875ae-53d8-4c7c-bd41-61c3c54ed9cd/7b820328ab5a8e1804b9?experience=power-bi",
    archSrc: "https://raw.githubusercontent.com/ChanakyaSreeHarshaG/Financial-Performance-Intelligence-Dashboard/main/Resources/Financial%20Performance%20Intelligence%20Dashboard.png",
    diagramTitle: "Power BI Dashboard Overview",
    specCard: {
      val1: "Star Schema",
      lbl1: "Model",
      val2: "Power BI",
      lbl2: "Dashboard",
      val3: "DAX",
      lbl3: "Measures"
    }
  },
  {
    id: "proj2",
    title: "Customer Churn Prediction",
    date: "May 2026 – Jun 2026",
    status: "Live Dashboard",
    description: "Built an end-to-end analytics pipeline analyzing 3.9K+ customer records to identify churn risk. Covers EDA in Python/Jupyter, 10 SQL business questions, and an interactive Power BI dashboard.",
    longDescription: `This project is a comprehensive end-to-end data analytics pipeline designed to identify customer churn risk. 
    <br><br>
    <strong>Key Project Phases & Contributions:</strong>
    <ul>
      <li><strong>Exploratory Data Analysis (EDA):</strong> Conducted extensive statistical profiling and data visualizations using Python in Jupyter Notebooks to uncover underlying churn risk drivers.</li>
      <li><strong>Data Cleaning & Transformation:</strong> Cleaned and structured raw transactional records, customer account details, and support logs to prepare them for relational database mapping.</li>
      <li><strong>SQL Business Analytics:</strong> Designed and executed 10 complex T-SQL queries in SQL Server to answer critical business questions around customer tenure, contract types, payment methods, and support tickets.</li>
      <li><strong>Power BI Dashboard:</strong> Developed a multi-page interactive dashboard with live database connectivity, enabling stakeholders to track churn risk indicators, identify at-risk segments, and run data-driven retention campaigns.</li>
    </ul>`,
    tech: ["Python", "Pandas", "NumPy", "SQL Server", "Power BI", "EDA", "Statistical Analysis"],
    github: "https://github.com/ChanakyaSreeHarshaG/customer_chrun_prediction",
    dashboard: "https://app.powerbi.com/groups/me/reports/9fdd4630-f352-461d-ae29-d27c093d2029?pbi_source=desktop",
    archSrc: "https://raw.githubusercontent.com/ChanakyaSreeHarshaG/customer_chrun_prediction/main/docs/Customer_churn_prediction.png",
    diagramTitle: "Power BI Dashboard Overview",
    specCard: {
      val1: "3.9K+",
      lbl1: "Records",
      val2: "10",
      lbl2: "SQL Qs",
      val3: "SQL Server",
      lbl3: "Database"
    }
  },
  {
    id: "proj4",
    title: "EDA & Advanced Analytics on Data Warehouse",
    date: "May 2026",
    status: "T-SQL Scripts",
    description: "Comprehensive SQL EDA and business analytics scripts built on the Gold layer of the Medallion Data Warehouse.",
    longDescription: `This project contains a comprehensive suite of SQL analytics scripts running directly on the conformed Gold layer of the Medallion Enterprise Data Warehouse. It transforms warehouse records into actionable insights for corporate audits and operational reviews.
    <br><br>
    <strong>Key Project Phases & Contributions:</strong>
    <ul>
      <li><strong>Exploratory Analysis:</strong> Designed T-SQL scripts to analyze transaction frequencies, customer lifetimes, product sales distribution, and customer cohort values.</li>
      <li><strong>Data Audits:</strong> Formulated audit queries to inspect transactional integrity, identifying database discrepancies or data transformation leakages between pipeline stages.</li>
      <li><strong>Advanced SQL Analytics:</strong> Formulated complex queries utilizing window functions, subqueries, and CTEs to aggregate sales records across dynamic time domains.</li>
    </ul>`,
    tech: ["T-SQL", "SQL Server", "Data Analytics", "EDA", "Database Querying"],
    github: "https://github.com/ChanakyaSreeHarshaG/EDA-data_warehouse_project-",
    archSrc: "https://raw.githubusercontent.com/ChanakyaSreeHarshaG/EDA-data_warehouse_project-/main/docs/project%20roadmap.jpeg",
    diagramTitle: "Project Roadmap Overview",
    specCard: {
      val1: "Gold Layer",
      lbl1: "Audits",
      val2: "T-SQL",
      lbl2: "Queries",
      val3: "30%+",
      lbl3: "Optimized"
    }
  }
];

export const certifications: Certification[] = [
  {
    title: "Oracle Cloud Infrastructure 2025 Data Science Professional",
    issuer: "Oracle (1Z0-1110-25)",
    link: "https://chanakyasreeharshag.github.io/Data%20Science%20Professional.pdf"
  },
  {
    title: "Data Analytics with Python",
    issuer: "NPTEL",
    link: "https://chanakyasreeharshag.github.io/Data%20Analytics%20with%20Python.pdf"
  },
  {
    title: "Python Data Structures",
    issuer: "Coursera",
    link: "https://chanakyasreeharshag.github.io/python.pdf"
  },
  {
    title: "Programming in Java",
    issuer: "NPTEL",
    link: "https://chanakyasreeharshag.github.io/Programming%20In%20Java.pdf"
  },
  {
    title: "IELTS (International English Language Testing System)",
    issuer: "7.0 Band Score",
    link: "https://chanakyasreeharshag.github.io/ielts.pdf"
  },
  {
    title: "GRE General Test Score Report",
    issuer: "ETS (Educational Testing Service)",
    link: "https://chanakyasreeharshag.github.io/GRE.pdf"
  }
];

export const educations: Education[] = [
  {
    degree: "B.Tech — Computer Science",
    school: "Malla Reddy Deemed to be University",
    duration: "Sep 2021 – May 2025",
    grade: "Full Time"
  },
  {
    degree: "Class XII — CISCE (ICSE/ISC)",
    school: "Sri Chaitanya Junior College, Hydernagar",
    duration: "Graduated 2021",
    grade: "Score: 70%"
  },
  {
    degree: "Class X — Telangana State Board",
    school: "Sri Chaitanya Techno School, Hyderabad",
    duration: "Graduated 2019",
    grade: "Score: 90%"
  }
];
