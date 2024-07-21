import config from "../../config";
import Cookies from "js-cookie";

const AuthMiddleware = (store) => (next) => (action) => {
  const AccessToken = Cookies.get(config.AccessToken);
  const RefreshToken = Cookies.get(config.RefreshToken);
  if ((!AccessToken || !RefreshToken) && action.payload?.auth?.status) {
    action.payload.auth.status = false;
    action.payload.auth.LoggedUser = null;
  }
  next(action);
};
export const AuthMid = AuthMiddleware;
