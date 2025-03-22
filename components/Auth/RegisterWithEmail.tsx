import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../Input';
import { ThemedText } from '../ThemedText';
import Button from '../Button';
import Entypo from 'react-native-vector-icons/Entypo';
import { ImageEditor } from 'react-native';

const RegisterWithEmail = ({registerUser, userDetails, image}:{registerUser:Function, userDetails:any, image:any}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    return (
        <View style={styles.container}>
            <View style={{gap:10, width:'100%', alignItems:'center'}}>
                <Input placeholder={'E-mail'} value={email} func={(text: any) => setEmail(text.target.value)} />
                <Input placeholder={'Password'} secureTextEntry={showPassword} value={password} rightIcon={<TouchableOpacity onPress={()=>setShowPassword(!showPassword)}><Entypo name={!showPassword ?'eye':'eye-with-line'} size={20}/></TouchableOpacity>} func={(text: any) => setPassword(text.target.value)} />
            </View>
            <Button label={'Sign up'} bgcolor="#1877F2" txcolor='white' major={true} func={async()=>{
                if(userDetails.lastName ===''|| userDetails.firstName === '' || email ==='' || password === '' ){
                    return alert('please fill up credentialls')
                }
                const response = await fetch(image.uri);
                const blob = await response.blob();
          
                const formData = new FormData();
                formData.append("email",email);
                formData.append("password",password);
              
                formData.append("profilePicture", blob, image.name);

                console.log("Selected file:", image)
                console.log([...formData]);
// console.log("FormData content:", formData.get("profilePicture"));
// console.log(image,{
//     uri: image.uri,  // Image file URI
//                     name: image.name, // File name
//                     type: image.type,
// })
                registerUser(userDetails,formData)
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