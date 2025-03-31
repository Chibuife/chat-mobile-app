import { Alert, Button, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useRouter } from 'expo-router'
import { useRoute } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';
import Slider from "@react-native-community/slider";
import * as ImagePicker from "expo-image-picker";
import { Image } from 'react-native'
// import { sendMessage } from '@/helperFn'
import ChatContext from '@/helperFn/RegisterContextApi'
const ws = new WebSocket('ws://localhost:8080');


interface Message { mess: any; time: string; type: string; }
interface Progress {
    index: number, position: number
}
const groupMessage = () => {
    const { user, sendGroupMessage, getGroupChatHistory, messages, ws, getGroup } = useContext(ChatContext)
    const router = useRouter()
    const { height } = useWindowDimensions()
    const ref = useRef(null)
    const currentTime = new Date().toLocaleTimeString();
    const [recording, setRecording] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState<number>(-1);
    const [progress, setProgress] = useState<Progress>();
    const [duration, setDuration] = useState<any>(1);
    const [currentIndex, setCurrentIndex] = useState<number>();
    const [currentGroup, setCurrentGroup] = useState()
    const sound = useRef(new Audio.Sound());
    const progressInterval = useRef<any>(null);
    const route = useRoute();
    const { id } = route.params || {};
    console.log(messages, currentGroup, 'id')
    useEffect(() => {
        getGroup(id, setCurrentGroup)
        setTimeout(() => getGroupChatHistory(id), 3000)
    }, [id, ws])

    const openCamera = async () => {
        // Request camera permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "Camera access is required.");
            return;
        }

        // Launch the camera
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // const response = await fetch(result.assets[0].uri);
        // const blob = await response.blob();
        sendGroupMessage(id, null, result.assets[0].uri)
    };

    // Load the audio
    const loadAudio = async (uri: string, index: number) => {
        try {
            console.log("Loading audio...");
            await sound.current.unloadAsync();
            await sound.current.loadAsync({ uri }, {}, true);
            const status: any = await sound.current.getStatusAsync();
            setDuration(status.durationMillis || 1);
            setProgress({
                index: index, position: 0
            });
            setCurrentIndex(index);
            setAudioStatusListener(index)
        } catch (error) {
            console.error("Error loading audio:", error);
        }
    };

    const setAudioStatusListener = (index: number) => {
        sound.current.setOnPlaybackStatusUpdate((status: any) => {
            if (status.didJustFinish) {
                setIsPlaying(-1);
                setProgress({ index, position: 0 });
            } else {
                setProgress({ index, position: status.positionMillis });
            }
        });
    };
    // Play or Pause the audio
    const togglePlayPause = async (index: number, uri: string) => {

        if (currentIndex !== index) {

            await loadAudio(uri, index);
        }
        const status: any = await sound.current.getStatusAsync();
        console.log(status.positionMillis >= status.durationMillis, "did")
        if (status.didJustFinish || status.positionMillis >= status.durationMillis) {
            // Restart playback if it has finished
            await sound.current.replayAsync();
            setIsPlaying(index);
        } else if (status.isPlaying) {
            await sound.current.pauseAsync();
            setIsPlaying(-1);
            clearInterval(progressInterval.current);
        } else {
            await sound.current.playAsync();
            setIsPlaying(index);
            updateProgress(index);
        }
    };

    // Update progress while playing
    const updateProgress = (index: number) => {
        clearInterval(progressInterval.current); // Clear previous interval
        progressInterval.current = setInterval(async () => {
            const status: any = await sound.current.getStatusAsync();
            setProgress({ index: index, position: status.positionMillis });
        }, 50);
    };

    // Seek to a new position
    const seekAudio = async (value: any) => {
        await sound.current.setPositionAsync(value);
        setProgress(value);
    };

    // Start recording
    const startRecording = async () => {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            console.log("Starting recording...");
            const recording: any = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
        } catch (err) {
            console.error("Failed to start recording", err);
        }
    };

    // Stop recording and save URI
    const stopRecording = async () => {
        if (!recording) return;

        console.log("Stopping recording...");
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        // setRecordingUri(uri);
        setRecording(null);
        // setMessages([
        //     ...(messages ?? []), {
        //         mess: uri,
        //         time: currentTime,
        //         type: 'audio'
        //     }
        // ])
        console.log("Recording saved at:", uri);
    };


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, minHeight: height, backgroundColor: 'white' }}>
                {/* Header */}
                <ThemedView style={{
                    paddingTop: 40, padding: 10, alignItems: 'center', flexDirection: 'row',
                    justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgb(225 225 225)'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable onPress={() => router.back()}>
                            <AntDesign name="left" size={20} color="" />
                        </Pressable>
                    </View>
                    <ThemedText type='subtitle'>{currentGroup?.name}</ThemedText>
                    <AntDesign name="setting" size={20} color={'#1877F2'} />
                </ThemedView>

                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <SentMessage item={item} currentGroup={currentGroup} user={user} isPlaying={isPlaying} togglePlayPause={togglePlayPause} seekAudio={seekAudio} progress={progress} index={index} duration={duration} />
                    )}
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{ flex: 1, marginBottom: 50, }}
                />

                <View style={styles.buttomSection}>
                    <Pressable onPress={openCamera}>
                        <FontAwesome name="camera" size={20} color="#1877F2" />
                    </Pressable>
                    <View style={styles.inputContainer}>
                        <Pressable onPressIn={startRecording} onPressOut={stopRecording}>
                            <FontAwesome name="microphone" size={20} color="#1877F2" />
                        </Pressable>
                        <TextInput ref={ref} style={{ flex: 1, outline: 'none' }} />
                    </View>
                    <TouchableOpacity onPress={() => {
                        if (ref?.current?.value) {
                            sendGroupMessage(id, ref?.current?.value);
                            ref.current.value = "";
                        }
                    }}>
                        <Ionicons name='send' size={20} color={ref?.current?.value ? "#1877F2" : "#7eaae4"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const SentMessage = ({ item, togglePlayPause, seekAudio, progress, index, duration, isPlaying, user, currentGroup }: { item: any, togglePlayPause: Function, seekAudio: any, progress: any, index: Number, duration: any, isPlaying: Number, user: any, currentGroup: any }) => {
    const formatTime = (timestamp: any) => {
        return new Date(timestamp).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };
    const member = currentGroup.members.find(member => member._id === item.from);
    return (
        <View style={{ width: '100%', alignItems: 'flex-end', flexDirection: item.from === user._id ? 'row' : 'row-reverse', gap: 2, marginVertical: 20 }}>
            {
                member && member.image ? (
                    <Image source={{ uri: member.image }} style={styles.image} />
                ) : (
                    <View style={styles.dummy}>
                        <Ionicons name="person" size={30} style={{ marginTop: 10 }} color="rgb(225 225 225)" />
                    </View>
                )
            }
            <View>
                <View style={[styles.message, { borderBottomLeftRadius: item.from === user._id ? 0 : 20, borderBottomRightRadius: item.from === user._id ? 20 : 0, justifyContent: item.from === user._id ? 'flex-start' : 'flex-end', backgroundColor: item.from === user._id ? '#b2b2b2' : '#1877F2' }]}>
                    {item.image && <Image source={{ uri: item?.image }} style={{ width: 200, height: 200 }} />}
                    {item.audio && <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Pressable onPress={() => togglePlayPause(index, item.audio)} style={{ borderRadius: '100%', borderWidth: 1, borderColor: '#1877F2', width: 10, height: 10 }}>
                            {
                                isPlaying === index ? <AntDesign name='caretright' size={20} color="#1877F2" /> :
                                    <AntDesign name='pause' size={20} color="#1877F2" />
                            }
                        </Pressable>
                        <Slider
                            value={index === progress.index ? progress.position : 0}
                            maximumValue={duration}
                            onSlidingComplete={seekAudio}
                            minimumTrackTintColor="blue"
                            maximumTrackTintColor="gray"
                            thumbTintColor="red"
                        /></View>}
                    {item.text && <Text style={{ color: item.from === user._id ? 'black' : 'white', padding: 20 }}>{item.text}</Text>}
                </View>
                <Text style={{ textAlign: item.from === user._id ? 'right' : 'left', position: 'absolute', bottom: -10 }}>{formatTime(item.timestamp)}</Text>
            </View>
        </View>
    )
}
export default groupMessage

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        width: '80%',
        backgroundColor: '#bfb9b9',
        padding: 5,
        gap: 2,
        alignItems: 'center'
    },
    buttomSection: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 60,
        borderTopWidth: 1,
        borderTopColor: 'rgb(225 225 225)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
    },
    message: {
        marginVertical: 5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        // maxWidth: '70%',
        overflow: 'hidden'
    },
    dummy: {
        width: 20,
        height: 20,
        borderRadius: '100%',
        backgroundColor: 'rgb(211 211 211)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    image: {
        width: 20,
        height: 20,
        borderRadius: 100
    },
})