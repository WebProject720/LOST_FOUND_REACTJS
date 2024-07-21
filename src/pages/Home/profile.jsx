import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import userApi from "../../APIs/users.api";
import { Button, ShortPost, ShowAlertMsg,NoPost } from "../../components/components";
import { login } from "../../ReduxStore/StoreComponents/LoggedUser";

export const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search);
  const email = query.get("email");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const LoggedUser = useSelector((state) => state.auth.LoggedUser);
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);

  //Global Alert Box
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

  useEffect(() => {
    setAlertFun(true);
    userApi.user(email).then((res) => {
      if (!res.value) {
        navigate("/");
      }
      setCurrentUser(res.data);
    });
    setAlert(false);
  }, [LoggedUser, email]);

  const updateImage = (e) => {
    setAlertFun(true);
    const form = new FormData();
    form.append("profileImage", e.target.files[0]);
    userApi
      .updateProfileImage(form)
      .then((res) => {
        if (LoggedUser.email == email) {
          dispatch(login({ LoggedUser: res.data }));
        } else {
          setCurrentUser(res.data);
        }
        setAlert(false);
      })
      .catch((error) => {
        console.log("Got Error", error);
        setAlert(false, false, "Something Wrong");
      });
  };
  return (
    <div className="w-full flex flex-col flex-nowrap justify-center items-cente">
      {showAlert && <ShowAlertMsg param={alertParams} />}
      {currentUser && (
        <div className="text-white flex flex-col justify-center items-center gap-3">
          <div className="flex w-full flex-col justify-between laptop:w-3/5 items-start gap-3">
            <div className="w-full flex justify-center items-center">
              <img
                src={currentUser.profileImage || "Assets/user-profile.svg"}
                className="size-40 rounded-full border-white border-4 object-cover"
                alt="error"
              />
            </div>
            <div className="flex gap-1 flex-col p-4 w-full bg-white bg-opacity-15 rounded-md">
              <div>
                <p className="text-2xl py-2">Profile Details :</p>
              </div>
              <p>
                <span className="text-opacity-50 text-white">Email : </span>{" "}
                <span> {currentUser.email}</span>
              </p>
              <p>
                {currentUser.username && (
                  <span className="text-opacity-50 text-white">
                    Username :{" "}
                  </span>
                )}
                <span>
                  {currentUser.username ? currentUser.username : undefined}
                </span>
              </p>
              <div>
                <p>
                  <span className="text-opacity-50 text-white">
                    Total Post :{" "}
                  </span>{" "}
                  <span> {currentUser?.sendMails.length}</span>
                </p>
              </div>
              <div>
                <p>
                  <span className="text-opacity-50 text-white">
                    Acccount Created On :
                  </span>
                  <span>
                    {new Date(currentUser.createdAt).toLocaleDateString()} ,{" "}
                    {new Date(currentUser.createdAt)
                      .toLocaleTimeString([], {
                        hour12: true,
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      .toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
            <div className="action flex gap-2 w-full">
              {currentUser && LoggedUser?.email == currentUser.email && (
                <div className="grid grid-flow-col gap-2 w-full flex-wrap">
                  <input
                    className="w-full text-sm p-2 py-4 text-white border-0 border-gray-300 rounded-md cursor-pointer bg-white dark:text-gray-800 focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 outline-none 
                file:rounded-md file:border-opacity-50 file:focus:border-gray-400 file:p-1 file:border-gray-900 file:outline-none file:bg-white
                min-h-10 bg-opacity-50  hidden
                "
                    type="file"
                    name="file"
                    id="file"
                    accept=".jpg, .png , .jpeg"
                    onChange={updateImage}
                  />
                  <label
                    htmlFor="file"
                    className="bg-white text-blue-600 text-center
                  rounded-md font-bold text-xl
                  flex justify-center items-center py-2
                  "
                  >
                    Update Profile Image
                  </label>
                  <Button
                    text="Delete Account"
                    onClick={(e) => navigate("/Auth?q=0")}
                  ></Button>
                </div>
              )}
            </div>
          </div>
          <div className="posts w-full">
            <div className="flex justify-center">
              <span className="text-2xl py-4 text-left laptop:w-3/5">
                {currentUser && currentUser.sendMails.length>0 ?"Your Posts :" : <NoPost/>}
              </span>
            </div>
            <div className=" flex flex-col flex-nowrap gap-2 justify-center items-center">
              {currentUser &&
                currentUser.sendMails.map((e) => (
                  <ShortPost doc={e} key={e._id} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
