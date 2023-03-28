import axios from "axios";
import {Platform} from "react-native";
import * as Device from "expo-device";
// import {getDeviceId} from "react-native-device-info";
import {getDevicePushTokenAsync} from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";




/**---------------------------------회원정보 추출------------------------------------------------**/

export const get_Member = async () => {
    const Member = await AsyncStorage.getItem('member');
    console.log(Member,'/[추출]]');
    return Member;
}

export const my_page = async (Member) => {
    let res = await axios.get('http://49.50.162.86:80/ajax/UTIL_mem_info.php', {
        params: {
            act_type:"my_page",
            mem_uid: Member,
        }
    });
    return res;
}

/**---------------------------------회원가입-------------------------------------------**/
export const mem_reg = async (SignUp) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php', {
        act_type        : "mem_reg",
        mem_id          :SignUp.mem_id,        // 아이디
        mem_pw          :SignUp.mem_pw,        // 비밀번호
        mem_name        :SignUp.mem_name,      // 담당자 명
        ceo_name        :SignUp.ceo_name,      // 대표자 명
        com_name        :SignUp.com_name,      // 회사명
        mem_mobile      :SignUp.mem_mobile,    // 담당자 연락처
        com_biz_no      :SignUp.com_biz_no,    // 사업자번호
        zonecode        :SignUp.zonecode,      // 우편번호
        addr1           :SignUp.addr1,         // 주소
        addr2           :SignUp.addr2,         // 상세주소

        /**------첨부파일------**/
        biz_no_img      :SignUp.biz_no_img,
        biz_no_uri      :SignUp.biz_no_uri,
        biz_no_type     :SignUp.biz_no_type,

        /**------첨부파일------**/
        bank_no_img     :SignUp.bank_no_img,
        bank_no_uri     :SignUp.bank_no_uri,
        bank_no_type    :SignUp.bank_no_type,


    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
}

/**-------------------------------------아이디 찾기---------------------------------------------------**/


/**---------------------------------아이디 중복체크-------------------------------------------**/
export const chk_dup_id = async (SignUp) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type            :'chk_dup_id',
        mem_id              : SignUp.mem_id,
        mem_info_act_type   :"INS",
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}
/**---------------------------------로그인-------------------------------------------**/
export const login = async (Login)=>{
    let os_type = Platform.OS;
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php', {
        act_type    :'login',
        mem_id      :Login.mem_id,
        mem_pw      :Login.mem_pw,
        os_type     :os_type,
        login       :'Y'
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}

export const chk_test = async () => {
    let os_type = Platform.OS;
    if(os_type === 'ios') {
        console.log('/타입체크 [아이폰]');
    } else {
        console.log('/타입체크 [안드로이드]');
    }
    return os_type;
}

/**---------------------------------설치정보 db 저장----------------------------------------------**/
export const app_download_info = async (Member)=>{

    let os_type = Platform.OS;
    let device_id = (await getDevicePushTokenAsync()).data;
    console.log(device_id,'/ed');
    console.log(test,'/sa');
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php', {
        act_type         :'app_device_info',
        device_id        :device_id,
        os_type          :os_type,
        mem_uid          :Member,
        app_version      :'',
        app_build        :'',
        os_version       :'',
        push_id          :'',
        expo_push_id     :'',
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}

/**---------------------------------로그인-------------------------------------------**/
export const Sign_up = async (SignUp) => {
    let app_device_id = (await getDevicePushTokenAsync()).data;
    let test = (await Device.getDeviceTypeAsync());
    let reg_mem_os = Platform.OS;
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php', {
        act_type         :'mem_reg',
        mem_id           :SignUp.mem_id,        // 아이디
        mem_pw           :SignUp.mem_pw,        // 비밀번호
        mem_name         :SignUp.mem_name,      // 담당자 명
        com_name         :SignUp.com_name,      // 회사명
        com_biz_name     :SignUp.com_biz_name,      // 회사명
        mem_mobile       :SignUp.mem_mobile,    // 담당자 연락처
        com_biz_no       :SignUp.com_biz_no,    // 사업자번호
        zonecode         :SignUp.zonecode,      // 우편번호
        road_address     :SignUp.road_address,   // 지역코드
        addr1            :SignUp.addr1,         // 주소
        addr2            :SignUp.addr2,         // 상세주소
        reg_mem_os       :reg_mem_os,
        // 가입자 푸시토큰 저장
        app_device_id    :app_device_id,

    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
}

