import React, {  useEffect, useState } from 'react';
import {  Redirect } from 'expo-router';
import Onboarding from "../components/Onboarding";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Page() {
    const [viewedOnboarding, setViewedOnboarding] = useState(false)

    const [user, setUser] = useState("")

    const checkOnboarding = async () => {
        try {
            const value = await AsyncStorage.getItem('@viewedOboarding')
            if (value !== null) {
                setViewedOnboarding(true)
            }
        } catch (error) {
            console.log('Error @viewedOnboarding', error)
        }
    }

    const checkUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            if (value !== null) {
                setUser(value)
            }
        } catch (error) {
            console.log('Error @token', error)
        }
    }


    useEffect(() => {
        checkOnboarding()
        checkUser()
    }, [viewedOnboarding, user])

    return (
        user !== "" && viewedOnboarding ? <Redirect href={'/chat/home'} /> :
            viewedOnboarding ? <Redirect href={'/auth'} /> :
                <Onboarding />
    );
}
