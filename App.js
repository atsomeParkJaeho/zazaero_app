import React, {useEffect, useRef, useState} from 'react';
//이제 모든 페이지 컴포넌트들이 끼워져있는 책갈피를 메인에 둘예정이므로
//컴포넌트를 더이상 불러오지 않아도 됩니다.
// import MainPage from './pages/MainPage';
// import DetailPage from './pages/DetailPage';
import { StatusBar } from 'expo-status-bar';

//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'
import 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import {Alert} from "react-native";
import {get_Member} from "./pages/UTIL_mem";


// 1. 푸시알림 설정
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {

    const [Member, setMember] = useState();

    useEffect(()=>{
        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                Alert.alert(``,`실패`);
            }
        });


        console.log('[실행]');
    },[Member]);

    return (
        <>
            <NavigationContainer>
                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content"
                />
                <StackNavigator/>
            </NavigationContainer>
        </>
    );

}