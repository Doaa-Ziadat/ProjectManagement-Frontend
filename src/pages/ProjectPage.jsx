import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../style/projectPage.css";
import "../style/projectPage.scss";
import styled from "styled-components";
import Project from "./Project";
import Sidenav from "./Sidenav";
import Modal from "react-modal";
import Invite from "./Invite";
import ProjectMembers from "./ProjectMembers";
import Board from "react-trello";
import StatusLine from "./StatusLine";
import Messages from "./Messages";
Modal.setAppElement("#root");

const Projectss = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  column-gap: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Container1 = styled.div`
  margin: 20px;
`;
const Container = styled.div`
  display: flex;
`;
const Projects = () => {
  const [edits, setedits] = useState(false);
  const [data, setData] = useState({
    lanes: [
      {
        id: "lane1",
        title: "To Do",
        label: "2/2",
        editable: "true",
      },
      {
        id: "lane2",
        title: "Doing",
        label: "0/0",
        cards: [],
      },
      {
        id: "lane3",
        title: "Done",
        label: "0/0",
        cards: [],
      },
    ],
  });

  const [isOpen, setIsOpen] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [timeline, setTimeline] = useState("");
  var today = new Date();
  const [priority, setpriority] = useState("");

  const [tasks, setTasks] = useState([]);

  const location = useLocation();
  const { from } = location.state;
  const projectId = from.id;
  const publicProject = from.publicflag;
  const prevPublicProject = from.publicflag;

  const [loading, setLoading] = useState("false");

  const [members, setMembers] = useState([]);

  // get user tasks
  useEffect(() => {
    console.log("in projects frontend");

    fetch(`http://localhost:4000/tasks/${projectId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
        const todo = data.filter((t) => t.processlabel === "To Do");
        const doing = data.filter((t) => t.processlabel === "Doing");
        const done = data.filter((t) => t.processlabel === "Done");
        // setTasks(todo.concat(doing).concat(done));

        const length = data.length;
        const todoLength = todo.length;
        const doingLength = doing.length;
        const doneLength = done.length;
        setData({
          lanes: [
            {
              id: "lane1",
              title: "To Do",
              style: {
                backgroundColor: "#c44a4a",
                color: "white",
                width: "fit-content",
                marginRight: "30px",
              }, // Style of Lane
              // cardStyle: { backgroundColor: "" }, // Style of Card
              label: todoLength + "/" + length,

              cards: todo.map((item) => {
                let container = {};
                container.id = item.id;
                container.title = item.name;
                container.label = item.priority;
                container.description = item.timeline;

                return container;
              }),
            },
            {
              id: "lane2",
              title: "Doing",
              style: {
                backgroundColor: "#0a7f8fb8",
                color: "white",
                marginRight: "30px",
              }, // Style of Lane

              label: doingLength + "/" + length,

              cards: doing.map((item) => {
                let container = {};
                container.id = item.id;
                container.title = item.name;
                container.label = item.priority;
                container.description = item.timeline;

                return container;
              }),
            },
            {
              id: "lane3",
              title: "Done",
              style: { backgroundColor: "#07964fac", color: "white" }, // Style of Lane

              label: doneLength + "/" + length,
              cards: done.map((item) => {
                let container = {};
                container.id = item.id;
                container.title = item.name;
                container.label = item.priority;
                container.description = item.timeline;

                return container;
              }),
            },
          ],
        });
      });

    if (publicProject) {
      getMembers(from.id);
    }
  }, [from, edits]);

  const getMembers = () => {
    fetch(`http://localhost:4000/get-members/${projectId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMembers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //add task
  const addTask = (task) => {
    let postData = {};
    if (!publicProject) {
      setIsOpen(false);
      postData = {
        name: taskName,
        projectId: from.id,
        timeline: timeline,
        priority: priority,
        processlabel: "To Do",
        userid: "",
        //userId who assigned to it the task
      };
    } else {
      postData = {
        name: task.name,
        projectId: from.id,
        timeline: task.timeline,
        priority: task.priority,
        processlabel: "To Do",
        userid: task.userid,
        //userId who assigned to it the task
      };
    }

    fetch("http://localhost:4000/add-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      credentials: "include",
    })
      .then((dataa) => {
        return dataa.json();
      })
      .then((d) => {
        if (d.success) setedits(!edits);
      });
  };

  //edit task
  const editTask = (name, id, edittimeline, editpriority, processLabel) => {
    const postData = {
      name: name,
      id: id,
      timeline: edittimeline,
      priority: editpriority,
      processlabel: processLabel,
      // userId: from.userId,
      // TODO: who assigned to it the task
    };
    console.log("edit in frontend", postData);
    fetch("http://localhost:4000/edit-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      credentials: "include",
    })
      .then((dataa) => {
        return dataa.json();
      })
      .then((d) => {
        if (d.success) setedits(!edits);
      });
  };

  const editTaskPublic = (task, newStatus) => {
    console.log(task);
    console.log(newStatus);
    const postData = {
      name: task.name,
      id: task.id,
      projectId: task.projectid,
      timeline: task.timeline,
      priority: task.priority,
      processlabel: newStatus,
      userid: task.userid ? task.userid : 0,
      //userId who assigned to it the task
    };
    console.log("edit in frontend", postData);
    fetch("http://localhost:4000/edit-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      credentials: "include",
    })
      .then((dataa) => {
        return dataa.json();
      })
      .then((d) => {
        if (d.success) setedits(!edits);
      });
  };
  //delete task
  const deleteTask = (cardId) => {
    console.log("on delete ");
    const postData = { id: cardId };
    fetch("http://localhost:4000/delete-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      credentials: "include",
    })
      .then((dataa) => {
        return dataa.json();
      })
      .then((d) => {
        if (d.success) setedits(!edits);
      });
  };

  // move task
  const onDragEnd = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    let proccessLabel = cardDetails.label;
    if (sourceLaneId === "lane1" && targetLaneId === "lane2")
      proccessLabel = "Doing";
    else if (sourceLaneId === "lane2" && targetLaneId === "lane3")
      proccessLabel = "Done";
    else return false;
    console.log(cardDetails);
    editTask(
      cardDetails.title,
      cardId,
      cardDetails.description,
      cardDetails.label,
      proccessLabel
    );
    //userid messing

    // console.log(cardId, cardDetails, sourceLaneId, targetLaneId);
  };

  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        name: "",
        description: "",
        priority: "",
        processlabel: status,
        timeline: "",
        userid: 0,
        isCollapsed: "false",
      },
    ]);
  }

  return (
    <Container>
      <Sidenav />
      {!publicProject ? (
        <Container1>
          <div className="section2Top">
            <h1> {from.name}</h1>
            <button className="addTask" onClick={() => setIsOpen(true)}>
              Add Task
            </button>
          </div>

          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className="modalReact3"
          >
            <button className="closeButton3" onClick={() => setIsOpen(false)}>
              X
            </button>
            <div className="modalContent">
              <h1>New Task </h1>
              <div>Task Name </div>
              <input
                type="text"
                name="taskName"
                id="taskName"
                onChange={(e) => setTaskName(e.target.value)}
              />
              <div>Timeline</div>
              <div className="datee">
                <DatePickerComponent
                  placeholder="Enter duo date"
                  value={timeline}
                  min={today}
                  onChange={(e) => setTimeline(e.target.value)}
                  // start="Year"
                  // depth="Day"
                ></DatePickerComponent>
              </div>
              <div> Priority</div>
              <input
                type="text"
                name="priority"
                id="priority"
                onChange={(e) => setpriority(e.target.value)}
              />
              <button className="continueButton" onClick={addTask}>
                Add task
              </button>
            </div>
          </Modal>
          <Board
            handleDragEnd={onDragEnd}
            onCardDelete={deleteTask}
            style={{
              backgroundColor: "#f0f0f0",
              backgroundColor: "white",
              marginLeft: "3%",
              width: "100% ",
              height: "fit-content",
              border: "1px solid #9ad3bc",
              padding: "5% 5%",
            }} // Style of BoardWrapper
            data={data}
          />
        </Container1>
      ) : (
        <div>
          <div className="section2Top">
            <h1> {from.name}</h1>
            <Invite projectId={projectId} />
            <ProjectMembers
              projectId={projectId}
              members={members}
              setMembers={setMembers}
            />
            <Messages projectId={projectId} />
          </div>
          <div className="section2">
            <main>
              <section>
                <StatusLine
                  tasks={tasks}
                  addEmptyTask={addEmptyTask}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  moveTask={editTaskPublic}
                  status="To Do"
                  members={members}
                  setMembers={setMembers}
                />
                <StatusLine
                  tasks={tasks}
                  addEmptyTask={addEmptyTask}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  moveTask={editTaskPublic}
                  status="Doing"
                  members={members}
                  setMembers={setMembers}
                />
                <StatusLine
                  tasks={tasks}
                  addEmptyTask={addEmptyTask}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  moveTask={editTaskPublic}
                  status="Done"
                  members={members}
                  setMembers={setMembers}
                />
              </section>
            </main>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Projects;
