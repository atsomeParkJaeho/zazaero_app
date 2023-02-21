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
    FlatList
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
import {DateChg, Price, refundStatus} from "../../util/util";

export default function Cancel({navigation, route}) {
    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    /**1. 주문취소 내역 리스트 출력 **/

    const [CancelList, setCancelList] = useState([]);

    /*
    * 가져올 데이터 발주번호, 공사명, 배송지, 결제금액, 처리상태
    *
    *
    * */

    useEffect(()=>{
        get_order_cancel_list(Member).then((res)=>{
            if(res) {
                console.log(res.data);
                const {result, gd_cancel} = res.data;
                if(result === 'OK') {

                    setCancelList(gd_cancel);
                }
            }
        });
    },[Member]);

    /**2. 반품 내역 리스트 출력 **/
    const goDetail = (gd_cancel_uid) => {
        navigation.replace('취소내역상세',{gd_cancel_uid:gd_cancel_uid});
    }

    console.log(CancelList);

    function CancelItem({item}) {
        return(
            <>
                <View style={[styles.order_list_items]}>
                    <View style={[container]}>
                        {/**--------발주번호--------ㄴ**/}
                        <View style={[flex, styles.mb_5]}>
                            <View style={[styles.wt3]}>
                                <Text style={[styles.goods_num, styles.ft_16]}> 발주번호 : </Text>
                            </View>
                            <View style={[styles.wt7]}>
                                <Text style={[styles.goods_num_val, styles.ft_16, styles.fw_6]}>{item.order_no}</Text>
                            </View>
                        </View>
                        {/**--------공사명--------ㄴ**/}
                        <View style={[flex, styles.mb_5]}>
                            <View style={[styles.wt3]}>
                                <Text style={[styles.Construction_name, styles.ft_14]}> 공사명 :</Text>
                            </View>
                            <View style={[styles.wt7]}>
                                <Text style={[styles.Construction_name_val, styles.ft_14]}>
                                    {item.order_title}
                                </Text>
                            </View>
                        </View>
                        {/**--------배송지--------ㄴ**/}
                        <View style={[flex]}>
                            <View style={[styles.wt3]}>
                                <Text style={[styles.Delivery_destination_name, styles.ft_14]}> 배송지:</Text>
                            </View>
                            <View style={[styles.wt7]}>
                                <Text style={[styles.Delivery_destination_name_val, styles.ft_14, styles.text_gray]}>
                                    {item.addr1} {item.addr2}
                                </Text>
                            </View>
                        </View>
                        {/**--------취소일--------ㄴ**/}
                        <View style={[flex]}>
                            <View style={[styles.wt3]}>
                                <Text style={[styles.Delivery_destination_name, styles.ft_14]}> 취소일:</Text>
                            </View>
                            <View style={[styles.wt7]}>
                                <Text style={[styles.Delivery_destination_name_val, styles.ft_14, styles.text_gray]}>
                                    {DateChg(item.reg_date)} {item.reg_time}
                                </Text>
                            </View>
                        </View>

                    </View>
                    <View style={[styles.border_b_dotted]}></View>
                    <View style={[container]}>
                        <View style={[flex_between]}>
                            <View style={[styles.wt4]}>
                                <TouchableOpacity style={[btn_primary, p1,]} onPress={()=>goDetail(item.gd_cancel_uid)}>
                                    <Text style={[text_center, text_white]}>상세내역 </Text>
                                    <Text style={[text_center, text_white]}>{item.gd_cancel_uid} </Text>
                                </TouchableOpacity>
                            </View>
                            <View style="">
                                <View style={[flex, styles.justify_content_end]}>
                                    {(item.refund_status === 'doing') ? (
                                        <Text style={[h12, styles.order_type, styles.text_danger]}>
                                            {refundStatus(item.refund_status)}
                                        </Text>
                                    ):(
                                        <Text style={[h12, styles.order_type, styles.text_primary]}>
                                            {refundStatus(item.refund_status)}
                                        </Text>
                                    )}
                                </View>
                                <View style="">
                                    <View style={flex}>
                                        <Text style={[h12, styles.color1]}>결제금액 :</Text>
                                        <Text style={[ms1, h18]}>{Price(item.settleprice)}원</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={gray_bar}/>
                </View>
            </>
        );
    }

    return (
        <>
            {/*탭*/}
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
                    }}>
                        <Text style={[styles.InquiryTab_txt]}>반품내역</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/*바디*/}
            {/*플로트 리트스*/}
            <FlatList
            style={[bg_white]}
            keyExtractor={(val) => String(val.goods_uid)}
            data={CancelList}
            renderItem={CancelItem}
            windowSize={3}
            />
            {/*푸터*/}
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