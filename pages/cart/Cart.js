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
    container_vertical,
    container_Horizontal,
    ms1,
    bg_gray,
    bg_secondary,
    justify_content_between,
    text_gray,
    mt2,
    h18,
    h17, text_center, h15, mt7, mt10
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
import CartIcon from "../../icons/uncart.svg";

// 장바구니 레이아웃 출력
export default function Cart({route, navigation}) {

    const [Member, setMember]        = useState();
    const [CartUid, setCartUid]      = useState(``);
    const [CartList, setCartList]    = useState([]);           // 장바구니 1차 카테고리 출력
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    const Update = useIsFocused();



    /**---------------------------------페이지 진입시 노출----------------------------------------**/
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
                    console.log(query,'/ 쿼리');
                } else {
                    console.log('실패');
                }
            }
        });

    }, [Update, Member]);



    /**---------------------------------장바구니 해당상품 삭제----------------------------------------**/
    const delCart = (order_uid,goods_uid) => {
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
                    console.log('성공');
                } else {
                    console.log('실패');
                }
            }
        });

        setCartList(CartList.map((cate) => {
            return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                    if(val.goods_uid === goods_uid) {
                        return {...val, goods_cart:!val.goods_cart, goods_chk:false,}
                    } else {
                        return val;
                    }
                })}
        }));

        if(goods_uid === 'not') {

        } else {
            Alert.alert('', '삭제완료 하였습니다.');
        }
    }

    /**---------------------------------옵션요청사항 있을시 체크----------------------------------------**/
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

    /**---------------------------------체크시 배송정보 등록이동창 활성화----------------------------------------**/
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


    /**-----------------------------------------장바구니 상품 수량변경--------------------------------------------------**/
    const modCart = (goods_uid, order_uid, type, value, goods_price) => {

        /**----------------------------상품수량 플러스--------------------------**/
        if(type === 'plus') {
            let cnt = Number(value) + 1;
            let price = Number(goods_price) ;
            /**----------------------------상품수량 증가시 뷰화면에서도 적용--------------------------**/
            setCartList(CartList.map((cate) => {
                return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                        if(val.goods_uid === goods_uid) {
                            return {...val, A_sel_option:val.A_sel_option.map(cnt=>{
                                    return {
                                        ...cnt,
                                        option_cnt      :Number(cnt.option_cnt) + 1,
                                    }
                                })}
                        } else {
                            return val;
                        }
                    })}
            }));
            goForm(cnt, price, order_uid, goods_uid);
        }

        /**----------------------------상품수량 마이너스--------------------------**/
        if(type === 'minus') {
            let cnt = Number(value) - 1;
            let price = Number(goods_price) ;
            setCartList(CartList.map((cate) => {
                return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                        if(val.goods_uid === goods_uid) {
                            return {...val, A_sel_option:val.A_sel_option.map(cnt=>{
                                    return {
                                        ...cnt,
                                        option_cnt      :(cnt.option_cnt > 1) ? Number(cnt.option_cnt)-1 : 1,
                                    }
                                })}
                        } else {
                            return val;
                        }
                    })}
            }));
            goForm(cnt, price, order_uid, goods_uid);
        }
        /**----------------------------상품수량 수기조절--------------------------**/
        if(type === 'order_item_cnt') {
            setCartList(CartList.map((cate) => {
                return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                        if(val.goods_uid === goods_uid) {
                            return {...val, A_sel_option:val.A_sel_option.map(cnt=>{
                                    return {...cnt, option_cnt:Number(value)}
                                })}
                        } else {
                            return val;
                        }
                    })}
            }));
        }
    }
    /**----------------------------업데이트 내용 적용--------------------------**/
    const goForm = (goods_cnt, goods_price, order_uid, goods_uid) => {
        let cnt   = (goods_cnt > 1) ? Number(goods_cnt) : 1;
        /**----------------------------업데이트 내용 적용--------------------------**/
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
            act_type        : "mod_cart",
            mem_uid         : Member,
            login_status    : "Y",
            cnt             : cnt,
            goods_price     : Number(goods_price),
            order_uid       : order_uid,
            goods_uid       : goods_uid,
        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result} = res.data;
                if (result === 'OK') {
                    console.log('적용완료 / ');
                } else {
                    console.log('실패');
                }
            }
        });
    }

    const allMod = (type, cate_uid, cate_name) => {
        if(type === 'All') {
            setCartUid(cate_name);
            setCartList(CartList.map((item)=>{
                if(item.cate_1st_uid === cate_uid) {
                    return {...item, A_goods_list:item.A_goods_list.map((val)=>{
                            return {...val, goods_chk:!val.goods_chk}
                        })}
                } else {
                    return item;
                }
            }));
        }

        if(type === 'Del') {

            let del_goods = CartList.map((item)=>(item.cate_1st_uid === cate_uid) && item.A_goods_list.map((val)=>(val.goods_chk === true) && val.order_uid));
            let total     = del_goods.reduce((val,idx)=>{
                return val.concat(idx);
            });
            let chk_uid = total.filter(val=>val !== false);

            chk_uid.map(uid=>delCart(uid,'not'));

            let temp = CartList.map((item)=>{
                if(item.cate_1st_uid === cate_uid) {
                    return {...item, A_goods_list:item.A_goods_list.map((val)=>{
                            if(val.goods_chk === true) {
                                return {...val, goods_cart:!val.goods_cart, goods_chk:false}
                            } else {
                                return val;
                            }
                        })}
                } else {
                    return item;
                }
            });
            setCartList(temp);
            Alert.alert('','상품을 삭제하였습니다.');
        }

    }

    /**---------------------------------클릭시 배송정보 입력창으로 이동----------------------------------------**/
    const goOrderForm = () => {
        // 중복상품 제어용 카테고리 cateUid
        let temp = CartList.map(cate=>cate.A_goods_list.filter(val=>(val.goods_chk === true)));
        let total = temp.reduce((val,idx)=>{
            return val.concat(idx);
        });
        let result = total.map(val=>val.cate_name);
        let find = result.indexOf(CartUid);

        if(find !== 0) {

            Alert.alert('','동일 카테고리면 선택 가능합니다.');
            setCartList(CartList.map((cate) => {
                return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                        return {...val, goods_chk:false}
                    })}
            }));

            return false;

        } else {

            return navigation.navigate('배송정보등록',{order_uid:total});;

        }

        console.log(total);

    }



    let list      = CartList.map(cate=>cate.A_goods_list.filter(val=>val.goods_chk === true));
    let arr       = list.map(val=>val.length);
    let cont      = 0;
    for (let i = 0; i < arr.length; i++) {
        cont += arr[i];
    }


    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.Cart]}>
                    <View style={[styles.cartList]}>
                        {/*===================1차 카테고리 리스트 출력==================*/}
                        <List.Section style={[styles.Section,{padding:0, margin:0}]}>
                            {(CartList.length !== 0) ? (
                                <>
                                    {CartList.map((cate,idx)=> {

                                        // goods_chk true 갯수 선택
                                        let cate_chk = cate.A_goods_list.filter(val=>val.goods_chk === true);
                                        let cart_cnt = cate.A_goods_list.filter(val=>val.goods_cart === false);
                                        let Chk_flag = (cate_chk.length === cart_cnt.length);

                                        console.log(cart_cnt.length, '/ 카테 장바구니 체크 수량');
                                        console.log(cate_chk.length,' / 카테고리 장바구니 전체 수량');

                                        if(cart_cnt.length > 0) {
                                            return (
                                                <>
                                                    <List.Accordion style={[container, styles.Accordion_tit]}
                                                                    title={cate.cate_1st_name} key={idx}>

                                                        <View style={[bg_white, container, {
                                                            borderBottomWidth: 1,
                                                            borderColor: "#ddd"
                                                        }]}>
                                                            <View style={[flex, {justifyContent: "space-between",}]}>
                                                                <View style={[d_flex]}>
                                                                    <Checkbox style={styles.all_check} color={"#4630eb"}
                                                                              onValueChange={()=>allMod(`All`,cate.cate_1st_uid, `${cate.cate_1st_name}`)}
                                                                              value={Chk_flag}
                                                                    />
                                                                    {/*숨김처리*/}
                                                                    <Checkbox style={styles.chk_view} color={"#4630eb"}
                                                                              onValueChange={()=>allMod(`All`,cate.cate_1st_uid, `${cate.cate_1st_name}`)}
                                                                    />
                                                                    <Text style={[ms1]}>전체선택</Text>
                                                                </View>
                                                                <View style={[d_flex]}>
                                                                    <TouchableOpacity
                                                                        onPress={() => allMod(`Del`,cate.cate_1st_uid, `${cate.cate_1st_name}`)}>
                                                                        <Text style={[ms1, text_gray]}>선택상품 삭제</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        {cate.A_goods_list.map(val => {
                                                            /**------------------------------------------------------**/
                                                            let goods_cnt = val.A_sel_option.map(cnt => cnt.option_cnt);      // 상품 수량
                                                            let goods_price = val.A_sel_option.map(cnt => cnt.option_price);  // 상품 원가격
                                                            /**------------------------------------------------------**/
                                                            return (
                                                                <>
                                                                    {(val.goods_cart === false) && (
                                                                        <View key={val.ind_cfg_uid}
                                                                              style={[styles.pb_2, {
                                                                                  padding: 15,
                                                                                  borderColor: "#e0e0e0"
                                                                              }]}>
                                                                            {/*================자재명==============*/}
                                                                            <View style={[flex_between, styles.pd_18]}>
                                                                                <View style={[flex, wt8]}>
                                                                                    <Checkbox
                                                                                        onValueChange={() => goFormChk(val.goods_uid, val.cate_name)}
                                                                                        value={val.goods_chk}
                                                                                        style={styles.all_check}
                                                                                        color={"#4630eb"}/>
                                                                                    {/*숨김처리*/}
                                                                                    <Checkbox
                                                                                        onValueChange={() => goFormChk(val.goods_uid, val.cate_name)}
                                                                                        value={val.goods_chk}
                                                                                        style={styles.chk_view}
                                                                                        color={"#4630eb"}
                                                                                    />

                                                                                    <Text numberOfLines={1}
                                                                                          style={styles.all_check_txt}>
                                                                                        {val.goods_name}

                                                                                    </Text>

                                                                                </View>
                                                                                {/*=============삭제버튼============*/}
                                                                                <TouchableOpacity
                                                                                    onPress={() => delCart(val.order_uid, val.goods_uid)}>
                                                                                    <View style="">
                                                                                        <Icon name="close"
                                                                                              size={25}
                                                                                              color="#000"/>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            {/*=============상품상세정보===============*/}
                                                                            <View style={[flex]}>
                                                                                <View
                                                                                    style={[styles.flex_items, styles.flex_items1]}>
                                                                                    <TouchableOpacity onPress={() => {
                                                                                        navigation.navigate('상품상세', {uid: val.goods_uid})
                                                                                    }}>
                                                                                        <Image style={styles.cart_goods_img}
                                                                                               source={{uri: "http://49.50.162.86:80" + val.list_img_url}}/>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                                <View
                                                                                    style={[styles.flex_items, styles.flex_items2]}>
                                                                                    <View style={[flex_between, styles.pd_20]}>
                                                                                        {/*가이드라인*/}
                                                                                        <View style="">
                                                                                            <Text
                                                                                                style={(val.goods_guide_name) && styles.goods_disc}>
                                                                                                {(val.goods_guide_name) && val.goods_guide_name}
                                                                                            </Text>
                                                                                        </View>
                                                                                        {/*자재가격*/}
                                                                                        <View style="">
                                                                                            <Text style={styles.goods_price}>
                                                                                                {Price(`${goods_price * goods_cnt}`)}원
                                                                                                {/*{Price(val.)}원*/}
                                                                                            </Text>
                                                                                        </View>
                                                                                    </View>
                                                                                    <View style={[flex]}>
                                                                                        {/*=============마이너스 버튼==========*/}
                                                                                        <TouchableWithoutFeedback
                                                                                            onPress={() => modCart(val.goods_uid, val.order_uid, 'minus', goods_cnt, goods_price)}>
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
                                                                                            onChangeText={(order_item_cnt) => modCart(val.goods_uid, val.order_uid, 'order_item_cnt', order_item_cnt, goods_price)}
                                                                                            value={`${goods_cnt}`}
                                                                                            returnKeyType="done"
                                                                                            onSubmitEditing={() => goForm(goods_cnt, goods_price, val.order_uid, val.goods_uid)}
                                                                                        />
                                                                                        {/*=============플러스 버튼============*/}
                                                                                        <TouchableWithoutFeedback
                                                                                            onPress={() => modCart(val.goods_uid, val.order_uid, 'plus', goods_cnt, goods_price)}>
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
                                                                            {(val.cate_3rd_guide_name) && (
                                                                                <>
                                                                                    <View
                                                                                        style={[flex_between, {paddingTop: 15,}]}>
                                                                                        <Text style={styles.Request_txt}>
                                                                                            {val.cate_3rd_guide_name}
                                                                                        </Text>
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
                                                                                        <TextInput style={[textarea]}
                                                                                                   multiline={true}
                                                                                                   numberOfLines={4}/>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </View>
                                                                    )}
                                                                </>
                                                            );
                                                        })}
                                                    </List.Accordion>
                                                </>
                                            );
                                        }
                                    })}
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </List.Section>
                        {/**-------------------------{상품없음 이미지 추가 하기}------------------------------------------**/}
                        <View style={[flex,justify_content_center]}>
                            <View style={[mt10]}>
                                <CartIcon width={200} height={223} style={[styles.CartIcon]}/>
                                <Text style={[mt2,h15,text_center]}>
                                    장바구니에 등록된 자재가 없습니다.
                                </Text>
                            </View>

                        </View>
                        {/**-------------------------{상품없음 이미지 추가 하기}------------------------------------------**/}
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
    CartIcon:{
        borderWidth:1,
        borderColor:"#fff",
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
    chk_view:{
        position:"absolute",
        opacity:0,
        zIndex: 10,
        width:"100%",
    }
});