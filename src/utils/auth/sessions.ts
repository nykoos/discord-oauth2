import { prisma } from "../../index";
import { api_refresh_token, api_users_me } from "./api_requests";

const check_session = async (session_id: string | undefined) => {
	if (session_id === undefined) {
		return 401;
	}

	try {
		const data = await prisma.sessions.findFirst({
			where: {
				session_id: session_id,
			},
		});

		if (data === null) {
			return 500;
		}

		const me = await api_users_me(data.token);

		if (me === 401) {
			const refresh = await api_refresh_token(data.refresh_token);
			if (refresh.error == "invalid_grant") {
				return 401;
			}
			if (refresh !== undefined || refresh !== null) {
				const token_expiry_mscnds =
					Date.now() + refresh.expires_in * 1000;
				const expiryDate = new Date(token_expiry_mscnds);

				const refresh_data = await prisma.sessions.update({
					where: {
						session_id: session_id,
					},
					data: {
						token: refresh.access_token,
						refresh_token: refresh.refresh_token,
						token_expiry: expiryDate,
					},
				});

				return refresh_data;
			}
		}
		return data;
	} catch (err) {
		console.log(err);
		return 500;
	}
};

export { check_session };
