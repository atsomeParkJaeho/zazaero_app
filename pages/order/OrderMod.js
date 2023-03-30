import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Button,
    Modal,
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
    Platform,
} from 'react-native';
// 공통 CSS 추가
import {
    container,
    bg_white,
    h16,
    text_center,
    flex_around,
    flex_between,
    input,
    ms2,
    flex,
    mt1,
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
    btn_danger,
    btn_primary,
    textarea,
    justify_content_around,
    text_black,
    h17,
    text_gray,
    h12,
    select_box,
    select_txt,
    select_icon_box,
    text_info,
    btn_info,
    text_white,
    wt2,
    pt1,
    pb1,
    pt3,
    pt5,
    pt7,
    h20,
    ps1,
    h30,
    ps2,
    pe2,
    btn_warning, wt3, wt5, wt4, wt7, ms1, align_items_start, align_items_end, wt6,
} from '../../common/style/AtStyle';
import {sub_page, gray_bar} from '../../common/style/SubStyle';
import {FormStyle} from "./FormStyle";
import {
    AddrMatch,
    bacnkAccount,
    DateChg, maxDate, minDate,
    ordStatus,
    payStatus,
    Phone,
    Price,
    settleKind,
    Time1,
    Time2
} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";
import CalendarStrip from "react-native-calendar-strip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Checkbox from "expo-checkbox";
import {
    add_order,
    AllgdOrderDel,
    ATorderDel,
    chg_order_item_cnt,
    getAppInfo,
    getOrderInfo, order_cancel,
    OrderMod, pay_result,
    payDoneCancel,
    PayTry,
} from "./UTIL_order";
import deliStatus from "./DeliStatus";
import LeftArrow from "../../icons/left_arrow.svg";
import HomeLogoAt from "../../icons/home_logo_at.svg";
import platform from "react-native-web/dist/exports/Platform";
import Close from '../../icons/close_black.svg';
import {get_Member} from "../UTIL_mem";
import {app_info, donePay, get_order} from "./OrderInfo";



