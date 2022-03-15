import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../style/messages.css";
import { ReactSession } from "react-client-session";

function Messages({ projectId }) {
  const [comments, setComments] = useState([]); //temo
  const [edits, setEdits] = useState(false);

  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const userInfo = ReactSession.get("userInfo");
  const userId = userInfo.id;

  console.log(projectId);
  useEffect(() => {
    console.log("in");
    fetch(`http://localhost:4000/comments/${projectId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data);
      });
  }, [projectId, edits]);

  const formData = new FormData();

  formData.append("image", image);
  formData.append("projectId", projectId);
  formData.append("userId", userId);
  formData.append("content", content);

  const sendMessage = () => {
    fetch("http://localhost:4000/addComment", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        enctype: "multipart/form-data",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
      credentials: "include",
    })
      .then((dataa) => {
        return dataa.json();
      })
      .then((d) => {
        console.log(d);
        setEdits(!edits);
      });
  };
  const [isOpen, setIsOpen] = useState(false);

  var today = new Date();
  const [messages, setMessagaed] = useState([
    {
      name: "Doaa",
      content: "message1",
      date:
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
    },
    {
      name: "Doaa",
      content: "message2 lorem kldkfdjsfkjdskfjsdfjskdjfksdfsd",
      date:
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
    },
    {
      name: "Doaa",
      content: "message2 lorem kldkfdjsfkjdskfjsdfjskdjfksdfsd",
      date:
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
    },
  ]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Project Messages</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="modalReactMembers modalContentMessages"
      >
        <button className="closeButton3" onClick={() => setIsOpen(false)}>
          X
        </button>
        <h1> Messages</h1>{" "}
        <div style={{ position: "relative" }}>
          {comments.map((message) => (
            <div>
              <div className={message.userid == userId ? "myName" : "name"}>
                {message.userid == userId ? "Me" : message.name}
              </div>
              <div
                className={message.userid == userId ? "myMessage" : "message"}
              >
                <div
                  className={
                    message.userid == userId ? "mycolor circle" : "color circle"
                  }
                ></div>
                <div className="messageContent">
                  {message.image != " " ? (
                    <img
                      className="imageMessage"
                      src={`http://localhost:4000/${message.image}`}
                      alt="failed"
                    />
                  ) : null}
                  {message.content}
                </div>
              </div>
              <div
                className={
                  message.userid == userId ? "myCreatedat" : "createdat"
                }
              >
                {message.createdat}
              </div>
            </div>
          ))}{" "}
          <div
            style={{
              backgroundColor: "#252628",
              width: "600px",
              height: "70px",
              position: "absolute",
              bottom: "-100px",
              left: "10px",
              marginLeft: "-30px",
              marginRight: "0px",
            }}
          >
            <textarea
              className="inputMessage"
              name="text"
              id="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              // onInput="this.parentNode.dataset.replicatedValue = this.value"
            >
              {" "}
            </textarea>{" "}
            <form action="/profile" method="post" encType="multipart/form-data">
              <input
                type="file"
                name="image"
                size="large"
                onChange={(e) => setImage(e.target.files[0])} // if multiply withput [0]
              />
            </form>
            <button className="sendButton" onClick={sendMessage}>
              send
            </button>
            <br />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Messages;
