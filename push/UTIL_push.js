/**-------------------------푸시 설정-------------------------**/
import {Alert, Platform} from "react-native";
import { v4 as uuidv4 } from 'uuid';
import * as Device from 'expo-device';
import axios from "axios";
import {useEffect} from "react";
import * as Notifications from "expo-notifications";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {app_build, app_version, FCM} from "../util/util";
import messaging from "@react-native-firebase/messaging";
import notifee,{AndroidImportance} from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 디바이스 id 만드는 변수


/**---------------------------------------------파이어베이스 토큰 가져오기-------------------------------------------**/
export const FCM_Token = async () => {

    const authStatus = await messaging().requestPermission({
        sound                               :true,
        announcement                        :true,
        providesAppNotificationSettings     :true,
        criticalAlert                       :true,
    });

    const notifeeEnabled = await AsyncStorage.getItem(`notifee`);
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled && JSON.parse(notifeeEnabled ?? 'true')) {
        if(Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
        }
        let res = await messaging().getToken();
        return res;
    }
}


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


/*푸시허용 여부*/
export const PushSetting = async () => {

}
/** -------------------------------------------푸시알림창-----------------------------------------**/

export const LocalPush = async (res) => {

    const channelAnoucement = await notifee.createChannel({
        id: 'zazaero',
        name: 'zazaero',
        sound: 'hollow',
        importance: AndroidImportance.HIGH,
    });

    return await notifee.displayNotification({
        title: res.data.title,
        body: res.data.body,
        data:{
            ...res.data
        },
        android:{
            channelId:channelAnoucement,
            pressAction:{
                id:'zazaero_app',
            },
        },
        ios:{
            critical:true,
            sound:"notification.caf",
        }
    });
}

export const OpenGetPush = async () => {
    let res = await notifee.getInitialNotification();
    return res;
}


export const push_list = async (Member,page) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type        :"get_recv_push_list",
        mem_uid         :Member,
        page            :(page) ? page : '',
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

export const push_read = async (Member, push_msg_uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type        :"read_push_msg",
        push_msg_uid    :push_msg_uid,
        mem_uid         :Member,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

export const push_badge = async (Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type        :"get_new_push_cnt",
        mem_uid         :Member,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}
