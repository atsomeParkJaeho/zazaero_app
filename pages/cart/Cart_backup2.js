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
    count_btn_txt, countinput, bg_primary, d_flex, justify_content_center, align_items_center, text_light, wt8
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
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });


    console.log('장바구니');
    // console.log('회원 코드 / ', Member);
    // ========================1. 상태 설정===============
    const [CartCate1st, setCartCate1st] = useState([]);           // 1차카테고리 설정
    const [CartList, setCartList] = useState([]);           // 장바구니 상품리스트 출력
    const [Cate1stCode, setCate1stCode] = useState([]);           // 2차 카테고리 코드 설정
    console.log('회원코드 / ', Member);

    const Update = useIsFocused();
    // ====================2. 출력리스트===========
    useEffect(() => {
        //1. ====================1차 카테고리 리스트를 출력=================///
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
            act_type: "get_cate_list",
            depth: "1",

        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_cate} = res.data;
                if (result === 'OK') {
                    // ==========1차 카테고리 배열 설정=============//
                    console.log('확인');
                    setCartCate1st(A_cate);

                } else {
                    console.log('실패');
                }
            }
        });


        // //====================장바구니 목록을 출력=================///
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
            act_type: "get_cart_list",
            login_status: "Y",
            mem_uid: Member,

        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_order} = res.data;
                if (result === 'OK') {
                    let temp = A_order.map((val) => {
                        return {...val, goods_Cart: !val.goods_Cart,};
                    });
                    setCartList(temp);
                } else {
                    console.log('실패');
                }
            }
        });

    }, [Member, Update]);

    // ===================2. 1차 카테고리에 맞는 장바구니 상품 가져오기==================
    const getGoodsCate = (ind_cfg_uid) => {
        console.log('카테고리 코드 / ', ind_cfg_uid);

        axios.post('http://49.50.162.86:80/ajax/UTIL_goods.php', {
            act_type: "find_goods",
            cate_1st: ind_cfg_uid,
        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_goods} = res.data;
                if (result === 'OK') {

                    let temp = A_goods.map((val) => val.goods_uid);
                    setCate1stCode(temp);
                    console.log(temp);


                } else {
                    console.log('실패');
                }
            }
        });
    }


    // ==============3. 장바구니 삭제 설정=================
    const delCart = (order_uid) => {
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
            act_type: "del_cart",
            login_status: "Y",
            mem_uid: Member,
            A_order_uid: {order_uid},
        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result} = res.data;
                if (result === 'OK') {
                    Alert.alert('', '삭제완료 하였습니다.');
                } else {
                    console.log('실패');
                }
            }
        });

        let temp = CartList.map((val) => {
            if (order_uid === val.order_uid) {
                return {...val, goods_Cart: !val.goods_Cart,};
            }
            return val;
        });
        setCartList(temp);
    }
    // ====================4. 수량증가 설정==================
    const modCart = (uid, type, value) => {
        // 수량 증가시 설정
        if (type === 'plus') {
            console.log('플러스');
            let temp = CartList.map((val) => {
                if (uid === val.goods_uid) {
                    return {
                        ...val,
                        order_item_cnt: val.order_item_cnt += 1,
                    };
                }
                return val;
            });
            setCartList(temp);
        }
        // 수량 마이너스시 설정
        if (type === 'minus') {
            console.log('마이너스');
            let temp = CartList.map((val) => {
                if (uid === val.goods_uid) {
                    return {
                        ...val,
                        order_item_cnt: (val.order_item_cnt < 1) ? (val.order_item_cnt) : (val.order_item_cnt -= 1),
                    };
                }
                return val;
            });
            setCartList(temp);
        }
        // 직접입력시
        if (type === 'order_item_cnt') {
            let temp = CartList.map((val) => {
                if (uid === val.goods_uid) {
                    return {
                        ...val,
                        order_item_cnt: Number(value),
                    };
                }
                return val;
            });
            setCartList(temp);
        }

    }

    // ==============5. 옵션비 있을시 체크 설정==================
    const CartOption = (uid) => {
        let temp = CartList.map((val) => {
            if (uid === val.goods_uid) {
                return {...val, goods_option_chk: !val.goods_option_chk,};
            }
            return val;
        });
        setCartList(temp);
    }


    // ===================6. 장바구니 상품 체크시 배송상품 추가==================
    const goFormChk = (uid) => {
        let temp = CartList.map((val) => {
            if (uid === val.goods_uid) {
                return {...val, goods_chk: !val.goods_chk,};
            }
            return val;
        });
        setCartList(temp);
    }

    // ===================7. 클릭시 배송정보 입력란으로 이동==================
    const goOrderForm = () => {
        console.log('test');
        // 1. 체크한 상품만 필터링
        let goForm = CartList.filter((val) => {
            if (val.goods_chk === true) {
                return navigation.navigate('배송정보등록', {order_uid: val.order_uid});
            }
        });
        console.log('출력 / ', goForm);

        // 2. 수량변경시 업데이트 한다.

        // 3. 옵션내용이 있을시 업데이트 한다.
    }

    // ===================9. 체크한 상품 있을시 버튼입력란 생성
    let goForm = CartList.filter((val) => val.goods_chk);

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.Cart]}>
                    <View style={[container]}>
                        <View style={[flex_between]}>
                            <View style={[flex]}>
                                <Checkbox style={styles.all_check} color={"#4630eb"}/>
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
                            {/*/!*=============반복문 구간==============*!/*/}
                            {CartCate1st !== null && (
                                <>
                                    {CartCate1st.map((val, idx) => (
                                        <>
                                            <List.Accordion key={val.ind_cfg_uid}
                                                            onPress={()=>getGoodsCate(val.ind_cfg_uid)}
                                                            title={val.cfg_val1}
                                                            style={[container, styles.Accordion_tit]}>
                                                {/*=============상품리스트 반복================*/}

                                                {CartList.map((val, idx) => (
                                                    <>
                                                        {Cate1stCode.map(fil => (
                                                            <>
                                                                {(fil === val.goods_uid) && (
                                                                    <>
                                                                        {(val.goods_Cart) ? (
                                                                            <>
                                                                                <View key={val.ind_cfg_uid}
                                                                                      style={[styles.pb_2, {padding: 15}]}>
                                                                                    {/*================자재명==============*/}
                                                                                    <View
                                                                                        style={[flex_between, styles.pd_18]}>
                                                                                        <View style={[flex, wt8]}>
                                                                                            <Checkbox
                                                                                                onValueChange={() => goFormChk(val.goods_uid)}
                                                                                                value={val.goods_chk}
                                                                                                style={styles.all_check}
                                                                                                color={"#4630eb"}/>
                                                                                            <TouchableOpacity
                                                                                                onPress={() => {
                                                                                                    navigation.navigate('상품상세', {uid: val.goods_uid})
                                                                                                }}>
                                                                                                <Text numberOfLines={1}
                                                                                                      style={styles.all_check_txt}>{val.goods_name} </Text>
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
                                                                                        style={[flex, {paddingBottom: 10}]}>
                                                                                        <View
                                                                                            style={[styles.flex_items, styles.flex_items1]}>
                                                                                            <Image
                                                                                                style={styles.cart_goods_img}
                                                                                                source={{uri: "http://49.50.162.86:80" + val.list_img_url}}/>
                                                                                        </View>
                                                                                        <View
                                                                                            style={[styles.flex_items, styles.flex_items2]}>
                                                                                            <View
                                                                                                style={[flex_between, styles.pd_20]}>
                                                                                                {/*가이드라인*/}
                                                                                                <View style="">
                                                                                                    <Text
                                                                                                        style={styles.goods_disc}> 가이드라인</Text>
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
                                                                                    <View style={flex_between}>
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
                                                                                        <>
                                                                                            {/*================스위치 on시에 노출된다=================*/}
                                                                                            <TextInput style={textarea}
                                                                                                       multiline={true}
                                                                                                       numberOfLines={4}/>
                                                                                            {/**/}
                                                                                        </>
                                                                                    )}
                                                                                </View>
                                                                            </>
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </>
                                                        ))}
                                                        {/*=============상품리스트============*/}

                                                    </>
                                                ))}
                                            </List.Accordion>
                                        </>
                                    ))}
                                </>
                            )}

                        </List.Section>
                        {/*===================해당 카테고리 상품 출력==================*/}

                    </View>
                </View>

            </ScrollView>
            {/*========상품체크시 노출=========*/}
            {(goForm.length > 0) ? (
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
                                    <Text style={{textAlign: "center", color: "#333",}}>{goForm.length}</Text>
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
                <></>
            )}
            <Footer navigation={navigation}/>
        </>

    );
}

const styles = StyleSheet.create({
    go_cart: {
        paddingBottom: 36,
        paddingTop: 7,
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 50,
        textAlign: "center",
        width: "100%",
    }
    ,
    btn_cart: {
        width: 37,
        height: 37,
        opacity: 0,
        position: "absolute",
        zIndex: 10,
    }
    ,
    goCart: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },


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