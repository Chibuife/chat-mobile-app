import { View, Text, StyleSheet, Image, useWindowDimensions, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const OnboardingItem = ({ item }:{item:any}) => {
    const { width } = useWindowDimensions()
    const { height } = useWindowDimensions()

    return (
        <SafeAreaView style={[style.container, { width, height: height + 200 }]}>
                {/* <Image source={item.image}  style={[style.image,{width: width}]} /> */}
                <Text style={style.header}>{item.title}</Text>
                <Text style={style.span}>{item.subText}</Text>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    image: {
        // flex: 1,
        // resizeMode: 'cover',
        // justifyContent: 'center',
        // position: 'absolute',
        // zIndex:5,
        // right:0,
        // left:0,
        // bottom:0,
        // top:0        
    },
    container: {
        // flex: 1,
        backgroundColor: '#1877F2',
        justifyContent:'center'
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginBottom:10,
    },
    span: {
        color: 'white',
        textAlign: 'center',
    }

})
export default OnboardingItem