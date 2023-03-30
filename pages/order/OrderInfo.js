import {getAppInfo, getOrderInfo, PayTry} from "./UTIL_order";
import {Alert} from "react-native";

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

export const donePay = async (OrderData, PayMement, navigation) => {
    let msg = '입금확인 후 배송이 진행됩니다.';
    let N_btn = {text:"확인", onPress:()=>{navigation.replace('결제상태')}};
    PayTry(OrderData, PayMement).then((res)=>{
        if(res) {
            const {result} = res.data;
            if(result === 'OK') {
                if(PayMement === 'bank') {
                    Alert.alert('',msg,[N_btn]);
                } else {
                    navigation.navigate('카드결제',{OrderData:OrderData});
                }

            }
        }
    });
}