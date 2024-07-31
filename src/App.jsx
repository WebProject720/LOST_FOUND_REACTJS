import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Register,
  Login,
  ForgetPassword,
  AuthLayout,
  VerifyEmail,
} from "./pages/Auth/Auth";
import Layout from "./pages/layout";
import { Home, AddPost, Profile, GetPost, Search } from "./pages/Home/pages";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "../config";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "addpost",
        element: <AddPost />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "post",
        element: <GetPost />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
  {
    path: "Auth",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "ResetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "verifyEmail",
        element: <VerifyEmail />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <GoogleOAuthProvider clientId={config.googleClientID}>
      <RouterProvider router={router}></RouterProvider>
    </GoogleOAuthProvider>
  );
};
