import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ShortPost = React.forwardRef(function ShortPost({ doc, ...rest }, ref) {
  const navigate = useNavigate();
  const onClickHandle = () => {
    navigate(`/post?id=${doc._id}`);
  };
  return (
    <div
      key={doc._id}
      className="flex flex-row gap-4 p-2 rounded-md  w-[90%]
    even:bg-white even:bg-opacity-35 odd:bg-gray-600 odd:bg-opacity-35 text-white
    hover:border-white border-x-4 items-center hover:cursor-pointer
    laptop:w-3/5 hover:bg-sky-700 transition-all hover:translate-x-1
    hover:scale-110 ease-in-out"
    >
      <div className="size-10">
        <div className="profileImage">
          <Link to={`/profile?email=${doc.owner.email}`}>
            <img
              src={doc?.owner?.profileImage || "Assets/user-profile.svg"}
              alt=""
              className="size-10 transition-all object-cover ease-in-out rounded-full hover:scale-110 hover:ease-linear"
            />
          </Link>
        </div>
      </div>
      <div className="w-full" onClick={onClickHandle}>
        <div className="flex flex-row gap-2 justify-between">
          <div className="email">
            <p className="hover:text-white text-xs">{doc.owner.email}</p>
          </div>
          <div className="">
            <div>
              <p>{new Date(doc.createdAt).toDateString()}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <p>
            <span>{doc.MailType.toUpperCase()} : </span>
            <span>{doc.subject}</span>
          </p>
        </div>
      </div>
    </div>
  );
});
export { ShortPost };
