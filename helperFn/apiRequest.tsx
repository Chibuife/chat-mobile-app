import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiRequest = async (url:any, body:Object, method:String, setData?: Function, router?: any,noheader?:any,saveuser?:any) => {
    let options = {
        method,
        body,
        headers: {
          },
    };
    if(method ==="GET"){
        options = {
            method,
        };
    }else if(!noheader && !(body instanceof FormData)) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }
  

    fetch(url, options)
        .then(async (res) => await res.json())
        .then(async (data) => {
            console.log(data)
            if(data.msg ==="user already exists"){
                alert("user already exists")
            }
            if (data.token && router) {
                const decoded = jwtDecode(data.token);
                AsyncStorage.setItem("user", JSON.stringify(decoded,data.token))
                router.push('/chat/home')
            }
            if(data && saveuser){
                AsyncStorage.setItem("user", JSON.stringify(data))
            }
            setData ? setData(data) : null

            return 'data'
        })
        .catch((err) => alert(err))
}