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
    };

    console.log(data);

    function callback(rsp) {
        const {imp_uid, success, merchant_uid} = rsp;
        if(success) {
            pay_result(imp_uid, OrderData).then((res)=>{
                if(res) {
                    const {result} = res.data;
                    if(result === 'OK') {
                        Alert.alert('','결제가 완료되었습니다.');
                    }
                }
            }).done(res=>{
                pay_done_log(imp_uid, merchant_uid, OrderData).then((res)=>{
                    if(res) {
                        const {result} = res.data;
                        if(result === 'OK') {
                           console.log('페이지 이동');
                        }
                    }
                });
            });

        } else {

        }

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



