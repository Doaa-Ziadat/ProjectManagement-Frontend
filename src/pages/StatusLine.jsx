import "../style/statusLine.scss";
import Task from "./Task";

export default function StatusLine(props) {
  const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props;
  let taskList, tasksForStatus;

  function handleAddEmpty() {
    addEmptyTask(status);
  }

  console.log(tasks);

  if (tasks) {
    console.log("task not empty");
    tasksForStatus = tasks.filter((task) => {
      return task.processlabel === status;
    });
  }

  console.log(tasksForStatus);
  if (tasksForStatus) {
    console.log(tasksForStatus);
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
        />
      );
    });
  }

  console.log(taskList);

  return (
    <div className="statusLine">
      <h3>{status}</h3>
      {taskList}
      {status === "To Do" ? (
        <button onClick={handleAddEmpty} className="button addTask">
          +
        </button>
      ) : null}
    </div>
  );
}
