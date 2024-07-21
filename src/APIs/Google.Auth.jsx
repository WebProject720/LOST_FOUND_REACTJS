import axios from "axios";
import userApi from "./users.api";

const GoogleAuth = async (user) => {
  try {
    const GoogleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      }
    );
    if (!(GoogleUser)) {
      return false;
    }

    const Response = await userApi.GetGoogleUser(GoogleUser.data);
    if (!(Response)) return false;
    return Response.data;
  } catch (error) {
    console.log("Error : ", error);
  }
};
export { GoogleAuth };
