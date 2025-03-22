import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiRequest = async (url, body, method, setData?: Function, router?: any,noheader?:any) => {
    let options = {
        method,
        body,
        headers: {
          },
    };
    if (!noheader && !(body instanceof FormData)) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    fetch(url, options)
        .then(async (res) => await res.json())
        .then(async (data) => {
            console.log(data)
            if (data.token && router) {
                const decoded = jwtDecode(data.token);
                AsyncStorage.setItem("user", JSON.stringify(decoded,data.token))
                router.push('/chat/home')
            }
            setData ? setData(data) : null

            return 'data'
        })
        .catch((err) => alert(err))
}