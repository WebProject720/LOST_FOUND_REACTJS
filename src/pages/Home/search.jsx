import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import postApi from "../../APIs/mails.api";
import {
  ShortPost,
  Button,
  ShowAlertMsg,
  NoPost,
} from "../../components/components";

export const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const string = query.get("q");
  const navigate = useNavigate();
  const [post, setPosts] = useState();
  const [length, setLenght] = useState(0);
  if (!string) {
    navigate("/");
  }

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
    postApi
      .search(string)
      .then((res) => {
        if (res.data) {
          setPosts(res.data);
          setLenght(res.data.length);
          setAlert(false);
        } else {
          setAlertFun(false, false, "Something wrong");
        }
      })
      .catch((error) => {
        console.log("Got Error", error);
        setAlertFun(false, false, "Something wrong");
      });
  }, [string]);
  return (
    <div
      className="p-2 flex flex-col flex-nowrap gap-2 justify-center items-center
  "
    >
      {showAlert && <ShowAlertMsg param={alertParams} />}
      <div className="text-left w-full laptop:w-3/5 py-4">
        <p className="text-white text-2xl ">
          <span>Result Found : </span>
          <span>{length}</span>
        </p>
      </div>
      {post && post.map((e, i) => <ShortPost doc={e} key={i} />)}
      {post?.length == 0 && <NoPost />}
    </div>
  );
};
