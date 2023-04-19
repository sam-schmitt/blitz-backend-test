import bormClient from "./borm/client.ts";

async function getUsers() {
	const res = await bormClient.query({ $entity: "User" });
	return res;
}

async function getUser({ name }: { name: string }) {
	const res = await bormClient.query({
		$entity: "User",
		$filter: {
			name,
		},
	});
	return res;
}

async function createUser({ name }: { name: string }) {
	const res = await bormClient.mutate({
		$entity: "User",
		name,
	});
	return res;
}

async function test() {
	console.log("Getting users...");
	let users = await getUsers();
	console.log("Users: ", users);
	console.log("Getting Sam...");
	let user = await getUser({ name: "Samuel Schmitt" });
	console.log("User: ", user);
}

test().then((res) => {
	console.log("Test Complete");
});
