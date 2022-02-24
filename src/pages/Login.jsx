import { useState } from "react";
import styled from "styled-components";
import bgImg from "../assets/bg.png";
import Main2 from "./Main2";
import Sidebar2 from "./Sidebar2";

function Login(props) {
  return (
    <Container>
      <Wrapper>
        <Sidebar2 />

        <Main2 />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  background: #eefcff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const Wrapper = styled.div`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
`;

export default Login;
