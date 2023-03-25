import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Button,
    CheckBox,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    useWindowDimensions,
    Alert
} from 'react-native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    input,
    flex,
    flex_top,
    active_link,
    active_txt,
    padding_bottom,
    text_danger,
    text_primary,
    btn_outline_danger,
    btn_outline_primary,
    p2,
    p1,
    ps1,
    pe1,
    btn_primary, text_light, text_info, h16, fw600, h14, text_gray, h12, h13
} from '../../common/style/AtStyle';
import {sub_page, gray_bar} from '../../common/style/SubStyle';

// 샘플데이터
import {order_List, ordStatus} from "../../util/util";
import axios from "axios";
import Footer from "../Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";


function OrderStatus({route, navigation}) {


    /**-------------------기본 회원정보 셋팅-----------------------**/
    const [Member, setMember] = useState();
    const mem_uid                           = AsyncStorage.getItem("member").then((value)=>{setMember(value);});
    const Update = useIsFocused();
    const [OrderList, setOrderList] = useState([]);     // 발주내역 출력
    console.log('전달 2값 / ',Member);
    /**-----------------------------주문서정보 출력----------------------------**/
    const getOrderStatus = () => {
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
            act_type        :"get_order_list",
            login_status    :"Y",
            mem_uid         :Member,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            const {result, A_gd_order, query} = res.data;
            console.log(result,'/ 확인');
            if(result === 'OK') {
                console.log(A_gd_order);

                let temp = A_gd_order.filter(val=>val.ord_status === 'ord_ready' || val.ord_status === 'ord_doing')


                return setOrderList(temp);
            } else {
                console.log('에러');
            }
        });
    }
    /**---------------------------출력리스트----------------------------------**/
    useEffect(()=>{
        getOrderStatus();
    },[Member, Update]);

    console.log(OrderList,' / 리스트22');

    return (
        <>
            <View style={[bg_white]}>
                <View style={[styles.Order]}>
                    <View style={[flex]}>
                        <TouchableOpacity style={[styles.wt_3, active_link]} onPress={()=>navigation.navigate('발주상태')}>
                            <Text style={[styles.tab_txt,active_txt]}>발주상태</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.wt_3, ]} onPress={()=>navigation.navigate('결제상태')}>
                            <Text style={[styles.tab_txt,]}>결제상태</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.wt_3]} onPress={()=>navigation.navigate('배송상태')}>
                            <Text style={[styles.tab_txt]}>배송상태</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{backgroundColor:"#fff", height:"100%"}}>

                    <View style={[padding_bottom]} />
                </ScrollView>
            </View>
            <Footer navigation={navigation}/>
        </>
    );
}

export default OrderStatus;


const styles = StyleSheet.create({
    wt_3: {
        flex: 0.5,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    active: {
        borderBottomWidth: 4,
        borderColor: "#4549E0",
    },
    tab_txt: {
        textAlign: "center",
        paddingVertical: 16,
    },
    bb: {
        borderBottomWidthWidth: 1,
        borderColor: "#ddd",
    },
    wt3: {
        width: "25%",
    },
    wt7: {
        width: "75%",
    },
    mb_5: {
        marginBottom: 5,
    },
    border_b_dotted: {
        borderStyle: 'dashed',
        borderWidth: 1,
        margin: -2,
        borderColor: "#eee"
    },
    border: {
        borderWidth: 1,
        borderColor: "#eee",
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
});