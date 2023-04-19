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
/**-------------------------1. 앱에서 푸시 전송------------------------------**/
export const send_push = async (Member) => {
    let App_PushToken         = await buildApp();
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_send_push.php',{
        act_type        :"send_push",
        mem_uid         :Member,
        search_type     :'test',
        title           :'발주신청',
        msg             :'발주신청 테스트',
        push_id         :App_PushToken,
    },{
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
    let App_PushToken = await buildApp();
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


// (발주신청시)
export const settlekind_push = async (mem_uid, order_no, get_gd_order) => {
    /**----------------------로컬 푸시----------------**/
    let App_PushToken         = await buildApp();                       // 푸시알림 토큰
    let push_title            = '결제가 완료되었습니다.';                   // 푸시 알림 제목
    let message               = '결제가 완료되었습니다. 배송을 준비합니다.';   // 푸시 메세지 내용 
    let link                  = ``;                                     // 페이지 링크 타입
    let page_type             = `orderDetail`;                           // 발주상세
    await Notifications.scheduleNotificationAsync({
        content: {
            title   : push_title,
            body    : message,
            data    :{
                link:link,
            }
        },
        trigger:null,
    });
    /**----------------------서버 푸시----------------**/
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_send_push.php',{
        act_type        :"save_settlekind_push",
        mem_uid         :mem_uid,
        push_id         :App_PushToken,
        gd_order_uid    :get_gd_order.gd_order_uid,
        push_title      :push_title,
        message         :message,
        page_type       :page_type
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}
// (카드결제시)
export const order_push = async (mem_uid, OrderDate, get_gd_order) => {
    /**----------------------로컬 푸시----------------**/
    let App_PushToken         = await buildApp();                       // 푸시알림 토큰
    let push_title            = '발주신청이 완료되었습니다.';                   // 푸시 알림 제목
    let message               = '요청하신 발주를 관리자가 확인하고있습니다.';   // 푸시 메세지 내용
    let link                  = ``;                                     // 페이지 링크 타입
    let page_type             = `ord_status`;                           // 발주상세
    /**----------------------서버 푸시----------------**/
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_send_push.php',{
        act_type        :"order_push",
        mem_uid         :mem_uid,
        push_id         :App_PushToken,
        push_title      :push_title,
        message         :message,
        page_type       :page_type
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}
// (결제후 발주 부분취소시)
export const part_cancel_push = async (mem_uid, get_gd_order) => {
    /**----------------------로컬 푸시----------------**/
    let App_PushToken         = await buildApp();                       // 푸시알림 토큰
    let push_title            = '발주신청이 완료되었습니다.';                   // 푸시 알림 제목
    let message               = '요청하신 발주를 관리자가 확인하고있습니다.';   // 푸시 메세지 내용
    let link                  = ``;                                     // 페이지 링크 타입
    let page_type             = `ord_status`;                           // 발주상세
    await Notifications.scheduleNotificationAsync({
        content: {
            title   : push_title,
            body    : message,
            data    :{
                link:link,
            }
        },
        trigger:null,
    });
    /**----------------------서버 푸시----------------**/
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_send_push.php',{
        act_type        :"part_cancel_push",
        mem_uid         :mem_uid,
        push_id         :App_PushToken,
        push_title      :push_title,
        message         :message,
        page_type       :page_type
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}
// (결제후 발주 전체취소시)
export const all_cancel_push = async (mem_uid, OrderDate) => {
    /**----------------------로컬 푸시----------------**/
    await Notifications.scheduleNotificationAsync({
        content: {
            title   : `발주 변경이 접수되었습니다.`,
            body    : ``,
            data    :{
                link:'',
            }
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

/**---------------------------------------------파이어베이스 토큰 가져오기-------------------------------------------**/
export const FCM_Token = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    //android의 경우 기본값이 authorizaed

    if (enabled) {
        let res = await messaging().getToken();
        return res;
    }
}

/** -------------------------------------------ios 푸시접근 허용-----------------------------------------**/

