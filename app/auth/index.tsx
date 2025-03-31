import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import Entypo from 'react-native-vector-icons/Entypo';

const auth = () => {
  const router = useRouter()
  return (
    <ThemedView style={styles.container}>
      <Entypo name='camera' color={'#1877F2'} size={100} />
      <ThemedText type='title' style={{color:'#1877F2'}}>GXchatty</ThemedText>
      <ThemedText style={{textAlign:'center', marginBottom:10}}>Send texts, photos, videos and  audio messages to your close friends.</ThemedText>
      <Button label={'Log In'} bgcolor="#1877F2"  txcolor='white' major={true} func={()=> router.push('/auth/login')} />
      <Button bgcolor='' borderWidth={1} borderColor='#1877F2' label={'Sign Up'} txcolor='#1877F2' major={true} func={()=> router.push('/auth/register')} />
    </ThemedView>
  )
}

export default auth

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    gap:10,
  }
})