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
        set