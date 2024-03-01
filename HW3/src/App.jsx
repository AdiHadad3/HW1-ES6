import { useState, useEffect } from "react";
import "./App.css";
import "./FuncComps/myCss.css";
import Register from "./FuncComps/Register";
import Login from "./FuncComps/Login";
import Profile from "./FuncComps/Profile";
import EditDetails from "./FuncComps/EditDetails";
import Swal from "sweetalert2";
import SystemAdmin from "./FuncComps/SystemAdmin";

function App() {
  const [logedUser, setLogedUser] = useState(undefined);
  const [userToEdit, setUserToEdit] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  //if the user want to edit details it will change to true
  const [showEdit, SetShowEdit] = useState(false);

  //admin details
  const admin = { name: "admin", password: "ad12343211ad" };

  //load users from the local storage
  const loadUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };

  //activated every time the system is loaded. load data from local and session storage
  useEffect(() => {
    const storedUsers = loadUsers();
    setUsers(storedUsers);
    const loged = loadFromSessionStorage("userData");
    //check if admin login
    if (loged != undefined && Object.keys(loged).length == 2) {
      setIsAdmin(true);
    } else {
      if (loged != undefined) {
        setUserToEdit(loged);
      }
    }
    setLogedUser(loged);
  }, []);

  //on every change on users the local storage updated
  useEffect(() => {
    if (users != undefined) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  //if register success show alert
  const showRegisterAlert = () => {
    Swal.fire({
      title: "success",
      text: "You have successfully registered!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  //swal alert on success login
  const showLoginAlert = () => {
    Swal.fire({
      title: "success",
      text: "You've logged in successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  //swal alert on success edit
  const showEditAlert = () => {
    Swal.fire({
      title: "success",
      text: "Your details changed",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  //registration to the system
  const registerUser = (userData) => {
    if (users.some((user) => user.email === userData.email)) {
      alert(
        "There is already a user with this email address, try another email..."
      );
    } else {
      setUsers((prev) => [...prev, userData]);
      showRegisterAlert();
    }
  };

  //check if the details exist and login the user
  const loginUser = (userN, password) => {
    if (userN == admin.name && password == admin.password) {
      setIsAdmin(true);
      saveToSessionStorage("userData", admin);
      return true;
    } else {
      setIsAdmin(false);
      const findUser = users.find(
        (user) => user.userName == userN && user.password === password
      );
      if (findUser) {
        saveToSessionStorage("userData", findUser);
        setUserToEdit(findUser);
        showLoginAlert();
        return true;
      } else return false;
    }
  };

  //load the loged user
  const loadFromSessionStorage = (key) => {
    const serializedValue = sessionStorage.getItem(key);
    if (serializedValue === null) {
      return undefined;
    } else {
      return JSON.parse(serializedValue);
    }
  };

  //save the loged user to the session storage
  const saveToSessionStorage = (key, value) => {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
    setLogedUser(value);
  };

  //if the flag true- this is a user did logout, otherwise, this is the admin
  const logoutUser = (flag) => {
    //if there is no email->this is the admin. clear session and set no one login
    if (!flag) {
      setIsAdmin(false);
    }
    SetShowEdit(false);
    sessionStorage.clear();
    setLogedUser(undefined);
  };

  //flag that the user want to edit its details
  const wantToEditDetails = () => {
    SetShowEdit(true);
  };

  //get all the details of the user and update its data
  const editUser = (userData) => {
    SetShowEdit(false);
    setUsers((prev) => {
      let updated = prev.map((user) => {
        if (user.email == userData.email) {
          return userData;
        }
        return user;
      });
      if (!isAdmin) {
        //use the updated data of the user in the loged user
        setLogedUser(userData);
        saveToSessionStorage("userData", userData);
        setUserToEdit(userData);
      }
      return updated;
    });
    showEditAlert();
  };

  //admin delete some user
  const deleteUser = (email) => {
    const removedUser = users.filter((user) => user.email != email);
    setUsers(removedUser);
    SetShowEdit(false);
  };

  //edit user by the admin
  const changeUserToEdit = (email) => {
    SetShowEdit(true);
    users.map((user) => {
      if (user.email == email) {
        setUserToEdit(user);
      }
    });
    console.log(users);
  };

  return (
    <>
      <main>
        <Register registerUser={registerUser} />
        <br />
        <Login loginUser={loginUser} />
        <br />
        {logedUser != undefined ? (
          isAdmin ? (
            <SystemAdmin
              users={users}
              deleteUser={deleteUser}
              changeUserToEdit={changeUserToEdit}
              logoutUser={logoutUser}
            />
          ) : (
            <Profile
              logedUser={logedUser}
              logoutUser={logoutUser}
              wantToEditDetails={wantToEditDetails}
            />
          )
        ) : (
          <p style={{ color: "#000" }}>יש להתחבר למערכת</p>
        )}{" "}
        <br />
        {showEdit && (
          <EditDetails editUser={editUser} userToEdit={userToEdit} />
        )}
      </main>
    </>
  );
}

export default App;
