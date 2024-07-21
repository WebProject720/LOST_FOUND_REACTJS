import React, { useEffect, useState } from "react";
import ReactHtmlParser from "html-react-parser";
import { Input, Button, ShowAlertMsg } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import postApi from "../APIs/mails.api";
import { updatePost } from "../ReduxStore/StoreComponents/PostStore";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { deletePostfromUser } from "../ReduxStore/StoreComponents/LoggedUser";

export const Post = React.forwardRef(function Post({ doc }, ref) {
  const navigate = useNavigate();
  if (!doc) {
    navigate("/");
  }
  const { register, handleSubmit, reset } = useForm();
  const { subject, status, Image, body, owner, Reply } = doc;
  const type = doc?.MailType?.toUpperCase();
  const updatedAt = new Date(doc?.updatedAt);
  const day = updatedAt.toLocaleDateString();
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const time = updatedAt.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

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
      }, 1000);
    }
  };

  const sendReply = async (e) => {
    setAlertFun(true);
    const response = await postApi.reply(doc._id, e.msg);
    if (response) {
      setAlertFun(false, true, "Reply posted ");
      dispatch(updatePost({ id: response.data._id, post: response.data }));
      reset({
        msg: "",
      });
    } else {
      setAlertFun(false, false, "Reply posted failed");
    }
  };

  const update = () => {
    navigate(`/addPost?id=${doc._id}`);
  };
  const deletePost = async () => {
    setAlertFun(true);
    const response = await postApi.deletePost(doc._id);
    if (!response) {
      setAlertFun(false, false, "Post Delete Failed");
    } else {
      setAlertFun(false, true, "Post Deleted");
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };
  const Deactivate = async () => {
    setAlertFun(true);
    const response = await postApi.changeStatus(doc._id);
    if (!response) {
      setAlertFun(false, false, "Visibility process failed");
    } else {
      setAlertFun(false, true, "Visibility Changed !!");
      dispatch(updatePost({ id: response.data._id, post: response.data }));
    }
  };
  return (
    doc && (
      <div className="flex flex-col items-center">
        {showAlert && <ShowAlertMsg param={alertParams} />}
        <div className="postContainer text-white flex gap-2 flex-col justify-center items-center laptop:w-3/5">
          <div className="flex w-full flex-col">
            <div className="owner flex justify-between flex-wrap p-2 my-2 items-center">
              <div className="flex flex-row items-center gap-2">
                <div className="image">
                  <Link to={`/profile?email=${owner.email}`}>
                    <img
                      src={
                        (owner && owner.profileImage) ||
                        "https://raw.githubusercontent.com/WebProject720/LOST_FOUND_REACTJS/1eda6f4abdafa0a1f63c0558ba5369bfba8d5fe5/Assets/user-profile.svg"
                      }
                      className="size-10 rounded-full object-cover"
                      alt="Profile"
                    />
                  </Link>
                </div>
                <div className="intro flex flex-col  text-sm">
                  <Link to={`/profile?email=${owner.email}`}>
                    <span>{owner && owner.email}</span>
                  </Link>
                  <span>{(owner && owner.username) || null}</span>
                </div>
              </div>
              <div>
                <span>Posted At : </span>
                <span>{day}, </span>
                <span>{time}</span>
              </div>
            </div>
            <div className="details bg-white bg-opacity-15 rounded-md p-2">
              <div>
                <div className="py-4 flex flex-row flex-nowrap gap-2 items-center">
                  {
                    <div>
                      <div
                        className={`circle rounded-full size-4 ${
                          status ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  }
                  <div>
                    {type}: <span>{subject}</span>
                  </div>
                </div>
                <hr />
              </div>
              <div className="py-3">{body && ReactHtmlParser(body)}</div>
            </div>
            {owner.email == user?.LoggedUser?.email && (
              <div className="actions flex flex-row gap-2 py-2">
                <Button onClick={update} text="Update"></Button>
                <Button
                  onClick={Deactivate}
                  text={`${status ? "Reactive" : "Deactive"}`}
                ></Button>
                <Button onClick={deletePost} text="Delete"></Button>
              </div>
            )}
            <div className="">
              {Image && (
                <div className="w-full flex items-center justify-center">
                  <img src={Image} alt="Post related" className="py-2" />
                </div>
              )}
            </div>
          </div>
          <div className="reply w-full flex flex-col gap-1">
            {Array.isArray(Reply) && Reply.length > 0 && (
              <div className="my-2">
                <span className="font-bold">Some Reply :</span>
              </div>
            )}
            {Array.isArray(Reply) &&
              Reply.map((e, i) => (
                <div
                  className="replyOne gap-2 p-2 bg-white bg-opacity-15 rounded-md
                  grid grid-cols-12
                  "
                  key={e._id}
                >
                  <div className="col-span-1  flex justify-center">
                    <img
                      className="size-10 Max650:size-8 rounded-full object-cover "
                      src={
                        e?.profileImage ||
                        "https://raw.githubusercontent.com/WebProject720/LOST_FOUND_REACTJS/1eda6f4abdafa0a1f63c0558ba5369bfba8d5fe5/Assets/user-profile.svg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="col-span-11">
                    <div className="flex flex-row gap-2 text-xs">
                      <Link to={`/profile?email=${e.user}`}>
                        <span>{e.user}</span>
                      </Link>
                      <span>
                        {new Date(e.createdAt).toLocaleDateString()} ,{" "}
                        {new Date(e.createdAt)
                          .toLocaleTimeString([], {
                            hour12: true,
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          .toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span>{e?.msg}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="writeReply w-full bg-white bg-opacity-15  rounded-md">
            {user.status && (
              <form
                action=""
                className="grid grid-flow-col grid-cols-12 p-2 items-center gap-2"
                onSubmit={handleSubmit(sendReply)}
              >
                <div className="col-span-1 flex justify-center">
                  <img
                    className="size-10 object-cover rounded-full"
                    src={
                      user.LoggedUser?.profileImage ||
                      "https://raw.githubusercontent.com/WebProject720/LOST_FOUND_REACTJS/1eda6f4abdafa0a1f63c0558ba5369bfba8d5fe5/Assets/user-profile.svg"
                    }
                    alt=""
                  />
                </div>
                <div className="col-span-9">
                  <Input
                    {...register("msg", { required: true })}
                    placeholder="Reply"
                    required
                  ></Input>
                </div>
                <div className="col-span-2">
                  <Button type="submit" text="Post"></Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  );
});
