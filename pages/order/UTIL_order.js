import axios from "axios";
import {Platform} from "react-native";


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
/**-------------------------------------앱정보 출력-----------------------------------------------------------------------**/
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
/**-------------------------------------발주신청 폼-----------------------------------------------------------------------**/
export const InsOrder = async (order_data,Member,work_uid,goods_cate1_uid) => {
    let ostype = Platform.OS;
    let data = {
        act_type            :'ins_order',
        mem_uid             :Member,                                        // 회원 uid
        mgr_mem_uid         :Member,                                        // 회원 uid
        A_order_uid         :order_data.A_order_uid,                        // 발주 uid
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
        goods_cate1_uid     :order_data.goods_cate1_uid,
    }

    console.log(data,'/[발주 데이터]');

    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
        act_type            :'ins_order',
        mem_uid             :Member,                                        // 회원 uid
        mgr_mem_uid         :Member,                                        // 회원 uid
        A_order_uid         :order_data.A_order_uid,                        // 발주 uid
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
/**-------------------------------------발주리스트 출력-----------------------------------------------------------------------**/
export const SaveDeliAddr = async (Member, order_data, modAddr) => {
    let new_work_flag   = (modAddr === 'add') ? 'Y':'N';
    let work_uid        = order_data.work_uid;
    let data = {
        act_type        :"save_deli_addr",
        mem_uid         :Member,
        work_uid        :(new_work_flag === 'N') ?  '':work_uid,
        new_work_flag   :new_work_flag, // 신규공사일시 Y, 기존공사일시 N
        recv_phone      :order_data.recv_phone,
        order_title     :order_data.order_title,
        zonecode        :order_data.zonecode,
        addr1           :order_data.addr1,
        addr2           :order_data.addr2,
    }
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', data,{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    console.log(data,'/ [공사명, 배송지 저장 파라미터]')

    return res;
}
/**-------------------------------------결제전 발주취소()-----------------------------------------------------------------------**/
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
/**-------------------------------------발주삭제-----------------------------------------------------------------------**/
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
/**-------------------------------------발주정보 수정-----------------------------------------------------------------------**/
/*
export const OrderMod = async (OrderData, OrderGoodsList, Member, A_goods, A_order_item_uid, A_order_item_cnt) => {

    let A_order_uid                 = OrderGoodsList.map((val)=>val.order_uid);
    let A_add_goods_uid             = A_goods.map(val=>String(val.goods_uid));
    let A_add_goods_cnt             = A_goods.map(val=>String(val.goods_cnt));
    let A_add_goods_req_memo        = A_goods.map(val=>String(val.req_memo));


    console.log(OrderData,'/ 발주정보');
    console.log(Member,'/ 회원정보');
    console.log(A_goods,'/ 자재추가한 자재');

    console.log(A_order_uid,'/ 발주상품 uid');
    console.log(A_order_item_uid,'/ 발주옵션 uid');
    console.log(A_order_item_cnt,'/ 상품 수량');

    console.log(A_add_goods_uid,'/ 자재추가 상품 uid');
    console.log(A_add_goods_cnt,'/ 자재추가 상품 수량');

    let data = {
        act_type             :"mod_recv_info",
        gd_order_uid         :OrderData.gd_order_uid,
        mem_uid              :Member,
        addr1                :OrderData.addr1,
        addr2                :OrderData.addr2,
        hope_deli_date       :OrderData.hope_deli_date,
        hope_deli_time       :OrderData.hope_deli_time,
        zonecode             :OrderData.zonecode,
        recv_name            :OrderData.recv_name,
        recv_mobile          :OrderData.recv_mobile,
        A_order_uid          :A_order_uid,
        A_order_item_uid     :A_order_item_uid,
        A_order_item_cnt     :A_order_item_cnt,
        A_add_goods_uid      :A_add_goods_uid,
        A_add_goods_cnt      :A_add_goods_cnt,
    }
    console.log(data,' / [전송 파라미터]');

    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type             :"mod_recv_info",
        gd_order_uid         :OrderData.gd_order_uid,
        mem_uid              :Member,
        addr1                :OrderData.addr1,
        addr2                :OrderData.addr2,
        order_memo           :OrderData.order_memo,
        hope_deli_date       :OrderData.hope_deli_date,
        hope_deli_time       :OrderData.hope_deli_time,
        zonecode             :OrderData.zonecode,
        recv_name            :OrderData.recv_name,
        recv_mobile          :OrderData.recv_mobile,
        A_order_uid          :A_order_uid,
        A_order_item_uid     :A_order_item_uid,
        A_order_item_cnt     :A_order_item_cnt,
        A_add_goods_uid      :A_add_goods_uid,
        A_add_goods_cnt      :A_add_goods_cnt,
        A_add_goods_req_memo :A_add_goods_req_memo
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}
*/

export const OrderMod = async (get_gd_order, A_order_list, add_goods_list, Member) => {

    let temp = A_order_list.map(val=>val.A_sel_option.map(val2=>val2));
    let temp2 = temp.reduce((val,idx)=>{return val.concat(idx);});

    let A_order_uid          = A_order_list.map(val=>String(val.order_uid));
    let A_order_item_uid     = temp2.map(val=>String(val.order_item_uid));
    let A_order_item_cnt     = temp2.map(val=>String(val.option_cnt));
    // let A_req_memo           = temp2.map(val=>String(val.req_memo));

    let A_add_goods_uid      = add_goods_list.map(val=>String(val.goods_uid));
    let A_add_goods_cnt      = add_goods_list.map(val=>String(val.goods_cnt));
    let A_add_goods_req_memo = add_goods_list.map(val=>String(val.req_memo));


    let data = {
        act_type             :"mod_recv_info",
        gd_order_uid         :get_gd_order.gd_order_uid,
        mem_uid              :Member,
        addr1                :get_gd_order.addr1,
        addr2                :get_gd_order.addr2,
        order_memo           :get_gd_order.order_memo,
        hope_deli_date       :get_gd_order.hope_deli_date,
        hope_deli_time       :get_gd_order.hope_deli_time,
        zonecode             :get_gd_order.zonecode,
        recv_name            :get_gd_order.recv_name,
        recv_mobile          :get_gd_order.recv_mobile,

        A_order_uid          :A_order_uid,
        A_order_item_uid     :A_order_item_uid,
        A_order_item_cnt     :A_order_item_cnt,
        // A_req_memo           :A_req_memo

        A_add_goods_uid      :A_add_goods_uid,
        A_add_goods_cnt      :A_add_goods_cnt,
        A_add_goods_req_memo :A_add_goods_req_memo
    }
    console.log(data,'/[데이터 확인]');
    console.log(add_goods_list,'/[추가 자재 데이터]');
    console.log(A_order_uid,'/[자재 uid]');
    console.log(A_order_item_uid,'/[자재 옵션 uid]');
    console.log(A_order_item_cnt,'/[자재 수량]');
    console.log(A_add_goods_uid,'/[추가 자재 uid]');
    console.log(A_add_goods_cnt,'/[추가 자재 수량]');
    console.log(A_add_goods_req_memo,'/[추가 자재 옵션 요청사항]');
    
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',data,{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}


/**---------------------------------발주상태 리스트 설정---------------------------------------**/




/**-------------------------------------발주취소-----------------------------------------------------------------------**/
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

    let order_uid = pay_cancel_goods.map(val=>val.order_uid);
    let order_item_uid = pay_cancel_goods.map(val=>val.order_item_uid);
    let src_cnt = pay_cancel_goods.map(val=>val.src_cnt);
    let cancel_cnt = pay_cancel_goods.map(val=>val.cancel_cnt);


    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type             :"pay_done_gd_cancel",
        gd_order_uid         :OrderData.gd_order_uid,
        cancel_money         :tot_price,
        cancel_type          :type,
        mem_uid              :Member,
        order_uid            :order_uid,
        order_item_uid       :order_item_uid,
        src_cnt              :src_cnt,
        cancel_cnt           :cancel_cnt,
        merchant_uid         :OrderData.order_no,
        imp_uid              :OrderData.imp_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}
/**-------------------------------------결제시도-----------------------------------------------------------------------**/
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

/**-------------------------------------발주취소 자재 리스트 출력-----------------------------------------------------------------------**/
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
/**-------------------------------------발주취소내역출력-----------------------------------------------------------------------**/
export const gd_cancel_info = async (gd_cancel_uid, gd_order_uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type             :"gd_cancel_info",
        gd_cancel_uid        :gd_cancel_uid,
        gd_order_uid         :gd_order_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}
/**-------------------------------------공사명, 배송지 리스트 출력----------------------------------------------------------------------**/
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
/**-------------------------------------배송정보등록 자재목록 리스트 출력-----------------------------------------------------------------------**/
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
/**-------------------------------------배송지,공사명 저장-----------------------------------------------------------------------**/
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
/**-------------------------------------발주리스트 출력-----------------------------------------------------------------------**/
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


/**--------------------------------------------자재수량 조절----------------------------------------------------------------**/
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

/**--------------------------------------결제전 자재추가 이벤트--------------------------------------------------**/

export const add_order_goods = async (gd_order_uid, goods_uid) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type            :"add_order_goods",
        gd_order_uid        :gd_order_uid,
        A_add_goods_uid     :A_add_goods_uid,
        A_add_goods_cnt     :A_add_goods_cnt,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;
}

