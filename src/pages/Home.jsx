import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../pages/Navbar";
import Footer from "./Footer";
import HomeContent from "./HomeContent";
import Sidenav from "./Sidenav";
import AddProject from "./AddProject";
import Notifications from "./Notifications";
import Cookies from "universal-cookie";
function Home(props) {
  const cookies = new Cookies();

  const [openNavbar, setOpenNavber] = useState(false);
  const [user, setUser] = useState(cookies.get("user"));
  return (
    <div>
      {user ? (
        <Container2>
          <Sidenav />
          <Page>
            <div>welcome </div>
            <AddProject />
            <button>
              <a style={{ color: "black" }} href="/notifications">
                Notifications
              </a>
            </button>
            <Content></Content>
          </Page>
        </Container2>
      ) : (
        <Container1>
          <Navbar openNavbar={openNavbar} setOpenNavber={setOpenNavber} />
          {!openNavbar && <HomeContent />}
          {/* <Footer //>) */}
        </Container1>
      )}
    </div>
  );
}

const Page = styled.div`
  /* display: flex;
  flex-direction: row; */
`;
const Content = styled.div``;

const Container2 = styled.div`
  display: flex;
`;
const Container1 = styled.div`
  background-color: #055b5c;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
`;

export default Home;
