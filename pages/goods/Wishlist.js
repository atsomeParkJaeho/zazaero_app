import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Button, TouchableWithoutFeedback,Switch} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { List } from 'react-native-paper';
import Checkbox from 'expo-checkbox';

// 공통 CSS 추가
import {
    container,
    bg_white,
    flex,
    flex_between,
    textarea,
    flex_top,
    align_items_center,
    pb2,
    wt8,
    wt2,
    d_flex,
    justify_content_end,
    btn_circle,
    bg_primary,
    bg_light,
    h13,
    text_primary,
    justify_content_center, text_light
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';

//이미지 추가
import col1 from "../../assets/img/co1.png";
import col2 from "../../assets/img/co2.png";
import col3 from "../../assets/img/co3.png";
import goods_img_1 from "../../assets/img/goods_img_1.png";
import goods_like from "../../assets/img/ico_heart.png";
import Footer from "../Footer";

import {Price} from "../../util/util";
import axios from "axios";
import Chk from "../../icons/chk.svg";
import CartBag from "../../icons/cart_bag.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WishlistNon from "../../icons/ico_heart_nc.svg";
import WishIcon from "../../icons/ico_heart_c.svg";
import { useIsFocused } from '@react-navigation/native';


export default function Wishlist({route,navigation}) {

    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    const Update = useIsFocused();

    console.log('즐겨찾기');

    // ==========1. 상태정의 리스트
    const [WishList, setWishList]       = useState([]);     // 즐겨찾기 상태정의
    const [Cate1st, setCate1st]         = useState([]);     // 1차 카테고리 상태정의


    // ===========2. 불러오기
    useEffect(()=>{
        // ==============1) 1차 카테고리 불러오기
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php',{
            act_type: "goods_cate",
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, A_cate_1st} = res.data;
                if(result === 'OK') {
                    console.log(result);
                    setCate1st(A_cate_1st);

                } else {
                    console.log('실패');
                    console.log(result);
                }
            }
        });

        // 1차 카테고리 상품코드 불러오기
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php',{
            act_type: "goods_cate",
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, A_cate_1st} = res.data;
                if(result === 'OK') {
                    console.log(result);
                    setCate1st(A_cate_1st);

                } else {
                    console.log('실패');
                    console.log(result);
                }
            }
        });


        // ==============2) 즐겨찾기 리스트 불러오기
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php',{
            act_type        :"get_my_zzim_list",
            login_status    :"Y",
            mem_uid         :Member,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, A_data} = res.data;
                console.log(result);
                if(result === 'OK') {
                    let temp = A_data.map((val) => {
                        return {...val, goods_wish_chk: !val.goods_wish_chk,};
                    });
                    console.log('체크리스트추가 / ',temp)

                    setWishList(temp);


                } else {
                    console.log('실패');
                }
            }
        });
    },[Member,Update]);


    // ========즐겨찾기 상품 장바구니에 담기===============//

    // 6. 장바구니 추가 이벤트
    const goCart = () => {
        let goForm = WishList.filter((val) => val.goods_cart_chk);
        // 반복문
        goForm.map(items=>(
            axios.post('http://49.50.162.86:80/ajax/UTIL_cart.php',{
                act_type            : 'save_cart',
                goods_uid           : items.goods_uid,           // 상품 uid
                mem_uid             : Member,                    // 회원 uid
                ord_cnt             :  '1'
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

        alert('장바구니에 추가하였습니다. ');
        navigation.navigate('장바구니');

    }



    // 4. ================상품체크시 상태변경=======================
    const goChk = (uid) => {
        let temp = WishList.map((val) => {
            if (uid === val.goods_uid) {
                return {...val, goods_cart_chk: !val.goods_cart_chk,};
            }
            return val;
        });
        setWishList(temp);
    }

    // ===========5. 즐겨찾기에서 삭제========================
    const delWish = (uid) => {
        // 즐겨찾기 상품리스트 가져오기
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php',{
            act_type        : "set_my_zzim",
            login_status    : "Y",
            mem_uid         : Member,
            link_uid        : uid,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result, my_zzim_flag} = res.data;
                if(result === 'OK') {
                    console.log('연결');
                }
                if(my_zzim_flag === 'N') {
                    alert('즐겨찾기에서 삭제하였습니다.');
                } else {
                    console.log('실패');
                }
            }
        });

        let temp = WishList.map((val) => {
            if (uid === val.goods_uid) {
                return {...val, goods_wish_chk: !val.goods_wish_chk,};
            }
            return val;
        });
        setWishList(temp);

    }


    // console.log('1차 카테고리 리스트 / ', Cate1st);
    // console.log('즐겨찾기 추가 리스트  / ', WishList);


    // 체크한 상품 버튼 생성
    let goForm = WishList.filter((val) => val.goods_cart_chk);

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.Cart]}>
                    <View style={[container]}>

                    </View>

                    {/*=============1차 카테고리 항목==============*/}
                    {/*=================즐겨찾기 리스트 출력-================*/}
                    {WishList.map((val,idx)=>(
                        <>
                            {(val.goods_wish_chk) ? (
                                <View key={idx} style={[styles.cate_goods_list]}>
                                    <View style={styles.cate_goods_list_item}>
                                        {/**/}
                                        <View style={[flex_top,{paddingLeft:15, paddingRight:15,}]}>
                                            <View style={[styles.flex_item, styles.flex_item1]}>
                                                <View style={[styles.cate_list_Thumbnail_box]}>
                                                    <Image style={styles.cate_list_Thumbnail} source={{uri:'http://www.zazaero.com'+val.list_img_url}}/>
                                                    <View style={styles.goods_like}>
                                                        {/*=============찜하기=================*/}
                                                        <TouchableOpacity onPress={()=>delWish(val.goods_uid)}>
                                                            <WishIcon width={35} height={24} color={'blue'}  />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={[styles.flex_item,styles.flex_item2]}>
                                                <View style={[flex_between,align_items_center,pb2]}>
                                                    <View style={[wt8]}>
                                                        <TouchableOpacity style="" onPress={() => {navigation.navigate('상품상세',{uid:val.goods_uid})}}>
                                                            {/*========상품명========*/}
                                                            <Text style={[styles.cate_2st_btn_txt,(val.goods_wish_chk_chk) ? {color:"red"}:{color:"#000"}]} numberOfLines={1}>{val.goods_name}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[wt2,d_flex,justify_content_end]}>
                                                        {(val.goods_cart_chk) ? (
                                                            // 체크시에 노출
                                                            <View style={[btn_circle, bg_primary]}>
                                                                <Checkbox style={styles.btn_cart} value={val.goods_cart_chk}
                                                                          onValueChange={() => {
                                                                              goChk(val.goods_uid);
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
                                                        <Text style={styles.cate_list_price}>{Price(val.price)}원</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        {/**/}
                                    </View>
                                </View>
                            ):(
                                <></>
                            )}
                        </>
                    ))}

                </View>
            </ScrollView>
            {/*========상품체크시 노출=========*/}
            {(goForm.length > 0) ? (
                <>
                    <View style={[styles.go_cart, bg_primary, {paddingBottom: 36, paddingTop: 7,}]}>
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

    all_check:{
        borderRadius:5,
    },
    all_check_txt:{
        marginLeft:5,
    },
    goods_cart_del_btn:{
        fontSize:12,
        color:"#a0aec0",
    },
    Accordion_tit:{
        backgroundColor:"#f9f9fb",
        borderBottomWidth:1,
        borderColor:"#ededf1",
    },
    Accordion_items:{
        paddingVertical:10,
        paddingHorizontal:16,
        paddingLeft:16,
    },
    pd_18:{
        paddingBottom:18,
    },
    pd_20:{
        paddingBottom:20,
    },
    flex:{
        flexDirection:"row",
        alignItems:"flex-start",
    },
    flex_item1:{
        width:"25%",
    },
    flex_item2:{
        width:"75%",
        paddingLeft:8,
    },
    goods_like:{
        position:"absolute",
        right:"20%",
        bottom:"10%",
    },
    cate_1st_btn:{
        padding:12,
    },
    cate_1st_btn_txt:{
        fontSize:16,
    },
    cate_2st_list:{
        flexDirection:"row",
        flexWrap:"wrap",
        alignItems:"center",
        borderTopWidth:2,
        borderColor:"#ddd",

    },
    cate_2st_btn:{
        padding:6,
        width:"33.3333%",
        borderBottomWidth:1,
        borderRightWidth:1,
        borderColor:"#ddd",
    },
    cate_2st_btn_txt:{
        fontSize:14,
    },
    cate_goods_list_item:{
        paddingVertical:26,
        borderBottomWidth:1,
        borderColor:"#ddd",
    },
    cate_list_Thumbnail:{
        width:80,
        height:80,
    },
    goods_like_icon:{
        width:21,
        height:18,
    },
    cart_btn:{
        width:36,
        lineHeight:36,
        fontSize:18,
        backgroundColor:"#ededf1",
        color:"#696a81",
        borderRadius:50,
    },
    flex_top:{
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:"space-between",
        paddingBottom:24,
    },
    flex_bottom:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    cate_list_disc:{
        fontSize:14,
    },
    cate_list_price:{
        fontSize:18,
        fontWeight:"600",
        color:"#222",
    },
    btn_cart: {
        width: 37,
        height: 37,
        opacity: 0,
        position: "absolute",
        zIndex: 10,
    },
});