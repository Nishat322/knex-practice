/*How many people work in Sales?*/
SELECT
  COUNT(dept_name) 
FROM employee e
  INNER JOIN department d
  ON e.department = d.id
WHERE
  d.dept_name = 'Sales';

/* List the names of all emloyees assigned to the 'Plan Christmas party' project */
SELECT 
    e.emp_name as Full_Name,
    p.project_name as project
FROM employee e 
    JOIN employee_project ep 
    ON e.id = ep.emp_id 
    JOIN project p 
    ON ep.project_id = p.id
WHERE p.project_name = 'Plan Christmas party';

/*List the names of employees from the Warehouse department that are assigned to the 'Watch paint dry' project */
SELECT 
    e.emp_name as Full_Name,
    d.dept_name as Department,
    p.project_name
FROM department d
    JOIN employee e 
    ON e.department = d.id
    JOIN employee_project ep
    ON e.id = ep.emp_id
    JOIN project p
    ON ep.project_id = p.id
WHERE d.dept_name = 'Warehouse' AND p.project_name = 'Watch paint dry';

/* Which projects are the Sales department employees assigned to? */
SELECT 
    e.emp_name as Full_Name,
    d.dept_name as Department,
    p.project_name
FROM department d 
    JOIN employee e
    ON e.department = d.id 
    JOIN employee_project ep 
    ON e.id = ep.emp_id 
    JOIN project p 
    ON ep.project_id = p.id 
WHERE d.dept_name = 'Sales';

/* List only the managers that are assigned to the 'Watch paint dry' project*/
SELECT 
    e.emp_name as Full_Name,
    p.project_name 
FROM department d 
    JOIN employee e
    ON d.manager = e.id 
    JOIN employee_project ep
    ON e.id = ep.emp_id
    JOIN project p 
    ON ep.project_id = p.id
WHERE p.project_name = 'Watch paint dry';



