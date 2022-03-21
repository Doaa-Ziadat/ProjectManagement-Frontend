import { useState } from "react";
function Login2(props) {
  // add function on click
  // use state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginSubmit() {
    const data = { email: email, password: password };
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((dataa) => {
        return dataa.json();
      })
      .then((d) => {
        console.log(d);
        if (d.success) window.location.href = "/";
      });
  }

  return (
    <div>
      <h1>Log in</h1>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        id="email"
        placeholder="Enter Email"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginSubmit}>Login</button>
    </div>
  );
}

export default Login2;
