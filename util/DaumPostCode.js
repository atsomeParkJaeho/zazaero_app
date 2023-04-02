import Postcode from '@actbase/react-daum-postcode';
import {ScrollView, View} from "react-native";
import {zonecode} from "../common/style/AtStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";


function DaumPostCode({route, navigation}) {

    const {order_uid, page, gd_order_uid, goods_cate1_uid, get_gd_order} = route.params;


    const getAddressData = data => {
        let defaultAddress = ''; // 기본주소
        if (data.buildingName === 'N') {
            defaultAddress = data.apartment;
        } else {
            defaultAddress = data.buildingName;
        }
        return navigation.navigate(`${page}`,{
            order_uid       :order_uid,
            gd_order_uid    :gd_order_uid,
            zonecode        :data.zonecode,
            addr1           :data.address,
            goods_cate1_uid :goods_cate1_uid,
            get_gd_order    :get_gd_order,
        });


    };

    return (
        <>
            <Postcode
                style={{ flex: 1, width: '100%', zIndex: 999, height:500, }}
                onSelected={data => getAddressData(data)}
                onError={error=>console.log(error)}
            />
        </>
    );
} export default DaumPostCode;