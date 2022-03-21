import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../style/sidenav.css";
import { Link } from "react-router-dom";
import AddProject from "./AddProject";

function Sidenav() {
  const [projects, setProjects] = useState([]);
  const [edits, setEdits] = useState(false);

  useEffect(() => {
    console.log("in projects frontend");
    fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      });
  }, [edits]);
  const logout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then(function (response) {
        window.location.replace("/");
        if (response.redirected) {
          return window.location.replace(response.url);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    window.location.href = "/";
  };
  return (
    <Container>
      <a href="/">
        <h3>
          Project <span>Management</span>
        </h3>
      </a>
      <div>
        <NavbarLink to="/">Home</NavbarLink>

        <NavbarLink to="/notifications">Notfications</NavbarLink>
        <NavbarLink to="/">My Tasks</NavbarLink>
      </div>

      <div className="projectList">
        <div className="projectItem">
          <h4>Projects:</h4>
          <AddProject />
          {projects.map((pr) => (
            // <ProjectsList
            //   projectId={pr.id}
            //   name={pr.name}
            //   timeline={pr.timeline.slice(0, 10)}
            //   priority={pr.priority}
            //   createdBy={pr.userid}
            //   createdAt={pr.createdat.slice(0, 10)}
            // />
            <li key={pr.id}>
              <Link to={`/projectPage`} state={{ from: pr }}>
                {pr.name}
              </Link>
            </li>
          ))}
        </div>

        {/* <AddProject /> */}
      </div>
      <div>
        <button onClick={logout}>Log out </button>
      </div>
    </Container>
  );
}
const Container = styled.div`
  /* padding: 20pxs; */
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  color: white;
  background-color: #252628;
  display: flex;
  flex-direction: column;
  flex-basis: 15%;
  height: 100vh;
  h3 {
    color: #ff8d8d;
    font-size: 22px;
  }
  span {
    color: #5dc399;
    font-weight: 300;
    font-size: 18px;
  }
  a {
    text-decoration: none;
    padding: 20px;
  }
`;
const NavbarLink = styled(Link)`
  display: block;
  color: white;
  font-size: medium;
  text-decoration: none;
  padding: 20px;
  &:hover {
    background-color: #80808084;
  }
`;

export default Sidenav;
