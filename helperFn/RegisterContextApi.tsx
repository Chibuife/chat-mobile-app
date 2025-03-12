import { createContext, useState, useEffect } from "react";
import { apiRequest } from '../helperFn/apiRequest'
import login from "@/app/auth/login";
import { useRouter } from "expo-router";
import {jwtDecode} from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatContext = createContext({
    user: null,
    friends: [],
    messages: [],
    registerUser: (userDetails, email, password) => { },
    loginUser: (email, password) => { },
    getAllUsers:(setUsers:Function, name:String)=>{},
    sendRequest:(id:string, setAdded:Function)=>{},
    getFriends:(name:string, setUsers:Function)=>{},
    acceptFriend:(id:string)=>{},
    unfriend:(id:string)=>{}
});

interface UserObj {
    token:String|undefined
}

export const ChatProvider = ({ children }) => {
    const [user, setUser] = useState<any>(); 
    const [friends, setFriends] = useState([]); 
    const [messages, setMessages] = useState([]); 
    const [ws, setWs] = useState(null); 
    // console.log(user, 'user')
    const router = useRouter()
    useEffect( () => {
        if (user) {
            try {
                const decoded = jwtDecode(user?.token);
                setUser({...user, ...decoded});
                AsyncStorage.setItem("user", JSON.stringify(user));
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);
    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser && !user) {
                setUser(JSON.parse(storedUser)); 
            }
        };
        loadUser();
    }, []);

    const isTokenExpired = () => {
         // If no token, consider it expired
    
        try {
            const decoded = jwtDecode(user?.token);
            const currentTime = Date.now() / 1000; // Convert to seconds
    
            return decoded.exp < currentTime; // Returns true if token is expired
        } catch (error) {
            console.error("Invalid token:", error);
            return true; // Treat invalid tokens as expired
        }
    };
    // useEffect(() => {
    //     if (user) {
    //         const socket = new WebSocket("ws://localhost:8080");

    //         socket.onopen = () => {
    //             console.log("Connected to WebSocket");
    //             socket.send(JSON.stringify({ type: "register", userId: user.id }));
    //         };

    //         socket.onmessage = (event) => {
    //             const data = JSON.parse(event.data);

    //             if (data.type === "history") {
    //                 setMessages(data.messages);
    //             } else {
    //                 setMessages((prev) => [...prev, data]);
    //             }
    //         };

    //         setWs(socket);
    //         return () => socket.close();
    //     }
    // }, [user]);

    const registerUser = async (userDetails, email, password) => {
        console.log('hi', userDetails?.lastName, userDetails?.firstName, email, password)

        await apiRequest('http://localhost:8080/api/v1/auth/signup', { lastName: userDetails.lastName, firstName: userDetails.firstName, email, password }, "POST", setUser, router)
    };

    const loginUser = async (email, password) => {
        console.log('hi', email, password)
        
       const response = await apiRequest('http://localhost:8080/api/v1/auth/login', { email, password }, "POST", setUser,router )
      
    };

    const getAllUsers =async(setUsers:Function, name:String)=>{
        await apiRequest('http://localhost:8080/api/v1/getallusers', { username: name, id: user._id }, "POST", setUsers)
    }
    const sendRequest = async(id:string, setAdded:Function)=>{
        await apiRequest('http://localhost:8080/api/v1/friendRequest', { firstName:user.firstName, userId: user._id, lastName:user.lastName, id  }, "POST", setAdded)
    }
    const getFriends = async (name:string, setUsers:Function)=>{
        console.log(user)
        await apiRequest('http://localhost:8080/api/v1/getallfriends', { username: name, id: user._id }, "POST", setUsers)
    }

    const acceptFriend = async(id:string)=>{
        await apiRequest('http://localhost:8080/api/v1/addfriend', {   firstName:user.firstName, userId: user._id, lastName:user.lastName, id }, "POST")
    }

    const unfriend = async(id:string)=>{
        await apiRequest('http://localhost:8080/api/v1/removeFriend', { userid: user._id,  id  }, "POST")
    }
    // const sendMessage = (toUserId, text) => {
    //     if (ws) {
    //         ws.send(JSON.stringify({
    //             type: "private_message",
    //             from: user.id,
    //             to: toUserId,
    //             text
    //         }));
    //     }
    // };

    return (
        <ChatContext.Provider value={{ user, friends, messages, registerUser, loginUser, getAllUsers, sendRequest, getFriends, acceptFriend,unfriend }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;
