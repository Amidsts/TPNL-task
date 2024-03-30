import mysql from "mysql";
import { departmentData, doctorData } from "../data";

// const config = {
//   host: appConfig.dbUri,
//   user: "admin",
//   password: "Kolapoishola123",
//   database: "TEST1",
// };

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodemysql",
});

export const configureDb = () => {
  const sql = "CREATE DATABASE IF NOT EXISTS nodemysql";

  db.query(sql, (err, _result) => {
    if (err) throw err;
  });

  const departmentTable = `
    CREATE TABLE IF NOT EXISTS department (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

  db.query(departmentTable, (err, _result) => {
    if (err) throw err;~
  });

  const doctorTable = `
    CREATE TABLE IF NOT EXISTS doctor (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

  db.query(doctorTable, (err, _result) => {
    if (err) throw err;
  });

  const doctorsDepartment = `
    CREATE TABLE IF NOT EXISTS doctors_department (
      id INT AUTO_INCREMENT PRIMARY KEY,
      doctor_id INT, department_id INT
      FOREIGN KEY (doctor_id) REFERENCES doctor(id),
      FOREIGN KEY (department_id) REFERENCES department(id)
    )
  `;

  db.query(doctorsDepartment, (err, _result) => {
    if (err) throw err;
  });
};

export const loadData = () => {
  const departmentSql = "INSERT INTO department (id, name) VALUES (?, ?)";
  departmentData.forEach((department) =>
    db.query(departmentSql, [department.id, department.name], (error, data) => {
      if (error) {
        throw error;
      }

      return data;
    })
  );

  const doctorSql = "INSERT INTO doctor (id, name) VALUES (?, ?)";
  doctorData.forEach((doctor) =>
    db.query(doctorSql, [doctor.id, doctor.name], (error, data) => {
      if (error) {
        throw error;
      }

      return data;
    })
  );
};
