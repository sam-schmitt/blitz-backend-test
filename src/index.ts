import bormClient from "./borm/client.ts";

async function getParenthoods() {
	const res = await bormClient.query({ $relation: "Parenthood" });
	return res;
}

const addDadToAllParenthoods = async (dadId: string) => {
	const res = await bormClient.mutate([
		// add a new dad to all parenthoods
		{
			$relation: "Parenthood",
		},
		// remove the old dad from parenthoods that have two dads
		{
			$relation: "Parenthood",
		},
	]);

	return res;
};

async function test() {
	try {
		// 1. Show Parenthoods before mutation
		console.log("Getting parenthoods...");
		let parenthoods = await getParenthoods();
		console.log("Parenthoods: ", parenthoods);

		// 2. Perform mutation to add a dad to all parenthoods
		console.log("Adding global dad...");
		let writtenDads = await addDadToAllParenthoods("dad-to-add");
		console.log("Written dads: ", writtenDads);

		// 3. Show Parenthoods after mutation
		console.log("Getting new parenthoods...");
		parenthoods = await getParenthoods();
		return "Finished";
	} catch (e: any) {
		return e;
	}
}

test().then((res) => {
	console.log(res);
});
