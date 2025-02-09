import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Input = ({placeholder,func,value,style}:{placeholder:String,func:Function,value:String,style?:any}) => {
  return (
        <TextInput style={[styles.input,style]} textContentType='telephoneNumber' placeholder={placeholder} onChange={func} value={value}/>
  )
}

export default Input

const styles = StyleSheet.create({
    input:{
        paddingVertical:10,
        paddingHorizontal:10,
        borderColor:'grey',
        borderRadius:20,
        borderWidth: 1,
        width:'100%'
    }
})