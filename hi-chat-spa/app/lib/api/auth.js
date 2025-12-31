import api from "./axios";

export const loginUser = async (data) => {

  try {
    const res = await api.post("api/login", data);
    if (res.status === 200) {
      sessionStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      localStorage.setItem("user", res.data.user);
      return res.data.user;
    }
  } catch (error) {

  }
};

export const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) return false;

  try {
    const res = await api.post("api/refresh", { refresh_token });

    if (res.status === 200) {
      sessionStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      localStorage.setItem("user", res.data.user);

      return res.data.user;
    }

  } catch (e) {
    localStorage.removeItem("refresh_token");

    return false;
  }
};

export const logoutUser = async () => {
  await api.post("/logout");
  sessionStorage.clear();
  localStorage.clear();
};
