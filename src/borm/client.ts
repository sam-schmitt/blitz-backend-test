import BormClient from "@blitznocode/blitz-orm";

import { bormConfig } from "./config";
import { schema } from "./schema";

const bormClient = new BormClient({
	schema,
	config: bormConfig,
});

export default bormClient;
