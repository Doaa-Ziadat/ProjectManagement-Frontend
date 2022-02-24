import React from "react";
import styled from "styled-components";
function Project({
  projectId,
  name,
  timeline,
  priority,
  createdAt,
  createdBy,
}) {
  return (
    <div>
      <ProjectItem key={projectId}>
        <div> Project Name :{name}</div>
        <div> Timeline : {timeline}</div>
        <div> Priority:{priority}</div>
        <div> Created By :{createdBy}</div>
        <div>Created At:{createdAt}</div>
      </ProjectItem>
    </div>
  );
}

const ProjectItem = styled.li`
  flex-basis: 31%;
  background: #fff3f3;
  border-radius: 10px;
  margin-bottom: 5%;
  padding: 20px 12px;
  box-sizing: border-box;
  transition: 0.5s;
  &:hover {
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.2);
  }
`;

export default Project;
