import React, { useState } from "react";
import { ReactSession } from "react-client-session";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import "../style/invite.css";

function Invite({ projectId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const location = useLocation();

  const { from } = location.state;
  console.log(from);
  const invite = () => {
    const userInfo = ReactSession.get("userInfo");
    const userId = userInfo.id;
    const userEmail = userInfo.email;
    console.log("useremail in invite", userEmail);

    const data = {
      email: email,
      projectId: projectId,
      invitedBy: userId,
      invitedByEmail: userEmail,
      projectName: from.name,
    };
    // add user in the project_member_pending table
    fetch(`${process.env.REACT_APP_API_URL}/add-member-pending`, {
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
        // if (d.success) window.location.href = " http://localhost:3000/";
      });
  };
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Invite
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="modalReactInvite"
      >
        <button className="closeButtonInvite" onClick={() => setIsOpen(false)}>
          X
        </button>
        <div className="modalContent">
          <h1> Invite your teammates to the project</h1>
          <div>Email address </div>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="inviteButton"
            onClick={() => {
              invite();
              setIsOpen(false);
            }}
          >
            Invite
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Invite;
