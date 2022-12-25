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
    align_items_center, pb2, wt8, wt2, d_flex, justify_content_end, btn_circle, bg_primary, bg_light, h13, text_primary
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';

//이미지 추가
import col1 from "../../assets/img/co1.png";
import col2 from "../../assets/img/co2.png";
import col3 from "../../assets/img/co3.png";
import goods_img_1 from "../../assets/img/goods_img_1.png";
import goods_like from "../../assets/img/ico_heart.png";
import Footer from "../Footer";

import {goodsList} from "../../util/util";
import axios from "axios";
import Chk from "../../icons/chk.svg";
import CartBag from "../../icons/cart_bag.svg";

export default function Wishlist({navigation,route}) {

    const cate_list = [ "목/형틀공사","바닥공사", "욕식공사", "도배공사"];


    const Cate_List2 = [

        {
            goods_uid:"125",
            goods_name:"일반석고보드 9.5T X 900 X 1800",
            goods_price:"3,410",
            goods_wish_chk:"N",
            goods_cart_chk:false,
            goods_guid_link:"발주일로부터 5일 소요",
        },
        {
            goods_uid:"115",
            goods_name:"라이트 브라운 테라조 포쉐린 타일[300*300] 일반석고보드",
            goods_price:"3,410",
            goods_wish_chk:"N",
            goods_cart_chk:false,
            goods_guid_link:"발주일로부터 3일 소요",
        },
        {
            goods_uid:"119",
            goods_name:"도배장판",
            goods_price:"3,410",
            goods_wish_chk:"N",
            goods_cart_chk:false,
            goods_guid_link:"즉시 발주가능",
        },  {
            goods_uid:"125",
            goods_name:"일반석고보드 9.5T X 900 X 1800",
            goods_price:"3,410",
            goods_wish_chk:"N",
            goods_cart_chk:false,
            goods_guid_link:"발주일로부터 5일 소요",
        },


    ];

    const [state,setState] = useState(Cate_List2);
    const [ready,setReady] = useState(true)

    const [count, onChangecount] = React.useState("");
    //수량
    const [Disc, onChangeDisc] = React.useState("");
    //내용

    const [isChecked, setChecked] = useState(false);


    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    //아코디언

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //스위치

    const numberState = useState(0);
    const number = numberState[0];
    const setNumber = numberState[1];

    const [countr, setCount] = useState(0);

    const onPress = () => {
        setNumber(countr + 1);
    };

    const onIncrease = () => {
        setNumber(number * 2);
    }

    const onDecrease = () => {
        setNumber(number - 1);
    }

    console.log(state);

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.Cart]}>
                    <View style={[container]}>

                    </View>
                    <View style={[styles.cartList]}>
                        <List.Section style={styles.Section}>

                            {cate_list.map((items, idx) =>

                                <List.Accordion
                                    style={styles.Accordion_tit}
                                    title={[items,idx+1]}
                                    key={idx}
                                    expanded={(idx+1 === 1) ? expanded:''}
                                    onPress={handlePress}
                                    left={ props =>  <Checkbox style={styles.all_check} value={isChecked} onValueChange={setChecked}  color={"#4630eb"}  />}
                                >
                                    <View style={styles.Accordion_items}>
                                        {Cate_List2.map((val,idx)=>
                                            <View style={styles.cate_goods_list_item}>
                                                <View style={[flex_top]}>
                                                    <View style={[styles.flex_item,styles.flex_item1]}>
                                                        <Image style={styles.cate_list_Thumbnail} source={goods_img_1}/>
                                                        <View style={styles.goods_like}>
                                                            <Image style={styles.goods_like_icon} source={goods_like}/>
                                                        </View>
                                                    </View>
                                                    <View style={[styles.flex_item,styles.flex_item2]}>
                                                        <View style={[flex_between,align_items_center,pb2]}>
                                                            <View style={[wt8]}>
                                                                <TouchableOpacity style="" onPress={() => {navigation.navigate('상품상세')}}>
                                                                    {/*========상품명========*/}
                                                                    <Text style={styles.cate_2st_btn_txt} numberOfLines={1}>{val.goods_name}</Text>
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
                                                                        <Checkbox style={styles.btn_cart} value={val.goods_cart_chk}
                                                                                  onValueChange={() => {
                                                                                      goChk(val.goods_uid)
                                                                                  }}/>
                                                                        <View style={{
                                                                            flex: 1,
                                                                            alignItems: "center",
                                                                            justifyContent: "center"
                                                                        }}>
                                                                            <CartBag width={16} height={22}></CartBag>
                                                                        </View>
                                                                    </View>
                                                                )}

                                                            </View>
                                                        </View>
                                                        <View style={styles.flex_bottom}>
                                                            <View style="">
                                                                <Text style={[h13,text_primary]}>{val.goods_guid_link}</Text>
                                                            </View>
                                                            <View style="">
                                                                <Text style={styles.cate_list_price}>3,410원</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )}

                                        {/*    */}
                                    </View>
                                </List.Accordion>
                            )}

                        </List.Section>
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation}/>
        </>
    );
}

function WishTest(Cate_List2) {
    console.log(Cate_List2);
    const [Wishlist, setWishlist] = useState([]);

        return (
            <>
                {Cate_List2.map((val, idx) => (
                    <>
                        <Text style={styles.Accordion_items_link_txt}>{val.ct_tit}</Text>

                    </>
                ))}
            </>
        );

}


const styles = StyleSheet.create({
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