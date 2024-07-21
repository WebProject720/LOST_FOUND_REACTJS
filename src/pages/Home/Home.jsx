import {
  ShortPost,
  ShowAlertMsg,
  Button,
  NoPost,
} from "../../components/components";
import postApi from "../../APIs/mails.api";
import { useEffect, useState } from "react";
import { addPost, clearPost } from "../../ReduxStore/StoreComponents/PostStore";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  const [length, setLength] = useState(10);
  // const user=useSelector((state)=>state.auth);

  //Global Error Box
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
      .getPosts()
      .then((response) => {
        if (!response) {
          setAlertFun(false, false, "Somthing went wrong");
          return;
        }
        setPost(response.data);
        dispatch(clearPost());
        dispatch(addPost({ post: response.data }));
        setLength(response.message?.length || 0);
        setAlert(false);
      })
      .catch((error) => {
        setAlertFun(false, false, "Something went wrong");
        console.log("Got Error", error);
      });
  }, []);

  return (
    <div
      className="p-2 flex flex-col flex-nowrap gap-2 justify-center items-center
    "
    >
      {showAlert && <ShowAlertMsg param={alertParams} />}

      {post && post.map((e, i) => <ShortPost doc={e} key={i} />)}
      {post?.length == 0 && <NoPost />}
      <div className="next flex flex-row items-center w-[90%] laptop:w-3/5">
        <div className="w-full flex justify-between">
          <Button disable={true} text="Previous"></Button>
          <Button disable={true} text="Next"></Button>
        </div>
      </div>
    </div>
  );
};
export { Home };
