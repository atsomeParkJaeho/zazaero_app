import {getAppInfo, getOrderInfo, pay_zero_done, PayTry} from "./UTIL_order";
import {Alert} from "react-native";
import {pay_result} from "../../util/UTIL_pay";

export const app_info = async () => {
    let {data:{result,app_info}} = await getAppInfo();
    if(result === 'OK'){
        return app_info
    }


}
export const get_order = async (Member, gd_order_uid) => {
    let {data:{result,gd_order,cancel_doing_cnt}} = await getOrderInfo(gd_order_uid,Member);
    if(result === 'OK') {
        return {gd_order, cancel_doing_cnt}
    }
}

export const donePay = async (OrderData, PayMement, navigation, point_use) => {
    let msg = '입금확인 후 배송이 진행됩니다.';
    let N_btn = {text:"확인", onPress:()=>{navigation.replace('결제상태')}};
    PayTry(OrderData, PayMement).then((res)=>{
        if(res) {
            const {result} = res.data;
            if(result === 'OK') {
                if(OrderData.settleprice === point_use) {
                    // 전액 포인트 사용시
                    pay_zero_done(OrderData.gd_order_uid).then((res)=>{
                        if(res) {
                            const {result} = res.data;
                            if(result === 'OK') {
                                navigation.replace('배송상태');
                                return Alert.alert(``,`결제가 완료되었습니다.`);
                            } else {
                                return Alert.alert(``,`${res.data}`);
                            }
                        }
                    });
                } else if(PayMement === 'bank') {
                    pay_result(``,OrderData).then((res)=>{
                        if(res) {
                            const {result} = res.data;
                            if(result === 'OK') {
                                Alert.alert(``,msg, N_btn);
                            } else {
                                return Alert.alert(``,`${res.data}`);
                            }
                        }
                    });
                } else {
                    return navigation.navigate('카드결제',{OrderData:OrderData,point_use:point_use});
                }

            }
        }
    });
}




