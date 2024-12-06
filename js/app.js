/** @format */

document.addEventListener("DOMContentLoaded", () => {
	const nameInput = document.getElementById("name");
	const mailInput = document.getElementById("mail");
	const passwordInput = document.getElementById("password");
	const signUpBtn = document.getElementById("SignUp");

	const msgName = document.getElementById("msgName");
	const msgMail = document.getElementById("msgMail");
	const msgPassword = document.getElementById("msgPassword");

	const nameRegex = /^[a-zA-Z][a-zA-Z '-]{1,49}$/;
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	// Validate Name
	function validateName() {
		const name = nameInput.value.trim();
		if (nameRegex.test(name)) {
			addValidClass(nameInput, msgName);
			return true;
		} else {
			addInvalidClass(nameInput, msgName, "Invalid Name");
			return false;
		}
	}

	// Validate Email
	function validateEmail() {
		const email = mailInput.value.trim();
		if (emailRegex.test(email)) {
			addValidClass(mailInput, msgMail);
			return true;
		} else {
			addInvalidClass(mailInput, msgMail, "Invalid Email");
			return false;
		}
	}

	// Validate Password
	function validatePassword() {
		const password = passwordInput.value.trim();
		if (passwordRegex.test(password)) {
			addValidClass(passwordInput, msgPassword);
			return true;
		} else {
			addInvalidClass(
				passwordInput,
				msgPassword,
				"Password must be 8+ characters, with an uppercase letter, lowercase letter, number, and symbol."
			);
			return false;
		}
	}

	// Add valid class and hide error message
	function addValidClass(input, msg) {
		input.classList.remove("is-invalid");
		input.classList.add("is-valid");
		msg.classList.add("d-none");
	}

	// Add invalid class and show error message
	function addInvalidClass(input, msg, errorMessage) {
		input.classList.remove("is-valid");
		input.classList.add("is-invalid");
		msg.textContent = errorMessage;
		msg.classList.remove("d-none");
	}

	// Overall validation
	function validation() {
		const isNameValid = validateName();
		const isEmailValid = validateEmail();
		const isPasswordValid = validatePassword();
		return isNameValid && isEmailValid && isPasswordValid;
	}

	// Sign-Up Logic
	function signUp() {
		if (!validation()) {
			console.log("Validation failed");
			return;
		}
	
		// Corrected the typo in the key name: 'dataBaseContainer'
		const dataBase = JSON.parse(localStorage.getItem("dataBaseContainer")) || [];
	
		const users = {
			name: nameInput.value.trim(),
			email: mailInput.value.trim(),  // Consistently use 'email' here
			password: passwordInput.value.trim(),
		};
	
		dataBase.push(users);
		localStorage.setItem("dataBaseContainer", JSON.stringify(dataBase));
	
		msgName.textContent = "Signed up successfully!";
		msgName.classList.remove("d-none");
	
		setTimeout(() => {
			window.location.href = "index.html"; // Redirect after success
		}, 500);
	
		clearForm();
	}
	
	// Clear Form
	function clearForm() {
		nameInput.value = "";
		mailInput.value = "";
		passwordInput.value = "";

		nameInput.classList.remove("is-valid", "is-invalid");
		mailInput.classList.remove("is-valid", "is-invalid");
		passwordInput.classList.remove("is-valid", "is-invalid");

		msgName.classList.add("d-none");
		msgMail.classList.add("d-none");
		msgPassword.classList.add("d-none");
	}

	// Event Listeners
	nameInput.addEventListener("input", validateName);
	mailInput.addEventListener("input", validateEmail);
	passwordInput.addEventListener("input", validatePassword);
	signUpBtn.addEventListener("click", signUp);
});
