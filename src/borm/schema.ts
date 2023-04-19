import { v4 as uuidv4 } from "uuid";

import type { BormSchema, DataField } from "@blitznocode/blitz-orm";

export const name: DataField = {
	shared: true,
	path: "name",
	cardinality: "ONE",
	contentType: "TEXT",
};

export const description: DataField = {
	shared: true,
	path: "description",
	contentType: "TEXT",
	cardinality: "ONE",
};

export const string: Omit<DataField, "path"> = {
	cardinality: "ONE",
	contentType: "TEXT",
};

export const id: DataField = {
	shared: true,
	path: "id",
	cardinality: "ONE",
	default: { type: "function", value: () => uuidv4() },
	validations: { required: true, unique: true },
	contentType: "ID",
	rights: ["CREATE"],
};

export const schema: BormSchema = {
	entities: {
		User: {
			idFields: ["id"], // could be a namecomposite key
			defaultDBConnector: { id: "default" }, // in the future multiple can be specified in the config file. Either they fetch full schemas or they will require a relation to merge attributes from different databases
			dataFields: [{ ...id }, { ...name, rights: ["CREATE", "UPDATE"] }],
			linkFields: [
				{
					path: "parenthoods",
					relation: "Parenthood",
					cardinality: "MANY",
					plays: "parent",
					target: "role",
				},
				{
					path: "parenthoods",
					relation: "Parenthood",
					cardinality: "MANY",
					plays: "child",
					target: "role",
				},
			],
		},
	},
	relations: {
		Parenthood: {
			idFields: ["id"],
			defaultDBConnector: { id: "default", path: "Parenthood" },
			// defaultDBConnector: { id: 'tdb', path: 'User·Account' }, //todo: when Dbpath != relation name
			dataFields: [{ ...id }],
			roles: {
				parent: {
					cardinality: "ONE",
				},
				child: {
					cardinality: "ONE",
				},
			},
		},
	},
};
