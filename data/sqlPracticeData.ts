export interface SqlColumn {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  references?: string;
}

export interface SqlTableSchema {
  tableName: string;
  description: string;
  columns: SqlColumn[];
}

export interface SqlQuestion {
  id: string;
  database: 'hospital' | 'enterprise';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  title: string;
  description: string;
  hint: string;
  starterSql: string;
  solutionSql: string;
  category: string;
  expectedColumns?: string[];
}

export interface DatabaseDefinition {
  id: 'hospital' | 'enterprise';
  name: string;
  badge: string;
  description: string;
  initSql: string;
  tables: SqlTableSchema[];
}

// 🏥 Hospital Database DDL & Seed
const HOSPITAL_INIT_SQL = `
CREATE TABLE IF NOT EXISTS province_names (
  province_id TEXT PRIMARY KEY,
  province_name TEXT NOT NULL
);

INSERT INTO province_names (province_id, province_name) VALUES
('ON', 'Ontario'),
('QC', 'Quebec'),
('NS', 'Nova Scotia'),
('NB', 'New Brunswick'),
('MB', 'Manitoba'),
('BC', 'British Columbia'),
('PE', 'Prince Edward Island'),
('SK', 'Saskatchewan'),
('AB', 'Alberta'),
('NL', 'Newfoundland and Labrador');

CREATE TABLE IF NOT EXISTS doctors (
  doctor_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  specialty TEXT NOT NULL
);

INSERT INTO doctors (doctor_id, first_name, last_name, specialty) VALUES
(1, 'Donna', 'Guthrie', 'Pediatrics'),
(2, 'Matthew', 'Weiss', 'Cardiology'),
(3, 'Jason', 'Adler', 'Neurology'),
(4, 'Sarah', 'Conner', 'Oncology'),
(5, 'David', 'Banner', 'Orthopedics'),
(6, 'Elena', 'Rostova', 'Dermatology'),
(7, 'Marcus', 'Brody', 'General Surgery');

CREATE TABLE IF NOT EXISTS patients (
  patient_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  city TEXT NOT NULL,
  province_id TEXT NOT NULL,
  allergies TEXT,
  height INTEGER,
  weight INTEGER
);

INSERT INTO patients (patient_id, first_name, last_name, gender, birth_date, city, province_id, allergies, height, weight) VALUES
(1, 'Donald', 'Waterfield', 'M', '1963-02-12', 'Barrie', 'ON', 'Penicillin', 156, 65),
(2, 'Mickey', 'Brumleve', 'M', '1974-07-28', 'Dundas', 'ON', NULL, 180, 88),
(3, 'Jaden', 'Frost', 'M', '1998-11-04', 'Hamilton', 'ON', 'Peanuts', 172, 71),
(4, 'Kofi', 'Thomas', 'M', '1985-04-19', 'Halifax', 'NS', 'Sulfa', 188, 92),
(5, 'Sarah', 'Jenkins', 'F', '2010-06-14', 'Toronto', 'ON', NULL, 142, 45),
(6, 'Chloe', 'Simmons', 'F', '1992-09-23', 'Montreal', 'QC', 'Penicillin', 165, 58),
(7, 'Lucas', 'Graham', 'M', '2010-01-30', 'Vancouver', 'BC', NULL, 150, 48),
(8, 'Amelia', 'Watson', 'F', '1988-12-05', 'Calgary', 'AB', 'Aspirin', 170, 64),
(9, 'Stella', 'Maris', 'F', '1970-03-17', 'Sydney', 'NS', NULL, 162, 73),
(10, 'Carlos', 'Santana', 'M', '1965-08-11', 'Halifax', 'NS', 'Penicillin', 175, 82),
(11, 'Oliver', 'Queen', 'M', '1984-05-16', 'Star City', 'ON', NULL, 185, 89),
(12, 'Hannah', 'Abbott', 'F', '2001-10-09', 'Ottawa', 'ON', 'Latex', 158, 54),
(13, 'Clara', 'Oswald', 'F', '1995-11-23', 'London', 'ON', NULL, 160, 52),
(14, 'Arthur', 'Dent', 'M', '1978-04-01', 'Victoria', 'BC', 'Dust', 179, 78),
(15, 'Diana', 'Prince', 'F', '1982-03-22', 'Toronto', 'ON', NULL, 182, 75);

CREATE TABLE IF NOT EXISTS admissions (
  patient_id INTEGER NOT NULL,
  admission_date TEXT NOT NULL,
  discharge_date TEXT,
  diagnosis TEXT NOT NULL,
  attending_doctor_id INTEGER NOT NULL
);

INSERT INTO admissions (patient_id, admission_date, discharge_date, diagnosis, attending_doctor_id) VALUES
(1, '2022-09-01', '2022-09-07', 'Hypertension', 2),
(1, '2023-01-15', '2023-01-18', 'Angina', 2),
(2, '2023-05-10', '2023-05-10', 'Routine Checkup', 7),
(3, '2022-11-12', '2022-11-14', 'Anaphylaxis', 1),
(4, '2023-02-01', '2023-02-10', 'Pneumonia', 7),
(5, '2023-03-14', '2023-03-16', 'Asthma Exacerbation', 1),
(6, '2022-08-20', '2022-08-25', 'Dementia', 3),
(6, '2023-04-11', '2023-04-19', 'Dementia', 3),
(8, '2023-06-01', '2023-06-05', 'Breast Mass Biopsy', 4),
(9, '2022-12-05', '2022-12-05', 'Migraine Treatment', 3),
(10, '2023-07-04', '2023-07-12', 'Fractured Femur', 5),
(12, '2023-08-15', '2023-08-18', 'Eczema Flare-up', 6),
(15, '2023-09-02', '2023-09-04', 'Laceration Repair', 7);
`;

