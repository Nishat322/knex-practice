ALTER TABLE IF EXISTS department
    DROP COLUMN manager;

DROP TABLE IF EXISTS employee_project;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;

CREATE TABLE project(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    project_name TEXT NOT NULL,
    budget NUMERIC DEFAULT 0,
    start_date DATE
);

CREATE TABLE department(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    dept_name TEXT NOT NULL
);

CREATE TABLE employee(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    emp_name TEXT NOT NULL,
    phone TEXT,
    title TEXT,
    salary NUMERIC,
    department INTEGER REFERENCES department(id)
);

ALTER TABLE department
    ADD COLUMN manager INTEGER REFERENCES employee(id);

CREATE TABLE employee_project(
    emp_id INTEGER REFERENCES employee(id),
    project_id INTEGER REFERENCES project(id),
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (emp_id, project_id)
);
