import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import Button from '@/components/Button'
import LoginWithPhoneNumber from '@/components/Auth/LoginWithPhoneNumber'
import { ThemedText } from '@/components/ThemedText'
import LoginWithEmail from '@/components/Auth/LoginWithEmail'
import { useRouter } from 'expo-router'
import Icon from 'react-native-vector-icons/AntDesign';

const login = () => {
    const [loginWith, setLoginWith] = useState('phone')
    const router = useRouter()

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
                <Icon name="arrowleft" size={20} color="#1877F2" />
            </TouchableOpacity>
            <ThemedText type='title' style={{ color: '#1877F2', paddingLeft: 20, paddingTop: 10 }}>Sign In</ThemedText>
            <View style={styles.subContent}>
                {loginWith === "phone" ? <LoginWithPhoneNumber /> : <LoginWithEmail />}
                <ThemedText type='default' style={{ marginVertical: 20 }}>OR</ThemedText>
                <Button label={'Login With Facebook'} bgcolor="#1877F2" txcolor='white' major={true} func={()=> router.push('/chat/home')} />
                <Button bgcolor="black" label={'Sign In With Apple'} txcolor='white' major={true} func={()=>console.log('hi')} />
                {
                    loginWith === "phone" ? <TouchableOpacity onPress={() => setLoginWith('email')}>
                        <ThemedText type='defaultSemiBold' style={{ color: '#1877F2' }}>Sign in with E-mail</ThemedText>
                    </TouchableOpacity> : <TouchableOpacity onPress={() => setLoginWith('phone')}>
                        <ThemedText type='defaultSemiBold' style={{ color: '#1877F2' }}>Login with phone number</ThemedText>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    subContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }
})