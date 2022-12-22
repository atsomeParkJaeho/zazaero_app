import React, {useState, useEffect} from 'react';
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
    Switch
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
    count_btn_txt, countinput
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';

//이미지 추가
import col1 from "../../assets/img/co1.png";
import col2 from "../../assets/img/co2.png";
import col3 from "../../assets/img/co3.png";
import Footer from "../Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


// 장바구니 상품리스트 출력

function CartList({cateUid, navigation}) {
    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    })
    console.log('장바구니 상품 출력');
    console.log(cateUid);
    // 1. 장바구니 출력 설정
    const [CartList, setCartList] = useState([]);           // 장바구니 상품리스트 설정
    const [CartCate2nd, setCartCate2nd] = useState([]);     // 2차카테고리 설정

    // 2. 장바구니 상품 출력
    useEffect(() => {

        // 상품리스트 출력
        let data1 = {
            act_type        : "get_cart_list",
            login_status    : "Y",
            mem_uid         : Member
        }
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',data1,{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                //console.log(res);
                const {result, A_order} = res.data;
                console.log(result);
                if (result === 'OK') {
                    setCartList(A_order);
                } else {
                    console.log('실패');
                }
            }
        });

        // 2차 카테고리 리스트 출력
        let data2 = {
            act_type: "find_goods",
            cate_1st: cateUid,
        }
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php', data2, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_goods} = res.data;
                if (result === 'OK') {
                    setCartCate2nd( A_goods.map(val=>val.goods_uid));

                } else {
                    console.log(result);
                    console.log('실패');
                }
            }
        });

    }, [Member]);

    console.log(CartList);
    console.log('카테고리 코드 / ',CartCate2nd);

    return (
        <>
            <View style={styles.Accordion_items}>
                {/*=============반복문 구간=============*/}
                <View style={[styles.Accordion_itemsflex]}>
                    <View style={styles.pb_2}>
                        {CartList.map(val => (
                            <>
                                <View style={[flex_between,styles.pd_18]}>
                                    <View style={[flex]}>
                                        {/*<Checkbox style={styles.all_check} value={isChecked} onValueChange={setChecked}  color={"#4630eb"}  />*/}
                                        <Text style={styles.all_check_txt}>{val.goods_name} </Text>
                                    </View>
                                    <View style="">
                                        <Icon name="close" size={25} color="#000"/>
                                    </View>
                                </View>
                                <View style={[flex]}>
                                    {/*상품이미지*/}
                                    <View style={[styles.flex_items,styles.flex_items1]}>
                                        <Image style={styles.cart_goods_img} source={{url:'http://49.50.162.86:80'+val.list_img_url}}/>
                                    </View>

                                    <View style={[styles.flex_items,styles.flex_items2]}>
                                        <View style={[flex_between,styles.pd_20]}>
                                            <View style="">
                                                <Text style={styles.goods_disc}>수량 : {val.order_item_cnt} </Text>
                                            </View>
                                            <View style="">
                                                <Text style={styles.goods_price}>{val.sum_order_price}원 </Text>
                                            </View>
                                        </View>
                                        <View style={[flex]}>
                                            <TouchableWithoutFeedback >
                                                <View style={[count_btn]}>
                                                    <View style={[pos_center]}>
                                                        <Text style={[count_btn_txt]}>－</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TextInput style={[countinput,]}   value="1" />
                                            <TouchableWithoutFeedback >
                                                <View style={[count_btn]}>
                                                    <View style={[pos_center]}>
                                                        <Text style={[count_btn_txt]}>＋</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>
                            </>
                        ))}
                        <View style={[flex]}>
                            <View style={[styles.flex_items, styles.flex_items1]}>
                                {/*<Image style={styles.cart_goods_img} source={cart_items.ct_img}/>*/}
                            </View>
                            <View style={[styles.flex_items, styles.flex_items2]}>
                                <View style={[flex_between, styles.pd_20]}>
                                    <View style="">
                                        {/*<Text style={styles.goods_disc}>{cart_items.ct_disc} </Text>*/}
                                    </View>
                                    <View style="">
                                        {/*<Text style={styles.goods_price}>{cart_items.ct_price}원 </Text>*/}
                                    </View>
                                </View>
                                <View style={[flex]}>
                                    <TouchableWithoutFeedback>
                                        <View style={[count_btn]}>
                                            <View style={[pos_center]}>
                                                <Text style={[count_btn_txt]}>－</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TextInput style={[countinput,]} value="1"/>
                                    <TouchableWithoutFeedback>
                                        <View style={[count_btn]}>
                                            <View style={[pos_center]}>
                                                <Text style={[count_btn_txt]}>＋</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <View style={flex_between}>
                            <Text style={styles.Request_txt}>이 자재에 모델명, 제작관련 등 요청사항이 있으신가요?</Text>
                            {/*<Switch*/}
                            {/*    trackColor={{ false: "#767577", true: "#4630eb" }}*/}
                            {/*    thumbColor={isEnabled ? "#fff" : "#f4f3f4"}*/}
                            {/*    ios_backgroundColor="#3e3e3e"*/}
                            {/*    onValueChange={toggleSwitch}*/}
                            {/*    value={isEnabled}*/}
                            {/*    style={[switch_bar]}*/}
                            {/*/>*/}
                        </View>
                        <TextInput style={textarea} multiline={true} numberOfLines={4} placeholder="" value=""/>

                    </View>
                </View>
            </View>
        </>
    );

}


