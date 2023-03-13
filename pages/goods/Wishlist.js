import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Button,
    TouchableWithoutFeedback,
    Switch,
    Alert, Platform
} from 'react-native';
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
    justify_content_center, text_light, ms1, padding_bottom, mt10, mt2, h15, text_center
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
import {ins_cart} from "./UTIL_goods";
import Wish from "../../icons/ico_heart_nc.svg";
import {add_order_goods} from "../order/UTIL_order";


export default function Wishlist({route,navigation}) {

    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    const Update = useIsFocused();

    console.log('즐겨찾기2');

    // ==========1. 상태정의 리스트
    const [WishList, setWishList]       = useState([]);     // 즐겨찾기 상태정의

    // ===========2. 불러오기
    useEffect(()=>{
        // ==============2) 즐겨찾기 리스트 불러오기
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php',{
            act_type        :"get_my_zzim_list_new",
            login_status    :"Y",
            mem_uid         :Member,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            console.log(res.data,'/// 즐겨찾기 불러오기')
            if(res) {
                const {result, A_zzim} = res.data;
                if(result === 'OK') {
                    /**1. 장바구니 체크 배열 넣기**/
                    
                    /* 즐겨찾기 체크        : goods_chk */
                    /* 즐겨찾기 리스트 삭제  : goods_wish */
                    
                    let temp = A_zzim.map((cate)=>{
                        return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                            return {...val, goods_chk:false, goods_wish:true}
                            })}
                    })
                    setWishList(temp);

                } else {
                    console.log('실패');
                }
            }
        });
    },[Member]);


    /**---------------------즐겨찾기에 삭제----------------------------**/
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
                    Alert.alert('즐겨찾기에서 삭제하였습니다.');
                } else {
                    console.log('실패');
                }
            }
        });

        setWishList(WishList.map((cate)=>{
            return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                    if(val.goods_uid === uid) {
                        return {...val, goods_chk:false, goods_wish:false}
                    } else {
                        return val;
                    }
                })}
        }));
    }
    
    /**---------------------체크시 상태 변경----------------------------**/
    const goChk = (uid) => {
        console.log('액션');
        setWishList(WishList.map((cate)=>{
            return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                if(val.goods_uid === uid) {
                    return {...val, goods_chk:!val.goods_chk}
                } else {
                    return val;
                }
                })}
        }));
    }
    /**---------------------------------자재추가 이벤트----------------------------------------**/
    const AddGoods = () => {
        // 테이블 AT_order, gd_order, AT_order_item

        let {gd_order_uid} = route.params;

        console.log(gd_order_uid);

        /**------------------------------1. 체크한상품 필터링------------------------**/
        let temp = WishList.map(cate=>cate.A_goods_list.filter(val=>val.goods_chk === true));
        let Add_goods = temp.reduce((val,idx)=>{
            return val.concat(idx);
        });
        let goods_uid = Add_goods.map(val=>val.goods_uid);

        add_order_goods(gd_order_uid, goods_uid).then((res)=>{
            if(res) {
                const {result, err_msg} = res.data;
                console.log(result);
                if(result === 'OK') {
                    console.log('연결');
                    Alert.alert('','자재를 추가하였습니다.');
                    return navigation.pop();
                } else {
                    Alert.alert('',err_msg);
                    return navigation.pop();
                }
            }
        });

        
    }


    /**---------------------------------클릭시 배송정보 입력창으로 이동----------------------------------------**/
    const goCart = () => {
        let result = WishList.map(val=>val.A_goods_list.filter(item=>item.goods_chk));
        let chk_goods = result.reduce((val,idx)=>{
            return val.concat(idx);
        });
        let goods_uid_list = "";
        chk_goods.map(items => {
            if (goods_uid_list !== "") {
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
                    navigation.replace('장바구니');
                } else {
                    console.log('실패');

                }
            }
        });

    }

    let list      = WishList.map(cate=>cate.A_goods_list.filter(val=>val.goods_chk === true));
    let arr       = list.map(val=>val.length);
    let cont      = 0;
    for (let i = 0; i < arr.length; i++) {
        cont += arr[i];
    }


    let result = WishList.map(cate=> {
        return {...cate, A_goods_list:cate.A_goods_list.filter((val)=>val.goods_wish === true)}
    });
    console.log(result,'/ 필터링 리스트');

    /**------------------------------장바구니 선택 항목 필터링------------------------------**/

    



    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.Wishlist]}>
                    {/*=================즐겨찾기 리스트 출력-================*/}
                    <List.Section style={[styles.Section, {padding: 0, margin: 0}]}>
                            {/**-------------------------1차 카테고리 항목 불러오기---------------------------**/}
                            {(result.length !== 0) ? (
                                <>
                                    {result.map((cate,idx)=> {

                                        let wish_cnt = cate.A_goods_list.filter(val=>val.goods_wish === true);

                                        if(wish_cnt.length > 0) {
                                            return(
                                                <>
                                                    <List.Accordion title={cate.cate_1st_name} style={[container, styles.Accordion_tit]}>
                                                        {cate.A_goods_list.map(val => {

                                                            if (val.goods_wish) {
                                                                return (
                                                                    <>
                                                                        <View key={idx} style={[styles.cate_goods_list]}>
                                                                            <View style={styles.cate_goods_list_item}>
                                                                                {/**/}
                                                                                <View style={[flex_top, {
                                                                                    paddingLeft: 15,
                                                                                    paddingRight: 15,
                                                                                }]}>
                                                                                    <View style={[styles.flex_item, styles.flex_item1]}>
                                                                                        <View style={[styles.cate_list_Thumbnail_box]}>
                                                                                            <Image style={styles.cate_list_Thumbnail} source={{uri: 'http://www.zazaero.com' + val.list_img}}/>
                                                                                            <View style={styles.goods_like}>
                                                                                                {/*=============찜하기=================*/}
                                                                                                <TouchableOpacity onPress={() => delWish(val.goods_uid)}>
                                                                                                    <WishIcon width={35} height={24} color={'blue'}/>
                                                                                                </TouchableOpacity>
                                                                                            </View>
                                                                                        </View>
                                                                                    </View>
                                                                                    <View
                                                                                        style={[styles.flex_item, styles.flex_item2]}>
                                                                                        <View
                                                                                            style={[flex_between, align_items_center, pb2]}>
                                                                                            <View style={[wt8]}>

                                                                                                {(route.params) ? (
                                                                                                    <>
                                                                                                        <TouchableOpacity style="" onPress={() => {navigation.navigate('상품상세', {uid: val.goods_uid, ord_status:route.params.gd_order_uid})}}>
                                                                                                            {/*========상품명========*/}
                                                                                                            <Text
                                                                                                                style={[styles.cate_2st_btn_txt, (val.goods_wish_chk_chk) ? {color: "red"} : {color: "#000"}]}
                                                                                                                numberOfLines={1}>{val.goods_name}</Text>
                                                                                                        </TouchableOpacity>
                                                                                                    </>
                                                                                                ):(
                                                                                                    <>
                                                                                                        <TouchableOpacity style="" onPress={() => {navigation.navigate('상품상세', {uid: val.goods_uid})}}>
                                                                                                            {/*========상품명========*/}
                                                                                                            <Text
                                                                                                                style={[styles.cate_2st_btn_txt, (val.goods_wish_chk_chk) ? {color: "red"} : {color: "#000"}]}
                                                                                                                numberOfLines={1}>{val.goods_name}</Text>
                                                                                                        </TouchableOpacity>
                                                                                                    </>
                                                                                                )}

                                                                                            </View>
                                                                                            <View
                                                                                                style={[wt2, d_flex, justify_content_end]}>
                                                                                                {(val.goods_chk) ? (
                                                                                                    // 체크시에 노출
                                                                                                    <View
                                                                                                        style={[btn_circle, bg_primary]}>
                                                                                                        <Checkbox
                                                                                                            style={styles.btn_cart}
                                                                                                            value={val.goods_chk}
                                                                                                            onValueChange={() => {
                                                                                                                goChk(val.goods_uid);
                                                                                                            }}/>
                                                                                                        <View style={{
                                                                                                            flex: 1,
                                                                                                            alignItems: "center",
                                                                                                            justifyContent: "center"
                                                                                                        }}>
                                                                                                            <Chk width={16}
                                                                                                                 height={22}></Chk>
                                                                                                        </View>
                                                                                                    </View>
                                                                                                ) : (
                                                                                                    // 체크가 없을시 노출
                                                                                                    <View
                                                                                                        style={[btn_circle, bg_light]}>
                                                                                                        <Checkbox
                                                                                                            style={styles.btn_cart}
                                                                                                            value={val.goods_chk}
                                                                                                            onValueChange={() => {
                                                                                                                goChk(val.goods_uid)
                                                                                                            }}/>
                                                                                                        <View style={{
                                                                                                            flex: 1,
                                                                                                            alignItems: "center",
                                                                                                            justifyContent: "center"
                                                                                                        }}>
                                                                                                            <CartBag width={16}
                                                                                                                     height={22}></CartBag>
                                                                                                        </View>
                                                                                                    </View>
                                                                                                )}

                                                                                            </View>
                                                                                        </View>
                                                                                        <View style={styles.flex_bottom}>
                                                                                            <View style="">
                                                                                                <Text
                                                                                                    style={styles.cate_list_disc}>
                                                                                                    {(val.goods_guide_txt) && val.goods_guide_txt}
                                                                                                </Text>
                                                                                            </View>
                                                                                            <View style="">
                                                                                                <Text
                                                                                                    style={styles.cate_list_price}>{Price(val.price)}원</Text>
                                                                                            </View>
                                                                                        </View>
                                                                                    </View>
                                                                                </View>
                                                                                {/**/}
                                                                            </View>
                                                                        </View>
                                                                    </>
                                                                );
                                                            }
                                                        })}

                                                    </List.Accordion>
                                                </>
                                            );
                                        }


                                    })}
                                </>
                            ):(
                                <>
                                    <View style={[flex,justify_content_center]}>
                                        <View style={[mt10]}>
                                            <Wish width={200} height={223} style={[styles.CartIcon]}/>
                                            <Text style={[mt2,h15,text_center]}>
                                                즐겨찾기에 추가된 자재가 없습니다.
                                            </Text>
                                        </View>

                                    </View>
                                </>
                            )}

                    </List.Section>

                </View>
            </ScrollView>
            <Footer navigation={navigation}/>

            {/*========상품체크시 노출=========*/}

            {(route.params) ? (
                <>
                    <View style={[styles.go_cart, bg_primary, {paddingBottom: 36, paddingTop: 7,}]}>
                        <TouchableOpacity onPress={AddGoods}>
                            <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                                <Text style={text_light}>총 </Text>
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 50,
                                    marginRight: 10,
                                    backgroundColor: "#fff"
                                }}>
                                    <Text style={{textAlign: "center", color: "#333",}}>{cont}</Text>
                                </View>
                                <Text style={text_light}> 개</Text>
                            </View>
                            <Text style={[{textAlign: "center", color: "#FFF", fontSize: 18,}, text_light]}>
                                자재추가하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            ):(
                <>
                    {(cont > 0) ? (
                        <>
                            <View style={[styles.go_cart, bg_primary, {paddingBottom: 36, paddingTop: 7,}]}>
                                <TouchableOpacity onPress={goCart}>
                                    <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                                        <View style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 50,
                                            marginRight: 10,
                                            backgroundColor: "#fff"
                                        }}>
                                            <Text style={{textAlign: "center", color: "#333",}}>{cont}</Text>
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
                        <>
                        </>
                    )}
                </>
            )}


        </>
    );
}


const styles = StyleSheet.create({
    Section:{
      marginBottom: Platform.OS === 'ios' ? 110 : 90,
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
    all_check:{
        borderRadius:5,
    },
    all_check_txt:{
        marginLeft:5,
    },
    Accordion_tit:{
        backgroundColor:"#f9f9fb",
        borderBottomWidth:1,
        borderColor:"#ededf1",
    },
    flex_item1:{
        width:"25%",
    },
    flex_item2:{
        width:"75%",
        paddingLeft:8,
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
    goods_like:{
        position:"absolute",
        right:"0%",
        bottom:"1%",
    },
    cate_2st_btn:{
        padding:6,
        width:"33.3333%",
        borderBottomWidth:1,
        borderRightWidth:1,
        borderColor:"#ddd",
    },
    cate_2st_btn_txt:{
        fontSize: Platform.OS === 'ios' ? 14 : 13,
    },
    cate_goods_list_item:{
        paddingVertical:26,
        borderBottomWidth:1,
        borderColor:"#ddd",
    },
    flex_bottom:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    cate_list_disc:{
        fontSize: Platform.OS === 'ios' ? 14 : 13,
    },
    cate_list_price:{
        fontSize: Platform.OS === 'ios' ? 18 : 17,
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