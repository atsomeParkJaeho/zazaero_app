import React, {useState, useEffect} from 'react';
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
    wt8, bg_light, justify_content_end, pe1, mb1, me2, h20,
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
import {bankAccount, ordStatus, Price, Time1, Time2} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";
import CalendarStrip from "react-native-calendar-strip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import OrderStatus from "./OrderStatus";
import orderStatus from "./OrderStatus";
import RNPickerSelect from "react-native-picker-select";




export default function OrderDtail({route,navigation}) {

    console.log(route.params);
    const {gd_order_uid, hope_deli_date} = route.params;
    const [Member, setMember] = useState();
    const Update = useIsFocused();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });

    // 1. 주문상세 상태정의
    const [OrderDetail, setOrderDetail] = useState([]);
    const [Hope, setHope]               = useState({
        hopeDate    :'',
        hopeTime1   :'',
        hopeTime2   :'',
    });
    const [PayMement, setPayMement]     = useState(`bank`);

    // 2. 자재로 정보 상태 저장
    const [ComInfo, setComInfo] = useState([]);

    // 3. 주문상세 내역 출력
    useEffect(()=>{
        // ======================= db 연결용==================//
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
            act_type        :"get_order_detail",
            login_status    :"Y",
            gd_order_uid    :gd_order_uid,
            mem_uid         :Member,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            const {result, gd_order} = res.data;
            console.log(result);
            if(result === 'OK') {
                setOrderDetail(gd_order);
                setHope({
                    ...Hope,
                    hopeDate:gd_order.hope_deli_date,
                });
            } else {
                console.log('에러');
            }
        });
        // ======================= 자재로 관리자 정보 가져오기==================//
        axios.post('',{
            
        },{
            
        }).then((res)=>{
            const {result} = res.data;
            if(result === 'OK') {
               
            } else {
                console.log('에러');
            } 
        });
        
        
    },[Member,Update]);


    /*
    * 1. 발주상태 - 발주신청: 발주번호, 공사명, 배송지, 도착일, 도착시간, 현장인도자 성명, 자재추가 전체취소
    *
    *
    *
    * */
    //=================     * 정보변경       ===================//
    const goInput = (keyValue, e)=>{
        if(keyValue === 'hopeTime1') {      // 오전, 오후
            setHope({
                ...Hope,
                hopeTime1:e,
            });
        }
        if(keyValue === 'hopeTime2') {      // 시간대 선택
            setHope({
                ...Hope,
                hopeTime2:e,
            });
        }
    }
    //=================     * 자재추가       ===================//
    //=================     * 전체취소       ===================//
    //=================     * 전체취소       ===================//
    //=================     * 자재 삭제      ===================//
    //=================     * 요청옵션비     ===================//





    // console.log('배송내역 / ',OrderDetail);
    console.log('날짜확인 / ', OrderDetail.hope_deli_time);
    console.log(OrderDetail.hope_deli_time);
    let hope_deli_time1 = (OrderDetail.hope_deli_time > 11) ? 'PM':'AM';
    let hope_deli_time2 = (OrderDetail.hope_deli_time > 11) ? (OrderDetail.hope_deli_time-12)+':00':OrderDetail.hope_deli_time+':00';

    console.log('확인 1/ ',hope_deli_time1);
    console.log('확인 2/ ',hope_deli_time2);

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.OrderDetail]}>
                    <View style={[FormStyle.FormGroup]}>
                        {/*=============상태문구============*/}
                        <View style={[container]}>
                            <Text style={[h16,text_center]}>
                                {ordStatus(`${OrderDetail.ord_status}`)}
                            </Text>
                        </View>
                    </View>
                    {/*==============발주 내역을 확인==============*/}
                    <View style={[FormStyle.FormGroup]}>
                        <View style={[pb2]}>
                            <Text style={[styles.OrderDetail_txt,h16,pb1]}>발주번호</Text>
                            <Text style={[styles.OrderDetail_txt,h16,fw500]}>{OrderDetail.order_no}</Text>
                        </View>
                        {/*발주번호*/}
                        <View style="">
                            <Text style={[styles.OrderDetail_txt,h16,pb1]}>공사명 </Text>
                            <TextInput style={[input]}
                            onChangeText={(order_title)=>goInput("order_title",order_title)}
                            placeholder="ex)공사명 입력"
                            value={OrderDetail.order_title}
                            blurOnSubmit={false}
                            />
                        </View>
                        {/*발주번호*/}
                    </View>
                    <View style={[FormStyle.FormGroup]}>
                        <View>
                            <View style={[FormStyle.FormGroupItems]}>
                                <Text style={[FormStyle.FormLabel]}>배송지</Text>
                                <View  style={[flex,mt1]} >
                                    <View  style={[wt7]} >
                                        <TextInput style={[input,bg_light]}
                                        editable={false}
                                        value={OrderDetail.zonecode}
                                        onChangeText={(zonecode)=>goInput("zonecode",zonecode)}
                                        returnKeyType="next"
                                        placeholder="우편번호"
                                        />
                                    </View>
                                    <View  style={[wt3,ps1]} >
                                        <TouchableOpacity style={[styles.addr_btn]} onPress={()=>navigation.navigate('주소검색',{page:"발주상세", order_uid:OrderDetail.order_uid})}>
                                            <View  style={[pos_center]} >
                                                <Text style={[styles.addr_btn_txt]}>주소찾기</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            {/*==============배송지==============*/}
                            <View style={[FormStyle.FormGroupItems]}>
                                <View>
                                    <TextInput style={[input,bg_light]}
                                    editable={false}
                                    placeholder="주소"
                                    onChangeText={(addr1)=>ChkInput("addr1",addr1)}
                                    value={OrderDetail.addr1}
                                    />
                                </View>
                            </View>
                            {/*==============주소==============*/}
                            <View style={[FormStyle.FormGroupItems]}>
                                <View>
                                    <TextInput style={[input]}
                                    placeholder="상세주소"
                                    onChangeText={(addr2)=>ChkInput("addr2",addr2)}
                                    value={OrderDetail.addr2}
                                    />
                                </View>
                            </View>
                            {/*==============상세주소==============*/}
                        </View>
                    </View>
                    {/*==============희망배송일==============*/}
                    <View>
                        {/*==============제목==============*/}
                        <View style={[d_flex, align_items_center, FormStyle.FormDate, {justifyContent:"space-between"}]}>
                            {/*체크박스*/}
                            <Text style={[FormStyle.FormDateLabel]}>도착일</Text>
                            <Text style={[FormStyle.FormDateLabel]}>{Hope.hopeDate}</Text>
                        </View>
                        {/*==============캘린더==============*/}
                        <View style={[FormStyle.FormGroup]}>
                            <CalendarStrip
                                scrollable
                                onDateSelected={(Date)=> {
                                    console.log(Date);
                                    setHope({
                                        ...Hope,
                                        hopeDate: String(Date.format('M' + '월' + 'D' + '일')),
                                    });
                                    setOrderDetail({
                                        ...OrderDetail,
                                        hope_deli_date: String(Date.format('YYYY-MM-DD')),
                                    });
                                }
                                }
                                minDate={`2020-12-31`}
                                maxDate={`2024-12-31`}
                                style={{height:150, paddingTop: 20, paddingBottom: 10}}
                                daySelectionAnimation={{
                                    type:"background",
                                    highlightColor:"#3D40E0",
                                }}
                                selectedDate={hope_deli_date}
                                highlightDateNameStyle={{color:"#fff",fontSize:12, paddingBottom:5,}}
                                highlightDateNumberStyle={{color:"#fff",fontSize:16,}}
                                weekendDateNameStyle={{color:"#452"}}
                                dateNameStyle={{fontSize:12, color:"#666", paddingBottom:5,}}
                                dateNumberStyle={{fontSize:16}}

                            />
                        </View>
                    </View>
                    {/*==============희망배송시간==============*/}
                    <View>
                        {/*==============제목==============*/}
                        <View style={[d_flex, align_items_center, FormStyle.FormDate, {justifyContent:"space-between"}]}>
                            {/*체크박스*/}
                            <Text style={[FormStyle.FormDateLabel]}>도착시간</Text>
                            <Text style={[FormStyle.FormDateLabel]}>

                            </Text>
                        </View>
                        {/*==============시간입력==============*/}
                        <View style={[FormStyle.FormGroup]}>
                            <View style={[d_flex, align_items_center]}>
                                <View style={[styles.formSelect,{flex:0.3, marginRight:10,}]}>
                                    <RNPickerSelect
                                        value={`${hope_deli_time1}`}
                                        placeholder={{label:"오전,오후", value:null}}
                                        onValueChange={(road_address) => goInput('road_address',road_address)}
                                        items={Time1}
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
                                <View style={[styles.formSelect,{flex:0.7}]}>
                                    <RNPickerSelect
                                        value={`${hope_deli_time2}`}
                                        placeholder={{label:"시간을 선택해주세요.", value:null}}
                                        onValueChange={(road_address) => goInput('road_address',road_address)}
                                        items={Time2}
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
                    {/*==============현장인도자 연락처==============*/}

                    {/*============배송정보=============*/}
                    <View style={[FormStyle.FormGroup]}>
                        {/*==============현장인도자 성명==============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <View>
                                <Text style={[FormStyle.FormLabel]}>현장인도자 성명</Text>
                                <TextInput style={[input]}
                                 onChangeText={(recv_name)=>ChkInput("recv_name",recv_name)}
                                 value={OrderDetail.recv_name}
                                 placeholder="홍길동"
                                />
                            </View>
                        </View>
                        {/*==============현장인도자 연락처==============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <View>
                                <Text style={[FormStyle.FormLabel]}>현장인도자 연락처</Text>
                                <TextInput style={[input]}
                                 onChangeText={(recv_phone)=>ChkInput("recv_phone",recv_phone)}
                                 value={OrderDetail.recv_phone}
                                 placeholder="010-1234-5678"
                                />
                            </View>
                        </View>
                        {/*==============배송 요청 사항==============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <View>
                                <Text style={[FormStyle.FormLabel]}>배송 요청 사항</Text>
                                <TextInput style={[textarea]}
                                 multiline={true}
                                 numberOfLines={10}
                                 onChangeText={(order_memo)=>ChkInput("order_memo",order_memo)}
                                 value={OrderDetail.order_memo}
                                 placeholder="도착지 건물 지하주차장에 내려주세요 "
                                />
                            </View>
                        </View>
                        {/*==============자재목록==============*/}



                    </View>
                    {/*==============자재추가==============*/}
                    <View style={[container]}>
                        <View style={[flex_around]}>
                            <TouchableOpacity style="" >
                                <Text style={[styles.btn,btn_outline_primary]}>자재추가</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style="" onPress={()=>goDel()}>
                                <Text style={[styles.btn,btn_outline_danger]}>전체취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*============================결제정보==========================*/}
                    {/*===============결제 완료시에만 노출한다==========================*/}
                    {(OrderDetail.ord_status === 'pay_done') && (
                    <View style="">
                        <View style={container}>
                            <Text style={[h18]}>결제 정보</Text>
                        </View>
                        <View style={[container,bg_light]}>
                            <View style={[d_flex,justify_content_end,pe1]}>
                                <View style="">
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>결제요청일</Text>
                                        <Text style={[h14]}>{OrderDetail.order_date}</Text>
                                    </View>
                                    {/*결제일*/}
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>자재 가격</Text>
                                        <Text style={[h14]}>{Price(OrderDetail.goodsprice)}원</Text>
                                    </View>
                                    {/*자재 가격*/}
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>요청옵션비</Text>
                                        <Text style={[h14]}>{Price(OrderDetail.make_price)}원</Text>
                                    </View>
                                    {/*요청옵션비*/}
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>배송비</Text>
                                        <Text style={[h14]}>{Price(OrderDetail.deli_price)}원</Text>
                                    </View>
                                    {/*배송비*/}
                                    <View style={[flex,justify_content_end]}>
                                        <Text style={[h14,styles.color1,me2]}>총 결제금액</Text>
                                        <Text style={[h16,text_primary]}>{Price(OrderDetail.settleprice)}원</Text>
                                    </View>
                                    {/*총 결제금액*/}
                                </View>
                            </View>
                        </View>
                    </View>
                    )}
                    {/*===============결제대기시에만  노출한다==========================*/}
                    {/*=================결제정보========================*/}
                    {(OrderDetail.ord_status === 'pay_ready') && (
                    <View style={container}>
                        <Text style={[h18,mb2]}>결제유형</Text>
                        {/*=============결제 유형선택=================*/}
                        <View style={[flex,pb2]}>
                            {/*============신규공사========*/}
                            <TouchableOpacity onPress={()=>setPayMement('bank')}>
                                <View style={[flex]}>
                                    <View style={[styles.border_Circle]}>
                                        {(PayMement === 'bank') &&
                                            <View style={[pos_center]}>
                                                <View style={[styles.border_Circle_active]}/>
                                            </View>
                                        }
                                    </View>
                                    <Text style={[styles.Chk, {paddingLeft: 5}]}>무통장결제</Text>
                                </View>
                            </TouchableOpacity>
                            {/*===========기존공사===============*/}
                            <TouchableOpacity onPress={()=>setPayMement('card')}>
                                <View style={[flex,ms2]}>
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
                        </View>
                        {/*===============카드 결제 선택시 노출============*/}
                        {(PayMement === 'card') && (
                        <>
                            <View>
                                <TouchableOpacity style="" >
                                    <Text style={[styles.btn,btn_outline_primary,{textAlign:"center"}]}>결제하기</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        )}
                        {/*===============무통장 입금시 노출===============*/}
                        {(PayMement === 'bank') && (
                        <>
                            <View style={[d_flex,{marginBottom:15,}]}>
                                <View style={{width:"30%",marginRight:10,}}>
                                    <TextInput style={[input]}
                                     placeholder="예금주"
                                    />
                                </View>
                                <View style={{width:"70%"}}>
                                    <TextInput style={[input]}
                                    placeholder=""
                                    />
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style="" >
                                    <Text style={[styles.btn,btn_outline_primary,{textAlign:"center"}]}>결제하기</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        )}
                    </View>
                    )}




                    {/*===============반품시에만 노출한다==========================*/}


                </View>
            </ScrollView>
            <View style={[bg_gray,pt3,pb3]}>
                <TouchableOpacity >
                    <Text style={[{textAlign: "center", color: "#fff", fontSize: 20,}]}>수정하기</Text>
                </TouchableOpacity>
            </View>
            {/*    */}
        </>
    );
}

const styles = StyleSheet.create({
    selectGroup_txt: {
        fontSize: 16,
        lineHeight: 24,
        paddingBottom: 14,
    },
    mt_24: {
        marginTop: 24,
    },
    mt_10: {
        marginTop: 10,
    },
    select: {
        borderRadius: 0,
    },
    w_30: {
        width: "30%",

    },
    w_70: {
        width: "70%",
    },
    pl_2: {
        paddingLeft: 10,
    },
    addr_btn: {
        backgroundColor: "#4549e0",
        height: 34,
    },
    addr_btn_txt: {
        color: "#fff",
        textAlign: "center",
        fontSize: 14,
    },
    DateofArrival_txt: {
        fontSize: 14,
    },
    border_b_dotted: {
        borderStyle: 'dashed',
        borderBottomWidth: 1,
        margin: -2,
    },
    p_16:{
        padding:16,
    },
    text_r:{
        textAlign:"right",
    },
    border_b1:{
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
    },
    btn:{
        paddingVertical:10,
        paddingHorizontal:60,
        borderRadius:10,
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
});