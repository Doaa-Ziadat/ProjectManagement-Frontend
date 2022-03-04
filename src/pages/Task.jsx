import "../style/task.scss";
import { useState } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

export default function Task(props) {
  const { addTask, deleteTask, moveTask, task } = props;

  const [urgencyLevel, setUrgencyLevel] = useState(task.priority);
  const [timeline, setTimeline] = useState(task.timeline);
  const [collapsed, setCollapsed] = useState(true); //false
  const [formAction, setFormAction] = useState("");

  function setUrgency(event) {
    setUrgencyLevel(event.target.attributes.urgency.value);
  }
  console.log("task in task", task);
  //   if (task) {
  //     setCollapsed = true;
  //   }
  function handleSubmit(event) {
    event.preventDefault();

    if (formAction === "save") {
      if (collapsed) {
        setCollapsed(false);
      } else {
        let newTask = {
          id: task.id,
          name: event.target.elements.title.value,
          description: event.target.elements.description.value,
          priority: urgencyLevel,
          processlabel: task.processlabel,
          timeline: timeline,
          isCollapsed: true,
        };

        addTask(newTask);
        setCollapsed(true);
      }
    }

    if (formAction === "delete") {
      deleteTask(task.id);
    }
  }

  function handleMoveLeft() {
    let newStatus = "";

    if (task.processlabel === "Doing") {
      newStatus = "To Do";
    } else if (task.processlabel === "Done") {
      newStatus = "Doing";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  function handleMoveRight() {
    let newStatus = "";
    console.log("in move right");
    console.log(task);
    if (task.processlabel === "To Do") {
      newStatus = "Doing";
    } else if (task.processlabel === "Doing") {
      newStatus = "Done";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  return (
    <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
      <button onClick={handleMoveLeft} className="button moveTask">
        &#171;
      </button>
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task.name}
        />
        <textarea
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description}
        />
        <DatePickerComponent
          placeholder="Enter duo date"
          className=" description input"
          name="timeline"
          onChange={(e) => setTimeline(e.target.value)}
          //   defaultValue={task.timeline}

          //   value={timeline}
          //   min={today}
          //   onChange={(e) => setTimeline(e.target.value)}
          // start="Year"
          // depth="Day"
        ></DatePickerComponent>
        <div className="urgencyLabels">
          <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
            <input
              urgency="low"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            low
          </label>
          <label
            className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
          >
            <input
              urgency="medium"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            medium
          </label>
          <label
            className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
          >
            <input
              urgency="high"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            high
          </label>
        </div>
        <button
          onClick={() => {
            setFormAction("save");
          }}
          className="button"
        >
          {collapsed ? "Edit" : "Save"}
        </button>
        {collapsed && (
          <button
            onClick={() => {
              setFormAction("delete");
            }}
            className="button delete"
          >
            X
          </button>
        )}
      </form>
      <button onClick={handleMoveRight} className="button moveTask">
        &#187;
      </button>
    </div>
  );
}
