import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await axios.get("http://localhost:3500/auth/logout", {
                withCredentials: true,
            });
            if (response.data.status) {
                setAuth({});
            }
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
