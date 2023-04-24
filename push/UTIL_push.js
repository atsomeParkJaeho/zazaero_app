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
import messaging from "@react-native-firebase/messaging";

// 디바이스 id 만드는 변수



export async function sendPushApp(App_PushToken, Member) {
    // Alert.alert(`apk 푸시토큰`,`${App_PushToken}`);
    let os_type = Platform.OS;
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_send_push_20230322.php',{
        act_type        :"save_push_id",
        mem_uid         :Member,
        app_device_os   :(os_type === 'ios') ? os_type : 'aos',
        push_id         :App_PushToken,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

export const save_push_id = async (mem_uid) => {
    let App_PushToken = await FCM_Token();
    let os_type = Platform.OS;
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type        :"save_push_id",
        mem_uid         :mem_uid,
        app_device_os   :(os_type === 'ios') ? os_type : 'aos',
        push_id         :App_PushToken,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
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

/**---------------------------------------------파이어베이스 토큰 가져오기-------------------------------------------**/
export const FCM_Token = async () => {

    const authStatus = await messaging().requestPermission({
        sound                               :true,
        announcement                        :true,
        providesAppNotificationSettings     :true,
    });

    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        if(Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
        }
        let res = await messaging().getToken();
        return res;
    }
}

/** -------------------------------------------ios 푸시접근 허용-----------------------------------------**/

