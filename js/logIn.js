/** @format */
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const errorMessage = document.getElementById("errorMessage");
const btnLogin = document.getElementById("loginButton");

const dataBase = JSON.parse(localStorage.getItem("dataBaseContainer")) || []; // Fixed typo in the key name

// Clear previous error messages when the user starts typing
emailInput.addEventListener("input", () => {
	errorMessage.classList.add("d-none");
});
passwordInput.addEventListener("input", () => {
	errorMessage.classList.add("d-none");
});

function logIn() {
	const email = emailInput.value.trim();
	const password = passwordInput.value.trim();

	if (!email || !password) {
		errorMessage.textContent = "Both fields are required.";
		errorMessage.classList.remove("d-none");
		return;
	}

	// Ensure that the correct keys are used (e.g., email and password)
	const user = dataBase.find(
		(user) => user.email === email && user.password === password // Use 'email' here for consistency
	);

	if (user) {
		// Store the logged-in user's email in localStorage
		localStorage.setItem("loggedInUser", email);
		errorMessage.classList.add("d-none");
		window.location = "landingPage.html"; // Redirect to the landing page
	} else {
		errorMessage.textContent = "Invalid email or password.";
		errorMessage.classList.remove("d-none");
	}
}

btnLogin.addEventListener("click", logIn);
