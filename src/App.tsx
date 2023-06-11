import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./store/user/user.slice";

import "./App.css";
import Input from "./components/Input.component";
import Button from "./components/Button.component";

import { LoginCredentials, UserResponse } from "./store/types/types";

import Swal from "sweetalert2";
import { AxiosError } from "axios";

const defaultFields = {
  username: "",
  password: "",
};

function App() {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState<LoginCredentials>(defaultFields);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // const login = async () => {
  //   Swal.fire({
  //     title: "Logging in...",
  //     allowOutsideClick: false,
  //   });
  //   try {
  //     const fetch = await dispatch(loginUser(formFields)).unwrap();
  //     console.log("success", fetch);
  //     Swal.close();
  //     Swal.fire({
  //       icon: "success",
  //       title: "Login Successful",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   } catch (error) {
  //     console.log("failed", error);
  //     Swal.close();
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Something went wrong!",
  //       footer: '<a href="">Why do I have this issue?</a>',
  //     });
  //   }
  // };

  const login = async () => {
    Swal.fire({
      title: "Logging in...",
      allowOutsideClick: false,
    });

    try {
      await dispatch(loginUser(formFields)).unwrap();
      console.log("Login successful");
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      const axiosError = error as AxiosError<UserResponse>;
      console.log("Login failed", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: axiosError.message || "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <Input name="username" onInput={onChangeHandler} />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <Input name="password" onInput={onChangeHandler} />
      </div>
      <Button onClick={login}>Submit</Button>
    </>
  );
}

export default App;
