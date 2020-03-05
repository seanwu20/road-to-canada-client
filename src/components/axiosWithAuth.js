import axios from "axios";

const axiosWithAuth = () => {
    const key = localStorage.getItem("key");
    return axios.create({
        headers: {
            Authorization: `Token ${key}`
        }
    });
};

export default axiosWithAuth()
