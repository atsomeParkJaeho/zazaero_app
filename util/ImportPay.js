import IMP from 'iamport-react-native';
import {IMPcode} from "./util";
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import axios from "axios";
import {pay_done_log, pay_result, pay_try_cancel} from "./UTIL_pay";
import {useEffect} from "react";
import LeftArrow from "../icons/left_arrow.svg";

import {pay_cancel} from "../pages/order/UTIL_order";
import {settlekind_push} from "../push/UTIL_push";





function Payment({ route,navigation }) {

    const {OrderData, point_use} = route.params;
    console.log(OrderData,'/결제창 데이터 확인');

    let tot_price = Number(OrderData.settleprice) + Number(OrderData.tot_opt_price) + Number(OrderData.deli_price);

    console.log(OrderData,'/주문데이터');
    console.log(OrderData.tot_opt_price,'/옵션 요청비');
    console.log(OrderData.settleprice,'/상품금액');
    console.log(tot_price,'/합계금액');


    useEffect(()=>{
        console.log('/ use이펙트 실행');
        navigation.setOptions({
            headerLeft          :()=>{
                return(
                    <>
                        <View style={{paddingLeft:3}}>
                            <TouchableOpacity onPress={()=>goCancel()}>
                                <LeftArrow width={25} height={20}/>
                            </TouchableOpacity>
                        </View>
                    </>
                )
            }
        });
    },[]);

    // 결제전 취소 처리

    const goCancel = () => {
        Alert.alert('','이전으로 돌아가시겠습니까?',[
            {text:"아니오"},
            {text:"예",
                onPress:()=>{
                    pay_cancel(OrderData).then((res)=>{
                        if(res) {
                            const {result} = res.data;
                            if(result === 'OK') {
                                return navigation.pop();
                            }
                        } else {
                            Alert.alert('','에러');
                        }
                    })
                }
            }
        ]);
    }

    const data = {
        pg                      :'kcp',
        pay_method              :'card',
        name                    :OrderData.work_name,
        merchant_uid            :OrderData.order_no,
        amount                  :Number(OrderData.settleprice - point_use),
        buyer_name              :OrderData.recv_name,
        buyer_tel               :OrderData.recv_mobile,
        buyer_addr              :OrderData.addr1+' '+OrderData.addr2,
        buyer_postcode          :OrderData.zonecode,
        app_scheme              :'자재로',
        // m_redirect_url          :'http://49.50.162.86:80/contents/order/order_result_mobile.php?gd_order_uid='+OrderData.gd_order_uid+'&order_no='+OrderData.order_no,
    };

    console.log(data,'/ 데이터');

    function callback(rsp) {

        console.log(rsp,'/ 아임포트 콜백함수');

        const {imp_uid, success, merchant_uid, error_msg} = rsp;

        /* 1. 아임포트 결제관리창에서 api 찾는다.*/

        /* 2. 아임포트 결제관리창에서 찾은 api를 관리자로 보낸다. */

        if(error_msg) {return Alert.alert('',`에러 메시지 / ${error_msg}`)}

        pay_result(imp_uid, OrderData).then((res)=>{
            if(res) {
                console.log(res.data);
                const {result, gd_order} = res.data;
                if(result === 'OK') {
                    console.log(gd_order,'/ [결제 정보 데이터]');
                    console.log('결제완료');
                    navigation.replace('배송상태');
                    Alert.alert('','결제가 완료되었습니다.',[{
                        text:'OK',
                        onPress:()=>{
                            // return settlekind_push(OrderData.mem_uid, OrderData);
                        }
                    }]);
                } else {
                    return Alert.alert('',`에러 / ${res.data}`);
                }
            }
        });
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



