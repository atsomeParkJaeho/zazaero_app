// import messaging from "@react-native-firebase/messaging";
// import {useEffect} from "react";
// import {Alert, Text} from "react-native";
//
// // 배포용 푸시알림 셋팅
// export default function PushSetting() {
//
//     // const FCM_token = async ()=>{
//     //     let token_id = await messaging.getToken();
//     // }
//     // 1. 사용자 fcm 토큰 가져오기
//     useEffect(() => {
//         const temp = messaging().onMessage(async res => {
//             Alert.alert('새로운 메세지 알림입니다.', JSON.stringify(res));
//         });
//         return temp;
//     }, []);
//
//     return(
//         <>
//             <Text></Text>
//         </>
//     );
// }