import "./App.css";
import axios from "axios";
import { useState } from "react";
import {jwtDecode} from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [login, setLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userToken, setUserToken]= useState("")

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post("/refresh", { token: user.refreshToken });
  //     setUser({
  //       ...user,
  //       accessToken: res.data.accessToken,
  //       refreshToken: res.data.refreshToken,
  //     });
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const axiosJWT = axios.create()

  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     let currentDate = new Date();
  //     const decodedToken = jwt_decode(user.accessToken);
  //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //       const data = await refreshToken();
  //       config.headers["authorization"] = "Bearer " + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const _email = loginEmail;
    const _pass = loginPassword;
    try {
      const response = await axios.get(
        `http://localhost:8800/details/${_email}`
      );
      console.log(response);
      if (response.status === 200) {
        setUser(response.data.user);
        setUserToken(response.data.token);
        console.log(response.data.user.name);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   try {
    //     const res = await axios.post("/login", { username, password });
    //     setUser(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    console.log(name, email, password, role);
    try {
      const response = await axios.post("http://localhost:8800/details", {
        name,
        email,
        password,
        role,
      });
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const handleDelete = async (id) => {
  //   setSuccess(false);
  //   setError(false);
  //   try {
  //     await axiosJWT.delete("/users/" + id, {
  //       headers: { authorization: "Bearer " + user.accessToken },
  //     });
  //     setSuccess(true);
  //   } catch (err) {
  //     setError(true);
  //   }
  // };

  const handleUserActions = async() =>{
    const token= userToken;
    let currentDate = new Date();
    const decodedToken = jwtDecode(token)
    console.log(decodedToken);
    if(decodedToken.exp * 1000 < currentDate){
      setUser(null);
    }

  }

  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <div className="container">
      {user ? 
      (
        <div className="home">
          <span>
            Welcome to the <b>{user.isAdmin ? "admin" : "user"}</b> dashboard{" "}
            <b>{user.name}</b>.
          </span>
          <span>Users Actions</span>
          <button
            className="logOutButton"
            onClick={() =>
              setUser(null)
            }
          >
            Logout
          </button>
          <button
            className="userActionButton"
            onClick={
              handleUserActions
              // console.log("handleDelete")
            }
          >
            User actions
          </button>
          {error && (
            <span className="error">
              You are not allowed to delete this user!
            </span>
          )}
          {success && (
            <span className="success">
              User has been deleted successfully...
            </span>
          )}
        </div>
      ) : 
      !login ? 
      (
        <div className="signup">
          <form
            onSubmit={
              handleSubmit
              // console.log("Hi")
            }
          >
            <span className="formTitle">Registration Details</span>
            <input
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="role"
              onChange={(e) => setRole(e.target.value)}
            />
            <button type="submit" className="submitButton">
              SignUp
            </button>
            {success && (
              <span className="success">
                User has been created successfully...
              </span>
            )}
          </form>
          <button type="login" className="loginButton" onClick={handleLogin}>
            Login
          </button>
        </div>
      ) : 
      (
        <div className="signup">
          <form
            onSubmit={
              handleUserLogin
              // console.log("Hi")
            }
          >
            <span className="formTitle">Login</span>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button type="submit" className="submitButton">
              login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
