import axios from "axios";

export const bd_list = async () => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_bd.php', {
        act_type    :"get_bd_list",
        bd_type     :"notice",
    }, {
        headers: {
            'Content-type': 'multipart/form-data',
        }
    });
    return res;
}

export const image_upload = async (setlect_image) => {
    let imageData = setlect_image.map(val=>{
        return {

        }
    });
    let formData = new FormData();
    formData.append('image',{

    });
    return res;
}

export const get_my_point_log = async (Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_my.php',{
        act_type :'get_my_refund_log',
        mem_uid  :Member
    });
    return res;
}