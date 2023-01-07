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
    bg_light, pb2, pos_center
} from '../../common/style/AtStyle';
import {sub_page, gary_bar} from '../../common/style/SubStyle';
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
import {AddrMatch, Phone, Time, Time1, Time2} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";




export default function OrderForm({route,navigation}) {

    console.log('확인1 / ',route.params);
    // 유효성 검사

    const {order_uid, zonecode, addr1} = route.params;
    const ChkFocus = useRef([]);
    const [Member, setMember] = useState();
    const Update = useIsFocused();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });

    console.log('전달 2값 / ',Member);


    // 1-1 나의 장바구니 리스트 출력
    const [CartList, setCartList] = useState([]);
    
    // 1. 주문정보 상태 설정
    const [OrderData, setOrderDate] = useState({
        order_uid                   :order_uid,             // 주문번호
        mgr_mem_uid                 :Member,
        mem_uid                     :Member,                // 회원 uid
        order_mem_name              :'',                    // 주문자명
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
    });
    const [Hope, setHope]                   = useState({
        hopeDate    :'',
        hopeTime    :'',
    });
    // 희망배송일시 설정,
    const [modAddr,       setmodAddr]             = useState('add');  // 최근배송지, 신규배송지 상태정의
    const [DatePicker,    setDatePicker]          = useState(false);
    

    useEffect(()=>{
        console.log('확인 / ',order_uid);
        // 나의 장바구니 정보 출력
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
            act_type            : "get_order_ready",
            login_status        : "Y",
            mem_uid             : Member,
            A_order_uid         : {order_uid},
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            console.log('확인 / ',order_uid);
           if(res) {
               // console.log('확인 / ',res);
               const {result, A_order} = res.data;
               if(result === 'OK') {
                   console.log('나의 장바구니 확인/ ',A_order);
                   setCartList(A_order);
               } else {
                   console.log('실패');
               }
           }
        }).catch(err=>console.log("에러코드 / ",err));

        // 주소입력시 업데이트
        setOrderDate({
            ...OrderData,
            mem_uid         :Member,
            mgr_mem_uid     :Member,
            zonecode        :zonecode,
            addr1           :addr1,
        });


    },[Update,Member]);

    console.log('장바구니 / ',CartList);

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
            [keyValue]:e,
        });
    }


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
            ChkFocus.current[4].focus();
            return;
        }
        if(OrderData.recv_phone === '') {
            Alert.alert('','현장인도자 연락처를 입력해주세요.');
            ChkFocus.current[5].focus();
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
                        axios.post('http://49.50.162.86:80/ajax/UTIL_order_react.php',{
                            act_type            : 'save_gd_order',
                            goods_uid           : uid,           // 상품 uid
                            mem_uid             : Member,                    // 회원 uid
                            ord_cnt             :  '1'
                        },{
                            headers: {
                                'Content-type': 'multipart/form-data'
                            }
                        }).then((res)=>{
                            if(res) {
                                const {result, order_uid} = res.data;
                                console.log(result);
                                if(result === 'OK') {
                                    console.log(order_uid);
                                } else {
                                    console.log('실패');
                                    return;
                                }
                            } else {

                            }
                        })

                        Alert.alert('','장바구니에 추가하였습니다.');
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

    console.log('주문정보 / ',OrderData);
    console.log(modAddr);

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
                                {/*공사명*/}
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
                                    <Text style={[FormStyle.FormLabel]}>공사명</Text>
                                    <TextInput style={[input]}
                                               onChangeText={(order_title)=>goInput("order_title",order_title)}
                                               placeholder="ex)공사명 입력"
                                               value={OrderData.order_title}
                                               ref={value => (ChkFocus.current[0] = value)}
                                               onSubmitEditing={()=>navigation.navigate('주소검색',{page:"배송정보등록", order_uid:order_uid})}
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
                                                   ref={value => (ChkFocus.current[1] = value)}
                                                   onSubmitEditing={()=>ChkFocus.current[2].focus()}
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
                                               onSubmitEditing={()=>ChkFocus.current[4].focus()}
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
                        <View style={[FormStyle.FormGroup]}>
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

});