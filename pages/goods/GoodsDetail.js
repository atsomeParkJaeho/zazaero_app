import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    Alert,
    KeyboardAvoidingView
} from 'react-native';

import RenderHtml from 'react-native-render-html';
import WrappedText from "react-native-wrapped-text";

// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    flex_between_top,
    input,
    flex,
    flex_top,
    h18,
    fw600,
    text_primary,
    mb1,
    mt3,
    btn_primary,
    mt5,
    countinput,
    flex_around,
    btn_outline_primary,
    btn_outline_danger,
    btn_black,
    count_btn,
    pos_center,
    count_btn_txt,
    wt1, wt9, text_center
} from '../../common/style/AtStyle';
import {sub_page, gary_bar, sub_container} from '../../common/style/SubStyle';

//더미데이터
import {goodsDetail, Price} from "../../util/util";

import WishlistNon from "../../icons/ico_heart_nc.svg";
import Wishlist from "../../icons/ico_heart_c.svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";





export default function GoodsDetail({route,navigation}) {

    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });

    let {uid} = route.params;
    console.log('넘어온값 : '+uid);
    // 수량 데이터 상태 임시

    // ===========1. 상품상세정보 상태 정의======
    const [GoodsDetail,setGoodsDetail] = useState([]);

    // ============2. 상품출력===============
    useEffect(()=>{
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
            act_type    :   "get_goods_info",
            goods_uid   :   uid,
            mem_uid     :   Member,
        },{
            headers: {
                'Content-type': 'multipart/form-data',
            }
        }).then((res)=>{
            if(res) {
                const {result, goods_info, my_cart_cnt} = res.data;
                if(result === 'OK') {
                    setGoodsDetail({...goods_info, my_cart_cnt:1})

                } else {
                    console.log('실패');
                }
            }
        });
    },[Member]);

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
                    if(GoodsDetail.my_zzim_flag === 'Y') {
                        Alert.alert('','즐겨찾기에서 삭제하였습니다.');
                        setGoodsDetail({...GoodsDetail,my_zzim_flag:'N'});
                    }
                    if(GoodsDetail.my_zzim_flag === 'N') {
                        Alert.alert('','즐겨찾기에 추가하였습니다.');
                        setGoodsDetail({...GoodsDetail,my_zzim_flag:'Y'});
                    }

                }
            } else {
                const {result} = res.data;
                console.log(result);
            }
        }).catch((error)=>{console.log(error)});
        // // 내 즐겨찾기에 등록된 상품 필터링하기
    }
    

    // ====================4. 수량증가 설정==================
    const goodsCnt = (type, value) => {
        let test = setGoodsDetail({
            ...GoodsDetail,
            my_cart_cnt:1,
        });

        if(type === 'minus') {
            console.log('마이너스');
            setGoodsDetail({
                ...GoodsDetail,
                my_cart_cnt:Number((GoodsDetail.my_cart_cnt < 1) ? (GoodsDetail.my_cart_cnt):(GoodsDetail.my_cart_cnt -=1)),
            });
        }

        if(type === 'plus') {
            console.log('플러스');
            setGoodsDetail({
                ...GoodsDetail,
                my_cart_cnt:Number(GoodsDetail.my_cart_cnt+=1),
            });
        }

        if(type === 'my_cart_cnt') {
            console.log('직접입력');
            setGoodsDetail({
                ...GoodsDetail,
                my_cart_cnt:Number(value),
            });
        }
    }

    //자재 상세데이터

    let goForm = (type,uid) => {
        if(type === 'cart') {
            Alert.alert(
                '장바구니에 담으시겠습니까?',
                '',
                [
                    {text: '취소', onPress: () => {}, style: 'destructive'},
                    {
                        text: '확인 ',
                        onPress: () => {
                            axios.post('http://49.50.162.86:80/ajax/UTIL_cart.php',{
                                act_type            : 'save_cart',
                                goods_uid           : uid,           // 상품 uid
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

                            Alert.alert('','장바구니에 추가하였습니다.');
                        },
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => {},
                },
            );
        }

        if(type === 'order') {
            // 상품을 장바구니에 담는다
            axios.post('http://49.50.162.86:80/ajax/UTIL_cart.php',{
                act_type            : 'save_cart',
                goods_uid           : uid,           // 상품 uid
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
                        navigation.navigate('장바구니');
                        console.log(order_uid);
                    } else {
                        console.log('실패');
                        return;
                    }
                }
            })


        }

    }


    const source = {
        html: GoodsDetail.summary_contents
    };


    console.log('상품정보 확인 / ',GoodsDetail);



    return (
        <>
            <KeyboardAvoidingView style={[styles.avoidingView]} behavior={Platform.select({ios: 'padding'})}>
            <ScrollView style={[bg_white]}>
                <View style={[styles.GoodsDetail]}>
                    <View style={[container]}>
                        <View style={[styles.goods_iamge_box]}>
                            <Image style={styles.goods_image} source={{uri:"http://www.zazaero.com"+GoodsDetail.list_img_url}}/>
                        </View>
                        {/*상품이미지*/}
                        <View style={[styles.GoodsDetail_info]}>

                            <WrappedText  textStyle={[styles.GoodsDetail_title,]}>
                                {GoodsDetail.goods_name}
                            </WrappedText>

                            {/*상품명*/}
                            <View style={[flex]}>
                                <View style={[styles.wt25]}>
                                    <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>판매가</Text>
                                </View>
                                <View style={[styles.wt75]}>
                                    <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                        {Price(GoodsDetail.price) } 원
                                    </Text>
                                </View>
                            </View>
                            {/*판매가*/}
                            <View style={[flex,styles.border_b]}>
                                <View style={[styles.wt25]}>
                                    <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>자재안내</Text>
                                </View>
                                <View style={[styles.wt75]}>
                                    <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>4일 이상 소요 </Text>
                                </View>
                            </View>
                            {/*자재안내*/}
                            <View style={[flex_between_top,mt3]}>
                                <View style="">
                                    <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>수량</Text>
                                    <View style={[flex]}>
                                        {/*===============마이너스 수량==================*/}
                                        {/*=============마이너스 버튼==========*/}
                                        <TouchableWithoutFeedback
                                            onPress={() => goodsCnt('minus')}>
                                            <View style={[count_btn]}>
                                                <View style={[pos_center]}>
                                                    <Text
                                                        style={[count_btn_txt]}>－</Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        {/*============수량=================*/}
                                        <TextInput style={[countinput,]}
                                                   onChangeText={(my_cart_cnt) => goodsCnt('my_cart_cnt',my_cart_cnt)}
                                                   value={`${GoodsDetail.my_cart_cnt}`}
                                        />
                                        {/*=============플러스 버튼============*/}
                                        <TouchableWithoutFeedback
                                            onPress={() => goodsCnt('plus')}>
                                            <View style={[count_btn]}>
                                                <View style={[pos_center]}>
                                                    <Text
                                                        style={[count_btn_txt]}>＋</Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>


                                </View>
                                <View style="">
                                    <Text style={[styles.GoodsDetail_info_txt]}>총금액</Text>
                                    <Text style={[styles.GoodsDetail_total_price]}>
                                        {Price(GoodsDetail.price * GoodsDetail.my_cart_cnt)} 원
                                    </Text>
                                </View>
                            </View>
                            {/*수량*/}

                        </View>
                        {/*상품정보*/}
                        <View style={[styles.GoodsDetail_more_image,mt5]}>
                            {/*<Text style={[styles.GoodsDetail_more_image_txt]}>추가 이미지</Text>*/}
                            <RenderHtml source={source}/>
                        </View>
                        {/*추가 이미지*/}
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.bottom_btn]}>
                <View style={[flex]}>
                    <View style={[styles.wt1_5]}>
                            <TouchableOpacity style={[styles.wish]}  onPress={()=>goWish(GoodsDetail.goods_uid)}>
                                {(GoodsDetail.my_zzim_flag === 'Y') ? (
                                    <>
                                        <Wishlist width={35} height={24} />
                                    </>
                                ):(
                                    <>
                                        <WishlistNon width={35} height={24} />
                                    </>
                                )}
                            </TouchableOpacity>
                    </View>
                    <View style={[styles.wt8_5]}>
                        <View style={[flex_around]}>
                            <TouchableOpacity style={styles.btn} onPress={() => goForm('cart',GoodsDetail.goods_uid)}>
                                <Text style={[btn_primary,styles.center,styles.boottom_btn]}>장바구니 담기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={() => goForm('order',GoodsDetail.goods_uid)}>
                                <Text style={[btn_black,styles.center,styles.boottom_btn]}>장바구니 가기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            {/*장바구니/구매*/}
            <View style={[styles.ios_pb]} />
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    avoidingView: {
        flex: 1,
    },
    GoodsDetail: {
        //앱의 배경 색
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    goods_iamge_box:{
        borderWidth:1,
        borderColor:"#ccc",
        paddingTop:"100%",
    },
    goods_image:{
        paddingTop:"100%",
        position: "absolute",
        width: "100%",
        marginLeft:"auto",
        marginRight:"auto",
    },
    GoodsDetail_info:{
        paddingVertical:20,
    },
    GoodsDetail_title:{
        fontSize: Platform.OS === 'ios' ? 18 : 16,
        fontWeight:"500",
        color:"#333",
        lineHeight:28,
    },
    wt25: {
        width: "25%",
        backgroundColor:"#f8f8f8",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderRightWidth:0,
        borderBottomWidth:0,
    },
    wt75: {
        width: "75%",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderLeftWidth:0,
        borderBottomWidth:0,
    },
    GoodsDetail_info_txt:{
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        color:"#333",
        lineHeight:24,
        textAlign:"right",
    },
    GoodsDetail_info_txt_val:{
        fontSize: Platform.OS === 'ios' ? 15 : 14,
        lineHeight:24,
        fontWeight:"500",
        textAlign:"right",
    },
    border_b:{
        borderColor:"#ddd",
        borderBottomWidth:1,
    },
    input_wt:{
        width:"auto",
        textAlign:"center",
    },
    GoodsDetail_total_price:{
        fontSize: Platform.OS === 'ios' ? 24 : 23,
        lineHeight:27,
        fontWeight:"500",
        color:"#3D40E0",
    },
    GoodsDetail_more_image_txt:{
        backgroundColor:"#999",
        color:"#fff",
        padding:5,
    },
    goods_image_more:{
        width: "100%",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#eee",
        padding: 8,
        borderWidth:1,
        borderTopLeftRadius:100,
        borderTopRightRadius:100,
        borderBottomLeftRadius:100,
        borderBottomRightRadius:100,
        borderColor:"#eee",
    },
    button_txt:{
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        fontWeight:"500",
    },
    btn:{
        width:"50%",
    },
    center:{
        fontSize:15,
        textAlign:"center",
        paddingVertical:20,
    },
    boottom_btn:{
        paddingBottom: 20,
    },
    wt1_5:{
        width:"15%",
    },
    wt8_5:{
        width:"85%",

    },
    wish:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    ios_pb:{
        paddingBottom: Platform.OS === 'ios' ? 17 : 0,
    },
});