import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { ThemedText } from '@/components/ThemedText'
import Icon from 'react-native-vector-icons/AntDesign';

const resetpassword = () => {
    const [email, setEmail] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Icon name="rocket" size={30} color="#1877F2" />
            <ThemedText type='title' style={{ color: '#1877F2', paddingLeft: 20, paddingTop: 10 }}>Reset Password</ThemedText>
            <View style={styles.subContainer}>
                <Input placeholder={'E-mail'} style={{ width: '90%' }} value={email} func={(text: any) => setEmail(text.target.value)} />
                <Button label={'Send Link'} bgcolor="#1877F2" txcolor='white' major={true} func={() => console.log('/auth/login')} />
            </View>
        </SafeAreaView>
    )
}

export default resetpassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    subContainer: {
        flex:0.7,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    }
})