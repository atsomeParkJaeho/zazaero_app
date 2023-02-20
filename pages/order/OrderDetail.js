import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Button, Alert, CheckBox, Text, TextInput, View, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Switch, KeyboardAvoidingView,} from 'react-native';
// 공통 CSS 추가
import {container, bg_white, h16, text_center, flex_around, flex_between, input, ms2, flex, mt1,
    fw500,
    d_flex,
    align_items_center,
    bg_primary,
    text_light,
    justify_content_center,
    bg_gray,
    text_primary,
    countinput,
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
    btn_danger, btn_primary, textarea, justify_content_around,
} from '../../common/style/AtStyle';
import {sub_page, gray_bar} from '../../common/style/SubStyle';
import {FormStyle} from "./FormStyle";
import {DateChg, ordStatus, payStatus, Phone, Price, Time1, Time2} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";
import CalendarStrip from "react-native-calendar-strip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import Checkbox from "expo-checkbox";
import {AllgdOrderDel, ATorderDel, getAppInfo, getOrderInfo, OrderMod, payDoneCancel, PayTry,} from "./UTIL_order";


export default function OrderDtail({route,navigation}) {


    /**------------페이지 파라미터-----------**/
    const {gd_order_uid, imp_log, addr1, zonecode} = route.params;
    /**--------------------------------------필수 정보사항--------------------------------------------------**/
    const [Member, setMember]          = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    const InputFocus = useRef([]);
    /**-----------------------------------------수정 상태 설정-------------------------------------------------------**/
    const [Mod, setMod] = useState(false);          // 발주상태시 수정 변경가능
    const [Cancel, setCancel] = useState(false);    // 결제취소 가능 설정
    const [expended, setExpended] = useState(false);
    const [PopData, setPopupData] = useState({
        goods_uid   :'',
        order_uid   :'',
        option_cnt  :'',
    });
    /**--------------------------------------상태값 셋팅--------------------------------------------------**/
    const [OrderGoodsList,  setOrderGoodsList]              = useState([]);             // 주문상품상태정의
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
    /**------------------------------------------------------카드결제완료시 db 로그 전송.----------------------------------------------**/


    /*수정완료 클릭시 변경사항 저장*/
    const FormMod = () => {
        /**-------------------------발주서 정보 변경시------------------------------**/
        OrderMod(OrderData, Member, addr1, zonecode, gd_order_uid).then((res)=>{
            if(res) {
                const {result} = res.data;
                if(result === 'OK') {
                    setMod(!Mod);
                } else {

                }
            }
        });

        /**-------------------------------------------------------**/
        let order_item = OrderGoodsList.map(cate=>cate.A_sel_option.map(val=>{
            return {
                order_item_uid  :Number(val.order_item_uid),
                cnt             :Number(val.option_cnt),
            }
        }));

        let temp = order_item.reduce((val,idx)=>{
            return val.concat(idx);
        });

        temp.map(val=>
            axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php',{
                act_type             :"chg_order_item_cnt",
                order_item_uid       :Number(val.order_item_uid),
                cnt                  :Number(val.cnt),
            },{
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }).then((res)=>{
                const {result} = res.data;
                if(result === 'OK') {
                    console.log('저장완료2');
                } else {
                    console.log('에러');
                }
            })
        );
    }


    /**--------------------------------------------------------페이지 진입시 노출---------------------------------------------------**/
    useEffect(() => {
        /**-------------주문상세정보 출력------------**/
        getOrderInfo(gd_order_uid, Member).then(res=>{
            if(res.data.result === 'OK') {
                const {gd_order} = res.data;
                let temp = gd_order.A_order.map(val=>{
                    return {
                        ...val,
                        goods_chk         :false,
                        goods_del         :false,
                    }
                })
                setOrderDate(gd_order);
                setOrderGoodsList(temp);
                navigation.setOptions({title: ordStatus(gd_order.ord_status)+' 상태입니다.'});    // 상태에 따른 타이틀 변경
            }
        });

        getAppInfo().then(res=>{
            if(res.data.result === 'OK') {
                const {app_info} = res.data;
                let temp = app_info.A_pay_bank.map(val=>{
                    return {
                        label:val.name,
                        value:val.key,
                    }
                });
                setBankCode(temp);
            }
        });

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
    const goPay = () => {
        if(PayMement === 'bank') {
            if(OrderData.bankAccount === "0")     { return Alert.alert('','입금계좌를 선택해주세요.')}
            if(!OrderData.bankSender)             { return Alert.alert('','예금주명을 입력해주세요.')}
        }

        Alert.alert('','결제하시겠습니까?',
            [
                {text:'취소', onPress:()=>{},},
                {text:'확인', onPress:()=>{donePay();},},
            ]
        );
    }

    const donePay = () => {
        let msg = '결제가 완료되었습니다.';
        let N_btn = {text:"확인", onPress:()=>{navigation.replace('배송상태')}};
        PayTry(OrderData, PayMement).then((res)=>{
            if(res) {
                const {result} = res.data;
                if(result === 'OK') {

                    if(PayMement === 'bank') {
                        Alert.alert('',msg,[N_btn]);
                    } else {
                        navigation.navigate('카드결제',{OrderData:OrderData});
                    }

                }
            }
        });

    }

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
            let cnt     = Number(value);
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
        }
    }


    const CancelCnt = (goods_uid, type, max) => {
        if(type === 'plus') {
            let temp = OrderGoodsList.map((cate)=>{
                if(cate.goods_uid === goods_uid) {
                    if(cate.goods_cancel_cnt >= max) {
                        return {...cate, goods_cancel_cnt:max}
                    } else {
                        return {...cate, goods_cancel_cnt:Number(cate.goods_cancel_cnt) + 1}
                    }
                } else {
                    return cate;
                }
            });
            setOrderGoodsList(temp);
        }

        if(type === 'minus') {
            let temp = OrderGoodsList.map((cate)=>{
                if(cate.goods_uid === goods_uid) {
                    return {...cate, goods_cancel_cnt:(cate.goods_cancel_cnt > 1) ? Number(cate.goods_cancel_cnt) - 1 : 1,}
                } else {
                    return cate;
                }
            });
            setOrderGoodsList(temp);
        }

    }

    // 자재 체크 로직
    const modChk = (goods_uid) => {
        console.log('반응');
        let temp = OrderGoodsList.map((val)=>{
            if(val.goods_uid === goods_uid) {
                return {
                    ...val,
                    goods_chk:!val.goods_chk,
                }
            } else {
                return val;
            }
        });
        console.log(temp);
        setOrderGoodsList(temp);
    }


    const cntPopup = (goods_uid, order_uid, option_cnt) => {
        // 팝업 노출
        setExpended(!expended);
        setPopupData({
            goods_uid   :goods_uid,
            order_uid   :order_uid,
            option_cnt  :option_cnt,
        });

    }


    function Popup({goods_uid,order_uid,option_cnt}) {
        const [cntData, setCntData] = useState({
            goods_uid   :goods_uid,
            order_uid   :order_uid,
            option_cnt  :'',
        });

        const cntCart = (value) => {
            console.log(value);
            setCntData({
                ...cntData,
                option_cnt:value,
            });
        }

        const upDtCart = () => {
            setExpended(!expended);
            let temp = OrderGoodsList.map((cate)=>{
                if(cate.goods_uid === goods_uid) {
                    return {...cate, A_sel_option:cate.A_sel_option.map((val)=>{
                            return {...val, option_cnt:cntData.option_cnt,}
                        })}
                } else {
                    return cate;
                }
            });
            setOrderGoodsList(temp);
        }

        return(
            <>
                <View style={[styles.PopupViewbg]}>
                    <View style={[styles.PopupView]}>

                        <View style={{paddingBottom:20,}}>
                            <Text style={{fontSize:17}}>수량변경</Text>
                        </View>

                        <View style={{paddingBottom:15,}}>
                            <TextInput
                                style={[input]}
                                keyboardType="number-pad"
                                onChangeText={(text)=>cntCart(text)}
                            />
                        </View>

                        <View style={[d_flex, styles.Popupbtn]}>
                            <TouchableOpacity
                                onPress={()=>setExpended(!expended)}
                                style={[btn_danger,styles.PopupViewbtn]}>
                                <View >
                                    <Text style={{textAlign:"center", fontSize:12, color:"#fff"}}>취소</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={upDtCart} style={[btn_primary,styles.PopupViewbtn]}>
                                <View>
                                    <Text style={{textAlign:"center", fontSize:12, color:"#fff"}}>변경</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        );
    }
    return(
        <>
            {/**----------------수량 조절 팝업------------**/}
            {(expended) && (
                <Popup
                    goods_uid={PopData.goods_uid}
                    order_uid={PopData.order_uid}
                    option_cnt={PopData.option_cnt}
                />
            )}
            {/**-------------------------상태상단------------------------**/}
            <ScrollView style={[bg_white]}>
                {/**----------------------------------------------배송지 입력--------------------------------------------------**/}
                <View style={[FormStyle.FormGroup]}>
                    {/**----------------------------------------------공사명--------------------------------------------------**/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <Text style={[FormStyle.FormLabel]}>공사명</Text>
                        <TextInput style={[input,{flex:1}]}
                                   editable={Mod} placeholder="공사명"
                                   value={OrderData.order_title}
                                   onChangeText={(order_title)=>goInput("order_title",order_title)}
                                   ref={el => (InputFocus.current[0] = el)}
                        />
                    </View>
                    {/**----------------------------------------------배송지주소 입력--------------------------------------------------**/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <Text style={[FormStyle.FormLabel]}>배송지</Text>
                        <View style={[d_flex,align_items_center]}>
                            {/*우편번호*/}
                            <TextInput style={[input,{flex:1},bg_light]}
                                       editable={false}
                                       placeholder="우편번호"
                                       value={(zonecode) ? (zonecode):(OrderData.zonecode)}
                                       onChangeText={(zonecode)=>goInput("zonecode",zonecode)}
                                       returnKeyType="next"
                                       blurOnSubmit={false}
                                       ref={el => (InputFocus.current[1] = el)}
                            />
                            {/*주소찾기*/}
                            {(Mod) && (
                                <>
                                    <TouchableOpacity onPress={()=>navigation.navigate('주소검색',{page:"발주상세", gd_order_uid:gd_order_uid})}>
                                        <View style={[bg_primary,{padding:8,borderRadius:5, marginLeft:16,}]}>
                                            <Text style={[text_light]}>주소찾기</Text>
                                        </View>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                    {/**----------------------------------------------주소입력--------------------------------------------------**/}
                    <View style={{paddingBottom:15,}}>
                        <TextInput
                            style={[input,{flex:1},bg_light]}
                            editable={false}
                            placeholder="주소"
                            value={(addr1) ? (addr1):(OrderData.addr1)}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            ref={el => (InputFocus.current[2] = el)}
                        />
                    </View>
                    {/**----------------------------------------------상세주소--------------------------------------------------**/}
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
                <View>
                    {/**----------------------------------------------희망배송일 선택--------------------------------------------------**/}
                    <View style={[d_flex, align_items_center, FormStyle.FormDate, {justifyContent: "space-between"}]}>
                        {/*체크박스*/}
                        <Text style={[FormStyle.FormDateLabel]}>희망배송일</Text>
                        <Text style={[FormStyle.FormDateLabel]}>
                            {(OrderData.hope_deli_date) && DateChg(OrderData.hope_deli_date)}
                        </Text>
                    </View>
                    {/**----------------------------------------------캘린더--------------------------------------------------**/}
                    {(Mod) && (
                        <>
                            <View style={[FormStyle.FormGroup, {paddingTop: 5, paddingBottom: 5,}]}>
                                <CalendarStrip
                                    // scrollable={true}
                                    onDateSelected={(Date) => {
                                        setOrderDate({
                                            ...OrderData,
                                            hope_deli_date: String(Date.format('YYYY-MM-DD')),
                                        });
                                    }
                                    }
                                    startingDate={`${OrderData.hope_deli_date}`}
                                    minDate={`${Date}`}
                                    maxDate={`2024-12-31`}
                                    style={{height: 150, paddingTop: 20, paddingBottom: 10}}
                                    daySelectionAnimation={{type: "background", highlightColor: "#3D40E0",}}
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
                </View>
                {/**----------------------------------------------희망배송시간 선택--------------------------------------------------**/}
                <View>
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
                                            onValueChange={(hope_deli_time) => goInput(`hope_deli_time`,hope_deli_time)}
                                            items={Time2}
                                            value={OrderData.hope_deli_time}
                                            useNativeAndroidPickerStyle={false}
                                            fixAndroidTouchableBug={true}
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
                                           keyboardType="number-pad"
                                           editable={Mod}
                                           onChangeText={(recv_mobile)=>goInput("recv_mobile",recv_mobile)}
                                           placeholder="예 ) 010-XXXX-XXXX"
                                           maxLength={13}
                                           value={Phone(OrderData.recv_mobile)}
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
                <GoodsList/>
                {/**----------------------------------------------결제전 발주취소 이벤트--------------------------------------------------**/}
                <PayReadyCancelTab/>
                {/**----------------------------------------------결제완료후 발주취소 이벤트--------------------------------------------------**/}
                <PayDoneCancelTab/>
                <OrderTotalPrice/>
                {/**-----------------------------------------결제대기시 노출 시킨다.--------------------------------------------**/}
                {(OrderData.ord_status === 'pay_ready' || OrderData.ord_status === 'pay_try' || OrderData.ord_status === 'pay_err') && (
                    <>
                        {(OrderData.settlekind === 'bank') ? (
                            <>

                            </>
                        ):(
                            <>
                                <View style={[styles.payView]}>
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
                                    {/**--------------------------무통장 입금시 출력------------------------------------------------**/}
                                    {(PayMement === 'bank') && (
                                        <>
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
                                                    <TextInput style={[input,{width:"100%"}]} placeholder="예금주명" value={OrderData.bankSender}
                                                               onChangeText={(bankSender)=>goInput('bankSender',bankSender)}
                                                    />
                                                </View>
                                            </View>
                                            <View style={[flex_around]}>
                                                <TouchableOpacity style={styles.payMement} onPress={goPay}>
                                                    <Text style={[styles.btn, text_center, btn_outline_primary]}>결제하기</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    )}
                                    {/**--------------------------카드결제시 출력------------------------------------------------**/}
                                    {(PayMement === 'card') && (
                                        <>
                                            <View style={[flex_around]}>
                                                <TouchableOpacity style={styles.payMement} onPress={goPay}>
                                                    <Text style={[styles.btn, text_center, btn_outline_primary]}>결제하기</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    )}
                                </View>
                            </>
                        )}
                    </>
                )}
            </ScrollView>
            {/**-------------------------수정변경------------------------**/}
            <GoOrderForm/>
        </>
    );
    /**-----------------------------------------------결제완료전 발주취소 이벤트------------------------------------------------**/
    function PayReadyCancelTab() {

        const AlldelOrder = () => {
            Alert.alert('','전체취소 하시겠습니까?',[
                {text:"취소", onPress:()=>{}},
                {text:"확인", onPress:()=>{temp();}}
            ]);
            let temp = () => {
                AllgdOrderDel(OrderData, Member).then((res)=>{
                    if(res) {
                        const {result} = res.data;
                        if(result === 'OK') {
                            Alert.alert('','발주가 취소되었습니다.');
                            return navigation.replace('발주상태');
                        }
                    }
                });
            }
        }

        const ChkdelOrder = () => {
            let result = OrderGoodsList.filter(val=>val.goods_chk);
            let order_uid = result.map(val=>val.order_uid);
            if(OrderGoodsList.length === 1) { return Alert.alert('','전체취소를 버튼을 클릭해주세요.') }
            if(OrderGoodsList.length === result.length) { return Alert.alert('','전체취소를 버튼을 클릭해주세요.') }
            if(result.length === 0) { return Alert.alert('','자재를 선택해주세요.') }

            Alert.alert('','선택하신 자재를 취소하시겠습니까?',[
                {text:"취소", onPress:()=>{}},
                {text:"확인", onPress:()=>{temp();}}
            ]);

            let temp = () => {
                ATorderDel(OrderData, Member, order_uid).then((res)=>{
                    const {result} = res.data;
                    if(result === 'OK') {
                        Alert.alert('','자재를 삭제하였습니다.');
                        let temp = OrderGoodsList.map(val=>{
                            if(val.goods_chk === true) {
                                return {...val, goods_del:true}
                            } else {
                                return val;
                            }
                        });
                        let temp2 = temp.filter(val=>val.goods_del === false);
                        setOrderGoodsList(temp2);
                    }
                });
            }
        }


        if(OrderData.ord_status === 'ord_ready' || OrderData.ord_status === 'pay_ready' || OrderData.ord_status === 'pay_err' || OrderData.ord_status === 'pay_try') {
            if(Mod) {
                return (
                    <>
                        <View style={[container]}>
                            <View style={[d_flex, justify_content_between]}>
                                <TouchableOpacity
                                    onPress={ChkdelOrder}
                                    style={[styles.CancelBtnWrap, btn_outline_danger]}>
                                    <Text style={[text_center,styles.CancelBtn, text_danger]}>선택취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={AlldelOrder}
                                    style={[styles.CancelBtnWrap, btn_outline_danger]}>
                                    <Text style={[text_center,styles.CancelBtn, text_danger]}>전체취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                );
            }
        }
    }


    /**-----------------------------------------------결제완료후 발주취소 이벤트------------------------------------------------**/
    function PayDoneCancelTab() {

        const PayDoneCancel = (type) => {

            if(type === 'all') {

                payDoneCancel(Member, type, OrderData).then((res)=>{
                    if(res) {
                        console.log(res.data);
                        const {result} = res.data;
                        if(result === 'OK') {
                            Alert.alert('','결제가 취소되었습니다.');
                            return navigation.replace('배송상태');
                        } else {
                            console.log('에러');
                        }
                    }
                });

            } else {

            }
        }


        if(OrderData.ord_status === 'pay_done' || OrderData.ord_status === 'deli_ready') {
            if(Cancel) {
                return (
                    <>
                        <View style={[container]}>
                            <View style={[d_flex, justify_content_between]}>
                                <TouchableOpacity
                                    onPress={()=>PayDoneCancel(`part`)}
                                    style={[styles.CancelBtnWrap, btn_outline_danger]}>
                                    <Text style={[text_center,styles.CancelBtn, text_danger]}>선택취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>PayDoneCancel(`all`)}
                                    style={[styles.CancelBtnWrap, btn_outline_danger]}>
                                    <Text style={[text_center,styles.CancelBtn, text_danger]}>전체취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                );
            } else {
                return (
                    <>
                        <View style={[container]}>
                            <View style={[d_flex, justify_content_between,mb2]}>
                                <TouchableOpacity
                                    onPress={()=>setCancel(!Cancel)}
                                    style={[styles.CancelBtnWrap, btn_outline_danger,{width:"100%"}]}>
                                    <Text style={[text_center,styles.CancelBtn, text_danger]}>주문취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </>
                );
            }
        }
    }


    /**-----------------------------------------------자재목록--------------------------------------------------**/
    function GoodsList() {

        console.log(OrderGoodsList);

        /*1. 자재별 상품 계산식을 짠다 */
        /*
        *  1) order_uid, order_item_uid, option_cnt, option_price
        *  2) 기존수량은 AT_order_item(cnt) 에서 가져온다
        *  3) 차감수량은 AT_cancel_item(cancel_cnt) option_cnt 에 저장한다.
        *
        * 
        * */
        
        let chk_goods = OrderGoodsList.filter(val=>val.goods_chk);
        let pay_cancel_goods = chk_goods.map(val=>{

            let cancel_cnt          = Number(val.A_sel_option.map(item=>item.option_cnt));
            let option_price        = Number(val.A_sel_option.map(item=>item.option_price));
            let order_item_uid      = Number(val.A_sel_option.map(item=>item.order_item_uid));

            return {
                order_uid           :Number(val.order_uid),
                cancel_cnt          :cancel_cnt,
                option_price        :option_price,
                order_item_uid      :order_item_uid,
                sum_goods_price     :Number(option_price * cancel_cnt),
            }
        });
        
        let cancel_price = Number(OrderData.goodsprice - pay_cancel_goods.sum_goods_price);

        console.log(chk_goods,'/체크한 자재');
        console.log(pay_cancel_goods,'/체크 자재중 취소할 자재');
        console.log(cancel_price,'취소후 변경가격');
        console.log(OrderData.goodsprice,'취소후 변경가격');


        let result = OrderGoodsList.filter(val=>val.goods_del === false);
        /**-----------------------------------------장바구니 상품 수량변경--------------------------------------------------**/
        return(
            <>
                <View style={[container, {borderBottomWidth: 1,borderColor:"#e6e6e6",}]}>
                    <Text style={[h18]}>자재목록</Text>
                </View>
                {/**-----------------자재목록---------------------------------------**/}
                <View>
                    {/**-----------------반복문 구간---------------------------------------**/}
                    {result.map(val=>{
                        if(val.goods_name !== null) {
                            let img_src = val.list_img_url;
                            return(
                                <>
                                    <View style={[styles.CancelDetail_list_items]} >
                                        <View style={[container]}>
                                            <View style={[d_flex, align_items_center, mb1,flex_between]}>
                                                {/*체크박스*/}
                                                {(Mod || Cancel) && (
                                                    <>
                                                        <Checkbox style={styles.chk_view} color={"#4630eb"} value={val.goods_chk} onValueChange={()=>modChk(val.goods_uid)}/>
                                                        <View style={{flex:0.1}}>
                                                            <Checkbox style={styles.all_check} color={"#4630eb"} value={val.goods_chk} onValueChange={()=>modChk(val.goods_uid)}/>
                                                        </View>
                                                    </>
                                                )}
                                                <View style={{flex:1}}>
                                                    {/*상품명*/}
                                                    <Text style={[h14]}>{val.goods_name}</Text>
                                                </View>
                                            </View>
                                            {/**--------------------------------옵션--------------------------------**/}
                                            {val.A_sel_option.map(items=>{
                                                let goods_price     = items.option_price;
                                                let goods_cnt       = items.option_cnt;
                                                let order_item_uid  = items.order_item_uid;
                                                const reqMemo = (key, value, uid) =>{
                                                    let temp = OrderGoodsList.map((cate)=>{
                                                        return {...cate, A_sel_option:cate.A_sel_option.map(val=>{
                                                            if(uid === val.order_item_uid) {
                                                                return {...cate, req_memo:value}
                                                            } else {
                                                                return cate;
                                                            }
                                                            })}
                                                    });
                                                    setOrderGoodsList(temp);
                                                }
                                                return(
                                                    <>
                                                        <View style={[flex_between_bottom]}>
                                                            <View style={[flex_end]}>
                                                                <Image style={[styles.goods_thum]} source={{uri: 'http://www.zazaero.com' + img_src}}/>
                                                                {/**-------------------수량조절---------------**/}
                                                                {(Mod) ? (
                                                                    <>
                                                                        <View style={ms2}>
                                                                            <View style={[d_flex]}>
                                                                                <Text style={[h14,fw500,{paddingBottom:10,}]}>
                                                                                    수량
                                                                                </Text>
                                                                            </View>
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
                                                                                <TouchableOpacity onPress={()=>cntPopup(val.goods_uid, val.order_uid, items.option_cnt)} style={[countinput]}>
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
                                                                    /** -------------------------부분주문취소---------------------**/
                                                                    <>
                                                                        {(Cancel) ? (
                                                                            <View style={ms2}>
                                                                                <Text style={[h14,fw500,{paddingBottom:10,}]}>
                                                                                    기존수량 /  {items.option_cnt}
                                                                                </Text>
                                                                                <View style={[flex]}>
                                                                                    {/*=============마이너스 버튼==========*/}
                                                                                    <TouchableOpacity
                                                                                        onPress={()=>CancelCnt(val.goods_uid,`minus`,items.option_cnt)}
                                                                                    >
                                                                                        <View style={[count_btn]}>
                                                                                            <View style={[pos_center]}>
                                                                                                <Text style={[count_btn_txt]}>－</Text>
                                                                                            </View>
                                                                                        </View>
                                                                                    </TouchableOpacity>
                                                                                    {/*============수량=================*/}
                                                                                    {/**-----상품 uid, 주문 uid 추가----**/}
                                                                                    <View style={[countinput]}>
                                                                                        <Text style={[text_center]}>
                                                                                            {val.goods_cancel_cnt}
                                                                                        </Text>
                                                                                    </View>
                                                                                    {/*=============플러스 버튼============*/}
                                                                                    <TouchableOpacity
                                                                                        onPress={()=>CancelCnt(val.goods_uid,`plus`,items.option_cnt)}
                                                                                    >
                                                                                        <View style={[count_btn]}>
                                                                                            <View style={[pos_center]}>
                                                                                                <Text style={[count_btn_txt]}>＋</Text>
                                                                                            </View>
                                                                                        </View>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        ):(
                                                                            <View style={ms2}>
                                                                                <Text style={[h14,fw500,{paddingBottom:10,}]}>수량</Text>
                                                                                <View style={[flex]}>
                                                                                    <Text style={[text_center]}>
                                                                                        {items.option_cnt} 개
                                                                                    </Text>
                                                                                </View>
                                                                            </View>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </View>
                                                            <View style={justify_content_end}>
                                                                <Text style={[h13]}>( 단가 : {Price(items.option_price)} 원)</Text>
                                                                {/*단가*/}
                                                                <Text style={[h16,text_right]}>{Price(goods_price * goods_cnt)} 원</Text>
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
                                                                        <TextInput
                                                                            onChangeText={(req_memo)=>reqMemo('req_memo',req_memo,order_item_uid)}
                                                                            style={[textarea]}
                                                                            value={`${items.req_memo}`}
                                                                            multiline={true}
                                                                            numberOfLines={4}
                                                                        />
                                                                        {/*<Text style={[h13]}>{items.req_memo}</Text>*/}
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

    /**-----------------------------------------------발주신청------------------------------------------------------**/
    function GoOrderForm() {
        if(OrderData.ord_status === 'ord_ready' || OrderData.ord_status === 'pay_ready' || OrderData.ord_status === 'pay_err' || OrderData.ord_status === 'pay_try') {
            return (
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
                                {/*<TouchableOpacity onPress={()=>setMod(!Mod)}>*/}
                                <TouchableOpacity onPress={FormMod}>
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
                                <TouchableOpacity onPress={()=>setMod(!Mod)}>
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
    }




    /**-----------------------------------------------총금액------------------------------------------------------**/
    function OrderTotalPrice() {
        /**----------------총 결제금액은 자재가격 + 요청옵션비 + 배송비 + 포인트----------------**/
        // 총 결제금액
        let Settlekindprice = 0;
        Settlekindprice += Number(OrderData.goodsprice);
        Settlekindprice += Number(OrderData.deli_price);
        Settlekindprice += Number(OrderData.tot_opt_price);
        return(
            <>
                <View>
                    <View style={container}>
                        <Text style={[h18]}>결제금액</Text>
                        {(OrderData.settlekind === 'bank') && (
                            <>
                                {(OrderData.pay_status === 'ready') && (
                                    <Text style={[text_danger]}>(입금대기)</Text>
                                )}
                            </>
                        )}
                    </View>
                    <View style={[container,bg_light]}>
                        <View style={[d_flex,justify_content_end,pe1]}>
                            <View style="">
                                {/**----------------------발주신청일--------------------------**/}
                                {(OrderData.order_date) && (
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>발주신청일</Text>
                                        <Text style={[h14]}>{DateChg(OrderData.order_date)} {OrderData.order_time}</Text>
                                    </View>
                                )}
                                {/**----------------------결제요청일--------------------------**/}
                                {(OrderData.pay_status_date !== '0000-00-00') && (
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2, text_danger]}>결제요청일</Text>
                                        <Text style={[h14, text_danger]}>{DateChg(OrderData.pay_status_date)} {OrderData.pay_status_time}</Text>
                                    </View>
                                )}
                                {/**----------------------결제요청일(* 발주검수 완료후 결제대기시에 노출한다.)--------------------------**/}
                                {(OrderData.pay_date) && (
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2, text_primary]}>결제완료일</Text>
                                        <Text style={[h14, text_primary]}>{DateChg(OrderData.pay_date)} {OrderData.pay_time}</Text>
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
}

const styles = StyleSheet.create({

    CancelBtnWrap:{
        borderWidth:1,
        borderColor:"#333",
        width:"48%",
        borderRadius:5,
    },
    CancelBtn:{
        padding:10,
    },
    all_check:{
        borderRadius:5,
    },

    all_check_txt:{
        marginLeft:5,
    },

    chk_view:{
        position:"absolute",
        opacity:0,
        zIndex: 99,
        width:"100%",
    },

    PopupViewbtn:{
        width:"48%",
        padding:10,
    },

    Popupbtn:{
        justifyContent:"space-between"
    },

    PopupViewbg:{
        backgroundColor:"rgba(0, 0, 0, 0.5)",
        width:"100%",
        height:"100%",
        left:0,
        top:0,
        zIndex:200,
        position:"absolute",
    },

    PopupView :{
        position:"absolute",
        zIndex:99,
        backgroundColor:"#fff",
        padding:15,
        width:"90%",
        left:"5%",
        top:"30%",
    },

    payMement:{
        width:"100%",
    },

    payView:{
        padding:15,
        paddingBottom:30,
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