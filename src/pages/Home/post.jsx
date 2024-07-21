import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Post } from "../../components/components";

export const GetPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const [post, setPost] = useState(null);
  const posts = (useSelector((state) => state.posts.posts));
  const DocID = query.get("id");
  if (!DocID) navigate("/");
  useEffect(() => {
    posts.map((e) => {
      if (e._id == DocID) {
        setPost(e);
      }
    });
  },[posts]);

  return <div>{
    post &&
     <Post doc={post} />
     }</div>;
};
