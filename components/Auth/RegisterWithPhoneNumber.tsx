import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import CountryList from 'country-list-with-dial-code-and-flag'
// import { CountryPicker } from "react-native-country-codes-picker";
// import CountryPicker from "react-native-country-picker-modal";
// import countries from "world-countries";
import { Picker } from '@react-native-picker/picker';

const RegisterWithPhoneNumber = () => {
    // const [countryCode, setCountryCode] = useState("NG"); // Default to Nigeria
    // const [country, setCountry] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('')
    // const countries = CountryList.getAll()
    // console.log("contries", `https://flagcdn.com/w320/${countries[0].code.toLowerCase()}.png`, countries[0])
    // console.log(countries)
    
    return (
        <View style={styles.container}>
        {/* <Picker
        // selectedValue={subject.unit}
        onValueChange={(itemValue) => {
            console.log(itemValue,'sas')
        }}
        // accessibilityLabel="Units"
        // placeholder='Units'
        // style={styles.picker}
    >
      
        {countries.map((unit,index) => (
            <Picker.Item key={index} label={unit.name} value={unit.countryCode} />
        ))}
    </Picker>
            <Image style={styles.image} source={{uri:`https://flagcdn.com/w320/${countries[0].code.toLowerCase()}.png`}}/> */}
            <Input placeholder={'Phone Number'} value={phoneNumber} func={(text: any) => setPhoneNumber(text.target.value)} />
            <Button label={'Send Code'} bgcolor="#1877F2" txcolor='white' major={true} func={() => console.log('/auth/login')} />
        </View>
    )
}

export default RegisterWithPhoneNumber

const styles = StyleSheet.create({
    container: {
        gap: 50,
        width: '100%',
        alignItems:'center'
    },
    image:{
        width:20,
        height:20
    }
})