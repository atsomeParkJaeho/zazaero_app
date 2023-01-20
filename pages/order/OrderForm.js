import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Button,
    CheckBox,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView, DatePickerIOS, TouchableWithoutFeedback, Alert
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list'
// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    input,
    flex,
    flex_top,
    bg_primary,
    d_flex,
    justify_content_center,
    align_items_center,
    text_light,
    text_dark,
    bg_gray,
    justify_content_between,
    ms1,
    ms2,
    bg_light,
    pb2,
    pos_center,
    btn_primary,
    p1,
    text_center,
    text_white,
    h12,
    h18,
    padding_bottom,
    text_danger,
    h16,
    h14,
    mb1,
    flex_between_bottom,
    flex_end,
    fw500,
    justify_content_end,
    h13,
    textarea,
    pe1,
    me2,
    text_primary,
    wt3,
    wt7,
    mb2,
    text_gray
} from '../../common/style/AtStyle';
import {sub_page, gary_bar, gray_bar} from '../../common/style/SubStyle';
import axios from "axios";
import {FormStyle} from "./FormStyle";
import CalendarStrip from 'react-native-calendar-strip';
import { Calendar, CalendarList ,Agenda } from 'react-native-calendars';
import * as PropTypes from "prop-types";
import 'moment';
import 'moment/locale/ko';
import {RadioButton} from "react-native-paper";  // language must match config
import Postcode from '@actbase/react-daum-postcode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {AddrMatch, Phone, Price, Time, Time1, Time2, cancel_List, cancel_d_List, DateChg} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import goodsthum1 from "../../assets/img/goods_thum1.jpg";
// import SelectBox from "react-native-multi-selectbox";




