import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '@/components/Input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import ChatContext from '@/helperFn/RegisterContextApi';

const findPeople = () => {
    const { getAllUsers, sendRequest } = useContext(ChatContext)
    const [friend, setFriend] = useState([])
    const [name, setName] = useState('')
    const { height } = useWindowDimensions()
    const [added, setAdded] = useState()
    const[ids,setIds] = useState([])
    const router = useRouter()
    useEffect(() => {
        getAllUsers(setFriend, name)
    }, [name])

    useEffect(()=>{
        added ? setIds([...ids, added.id]) :null
    },[added])
    return (
            <ThemedView style={{ flex: 1, minHeight: height, }}>
                <ThemedView style={{ paddingTop: 40, padding: 10, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgb(225 225 225)', justifyContent: 'space-between' }}>
                    <Input placeholder={'Search for friends'} style={{ paddingVertical: 5, width: '80%', borderRadius: 5, marginVertical: 10, backgroundColor: 'rgb(242, 242, 242)', borderWidth: 0 }} leftIcon={<AntDesign name="search1" size={10} style={{}} color="" />} value={name} func={(text: any) => setName(text.target.value)} />
                    <Text style={{ color: '#1877F2' }}>Cancel</Text>
                </ThemedView>
                <View style={{ paddingHorizontal: 10, flex:1,  }}>
                    <FlatList
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.message}>
                                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                        {
                                            <View style={styles.imageCon}>
                                                {
                                                    item.image ?
                                                        <Image source={{uri:item.image}} style={styles.image} />
                                                        : <View style={styles.dummy}>
                                                            <Ionicons name="person" size={30} style={{ marginTop: 10 }} color="rgb(225 225 225)" />
                                                        </View>
                                                }
                                            </View>
                                        }
                                        <View>
                                            <ThemedText type='defaultSemiBold'>{item.firstName} {item.lastName}</ThemedText>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        sendRequest(item.id,setAdded)
                                    }} style={{ backgroundColor: 'rgb(242, 242, 242)', paddingHorizontal: 15, paddingVertical: 2, borderRadius: 20 }}>
                                       {
                                        ids.includes(item?.id)
                                        ?<Text>Added</Text>
                                        :<Text>Add</Text>
                                       }
                                        
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                        data={friend}
                        contentContainerStyle={{ gap: 20, marginVertical: 20 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ThemedView>
    )
}

export default findPeople

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
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})