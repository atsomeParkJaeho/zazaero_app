import React, {useEffect, useRef, useState} from 'react';
//이제 모든 페이지 컴포넌트들이 끼워져있는 책갈피를 메인에 둘예정이므로
//컴포넌트를 더이상 불러오지 않아도 됩니다.
// import MainPage from './pages/MainPage';
// import DetailPage from './pages/DetailPage';
import { StatusBar } from 'expo-status-bar';

//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'
import 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import {Alert, Linking} from "react-native";
import {get_Member} from "./pages/UTIL_mem";
import {reg_app_info, registerForPushNotificationsAsync} from "./push/UTIL_push";
// import registerNNPushToken from "native-notify";
import { v4 as uuidv4 } from 'uuid';




// 1. 푸시알림 설정
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


export default function App() {

    const [Member, setMember] = useState();
    const [expoPushToken, setExpoPushToken]     = useState('');
    const [notification, setNotification]       = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    // registerNNPushToken(7223, 'aUld0OehxNKDL8e7yQPtbk');
    useEffect(()=>{
        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                // Alert.alert(``,`실패`);
            }
        });
        app_info();
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response,'/[클릭 이벤트]');
        });



        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };

    },[Member]);

    /**------------------------------------------앱정보 저장---------------------------------------------**/
    const app_info = async () => {
        let app_device_id = await AsyncStorage.getItem(`app_device_id`);
        if(app_device_id) {
            console.log(app_device_id,'/디바이스 app id2');
            reg_app_info(app_device_id).then((res)=>{
                if(res) {
                    console.log(res.data,'/[실패]');
                    const {result} = res.data;
                    if(result === 'OK') {
                        console.log(res.data,'/[성공]');
                    }
                }
            });
        } else {
            console.log('디바이스 아이디 없음');
            let uuid = uuidv4();
            await AsyncStorage.setItem(`app_device_id`,uuid);
            /**---------------------------2. db에 정보를 저장한다.------------------------------------**/
            reg_app_info(uuid).then((res)=>{
                if(res) {
                    console.log(res.data,'/[실패]');
                    const {result} = res.data;
                    if(result === 'OK') {
                        console.log(res.data,'/[성공]');
                    }
                }
            });
        }
    }



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