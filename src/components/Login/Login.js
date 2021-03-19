
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailandPassword, handleFbSignIn, handleGitSignIn, handleGoogleSignIn, handleLogOut, initializeLoginFramework, signInWithEmailAndPassword } from "./LoginManager";

function Login() {
  initializeLoginFramework();
  const [setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photoURL: '',
    error: '',
    success: '',
  });
  
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      });
  };

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  };

  const gitSignIn = () => {
    handleGitSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  };

  const logOut = () => {
    handleLogOut()
      .then(res => {
        handleResponse(res, false);
      })
  };

  const handleSubmit = (event) => {
    if (newUser && user.name && user.email && user.password) {
      console.log('submitting');
      createUserWithEmailandPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    event.preventDefault();
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleChange = (event) => {
    let isFormValid = true;
    if (event.target.name === "email") {
      const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      isFormValid = re.test(event.target.value);
    }
    if (event.target.name === "password") {
      const reP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      isFormValid = reP.test(event.target.value);
    }

    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      { user.isSignedIn ? <button onClick={logOut}>Log Out</button> :
        <button onClick={googleSignIn}>Sign In</button>
      }
      <br />
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      <br />
      <button onClick={gitSignIn} >Sign in using Github</button>


      {
        user.isSignedIn && <p>Welcome, {user.name}</p>
      }
      <br />
      <h1>Register</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
      <label htmlFor="newUser">Sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleChange} name="name" required placeholder="Your Name" />}
        <br />
        <input type="email" onBlur={handleChange} required name="email" placeholder="Your Email Here" />
        <br />
        <input type="password" onChange={handleChange} required name="password" placeholder="Your Password Here" />
        <br />
        <button type="submit">Submit</button>
      </form>
      {
        user.error ?
          <p style={{ color: 'red' }}>{user.error}</p> :
          <p style={{ color: 'green' }}>{user.success}</p>

      }

      {
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
        </div>

      }




    </div>
  );
}

export default Login;
