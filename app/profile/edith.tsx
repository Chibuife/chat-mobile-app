import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ThemedText } from '@/components/ThemedText'
import { useRouter } from 'expo-router';

const edith = () => {
    const router = useRouter()
    return (
        <SafeAreaView>
            <ThemedView style={{ padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgb(225 225 225)' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Pressable onPress={()=> router.back()}>
                        <AntDesign name="left" size={20} style={{}} color="" />
                    </Pressable>
                    <ThemedText  style={{}}>My Profile</ThemedText>
                </View>
                <ThemedText type='subtitle' style={{}}>Edith Profile</ThemedText>
                <ThemedText type='defaultSemiBold' style={{ color: '#1877F2' }}>Done</ThemedText>
            </ThemedView>
            <View style={{ marginVertical: 50 }}>
                <ThemedText lightColor='rgb(120 120 120)' style={{ padding: 10 }}>PUBLIC PROFILE</ThemedText>
                <ThemedView>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(203 203 203)', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <ThemedText>First Name</ThemedText>
                        <ThemedText>Chibuife</ThemedText>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(203 203 203)', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <ThemedText>Last Name</ThemedText>
                        <ThemedText>John</ThemedText>
                    </View>
                </ThemedView>
            </View>
            <View style={{}}>
                <ThemedText lightColor='rgb(120 120 120)' style={{ padding: 10 }}>PRIVATE DETAILS</ThemedText>
                <ThemedView>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(203 203 203)', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <ThemedText>E-mail Address</ThemedText>
                        <ThemedText>chibuifejohn1@gmail.com</ThemedText>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(203 203 203)', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <ThemedText>Phone Number</ThemedText>
                        <ThemedText>07044250072</ThemedText>
                    </View>
                </ThemedView>
            </View>
        </SafeAreaView>
    )
}

export default edith

const styles = StyleSheet.create({})