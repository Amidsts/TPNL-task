import express, { NextFunction, Request, Response } from "express";

import { configureDb, db, loadData } from "./config/databaseConfig";
import appRoutes from "./routes";

const app = express();

db.connect((err: any) => {
  if (err) throw err;
  console.log("Connected to database!");
});

app
  .use((req: Request, res: Response, next: NextFunction) => {
    configureDb();
    next();
  })
  .use((req: Request, res: Response, next: NextFunction) => {
    configureDb();
    next();
  })
  .use((req: Request, res: Response, next: NextFunction) => {
    loadData();
    next();
  });

app.use("/department", appRoutes);

app.listen("4000", () => {
  console.log("server connected");
});
