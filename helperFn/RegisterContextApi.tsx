import { createContext, useState, useEffect } from "react";
import { apiRequest } from '../helperFn/apiRequest'
import login from "@/app/auth/login";
import { useRouter, usePathname } from "expo-router";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ws = new WebSocket("ws://localhost:8080");
const ChatContext = createContext({
    user: null,
    friends: [],
    messages: [],
    registerUser: (userDetails, email, password) => { },
    loginUser: (email, password) => { },
    getAllUsers: (setUsers: Function, name: String) => { },
    sendRequest: (id: string, setAdded: Function) => { },
    getFriends: (name: string, setUsers: Function) => { },
    acceptFriend: (id: string) => { },
    unfriend: (id: string) => { },
    getFriendMessage: async (setUsers: Function, name: String) => { },
    sendMessage: (toUserId, text) => { },
    getChatHistory: (toUserId) => { }
});

interface UserObj {
    token: String | undefined
}

export const ChatProvider = ({ children }) => {
    const [user, setUser] = useState<any>();
    const [friends, setFriends] = useState([]);
    const [messages, setMessages] = useState([]);
    // const [ws, setWs] = useState(null);
    const router = useRouter()
    const pathname = usePathname();
    const loadUser = async () => {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    };
    console.log(messages)
    useEffect(() => {
        loadUser();
        console.log('loaded')
    }, [pathname]);

    const isTokenExpired = () => {

        try {
            const decoded = jwtDecode(user?.token);
            const currentTime = Date.now() / 1000;

            return decoded.exp < currentTime;
        } catch (error) {
            console.error("Invalid token:", error);
            return true; // Treat invalid tokens as expired
        }
    };
    useEffect(() => {
        if (user) {
            // const socket = new WebSocket("ws://localhost:8080");

            ws.onopen = () => {
                console.log("Connected to WebSocket");
                ws.send(JSON.stringify({ type: "register", userId: user._id }));
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
console.log('message h')
                if (data.type === "history") {
                    setMessages(data.messages);
                } else {
                    setMessages((prev) => [...prev, data]);
                }
            };

            // setWs(socket);
            return () =>{
                console.log('close')
                return ws.close()      
            }         ;
        }
    }, []);

    const registerUser = async (userDetails, email, password) => {
        console.log('hi', userDetails?.lastName, userDetails?.firstName, email, password)
        AsyncStorage.removeItem("user")
        setUser()
        await apiRequest('http://localhost:8080/api/v1/auth/signup', { lastName: userDetails.lastName, firstName: userDetails.firstName, email, password }, "POST", undefined, router)
    };

    const loginUser = async (email, password) => {
        console.log('hi', email, password)
        AsyncStorage.removeItem("user")
        await apiRequest('http://localhost:8080/api/v1/auth/login', { email, password }, "POST", setUser, router)
    };

    const getAllUsers = async (setUsers: Function, name: String) => {
        user && await apiRequest('http://localhost:8080/api/v1/getallusers', { username: name, id: user._id }, "POST", setUsers)
    }
    const getFriendMessage = async (setUsers: Function, name: String) => {
        console.log(user, "uazi")
        user && await apiRequest('http://localhost:8080/api/v1/getfriendswithmessage', { username: name, id: user._id }, "POST", setUsers)
    }
    const sendRequest = async (id: string, setAdded: Function) => {
        user && await apiRequest('http://localhost:8080/api/v1/friendRequest', { userId: user._id, id }, "POST", setAdded)
    }
    const getFriends = async (name: string, setUsers: Function) => {
        user && await apiRequest('http://localhost:8080/api/v1/getallfriends', { username: name, id: user._id }, "POST", setUsers)
    }

    const acceptFriend = async (id: string) => {
        user && await apiRequest('http://localhost:8080/api/v1/addfriend', { userId: user._id, id }, "POST",)
    }

    const unfriend = async (id: string) => {
        user && await apiRequest('http://localhost:8080/api/v1/removeFriend', { userId: user._id, id }, "POST")
    }
    const sendMessage = (toUserId, text) => {
        if (ws && user) {
            ws.send(JSON.stringify({
                type: "private_message",
                from: user._id,
                to: toUserId,
                text
            }));
        }
    };

    function getChatHistory(toUserId) {
        console.log( toUserId, user?._id, 'mmmess')
        if (ws && user) {
            ws.send(JSON.stringify({
                type: 'get_history',
                userId: user._id,
                to: toUserId
            }));
        }
    }

   

    return (
        <ChatContext.Provider value={{ user, friends, messages, registerUser, loginUser, getAllUsers, sendRequest, getFriends, acceptFriend, unfriend, getFriendMessage, sendMessage, getChatHistory }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;
