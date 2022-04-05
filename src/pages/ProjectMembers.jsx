import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../style/projectMembers.css";

const ProjectMembers = ({ members, setMembers, projectId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          //   getMembers();
          setIsOpen(true);
        }}
      >
        Project Members
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="modalReactMembers"
      >
        <button className="closeButton3" onClick={() => setIsOpen(false)}>
          X
        </button>
        <div className="modalContent">
          <h1> project teammates :</h1>
          {members
            .filter((member) => member.id != 0)
            .map((member) => (
              <div>
                <h3>{member.name}</h3>
                <div>{member.email}</div>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default ProjectMembers;
