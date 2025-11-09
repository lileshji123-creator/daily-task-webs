const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const taskList = document.getElementById("taskList");
const dateTime = document.getElementById("dateTime");

// ⏰ Live date-time display
setInterval(() => {
  const now = new Date();
  dateTime.textContent = now.toLocaleString();
}, 1000);

// 🧾 Add task
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;

  if (taskText === "") return alert("Please enter a task!");

  const li = document.createElement("li");
  const today = new Date();
  const dueDate = new Date(taskDate);
  const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

  // 🎨 Set color category
  if (!taskDate) li.classList.add("later");
  else if (diffDays <= 0) li.classList.add("today");
  else if (diffDays === 1) li.classList.add("tomorrow");
  else li.classList.add("later");

  li.innerHTML = `
    <span>${taskText} <br><small>${taskDate || "No date"}</small></span>
    <div>
      <button class="complete-btn">✓</button>
      <button class="delete-btn">X</button>
    </div>
  `;

  li.querySelector(".delete-btn").addEventListener("click", () => li.remove());
  li.querySelector(".complete-btn").addEventListener("click", () => li.classList.toggle("done"));

  taskList.appendChild(li);
  taskInput.value = "";
  dateInput.value = "";
}
