/**-------------------------푸시 설정-------------------------**/
import {Alert} from "react-native";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import {setItemAsync} from "expo-secure-store";

// 디바이스 id 만드는 변수
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

/**----------------------푸시알림 테스트---------------------**/
