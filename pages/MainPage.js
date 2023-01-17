import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
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
import {At_db} from "../util/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Wishlist from "../icons/ico_heart_c.svg";

//import main1 from '../assets/img/main_1.png'



// 2차 카테고리 설정
function Cate2nd({uid,navigation,name}) {
    console.log('카테고리 uid ',uid);
    console.log('제목 ',name);
    const [Cate2nd, setCate2nd] = useState([]);
    useEffect(() => {
        let data = {
            act_type: "goods_cate",
            ind_cfg_uid: uid,
        };
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_cate_2nd} = res.data;
                if (result === 'OK') {
                    setCate2nd(A_cate_2nd);
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
                    let img_src = 'http://zazaero.com'+val.img_src;
                    console.log(img_src,'/ 이미지 경로');
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
                                    <Text style={styles.Accordion_items_link_txt}>{val.ind_cfg_uid}</Text>
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
export default function MainPage({navigation, route}) {


    // 1. 1차 카테고리 추출
    const [Cate1st, setCate1st] = useState([]);   // 1차 카테고리 설정
    // 아코디언 설정
    const [expend, setExpend] = useState(`1`);
    useEffect(()=>{
        setExpend(`1`);
    },[]);

    useEffect(() => {
        const data = {
            act_type: "goods_cate",
        }
        // 포스트시에 header 셋팅 할것
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_cate_1st} = res.data;
                if (result === 'OK') {
                    // 1. 1차 카테고리를 담는다
                    setCate1st(A_cate_1st);

                } else {
                    console.log('실패');
                }
            }
        }).catch((err) => console.log(err));
    }, []);

    // console.log('1차 카테고리', Cate1st);

    return (
        /*
          return 구문 안에서는 {슬래시 + * 방식으로 주석
        */
        <>
            <View style={styles.top_inner}>
                <View style={[flex_between]}>
                    <View style="">
                        <Main_logo width={65} height={20}/>
                    </View>
                    <View style={flex}>
                        <TouchableOpacity style={styles.link_signUp} onPress={() => {navigation.navigate('검색')}}>
                            <Search width={30} height={21} style={[styles.icon]}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.link_signUp} onPress={() => {
                            navigation.navigate('알림')
                        }}>
                            <NotificationIcon width={30} height={21} style={[styles.icon, ms1]}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.main_wrap}>
                <ImageSlider
                    data={[
                        {img: require("../assets/img/main_banner1.jpg")},
                        {img: require("../assets/img/main_banner2.jpg")},
                        {img: require("../assets/img/main_banner3.jpg")},
                    ]}
                    localImg={true}
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
                                    <Cate2nd
                                        navigation={navigation}
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
                                    navigation.navigate('회원가입')
                                }}>
                                    <Text style={styles.main_footer_link_txt}>서비스 이용약관</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.main_footer_flex_item}>
                                <TouchableOpacity style={styles.main_footer_link} onPress={() => {
                                    navigation.navigate('메인페이지')
                                }}>
                                    <Text style={styles.main_footer_link_txt}>개인정보처리방침</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.main_footer_flex_item}>
                                <TouchableOpacity style={styles.main_footer_link} onPress={() => {
                                    navigation.navigate('메인페이지')
                                }}>
                                    <Text style={styles.main_footer_link_txt}>전자금융거래 이용약관</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/*  메인풋터 상단  */}
                        <View style={styles.main_footer_disc}>
                            <Text style={styles.main_footer_disc_txt}>상호명 : (주 스타키움)</Text>
                            <Text style={styles.main_footer_disc_txt}>대표자명 : 이정환</Text>
                            <Text style={styles.main_footer_disc_txt}>사업자 번호 : 899-87-01114</Text>
                            <Text style={styles.main_footer_disc_txt}>고객센터 : 1666-7099</Text>
                            <Text style={styles.main_footer_disc_txt}>이메일 : daengmo9@starchium.com</Text>
                            <Text style={styles.main_footer_disc_txt}>사업장 주소 : 경기 성남시 수정구 대왕판교로 815 (시흥동) 7층 776호</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation}/>
            {/*========상품즐겨찾기 체크시=========*/}
            {/*<View style={[styles.Notification]}>*/}
            {/*    <View style={[styles.Notification_box]}>*/}
            {/*        <Text style={styles.Notification_box_txt} >로그인 완료</Text>*/}
            {/*    </View>*/}
            {/*</View>*/}
        </>
    );
}


const styles = StyleSheet.create({

    main_wrap: {
        paddingBottom: 200,
        marginBottom: 100,
        backgroundColor: "#fff",
    },

    top_inner: {
        paddingVertical: 20,
        paddingHorizontal: 16,

        backgroundColor: "#fff",
    },
    main_logo: {
        width: 65,
        height: 20,
    },
    me_10: {
        marginRight: 8,
    },
    top_innertwo: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    title: {
        //폰트 사이즈
        fontSize: 20,
        //폰트 두께
        fontWeight: '700',
        //위 공간으로 부터 이격
        marginTop: 50,
        //왼쪽 공간으로 부터 이격'
        marginLeft: 20
    },
    logoimg: {
        //컨텐츠의 넓이 값
        width: 65,
        //컨텐츠의 높이 값
        height: 20,
    },
    mainImage: {
        //컨텐츠의 넓이 값
        width: '100%',
        //컨텐츠의 높이 값
        height: 200,
        //컨텐츠의 모서리 구부리기
        borderRadius: 0,
        marginTop: 20,
        //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
        //각 속성의 값들은 공식문서에 고대로~ 나와 있음
        alignSelf: "center"
    },
    middleContainer: {
        marginTop: 20,
        marginLeft: 10,
        height: 60
    },
    middleButton01: {
        width: 100,
        height: 50,
        padding: 15,
        backgroundColor: "#fdc453",
        borderColor: "deeppink",
        borderRadius: 15,
        margin: 7
    },
    middleButton02: {
        width: 100,
        height: 50,
        padding: 15,
        backgroundColor: "#fe8d6f",
        borderRadius: 15,
        margin: 7
    },
    middleButton03: {
        width: 100,
        height: 50,
        padding: 15,
        backgroundColor: "#9adbc5",
        borderRadius: 15,
        margin: 7
    },
    middleButton04: {
        width: 100,
        height: 50,
        padding: 15,
        backgroundColor: "#f886a8",
        borderRadius: 15,
        margin: 7
    },
    middleButtonText: {
        color: "#fff",
        fontWeight: "700",
        //텍스트의 현재 위치에서의 정렬
        textAlign: "center"
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
    Section: {
        marginBottom: 0,
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
    Accordion_itemsflex: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    w3: {
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
    Notification: {
        position: "absolute",
        left: "50%",
        bottom: Platform.OS === 'ios' ? 120 : 100,
        zIndex: 50,
        width: "100%",
        transform: [{ translateX: -100 }],
    },
    Notification_box:{
        width:200,
        paddingVertical:12,
        paddingHorizontal:25,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        borderRadius:50,
    },
    Notification_box_txt:{
        textAlign:"center",
        color:"#fff",
    },
});