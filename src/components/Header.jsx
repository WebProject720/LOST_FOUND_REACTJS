import React, { useEffect, useState } from "react";
import { Logo, Button, ShowAlertMsg } from "./components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userApi from "../APIs/users.api";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxStore/StoreComponents/LoggedUser";

const Header = () => {
  const [searchText, setSearch] = useState("");
  const navigate = useNavigate();
  const LoggedUser = useSelector((state) => state?.auth?.LoggedUser);
  const isUserLogged = useSelector((state) => state?.auth?.status);
  const [userLogged, setUserLogged] = useState(false);

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
    setUserLogged(Boolean(isUserLogged));
  }, [isUserLogged]);
  const [showSearchBar, setSearchBar] = useState(false);

  const dispatch = useDispatch();
  const LogOut = async () => {
    setAlertFun(true);
    const response = await userApi.logout();
    if (response) {
      dispatch(logout());
      setAlertFun(false, true, "Logout Successfully");
    } else {
      setAlertFun(false, false, response?.message || "Try again");
    }
  };
  const searchEvent = () => {
    if (searchText == "") {
      setSearchBar(true);
    }
    if (showSearchBar) {
      setSearch("");
      setSearchBar(false);
    }
    navigate(`/search?q=${searchText}`);
  };
  const cancelSearchEvent = () => {
    if (searchText == "") setSearchBar(false);
    setSearch("");
  };
  return (
    <div className="header bg-[#050459]  fixed w-full z-10 py-1 top-0
    bg-gradient-to-r from-[#9d3232] to-[#1c37b9]
    "
    >
      <div
        className="header-container px-2 py-1   flex-row gap-1 justify-between items-center
       grid grid-cols-6 
      "
      >
        {showAlert && <ShowAlertMsg param={alertParams} />}
        <div
          className={`left flex flex-row gap-1 col-span-1 justify-start ${
            showSearchBar ? "hidden" : null
          }`}
        >
          <div className="logo ">
            <NavLink to={"/"}>
              <Logo style="" />
            </NavLink>
          </div>
        </div>
        <div
          className={`center flex flex-row gap-1 items-center justify-end col-span-3 w-full Max650:hidden
        ${showSearchBar ? "!flex col-span-6 justify-center" : null}
          `}
        >
          <div
            action=""
            className="flex flex-row gap-0 items-center rounded-full w-5/6
          border-2 border-white border-opacity-50 hover:border-opacity-100
          "
          >
            <div
              className="flex flex-row gap-1 items-center w-full
            bg-black  bg-opacity-20 rounded-l-full p-1 pl-5
            "
            >
              <input
                type="text"
                className="bg-transparent outline-none w-full text-xl text-white"
                name=""
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={searchText}
                id=""
              />
              <button type="button" onClick={cancelSearchEvent}>
                <img
                  className="size-10 Max650:size-6 pr-1"
                  src="https://raw.githubusercontent.com/WebProject720/LOST_FOUND_REACTJS/1eda6f4abdafa0a1f63c0558ba5369bfba8d5fe5/Assets/cancel-svgrepo-com.svg"
                  alt="CancelIcon"
                />
              </button>
            </div>
            <button
              onClick={searchEvent}
              type="submit"
              className="bg-black  bg-opacity-90  p-1 px-5 rounded-r-full"
            >
              <img
                className="size-10 Max650:size-6"
                src="https://raw.githubusercontent.com/WebProject720/LOST_FOUND_REACTJS/1eda6f4abdafa0a1f63c0558ba5369bfba8d5fe5/Assets/search-svgrepo-com.svg"
                alt="SearchIcon"
              />
            </button>
          </div>
        </div>
        <div
          className={`right flex flex-row gap-2 items-center justify-end col-span-2 Max650:col-span-5
        ${showSearchBar ? "hidden" : null}
        `}
        >
          <button
            onClick={searchEvent}
            type="submit"
            className="bg-transparent Min650:hidden  bg-opacity-40  p-1 px-3 rounded-r-full"
          >
            <img
              className="size-10 Max650:size-6"
              src="https://raw.githubusercontent.com/WebProject720/LOST_FOUND_REACTJS/1eda6f4abdafa0a1f63c0558ba5369bfba8d5fe5/Assets/search-svgrepo-com.svg"
              alt="SearchIcon"
            />
          </button>
          {!userLogged && (
            <div className="actions-btn flex flex-row gap-2 items-center">
              <NavLink
                to="/Auth"
                className="bg-white p-1 rounded-sm font-bold text-[#050459]
                text-nowrap
                "
              >
                <span>Login</span>
              </NavLink>
              <NavLink
                to="/Auth/register"
                className="bg-white p-1 rounded-sm text-[#050459]
                text-nowrap 
                "
              >
                <span
                className="font-bold text-nowrap"
                >Get Started</span>
              </NavLink>
            </div>
          )}
          
          {userLogged && (
            <div className="actions-btn flex flex-row gap-3 items-center">
              <NavLink
                className={`hover:bg-white p-1 rounded-full hover:bg-opacity-20`}
              >
                <img
                  className="size-10 Max650:size-6"
                  src="https://raw.githubusercontent.com/WebProject720/LOST_FOUND_REACTJS/1eda6f4abdafa0a1f63c0558ba5369bfba8d5fe5/Assets/notification-bell-svgrepo-com.svg"
                  alt="Notification"
                />
              </NavLink>
              <NavLink to={"/addpost"}>
                <img
                  className="size-10 Max650:size-6"
                  src="https://raw.githubusercontent.com/WebProject720/LOST_FOUND_REACTJS/1eda6f4abdafa0a1f63c0558ba5369bfba8d5fe5/Assets/content-tag-add-icon-svgrepo-com.svg"
                  alt="Add Post"
                />
              </NavLink>

              <div className="profile group">
                <NavLink to={`/profile?email=${LoggedUser?.email}`}>
                  <img
                    className="size-10 Max650:size-6 rounded-full object-cover"
                    src={
                      LoggedUser?.profileImage ||
                      "https://raw.githubusercontent.com/WebProject720/LOST_FOUND_REACTJS/1eda6f4abdafa0a1f63c0558ba5369bfba8d5fe5/Assets/user-profile.svg"
                    }
                    alt="Profile"
                  />
                </NavLink>
                <div
                  className={`hidden ShowBox absolute  border-2 min-h-8 min-w-40 
                right-6
                 bg-blue-400 rounded-md group-hover:flex flex-col`}
                >
                  <NavLink
                    to={`/profile?email=${LoggedUser?.email}`}
                    className="email  bg-blue-800 text-white rounded-t-md w-full p-1 py-2 hover:bg-white hover:text-black"
                  >
                    <p className="">{LoggedUser?.email}</p>
                  </NavLink>
                  <div className="p-1 bg-gray-400 rounded-b-md text-black hover:bg-white hover:text-black">
                    <NavLink
                      onClick={LogOut}
                      className=" flex items-center text-black"
                    >
                      <img
                        className="size-8"
                        src="https://img.icons8.com/?size=100&id=2PACu2MQ2hiH&format=png&color=000000"
                        alt=""
                      />
                      Logout
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export { Header };
