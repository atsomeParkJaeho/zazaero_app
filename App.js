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
import {onDisplayNotification, registerForPushNotificationsAsync, requestUserPermission} from "./push/UTIL_push";
import messaging from "@react-native-firebase/messaging";


// 1. 푸시알림 설정
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {

    // 회원정보 가져오기
    // const [expoPushToken, setExpoPushToken] = useState('');
    // const [notification, setNotification] = useState(false);
    // const notificationListener = useRef();
    // const responseListener = useRef();
    // useEffect(()=>{
    //     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    //
    //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //         setNotification(notification,'/연결확인1');
    //     });
    //
    //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //         console.log(response,'/연결확인2');
    //     });
    //
    //     return () => {
    //         Notifications.removeNotificationSubscription(notificationListener.current);
    //         Notifications.removeNotificationSubscription(responseListener.current);
    //     };
    // },[]);
    //
    // console.log(expoPushToken,' / [엑스포 토큰]')
    // console.log(notification,' / [푸시설정]')

    //push notification permission 요청
    useEffect(()=>{
        requestUserPermission();
        return messaging().onMessage(async remoteMessage => {
            const title = remoteMessage?.notification?.title;
            const body = remoteMessage?.notification?.body;
            await onDisplayNotification({title, body});
        });
    },[]);

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