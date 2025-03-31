import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import ChatContext from '@/helperFn/RegisterContextApi';

const creategroup = () => {
    const { getFriendMessage, user, createGroup } = useContext(ChatContext)
    const [friends, setFriends] = useState()
    const [addMember, setAddMember] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [groupId, setGroupId] = useState()
    const router = useRouter()
    useEffect(() => {
        getFriendMessage(setFriends, '')
    }, [user])

    useEffect(()=>{
        groupId?.msg ? router.push(`/chat/group/${groupId.msg}`) : null
    },[groupId])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {
                isVisible ? <ModalContainer setGroupId={setGroupId} groupName={groupName} addMember={addMember} createGroup={createGroup} setGroupName={setGroupName} setIsVisible={setIsVisible} />
                    : null
            }
            <ThemedView style={{
                paddingTop: 40, padding: 10, alignItems: 'center', flexDirection: 'row',
                justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgb(225 225 225)'
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable onPress={() => router.back()}>
                        <AntDesign name="left" size={20} color="" />
                    </Pressable>
                </View>
                <ThemedText type='subtitle'>Choose People</ThemedText>
                <TouchableOpacity onPress={() => setIsVisible(true)}><Text style={{ color: '#1877F2' }}>Create</Text></TouchableOpacity>
            </ThemedView>
            <FlatList
                data={friends}
                renderItem={({ item }) => {
                    return !item.members && (
                        <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'rgb(225 225 225)', paddingHorizontal: 5, paddingVertical: 10 }} onPress={() => addMember.includes(item.id) ? setAddMember((prevMembers) => prevMembers.filter(member => member !== item.id)) : setAddMember([...addMember, item.id])} >
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                {
                                    item.image ?
                                        <Image source={{ uri: item.image }} style={styles.image} />
                                        : <View style={styles.dummy}>
                                            <Ionicons name="person" size={30} style={{ marginTop: 10 }} color="rgb(225 225 225)" />
                                        </View>
                                }
                                <Text>{item.firstName} {item.lastName}</Text>
                            </View>
                            {addMember.includes(item.id) ? <AntDesign name='checkcircle' size={20} /> : <View></View>}
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

interface ModalConType { 
    setIsVisible:Function, 
    setGroupName:Function, 
    createGroup:String, 
    addMember:Array<any>,
    groupName:String,
    setGroupId:Function
 }

const ModalContainer = ({ setIsVisible, setGroupName, createGroup, addMember, groupName,setGroupId }:ModalConType) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.container}>
            </TouchableOpacity>
            <View style={styles.modal}>
                <Text style={styles.modalTitle}>Type group name</Text>
                <TextInput style={styles.input} onChangeText={(e) => setGroupName(e)} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => setIsVisible(false)}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { borderLeftWidth: 1 }]} onPress={()=>{
                        createGroup(addMember,groupName,setGroupId)
                        }}><Text style={styles.buttonText}>Ok</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default creategroup

const styles = StyleSheet.create({
    dummy: {
        width: 50,
        height: 50,
        borderRadius: '100%',
        backgroundColor: 'rgb(211 211 211)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    container: { justifyContent: "center", alignItems: "center", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.193)', position: 'absolute', zIndex: 5 },
    modal: {
        width: '70%',
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 20
    },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: 'center', padding: 10 },
    buttonContainer: { flexDirection: "row", },
    buttonText: { color: "#007AFF", fontSize: 16, padding: 10, textAlign: 'center' },
    button: { borderTopWidth: 1, borderColor: "rgba(0, 0, 0, 0.3)", flex: 1 },
    input: {
        margin: 20,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white'
    }
})