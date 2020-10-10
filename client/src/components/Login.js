import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
const Login = () => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  //using a spread operator for login so it only captures the last input as opposed to all of it

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('login', login)
      .then((res) => {
        console.log(res);
        window.localStorage.setItem('token', res.data.payload);
        history.push('/bubblepage');
      })
      .catch((err) => console.log('Oh NO!', err));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form className='forms-style' onSubmit={handleSubmit}>
          <label htmlFor='username'>
            <input
              type='text'
              name='username'
              label='username'
              value={login.username}
              onChange={handleChange}
              className='input'
            />
          </label>
          <label htmlFor='password'>
            <input
              type='text'
              name='password'
              label='password'
              value={login.password}
              onChange={handleChange}
              className='input'
            />
          </label>
          <button onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
