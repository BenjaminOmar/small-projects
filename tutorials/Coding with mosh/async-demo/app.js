console.log("before");
getUser(1, (user) => {
	console.log("User", user);

	getRepositories(user.gitHubUsername, (repo) => {
		console.log("repoes", repo);
	});
});
console.log("after");

function getUser(id, callback) {
	setTimeout(() => {
		console.log("Reading user from a database...");
		callback({ id: id, gitHubUsername: "mosh" });
	}, 2000);
}

function getRepositories(_username, callback) {
	setTimeout(() => {
		callback(["repo1", "repo2", "repo3"]);
	}, 2000);
}