export const search_pw_mobile = async (FindId) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_search.php', {
        act_type        :'search_pw_mobile',
        mem_id          :FindId.mem_id,
        mem_name        :FindId.mem_name,
        mem_mobile      :FindId.mem_mobile,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}

export const search_id = async (FindId) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_search.php', {
        act_type        :'search_id',
        mem_name        :FindId.mem_name,
        mem_mobile      :FindId.mem_mobile,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
}

/**---------------------------------회원정보 수정-------------------------------------------**/
export const mod_mem_info = async (Member, MemInfo) => {
    console.log(MemInfo,'/확인 값');
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type                :'mod_mem_info',
        mem_pw                  :MemInfo.mem_pw,
        mem_pw_chk              :MemInfo.mem_pw_chk,
        addr1                   :MemInfo.addr1,
        addr2                   :MemInfo.addr2,
        zonecode                :MemInfo.zonecode,
        mem_email1              :MemInfo.mem_email1,
        mem_email2              :MemInfo.mem_email2,
        tax_calc_email1         :MemInfo.tax_calc_email1,
        tax_calc_email2         :MemInfo.tax_calc_email2,
        biz_cate                :MemInfo.biz_cate,
        biz_item                :MemInfo.biz_item,
        ceo_name                :MemInfo.ceo_name,
        com_name                :MemInfo.com_name,
        rank_name               :MemInfo.rank_name,
        com_biz_no              :MemInfo.com_biz_no,
        com_biz_name            :MemInfo.com_biz_name,
        com_fax                 :MemInfo.com_fax,
        mem_mobile              :MemInfo.mem_mobile,
        mem_name                :MemInfo.mem_name,
        pay_bank_code           :MemInfo.pay_bank_code,
        pay_bank_no             :MemInfo.pay_bank_no,
        pay_bank_owner          :MemInfo.pay_bank_owner,
        road_address            :MemInfo.road_address,
        mod_mem_uid             :Member,
        mem_uid                 :Member,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}
/**---------------------------------회원탈퇴-------------------------------------------**/
export const mem_out = async (Member, MemOut) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type            :'mem_out',
        mem_uid             :Member,
        mem_pw              :MemOut.mem_out_pw,
        mem_out_reason_uid  :MemOut.mem_out_reason_uid,
        mem_out_reason_memo :MemOut.mem_out_reason_memo,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
}
/**---------------------------------회원탈퇴사유 리스트-------------------------------------------**/
export const mem_out_reason_cfg = async (Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type         : 'mem_out_reason_cfg',
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
}

/**----------------------------------회원로그인시 푸시알림 설정------------------------------------------------------**/
export const mem_push_token = async (Member, token) =>{
    let os_type = Platform.OS;
    let data = {
        act_type         :'mem_push_token',
        mem_uid          :Member,
        token            :token,
        os_type          :os_type
    }
    console.log(data,'/ db 전송 데이터');
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type         :'mem_push_token',
        mem_uid          :Member,
        token            :token,
        os_type          :os_type
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
}

/**-------------------------------------인증번호 전송-------------------------------------------**/
export const find_chk_mem = async (FindId) => {
    let res = await  axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type            :'find_chk_mem',
        mem_id              :FindId.mem_id,
        mem_name            :FindId.mem_name,
        mem_mobile          :FindId.mem_mobile,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

