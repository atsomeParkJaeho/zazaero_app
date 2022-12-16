import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, CheckBox, Text, TextInput, View, Image, TouchableOpacity, ScrollView,useWindowDimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
    active_txt, padding_bottom, text_danger, text_primary, btn_outline_danger, ps1, pe1, btn_outline_primary
} from '../../common/style/AtStyle';
import {sub_page, gray_bar} from '../../common/style/SubStyle';

// 샘플데이터
import {order_List} from "../../util/util";
import axios from "axios";


function PayStatus({navigation, route}) {


    const [OrderList, setOrderList] = useState(order_List);     // 발주내역 출력
    useEffect(()=>{
        // ======================= db 연결용==================//
        /*
        axios.get('',{
            params:{

            }
        }).then((res)=>{

        });
        */
        //======================== 임시====================//


    },[]);


    // 1. 발주상태 페이지
    /*
    * order_status 에서 ready, doing, done 상태 표출
    *
    * */


    // 2. 결제상태
    /*
    * order_status에서 done이고 pay_status는 ready 경우 출력
    *
    * */



    // 3. 배송상태
    /*
    * order_status에서 done이고
    * pay_status에서 done이면
    * 배송상태 출력
    *
    * */
    console.log(OrderList);


    let test = 1;

    return (
        <>
            <View style={[bg_white]}>
                <View style={[styles.Order]}>
                    <View style={[flex]}>
                        <TouchableOpacity style={[styles.wt_3]} onPress={()=>navigation.navigate('발주상태')}>
                            <Text style={[styles.tab_txt]}>발주상태</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.wt_3, active_link]} onPress={()=>navigation.navigate('결제상태')}>
                            <Text style={[styles.tab_txt,active_txt]}>결제상태</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.wt_3]} onPress={()=>navigation.navigate('배송상태')}>
                            <Text style={[styles.tab_txt]}>배송상태</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={[styles.bt, styles.bb]}>
                        <View>
                            {OrderList.map(val => (
                                (val.order_status === 'ready' || val.order_status === 'doing' || val.order_status === 'done') && (
                                    <>
                                        <View style={[styles.order_list_items]}>
                                            <View style={[container]}>
                                                <View style={[flex, styles.mb_5]}>
                                                    <View style={[styles.wt3]}>
                                                        <Text style={[styles.goods_num, styles.ft_16]}> 발주번호 :</Text>
                                                    </View>
                                                    <View style={[styles.wt7]}>
                                                        <Text
                                                            style={[styles.goods_num_val, styles.ft_16, styles.fw_6]}>{val.goods_num}</Text>
                                                    </View>
                                                </View>
                                                {/*발주번호*/}
                                                <View style={[flex, styles.mb_5]}>
                                                    <View style={[styles.wt3]}>
                                                        <Text style={[styles.Construction_name, styles.ft_14]}> 공사명
                                                            :</Text>
                                                    </View>
                                                    <View style={[styles.wt7]}>
                                                        <Text
                                                            style={[styles.Construction_name_val, styles.ft_14]}>{val.Construction_name}</Text>
                                                    </View>
                                                </View>
                                                {/*공사명*/}
                                                <View style={[flex, styles.mb_5]}>
                                                    <View style={[styles.wt3]}>
                                                        <Text
                                                            style={[styles.Desired_Delivery_Date_name, styles.ft_14]}> 희망배송일
                                                            :</Text>
                                                    </View>
                                                    <View style={[styles.wt7]}>
                                                        <Text
                                                            style={[styles.Desired_Delivery_Date_val, styles.ft_14]}>{val.Desired_Delivery_Date} 도착예정</Text>
                                                    </View>
                                                </View>
                                                {/*희망배송일*/}
                                                <View style={[flex]}>
                                                    <View style={[styles.wt3]}>
                                                        <Text
                                                            style={[styles.Delivery_destination_name, styles.ft_14, val.text_gray]}> 배송지
                                                            :</Text>
                                                    </View>
                                                    <View style={[styles.wt7]}>
                                                        <Text
                                                            style={[styles.Delivery_destination_name_val, styles.ft_14, styles.text_gray]}>{val.Delivery_destination_name}</Text>
                                                    </View>
                                                </View>
                                                {/*배송지*/}
                                            </View>
                                            <View style={[styles.border_b_dotted]}></View>
                                            <View style={[container]}>
                                                <View style={[flex_between]}>
                                                    <View style="">
                                                        <TouchableOpacity style={styles.border} onPress={()=>navigation.navigate('결제상세')}>
                                                            <Text style={styles.middleButtonText}>상세내역 / 정보변경</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[flex]}>
                                                        <Text style={[styles.ft_14]}>결제상태</Text>
                                                        {(val.order_type == 'ready') ? (
                                                            <Text
                                                                style={[styles.order_type, text_danger,btn_outline_danger,ps1,pe1]}>대기</Text>
                                                        ) : (
                                                            <Text
                                                                style={[styles.order_type, text_primary,btn_outline_primary,ps1,pe1]}>완료</Text>
                                                        )}

                                                    </View>
                                                </View>
                                            </View>
                                            <View style={gray_bar}/>
                                        </View>
                                    </>
                                )
                            ))}
                        </View>
                    </View>
                    <View style={[padding_bottom]} />
                </ScrollView>
            </View>
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
    order_type: {
        fontSize: 16,
        lineHeight: 24,
        marginLeft: 10,
        fontWeight: "500",
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