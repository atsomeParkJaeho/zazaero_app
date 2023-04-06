import axios from "axios";

export const pay_result = async (imp_uid, OrderData) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type        :"pay_result",
        gd_order_uid    :OrderData.gd_order_uid,
        order_no        :OrderData.order_no,
        imp_uid         :(imp_uid) ? imp_uid:'',
        mem_uid         :OrderData.mem_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        },
    })
    return res;
}

export const pay_done_log = async (imp_uid, merchant_uid, OrderData) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type        :"pay_done_log",
        gd_order_uid    :OrderData.gd_order_uid,
        imp_uid         :imp_uid,
        merchant_uid    :merchant_uid,
        mem_uid         :OrderData.mem_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        },
    })
    return res;
}

export const pay_try_cancel = async (imp_uid, merchant_uid, OrderData) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_order.php',{
        act_type        :"pay_try_cancel",
        gd_order_uid    :OrderData.gd_order_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        },
    })
    return res;
}