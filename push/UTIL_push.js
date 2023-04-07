/**-------------------------푸시 설정-------------------------**/
import {Alert, Platform} from "react-native";
import { v4 as uuidv4 } from 'uuid';
import * as Device from 'expo-device';
import axios from "axios";
import {useEffect} from "react";
import * as Notifications from "expo-notifications";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {app_build, app_version, FCM} from "../util/util";
import {getExpoPushTokenAsync} from "expo-notifications";
// 디바이스 id 만드는 변수



export const reg_app_info = async (uuid) => {
    let barnd           = Device.brand;         // 브랜드
    let modelName       = Device.modelName;     // 기기 이름
    let osName          = Device.osName;        // os
    let osVersion       = Device.osVersion;     // os version
    let appVersion      = app_version;
    let appBuild        = app_build;
    let Push_id         = await buildApp();
    console.log(Push_id,'/푸시_id');
    let data = {
        act_type        :"reg_app_info",
        app_version     :appVersion,
        app_build       :appBuild,
        os_version      :osVersion,
        push_id         :Push_id,
        device_id       :uuid,
        os_type         :osName,
    }
    console.log(data,'/[디바이스 정보 저장]');
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',data,{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
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
export async function sendPushNotification(expoPushToken) {
    console.log(expoPushToken,'\n[엑스포 푸시알림]');
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: '제목',
        body: '내용',
        data: { someData: 'goes here' },
    };

    Alert.alert(`엑스포 토큰`,`${expoPushToken}`);
    
    await axios.post('https://exp.host/--/api/v2/push/send', message,{
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
        }
    );
}


export async function sendPushApp(App_PushToken, Member) {
    // Alert.alert(`apk 푸시토큰`,`${App_PushToken}`);
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_send_push_20230322.php',{
        act_type        :"save_push_id",
        mem_uid         :Member,
        push_id         :App_PushToken,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

export const save_push_id = async (mem_uid) => {

    let App_PushToken = await buildApp();

    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_send_push_20230322.php',{
        act_type        :"save_push_id",
        mem_uid         :mem_uid,
        push_id         :App_PushToken,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}


// (발주신청시)
export const settlekind_push = async (mem_uid, order_no) => {
    /**----------------------로컬 푸시----------------**/
    await Notifications.scheduleNotificationAsync({
        content: {
            title   : `결제가 완료되었습니다.`,
            body    : `결제가 완료되었습니다. 배송을 준비합니다.`,
        },
        trigger:null,
    });
    /**----------------------서버 푸시----------------**/
}
// (카드결제시)
export const order_push = async (mem_uid, OrderDate) => {
    /**----------------------로컬 푸시----------------**/
    await Notifications.scheduleNotificationAsync({
        content: {
            title   : `발주신청이 완료되었습니다.`,
            body    : `요청하신 발주를 관리자가 확인하고 있습니다.`,
        },
        trigger:null,
    });
    /**----------------------서버 푸시----------------**/
}
// (결제후 발주 부분취소시)
export const part_cancel_push = async (mem_uid, OrderDate) => {
    /**----------------------로컬 푸시----------------**/
    await Notifications.scheduleNotificationAsync({
        content: {
            title   : `발주 변경이 접수되었습니다.`,
            body    : ``,
        },
        trigger:null,
    });
    /**----------------------서버 푸시----------------**/
}
// (결제후 발주 전체취소시)
export const all_cancel_push = async (mem_uid, OrderDate) => {
    /**----------------------로컬 푸시----------------**/
    await Notifications.scheduleNotificationAsync({
        content: {
            title   : `발주 변경이 접수되었습니다.`,
            body    : ``,
        },
        trigger:null,
    });
    /**----------------------서버 푸시----------------**/
}

// 엑스포 전용 토큰 가져오기
export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {

    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
// 배포용 토큰 가져오기
export async function buildApp() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {

            return;
        }
        token = (await Notifications.getDevicePushTokenAsync()).data;
        console.log(token);
    } else {

    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
