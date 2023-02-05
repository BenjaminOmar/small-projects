console.log("before");
// getUser(1, getUserRepos);
console.log("after");

// function getUserRepos(user) {
// 	getRepositories(user.gitHubUsername, getCommits);
// }

// function getCommits(repo) {
// 	getCommits(repo, displayCommits);
// }

// function displayCommits(commits) {
// 	console.log(commits);
// }

// using promises
// getUser(1)
// 	.then((user) => getRepositories(user.gitHubUsername))
// 	.then((repo) => getCommits(repo[0]))
// 	.then((commits) => console.log(commits))
// 	.catch((err) => console.log("error", err.message));

// async and await

async function displayCommits() {
	try {
		const user = await getUser(1);
		const reposetories = await getRepositories(user.gitHubUsername);
		const commits = await getCommits(reposetories[0]);
		console.log(commits);
	} catch (err) {
		console.log("Error", err.message);
	}
}

displayCommits();

function getUser(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Reading user from a database...");
			resolve({ id: id, gitHubUsername: "mosh" });
		}, 2000);
	});
}

function getRepositories(_username) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(["repo1", "repo2", "repo3"]);
		}, 2000);
	});
}
function getCommits(_repo) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Calling Github API...");
			resolve(["commit"]);
		}, 2000);
	});
}
