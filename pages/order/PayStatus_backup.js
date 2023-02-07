import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, CheckBox, Text, TextInput, View, Image, TouchableOpacity, ScrollView,useWindowDimensions} from 'react-native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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
    ps1,
    pe1,
    btn_outline_primary,
    btn_primary, p1, text_light, h16, fw600, h14, text_gray
} from '../../common/style/AtStyle';
import {sub_page, gray_bar} from '../../common/style/SubStyle';

// 샘플데이터
import {order_List, ordStatus} from "../../util/util";
import axios from "axios";
import Footer from "../Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";


function PayStatus({route, navigation}) {


    const [Member, setMember] = useState();
    const Update = useIsFocused();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });

    console.log('전달 3값 / ',Member);

    const [OrderList, setOrderList] = useState(order_List);     // 발주내역 출력
    useEffect(()=>{
        // ======================= db 연결용==================//
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
            act_type        :"get_order_list",
            login_status    :"Y",
            mem_uid         :Member,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            const {result, A_gd_order} = res.data;
            console.log(result);
            if(result === 'OK') {
                let temp = A_gd_order.filter(val=>
                    val.ord_status === 'pay_ready'   ||
                    val.ord_status === 'pay_done'   ||
                    val.ord_status === 'pay_err'
                );
                console.log('결제완료만 / ',temp);
                return setOrderList(temp);
            } else {
                console.log('에러');
            }
        });

        //======================== 임시====================//


    },[Member]);
    // console.log('확인3 / ',OrderList.length);
    // console.log('확인3 / ',OrderList);
    return (
        <>
            <View style={[bg_white]}>
                <View style={[styles.Order]}>
                    <View style={[flex]}>
                        <TouchableOpacity style={[styles.wt_3, ]} onPress={()=>navigation.navigate('발주상태')}>
                            <Text style={[styles.tab_txt,]}>발주상태</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.wt_3, active_link]} onPress={()=>navigation.navigate('결제상태')}>
                            <Text style={[styles.tab_txt, active_txt]}>결제상태</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.wt_3]} onPress={()=>navigation.navigate('배송상태')}>
                            <Text style={[styles.tab_txt]}>배송상태</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{backgroundColor:"#fff", height:"100%"}}>
                    <View style={[styles.bt, styles.bb]}>
                        <View>
                            {OrderList.map((val,idx)=>(
                                <>
                                    <View style={[styles.order_list_items]} key={idx}>
                                        <View style={[container]}>
                                            <View style={[flex, styles.mb_5]}>
                                                <View style={[styles.wt3]}>
                                                    <Text style={[styles.goods_num, h16]}> 발주번호 :</Text>
                                                </View>
                                                <View style={[styles.wt7]}>
                                                    <Text style={[styles.goods_num_val, h16, fw600]}>{val.order_no}</Text>
                                                </View>
                                            </View>
                                            {/*발주번호*/}
                                            <View style={[flex, styles.mb_5]}>
                                                <View style={[styles.wt3]}>
                                                    <Text style={[styles.Construction_name, h14]}> 공사명
                                                        :</Text>
                                                </View>
                                                <View style={[styles.wt7]}>
                                                    <Text style={[styles.Construction_name_val, h14]} numberOfLines={1}>{val.order_title}</Text>
                                                </View>
                                            </View>
                                            {/*공사명*/}
                                            <View style={[flex, styles.mb_5]}>
                                                <View style={[styles.wt3]}>
                                                    <Text
                                                        style={[styles.Desired_Delivery_Date_name, h14]}> 희망배송일
                                                        :</Text>
                                                </View>
                                                <View style={[styles.wt7]}>
                                                    <Text
                                                        style={[styles.Desired_Delivery_Date_val, h14]}>{val.hope_deli_date} 도착예정</Text>
                                                </View>
                                            </View>
                                            {/*희망배송일*/}
                                            <View style={[flex]}>
                                                <View style={[styles.wt3]}>
                                                    <Text style={[styles.Delivery_destination_name, h14, val.text_gray]}> 배송지 :</Text>
                                                </View>
                                                <View style={[styles.wt7]}>
                                                    <Text style={[styles.Delivery_destination_name_val, h14, text_gray]}>
                                                        {val.addr1} {val.addr2}
                                                    </Text>
                                                </View>
                                            </View>
                                            {/*배송지*/}
                                        </View>
                                        <View style={[styles.border_b_dotted]}></View>
                                        <View style={[container]}>
                                            <View style={[flex_between]}>
                                                <View style="">
                                                    <TouchableOpacity style={[btn_primary, p1,]}
                                                                      onPress={()=>navigation.navigate('발주상세',{
                                                                          gd_order_uid   :val.gd_order_uid,
                                                                          hope_deli_date :val.hope_deli_date,
                                                                      })}
                                                    >
                                                        <Text style={[text_light]}>상세내역 / 정보변경</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={[flex]}>
                                                    {/*<Text style={[h14]}>결제상태</Text>*/}
                                                    {/*(val.pay_status == 'ready') ? (
                                                         <Text
                                                             style={[ text_danger,btn_outline_danger,ps1,pe1, h14]}>결제대기</Text>
                                                     ) : (
                                                         <Text
                                                             style={[ text_primary,btn_outline_primary,ps1,pe1, h14]}>결제완료</Text>
                                                     )*/}
                                                    <Text style={[ text_primary,btn_outline_primary,ps1,pe1, h14]}>
                                                        {ordStatus(`${val.ord_status}`)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={gray_bar}/>
                                    </View>
                                </>
                            ))}
                        </View>
                    </View>
                    <View style={[padding_bottom]} />
                </ScrollView>
            </View>
            <Footer navigation={navigation}/>
        </>
    );
}

export default PayStatus;


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
    order_list_items: {},
    ft_16: {
        fontSize: 16,
        lineHeight: 24,
    },
    ft_14: {
        fontSize: 14,
        lineHeight: 24,
    },
    fw_6: {
        fontWeight: "600",
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
    text_danger: {
        color: "#f25767"
    },
    text_primary: {
        color: "#4549e0"
    },
    text_gray: {
        color: "#a0aec0",
    }
});