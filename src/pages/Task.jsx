import "../style/task.scss";
import { useState, useEffect } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

export default function Task(props) {
  const {
    addTask,
    deleteTask,
    moveTask,
    task,
    members,
    setMembers,
    taskExist,
    setTaskExist,
  } = props;

  const [urgencyLevel, setUrgencyLevel] = useState(task.priority);
  const [timeline, setTimeline] = useState(task.timeline);
  const [collapsed, setCollapsed] = useState(!task.isCollapsed); //false
  const [formAction, setFormAction] = useState("");

  const [name, setName] = useState(task.name);
  const [assignedName, setAssignedName] = useState("");

  const [assignedTo, setAssignedTo] = useState(
    task.userid ? `assigned to: ${assignedName}` : "assign task "
  );
  const [assignedId, setAssignedId] = useState(task.userid);

  function setUrgency(event) {
    setUrgencyLevel(event.target.attributes.urgency.value);
  }
  console.log("task in task", task);
  // if (task) {
  //   setCollapsed = true;
  // }
  console.log(members);
  console.log(assignedId);
  useEffect(() => {
    console.log("in use effect");
    fetch(`http://localhost:4000/getEmail/${task.userid}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setAssignedName(data[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          userid: assignedId,
          isCollapsed: true,
        };
        setCollapsed(true);
        // if it comes from + then call add , else it come from edit call movetask
        console.log("Exist?", taskExist);
        if (taskExist) moveTask(newTask, task.processlabel);
        else addTask(newTask);
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
      moveTask(task, newStatus);
    }
  }

  function handleMoveRight() {
    let newStatus = "";
    console.log(task);
    if (task.processlabel === "To Do") {
      newStatus = "Doing";
    } else if (task.processlabel === "Doing") {
      newStatus = "Done";
    }

    if (newStatus !== "") {
      moveTask(task, newStatus);
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
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <span class="dropdown">
          <input
            className=" title input"
            placeholder={assignedName}
            value={assignedName}
          />

          <div class="dropdown-content">
            {members.map((member) => (
              <button
                className="dropdown-members"
                onClick={() => {
                  setAssignedName(member.name);
                  // setAssignedTo
                  let id = member.id;
                  setAssignedId(id);
                }}
              >
                <h3>{member.name}</h3>
                <div>{member.email}</div>
              </button>
            ))}
          </div>
        </span>

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

        {/* <span class="dropdown">
          <button className=" button dropbtn">Assign</button>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </span> */}

        <button
          onClick={() => {
            setFormAction("save");
            // the user pressed edit not +
            if (collapsed) setTaskExist(true);
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
