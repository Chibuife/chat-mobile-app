import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, Text, FlatList, Animated, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native'
import OnboardingItem from './OnboardingItem'
import Paginator from './Paginator'
import Button from '../Button'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'
import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

const OnboardingScreenData = [
  {
    id: '1',
    title: 'Private Messages',
    subText: 'Communicate with your friends via private messages',
    icon: 'notification'
  },
  {
    id: '2',
    title: 'Send Photos & Videos',
    subText: 'Have fun with your friends by sending photos and videos to each other',
    image: 'message'
  },
  {
    id: '3',
    title: 'Get Notified',
    subText: 'Receive notifications when your friends are looking for you',
    image: 'camera'
  },
]

const Onboarding = () => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [offSetValue, setOffSetValue] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<any> | null>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
    // setCurrentIndex(viewableItems[0].index);
    console.log(viewableItems)
  }).current;


  const screenWidth = Dimensions.get("window").width;

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / screenWidth);
    setCurrentIndex(currentIndex);
  };


  const viewedOnboarding = async () => {
    try {
      await AsyncStorage.setItem('@viewedOboarding', 'true');
      router.push('/auth')
    } catch (error) {
      console.log('Error @setItem', error)
    }
  }

  const { width } = useWindowDimensions()
  const { height } = useWindowDimensions()


  const scrollTo = () => {
    const nextIndex = currentIndex + 1;
    const screenWidth = Dimensions.get("window").width;
    if (slidesRef.current) {
      if (currentIndex < OnboardingScreenData.length - 1) {
        slidesRef.current.scrollToOffset({ offset: nextIndex * screenWidth, animated: true });
      }
    }
  }


  const scrollToLast = () => {
    if (slidesRef.current) {
      slidesRef.current.scrollToOffset({ offset: OnboardingScreenData.length * screenWidth, animated: true });
    }
  }



  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 10 }).current;

  return (
    <SafeAreaView style={{flex:1, overflow:'hidden'}}>
      <FlatList
        data={OnboardingScreenData}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
            listener: handleScroll,
          })
        }
        viewabilityConfig={viewConfig}
        onViewableItemsChanged={viewableItemsChanged}
        scrollEventThrottle={32}
        ref={slidesRef}
      />
      <View style={[style.staticItems, {
        width,
      }]}>
        {
          <>
            {currentIndex < OnboardingScreenData.length - 1 ? <Button major={false} bgcolor='red' marginHorizontal={true} txcolor='white' label={'Skip all'} func={scrollToLast} /> : <Text style={{ width: '20%' }}></Text>}
            <Paginator data={OnboardingScreenData} scrollX={scrollX} />
            {currentIndex >= OnboardingScreenData.length - 1 ? <Button bgcolor='' marginHorizontal={true} label={'Get Started '} major={false} func={viewedOnboarding} /> :
              <Button bgcolor='' marginHorizontal={true} label={'Next '} txcolor='white' major={false} func={scrollTo} />}
          </>
        }
      </View>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  staticItems: {
    position: "absolute",
    bottom: '0%',
    // backgroundColor:'red',
    left: 0,
    right: 0,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default Onboarding