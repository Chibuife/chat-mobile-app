import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ThemedText } from '@/components/ThemedText'
import { useRouter } from 'expo-router';
import Button from '@/components/Button';

const setting = () => {
    const router = useRouter()
    const [notification, setNotification] = useState(true)
    return (
        <SafeAreaView>
            <ThemedView style={{ padding: 10, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgb(225 225 225)' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Pressable onPress={() => router.back()}>
                        <AntDesign name="left" size={20} style={{}} color="" />
                    </Pressable>
                    <ThemedText style={{}}>My Profile</ThemedText>
                </View>
                <ThemedText type='subtitle' style={{ textAlign:'center', flex:.8}}>Settings</ThemedText>
            </ThemedView>
            <View style={{ marginVertical: 50 }}>
                <ThemedText lightColor='rgb(120 120 120)' style={{ padding: 10 }}>PUBLIC PROFILE</ThemedText>
                <ThemedView>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(203 203 203)', flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' }}>
                        <ThemedText>Allow Push Notification</ThemedText>
                        <Pressable onPress={() => setNotification(!notification)} style={[styles.btnContainer, { backgroundColor: notification ? 'green' : 'rgb(242, 242, 242)', }]}>
                            <View style={[styles.btn, { transform: notification ? 'translateX(90%)' : 'translateX(10%)' }]}>

                            </View>
                        </Pressable>
                    </View>
                </ThemedView>
            </View>
            <Button bgcolor="" borderWidth={1} width={"100%"} borderColorLight='rgb(197 196 196)' borderRadius={5} borderColorDark={'white'} label={<ThemedText lightColor='#1877F2' darkColor='#1877F2'>Save</ThemedText>} txcolor='white' major={true} func={scrollTo} />
        </SafeAreaView>
    )
}

export default setting

const styles = StyleSheet.create({
    btnContainer: {
        height: 22,
        width: 40,
        borderRadius: 20,
        position: 'relative',
        justifyContent: 'center',
        transitionDuration: '0.3s'
    },
    btn: {
        backgroundColor: 'white',
        borderRadius: '100%',
        width: 20,
        height: 20,
        transitionDuration: '0.3s'
    }
})