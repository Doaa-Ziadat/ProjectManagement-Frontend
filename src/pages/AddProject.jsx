import React, { useState } from "react";
import styled from "styled-components";
import { ReactSession } from "react-client-session";
import Modal from "react-modal";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../style/addProject.css";
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
        if (d.success) window.location.href = " http://localhost:3000/";
      });
  }
  return (
    <Container>
      <button onClick={() => setIsOpen(true)}>Add Project </button>{" "}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="modalReact"
      >
        <button className="backButton" onClick={() => setIsOpen(false)}>
          &larr;
        </button>

        <button className="closeButton" onClick={() => setIsOpen(false)}>
          X
        </button>
        <div className="modalContent">
          <h1>New Project </h1>
          <div>Project name </div>
          <input
            type="text"
            name="projectName"
            id="projectName"
            onChange={(e) => setprojectName(e.target.value)}
          />
          <div>Timeline</div>
          <div className="dateReact">
            <DatePickerComponent
              className="datee"
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
          {/* modal 2 start  */}
          <button className="continueButton" onClick={() => setIsOpen2(true)}>
            Continue
          </button>{" "}
        </div>
        <Modal
          isOpen={isOpen2}
          onRequestClose={controlClose}
          className="modalReact2"
        >
          <button onClick={() => setIsOpen2(false)} className="backButton">
            &larr;
          </button>

          <button onClick={controlClose} className="closeButton">
            X
          </button>
          <div className="modalContent2">
            <h1>What do you want to do first?</h1>
            <ul>
              <li>Start Adding tasks </li>
              <li>Share with teammates</li>
            </ul>
            <button onClick={addProject} className="goButton">
              {" "}
              Go to project
            </button>
          </div>
        </Modal>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  margin: 40px;
`;

export default AddProject;
