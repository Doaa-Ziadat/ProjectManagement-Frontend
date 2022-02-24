import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Sidenav() {
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
        <NavbarLink to="/">Notfication</NavbarLink>
        <NavbarLink to="/">My Tasks</NavbarLink>
        <NavbarLink to="/projects">Projects</NavbarLink>
      </div>
      <div>
        <button onClick={logout}>Log out </button>
      </div>
    </Container>
  );
}
const Container = styled.div`
  /* padding: 20pxs; */
  color: white;
  background-color: #000000da;
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
