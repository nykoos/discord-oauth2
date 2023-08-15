import express from "express";
import {
	api_get_token,
	api_users_me,
	api_revoke_token,
} from "../utils/auth/api_requests";
import { prisma } from "../index";
import { check_session } from "../utils/auth/sessions";

const router = express.Router();

module.exports = router;

router.get("/login", (req, res) => {
	res.json({
		details:
			"https://discord.com/api/oauth2/authorize?client_id=1134976739064430732&redirect_uri=http%3A%2F%2Flocalhost%3A4511%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds",
	});
});

router.get("/callback", async (req, res) => {
	/*
	The Callback URL is the URL that the user is redirected to after they have authorized throug the Discord OAuth2 page.
	Here we check if the user has a code query parameter in the URL, if not we send a 401 Unauthorized response.
	We add the session to the database and the user cookies if the user is not already in the database.
	If the user is already in the database we update the token and refresh_token if they have changed.
	 */
	try {
		if (!req.query.code) {
			res.status(401).send("Unauthorized");
			return;
		}
		const code = req.query.code.toString();

		const token_response = await api_get_token(code).catch((err) => {
			res.status(401).send("Unauthorized");
			return;
		});

		const accessToken: string = token_response["access_token"];
		const refreshToken: string = token_response["refresh_token"];
		const expiresIn: number = token_response["expires_in"];

		const user = await api_users_me(accessToken).catch((err) => {
			console.log(err);
			res.status(500).send("Internal Server Error");
			return;
		});

		const token_expiry_mscnds = Date.now() + expiresIn * 1000;
		const expiryDate = new Date(token_expiry_mscnds);

		const check_db_entry = await prisma.sessions
			.findFirst({
				where: {
					user_id: user.id,
				},
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send("Internal Server Error");
				return;
			});

		let db_entry;

		if (check_db_entry !== undefined && check_db_entry !== null) {
			if (
				check_db_entry.token !== accessToken ||
				check_db_entry.refresh_token !== refreshToken
			) {
				db_entry = await prisma.sessions.update({
					where: {
						session_id: check_db_entry.session_id,
					},
					data: {
						token: accessToken,
						refresh_token: refreshToken,
						token_expiry: expiryDate,
					},
				});
			} else {
				db_entry = check_db_entry;
			}
		} else {
			db_entry = await prisma.sessions
				.create({
					data: {
						token: accessToken,
						refresh_token: refreshToken,
						token_expiry: expiryDate,
						user_id: user.id,
					},
				})
				.catch((err) => {
					console.log(err);
					res.status(500).send("Internal Server Error");
					return;
				});
		}

		const session_id = db_entry?.session_id;

		if (!req.cookies.sessionid) {
			res.cookie("sessionid", session_id, { httpOnly: true });
		}

		res.redirect("http://localhost:4511/infos/guilds");
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error");
		return;
	}
});

router.get("/logout", async (req, res) => {
	try {
		const session = await check_session(req.cookies.sessionid);
		if (session === 500) {
			return res.status(session).send("Internal Server Error");
		} else if (session === undefined || session === 401) {
			if (req.cookies.sessionid) {
				res.clearCookie("sessionid");
			}
			return res.status(401).send("Unauthorized");
		}

		const token_status = await api_revoke_token(session.token);
		if (token_status === 200) {
			res.clearCookie("sessionid");
			await prisma.sessions.delete({
				where: {
					session_id: session.session_id,
				},
			});
			res.status(200).send("Logged out and deleted all session data");
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error");
	}
});

export default (): express.Router => {
	return router;
};
