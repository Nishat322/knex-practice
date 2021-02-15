/* Adds Marketing as a department name, dow not have an associated manager id */
/*INSERT INTO department (dept_name) VALUES ('Marketing');*/

/* Shows the recently added department with no value in the manager column */
SELECT 
    d.id,
    d.dept_name,
    d.manager
FROM department d;

/* Lists all departments and their manager names
    - Does not display the recently added department because there is no manager
 */
SELECT  
    d.id,
    d.dept_name as department,
    e.emp_name as Manager_Name
FROM department d JOIN employee e ON d.manager = e.id;

/* Same result as above
    - JOIN is the default of INNER JOIN (same thing)
*/
SELECT  
    d.id,
    d.dept_name as department,
    e.emp_name as Manager_Name
FROM department d INNER JOIN employee e ON d.manager = e.id;

/* Lists the names, salaries, and department of all employees 
    - Matches all rows in the employee table to rows in the department table id foreign key
*/
SELECT 
    e.emp_name as Full_Name,
    e.salary as Salary,
    d.dept_name as department
FROM employee e INNER JOIN department d ON e.department = d.id;

/* Lists the employee name and project name that the employee is assigned to
    - this query joins three tables because the employee table is related to the employee_project table which is then related to the
        project table
*/
SELECT 
    e.emp_name as Full_Name,
    p.project_name as project
FROM employee e 
    JOIN employee_project ep 
    ON e.id = ep.emp_id 
    JOIN project p 
    ON ep.project_id = p.id;

/* Lists all the departments and their managers using a LEFT JOIN
    - brings back all the rows one the LEFT side of a JOIN even if it dows not match the rows on the right
    - lists all departments a leaves a blank in the manager space if there is no match
*/
SELECT 
    d.id, 
    d.dept_name as department,
    e.emp_name as Manager_Name
FROM department d 
    LEFT JOIN employee e 
    ON d.manager = e.id;
/* Lists all the employee names and the departments they manage using a RIGHT JOIN
    - brings back all the row on the RIGHT side of the JOIN even if it does not match the rows on the left
    - lists all employee names and leaves a blank for the department if there is no match
*/
SELECT
    e.emp_name as Manager_Name,
    d.dept_name as Department
FROM department d 
    RIGHT JOIN employee e 
    ON d.manager = e.id;




