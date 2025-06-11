const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;

const showTask = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    const {
      data: { task },
    } = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        "x-auth-token": token, // Include the token in the request header
      },
    }); // Use dynamic BASE_URL

    const { _id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `Error fetching task details`;
    formAlertDOM.classList.add("text-danger");
  }
};

showTask();

editFormDOM.addEventListener("submit", async (e) => {
  editBtnDOM.textContent = "Loading...";
  e.preventDefault();
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;

    const {
      data: { task },
    } = await axios.patch(
      `${BASE_URL}/${id}`,
      {
        name: taskName,
        completed: taskCompleted,
      },
      {
        headers: {
          "x-auth-token": token, // Include the token in the request header
        },
      }
    ); // Use dynamic BASE_URL

    const { _id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `Success, edited task`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.error(error);
    taskNameDOM.value = tempName;
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `Error, please try again`;
  }
  editBtnDOM.textContent = "Edit";
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
