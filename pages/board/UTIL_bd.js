import axios from "axios";
import {Platform} from "react-native";

export const bd_list = async (page) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_bd.php', {
        act_type    :"get_bd_list",
        bd_type     :"notice",
        page        :(page) ? page : '',
    }, {
        headers: {
            'Content-type': 'multipart/form-data',
        }
    });
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
export const save_bd = async (Member,Write,selectedImages) => {
    let temp = selectedImages.map(val=>{
        return {
            filename    :(val.filename) ? val.filename:'',
            uri         :(Platform.OS === 'ios') ? val.uri.replace('file://','') : val.uri,
            base64      :val.base64,
            type        :'image',
        }
    });
    let bd_file1 = temp.filter((val,idx)=>idx===0);
    let bd_file2 = temp.filter((val,idx)=>idx===1);
    let data = {
        act_type            :'save_bd',
        mem_uid             :Member,
        bd_uid              :(Write.bd_uid) ? Write.bd_uid:'',
        bd_type             :Write.bd_type,
        bd_title            :Write.bd_title,
        bd_contents         :Write.bd_contents,
        bd_file1            :(bd_file1) ? bd_file1 : '',
        bd_file2            :(bd_file2) ? bd_file2 : ''
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
        bd_uid      :bd_data.bd_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}