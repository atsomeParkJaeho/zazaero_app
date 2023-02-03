import IMP from 'iamport-react-native';
import {IMPcode} from "./util";
import {View, Text, StyleSheet, Alert} from 'react-native';
import axios from "axios";

function Payment({ route,navigation }) {

    const {order_title,gd_order_uid, order_no, settleprice, order_mem_name, order_mem_mobile, addr1, addr2, zonecode} = route.params

    let log = '';
    log += '주문 uid : '+gd_order_uid+'\n';
    log += '공사명 : '+order_title+'\n';
    log += '결제금액 : '+settleprice+'\n';
    log += '주문번호 : '+order_no+'\n';
    log += '현장인도자 성명 : '+order_mem_name+'\n';
    log += '현장인도자 연락처 : '+order_mem_mobile+'\n';
    log += '주소 1 :'+addr1+'\n';
    log += '주소 2 :'+addr2+'\n';
    log += '우편번호 :'+zonecode+'\n';

    console.log(log);

    function callback(response) {
        console.log('결제2 성공 /', response);
        const {imp_uid} = response;
        axios.post('http://49.50.162.86:80/ajax/UTIL_order.php',{
            act_type        :'pay_result',
            success         :'T',
            gd_order_uid    :gd_order_uid,
            order_no        :order_no,
            imp_uid         :imp_uid,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            const {result, gd_order} = res.data;
            if(result === 'OK') {
                let msg = '';
                msg += '결제가 완료되었습니다. '+gd_order+'\n';
                msg += 'imp_uid '+imp_uid+'\n';
                msg += '콜백 로그  '+response+'\n';

                Alert.alert('',msg);

            } else {

            }
        });

    }

    const data = {
        pg                      :'kcp',
        pay_method              :'card',
        name                    :'test',
        merchant_uid            :order_no,
        amount                  :'1000',
        buyer_name              :order_mem_name,
        buyer_tel               :order_mem_mobile,
        buyer_addr              :addr1+' '+addr2,
        buyer_postcode          :zonecode,
        app_scheme              :'자재로',
    };

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

