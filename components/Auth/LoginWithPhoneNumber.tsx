import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'

const LoginWithPhoneNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    return (
        <View style={styles.container}>
            <Input placeholder={'Phone Number'} value={phoneNumber} func={(text: any) => setPhoneNumber(text.target.value)} />
            <Button label={'Send Code'} bgcolor="#1877F2" txcolor='white' major={true} func={() => console.log('/auth/login')} />
        </View>
    )
}

export default LoginWithPhoneNumber

const styles = StyleSheet.create({
    container:{
        gap:20,
        width:'100%',
        alignItems:'center'
    }
})