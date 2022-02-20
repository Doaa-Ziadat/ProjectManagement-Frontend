import React, { useState, useEffect } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [usersId, setUsersId] = useState([]);
  const [users, setUses] = useState([]);

  useEffect(() => {
    console.log("in projects frontend");
    fetch("http://localhost:4000/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        //   data.map((pr) =>
        //    fetch(`http://localhost:4000/email/${pr.userid}`));
        // })
        // .catch((err) => {
        //   console.log(err);
      });
  }, []);

  return (
    <div>
      Projects :
      <ul>
        {projects.map((pr) => (
          <li key={pr.id}>
            <div> Project Name :{pr.name}</div>
            <div> Timeline : {pr.timeline.slice(0, 10)}</div>
            <div> Priority:{pr.priority}</div>
            <div> Created By :{pr.userid}</div>
            <div>Created At:{pr.createdat.slice(0, 10)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
