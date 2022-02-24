import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <Container>
      <h1>
        Welcome <br /> <span> Again!</span>
      </h1>
      <Description>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti velit
        nobis culpa consequuntur reprehenderit tenetur, dolores asperiores qui
      </Description>
    </Container>
  );
};

const Description = styled.div`
  color: #fff;
  min-width: 100px;
  max-width: 290px;
  font-size: 18px;
  font-weight: 200;
  @media (max-width: 900px) {
    display: none;
  }
`;
const Container = styled.div`
  background: linear-gradient(
      135deg,
      rgba(255, 141, 141, 0.9),
      rgba(0, 0, 0, 0.5),
      rgba(93, 195, 153, 0.9)
    ),
    url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 60px;
    font-weight: 400;
    // color: #444444;
    color: #fff;
    span {
      font-size: 90px;
      font-weight: 500;
    }
    @media (max-width: 900px) {
      display: none;
    }
  }
`;

export default Main;
