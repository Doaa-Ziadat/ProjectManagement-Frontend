import React, { useState } from "react";
import styled from "styled-components";
import { ReactSession } from "react-client-session";
import Modal from "react-modal";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../style/addProject.css";
Modal.setAppElement("#root");
function AddProject() {
  const [isOpenFirst, setIsOpenFirst] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [name, setprojectName] = useState("");
  const [timeline, setTimeline] = useState("");
  const [priority, setpriority] = useState("");
  const [publicFlag, setPublicFlag] = useState(true);

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
    setIsOpenFirst(false);
  }
  function addProject() {
    const userInfo = ReactSession.get("userInfo");
    const userId = userInfo.id;
    const data = {
      userId,
      name,
      timeline,
      priority,
      publicFlag,
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
      <button onClick={() => setIsOpenFirst(true)}>Add Project </button>{" "}
      <Modal
        isOpen={isOpenFirst}
        onRequestClose={() => setIsOpenFirst(false)}
        className="modalReact"
      >
        <button className="backButton" onClick={() => setIsOpenFirst(false)}>
          &larr;
        </button>

        <button className="closeButton" onClick={() => setIsOpenFirst(false)}>
          X
        </button>
        <div className="modalContentFirst">
          <h1>Create a new project</h1>
          <div> How would you like to start?</div>
          <ul>
            <button className="listButton" onClick={() => setPublicFlag(false)}>
              <h1>create a simple to do board</h1>
              <div>personal board to enable you organize your daily tasks </div>
            </button>

            <button className="listButton" onClick={() => setPublicFlag(true)}>
              <h1>create a team board </h1>
              <div>
                a board that you can share with your teammates and assigned task
                to particular member
              </div>
            </button>
          </ul>
          {/* modal 2 start  */}
          <button
            className="continueButtonFirst"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Continue
          </button>{" "}
        </div>

        <Modal
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
            setIsOpenFirst(false);
          }}
          className="modalReact"
        >
          <button className="backButton" onClick={() => setIsOpen(false)}>
            &larr;
          </button>

          <button
            className="closeButton"
            onClick={() => {
              setIsOpen(false);
              setIsOpenFirst(false);
            }}
          >
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
            {/* modal 3 start  */}
            <button
              className="continueButton"
              onClick={() => {
                addProject();
                setIsOpen(false);
                setIsOpenFirst(false);
              }}
            >
              <a href="/home"> Add project</a>
            </button>
          </div>
          {/* <Modal
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
                <button className="listButton">Start Adding tasks </button>
                <button className="listButton">Share with teammates</button>
              </ul>
              <button onClick={addProject} className="goButton">
                {" "}
                Go to project
              </button>
            </div>
          </Modal> */}
        </Modal>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  margin: 40px;
`;

export default AddProject;
