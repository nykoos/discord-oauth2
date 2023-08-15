import dotenv from "dotenv";

dotenv.config();

interface ENV {
	CLIENT_ID: string | undefined;
	CLIENT_SECRET: string | undefined;
	REDIRECT_URI: string | undefined;
}

interface Output {
	CLIENT_ID: string;
	CLIENT_SECRET: string;
	REDIRECT_URI: string;
}

const getEnv = (): ENV => {
	return {
		CLIENT_ID: process.env.CLIENT_ID,
		CLIENT_SECRET: process.env.CLIENT_SECRET,
		REDIRECT_URI: process.env.REDIRECT_URI,
	};
};

const getCleanEnv = (envdata: ENV): Output => {
	for (const [key, value] of Object.entries(envdata)) {
		if (value === undefined) {
			throw new Error(`You have to set ${key} in your .env file!`);
		}
	}
	return envdata as Output;
};

const config = getEnv();

const cleanEnv = getCleanEnv(config);

export { cleanEnv as env };
