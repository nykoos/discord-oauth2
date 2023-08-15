import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ details: "The API is online!" });
});

export default router;