export default function ModOrder({route,navigation}) {

    const [Member, setMember]  = useState();

    const [A_order_list,    set_A_order_list]               = useState([]);             // 발주상품상태정의
    const [BankCode,        setBankCode]                    = useState([]);             // 관리자 무통장입금계좌 출력
    const [get_gd_order,    set_get_gd_order]               = useState([]);
    const [cancel_doing,    set_cancel_doing]               = useState(0);
    const InputFocus = useRef([]);

    useEffect(()=>{
        /**------------------------------회원 값 가져오기-----------------------**/
        get_Member().then((res)=>{if(res) {setMember(res);} else {Alert.alert(``,`실패`);}});
        /**------------------------------발주정보 가져오기----------------------------**/
        get_ready(Member, route.params.get_gd_order.gd_order_uid);

    },[Member]);

    const get_ready = async (Member, gd_order_uid) => {
        /**은행코드 추출**/
        let {A_pay_bank} = await app_info();
        let temp = A_pay_bank.map(val=>{return {label:val.name, value:val.key,}});
        /**발주정보 추출**/
        let {gd_order, cancel_doing_cnt} = await get_order(Member, gd_order_uid);
        let temp2 = gd_order.A_order.map(val =>{return {...val, goods_chk: false, goods_del: false,}});
        navigation.setOptions({title:'발주내용을 수정중입니다.',});
        setBankCode(temp);
        set_get_gd_order(gd_order);
        set_A_order_list(temp2);
        set_cancel_doing(cancel_doing_cnt);
    }

    const goInput = (name, value, goods_uid, order_uid,) => {
        console.log(name,'[입력값] 타입');
        console.log(value,'[value] 타입');
        console.log(goods_uid,'[자재uid] 타입');
        console.log(order_uid,'[발주uid] 타입');
    }


    const mod_recv_info = () => {
        Alert.alert(``,`발주를 수정하시겠습니까?`,[
            {text:"아니요"},
            {text:"네",
            onPress:()=>{
                Alert.alert(``,`수정이 완료되었습니다.`,);
                return navigation.replace('발주상세',{gd_order_uid:route.params.get_gd_order.gd_order_uid})
            },
            }
        ]);
    }
    let today = new Date();
    return (
        <>
            <ScrollView style={[bg_white]}>
                {/**----------------------------------------------배송지 입력--------------------------------------------------**/}
                <View style={[FormStyle.FormGroup]}>
                    {/**----------------------------------------------공사명--------------------------------------------------**/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <Text style={[FormStyle.FormLabel]}>공사명</Text>
                        <TextInput
                            style={[input,{flex:1}]}
                            placeholder="공사명"
                            editable={false}
                            onChangeText={(work_name)=>goInput(`work_name`,work_name)}
                            defaultValue={`${get_gd_order.work_name}`}
                        />
                    </View>
                    {/**----------------------------------------------배송지주소 입력--------------------------------------------------**/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <Text style={[FormStyle.FormLabel]}>배송지</Text>
                        <View style={[d_flex,align_items_center]}>
                            {/**-------------------------우편번호---------------------**/}
                            <TextInput style={[input,{flex:1},bg_light]} editable={false} placeholder="우편번호"
                             value={(route.params.zonecode) ? (route.params.zonecode) : (get_gd_order.zonecode)}
                            />
                            <TouchableOpacity onPress={()=>navigation.navigate('주소검색',{page:"수정하기", gd_order_uid:get_gd_order.gd_order_uid})}>
                                <View style={[bg_primary,{padding:8,borderRadius:5, marginLeft:16,}]}>
                                    <Text style={[text_light]}>주소찾기</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/**----------------------------------------------주소입력--------------------------------------------------**/}
                    <View style={{paddingBottom:15,}}>
                        <TextInput style={[input,{flex:1},bg_light]} editable={false} placeholder="주소"
                         value={(route.params.addr1) ? (route.params.addr1) : (get_gd_order.addr1)}
                        />
                    </View>
                    {/**----------------------------------------------상세주소--------------------------------------------------**/}
                    <View>
                        <TextInput style={[input,{flex:1},bg_light]} placeholder="주소"
                        value={get_gd_order.addr2}
                        onChangeText={(addr2)=>goInput("addr2",addr2)}
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
                            {DateChg(get_gd_order.hope_deli_date)}
                        </Text>
                    </View>
                    <View style={[FormStyle.FormGroup, {paddingTop: 5, paddingBottom: 5,}]}>
                        <CalendarStrip
                            scrollable
                            onDateSelected={(Date) => {
                                set_get_gd_order({
                                    ...get_gd_order,
                                    hope_deli_date: String(Date.format('YYYY-MM-DD')),
                                });
                            }
                            }
                            startingDate={`${Date(get_gd_order.hope_deli_date)}`}
                            minDate={`${today}`}
                            maxDate={`${maxDate(today)}`}
                            style={{height: 150, paddingTop: 20, paddingBottom: 10}}
                            daySelectionAnimation={{type: "background", highlightColor: "#3D40E0",}}
                            selectedDate={`${get_gd_order.hope_deli_date}`}
                            highlightDateNameStyle={{color: "#fff", fontSize: 12, paddingBottom: 5,}}
                            highlightDateNumberStyle={{color: "#fff", fontSize: 16,}}
                            weekendDateNameStyle={{color: "#452"}}
                            dateNameStyle={{fontSize: 12, color: "#666", paddingBottom: 5,}}
                            dateNumberStyle={{fontSize: 16}}
                        />
                    </View>
                    {/**----------------------------------------------캘린더--------------------------------------------------**/}
                </View>
                {/**----------------------------------------------희망배송시간 선택--------------------------------------------------**/}
                <View>
                    <View style={[d_flex, align_items_center, FormStyle.FormDate, {justifyContent:"space-between"}]}>
                        {/*체크박스*/}
                        <Text style={[FormStyle.FormDateLabel]}>희망배송시간</Text>
                        <Text style={[FormStyle.FormDateLabel]}>
                            {get_gd_order.hope_deli_time}
                        </Text>
                    </View>
                </View>
                {/**----------------------------------------------현장인도자 정보--------------------------------------------------**/}
                <View style={[FormStyle.FormGroup]}>
                    {/*==============현장인도자 성명==============*/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <View style={[FormStyle.FormGroupItems]}>
                            <Text style={[FormStyle.FormLabel]}>현장인도자 성명</Text>
                            <Text style={[input,{paddingTop:12},bg_light]}>{get_gd_order.recv_name}</Text>
                        </View>
                        {/*==============현장인도자 연락처==============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <View>
                                <Text style={[FormStyle.FormLabel]}>현장인도자 연락처</Text>
                                <Text style={[input,{paddingTop:12},bg_light]}>{get_gd_order.recv_mobile}</Text>
                            </View>
                        </View>
                        {/*==============배송 요청 사항==============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <View>
                                <Text style={[FormStyle.FormLabel]}>배송 요청 사항</Text>
                                <Text style={[input,{height:100,paddingTop:12},bg_light]}>{get_gd_order.order_memo}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/**-----------------------------------------------------------발주자재목록 2023-03-28----------------------------------------------------------------**/}
                <View style={[container, {borderBottomWidth: 1,borderColor:"#e6e6e6",}]}>
                    <View style={[flex_between]}>
                        <View style={[]}>
                            <Text style={[h18]}>자재목록</Text>
                        </View>
                        {(get_gd_order.ord_status === 'pay_done' || get_gd_order.ord_status === 'deli_ready') && (
                            <>
                                <View style={[flex]}>
                                    <TouchableOpacity style={[btn_primary,{paddingVertical:7,paddingHorizontal:7,}]}>
                                        <Text style={[text_white,text_center,h13]}>추가발주</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[ms2,btn_warning,{paddingVertical:7,paddingHorizontal:7,}]}>
                                        <Text style={[text_white,text_center,h13]}>발주취소</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </View>
                <View>
                    {A_order_list.map((val,idx)=>(
                        <View style={[styles.CancelDetail_list_items]} key={idx}>
                            <View style={[container]}>
                                {/**==================상품명===============**/}
                                <View style={[d_flex, align_items_center, mb1,flex_between]}>
                                    <View style={{flex:1}}>
                                        {/*상품명*/}
                                        <Text style={[h14]}>{val.goods_name}</Text>
                                    </View>
                                </View>
                                {/**==================옵션===============**/}
                                {val.A_sel_option.map((item,idx)=>(
                                    <>
                                        <View style={[flex_between_bottom]} key={idx}>
                                            <View style={[flex_end]}>
                                                {/**==================이미지===============**/}
                                                <View>
                                                    <Image style={[styles.goods_thum]} source={{uri: 'http://www.zazaero.com' + val.list_img_url}}/>
                                                </View>
                                                {/**==================수량===============**/}
                                                <View style={ms2}>
                                                    <Text style={[h14,fw500,{paddingBottom:10,}]}>수량</Text>
                                                    <View style={[flex]}>
                                                        <Text style={[text_center]}>
                                                            {item.option_cnt} 개
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={justify_content_end}>
                                                {/*단가*/}
                                                <Text style={[h13]}>( 단가 : {Price(item.option_price)} 원)</Text>
                                                {/*총금액*/}
                                                <Text style={[h16,text_right]}>{Price(item.option_price * item.option_cnt)} 원</Text>
                                            </View>
                                        </View>
                                        <View style={[mt1]}>
                                            {(item.req_memo) && (
                                                <View style={[]}>
                                                    <Text style={[h13,text_right]}>요청금액 : <Text style={[text_danger]}>{Price(item.opt_price)}원</Text></Text>
                                                </View>
                                            )}
                                            {(item.req_memo) && (
                                                <View style={[]}>
                                                    <Text style={[h13]}>{val.req_opt_guide_name}</Text>
                                                    <Text style={[textarea, h13, bg_light]}>{item.req_memo}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
                {/**-----------------------------------------------------------결제금액----------------------------------------------------------------**/}
                <OrderTotalPrice/>
            </ScrollView>
            {/**----------------------------------------------결제전 수정하기--------------------------------------------------**/}
            {(
                get_gd_order.ord_status === 'ord_ready' ||
                get_gd_order.ord_status === 'pay_ready' ||
                get_gd_order.ord_status === 'pay_err' ||
                get_gd_order.ord_status === 'pay_try'
            ) && (
                <View style={[bg_gray,styles.btn_default]}>
                    <TouchableOpacity onPress={mod_recv_info}>
                        <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                            <Text style={[text_light]}>관리자확인 후 결제가 가능합니다.</Text>
                        </View>
                        <Text style={[{textAlign: "center", color: "#fff", fontSize: 18,}]}>
                            수정완료
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );

    function OrderTotalPrice() {
        /**----------------총 결제금액은 자재가격 + 요청옵션비 + 배송비 + 포인트----------------**/
            // 총 결제금액
        let Settlekindprice = Number(get_gd_order.goodsprice)+Number(get_gd_order.deli_price)+Number(get_gd_order.tot_opt_price);
        return(
            <>
                <View>
                    {/**---------------배송정보---------------**/}
                    {(get_gd_order.deli_mem_mobile) && (
                        <>
                            <View style={container}>
                                <Text style={[h18]}>배송정보</Text>
                            </View>
                            {/**------------------------배송기사 연락처------------------------**/}
                            <View style={[flex]}>
                                <View style={[styles.wt30]}>
                                    <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>배송기사 연락처</Text>
                                </View>
                                <View style={[styles.wt70]}>
                                    <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                        {(get_gd_order.deli_mem_mobile) ? get_gd_order.deli_mem_mobile : `미정`}
                                    </Text>
                                </View>
                            </View>
                            {/**------------------------배송차량------------------------**/}
                            <View style={[flex]}>
                                <View style={[styles.wt30,{borderBottomWidth: 1,}]}>
                                    <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>배송차량</Text>
                                </View>
                                <View style={[styles.wt70,{borderBottomWidth: 1,}]}>
                                    <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                        {get_gd_order.deli_car_type_name}
                                    </Text>
                                </View>
                            </View>
                            {/**------------------------배송완료일시------------------------**/}
                            {(get_gd_order.deli_status === 'done') && (
                                <View style={[flex]}>
                                    <View style={[styles.wt30,{borderBottomWidth: 1,}]}>
                                        <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>배송완료일시</Text>
                                    </View>
                                    <View style={[styles.wt70,{borderBottomWidth: 1,}]}>
                                        <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                            {DateChg(get_gd_order.deli_done_date)} {get_gd_order.deli_done_time}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </>
                    )}

                    {/**--------------결제정보---------------**/}
                    <View style={container}>
                        <Text style={[h18]}>결제금액</Text>
                        {(get_gd_order.settlekind === 'bank') && (
                            <>
                                {(get_gd_order.pay_status === 'ready') && (
                                    <Text style={[text_danger]}>(입금대기)</Text>
                                )}
                            </>
                        )}
                    </View>
                    {/**/}
                    <View style={[flex,mt1]}>
                        {/**----------------------발주신청일--------------------------**/}
                        {(get_gd_order.order_date) && (
                            <>
                                <View style={[styles.wt25]}>
                                    <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>발주신청일시</Text>
                                </View>
                                <View style={[styles.wt75]}>
                                    <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                        {DateChg(get_gd_order.order_date)} {get_gd_order.order_time}
                                    </Text>
                                </View>
                            </>
                        )}
                    </View>
                    {/**----------------------결제요청일--------------------------**/}
                    {(get_gd_order.pay_status_date !== '0000-00-00') && (
                        <View style={[flex]}>
                            <View style={[styles.wt25]}>
                                <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>결제요청일시</Text>
                            </View>
                            <View style={[styles.wt75]}>
                                <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                    {DateChg(get_gd_order.pay_status_date)} {get_gd_order.pay_status_time}
                                </Text>
                            </View>
                        </View>
                    )}
                    {/**----------------------결제유형--------------------------**/}
                    {(get_gd_order.ord_status === 'pay_done' || get_gd_order.ord_status === 'pay_try' || get_gd_order.settlekind === 'bank') && (
                        <>
                            {(get_gd_order.settlekind) && (
                                <View style={[flex]}>
                                    <View style={[styles.wt25]}>
                                        <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>결제유형</Text>
                                    </View>
                                    <View style={[styles.wt75]}>
                                        <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                            {settleKind(get_gd_order.settlekind)}
                                            {/*{get_gd_order.settlekind}*/}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </>
                    )}
                    {/**----------------------입금계좌정보--------------------------**/}
                    {(get_gd_order.settlekind === 'bank') && (
                        <View style={[flex]}>
                            <View style={[styles.wt25]}>
                                <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>입금계좌</Text>
                            </View>
                            <View style={[styles.wt75]}>
                                <Text style={[styles.GoodsDetail_info_txt_val,h12, styles.GoodsDetail_price_val]}>
                                    {BankCode.map(label=>label.value === get_gd_order.bankAccount && label.label)}
                                </Text>
                            </View>
                        </View>
                    )}
                    {/**----------------------결제요청일(* 발주검수 완료후 결제대기시에 노출한다.)--------------------------**/}
                    {(get_gd_order.pay_date) && (
                        <View style={[flex]}>
                            <View style={[styles.wt25]}>
                                <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>결제완료일시</Text>
                            </View>
                            <View style={[styles.wt75]}>
                                <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                    {DateChg(get_gd_order.pay_date)} {get_gd_order.pay_time}
                                </Text>
                            </View>
                        </View>
                    )}
                    {/**----------------------자재 가격--------------------------**/}
                    {(get_gd_order.goodsprice) && (
                        <View style={[flex]}>
                            <View style={[styles.wt25]}>
                                <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>자재가격</Text>
                            </View>
                            <View style={[styles.wt75]}>
                                <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                    {Price(get_gd_order.goodsprice)}원
                                </Text>
                            </View>
                        </View>
                    )}
                    {/**----------------------요청옵션비--------------------------**/}
                    {(get_gd_order.tot_opt_price) && (
                        <>
                            {(get_gd_order.ord_status !== 'ord_ready' && get_gd_order.ord_status !== 'ord_doing') && (
                                <>
                                    <View style={[flex]}>
                                        <View style={[styles.wt25]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>옵션요청비</Text>
                                        </View>
                                        <View style={[styles.wt75]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                {Price(get_gd_order.tot_opt_price)}원
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            )}
                        </>
                    )}
                    {/**----------------------배송비--------------------------**/}
                    {(get_gd_order.deli_price) && (
                        <>
                            {(get_gd_order.ord_status !== 'ord_ready' && get_gd_order.ord_status !== 'ord_doing') && (
                                <>
                                    <View style={[flex]}>
                                        <View style={[styles.wt25]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>배송비</Text>
                                        </View>
                                        <View style={[styles.wt75]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                {Price(get_gd_order.deli_price)}원
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            )}
                        </>
                    )}
                    {/**----------------------총결제 금액--------------------------**/}
                    <View style={[flex]}>
                        <View style={[styles.wt25]}>
                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>총 결제금액</Text>
                        </View>
                        <View style={[styles.wt75]}>
                            <Text style={[styles.GoodsDetail_info_txt_val,h16,text_primary]}>
                                {Price(Settlekindprice)}원
                            </Text>
                        </View>
                    </View>
                </View>
            </>
        );
    }

}

const styles = StyleSheet.create({

    btn_default:{
        paddingTop      : 7,
        paddingBottom   : 38,
        width           : "100%",
        position        : "relative",
        left            : 0,
        bottom          : 0,
        zIndex          : 99,
        backgroundColor :"#3D40E0",
    },

    AllGoodsChk:{
        position:"absolute",
        borderWidth:1,
        zIndex:99,
        width:"100%",
        height:"100%",
        opacity:0
    },
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
    wt25: {
        width: "25%",
        backgroundColor:"#f8f8f8",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderRightWidth:0,
        borderBottomWidth:0,
    },
    wt75: {
        width: "75%",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderLeftWidth:0,
        borderBottomWidth:0,
    },
    wt30: {
        width: "30%",
        backgroundColor:"#f8f8f8",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderRightWidth:0,
        borderBottomWidth:0,
    },
    wt70: {
        width: "70%",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderLeftWidth:0,
        borderBottomWidth:0,
    },
    GoodsDetail_info_txt:{
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        color:"#333",
        lineHeight:24,
        textAlign:"right",
    },
    GoodsDetail_info_txt_val:{
        fontSize: Platform.OS === 'ios' ? 15 : 14,
        lineHeight:24,
        fontWeight:"500",
        textAlign:"right",
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