// 장바구니 레이아웃 출력
export default function Cart({navigation, route}) {
    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    })
    console.log('장바구니');
    console.log('회원 코드 / ', Member);
    // 1. 상태 설정
    const [CartCate1st, setCartCate1st] = useState([]);     // 1차카테고리 설정
    

    // 2. 카테고리 출력
    useEffect(() => {
        const data = {
            act_type: "goods_cate",
        }
        // 포스트시에 header 셋팅 할것
        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_cate_1st} = res.data;
                if (result === 'OK') {
                    // 1. 1차 카테고리를 담는다
                    setCartCate1st(A_cate_1st);

                } else {
                    console.log('실패');
                }
            }
        }).catch((err) => console.log(err));
    }, []);

    //console.log(CartCate1st);

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.Cart]}>
                    <View style={[container]}>
                        <View style={[flex_between]}>
                            <View style={[flex]}>
                                {/*<Checkbox style={styles.all_check} value={isChecked} onValueChange={setChecked}  color={"#4630eb"}  />*/}
                                <Text style={styles.all_check_txt}>전체선택(0/2)</Text>
                            </View>
                            <View style="">
                                <Text style={styles.goods_cart_del_btn}>상품삭제</Text>
                            </View>
                        </View>
                        {/* 전체선택 체크박스 영역*/}
                    </View>
                    <View style={[styles.cartList]}>
                        {/*===================1차 카테고리 리스트 출력==================*/}
                        <List.Section style={styles.Section}>
                            {/*=============반복문 구간==============*/}
                            {CartCate1st.map((val, idx) => (
                                <>
                                    <List.Accordion title={val.cfg_val1} style={[container, styles.Accordion_tit]}>
                                        {/*=============상품리스트 반복================*/}
                                        <CartList
                                        cateUid={val.ind_cfg_uid}
                                        />
                                    </List.Accordion>
                                </>
                            ))}

                        </List.Section>
                        {/*===================해당 카테고리 상품 출력==================*/}

                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation}/>
        </>

    );
}

const styles = StyleSheet.create({
    all_check: {
        borderRadius: 5,
    },
    all_check_txt: {
        marginLeft: 5,
    },
    goods_cart_del_btn: {
        fontSize: 12,
        color: "#a0aec0",
    },
    Accordion_tit: {
        backgroundColor: "#f9f9fb",
        borderBottomWidth: 1,
        borderColor: "#ededf1",
    },
    Accordion_items: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        paddingLeft: 16,
    },
    pd_18: {
        paddingBottom: 18,
    },
    pd_20: {
        paddingBottom: 20,
    },
    flex_items1: {
        width: "30%",
    },
    flex_items2: {
        width: "70%",
    },
    cart_goods_img: {
        borderRadius: 5,
        width: 90,
        height: 80,
    },
    goods_disc: {
        fontSize: 14,
        color: "#4549e0",
    },
    goods_price: {
        fontSize: 22,
        color: "#222",
        letterSpacing: -1,
    },
    input: {
        width: "auto",
        height: 36,
        margin: 0,
        borderWidth: 1,
        paddingVertical: 7,
        paddingHorizontal: 18,
        borderColor: "#ededf1",
        fontSize: 12,
        color: "#000",
        textAlign: "center",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 8,
        borderWidth: 1,
        borderColor: "#eee",

    },
    button_txt: {
        fontSize: 12,
        fontWeight: "600",
    },
    Request_txt: {
        fontSize: 13,
    },
    pb_2: {
        borderBottomWidth: 1,
        borderColor: "#999",
        paddingBottom: 20,
        marginBottom: 20,
    },
});