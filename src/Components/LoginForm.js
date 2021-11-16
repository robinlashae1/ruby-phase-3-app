import { useState } from "react";
import useValidate from "../hooks/useValidate";

function LoginForm() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    passwordConfirm: ''
  });
  const [message, setMessage] = useState();
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const [createUser, setCreateUser] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  
  const resetLoginData = () => {
    setLoginData({username: '', password: '', passwordConfirm: ''})
  };

  const setLoggedInUser = (data) => {
    localStorage.setItem('login_token', data.login_token);
    localStorage.setItem('user_id', data.user_id);
    setUserId(data.user_id);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    };
    setDisableForm(true);
    fetch('http://localhost:9292/users/login', options)
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          resetLoginData();
          setMessage('Successfully logged in!');
          setLoggedInUser(data);
          // localStorage.setItem('login_token', data.login_token);
          // localStorage.setItem('user_id', data.user_id);
          // setUserId(data.user_id);
        } else {
          setMessage('Invalid login credentials.');
        }
        setDisableForm(false);
      });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (loginData.password !== loginData.passwordConfirm) {
      setMessage('Passwords do not match.');
      return null;
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    };
    setDisableForm(true);
    fetch('http://localhost:9292/users', options)
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          resetLoginData();
          setMessage('Successfully created account!');
          setLoggedInUser(data);
        } else {
          setMessage(data.message);
        }
        setDisableForm(false);
      })
  };

  const handleLogout = () => {
    setDisableForm(true);
    fetch(`http://localhost:9292/users/${localStorage.getItem('user_id')}/logout?login_token=${localStorage.getItem('login_token')}`)
      .then(resp => resp.json())
      .then(data => {
        localStorage.removeItem('login_token');
        localStorage.removeItem('user_id');
        resetLoginData();
        setMessage(null);
        setCreateUser(false);
        setUserId(null);
        setDisableForm(false);
      });
  };

  const handleFormChange = (e) => {
    setLoginData(currentLoginData => Object.assign({...currentLoginData, [e.target.name]: e.target.value}))
  };

  const handleCreateUserToggle = () => {
    resetLoginData();
    setMessage(null);
    setCreateUser(currentCreateUser => !currentCreateUser);
  }

  let form = <></>;
  const userValidation = useValidate(userId);
  if (userValidation.status === "rejected") {
    form = (
      <>
        <form onSubmit={createUser ? handleCreateUser : handleLogin}>
          {message ? <div>{message}</div> : null}
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" placeholder="username" value={loginData.username} onChange={handleFormChange} disabled={disableForm} />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" placeholder="password" value={loginData.password} onChange={handleFormChange} disabled={disableForm} />
          {createUser ? 
            <>
              <label htmlFor="passwordConfirm">Confirm Password: </label>
              <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="confirm password" value={loginData.passwordConfirm} onChange={handleFormChange} disabled={disableForm} />
            </> : null}
          <input type="submit" value={createUser ? "Create User" : "Log In"} disabled={disableForm} />
        </form>
        <button onClick={handleCreateUserToggle}>
          {createUser ? "Already have an account?" : "Need an account?"}
        </button>
      </>
    );
  } else if (userValidation.status === "success") {
    form = (
      <>
        Welcome, {userValidation.username}
        <button onClick={handleLogout} disabled={disableForm}>Log Out</button>
      </>
    );
  }

  return (
    form
  );
}

export default LoginForm;