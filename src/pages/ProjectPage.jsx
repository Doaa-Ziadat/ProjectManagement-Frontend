import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../style/projectPage.css";
import styled from "styled-components";
import Project from "./Project";
import Sidenav from "./Sidenav";
import Modal from "react-modal";
import Invite from "./Invite";
import Board from "react-trello";
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

const Container2 = styled.div`
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
        // cards: Array.from(tasks),
        // cards: [
        //   {
        //     id: "Card1",
        //     title: "Write Blog",
        //     description: "Can AI make memes",
        //     label: "30 mins",
        //     draggable: false,
        //   },
        //   {
        //     id: "Card2",
        //     title: "Pay Rent",
        //     description: "Transfer via NEFT",
        //     label: "5 mins",
        //     metadata: { sha: "be312a1" },
        //   },
        // ],
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

  //Format
  // const data = {
  //   lanes: [
  //     {
  //       id: "lane1",
  //       title: "Planned Tasks",
  //       label: "2/2",
  //       // cards: Array.from(tasks),
  //       // cards: [
  //       //   {
  //       //     id: "Card1",
  //       //     title: "Write Blog",
  //       //     description: "Can AI make memes",
  //       //     label: "30 mins",
  //       //     draggable: false,
  //       //   },
  //       //   {
  //       //     id: "Card2",
  //       //     title: "Pay Rent",
  //       //     description: "Transfer via NEFT",
  //       //     label: "5 mins",
  //       //     metadata: { sha: "be312a1" },
  //       //   },
  //       // ],
  //     },
  //     {
  //       id: "lane2",
  //       title: "Completed",
  //       label: "0/0",
  //       cards: [],
  //     },
  //   ],
  // };
  const [tasks, setTasks] = useState([]);
  const [usersId, setUsersId] = useState([]);
  const [users, setUses] = useState([]);

  const location = useLocation();
  const { from } = location.state;
  console.log(from);
  const projectId = from.id;
  useEffect(() => {
    console.log("in projects frontend");
    fetch(`http://localhost:4000/tasks/${projectId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const todo = data.filter((t) => t.processlabel == "To Do");
        const doing = data.filter((t) => t.processlabel == "Doing");
        const done = data.filter((t) => t.processlabel == "Done");

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
              }, // Style of Lane
              // cardStyle: { backgroundColor: "" }, // Style of Card
              label: todoLength + "/" + length,

              // cards: data.map((item)=> {
              //   let container = {};
              //   container.id = item.id;
              //   container.title = item.name;
              //   container.label = item.priority;
              //   container.description = item.timeline;

              //   return container;
              // }),
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
              style: { backgroundColor: "#0a7f8fb8", color: "white" }, // Style of Lane

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
  }, [from, edits]);

  const addTask = () => {
    setIsOpen(false);

    const postData = {
      name: taskName,
      projectId: from.id,
      timeline: timeline,
      priority: priority,
      processlabel: "To Do",
      //userId who assigned to it the task
    };
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
    fetch("http://localhost:4000/edit-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      credentials: "include",
    });
    // .then((dataa) => {
    //   return dataa.json();
    // })
    // .then((d) => {
    //   if (d.success) setedits(!edits);

    // });
  };
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
    });
  };

  const onDragEnd = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    let proccessLabel = cardDetails.label;
    if (sourceLaneId == "lane1" && targetLaneId == "lane2")
      proccessLabel = "Doing";
    else if (sourceLaneId == "lane2" && targetLaneId == "lane3")
      proccessLabel = "Done";
    else return false;

    editTask(
      cardDetails.title,
      cardId,
      cardDetails.description,
      cardDetails.label,
      proccessLabel
    );
    //userid messing
    console.log(position);

    console.log(cardId, cardDetails, sourceLaneId, targetLaneId);
  };

  const delteTask = (cardId) => {};

  console.log(data);

  return (
    <Container>
      <Sidenav />

      <Container2>
        <Projectss>
          {tasks.map((pr) => (
            <Project
              projectId={pr.id}
              name={pr.name}
              timeline={pr.timeline.slice(0, 10)}
              priority={priority}
              createdBy={pr.userid}
              createdAt={pr.createdat.slice(0, 10)}
            />
          ))}
        </Projectss>

        <button className="addTask" onClick={() => setIsOpen(true)}>
          Add Task
        </button>

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
        <Invite />
        <Board
          handleDragEnd={onDragEnd}
          onCardDelete={deleteTask}
          style={{
            backgroundColor: "#f0f0f0",
            backgroundColor: "white",
          }} // Style of BoardWrapper
          data={data}
        />
      </Container2>
    </Container>
  );
};

export default Projects;
