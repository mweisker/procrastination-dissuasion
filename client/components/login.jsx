import React, { useState, useEffect } from "react";

const login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary validation or submit the form data
    // to the server using an API call.
    // For simplicity, this example just logs the form data.
    console.log("Username:", username);
    console.log("Password:", password);
    if (username === '' || password === '') alert('Excuse me, how are we going to find your information if you don\'t fill out the form completely?')
    const postFetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({UserName: username, Password: password})
    }
    const findUser = async () => {
      try {
        const findUser = await fetch('/login', postFetchOptions);
        console.log(findUser);
        if (findUser.status === 400) alert('Username or Password does not exist, take a deep breath and try again.  Or if you forgot your login information, just register as a new user.  We don\'t change passwords here')
        const parsedResult = await findUser.json();
        console.log('parsed ', parsedResult);
        const userData = { userId: parsedResult.userid, userName: parsedResult.username };
        props.setUserInfo(userData);
        
      } catch (err) {
        console.log(`Error in findUser: ${err}`)
      }
    }
    findUser();
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="loginUsername">Username:</label>
        <input
          type="text"
          id="loginUsername"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="loginPassword">Password:</label>
        <input
          type="password"
          id="loginPassword"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default login;
