import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    flex,
    wt6,
    wt1,
    wt3,
    wt5,
    wt2,
    text_center,
    h16,
    mt2,
    pt1,
    pb1,
    h14,
    ps1,
    text_primary,
    wt8,
    pt2,
    pb2,
    bg_primary,
    ms1,
    me1,
    mb1,
    text_white,
    text_right,
    text_light,
    text_info,
    text_gray,
    wt7,
    h15,
    flex_top,
    text_black,
    h18,
    h17,
    fw500,
    text_left,
    mt1,
    flex_end,
    text_warning,
    text_secondary,
    text_danger,
    text_success,
    border1,
    border_gray,
    wt4,
    border_success,
    border_primary, border_danger, border_warning, border_black
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';
import Wishlist from "../../icons/ico_heart_c.svg";
import WishlistNon from "../../icons/ico_heart_nc.svg";
import {get_Member, get_my_point_log} from "../UTIL_mem";
import {get_order_list} from "../order/UTIL_order";
import {DateChg, Price} from "../../util/util";
import Spinner from "../board/inquiry/spiner";


export default function WorkNameList({route, navigation}) {

    const {work_uid} = route.params
    const [Member, setMember] = useState(``);
    const [order_list, set_order_list] = useState([]);        // 주문리스트 스테이터스
    const [get_page, set_page]              = useState();           // 전체 페이지
    const [now_page, set_now_page]          = useState();           // 현재 페이지

    /**--------------------스크롤 설정----------------------**/
    const scrollViewRef = useRef();
    const [scrollEndReached, setScrollEndReached] = useState(false);

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
                console.log('1페이지만 있습니다.');
            } else if(Number(now_page) >= Number(get_page) ) {
                return Alert.alert(``,`마지막 페이지 입니다.`);
            } else {
                get_order_list(Member,next_page,work_uid).then((res)=>{
                    if(res) {
                        const {result, A_gd_order, query, total_page, now_page}  = res.data;
                        if(result === 'OK') {
                            set_order_list([...order_list, ...A_gd_order]);
                            set_page(total_page);           // 전체페이지
                            set_now_page(next_page);       // 현재페이지
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

    useEffect(()=>{
        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                // Alert.alert(``,`로그인 후 확인 가능합니다.`);
            }
        });
        get_order_list(Member,``,work_uid).then((res)=>{
            if(res) {
                const {result, A_gd_order, query, total_page, now_page}  = res.data;
                if(result === 'OK') {
                    set_order_list(A_gd_order);
                    set_page(total_page);     // 전체페이지
                    set_now_page(now_page);       // 현재페이지
                } else {
                    // return Alert.alert(``,`${result}`);
                }
            }
        });



    },[Member]);

    console.log(work_uid,'/공사명 uid');
    console.log(Member,'/회원코드');
    // console.log(order_list,'/발주목록');
    console.log(get_page,'/전체페이지');
    console.log(now_page,'/현재 페이지');

    return  (
        <>
            <ScrollView style={[bg_white]}
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            >
                <View style={[styles.ConstructionStatus_DetailList]}>
                    <View style={[mt2]}>
                        {/**----------반복문 구간--------------**/}
                        {order_list.map((val,idx)=>(
                            <>
                                <TouchableOpacity onPress={() => {navigation.navigate('발주상세',{gd_order_uid:val.gd_order_uid})}}>
                                    <View style={[styles.bg,ms1,me1,mb1,styles.border_raound]}>
                                        <View style={[]}>
                                            <View style={[flex_top]}>
                                                <View style={[wt7]}>
                                                    <Text style={[h14,text_black]}>발주번호</Text>
                                                    <Text style={[h15,text_black,fw500]} >{val.order_no}</Text>
                                                </View>
                                                <View style={[wt3]}>
                                                    <Text style={[h14,text_black,text_right]}>{DateChg(val.reg_date)} {val.reg_time}</Text>
                                                </View>
                                            </View>

                                            <View style={[flex_end,mt1]}>
                                                <View style={[wt3]}>
                                                    <Text style={[h15,fw500,border_warning]} >
                                                        {val.ord_status_name}
                                                    </Text>
                                                    <Text style={[h15,fw500,border_warning]} >
                                                        {val.work_name}
                                                    </Text>
                                                </View>
                                                <View style={[wt7]}>
                                                    <Text style={[text_right,h14,text_black]}>총 금액</Text>
                                                    <Text style={[text_right,h17,text_black,fw500]}>{Price(val.settleprice)}원</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </>
                        ))}
                        <View style={[mt2]}/>
                    </View>
                </View>
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

        </>
    );
}

const styles = StyleSheet.create({
    MyPoint_list_item:{
        paddingVertical:16,
        paddingHorizontal:20,
    },
    MyPoint_title:{
        fontSize: Platform.OS === 'ios' ? 16 : 15,
        lineHeight:24,
        color:"#333",
    },
    MyPoint_date:{
        fontSize:12,
        lineHeight:22,
        color:"#B1B2C3",
    },
    MyPoint_Score:{
        fontSize: Platform.OS === 'ios' ? 16 : 15,
        lineHeight:24,
    },
    MyPoint_Score_p:{
        color:"#4549e0",
    },
    MyPoint_Score_m:{
        color:"#f25767",
    },
    ios_pb:{
        paddingBottom: Platform.OS === 'ios' ? 17 : 0,
    },
    border_bottom:{
        borderBottomWidth:1,
        borderColor:"#000",
    },
    border_bottom2:{
        borderBottomWidth:1,
        borderColor:"#ccc",
    },
    border_raound:{
        borderRadius:10,
        paddingTop:10,
        paddingBottom:20,
        paddingHorizontal:10,
    },
    bg:{
        backgroundColor:"#ededf1",
    }
});