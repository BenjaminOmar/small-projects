// getCustomer(1, (customer) => {
// 	console.log("Customer: ", customer);
// 	if (customer.isGold) {
// 		getTopMovies((movies) => {
// 			console.log("Top movies: ", movies);
// 			sendEmail(customer.email, movies, () => {
// 				console.log("Email sent...");
// 			});
// 		});
// 	}
// });

async function sendFavMovies() {
	try {
		const customer = await getCustomer(1);
		if (customer.isGold) {
			console.log("Customer: " + customer.name);
			const topMovies = await getTopMovies();
			console.log("Top movies: " + topMovies);
			await sendEmail(customer.email, topMovies);
			console.log("movies are sent...");
		}
	} catch (err) {
		console.log("Error", err.message);
	}
}

sendFavMovies();

function getCustomer(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				id: 1,
				name: "Mosh Hamedani",
				isGold: true,
				email: "email",
			});
		}, 4000);
	});
}

function getTopMovies() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(["movie1", "movie2"]);
		}, 4000);
	});
}

function sendEmail(email, movies) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, 4000);
	});
}
