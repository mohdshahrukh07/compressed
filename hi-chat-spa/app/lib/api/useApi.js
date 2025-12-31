import api from "./axios"
export default function useApi() {


    const checkEmail = async (data) => {
        try {

            const response = await api.post('api/signup/checkEmail', { ...data });
            if (response.status) {
                console.log("success");
                return response;
            } else {
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    const checkOtp = async (data) => {
        try {
            console.log(data);
            const response = await api.post('api/signup/verify-otp', { ...data });
            if (response.status) {
                console.log("success");
                return response;
            } else {
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const newPassword = async (data) => {
        try {
            await api.get("/sanctum/csrf-cookie");

            const response = await api.post('api/signup/set-password', { ...data });
            if (response.status) {
                console.log("success");
                return response;
            } else {
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    const setProfile = async (data) => {
        try {
            console.log(data);
            const response = await api.post('api/signup/finalize', { ...data });
            if (response.status) {
                sessionStorage.setItem("access_token", res.data.access_token);
                localStorage.setItem("refresh_token", res.data.refresh_token);
                console.log(res);
                return res.data.user;
            } else {
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    return {
        setProfile,
        newPassword,
        checkOtp,
        checkEmail
    }
}