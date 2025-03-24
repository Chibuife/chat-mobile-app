import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { ThemedText } from '@/components/ThemedText'
import Icon from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router'
import ChatContext from '@/helperFn/RegisterContextApi'
import { useRoute } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo';

const passwordreset = () => {
    const { resetpassword } = useContext(ChatContext)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const route = useRoute()
    const router = useRouter()
    const {token} = route.params
    console.log(token,'route')
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
                <Icon name="arrowleft" size={20} color="#1877F2" />
            </TouchableOpacity>
            <ThemedText type='title' style={{ color: '#1877F2', paddingLeft: 20, paddingTop: 10 }}>Reset Password</ThemedText>
            <View style={styles.subContainer}>
                <Input placeholder={'Password'} secureTextEntry={showPassword} value={password} rightIcon={<TouchableOpacity onPress={() => setShowPassword(!showPassword)}><Entypo name={!showPassword ? 'eye' : 'eye-with-line'} size={20} /></TouchableOpacity>} func={(text: any) => setPassword(text.target.value)} />
                <Input placeholder={'Confirm Password'} secureTextEntry={showConfirmPassword} value={confirmPassword} rightIcon={<TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}><Entypo name={!showConfirmPassword ? 'eye' : 'eye-with-line'} size={20} /></TouchableOpacity>} func={(text: any) => setConfirmPassword(text.target.value)} />
                <Button label={'Send Link'} bgcolor="#1877F2" txcolor='white' major={true} func={() => confirmPassword !== '' && confirmPassword === password ? resetpassword(confirmPassword,token) : null} />
            </View>
        </SafeAreaView>
    )
}

export default passwordreset

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    subContainer: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    }
})