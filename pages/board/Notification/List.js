import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Alert, Platform} from 'react-native'


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    flex,
    h16,
    h14,
    ms1,
    mb2,
    d_flex,
    justify_content_between, align_items_start, bg_danger
} from '../../../common/style/AtStyle';
import {sub_page} from '../../../common/style/SubStyle';

// svg 추가
import NotificationIcon from '../../../icons/Notification_icon.svg';
import BackArrow from "../../../icons/back_arrow.svg";
import {get_Member} from "../../UTIL_mem";
import {push_badge, push_list, push_read} from "../../../push/UTIL_push";
import {DateChg} from "../../../util/util";
import {get_goods_list} from "../../goods/UTIL_goods";
import notifee from "@notifee/react-native";
import {useIsFocused} from "@react-navigation/native";




export default function NotificationList({route,navigation}){

    const NotificationList = [
        {
            "user_id": "1",                                  //아이디값
            "title": "1:1문의 알림",                            //제목
            "date": "1시간 전",                                  //날짜
            "Notification_type": "inquiry",                     //알림타입
            "Notification_val": "y",                     //알림답변등록상태
            "Notification_disc": "관리자에 의해 1:1 문의 답변이 등록되었습니다.",                     //알림답변등록상태
        },
        {
            "user_id": "1",                                  //아이디값
            "title": "반품일정 알림",                            //제목
            "date": "1일 전",                                  //날짜
            "Notification_type": "inquiry",                     //알림타입
            "Notification_val": "y",                     //알림답변등록상태
            "Notification_disc": "반품 수거일이 등록되었습니다. 수거정보를 확인해주세요",                     //알림답변등록상태
        },
        {
            "user_id": "1",                                  //아이디값
            "title": "환불완료 알림",                            //제목
            "date": "2일 전",                                  //날짜
            "Notification_type": "inquiry",                     //알림타입
            "Notification_val": "y",                     //알림답변등록상태
            "Notification_disc": "취소 및 반품 자재의 환불이 완료되었습니다.",                     //알림답변등록상태
        },
        {
            "user_id": "1",                                  //아이디값
            "title": "배송완료 알림",                            //제목
            "date": "3일 전",                                  //날짜
            "Notification_type": "inquiry",                     //알림타입
            "Notification_val": "y",                     //알림답변등록상태
            "Notification_disc": "배송 완료된 발주가 있습니다.",                     //알림답변등록상태
        },
        {
            "user_id": "1",                                  //아이디값
            "title": "배차완료 알림",                            //제목
            "date": "4일 전",                                  //날짜
            "Notification_type": "inquiry",                     //알림타입
            "Notification_val": "y",                     //알림답변등록상태
            "Notification_disc": "배차가 완료되었습니다. 요청하신 배송일시에 도착하겠습니다.",                     //알림답변등록상태
        },
        {
            "user_id": "1",                                  //아이디값
            "title": "결제요청 알림",                            //제목
            "date": "5일 전",                                  //날짜
            "Notification_type": "inquiry",                     //알림타입
            "Notification_val": "y",                     //알림답변등록상태
            "Notification_disc": "요청사항, 배송비가 확인되어 결제가 가능합니다. 결제 후 배송준비가 시작됩니다.",                     //알림답변등록상태
        },
    ];
    const [Member, setMember]                           = useState();
    const [get_push_list, set_push_list]                = useState([]);    // 1. 푸시리스트 출력
    const [get_page, set_page]                          = useState();               // 전체페이지
    const [now_page, set_now_page]                      = useState();               // 현재페이지
    const [scrollEndReached, setScrollEndReached]       = useState(false);
    const Update                                        = useIsFocused();

    useEffect(()=>{
        get_Member().then((res)=>{
            if(res) {
                return setMember(res);
            } else {
                return navigation.replace(`로그인`);
            }
        });
        push_list(Member,``).then((res)=>{
            if(res) {
                const {result, now_page, total_page, A_push_msg} = res.data;
                if(result === 'OK') {
                    set_page(total_page);
                    set_now_page(now_page);
                    set_push_list(A_push_msg);
                    // Alert.alert(`알림리스트`,`${JSON.stringify(A_push_msg)}`);
                }
            }
        });
    },[Member,Update]);

    const handleScroll = async () => {
        setScrollEndReached(false);
        let next_page = Number(now_page + 1);
        if(Number(get_page) === 1 ) {

        } else if(Number(now_page) >= Number(get_page)) {

        } else {
            push_list(Member,next_page).then((res)=>{
                if(res) {
                    const {result, now_page, total_page, A_push_msg} = res.data;
                    if(result === 'OK') {
                        set_page(total_page);
                        set_now_page(now_page);
                        set_push_list([...get_push_list, ...A_push_msg]);
                    }
                }
            });
        }
    };
    // 2. 클릭시 페이지 링크 이동
    const goLink = (gd_type, gd_order_uid, gd_cancel_uid, push_msg_uid, msg_type, msg_link_uid) => {
        console.log('페이지 이동');


        if(gd_type === 'order') {
            // 1. 읽은 처리
            push_read(Member,push_msg_uid).then((res)=>{
                if(res) {
                    const {result} = res.data;
                    if(result === 'OK') {
                        // 2. 페이지 이동
                        if(Member === '116' || Member === '97' || Member === '105') {
                            Alert.alert(``,`${JSON.stringify(res.data)}`);
                        }
                        push_badge(Member).then((res)=>{
                            if(res) { notifee.setBadgeCount(Number(res.data.new_push_cnt)) }
                        });
                        return navigation.navigate(`발주상세`,{gd_order_uid:gd_order_uid});
                    } else {
                        // return Alert.alert(``,`${result}`);
                    }
                }
            });
        } else if(gd_type === 'cancel') {
            // 1. 읽은 처리
            push_read(Member,push_msg_uid).then((res)=>{
                if(res) {
                    const {result} = res.data;
                    if(result === 'OK') {
                        // 2. 페이지 이동
                        if(Member === '116' || Member === '97' || Member === '105') {
                            Alert.alert(``,`${JSON.stringify(res.data)}`);
                        }
                        push_badge(Member).then((res)=>{
                            if(res) { notifee.setBadgeCount(Number(res.data.new_push_cnt)) }
                        });
                        return navigation.navigate(`취소내역상세`,{gd_cancel_uid:gd_cancel_uid});
                    } else {
                        // return Alert.alert(``,`${result}`);
                    }
                }
            });
        } else if(msg_type === 'inquiry_reply_done') {
            push_read(Member,push_msg_uid).then((res)=>{
                if(res) {
                    const {result} = res.data;
                    if(result === 'OK') {
                        // 2. 페이지 이동
                        if(Member === '116' || Member === '97' || Member === '105') {
                            Alert.alert(``,`${JSON.stringify(res.data)}`);
                        }
                        push_badge(Member).then((res)=>{
                            if(res) { notifee.setBadgeCount(Number(res.data.new_push_cnt)) }
                        });
                        return navigation.navigate(`1:1문의상세`,{bd_uid:msg_link_uid});
                    } else {
                        // return Alert.alert(``,`${result}`);
                    }
                }
            });
        } else if(msg_type === 'mem_point_list' && gd_type === 'order') {
            push_read(Member,push_msg_uid).then((res)=>{
                if(res) {
                    const {result} = res.data;
                    if(result === 'OK') {
                        // 2. 페이지 이동
                        if(Member === '116' || Member === '97' || Member === '105') {
                            Alert.alert(``,`${JSON.stringify(res.data)}`);
                        }
                        push_badge(Member).then((res)=>{
                            if(res) { notifee.setBadgeCount(Number(res.data.new_push_cnt)) }
                        });
                        return navigation.navigate(`포인트내역`);
                    } else {
                        // return Alert.alert(``,`${result}`);
                    }
                }
            });
        } else if(msg_type === 'mem_point_list' && gd_type === 'cancel') {
            push_read(Member,push_msg_uid).then((res)=>{
                if(res) {
                    const {result} = res.data;
                    if(result === 'OK') {
                        // 2. 페이지 이동
                        if(Member === '116' || Member === '97' || Member === '105') {
                            Alert.alert(``,`${JSON.stringify(res.data)}`);
                        }
                        push_badge(Member).then((res)=>{
                            if(res) { notifee.setBadgeCount(Number(res.data.new_push_cnt)) }
                        });
                        return navigation.navigate(`포인트내역`);
                    } else {
                        // return Alert.alert(``,`${result}`);
                    }
                }
            });
        }
    }

    function PushList({item}) {
        return (
            <>
                <TouchableOpacity onPress={()=>goLink(item.gd_type, item.gd_order_uid, item.gd_cancel_uid, item.push_msg_uid, item.msg_type, item.msg_link_uid)}>
                    <View style={styles.NotificationListItem}>
                        <View style={[flex_between,mb2]}>
                            <View style={[flex,{position:"relative"}]}>
                                <NotificationIcon width={16} height={18} style={[styles.icon]} />
                                {/*알람제목*/}
                                {(item.read_flag === 'N') && (
                                    <View style={[styles.readFlag,bg_danger]}></View>
                                )}
                                <Text style={h16}>{item.title}</Text>
                            </View>
                            <View style="">
                                {/*알림일시*/}
                                <Text style={[h14,styles.text_color]}>{DateChg(item.reg_date)} {item.reg_time}</Text>
                            </View>
                        </View>
                        <View style={[d_flex,justify_content_between, align_items_start]}>
                            <View style={{flex:1}}>
                                {/*알람내용*/}
                                <Text style={[h14,styles.text_color,ms1,styles.text_wet]}>{item.msg}</Text>
                            </View>

                        </View>
                        {/*답변등록*/}
                    </View>
                </TouchableOpacity>
            </>
        );
    }
    return(
        <>
            <FlatList
                style={[bg_white,sub_page]}
                data={get_push_list}
                keyExtractor={(val) => String(val.push_msg_uid)}
                renderItem={PushList}
                windowSize={3}
                onEndReached={()=>{
                    setScrollEndReached(true);
                    handleScroll();
                }}
            />
        </>
    )
}


const styles = StyleSheet.create({
    del_btn:{borderWidth:1, flex:0.2, padding:10, textAlign:"center"},
    readFlag:{
        width:5,
        height:5,
        lineHeight:5,
        zIndex:99,
        left:0,
        top:0,
        position:"absolute",
        overflow:"hidden",
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        ...Platform.select({
            ios:{
                shadowRadius:5,
                borderRadius:5,
            }
        }),
    },
    icon:{
        marginRight:10,
    },
    text_color:{
        color:"#B1B2C3",
    },
    NotificationListItem:{
        paddingVertical:20,
        paddingHorizontal:16,
        borderBottomWidth:1,
        borderColor:"#ccc",
    },
    text_wet:{
        fontWeight:"200",
    }
})