import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, Button, Platform} from 'react-native';
import {useIsFocused, useNavigationState} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {List} from 'react-native-paper';
import {AccordionList} from "accordion-collapse-react-native";
//이미지 슬라이드
import {ImageSlider} from "react-native-image-slider-banner";
// 공통 CSS 추가
import {
    container,
    bg_white,
    content_wrap,
    min_height,
    padding_bottom,
    ms1,
    flex,
    flex_between, d_flex, justify_content_center
} from '../common/style/AtStyle';

// 이미지 추가
// import logo from '../assets/img/top_logo.png';
import Footer from "./Footer";

import Search from '../icons/search.svg';
import NotificationIcon from "../icons/Notification_icon.svg";
import Main_logo from '../icons/main_logo.svg';
import axios from "axios";
import {At_db, FCM} from "../util/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Wishlist from "../icons/ico_heart_c.svg";
import {ABanner, get_cate_list, get_main_info} from "./UTIL_main";
import {getAppInfo} from "./order/UTIL_order";
import * as Notifications from "expo-notifications";
import {mem_push_token} from "./UTIL_mem";
// import firebase from '@react-native-firebase';

// 2차 카테고리 설정
function Cate2nd({uid,navigation,name}) {


    console.log('카테고리 uid ',uid);
    console.log('제목 ',name);
    const [Cate2nd, setCate2nd] = useState([]);
    useEffect(() => {
        /**------상품리스트 가져오기------**/
        get_cate_list(`2`, uid).then((res) => {
            if (res) {
                const {result, A_cate} = res.data;
                if (result === 'OK') {
                    setCate2nd(A_cate);
                } else {
                    console.log(result);
                    console.log('실패');
                }
            }
        });


    }, []);
    console.log(Cate2nd,' / 2차 카테고리2');
    if(Cate2nd !== null) {
        return (
            <>
                {Cate2nd.map((val, idx) => {
                    let img_src = 'http://zazaero.com'+val.cate_img;
                    console.log(img_src,'/ 이미지 456경로');
                    return(
                        <>
                            <View style={{width: "33%", paddingTop: 20,}} key={idx}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('상품목록', {Cate1stUid: uid, Cate2ndUid: val.ind_cfg_uid, name: name})
                                }}>
                                    {(img_src) &&
                                        <Image style={styles.ct_img} source={{uri:img_src}}/>
                                    }
                                    {/*<Image style={styles.ct_img} source={req}/>*/}
                                    <Text style={styles.Accordion_items_link_txt}>{val.cfg_val1}</Text>
                                    {/*<Text style={styles.Accordion_items_link_txt}>{val.ind_cfg_uid}</Text>*/}
                                </TouchableOpacity>
                            </View>
                        </>
                    );
                })}
            </>
        );
    }
}

