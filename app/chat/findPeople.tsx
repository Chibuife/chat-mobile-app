import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '@/components/Input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router';
const messagedata = [
    {
        id: '1',
        name: 'Frientastics',
        group: [{ image: "" }, { image: "" }, { image: "" }, { image: "" }],
        message: 'I love this great app',
        date: '17:17'
    },
    {
        id: '1',
        name: 'Darren Black',
        message: 'I know right?',
        date: '17:09'
    }, {
        id: '1',
        name: 'Lesa Richardson',
        message: "I'm so glad we found this app",
        date: '16:57'
    }, {
        id: '1',
        name: 'Mark Twain',
        message: "Hey Cristina!",
        date: '16:49'
    }, {
        id: '1',
        name: '3 Coma Club',
        group: [{ image: "" }, { image: "" }],
        message: "I will neva drink again",
        date: '16:49'
    }, {
        id: '1',
        name: 'Carmila Bradly',
        message: "We had some much fun last night",
        date: '16:41'
    }, {
        id: '1',
        name: 'Curtis George',
        message: "Let me create a group",
        date: '16:32'
    }, {
        id: '1',
        name: 'Florain Marcu',
        message: "This app is amazing",
        date: '16:30'
    }, {
        id: '1',
        name: 'daren',
        image: '@/assets/images/sakuna.jfif'
    }, {
        id: '1',
        name: 'daren',
        image: '@/assets/images/sakuna.jfif'
    }, {
        id: '1',
        name: 'daren',
        image: '@/assets/images/sakuna.jfif'
    },
]
const data = [
    {
        id: '1',
        name: 'daren',
        // image: '@/assets/images/sakuna.jfif'
    },
    {
        id: '1',
        name: 'daren',
        // image: '@/assets/images/sakuna.jfif'
    }, {
        id: '1',
        name: 'daren',
        // image: '@/assets/images/sakuna.jfif'
    }, {
        id: '1',
        name: 'daren',
        image: '@/assets/images/sakuna.jfif'
    }, {
        id: '1',
        name: 'daren',
        image: '@/assets/images/sakuna.jfif'
    }, {
        id: '1',
        name: 'daren',
        image: '@/assets/images/sakuna.jfif'
    }, {
        id: '1',
        name: 'daren',
        image: '@/assets/images/sakuna.jfif'
    }, {
        id: '1',
        name: 'daren',
        image: '@/assets/images/sakuna.jfif'
    }, {
        id: '1',
        name: 'daren',
        image: '@/assets/images/sakuna.jfif'
    }, {
        id: '1',
        name: 'daren',
        image: '@/assets/images/sakuna.jfif'
    }, {
        id: '1',
        name: 'daren',
        image: '@/assets/images/sakuna.jfif'
    },
]
const findPeople = () => {
    const [friend, setFriend] = useState('')
    const { height } = useWindowDimensions()
    const truncateText = (text?: string, maxLength?: number) => {
        if (text && maxLength) return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };
    const router = useRouter()
    return (
        <ScrollView>
            <ThemedView style={{ flex: 1, minHeight: height, }}>
                <ThemedView style={{paddingVertical:40, padding: 10, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgb(225 225 225)', justifyContent: 'space-between' }}>
                    <Input placeholder={'Search for friends'} style={{ paddingVertical: 5,  width:'80%',borderRadius: 5, marginVertical: 10, backgroundColor: 'rgb(242, 242, 242)', borderWidth: 0 }} leftIcon={<AntDesign name="search1" size={10} style={{}} color="" />} value={friend} func={(text: any) => setFriend(text.target.value)} />
                    <Text style={{color:'#1877F2'}}>Cancel</Text>
                </ThemedView>
                <View style={{ paddingHorizontal: 10 }}>
                    <FlatList
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.message}>
                                    <View style={{ flexDirection: 'row', gap:5, alignItems:'center' }}>
                                        {
                                            <View style={styles.imageCon}>
                                                {
                                                    item.image ?
                                                        <Image source={require('@/assets/images/react-logo.png')} style={styles.image} />
                                                        : <View style={styles.dummy}>
                                                            <Ionicons name="person" size={30} style={{ marginTop: 10 }} color="rgb(225 225 225)" />
                                                        </View>
                                                }
                                            </View>
                                        }
                                        <View>
                                            <ThemedText type='defaultSemiBold'>{item.name}</ThemedText>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{backgroundColor: 'rgb(242, 242, 242)',paddingHorizontal:15, paddingVertical:2, borderRadius:20}}>
                                     <Text>Unfriend</Text>   
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                        data={messagedata}
                        contentContainerStyle={{ gap: 20, marginVertical: 20 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ThemedView>
        </ScrollView>
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
        justifyContent:'space-between',
        alignItems:'center'
    }
})