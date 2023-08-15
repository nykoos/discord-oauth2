import express from "express";
import { api_users_me_guilds, api_users_me } from "../utils/auth/api_requests";
import { check_session } from "../utils/auth/sessions";
const router = express.Router();

router.get("/guilds", async (req, res) => {
	/*
	Check the session and send back the guilds the user is in.
	 */
	try {
		const session = await check_session(req.cookies.sessionid);
		if (session === 500) {
			return res.status(session).send("Internal Server Error");
		} else if (session === undefined || session === 401) {
			return res.status(401).send("Unauthorized");
		}

		const guilds = await api_users_me_guilds(session.token);
		res.send(guilds);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error");
	}
});

router.get("/me", async (req, res) => {
	/*
	Check the session and send back the user's info.
	 */
	try {
		const session = await check_session(req.cookies.sessionid);
		if (session === 500) {
			return res.status(session).send("Internal Server Error");
		} else if (session === undefined || session === 401) {
			return res.status(401).send("Unauthorized");
		}

		const me = await api_users_me(session.token);
		res.send(me);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error");
	}
});

export default (): express.Router => {
	return router;
};
