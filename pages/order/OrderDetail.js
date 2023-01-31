import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Button,
    Alert,
    CheckBox,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Switch,
    KeyboardAvoidingView,
} from 'react-native';

import {SelectList} from 'react-native-dropdown-select-list'
//셀렉트박스

import { RadioButton } from 'react-native-paper';
//라디오 버튼

//다음주소 api

// 공통 CSS 추가
import {container, bg_white, h16, text_center, flex_around, flex_between, input, ms2, flex, mt1, fw500, d_flex, align_items_center, bg_primary, text_light, justify_content_center, bg_gray, text_primary, countinput,
    text_danger,
    btn_outline_primary,
    btn_outline_danger,
    count_btn,
    count_btn_txt,
    pos_center,
    h18,
    mb2,
    h14,
    bg_light,
    justify_content_end,
    pe1,
    mb1,
    me2,
    flex_between_bottom,
    flex_end,
    h13,
    text_right,
    justify_content_between,
} from '../../common/style/AtStyle';
import {sub_page, gray_bar} from '../../common/style/SubStyle';
import Main_logo from "../../icons/main_logo.svg";
import Search from "../../icons/search.svg";


import Shippingicon from "../../icons/Shipping_icon.svg";
import CloseBtn from "../../icons/close_btn.svg";
import {FormStyle} from "./FormStyle";
import col1 from "../../assets/img/co1.png";
import col2 from "../../assets/img/co2.png";
import col3 from "../../assets/img/co3.png";
import {DateChg, ordStatus, Phone, Price, Time1, Time2} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";
import CalendarStrip from "react-native-calendar-strip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import OrderStatus from "./OrderStatus";
import orderStatus from "./OrderStatus";
import RNPickerSelect from "react-native-picker-select";


