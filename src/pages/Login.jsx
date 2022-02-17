function Login(props) {
  return (
    <div>
      <h1>Log in</h1>
      <form action="http://localhost:4000/login" method="POST">
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" id="email" placeholder="Enter Email" />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
