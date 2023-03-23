
import * as Notifications from "expo-notifications";

// 접속기기 디바이스 체크 파일
export const device_chk = async () => {
    let {data, type} = await Notifications.getExpoPushTokenAsync();
    // 1. 엑스포 기기인지 체크한다
    if(type === 'expo') {
        console.log(data,' / 엑스포 기기토큰');
        return type;
    } else {
        let {data, type} = await Notifications.getDevicePushTokenAsync();
        console.log(`기기 : ${type}\n토큰 : ${data}`);
        return type;
    }
}