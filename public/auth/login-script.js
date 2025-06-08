document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  const passwordToggle = document.getElementById("password-toggle");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("submit-btn");
  const loadingSpinner = document.getElementById("loading-spinner");
  const btnText = submitBtn.querySelector(".btn-text");
  const forgotPasswordBtn = document.getElementById("forgot-password");

  // Password toggle functionality
  passwordToggle.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Update icon
    const eyeIcon = passwordToggle.querySelector(".eye-icon");
    if (type === "text") {
      eyeIcon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
    } else {
      eyeIcon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
    }
  });

  // Form validation
  function validateField(field, errorElementId, validationFn, errorMessage) {
    const errorElement = document.getElementById(errorElementId);
    const isValid = validationFn(field.value);

    if (!isValid) {
      field.classList.add("error");
      errorElement.textContent = errorMessage;
      errorElement.classList.add("show");
      return false;
    } else {
      field.classList.remove("error");
      errorElement.classList.remove("show");
      return true;
    }
  }

  // Real-time validation
  document.getElementById("email").addEventListener("input", function () {
    validateField(
      this,
      "email-error",
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Please enter a valid email"
    );
  });

  document.getElementById("password").addEventListener("input", function () {
    validateField(
      this,
      "password-error",
      (value) => value.length > 0,
      "Password is required"
    );
  });

  // Forgot password functionality
  forgotPasswordBtn.addEventListener("click", function () {
    alert("Forgot Password functionality would be implemented here.");
  });

  // Form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await axios.post(
        `${BASE_URL.replace("/tasks", "/users/login")}`,
        { email, password }
      );

      alert("Login successful! Welcome back, " + response.data.user.name);
      localStorage.setItem("token", response.data.token);
      window.location.href = "../index.html";
    } catch (error) {
      alert(error.response.data.msg || "Login failed. Please try again.");
    }
  });
});
