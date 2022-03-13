import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../style/messages.css";

function Messages() {
  const [images, setImages] = useState([]); //temo
  const [image, setImage] = useState("");
  useEffect(() => {
    console.log("in");
    fetch("http://localhost:4000/comments", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImages(data);
      });
  }, []);

  const formData = new FormData();

  formData.append("image", image);
  // formData.append('title', title)
  // formData.append('price', price)
  // formData.append('description', description)
  // formData.append('published', published)

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
        if (d.success) window.location.href = " http://localhost:3000/";
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
        className="modalReactMembers"
      >
        <button className="closeButton3" onClick={() => setIsOpen(false)}>
          X
        </button>
        <h1> Messages</h1>{" "}
        <div className="modalContentMessages">
          {/* temp view images in db */}
          {images.map((im) => {
            return (
              <li>
                <img src={`http://localhost:4000/${im.image}`} alt="failed" />
              </li>
            );
          })}
          {messages.map((message) => (
            <div>
              <div
                style={{
                  color: "gray",
                  paddingLeft: "60px",
                  paddingBottom: "2px",
                }}
              >
                {message.name}
              </div>
              <div className="message">
                <div className="circle"></div>
                <div className="messageContent">{message.content}</div>
              </div>
              <div
                style={{
                  color: "gray",
                  paddingLeft: "60px",
                  paddingTop: "2px",
                  paddingBottom: "20px",
                }}
              >
                {message.date}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            backgroundColor: "#a09e9e",
            width: "100%",
            height: "70px",
            position: "absolute",
            bottom: "10px",
            marginLeft: "-20px",
          }}
        >
          <textarea
            className="inputMessage"
            name="text"
            id="text"
            value="t"
            // onInput="this.parentNode.dataset.replicatedValue = this.value"
          >
            {" "}
          </textarea>
          <button className="sendButton" onClick={sendMessage}>
            send
          </button>
          <br />
          <form action="/profile" method="post" encType="multipart/form-data">
            <input
              className="sendButton"
              type="file"
              name="image"
              size="large"
              onChange={(e) => setImage(e.target.files[0])} // if multiply withput [0]
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Messages;
