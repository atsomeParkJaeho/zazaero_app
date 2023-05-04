import axios from "axios";

/** 자재목록 불러오기 **/
export const get_goods_list = async (Member, Cate1stUid, Cate2ndUid, Cate3rdUid, page) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type    :"get_goods_list",
        mem_uid     :Member,
        cate_1st    :(Cate1stUid) ? Cate1stUid:'',
        cate_2nd    :(Cate2ndUid) ? Cate2ndUid:'',
        cate_3rd    :(Cate3rdUid) ? Cate3rdUid:'',
        page        :(page) ? page:'',
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
};

export const get_goods_search = async (search,page) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type        : "get_goods_list",
        f_goods_name    :search,
        page            :(page) ? page:'',
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}

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

export const get_goods_cate2nd_list = async (Cate1stUid, Cate2ndUid, Member, page) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type    : "get_goods_list",
        cate_1st    : Cate1stUid,
        cate_2nd    : Cate2ndUid,
        mem_uid     :Member,
        page        :(page) ? page:''
    }, {
        headers: {
            'Content-type': 'multipart/form-data',
        },
    })

    return res;
}

export const get_goods_cate3rd_list = async (Cate1stUid, Cate2ndUid, Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type        :"get_cate_list",
        depth           :"3",
        cate_1st_uid    :Cate1stUid,
        cate_2nd_uid    :Cate2ndUid,
        mem_uid         :Member,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
}

export const go_goods_cate3rd_list = async (Cate1stUid, Cate2ndUid, Cate3rdUid,Member, page) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type: "get_goods_list",
        cate_1st: Cate1stUid,
        cate_2nd: Cate2ndUid,
        cate_3rd: Cate3rdUid,
        mem_uid :Member,
        page    : (page) ? page: '',
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



export const save_cart = async (Member, goods_uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_cart.php',{
        act_type            : 'save_cart',
        goods_uid           : goods_uid,           // 상품 uid
        mem_uid             : Member,                    // 회원 uid
        ord_cnt             :  '1'
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}
/**--------------------------------자재검색-------------------------------**/
export const goods_search = async (search) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type        :"get_goods_list",
        f_goods_name    :search,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}
/**--------------------------------검색어 저장-------------------------------**/
export const ins_mem_search_log = async (search,Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type        :"ins_mem_search_log",
        login_status    :"Y",
        find_txt        :search,
        mem_uid         :Member,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
}
/**--------------------------------최근 검색어 삭제-------------------------------**/
export const del_mem_search_log = async (Member,uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type                :"del_mem_search_log",
        login_status            :"Y",
        mem_uid                 :Member,
        mem_find_txt_log_uid    :uid
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}
/**----------------------------------최근 검색어 출력--------------------------------------------**/
export const get_mem_search_log_list = async (Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
        act_type        : "get_mem_search_log_list",
        login_status    : 'Y',
        mem_uid         :Member,
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}