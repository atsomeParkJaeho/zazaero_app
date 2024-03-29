import React, {useEffect, useRef, useState} from 'react';
//이제 모든 페이지 컴포넌트들이 끼워져있는 책갈피를 메인에 둘예정이므로
//컴포넌트를 더이상 불러오지 않아도 됩니다.
// import MainPage from './pages/MainPage';
// import DetailPage from './pages/DetailPage';
import { StatusBar } from 'expo-status-bar';

//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import {NavigationContainer, useNavigation, NavigationAction} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'
import 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import {Alert, Linking} from "react-native";
import {get_Member} from "./pages/UTIL_mem";
import {reg_app_info, registerForPushNotificationsAsync} from "./push/UTIL_push";
// import registerNNPushToken from "native-notify";
import { v4 as uuidv4 } from 'uuid';






export default function App() {
    const [Member, setMember]       = useState();


    useEffect(()=>{
        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                // Alert.alert(``,`로그인 후 확인 가능합니다.`);
            }
        });

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