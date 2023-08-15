import express from "express";

const router = express.Router();

module.exports = router;

router.get("/", (req, res) => {
	res.json({ details: "The API is online!" });
});

export default (): express.Router => {
	return router;
};
