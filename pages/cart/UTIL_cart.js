import axios from "axios";


/**-------------------------------장바구니 목록 출력------------------------------**/

export const getCartList = async (Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
        act_type        : "get_cart_list_new",
        login_status    : "Y",
        mem_uid         : Member,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}

/**---------------------------------장바구니 해당상품 삭제----------------------------------------**/
export const goDelCart = async (Member, order_uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
        act_type        : "del_cart",
        login_status    : "Y",
        mem_uid         : Member,
        A_order_uid     : order_uid,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

export const goodsUpdate = async (Member, goods_cnt, goods_price, order_uid, goods_uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
        act_type        : "mod_cart",
        mem_uid         : Member,
        login_status    : "Y",
        cnt             : goods_cnt,
        goods_price     : Number(goods_price),
        order_uid       : order_uid,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}

export const save_req_memo = async (Member, AT_order_item_uid, req_memo) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
        act_type         :'save_req_memo',
        login_status     :'Y',
        mem_uid          :Member,
        order_item_uid   :AT_order_item_uid,
        req_memo         :req_memo,

    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}

/**--즐겨찾기 이벤트 정리--**/
export const get_my_zzim_list_new = async (Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php',{
        act_type        :"get_my_zzim_list_new",
        login_status    :"Y",
        mem_uid         :Member,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

export const set_my_zzim = async (uid, Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php',{
        act_type        : "set_my_zzim",
        login_status    : "Y",
        mem_uid         : Member,
        link_uid        : uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}