// 🏢 Enterprise Tech Database DDL & Seed
const ENTERPRISE_INIT_SQL = `
CREATE TABLE IF NOT EXISTS departments (
  department_id INTEGER PRIMARY KEY,
  department_name TEXT NOT NULL,
  location TEXT NOT NULL
);

INSERT INTO departments (department_id, department_name, location) VALUES
(10, 'Engineering', 'San Francisco'),
(20, 'Data & Analytics', 'New York'),
(30, 'Product', 'Seattle'),
(40, 'Sales & Marketing', 'Austin');

CREATE TABLE IF NOT EXISTS employees (
  employee_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  salary INTEGER NOT NULL,
  department_id INTEGER NOT NULL,
  manager_id INTEGER,
  hire_date TEXT NOT NULL
);

INSERT INTO employees (employee_id, first_name, last_name, email, salary, department_id, manager_id, hire_date) VALUES
(101, 'Alex', 'Rivera', 'alex.r@techcorp.io', 165000, 10, NULL, '2020-03-15'),
(102, 'Priya', 'Sharma', 'priya.s@techcorp.io', 145000, 10, 101, '2021-06-01'),
(103, 'Liam', 'Chen', 'liam.c@techcorp.io', 130000, 10, 101, '2022-01-10'),
(104, 'Elena', 'Rostova', 'elena.r@techcorp.io', 155000, 20, NULL, '2019-11-20'),
(105, 'Marcus', 'Vance', 'marcus.v@techcorp.io', 140000, 20, 104, '2021-08-15'),
(106, 'Sofia', 'Alvarez', 'sofia.a@techcorp.io', 125000, 20, 104, '2022-09-01'),
(107, 'David', 'Kim', 'david.k@techcorp.io', 120000, 20, 104, '2023-02-15'),
(108, 'Jordan', 'Bell', 'jordan.b@techcorp.io', 150000, 30, NULL, '2020-07-01'),
(109, 'Chloe', 'Martin', 'chloe.m@techcorp.io', 115000, 30, 108, '2022-04-18'),
(110, 'Ethan', 'Hunt', 'ethan.h@techcorp.io', 110000, 40, NULL, '2021-02-01'),
(111, 'Maya', 'Lin', 'maya.l@techcorp.io', 95000, 40, 110, '2023-05-12');

CREATE TABLE IF NOT EXISTS projects (
  project_id INTEGER PRIMARY KEY,
  project_name TEXT NOT NULL,
  budget INTEGER NOT NULL
);

INSERT INTO projects (project_id, project_name, budget) VALUES
(501, 'Lakehouse Migration', 250000),
(502, 'Realtime Feature Store', 180000),
(503, 'Executive Power BI Dashboard', 95000),
(504, 'Customer Churn Predictor', 140000);

CREATE TABLE IF NOT EXISTS employee_projects (
  employee_id INTEGER NOT NULL,
  project_id INTEGER NOT NULL,
  hours_allocated INTEGER NOT NULL
);

INSERT INTO employee_projects (employee_id, project_id, hours_allocated) VALUES
(101, 501, 20),
(102, 501, 35),
(103, 502, 40),
(104, 501, 15),
(104, 503, 25),
(105, 503, 35),
(106, 504, 40),
(107, 504, 30),
(108, 503, 10);
`;

