import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import Button from '@/components/Button'
import LoginWithPhoneNumber from '@/components/Auth/LoginWithPhoneNumber'
import { ThemedText } from '@/components/ThemedText'
import LoginWithEmail from '@/components/Auth/LoginWithEmail'
import RegisterWithEmail from '@/components/Auth/RegisterWithEmail'
import RegisterWithPhoneNumber from '@/components/Auth/RegisterWithPhoneNumber'
import Input from '@/components/Input'
import Icon from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const register = () => {
    const [registerWith, setRegisterWith] = useState('phone')
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
    })
    const router = useRouter()
    const [image, setImage] = useState<string | null>(null);
    console.log(image)
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
                <Icon name="arrowleft" size={20} color="#1877F2" />
            </TouchableOpacity>
            <ThemedView style={styles.container}>
                <ThemedText type='title' style={{ color: '#1877F2', paddingLeft: 20, paddingTop: 10 }}>Create new account</ThemedText>
                <View style={styles.subContent}>
                    <View style={styles.profileImageContainer}>
                        {image ?
                            <Image source={{ uri: image }} height={120} width={120} style={styles.image} />
                            :
                            <View style={styles.imageContainer}>
                                <Ionicons name="person" size={130} style={{ marginTop: 10 }} color="rgb(225 225 225)" />
                            </View>}
                        <TouchableOpacity style={styles.picIcon} onPress={pickImage} >
                            <FontAwesome name="camera" size={20} color="rgb(255 255 255)" style={{ opacity: 0.8 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ gap: 10, width: '100%', alignItems: 'center' }}>
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
        backgroundColor: 'rgb(211 211 211)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    profileImageContainer: {
        marginHorizontal: 'auto',
        marginVertical: 40,
        position: 'relative',
    },
    picIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgb(148 148 148)',
        height: 30,
        width: 30,
        borderRadius: "100%",
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5
    },
    image: {
        borderRadius: 100,
        width: 120,
        height: 120,
    }
})