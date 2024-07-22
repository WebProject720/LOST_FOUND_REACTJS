import { Outlet, useNavigate } from "react-router";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Logo,
  Button,
  ShowAlertMsg,
  Footer,
} from "../../components/components";
import { GoogleAuth } from "../../APIs/Google.Auth";
import { useDispatch } from "react-redux";
import { login } from "../../ReduxStore/StoreComponents/LoggedUser";
import { Link } from "react-router-dom";

const AuthLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setAlert] = useState(false);
  const [alertParams, setAlertParam] = useState({
    Loader: false,
    type: false,
    Msg: "Something went wrong",
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

  const GoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      GoogleAuth(response).then((UserResponse) => {
        if (UserResponse) {
          dispatch(login({ LoggedUser: UserResponse.user }));
          setAlertFun(false, true, "User Logged Successfully");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setAlertFun(false, false, "Login Failled !");
        }
      });
    },
    onError: (error) => {
      setAlertFun(false, false, "Try again");
    },
  });
  return (
    <div
      className="bg-blue-700 Max650:bg-white min-h-screen  flex-col items-center justify-center gap-5
    grid grid-cols-1 laptop:grid-cols-2 justify-items-center content-center
    "
    >
      {showAlert && <ShowAlertMsg param={alertParams} />}
      <div
        className=" flex container Max650:w-11/12 w-3/4 Max650:bg-blue-500 Max650:bg-opacity-80 bg-blue-800 rounded-md p-5
       flex-col items-center justify-center gap-5
      "
      >
        <div className="flex flex-col flex-nowrap justify-center items-center">
          <div className="">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div>
            <Link
              to={"/"}
              className={`text-white text-center  font-bold text-2xl`}
            >
              Lost & Found
            </Link>
          </div>
        </div>

        <Outlet />

        <div className="google-login w-full">
          <hr className="my-3" />
          <div className="">
            <Button
              onClick={() => {
                GoogleLogin();
              }}
              addImage={true}
              ImageUrl="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              text=" Continue with Google"
            />
          </div>
        </div>
      </div>
      <div className=" sideImage size-full phone:hidden">
        <div className="image size-full p-7">
          <img
            className=" flex-auto justify-center items-center size-full rounded-md"
            src="https://www.justinmind.com/wp-content/webp-express/webp-images/uploads/2018/10/inspiration-login-forms-list-1024x655.png.webp"
            alt=""
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { AuthLayout };
