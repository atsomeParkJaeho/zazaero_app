import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
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
    d_flex, flex_between,
    flex_top, h13,
    h18,
    justify_content_center, justify_content_end,
    min_height, pb2,
    sub_page,
    text_light, text_primary, wt2, wt8
} from "../../common/style/AtStyle";
import {goodsList} from "../../util/util";
import {CheckBox} from "react-native-web";
import axios from "axios";




// ================2차 카테고리 이벤트===========================
function Cate2nd ({Cate1st, Cate2nd}) {
    console.log('1차 카테고리 uid / ',Cate1st);
    console.log('2차 카테고리 uid / ',Cate2nd);
    const [Cate2List, setCate2List] = useState([]);
    useEffect(() => {
        let data = {
            act_type: "goods_cate",
            ind_cfg_uid: Cate1st,
        };
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_cate_2nd} = res.data;
                if (result === 'OK') {
                    console.log(A_cate_2nd);
                    setCate2List(A_cate_2nd);
                } else {
                    console.log(result);
                    console.log('실패');
                }
            }
        });
    }, []);
    //console.log(Cate2List);
    if(Cate2List !== null) {
        return (
            <>
                {Cate2List.map(val=>(
                    <>
                        <TouchableOpacity style={styles.cate_1st_btn} onPress={() => goCate2nd(val.ind_cfg_uid)}>
                            <Text style={[styles.cate_1st_btn_txt]}>
                                {val.cfg_val1}
                            </Text>
                        </TouchableOpacity>
                    </>
                ))}
            </>
        );
    }

}

// 3차 카테고리 이벤트
function Cate3th () {
    return(
        <>
        </>
    );
}




export default function GoodsCateList({route,navigation}) {
    let test = 'er';
    let {Cate1stUid, Cate2ndUid} = route.params; // 카테고리 uid
    console.log(Cate1stUid);
    console.log(Cate2ndUid);

    console.log('아이디값');
    // console.log(uid);
    console.log('test / '+navigation);

    // 1. ===============상태값 정의==================
    const [GoodsList, setGoodsList] = useState([]);  // 자재리스트 설정

    // 2. ================최초 db 출력값 담기===================
    useEffect(() => {
        let data = {
            act_type : 'find_goods',
            cate_2nd : Cate2ndUid
        };
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php',data,{
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
        })
    }, []);

    // ==============3. 카테고리 클릭시 상품 상태 변경(2차)=================
    const goCate2nd = () => {
        let data = {

        };
        axios.post('',data,{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, A_goods_info} = res.data;
                if(result === 'OK') {

                } else {
                    console.log('실패');
                }
            }
        });
    }
    // ===============4. 카테고리 클릭시 상품 상태 변경(3차)===============
    const goCate3th = () => {

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

    // 5. 찜하기 액션
    const goWish = (uid) => {
        let temp = GoodsList.map((val)=>{
            if(uid === val.goods_uid) {
                return {...val, goods_wish_chk:!val.goods_wish_chk}
            }
            return val;
        })
        setGoodsList(temp);
        alert('즐겨찾기에 추가 하였습니다.');
    }
    console.log(GoodsList);

    // 체크한 상품 버튼 생성
    let goForm = GoodsList.filter((val) => val.goods_cart_chk);



    return (
        /*
          return 구문 안에서는 {슬래시 + * 방식으로 주석
        */
        <>
            <ScrollView style={[styles.GoodsCateList, sub_page, min_height]}>
                {/*==================2차 카테고리 설정=================*/}
                <ScrollView style={styles.cate_1st_list} horizontal indicatorStyle={"black"}>
                    <Cate2nd Cate1st={Cate1stUid} Cate2nd={Cate2ndUid}/>
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
                            {/**/}
                            <View style={[flex_top]}>
                                <View style={[styles.flex_item, styles.flex_item1]}>
                                    <View style={[styles.cate_list_Thumbnail_box]}>

                                        <Image style={styles.cate_list_Thumbnail} source={{uri:'http://www.zazaero.com'+val.list_img_url}}/>
                                        <View style={styles.goods_like}>
                                            {/*=============찜하기=================*/}
                                            <TouchableOpacity onPress={()=>goWish(val.goods_uid)}>
                                                {(val.goods_wish_chk) ? (
                                                    <Wishlist width={35} height={24} color={'blue'}  />
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
                                                    <Checkbox style={styles.btn_cart} value={val.goods_cart_chk}
                                                              onValueChange={() => {
                                                                  goChk(val.goods_uid)
                                                              }}/>
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
            </ScrollView>

            {/*========상품체크시 노출=========*/}
            {(goForm.length > 0) ? (
                <>
                    <View style={[styles.go_cart, bg_primary, {paddingBottom: 36, paddingTop: 7,}]}>
                        <TouchableOpacity onPress={() => navigation.navigate("배송정보등록")}>
                            <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
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
        right: "10%",
        bottom: 10,
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
    cart_btn: {
        flex: 1,
        justifyItems: "center",
        backgroundColor: "#ededf1",
        color: "#696a81",
        // borderRadius: 50,
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