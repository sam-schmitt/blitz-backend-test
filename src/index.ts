import bormClient from "./borm/client.ts";

type User = {
	name: string;
};

async function getUsers() {
	const res = await bormClient.query({ $entity: "User" });
	return res;
}

async function getParenthoods() {
	const res = await bormClient.query({ $relation: "Parenthood" });
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

async function createParenthood({
	parent,
	child,
}: {
	parent: any;
	child: any;
}) {
	const res = await bormClient.mutate({
		$relation: "Parenthood",
		parent: parent.id,
		child: child.id,
	});
	return res;
}

async function createParentThenChildren({
	parent,
	children,
}: {
	parent: User;
	children: User[];
}) {
	const createdParent = await createUser(parent);
	for (let child of children) {
		const createdChild = await createUser(child);
		await createParenthood({ parent: createdParent, child: createdChild });
	}
}

async function test() {
	try {
		console.log("Getting users...");
		let users = await getUsers();
		console.log("Users: ", users);
		console.log("Getting Sam...");
		let user = await getUser({ name: "Samuel Schmitt" });
		console.log("User: ", user);

		// trying to test creating parents and their children while creating their relations
		const parent = { name: "Parent Test" };
		const children = [{ name: "Child 1 test" }, { name: "Child 2 test" }];
		await createParentThenChildren({ parent, children });
		users = await getUsers();
		console.log("Users: ", users);
		let parenthoods = await getParenthoods();
		console.log("parenthoods: ", parenthoods);
		return "Finished";
	} catch (e: any) {
		return e;
	}
}

test().then((res) => {
	console.log(res);
});