export default function OrderDtail({route,navigation}) {


    /**------------페이지 파라미터-----------**/
    console.log(route);

    const {gd_order_uid, hope_deli_date} = route.params;
    /**--------------------------------------필수 정보사항--------------------------------------------------**/
    const [Member, setMember]          = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    const InputFocus = useRef([]);
    /**-----------------------------------------수정 상태 설정-------------------------------------------------------**/
    const [Mod, setMod] = useState(false);
    /**--------------------------------------상태값 셋팅--------------------------------------------------**/
    const [OrderGoodsList,  setOrderGoodsList]              = useState([]);      // 주문상품상태정의
    const [BankCode,        setBankCode]                    = useState([]);          // 관리자 무통장입금계좌 출력
    const [PayMement,       setPayMement]                   = useState('bank');      // 결제창 노출 여부
    const [OrderData,       setOrderDate]                   = useState({
        order_title         :'',
        zonecode            :'',
        addr1               :'',
        addr2               :'',
        hope_deli_date      :'',
        hope_deli_time      :'',
        recv_name           :'',
        recv_mobile         :'',
        order_memo          :'',
        bankAccount         :'',
        bankSender          :'',
    });
    /**--------------------------------------주문서 셋팅--------------------------------------------------**/
    const Update = useIsFocused();
    /**------------------------------------------------------수정요청 클릭시 내용을 수정할수 있다.----------------------------------------------**/
    const goMod = () => {
        if(Mod === true) {
            Alert.alert('','발주서를 수정하시겠습니까?',[
                {
                    text    :'확인',
                    onPress :()=>{ModForm()}
                },
                {
                    text    :'취소',
                    onPress :()=>{setMod(false)},
                }
            ]);
        } else {
            setMod(!Mod);
        }
    }
    /**-------------------------------------------주문정보 출력-------------------------------------------------------------------------**/
    const getOrderInfo = () => {
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
            act_type        :"get_order_detail",
            gd_order_uid    :gd_order_uid,
            mem_uid         :Member,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            const {result, gd_order} = res.data;
            if(result === 'OK') {
                setOrderDate(gd_order);
                setOrderGoodsList(gd_order.A_order);
            } else {
                console.log('에러');
            }
        });
    }
    /**--------------------------------------------승인시 수정사항을 업데이트 한다.--------------------------------------------------------**/
    const ModForm = () => {
        /**-- 수정상태 불가능으로 변경--**/
        setMod(!Mod);
        /**------------db에 주문서 변경사항 내용 보내기-------------**/
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
            act_type           :"mod_order",
            mem_uid            :Member,
            zonecode           :OrderData.zonecode,
            addr1              :OrderData.addr1,
            addr2              :OrderData.addr2,
            hope_deli_date     :OrderData.hope_deli_date,
            hope_deli_time     :OrderData.hope_deli_time,
            recv_name          :OrderData.recv_name,
            recv_mobile        :OrderData.recv_mobile,
            order_memo         :OrderData.order_memo,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            const {result} = res.data;
            console.log(res.data);
            if(result === 'OK') {
                Alert.alert('','수정이 완료되었습니다.');
            } else {
                console.log('에러');
            }
        });
    }
    /**----------------------------------------주문서에서 삭제---------------------------------------------**/
    const DelOrder = () => {
        Alert.alert('','자재를 삭제하시겠습니까?',[
            {
                text        :'삭제',
                onPress     :()=>{goDelOrder()},
                style       :'destructive',
            },
            {
                text        :'취소',
                onPress     :()=>{},
            }
        ]);
    }
    /**----------------------------------------은행계좌정보 출력---------------------------------------------**/
    const getAppInfo = () => {
        axios.post('http://49.50.162.86:80/ajax/UTIL_app.php',{
            act_type        :"get_app_info",
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            const {result, app_info} = res.data;
            if(result === 'OK') {
                let temp = app_info.A_pay_bank.map(val=>{
                    return {
                        label:val.name,
                        value:val.key,
                    }
                })
                setBankCode(temp);
            } else {
                console.log('에러2');
            }
        });
    }
    /**----------------------------------------------------삭제---------------------------------------------------------------------**/
    const goDelOrder = () => {

    }
    /**--------------------------------------------------------페이지 진입시 노출---------------------------------------------------**/
    useEffect(() => {
        /**-------------주문상세정보 출력------------**/
        getOrderInfo();
        getAppInfo();
    },[Update,Member]);
    /**--------------------------------------------------------------입력폼 입력---------------------------------------------------**/
    const goInput = (keyValue, e) => {
        /**------------------------------------------------------------------**/
        setOrderDate({
            ...OrderData,
            [keyValue]:e,
        });
    }
    /**--------------------------------------------------------------------------------------------------------------------------**/
    const goPay = (type) => {
        console.log(type,'/ 결제 타입');
        /**--------------------------------무통장입금-----------------------------------**/
        if(type === 'bank') {
            /**--------------------1. 결제 체크 루틴----------------**/
            if(OrderData.bankAccount === "0")     { return Alert.alert('','입금계좌를 선택해주세요.')}
            if(!OrderData.bankSender)             { return Alert.alert('','예금주명을 입력해주세요.')}
            /**--------------------2. 무통장결제 완료체크----------------**/
            // 무통장입금
            Alert.alert('','결제하시겠습니까?',
                [
                    {
                        text:'취소',
                        onPress:()=>{

                        },
                    },

                    {
                        text:'확인',
                        onPress:()=>{
                            donePay(type);
                        },
                    },

                ]
            );
        }
        /**--------------------------------카드결제-----------------------------------**/
        if(type === 'card') {
            // 카드결제
        }

    }

    const donePay = (type) => {

        /**----------------1. 자재합계가격을 넣는다.------------------------------------**/
        let Settlekindprice = 0;
        Settlekindprice += Number(OrderData.goodsprice);
        Settlekindprice += Number(OrderData.deli_price);
        Settlekindprice += Number(OrderData.tot_opt_price);

        console.log(type);
        console.log(Settlekindprice);
        console.log(gd_order_uid,'/ 주문 uid');
        console.log(OrderData.bankAccount,' / 무통장 코드');
        console.log(OrderData.bankSender,' / 예금주명');
        
        /**------------2. settlekindprice 결제합계 금액만 넘긴다-----------------**/
        if(type === 'bank') {

            axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
                act_type             :"order_pay",
                mem_uid              :Member,
                gd_order_uid         :gd_order_uid,
                settlekind           :'bank',
                settleprice          :Settlekindprice,
                bankAccount          :OrderData.bankAccount,
                bankSender           :OrderData.bankSender,

            },{
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }).then((res)=>{
                const {result} = res.data;
                console.log(res.data);
                if(result === 'OK') {
                    console.log('성공');
                } else {
                    console.log('실패');
                }

            });

            let msg = '';
            msg += '결제요청이 완료되었습니다\n';
            msg += '예금주  : '+OrderData.bankSender+' \n';
            msg += '입금계좌 : '+OrderData.bankAccount+' \n';
            msg += '결제금액 : '+Price(Settlekindprice)+'원\n';

            /**-----------------------------------------------------**/
            Alert.alert('',msg,[
                {
                    text:'확인',
                    onPress:()=>{
                        // navigation.navigate('결제상태');
                    }
                }
            ]);
        }

        /**-----------------------아임포트 결제모듈창 노출---------------------**/
        if(type === 'card') {

        }

    }

    console.log(OrderData.bankAccount,' / 은행코드');
    console.log(OrderData.bankSender,'  / 예금주명');

    return (
        <>
            <ScrollView>
                <View style={{backgroundColor:"#fff"}}>
                    {/**----------------------------------------------발주상태 정의--------------------------------------------------**/}
                    <View style={[FormStyle.FormGroup]}>
                        <View style={[container]}>
                            <Text>{OrderData.ord_status}</Text>
                            <Text style={[h16,text_center]}>{ordStatus(OrderData.ord_status)} 입니다. </Text>
                        </View>
                    </View>
                    <View style={[FormStyle.FormGroup]}>
                        {/**----------------------------------------------배송지 입력--------------------------------------------------**/}
                        {/*==============공사명===============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <Text style={[FormStyle.FormLabel]}>공사명</Text>
                            <TextInput style={[input,{flex:1}]}
                            editable={Mod}
                            placeholder="공사명"
                            value={OrderData.order_title}
                            onChangeText={(order_title)=>goInput("order_title",order_title)}
                            ref={el => (InputFocus.current[0] = el)}
                            />
                        </View>
                        {/*==============배송지 주소===============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <Text style={[FormStyle.FormLabel]}>배송지</Text>
                            <View style={[d_flex,align_items_center]}>
                                {/*우편번호*/}
                                <TextInput style={[input,{flex:1},bg_light]}
                                editable={false}
                                placeholder="우편번호"
                                value={OrderData.zonecode}
                                onChangeText={(zonecode)=>goInput("zonecode",zonecode)}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                ref={el => (InputFocus.current[1] = el)}
                                />
                                {/*주소찾기*/}
                                {(Mod) && (
                                    <>
                                        <TouchableOpacity onPress={()=>navigation.navigate('주소검색',{page:"배송정보등록", order_uid:order_uid})}>
                                            <View style={[bg_primary,{padding:8,borderRadius:5, marginLeft:16,}]}>
                                                <Text style={[text_light]}>주소찾기</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </View>
                        {/*================주소============*/}
                        <View style={{paddingBottom:15,}}>
                            <TextInput
                                style={[input,{flex:1},bg_light]}
                                editable={false}
                                placeholder="주소"
                                value={OrderData.addr1}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                ref={el => (InputFocus.current[2] = el)}
                            />
                        </View>
                        {/*============상세주소=================*/}
                        <View>
                            <TextInput style={[input,{flex:1}]}
                            onChangeText={(addr2)=>goInput("addr2",addr2)}
                            placeholder="상세주소"
                            value={OrderData.addr2}
                            returnKeyType="done"
                            editable={Mod}
                            ref={el => (InputFocus.current[3] = el)}
                            />
                        </View>
                        {/*다음 api 주소 팝업*/}
                        {/**----------------------------------------------배송지 입력--------------------------------------------------**/}

                    </View>
                    {/**----------------------------------------------희망배송일 선택--------------------------------------------------**/}
                    <View>
                        {/*==============제목==============*/}
                        <View style={[d_flex, align_items_center, FormStyle.FormDate, {justifyContent: "space-between"}]}>
                            {/*체크박스*/}
                            <Text style={[FormStyle.FormDateLabel]}>희망배송일</Text>
                            <Text style={[FormStyle.FormDateLabel]}>
                                {(OrderData.hope_deli_date) && DateChg(OrderData.hope_deli_date)}
                            </Text>
                        </View>
                        {/*==============캘린더==============*/}
                        {(Mod) && (
                            <>
                                <View style={[FormStyle.FormGroup, {paddingTop: 5, paddingBottom: 5,}]}>
                                    <CalendarStrip
                                        scrollable={false}
                                        onDateSelected={(Date) => {
                                            setOrderDate({
                                                ...OrderData,
                                                hope_deli_date: String(Date.format('YYYY-MM-DD')),
                                            });
                                        }
                                        }
                                        // startingDate={OrderData.hope_deli_date}
                                        startingDate={`${OrderData.hope_deli_date}`}
                                        minDate={`${OrderData.hope_deli_date}`}
                                        maxDate={`2024-12-31`}
                                        style={{height: 150, paddingTop: 20, paddingBottom: 10}}
                                        daySelectionAnimation={{type: "background", highlightColor: "#3D40E0",}}
                                        // selectedDate={OrderData.hope_deli_date}
                                        selectedDate={`${OrderData.hope_deli_date}`}
                                        highlightDateNameStyle={{color: "#fff", fontSize: 12, paddingBottom: 5,}}
                                        highlightDateNumberStyle={{color: "#fff", fontSize: 16,}}
                                        weekendDateNameStyle={{color: "#452"}}
                                        dateNameStyle={{fontSize: 12, color: "#666", paddingBottom: 5,}}
                                        dateNumberStyle={{fontSize: 16}}
                                    />
                                </View>
                            </>
                        )}

                        {/**----------------------------------------------희망배송시간 선택--------------------------------------------------**/}
                        <View>
                            {/*==============제목==============*/}
                            <View style={[d_flex, align_items_center, FormStyle.FormDate, {justifyContent:"space-between"}]}>
                                {/*체크박스*/}
                                <Text style={[FormStyle.FormDateLabel]}>희망배송시간</Text>
                                <Text style={[FormStyle.FormDateLabel]}>
                                    {OrderData.hope_deli_time}
                                </Text>
                            </View>
                            {(Mod) && (
                                <>
                                    {/*==============시간입력==============*/}
                                    <View style={[FormStyle.FormGroup]}>
                                        <View style={[d_flex, align_items_center]}>
                                            <View style={[styles.formSelect,{flex:1}]}>
                                                <RNPickerSelect
                                                    placeholder={{label:"시간을 선택해주세요.", value:null}}
                                                    onValueChange={(hope_deli_time) => goInput('hope_deli_time',hope_deli_time)}
                                                    items={Time2}
                                                    value={OrderData.hope_deli_time}
                                                    useNativeAndroidPickerStyle={false}
                                                    style={{
                                                        placeholder:{color:'gray'},
                                                        inputAndroid : styles.input,
                                                        inputAndroidContainer : styles.inputContainer,
                                                        inputIOS: styles.input,
                                                        inputIOSContainer : styles.inputContainer,
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </>
                            )}
                        </View>
                        {/**----------------------------------------------현장인도자 정보--------------------------------------------------**/}
                        <View style={[FormStyle.FormGroup]}>
                            {/*==============현장인도자 성명==============*/}
                            <View style={[FormStyle.FormGroupItems]}>
                                <View style={[FormStyle.FormGroupItems]}>
                                    <Text style={[FormStyle.FormLabel]}>현장인도자 성명</Text>
                                    <TextInput style={[input,{flex:1}]}
                                               editable={Mod}
                                               onChangeText={(recv_name)=>goInput("recv_name",recv_name)}
                                               placeholder="예 ) 홍길동"
                                               value={OrderData.recv_name}
                                               ref={el => (InputFocus.current[4] = el)}
                                    />
                                </View>
                                {/*==============현장인도자 연락처==============*/}
                                <View style={[FormStyle.FormGroupItems]}>
                                    <View>
                                        <Text style={[FormStyle.FormLabel]}>현장인도자 연락처</Text>
                                        <TextInput style={[input,{flex:1}]}
                                                   editable={Mod}
                                                   onChangeText={(recv_phone)=>goInput("recv_phone",recv_phone)}
                                                   placeholder="예 ) 010-XXXX-XXXX"
                                                   maxLength={13}
                                                   value={OrderData.recv_phone}
                                                   ref={el => (InputFocus.current[5] = el)}
                                        />
                                    </View>
                                </View>
                                {/*==============배송 요청 사항==============*/}
                                <View style={[FormStyle.FormGroupItems]}>
                                    <View>
                                        <Text style={[FormStyle.FormLabel]}>배송 요청 사항</Text>
                                        <TouchableWithoutFeedback >
                                            <TextInput style={[input,{flex:1,height:100}]} multiline={true}
                                                       editable={Mod}
                                                       onChangeText={(order_memo)=>goInput('order_memo',order_memo)}
                                                       numberOfLines={4}
                                                       value={OrderData.order_memo}
                                                       placeholder="배송요청사항"
                                            />
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/**----------------------------------------------상품목록--------------------------------------------------**/}
                        <View>
                            <GoodsList/>
                        </View>
                        {/**----------------------------------------------자재추가, 결제요청, 환불신청, 주문취소--------------------------------------------------**/}
                        <View style={[container]}>
                            <View style={[flex_around, mb2]}>
                                <TouchableOpacity onPress={()=>navigation.navigate('즐겨찾기',{ord_status:`ord_ready`,gd_order_uid:gd_order_uid})}>
                                    <Text style={[styles.btn,btn_outline_primary]}>자재추가</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style="">
                                    <Text style={[styles.btn,btn_outline_danger]}>전체취소</Text>
                                </TouchableOpacity>
                            </View>
                            {(OrderData.ord_status === 'pay_ready') && (
                                <>
                                    {/*무통장, 카드결제 선택*/}
                                    <View style={[flex_around, mb2]}>
                                        <View style={[flex]}>
                                            {/**----------------------------------------------카드결제--------------------------------------------------**/}
                                            <TouchableOpacity onPress={()=>setPayMement(`card`)}>
                                                <View style={[flex]}>
                                                    <View style={[styles.border_Circle]}>
                                                        {(PayMement === 'card') &&
                                                            <View style={[pos_center]}>
                                                                <View style={[styles.border_Circle_active]}/>
                                                            </View>
                                                        }
                                                    </View>
                                                    <Text style={[styles.Chk, {paddingLeft: 5}]}>카드결제</Text>
                                                </View>
                                            </TouchableOpacity>
                                            {/**----------------------------------------------무통장입금--------------------------------------------------**/}
                                            <TouchableOpacity onPress={()=>setPayMement(`bank`)}>
                                                <View style={[flex,ms2]}>
                                                    <View style={[styles.border_Circle]}>
                                                        {(PayMement === 'bank') &&
                                                            <View style={[pos_center]}>
                                                                <View style={[styles.border_Circle_active]}/>
                                                            </View>
                                                        }
                                                    </View>
                                                    <Text style={[styles.Chk, {paddingLeft: 5}]}>무통장입금</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {/*무통장 입금시 출력*/}
                                    {(PayMement === 'bank') && (
                                        <View style={[mb2]}>
                                            {/*은행선택*/}
                                            <View style={[input,{flex:1, marginBottom:15,}]}>
                                                <RNPickerSelect
                                                    items={BankCode}
                                                    placeholder={{label:"은행을 선택해주세요.", value:null}}
                                                    value={OrderData.bankAccount}
                                                    onValueChange={(bankAccount)=>goInput('bankAccount',bankAccount)}
                                                    useNativeAndroidPickerStyle={false}
                                                    style={{
                                                        placeholder:{color:'gray'},
                                                        inputAndroid : styles.input,
                                                        inputAndroidContainer : styles.inputContainer,
                                                        inputIOS: styles.input,
                                                        inputIOSContainer : styles.inputContainer,
                                                    }}
                                                />
                                            </View>
                                            {/*예금주 입력*/}
                                            <View style={{flex:1}}>
                                                <TextInput style={[input,{width:"100%"}]}
                                                placeholder="예금주명"
                                                value={OrderData.bankSender}
                                                onChangeText={(bankSender)=>goInput('bankSender',bankSender)}
                                                />
                                            </View>

                                        </View>
                                    )}
                                    {/*최종결제 버튼*/}
                                    <View style={[flex_around]}>
                                        <TouchableOpacity style={styles.payMement} onPress={()=>goPay(PayMement)}>
                                            <Text style={[styles.btn, text_center, btn_outline_primary]}>결제하기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                        {/**----------------------------------------------반품시에만 노출한다--------------------------------------------------**/}
                        <View>

                        </View>
                        {/**----------------------------------------------총금액--------------------------------------------------**/}
                        <View>
                            <OrderTotalPrice/>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {(OrderData.ord_status === 'ord_ready') && (
                <>
                    <GoOrderForm/>
                </>
            )}
        </>
    );

    /**-----------------------------------------------자재목록--------------------------------------------------**/
    function GoodsList() {
        let A_sel_option = OrderGoodsList.map(val=>val.A_sel_option);
        /**-----------------------------------------장바구니 상품 수량변경--------------------------------------------------**/
        const modCart = (goods_uid, order_uid, type, value, goods_price) => {
            /**----------------------------상품수량 플러스--------------------------**/
            if(type === 'plus') {
                let cnt     = Number(value) + 1;
                let price   = Number(goods_price) ;
                /**----------------------------상품수량 증가시 뷰화면에서도 적용--------------------------**/
                let temp = OrderGoodsList.map((cate)=>{
                    if(cate.goods_uid === goods_uid) {
                        return {...cate, A_sel_option:cate.A_sel_option.map((val)=>{
                            return {...val, option_cnt:Number(val.option_cnt) +1   ,}
                            })}
                    } else {
                        return cate;
                    }
                });
                setOrderGoodsList(temp);
            }

            /**----------------------------상품수량 마이너스--------------------------**/
            if(type === 'minus') {
                let cnt     = Number(value) - 1;
                let price   = Number(goods_price) ;
                /**----------------------------상품수량 증가시 뷰화면에서도 적용--------------------------**/
                let temp = OrderGoodsList.map((cate)=>{
                    if(cate.goods_uid === goods_uid) {
                        return {...cate, A_sel_option:cate.A_sel_option.map((val)=>{
                                return {...val, option_cnt:(val.option_cnt > 1) ? Number(val.option_cnt)-1 : 1,}
                            })}
                    } else {
                        return cate;
                    }
                });
                setOrderGoodsList(temp);
            }
            /**----------------------------상품수량 수기조절--------------------------**/
            if(type === 'order_item_cnt') {
                /*안드로이드는 안되는 현상 있음*/
                Alert.prompt(
                    '',
                    '수량을 입력하세요.',
                    [
                        {
                            text        :'수정',
                            onPress     :(cnt)=>{
                                let temp = OrderGoodsList.map((cate)=>{
                                    if(cate.goods_uid === goods_uid) {
                                        return {...cate, A_sel_option:cate.A_sel_option.map((val)=>{
                                                return {...val, option_cnt:cnt,}
                                            })}
                                    } else {
                                        return cate;
                                    }
                                });
                                setOrderGoodsList(temp);
                            },
                            style       :"",
                        },
                        {
                            text        :'취소',
                            onPress     :()=>{},
                        }
                    ],

                );
            }
        }

        return(
            <>

                <View style={[container, {borderBottomWidth: 1,borderColor:"#e6e6e6",}]}>
                    <Text style={[h18]}>자재목록</Text>
                </View>
                {/**-----------------자재목록---------------------------------------**/}
                <View>
                    {/**-----------------반복문 구간---------------------------------------**/}
                    {OrderGoodsList.map(val=>{
                        if(val.goods_name !== null) {

                            let img_src = val.list_img_url;

                            return(
                                <>
                                    <View style={[styles.CancelDetail_list_items]} >
                                        <View style={[container]}>
                                            <View style={[d_flex, align_items_center, mb1,flex_between]}>
                                                <Text style={[h14]}>{val.goods_name}</Text>
                                                <TouchableOpacity onPress={()=>DelOrder()}>
                                                    <Text>삭제</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {/**--------------------------------옵션--------------------------------**/}
                                            {val.A_sel_option.map(items=>{
                                                return(
                                                    <>
                                                        <View style={[flex_between_bottom]}>
                                                            <View style={[flex_end]}>
                                                                <Image style={[styles.goods_thum]} source={{uri: 'http://www.zazaero.com' + img_src}}/>
                                                                {/**-------------------수량조절---------------**/}
                                                                {(Mod) ? (
                                                                    <>
                                                                        <View style={ms2}>
                                                                            <Text style={[h14,fw500,{paddingBottom:10,}]}>수량</Text>
                                                                            <View style={[flex]}>
                                                                                {/*=============마이너스 버튼==========*/}
                                                                                <TouchableWithoutFeedback onPress={()=>modCart(val.goods_uid, val.order_uid, 'minus', items.option_cnt, items.option_price)}>
                                                                                    <View style={[count_btn]}>
                                                                                        <View style={[pos_center]}>
                                                                                            <Text style={[count_btn_txt]}>－</Text>
                                                                                        </View>
                                                                                    </View>
                                                                                </TouchableWithoutFeedback>
                                                                                {/*============수량=================*/}
                                                                                {/**-----상품 uid, 주문 uid 추가----**/}
                                                                                <TouchableOpacity onPress={()=>modCart(val.goods_uid, val.order_uid, 'order_item_cnt')} style={[countinput]}>
                                                                                    <Text style={[text_center]}>
                                                                                        {items.option_cnt}
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                                {/*=============플러스 버튼============*/}
                                                                                <TouchableWithoutFeedback onPress={() => modCart(val.goods_uid, val.order_uid, 'plus', items.option_cnt, items.option_price)}>
                                                                                    <View style={[count_btn]}>
                                                                                        <View style={[pos_center]}>
                                                                                            <Text style={[count_btn_txt]}>＋</Text>
                                                                                        </View>
                                                                                    </View>
                                                                                </TouchableWithoutFeedback>
                                                                            </View>
                                                                        </View>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <View style={ms2}>
                                                                            <Text style={[h14,fw500,{paddingBottom:10,}]}>수량</Text>
                                                                            <View style={[flex]}>
                                                                                <Text style={[text_center]}>
                                                                                    {items.option_cnt} 개
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                    </>
                                                                )}

                                                                {/**-------------------수량조절---------------**/}
                                                            </View>
                                                            <View style={justify_content_end}>
                                                                <Text style={[h13]}>( 단가 : {Price(items.option_price)} 원)</Text>
                                                                {/*단가*/}
                                                                <Text style={[h16,text_right]}>{Price(val.sum_order_price)} 원</Text>
                                                                {/*총금액*/}
                                                            </View>
                                                        </View>
                                                        {/*옵션요청글이 있을시 노출한다 */}
                                                        {(items.req_memo) && (
                                                            <>
                                                                <View style={[mt1]}>
                                                                    <View style={[]}>
                                                                        <Text style={[h13,text_right]}>요청금액 : <Text style={[text_danger]}>0원</Text></Text>
                                                                    </View>
                                                                    {/*옵션요청가격*/}
                                                                    <View style={[]}>
                                                                        <Text style={[h13]}>{val.goods_guide_name}</Text>
                                                                        <Text style={[h13]}>{items.req_memo}</Text>
                                                                    </View>
                                                                    {/*옵션요청글*/}
                                                                </View>
                                                            </>
                                                        )}

                                                    </>
                                                );
                                            })}
                                        </View>
                                    </View>
                                </>
                            )
                        }
                    })}
                </View>
                <View style={gray_bar}/>
            </>
        );
    }
    /**-----------------------------------------------총금액------------------------------------------------------**/
    function OrderTotalPrice() {
        /**----------------총 결제금액은 자재가격 + 요청옵션비 + 배송비 + 포인트----------------**/
        // 총 결제금액
        let Settlekindprice = 0;
        Settlekindprice += Number(OrderData.goodsprice);
        Settlekindprice += Number(OrderData.deli_price);
        Settlekindprice += Number(OrderData.tot_opt_price);
        // console.log(Settlekindprice, ' / 합계가격');
        return(
            <>
                <View style="">
                    <View style={container}>
                        <Text style={[h18]}>결제 예상 금액</Text>
                    </View>
                    <View style={[container,bg_light]}>
                        <View style={[d_flex,justify_content_end,pe1]}>
                            <View style="">
                                {/**----------------------발주신청일--------------------------**/}
                                {(OrderData.order_date) && (
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>발주신청일</Text>
                                        <Text style={[h14]}>{OrderData.order_date}</Text>
                                    </View>
                                )}

                                {/**----------------------결제요청일(* 발주검수 완료후 결제대기시에 노출한다.)--------------------------**/}
                                {(OrderData.pay_date) && (
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>결제완료일</Text>
                                        <Text style={[h14]}>{OrderData.pay_date}</Text>
                                    </View>
                                )}
                                {/**----------------------자재 가격--------------------------**/}
                                {(OrderData.goodsprice) && (
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>자재가격</Text>
                                        <Text style={[h14]}>{Price(OrderData.goodsprice)}원</Text>
                                    </View>
                                )}

                                {/**----------------------요청옵션비--------------------------**/}
                                {(OrderData.tot_opt_price) && (
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>옵션요청비</Text>
                                        <Text style={[h14]}>{Price(OrderData.tot_opt_price)}원</Text>
                                    </View>
                                )}
                                {/**----------------------배송비--------------------------**/}
                                {(OrderData.deli_price) && (
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>배송비</Text>
                                        <Text style={[h14]}>{Price(OrderData.deli_price)}원</Text>
                                    </View>
                                )}
                                {/**----------------------총결제 금액--------------------------**/}
                                <View style={[flex,justify_content_end,mb1]}>
                                    <Text style={[h14,styles.color1,me2]}>총 결제금액</Text>
                                    <Text style={[h16,text_primary]}>{Price(Settlekindprice)}원</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        );
    }
    /**-----------------------------------------------발주신청------------------------------------------------------**/
    function GoOrderForm() {
        return(
            <>
                {/**----------------------------------------------발주신청--------------------------------------------------**/}
                <View style={[bg_gray, {
                    paddingTop      : 6,
                    paddingBottom   : 38,
                    width           : "100%",
                    position        : "relative",
                    left            : 0,
                    bottom          : 0,
                    zIndex          : 99,
                    backgroundColor : (Mod) ? "#3D40E0":"#B1B2C3",

                }]}>

                        {(Mod) ? (
                            <>
                                <TouchableOpacity onPress={goMod}>
                                    <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                                        <Text style={[text_light]}>관리자확인 후 결제가 가능합니다.</Text>
                                    </View>
                                    <Text style={[{textAlign: "center", color: "#fff", fontSize: 18,}]}>
                                        수정완료
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ):(
                            <>
                                <TouchableOpacity onPress={goMod}>
                                    <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                                        <Text style={[text_light]}>관리자확인 후 결제가 가능합니다.</Text>
                                    </View>
                                    <Text style={[{textAlign: "center", color: "#fff", fontSize: 18,}]}>
                                        수정하기
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                </View>
            </>
        );
    }
    /**------------------------------------------1. 결제 요청건-------------------------------------------------**/


}

const styles = StyleSheet.create({


    payMement:{
       width:"100%",
    },
    btn_fix:{
        flex:1,
    },

    goods_thum:{
        width:75,
        height:75,
    },

    border:{
        borderWidth:1,
        borderColor:"#EDEDF1",
        paddingVertical:12,
        paddingHorizontal:12,
        borderRadius:5,
    },
    ord_tit_list_box:{
        paddingHorizontal:10,
        paddingVertical:12,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
    },
    Recent_search_list_item:{
        paddingVertical:5,
    },
    formSelect : {
        borderWidth: 1,
        borderColor:"#e6e6e6",
        padding:10,
    },
    btn:{
        paddingVertical:10,
        paddingHorizontal:60,
        borderRadius:10,
    },
    modalStyle:{
        color:"#333",
        // backgroundColor:"rgba(255,255,255,0.5)",
    },
    border_Circle:{
        width:20,
        height:20,
        borderWidth:1,
        borderColor:"#999",
        borderRadius:50,

    },
    border_Circle_active:{
        width:13,
        height:13,
        borderRadius:50,
        backgroundColor:"#3D40E0",
    },
    CancelDetail_list_items:{
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
    },
    select_box:{
        position:"relative",
    },
    select_icon_box:{
        position: "absolute",
        top: 0,
        right: 10,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    cart_goods_img:{
        borderRadius:5,
        width:90,
        height:80,
    },
});