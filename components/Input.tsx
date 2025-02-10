import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { ReactDOM, ReactElement } from 'react'

const Input = ({ placeholder, func, value, style, leftIcon }: { placeholder: String, func: Function, value: String, style?: any, leftIcon?: ReactElement }) => {
  return (
    <View style={[styles.input, style]}>
      {leftIcon ? leftIcon : null}
      <TextInput style={{flex:1}} textContentType='telephoneNumber' placeholder={placeholder} onChange={func} value={value} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 1,
    width: '100%',
    flexDirection:'row',
    alignItems:'center',
    gap:10
  }
})