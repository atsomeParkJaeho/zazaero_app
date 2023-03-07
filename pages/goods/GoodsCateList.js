import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions,FlatList, Text, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Checkbox from 'expo-checkbox';
import logo from "../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import CartBag from "../../icons/cart_bag.svg";
import WishlistNon from "../../icons/ico_heart_nc.svg";
import Wishlist from "../../icons/ico_heart_c.svg";
import Chk from "../../icons/chk.svg";


import goods_img_1 from '../../assets/img/goods_img_1.png';
import goods_like from '../../assets/img/ico_heart.png';
import Footer from "../Footer";
import {
    align_items_center,
    bg_danger,
    bg_gray,
    bg_light,
    bg_primary,
    bg_white,
    btn_circle,
    container,
    d_flex, flex, flex_between,
    flex_top, h13,
    h18,
    justify_content_center, justify_content_end, me1,
    min_height, ms1, pb2,
    sub_page,
    text_light, text_primary, text_right, wt2, wt3, wt4, wt6, wt7, wt8
} from "../../common/style/AtStyle";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search from "../../icons/search.svg";
import NotificationIcon from "../../icons/Notification_icon.svg";
import {Price} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";
import {
    get_cate_list,
    get_goods_cate2nd_list,
    get_goods_cate3rd_list,
    get_goods_list,
    go_goods_cate3rd_list,
    goods_cate, ins_cart, save_wish
} from "./UTIL_goods";






