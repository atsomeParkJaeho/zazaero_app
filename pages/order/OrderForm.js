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
    mb1, flex_between_bottom, flex_end, fw500, justify_content_end, h13, textarea, pe1, me2, text_primary, wt3, wt7
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
import {AddrMatch, Phone, Price, Time, Time1, Time2, cancel_List, cancel_d_List} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import goodsthum1 from "../../assets/img/goods_thum1.jpg";
// import SelectBox from "react-native-multi-selectbox";




export default function OrderForm({route,navigation}) {

    console.log('확인1 / ',route.params.order_uid);
    // 유효성 검사
    const {order_uid, zonecode, addr1} = route.params;

    // 카트 정보
    let Cart = order_uid.map(key=>key.map(val=>val.order_uid));
    let temp = Cart.reduce((val,idx)=>{
        return val.concat(idx);
    });
    console.log(temp,' / 배열 2');
    console.log(Cart,' / 배열 ');

    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    const ChkFocus = useRef([]);
    const Update   = useIsFocused();
    console.log('전달 2값 / ',Member);
    console.log('우편번호 / ',zonecode);
    console.log('일반주소 / ',addr1);

    // 1-1 나의 장바구니 리스트 출력
    /**---------------------결제 합계-----------------**/
    let goodsprice = 0;
    let price = order_uid.map((key)=>key.map(val=>val.sum_order_price));
    let total = price.reduce((val,idx)=>{
        return val.concat(idx);
    });
    for (let i = 0; i < total.length; i++) {
        goodsprice += total[i];
    }
    console.log(total.length,'/ 합계수');
    console.log(total,'/ 금액');
    console.log(goodsprice,'/ 금액');
    /**-----------------------결제금액---------------**/

    /**---------------------자재 수량 합계-----------------**/
    let goods_cnt = 0;
    let items_cnt = order_uid.map((key)=>key.map(val=>val.order_item_cnt));
    let item      = items_cnt.reduce((val,idx)=>{
        return val.concat(idx);
    });
    for (let i = 0; i < item.length; i++) {
        goods_cnt += item[i];
    }
    console.log(items_cnt,'/ 아이템 배열');
    console.log(goods_cnt,'/ 합계수량');

    /**-----------------------결제금액---------------**/


        // 1. 주문정보 상태 설정
        // const [CartList, setCartList] = useState([]);
    const [modAddr,       setmodAddr]              = useState('add');  // 최근배송지, 신규배송지 상태정의
    const [OrderTitle,    setOrderTitle]           = useState([]);    // 최근배송지 가져오기
    const [Selected,      setSelected]             = useState([]);    // 최근배송지 가져오기
    const [Select,        setSelect]               = useState([]);
    const [OrderData, setOrderDate]                = useState({
        act_type                    :"ins_order",           // 주문추가하기 로직
        order_uid                   :order_uid,             // 주문번호
        login_status                :"Y",
        A_order_uid                 :temp,
        mgr_mem_uid                 :Member,
        mem_uid                     :Member,                // 회원 uid
        order_mem_name              :'',                    // 주문자명  / 담당자명
        order_mem_mobile            :'',                    // 주문자 휴대전화번호
        recv_name                   :'',                    // 현장인도자
        recv_phone                  :'',                    // 현장인도자 전화번호
        recv_mobile                 :'',                    // 현장인도자 핸드폰번호
        com_name                    :'',                    // 회사명
        ceo_name                    :'',                    // 대표자명
        biz_no                      :'',                    // 사업자번호
        order_title                 :'',                    //  공사명
        hope_deli_date              :'',                    // 희망배송일
        hope_deli_time              :'',                    // 희망배송시간
        zonecode                    :zonecode,              // 배송지 우편번호
        addr1                       :addr1,                 // 배송지 주소1
        addr2                       :'',                    // 배송지 주소2 상세주소
        deli_price                  :'',                    // 배송비
        deli_mem_name               :'',                    // 배송자명
        deli_mem_mobile             :'',                    // 배송자 전화번호
        make_price                  :'',                    // 제작비
        hope_opt_price              :'',                    // 옵션요청비
        tot_order_price             :goodsprice,            // 상품합계
        settleprice                 :goodsprice,            // 상품합계

    });
    const [Hope, setHope]           = useState({
        hopeDate    :'',
        hopeTime    :'',
    });
    // 희망배송일시 설정,

    /**=============================상태 출력==========================**/
    useEffect(()=>{

        /**=========================3. 다음api로 가져온 정보 에러 방지용==========================**/
        // 주소입력시 업데이트
        setOrderDate({
            ...OrderData,
            mem_uid         :Member,
            mgr_mem_uid     :Member,
            zonecode        :zonecode,
            addr1           :addr1,
        });

    },[Update]);

    // console.log(CartList,'/ 장바구니 상품');

    // 2. 주문정보 입력상태 설정
    const goInput = (keyValue, e) => {

        if(keyValue === 'addr1') {
            setOrderDate({
                ...OrderData,
                addr1:e,
            });
        }

        if(keyValue === 'zonecode') {
            setOrderDate({
                ...OrderData,
                zonecode:e,
            });
        }

        setOrderDate({
            ...OrderData,
            mem_uid         :Member,
            mgr_mem_uid     :Member,
            [keyValue]:e,
        });


    }



    /**=============================이벤트 액션 구간=============================**/

        // 6. 발주신청
    const goForm = () => {
            console.log('주문');

            if(OrderData.order_title === '') {
                Alert.alert('','공사명을 입력해주세요');
                ChkFocus.current[0].focus();
                return;
            }
            if(OrderData.zonecode === '') {
                Alert.alert('','우편번호를 입력해주세요');
                ChkFocus.current[1].focus();
                return;
            }
            if(OrderData.addr1 === '') {
                Alert.alert('','주소를 입력해주세요.');
                ChkFocus.current[2].focus();
                return;
            }
            if(OrderData.addr2 === '') {
                Alert.alert('','상세주소를 입력해주세요.');
                ChkFocus.current[3].focus();
                return;
            }
            if(OrderData.hope_deli_date === '') {
                Alert.alert('','희망배송일을 선택해주세요.');
                ChkFocus.current[4].focus();
                return;
            }

            if(OrderData.hope_deli_time === '') {
                Alert.alert('','희망배송시간을 입력해주세요.');
                ChkFocus.current[5].focus();
                return;
            }
            if(OrderData.recv_phone === '') {
                Alert.alert('','현장인도자 연락처를 입력해주세요.');
                ChkFocus.current[6].focus();
                return;
            }

            Alert.alert(
                '',
                '주문하시겠습니까?',
                [
                    {text: '취소', onPress: () => {}, style: 'destructive'},
                    {
                        text: '확인 ',
                        onPress: () => {


                            /**---------------------------------------------------------------------------**/
                            /**---------------------------------------------------------------------------**/
                            axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',OrderData,{
                                headers: {
                                    'Content-type': 'multipart/form-data'
                                }
                            }).then((res)=>{
                                if(res) {
                                    const {result, order_no} = res.data;
                                    console.log(result);
                                    if(result === 'OK') {
                                        console.log(order_no);
                                        let msg = `주문이 완료되었습니다. \n 주문번호 : ${order_no}`;
                                        return Alert.alert('',msg,[{
                                            text:"확인",
                                            onPress:()=>{
                                                navigation.replace('발주내역');
                                            }
                                        }]);
                                    } else {
                                        console.log('실패');
                                        return;
                                    }
                                } else {

                                }
                            });
                            /**---------------------------------------------------------------------------**/
                        },
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => {},
                },
            );

        }

    console.log('주문정보2     / ',OrderData);

    const [CanceDlList, setOrderList] = useState(cancel_d_List);     // 발주내역 출력

    return (
        <>
            <KeyboardAvoidingView style={styles.avoidingView} behavior={Platform.select({ios: 'padding'})}>

                <ScrollView style={[bg_white,]}>
                    <View style={{paddingBottom:110,}}>
                        {/*==============신규배송지 입력==============*/}
                        <View style={[FormStyle.FormGroup]}>
                            {/*==============제목==============*/}
                            <View>
                                {/*체크박스*/}
                                <Text style={[FormStyle.FormTitle]}>배송지 입력</Text>
                            </View>
                            {/*==============배송지 입력==============*/}
                            <View>
                                {/*===========공사명================*/}
                                <View style={[FormStyle.FormGroupItems]}>
                                    {/*공사명*/}
                                    <View style={[flex,pb2]}>
                                        {/*============신규공사========*/}
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
                                        {/*===========기존공사===============*/}
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
                                </View>
                                {/*==============공사명===============*/}
                                <View style={[FormStyle.FormGroupItems]}>
                                    <Text style={[FormStyle.FormLabel]}>공사명</Text>
                                    <TextInput style={[input,{flex:1}]}
                                               placeholder="공사명"
                                               value={OrderData.order_title}
                                               onChangeText={(order_title)=>goInput("order_title",order_title)}
                                               ref={value => (ChkFocus.current[0] = value)}
                                               onSubmitEditing={()=>ChkFocus.current[1].focus()}
                                               returnKeyType="next"
                                               blurOnSubmit={false}
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
                                                   ref={value => (ChkFocus.current[0] = value)}
                                                   onSubmitEditing={()=>ChkFocus.current[1].focus()}
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
                                               ref={value => (ChkFocus.current[2] = value)}
                                               onSubmitEditing={()=>ChkFocus.current[3].focus()}
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
                                               ref={value => (ChkFocus.current[3] = value)}
                                        // onSubmitEditing={()=>ChkFocus.current[4].focus()}
                                               returnKeyType="done"
                                    />
                                </View>
                                {/*다음 api 주소 팝업*/}
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
                            <View style={[FormStyle.FormGroup, {paddingTop:5, paddingBottom: 5,}]}>
                                <CalendarStrip
                                    scrollable
                                    onDateSelected={(Date)=> {
                                        setHope({
                                            ...Hope,
                                            hopeDate: String(Date.format('M' + '월' + 'D' + '일')),
                                        });
                                        setOrderDate({
                                            ...OrderData,
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
                                    {OrderData.hope_deli_time}
                                </Text>
                            </View>
                            {/*==============시간입력==============*/}
                            <View style={[FormStyle.FormGroup]}>
                                <View style={[d_flex, align_items_center]}>
                                    <View style={[styles.formSelect,{flex:0.3, marginRight:10,}]}>
                                        <RNPickerSelect
                                            placeholder={{label:"오전,오후", value:null}}
                                            onValueChange={(hope_deli_time) => goInput('hope_deli_time',hope_deli_time)}
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
                        {/*==============현장인도자 연락처==============*/}
                        <View style={[FormStyle.FormGroup]}>
                            {/*==============현장인도자 성명==============*/}
                            <View style={[FormStyle.FormGroupItems]}>
                                <View>
                                    <Text style={[FormStyle.FormLabel]}>현장인도자 성명</Text>
                                    <TextInput style={[input,{flex:1}]}
                                               onChangeText={(recv_name)=>goInput("recv_name",recv_name)}
                                               placeholder="예 ) 홍길동"
                                               value={Phone(OrderData.recv_name)}
                                               ref={value => (ChkFocus.current[5] = value)}
                                    />
                                </View>
                            </View>
                            {/*==============현장인도자 연락처==============*/}
                            <View style={[FormStyle.FormGroupItems]}>
                                <View>
                                    <Text style={[FormStyle.FormLabel]}>현장인도자 연락처</Text>
                                    <TextInput style={[input,{flex:1}]}
                                               onChangeText={(recv_phone)=>goInput("recv_phone",recv_phone)}
                                               placeholder="예 ) 010-XXXX-XXXX"
                                               maxLength={13}
                                               value={Phone(OrderData.recv_phone)}
                                               ref={value => (ChkFocus.current[5] = value)}
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
                                                   onChangeText={(order_memo)=>goInput("order_memo",order_memo)}
                                                   placeholder="배송요청사항"
                                                   onPressIn={()=>ChkFocus.current[6].focus()}
                                                   ref={value => (ChkFocus.current[6] = value)}
                                                   value={OrderData.order_memo}/>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        {/*--------------------------------상품목록--------------------------------*/}
                        <View style={[styles.goodsList]}>
                            <View style={[styles.goodsList_title]}>
                                <View style={[container, {borderBottomWidth: 2}]}>
                                    <Text style={[h18]}>자재목록</Text>
                                </View>
                                <View style={[styles.goodsListMap]}>
                                    {CanceDlList.map((val, i) => (
                                        <>
                                            <View style={[styles.CancelDetail_list_items]} key={i}>
                                                <View style={[container]}>
                                                    <View style={[flex]}>
                                                        <View style={[wt3]}>
                                                            <Text style={[h14, ]}>상품명 : </Text>
                                                        </View>
                                                        <View style={[wt7]}>
                                                            <Text style={[h14, ]}>{val.title}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={[flex]}>
                                                        <View style={[wt3]}>
                                                            <Text style={[h14, ]}>단가 : </Text>
                                                        </View>
                                                        <View style={[wt7]}>
                                                            <Text style={[h14, ]}>{val.price} 원</Text>
                                                        </View>
                                                    </View>
                                                    <View style={[flex]}>
                                                        <View style={[wt3]}>
                                                            <Text style={[h14, ]}>수량 : </Text>
                                                        </View>
                                                        <View style={[wt7]}>
                                                            <Text style={[h14]}>{val.count} 개</Text>
                                                        </View>
                                                    </View>
                                                    <View style={[flex]}>
                                                        <View style={[wt3]}>
                                                            <Text style={[h14, ]}>총금액 : </Text>
                                                        </View>
                                                        <View style={[wt7]}>
                                                            <Text style={[h16]}> {val.total_price} 원</Text>
                                                        </View>
                                                    </View>

                                                </View>
                                            </View>
                                        </>
                                    ))}
                                </View>
                                <View style={gray_bar}/>

                                <View style="">
                                    <View style={container}>
                                        <Text style={[h18]}>발주 금액</Text>
                                    </View>
                                    <View style={[container, bg_light]}>
                                        <View style={[d_flex, justify_content_end, pe1]}>
                                            <View style="">
                                                
                                                <View style={[flex, justify_content_end, mb1]}>
                                                    <Text style={[h14, styles.color1, me2]}>총 자재 수량</Text>
                                                    <Text style={[h14]}>55개 </Text>
                                                </View>
                                                {/*자재 가격*/}
                                               

                                                <View style={[flex, justify_content_end]}>
                                                    <Text style={[h14, styles.color1, me2]}>총 자재 가격</Text>
                                                    <Text style={[h16, text_primary]}>1,300,000 원</Text>
                                                </View>
                                                {/*총 결제금액*/}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/*결제정보*/}

                                <View style={[padding_bottom]}/>
                            </View>
                            {/*취소상세*/}
                        </View>
                        {/*--------------------------------총 금액--------------------------------*/}
                        <View>
                            <Text>{Price(goodsprice)}원</Text>
                        </View>
                    </View>
                </ScrollView>
                {/*============배송정보 입력시 활성화=============*/}

                <View style={[bg_gray, {paddingTop:6, paddingBottom:38, position:"absolute", left:0, bottom:0, width:"100%"}]}>
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
}
const styles = StyleSheet.create({

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
});