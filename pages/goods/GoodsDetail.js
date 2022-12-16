import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import logo from "../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";


// 공통 CSS 추가
import {container, bg_white, flex_between, flex_between_top,input, flex, flex_top,h18,fw600,text_primary,mb1,mt3,mt5} from '../../common/style/AtStyle';
import {sub_page, gary_bar, sub_container} from '../../common/style/SubStyle';

import goods_image from "../../assets/img/goods_image.jpg";
import goods_image_more from "../../assets/img/goods_image_more.jpg";


export default function GoodsDetail({navigation}) {

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
                            <Text style={styles.GoodsDetail_title}>일반석고보드 9.5T X 900 X 1800 </Text>
                            {/*상품명*/}
                            <View style={[flex]}>
                                <View style={[styles.wt25]}>
                                    <Text style={[styles.GoodsDetail_info_txt]}>판매가</Text>
                                </View>
                                <View style={[styles.wt75]}>
                                    <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>{goods_price} 원</Text>
                                </View>
                            </View>
                            {/*판매가*/}
                            <View style={[flex,styles.border_b]}>
                                <View style={[styles.wt25]}>
                                    <Text style={[styles.GoodsDetail_info_txt]}>자재안내</Text>
                                </View>
                                <View style={[styles.wt75]}>
                                    <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>{goods_guide}</Text>
                                </View>
                            </View>
                            {/*자재안내*/}
                            <View style={[flex_between_top,mt3]}>
                                <View style="">
                                    <Text style={[styles.GoodsDetail_info_txt]}>수량</Text>
                                    <View style={[flex]}>
                                        <TouchableWithoutFeedback onPress={onPress}>
                                            <View style={styles.button}>
                                                <Text style={styles.button_txt}>＋</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TextInput style={[input,styles.input_wt]} editable={false} selectTextOnFocus={false}  value={goods_cnt_test} />
                                        <TouchableWithoutFeedback onPress={onPress}>
                                            <View style={styles.button}>
                                                <Text style={styles.button_txt}>－</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>


                                </View>
                                <View style="">
                                    <Text style={[styles.GoodsDetail_info_txt]}>총금액</Text>
                                    <Text style={[styles.GoodsDetail_total_price]}>{goods_total_price}</Text>
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
        fontSize:18,
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
});