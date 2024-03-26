import express from "express";
import task from "./task";
import mysql from "mysql";
import { appConfig } from "./config";

const app = express();

const connection = mysql.createConnection({
  host: appConfig.dbUri,
  user: "admin",
  password: "Kolapoishola123",
  database: "TEST1",
});

connection.connect((err: any) => {
  if (err) throw err;
  console.log("Connected to database!");
});

app.use("/", task);

app.listen("4000", () => {
  console.log("server connected");
});
