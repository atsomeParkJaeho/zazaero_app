import React, {useState, useEffect, useRef} from 'react';
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
import {useIsFocused} from '@react-navigation/native';

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
    btn_outline_gray, btn_primary, p1, text_light, h16, fw600, h14, d_flex, justify_content_end, text_center, mb1, h12
} from '../../common/style/AtStyle';
import {sub_page, gray_bar} from '../../common/style/SubStyle';

// 샘플데이터
import {DateChg, deliStatus, order_List, ordStatus, Price} from "../../util/util";
import axios from "axios";
import Footer from "../Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {get_Member} from "../UTIL_mem";
import {get_order_list} from "./UTIL_order";
import HomeLogoAt from "../../icons/home_logo_at.svg";
import HomeLogo from "../../icons/home_logo.svg";
import Spinner from "../board/inquiry/spiner";


function DeliStatus({route, navigation}) {
    /**-------------------기본 회원정보 셋팅-----------------------**/
    const [Member, setMember]               = useState();
    const Update                            = useIsFocused();
    const [OrderList, setOrderList]         = useState([]);     // 발주현황 출력
    const [get_page, set_page]              = useState();           // 전체 페이지
    const [now_page, set_now_page]          = useState();           // 현재 페이지
    /**--------------------스크롤 설정----------------------**/
    const scrollViewRef = useRef();
    const [scrollEndReached, setScrollEndReached] = useState(false);

    console.log('전달 2값 / ',Member);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 10; // adjust the value as needed

        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

        if (isEndReached && !scrollEndReached) {
            setScrollEndReached(true);
            // Alert.alert(``,`스크롤 끝`);
            /**----------------기존 스테이터스에 데이터를 추가한다.----------------**/
            let next_page = Number(now_page + 1);
            if(Number(get_page) === 1) {
                return console.log(`1페이지만 존재합니다.`);
            } else if(Number(now_page) >= Number(get_page) ) {
                return console.log(`마지막 페이지 입니다.`);
            } else {
                get_order_list(Member,next_page).then((res)=>{
                    if(res) {
                        const {result, A_gd_order, query, total_page, now_page} = res.data;
                        if(result === 'OK') {
                            let temp = A_gd_order.filter(
                                val=>
                                    val.ord_status === 'pay_done'  ||
                                    val.ord_status === 'deli_ready'  ||
                                    val.ord_status === 'deli_doing' ||
                                    val.ord_status === 'deli_done'
                            );
                            let desc = temp.sort((a,b)=>{
                                return new Date(b.gd_order_uid) - new Date(a.gd_order_uid);
                            });
                            set_page(total_page);
                            set_now_page(next_page);
                            setOrderList([...OrderList, ...desc]);
                        } else {
                            return Alert.alert(``,`${result}`);
                        }
                    }
                });

            }
        } else if (!isEndReached && scrollEndReached) {
            setScrollEndReached(false);
        }
    };

    /**---------------------------출력리스트----------------------------------**/
    useEffect(()=>{

        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                Alert.alert(``,`실패`);
            }
        });
        getOrderStatus(Member,``);

    },[Member, Update]);


    /**-----------------------------발주서정보 출력----------------------------**/
    const getOrderStatus = async (Member,page) => {
        let {data:{result, A_gd_order, query, total_page, now_page}} = await get_order_list(Member,page);
        if(result === 'OK') {
            let temp = A_gd_order.filter(
                val=>
                    val.ord_status === 'pay_done'  ||
                    val.ord_status === 'deli_ready'  ||
                    val.ord_status === 'deli_doing' ||
                    val.ord_status === 'deli_done'
            );
            let desc = temp.sort((a,b)=>{
                return new Date(b.gd_order_uid) - new Date(a.gd_order_uid);
            });
            set_page(total_page);
            set_now_page(now_page);
            setOrderList(desc);
        }
        // return Alert.alert(``,`에러`);
    }

    console.log(OrderList,' / [발주 리스트 출력1]');
    console.log(get_page,' / [전체 페이지]');
    console.log(now_page,' / [현재 페이지]');

    return (
        <>
            {/**--------------------상단----------------**/}

            <View style={[styles.Order,bg_white]}>
                <View style={[flex]}>
                    <TouchableOpacity style={[styles.wt_3]} onPress={()=>navigation.navigate('발주현황')}>
                        <Text style={[styles.tab_txt]}>발주검수</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.wt_3]} onPress={()=>navigation.navigate('결제상태')}>
                        <Text style={[styles.tab_txt]}>결제대기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.wt_3,active_link]} onPress={()=>navigation.navigate('배송상태')}>
                        <Text style={[styles.tab_txt,active_txt]}>배송상태</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/**--------------------메인----------------**/}
            <ScrollView
                style={[bg_white]}
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/**반복문 구간**/}
                {(!OrderList) ? (
                    <>
                        <Spinner/>
                    </>
                ):(
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
                                                <Text style={[styles.Construction_name_val, h14]} numberOfLines={1}>{val.work_name}</Text>
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
                                        {(val.mod_date !== "0000-00-00") && (
                                            <>
                                                <View style={[flex]}>
                                                    <View style={[styles.wt3]}>
                                                        <Text style={[styles.Delivery_destination_name, h14, val.text_gray]}> 최근수정일 :</Text>
                                                    </View>
                                                    <View style={[styles.wt7]}>
                                                        <Text style={[styles.Delivery_destination_name_val, h14, text_primary]}>
                                                            {val.mod_date} {val.mod_time}
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
                                                <TouchableOpacity style={[btn_primary, p1,]}
                                                                  onPress={()=>navigation.navigate('발주상세',{
                                                                      gd_order_uid   :val.gd_order_uid,
                                                                      hope_deli_date :val.hope_deli_date,
                                                                  })}
                                                >
                                                    <Text style={[text_light]}>
                                                        {(val.deli_status === 'ready') && (
                                                            <>상세내역 / 추가발주</>
                                                        )}
                                                        {(val.deli_status === 'doing') && (
                                                            <>상세내역</>
                                                        )}
                                                        {(val.deli_status === 'done' && val.disable_cancel === 'Y') && (
                                                            <>상세내역</>
                                                        )}
                                                        {(val.deli_status === 'done' && val.disable_cancel === 'N') && (
                                                            <>상세내역 / 반품신청</>
                                                        )}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={[]}>
                                                <View style={[flex,justify_content_end]}>
                                                    <Text style={[ text_primary,btn_outline_primary,text_center,ps1,pe1,mb1, h14]}>
                                                        {deliStatus(`${val.deli_status}`)}
                                                    </Text>
                                                </View>
                                                <View style={[d_flex]}>
                                                    <Text>결제금액 :</Text>

                                                    {(val.settleprice === '0') ? (
                                                        <>
                                                            <Text style={[text_primary]}> 전액 포인트결제</Text>
                                                        </>
                                                    ):(
                                                        <>
                                                            <Text>{Price(val.settleprice)}원</Text>
                                                        </>
                                                    )}

                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={gray_bar}/>
                                </View>
                            </>
                        ))}
                    </>
                )}

                {(scrollEndReached && Number(get_page) >  1) && (
                    <>
                        {(Number(get_page) === Number(now_page)) ? (
                            <></>
                        ):(
                            <Spinner/>
                        )}

                    </>
                )}
            </ScrollView>
            {/**--------------------하단----------------**/}
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