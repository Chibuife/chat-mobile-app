
import {  StyleSheet, Text, TouchableOpacity,View, Animated, PanResponder } from 'react-native'
import { useRouter } from 'expo-router';
import { useRoute } from "@react-navigation/native";
import { useRef } from 'react';

 const Modal = ({setModal}:{setModal:Function}) => {
    const router = useRouter()
    const route = useRoute();
        const translateX = useRef(new Animated.Value(0)).current;
        console.log(route,'route')
       const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx < 0) {
                    translateX.setValue(gestureState.dx);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx < -100) {
                    Animated.timing(translateX, {
                        toValue: -500, 
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => setModal(false)); // Close modal
                } else {
                    Animated.spring(translateX, {
                        toValue: 0, // Reset to original position
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;
    return (
        <View
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 11 }}
        >
            <Animated.View
                {...panResponder.panHandlers} style={{
                left: 0,
                width: '70%',
                height: '100%',
                gap: 10,
                backgroundColor: 'white',
                position: 'absolute',
                zIndex: 20,
                padding: 30
            }}>
                <TouchableOpacity style={[styles.option, { backgroundColor: route.path === '/chat/home' ? 'rgb(0 105 255 / 34%)':'' }]} onPress={() => router.push('/chat/home')}>
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, { backgroundColor: route.path === '/chat/friends' ? 'rgb(0 105 255 / 34%)':'' }]} onPress={() => router.push('/chat/friends')}>
                    <Text>Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, { backgroundColor: route.path === '/chat/findPeople' ? 'rgb(0 105 255 / 34%)':'' }]} onPress={() => router.push('/chat/findPeople')}>
                    <Text>Find Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, { backgroundColor: route.path === '/profile' ? 'rgb(0 105 255 / 34%)':'' }]} onPress={() => router.push('/profile')}>
                    <Text>Profile</Text>
                </TouchableOpacity>
                  <TouchableOpacity style={[styles.option, { backgroundColor: route.path === '/profile' ? 'rgb(0 105 255 / 34%)':'' }]} onPress={() => router.push('/chat/group/creategroup')}>
                  <Text>Create group</Text>
              </TouchableOpacity>
                <TouchableOpacity style={[styles.option, { backgroundColor: route.path === '/profile/setting' ? 'rrgb(0 105 255 / 34%)ed':'' }]} onPress={() => router.push('/profile/setting')}>
                    <Text>Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, { position:'absolute', bottom:10 }]}  onPress={() => router.push('/')}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity onPress={()=> setModal(false)} style={{
                backgroundColor: 'black', height: '100%', width: '100%',
                opacity: 0.5
            }}>

            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    option: {
        padding: 5,
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
        marginVertical: 5
    }
})
export default Modal