export interface PowerBiQuestion {
  id: string;
  question: string;
  answer: string;
  code?: string;
  tip?: string;
  category: string;
}

export interface PowerBiPhase {
  week: string;
  title: string;
  description: string;
  chips: string[];
  videos: {
    num: string;
    channel: string;
    title: string;
    description: string;
    url: string;
    videoId: string;
  }[];
  questions: PowerBiQuestion[];
}

export interface PowerBiTrack {
  trackTitle: string;
  domain: string;
  phases: PowerBiPhase[];
}

export const POWER_BI_ROADMAP: PowerBiTrack[] = [
  {
    trackTitle: "Phase 1: Ingestion & Data Prep",
    domain: "Exam Domain: Prepare the Data (25–30%)",
    phases: [
      {
        week: "Week 1",
        title: "Power Query (M Code) & ETL Foundations",
        description: "Transform dirty transactional feeds into lean, analytics-ready tables. Master M language transformations, query folding, and automated parameterization.",
        chips: [
          "Power Query M Basics",
          "Query Folding",
          "Merge vs Append",
          "Unpivot Columns",
          "Column Quality & Profiling",
          "Parameterized Queries",
          "Custom Columns vs Conditional Columns"
        ],
        videos: [
          {
            num: "01",
            channel: "Guy in a Cube",
            title: "Power Query Full Masterclass – Transformations & Query Folding",
            description: "Data shaping, merging techniques, and understanding the Mashup (M) engine internals.",
            url: "https://www.youtube.com/watch?v=sU_u3q2j7iE",
            videoId: "sU_u3q2j7iE"
          }
        ],
        questions: [
          {
            id: "pq-q1",
            category: "Power Query",
            question: "What is Query Folding in Power Query, why is it vital, and what breaks it?",
            answer: "Query Folding is the ability of Power Query to translate user transformation steps into a single native query (such as native T-SQL or Snowflake SQL) and execute it on the source database server rather than pulling all raw rows into Power BI local memory.\n\nWhy it matters: Dramatically speeds up scheduled refreshes, reduces memory pressure, and is an absolute prerequisite for Incremental Refresh.\n\nWhat breaks query folding: Transformations on flat files (CSV, Excel) that have no query engine, complex M functions like Table.Buffer(), custom Python/R scripts, or non-foldable index additions.",
            tip: "Always check query folding by right-clicking the last step in Applied Steps and verifying if 'View Native Query' is enabled."
          },
          {
            id: "pq-q2",
            category: "Power Query",
            question: "What is the architectural difference between Merge Queries and Append Queries?",
            answer: "Merge Queries combines tables horizontally (equivalent to a SQL JOIN) based on matching key columns. Supports Left Outer, Right Outer, Full Outer, Inner, Left Anti, and Right Anti joins.\n\nAppend Queries combines tables vertically (equivalent to SQL UNION ALL) stacking rows from multiple tables having matching column headers.",
            tip: "If you merge wide tables in Power Query instead of creating a star schema relationship in the data model, you inflate memory consumption and lose VertiPaq dictionary compression advantages."
          }
        ]
      }
    ]
  },
  {
    trackTitle: "Phase 2: Modeling & Relationships",
    domain: "Exam Domain: Model the Data (30–35%)",
    phases: [
      {
        week: "Week 2",
        title: "Star Schema, Cardinality & The VertiPaq Engine",
        description: "Design scalable dimensional models. Avoid snowflake traps, eliminate circular dependencies, and master active vs inactive relationships.",
        chips: [
          "Star Schema vs Snowflake Schema",
          "Fact vs Dimension Tables",
          "Factless Fact Tables",
          "1-to-Many vs Many-to-Many",
          "Active vs Inactive Relationships",
          "USERELATIONSHIP function",
          "Bi-directional Cross Filtering Pitfalls",
          "VertiPaq Columnar Compression"
        ],
        videos: [
          {
            num: "02",
            channel: "SQLBI / Marco Russo",
            title: "Data Modeling for Power BI – Star Schema Best Practices",
            description: "Why Star Schema is king in Power BI, resolving many-to-many relationships, and VertiPaq efficiency.",
            url: "https://www.youtube.com/watch?v=0k5Ew_YI_vI",
            videoId: "0k5Ew_YI_vI"
          }
        ],
        questions: [
          {
            id: "mod-q1",
            category: "Data Modeling",
            question: "Why is Star Schema strongly preferred over Snowflake Schema in Power BI?",
            answer: "Power BI's in-memory storage engine (VertiPaq) is an in-memory columnar database. In a Star Schema, dimensions are denormalized, meaning fewer table joins are needed when evaluating DAX measures. VertiPaq compresses duplicate strings across columns using dictionary encoding with extreme speed. In a Snowflake Schema, joining normalized sub-dimension tables introduces relationship overhead and complicates DAX filter propagation without saving meaningful RAM."
          },
          {
            id: "mod-q2",
            category: "Data Modeling",
            question: "How do you handle Role-Playing Dimensions (e.g. Order Date vs Ship Date)?",
            answer: "Keep a single master DimDate table. Establish one active relationship with OrderDate and an inactive relationship with ShipDate. In DAX, activate it dynamically using USERELATIONSHIP inside CALCULATE.",
            code: `Sales by Ship Date = 
CALCULATE(
    [Total Sales],
    USERELATIONSHIP(FactSales[ShipDateKey], DimDate[DateKey])
)`
          }
        ]
      }
    ]
  },
  {
    trackTitle: "Phase 3: DAX Calculations & Context",
    domain: "Exam Domain: Model the Data (DAX Deep-Dive)",
    phases: [
      {
        week: "Week 3 & 4",
        title: "DAX Mastery: Row Context, Filter Context & Time Intelligence",
        description: "Understand the mathematical foundation of DAX. Master CALCULATE, filter modification, context transition, and robust time-intelligence formulas.",
        chips: [
          "Calculated Column vs Measure",
          "Filter Context vs Row Context",
          "Context Transition",
          "CALCULATE & FILTER",
          "ALL vs ALLEXCEPT vs ALLSELECTED",
          "Time Intelligence (YTD, MTD, SAMEPERIODLASTYEAR)",
          "Semi-Additive Measures (Inventory balance)",
          "KEEPFILTERS"
        ],
        videos: [
          {
            num: "03",
            channel: "Alberto Ferrari",
            title: "Mastering DAX – Filter Context & Evaluation Order",
            description: "The definitive mental model for row context, filter context, and CALCULATE modifiers.",
            url: "https://www.youtube.com/watch?v=FjSZp2VvG_A",
            videoId: "FjSZp2VvG_A"
          }
        ],
        questions: [
          {
            id: "dax-q1",
            category: "DAX Context",
            question: "Explain Calculated Columns vs Measures. Which consumes RAM vs Disk?",
            answer: "Calculated Column: Evaluated during data refresh row-by-row. Stored permanently inside the VertiPaq database on disk and loaded into RAM. Increases file size and refresh time.\n\nMeasure: Evaluated on the fly at query time in response to user slicers and visual filter contexts. Consumes zero disk storage and releases RAM immediately after visual rendering."
          },
          {
            id: "dax-q2",
            category: "DAX Context",
            question: "What is Context Transition in DAX and when does it occur?",
            answer: "Context Transition is the process where DAX automatically transforms an existing Row Context into an equivalent Filter Context. It is triggered whenever CALCULATE() or CALCULATETABLE() is called within a row context (or whenever any measure is referenced inside an iterator like SUMX or a calculated column, because every measure contains an implicit CALCULATE).",
            tip: "Calling a measure in a calculated column on a table without a primary key can filter on all duplicate attribute values, leading to erroneous results."
          },
          {
            id: "dax-q3",
            category: "DAX Time Intelligence",
            question: "How do you write Year-over-Year (YoY) Sales Growth % in DAX?",
            answer: "Ensure your Date table has continuous dates with no gaps and is marked as an official Date Table in Power BI.",
            code: `Total Sales = SUM(FactSales[SalesAmount])

Sales SPLY = 
CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR(DimDate[Date])
)

YoY Growth % = 
DIVIDE(
    [Total Sales] - [Sales SPLY],
    [Sales SPLY],
    BLANK()
)`
          }
        ]
      }
    ]
  },
  {
    trackTitle: "Phase 4: Security, UX & Enterprise Governance",
    domain: "Exam Domain: Visualize and Deploy (25–30%)",
    phases: [
      {
        week: "Week 5 & 6",
        title: "Dynamic RLS, Performance Analyzer & Service Architecture",
        description: "Implement row-level security with corporate Active Directory, optimize DAX query execution plans, and schedule automated enterprise deployments.",
        chips: [
          "Dynamic Row-Level Security (RLS)",
          "USERPRINCIPALNAME & Mapping Tables",
          "Object-Level Security (OLS)",
          "Performance Analyzer",
          "DAX Studio & VertiPaq Analyzer",
          "Incremental Refresh (RangeStart / RangeEnd)",
          "On-Premises Data Gateway",
          "Workspace Roles & Deployment Pipelines"
        ],
        videos: [
          {
            num: "04",
            channel: "Curibal / Avi Singh",
            title: "Power BI Performance Optimization & DAX Studio Masterclass",
            description: "Find query bottlenecks, reduce card render times, and configure incremental refresh.",
            url: "https://www.youtube.com/watch?v=F3G6e7V2D3k",
            videoId: "F3G6e7V2D3k"
          }
        ],
        questions: [
          {
            id: "sec-q1",
            category: "Security",
            question: "How do you implement Dynamic Row-Level Security (RLS) with user mapping?",
            answer: "Create a Security Mapping table (UserSecurity) containing UserEmail and RegionID. Establish a 1-to-Many relationship between UserSecurity and DimRegion. In Power BI Desktop, create role RegionalUser with filter: [UserEmail] = USERPRINCIPALNAME(). In Power BI Service, assign the Azure AD group to this role.",
            code: `[UserEmail] = USERPRINCIPALNAME()`
          },
          {
            id: "perf-q1",
            category: "Performance",
            question: "How do you configure Incremental Refresh and what are the prerequisites?",
            answer: "Define two Power Query Date/Time parameters named exactly: RangeStart and RangeEnd. Filter the fact table transaction date column using: Date >= RangeStart and Date < RangeEnd. Verify Query Folding is active on this step. In Desktop, right-click table -> Incremental Refresh -> specify retention (e.g. 3 years) and refresh interval (e.g. 7 days)."
          }
        ]
      }
    ]
  }
];
