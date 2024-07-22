import axios from "axios";
import config from "../../config";

class usersClass {
    async register(email, password, OTP) {
        try {
            if (!email || !password || !OTP) return false;
            const response = await axios.post(`${config.users}/register`, { email, password, OTP });
            if (!response) return false
            return response.data;
        } catch (error) {
            console.log("Got Error ", error);
        }
        return false;
    }
    
    async login(email, password) {
        try {
            const response = await axios.post(`${config.users}/login`, { email, password }, { withCredentials: true });
            if (!response) return false;
            return response.data;
        } catch (error) {
            console.log("Got Error ", error);
        }
        return false;
    }

    async verifyAndUpdate(OTP, NewPassword, email) {
        try {
            const response = await axios.post(`${config.users}/ForgetPassword`, { OTP, NewPassword, email }, { withCredentials: true });
            if (!response) return false;
            return response.data;
        } catch (error) {
            console.log("Got Error", error);
        }
        return false;
    }

    async logout() {
        try {
            const response = await axios.post(`${config.users}/logout`, {}, { withCredentials: true });
            if (!response) return false;
            return response.data;
        } catch (error) {
            console.log("Got Error ", error)
        }
        return false;
    }

    async delete(email, password) {
        try {
            const response = await axios.post(`${config.users}/delete`, { email, password }, { withCredentials: true });
            if (!response) return false;
            return response.data;
        } catch (error) {
            console.log("Got Error ", error)
        }
        return false;
    }

    async user(email) {
        try {
            const response = await axios.post(`${config.users}/UserInfo`, { email });
            if (!response) return false;
            return response.data
        } catch (error) {
            console.log("Got Error", error);
        }
        return false;
    }

    async GetGoogleUser(user) {
        try {
            const response = await axios.post(`${config.users}/GoogleAuth`, user,{withCredentials:true});
            if (!response) return false;
            return response.data
        } catch (error) {
            console.log("Google Auth Failled", error);
        }
        return false
    }

    async SendOTP(email, isNew = true) {
        try {
            const response = await axios.post(`${config.users}/SendAndSaveOTP`, { email, isNew });
            if (!response) return false;
            return response.data;
        } catch (error) {
            console.log("Mail not Send TO : ", email);
        }
        return false;
    }

    async updateProfileImage(profileImage){
        if(!profileImage) return false;
        try {
            const response = await axios.post(`${config.users}/profileImage`, profileImage,{withCredentials:true});
            if (!response) return false;
            return response.data
        } catch (error) {
            console.log("Got Error", error);
        }
        return false;
    }
}


export default new usersClass();