export const DATABASES: DatabaseDefinition[] = [
  {
    id: 'hospital',
    name: 'Hospital Patient Database',
    badge: 'sql-practice.com Classic',
    description: 'The iconic healthcare schema featuring patients, admissions, doctors, and Canadian province regions.',
    initSql: HOSPITAL_INIT_SQL,
    tables: [
      {
        tableName: 'patients',
        description: 'Contains demographics, physical measurements, and allergy data for patients.',
        columns: [
          { name: 'patient_id', type: 'INTEGER', isPk: true },
          { name: 'first_name', type: 'TEXT' },
          { name: 'last_name', type: 'TEXT' },
          { name: 'gender', type: 'TEXT' },
          { name: 'birth_date', type: 'TEXT' },
          { name: 'city', type: 'TEXT' },
          { name: 'province_id', type: 'TEXT', isFk: true, references: 'province_names.province_id' },
          { name: 'allergies', type: 'TEXT' },
          { name: 'height', type: 'INTEGER' },
          { name: 'weight', type: 'INTEGER' }
        ]
      },
      {
        tableName: 'admissions',
        description: 'Hospital admission records with dates, diagnoses, and attending doctor IDs.',
        columns: [
          { name: 'patient_id', type: 'INTEGER', isFk: true, references: 'patients.patient_id' },
          { name: 'admission_date', type: 'TEXT' },
          { name: 'discharge_date', type: 'TEXT' },
          { name: 'diagnosis', type: 'TEXT' },
          { name: 'attending_doctor_id', type: 'INTEGER', isFk: true, references: 'doctors.doctor_id' }
        ]
      },
      {
        tableName: 'doctors',
        description: 'Medical staff directory with assigned specialties.',
        columns: [
          { name: 'doctor_id', type: 'INTEGER', isPk: true },
          { name: 'first_name', type: 'TEXT' },
          { name: 'last_name', type: 'TEXT' },
          { name: 'specialty', type: 'TEXT' }
        ]
      },
      {
        tableName: 'province_names',
        description: 'Reference lookup of 2-letter province codes to province names.',
        columns: [
          { name: 'province_id', type: 'TEXT', isPk: true },
          { name: 'province_name', type: 'TEXT' }
        ]
      }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Tech Company',
    badge: '174+ Company Interview Questions',
    description: 'Corporate analytics schema modeling departments, employees, compensations, and strategic project allocation.',
    initSql: ENTERPRISE_INIT_SQL,
    tables: [
      {
        tableName: 'employees',
        description: 'Staff directory with salaries, managers, and hire dates.',
        columns: [
          { name: 'employee_id', type: 'INTEGER', isPk: true },
          { name: 'first_name', type: 'TEXT' },
          { name: 'last_name', type: 'TEXT' },
          { name: 'email', type: 'TEXT' },
          { name: 'salary', type: 'INTEGER' },
          { name: 'department_id', type: 'INTEGER', isFk: true, references: 'departments.department_id' },
          { name: 'manager_id', type: 'INTEGER' },
          { name: 'hire_date', type: 'TEXT' }
        ]
      },
      {
        tableName: 'departments',
        description: 'Business unit directory and office locations.',
        columns: [
          { name: 'department_id', type: 'INTEGER', isPk: true },
          { name: 'department_name', type: 'TEXT' },
          { name: 'location', type: 'TEXT' }
        ]
      },
      {
        tableName: 'projects',
        description: 'Corporate initiatives and allocated budget totals.',
        columns: [
          { name: 'project_id', type: 'INTEGER', isPk: true },
          { name: 'project_name', type: 'TEXT' },
          { name: 'budget', type: 'INTEGER' }
        ]
      },
      {
        tableName: 'employee_projects',
        description: 'Many-to-many allocation mapping employee workload hours to projects.',
        columns: [
          { name: 'employee_id', type: 'INTEGER', isFk: true, references: 'employees.employee_id' },
          { name: 'project_id', type: 'INTEGER', isFk: true, references: 'projects.project_id' },
          { name: 'hours_allocated', type: 'INTEGER' }
        ]
      }
    ]
  }
];

export const SQL_PRACTICE_QUESTIONS: SqlQuestion[] = [
  // Hospital Questions - Easy
  {
    id: 'hosp-1',
    database: 'hospital',
    difficulty: 'Easy',
    category: 'Filtering',
    title: 'Show Male Patients',
    description: "Show first name, last name, and gender of patients whose gender is 'M'.",
    hint: "Use a simple WHERE clause filtering on gender = 'M'.",
    starterSql: "SELECT first_name, last_name, gender\nFROM patients\nWHERE ;",
    solutionSql: "SELECT first_name, last_name, gender\nFROM patients\nWHERE gender = 'M';"
  },
  {
    id: 'hosp-2',
    database: 'hospital',
    difficulty: 'Easy',
    category: 'NULL Handling',
    title: 'Patients with No Allergies',
    description: "Show first name and last name of patients who do not have allergies (allergies is NULL).",
    hint: "In SQL, compare null values using IS NULL instead of = NULL.",
    starterSql: "SELECT first_name, last_name\nFROM patients\nWHERE allergies ;",
    solutionSql: "SELECT first_name, last_name\nFROM patients\nWHERE allergies IS NULL;"
  },
  {
    id: 'hosp-3',
    database: 'hospital',
    difficulty: 'Easy',
    category: 'Pattern Matching',
    title: "First Names Starting with 'C'",
    description: "Show first name of patients whose first name starts with the letter 'C'.",
    hint: "Use the LIKE operator with the wildcard '%' (e.g. LIKE 'C%').",
    starterSql: "SELECT first_name\nFROM patients\nWHERE ;",
    solutionSql: "SELECT first_name\nFROM patients\nWHERE first_name LIKE 'C%';"
  },
  {
    id: 'hosp-4',
    database: 'hospital',
    difficulty: 'Easy',
    category: 'Ranges',
    title: 'Weight Within Range',
    description: 'Show first name and last name of patients who weigh within the range of 60 to 75 (inclusive).',
    hint: 'Use the BETWEEN operator: weight BETWEEN 60 AND 75.',
    starterSql: "SELECT first_name, last_name\nFROM patients\nWHERE ;",
    solutionSql: "SELECT first_name, last_name\nFROM patients\nWHERE weight BETWEEN 60 AND 75;"
  },
  {
    id: 'hosp-5',
    database: 'hospital',
    difficulty: 'Easy',
    category: 'String Functions',
    title: 'Concatenate Full Name',
    description: "Show first name and last name concatenated into one column called 'full_name' with a space in between.",
    hint: "In SQLite, use the concatenation operator || (e.g. first_name || ' ' || last_name).",
    starterSql: "SELECT \nFROM patients;",
    solutionSql: "SELECT first_name || ' ' || last_name AS full_name\nFROM patients;"
  },
  {
    id: 'hosp-6',
    database: 'hospital',
    difficulty: 'Easy',
    category: 'Aggregation',
    title: 'Total Admissions Count',
    description: 'Show the total count of admissions recorded in the hospital admissions table.',
    hint: 'Use the COUNT(*) aggregate function.',
    starterSql: "SELECT \nFROM admissions;",
    solutionSql: "SELECT COUNT(*) AS total_admissions\nFROM admissions;"
  },

  // Hospital Questions - Medium
  {
    id: 'hosp-7',
    database: 'hospital',
    difficulty: 'Medium',
    category: 'Joins',
    title: 'Patients with Province Names',
    description: 'Show first_name, last_name, and the full province_name of each patient by joining patients with province_names.',
    hint: 'Use an INNER JOIN between patients and province_names on province_id.',
    starterSql: "SELECT p.first_name, p.last_name, pr.province_name\nFROM patients p\nJOIN province_names pr ON ;",
    solutionSql: "SELECT p.first_name, p.last_name, pr.province_name\nFROM patients p\nJOIN province_names pr ON p.province_id = pr.province_id;"
  },
  {
    id: 'hosp-8',
    database: 'hospital',
    difficulty: 'Medium',
    category: 'Date Filtering',
    title: 'Patients Born in 2010',
    description: 'Show how many patients have a birth_date in the year 2010.',
    hint: "You can use LIKE '2010%' or strftime('%Y', birth_date) = '2010'.",
    starterSql: "SELECT COUNT(*)\nFROM patients\nWHERE ;",
    solutionSql: "SELECT COUNT(*) AS count_2010\nFROM patients\nWHERE birth_date LIKE '2010%';"
  },
  {
    id: 'hosp-9',
    database: 'hospital',
    difficulty: 'Medium',
    category: 'Conditional Logic',
    title: "Display Gender as 'Male' or 'Female'",
    description: "Display every patient's first_name, last_name, and gender written out as 'Male' if 'M' and 'Female' if 'F'.",
    hint: "Use CASE WHEN gender = 'M' THEN 'Male' ELSE 'Female' END.",
    starterSql: "SELECT first_name, last_name,\n  CASE \n  END AS full_gender\nFROM patients;",
    solutionSql: "SELECT first_name, last_name,\n  CASE \n    WHEN gender = 'M' THEN 'Male'\n    ELSE 'Female'\n  END AS full_gender\nFROM patients;"
  },
  {
    id: 'hosp-10',
    database: 'hospital',
    difficulty: 'Medium',
    category: 'Joins & Filtering',
    title: 'Dementia Admissions',
    description: "Show patient_id, first_name, and last_name of patients who have been diagnosed with 'Dementia'.",
    hint: "JOIN patients with admissions on patient_id where admissions.diagnosis = 'Dementia'. Use DISTINCT if needed.",
    starterSql: "SELECT DISTINCT p.patient_id, p.first_name, p.last_name\nFROM patients p\nJOIN admissions a ON ;",
    solutionSql: "SELECT DISTINCT p.patient_id, p.first_name, p.last_name\nFROM patients p\nJOIN admissions a ON p.patient_id = a.patient_id\nWHERE a.diagnosis = 'Dementia';"
  },
  {
    id: 'hosp-11',
    database: 'hospital',
    difficulty: 'Medium',
    category: 'Grouping & Aggregation',
    title: 'Admissions per Attending Doctor',
    description: 'Show doctor_id, first_name, last_name, and total count of admissions attended by each doctor. Order by most admissions descending.',
    hint: 'JOIN doctors with admissions on doctor_id = attending_doctor_id, GROUP BY doctor_id and ORDER BY COUNT(*) DESC.',
    starterSql: "SELECT d.doctor_id, d.first_name, d.last_name, COUNT(*) AS total_admissions\nFROM doctors d\nJOIN admissions a ON d.doctor_id = a.attending_doctor_id\nGROUP BY ;\nORDER BY ;",
    solutionSql: "SELECT d.doctor_id, d.first_name, d.last_name, COUNT(*) AS total_admissions\nFROM doctors d\nJOIN admissions a ON d.doctor_id = a.attending_doctor_id\nGROUP BY d.doctor_id, d.first_name, d.last_name\nORDER BY total_admissions DESC;"
  },

  // Hospital Questions - Hard
  {
    id: 'hosp-12',
    database: 'hospital',
    difficulty: 'Hard',
    category: 'Window Functions',
    title: 'Rank Doctors by Patient Admissions',
    description: 'Use the DENSE_RANK() window function to rank doctors by the number of patients they have admitted. Show doctor first name, last name, admissions count, and doctor_rank.',
    hint: 'DENSE_RANK() OVER (ORDER BY COUNT(*) DESC). Make sure to GROUP BY doctor fields.',
    starterSql: "SELECT d.first_name, d.last_name, COUNT(a.patient_id) AS admission_count,\n  DENSE_RANK() OVER (ORDER BY COUNT(a.patient_id) DESC) AS doctor_rank\nFROM doctors d\nLEFT JOIN admissions a ON d.doctor_id = a.attending_doctor_id\nGROUP BY d.doctor_id, d.first_name, d.last_name\nORDER BY doctor_rank;",
    solutionSql: "SELECT d.first_name, d.last_name, COUNT(a.patient_id) AS admission_count,\n  DENSE_RANK() OVER (ORDER BY COUNT(a.patient_id) DESC) AS doctor_rank\nFROM doctors d\nLEFT JOIN admissions a ON d.doctor_id = a.attending_doctor_id\nGROUP BY d.doctor_id, d.first_name, d.last_name\nORDER BY doctor_rank;"
  },
  {
    id: 'hosp-13',
    database: 'hospital',
    difficulty: 'Hard',
    category: 'Advanced Aggregation',
    title: 'Allergy Discrepancy per Province',
    description: 'Show province_name, total patients, and count of patients with recorded allergies for each province.',
    hint: 'COUNT(*) for total patients, and COUNT(allergies) for patients with allergies (NULLs are automatically omitted by COUNT(column)).',
    starterSql: "SELECT pr.province_name,\n  COUNT(*) AS total_patients,\n  COUNT(p.allergies) AS allergic_patients\nFROM province_names pr\nJOIN patients p ON pr.province_id = p.province_id\nGROUP BY pr.province_name\nORDER BY total_patients DESC;",
    solutionSql: "SELECT pr.province_name,\n  COUNT(*) AS total_patients,\n  COUNT(p.allergies) AS allergic_patients\nFROM province_names pr\nJOIN patients p ON pr.province_id = p.province_id\nGROUP BY pr.province_name\nORDER BY total_patients DESC;"
  },

  // Enterprise Questions - Easy
  {
    id: 'ent-1',
    database: 'enterprise',
    difficulty: 'Easy',
    category: 'Filtering & Sorting',
    title: 'High Earning Engineers',
    description: 'Show first_name, last_name, and salary of all employees in Engineering (department_id = 10) earning more than 135,000. Order by salary descending.',
    hint: 'Combine department_id = 10 AND salary > 135000 in your WHERE clause.',
    starterSql: "SELECT first_name, last_name, salary\nFROM employees\nWHERE department_id = 10\nORDER BY ;",
    solutionSql: "SELECT first_name, last_name, salary\nFROM employees\nWHERE department_id = 10 AND salary > 135000\nORDER BY salary DESC;"
  },
  {
    id: 'ent-2',
    database: 'enterprise',
    difficulty: 'Easy',
    category: 'Aggregation',
    title: 'Department Average Salary',
    description: 'Show department_id, count of employees, and the average salary rounded to whole number.',
    hint: 'Use COUNT(*) and ROUND(AVG(salary)) GROUP BY department_id.',
    starterSql: "SELECT department_id, COUNT(*) AS emp_count, ROUND(AVG(salary)) AS avg_salary\nFROM employees\nGROUP BY department_id;",
    solutionSql: "SELECT department_id, COUNT(*) AS emp_count, ROUND(AVG(salary)) AS avg_salary\nFROM employees\nGROUP BY department_id;"
  },

  // Enterprise Questions - Medium
  {
    id: 'ent-3',
    database: 'enterprise',
    difficulty: 'Medium',
    category: 'Subqueries',
    title: 'Employees Earning Above Department Average',
    description: 'Find all employees who earn more than the average salary of their respective department.',
    hint: 'Use a correlated subquery in WHERE: salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id).',
    starterSql: "SELECT e1.first_name, e1.last_name, e1.salary, e1.department_id\nFROM employees e1\nWHERE e1.salary > (\n  SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id\n);",
    solutionSql: "SELECT e1.first_name, e1.last_name, e1.salary, e1.department_id\nFROM employees e1\nWHERE e1.salary > (\n  SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id\n);"
  },
  {
    id: 'ent-4',
    database: 'enterprise',
    difficulty: 'Medium',
    category: 'Multi-table Joins',
    title: 'Project Hours Breakdown',
    description: 'Show project_name, employee first_name, and hours_allocated for all projects with a budget exceeding 150,000.',
    hint: 'JOIN projects with employee_projects on project_id, then JOIN employees on employee_id.',
    starterSql: "SELECT pr.project_name, e.first_name, ep.hours_allocated\nFROM projects pr\nJOIN employee_projects ep ON pr.project_id = ep.project_id\nJOIN employees e ON ep.employee_id = e.employee_id\nWHERE pr.budget > 150000\nORDER BY pr.project_name, ep.hours_allocated DESC;",
    solutionSql: "SELECT pr.project_name, e.first_name, ep.hours_allocated\nFROM projects pr\nJOIN employee_projects ep ON pr.project_id = ep.project_id\nJOIN employees e ON ep.employee_id = e.employee_id\nWHERE pr.budget > 150000\nORDER BY pr.project_name, ep.hours_allocated DESC;"
  },

  // Enterprise Questions - Hard (Real FAANG/Enterprise interview questions)
  {
    id: 'ent-5',
    database: 'enterprise',
    difficulty: 'Hard',
    category: 'Window Functions',
    title: 'Top Paid Employee per Department (Capgemini/Deloitte)',
    description: 'Find the highest paid employee(s) in each department using DENSE_RANK() or ROW_NUMBER(). Show department_name, employee first_name, and salary.',
    hint: 'Use a CTE or subquery with DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rnk, then filter WHERE rnk = 1.',
    starterSql: "WITH RankedSalaries AS (\n  SELECT d.department_name, e.first_name, e.salary,\n    DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.department_id\n)\nSELECT department_name, first_name, salary\nFROM RankedSalaries\nWHERE rnk = 1;",
    solutionSql: "WITH RankedSalaries AS (\n  SELECT d.department_name, e.first_name, e.salary,\n    DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.department_id\n)\nSELECT department_name, first_name, salary\nFROM RankedSalaries\nWHERE rnk = 1;"
  },
  {
    id: 'ent-6',
    database: 'enterprise',
    difficulty: 'Hard',
    category: 'Window Functions',
    title: 'Salary Difference to Next Senior Peer (Infosys/Accenture)',
    description: 'Use the LEAD() window function to calculate the salary difference between each employee and the next higher-paid employee within their department.',
    hint: 'LEAD(salary) OVER (PARTITION BY department_id ORDER BY salary ASC) - salary AS salary_diff.',
    starterSql: "SELECT department_id, first_name, salary,\n  LEAD(salary) OVER (PARTITION BY department_id ORDER BY salary ASC) - salary AS salary_gap_to_next\nFROM employees\nORDER BY department_id, salary ASC;",
    solutionSql: "SELECT department_id, first_name, salary,\n  LEAD(salary) OVER (PARTITION BY department_id ORDER BY salary ASC) - salary AS salary_gap_to_next\nFROM employees\nORDER BY department_id, salary ASC;"
  }
];
