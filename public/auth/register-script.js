document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registration-form");
  const passwordToggle = document.getElementById("password-toggle");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("submit-btn");
  const loadingSpinner = document.getElementById("loading-spinner");
  const btnText = submitBtn.querySelector(".btn-text");

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

  // Form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const url = `${BASE_URL.replace("/tasks", "/users/register")}`;
    console.log("Request URL:", url); // Debugging

    try {
      const response = await axios.post(url, { name, email, password });
      console.log("Response:", response); // Debugging

      alert("Account created successfully! Welcome, " + response.data.user.name);
      form.reset();
      window.location.href = "login.html"; // Redirect to login page
    } catch (error) {
      console.error("Error:", error); // Debugging
      alert(error.response?.data?.msg || "Registration failed. Please try again.");
    }
  });
});
