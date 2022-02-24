import React from "react";
import styled from "styled-components";
const HomeContent = () => {
  return (
    <Content>
      <h1>A Project Management Platform</h1>
      <p>
        a platform design for an effective way of working , you can keep
        tracking of your <br /> project progress , plan with you'r team and
        share your ideas
      </p>
      <a href="">Visit Us To Know More </a>
    </Content>
  );
};

const Content = styled.div`
  width: 90%;
  height: fit-content;
  color: #fff;
  position: absolute;
  top: 60%;
  left: 60%;
  transform: translate(-60%, -60%);
  text-align: center;
  h1 {
    font-size: 62px;
    margin-bottom: 10px;
    @media (max-width: 900px) {
      font-size: 40px;
    }
  }
  p {
    color: #999;
    font-size: 18px;
    font-weight: 300;
    line-height: 22px;
    padding: 10px;
    margin: 10px 0 50px;
  }
  a {
    display: inline-block;
    text-decoration: none;
    color: #fff;
    border: 1px solid #fff;
    padding: 12px 34px;
    background: transparent;
    position: relative;
    cursor: pointer;
  }
  a:hover {
    border: 1px solid rgba(93, 195, 153, 0.9);
    background: rgba(93, 195, 153, 0.9);
    transition: 1s;
  }
  a {
    text-decoration: none;
  }
`;
export default HomeContent;
