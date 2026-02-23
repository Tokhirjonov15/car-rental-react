import axios from "axios";
import { serverApi } from "../../lib/config";
import { LoginInput, User, UserInput, UserUpdateInput } from "../../lib/types/user";

const buildUserPayload = (raw: any): User & Record<string, any> => {
    const coreUser = (raw?.user ?? raw) as User & Record<string, any>;
    const token =
        raw?.token ??
        raw?.accessToken ??
        raw?.jwt ??
        coreUser?.token ??
        coreUser?.accessToken ??
        coreUser?.jwt;

    return token ? { ...coreUser, token } : coreUser;
};

class UserService {
    private readonly path: string;

    constructor () {
        this.path = serverApi;
    }

    public async signup(input: UserInput): Promise<User> {
        try {
            const url = this.path + "/user/signup";
            const result = await axios.post(url, input, { withCredentials: true });
            console.log("UserSignup:", result);
            
            const user = buildUserPayload(result.data);
            console.log("User:", user);
            localStorage.setItem("userData", JSON.stringify(user));
            localStorage.setItem("user", JSON.stringify(user));

            return user;
        } catch (err) {
            console.log("signup, UserSignup:", err);
            throw err;
        }
    }

    public async login(input: LoginInput): Promise<User> {
        try {
            const url = this.path + "/user/login";
            const result = await axios.post(url, input, { withCredentials: true });
            console.log("UserLogin:", result);
            
            const user = buildUserPayload(result.data);
            console.log("User:", user);
            localStorage.setItem("userData", JSON.stringify(user));
            localStorage.setItem("user", JSON.stringify(user));

            return user;
        } catch (err) {
            console.log("ERROR, UserLogin", err);
            throw err;
        }
    }

    public async updateUser(input: UserUpdateInput): Promise<User> {
        try {
            const formData = new FormData();
            formData.append("userId", input.userId || "");
            formData.append("userPhone", input.userPhone || "");
            formData.append("userAddress", input.userAddress || "");
            formData.append("userImage", input.userImage || "");

            const result = await axios(`${serverApi}/user/update`, {
                method: "POST",
                data: formData,
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("updateUser:", result);
            
            const user: User = result.data;
            localStorage.setItem("userData", JSON.stringify(user));
            return user;
        } catch (err) {
            console.log("ERROR, updateUser", err);
            throw err;
        }
    }
}

export default UserService;
