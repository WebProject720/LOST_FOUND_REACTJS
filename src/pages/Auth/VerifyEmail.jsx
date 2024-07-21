import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, ShowAlertMsg } from "../../components/components";
import { useForm } from "react-hook-form";
import usersApi from "../../APIs/users.api";
import { useDispatch } from "react-redux";
import { login } from "../../ReduxStore/StoreComponents/LoggedUser";

const VerifyEmail = ({}) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (!Loader) {
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
    setAlert(true);
  };

  const email = localStorage?.getItem("SignUpUserEmail")?.toString();
  const password = localStorage?.getItem("SignUpUserPassword")?.toString();
  if (!email || !password) {
    console.error("Email or Password not found ");
    useEffect(() => {
      navigate("/Auth/register");
    }, [navigate]);
    return;
  } 
  if(email && password) {
    // setAlertFun(false, true, `OTP send to ${email || "null"}`);
  }
  const SubmitOTP = async (data) => {
    setAlertFun(true);
    const response = await usersApi.register(email, password, Number(data.OTP));
    if (!response.value) {
      console.log(response.message || " Invalid OTP");
      setAlertFun(false, false, response?.message || " Invalid OTP");
      // navigate("/Auth/register");
    } else {
      dispatch(login({ LoggedUser: response.data.user }));
      setAlertFun(
        false,
        true,
        response?.message || "User Registed Successfully"
      );
      setTimeout(() => {
        localStorage.removeItem("SignUpUserPassword");
        localStorage.removeItem("SignUpUserEmail");
        navigate("/");
      }, 2000);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(SubmitOTP)}
      className="form flex flex-col gap-3 items-center justify-center w-full"
    >
      {showAlert && <ShowAlertMsg param={alertParams} />}
      {email && <p className="text-white text-start w-full">Email send To : {email || None} </p> }
      <div id="" className="w-full">
        <Input
          inputType="text"
          placeholder="OTP"
          {...register("OTP", { required: true })}
        />
      </div>
      <div className="w-full text-start">
        <p className="text-white">
        By Click here you are agree To our <span className="text-gray-300"> Term & Contions </span>
        </p>
      </div>
      <div className="w-full">
        <Button type="submit" text="Verify" />
      </div>
      <hr className="w-full" />
      <div
        className="Links w-full
      flex flex-row justify-between
        text-white"
      >
        <Link to={"/Auth"}>Login</Link>
        <Link to={"/Auth/register"}>Go Sign Up</Link>
      </div>
    </form>
  );
};
export { VerifyEmail };
