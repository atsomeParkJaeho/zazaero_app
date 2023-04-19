import axios from "axios";
import {Platform} from "react-native";

export const bd_list = async (bd_type,Member,page) => {
    let data = {
        act_type    :"get_bd_list",
        mem_uid     :Member,
        bd_type     :bd_type,
        page        :(page) ? page : '',
    }
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_bd.php', data, {
        headers: {
            'Content-type': 'multipart/form-data',
        }
    });
    console.log(data,'/[게시판 리스트 파리미터]');

    return res;
}


/**-------------------------------------게시판 상세보기--------------------------------**/
export const get_bd_detail = async (bd_uid, bd_type) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_bd.php', {
        act_type    :"get_bd_detail",
        bd_type     :bd_type,
        bd_uid      :bd_uid,
    }, {
        headers: {
            'Content-type': 'multipart/form-data',
        }
    });
    return res;
}

/**---------------------------게시판 등록,수정------------------------------------------**/
export const save_bd = async (Member, bd_data, A_del_file, get_bd_file1, get_bd_file2) => {
    let mod_bd_file1 = [
        {
            filename    :(get_bd_file1.filename) ? get_bd_file1.filename:'',
            uri         :get_bd_file1.uri,
            base64      :get_bd_file1.base64,
            type        :'image',
        }
    ];

    let mod_bd_file2 = [
        {
            filename    :(get_bd_file2.filename) ? get_bd_file2.filename:'',
            uri         :get_bd_file2.uri,
            base64      :get_bd_file2.base64,
            type        :'image',
        }
    ];
    let data = {
        act_type            :'save_bd',
        reg_mem_uid         :Member,
        mem_uid             :Member,
        bd_uid              :(bd_data.bd_uid)  ? bd_data.bd_uid   :'',
        bd_type             :(bd_data.bd_type) ? bd_data.bd_type  :'',
        bd_title            :bd_data.bd_title,
        bd_contents         :bd_data.bd_contents,
        bd_file1            :(mod_bd_file1.length > 0) ? mod_bd_file1 : '',
        bd_file2            :(mod_bd_file2.length > 0) ? mod_bd_file2 : '',
        A_del_file_uid      :(A_del_file) ? A_del_file :'',
    }
    console.log(data,'/[파라미터 확인]');
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_bd.php',data,{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

/**-------------------------------------게시판 삭제---------------------------------------------------**/
export const bd_del = async (Member, bd_data) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_bd.php', {
        act_type    :'bd_del',
        mem_uid     :Member,
        bd_uid      :bd_data.bd_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

