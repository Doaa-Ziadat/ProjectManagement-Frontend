import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AddProject from "./AddProject";
function Sidenav() {
  const [projects, setProjects] = useState([]);

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
      });
  }, []);
  const logout = () => {
    fetch("http://localhost:4000/logout", {
      method: "GET",
      credentials: "include",
    })
      .then(function (response) {
        window.location.replace("http://localhost:3000/");
        if (response.redirected) {
          return window.location.replace(response.url);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    window.location.href = " http://localhost:3000";
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
      <AddProject />
      {/* projects :*/}
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
