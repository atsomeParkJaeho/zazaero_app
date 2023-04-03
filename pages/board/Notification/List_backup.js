import React, {useState} from 'react'
import {View,Text,StyleSheet,Image, TouchableOpacity, ScrollView} from 'react-native'


// 공통 CSS 추가
import {container, bg_white, flex_between, flex, h16, h14, ms1,mb2} from '../../../common/style/AtStyle';
import {sub_page} from '../../../common/style/SubStyle';

// svg 추가
import NotificationIcon from '../../../icons/Notification_icon.svg';
import BackArrow from "../../../icons/back_arrow.svg";




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

    const [state,setState] = useState(NotificationList);


    return(
        <>
            <ScrollView  style={[bg_white,sub_page]}>
                <View style={[styles.Notification]}>
                    <View style="">
                        <View style={styles.NotificationList}>
                            {state.map((items,i)=>
                                <View style={styles.NotificationListItem} key={i}>
                                    <View style={[flex_between,mb2]}>
                                        <View style={flex}>
                                            <NotificationIcon width={16} height={18} style={[styles.icon]} />
                                            <Text style={h16}>{items.title}</Text>
                                        </View>
                                        <View style="">
                                            <Text style={[h14,styles.text_color]}>{items.date}</Text>
                                        </View>
                                    </View>
                                    {/*알림현황*/}
                                    <View style="">
                                       <Text style={[h14,styles.text_color,ms1,styles.text_wet]}>{items.Notification_disc} </Text>
                                    </View>
                                    {/*답변등록*/}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>

    )
}


const styles = StyleSheet.create({
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