document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const email = document.querySelector("#email");
    const confirmEmail = document.querySelector("#cnf-email");
    const password = document.querySelector("#psw");
    const confirmPassword = document.querySelector("#cnf-psw");
    const phoneNumber = document.querySelector("#phoneNumber");
    const confirmPhoneNumber = document.querySelector("#confirmPhoneNumber");
    const smsOptInCheckbox = document.querySelector("#sms-opt-in-cb");
    const smsForm = document.querySelector("#smsForm");

    // Clear all error messages
    const clearErrors = () => {
        document.querySelectorAll(".error-message").forEach(error => error.remove());
    };

    // Show error message under the field
    const showError = (input, message) => {
        const error = document.createElement("div");
        error.className = "error-message";
        error.style.color = "red";
        error.style.fontSize = "0.9rem";
        error.textContent = message;
        input.parentElement.appendChild(error);
    };

    // Toggle SMS form visibility
    smsOptInCheckbox.addEventListener("change", () => {
        smsForm.style.display = smsOptInCheckbox.checked ? "block" : "none";
    });

    // Validate form on submit
    form.addEventListener("submit", (e) => {
        clearErrors(); // Clear previous errors
        let isValid = true;

        // Email validation
        if (email.value !== confirmEmail.value) {
            isValid = false;
            showError(confirmEmail, "Emails do not match.");
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password.value)) {
            isValid = false;
            showError(password, "Password must be at least 8 characters and include 1 letter, 1 number, and 1 special character.");
        }
        if (password.value !== confirmPassword.value) {
            isValid = false;
            showError(confirmPassword, "Passwords do not match.");
        }

        // Phone number validation (if opted in)
        if (smsOptInCheckbox.checked) {
            if (phoneNumber.value !== confirmPhoneNumber.value) {
                isValid = false;
                showError(confirmPhoneNumber, "Phone numbers do not match.");
            }
        }

        if (!isValid) {
            e.preventDefault(); // Prevent form submission if validation fails
        }
    });
});
