import { useState } from "react";
import useValidate from "../hooks/useValidate";

function LoginForm() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState();
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));

  const handleLogin = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    };
    fetch('http://localhost:9292/login', options)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setLoginData({username: '', password: ''})
        if (data.success) {
          setMessage('Successfully logged in!');
          localStorage.setItem('login_token', data.login_token);
          localStorage.setItem('user_id', data.user_id);
          setUserId(data.user_id);
        } else {
          setMessage('Invalid login credentials.');
        }
      });
  };

  const handleLogout = () => {
    fetch(`http://localhost:9292/users/${localStorage.getItem('user_id')}/logout?login_token=${localStorage.getItem('login_token')}`)
      .then(resp => resp.json())
      .then(data => {
        localStorage.removeItem('login_token');
        localStorage.removeItem('user_id');
        setMessage(null);
        setUserId(null);
      });
  };

  const handleFormChange = (e) => {
    setLoginData(currentLoginData => Object.assign({...currentLoginData, [e.target.name]: e.target.value}))
  };

  let form = <></>;
  const userValidation = useValidate(userId);
  if (userValidation.status === "rejected") {
    form = (
      <form onSubmit={handleLogin}>
        {message ? <div>{message}</div> : null}
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" placeholder="username" value={loginData.username} onChange={handleFormChange} />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" placeholder="password" value={loginData.password} onChange={handleFormChange} />
        <input type="submit" value="Log In" />
      </form>
    );
  } else if (userValidation.status === "success") {
    form = (
      <>
        Welcome, {userValidation.username}
        <button onClick={handleLogout}>Log Out</button>
      </>
    );
  }

  return (
    form
  );
}

export default LoginForm;