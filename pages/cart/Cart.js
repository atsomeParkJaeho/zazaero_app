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
    Switch, Alert, KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {List, Modal, Portal, Provider} from 'react-native-paper';
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
    wt4,
    ms1,
    text_gray,
    mt2,
    text_center,
    h15,
    mt7,
    mt10,
    wt2,
    h12,
    h13,
    text_danger,
    me1,
    align_items_start,
    h14,
    text_left,
    justify_content_start, bg_light, justify_content_end, text_right, text_primary, pb1, pt1
} from '../../common/style/AtStyle';

//이미지 추가
import Footer from "../Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useIsFocused} from "@react-navigation/native";
import {Price} from "../../util/util";
import CartIcon from "../../icons/uncart.svg";
import {goDelCart, getCartList, goodsUpdate, save_req_memo} from "./UTIL_cart";
import Search from "../../icons/search.svg";
import {get_Member} from "../UTIL_mem";
import WrappedText from "react-native-wrapped-text";

// 장바구니 레이아웃 출력
export default function Cart({route, navigation}) {

    const [Member, setMember]              = useState();
    const [CartUid, setCartUid]            = useState(``);
    const [Cart1stUid, setCart1stUid]      = useState(``);
    const [CartList, setCartList]          = useState([]);           // 장바구니 1차 카테고리 출력
    const [all_status, set_all_status] = useState(false);
    const Update = useIsFocused();




    /**---------------------------------페이지 진입시 노출----------------------------------------**/
    useEffect(() => {
        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                Alert.alert(``,`실패`);
            }
        });
        // ====================장바구니 목록을 출력=================///
        getCartList(Member).then((res) => {
            if (res) {
                const {result ,A_order} = res.data;
                if (result === 'OK') {
                    setCartList(A_order);
                    navigation.setOptions({
                        title: '장바구니',     // 상단 설정
                        headerRight: ()=>headerRight(A_order),
                    });
                } else {
                    // return Alert.alert('','연결에러');
                }
            }
        });



    }, [Member,Update]);



    // 전체삭제 기능
    const allDel = (A_order) => {


        let temp = A_order.map(val=>val.A_goods_list.map(item=>String(item.order_uid)));
        let order_uid = temp.reduce((val,idx)=>{
            return val.concat(idx);
        });
        console.log(order_uid);


        Alert.alert('','장바구니에 있는 자재를\n전체 삭제하시겠습니까?',[
            {text:'취소'},
            {text:'확인',
                onPress:()=>{
                    goDelCart(Member,order_uid).then((res)=>{
                        if(res) {
                            const {result} = res.data;
                            if(result === 'OK') {
                                Alert.alert('','삭제완료하였습니다.');
                                return navigation.replace('장바구니');
                            } else {
                                Alert.alert('',`${res.data}`);
                            }
                        }
                    });
                }
            }
        ]);
    }

    // 우측 메뉴 설정
    const headerRight = (A_order) => {
        return (
            <>
                <View style={[flex, me1]}>
                    <TouchableOpacity style={styles.link_signUp} onPress={()=>allDel(A_order)}>
                        <Text style={[text_gray]}>
                            전체삭제
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
    /**---------------------------------장바구니 해당상품 삭제----------------------------------------**/
    const delCart = (order_uid,goods_uid) => {
        let AT_order_uid = [order_uid];
        Alert.alert('','상품을 삭제하시겠습니까?',[
            {text:"취소", onPress:()=>{}},
            {text:"확인", onPress:()=>{
                    /**---------1. db에서 삭제-----**/
                    goDelCart(Member, AT_order_uid).then((res) => {
                        if (res) {
                            console.log(res.data,'/ 장바구니 삭제');
                            const {result} = res.data;
                            if (result === 'OK') {
                                /**---------2. 어플에서 삭제-----**/
                                let temp = CartList.map((cate) => {
                                    return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                                            if(val.goods_uid === goods_uid) {
                                                return {...val, goods_del:true, goods_chk:false,}
                                            } else {
                                                return val;
                                            }
                                        })}
                                });
                                setCartList(temp);
                                return Alert.alert('','상품이 삭제되었습니다.');
                            } else {
                                Alert.alert('','연결실패');
                            }
                        }
                    });
                }
            },
        ])
    }
    /**---------------------------------옵션요청사항 있을시 체크----------------------------------------**/
    const CartOption = (uid) => {
        setCartList(CartList.map((cate) => {
            return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                    if(val.goods_uid === uid) {
                        return {...val, A_sel_option:val.A_sel_option.map((cnt)=>{
                                return {...cnt, goods_option_chk:!cnt.goods_option_chk}
                            })}
                    } else {
                        return val;
                    }
                })}
        }));
    }
    /**---------------------------------체크시 배송정보 등록이동창 활성화----------------------------------------**/
    const goFormChk = (uid, cate, price) => {

        if(cate) {setCartUid(cate); // 카테고리 넣기
        } else if(!cate) {setCartUid('');}  // 카테고리 넣기
        setCart1stUid(cate);
        setCartList(CartList.map((cate) => {
            return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                    if(val.goods_uid === uid) {
                        return {...val, goods_chk:!val.goods_chk}
                    } else {
                        return val;
                    }
                })}
        }));

        console.log(uid,'/ 상품 uuid');
        console.log(cate,'/ 카테 uid');
        console.log(price,'/ 상품 가격');

    }
    /**----------------------------업데이트 내용 적용--------------------------**/
    const goForm = (goods_cnt, goods_price, order_uid, goods_uid) => {
        let cnt   = (goods_cnt > 1) ? Number(goods_cnt) : 1;
        /**----------------------------업데이트 내용 적용--------------------------**/
        goodsUpdate(Member, cnt, goods_price, order_uid, goods_uid).then((res) => {
            if (res) {
                const {result} = res.data;
                if (result === 'OK') {console.log(res.data,'/수량조절');} else {
                    Alert.alert('','연결실패');
                }
            }
        }).catch(err=>console.log(err));
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
                                        option_cnt      :(cnt.option_cnt > 998) ? 997 : Number(cnt.option_cnt) + 1,
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
            console.log(type,'/ 수기입력');
            let cnt = Number(value);
            let price = Number(goods_price) ;
            setCartList(CartList.map((cate) => {
                return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                        if(val.goods_uid === goods_uid) {
                            return {...val, A_sel_option:val.A_sel_option.map(cnt=>{
                                    return {...cnt, option_cnt:value}
                                })}
                        } else {
                            return val;
                        }
                    })}
            }));
            goForm(cnt, price, order_uid, goods_uid);
        }
    }

    const ChkDel = (cate_1st_uid) => {

        let A_goods_cate_list = CartList.filter(val=>val.cate_1st_uid === cate_1st_uid);
        let A_goods_list = A_goods_cate_list.map(val=>val.A_goods_list.filter(chk=>chk.goods_chk));
        let result = A_goods_list.reduce((val,idx)=>{return val.concat(idx);});
        let order_uid = result.map(val=>val.order_uid);
        if(order_uid.length === 0) {return Alert.alert('','자재를 선택해주세요.');}

        console.log(A_goods_cate_list,'/1차 카테고리 필터링');
        console.log(A_goods_list,'/상품 필터링');
        console.log(result,'/재 배열');
        console.log(order_uid,'/order_uid만 가져오기');

        Alert.alert('','선택하신 상품을 삭제하시겠습니까??',[
            {text:"취소", onPress:()=>{},},
            {text:"확인",
                onPress:()=>{
                    goDelCart(Member, order_uid).then((res) => {
                        if (res) {
                            console.log(res.data);
                            const {result} = res.data;
                            if (result === 'OK') {
                                /**---------2. 어플에서 삭제-----**/
                                let temp = CartList.map((cate)=>{
                                    if(cate.cate_1st_uid === cate_1st_uid) {
                                        return {...cate, A_goods_list:cate.A_goods_list.map(val=>{
                                                if(val.goods_chk) {
                                                    return {...val, goods_del:true}
                                                } else {
                                                    return val;
                                                }
                                            })}
                                    } else {
                                        return cate;
                                    }
                                });
                                setCartList(temp);
                                navigation.replace('장바구니');
                                return Alert.alert('','선택하신 자재를 삭제하였습니다.');
                            } else {
                                Alert.alert('','실패');
                            }
                        }
                    });
                }
            }
        ]);
    }
    /**---------------------------------클릭시 배송정보 입력창으로 이동----------------------------------------**/
    const goOrderForm = () => {

        // 중복상품 제어용 카테고리 cateUid
        let temp    = CartList.map(cate=>cate.A_goods_list.filter(val=>(val.goods_chk === true)));
        let total   = temp.reduce((val,idx)=>{return val.concat(idx);});
        let result  = total.map(val=>val.cate_1st_uid);
        let chk     = total.map(val=>String(val.A_sel_option.map(item=>item.option_cnt)));
        let find    = result.indexOf(Cart1stUid);

        if(chk.includes('0')) {
            console.log(chk.includes('0'));
            return Alert.alert('',`수량을 입력해주세요.`);
        }

        console.log(Cart1stUid,'/ [지정 카테고리]');
        console.log(result,'/ [필터링한 카테고리]');
        console.log(find,'/ [수량]');

        if(1 > find) {
            return navigation.navigate('배송정보등록',{order_uid:total,goods_cate1_uid:Cart1stUid});;
        } else {
            Alert.alert('','동일 공정의 자재만 발주 가능합니다');
            setCart1stUid(``);
            setCartList(CartList.map((cate) => {
                return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                        return {...val, goods_chk:false}
                    })}
            }));
            return false;
        }

    }
    /**---------------------------------옵션메모 입력----------------------------------------**/
    const goInput = (key,value,AT_order_item_uid) => {
        console.log(key+' / '+value+' / '+AT_order_item_uid);
        let temp = CartList.map((cate)=>{
            return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                    return {...val, A_sel_option:val.A_sel_option.map((sel)=>{
                            if(Number(sel.order_item_uid) === Number(AT_order_item_uid)) {
                                return {...sel, [key]:value};
                            } else {
                                return sel;
                            }
                        })}
                })}
        })
        setCartList(temp);
    }
    /**---------------------------------옵션요청메모 저장----------------------------------------**/
    const ReqMemo = (uid,value) => {
        let req_memo          = String(value);
        let AT_order_item_uid = String(uid);
        save_req_memo(Member, AT_order_item_uid, req_memo).then((res) => {
            if (res) {
                console.log(res.data);
                const {result, query} = res.data;
                if (result === 'OK') {
                    console.log(query,' / 쿼리');
                    console.log('적용완료 / ');
                } else {
                    Alert.alert('','연결실패');
                }
            }
        });
    }

    let allMod = (cate_1st_uid, cate_1st_name) => {
        set_all_status(!all_status);
        setCart1stUid(cate_1st_uid);
        setCartList(CartList.map((item)=>{
            if(item.cate_1st_uid === cate_1st_uid) {
                return {...item, A_goods_list:item.A_goods_list.map((val)=>{
                        return {...val, goods_chk:!all_status}
                    })}
            } else {
                return item;
            }
        }));
    }

    /**-----------------------------------------------------------------------------------------------------------------**/
    let result = CartList.map(cate=> {
        return {...cate, A_goods_list:cate.A_goods_list.filter((val)=>val.goods_del === false)}
    });
    /**-----------------------------------------------------------------------------------------------------------------**/
    let list              = CartList.map(cate=>cate.A_goods_list.filter(val=>val.goods_chk === true));
    let cart_chk          = list.map(val=>val.length);
    let list_goods_cnt    = 0;
    for (let i = 0; i < cart_chk.length; i++) {list_goods_cnt   += cart_chk[i];}
    console.log(CartList,' / [장바구니 상품 목록리스트]');
    console.log(Cart1stUid,' / [카테고리 제한]');
    return (
        <>
            <KeyboardAvoidingView style={{height:"100%"}} behavior={Platform.select({ios: 'padding'})}>
                <ScrollView style={[bg_white]}>
                    <View style={[styles.Cart]}>
                        <View style={[styles.cartList]}>
                            {/*===================1차 카테고리 리스트 출력==================*/}
                            <List.Section style={[styles.Section,{padding:0, margin:0}]}>
                                {(result.length !== 0) ? (
                                    <>
                                        {result.map((cate,idx)=> {




                                            /*1. 삭제 안한 상품만 필터링한다*/
                                            let A_goods_list = cate.A_goods_list.filter(val=>val.goods_del === false);
                                            // 배열값 갯수 체크
                                            let goods_cnt     = cate.A_goods_list.filter(val=>val.goods_del === false).length;
                                            let goods_chk_cnt = cate.A_goods_list.filter(val=>val.goods_chk === true && val.goods_del === false).length;
                                            let all_chk_flag  = (goods_chk_cnt === goods_cnt && goods_cnt > 0);

                                            console.log('전체 있는 수량 / ',goods_cnt);
                                            console.log('체크한 수량 / ',goods_chk_cnt);

                                            return(
                                                <>
                                                    <List.Accordion style={[container, styles.Accordion_tit]} title={cate.cate_1st_name} key={idx}>
                                                        {/**-------------------전체선택 탭-----------------**/}
                                                        <View style={[bg_white, container, {borderBottomWidth: 1, borderColor: "#ddd"}]}>
                                                            <View style={[flex, {justifyContent: "space-between",}]}>
                                                                {/*===============전체선택=============*/}
                                                                <View style={[d_flex]}>
                                                                    <Checkbox style={styles.all_check} color={"#4630eb"} onValueChange={()=>allMod(cate.cate_1st_uid, `${cate.cate_1st_name}`,)} value={all_chk_flag}/>
                                                                    <Checkbox style={styles.chk_view} color={"#4630eb"} onValueChange={()=>allMod(cate.cate_1st_uid, `${cate.cate_1st_name}`,)}/>
                                                                    <Text style={[ms1]}>전체선택</Text>
                                                                </View>
                                                                {/*===============선택삭제=============*/}
                                                                <View style={[d_flex]}>
                                                                    <TouchableOpacity onPress={()=>ChkDel(cate.cate_1st_uid)}>
                                                                        <Text style={[ms1, text_gray]}>선택상품 삭제</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        {/**-------------------전체선택 상품-----------------**/}
                                                        {A_goods_list.map((val,idx)=>(
                                                            <View style={[styles.pb_2, {padding: 15, borderColor: "#e0e0e0"}]}>
                                                                {/*================자재명==============*/}
                                                                <View style={[flex_between, styles.pd_18]}>
                                                                    <View style={[flex, wt8]}>
                                                                        {/*숨김처리*/}
                                                                        <Checkbox onValueChange={() => goFormChk(val.goods_uid, cate.cate_1st_uid)} value={val.goods_chk} style={styles.all_check} color={"#4630eb"}/>
                                                                        <Checkbox onValueChange={() => goFormChk(val.goods_uid, cate.cate_1st_uid)} value={val.goods_chk} style={styles.chk_view} color={"#4630eb"}/>
                                                                        <Text numberOfLines={2} style={[styles.all_check_txt,h12]}>
                                                                            {val.goods_name}
                                                                        </Text>
                                                                    </View>
                                                                    {/*=============삭제버튼============*/}
                                                                    <TouchableOpacity onPress={() => delCart(val.order_uid, val.goods_uid)}>
                                                                        <View style="">
                                                                            <Icon name="close" size={25} color="#000"/>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </View>
                                                                {/*===================상품정보==============*/}
                                                                {val.A_sel_option.map((item,idx)=>(
                                                                    <>
                                                                        <View style={[flex,align_items_start]}>
                                                                            <View style={[styles.flex_items, styles.flex_items1]}>
                                                                                <TouchableOpacity onPress={() => {navigation.navigate('상품상세', {uid: val.goods_uid})}}>
                                                                                    <Image style={styles.cart_goods_img} source={{uri: "http://49.50.162.86:80" + val.list_img_url}}/>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            <View style={[styles.flex_items2]}>
                                                                                <View style={[pb1]}>
                                                                                    {/*가이드라인*/}
                                                                                    <View style={[]}>
                                                                                        <Text style={[text_primary,h14,text_left]} >
                                                                                            {val.goods_guide_name}
                                                                                        </Text>
                                                                                    </View>
                                                                                    {/*반품가능여부*/}
                                                                                    {(val.disable_cancel === 'Y') && (
                                                                                        <View style={wt4}>
                                                                                            <Text style={[text_danger,h14]}>
                                                                                                결제 후 반품/취소 불가
                                                                                            </Text>
                                                                                        </View>
                                                                                    )}
                                                                                    {/*자재가격*/}
                                                                                    <View style={[pt1]}>
                                                                                        <Text style={[styles.goods_price,text_right]}>
                                                                                            {Price(item.option_price * item.option_cnt)}원
                                                                                        </Text>
                                                                                    </View>
                                                                                </View>
                                                                                <View style={[flex]}>
                                                                                    {/*=============마이너스 버튼==========*/}
                                                                                    <TouchableWithoutFeedback
                                                                                        onPress={() => modCart(val.goods_uid, val.order_uid, 'minus', item.option_cnt, item.option_price)}>
                                                                                        <View style={[count_btn]}>
                                                                                            <View style={[pos_center]}>
                                                                                                <Text style={[count_btn_txt]}>－</Text>
                                                                                            </View>
                                                                                        </View>
                                                                                    </TouchableWithoutFeedback>
                                                                                    {/*============수량=================*/}
                                                                                    {/**-----상품 uid, 주문 uid 추가----**/}
                                                                                    <View style={[countinput]}>
                                                                                        <TextInput
                                                                                            style={[text_center]}
                                                                                            keyboardType="number-pad"
                                                                                            maxLength={3}
                                                                                            onChangeText={(order_item_cnt)=>modCart(val.goods_uid, val.order_uid, 'order_item_cnt', order_item_cnt, item.goods_price)}
                                                                                            defaultValue={`${item.option_cnt}`}
                                                                                            onBlur={()=>modCart(val.goods_uid, val.order_uid, 'order_item_cnt', item.option_cnt, item.goods_price)}
                                                                                            value={`${item.option_cnt}`}
                                                                                        />
                                                                                    </View>
                                                                                    {/*=============플러스 버튼============*/}
                                                                                    <TouchableWithoutFeedback onPress={() => modCart(val.goods_uid, val.order_uid, 'plus', item.option_cnt, item.goods_price)}>
                                                                                        <View style={[count_btn]}>
                                                                                            <View style={[pos_center]}>
                                                                                                <Text style={[count_btn_txt]}>＋</Text>
                                                                                            </View>
                                                                                        </View>
                                                                                    </TouchableWithoutFeedback>
                                                                                </View>
                                                                            </View>
                                                                        </View>

                                                                        <View style={[flex_between, {paddingTop: 15,}]}>
                                                                            <Text style={styles.Request_txt}>
                                                                                {(val.req_opt_guide_name) ? val.req_opt_guide_name:'자재 요청사항을 입력해주세요.'}
                                                                            </Text>
                                                                            <Switch onValueChange={() => CartOption(val.goods_uid)} value={(item.goods_option_chk || item.req_memo !== '')} trackColor={{false: "#767577", true: "#4630eb"}} ios_backgroundColor="#3e3e3e" style={[switch_bar]}/>
                                                                        </View>
                                                                        {(item.goods_option_chk || item.req_memo) && (
                                                                            <TextInput
                                                                                onChangeText={(req_memo)=>goInput('req_memo',req_memo,item.order_item_uid)}
                                                                                style={[textarea]}
                                                                                value={`${item.req_memo}`}
                                                                                onBlur={()=>ReqMemo(item.order_item_uid, item.req_memo)}
                                                                                multiline={true}
                                                                                numberOfLines={4}
                                                                            />
                                                                        )}
                                                                    </>
                                                                ))}
                                                            </View>
                                                        ))}
                                                    </List.Accordion>
                                                </>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}
                            </List.Section>

                        </View>
                    </View>
                </ScrollView>
                <Footer navigation={navigation}/>
                {
                    (list_goods_cnt > 0) && (
                        <>
                            <View style={[styles.go_cart, bg_primary, {paddingBottom: 38, paddingTop: 7,}]}>
                                <TouchableOpacity onPress={goOrderForm}>
                                    <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                                        <View style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 50,
                                            marginRight: 10,
                                            backgroundColor: "#fff"
                                        }}>
                                            <Text style={{textAlign: "center", color: "#333",}}>{list_goods_cnt}</Text>
                                        </View>
                                        <Text style={text_light}>총 수량</Text>
                                    </View>
                                    <Text style={[{textAlign: "center", color: "#FFF", fontSize: 18,}, text_light]}>
                                        배송정보입력
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )

                }
            </KeyboardAvoidingView>


        </>
    );
    /**----------------------------------------------수량 모달창--------------------------------------------------------------**/

}



const styles = StyleSheet.create({

    modal:{
        width:"100%",
        height:"100%",
        borderColor:"red",
        position:"absolute",
        zIndex:100,
        backgroundColor:"#333",
        left:0,
        top:0,
    },

    Cart:{
        paddingBottom:70,
    },

    CartWrap:{
        paddingBottom:300,
    },
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
        paddingTop:100,
        height:100,
        zIndex:100,
        position: "absolute",
        left:0,
        bottom:0,
        width:"100%",
    },
    chk_view:{
        position:"absolute",
        opacity:0,
        zIndex: 10,
        width:"100%",
    }
});