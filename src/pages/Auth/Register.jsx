import { Link } from "react-router-dom";
import { Input, Button,ShowAlertMsg } from "../../components/components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import userApi from "../../APIs/users.api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showAlert, setAlert] = useState(false);
  const [alertParams, setAlertParam] = useState({
    Loader: false,
    type: false,
    Msg: "",
  });
  const setAlertFun = (Loader, type = false, Msg = "Something wrong !!") => {
    setAlert(false);
    setAlertParam({
      Loader: Loader,
      type: type,
      Msg: Msg,
    });
    setAlert(true);
    if (!Loader) {
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };

  const SignUpEvent = async (data) => {
    if (data.Password != data.RePassword) {
      setAlertFun(false, false, "Password must be same ");
      return false;
    }
    setAlertFun(true);
    const response = await userApi.user(data.email);
    if (!response?.value) {
      localStorage.removeItem("SignUpUserPassword");
      localStorage.removeItem("SignUpUserEmail");
      localStorage.setItem("SignUpUserEmail", data.email);
      localStorage.setItem("SignUpUserPassword", data.Password);
      setAlertFun(true);
      const SendOTP = await userApi.SendOTP(data.email);
      if (SendOTP) {
        navigate("/Auth/verifyEmail");
      } else {
        setAlertFun(false, false, "Something wrong, Try again");
      }
    } else {
      setAlertFun(false, false, "User already Exists");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(SignUpEvent)}
      className="form flex flex-col gap-3 items-center justify-center w-full"
    >
      {showAlert && <ShowAlertMsg param={alertParams} />}
      <div id="" className="w-full">
        <Input
          {...register("email", { required: true })}
          inputType="email"
          placeholder="Enter Email"
        />
      </div>
      <div className="w-full">
        <Input
          {...register("Password", { required: true })}
          inputType="password"
          placeholder="Enter password"
        ></Input>
      </div>
      <div className="w-full">
        <Input
          {...register("RePassword", { required: true })}
          inputType="password"
          placeholder="Re Enter password"
        ></Input>
      </div>
      <div className="w-full">
        <Button text="Save" />
      </div>
      <hr className="my-3 w-full" />
      <div
        className="Links w-full
      flex flex-row justify-between
        text-white"
      >
        <Link to={"/Auth"}>Go Login </Link>
        <Link to={"/Auth/ResetPassword"}>Forget Password ??</Link>
      </div>
    </form>
  );
};
export { Register };
