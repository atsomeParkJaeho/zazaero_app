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