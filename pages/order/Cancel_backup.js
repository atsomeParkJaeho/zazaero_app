import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, CheckBox, Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';


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

// 샘플데이터
import {cancel_List, order_List} from "../../util/util";


export default function Cancel({navigation, route}) {

    const [CancelList, setOrderList] = useState(cancel_List);     // 발주내역 출력


   // console.log(CancelList);

    return (
        <>
            <View style={[bg_white, sub_page]}>
                <View style={[styles.Cancel]}>
                    <View style={[styles.Tab, flex]}>
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
                            }}>
                                <Text style={[styles.InquiryTab_txt]}>반품내역</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*상단탭*/}
                    <ScrollView style="">
                        <View style={[styles.cancel_list]}>


                            {CancelList.map((val, i) => (

                                <>
                                    <View style={[styles.order_list_items]} key={i}>
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
                                                    <Text style={[styles.Construction_name, styles.ft_14]}> 공사명 :</Text>
                                                </View>
                                                <View style={[styles.wt7]}>
                                                    <Text
                                                        style={[styles.Construction_name_val, styles.ft_14]}>{val.Construction_name}</Text>
                                                </View>
                                            </View>
                                            {/*공사명*/}
                                            <View style={[flex]}>
                                                <View style={[styles.wt3]}>
                                                    <Text style={[styles.Delivery_destination_name, styles.ft_14, val.text_gray]}> 배송지:</Text>
                                                </View>
                                                <View style={[styles.wt7]}>
                                                    <Text style={[styles.Delivery_destination_name_val, styles.ft_14, styles.text_gray]}>{val.Delivery_destination_name}</Text>
                                                </View>
                                            </View>
                                            {/*배송지*/}
                                        </View>
                                        <View style={[styles.border_b_dotted]}></View>
                                        <View style={[container]}>
                                            <View style={[flex_between]}>
                                                <View style={[styles.wt4]}>
                                                    <TouchableOpacity style={[btn_primary, p1,]}
                                                                      onPress={() => navigation.navigate('취소내역상세')}>
                                                        <Text style={[text_center, text_white]}>상세내역 </Text>
                                                    </TouchableOpacity>

                                                </View>
                                                <View style="">
                                                    <View style={[flex, styles.justify_content_end]}>

                                                        {(val.cancel_type == 'doing') ? (
                                                            <Text style={[h12, styles.order_type, styles.text_danger]}>처리중</Text>
                                                        ) : (
                                                            <Text style={[h12, styles.order_type, styles.text_primary]}>처리완료</Text>
                                                        )}

                                                    </View>
                                                    <View style="">
                                                        <View style={flex}>
                                                            <Text style={[h12, styles.color1]}>결제금액 :</Text>
                                                            <Text style={[ms1, h18]}>1,300,000</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={gray_bar}/>
                                    </View>
                                </>
                            ))}
                            <View style={[padding_bottom]}/>
                        </View>
                    </ScrollView>
                    {/*취소내역*/}
                </View>
            </View>
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