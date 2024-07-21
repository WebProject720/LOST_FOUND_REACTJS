import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input, Button, ShowAlertMsg } from "../../components/components";
import { useForm } from "react-hook-form";
import userApi from "../../APIs/users.api";
import { login, logout } from "../../ReduxStore/StoreComponents/LoggedUser";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const q = query.get("q");
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

  const LoginEvent = async (data) => {
    setAlertFun(true, false, "Loading...");
    if (q == "0") {
      const response = await userApi.delete(data.email, data.password);
      if (response) {
        const res = await userApi.logout();
        dispatch(logout());
        setAlertFun(false, true, "Account Deleted !!");
      }else{
        setAlertFun(false, false, response?.message || "Try again !!");
      }
    } else {
      const response = await userApi.login(data.email, data.password);
      if (!response?.value) {
        setAlertFun(false, false, response?.message || "Try again !!");
      } else {
        dispatch(login({ LoggedUser: response.data.user }));
        setAlertFun(false, true, "User Logged Successfully");
      }
    }
    setTimeout(() => {
      setAlert(false);
      navigate("/");
    }, 2000);
  };
  return (
    <form
      onSubmit={handleSubmit(LoginEvent)}
      className="form flex flex-col gap-3 items-center justify-center w-full"
    >
      {showAlert && <ShowAlertMsg param={alertParams} />}
      <div id="" className="w-full">
        <Input
          inputType="email"
          placeholder="Enter Email"
          {...register("email", { required: true })}
        />
      </div>
      <div className="w-full">
        <Input
          inputType="password"
          placeholder="Enter password"
          {...register("password", { required: true })}
        />
      </div>
      <div className="w-full">
        <Button type="submit" text="Save" />
      </div>
      <hr className="my-3 w-full" />
      <div
        className="Links w-full
      flex flex-row justify-between flex-wrap
        text-white"
      >
        <Link to={"/Auth/register"}>Don't Have Account ?</Link>
        <Link to={"/Auth/ResetPassword"}>Forget Password </Link>
      </div>
    </form>
  );
};
export { Login };
