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
    KeyboardAvoidingView,
    useWindowDimensions
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
    wt1, wt9, text_center, mt1, bg_danger
} from '../../common/style/AtStyle';
import {sub_page, gary_bar, sub_container} from '../../common/style/SubStyle';

//더미데이터
import {goodsDetail, Price} from "../../util/util";

import WishlistNon from "../../icons/ico_heart_nc.svg";
import Wishlist from "../../icons/ico_heart_c.svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderHTML from "react-native-render-html";
import {get_goods_info, ins_cart, save_wish} from "./UTIL_goods";





export default function GoodsDetail({route,navigation}) {

    let {uid} = route.params;
    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    // ===========1. 상품상세정보 상태 정의======
    const [GoodsDetail,setGoodsDetail] = useState([]);
    const [GoodsCnt, setGoodsCnt] = useState(1);

    // ============2. 상품출력===============
    useEffect(()=>{
        get_goods_info(Member, uid).then((res)=>{
            if(res) {
                const {result, goods_info} = res.data;
                if(result === 'OK') {
                    setGoodsDetail({...goods_info, my_cart_cnt:1})

                } else {
                    console.log('실패');
                }
            }
        });
    },[Member]);

    // 5. 즐겨찾기 액션
    const goWish = (link_uid) => {
        save_wish(Member, link_uid).then((res)=>{
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
    }

    /**--------------------------------------------------------------------------------------**/
    const goAdd = (type, goods_uid) => {
        if(type === 'order') {
            console.log('상세 자재추가 액션');
            Alert.alert('','자재를 추가하시겠습니까?',[
                {text:'확인', onPress:()=>{InsOrderGoods(goods_uid)},},
                {text:'취소', onPress:()=>{},}
            ]);
        }
    }

    console.log(route.params.gd_order_uid);
    /**-----------------------------------------주문서에 자재 추가---------------------------------------------**/
    const InsOrderGoods = (goods_uid) => {
        ins_cart(Member, goods_uid).then((res)=>{
            if(res) {
                const {result} = res.data;
                console.log(result);
                if(result === 'OK') {
                    Alert.alert('','자재를 추가하였습니다.');
                } else {
                    console.log('실패');
                }
            }
        });
    }

    // ====================4. 수량증가 설정==================
    const goodsCnt = (type, value) => {
        if(type === 'minus') {
            console.log('마이너스');
            setGoodsCnt((0 > GoodsCnt) ? 1:GoodsCnt - 1);
        }
        if(type === 'plus') {
            console.log('플러스');
            setGoodsCnt(GoodsCnt + 1);
        }
        if(type === 'my_cart_cnt') {
            console.log('직접입력');
            setGoodsCnt(Number(value));
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
                            ins_cart(Member, uid, GoodsCnt).then((res)=>{
                                if(res) {
                                    const {result} = res.data;
                                    if(result === 'OK') {

                                    } else {
                                        console.log('실패');
                                        return;
                                    }
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
            navigation.replace('장바구니');
        }

    }


    const source = {
        html: GoodsDetail.summary_contents
    };
    const tagsStyles = {
        img: {

        },

    };

    console.log('상품정보 확인 / ',GoodsDetail);

    const { width } = useWindowDimensions();

    console.log(route.params.ord_status);

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
                                <WrappedText  textStyle={[styles.GoodsDetail_title]}>
                                    {GoodsDetail.goods_name}
                                </WrappedText>
                                {/*상품명*/}
                                <View style={[flex,mt1]}>
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
                                        <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                            4일 이상 소요
                                        </Text>
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
                                            value={`${GoodsCnt}`}
                                            keyboardType="number-pad"
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
                                <RenderHtml source={source} contentWidth={380} tagsStyles={tagsStyles}/>
                            </View>
                            {/*추가 이미지*/}
                        </View>
                    </View>
                </ScrollView>

                {(route.params.ord_status) ? (
                    <>
                        <View style={[styles.bottom_btn]}>
                            <View style={[flex]}>
                                <View style={{width:"100%"}}>
                                    <View style={[flex_around]}>
                                        <TouchableOpacity style={{width:"100%"}} onPress={() => goAdd('order',GoodsDetail.goods_uid)}>
                                            <Text style={[btn_primary,styles.center,]}>자재추가하기</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                ):(
                    <>
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
                    </>
                )}
                
                {/*장바구니/구매*/}
                <View style={[styles.ios_pb]} />
                {/*========상품즐겨찾기 체크시=========*/}
                {/*<View style={[styles.wish_pop]}>*/}
                {/*    <View style={[styles.wish_box,flex]}>*/}
                {/*        <Wishlist width={35} height={24} color={'blue'}/>*/}
                {/*        <Text style={styles.wish_box_txt} >즐겨찾기에 추가되었습니다.</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    RenderHtml:{
        backgroundColor:"blue",
        display:"none",
    },
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
    wish_pop: {
        position: "absolute",
        left: 50,
        bottom: Platform.OS === 'ios' ? 100 : 100,
        zIndex: 50,
        width: "100%",
        transform: [{ translateX: 40 }],
    },
    wish_box:{
        width:250,
        paddingVertical:12,
        paddingHorizontal:25,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        borderRadius:50,
    },
    wish_box_txt:{
        color:"#fff",
        marginLeft:'auto',
        marginRight:'auto',
    },
});