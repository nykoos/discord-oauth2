import axios from "axios";
import { env } from "../other/env";

const API_ENDPOINT = "https://discord.com/api";

const api_get_token = async (code: string) => {
	const body = new URLSearchParams({
		client_id: env.CLIENT_ID,
		client_secret: env.CLIENT_SECRET,
		grant_type: "authorization_code",
		code: code,
		redirect_uri: env.REDIRECT_URI,
	});

	try {
		const response = await axios.post(
			API_ENDPOINT + "/oauth2/token",
			body.toString(),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);
		const responseData = response.data;
		return responseData;
	} catch (err: any) {
		new Error(err);
	}
};

const api_refresh_token = async (refresh_token: string) => {
	var body = new URLSearchParams({
		client_id: env.CLIENT_ID,
		client_secret: env.CLIENT_SECRET,
		grant_type: "refresh_token",
		refresh_token: refresh_token,
	});

	try {
		const response = await axios.post(
			API_ENDPOINT + "/oauth2/token",
			body.toString(),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);
		const responseData = response.data;
		return responseData;
	} catch (err: any) {
		return err.response.data;
	}
};

const api_revoke_token = async (token: string) => {
	const body = new URLSearchParams({
		client_id: env.CLIENT_ID,
		client_secret: env.CLIENT_SECRET,
		grant_type: "token",
		token: token,
	});

	try {
		const response = await axios.post(
			API_ENDPOINT + "/oauth2/token/revoke",
			body.toString(),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);
		return response.status;
	} catch (err: any) {
		return err.response.data;
	}
};

const api_users_me = async (token: any) => {
	try {
		const response = await axios.get(API_ENDPOINT + "/users/@me", {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		const responseData = response.data;
		return responseData;
	} catch (err: any) {
		if (err.response.status == 401) {
			return 401;
		}
		return err.response.data;
	}
};

const api_users_me_guilds = async (token: any) => {
	try {
		const response = await axios.get(API_ENDPOINT + "/users/@me/guilds", {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		const responseData = response.data;
		return responseData;
	} catch (err: any) {
		if (err.response.status == 401) {
			return 401;
		}
		return err.response.data;
	}
};

export {
	api_users_me,
	api_users_me_guilds,
	api_get_token,
	api_refresh_token,
	api_revoke_token,
};
