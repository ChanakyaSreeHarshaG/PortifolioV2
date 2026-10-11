export interface VideoItem {
  id: string;
  num: string;
  channel: string;
  title: string;
  description: string;
  url: string;
  videoId: string;
}

export interface Phase {
  week: string;
  title: string;
  description: string;
  chips: string[];
  videos: VideoItem[];
}

export interface Track {
  title: string;
  domain?: string;
  phases: Phase[];
}

export const DATABRICKS_ROADMAP: Track[] = [
  {
    title: "Start here: the basics",
    domain: "Exam domain: Databricks Intelligence Platform",
    phases: [
      {
        week: "Week 1",
        title: "Python + SQL foundations",
        description: "Two languages carry the whole roadmap. Get fluent enough to read a query and a script without stopping.",
        chips: ["Python basics", "SQL joins & aggregates"],
        videos: [
          {
            id: "v01",
            num: "01",
            channel: "freeCodeCamp",
            title: "Learn Python – Full Course for Beginners",
            description: "Variables, loops, functions and data structures — all the Python you need before touching PySpark.",
            url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
            videoId: "rfscVS0vtbw"
          },
          {
            id: "v02",
            num: "02",
            channel: "Programming with Mosh",
            title: "SQL Course for Beginners",
            description: "Joins, aggregations, subqueries and window-style thinking. Spark SQL and Delta DML are just SQL on a bigger engine.",
            url: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
            videoId: "7S_tz1z_5bA"
          }
        ]
      },
      {
        week: "Week 2",
        title: "Spark and PySpark on Databricks",
        description: "The engine under everything. Learn the DataFrame API first, then why shuffles are expensive and how to read the Spark UI.",
        chips: ["DataFrames", "Joins", "Aggregations", "Dedup", "Shuffle", "Tuning", "Spark UI", "Serverless vs job vs all-purpose compute"],
        videos: [
          {
            id: "v03",
            num: "03",
            channel: "Ansh Lamba",
            title: "PySpark Tutorial – Full Course (From Zero to Pro!)",
            description: "DataFrames, joins, aggregations, dedup, then shuffle and tuning. Keep the Spark UI open while you follow along.",
            url: "https://www.youtube.com/watch?v=94w6hPk7nkM",
            videoId: "94w6hPk7nkM"
          }
        ]
      }
    ]
  },
  {
    title: "Store and transform your data",
    domain: "Exam domain: Data Processing & Transformations",
    phases: [
      {
        week: "Week 3",
        title: "Lakehouse, Delta Lake, medallion",
        description: "Delta is the storage layer the exam keeps returning to. Build bronze, silver and gold layers by hand.",
        chips: ["Delta DDL/DML", "Bronze / silver / gold", "Liquid Clustering", "Views", "Materialized views", "Streaming tables"],
        videos: [
          {
            id: "v04",
            num: "04",
            channel: "Afaque Ahmad",
            title: "Delta Lake Masterclass – Azure Databricks | PySpark",
            description: "Delta internals, DDL/DML, time travel and the bronze → silver → gold flow, from zero to expert.",
            url: "https://www.youtube.com/watch?v=8IjCyvyAPpM",
            videoId: "8IjCyvyAPpM"
          }
        ]
      }
    ]
  },
  {
    title: "Bring data in",
    domain: "Exam domain: Development & Ingestion",
    phases: [
      {
        week: "Week 4",
        title: "Ingestion",
        description: "Getting data in: pick the right tool for batch, streaming or incremental loads.",
        chips: ["Auto Loader", "COPY INTO", "Lakeflow Connect", "JDBC / REST", "Batch vs streaming vs incremental"],
        videos: [
          {
            id: "v05",
            num: "05",
            channel: "Ease With Data",
            title: "COPY INTO command – Idempotent, Exactly-Once Pipelines",
            description: "How COPY INTO tracks file metadata so a re-run never double-loads. Part of a Databricks playlist (video 23).",
            url: "https://www.youtube.com/watch?v=sjItHOjZsY4",
            videoId: "sjItHOjZsY4"
          },
          {
            id: "v06",
            num: "06",
            channel: "Ease With Data",
            title: "Auto Loader – Schema Evolution & File Detection Modes",
            description: "The default incremental file-ingestion tool on the exam. Know the schema evolution modes cold (video 24).",
            url: "https://www.youtube.com/watch?v=g7d1U2_dWS8",
            videoId: "g7d1U2_dWS8"
          }
        ]
      }
    ]
  },
  {
    title: "Keep data safe and trusted",
    domain: "Exam domain: Data Governance & Quality",
    phases: [
      {
        week: "Week 5",
        title: "Unity Catalog and access control",
        description: "Who can see what. Expect scenario questions on privileges and table types.",
        chips: ["Catalog → schema → table", "Managed vs external tables", "GRANT", "REVOKE", "DENY", "Row filters", "Column masks", "ABAC"],
        videos: [
          {
            id: "v07",
            num: "07",
            channel: "Ansh Lamba",
            title: "Databricks Full Course (With Unity Catalog)",
            description: "Catalog → schema → table hierarchy, managed vs external tables, grants and governance in a real workspace.",
            url: "https://www.youtube.com/watch?v=P5pEeR3xQpI",
            videoId: "P5pEeR3xQpI"
          }
        ]
      }
    ]
  },
  {
    title: "Run it for real",
    domain: "Exam domain: Productionizing Data Pipelines",
    phases: [
      {
        week: "Week 6",
        title: "Pipelines and orchestration",
        description: "Turn notebooks into production pipelines with quality checks and schedules.",
        chips: ["Lakeflow Spark Declarative Pipelines", "Data quality checks", "Lakeflow Jobs: DAG tasks", "Retries", "Branching", "Looping", "Scheduled trigger", "File arrival trigger", "Table update trigger"],
        videos: [
          {
            id: "v08",
            num: "08",
            channel: "codebasics",
            title: "Databricks Tutorial – Free Edition, End-to-End Data + AI Project",
            description: "Build a full pipeline on the free tier: declarative pipelines, jobs and orchestration in one project.",
            url: "https://www.youtube.com/watch?v=761SQ9Hxbic",
            videoId: "761SQ9Hxbic"
          }
        ]
      },
      {
        week: "Week 7",
        title: "Ship it",
        description: "Deploy with bundles, monitor what you run, then prove it with an end-to-end project and mock exams.",
        chips: ["Declarative Automation Bundles", "Dev / test / prod", "CLI", "CI/CD", "Run history", "Skew", "Spilling", "OOM", "End-to-end project", "Mock exams"],
        videos: [
          {
            id: "v09",
            num: "09",
            channel: "Afaque Ahmad",
            title: "Databricks End-To-End Project – Streaming, Lakeflow, Unity Catalog",
            description: "Put everything together: streaming, Lakeflow, Unity Catalog and BI in one capstone-style build.",
            url: "https://www.youtube.com/watch?v=vy4G86q1rQY",
            videoId: "vy4G86q1rQY"
          }
        ]
      }
    ]
  },
  {
    title: "Test yourself",
    phases: [
      {
        week: "After Week 7",
        title: "Certification recap",
        description: "Watch this last, then take mock exams and go back to whichever phase scored lowest.",
        chips: ["Associate Practice Exam", "Domain Weakness Review", "Timed Mocks"],
        videos: [
          {
            id: "v10",
            num: "10",
            channel: "freeCodeCamp",
            title: "Databricks Data Engineer Associate Certification Course – Pass the Exam!",
            description: "Your exam recap. Watch it last, then take mock exams and revisit weak domains.",
            url: "https://www.youtube.com/watch?v=0Hd5vYqin7w",
            videoId: "0Hd5vYqin7w"
          }
        ]
      }
    ]
  }
];
