import axios from "axios";


export const getOrderInfo = async (gd_order_uid, Member) =>{
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type        :"get_order_detail",
        gd_order_uid    :gd_order_uid,
        mem_uid         :Member,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

export const getAppInfo = async () =>{
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
        act_type        :"get_app_info",
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

export const InsOrder = async (order_data,Member,work_uid,goods_cate1_uid) => {
    let ostype = Platform.OS;
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
        act_type            :'ins_order',
        mem_uid             :Member,                                        // 회원 uid
        mgr_mem_uid         :Member,                                        // 회원 uid
        A_order_uid         :order_data.A_order_uid,                        // 주문 uid
        os_type             :ostype,                                        // 기기 os
        order_title         :order_data.order_title,                                        // 기기 os
        recv_name           :order_data.recv_name,                          // 현장인도자 성명
        recv_phone          :order_data.recv_phone,                         // 현자인도자 전화번호
        zonecode            :order_data.zonecode,                           // 우편번호
        addr1               :order_data.addr1,                              // 주소
        addr2               :order_data.addr2,                              // 상세주소
        hope_deli_date      :order_data.hope_deli_date,                     // 희망배송일
        hope_deli_time      :order_data.hope_deli_time,                     // 희망배송시간
        order_memo          :order_data.order_memo,                         // 배송요청사항
        settleprice         :order_data.settleprice,                        // 결제 금액
        tot_order_price     :order_data.tot_order_price,                    // 자재 총 가격
        work_uid            :(work_uid) ? (work_uid):(order_data.work_uid),                                      // 공사명 uid
        goods_cate1_uid     :goods_cate1_uid,                                            // 사용 포인트
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

export const SaveDeliAddr = async (Member, order_data) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
        act_type        :"save_deli_addr",
        mem_uid         :Member,
        recv_phone      :order_data.recv_phone,
        order_title     :order_data.order_title,
        zonecode        :order_data.zonecode,
        addr1           :order_data.addr1,
        addr2           :order_data.addr2,

    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

export const AllgdOrderDel = async (OrderData, Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type        :"del_gd_order",
        gd_order_uid    :OrderData.gd_order_uid,
        mem_uid         :Member,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}

export const ATorderDel = async (OrderData, Member, order_uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type          :"del_AT_order",
        gd_order_uid      :OrderData.gd_order_uid,
        mem_uid           :Member,
        A_order_uid       :order_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}
export const OrderMod = async (OrderData, Member, addr1, zonecode, gd_order_uid) => {

    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type             :"mod_recv_info",
        gd_order_uid         :gd_order_uid,
        mem_uid              :Member,
        addr1                :(addr1) ? (addr1):OrderData.addr1,
        addr2                :OrderData.addr2,
        hope_deli_date       :OrderData.hope_deli_date,
        hope_deli_time       :OrderData.hope_deli_time,
        zonecode             :(zonecode) ? (zonecode):OrderData.zonecode,
        recv_name            :OrderData.recv_name,
        recv_mobile          :OrderData.recv_mobile,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}


export const payDoneCancel = async (Member, type, OrderData, chk_cancel_goods) => {

    console.log(chk_cancel_goods);
    let tot_price = Number(OrderData.settleprice) + Number(OrderData.tot_opt_price) + Number(OrderData.deli_price);

    let pay_cancel_goods = chk_cancel_goods.map(val=>{
        let src_cnt             = Number(val.A_sel_option.map(item=>item.option_cnt));
        let cancel_cnt          = Number(val.cancel_cnt);
        let option_price        = Number(val.A_sel_option.map(item=>item.option_price));
        let order_item_uid      = Number(val.A_sel_option.map(item=>item.order_item_uid));
        return {
            order_uid           :Number(val.order_uid),
            src_cnt             :src_cnt,
            cancel_cnt          :cancel_cnt,
            option_price        :option_price,
            order_item_uid      :order_item_uid,
            sum_goods_price     :Number(option_price * cancel_cnt),
        }
    });

    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type             :"pay_done_gd_cancel",
        gd_order_uid         :OrderData.gd_order_uid,
        cancel_money         :tot_price,
        cancel_type          :type,
        mem_uid              :Member,
        order_uid            :pay_cancel_goods.map(val=>val.order_uid),
        order_item_uid       :pay_cancel_goods.map(val=>val.order_item_uid),
        src_cnt              :pay_cancel_goods.map(val=>val.src_cnt),
        cancel_cnt           :pay_cancel_goods.map(val=>val.cancel_cnt),
        merchant_uid         :OrderData.order_no,
        imp_uid              :OrderData.imp_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}

export const PayTry = async (OrderData, type) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type             :"pay_try",
        gd_order_uid         :OrderData.gd_order_uid,
        settlekind           :type,
        bankAccount          :OrderData.bankAccount,
        bankSender           :OrderData.bankSender,
        order_no             :OrderData.order_no,
        mem_uid              :OrderData.mem_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}


export const get_order_cancel_list = async (Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type             :"get_order_cancel_list",
        mem_uid              :Member,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}

export const gd_cancel_info = async (Member, gd_cancel_uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type             :"gd_cancel_info",
        gd_cancel_uid        :gd_cancel_uid,
        mem_uid              :Member,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}

export const get_deli_addr_list = async (Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type        :"get_deli_addr_list",
        mem_uid         :Member,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
}

export const get_order_ready = async (Member, order_result_uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
        act_type        : "get_order_ready",
        mem_uid         : Member,
        order_uid       : order_result_uid,         // 배열로감
    }, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return res;
}

export const del_deli_addr = async (Member, uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type        : "del_deli_addr",
        mem_uid         :Member,
        gmd_sno         :uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res;
}

export const get_order_list = async (Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type        :"get_order_list",
        login_status    :"Y",
        mem_uid         :Member,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}

export const chg_order_item_cnt = async (order_item_uid, cnt) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type        :"chg_order_item_cnt",
        order_item_uid  :order_item_uid,
        cnt             :cnt,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}

export const add_order_goods = async (gd_order_uid, goods_uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type        :"add_order_goods",
        gd_order_uid    :gd_order_uid,
        goods_uid       :goods_uid,
        cnt             :1,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}








