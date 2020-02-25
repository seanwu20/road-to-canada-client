import axios from "axios";

const axiosWithAuth = () => {
    const accessToken = localStorage.getItem("access");
    return axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export default axiosWithAuth()
