import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../Input';
import { ThemedText } from '../ThemedText';
import Button from '../Button';
import Entypo from 'react-native-vector-icons/Entypo';

const RegisterWithEmail = ({registerUser, userDetails}:{registerUser:Function, userDetails:any}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    return (
        <View style={styles.container}>
            <View style={{gap:10, width:'100%', alignItems:'center'}}>
                <Input placeholder={'E-mail'} value={email} func={(text: any) => setEmail(text.target.value)} />
                <Input placeholder={'Password'} secureTextEntry={showPassword} value={password} rightIcon={<TouchableOpacity onPress={()=>setShowPassword(!showPassword)}><Entypo name={!showPassword ?'eye':'eye-with-line'} size={20}/></TouchableOpacity>} func={(text: any) => setPassword(text.target.value)} />
            </View>
            <Button label={'Sign up'} bgcolor="#1877F2" txcolor='white' major={true} func={()=>{
                if(userDetails.lastName ===''|| userDetails.firstName === '' || email ==='' || password === '' ){
                    return alert('please fill up credentialls')
                }
                registerUser(userDetails,email,password)
                }} />
        </View>
    )
}

export default RegisterWithEmail

const styles = StyleSheet.create({
    container: {
        gap: 30,
        width: '100%',
        alignItems:'center'
    }
})