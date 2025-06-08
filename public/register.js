const registerForm = document.getElementById("register-form");
const formAlertDOM = document.querySelector(".form-alert");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const { data } = await axios.post(`${BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });
    formAlertDOM.textContent = "Registration successful!";
    formAlertDOM.classList.add("text-success");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } catch (error) {
    formAlertDOM.textContent = "Error: " + error.response.data.msg;
    formAlertDOM.classList.add("text-danger");
  }
});
