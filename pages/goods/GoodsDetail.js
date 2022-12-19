import React, {useState} from 'react';
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
import logo from "../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";


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
 import {goodsDetail} from "../../util/util";

import goods_image from "../../assets/img/goods_image.jpg";
import goods_image_more from "../../assets/img/goods_image_more.jpg";


export default function GoodsDetail({navigation}) {

    // 수량 데이터 상태 임시
    const [GoodsCnt, setGoodsCnt] = useState({
        Cnt:0,
    });
    const CntUp = (type,cnt) => {

        if(type == 'plus') {
            setGoodsCnt({
                ...GoodsCnt,
                Cnt:GoodsCnt.Cnt += 1,
            });
        }
        if(type == 'minus') {
            setGoodsCnt({
                ...GoodsCnt,
                Cnt:GoodsCnt.Cnt -= 1,
            });
        }
        if(type == 'GoodsCnt') {
            setGoodsCnt({
                Cnt:cnt,
            });
        }

    }

    const [GoodsDetail,setGoodsDetail] = useState(goodsDetail);
    //자재 상세데이터

    let goods_price_test = 14000;
    let goods_price =  (new String(goods_price_test)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //판매가
    let goods_guide = "발주일로부터 평균 4일 소요";

    let goods_total_price_test = 140000;
    let goods_total_price =  (new String(goods_total_price_test)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //총금액

    let goods_cnt_test = "1";
    //수량
    const onPress = () => {
        setNumber(countr + 1);
    };
    const onDecrease = () => {
        setNumber(number - 1);
    };

    const Cart = () =>{
        Alert.alert(
            '장바구니에 담으시겠습니까?',
            '',
            [
                {text: '취소', onPress: () => {}, style: 'destructive'},
                {
                    text: '확인 ',
                    onPress: () => {
                        // onDelete(id);
                        alert('추가 완료하였습니다.');
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
    //장바구니 알림창

    const GoBuy = () =>{
        {navigation.navigate('장바구니')}
    }



    return (
      
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.mypageinfo]}>
                    <View style={[container]}>
                        <View style={[styles.goods_iamge_box]}>
                            <Image style={styles.goods_image} source={goods_image}/>
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
                                    <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>{goods_price} 원</Text>
                                </View>
                            </View>
                            {/*판매가*/}
                            <View style={[flex,styles.border_b]}>
                                <View style={[styles.wt25]}>
                                    <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>자재안내</Text>
                                </View>
                                <View style={[styles.wt75]}>
                                    <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>{goods_guide} </Text>
                                </View>
                            </View>
                            {/*자재안내*/}
                            <View style={[flex_between_top,mt3]}>
                                <View style="">
                                    <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>수량</Text>
                                    <View style={[flex]}>
                                        {/*===============마이너스 수량==================*/}
                                        <TouchableWithoutFeedback onPress={()=>CntUp('minus')}>
                                            <View style={[count_btn]}>
                                                <View style={[pos_center]}>
                                                    <Text style={[count_btn_txt]}>－</Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        {/*============수량 입력==============*/}
                                        <TextInput style={[countinput]}
                                           // onTextInput={(cnt)=>CntUp('GoodsCnt',cnt)}
                                           onChangeText={(Cnt)=>CntUp('Cnt',Cnt)}
                                           value={`${GoodsCnt.Cnt}`}
                                           defaultValue="1"
                                           keyboardType="number-pad"
                                        />
                                        {/*===============플러스 수량==================*/}
                                        <TouchableWithoutFeedback onPress={()=>CntUp('plus')}>
                                            <View style={[count_btn]}>
                                                <View style={[pos_center]}>
                                                    <Text style={[count_btn_txt]}>＋</Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>


                                </View>
                                <View style="">
                                    <Text style={[styles.GoodsDetail_info_txt]}>총금액</Text>
                                    <Text style={[styles.GoodsDetail_total_price]}>{goods_total_price} 원</Text>
                                </View>
                            </View>
                            {/*수량*/}

                        </View>
                        {/*상품정보*/}
                        <View style={[styles.GoodsDetail_more_image,mt5]}>
                            <Text style={[styles.GoodsDetail_more_image_txt]}>추가 이미지</Text>
                            <Image style={styles.goods_image_more} source={goods_image_more}  resizeMode="stretch"/>
                        </View>
                        {/*추가 이미지*/}
                    </View>
                </View>
            </ScrollView>
            <View style={[]}>
                <View style={[flex_around]}>
                    <TouchableOpacity style={styles.btn} onPress={() => Cart()}>
                        <Text style={[btn_primary,styles.center]}>장바구니</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('장바구니')}>
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