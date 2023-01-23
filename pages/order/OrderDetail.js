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
import {
    container,
    bg_white,
    h16,
    text_center,
    flex_around,
    flex_between,
    input,
    fw300,
    h12,
    ms1,
    ms2,
    flex,
    flex_top,
    mt1,
    mt2,
    mt3,
    pb1,
    fw500,
    pb2,
    d_flex,
    align_items_center,
    bg_primary,
    text_light,
    justify_content_center,
    bg_gray,
    text_primary,
    countinput,
    textarea,
    text_danger,
    flex_between_top,
    padding_bottom,
    btn_outline_primary,
    btn_outline_danger,
    count_btn,
    count_btn_txt,
    pos_center,
    switch_bar,
    pt3,
    pb3,
    zonecode,
    wt7,
    wt3,
    ps1,
    h18,
    mb2,
    btn_outline_black,
    h14,
    h15,
    wt8, bg_light, justify_content_end, pe1, mb1, me2, h20, text_gray, flex_between_bottom, flex_end, h13,
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
import {bankAccount, DateChg, ordStatus, Phone, Price, Time1, Time2} from "../../util/util";
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

    /**--------------------------------------상태값 셋팅--------------------------------------------------**/
    const [OrderGoodsList, setOrderGoodsList]         = useState([]);      // 주문상품상태정의
    const Update = useIsFocused();
    /**--------------------------------------주문서 셋팅--------------------------------------------------**/
    const [OrderData, setOrderDate]                = useState([]);
    /**---------------------------------------------------------------------------------------------------**/
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
            console.log(res.data);
            if(result === 'OK') {
                // console.log(gd_order,'오리지널 주문');
                // setOrderDate();
                setOrderDate(gd_order);
                setOrderGoodsList(gd_order.A_order);
            } else {
                console.log('에러');
            }
        });
    }

    // console.log(OrderGoodsList,' / 주문자재 데이터');

    /**---------------------------------주문자재 정보 유틸에서 출력----------------------------------------------**/
    const getOrderGoods = () => {

    }
    /**---------------------------------페이지 진입시 노출---------------------------------------------------**/
    useEffect(() => {
        getOrderGoods();  // 주문목록 출력
        getOrderInfo();   // 주문정보 출력
    },[Update,Member]);

    /**---------------------------------입력폼 입력---------------------------------------------------**/
    const goInput = (keyValue, e) => {

    }

    /**--------------------------------------------------------------------------------------------------------------------------**/
    // console.log(OrderData,' / 주문정보');
    // console.log(OrderGoodsList,' / 주문자재정보');
    // console.log(InputFocus.current[0]);
    
    
    return (
        <>
            <KeyboardAvoidingView style={styles.avoidingView} behavior={Platform.select({ios: 'padding'})}>
                <ScrollView style={[bg_white,]}>
                    <View>
                        {/**----------------------------------------------발주상태 정의--------------------------------------------------**/}
                        <View style={[FormStyle.FormGroup]}>
                            <View style={[container]}>
                                <Text style={[h16,text_center]}>{ordStatus(OrderData.ord_status)}중 입니다. </Text>
                            </View>
                        </View>
                        <View style={[FormStyle.FormGroup]}>
                            {/**----------------------------------------------배송지 입력--------------------------------------------------**/}
                            {/*==============공사명===============*/}
                            <View style={[FormStyle.FormGroupItems]}>
                                <Text style={[FormStyle.FormLabel]}>공사명</Text>
                                <TextInput style={[input,{flex:1}]}
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
                                    <TextInput style={[input,{flex:1,marginRight:16},bg_light]}
                                               editable={false}
                                               placeholder="우편번호"
                                               value={OrderData.zonecode}
                                               onChangeText={(zonecode)=>goInput("zonecode",zonecode)}
                                               returnKeyType="next"
                                               blurOnSubmit={false}
                                               ref={el => (InputFocus.current[1] = el)}
                                    />
                                    {/*주소찾기*/}
                                    <TouchableOpacity onPress={()=>navigation.navigate('주소검색',{page:"배송정보등록", order_uid:order_uid})}>
                                        <View style={[bg_primary,{padding:8,borderRadius:5,}]}>
                                            <Text style={[text_light]}>주소찾기</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/*================주소============*/}
                            <View style={{paddingBottom:15,}}>
                                <TextInput style={[input,{flex:1},bg_light]}
                                           editable={false}
                                           placeholder="주소"
                                           value={OrderData.addr1}
                                    // onChangeText={(addr1)=>goInput("addr1",addr1)}
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
                                           ref={el => (InputFocus.current[3] = el)}
                                />
                            </View>
                            {/*다음 api 주소 팝업*/}
                            {/**----------------------------------------------배송지 입력--------------------------------------------------**/}

                        </View>
                        {/**----------------------------------------------희망배송일 선택--------------------------------------------------**/}
                        <View>
                            {/*==============제목==============*/}
                            <View
                                style={[d_flex, align_items_center, FormStyle.FormDate, {justifyContent: "space-between"}]}>
                                {/*체크박스*/}
                                <Text style={[FormStyle.FormDateLabel]}>도착일</Text>
                                <Text style={[FormStyle.FormDateLabel]}>
                                    {(OrderData.hope_deli_date) && DateChg(OrderData.hope_deli_date)}
                                </Text>
                            </View>
                            {/*==============캘린더==============*/}
                            <View style={[FormStyle.FormGroup, {paddingTop: 5, paddingBottom: 5,}]}>
                                <CalendarStrip
                                    scrollable
                                    onDateSelected={(Date) => {
                                        setOrderDate({
                                            ...OrderData,
                                            hope_deli_date: String(Date.format('YYYY-MM-DD')),
                                        });
                                    }
                                    }
                                    minDate={`2020-12-31`}
                                    maxDate={`2024-12-31`}
                                    style={{height: 150, paddingTop: 20, paddingBottom: 10}}
                                    daySelectionAnimation={{
                                        type: "background",
                                        highlightColor: "#3D40E0",
                                    }}
                                    selectedDate={OrderData.hope_deli_date}
                                    highlightDateNameStyle={{color: "#fff", fontSize: 12, paddingBottom: 5,}}
                                    highlightDateNumberStyle={{color: "#fff", fontSize: 16,}}
                                    weekendDateNameStyle={{color: "#452"}}
                                    dateNameStyle={{fontSize: 12, color: "#666", paddingBottom: 5,}}
                                    dateNumberStyle={{fontSize: 16}}
                                />
                            </View>
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
                            </View>
                            {/**----------------------------------------------현장인도자 정보--------------------------------------------------**/}
                            <View style={[FormStyle.FormGroup]}>
                                {/*==============현장인도자 성명==============*/}
                                <View style={[FormStyle.FormGroupItems]}>
                                    <View style={[FormStyle.FormGroupItems]}>
                                        <Text style={[FormStyle.FormLabel]}>현장인도자 성명</Text>
                                        <TextInput style={[input,{flex:1}]}
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
                                <OrderChk/>
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
                    <GoOrderForm/>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );



    /**-----------------------------------------------자재목록--------------------------------------------------**/
    function GoodsList() {
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
                                            <Text style={[h14,mb1]}>{val.goods_name}</Text>
                                            {/**--------------------------------옵션--------------------------------**/}
                                            {val.A_sel_option.map(items=>{
                                                console.log(img_src);
                                                return(
                                                    <>
                                                        <View style={[flex_between_bottom]}>
                                                            <View style={[flex_end]}>
                                                                <Image style={[styles.goods_thum]} source={{uri: 'http://www.zazaero.com' + img_src}}/>
                                                                <View style={ms2}>
                                                                    <Text style={[h14,fw500]}>수량</Text>
                                                                    <Text style={[h14]}>{items.option_cnt} 개</Text>
                                                                </View>

                                                            </View>
                                                            <View style={justify_content_end}>
                                                                <Text style={[h13]}>( 단가 : {Price(items.option_price)} 원)</Text>
                                                                {/*단가*/}
                                                                <Text style={[h16]}>{Price(val.sum_order_price)} 원</Text>
                                                                {/*총금액*/}
                                                            </View>
                                                        </View>
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

    /**-----------------------------------------------자재추가, 결제요청, 환불신청, 주문취소--------------------------------------------------**/
    function OrderChk() {
        console.log(OrderData.ord_status)
        return(
            <>
                {/**------------------------------발주신청, 발주검수중일시 노출------------------------------------**/}
                {(OrderData.ord_status === 'order_ready') && (
                    <>
                        <View style={[flex_around]}>
                            <TouchableOpacity>
                                <Text style={[styles.btn,btn_outline_primary]}>자재추가</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style="" onPress={()=>goDel()}>
                                <Text style={[styles.btn,btn_outline_danger]}>전체취소</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {/**------------------------------발주검수완료, 결제대기시 노출------------------------------------**/}
                {(OrderData.ord_status === 'order_done' || OrderData.ord_status === 'pay_ready' || OrderData.ord_status === 'deli_ready') && (
                    <>
                        <View style={[flex_around]}>
                            <TouchableOpacity>
                                <Text style={[styles.btn,btn_outline_primary]}>자재추가</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style="" onPress={()=>goDel()}>
                                <Text style={[styles.btn,btn_outline_danger]}>전체취소</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[flex_around]}>
                            <TouchableOpacity>
                                <Text style={[styles.btn,btn_outline_primary]}>결제요청</Text>
                            </TouchableOpacity>
                        </View>
                        {/**------------------------------결제유형 선택------------------------------------**/}

                    </>
                )}
                {/**------------------------------배송중, 배송완료시에 노출------------------------------------**/}
                {(OrderData.ord_status === 'deli_doing' || OrderData.ord_status === 'deli_done') && (
                    <>
                        <View style={[flex_around]}>
                            <TouchableOpacity>
                                <Text style={[styles.btn,btn_outline_primary]}>반품요청</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style="" onPress={()=>goDel()}>
                                <Text style={[styles.btn,btn_outline_danger]}>환불신청</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

            </>
        );
    }
    
    /**-----------------------------------------------총금액------------------------------------------------------**/
    function OrderTotalPrice() {

        /**----------------총 결제금액은 자재가격 + 요청옵션비 + 배송비 + 포인트----------------**/
        let goods_total_price = OrderGoodsList.map(val=>val.sum_order_price);
        console.log(goods_total_price);

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
                                {(OrderData.hope_opt_price) && (
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>옵션요청비</Text>
                                        <Text style={[h14]}>{Price(OrderData.hope_opt_price)}원</Text>
                                    </View>
                                )}
                                {/**----------------------배송비--------------------------**/}
                                {(OrderData.deli_price) && (
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>배송비</Text>
                                        <Text style={[h14]}>{Price(OrderData.deli_price)}원</Text>
                                    </View>
                                )}
                                {/**----------------------포인트 사용--------------------------**/}
                                <View style={[flex,justify_content_end,mb1]}>
                                    <Text style={[h14,styles.color1,me2]}>포인트</Text>
                                    <Text style={[h14]}>원</Text>
                                </View>
                                {/**----------------------총결제 금액--------------------------**/}
                                {(OrderData.settleprice) && (
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>총 결제금액</Text>
                                        <Text style={[h16,text_primary]}>{Price(OrderData.settleprice)}원</Text>
                                    </View>
                                )}

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
                    paddingTop: 6,
                    paddingBottom: 38,
                    left: 0,
                    bottom: 0,
                    width: "100%"
                }]}>
                    <TouchableOpacity>
                        <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                            <Text style={[text_light]}>관리자확인 후 결제가 가능합니다.</Text>
                        </View>
                        <Text style={[{textAlign: "center", color: "#fff", fontSize: 18,}]}>
                            수정요청
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
    /**------------------------------------------1. 결제 요청건-------------------------------------------------**/


}

const styles = StyleSheet.create({



    btn_fix:{
        flex:1,
    },

    goods_thum:{
        width:50,
        height:50,
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