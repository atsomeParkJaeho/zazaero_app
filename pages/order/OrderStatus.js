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
    Alert, FlatList
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
import {DateChg, order_List, ordStatus} from "../../util/util";
import Footer from "../Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {get_order_list} from "./UTIL_order";
import {get_Member} from "../UTIL_mem";


function OrderStatus({route, navigation}) {
    /**-------------------기본 회원정보 셋팅-----------------------**/
    const [Member, setMember]               = useState();

    const Update                            = useIsFocused();
    const [OrderList, setOrderList]         = useState([]);     // 발주내역 출력
    console.log('전달 2값 / ',Member);

    /**---------------------------출력리스트----------------------------------**/
    useEffect(()=>{

        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                Alert.alert(``,`실패`);
            }
        });
        getOrderStatus(Member);

    },[Member, Update]);


    /**-----------------------------발주서정보 출력----------------------------**/
    const getOrderStatus = async (Member) => {
        let {data:{result, A_gd_order, query}} = await get_order_list(Member);
        if(result === 'OK') {
            let temp = A_gd_order.filter(
                val=>
                    val.ord_status === 'ord_ready'  ||
                    val.ord_status === 'ord_doing'  ||
                    val.ord_status === 'ord_edit'
            );
            let desc = temp.sort((a,b)=>{
                return new Date(b.gd_order_uid) - new Date(a.gd_order_uid);
            });
            return setOrderList(desc);
        }
        // return Alert.alert(``,`에러`);
    }

    console.log(OrderList,' / [발주 리스트 출력]');


    function OrdStatusList({item}) {
        return(
            <>
                <View style={[styles.order_list_items]}>
                    <View style={[container]}>
                        {/**-------------------------발주번호----------------------------**/}
                        <View style={[flex, styles.mb_5]}>
                            <View style={[styles.wt3]}>
                                <Text style={[styles.goods_num, h16]}> 발주번호 :</Text>
                            </View>
                            <View style={[styles.wt7]}>
                                <Text style={[styles.goods_num_val, h16, fw600]}>{item.order_no}</Text>
                            </View>
                        </View>
                        {/**-------------------------발주신청일시----------------------------**/}
                        <View style={[flex, styles.mb_5]}>
                            <View style={[styles.wt3]}>
                                <Text style={[styles.Construction_name, h14]}> 신청일시
                                    :</Text>
                            </View>
                            <View style={[styles.wt7]}>
                                <Text style={[styles.Construction_name_val, h14]} numberOfLines={1}>{DateChg(item.order_date)} {item.order_time}</Text>
                            </View>
                        </View>


                        {/**-------------------------공사명----------------------------**/}
                        <View style={[flex, styles.mb_5]}>
                            <View style={[styles.wt3]}>
                                <Text style={[styles.Construction_name, h14]}> 공사명
                                    :</Text>
                            </View>
                            <View style={[styles.wt7]}>
                                <Text style={[styles.Construction_name_val, h14]} numberOfLines={1}>{item.work_name}</Text>
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
                                    style={[styles.Desired_Delivery_Date_val, h14]}>{DateChg(item.hope_deli_date)} {item.hope_deli_time} 도착예정</Text>
                            </View>
                        </View>
                        {/**-------------------------배송지----------------------------**/}
                        <View style={[flex]}>
                            <View style={[styles.wt3]}>
                                <Text style={[styles.Delivery_destination_name, h14, item.text_gray]}> 배송지 :</Text>
                            </View>
                            <View style={[styles.wt7]}>
                                <Text style={[styles.Delivery_destination_name_val, h14, text_gray]}>
                                    {item.addr1} {item.addr2}
                                </Text>
                            </View>
                        </View>
                        {/**-------------------------최근수정일----------------------------**/}
                        {(item.mod_date !== "0000-00-00") && (
                            <>
                                <View style={[flex]}>
                                    <View style={[styles.wt3]}>
                                        <Text style={[styles.Delivery_destination_name, h14, item.text_gray]}> 최근수정일 :</Text>
                                    </View>
                                    <View style={[styles.wt7]}>
                                        <Text style={[styles.Delivery_destination_name_val, h14, text_primary]}>
                                            {item.mod_date} {item.mod_time}
                                        </Text>
                                    </View>
                                </View>
                            </>
                        )}
                    </View>
                    <View style={[styles.border_b_dotted]}></View>
                    <View style={[container]}>
                        <View style={[flex_between]}>
                            <View style="">
                                <TouchableOpacity style={[btn_primary, p1,]} onPress={()=>navigation.navigate('발주상세',{gd_order_uid   :item.gd_order_uid, hope_deli_date :item.hope_deli_date,})}>
                                    <Text style={[text_light]}>상세내역 / 정보변경</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[flex]}>
                                <Text style={[ text_primary,btn_outline_primary,ps1,pe1, h14]}>
                                    {ordStatus(`${item.ord_status}`)}
                                </Text>
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
            {/**--------------------상단----------------**/}

            <View style={[styles.Order,bg_white]}>
                <View style={[flex]}>
                    <TouchableOpacity style={[styles.wt_3, active_link]} onPress={()=>navigation.navigate('발주상태')}>
                        <Text style={[styles.tab_txt,active_txt]}>발주검수</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.wt_3, ]} onPress={()=>navigation.navigate('결제상태')}>
                        <Text style={[styles.tab_txt,]}>결제대기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.wt_3]} onPress={()=>navigation.navigate('배송상태')}>
                        <Text style={[styles.tab_txt]}>배송상태</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/**--------------------메인----------------**/}
            <FlatList
                style={[bg_white]}
                keyExtractor={(val) => String(val.gd_order_uid)}
                data={OrderList}
                renderItem={OrdStatusList}
                windowSize={3}
            />
            {/**--------------------하단----------------**/}
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