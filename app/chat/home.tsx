import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, Animated, PanResponder, } from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { ThemedView } from '@/components/ThemedView'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '@/components/Input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import ChatContext from '@/helperFn/RegisterContextApi';
const ws = new WebSocket('ws://localhost:8080');
import { useRoute } from "@react-navigation/native";
import Modal from '@/components/modal';

const home = () => {
    const { getFriendMessage, user } = useContext(ChatContext)
    const [friend, setFriend] = useState()
    const [name, setName] = useState("")
    const { height } = useWindowDimensions()
    const [modal, setModal] = useState(false)
    const truncateText = (text?: string, maxLength?: number) => {
        if (text && maxLength) return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };
    const router = useRouter()
    console.log(friend, 'friend')
    // ws.onopen = () => {
    //     ws.send(JSON.stringify({ type: 'register', userId: 'personA' }));
    // };
    useEffect(() => {
        getFriendMessage(setFriend, name)
    }, [name, user])

    const formatTime = (timestamp:any) => {
        return new Date(timestamp).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, 
        });
    };
    return (
        <View>
            {
                modal ? <Modal setModal={setModal} /> : null
            }
            <ScrollView>

                <ThemedView style={{ flex: 1, minHeight: height, }}>
                    <ThemedView style={{ paddingTop: 40, padding: 10, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgb(225 225 225)', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => setModal(true)}>
                            <Ionicons name="menu-outline" size={30} style={{}} color="" />
                        </TouchableOpacity>
                        <ThemedText type='subtitle' style={{}}>My Profile</ThemedText>
                        <TouchableOpacity onPress={() => router.push('/chat/findPeople')}>
                            <MaterialCommunityIcons name="notebook-edit-outline" size={20} style={{}} color="" />
                        </TouchableOpacity>
                    </ThemedView>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Input placeholder={'First Name'} style={{ paddingVertical: 5, borderRadius: 5, marginVertical: 10, backgroundColor: 'rgb(242, 242, 242)', borderWidth: 0 }} leftIcon={<AntDesign name="search1" size={10} style={{}} color="" />} value={name} func={(text: any) => setName(text.target.value)} />
                        <FlatList
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => router.push(`/chat/${item.id}`)} style={styles.profile}>
                                        <View style={styles.imageCon}>
                                            {
                                                item.image ?
                                                    <Image source={require('@/assets/images/react-logo.png')} style={styles.image} />
                                                    : <View style={styles.dummy}>
                                                        <Ionicons name="person" size={30} style={{ marginTop: 10 }} color="rgb(225 225 225)" />
                                                    </View>
                                            }
                                            <View style={styles.active} />
                                        </View>
                                        <ThemedText>{item.firstName}</ThemedText>
                                    </TouchableOpacity>
                                )
                            }}
                            data={friend}
                            horizontal
                            contentContainerStyle={{ gap: 20, marginVertical: 20 }}
                            showsHorizontalScrollIndicator={false}
                        />

                        <FlatList
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => router.push(`/chat/${item.id}`)} style={styles.message}>
                                        {
                                            item.group ?
                                                <View style={[styles.imageCon]}>
                                                    {
                                                        item.group.map((member: any, index: number) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        item.group.length === 2 ? <>
                                                                            {
                                                                                member.image ?
                                                                                    <Image source={require('@/assets/images/react-logo.png')} style={[styles.image, { position: 'absolute', right: index === 0 ? -11 : 8, width: 40, height: 40, top: index === 0 ? -11 : 8 }]} />
                                                                                    : <View style={[styles.dummy, { position: 'absolute', right: index === 0 ? -11 : 8, width: 40, height: 40, top: index === 0 ? -11 : 8 }]}>
                                                                                        <Ionicons name="person" size={30} style={{ marginTop: 10 }} color="rgb(225 225 225)" />
                                                                                    </View>
                                                                            }
                                                                        </>
                                                                            : item.group.length >= 3 ? <>
                                                                                {
                                                                                    member.image && index < 3 ?
                                                                                        <Image source={require('@/assets/images/react-logo.png')} style={[styles.image, { position: 'absolute', right: index === 0 ? -11 : index === 1 ? -11 : 8, width: 30, height: 30, top: index === 0 ? -11 : 8 }]} />
                                                                                        : <View style={[styles.dummy, { position: 'absolute', right: index === 0 ? -11 : index === 1 ? -11 : 8, width: 30, height: 30, top: index === 0 ? -11 : 8 }]}>
                                                                                            <Ionicons name="person" size={30} style={{ marginTop: 10 }} color="rgb(225 225 225)" />
                                                                                        </View>
                                                                                }
                                                                            </>
                                                                                : null
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </View>

                                                :
                                                <View style={styles.imageCon}>
                                                    {
                                                        item.image ?
                                                            <Image source={require('@/assets/images/react-logo.png')} style={styles.image} />
                                                            : <View style={styles.dummy}>
                                                                <Ionicons name="person" size={30} style={{ marginTop: 10 }} color="rgb(225 225 225)" />
                                                            </View>
                                                    }
                                                    <View style={styles.active} />
                                                </View>
                                        }

                                        <View>
                                            <ThemedText type='defaultSemiBold'>{item.firstName} {item.lastName}</ThemedText>
                                            <ThemedText>
                                                {truncateText(item.lastMessage.text, 20)} . {formatTime(item.lastMessage.timestamp)}
                                            </ThemedText>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                            data={friend}
                            contentContainerStyle={{ gap: 20, marginVertical: 20 }}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </ThemedView>
            </ScrollView>
        </View>
    )
}

