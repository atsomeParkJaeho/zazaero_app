import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback, Alert
} from 'react-native';

import RenderHtml from 'react-native-render-html';

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
    countinput, flex_around, btn_outline_primary, btn_outline_danger, btn_black, count_btn, pos_center, count_btn_txt
} from '../../common/style/AtStyle';
import {sub_page, gary_bar, sub_container} from '../../common/style/SubStyle';

//더미데이터
import {goodsDetail, Price} from "../../util/util";

import goods_image from "../../assets/img/goods_image.jpg";
import goods_image_more from "../../assets/img/goods_image_more.jpg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";





export default function GoodsDetail({route,navigation}) {

    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    })


    let {uid} = route.params;
    console.log(uid);
    // 수량 데이터 상태 임시

    // ===========1. 상품상세정보 상태 정의======
    const [GoodsDetail,setGoodsDetail] = useState([]);

    // ============2. 상품출력===============
    useEffect(()=>{
        let data = {
            act_type    :"get_relation_goods",
            goods_uid   :uid,
        }
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php',data,{
            headers: {
                'Content-type': 'multipart/form-data',
            }
        }).then((res)=>{
            if(res) {
                const {result, goods_info} = res.data;
                if(result === 'OK') {
                    console.log(goods_info);
                    setGoodsDetail(goods_info);
                } else {
                    console.log('실패');
                }
            }
        });
    },[]);

    // ====================4. 수량증가 설정==================
    const goodsCnt = (type, value) => {

        let test = setGoodsDetail({
            ...GoodsDetail,
            goods_cnt:1,
        });

        if(type === 'minus') {
            console.log('마이너스');
            setGoodsDetail({
                ...GoodsDetail,
                goods_cnt:Number((GoodsDetail.goods_cnt < 1) ? (GoodsDetail.goods_cnt):(GoodsDetail.goods_cnt -=1)),
            });
        }

        if(type === 'plus') {
            console.log('플러스');
            setGoodsDetail({
                ...GoodsDetail,
                goods_cnt:Number(GoodsDetail.goods_cnt+=1),
            });
        }

        if(type === 'goods_cnt') {
            console.log('직접입력');
            setGoodsDetail({
                ...GoodsDetail,
                goods_cnt:Number(value),
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

    console.log('상품정보 / ',GoodsDetail);


    return (

        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.mypageinfo]}>
                    <View style={[container]}>
                        <View style={[styles.goods_iamge_box]}>
                            <Image style={styles.goods_image} source={{uri:"http://www.zazaero.com"+GoodsDetail.list_img_url}}/>
                        </View>
                        {/*상품이미지*/}
                        <View style={[styles.GoodsDetail_info]}>
                            <Text style={styles.GoodsDetail_title}>{GoodsDetail.goods_name} </Text>
                            {/*상품명*/}
                            <View style={[flex]}>
                                <View style={[styles.wt25]}>
                                    <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>판매가</Text>
                                </View>
                                <View style={[styles.wt75]}>
                                    <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                        {Price(GoodsDetail.price)} 원
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
                                                   keyboardType="number-pad"
                                                   onChangeText={(goods_cnt) => goodsCnt('goods_cnt',goods_cnt)}
                                                   value={`${GoodsDetail.goods_cnt+1}`}
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
                                        {Price(GoodsDetail.price)} 원
                                    </Text>
                                </View>
                            </View>
                            {/*수량*/}

                        </View>
                        {/*상품정보*/}
                        <View style={[styles.GoodsDetail_more_image,mt5]}>
                            <Text style={[styles.GoodsDetail_more_image_txt]}>추가 이미지</Text>
                            <RenderHtml source={source}/>
                        </View>
                        {/*추가 이미지*/}
                    </View>
                </View>
            </ScrollView>
            <View style={[]}>
                <View style={[flex_around]}>
                    <TouchableOpacity style={styles.btn} onPress={() => goForm('cart',GoodsDetail.goods_uid)}>
                        <Text style={[btn_primary,styles.center]}>장바구니</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => goForm('order',GoodsDetail.goods_uid)}>
                        <Text style={[btn_black,styles.center]}>구매하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/*장바구니/구매*/}

        </>
    );
}

const styles = StyleSheet.create({
    goods_iamge_box:{
        borderWidth:1,
        borderColor:"#ccc",
    },
    goods_image:{
        width:300,
        height:300,
        marginLeft:"auto",
        marginRight:"auto",
    },

    GoodsDetail_info:{
        paddingVertical:20,
    },
    GoodsDetail_title:{
        fontSize:18,
        fontWeight:"500",
        color:"#333",
        lineHeight:27,
        marginBottom:20,
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
        fontSize:14,
        color:"#333",
        lineHeight:24,
        textAlign:"right",
    },
    GoodsDetail_info_txt_val:{
        fontSize:15,
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
        fontSize:24,
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
        fontSize:14,
        fontWeight:"500",
    },
    btn:{
        width:"50%",
    },
    center:{
        fontSize:15,
        textAlign:"center",
        paddingVertical:20,

    }
});