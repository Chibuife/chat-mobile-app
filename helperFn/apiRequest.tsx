import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiRequest = async (url, body, method, setData?: Function, router?: any,) => {
    fetch(url, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        method
    })
        .then(async (res) => await res.json())
        .then(async (data) => {
            console.log(data)
            if (data.token && router && setData) {
                const decoded = jwtDecode(data.token);
                AsyncStorage.setItem("user", JSON.stringify(decoded,data.token))
                router.push('/chat/home')
            }
            setData ? setData(data) : null

            return 'data'
        })
        .catch((err) => alert(err))
}