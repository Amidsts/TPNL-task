import { Router, Request, Response } from "express";
import { db } from "./config/databaseConfig";

const router = Router();

router.get("/add_doctors", (req: Request, res: Response) => {
  const { departmentId } = req.query;

  let doctorIds: string | string[] = req.query.doctorIds as string;
  doctorIds = doctorIds.split(",");

  if (doctorIds.length < 2)
    res.status(400).send({
      message: "at least two doctors are needed to be added to a department",
    });

  const sql = "INSERT INTO doctors_department SET ?";

  const data = doctorIds.forEach((id) => {
    db.query(sql, { id: 1, doctor_id: id, department_id: departmentId });
  });

  console.log("doctors department: ", data);
  return res
    .status(200)
    .send({ message: "doctors added to department successfully" });
});

router.get("/get_doctors", (req: Request, res: Response) => {
  const { department } = req.query;

  //find department by name
  const departmentSql = `SELECT * FROM department WHERE name = '${department}'`;

  const sql = "SELECT * FROM doctors_department WHERE name = 'Dr. Raji'";
});

export default router;
