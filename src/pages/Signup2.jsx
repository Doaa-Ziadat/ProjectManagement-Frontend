function Signup2(props) {
  return (
    <div>
      <h1> Signup</h1>
      <form action="http://localhost:4000/signup" method="POST">
        <p>User Name</p>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
        />
        <p>Email</p>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter a password"
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Signup2;
