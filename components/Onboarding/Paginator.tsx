import { View, Text, StyleSheet, useWindowDimensions, Animated } from 'react-native'
import React from 'react'

const Paginator = ({ data, scrollX }:{data:any, scrollX:any}) => {
    const { width } = useWindowDimensions()
    return (
        <View style={{ flexDirection: 'row',
        }}>
            {data.map((_:any, i:number) => {
                const inputRange = [(i - 1) * width, i * width,(i+1)*width]
                // const dotWidth = scrollX.interpolate({
                //     inputRange,
                //     outputRange:[15, 70, 15],
                //     extrapolate: 'clamp'
                // })
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [.3, 1, 1],
                    extrapolate: 'clamp'
                })
                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#1877F2', '#FFFFFF', '#1877F2'],
                    extrapolate: 'clamp'
                })
                return <Animated.View style={[style.dot, { 
                    width: 10,
                    borderColor:'white',
                      backgroundColor } ]} key={i} />
            })
            }
        </View>
    )
}

const style = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 15,
        marginHorizontal: 8,
        borderWidth:1
    }
})
export default Paginator