import { createContext, useState, useEffect } from "react";
import { apiRequest } from '../helperFn/apiRequest'
import login from "@/app/auth/login";
import { useRouter, usePathname } from "expo-router";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ChatContext = createContext({
    user: null,
    friends: [],
    messages: [],
    ws: null,
    registerUser: (userDetails: String, email: String, password: String, image: String) => { },
    loginUser: (email: String, password: String) => { },
    getAllUsers: (setUsers: Function, name: String) => { },
    sendRequest: (id: string, setAdded: Function) => { },
    getFriends: (name: string, setUsers: Function) => { },
    acceptFriend: (id: string) => { },
    unfriend: (id: string) => { },
    getFriendMessage: async (setUsers: Function, name: String) => { },
    sendMessage: (toUserId: String, text: String, imageUri: String, recordUri: String) => { },
    getChatHistory: (toUserId: String) => { },
    getFriend: async (id: string, setUsers: Function) => { },
    cancelReq: (id: string) => { },
    updateProfile: async (formData: String) => { },
    forgottenPassword: (email: String) => { },
    resetpassword: async (password: String, token: String) => { },
    createGroup: async (addMember: Array<any>, groupName: String, setGroupId: String) => { },
    getGroupChatHistory: (toGroupId: String) => { },
    sendGroupMessage: async (toUserId: String, text: String, imageUri: String) => { },
    getGroup: async (id: string, setState: Function) => { },
    loginWithFacebook: async () => { }
});

interface UserObj {
    token: String | undefined
}

export const ChatProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<any>();
    const [friends, setFriends] = useState([]);
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const [confirm, setConfirm] = useState()
    const router = useRouter()
    const pathname = usePathname();
    const loadUser = async () => {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    };
    useEffect(() => {
        loadUser();
    }, [pathname]);
    useEffect(() => {
        confirm?.msg ? alert(confirm?.msg) : null
    }, [confirm])

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
            const socket = new WebSocket("wss://chat-app-backend-swah.onrender.com");
            socket.onopen = () => {
                console.log("Connected to WebSocket");
                socket.send(JSON.stringify({ type: "register", userId: user._id }));
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === "history") {
                    setMessages(data.messages);
                } else {
                    setMessages((prev) => [...prev, data]);
                }
            };

            setWs(socket);
            return () => {

                return socket.close()
            }
        }
    }, [user]);

    const registerUser = async (userDetails: String, formData: any) => {
        const noheader = true
        await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/auth/signup', formData, "POST", setUser, router, noheader)
    };

    const loginUser = async (email: String, password: String) => {
        await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/auth/login', { email, password }, "POST", setUser, router)
    };

    const loginWithFacebook = async () => {
        await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/auth/facebook', {}, "GET", setUser, router)
    };

    const forgottenPassword = async (email: String) => {
        await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/auth/forgotten-password', { email }, "POST", setConfirm)
    };
    const resetpassword = async (password: String, token: String) => {
        await apiRequest(`https://chat-app-backend-swah.onrender.com/api/v1/auth/reset-password?token=${token}`, { password }, "PUT", setConfirm)
    };
    const getAllUsers = async (setState: Function, name: String) => {
        user && await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/getallusers', { username: name, id: user._id }, "POST", setState)
    }
    const getFriendMessage = async (setState: Function, name: String) => {
        user && await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/getfriendswithmessage', { username: name, id: user._id }, "POST", setState)
    }
    const sendRequest = async (id: string, setAdded: Function) => {
        user && await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/friendRequest', { userId: user._id, id }, "POST", setAdded)
    }
    const getFriends = async (name: string, setState: Function) => {
        user && await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/getallfriends', { username: name, id: user._id }, "POST", setState)
    }

    const acceptFriend = async (id: string) => {
        user && await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/addfriend', { userId: user._id, id }, "POST",)
    }

    const cancelReq = async (id: string) => {
        user && await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/cancelFriendReq', { userId: user._id, id }, "POST",)
    }
    const unfriend = async (id: string) => {
        user && await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/removeFriend', { userId: user._id, id }, "POST")
    }

    const getFriend = async (id: string, setState: Function) => {
        await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/getUser', { id }, "POST", setState)
    }
    const getGroup = async (id: string, setState: Function) => {
        await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/getGroup', { id }, "POST", setState)
    }
    const updateProfile = async (formData: any) => {
        const noheader = true
        const saveuser = true
        await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/updateProfile', formData, "POST", setUser, undefined, noheader, saveuser)
    }

    const createGroup = async (addMember: Array<any>, groupName: String, setGroupId: String) => {
        user && await apiRequest('https://chat-app-backend-swah.onrender.com/api/v1/createGroup', { members: [...addMember, user._id], name: groupName }, "POST", setGroupId)
    }

    const uriToBase64 = async (uri: any) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };
    const sendMessage = async (toUserId: String, text: String, imageUri: String, recordUri: String) => {
        if (ws && user && ws.readyState === WebSocket.OPEN) {
            const newMessage = {
                text,
                from: user._id,
                to: toUserId,
                timestamp: new Date()
            };

            let base64Image = null;
            let base64Audio = null;

            if (imageUri) {
                base64Image = await uriToBase64(imageUri);
                newMessage.image = base64Image;
            }

            if (recordUri) {
                base64Audio = await uriToBase64(recordUri);
                newMessage.audio = base64Audio;
            }

            ws.send(JSON.stringify({
                type: "private_message",
                from: user._id,
                to: toUserId,
                text: text || "",
                image: base64Image,
                audio: base64Audio
            }));

            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
    };


    function getChatHistory(toUserId) {
        if (ws && user && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: 'get_history',
                userId: user._id,
                to: toUserId
            }));
        }
    }

    function getGroupChatHistory(toGroupId: String) {

        if (ws && user && ws.readyState === WebSocket.OPEN) {
            console.log(user, ws, 'get_group_history')
            ws.send(JSON.stringify({
                type: 'get_group_history',
                userId: user._id,
                group: toGroupId
            }));
        }
    }

    const sendGroupMessage = async (toUserId: String, text: String, imageUri: String, recordUri: String) => {
        if (ws && user && ws.readyState === WebSocket.OPEN) {
            const newMessage = {
                text,
                from: user._id,
                to: toUserId,
                timestamp: new Date()
            };

            let base64Image = null;
            let base64Audio = null;

            if (imageUri) {
                base64Image = await uriToBase64(imageUri);
                newMessage.image = base64Image;
            }

            if (recordUri) {
                base64Audio = await uriToBase64(recordUri);
                newMessage.audio = base64Audio;
            }

            ws.send(JSON.stringify({
                type: "private_message",
                from: user._id,
                to: toUserId,
                text: text || "",
                image: base64Image,
                audio: base64Audio
            }));

            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
    };


    return (
        <ChatContext.Provider value={{ user, friends, messages, ws, registerUser, loginUser, getAllUsers, sendRequest, getFriends, acceptFriend, unfriend, getFriendMessage, sendMessage, getChatHistory, getFriend, cancelReq, updateProfile, forgottenPassword, resetpassword, createGroup, getGroupChatHistory, sendGroupMessage, getGroup, loginWithFacebook }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;
