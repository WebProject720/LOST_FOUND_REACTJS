import axios from 'axios';
import config from '../../config.js';
class post {
    constructor() {
        this.PATH = config.mails;
    }

    async newPost(Data) {
        try {
            const response = await axios.post(`${this.PATH}/WriteMail`, Data, {
                withCredentials: true, headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (!response) { console.log(response); return false };
            return response.data;
        } catch (error) {
            console.error("Got Error", error);
        }
        return false;
    }

    async getPosts(start = 0, end = 10, to = "", from = "") {
        try {
            const response = await axios.post(`${this.PATH}/allmails`, { to: to, from: from, countStart: start, countEnd: end });
            if (!response) return false;
            return response.data
        } catch (error) {
            console.error("Got Error ", error)
        }
        return false;
    }

    async getPost(id) {
        try {
            if (!id) return false;
            const response = await axios.post(`${this.PATH}/GetMail`, { _id: id });
            if (!response) return false;
            return response.data;
        } catch (error) {
            console.error("Got Error", error);
        }
        return false;
    }


    async reply(id, msg) {
        try {
            if (!id || msg == "") return false;
            const response = await axios.post(`${this.PATH}/ReplyForMail`, { _id: id, msg }, { withCredentials: true })
            if (!response) return false;
            return response.data;
        } catch (error) {
            console.error("Got Error ", error)
        }
        return false;
    }

    async deletePost(MailID) {
        try {
            if (!MailID) return false;
            const response = await axios.post(`${this.PATH}/DeleteMail`, { MailID }, { withCredentials: true });
            if (!response) return false;
            return response.data
        } catch (error) {
            console.error("Got Error", error);
        }
        return false;
    }

    async changeStatus(MailID) {
        try {
            if (!MailID) return false;
            const response = await axios.post(`${this.PATH}/ChangeStatus`, { MailID }, { withCredentials: true });
            if (!response) return false;
            return response.data
        } catch (error) {
            console.error("Got Error", error);
        }
        return false;
    }

    async updatePost(obj) {
        try {
            if (!obj) return false;
            const response = await axios.post(`${this.PATH}/updatepost`, obj, { withCredentials: true });
            if (!response) return false;
            return response.data
        } catch (error) {
            console.error("Got Error", error);
        }
        return false;
    }

    async search(string) {
        try {
            if (!string) return false;
            const response = await axios.post(`${this.PATH}/Search`, { string });
            if (!response) return false;
            return response.data
        } catch (error) {
            console.error("Got Error", error);
        }
        return false;
    }
}

export default new post();