export default home

// const Modal = ({setModal}) => {
//     const router = useRouter()
//     const route = useRoute();
//         const translateX = useRef(new Animated.Value(0)).current;
//         console.log(route,'route')
//        const panResponder = useRef(
//         PanResponder.create({
//             onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
//             onPanResponderMove: (_, gestureState) => {
//                 if (gestureState.dx < 0) {
//                     translateX.setValue(gestureState.dx);
//                 }
//             },
//             onPanResponderRelease: (_, gestureState) => {
//                 if (gestureState.dx < -100) {
//                     Animated.timing(translateX, {
//                         toValue: -500, 
//                         duration: 200,
//                         useNativeDriver: true,
//                     }).start(() => setModal(false)); // Close modal
//                 } else {
//                     Animated.spring(translateX, {
//                         toValue: 0, // Reset to original position
//                         useNativeDriver: true,
//                     }).start();
//                 }
//             },
//         })
//     ).current;
//     return (
//         <View
//             style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 11 }}
//         >
//             <Animated.View
//                 {...panResponder.panHandlers} style={{
//                 left: 0,
//                 width: '70%',
//                 height: '100%',
//                 gap: 10,
//                 backgroundColor: 'white',
//                 position: 'absolute',
//                 zIndex: 20,
//                 padding: 30
//             }}>
//                 <TouchableOpacity style={[styles.option, { backgroundColor: route.path === '/chat/home' ? 'red':'' }]} onPress={() => router.push('/chat/home')}>
//                     <Text>Home</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.option, { backgroundColor: route.path === '/chat/friends' ? 'red':'' }]} onPress={() => router.push('/chat/friends')}>
//                     <Text>Friends</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.option, { backgroundColor: route.path === '/chat/findPeople' ? 'red':'' }]} onPress={() => router.push('/chat/findPeople')}>
//                     <Text>Find Friends</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.option, { backgroundColor: route.path === '/profile/setting' ? 'red':'' }]} onPress={() => router.push('/profile/setting')}>
//                     <Text>Setting</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.option, { backgroundColor: route.path === '/profile' ? 'red':'' }]} onPress={() => router.push('/profile')}>
//                     <Text>Profile</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.option, { position:'absolute', bottom:10 }]}  onPress={() => router.push('/')}>
//                     <Text>Logout</Text>
//                 </TouchableOpacity>
//             </Animated.View>
//             <TouchableOpacity onPress={()=> setModal(false)} style={{
//                 backgroundColor: 'black', height: '100%', width: '100%',
//                 opacity: 0.5
//             }}>

//             </TouchableOpacity>
//         </View>
//     )
// }
const styles = StyleSheet.create({
    profile: {
        alignItems: 'center',
        gap: 10
    },
    imageCon: {
        position: 'relative',
        width: 50
    },
    active: {
        backgroundColor: 'green',
        position: 'absolute',
        bottom: '1%',
        right: '1%',
        width: 15,
        height: 15,
        borderRadius: '100%'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    dummy: {
        width: 50,
        height: 50,
        borderRadius: '100%',
        backgroundColor: 'rgb(211 211 211)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    message: {
        flexDirection: 'row',
        gap: 20,
    },
    option: {
        padding: 5,
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
        marginVertical: 5
    }
})