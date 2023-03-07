import axios from "axios";
import {Platform} from "react-native";

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

export const Sign_up = async (SignUp) => {
    let reg_mem_os = Platform.OS;

    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php', {
        act_type         : 'mem_reg',
        mem_id           :SignUp.mem_id,        // 아이디
        mem_pw           :SignUp.mem_pw,        // 비밀번호
        mem_name         :SignUp.mem_name,      // 담당자 명
        com_name         :SignUp.com_name,      // 회사명
        mem_mobile       :SignUp.mem_mobile,    // 담당자 연락처
        com_biz_no       :SignUp.com_biz_no,    // 사업자번호
        zonecode         :SignUp.zonecode,      // 우편번호
        road_address     :SignUp.road_address,   // 지역코드
        addr1            :SignUp.addr1,         // 주소
        addr2            :SignUp.addr2,         // 상세주소
        reg_mem_os       :reg_mem_os,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}

export const search_id = async (FindId) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{

    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}

