import Postcode from '@actbase/react-daum-postcode';
import {ScrollView, View} from "react-native";
import {zonecode} from "../common/style/AtStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";


function DaumPostCode({route, navigation}) {


    const {order_uid, page} = route.params;

    const getAddressData = data => {
        let defaultAddress = ''; // 기본주소
        if (data.buildingName === 'N') {
            defaultAddress = data.apartment;
        } else {
            defaultAddress = data.buildingName;
        }

        // console.log(data);
        navigation.navigate(`${page}`,{
            order_uid   :order_uid,
            zonecode    :data.zonecode,
            addr1       :data.address
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