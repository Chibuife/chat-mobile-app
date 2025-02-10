import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';

const profile = () => {
    const [image, setImage] = useState<string | null>(null);
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
    const router = useRouter()
    return (
        <ThemedView style={{flex:1}}>
            <ThemedView style={{ padding: 10, alignItems:'center', flexDirection:'row', borderBottomWidth: 1, borderBottomColor:'rgb(225 225 225)' }}>
                <Ionicons name="menu-outline" size={30} style={{}} color="" />
                <ThemedText type='subtitle'  style={{ textAlign: "center", flex:1 }}>My Profile</ThemedText>
            </ThemedView>
\            <View style={styles.profileImageContainer}>
                {image ? <Image source={{ uri: image }} height={120} width={120} style={styles.image} /> : <View style={styles.imageContainer}>
                    <Ionicons name="person" size={130} style={{ marginTop: 10 }} color="rgb(225 225 225)" />
                </View>}
                <TouchableOpacity style={styles.picIcon} onPress={pickImage} >
                    <FontAwesome name="camera" size={20} color="rgb(255 255 255)" style={{ opacity: 0.8 }} />
                </TouchableOpacity>
            </View>
            <ThemedText type='subtitle' style={{textAlign:'center'}}>Chibuife John</ThemedText>
            <View style={{marginVertical:50}}>
                <Pressable style={styles.navItem} onPress={()=> router.push('/profile/edith')}>
                    <View style={{flexDirection:'row', gap:20, alignItems:'center'}}>
                        <Ionicons name="person-circle-outline" size={20} style={{}} color="rgb(98 111 209)" />
                        <ThemedText>Account Details</ThemedText>
                    </View>
                    <AntDesign name="right" size={20} style={{}} color="rgb(197 196 196)" />
                </Pressable>
                <Pressable style={styles.navItem} onPress={()=> router.push('/profile/setting')}>
                    <View style={{flexDirection:'row', gap:20, alignItems:'center'}}>
                        <AntDesign name="setting" size={20} style={{}} />
                        <ThemedText>Setting</ThemedText>
                    </View>
                    <AntDesign name="right" size={20} style={{}} color="rgb(197 196 196)" />
                </Pressable>
                <Pressable style={styles.navItem}>
                    <View style={{flexDirection:'row', gap:20, alignItems:'center'}}>
                        <FontAwesome6 name="phone-volume" size={20} style={{}} color="green" />
                        <ThemedText>Contact Us</ThemedText>
                    </View>
                    <AntDesign name="right" size={20} style={{}} color="rgb(197 196 196)" />
                </Pressable>
            </View>
            <Button bgcolor="" borderWidth={1} borderColorLight='rgb(197 196 196)' borderRadius={5} borderColorDark={'white'} label={<ThemedText lightColor='black' darkColor='white'>Logout</ThemedText>} txcolor='white' major={true} func={scrollTo} />
        </ThemedView>
    )
}

export default profile

const styles = StyleSheet.create({
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
        marginVertical: 10,
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
        borderRadius: '100%',
        width: 120,
        height: 120,
    },
    navItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        alignItems:'center',
        marginVertical:10
    }
})