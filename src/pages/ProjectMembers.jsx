import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../style/projectMembers.css";

const ProjectMembers = ({ members, setMembers, projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  //   const getMembers = () => {
  //     fetch(`http://localhost:4000/get-members/${projectId}`, {
  //       method: "GET",
  //       credentials: "include",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setMembers(data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
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
          {members.map((member) => (
            <div>
              <h3>{member.name}</h3>
              <div>{member.email}</div>
            </div>
          ))}

          {/* <button className="inviteButton" onClick={getMembers}>
            project Members
          </button> */}
        </div>
      </Modal>
    </div>
  );
};

export default ProjectMembers;
