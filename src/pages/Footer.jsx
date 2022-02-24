import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  margin-top: 100vh;
  width: 100%;
  text-align: center;
  padding: 30px 0;

  h4 {
    margin-bottom: 25px;
    margin-top: 20px;
    font-weight: 600;
  }
  /* .icons .fa {
    color: #f44336;
    margin: 0 13px;
    cursor: pointer;
    padding: 18px 0;
  }
  .fa-heart-o {
    color: #f44336;
  } */
`;
const Footer = () => {
  return (
    <Container>
      <h4>About Us</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.at dolores
        impedit placeat porro inventore? <br /> Eaque iusto necessitatibus
        molestias.
      </p>
      <div className="icons">
        <FontAwesomeIcon icon="fa-brands fa-facebook" />
        <FontAwesomeIcon icon="fa-brands fa-twitter" />
        <i className="fa fa-instagram"></i>
        <i className="fa fa-linkedin"></i>
      </div>
      <p>
        Made with <i className="fa fa-heart-o"></i> by Easy Tutorial
      </p>
    </Container>
  );
};

export default Footer;
