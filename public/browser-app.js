const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");



// Load tasks from /api/tasks
const showTasks = async () => {
  
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        "Authorization": `Bearer ${token}`, // Include the token in the request header
      },
    });

    const  tasks  = response.data.data;
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      return;
    }

    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task;
        return `<div class="single-task ${completed && "task-completed"}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">

<!-- edit link -->
<a href="task.html?id=${taskID}" class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`;
      })
      .join("");
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    console.log(error);
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

showTasks();

// Delete task /api/tasks/:id
tasksDOM.addEventListener("click", async (e) => {
  
  const token = localStorage.getItem("token");

  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}` // include the token in the request header
        }
      }); // Use dynamic BASE_URL
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// Form
formDOM.addEventListener("submit", async (e) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post(`${BASE_URL}`, { name }, {
      headers: {
        "Authorization": `Bearer ${token}` // include the token in the request header
      }
    }); // Use dynamic BASE_URL
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