export default function OrderForm({route,navigation}) {



    /**--------------------------------------필수 정보사항--------------------------------------------------**/
    const {order_uid, addr1, zonecode} = route.params;
    const [Member, setMember]          = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    /**--------------------------------------상태값 셋팅--------------------------------------------------**/
    const [CartList, setCartList]         = useState([]);      // 장바구니 상태 정의
    const [modAddr, setmodAddr]           = useState(`add`); // 신규, 기존 배송지 선택 상태 정의
    const [DeliList, setDeliList]         = useState([]);   // 배송지 리스트
    const Update = useIsFocused();
    /**--------------------------------------주문서 셋팅--------------------------------------------------**/
    const [OrderData, setOrderDate]                = useState({
        act_type                    :"ins_order",           // 주문추가하기 로직
        mem_uid                     :Member,                // 회원 uid
        order_title                 :'',    // 회원 uid
        zonecode                    :'',    // 우편번호
        addr1                       :'',    // 주소
        addr2                       :'',    // 상세주소
        hope_deli_date              :'',    // 희망배송일
        hope_deli_time              :'',    // 희망배송시간
        order_mem_name              :'',    // 주문자명
        recv_name                   :'',    // 받는사람명
        order_memo                  :'',    // 배송메모
        settleprice                 :'',    // 상품가격
        goodsprice                  :'',    // 회원 uid
        deli_price                  :'',    // 회원 uid
    });

    /**---------------------------------주문 uid 추출 하기---------------------------------------------------**/

    /**---------------------------------다음 api 셋팅---------------------------------------------------**/
    const daumApi = () => {
        setOrderDate({
            ...OrderData,
            mem_uid         :Member,
            mgr_mem_uid     :Member,
            zonecode        :zonecode,
            addr1           :addr1,
        });
    }
    /**---------------------------------입력한 배송지 검색---------------------------------------------------**/
    const getDeliList = () => {
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
            act_type        : "get_deli_addr_list",
            mem_uid         :Member,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if (res) {
                // console.log(res.data);
                const {result, A_deli_info} = res.data;
                if (result === 'OK') {
                    setDeliList(A_deli_info);
                } else {
                    console.log('실패');
                }
            }
        });

    }
    /**---------------------------------장바구니 정보 유틸에서 출력---------------------------------------------------**/
    const getCartList = () => {
        let order_result_uid = order_uid.map(val=>Number(val.order_uid));
        console.log(order_result_uid);
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
            act_type        : "get_order_ready",
            mem_uid         : Member,
            order_uid       : order_result_uid,         // 배열로감
        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_order} = res.data;
                if (result === 'OK') {
                    setCartList(A_order);
                } else {
                    console.log('실패2');
                }
            }
        });


    }
    /**---------------------------------페이지 진입시 노출---------------------------------------------------**/
    useEffect(() => {
        daumApi();  // 다음 api
        getCartList();  // 장바구니
        getDeliList();  // 최근배송지
    },[Update,Member]);

    /**---------------------------------입력폼 입력---------------------------------------------------**/
    const goInput = (keyValue, e) => {
        if(keyValue === 'addr1') {setOrderDate({...OrderData, addr1:e,});}

        if(keyValue === 'zonecode') {setOrderDate({...OrderData, zonecode:e,});}

        setOrderDate({...OrderData, mem_uid:Member, mgr_mem_uid:Member, [keyValue]:e,});
    }

    /**---------------------------------배송지 삭제---------------------------------------------------**/
    const delDeli = (uid) => {
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
            act_type        : "del_deli_addr",
            mem_uid         :Member,
            gmd_sno         :uid,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if (res) {
                const {result} = res.data;
                if (result === 'OK') {
                    let temp = DeliList.filter(val=>(val.gmd_sno !== uid) && val);
                    setDeliList(temp);
                    return Alert.alert('','배송지를 삭제하였습니다.');
                } else {
                    console.log('실패');
                }
            }
        });
    }

    /**---------------------------------주문하기---------------------------------------------------**/
    const goForm = () => {
        /**-------------------------1. 입력창 체크 루틴-----------------------------**/
        let order_data = OrderData;
        if(order_data.order_mem_name) {
            Alert.alert('','없습니다.');
            return false;
        }
        if(order_data.order_mem_name) {
            Alert.alert('','없습니다.');
            return false;
        }
        if(order_data.order_mem_name) {
            Alert.alert('','없습니다.');
            return false;
        }
        if(order_data.order_mem_name) {
            Alert.alert('','없습니다.');
            return false;
        }
        if(order_data.order_mem_name) {
            Alert.alert('','없습니다.');
            return false;
        }


        /**-------------------------2. 최종입력창--------------------------------**/
        Alert.alert('','주문하시겠습니까?',[
            // left
            {text:'취소',
            style: 'destructive',
            onPress:()=>{}
            },
            // right
            {text:'확인',
            onPress:()=>{goOrder();}
            },
        ])
    }

    const goOrder = () => {
        console.log('주문완료');
    }




    /**--------------------------------------------------------------------------------------------------------------------------**/
    console.log(OrderData,' / 주문정보')
    return (
        <>
            <KeyboardAvoidingView style={styles.avoidingView} behavior={Platform.select({ios: 'padding'})}>
                {/**----------------------------------------------신규배송지 입력---------------------------------------------------**/}
                <ScrollView style={[bg_white,]}>
                    <View style={{paddingBottom: 110,}}>
                        <View style={[FormStyle.FormGroup]}>
                            <View>
                                <Text style={[FormStyle.FormTitle]}>배송지 입력</Text>
                            </View>
                            {/**----------------------------------------------신규, 기존 배송지 선택--------------------------------------------------**/}
                            <View>
                                <View style={[FormStyle.FormGroupItems]}>
                                    <OrderAddress/>
                                </View>
                            </View>
                            {/**----------------------------------------------기존배송지 선택시 노출--------------------------------------------------**/}
                            {(modAddr === 'mod') && (
                                <>
                                    <OrderSearch/>
                                </>
                            )}
                            {/**----------------------------------------------배송지 입력--------------------------------------------------**/}
                            {/*==============공사명===============*/}
                            <View style={[FormStyle.FormGroupItems]}>
                                <Text style={[FormStyle.FormLabel]}>공사명</Text>
                                <TextInput style={[input,{flex:1}]}
                                placeholder="공사명"
                                value={OrderData.order_title}
                                onChangeText={(order_title)=>goInput("order_title",order_title)}
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
                                    value={zonecode}
                                    onChangeText={(zonecode)=>goInput("zonecode",zonecode)}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
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
                                value={addr1}
                                onChangeText={(addr1)=>goInput("addr1",addr1)}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                />
                            </View>
                            {/*============상세주소=================*/}
                            <View>
                                <TextInput style={[input,{flex:1}]}
                                onChangeText={(addr2)=>goInput("addr2",addr2)}
                                placeholder="상세주소"
                                value={OrderData.addr2}
                                returnKeyType="done"
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
                                    <Text style={[FormStyle.FormDateLabel]}>도착시간</Text>
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
                                <OrderMemInfo/>
                            </View>
                            {/**----------------------------------------------상품목록--------------------------------------------------**/}
                            <View>
                                <OrderCartList/>
                            </View>
                            {/**----------------------------------------------총금액--------------------------------------------------**/}
                            <View>
                                <OrderTotalPrice/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {/**----------------------------------------------발주신청--------------------------------------------------**/}
                <View style={[bg_gray, {
                    paddingTop: 6,
                    paddingBottom: 38,
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%"
                }]}>
                    <TouchableOpacity onPress={goForm}>
                        <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                            <Text style={[text_light]}>관리자확인 후 결제가 가능합니다.</Text>
                        </View>
                        <Text style={[{textAlign: "center", color: "#fff", fontSize: 18,}]}>
                            발주요청
                        </Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </>
    );



    /**------------------------------신규배송지, 기존배송지 선택-------------------------------**/
    function OrderAddress() {
        return (
            <>
                <View style={[flex,pb2]}>
                    {/**----------------------------------------------신규공사--------------------------------------------------**/}
                    <TouchableOpacity onPress={()=>setmodAddr('add')}>
                        <View style={[flex]}>
                            <View style={[styles.border_Circle]}>
                                {(modAddr === 'add') &&
                                    <View style={[pos_center]}>
                                        <View style={[styles.border_Circle_active]}/>
                                    </View>
                                }
                            </View>
                            <Text style={[styles.Chk, {paddingLeft: 5}]}>신규공사</Text>
                        </View>
                    </TouchableOpacity>
                    {/**----------------------------------------------기존 공사--------------------------------------------------**/}
                    <TouchableOpacity onPress={()=>setmodAddr('mod')}>
                        <View style={[flex,ms2]}>
                            <View style={[styles.border_Circle]}>
                                {(modAddr === 'mod') &&
                                    <View style={[pos_center]}>
                                        <View style={[styles.border_Circle_active]}/>
                                    </View>
                                }
                            </View>
                            <Text style={[styles.Chk, {paddingLeft: 5}]}>기존공사</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
    /**--------------------------------기존 배송지 선택----------------------------------**/
    function OrderSearch() {
        const [Show, setShow]         = useState(false);    // 검색창 노출 여부

        console.log(DeliList,'/ 최근배송지 정보');

        return(
            <>
                <Text style={[mb1]}>기존 배송지 검색</Text>
                <View style={[styles.ord_tit_list_search,mb2]}>
                    <View style={[styles.select_box]}>
                        <TouchableOpacity onPress={()=>{setShow(!Show)}}>
                            <View style={[styles.border]}>
                                {/**---------------------------선택주소 노출--------------------------------**/}
                                <Text style={[]}>
                                    {/*{(DeliList[0].gmd_address !== undefined) ? DeliList[0].gmd_address : '없음'}*/}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.select_icon_box]}>
                            <Text style={[styles.select_icon]}>▼</Text>
                        </View>
                    </View>
                    {/**---------------------------클릭시 노출--------------------------------**/}
                    {(Show) && (
                        <View style={[styles.ord_tit_list_box]}>
                            <TextInput style={[input,{flex:1,marginRight:16},mb1]} placeholder="공사명 입력"
                            />
                            <View style={[styles.ord_tit_list]}>
                                {/**---------------------------반복문 구간--------------------------------**/}
                                {DeliList.map(val=>(
                                    <>
                                        <View style={[styles.Recent_search_list_item]}>
                                            <View style={flex_between}>
                                                <View>
                                                    <TouchableOpacity onPress={()=>goSearch(val.find_txt)}>
                                                        <Text style={[h14,styles.txt_color2]}>
                                                            {val.gmd_address}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <View style={[flex,justify_content_end]}>
                                                        <Text style={[h14,text_gray]}>
                                                            {DateChg(Date(val.gmd_regdate))}
                                                        </Text>
                                                        <TouchableOpacity style={ms2} onPress={()=>delDeli(val.gmd_sno)}>
                                                            <Text style={[h14,styles.txt_color]}>X</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[styles.Recent_search_list_item]}>
                                            <View style={flex_between}>
                                                <View>
                                                    <TouchableOpacity onPress={()=>goSearch(val.find_txt)}>
                                                        <Text style={[h12,styles.txt_color2]}>
                                                            광주광역시 열방빌딩 우치로 서하로
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <View style={[flex,justify_content_end]}>
                                                        <Text style={[h12,text_gray]}>
                                                            {DateChg(Date(val.gmd_regdate))}
                                                        </Text>
                                                        <TouchableOpacity style={ms2} onPress={()=>delDeli(val.gmd_sno)}>
                                                            <Text style={[h12,styles.txt_color]}>X</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                ))}


                            </View>
                        </View>
                    )}

                </View>
            </>
        );
    }
    /**------------------------------공사명, 배송지 입력-------------------------------**/
    function OrderTitle() {


        return (
            <>

            </>
        );
    }
    /**-----------------------------------------------희망배송시간--------------------------------------------------**/
    function HopeTime() {
        return(
            <>

            </>
        );
    }
    /**-----------------------------------------------현장인도자 정보--------------------------------------------------**/
    function OrderMemInfo() {
        return(
            <>
                {/*==============현장인도자 성명==============*/}
                <View style={[FormStyle.FormGroupItems]}>
                    <View style={[FormStyle.FormGroupItems]}>
                        <Text style={[FormStyle.FormLabel]}>현장인도자 성명</Text>
                        <TextInput style={[input,{flex:1}]}
                                   // onChangeText={(recv_name)=>goInput("recv_name",recv_name)}
                                   placeholder="예 ) 홍길동"
                                   // value={Phone(OrderData.recv_name)}
                                   // ref={value => (ChkFocus.current[5] = value)}
                        />
                    </View>
                    {/*==============현장인도자 연락처==============*/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <View>
                            <Text style={[FormStyle.FormLabel]}>현장인도자 연락처</Text>
                            <TextInput style={[input,{flex:1}]}
                                       // onChangeText={(recv_phone)=>goInput("recv_phone",recv_phone)}
                                       placeholder="예 ) 010-XXXX-XXXX"
                                       maxLength={13}
                                       // value={Phone(OrderData.recv_phone)}
                                       // ref={value => (ChkFocus.current[5] = value)}
                            />
                        </View>
                    </View>
                    {/*==============배송 요청 사항==============*/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <View>
                            <Text style={[FormStyle.FormLabel]}>배송 요청 사항</Text>
                            <TouchableWithoutFeedback >
                                <TextInput style={[input,{flex:1,height:100}]}
                                           multiline={true}
                                           numberOfLines={4}
                                           placeholder="배송요청사항"
                                           // onChangeText={(order_memo)=>goInput("order_memo",order_memo)}
                                           // onPressIn={()=>ChkFocus.current[6].focus()}
                                           // ref={value => (ChkFocus.current[6] = value)}
                                           // value={OrderData.order_memo}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </>
        );
    }
    /**-----------------------------------------------자재목록--------------------------------------------------**/
    function OrderCartList() {
        return(
            <>
                <View style={[container, {borderBottomWidth: 1,borderColor:"#e6e6e6",}]}>
                    <Text style={[h18]}>자재목록</Text>
                </View>
                {/**-----------------자재목록---------------------------------------**/}
                <View>
                    {/**-----------------반복문 구간---------------------------------------**/}
                    {CartList.map(val=>{
                        if(val.goods_name !== null) {
                            return(
                                <>
                                    <View style={[styles.CancelDetail_list_items]} >
                                        <View style={[container]}>
                                            <View style={[flex]}>
                                                <View style={[wt3]}>
                                                    <Text style={[h14, ]}>상품명 : </Text>
                                                </View>
                                                <View style={[wt7]}>
                                                    <Text style={[h14, ]}>{val.goods_name}</Text>
                                                </View>
                                            </View>
                                            {/**--------------------------------옵션--------------------------------**/}
                                            {val.A_sel_option.map(items=>{

                                                return(
                                                    <>
                                                        <View style={[flex]}>
                                                            <View style={[wt3]}>
                                                                <Text style={[h14, ]}>단가 : </Text>
                                                            </View>
                                                            <View style={[wt7]}>
                                                                <Text style={[h14, ]}>{Price(items.option_price)} 원</Text>
                                                            </View>
                                                        </View>
                                                        <View style={[flex]}>
                                                            <View style={[wt3]}>
                                                                <Text style={[h14, ]}>수량 : </Text>
                                                            </View>
                                                            <View style={[wt7]}>
                                                                <Text style={[h14]}>{items.option_cnt} 개</Text>
                                                            </View>
                                                        </View>
                                                    </>
                                                );
                                            })}

                                            {/**--------------------------------주문가격--------------------------------**/}
                                            <View style={[flex]}>
                                                <View style={[wt3]}>
                                                    <Text style={[h14, ]}>총금액 : </Text>
                                                </View>
                                                <View style={[wt7]}>
                                                    <Text style={[h16]}>{Price(val.sum_order_price)} 원</Text>
                                                </View>
                                            </View>

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

        let total_cnt_arr   = order_uid.map(cate=>cate.A_sel_option.map(val=>Number(val.option_cnt)));
        let total_price_arr = CartList.map(cate=>cate.sum_order_price);
        let total_cnt = total_cnt_arr.reduce((val,idx)=>{
            return val.concat(idx);
        });

        let goods_total_cnt = 0;
        let goods_total_price = 0;
        for (let i = 0; i < total_cnt_arr.length; i++) {
            goods_total_cnt   += total_cnt[i];
            goods_total_price += total_price_arr[i];
        }

        return(
            <>
                <View style="">
                    <View style={container}>
                        <Text style={[h18]}>발주 금액</Text>
                    </View>
                    <View style={[container, bg_light]}>
                        <View style={[d_flex, justify_content_end, pe1]}>
                            <View style="">

                                <View style={[flex, justify_content_end, mb1]}>
                                    <Text style={[h14, styles.color1, me2]}>총 자재 수량</Text>
                                    <Text style={[h14]}>{goods_total_cnt}개</Text>
                                </View>
                                {/*자재 가격*/}
                                <View style={[flex, justify_content_end]}>
                                    <Text style={[h14, styles.color1, me2]}>총 자재 가격</Text>
                                    <Text style={[h16, text_primary]}>{Price(goods_total_price)}원</Text>
                                </View>
                                {/*총 결제금액*/}
                            </View>
                        </View>
                    </View>
                </View>
            </>
        );
    }



}

const styles = StyleSheet.create({
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
});