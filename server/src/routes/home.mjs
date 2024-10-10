import { Router } from "express";

const router = Router();

router.get("/api", async (req, res) => {
  if (req.user) {
    console.log("User found:", req.user); // Log user information to the server
    res.status(200).json({ msg: "User found", success: true });
  } else {
    console.log("Visitor"); // Log visitor status to the server
    res.status(200).json({ msg: "Visitor found", success: false });
  }
});

export default router;
