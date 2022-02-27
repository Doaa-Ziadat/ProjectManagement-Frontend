import React, { useState } from "react";
import Modal from "react-modal";
import "../style/invite.css";
function Invite() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const invite = () => {};
  return (
    <div>
      <button className="Invite" onClick={() => setIsOpen(true)}>
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
          <button className="inviteButton" onClick={invite}>
            Invite
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Invite;
