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
    text_gray, select_box, select_txt, select_icon_box, text_black, h17
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
import {AddrMatch, Phone, Price, Time, Time1, Time2, cancel_List, cancel_d_List, DateChg, DateChg2} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";
import {InsOrder, SaveDeliAddr} from "./UTIL_order";




export default function OrderForm({route,navigation}) {

    /**--------------------------------------필수 정보사항--------------------------------------------------**/
    const {order_uid, addr1, zonecode, goods_cate1_uid} = route.params;
    console.log(goods_cate1_uid,'/asdf');
    let order_result_uid = order_uid.map(val=>Number(val.order_uid));

    const [Member, setMember]          = useState();
    const mem_uid                           = AsyncStorage.getItem("member").then((value)=>{setMember(value);});
    const InputFocus = useRef([]);

    const [Show, setShow]         = useState(false);    // 셀렉트창 노출 여부
    /**--------------------------------------상태값 셋팅--------------------------------------------------**/
    const [CartList, setCartList]         = useState([]);      // 장바구니 상태 정의
    const [modAddr, setmodAddr]           = useState(`add`); // 신규, 기존 배송지 선택 상태 정의
    const [DeliList, setDeliList]         = useState([]);   // 배송지 리스트
    const Update = useIsFocused();
    const ostype = Platform.OS;

    /**--------------------------------------발주서 셋팅--------------------------------------------------**/
    const [OrderData, setOrderDate]                = useState({
        act_type            :'ins_order',
        mem_uid             :Member,                          // 회원 uid
        mgr_mem_uid         :Member,                          // 회원 uid
        A_order_uid         :order_result_uid,                // 발주 uid
        os_type             :ostype,                          // 기기 os
        recv_name           :'',                              // 현장인도자 성명
        recv_phone          :'',                              // 현자인도자 전화번호
        zonecode            :'',                              // 우편번호
        addr1               :'',                              // 주소
        addr2               :'',                              // 상세주소
        hope_deli_date      :'',                              // 희망배송일
        hope_deli_time      :'',                              // 희망배송시간
        order_memo          :'',                              // 배송요청사항
        settleprice         :'',                              // 결제 금액
        tot_order_price     :'',                              // 자재 총 가격
        deli_type           :'',                              // 착불, 선불
        deli_price          :'',                              // 배송비
        work_uid           :'',                              // 공사명 uid
        save_point          :'',                              // 적립 포인트
        point_use           :'',                              // 사용 포인트
    });
    const [Selected, setSelected] = useState({
        zonecode        :'',
        addr1           :'',
        order_title     :'',
    });
    /**---------------------------------------------------------------------------------------------------**/


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
                    let total_price_arr = A_order.map(cate=>cate.sum_order_price);
                    let goods_total_price = 0;
                    for (let i = 0; i < total_price_arr.length; i++) {
                        goods_total_price += total_price_arr[i];
                    }
                    setOrderDate({...OrderData,settleprice:goods_total_price,tot_order_price:goods_total_price,})

                } else {
                    console.log('실패2');
                }
            }
        });
    }
    /**---------------------------------페이지 진입시 노출---------------------------------------------------**/
    useEffect(() => {
        // daumApi();  // 다음 api
        getCartList();  // 장바구니
        getDeliList();  // 최근배송지
    },[Update,Member]);

    /**---------------------------------입력폼 입력---------------------------------------------------**/
    const goInput = (keyValue, e) => {
        if(keyValue === 'addr1') {setOrderDate({...OrderData, addr1:e,});}
        if(keyValue === 'zonecode') {setOrderDate({...OrderData, zonecode:e,});}
        setOrderDate({...OrderData,
            addr1           :addr1,
            zonecode        :zonecode,
            mem_uid         :Member,
            mgr_mem_uid     :Member,
            [keyValue]      :e,
        });
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

    //
    //
    const loca_list = [

        {
            name: "09:00",                       //예금주
        },
        {
            name: "09:30",                       //예금주
        },
        {
            name: "09:30",                       //예금주
        },
        {
            name: "전주",                       //예금주
        },
        {
            name: "대구",                       //예금주
        },
        {
            name: "대전",                       //예금주
        },
        {
            name: "울산",                       //예금주
        },
        {
            name: "인천",                       //예금주
        },
        {
            name: "제주",                       //예금주
        },
        {
            name: "전주",                       //예금주
        },
    ];

    const [MakeSelected, setMakeSelected] = useState({
        select_title: '',
    });

    const goSearch = (name) => {
        setShow(false);
        setMakeSelected({
            ...MakeSelected,
            select_title: name,

        });

    }
    //

    /**--------------------------------------------------------------------------------------------------------------------------**/
        // 오늘날짜 출력
    let today = new Date();
    console.log(DateChg2(today));

    console.log(OrderData);
    console.log(DeliList);

    return (
        <>
            <KeyboardAvoidingView style={styles.avoidingView} behavior={Platform.select({ios: 'padding'})}>
                {/**----------------------------------------------신규배송지 입력---------------------------------------------------**/}
                <ScrollView style={[bg_white,]}>
                    <View>
                        <View style={[FormStyle.FormGroup]}>
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
                                               value={zonecode}
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
                                           value={addr1}
                                           onChangeText={(addr1)=>goInput("addr1",addr1)}
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
                                <Text style={[FormStyle.FormDateLabel]}>희망배송일</Text>
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
                                    startingDate={`${today}`}
                                    minDate={`${today}`}
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
                                    <Text style={[FormStyle.FormDateLabel]}>희망배송시간</Text>
                                    <Text style={[FormStyle.FormDateLabel]}>
                                        {OrderData.hope_deli_time}
                                    </Text>
                                </View>
                                {/*==============시간입력==============*/}
                                <View style={[FormStyle.FormGroup]}>
                                    <View style={[select_box]}>
                                        <TouchableOpacity onPress={()=>{setShow(!Show)}}>
                                            <Text style={[select_txt,(Selected.select_title) ? text_black:'']}>
                                                {(Selected.select_title) ? Selected.select_title:'시간을 선택해주세요'}
                                            </Text>
                                            <View style={[select_icon_box]}>
                                                <Text style={[styles.select_icon]}>▼</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {/**/}
                                    {/**---------------------------클릭시 노출--------------------------------**/}
                                    {(Show) && (
                                        <View style={[styles.select_opt_list_box]}>
                                            <ScrollView style={[{height:160}]} nestedScrollEnabled={true}>
                                                {loca_list.map((val,ide)=>
                                                    <View style={[styles.select_opt_list_itmes]}>
                                                        <TouchableOpacity onPress={() => goSearch(val.name)}>
                                                            <Text style={[text_center,h17]}>
                                                                {val.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </ScrollView>
                                        </View>
                                    )}
                                    {/**/}
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
                                                       keyboardType="number-pad"
                                                       value={Phone(OrderData.recv_phone)}
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
                                                           placeholder="배송요청사항"
                                                />
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>
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
                    <GoOrderForm/>
                </ScrollView>
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
        const [Search, setSearch]     = useState(``);
        const [Show, setShow]         = useState(false);    // 검색창 노출 여부


        let find = DeliList.filter(text=>(text.gmd_address.includes(Search) && text));

        const goSearch = (gmd_zonecode, gmd_address, gmd_address_sub, gmd_title, work_uid) => {

            route.params.zonecode = gmd_zonecode;
            route.params.addr1 = gmd_address;

            setSelected({
                ...Selected,
                zonecode        :gmd_zonecode,
                addr1           :gmd_address,
                order_title     :gmd_title,
                work_uid        :work_uid,
            });

            setOrderDate({
                ...OrderData,
                zonecode        :gmd_zonecode,
                addr1           :gmd_address,
                addr2           :gmd_address_sub,
                order_title     :gmd_title,
                work_uid        :work_uid,
            });

        }

        console.log(Selected);

        return(
            <>
                <Text style={[mb1]}>기존 공사명 검색</Text>
                <View style={[styles.ord_tit_list_search,mb2]}>
                    <View style={[styles.select_box]}>
                        <TouchableOpacity onPress={()=>{setShow(!Show)}}>
                            <View style={[styles.border]}>
                                {/**---------------------------선택주소 노출--------------------------------**/}
                                <Text style={[]}>
                                    {(Selected.order_title) ? Selected.order_title:'최근 공사명을 선택해주세요.'}
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
                                       onChangeText={(word)=>setSearch(word)}
                                       editable={(modAddr === 'add')}
                                       value={Search}
                            />

                            <ScrollView style={[{height:160}]} nestedScrollEnabled={true}>
                                <View style={[styles.ord_tit_list]}>
                                    {/**---------------------------반복문 구간--------------------------------**/}
                                    {find.map(val=> {
                                        return (
                                            <>
                                                <View style={[styles.Recent_search_list_item]}>
                                                    <View style={flex_between}>
                                                        <View>
                                                            <TouchableOpacity onPress={() => goSearch(val.gmd_zonecode, val.gmd_address, val.gmd_address_sub, val.gmd_title, val.work_uid)}>
                                                                <Text style={[h14, styles.txt_color2]}>
                                                                    {val.gmd_title}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                            <View style={[flex, justify_content_end]}>
                                                                <Text style={[h14, text_gray]}>
                                                                    {DateChg(Date(val.gmd_regdate))}
                                                                </Text>
                                                                <TouchableOpacity style={ms2}
                                                                                  onPress={() => delDeli(val.gmd_sno)}>
                                                                    <Text style={[h14, styles.txt_color]}>X</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    )}
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
    /**-----------------------------------------------총금액------------------------------------------------------**/
    function OrderTotalPrice() {

        let total_cnt_arr   = order_uid.map(cate=>cate.A_sel_option.map(val=>Number(val.option_cnt)));
        let total_cnt       = total_cnt_arr.reduce((val,idx)=>{
            return val.concat(idx);
        });
        let goods_total_cnt = 0;
        for (let i = 0; i < total_cnt_arr.length; i++) {
            goods_total_cnt   += total_cnt[i];
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
                                    <Text style={[h16, text_primary]}>{Price(OrderData.settleprice)}원</Text>
                                </View>
                                {/*총 결제금액*/}
                            </View>
                        </View>
                    </View>
                </View>
            </>
        );
    }
    /**-----------------------------------------------발주신청------------------------------------------------------**/
    function GoOrderForm() {

        /**---------------------------------발주하기---------------------------------------------------**/
        const goForm = () => {
            /**-------------------------1. 입력창 체크 루틴-----------------------------**/
            let order_data = OrderData;
            console.log(order_data);

            /**1. ------공사명 ----**/
            if(!order_data.order_title) {
                Alert.alert('','공사명이 없습니다.');
                return InputFocus.current[0].focus();
            }
            /**2. ------우편번호 ----**/
            if(!order_data.zonecode) {
                Alert.alert('','우편번호를 입력하세요.');

                return InputFocus.current[1].focus();;
            }
            /**3. ------주소를 입력하세요 ----**/
            if(!order_data.addr1) {
                Alert.alert('','주소를 입력하세요');

                return  InputFocus.current[2].focus();;
            }
            /**4. ------주소를 입력하세요 ----**/
            if(!order_data.addr2) {
                Alert.alert('','주소를 입력하세요');

                return InputFocus.current[3].focus();;
            }
            /**5. ------희망배송일 ----**/
            if(!order_data.hope_deli_date) {
                Alert.alert('','희망배송일을 선택해주세요.');
                return InputFocus.current[3].focus();;
            }

            /**6. ------희망배송 시간을 선택 ----**/
            if(!order_data.hope_deli_time) {
                Alert.alert('','희망배송시간을 선택해주세요.');
                return InputFocus.current[3].focus();;
            }
            /**7. ------현장인도자 명 선택 ----**/
            if(!order_data.recv_name) {
                Alert.alert('','현장인도자 이름을 입력해주세요.');
                return InputFocus.current[4].focus();;
            }
            /**8. ------현장인도자 연락처를 입력해주세요. ----**/
            if(!order_data.recv_phone) {
                Alert.alert('','현장인도자 연락처를 입력해주세요.');
                return InputFocus.current[5].focus();;
            }


            /**-------------------------2. 최종입력창--------------------------------**/
            Alert.alert('','발주하시겠습니까?',[
                // left
                {text:'취소',
                    style: 'destructive',
                    onPress:()=>{}
                },
                // right
                {text:'확인',
                    onPress:()=>{goOrder(order_data);}
                },
            ])
        }

        const goOrder = (order_data) => {

            let msg = '발주신청이 완료되었습니다.';
            msg += '\n 발주자 성명 :'    +order_data.recv_name;
            msg += '\n 공사명 :'    +order_data.order_title;
            msg += '\n 발주자 전화번호 :' +order_data.recv_phone;
            msg += '\n 우편번호 : '      +order_data.zonecode;
            msg += '\n 주소 : '         +order_data.addr1;
            msg += '\n 상세주소 : '      +order_data.addr2;
            msg += '\n 희망배송일 : '     +order_data.hope_deli_date;
            msg += '\n 희망배송시간 : '   +order_data.hope_deli_time;
            msg += '\n 배송메모 : '       +order_data.order_memo;
            msg += '\n 결제금액 : '      +order_data.settleprice;
            msg += '\n 자재금액 : '      +order_data.tot_order_price;
            msg += '\n 공사명_uid : '      +order_data.work_uid;


            /**-------------------------------배송지 저장-----------------------------------------**/
            SaveDeliAddr(Member, order_data).then((res)=>{
                if(res) {
                    const {result, work_uid} = res.data;
                    if(result === 'OK') {
                        InsOrder(order_data, Member, work_uid, goods_cate1_uid).then((res)=>{
                            if(res) {
                                const {result} = res.data;
                                if(result === 'OK') {
                                    Alert.alert('',msg,[{
                                        text:'확인',
                                        onPress:()=>{navigation.replace('발주상태')}
                                    }]);
                                } else {
                                    Alert.alert('','에러');
                                }
                            }
                        });
                    } else {
                        InsOrder(order_data, Member, work_uid, goods_cate1_uid).then((res)=>{
                            if(res) {
                                const {result} = res.data;
                                if(result === 'OK') {
                                    Alert.alert('',msg,[{
                                        text:'확인',
                                        onPress:()=>{navigation.replace('발주상태')}
                                    }]);
                                } else {
                                    Alert.alert('','에러');
                                }
                            }
                        });
                    }
                }
            });
        }

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
                    <TouchableOpacity onPress={goForm}>
                        <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                            <Text style={[text_light]}>관리자확인 후 결제가 가능합니다.</Text>
                        </View>
                        <Text style={[{textAlign: "center", color: "#fff", fontSize: 18,}]}>
                            발주요청
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }


}

const styles = StyleSheet.create({
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
    select_opt_list_box:{
        paddingHorizontal:10,
        paddingVertical:12,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
    },
    select_opt_list_itmes:{
        borderBottomWidth:1,
        paddingVertical:10,
        borderColor:"#eee",

    },
});