export default function GoodsCateList({route, navigation}) {
    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    let {Cate1stUid, Cate2ndUid, name} = route.params; // 카테고리 uid
    console.log(Cate1stUid);
    console.log(Cate2ndUid);
    console.log('회원 uid / ', Member);
    console.log('아이디값');

    // 1. ===============상태값 정의==================
    const [GoodsList, setGoodsList]             = useState([]);     // 자재리스트 설정
    const [Cate2List, setCate2List]             = useState([]);     // 2차 카테고리 담기
    const [Cate3rd, setCate3rd]                 = useState([]);     // 3차 카테고리 담기
    const [Cate2ndActive, setCate2ndActive]     = useState(``);     // 현재 페이지 상태
    const [Cate3rdActive, setCate3rdActive]     = useState(``);     // 현재 페이지 상태

    const update = useIsFocused();

    

    // 우측 메뉴 설정
    const headerRight = () => {
        return (
            <>
                <View style={[flex, me1]}>
                    <TouchableOpacity style={styles.link_signUp} onPress={() => {
                        navigation.navigate('검색')
                    }}>
                        <Search width={30} height={21} style={[styles.icon]}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link_signUp} onPress={() => {
                        navigation.navigate('알림')
                    }}>
                        <NotificationIcon width={30} height={21} style={[styles.icon, ms1]}/>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    // 2. ================최초 db 출력값 담기===================
    useEffect(() => {
        setCate2ndActive(Cate2ndUid); // 카테고리 값 설정
        navigation.setOptions({
            title: name,     // 상단 설정
            headerRight: headerRight,
        });
        // ==========================상품 불러오기 2023.01.02 수정 ========================== //
        get_goods_list(Member, Cate1stUid, Cate2ndUid).then((res) => {
            if (res) {
                const {result, A_goods} = res.data;
                if (result === 'OK') {
                    console.log('확인');
                    setGoodsList(A_goods);
                } else {
                    console.log('실패');
                }
            }
        });
        // 2차 카테고리 버튼 설정
        goods_cate(Cate1stUid).then((res) => {
            if (res) {
                const {result, A_cate_2nd} = res.data;
                if (result === 'OK') {
                    setCate2List(A_cate_2nd);
                } else {
                    console.log('실패');
                }
            }
        });
        // 3차 카테고리 버튼 설정
        get_cate_list(Cate1stUid, Cate2ndUid).then((res) => {
            if (res) {
                const {result, A_cate} = res.data;
                if (result === 'OK') {
                    setCate3rd(A_cate);
                } else {
                    console.log('실패');
                }
            }
        });


    }, [Member, update]);

    const goCate2nd = (Cate2ndUid) => {
        setCate2ndActive(Cate2ndUid);
        setCate3rdActive(Cate2ndUid);
        console.log('2차 카테고리 uid', Cate2ndUid);
        // ==============2차 카테고리 상품 불러오기==============//
        get_goods_cate2nd_list(Cate1stUid, Cate2ndUid).then((res) => {
            if (res) {
                const {result, A_goods} = res.data;
                if (result === 'OK') {
                    console.log('확인');
                    setGoodsList(A_goods);
                } else {
                    console.log('실패');
                }
            }
        });
        // ===================3차 카테고리 리스트를 출력=====================//
        // 3차 카테고리 버튼 설정
        get_goods_cate3rd_list(Cate1stUid, Cate2ndUid).then((res) => {
            if (res) {
                const {result, A_cate} = res.data;
                if (result === 'OK') {
                    setCate3rd(A_cate);
                } else {
                    console.log('실패');
                }
            }
        });

    }

    // ===============5. 카테고리 클릭시 상품 상태 변경(3차)===============
    const goCate3rd = (Cate3rdUid) => {
        setCate3rdActive(Cate3rdUid);
        console.log('3차 카테고리 uid', Cate3rdUid);
        go_goods_cate3rd_list(Cate1stUid, Cate2ndUid, Cate3rdUid).then((res) => {
            if (res) {
                const {result, A_goods} = res.data;
                if (result === 'OK') {
                    console.log('확인');
                    setGoodsList(A_goods);
                } else {
                    console.log('실패');
                }
            }
        });
    }


    // 4. ================상품체크시 상태변경=======================
    const goChk = (uid) => {
        let temp = GoodsList.map((val) => {
            if (uid === val.goods_uid) {
                return {...val, goods_cart_chk: !val.goods_cart_chk,};
            }
            return val;
        });
        setGoodsList(temp);
    }

    // 5. 즐겨찾기 액션
    const goWish = (link_uid) => {
        save_wish(Member, link_uid).then((res) => {
            console.log(res.data);
            if (res) {
                const {result} = res.data;
                if (result === 'OK') {
                    console.log(result);
                    let temp = GoodsList.map((val) => {
                        if (link_uid === val.goods_uid) {
                            if (val.my_zzim_flag === 'Y') {
                                Alert.alert('', '즐겨찾기에서 삭제하였습니다.');
                                return {...val, my_zzim_flag: 'N',};
                            }
                            if (val.my_zzim_flag === 'N') {
                                Alert.alert('', '즐겨찾기에 추가하였습니다.');
                                return {...val, my_zzim_flag: 'Y',};
                            }
                        }
                        return val;
                    });

                    setGoodsList(temp);
                }
            } else {
                const {result} = res.data;
                console.log(result);
            }
        }).catch((error) => {
            console.log(error)
        });

    }

    // 6. 장바구니 추가 이벤트
    const goCart = () => {
        /**-----1. 장바구니 클릭한 상품 배열을 만든다.--------------**/
        let goForm = GoodsList.filter((val) => val.goods_cart_chk);
        let goods_uid_list = "";

        /**-----1. 장바구니 클릭한 상품 배열을 만든다.--------------**/
        goForm.map(items => {
            if (goods_uid_list != "") {
                goods_uid_list += ",";
            }
            goods_uid_list += items.goods_uid;
        });
        ins_cart(Member, goods_uid_list).then((res) => {
            if (res) {
                const {result, order_uid} = res.data;
                console.log(result);
                if (result === 'OK') {
                    console.log(order_uid);
                } else {
                    console.log('실패');

                }
            }
        });
        navigation.navigate('장바구니');
    }
    // 체크한 상품 버튼 생성
    let goForm = GoodsList.filter((val) => val.goods_cart_chk);

    /**--------자재목록-------------**/
    function goodsList ({item}) {
        return (
            <>
                <View>
                    <View style={styles.cate_goods_list_item}>
                        <View style={[flex_top]}>
                            <View style={[styles.flex_item, styles.flex_item1]}>
                                <View style={[styles.cate_list_Thumbnail_box]}>
                                    <Image style={styles.cate_list_Thumbnail}
                                           source={{uri: 'http://www.zazaero.com' + item.list_img_url}}/>
                                    <View style={styles.goods_like}>
                                        {/*=============찜하기=================*/}
                                        <TouchableOpacity onPress={() => goWish(item.goods_uid)}>
                                            {(item.my_zzim_flag === 'Y') ? (
                                                <>
                                                    <Wishlist width={35} height={24} color={'blue'}/>
                                                </>
                                            ) : (
                                                <>
                                                    <WishlistNon width={35} height={24} color={'blue'}/>
                                                </>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.flex_item, styles.flex_item2]}>
                                <View style={[flex_between, align_items_center, pb2]}>
                                    <View style={[wt8]}>
                                        <TouchableOpacity style="" onPress={() => {
                                            navigation.navigate('상품상세', {uid: item.goods_uid})
                                        }}>
                                            {/*========상품명========*/}
                                            <Text
                                                style={[styles.cate_2st_btn_txt, (item.goods_wish_chk) ? {color: "red"} : {color: "#000"}]}
                                                numberOfLines={1}>{item.goods_name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/**----------------------장바구니------------------------------**/}
                                    <View style={[wt2, d_flex, justify_content_end]}>
                                        {(item.goods_cart_chk) ? (
                                            // 체크시에 노출
                                            <View style={[btn_circle, bg_primary]}>
                                                <Checkbox style={styles.btn_cart} value={item.goods_cart_chk}
                                                          onValueChange={() => {
                                                              goChk(item.goods_uid);
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
                                                <Checkbox style={styles.btn_cart} value={item.goods_cart_chk}
                                                          onValueChange={() => {
                                                              goChk(item.goods_uid)
                                                          }}/>
                                                <View style={{
                                                    flex: 1,
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <CartBag width={16} height={22} style={[styles.CartBagIcon]}></CartBag>
                                                </View>
                                            </View>
                                        )}

                                    </View>
                                </View>
                                <View style={styles.flex_bottom}>
                                    {/*-----------------------------가이드 안내-----------------------------*/}
                                    <View style={[wt6]}>
                                        <Text style={styles.cate_list_disc} numberOfLines={1}>
                                            {(item.goods_guide_name) ? item.goods_guide_name : ''}
                                        </Text>
                                    </View>
                                    <View style={[wt4]}>
                                        <Text
                                            style={[styles.cate_list_price, text_right]}>{Price(item.price)}원</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/**/}
                    </View>
                </View>
            </>
        );
    };

    console.log(GoodsList);

    return (
        /*
          return 구문 안에서는 {슬래시 + * 방식으로 주석
        */
        <>
            {/** ---------------------2차 카테고리--------------------- **/}
            <View style={bg_white}>
                <ScrollView style={styles.cate_1st_list} horizontal indicatorStyle={"black"}>
                    {Cate2List.map((val, idx) => (
                        <>
                            <TouchableOpacity key={idx} style={[styles.cate_1st_btn]} onPress={() => goCate2nd(val.ind_cfg_uid)}>
                                <Text style={[styles.cate_1st_btn_txt, (val.ind_cfg_uid === Cate2ndActive) && text_primary]}>
                                    {val.cfg_val1}
                                </Text>
                            </TouchableOpacity>
                        </>
                    ))}
                </ScrollView>
            </View>
            {/** ---------------------3차 카테고리--------------------- **/}
            <View style={[bg_white, styles.cate_2st_list]}>
                {Cate3rd &&
                    <>
                        <View style={[styles.cate_2st_btn,]}>
                            <TouchableOpacity style={[styles.cate_1st_btn]} onPress={() => goCate2nd(Cate2ndActive)}>
                                <Text style={[styles.cate_2st_btn_txt, (Cate2ndActive === Cate3rdActive) && text_primary]}>
                                    전체
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {Cate3rd.map((val, idx) => (
                            <>
                                <View style={[styles.cate_2st_btn,]}>
                                    <TouchableOpacity key={idx} style={[styles.cate_1st_btn]}
                                                      onPress={() => goCate3rd(val.ind_cfg_uid)}>
                                        <Text
                                            style={[styles.cate_2st_btn_txt, (val.ind_cfg_uid === Cate3rdActive) && text_primary]}>
                                            {val.cfg_val1}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ))}
                    </>
                }
            </View>

            {/**---------------------------자재목록------------------**/}
            <FlatList
            style={[bg_white]}
            keyExtractor={(val) => String(val.goods_uid)}
            data={GoodsList}
            renderItem={goodsList}
            windowSize={3}
            />



            {/**--------------------------------장바구니 영역----------------------------------------**/}
            {/*========상품체크시 노출=========*/}
            {(goForm.length > 0) ? (
                <>
                    <View style={[styles.go_cart, bg_primary,]}>
                        <TouchableOpacity onPress={goCart}>
                            <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 50,
                                    marginRight: 10,
                                    backgroundColor: "#fff"
                                }}>
                                    <Text style={{textAlign: "center", color: "#333",}}>{goForm.length}</Text>
                                </View>
                                <Text style={text_light}>장바구니 가기</Text>
                            </View>
                            <Text style={[{textAlign: "center", color: "#FFF", fontSize: 18,}, text_light]}>
                                수량 및 추가정보 입력
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <></>
            )}
            {/**--------------------------------하단 영역-------------------------------------------**/}
            <Footer navigation={navigation}/>
        </>
    );



}



const styles = StyleSheet.create({

    GoodsCateList: {
        backgroundColor:"#fff",

    },
    cate_1st_btn: {
        padding: 12,
    },
    cate_1st_btn_txt: {
        fontSize: Platform.OS === 'ios' ? 16 : 15,
    },
    cate_2st_list: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderTopWidth: 2,
        borderColor: "#EDEDF1",
        borderBottomWidth: 8,
    },
    cate_goods_list_item: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    flex_item1: {
        width: "25%",
    },
    flex_item2: {
        width: "75%",
        paddingLeft: 10,
    },
    cate_list_Thumbnail_box: {
        paddingTop: "100%",
    },
    cate_list_Thumbnail: {
        paddingTop: "100%",
        position: "absolute",
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#eee",
    },
    goods_like: {
        position: "absolute",
        right: "1%",
        bottom: 1,
    },
    cate_2st_btn_txt: {
        fontSize: Platform.OS === 'ios' ? 14 : 13,
    },
    btn_cart: {
        width: 37,
        height: 37,
        opacity: 0,
        position: "absolute",
        zIndex: 10,
    },
    go_cart: {
        paddingBottom: 36,
        paddingTop: 7,
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 50,
        // borderWidth:1,
        // borderColor:"red",
        textAlign: "center",
        width: "100%",
    },
    CartBagIcon:{
        borderWidth:1,
        borderColor:"#F9F9FB",
    },
    wish: {
        position: "absolute",
        left: 50,
        bottom: Platform.OS === 'ios' ? 120 : 100,
        zIndex: 50,
        width: "100%",
        transform: [{translateX: 40}],
    },
    wish_box: {
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 25,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        borderRadius: 50,
    },
    wish_box_txt: {
        color: "#fff",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cart: {
        position: "absolute",
        left: 50,
        bottom: Platform.OS === 'ios' ? 120 : 100,
        zIndex: 50,
        width: "100%",
        transform: [{translateX: 40}],
    },
    cart_box: {
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        borderRadius: 50,
    },
    cart_box_txt: {
        color: "#fff",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cate_2st_btn: {
        padding: 1,
        width: "33.3333%",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ddd",
    },
    flex_bottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cate_list_disc: {
        fontSize: Platform.OS === 'ios' ? 14 : 13,
    },
    cate_list_price: {
        fontSize: Platform.OS === 'ios' ? 18 : 17,
        fontWeight: "600",
        color: "#222",
    },
});