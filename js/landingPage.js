/** @format */

const loggedInUserEmail = localStorage.getItem("loggedInUser");
const btnLogOut = document.getElementById("btnLogOut");
const dataBase = JSON.parse(localStorage.getItem("dataBaseContainer")) || [];

const user = dataBase.find((user) => user.email === loggedInUserEmail); // Make sure the key is 'email'

if (user) {
	const userNameElement = document.getElementById("userName");
	userNameElement.textContent = user.name; // Display the user's name
} else {
	window.location = "index.html";
}

function logOut() {
	window.location = "/index.html"; // Change to the correct login page if necessary
}

// Correct way to add event listener
btnLogOut.addEventListener("click", logOut);
