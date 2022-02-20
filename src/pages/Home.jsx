import React from "react";
import Projects from "./projects";
function Home(props) {
  return (
    <div>
      <h1> Home </h1>
      <a href="/Login"> go to Login</a>
      <a href="/Signup"> go to Signup</a>
      <Projects />
    </div>
  );
}

export default Home;
