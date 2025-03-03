import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { Link, Redirect } from 'expo-router';
// import Onboarding from "@/components/Onboarding";
import Onboarding from "../components/Onboarding";
// import Onboarding from 'react-native-onboarding-swiper';

import { OnboardFlow } from 'react-native-onboard';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useDispatch } from 'react-redux';
// "overrides": {
//     "react-refresh": "~0.14.0"
// },
// "resolutions": {
//     "react-refresh": "~0.14.0"
// },

// "@expo/metro-config": "~0.18.1",


export default function Page() {
    //     const [viewedOnboarding, setViewedOnboarding] = useState(false)

    //     const [token, setToken] = useState(false)

    //     const checkOnboarding = async () => {
    //         try {
    //             const value = await AsyncStorage.getItem('@viewedOboarding')
    //             if (value !== null) {
    //                 setViewedOnboarding(true)
    //             }
    //         } catch (error) {
    //             console.log('Error @viewedOnboarding', error)



    //         }
    //     }

    // const checkToken = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('@token')
    //         if (value !== null) {
    //             setToken(true)
    //         }
    //     } catch (error) {
    //         console.log('Error @token', error)
    //     }
    // }


    // useEffect(() => {
    //     checkOnboarding()
    //     checkToken()
    // }, [viewedOnboarding, token])

    return (          
                <Onboarding/>
    );
}