// 상품출력 페이지
export default function MainPage({route,navigation}) {
    /**---------------------------개인정보-----------------------------------**/
    const [Member, setMember] = useState();
    const [PushToken, setPushToken] = useState({type:'',key:''});
    const [ExpoToken, setExpoToken] = useState(``);
    const mem_uid = AsyncStorage.getItem("member").then((value) => {setMember(value);});
    // const get_pushk = AsyncStorage.getItem("push_key").then((value) => {setPushToken(value);});
    // 1. member = token 설정
    /**--------------------------------------------------------------**/
    const Update = useIsFocused();
    // 1. 1차 카테고리 추출
    const [Cate1st, setCate1st] = useState([]);   // 1차 카테고리 설정
    // 아코디언 설정
    const [expend, setExpend] = useState(`1`);
    const [com_info, set_com_info] = useState([]);
    // 2. 배너 담기
    const [A_banner, set_A_banner] = useState([]);





    useEffect(() => {

        // expo 푸시키 가져오기
        Notifications.getExpoPushTokenAsync().then((res)=>{setExpoToken(res.data)});
        Notifications.getDevicePushTokenAsync().then((res)=>{setPushToken({type:res.type, key:res.data})});

        /*--------------------------------푸시알림 셋팅-------------------------------------------------*/


        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });

        Notifications.addNotificationReceivedListener((notification) => {
            console.log(notification,'/ 알림 내용확인');
        });

        Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response,'/ 테스트 12');
        });

        Notifications.scheduleNotificationAsync({
            content: {
                title: 'My first local notification',
                body: 'Hello, world!',
                data: { data: 'goes here' },
            },
            trigger: {
                seconds: 5,
            },
        });


        /*--------------------------------푸시알림 셋팅 끝-------------------------------------------------*/
        // 포스트시에 header 셋팅 할것
        get_cate_list(`1`).then((res) => {
            if (res) {
                const {result, A_cate} = res.data;
                if (result === 'OK') {
                    // 1. 1차 카테고리를 담는다
                    setCate1st(A_cate);
                } else {
                    console.log('실패123');
                }
            }
        }).catch((err) => console.log(err));

        /**------------앱정보 가져오기----------------**/
        getAppInfo().then((res)=>{
            if(res) {
                const {result, app_info} = res.data;
                if(result === 'OK') {
                    let {com_info} = app_info
                    set_com_info(com_info);
                } else {
                    Alert.alert('','연결실패');
                }
            }
        });

        /**------------------------배너------------------------**/
        ABanner().then((res)=>{
            if(res) {
                console.log(res);
                const {result, A_banner, query} = res.data;
                if(result === 'OK') {
                    set_A_banner(A_banner);
                    console.log(query,'/123');
                } else {
                    Alert.alert('','에러');
                }
            }
        });

    }, [Member, Update]);


    // ============================2023-03-22================================//
    /*----------------------------------------------------------------------*/
    // ============================푸시알림창=================================//

    // 배포용
    const push_test = (inboundEmail) => {

    };


    let get_link = (link_type, cfg_val1, cfg_val2, cfg_val3, cfg_val4) => {
        console.log(link_type,'/ 링크 타입');
        console.log(cfg_val1,'/1차 카테고리 코드');
        console.log(cfg_val2,'/2차 카테고리 코드');
        console.log(cfg_val3,'/3차 카테고리 코드');
        console.log(cfg_val4,'/4차 카테고리 코드');
        if(!link_type) {
            console.log('링크 없음');
        }
        if(link_type === 'goods_cate') {
            if(!cfg_val1) { return Alert.alert('','링크 넣어주세요.'); }
            return navigation.navigate('상품목록',{Cate1stUid:cfg_val1,Cate2ndUid:cfg_val2,Cate3rd:cfg_val3});
        }
        if(link_type === 'notice') {
            if(!cfg_val1) { return Alert.alert('','링크 넣어주세요.'); }
            return navigation.navigate('공지사항상세',{bd_uid:cfg_val1});
        }
    }

    console.log(A_banner,' / 배너2');
    console.log(com_info.com_name,' / 회사정보');
    console.log(PushToken,' / 일반디바이스 키');
    console.log(ExpoToken,' / 엑스포 키');


    return (
        /*
          return 구문 안에서는 {슬래시 + * 방식으로 주석
        */
        <>
            {/**----------------------------------------해더----------------------------------------**/}
            <View style={styles.top_inner}>
                <View style={[flex_between]}>
                    <View style="">
                        <Main_logo width={65} height={20}/>
                    </View>
                    <View style={flex}>
                        <TouchableOpacity style={styles.link_signUp} onPress={() => {navigation.navigate('검색')}}>
                            <Search width={30} height={21} style={[styles.icon]}/>
                        </TouchableOpacity>
                        <Button title="푸시알림" onPress={()=>push_test()} />
                    </View>
                </View>
            </View>
            {/**----------------------------------------바디----------------------------------------**/}
            <ScrollView style={styles.main_wrap}>
                <ImageSlider
                    data={
                        A_banner.map(val=>{
                            return {
                                img:"http://49.50.162.86:80/"+val.img_url,
                                cfg_val1:val.cfg_val1,
                                cfg_val2:val.cfg_val2,
                                cfg_val3:val.cfg_val3,
                                cfg_val4:val.cfg_val4,
                            }
                        })
                    }
                    onClick={(data)=>get_link(data.cfg_val1,data.cfg_val2,data.cfg_val3,data.cfg_val4)}
                    previewImageStyle={false}
                    caroselImageStyle={{ resizeMode: 'cover', height:180, }}
                    preview={false}
                    autoPlay={false}
                    timer={1000}
                    indicatorContainerStyle={{top: 0}}
                />
                <List.AccordionGroup
                    onAccordionPress={(id)=>setExpend(id)}
                    expandedId={expend}
                    style={styles.Section} >
                    {/*=================1차 카테고리===============*/}
                    {Cate1st.map((val, idx) => (
                        <>
                            <List.Accordion style={[styles.Accordion_tit]}
                                            id={`${idx+1}`}
                                            title={[val.cfg_val1]}
                                            titleStyle={{font:50}}
                                            key={val.ind_cfg_uid}
                            >
                                {/*=================2차 카테고리===============*/}
                                <View style={[styles.w3,d_flex,{flexWrap:"wrap"}]}>
                                    <Cate2nd navigation={navigation}
                                             name={val.cfg_val1}
                                             uid={val.ind_cfg_uid}
                                    />
                                </View>
                            </List.Accordion>
                        </>
                    ))}

                </List.AccordionGroup>


                <View style={styles.main_footer}>
                    <View style={container}>
                        <View style={styles.main_footer_flex}>
                            <View style={styles.main_footer_flex_item}>
                                <TouchableOpacity style={styles.main_footer_link} onPress={() => {
                                    navigation.navigate('약관/개인정보처리방침',{cfg_part2:`access`});
                                }}>
                                    <Text style={styles.main_footer_link_txt}>서비스 이용약관</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.main_footer_flex_item}>
                                <TouchableOpacity style={styles.main_footer_link} onPress={() => {
                                    navigation.navigate('약관/개인정보처리방침',{cfg_part2:`info_mgr`});
                                }}>
                                    <Text style={styles.main_footer_link_txt}>개인정보처리방침</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.main_footer_flex_item}>
                                <TouchableOpacity style={styles.main_footer_link} onPress={() => {
                                    navigation.navigate('약관/개인정보처리방침',{cfg_part2:`ad_acces`});
                                }}>
                                    <Text style={styles.main_footer_link_txt}>홍보 및 마케팅 이용약관</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/*  메인풋터 상단  */}
                        <View style={styles.main_footer_disc}>
                            <Text style={styles.main_footer_disc_txt}>
                                상호명 : {com_info.com_name}
                            </Text>
                            <Text style={styles.main_footer_disc_txt}>
                                대표자명 : {com_info.ceo_name}
                            </Text>
                            <Text style={styles.main_footer_disc_txt}>
                                사업자 번호 : {com_info.biz_no}
                            </Text>
                            <Text style={styles.main_footer_disc_txt}>
                                고객센터 : {com_info.com_phone}
                            </Text>
                            <Text style={styles.main_footer_disc_txt}>
                                이메일 : {com_info.com_email}
                            </Text>
                            <Text style={styles.main_footer_disc_txt}>
                                사업장 주소 : {com_info.addr1} {com_info.addr2}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/**----------------------------------------푸터----------------------------------------**/}

            <Footer navigation={navigation}/>
        </>
    );
}


const styles = StyleSheet.create({
    main_wrap:{
        backgroundColor:"#fff",
    },

    top_inner: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 50,
        marginLeft: 20
    },
    main_footer: {
        backgroundColor: "#F9F9FB",
    },
    main_footer_flex: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    main_footer_link: {
        marginBottom: 10,
    },
    main_footer_link_txt: {
        fontSize: 12,
        color: "#B1B2C3",
    },
    main_footer_disc: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
    },
    main_footer_disc_txt: {
        fontSize: 12,
        lineHeight: 22,
        letterSpacing: -1,
        color: "#999",
        padding: 3,
    },
    Accordion_tit: {
        backgroundColor: "#fff",
        borderBottomWidth: 8,
        borderColor: "#EDEDF1"
    },
    Accordion_items: {
        padding: 12,
        borderBottomWidth: 8,
        borderColor: "#EDEDF1"
    },
    w3: {
        backgroundColor: "#fff",
        flex:1,
        paddingBottom: 12,
        borderBottomWidth: 8,
        borderColor: "#EDEDF1"
    },
    ct_img: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    Accordion_items_link_txt: {
        textAlign: "center",
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        lineHeight: 24,
        color: "#222",
        letterSpacing: -1,
    },
});