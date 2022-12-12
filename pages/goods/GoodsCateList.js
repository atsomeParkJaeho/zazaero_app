import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Checkbox from 'expo-checkbox';
import logo from "../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import CartBag from "../../icons/cart_bag.svg";
import Chk from "../../icons/chk.svg";


import goods_img_1 from '../../assets/img/goods_img_1.png';
import goods_like from '../../assets/img/ico_heart.png';
import Footer from "../Footer";
import {align_items_center, bg_danger, bg_gray, bg_light, bg_primary, btn_circle, container, d_flex, h18, justify_content_center, min_height, sub_page, text_light} from "../../common/style/AtStyle";
import {goodsList} from "../../util/util";
import {CheckBox} from "react-native-web";


export default function GoodsCateList({navigation}) {


    const [GoodsList, setGoodsList] = useState([]);  // 자재리스트 설정


    useEffect(() => {
        setGoodsList(goodsList);
    }, []);

    // 상품체크시 상태변경
    const goChk = (uid) => {
        let temp = GoodsList.map((val) => {
            if (uid === val.goods_uid) {
                return {...val, goods_cart_chk: !val.goods_cart_chk,};
            }
            return val;
        });
        setGoodsList(temp);
    }

    // 찜하기 액션
    const goWish = () => {
        alert('즐겨찾기에 추가 하였습니다.');
    }
    console.log(GoodsList);

    // 체크한 상품 버튼 생성
    let goForm = GoodsList.filter((val) => val.goods_cart_chk);

    console.log(goForm);

    return (
        /*
          return 구문 안에서는 {슬래시 + * 방식으로 주석
        */
        <>
            <ScrollView style={[styles.GoodsCateList, sub_page, min_height]}>
                <ScrollView style={styles.cate_1st_list} horizontal indicatorStyle={"black"}>
                    <TouchableOpacity style={styles.cate_1st_btn} onPress={() => {
                        category1('석고/보드류')
                    }}><Text style={styles.cate_1st_btn_txt}>석고/보드류</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.cate_1st_btn} onPress={() => {
                        category1('합판/MDF/OSB')
                    }}><Text style={styles.cate_1st_btn_txt}>합판/MDF/OSB</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.cate_1st_btn} onPress={() => {
                        category1('각재/구조재')
                    }}><Text style={styles.cate_1st_btn_txt}>각재/구조재</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.cate_1st_btn} onPress={() => {
                        category1('몰딩')
                    }}><Text style={styles.cate_1st_btn_txt}>몰딩</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.cate_1st_btn} onPress={() => {
                        category1('단열재')
                    }}><Text style={styles.cate_1st_btn_txt}>단열재</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.cate_1st_btn} onPress={() => {
                        category1('도어/문틀')
                    }}><Text style={styles.cate_1st_btn_txt}>도어/문틀</Text></TouchableOpacity>
                </ScrollView>
                {/*1차카테고리 메뉴 선택*/}
                <View style={styles.cate_2st_list}>
                    <TouchableOpacity style={styles.cate_2st_btn} onPress={() => {
                        category2('all')
                    }}>
                        <Text style={styles.cate_2st_btn_txt}>전체</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cate_2st_btn} onPress={() => {
                        category2('all')
                    }}>
                        <Text style={styles.cate_2st_btn_txt}>석고보드</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cate_2st_btn} onPress={() => {
                        category2('all')
                    }}>
                        <Text style={styles.cate_2st_btn_txt}>CRC보드</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cate_2st_btn} onPress={() => {
                        category2('all')
                    }}>
                        <Text style={styles.cate_2st_btn_txt}>E보드</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cate_2st_btn} onPress={() => {
                        category2('all')
                    }}>
                        <Text style={styles.cate_2st_btn_txt}>E보드</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cate_2st_btn} onPress={() => {
                        category2('all')
                    }}>
                        <Text style={styles.cate_2st_btn_txt}>마감보드</Text>
                    </TouchableOpacity>
                </View>
                {/*2차카테고리 메뉴 선택*/}

                {/*========================자재목록 출력(반복문)====================*/}
                {GoodsList.map((val, idx) => (
                    <View style={styles.cate_goods_list}>
                        <View style={styles.cate_goods_list_item}>
                            <View style={styles.flex}>
                                <View style={[styles.flex_item, styles.flex_item1]}>
                                    <Image style={styles.cate_list_Thumbnail} source={goods_img_1}/>
                                    <View style={styles.goods_like}>
                                        <Image style={styles.goods_like_icon} source={goods_like}/>
                                    </View>
                                </View>
                                <View style={[styles.flex_item, styles.flex_item2]}>
                                    <View style={styles.flex_top}>
                                        <View style={styles.flex}>
                                            <TouchableOpacity style="">
                                                {/*========상품명========*/}
                                                <Text style={styles.cate_2st_btn_txt}>{val.goods_name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            {(val.goods_cart_chk) ? (
                                                // 체크시에 노출
                                                <View style={[btn_circle, bg_primary]}>
                                                    <Checkbox style={styles.btn_cart} value={val.goods_cart_chk}
                                                              onValueChange={() => {
                                                                  goChk(val.goods_uid)
                                                              }}/>
                                                    <View style={{
                                                        flex: 1,
                                                        alignItems: "center",
                                                        justifyContent: "center"
                                                    }}>
                                                        <Chk width={16} height={22}></Chk>
                                                    </View>
                                                </View>
                                            ) : (
                                                // 체크가 없을시 노출
                                                <View style={[btn_circle, bg_light]}>
                                                    <Checkbox style={styles.btn_cart} value={val.goods_cart_chk}
                                                              onValueChange={() => {
                                                                  goChk(val.goods_uid)
                                                              }}/>
                                                    <View style={{
                                                        flex: 1,
                                                        alignItems: "center",
                                                        justifyContent: "center"
                                                    }}>
                                                        <CartBag width={16} height={22}></CartBag>
                                                    </View>
                                                </View>
                                            )}

                                        </View>
                                    </View>
                                    <View style={styles.flex_bottom}>
                                        <View style="">
                                            <Text style={styles.cate_list_disc}>당일출고</Text>
                                        </View>
                                        <View style="">
                                            <Text style={styles.cate_list_price}>{val.goods_price}원</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}

            </ScrollView>

            <Footer navigation={navigation}/>
            {/*========상품체크시 노출=========*/}
            {(goForm.length > 0) ? (
                <>
                    <TouchableOpacity onPress={() => navigation.navigate("배송정보등록")}>
                        <View style={[goForm, bg_primary, {paddingBottom: 36, paddingTop: 7,}]}>
                            <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                                <View style={{width: 20, height: 20, borderRadius: "50%", marginRight: 10, backgroundColor: "#fff"}}>
                                    <Text style={{textAlign: "center", color: "#333",}}>{goForm.length}</Text>
                                </View>
                                <Text style={text_light}>장바구니 가기</Text>
                            </View>
                            <Text style={[{textAlign: "center", color: "#FFF", fontSize: 18,}, text_light]}>
                                수량 및 추가정보 입력
                            </Text>
                        </View>
                    </TouchableOpacity>
                </>
            ) : (
                <></>
            )}


        </>
    );
}

const styles = StyleSheet.create({
    go_cart: {
        paddingBottom: 36,
        paddingTop: 7,
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 50,
        textAlign: "center",
        width: "100%",
    }
    ,
    btn_cart: {
        width: 37,
        height: 37,
        opacity: 0,
        position: "absolute",
        zIndex: 10,
    }
    ,
    goCart: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    GoodsCateList: {
        backgroundColor: "#fff",
    },
    container: {
        //앱의 배경 색
        backgroundColor: '#fff',
    },
    gary_bar: {
        borderBottomWidth: 8,
        borderColor: "#ededf1",
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    flex_item1: {
        width: "25%",
    },
    flex_item2: {
        width: "75%",
        paddingLeft: 10,
    },
    goods_like: {
        position: "absolute",
        right: "20%",
        bottom: "10%",
    },
    cate_1st_btn: {
        padding: 12,
    },
    cate_1st_btn_txt: {
        fontSize: 16,
    },
    cate_2st_list: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderTopWidth: 2,
        borderColor: "#EDEDF1",
        borderBottomWidth: 8,

    },
    cate_2st_btn: {
        padding: 6,
        width: "33.3333%",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ddd",
    },
    cate_2st_btn_txt: {
        fontSize: 14,
    },
    cate_goods_list_item: {
        paddingVertical: 26,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    cate_list_Thumbnail: {
        width: 80,
        height: 80,
    },
    goods_like_icon: {
        width: 21,
        height: 18,
    },
    cart_btn: {
        flex: 1,
        justifyItems: "center",
        backgroundColor: "#ededf1",
        color: "#696a81",
        borderRadius: 50,
    },
    flex_top: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingBottom: 24,
    },
    flex_bottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cate_list_disc: {
        fontSize: 14,
    },
    cate_list_price: {
        fontSize: 18,
        fontWeight: "600",
        color: "#222",
    },
});