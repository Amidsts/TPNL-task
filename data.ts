import { Router, Request, Response } from "express";

const router = Router();

export const doctorData = [
  { id: 0, name: "Dr. Curtis " },
  { id: 1, name: "Dr. Smith" },
  { id: 2, name: "Dr. Johnson" },
  { id: 3, name: "Dr. Ben " },
  { id: 4, name: "Dr. Frank" },
  { id: 5, name: "Dr. Joe" },
  { id: 6, name: "Dr. Sheldon" },
  { id: 7, name: "Dr. Raji" },
];

export const departmentData = [
  { id: 1, name: "OBGYN Department" },
  { id: 1, name: "Emergency Department" },
  { id: 2, name: "Cardiology Department" },
];

router.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

export default router;
