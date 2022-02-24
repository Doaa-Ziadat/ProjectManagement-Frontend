import React, { useState } from "react";
import styled from "styled-components";
import { ReactSession } from "react-client-session";
import Modal from "react-modal";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
Modal.setAppElement("#root");
function AddProject() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [name, setprojectName] = useState("");
  const [timeline, setTimeline] = useState("");
  const [priority, setpriority] = useState("");

  // const datevalue = new Date(
  //   new Date().getFullYear(),
  //   new Date().getMonth(),
  //   14
  // );
  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  function controlClose() {
    setIsOpen(false);
    setIsOpen2(false);
  }
  function addProject() {
    const userInfo = ReactSession.get("userInfo");
    const userId = userInfo.id;
    const data = {
      userId,
      name,
      timeline,
      priority,
    };

    fetch("http://localhost:4000/add-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((dataa) => {
        return dataa.json();
      })
      .then((d) => {
        console.log(d);
        if (d.success) window.location.href = " http://localhost:3000/projects";
      });
  }
  return (
    <Container>
      <button onClick={() => setIsOpen(true)}>Add Project </button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <button onClick={() => setIsOpen(false)}>&larr;</button>

        <button onClick={() => setIsOpen(false)}>X</button>
        <h2>New Project </h2>

        <div>Project Name </div>
        <input
          type="text"
          name="projectName"
          id="projectName"
          onChange={(e) => setprojectName(e.target.value)}
        />
        <div>timeline</div>
        <DatePickerComponent
          placeholder="Enter duo date"
          value={timeline}
          min={today}
          onChange={(e) => setTimeline(e.target.value)}
          // start="Year"
          // depth="Day"
        ></DatePickerComponent>
        <div> priority</div>
        <input
          type="text"
          name="priority"
          id="priority"
          onChange={(e) => setpriority(e.target.value)}
        />
        <div>
          {/* modal 2 start  */}
          <button onClick={() => setIsOpen2(true)}>Continue </button>
          <Modal isOpen={isOpen2} onRequestClose={controlClose}>
            <button onClick={() => setIsOpen2(false)}>&larr;</button>

            <button onClick={controlClose}>X</button>
            <h2>What do you want to do first?</h2>
            <ul>
              <li>Start Adding tasks </li>
              <li>Share with teammates</li>
            </ul>
            <button onClick={addProject}> Go to project</button>
          </Modal>
        </div>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  margin: 20px;
`;
export default AddProject;
