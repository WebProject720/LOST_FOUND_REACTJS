import { Link, useNavigate } from "react-router-dom";
import { Input, Button, ShowAlertMsg } from "../../components/components";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import usersApi from "../../APIs/users.api";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { register: registerEmail, handleSubmit: HandleEmail } = useForm();
  const {
    register: registerVerify,
    handleSubmit: HandleVerify,
    setValue,
    watch,
  } = useForm();
  const [enableBtn, setBtn] = useState(true);

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

  const GenerateOTP = async (data) => {
    setAlertFun(true);
    const response = await usersApi.SendOTP(data.email, false);
    if (response?.value) {
      setAlertFun(false, true, response?.message || "OTP send Successfully");
      setValue("email", data.email);
      setBtn(false);
    } else {
      setAlertFun(false, false, response?.message || "OTP not send Try again");
    }
  };
  const VerifyOTP = async (data) => {
    setAlertFun(true);
    const response = await usersApi.verifyAndUpdate(
      data.OTP,
      data.password,
      data.email
    );
    if (response?.value) {
      setAlertFun(false, true, response.message || "Password Updated ");
      setTimeout(() => {
        navigate("/Auth");
      }, 2000);
    } else {
      setAlertFun(false, false, response?.message || "Try again");
    }
  };
  return (
    <div className="form flex flex-col gap-3 items-center justify-center w-full">
      {showAlert && <ShowAlertMsg param={alertParams} />}
      <form
        onSubmit={HandleEmail(GenerateOTP)}
        className="form flex flex-col gap-3 items-center justify-center w-full"
      >
        <div id="" className="w-full">
          <Input
            {...registerEmail("email", { required: true })}
            inputType="email"
            placeholder="Enter Email"
            disable={!enableBtn}
          />
        </div>

        <div className="w-full">
          <Button type="submit" text="Send OTP" disable={!enableBtn} />
        </div>
      </form>
      <hr className="w-full my-3" />
      <form
        onSubmit={HandleVerify(VerifyOTP)}
        className="form flex flex-col gap-3 items-center justify-center w-full"
      >
        <div id="" className="w-full">
          <Input
            {...registerVerify("OTP", { required: true })}
            inputType="password"
            placeholder="OTP"
            disable={enableBtn}
          />
        </div>
        <div id="" className="w-full">
          <Input
            {...registerVerify("password", { required: true })}
            inputType="password"
            placeholder="New Password"
            disable={enableBtn}
          />
        </div>
        <div className="w-full">
          <Button type="submit" text="Verify OTP" disable={enableBtn} />
        </div>
      </form>
      <hr className="my-3 w-full" />
      <div
        className="Links w-full
      flex flex-row justify-between
        text-white"
      >
        <Link to={"/Auth"}>Go Login </Link>
        <Link to={"/Auth/register"}>Go Sign Up</Link>
      </div>
    </div>
  );
};
export { ForgetPassword };
