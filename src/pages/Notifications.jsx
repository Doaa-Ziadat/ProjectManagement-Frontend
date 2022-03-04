import React, { useEffect, useState } from "react";
import Sidenav from "./Sidenav";
import styled from "styled-components";
import { ReactSession } from "react-client-session";
import "../style/notifications.css";

function Notifications() {
  const id = ReactSession.get("userInfo").id;
  const [notifications, setNotifications] = useState([]);
  const [editsNotf, seteditsNotf] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:4000/notifications/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotifications(data);
      });
  }, [editsNotf]);

  const addMember = (projectId) => {
    const data = {
      id: id,
      projectId: projectId,
    };

    fetch("http://localhost:4000/add-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((dataa) => {
        return dataa.json();
      })
      .then((d) => {
        console.log(d);
        // if (d.success) window.location.href = " http://localhost:3000/";
      });
  };

  const deletePending = (notficationId) => {
    const postData = { id: notficationId };
    fetch("http://localhost:4000/delete-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      credentials: "include",
    })
      .then((dataa) => {
        return dataa.json();
      })
      .then((d) => {
        if (d.success) seteditsNotf(!editsNotf);
      });
  };
  return (
    <Container>
      <Sidenav />
      <div className="page">
        <h2> New notifications:</h2>
        {notifications
          .filter((not) => !not.seenflag)
          .map((notf) => (
            <div className="notfications">
              <li className="notfication" key={notf.id}>
                <div>
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Invitation_2-512.png"
                    alt=""
                  />
                </div>
                <div>
                  <h4> invitation</h4>
                  <p>
                    you are been invited to join
                    <span> {notf.projectname}</span> <br />
                    by <span>{notf.invitedbyemail}</span>
                    <div>
                      <button
                        className="accept"
                        onClick={() => {
                          addMember(notf.projectid);
                          deletePending(notf.id);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className=" accept reject"
                        onClick={() => {
                          deletePending(notf.id);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </p>
                </div>
              </li>
            </div>
          ))}

        <div>view old notifications</div>

        {notifications
          .filter((not) => not.seenflag)
          .map((notf) => (
            <div className="notfications">
              <li lassName="notfication" key={notf.id}>
                <div>
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Invitation_2-512.png"
                    alt=""
                  />
                </div>
                <div>
                  <h4> invitation</h4>
                  <p>
                    you are been invited to join
                    <span> {notf.projectname}</span> <br />
                    by <span>{notf.invitedbyemail}</span>
                    <div>
                      <button
                        className="accept"
                        onClick={addMember(notf.projectid)}
                      >
                        Accept
                      </button>
                      <button
                        className=" accept reject"
                        onClick={() => {
                          deletePending(notf.id);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </p>
                </div>
              </li>
            </div>
          ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
`;
export default Notifications;
