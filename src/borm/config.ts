import type { BormConfig } from "@blitznocode/blitz-orm";

export const bormConfig: BormConfig = {
	server: {
		provider: "blitz-orm-js",
	},
	dbConnectors: [
		{
			id: "default",
			provider: "typeDB",
			dbName: "blitz",
			url: "localhost:1729",
		},
	],
};
