import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
Session.addAxiosInterceptors(axios);
axios.create({ baseURL: "http://localhost:8000" });
export default axios;
