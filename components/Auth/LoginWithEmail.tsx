import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { ThemedText } from '../ThemedText'
import { useRouter } from 'expo-router'
import ChatContext from '@/helperFn/RegisterContextApi'
import Entypo from 'react-native-vector-icons/Entypo';

const LoginWithEmail = () => {
    const { loginUser, } = useContext(ChatContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)

    const router = useRouter()
    return (
        <View style={styles.container}>
            <Input placeholder={'E-mail'} value={email} func={(text: any) => setEmail(text.target.value)} />
                <Input placeholder={'Password'} secureTextEntry={showPassword} value={password} rightIcon={<TouchableOpacity onPress={() => setShowPassword(!showPassword)}><Entypo name={!showPassword ? 'eye' : 'eye-with-line'} size={20} /></TouchableOpacity>} func={(text: any) => setPassword(text.target.value)} />
            <TouchableOpacity style={{width:'95%'}} onPress={() => router.push('/auth/reset-password')}>
                <ThemedText  type='defaultSemiBold' style={{ color: '#1877F2', textAlign: "right", width:'100%' }}>Forgotten password?</ThemedText>
            </TouchableOpacity>
            <Button label={'Log In'} bgcolor="#1877F2" txcolor='white' major={true} func={() => {
                if (email === '' || password === '') {
                    return alert('please fill up credentialls')
                }
                loginUser(email, password)
            }} />
        </View>
    )
}

export default LoginWithEmail

const styles = StyleSheet.create({
    container: {
        gap: 20,
        width: '100%',
        alignItems: 'center'
    }
})