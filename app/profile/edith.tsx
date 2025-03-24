import { Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ThemedText } from '@/components/ThemedText'
import { useRouter } from 'expo-router';
import ChatContext from '@/helperFn/RegisterContextApi';
const edith = () => {
    const router = useRouter()
    const { user, updateProfile } = useContext(ChatContext);
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [email, setEmail] = useState(user?.email)
    const [number, setNumber] = useState(user?.number)
    const [modal, setModal] = useState('')
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    const update =  ()=>{
        const formData = new FormData()
        if(isValidEmail(email) === false){
            alert('invalid email')
        }
        console.log(user)
        formData.append('email',email)
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('number', number)
        formData.append('_id',user?._id)
        updateProfile(formData)
    }
    return (
        <SafeAreaView style={{flex:1}}>
            {
                modal !== '' ?
                    <Modal setModal={setModal} value={modal === 'First name' ? firstName : modal === 'Last name' ? lastName : modal === 'Email' ? email : number} item={modal} setState={modal === 'First name' ? setFirstName : modal === 'Last name' ? setLastName : modal === 'Email' ? setEmail : setNumber} /> : null
            }
            <ThemedView style={{ padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgb(225 225 225)',  }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Pressable onPress={() => router.back()}>
                        <AntDesign name="left" size={20} style={{}} color="" />
                    </Pressable>
                    <ThemedText style={{}}>My Profile</ThemedText>
                </View>
                <ThemedText type='subtitle' style={{}}>Edith Profile</ThemedText>
                <TouchableOpacity onPress={update}><ThemedText type='defaultSemiBold' style={{ color: '#1877F2' }}>Done</ThemedText></TouchableOpacity>
            </ThemedView>
            <View style={{ marginVertical: 50 }}>
                <ThemedText lightColor='rgb(120 120 120)' style={{ padding: 10 }}>PUBLIC PROFILE</ThemedText>
                <ThemedView>
                    <TouchableOpacity onPress={() => setModal('First name')} style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(203 203 203)', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <ThemedText>First Name</ThemedText>
                        <ThemedText>{firstName}</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModal('Last name')} style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(203 203 203)', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <ThemedText>Last Name</ThemedText>
                        <ThemedText>{lastName}</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </View>
            <View style={{}}>
                <ThemedText lightColor='rgb(120 120 120)' style={{ padding: 10 }}>PRIVATE DETAILS</ThemedText>
                <ThemedView>
                    <TouchableOpacity onPress={() => setModal('Email')} style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(203 203 203)', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <ThemedText>E-mail Address</ThemedText>
                        <ThemedText>{email}</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModal('number')} style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(203 203 203)', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <ThemedText>Phone Number</ThemedText>
                        <ThemedText>{number}</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </View>
        </SafeAreaView>
    )
}


const Modal = ({ value, item, setState, setModal }) => {
    return (
        <View style={styles.modalBody}>
            <View style={styles.modal}>
                <ThemedText style={{textAlign:'center'}}>{item}</ThemedText>
                <TextInput style={{borderWidth:1, padding:5,marginTop:20, borderRadius:5}} placeholder={item} onChange={(e) => setState(e.target.value)} value={value} />
                <TouchableOpacity style={{ backgroundColor: 'blue', borderRadius:10, paddingHorizontal:20, paddingVertical:5, position:'absolute', right:10, bottom:10 }} onPress={() => setModal('')}>
                    <Text style={{color:'white'}}>
                        Enter
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.overlay} onPress={() => setModal('')}></TouchableOpacity>
        </View>
    )
}

export default edith

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.3,
        zIndex: 0
    },
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    modal: {
        backgroundColor: 'white',
        width: '70%',
        height: 200,
        borderRadius: 10,
        padding:20,
        zIndex: 10,
    }
})