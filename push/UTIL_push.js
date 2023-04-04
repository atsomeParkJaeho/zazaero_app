/**-------------------------푸시 설정-------------------------**/
import {Alert} from "react-native";
import { v4 as uuidv4 } from 'uuid';
import * as Device from 'expo-device';
import axios from "axios";
import {useEffect} from "react";
import * as Notifications from "expo-notifications";
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
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
            })
            .catch(e => console.log('error: ', e));
    }
}

export const onDisplayNotification = async ({title = '', body = '',}) => {
    const channelId = await notifee.createChannel({
        id: 'channelId',
        name: 'channelName',
    });

    await notifee.displayNotification({
        title,
        body,
        android: {
            channelId,
        },
    });
};

export const creact_push_id = async (Member) => {
    // 1. 디바이스 id를 가져온다.
    let uuid = uuidv4();    // 사용기기 디바이스 id 생성
    // 2. 앱에 디바이스 id를 저장한다
    await setItemAsync('push_id',uuid);
    // 2. 디바이스 토큰 id를 가져온다

    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type        :"save_push_id",
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

/**----------------------엑스포 푸시알림 테스트---------------------**/
export async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await axios.post('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}
async function onMessageReceived(message) {
    // Do something
}


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
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getDevicePushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}