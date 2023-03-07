import axios from "axios";

export const get_cate_list = async (depth, uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php',{
        act_type        :"get_cate_list",
        depth           :depth,           // 2차 카테고리 추출
        cate_1st_uid    :uid,
        cate_2nd_img    :"Y",
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}
