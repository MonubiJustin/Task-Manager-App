const loginForm = document.getElementById("login-form");
const formAlertDOM = document.querySelector(".form-alert");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    formAlertDOM.textContent = "Login successful!";
    formAlertDOM.classList.add("text-success");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } catch (error) {
    formAlertDOM.textContent = "Error: " + error.response.data.msg;
    formAlertDOM.classList.add("text-danger");
  }
});
