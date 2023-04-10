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
    FlatList, Alert
} from 'react-native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    flex,
    h12,
    h18,
    ms1,
    h16,
    btn_primary,
    p1,
    text_light, text_center, text_white, padding_bottom
} from '../../common/style/AtStyle';
import {gray_bar, sub_page} from '../../common/style/SubStyle';
import Footer from "../Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {get_order_cancel_list} from "./UTIL_order";
import {cancelType, DateChg, Price, refundStatus} from "../../util/util";
import {get_Member} from "../UTIL_mem";

export default function Cancel({navigation, route}) {
    const [Member, setMember] = useState();
    const [cancel_list, set_cancel_list] = useState([]);

    /**1. 발주취소 내역 리스트 출력 **/
    useEffect(()=>{

        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                Alert.alert(``,`실패`);
            }
        });

        get_order_cancel_list(Member).then((res)=>{
            if(res) {
                console.log(res.data,'/ 데이터 확인123');
                const {result, err_msg, gd_cancel} = res.data;
                if(result === 'OK') {
                    let temp = gd_cancel.filter((val)=>val.deli_status !== 'done');
                    set_cancel_list(temp);
                } else {
                    Alert.alert('','연결실패'+err_msg);
                }
            }
        });
    },[Member]);

    console.log(cancel_list,'/ [결제취소 리스트]');


    function CancelList({item}) {
        return(
            <>
                <View style={[styles.order_list_items]}>
                    <View style={[styles.order_list_items]}>
                        <View style={[container]}>
                            {/**--------------------발주번호----------------------------**/}
                            <View style={[flex, styles.mb_5]}>
                                <View style={[styles.wt3]}>
                                    <Text style={[styles.goods_num, styles.ft_16]}> 발주번호 : </Text>
                                </View>
                                <View style={[styles.wt7]}>
                                    <Text
                                        style={[styles.ft_16, styles.fw_6]}>{item.order_no}</Text>
                                </View>
                            </View>
                            {/**--------------------공사명----------------------------**/}
                            <View style={[flex, styles.mb_5]}>
                                <View style={[styles.wt3]}>
                                    <Text style={[styles.Construction_name, styles.ft_14]}> 취소일 :</Text>
                                </View>
                                <View style={[styles.wt7]}>
                                    <Text
                                        style={[styles.ft_14]}>{DateChg(item.reg_date)} {item.reg_time}</Text>
                                </View>
                            </View>
                            {/**--------------------공사명----------------------------**/}
                            <View style={[flex, styles.mb_5]}>
                                <View style={[styles.wt3]}>
                                    <Text style={[styles.Construction_name, styles.ft_14]}> 공사명 :</Text>
                                </View>
                                <View style={[styles.wt7]}>
                                    <Text
                                        style={[styles.ft_14]}>{item.work_name}</Text>
                                </View>
                            </View>

                            {/**--------------------배송지----------------------------**/}
                            <View style={[flex]}>
                                <View style={[styles.wt3]}>
                                    <Text style={[styles.ft_14, item.text_gray]}> 배송지:</Text>
                                </View>
                                <View style={[styles.wt7]}>
                                    <Text style={[styles.ft_14, styles.text_gray]}>
                                        {item.zonecode} {item.addr1} {item.addr2}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.border_b_dotted]}></View>
                        <View style={[container]}>
                            <View style={[flex_between]}>
                                <View style={[styles.wt2]}>
                                    <TouchableOpacity style={[btn_primary, p1,]} onPress={()=>navigation.navigate('취소내역상세',{gd_cancel_uid:item.gd_cancel_uid, gd_order_uid:item.gd_order_uid})}>
                                        <Text style={[text_center, text_white]}>상세내역 </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style="">
                                    <View style={[flex, styles.justify_content_end]}>
                                        {(item.refund_status === 'done') ? (
                                            <>
                                                <Text>처리완료</Text>
                                            </>
                                        ):(
                                            <>
                                                <Text>{cancelType(item.cancel_type)}</Text>
                                            </>
                                        )}
                                        
                                    </View>
                                    <View style="">
                                        <View style={flex}>
                                            <Text style={[h12, styles.color1]}>취소금액 :</Text>
                                            <Text style={[ms1, h18]}>
                                                {Price(item.sum_set_refund_money)}원
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={gray_bar}/>
                    </View>
                </View>
            </>
        );
    }
    return(
        <>
            {/**=================================탭===================================================**/}
            <View style={[styles.Tab, flex, bg_white]}>
                <View style={[styles.InquiryTab_item]}>
                    <TouchableOpacity style={[styles.InquiryTab_link, styles.active_link]} onPress={() => {
                        navigation.navigate('취소내역')
                    }}>
                        <Text style={[styles.InquiryTab_txt, styles.active_txt]}>취소내역</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.InquiryTab_item]}>
                    <TouchableOpacity style={[styles.InquiryTab_link]} onPress={() => {
                        navigation.navigate('반품내역')
                        // Alert.alert('준비중입니다.');
                    }}>
                        <Text style={[styles.InquiryTab_txt]}>반품내역</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/**==============================--리스트--================================================**/}
            <FlatList
                style={[bg_white]}
                keyExtractor={(val) => String(val.gd_cancel_uid)}
                data={cancel_list}
                renderItem={CancelList}
                windowSize={3}
            />
            {/**==============================--하단--================================================**/}
            <Footer navigation={navigation}/>

        </>
    );
}

const styles = StyleSheet.create({
    InquiryTab_item: {
        width: "50%",
    },
    wt4: {
        width: "40%",
    },
    InquiryTab_txt: {
        textAlign: "center",
        fontSize: 16,
        lineHeight: 24,
        paddingBottom: 16.
    },
    InquiryTab_link: {
        borderBottomWidth: 1,
        borderColor: "#ededf1"
    },
    active_txt: {
        color: "#3D40E0",
    },
    active_link: {
        borderBottomWidth: 5,
        borderColor: "#3D40E0"
    },
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
    detail_btn: {
        borderWidth: 1,
        borderColor: "#eee",
        paddingVertical: 8,
        width: "100%",
        borderRadius: 5,
    },
    detail_btn_txt: {
        textAlign: "center",
    },
    text_danger: {
        color: "#f25767"
    },
    text_primary: {
        color: "#4549e0"
    },
    text_gray: {
        color: "#a0aec0",
    },
    wt3: {
        width: "25%",
    },
    wt7: {
        width: "75%",
    },
    color1: {
        color: "#b1b2c3",
    },
    justify_content_end: {
        justifyContent: "flex-end",
    }
});