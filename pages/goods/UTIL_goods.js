import axios from "axios";

/** 자재목록 불러오기 **/
export const get_goods_list = async (Member, Cate1stUid, Cate2ndUid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type: "get_goods_list",
        mem_uid: Member,
        cate_1st: Cate1stUid,
        cate_2nd: Cate2ndUid,
    }, {
        headers: {
            'Content-type': 'multipart/form-data',
        },
    });

    return res;
};

export const goods_cate = async (Cate1stUid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php', {
        act_type: "goods_cate",
        ind_cfg_uid: Cate1stUid,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
};

export const get_cate_list = async (Cate1stUid, Cate2ndUid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type        : "get_cate_list",
        depth           : "3",
        cate_1st_uid    : Cate1stUid,
        cate_2nd_uid    : Cate2ndUid,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
};

export const get_goods_cate2nd_list = async (Cate1stUid, Cate2ndUid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type    : "get_goods_list",
        cate_1st    : Cate1stUid,
        cate_2nd    : Cate2ndUid,
    }, {
        headers: {
            'Content-type': 'multipart/form-data',
        },
    })

    return res;
}

export const get_goods_cate3rd_list = async (Cate1stUid, Cate2ndUid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type        : "get_cate_list",
        depth           : "3",
        cate_1st_uid    : Cate1stUid,
        cate_2nd_uid    : Cate2ndUid,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
}

export const go_goods_cate3rd_list = async (Cate1stUid, Cate2ndUid, Cate3rdUid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type: "get_goods_list",
        cate_1st: Cate1stUid,
        cate_2nd: Cate2ndUid,
        cate_3rd: Cate3rdUid,
    }, {
        headers: {
            'Content-type': 'multipart/form-data',
        },
    })

    return res;
}

export const save_wish = async (Member, link_uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type        :"set_my_zzim",
        login_status    :"Y",
        mem_uid         :Member,
        link_uid        :link_uid,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}

export const ins_cart = async (Member, goods_uid_list,GoodsCnt) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
        act_type        : 'ins_cart',
        mem_uid         : Member,
        goods_uid_list  : goods_uid_list,
        ord_cnt         : (GoodsCnt) ? GoodsCnt : 1,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}

export const get_goods_info = async (Member, uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type    :   "get_goods_info",
        goods_uid   :   uid,
        mem_uid     :   Member,
    },{
        headers: {
            'Content-type': 'multipart/form-data',
        }
    })

    return res;
}
