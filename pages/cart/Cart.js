import React, {useState, useEffect, useCallback} from 'react';
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
    Switch, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {List} from 'react-native-paper';
import Checkbox from 'expo-checkbox';

// 공통 CSS 추가
import {
    container,
    bg_white,
    flex,
    flex_between,
    textarea,
    count_btn,
    pos_center,
    switch_bar,
    count_btn_txt,
    countinput,
    bg_primary,
    d_flex,
    justify_content_center,
    align_items_center,
    text_light,
    wt8,
    bg_light,
    container_vertical, container_Horizontal, ms1, bg_gray, bg_secondary, justify_content_between, text_gray
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';

//이미지 추가
import col1 from "../../assets/img/co1.png";
import col2 from "../../assets/img/co2.png";
import col3 from "../../assets/img/co3.png";
import Footer from "../Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useIsFocused} from "@react-navigation/native";
import {OnlyNum, Price} from "../../util/util";

// 장바구니 레이아웃 출력
export default function Cart({route, navigation}) {

    const [Member, setMember] = useState();
    const [CartUid, setCartUid] = useState([]);
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    console.log('회원코드 1 / ', Member);
    const Update = useIsFocused();
    // ========================1. 상태 설정===============
    const [CartList, setCartList]    = useState([]);           // 장바구니 1차 카테고리 출력
    const [checked, setChecked]      = useState(false);
    // ====================2. 출력리스트===========
    useEffect(() => {

        // //====================장바구니 목록을 출력=================///
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
            act_type        : "get_cart_list_new",
            login_status    : "Y",
            mem_uid         : Member,

        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result,query ,A_order} = res.data;
                if (result === 'OK') {
                    setCartList(A_order);
                } else {
                    console.log('실패');
                }
            }
        });

    }, [Member, Update]);



    // ==============3. 장바구니 삭제 설정=================
    const delCart = (order_uid) => {
        console.log(order_uid)
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
            act_type        : "del_cart",
            login_status    : "Y",
            mem_uid         : Member,
            A_order_uid     : {order_uid},
        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result} = res.data;
                if (result === 'OK') {
                    Alert.alert('', '삭제완료 하였습니다.');
                    setCartList(CartList.map((cate) => {
                        return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                                if(val.order_uid === order_uid) {
                                    return {...val, goods_cart:!val.goods_cart}
                                } else {
                                    return val;
                                }
                            })}
                    }));
                } else {
                    console.log('실패');
                }
            }
        });


    }

    // ==============5. 옵션비 있을시 체크 설정==================
    const CartOption = (uid) => {
        setCartList(CartList.map((cate) => {
            return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                    if(val.goods_uid === uid) {
                        return {...val, goods_option_chk:!val.goods_option_chk}
                    } else {
                        return val;
                    }
                })}

        }));
    }

    const goFormChk = (uid, cate) => {
        if(cate) {
            setCartUid(cate); // 카테고리 넣기
        } else if(!cate) {
            setCartUid(''); // 카테고리 넣기
        }
        setCartList(CartList.map((cate) => {
            return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                        if(val.goods_uid === uid) {
                            return {...val, goods_chk:!val.goods_chk}
                        } else {
                            return val;
                        }
                    })}
        }));
    }

    // ===================7. 클릭시 배송정보 입력란으로 이동==================
    const goOrderForm = () => {
        let test = list.map((key)=>key.map(val=>{
            if(val.cate_name !== CartUid) {
                Alert.alert('','중복 카테고리만 가능합니다.');
                return false;
            } else {
                return console.log('test');
                // return navigation.navigate('배송정보등록',{order_uid:list});
            }
        }));
        if(test.indexOf())
        console.log(test,'/ 테스트');
    }

    // ====================9. 선택 삭제==============
    const chkDel = () => {
        console.log('test');
        // 1. 체크한 상품만 필터링
        let goForm = CartList.filter((val) => {
            const {order_uid} = val;
            if (val.goods_chk === true) {
                axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
                    act_type        : "del_cart",
                    login_status    : "Y",
                    mem_uid         : Member,
                    A_order_uid     : {order_uid},
                }, {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    }
                }).then((res) => {
                    if (res) {
                        const {result} = res.data;
                        if (result === 'OK') {

                        } else {
                            console.log('실패');
                        }
                    }
                });
            }
        });
        console.log('출력 / ', goForm);
        let temp = CartList.map((val) => {
            return {...val, goods_cart: !val.goods_cart,};
        });
        setCartList(temp);
        Alert.alert('','상품을 삭제 하였습니다.');
    }
    console.log(CartList,'확인 3');
    console.log(CartUid,'확인 2');


    /**===========================================선택상품 필터링==================================================**/
    let result = CartList.map(cate=>cate.A_goods_list.map(val=>{
       if(val.goods_chk) {
           return val;
       }
    }));

    let list      = CartList.map(cate=>cate.A_goods_list.filter(val=>val.goods_chk === true));
    let arr       = list.map(val=>val.length);
    let cont      = 0;
    for (let i = 0; i < arr.length; i++) {
        cont += arr[i];
    }

    console.log(cont,' / 확인');
    console.log(list,' / 123123123');

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.Cart]}>
                    <View style={[styles.cartList]}>
                        {/*===================1차 카테고리 리스트 출력==================*/}
                        <List.Section style={[styles.Section,{padding:0, margin:0}]}>
                            {CartList.map((cate,idx)=>(
                                <>
                                    <List.Accordion style={[container,styles.Accordion_tit]} title={cate.cate_1st_name} key={idx}>
                                        {/*================================카테고리 상품 체크=====================*/}
                                        <View style={[bg_white,container,{ borderBottomWidth: 1,borderColor:"#ddd"}]}>
                                            <View style={[flex,{justifyContent:"space-between",}]}>
                                                <View style={[d_flex]}>
                                                    <Checkbox onValueChange={(all) => goFormChk(`All`,`${cate.cfg_val1}`,all)} style={styles.all_check}
                                                              color={"#4630eb"}
                                                    />
                                                    <Text  style={[ms1]}>전체선택</Text>
                                                </View>
                                                <View style={[d_flex]}>
                                                    <TouchableOpacity onPress={()=>ChkDelCart(`${cate.cfg_val1}`)}>
                                                        <Text  style={[ms1,text_gray]}>선택상품 삭제</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        {cate.A_goods_list.map(val=>(
                                            <>
                                                {(val.goods_cart === false) && (
                                                    <View key={val.ind_cfg_uid}
                                                          style={[styles.pb_2, {padding: 15, borderColor:"#e0e0e0"}]}>
                                                        {/*================자재명==============*/}
                                                        <View style={[flex_between, styles.pd_18]}>
                                                            <View style={[flex, wt8]}>
                                                                <Checkbox
                                                                    onValueChange={() => goFormChk(val.goods_uid,val.cate_name)}
                                                                    value={val.goods_chk}
                                                                    style={styles.all_check}
                                                                    color={"#4630eb"}/>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        navigation.navigate('상품상세', {uid: val.goods_uid})
                                                                    }}>
                                                                    <Text numberOfLines={1} style={styles.all_check_txt}>
                                                                        {val.goods_name}

                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            {/*=============삭제버튼============*/}
                                                            <TouchableOpacity
                                                                onPress={() => delCart(val.order_uid)}>
                                                                <View style="">
                                                                    <Icon name="close"
                                                                          size={25}
                                                                          color="#000"/>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                        {/*=============상품상세정보===============*/}
                                                        <View
                                                            style={[flex]}>
                                                            <View style={[styles.flex_items, styles.flex_items1]}>
                                                                <Image
                                                                    style={styles.cart_goods_img}
                                                                    source={{uri: "http://49.50.162.86:80" + val.list_img_url}}/>
                                                            </View>
                                                            <View style={[styles.flex_items, styles.flex_items2]}>
                                                                <View style={[flex_between, styles.pd_20]}>
                                                                    {/*가이드라인*/}
                                                                    <View style="">
                                                                        <Text style={styles.goods_disc}>
                                                                            가이드라인
                                                                            {val.goods_uid}
                                                                            {val.A_order_uid}
                                                                        </Text>
                                                                    </View>
                                                                    {/*자재가격*/}
                                                                    <View style="">
                                                                        <Text
                                                                            style={styles.goods_price}>{Price(val.sum_order_price * val.order_item_cnt)}원</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={[flex]}>
                                                                    {/*=============마이너스 버튼==========*/}
                                                                    <TouchableWithoutFeedback
                                                                        onPress={() => modCart(val.goods_uid, 'minus')}>
                                                                        <View
                                                                            style={[count_btn]}>
                                                                            <View
                                                                                style={[pos_center]}>
                                                                                <Text
                                                                                    style={[count_btn_txt]}>－</Text>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableWithoutFeedback>
                                                                    {/*============수량=================*/}
                                                                    <TextInput
                                                                        style={[countinput,]}
                                                                        keyboardType="number-pad"
                                                                        onChangeText={(order_item_cnt) => modCart(val.goods_uid, 'order_item_cnt', order_item_cnt)}
                                                                        defaultValue={`${val.order_item_cnt}`}
                                                                        value={val.order_item_cnt}
                                                                    />
                                                                    {/*=============플러스 버튼============*/}
                                                                    <TouchableWithoutFeedback
                                                                        onPress={() => modCart(val.goods_uid, 'plus')}>
                                                                        <View
                                                                            style={[count_btn]}>
                                                                            <View
                                                                                style={[pos_center]}>
                                                                                <Text
                                                                                    style={[count_btn_txt]}>＋</Text>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableWithoutFeedback>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        {/*==============옵션상품 입력란===============*/}
                                                        <View style={[flex_between]}>
                                                            <Text
                                                                style={styles.Request_txt}>이
                                                                자재에 모델명, 제작관련 등 요청사항이
                                                                있으신가요?</Text>
                                                            <Switch
                                                                onValueChange={() => CartOption(val.goods_uid)}
                                                                value={val.goods_option_chk}
                                                                trackColor={{
                                                                    false: "#767577",
                                                                    true: "#4630eb"
                                                                }}
                                                                ios_backgroundColor="#3e3e3e"
                                                                style={[switch_bar]}
                                                            />
                                                        </View>
                                                        {(val.goods_option_chk) && (
                                                            <TextInput style={[textarea]} multiline={true} numberOfLines={4}/>
                                                        )}
                                                    </View>
                                                )}

                                            </>
                                        ))}
                                    </List.Accordion>
                                </>
                            ))}
                        </List.Section>
                    </View>
                </View>
            </ScrollView>
            {(cont > 0) ? (
                <>
                    <View style={[styles.go_cart, bg_primary, {paddingBottom: 36, paddingTop: 7,}]}>
                        <TouchableOpacity onPress={goOrderForm}>
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
            <Footer navigation={navigation}/>
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
    flex_items1:{
        width:"30%",
    },
    flex_items2:{
        width:"70%",
    },
    cart_goods_img:{
        borderRadius:5,
        width:90,
        height:80,
    },
    goods_disc:{
        fontSize:14,
        color:"#4549e0",
    },
    goods_price:{
        fontSize:22,
        color:"#222",
        letterSpacing:-1,
    },
    input: {
        width:"auto",
        height: 36,
        margin: 0,
        borderWidth: 1,
        paddingVertical:7,
        paddingHorizontal: 18,
        borderColor:"#ededf1",
        fontSize:12,
        color:"#000",
        textAlign:"center",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 8,
        borderWidth:1,
        borderColor:"#eee",
    },
    button_txt:{
        fontSize:12,
        fontWeight:"600",
    },
    Request_txt:{
        fontSize:13,
    },
    pb_2:{
        borderBottomWidth:1,
        borderColor:"#999",
        paddingBottom:20,
        marginBottom:20,
    },
    go_cart:{
        zIndex:100,
    },
});