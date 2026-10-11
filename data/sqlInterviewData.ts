export interface CompanyQuestion {
  company: string;
  round: string;
  q: string;
  tip?: string;
}

export interface SolvedQuestion {
  num: number;
  title: string;
  cat: string;
  q: string;
  ans: string;
  code?: string;
  tip?: string;
}

export const COMPANY_QUESTIONS: CompanyQuestion[] = [
  // Capgemini
  { company: "Capgemini", round: "L1 — Technical Interview", q: "Can you write a query to find the third-highest salary without using a subquery?", tip: "Use DENSE_RANK() OVER (ORDER BY salary DESC) in a CTE or LIMIT 1 OFFSET 2." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is the difference between RANK() and DENSE_RANK()?", tip: "RANK leaves gaps after ties (1,2,2,4); DENSE_RANK assigns consecutive ranks (1,2,2,3)." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "Can you write a query to identify duplicate records?", tip: "SELECT email, COUNT(*) FROM t GROUP BY email HAVING COUNT(*) > 1;" },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "How would you delete duplicate records while retaining one record?", tip: "Use ROW_NUMBER() partitioned by unique key ordered by ID, then DELETE WHERE rn > 1." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "Why would you use ROW_NUMBER() instead of RANK() for deleting duplicate records?", tip: "ROW_NUMBER guarantees strictly unique sequence numbers (1,2,3) even for tied duplicate rows." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is a surrogate key?", tip: "System-generated artificial integer or UUID with no intrinsic business meaning." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is a natural key?", tip: "Business-meaningful real-world identifier, such as SSN, email, or tax ID." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is a materialized view?", tip: "A precomputed stored query result physically written to disk, refreshed periodically." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is a temporary table and what is its usage?", tip: "Session-scoped transient table automatically dropped when user session terminates." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "How would you generate unique team vs opposite-team combinations without repeating reverse combinations?", tip: "SELECT t1.name, t2.name FROM teams t1 INNER JOIN teams t2 ON t1.name < t2.name;" },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What SQL-side optimization techniques have you followed?", tip: "Avoid SELECT *, filter early in WHERE, index join columns, avoid functions on indexed fields." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "Can you explain Stream Lookup vs Database Lookup? What is the difference?", tip: "Stream lookup buffers reference data in RAM; Database lookup executes repeated queries against DB." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is the difference between SCD and CDC? (MOST COMMON QUESTION)", tip: "CDC captures raw transactional changes in source DB; SCD manages how historical dimension changes are stored in target warehouse." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "In CDC, can we track history?", tip: "CDC captures the stream of change logs (inserts, updates, deletes), which can be preserved downstream." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is Merge Rows / Merge Join?", tip: "Join algorithm that requires both incoming streams to be sorted on the join key first." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is the difference between Group By and Memory Group By in ETL?", tip: "Memory Group By does not require pre-sorted inputs but is limited by JVM heap memory." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "How do you remove duplicate records in Pentaho / PDI?", tip: "Sort Rows step followed by Unique Rows step." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is the Merge Rows (diff) component?", tip: "Compares two sorted streams and tags rows as identical, changed, new, or deleted." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "How would you compare data from two input steps using Merge Rows (diff)?", tip: "Ensure identical sorting on match keys before passing to Merge Rows (diff)." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is the difference between lookup components and joins in PDI, and when to use each?", tip: "Lookup is for 1-to-1 dimension enrichment; Join supports full relational operations (Outer, Cartesians)." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What are the SCD types? (MOST COMMON QUESTION)", tip: "Type 0 (fixed), Type 1 (overwrite), Type 2 (new row with start/end date & is_current), Type 3 (new column)." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is the difference between a fact table and a factless fact table?", tip: "Fact tables contain quantitative numerical metrics; factless fact tables record events with only foreign keys." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is a surrogate key and what is a natural key?", tip: "Natural key comes from source; surrogate key isolates data warehouse dimensions from source changes." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What is incremental load and how do you achieve it in Pentaho?", tip: "Load only new/modified rows using a high-watermark timestamp or CDC flag." },
  { company: "Capgemini", round: "L1 — Technical Interview", q: "What SQL-side and PDI-side optimization techniques have you followed?", tip: "Batch commits, connection pooling, indexing source keys, pushing transformations down to SQL." },

  // Deloitte
  { company: "Deloitte", round: "Technical — SQL / Snowflake", q: "What are the different join types?", tip: "INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF, and ANTI joins." },
  { company: "Deloitte", round: "Technical — SQL / Snowflake", q: "Given two tables and their columns, what would the output rows be for the different joins?", tip: "Be ready to calculate exact row counts when tables contain duplicate and NULL join keys." },
  { company: "Deloitte", round: "Technical — SQL / Snowflake", q: "How do you find the third-highest salary?", tip: "WITH r AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM emp) SELECT DISTINCT salary FROM r WHERE rnk = 3;" },
  { company: "Deloitte", round: "Technical — SQL / Snowflake", q: "How do you use LEAD and LAG functions?", tip: "LEAD accesses subsequent rows; LAG accesses previous rows in the ordered window." },
  { company: "Deloitte", round: "Technical — SQL / Snowflake", q: "What is the difference between RANK, DENSE_RANK, and ROW_NUMBER?", tip: "ROW_NUMBER gives unique sequential numbers; RANK skips after ties; DENSE_RANK never skips." },
  { company: "Deloitte", round: "Technical — SQL / Snowflake", q: "What are the types of views in Snowflake?", tip: "Standard views, Secure views (hide definition & internal optimization), and Materialized views." },
  { company: "Deloitte", round: "Technical — SQL / Snowflake", q: "What is a materialized view? Give an example.", tip: "Precomputed table in Snowflake automatically maintained in background by serverless compute." },
  { company: "Deloitte", round: "Technical — SQL / Snowflake", q: "How do you handle a long-running query?", tip: "Inspect Query Profile for spilling to local/remote storage, pruning efficiency, and warehouse resizing." },
  { company: "Deloitte", round: "Technical / Project Interview", q: "How do you optimize a data pipeline for better performance and scalability?", tip: "Partition pruning, clustering keys, horizontal warehouse scaling, and ELT pushdown." },

  // Infosys
  { company: "Infosys", round: "L1 — Technical Interview", q: "Explain Slowly Changing Dimension Type 2 (SCD Type 2).", tip: "Preserves full historical audit by creating a new record with valid_from, valid_to, and is_active flag." },
  { company: "Infosys", round: "L1 — Technical Interview", q: "How do additional fields/additional columns come into Type 2?", tip: "Schema evolution in warehouse; adding metadata columns for tracking changed attributes." },
  { company: "Infosys", round: "L1 — Technical Interview", q: "What is the difference between a Surrogate Key, Primary Key, and Foreign Key?", tip: "PK uniquely identifies row; FK links to referenced PK; Surrogate Key is internal warehouse synthetic PK." },
  { company: "Infosys", round: "L1 — Technical Interview", q: "Can you explain Materialized Views in Snowflake?", tip: "Automatically refreshed background cached results; ideal for repeated queries on slow-changing tables." },
  { company: "Infosys", round: "L1 — Technical Interview", q: "What optimization techniques do you use in Snowflake?", tip: "Cluster keys, search optimization service, multi-cluster auto-scaling, and query profiling." },
  { company: "Infosys", round: "L1 — Technical Interview", q: "Find the 5th highest salary.", tip: "DENSE_RANK() = 5." },
  { company: "Infosys", round: "L1 — Technical Interview", q: "Find the 5th highest salary for each department.", tip: "DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) = 5." },
  { company: "Infosys", round: "L1 — Technical Interview", q: "Who sold the costliest product?", tip: "SELECT salesperson FROM sales JOIN products USING(product_id) ORDER BY price DESC LIMIT 1;" },
  { company: "Infosys", round: "L1 — Technical Interview", q: "Find the customer who purchased the costliest product.", tip: "Join customers, orders, and products filtered where price = (SELECT MAX(price) FROM products)." },
  { company: "Infosys", round: "L1 — Technical Interview", q: "Find the customers who placed at least one order in every month of 2025.", tip: "GROUP BY customer_id HAVING COUNT(DISTINCT EXTRACT(MONTH FROM order_date)) = 12." },
  { company: "Infosys", round: "Final Client Round", q: "Can you give me an example of one dummy record with SCD Type 2?", tip: "Customer 101, City 'Dallas', ValidFrom '2024-01-01', ValidTo '2025-05-01', IsCurrent 0; new record with City 'Austin', IsCurrent 1." },
  { company: "Infosys", round: "Final Client Round", q: "How would you implement row-level security so regional managers only see their own region's customers?", tip: "Create mapping table user_role_map, use CURRENT_USER() in a secure view or row access policy." },
  { company: "Infosys", round: "Final Client Round", q: "If a transaction-intensive job consumes high CPU/memory and slows other teams in Snowflake, what do you do?", tip: "Isolate the job onto a dedicated Virtual Warehouse; avoid sharing warehouses between ETL and BI." },
  { company: "Infosys", round: "Final Client Round", q: "How to ensure referential integrity when transaction source succeeds but dimension source fails?", tip: "Assign default dummy surrogate key (-1 / 'Unknown') for missing dimension keys, then backfill." },
  { company: "Infosys", round: "Final Client Round", q: "What Snowflake system tables do you use to analyze slow queries across teams?", tip: "SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY and WAREHOUSE_METERING_HISTORY." },

  // Cognizant
  { company: "Cognizant", round: "L1 — SQL Data Engineer", q: "What is the logical execution order of SQL clauses?", tip: "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT" },
  { company: "Cognizant", round: "L1 — SQL Data Engineer", q: "Find candidates possessing all three required skills: MySQL, Python, and Tableau.", tip: "WHERE skill IN ('MySQL','Python','Tableau') GROUP BY candidate_id HAVING COUNT(DISTINCT skill) = 3;" },
  { company: "Cognizant", round: "L1 — SQL Data Engineer", q: "Calculate join record counts for duplicate keys across INNER, LEFT, and FULL joins.", tip: "Multiplication rule: if Table 1 has M rows and Table 2 has N rows for key K, join yields M*N rows." },
  { company: "Cognizant", round: "L1 — SQL Data Engineer", q: "If one additional NULL record is added to both tables, how do join counts change?", tip: "INNER join count does NOT change. LEFT & FULL joins gain extra unmatched rows." },
  { company: "Cognizant", round: "L1 — SQL Data Engineer", q: "Generate all possible unique match pairings between 5 cricket teams.", tip: "SELECT t1.name, t2.name FROM teams t1 INNER JOIN teams t2 ON t1.name < t2.name;" },
  { company: "Cognizant", round: "L1 — SQL Data Engineer", q: "Count new customers making their first-ever purchase in each month.", tip: "First find MIN(order_date) per customer in a CTE, then GROUP BY purchase_month." },
  { company: "Cognizant", round: "L1 — SQL Data Engineer", q: "Return all seats belonging to a consecutive group of 3 or more vacant seats.", tip: "Gaps & islands pattern using seat_number - ROW_NUMBER() grouping." },
  { company: "Cognizant", round: "L2 — SQL Data Engineer", q: "Calculate lifetime_upgrade and lifetime_downgrade per customer from monthly recharge.", tip: "Compare recharge with LAG(recharge); MAX(CASE WHEN current > prev THEN 1 ELSE 0 END)." },
  { company: "Cognizant", round: "L2 — SQL Data Engineer", q: "Find employees who joined earlier than their manager and earn a higher salary than their manager.", tip: "Self-join employees e to employees m ON e.manager_id = m.emp_id WHERE e.join_date < m.join_date AND e.salary > m.salary." },

  // NTT DATA
  { company: "NTT DATA", round: "Technical / ETL", q: "If the source has 1,000,000 records but target has only 950,000, how would you investigate?", tip: "Check rejected/bad records log, filter conditions in ETL, duplicate key drops, or join dropouts." },
  { company: "NTT DATA", round: "Technical / ETL", q: "What is shuffling in distributed data computing?", tip: "Physical transfer and re-partitioning of data across cluster network nodes during joins and group-bys." },
  { company: "NTT DATA", round: "Technical / ETL", q: "How would you resolve a join that causes excessive shuffling?", tip: "Use Broadcast Join for small lookup tables, or pre-bucket/cluster both tables on the join key." },
  { company: "NTT DATA", round: "Technical / ETL", q: "What is a broadcast join?", tip: "Driver replicates the entire small table to RAM on every worker executor, eliminating network shuffle." },
  { company: "NTT DATA", round: "Client Technical", q: "What are the ACID properties in SQL and Delta Lake?", tip: "Atomicity, Consistency, Isolation, Durability. Delta Lake achieves ACID via transaction log JSON files." },
  { company: "NTT DATA", round: "Client Technical", q: "What is schema enforcement vs schema evolution?", tip: "Enforcement rejects writes with mismatched columns; evolution dynamically updates table schema with new columns." },
  { company: "NTT DATA", round: "Client Technical", q: "What is time travel in Delta Lake?", tip: "Querying historical table versions using TIMESTAMP AS OF or VERSION AS OF from the transaction log." },

  // Grid Dynamics
  { company: "Grid Dynamics", round: "Technical Interview", q: "If both tables have duplicate join keys, what happens during the join?", tip: "A Cartesian product of matching rows is produced, leading to exponential row explosion." },
  { company: "Grid Dynamics", round: "Technical Interview", q: "What is the difference between EXISTS and IN?", tip: "EXISTS short-circuits as soon as a single match is found and handles NULLs safely; IN evaluates the full list." },
  { company: "Grid Dynamics", round: "Technical Interview", q: "What happens if multiple source records match the same target record during a MERGE?", tip: "Database raises a non-deterministic update error ('MERGE failed because target row matched multiple source rows')." },
  { company: "Grid Dynamics", round: "Technical Interview", q: "How would you extract an ID from a semi-structured JSON column in Snowflake?", tip: "Use colon operator: json_col:customer_id::INT or FLATTEN() function." }
];

export const SOLVED_QUESTIONS: SolvedQuestion[] = [
  { 
    num: 1, 
    title: "SQL Command Types (DDL, DML, DCL, TCL)", 
    cat: "Fundamentals", 
    q: "What are the main types of SQL commands and why do their categories matter?", 
    ans: "SQL commands are grouped by what they do: DDL (Data Definition - CREATE, ALTER, DROP, TRUNCATE), DML (Data Manipulation - INSERT, UPDATE, DELETE, MERGE), DQL (Query - SELECT), DCL (Control - GRANT, REVOKE), and TCL (Transaction - COMMIT, ROLLBACK).",
    tip: "Common follow-up: Is TRUNCATE DDL or DML? Answer: DDL, because it operates on the table object structure/pages directly, bypassing row-level triggers."
  },
  { 
    num: 2, 
    title: "Primary Key vs Foreign Key", 
    cat: "Fundamentals",
    q: "What is the difference between a primary key and a foreign key?",
    ans: "A Primary Key uniquely identifies a row in its table (NOT NULL + UNIQUE). A Foreign Key points to the Primary Key of another table to maintain referential integrity.",
    code: `CREATE TABLE employees (
  emp_id INT PRIMARY KEY,
  dept_id INT REFERENCES departments(dept_id)
);`
  },
  { 
    num: 5, 
    title: "DELETE vs TRUNCATE vs DROP", 
    cat: "Fundamentals",
    q: "Compare DELETE, TRUNCATE, and DROP across transaction logs, WHERE clauses, and speed.",
    ans: "DELETE is DML, row-by-row, supports WHERE, fires triggers, and is slower. TRUNCATE is DDL, deallocates entire data pages, no WHERE clause, resets auto-increment, much faster. DROP is DDL, removes the entire table structure from metadata.",
    tip: "PostgreSQL and SQL Server allow TRUNCATE inside a transaction and can be rolled back; MySQL and Oracle commit implicitly."
  },
  { 
    num: 6, 
    title: "WHERE vs HAVING", 
    cat: "Fundamentals",
    q: "What is the difference between WHERE and HAVING in query execution?",
    ans: "WHERE filters raw individual rows before grouping occurs. HAVING filters aggregated groups after GROUP BY.",
    code: `SELECT dept_id, AVG(salary) AS avg_sal
FROM employees
WHERE salary > 50000 -- row filter before grouping
GROUP BY dept_id
HAVING AVG(salary) > 70000; -- group filter after grouping`
  },
  { 
    num: 8, 
    title: "NULL Handling & The NOT IN Trap", 
    cat: "Fundamentals",
    q: "How does SQL treat NULL and why does NOT IN fail when a subquery returns NULL?",
    ans: "NULL represents unknown. In 3-valued logic, NULL = NULL evaluates to UNKNOWN. If a subquery used with NOT IN returns even a single NULL, the entire NOT IN evaluates to UNKNOWN and returns 0 rows! Always use NOT EXISTS instead.",
    code: `-- Dangerous:
WHERE dept_id NOT IN (SELECT dept_id FROM employees)

-- Safe:
WHERE NOT EXISTS (SELECT 1 FROM employees e WHERE e.dept_id = d.dept_id)`
  },
  { 
    num: 19, 
    title: "Find Second-Highest Salary", 
    cat: "Hands-on Query",
    q: "Write a query to find the second-highest salary handling ties properly.",
    ans: "Use DENSE_RANK() so tied top salaries do not skip rank 2.",
    code: `WITH ranked AS (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT DISTINCT salary AS second_highest_salary
FROM ranked
WHERE rnk = 2;`
  },
  { 
    num: 22, 
    title: "Top-N Earners Per Department", 
    cat: "Window Functions",
    q: "Find the top 3 earners in each department.",
    ans: "Partition by department and order by salary descending inside ROW_NUMBER().",
    code: `WITH ranked AS (
  SELECT dept_id, name, salary,
         ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC, emp_id) AS rn
  FROM employees
  WHERE dept_id IS NOT NULL
)
SELECT dept_id, name, salary, rn
FROM ranked
WHERE rn <= 3
ORDER BY dept_id, rn;`
  },
  { 
    num: 24, 
    title: "Delete Duplicate Records While Retaining One", 
    cat: "Hands-on Query",
    q: "Write an idempotent query to delete duplicate customer emails keeping the lowest ID.",
    ans: "Use a CTE or derived table with ROW_NUMBER() partitioned by email.",
    code: `DELETE FROM customers
WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) AS rn
    FROM customers
  ) t WHERE rn > 1
);`
  },
  { 
    num: 25, 
    title: "Running Total & Window Frame Clauses", 
    cat: "Window Functions",
    q: "Calculate cumulative sales by date using explicit window frame syntax.",
    ans: "Explicitly declare ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW to prevent default RANGE peer grouping when dates tie.",
    code: `SELECT sale_date, amount,
       SUM(amount) OVER (
         ORDER BY sale_date
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM sales
ORDER BY sale_date;`
  },
  { 
    num: 27, 
    title: "Gaps & Islands: 3+ Consecutive Login Days", 
    cat: "Advanced Query",
    q: "Identify users who logged in on 3 or more consecutive days.",
    ans: "The classic date minus row number trick. For consecutive days, date and row_number advance synchronously, keeping their difference constant.",
    code: `WITH numbered AS (
  SELECT user_id, login_date,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS rn
  FROM (SELECT DISTINCT user_id, login_date FROM logins) d
),
grouped AS (
  SELECT user_id, login_date,
         login_date - CAST(rn AS INT) AS grp
  FROM numbered
)
SELECT user_id, MIN(login_date) AS streak_start, MAX(login_date) AS streak_end, COUNT(*) AS days
FROM grouped
GROUP BY user_id, grp
HAVING COUNT(*) >= 3;`
  },
  { 
    num: 30, 
    title: "Month-Over-Month % Growth with LAG()", 
    cat: "Window Functions",
    q: "Calculate month-over-month revenue change and growth percentage.",
    ans: "Read previous month revenue with LAG() and guard against division by zero using NULLIF.",
    code: `SELECT month, revenue,
       LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
       revenue - LAG(revenue) OVER (ORDER BY month) AS change,
       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month)) 
       / NULLIF(LAG(revenue) OVER (ORDER BY month), 0), 1) AS pct_change
FROM monthly_sales
ORDER BY month;`
  },
  { 
    num: 39, 
    title: "Recursive CTE Org Chart Hierarchy", 
    cat: "Advanced Query",
    q: "Walk an employee-manager hierarchy to display reporting levels.",
    ans: "Anchor member selects root manager; recursive member joins back to CTE.",
    code: `WITH RECURSIVE org AS (
  SELECT emp_id, name, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL -- Anchor
  UNION ALL
  SELECT e.emp_id, e.name, e.manager_id, o.level + 1
  FROM employees e
  JOIN org o ON e.manager_id = o.emp_id -- Recursive step
)
SELECT name, level FROM org ORDER BY level, name;`
  },
  { 
    num: 43, 
    title: "Non-Sargable Queries in WHERE Clauses", 
    cat: "Performance",
    q: "Why should you never wrap an indexed column in a function in WHERE?",
    ans: "Wrapping an indexed column in a function forces a full table scan because index keys cannot be walked directly. Rewrite to a range comparison.",
    code: `-- Slow (Non-Sargable):
WHERE YEAR(order_date) = 2026

-- Fast (Sargable):
WHERE order_date >= '2026-01-01' AND order_date < '2027-01-01'`
  },
  { 
    num: 46, 
    title: "ACID Properties & Transaction Guarantees", 
    cat: "Transactions",
    q: "Explain Atomicity, Consistency, Isolation, and Durability.",
    ans: "Atomicity: all steps succeed or none do (rollback on failure). Consistency: database transitions between valid states preserving all integrity constraints. Isolation: concurrent transactions execute without cross-contamination. Durability: committed writes survive system power cuts."
  }
];
