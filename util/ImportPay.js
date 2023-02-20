import IMP from 'iamport-react-native';
import {IMPcode} from "./util";
import {View, Text, StyleSheet, Alert} from 'react-native';
import axios from "axios";
import {pay_done_log, pay_result, pay_try_cancel} from "./UTIL_pay";





function Payment({ route,navigation }) {

    const {OrderData} = route.params;
    console.log(OrderData,'/데이터 확인123123');

    const data = {
        pg                      :'kcp',
        pay_method              :'card',
        name                    :OrderData.order_title,
        merchant_uid            :OrderData.order_no,
        amount                  :OrderData.settleprice,
        buyer_name              :OrderData.recv_name,
        buyer_tel               :OrderData.recv_mobile,
        buyer_addr              :OrderData.addr1+' '+OrderData.addr2,
        buyer_postcode          :OrderData.zonecode,
        app_scheme              :'자재로',
        // m_redirect_url          :'http://49.50.162.86:80/contents/order/order_result_mobile.php?gd_order_uid='+OrderData.gd_order_uid+'&order_no='+OrderData.order_no,
    };

    console.log(data,'/ 데이터');

    function callback(rsp) {

        console.log(rsp);

        const {imp_uid, success, merchant_uid} = rsp;

        /* 1. 아임포트 결제관리창에서 api 찾는다.*/

        /* 2. 아임포트 결제관리창에서 찾은 api를 관리자로 보낸다. */

        pay_result(imp_uid, OrderData).then((res)=>{
            if(res) {
                console.log(res.data);
                const {result, gd_order} = res.data;
                if(result === 'OK') {
                    console.log(gd_order);
                    console.log('결제완료');
                }
            }
        });

        navigation.replace('배송상태');


    }

    return(
        <>
            <IMP.Payment
                userCode={IMPcode}  // 가맹점 식별코드
                data={data}           // 결제 데이터
                callback={callback}   // 결제 종료 후 콜백
            />
        </>
    );

} export default Payment;





const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});



