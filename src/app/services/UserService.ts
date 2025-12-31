import axios from "axios";
import { serverApi } from "../../lib/config";
import { User, UserInput } from "../../lib/types/user";

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
            
            const user: User = result.data.user;
            console.log("User:", user);
            localStorage.setItem("userData", JSON.stringify(user));

            return user;
        } catch (err) {
            console.log("signup, UserSignup:", err);
            throw err;
        }
    }
}

export default UserService;