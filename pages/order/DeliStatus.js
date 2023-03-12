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
    text_gray,
    btn_outline_primary,
    ps1,
    pe1,
    btn_outline_danger,
    btn_outline_gray, btn_primary, p1, text_light, h16, fw600, h14
} from '../../common/style/AtStyle';
import {sub_page, gray_bar} from '../../common/style/SubStyle';

// 샘플데이터
import {DateChg, deliStatus, order_List, ordStatus} from "../../util/util";
import axios from "axios";
import Footer from "../Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";


function DeliStatus({route, navigation}) {



    const [Member, setMember] = useState();
    const Update = useIsFocused();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });

    console.log('전달 3값 / ',Member);

    const [OrderList, setOrderList] = useState([]);     // 발주내역 출력
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
                    val.ord_status === 'pay_done'   ||
                    val.ord_status === 'deli_ready' ||
                    val.ord_status === 'deli_doing' ||
                    val.ord_status === 'deli_done'
                );
                let desc = temp.sort((a,b)=>{
                    return new Date(b.gd_order_uid) - new Date(a.gd_order_uid);
                });
                return setOrderList(desc);
            } else {
                console.log('에러');
            }
        });

        //======================== 임시====================//


    },[Member]);
    return (
        <>
            {/*상단*/}
            <View style={[styles.Order, bg_white]}>
                <View style={[flex]}>
                    <TouchableOpacity style={[styles.wt_3]} onPress={()=>navigation.navigate('발주상태')}>
                        <Text style={[styles.tab_txt]}>발주상태</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.wt_3]} onPress={()=>navigation.navigate('결제상태')}>
                        <Text style={[styles.tab_txt]}>결제상태</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.wt_3, active_link]} onPress={()=>navigation.navigate('배송상태')}>
                        <Text style={[styles.tab_txt,active_txt]}>배송상태</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/*메인*/}
            <ScrollView style={[bg_white]}>
                <View style={[styles.bt, styles.bb]}>
                    <View>
                        {(OrderList) && (
                            <>
                                {OrderList.map((val,idx)=>(
                                    <>
                                        <View style={[styles.order_list_items]} key={idx}>
                                            <View style={[container]}>
                                                {/**-------------------------발주번호----------------------------**/}
                                                <View style={[flex, styles.mb_5]}>
                                                    <View style={[styles.wt3]}>
                                                        <Text style={[styles.goods_num, h16]}> 발주번호 :</Text>
                                                    </View>
                                                    <View style={[styles.wt7]}>
                                                        <Text style={[styles.goods_num_val, h16, fw600]}>{val.order_no}</Text>
                                                    </View>
                                                </View>
                                                {/**-------------------------발주신청일시----------------------------**/}
                                                <View style={[flex, styles.mb_5]}>
                                                    <View style={[styles.wt3]}>
                                                        <Text style={[styles.Construction_name, h14]}> 신청일시
                                                            :</Text>
                                                    </View>
                                                    <View style={[styles.wt7]}>
                                                        <Text style={[styles.Construction_name_val, h14]} numberOfLines={1}>{DateChg(val.order_date)} {val.order_time}</Text>
                                                    </View>
                                                </View>
                                                {/**-------------------------공사명----------------------------**/}
                                                <View style={[flex, styles.mb_5]}>
                                                    <View style={[styles.wt3]}>
                                                        <Text style={[styles.Construction_name, h14]}> 공사명
                                                            :</Text>
                                                    </View>
                                                    <View style={[styles.wt7]}>
                                                        <Text style={[styles.Construction_name_val, h14]} numberOfLines={1}>{val.order_title}</Text>
                                                    </View>
                                                </View>
                                                {/**-------------------------희망배송일----------------------------**/}
                                                <View style={[flex, styles.mb_5]}>
                                                    <View style={[styles.wt3]}>
                                                        <Text
                                                            style={[styles.Desired_Delivery_Date_name, h14]}> 희망배송일
                                                            :</Text>
                                                    </View>
                                                    <View style={[styles.wt7]}>
                                                        <Text
                                                            style={[styles.Desired_Delivery_Date_val, h14]}>{DateChg(val.hope_deli_date)} {val.hope_deli_time} 도착예정</Text>
                                                    </View>
                                                </View>
                                                {/**-------------------------배송지----------------------------**/}
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
                                                {/**-------------------------최근수정일----------------------------**/}
                                                {/*{(val.mod_date !== "0000-00-00") && (*/}
                                                {/*    <>*/}
                                                {/*        <View style={[flex]}>*/}
                                                {/*            <View style={[styles.wt3]}>*/}
                                                {/*                <Text style={[styles.Delivery_destination_name, h14, val.text_gray]}> 최근수정일 :</Text>*/}
                                                {/*            </View>*/}
                                                {/*            <View style={[styles.wt7]}>*/}
                                                {/*                <Text style={[styles.Delivery_destination_name_val, h14, text_primary]}>*/}
                                                {/*                    {val.mod_date} {val.mod_time}*/}
                                                {/*                </Text>*/}
                                                {/*            </View>*/}
                                                {/*        </View>*/}
                                                {/*    </>*/}
                                                {/*)}*/}
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
                                                            <Text style={[text_light]}>상세내역</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[flex]}>
                                                        <Text style={[ text_primary,btn_outline_primary,ps1,pe1, h14]}>
                                                            {deliStatus(`${val.deli_status}`)}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={gray_bar}/>
                                        </View>
                                    </>
                                ))}
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
            {/*하단*/}
            <Footer navigation={navigation}/>
        </>
    );
}

export default DeliStatus;


const styles = StyleSheet.create({

    CancelBtn:{
        borderWidth:1,
        borderColor:"#333",
        fontSize:17,
    },

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