/**-----------------------------------------결제후 추가발주 이벤트---------------------------------------------------**/
export const add_order = async (OrderData, Member, A_goods_list ,chk_result) => {

    let os_type = Platform.OS;
    // let goods_cate1_uid     = A_goods_list.map(val=>String(val.cate_1st_uid));
    let A_goods_uid         = A_goods_list.map(val=>String(val.goods_uid));
    let A_goods_cnt         = A_goods_list.map(val=>String(val.goods_cnt));
    let A_req_memo          = A_goods_list.map(val=>String(val.req_memo));

    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type                :'add_gd_order',
        parent_gd_order_uid     :OrderData.gd_order_uid,        // 최초 발주 uid
        mem_uid                 :Member,                        // 회원 uid
        os_type                 :os_type,                       // 기기 타입
        order_title             :OrderData.order_title,               // 공사명
        work_uid                :OrderData.work_uid,            // 공사명 uid
        zonecode                :OrderData.zonecode,            // 우편번호
        addr1                   :OrderData.addr1,               // 주소
        addr2                   :OrderData.addr2,               // 상세주소
        hope_deli_date          :OrderData.hope_deli_date,      // 희망배송일
        hope_deli_time          :OrderData.hope_deli_time,      // 희망배송시간
        recv_name               :OrderData.recv_name,           // 현장인도자명
        recv_phone              :OrderData.recv_phone,          // 현장인도자 연락처
        order_memo              :OrderData.order_memo,          // 배송메모
        goods_cate1_uid         :String(chk_result),                            // 공정카테고리 uid
        A_goods_uid             :A_goods_uid,                            // 추가 자재 uid(배열)
        A_goods_cnt             :A_goods_cnt,                            // 추가 자재 수량(배열)
        A_req_memo              :A_req_memo,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    let data = {
        act_type                :'add_gd_order',
        parent_gd_order_uid     :OrderData.gd_order_uid,        // 최초 발주 uid
        mem_uid                 :Member,                        // 회원 uid
        os_type                 :os_type,                       // 기기 타입
        order_title             :OrderData.order_title,               // 공사명
        work_uid                :OrderData.work_uid,            // 공사명 uid
        zonecode                :OrderData.zonecode,            // 우편번호
        addr1                   :OrderData.addr1,               // 주소
        addr2                   :OrderData.addr2,               // 상세주소
        hope_deli_date          :OrderData.hope_deli_date,      // 희망배송일
        hope_deli_time          :OrderData.hope_deli_time,      // 희망배송시간
        recv_name               :OrderData.recv_name,           // 현장인도자명
        recv_phone              :OrderData.recv_phone,          // 현장인도자 연락처
        order_memo              :OrderData.order_memo,          // 배송메모
        goods_cate1_uid         :String(chk_result),                            // 공정카테고리 uid
        A_goods_uid             :A_goods_uid,                            // 추가 자재 uid(배열)
        A_goods_cnt             :A_goods_cnt,                            // 추가 자재 수량(배열)
        A_req_memo              :A_req_memo,
    }
    console.log(data,'/ 전송용');
    return res;
}
/**-----------------------------------------결제후 선택 발주 취소 이벤트---------------------------------------------------**/
export const order_cancel = async (OrderData, cancel_type, OrderGoodsList, Member) => {
    // 1. 체크박스를 클릭한다
    // refund_type = all, part
    let A_goods_uid = OrderGoodsList.map(val=>val.goods_uid);
    let A_order_uid = OrderGoodsList.map(val=>val.order_uid);
    let A_order_item_uid = OrderGoodsList.map(val=>String(val.A_sel_option.map(item=>Number(item.order_item_uid))));
    let A_order_item_cancel_cnt = OrderGoodsList.map(val=>String(val.cancel_cnt));

    console.log(A_goods_uid,'/ goods_uid');
    console.log(A_order_uid,'/ order_uid');
    console.log(A_order_item_uid,' / order_item_uid');
    console.log(A_order_item_cancel_cnt,' / 취소수량');
    console.log(cancel_type,' / 취소 타입');

    let data = {
        act_type                    :"order_cancel",
        mem_uid                     :Member,
        gd_order_uid                :OrderData.gd_order_uid,
        A_goods_uid                 :(cancel_type === 'part') ? A_goods_uid : '',               // 배열 부분취소일때만 전송
        A_order_uid	                :(cancel_type === 'part') ? A_order_uid : '',               // 배열 부분취소일때만 전송
        A_order_item_uid            :(cancel_type === 'part') ? A_order_item_uid : '',          // 배열 부분취소일때만 전송
        A_order_item_cancel_cnt     :(cancel_type === 'part') ? A_order_item_cancel_cnt : '',   // 배열 부분취소일때만 전송
        cancel_type                 :cancel_type,
    }

    console.log(data,'/ 발주취소 데이터 확인');

    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type                    :"pay_done_gd_cancel",
        mem_uid                     :Member,
        gd_order_uid                :OrderData.gd_order_uid,
        A_goods_uid                 :(cancel_type === 'part') ? A_goods_uid : '',               // 배열 부분취소일때만 전송
        A_order_uid	                :(cancel_type === 'part') ? A_order_uid : '',               // 배열 부분취소일때만 전송
        A_order_item_uid            :(cancel_type === 'part') ? A_order_item_uid : '',          // 배열 부분취소일때만 전송
        A_order_item_cancel_cnt     :(cancel_type === 'part') ? A_order_item_cancel_cnt : '',   // 배열 부분취소일때만 전송
        cancel_type                 :cancel_type,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });
    return res;

}

export const pay_result = async (OrderData, Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type                    :"pay_result",
        Member                      :Member,
        imp_uid                     :OrderData.imp_uid,
        gd_order_uid                :OrderData.gd_order_uid,
        order_no                    :OrderData.order_no,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}

/**---------------------------------------결제창 나올시 이벤트--------------------------------------------------------**/
export const pay_cancel = async (OrderData, Member) => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type                    :"pay_cancel",
        gd_order_uid                :OrderData.gd_order_uid,
        Member                      :OrderData.mem_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}

/**-----------------------------------------결제전 자재추가 2023-03-23-----------------------------------------------------------------**/
export const add_goods = async () => {
    let res = await axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
        act_type                    :"pay_cancel",
        gd_order_uid                :OrderData.gd_order_uid,
        Member                      :OrderData.mem_uid,
    },{
        headers: {
            'Content-type': 'multipart/form-data'
        }
    });

    return res;
}











