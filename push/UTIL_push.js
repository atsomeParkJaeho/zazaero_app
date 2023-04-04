/**-------------------------푸시 설정-------------------------**/
import {Alert, Platform} from "react-native";
import { v4 as uuidv4 } from 'uuid';
import * as Device from 'expo-device';
import axios from "axios";
import {useEffect} from "react";
import * as Notifications from "expo-notifications";
import messaging from '@react-native-firebase/messaging';
import {getDevicePushTokenAsync, getExpoPushTokenAsync} from "expo-notifications";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";


// 디바이스 id 만드는 변수

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    //android의 경우 기본값이 authorizaed

    if (enabled) {
        await messaging()
            .getToken()
            .then(fcmToken => {
                console.log(fcmToken); //fcm token을 활용해 특정 device에 push를 보낼 수 있다.
                return Alert.alert(``,`${fcmToken} fcm 토큰`);
            })
            .catch(e => Alert.alert(``,`에러코드 ${e}`));
    }
    return Alert.alert(``,`${enabled, authStatus} 메세지창 확인`);
}


export const creact_push_id = async (Member) => {
    // 1. 디바이스 id를 가져온다.
    let uuid = uuidv4();    // 사용기기 디바이스 id 생성
    // 2. 앱에 디바이스 id를 저장한다
    await asyncStorage.setItem('app_device_id',uuid);
    // 2. 디바이스 토큰 id를 가져온다

    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type        :"save_app_device_id",
        mem_uid         :Member,
        push_id         :uuid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    console.log(uuid,'/[디바이스 토큰]');
    return res;
    // 3. 디바이스 id가 없을경우 db에 저장한다
}
// 푸시토큰 설정

