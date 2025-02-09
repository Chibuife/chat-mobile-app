import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import Button from '@/components/Button'
import LoginWithPhoneNumber from '@/components/Auth/LoginWithPhoneNumber'
import { ThemedText } from '@/components/ThemedText'
import LoginWithEmail from '@/components/Auth/LoginWithEmail'
import RegisterWithEmail from '@/components/Auth/RegisterWithEmail'
import RegisterWithPhoneNumber from '@/components/Auth/RegisterWithPhoneNumber'
import Input from '@/components/Input'

const register = () => {
    const [registerWith, setRegisterWith] = useState('phone')
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
    })
    return (
        <SafeAreaView style={{flex:1}}>
            <ThemedView style={styles.container}>
                <ThemedText type='title' style={{ color: '#1877F2', paddingLeft: 20, paddingTop: 10 }}>Create new account</ThemedText>
                <View style={styles.subContent}>
                    <View style={styles.profileImageContainer}>
                        <View style={styles.imageContainer}></View>
                        <View style={styles.picIcon}></View>
                    </View>
                    <View style={{ gap: 10, width: '90%' }}>
                        <Input placeholder={'First Name'} value={userDetails.firstName} func={(text: any) => setUserDetails({ ...userDetails, firstName: text.target.value })} />
                        <Input placeholder={'Last Name'} value={userDetails.lastName} func={(text: any) => setUserDetails({ ...userDetails, lastName: text.target.value })} />
                    </View>
                    {registerWith === "phone" ? <RegisterWithPhoneNumber /> : <RegisterWithEmail />}
                    <ThemedText type='default' style={{ marginVertical: 10 }}>OR</ThemedText>
                    {/* <Button label={'Login With Facebook'} bgcolor="#1877F2" txcolor='white' major={true} func={scrollTo} />
                <Button bgcolor="black" label={'Sign In With Apple'} txcolor='white' major={true} func={scrollTo} /> */}
                    {
                        registerWith === "phone" ? <TouchableOpacity onPress={() => setRegisterWith('email')}>
                            <ThemedText type='defaultSemiBold' style={{ color: '#1877F2' }}>Sign Up with E-mail</ThemedText>
                        </TouchableOpacity> : <TouchableOpacity onPress={() => setRegisterWith('phone')}>
                            <ThemedText type='defaultSemiBold' style={{ color: '#1877F2' }}>Sign Up with phone number</ThemedText>
                        </TouchableOpacity>
                    }
                </View>
            </ThemedView>
        </SafeAreaView>
    )
}

export default register

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    imageContainer: {
        borderRadius: "100%",
        width: 120,
        height: 120,
        backgroundColor: 'grey'
    },
    profileImageContainer: {
        marginHorizontal: 'auto',
        marginVertical: 40,
        position: 'relative',
        // backgroundColor: 'red'
        // width:50
    },
    picIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'blue',
        height: 30,
        width: 30,
        borderRadius: "100%",
        zIndex: 10
    }
})