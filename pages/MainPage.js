import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { List } from 'react-native-paper';

//이미지 슬라이드
import {ImageSlider} from "react-native-image-slider-banner";

// 공통 CSS 추가
import {container, bg_white, content_wrap, min_height, padding_bottom} from '../common/style/AtStyle';

// 이미지 추가
// import logo from '../assets/img/top_logo.png';
import Footer from "./Footer";
import  col1 from '../assets/img/co1.png';
import  col2 from '../assets/img/co2.png';
import  col3 from '../assets/img/co3.png';




export default function MainPage({navigation, route}) {

    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const cate_list = [ "바닥공사", "욕식공사", "도배공사"];
    const Cate_List2 = [
        {
            "ct_count": "1",                   //카운트
            "ct_img": col1,        //이미지
            "ct_tit": "석고/보드류",        //카테고리명
        },
        {
            "ct_count": "2",                   //카운트
            "ct_img": col2,        //이미지
            "ct_tit": "합판/MDF/OSB",        //카테고리명
        },
        {
            "ct_count": "3",                   //카운트
            "ct_img": col3,        //이미지
            "ct_tit": "각재/구조재",        //카테고리명
        },
        {
            "ct_count": "1",                   //카운트
            "ct_img": col3,        //이미지
            "ct_tit": "몰딩",        //카테고리명
        },
        {
            "ct_count": "2",                   //카운트
            "ct_img": col2,        //이미지
            "ct_tit": "단열재",        //카테고리명
        },
        {
            "ct_count": "3",                   //카운트
            "ct_img": col1,        //이미지
            "ct_tit": "도어/문틀",        //카테고리명
        },

    ];


    return (
        /*
          return 구문 안에서는 {슬래시 + * 방식으로 주석
        */
        <>
            <ScrollView style={styles.main_wrap}>
                <ImageSlider
                    data={[
                        {img: require("../assets/img/main_banner2.jpg")},
                        {img: require("../assets/img/main_banner3.jpg")},
                    ]}
                    localImg={true}
                    previewImageStyle={false}
                    onItemChanged={(item) => console.log("item", item)}

                    caroselImageStyle={{height: 200}}
                    indicatorContainerStyle={{top: -50}}
                    style={{height:500,}}
                />
                <List.Section style={styles.Section}>
                    <List.Accordion style={styles.Accordion_tit} title="목/형틀공사"   expanded={expanded}  onPress={handlePress}>
                        <View style={styles.Accordion_items}>
                            <View style={[styles.Accordion_itemsflex]}>

                                {Cate_List2.map(items =>

                                    <View style={styles.w3}>
                                        <TouchableOpacity style="" onPress={()=>{navigation.navigate('상품목록')}}>
                                            <Image style={styles.ct_img} source={items.ct_img}/>
                                            <Text style={styles.Accordion_items_link_txt}>{items.ct_tit}</Text>
                                        </TouchableOpacity>
                                    </View>

                                )}

                            </View>
                        </View>
                    </List.Accordion>
                    {cate_list.map((items, index) =>
                        <List.Accordion style={styles.Accordion_tit} title={items} key={index}  >
                            <View style={styles.Accordion_items}>
                                <View style={[styles.Accordion_itemsflex]}>
                                    {Cate_List2.map(items =>

                                        <View style={styles.w3}>
                                            <Image style={styles.ct_img} source={items.ct_img}/>
                                            <Text style={styles.Accordion_items_link_txt}>{items.ct_tit}</Text>
                                        </View>

                                    )}
                                </View>
                            </View>
                        </List.Accordion>
                    )}

                </List.Section>

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
        </>
    );
}

const styles = StyleSheet.create({

    main_wrap : {
        paddingBottom:200,
        marginBottom:100,
        backgroundColor:"#fff",
    },

    top_inner: {
        marginTop: 50,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

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
    Section:{
        marginBottom:0,
    },
    Accordion_tit:{
        backgroundColor:"#fff",
        borderBottomWidth:8,
        borderColor:"#EDEDF1"
    },
    Accordion_items:{
        padding:12,
        borderBottomWidth:8,
        borderColor:"#EDEDF1"
    },
    Accordion_itemsflex:{
        flexDirection:"row",
        flexWrap:"wrap",
        alignItems:"center",
    },
    w3:{
        width:"33.333%",
        marginBottom:12,
    },
    ct_img:{
        width:60,
        height:60,
        borderRadius:5,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    Accordion_items_link_txt:{
        textAlign:"center",
        fontSize:14,
        lineHeight:24,
        color:"#222",
        letterSpacing:-1,
    }

});