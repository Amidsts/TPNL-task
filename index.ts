import express, { NextFunction, Request, Response } from "express";
import task, { departmentData, doctorData } from "./data";
import mysql from "mysql";
import { appConfig } from "./config";

const app = express();

// const config = {
//   host: appConfig.dbUri,
//   user: "admin",
//   password: "Kolapoishola123",
//   database: "TEST1",
// };

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodemysql",
});

db.connect((err: any) => {
  if (err) throw err;
  console.log("Connected to database!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const sql = "CREATE DATABASE IF NOT EXISTS nodemysqll";

  db.query(sql, (err, result) => {
    if (err) throw err;
  });

  const departmentTable = `
    CREATE TABLE IF NOT EXISTS department (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

  db.query(departmentTable, (err, result) => {
    if (err) throw err;
  });

  const doctorTable = `
    CREATE TABLE IF NOT EXISTS doctor (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

  db.query(doctorTable, (err, result) => {
    if (err) throw err;
  });

  next();
});

app.get("/add_departments", (req: Request, res: Response) => {
  const departmentSql = "INSERT INTO department (id, name) VALUES (?, ?)";
  const values = departmentData.map((department) => [
    department.id,
    department.name,
  ]);

  db.query(departmentSql, [values], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error inserting data", details: error });
    }
    res
      .status(201)
      .json({ message: "Department Data inserted successfully", results });
  });
});

app.get("/add_doctors", (req: Request, res: Response) => {
  const doctorSql = "INSERT INTO doctor (id, name) VALUES (?, ?)";
  const values = doctorData;

  db.query(doctorSql, [values], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error inserting data", details: error });
    }
    res
      .status(201)
      .json({ message: "Doctor Data inserted successfully", results });
  });
});

app.listen("4000", () => {
  console.log("server connected");
});
