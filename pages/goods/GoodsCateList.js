import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
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
    text_light, text_primary, wt2, wt8
} from "../../common/style/AtStyle";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search from "../../icons/search.svg";
import NotificationIcon from "../../icons/Notification_icon.svg";





export default function GoodsCateList({route,navigation}) {
    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    })

    let {Cate1stUid, Cate2ndUid, name} = route.params; // 카테고리 uid
    console.log(Cate1stUid);
    console.log(Cate2ndUid);
    console.log('회원 uid / ',Member);
    console.log('아이디값');

    // 1. ===============상태값 정의==================
    const [GoodsList, setGoodsList] =       useState([]);     // 자재리스트 설정
    const [Cate2List, setCate2List] =       useState([]);     // 2차 카테고리 담기
    const [Cate3rd, setCate3rd] =           useState([]);     // 3차 카테고리 담기
    const [CateActive, setCateActive] =     useState(``);     // 현재 페이지 상태

    // 우측 메뉴 설정
    const headerRight = () => {
        return (
            <>
                <View style={[flex,me1]}>
                    <TouchableOpacity style={styles.link_signUp} onPress={() => {navigation.navigate('검색')}}>
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
        setCateActive(Cate2ndUid); // 카테고리 값 설정
        navigation.setOptions({
            title:name,     // 상단 설정
            headerRight:headerRight,
        });
        // 상품 불러오기
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php', {
            act_type : 'find_goods',
            cate_2nd : Cate2ndUid
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, A_goods, query} = res.data;
                if(result === 'OK') {
                    setGoodsList(A_goods);
                } else {
                    console.log('실패');
                }
            }
        });

        // 2차 카테고리 버튼 설정
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php', {
            act_type: "goods_cate",
            ind_cfg_uid: Cate1stUid,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, A_cate_2nd} = res.data;
                if(result === 'OK') {
                    setCate2List(A_cate_2nd);
                } else {
                    console.log('실패');
                }
            }
        });
        
        // 3차 카테고리 버튼 설정
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
            act_type        : "get_cate_list",
            depth           : "3",
            cate_1st_uid    : Cate1stUid,
            cate_2nd_uid    : Cate2ndUid,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, A_cate} = res.data;
                if(result === 'OK') {
                    setCate3rd(A_cate);
                } else {
                    console.log('실패');
                }
            }
        });

        // 즐겨찾기 상품리스트 가져오기
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php',{
            act_type        : "get_my_zzim_list",
            login_status    : "Y",
            mem_uid         : Member,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, A_data} = res.data;
                if(result === 'OK') {
                    console.log('즐겨찾기에 등록한 상품 / ', A_data);
                    setWishGoods(A_data);
                } else {
                    console.log('실패');
                }
            }
        });

    }, [Member]);

    // ===============4. 카테고리 클릭시 상품 상태 변경(2차)===============
    // const goCate2nd = (uid) => {
    //     setCateActive(uid);
    //     console.log('2차 카테고리 uid',uid);
    //     // 상품 불러오기
    //     let cate2 = {
    //         act_type : 'find_goods',
    //         cate_2nd : uid
    //     };
    //     axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php',cate2,{
    //         headers: {
    //             'Content-type': 'multipart/form-data'
    //         }
    //     }).then((res)=>{
    //         if(res) {
    //             const {result, A_goods} = res.data;
    //             if(result === 'OK') {
    //                 setGoodsList(A_goods);
    //             } else {
    //                 console.log('실패');
    //             }
    //         }
    //     });
    // }
    const goCate2nd = (uid) => {
        setCateActive(uid);
        console.log('2차 카테고리 uid',uid);
        // ==============2차 카테고리 상품 불러오기==============//
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php', {
            act_type : 'find_goods',
            cate_2nd : uid
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, A_goods} = res.data;
                if(result === 'OK') {
                    setGoodsList(A_goods);
                } else {
                    console.log('실패');
                }
            }
        });


        // ===================3차 카테고리 리스트를 출력=====================//
        // 3차 카테고리 버튼 설정
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
            act_type        : "get_cate_list",
            depth           : "3",
            cate_1st_uid    : Cate1stUid,
            cate_2nd_uid    : uid,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, A_cate} = res.data;
                if(result === 'OK') {
                    setCate3rd(A_cate);
                } else {
                    console.log('실패');
                }
            }
        });

    }




    // ===============5. 카테고리 클릭시 상품 상태 변경(3차)===============
    const goCate3rd = (uid) => {
        // setCateActive(uid);
        console.log('3차 카테고리 uid',uid);
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php',{
            act_type : 'find_goods',
            cate_2nd : uid
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, A_goods} = res.data;
                if(result === 'OK') {
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
    const goWish = (uid) => {
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php',{
            act_type        :"set_my_zzim",
            login_status    :"Y",
            mem_uid         :Member,
            link_uid        :uid,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            console.log(res.data);
            if(res) {
                const {result} = res.data;
                if(result === 'OK') {
                    console.log(result);
                    alert('즐겨찾기에 추가 하였습니다.');
                }
            } else {
                const {result} = res.data;
                console.log(result);
            }
        }).catch((error)=>{console.log(error)});

        // 내 즐겨찾기에 등록된 상품 필터링하기
        let temp = GoodsList.map((val) => {
            if (uid === val.goods_uid) {
                return {...val, goods_wish_chk: !val.goods_wish_chk,};
            }
            return val;
        });
        setGoodsList(temp);

    }

    // 6. 장바구니 추가 이벤트
    const goCart = () => {
        let goForm = GoodsList.filter((val) => val.goods_cart_chk);
        // 반복문
        goForm.map(items=>(
            axios.post('http://49.50.162.86:80/ajax/UTIL_cart.php',{
                act_type            : 'save_cart',
                goods_uid           : items.goods_uid,           // 상품 uid
                mem_uid             : Member,                    // 회원 uid
                ord_cnt             :  '1'
                // act_type        :'ins_cart',
                // mem_uid         :Member,
                // goods_uid       :items.goods_uid,

            },{
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }).then((res)=>{
                if(res) {
                    const {result, order_uid} = res.data;
                    console.log(result);
                    if(result === 'OK') {
                        console.log(order_uid);
                    } else {
                        console.log('실패');
                        return;
                    }
                } else {

                }
            })
        ));

        navigation.navigate('장바구니');

    }

    // 체크한 상품 버튼 생성
    let goForm = GoodsList.filter((val) => val.goods_cart_chk);


    console.log('3차 카테고리 / ', Cate3rd);


    // console.log('상품리스트 출력 / ',GoodsList[0].goods_wish_chk);
    //console.log('즐겨찾기 상품리스트 출력 / ',WishGoods);
    return (
        /*
          return 구문 안에서는 {슬래시 + * 방식으로 주석
        */
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.GoodsCateList]}>
                    {/*==================2차 카테고리 설정=================*/}
                    <ScrollView style={styles.cate_1st_list} horizontal indicatorStyle={"black"}>
                        {Cate2List.map((val,idx)=>(
                            <>
                                <TouchableOpacity key={idx} style={[styles.cate_1st_btn]} onPress={() => goCate2nd(val.ind_cfg_uid)}>
                                    <Text style={[styles.cate_1st_btn_txt,(val.ind_cfg_uid === CateActive) && text_primary]}>
                                        {val.cfg_val1}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ))}
                    </ScrollView>
                    {/*3차카테고리 메뉴 선택*/}
                    <View style={styles.cate_2st_list}>
                        {Cate3rd &&
                        <>
                            {Cate3rd.map((val,idx)=>(
                                <>
                                    <TouchableOpacity key={idx} style={[styles.cate_1st_btn]}>
                                        <Text style={[styles.cate_1st_btn_txt,(val.ind_cfg_uid === CateActive) && text_primary]}>
                                            {val.cfg_val1}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            ))}
                        </>
                        }

                    </View>
                    {/*2차카테고리 메뉴 선택*/}
                    {/*========================자재목록 출력(반복문)====================*/}
                    {GoodsList.map((val, idx) => (
                        <View style={[]} key={idx}>
                            <View style={styles.cate_goods_list_item}>
                                {/**/}
                                <View style={[flex_top]}>
                                    <View style={[styles.flex_item, styles.flex_item1]}>
                                        <View style={[styles.cate_list_Thumbnail_box]}>
                                            <Image style={styles.cate_list_Thumbnail} source={{uri:'http://www.zazaero.com'+val.list_img_url}}/>
                                            <View style={styles.goods_like}>
                                                {/*=============찜하기=================*/}
                                                <TouchableOpacity onPress={()=>goWish(val.goods_uid)}>
                                                    {/*<Text>찜하기</Text>*/}
                                                    {(val.goods_wish_chk) ? (
                                                        <>
                                                            <Wishlist width={35} height={24} color={'blue'}  />
                                                        </>
                                                    ) :(
                                                            <WishlistNon width={35} height={24} color={'blue'}  />
                                                    )}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.flex_item,styles.flex_item2]}>
                                        <View style={[flex_between,align_items_center,pb2]}>
                                            <View style={[wt8]}>
                                                <TouchableOpacity style="" onPress={() => {navigation.navigate('상품상세',{uid:val.goods_uid})}}>
                                                    {/*========상품명========*/}
                                                    <Text style={[styles.cate_2st_btn_txt,(val.goods_wish_chk) ? {color:"red"}:{color:"#000"}]} numberOfLines={1}>{val.goods_name}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={[wt2,d_flex,justify_content_end]}>
                                                {(val.goods_cart_chk) ? (
                                                    // 체크시에 노출
                                                    <View style={[btn_circle, bg_primary]}>
                                                        <Checkbox style={styles.btn_cart}
                                                                  value={val.goods_cart_chk}
                                                                  onValueChange={() => {goChk(val.goods_uid);}}/>
                                                        <View style={{flex: 1,alignItems: "center",justifyContent: "center"}}>
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
                                                        <View style={{flex: 1,alignItems: "center",justifyContent: "center"}}>
                                                            <CartBag width={16} height={22}></CartBag>
                                                        </View>
                                                    </View>
                                                )}

                                            </View>
                                        </View>
                                        <View style={styles.flex_bottom}>
                                            <View style="">
                                                <Text style={styles.cate_list_disc}>4일 이내로 발주가능합니다.</Text>
                                            </View>
                                            <View style="">
                                                <Text style={styles.cate_list_price}>{val.price}원</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/**/}
                            </View>
                        </View>
                    ))}

                </View>
            </ScrollView>
            {/*========상품체크시 노출=========*/}
            {(goForm.length > 0) ? (
                <>
                    <View style={[styles.go_cart, bg_primary,]}>
                        <TouchableOpacity onPress={goCart} >
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
            <Footer navigation={navigation}/>
        </>
    );
}

const styles = StyleSheet.create({

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
        paddingVertical: 26,
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
    cate_list_Thumbnail_box:{
        paddingTop:"100%",
    },
    cate_list_Thumbnail: {
        paddingTop:"100%",
        position: "absolute",
        width: "100%",
        borderRadius:10,
        borderWidth:1,
        borderColor:"#eee",
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
        textAlign: "center",
        width: "100%",
    },
    cate_2st_btn: {
        padding: 6,
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