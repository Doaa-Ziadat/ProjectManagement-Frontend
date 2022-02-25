import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import Project from "./Project";
import Sidenav from "./Sidenav";

import Board from "react-trello";

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
  const data = {
    lanes: [
      {
        id: "lane1",
        title: "Planned Tasks",
        label: "2/2",
        cards: [
          {
            id: "Card1",
            title: "Write Blog",
            description: "Can AI make memes",
            label: "30 mins",
            draggable: false,
          },
          {
            id: "Card2",
            title: "Pay Rent",
            description: "Transfer via NEFT",
            label: "5 mins",
            metadata: { sha: "be312a1" },
          },
        ],
      },
      {
        id: "lane2",
        title: "Completed",
        label: "0/0",
        cards: [],
      },
    ],
  };
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
        setTasks(data);
      });
  }, []);

  const addTask = () => {
    const postData = {
      name: from.name,
      projectId: from.id,
      timeline: from.timeline,
      priority: from.priority,
      processlabel: "To Do",
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
        if (d.success) console.log("task added");
      });
  };

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
              priority={pr.priority}
              createdBy={pr.userid}
              createdAt={pr.createdat.slice(0, 10)}
            />
          ))}
        </Projectss>
        <button onClick={addTask}>Add task </button>
        <Board data={data} />;
      </Container2>
    </Container>
  );
};

export default Projects;
