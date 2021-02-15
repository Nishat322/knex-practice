/*Inqueries to get data from the table*/

/* Selects all data from the department table
    - Returns id, dept_name and manager columns
    - manager column just contains number refrencing the id to another table
*/

SELECT * FROM department;

/* Selects all columns in the tables department and employee
    - results align the the data using the manager column in department and id column in employee
*/
SELECT *
FROM department JOIN employee ON department.manager = employee.id;

/*Selects specific columns from each table
    - specifies the column name using the format table.column_name
*/

SELECT 
    department.id,
    department.dept_name,
    employee.emp_name,
    employee.phone,
    employee.title,
    employee.salary
FROM department JOIN employee ON department.manager = employee.id;

/*Does the same as above but the number of keystroke is less
    - the key is defined in the FROM but can be used and is used in the SELECT
*/

SELECT
    d.id,
    d.dept_name,
    e.emp_name,
    e.phone,
    e.title,
    e.salary
FROM department d JOIN employee e ON d.manager = e.id;

/* Also the same query as above but with aliases for some of the columns
    - When results are displayed it will show the alias as the column name.
*/
SELECT 
    d.id as department_id,
    d.dept_name as department,
    e.emp_name as Full_Name,
    e.phone,
    e.title,
    e.salary
FROM department d JOIN employee e ON d.manager = e.id;



