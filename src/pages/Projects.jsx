import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Project from "./Project";
import Sidenav from "./Sidenav";

const Projectss = styled.ul`
  list-style: none;
  display: flex;
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
  const [projects, setProjects] = useState([]);
  const [usersId, setUsersId] = useState([]);
  const [users, setUses] = useState([]);

  useEffect(() => {
    console.log("in projects frontend");
    fetch("http://localhost:4000/projects", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
        //   data.map((pr) =>
        //    fetch(`http://localhost:4000/email/${pr.userid}`));
        // })
        // .catch((err) => {
        //   console.log(err);
      });
  }, []);

  return (
    <Container>
      <Sidenav />
      <Container2>
        Projects :
        <Projectss>
          {projects.map((pr) => (
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
      </Container2>
    </Container>
  );
};

export default Projects;
