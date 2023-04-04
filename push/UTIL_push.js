/**-------------------------푸시 설정-------------------------**/
import {Alert} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';


// 1. 발주신청시 보내는 푸시
export const order_form_push = async (Member, app_id) => {
    try {
        // 1. 디바이스 id를 가져온다.
        let uuid = uuidv4();
        await SecureStore.setItemAsync('secure_deviceid', JSON.stringify(uuid));
        let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
        console.log(fetchUUID,'/[디바이스 토큰 생성]');
        // 2. 디바이스 토큰 id를 가져온다




        // 3. 디바이스 id가 없을경우 db에 저장한다




    } catch (err) {
        Alert.alert(``,`푸시 연결 에러 ${err}`);
    }
}