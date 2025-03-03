import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { ThemedText } from '../ThemedText'
import { useRouter } from 'expo-router'

const LoginWithEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const router = useRouter()
    return (
        <View style={styles.container}>
            <Input placeholder={'E-mail'} value={email} func={(text: any) => setEmail(text.target.value)} />
            <View style={{width:'100%'}}>
            <Input placeholder={'Password'} value={password} func={(text: any) => setPassword(text.target.value)} />
            <TouchableOpacity onPress={() => router.push('/auth/reset-password')}>
                <ThemedText type='defaultSemiBold' style={{ color: '#1877F2', textAlign:"right" }}>Forgotten password?</ThemedText>
            </TouchableOpacity>
            </View>
            <Button label={'Log In'} bgcolor="#1877F2" txcolor='white' major={true} func={() => console.log('/auth/login')} />
        </View>
    )
}

export default LoginWithEmail

const styles = StyleSheet.create({
    container: {
        gap: 20
    }
})