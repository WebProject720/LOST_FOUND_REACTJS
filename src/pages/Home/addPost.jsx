import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import config from "../../../config";
import { Button, ShowAlertMsg } from "../../components/components";
import postApi from "../../APIs/mails.api";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

export const AddPost = () => {
  const [file, setFile] = useState({
    data: null,
    preview: null,
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();
  let [body, setBody] = useState();
  let [subject, setSubject] = useState();
  let [type, setType] = useState();
  const isUserLogged = useSelector((state) => state.auth.status);
  const posts = useSelector((state) => state.posts);
  const [defaultValues, setDefaultValues] = useState();

  const docId = query.get("id");
  useEffect(() => {
    if (docId) {
      posts.posts.map((e, i) => {
        if (e._id == docId) {
          setSubject(e.subject);
          setType(e.MailType.toUpperCase());
          setDefaultValues(e.body);
        }
      });
    } else {
      setSubject();
      setType();
      setDefaultValues();
    }
  }, [docId]);

  useEffect(() => {
    if (!isUserLogged) navigate("/Auth");
  }, [isUserLogged]);

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

  const onchange = (e) => {
    setBody(e);
  };

  const handleFile = (e) => {
    if (!e.target.files) return;
    setFile({
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    });
  };

  const addPostHandle = async (e) => {
    e.preventDefault();
    setAlertFun(true);
    const data = new FormData();
    data.append("subject", subject);
    data.append("type", type);
    data.append("body", DOMPurify.sanitize(body));
    data.append("image", file.data);
    if (docId) {
      data.append("id", docId);
      const response = await postApi.updatePost(data);
      if (response) {
        setAlertFun(false, true, "Post Added Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setAlertFun(false, false, "Something wrong");
      }
      return true;
    }
    const response = await postApi.newPost(data);
    if (response) {
      setAlertFun(false, true, "Post Added Successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setAlertFun(false, false, "Something wrong");
    }
  };

  return (
    <div className="">
      {showAlert && <ShowAlertMsg param={alertParams} />}
      <div className=" mb-4 flex flex-col justify-center items-center">
        <form
          onSubmit={addPostHandle}
          className="PostContainer w-3/4 Max650:w-full Max650:px-2 flex flex-col justify-center gap-1"
        >
          <div className="subject w-auto">
            <input
              type="text"
              className="w-full p-3  text-xl rounded-md outline-none"
              placeholder="Subject"
              name=""
              id=""
              defaultValue={subject || undefined}
              required
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="">
            {/* <Editor
              apiKey={config.EditorKey}
              initialValue={defaultValues || undefined}
              init={{
                initialValue: "",
                menubar: true,
                placeholder: "Write Description here...",
                height: 300,
                automatic_uploads: true,
                image_title: true,
                plugins: [
                  // "image",
                  "advlist",
                  // "autolink",
                  "lists",
                  // "link",
                  "charmap",
                  // "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  // "code",
                  // "fullscreen",
                  "insertdatetime",
                  // "media",
                  "table",
                  "code",
                  // "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onchange}
            ></Editor> */}
            <textarea
              name=""
              id=""
              onEditorChange={onchange}
              className="rounded-md bg-white text-black font-serif 
              outline-none p-3 w-full h-72 
              "
           placeholder="Description here" ></textarea>
          </div>
          <div className="actions flex flex-col gap-1">
            <div className="inputs w-full h-full flex flex-row gap-2">
              <select
                value={type}
                required
                name=""
                id=""
                className="rounded-md outline-none p-2"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Type Select</option>
                <option value="LOST">LOST</option>
                <option value="FOUND">FOUND</option>
              </select>
              <input
                className="block w-full text-sm p-2 text-white border-0 border-gray-300 rounded-md cursor-pointer bg-white dark:text-gray-800 focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 outline-none 
                file:rounded-md file:border-opacity-50 file:focus:border-gray-400 file:p-2 file:border-gray-900 file:outline-none file:bg-white
                min-h-10 bg-opacity-50 disabled:bg-gray-400
                "
                type="file"
                disabled={true}
                name="file"
                id="file"
                accept=".jpg, .png , .jpeg"
                onChange={handleFile}
              />
              {file.preview && (
                <img src={file.preview} alt="" className="w-14" />
              )}
            </div>
            <Button text={docId ? "Update" : "Post"} type="submit"></Button>
          </div>
        </form>
      </div>
    </div>
  );
};
