import { Alert, Button, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useRouter } from 'expo-router'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';
import Slider from "@react-native-community/slider";
import * as ImagePicker from "expo-image-picker";
import { Image } from 'react-native'
import { sendMessage } from '@/helperFn'
const ws = new WebSocket('ws://localhost:8080');


interface Message { mess: any; time: string; type: string; }
interface Progress {
    index: number, position: number
}
const message = () => {
    const router = useRouter()
    const { height } = useWindowDimensions()
    const ref = useRef(null)
    const [messages, setMessages] = useState<Message[] | undefined>()
    const currentTime = new Date().toLocaleTimeString();
    const [recording, setRecording] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState<number>(-1);
    const [progress, setProgress] = useState<Progress>();
    const [duration, setDuration] = useState<any>(1);
    const [currentIndex, setCurrentIndex] = useState<number>();
    const sound = useRef(new Audio.Sound());
    const progressInterval = useRef<any>(null);

    // Listen for messages
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'history') {
            console.log('Chat history:', data.messages);
            setMessages(data.messages)
        } else {
            console.log(`Message from ${data.from}: ${data.message}`);
            setMessages([...messages,data.messages])

        }
    };

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

        if (!result.canceled) {
            setMessages([
                ...(messages ?? []), {
                    mess: result.assets[0].uri,
                    time: currentTime,
                    type: 'image'
                }
            ])
        }
    };

    // Load the audio
    const loadAudio = async (uri: string, index: number) => {
        try {
            console.log("Loading audio...");
            await sound.current.unloadAsync(); // Ensure previous sound is unloaded
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
        setMessages([
            ...(messages ?? []), {
                mess: uri,
                time: currentTime,
                type: 'audio'
            }
        ])
        console.log("Recording saved at:", uri);
    };


    return (
        <ScrollView>
            <View style={{ minHeight: height, backgroundColor: 'white' }}>
                <ThemedView style={{ paddingTop: 40, padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgb(225 225 225)' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Pressable onPress={() => router.back()}>
                            <AntDesign name="left" size={20} style={{}} color="" />
                        </Pressable>
                    </View>
                    <ThemedText type='subtitle' style={{}}>Darren</ThemedText>
                    <AntDesign name="setting" size={20} color={'#1877F2'} style={{}} />
                </ThemedView>
                {/* 
                {
                    messages.map((item, index) => {
                        console.log(item)
                        return (
                            <View>
                                <Button title={isPlaying ? "Pause" : "Play"} onPress={() => togglePlayPause(index, item.mess)} />
                                <Slider
                                    value={index === progress.index ? progress.position : 0}
                                    maximumValue={duration}
                                    onSlidingComplete={seekAudio}
                                    minimumTrackTintColor="blue"
                                    maximumTrackTintColor="gray"
                                    thumbTintColor="red"
                                />

                                {item.type === 'image' && <Image source={{ uri: item.mess }} style={{ width: 200, height: 200, marginTop: 20 }} />}

                            </View>
                        )
                    })
                } */}
                <FlatList
                    data={messages}
                    renderItem={({ item, index }: { item: any, index: number }) => {
                        return (
                            <SentMessage item={item} isPlaying={isPlaying} togglePlayPause={togglePlayPause} seekAudio={seekAudio} progress={progress} index={index} duration={duration} />
                        )
                    }}
                />
                <View style={styles.buttomSection}>
                    <Pressable
                        onPress={openCamera}
                    >
                        <FontAwesome name="camera" size={20} color="#1877F2" style={{}} />
                    </Pressable>
                    <View style={styles.inputContainer}>
                        <Pressable onPressIn={startRecording}
                            onPressOut={stopRecording}>
                            <FontAwesome name="microphone"
                                size={20} color="#1877F2" style={{}} />
                        </Pressable>
                        {/* {recording  ? <FontAwesome5 name="microphone-slash" size={20} color="#1877F2" style={{}} />} */}
                        <TextInput ref={ref} style={{ flex: 1, outline: 'none' }} />
                    </View>
                    <TouchableOpacity onPress={() => {
                        // setMessages([
                        //     ...(messages ?? []), {
                        //         mess: ref.current.value,
                        //         time: currentTime,
                        //         type: 'text'
                        //     }
                        // ])
                        sendMessage(toUserId,ref.current.value,fromUserId)
                        ref.current.value = ""
                    }}>
                        <Ionicons name='send' size={20} color={ref.current.value !== "" ? "#1877F2" : "#7eaae4"} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const SentMessage = ({ item, togglePlayPause, seekAudio, progress, index, duration, isPlaying }: { item: any, togglePlayPause: Function, seekAudio: any, progress: any, index: Number, duration: any, isPlaying: Number }) => {
    return (
        <View style={{ width: '100%', alignItems: 'flex-end', flexDirection: item.sender === 'chibuife' ? 'row-reverse' : 'row', gap: 2 }}>
            {
                item.image ?
                    <Image source={require('@/assets/images/react-logo.png')} style={styles.image} />
                    : <View style={styles.dummy}>
                        <Ionicons name="person" size={30} style={{ marginTop: 10 }} color="rgb(225 225 225)" />
                    </View>
            }
            <View style={[styles.message, { borderBottomLeftRadius: item.sender !== 'chibuife' ? 20 : 0, borderBottomRightRadius: item.sender === 'chibuife' ? 20 : 0, justifyContent: item.sender === 'chibuife' ? 'flex-end' : 'flex-start', backgroundColor: item.sender === 'chibuife' ? '#1877F2' : '#b2b2b2' }]}>
                {item.type === 'image' && <Image source={{ uri: item.mess }} style={{ width: 200, height: 200, marginTop: 20 }} />}
                {item.type === 'audio' && <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Pressable onPress={() => togglePlayPause(index, item.mess)} style={{ borderRadius: '100%', borderWidth: 1, borderColor: '#1877F2', width: 10, height: 10 }}>
                        {
                            isPlaying === index ? <AntDesign name='caretright' size={20} color="#1877F2" /> :
                                <AntDesign name='pause' size={20} color="#1877F2" />}
                    </Pressable>
                    <Slider
                        value={index === progress.index ? progress.position : 0}
                        maximumValue={duration}
                        onSlidingComplete={seekAudio}
                        minimumTrackTintColor="blue"
                        maximumTrackTintColor="gray"
                        thumbTintColor="red"
                    /></View>}
                {item.type === 'text' && <Text style={{ color: item.sender === 'chibuife' ? 'white' : 'black', padding: 20 }}>{item.mess}</Text>}
                <Text style={{ textAlign: item.sender === 'chibuife' ? 'left' : 'right' }}>{item.time}</Text>
            </View>
        </View>
    )
}
export default message

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
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    message: {
        backgroundColor: 'red',
        marginVertical: 5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        maxWidth: '70%'
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