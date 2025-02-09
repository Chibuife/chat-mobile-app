import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../Input';
import { ThemedText } from '../ThemedText';
import Button from '../Button';

const RegisterWithEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    return (
        <View style={styles.container}>
            <View style={{gap:10}}>
                <Input placeholder={'E-mail'} value={email} func={(text: any) => setEmail(text.target.value)} />
                <Input placeholder={'Password'} value={password} func={(text: any) => setPassword(text.target.value)} />
            </View>
            <Button label={'Log In'} bgcolor="#1877F2" txcolor='white' major={true} func={() => console.log('/auth/login')} />
        </View>
    )
}

export default RegisterWithEmail

const styles = StyleSheet.create({
    container: {
        gap: 30,
        width: '90%'
    }
})