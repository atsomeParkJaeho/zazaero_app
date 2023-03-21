import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {

    console.log('메세지 전송 이벤트');

    // 메세지
    const message = {
        to: expoPushToken,
        sound: '기본',
        title: '푸시알림 테스트',
        body: '푸시알림 테스트 입니다. 여기 넣으세요',
        data: { someData: '여기에 넣으시오' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
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
        token = (await Notifications.getExpoPushTokenAsync()).data;
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

export default function Push() {
    const [PushToken, setPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {

        
        // 기기 푸시알림 토큰 저장
        Notifications.getDevicePushTokenAsync().then((res)=>{
            if(res) {
                setPushToken(res.data);
            }
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    let msg = '';
    msg += `${PushToken} / 푸시알림 토큰\n`;
    msg += `${notification} / 허용\n`;

    console.log(msg);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Text>사용자 푸시알림 토큰: {PushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>제목: {notification && notification.request.content.title} </Text>
                <Text>본문: {notification && notification.request.content.body}</Text>
                <Text>데이터: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title="데이터를 넣으시오"
                onPress={async () => {await sendPushNotification(PushToken);}}
            />
        </View>
    );
}
