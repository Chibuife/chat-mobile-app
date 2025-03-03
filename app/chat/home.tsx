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
const home = () => {
    const [friend, setFriend] = useState('')
    const { height } = useWindowDimensions()
    const truncateText = (text?: string, maxLength?: number) => {
        if (text && maxLength) return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };
    const router = useRouter()
    return (
        <ScrollView>
            <ThemedView style={{ flex: 1, minHeight: height, }}>
                <ThemedView style={{paddingVertical:40,padding: 10, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgb(225 225 225)', justifyContent: 'space-between' }}>
                    <Ionicons name="menu-outline" size={30} style={{}} color="" />
                    <ThemedText type='subtitle' style={{}}>My Profile</ThemedText>
                    <TouchableOpacity onPress={()=> router.push('/chat/findPeople')}>
                        <MaterialCommunityIcons name="notebook-edit-outline" size={20} style={{}} color="" />
                    </TouchableOpacity>
                </ThemedView>
                <View style={{ paddingHorizontal: 10 }}>
                    <Input placeholder={'First Name'} style={{ paddingVertical: 5, borderRadius: 5, marginVertical: 10, backgroundColor: 'rgb(242, 242, 242)', borderWidth: 0 }} leftIcon={<AntDesign name="search1" size={10} style={{}} color="" />} value={friend} func={(text: any) => setFriend(text.target.value)} />
                    <FlatList
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => router.push('/chat/abc')} style={styles.profile}>
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
                                    <ThemedText>{item.name}</ThemedText>
                                </TouchableOpacity>
                            )
                        }}
                        data={data}
                        horizontal
                        contentContainerStyle={{ gap: 20, marginVertical: 20 }}
                        showsHorizontalScrollIndicator={false}
                    />

                    <FlatList
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.message}>
                                    {
                                        item.group ?
                                            <View style={[styles.imageCon]}>
                                                {
                                                    item.group.map((member, index) => {
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
                                        <ThemedText type='defaultSemiBold'>{item.name}</ThemedText>
                                        <ThemedText>
                                            {truncateText(item.message, 20)} . {item.date}
                                        </ThemedText>
                                    </View>
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

export default home

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
    }
})