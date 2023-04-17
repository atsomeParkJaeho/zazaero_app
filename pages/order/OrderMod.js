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
    const [get_gd_order,    set_get_gd_order]               = useState({
        zonecode:'',
        addr1:''
    });
    const [cancel_doing,    set_cancel_doing]               = useState(0);
    // 추가발주 창 오픈 상태정의
    const [add_goods_list,  set_add_goods_list]             = useState([]);
    const [Show_1, setShow_1]                               = useState(false);
    const [Show_2, setShow_2]                               = useState(false);    // 셀렉트창 노출 여부
    // const [A_goods,         set_A_goods]                    = useState([]);
    const InputFocus = useRef([]);
    const Update    = useIsFocused();

    const {zonecode, addr1} = route.params;
    useEffect(()=>{
        /**------------------------------회원 값 가져오기-----------------------**/
        get_Member().then((res)=>{if(res) {setMember(res);} else {
            Alert.alert(``,`실패`);
            return navigation.navigate('로그인');
        }});
        /**------------------------------발주정보 가져오기----------------------------**/
        get_ready(Member, route.params.get_gd_order.gd_order_uid);

        // 자재추가시 넣어준다.
        if(route.params.add_goods_list) {
            let res = route.params.add_goods_list.filter((val,idx)=> route.params.add_goods_list.indexOf(val.goods_uid) !== idx);
            let temp = res.map(val=>{return {...val, req_memo    :'', goods_cnt   :1,}})
            set_add_goods_list(temp);
        }

    },[Member,Update]);
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
        if(addr1 || zonecode) {
            set_get_gd_order({
                ...get_gd_order,
                zonecode    :zonecode,
                addr1       :addr1,
            });
        }

    }
    const goInput = (name, value, goods_uid, order_uid, type) => {
        console.log(name,'[입력값] 타입');
        console.log(value,'[value] 타입');
        console.log(goods_uid,'[자재uid] 타입');
        console.log(order_uid,'[발주uid] 타입');
        set_get_gd_order({
            ...get_gd_order,
            [name]:value,
        });

        if(name === 'option_cnt' || name === 'req_memo') {
            let temp = A_order_list.map(val=>{
                if(val.goods_uid === goods_uid) {
                    return {...val, A_sel_option:val.A_sel_option.map(item=>{
                            return {
                                ...item,
                                [name]:value,
                            }
                        })
                    }
                } else {
                    return val;
                }
            });
            set_A_order_list(temp);
        }
    }
    const A_goInput = (name, value, goods_uid, type) => {
        if(type === 'minus') {
            let temp = add_goods_list.map(val=>{
                if(val.goods_uid === goods_uid) {
                    return {
                        ...val,
                        [name]:(val.goods_cnt < 2) ? 1 : Number(val.goods_cnt - 1 ),
                    }
                } else {
                    return val;
                }
            });
            set_add_goods_list(temp);
        } else if (type === 'plus') {
            let temp = add_goods_list.map(val=>{
                if(val.goods_uid === goods_uid) {
                    return {
                        ...val,
                        [name]:Number(val.goods_cnt + 1 ),
                    }
                } else {
                    return val;
                }
            });
            set_add_goods_list(temp);
        } else if(name === 'req_memo') {
            let temp = add_goods_list.map(val=>{
                if(val.goods_uid === goods_uid) {
                    return {
                        ...val,
                        [name]:value,
                    }
                } else {
                    return val;
                }
            });
            set_add_goods_list(temp);
        } else {
            let temp = add_goods_list.map(val=>{
                if(val.goods_uid === goods_uid) {
                    return {
                        ...val,
                        [name]:Number(value),
                    }
                } else {
                    return val;
                }
            });
            set_add_goods_list(temp);
        }
    }
    const A_goods_del = (goods_uid) => {
        Alert.alert('','선택하신 자재를 삭제하시겠습니까?',[
            {text:"취소",
                onPress:()=>{},
            },
            {text:"확인",
                onPress:()=>{
                    let res = add_goods_list.filter(val=>val.goods_uid !== goods_uid);
                    set_add_goods_list(res);
                    Alert.alert('','선택한 자재가 삭제되었습니다.');
                }
            }
        ]);
    }
    const Chk = (order_uid) => {

        if(1 >= A_order_list.length ) {
            return Alert.alert(``,`전체취소를 클릭해주세요.`);
        }

        let temp = A_order_list.map(val=>{
            if(val.order_uid === order_uid) {
                return {
                    ...val,
                    goods_chk:!val.goods_chk,
                }
            } else {
                return val;
            }
        });
        set_A_order_list(temp);
    }


    const Count = (name, value, goods_uid) => {
        if(value === 'plus') {
            let temp = A_order_list.map(val=>{
                if(val.goods_uid === goods_uid) {
                    return {...val, A_sel_option:val.A_sel_option.map(item=>{
                        return {
                            ...item,
                            option_cnt:Number(item.option_cnt)+1,
                        }
                    })
                    }
                } else {
                    return val;
                }
            });
            set_A_order_list(temp);
        }

        if(value === 'minus') {
            let temp = A_order_list.map(val=>{
                if(val.goods_uid === goods_uid) {
                    return {...val, A_sel_option:val.A_sel_option.map(item=>{
                            return {
                                ...item,
                                option_cnt:(item.option_cnt < 1) ? 1:Number(item.option_cnt)-1,
                            }
                        })
                    }
                } else {
                    return val;
                }
            });
            set_A_order_list(temp);
        }
    }
    const goSearch = (type, value) => {
        if(type === 'hope_deli_time') {
            setShow_1(!Show_1);
            set_get_gd_order({
                ...get_gd_order,
                hope_deli_time:value,
            });
        }
    }
    const mod_recv_info = () => {

        let chk_result = A_order_list.filter((val)=>val.goods_chk);
        let chk_uid = chk_result.map(val=>val.order_uid);
        console.log(chk_result,'/[필터링]');
        console.log(chk_uid,'/[필터링 uid]');

        Alert.alert(``,`발주를 수정하시겠습니까?`,[
            {text:"아니요"},
            {text:"네",
            onPress:()=>{
                // 1.장바구니 수정정보 보내기
                OrderMod(get_gd_order, A_order_list, add_goods_list, Member, chk_uid).then((res)=>{
                    if(res) {
                        const {result, err_msg} = res.data;
                        if(result === 'OK') {
                            Alert.alert(``,`수정이 완료되었습니다.`,);
                            return navigation.replace('발주상세',{gd_order_uid:route.params.get_gd_order.gd_order_uid});
                        }
                        if(result === 'OK_ord_chg') {
                            let msg = '발주 정보가 변경 되어\n관리자의 재 확인 후 결제가 가능합니다';
                            console.log(err_msg);
                            Alert.alert('',msg,[
                                {text:"OK", onPress:()=>{
                                    return navigation.replace(`발주현황`)}
                                }
                            ]);
                        } else {
                            return  Alert.alert(``,`실패`);
                        }
                    }
                });
            },
            }
        ]);
    }
    /**----------------------------------결제전 자재추가--------------------------------**/
    const add_goods_listOrder = () => {
        // 1. 즐겨찾기 페이지로 이동한다
        let msg = `* 즐겨찾기된 자재만 추가됩니다. *`;

        console.log('[결제전 자재추가 이벤트]');
        Alert.alert(`자재를 추가하시겠습니까?`,msg
                ,[
            {text:'아니오', onPress:()=>{}},
            {text:'예',
            onPress:()=>{
                let data = {
                    get_gd_order        :get_gd_order,
                    add_goods_list      :add_goods_list,
                }
                return navigation.navigate('즐겨찾기',data);
            },
            }
        ]);

    }
    /**-------------------------------전체발주취소--------------------------------**/
    const AlldelOrder = () => {
        Alert.alert('','전체취소 하시겠습니까?\n(전체취소시 발주가 삭제됩니다.)',[
            {text:"취소", onPress:()=>{}},
            {text:"확인", onPress:()=>{temp();}}
        ]);
        let temp = () => {
            AllgdOrderDel(get_gd_order, Member).then((res)=>{
                if(res) {
                    const {result} = res.data;
                    if(result === 'OK') {
                        Alert.alert('','발주가 취소되었습니다.');
                        return navigation.replace('발주현황');
                    }
                }
            });
        }
    }
    /**----------------------------선택발주취소-----------------------------------**/
    const ChkdelOrder = () => {
        let result = A_order_list.filter(val=>val.goods_chk);
        let order_uid = result.map(val=>val.order_uid);
        if(A_order_list.length === 1)               { return Alert.alert('','전체취소를 버튼을 클릭해주세요.') }
        if(A_order_list.length === result.length)   { return Alert.alert('','전체취소를 버튼을 클릭해주세요.') }
        if(result.length === 0)                     { return Alert.alert('','자재를 선택해주세요.') }

        Alert.alert('','선택하신 자재를 취소하시겠습니까?',[
            {text:"취소", onPress:()=>{}},
            {text:"확인", onPress:()=>{
                return temp();
            }}
        ]);

        let temp = () => {
            ATorderDel(get_gd_order, Member, order_uid).then((res)=>{
                console.log(res.data,' / [리턴값]');
                const {result, err_msg} = res.data;
                if(result === 'OK') {
                    Alert.alert('','자재를 삭제하였습니다.');
                    let temp = A_order_list.map(val=>{
                        if(val.goods_chk === true) {
                            return {...val, goods_del:true}
                        } else {
                            return val;
                        }
                    });
                    let temp2 = temp.filter(val=>val.goods_del === false);
                    set_A_order_list(temp2);
                } else if(result === 'OK_ord_chg') {
                    let msg = '발주 정보가 변경 되어\n관리자의 재 확인 후 결제가 가능합니다';
                    Alert.alert(``,msg,[
                        {text:'확인',
                            onPress:()=>{
                                return navigation.replace(`발주현황`);
                            }
                        }
                    ]);
                }
                else {
                    return Alert.alert(``,result);
                }
            });
        }
    }

    /**--------1. 자재추가시 수량 조절----------**/

    /**--------2. 자재추가한 자재 삭제하기--------**/

    console.log(get_gd_order,'/[발주정보 확인]');
    console.log(add_goods_list,'/[추가된 자재2]');
    console.log(route.params,'/라우터 확인');

    let today = new Date();
    return (
        <>
            <ScrollView style={[bg_white]}>
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
                                    <Checkbox style={styles.chk_view} color={"#4630eb"} value={val.goods_chk} onValueChange={()=>Chk(val.order_uid)}/>
                                    <View style={{flex:0.2}}>
                                        <Text style={[h12,pe1,text_danger]}>선택취소</Text>
                                        <Checkbox style={styles.all_check} color={"#4630eb"} value={val.goods_chk} onValueChange={()=>Chk(val.order_uid)}/>
                                    </View>

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
                                                    {(val.goods_chk === false) && (
                                                        <>
                                                            <View style={[d_flex]}>
                                                                <Text style={[h14,fw500,{paddingBottom:10,}]}>
                                                                    수량
                                                                </Text>
                                                            </View>
                                                            <View style={[flex]}>
                                                                {/*=============마이너스 버튼==========*/}
                                                                <TouchableWithoutFeedback onPress={()=>Count(`option_cnt`,`minus`,val.goods_uid)}>
                                                                    <View style={[count_btn]}>
                                                                        <View style={[pos_center]}>
                                                                            <Text style={[count_btn_txt]}>－</Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableWithoutFeedback>
                                                                {/*============수량=================*/}
                                                                {/**-----상품 uid, 발주 uid 추가----**/}
                                                                <TextInput
                                                                    style={[countinput]}
                                                                    onChangeText={(option_cnt)=>goInput(`option_cnt`,option_cnt,val.goods_uid,val.order_uid,`cnt`)}
                                                                    value={`${item.option_cnt}`}
                                                                    keyboardType="number-pad"
                                                                    maxLength={3}
                                                                />
                                                                {/*=============플러스 버튼============*/}
                                                                <TouchableWithoutFeedback onPress={()=>Count(`option_cnt`,`plus`,val.goods_uid)}>
                                                                    <View style={[count_btn]}>
                                                                        <View style={[pos_center]}>
                                                                            <Text style={[count_btn_txt]}>＋</Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableWithoutFeedback>
                                                            </View>
                                                        </>
                                                    )}

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
                                            <View style={[]}>
                                                <Text style={[h13]}>{val.req_opt_guide_name}</Text>
                                                <TextInput style={[textarea, h13, bg_light]}
                                                           onChangeText={(req_memo)=>goInput(`req_memo`,req_memo,val.goods_uid,val.order_uid)}
                                                           autoCapitalize="none"
                                                           value={`${item.req_memo}`}
                                                />
                                            </View>
                                        </View>
                                    </>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
                {(
                    get_gd_order.ord_status === 'ord_ready' ||
                    get_gd_order.ord_status === 'pay_ready' ||
                    get_gd_order.ord_status === 'pay_err'   ||
                    get_gd_order.ord_status === 'pay_try'
                ) && (
                    <>
                    <PayReadyCancelTab/>
                    </>
                )}
                {/**-----------------------------------------------------------결제전 자재추가 2023-04-01----------------------------------------------------------------**/}
                {(add_goods_list) && (
                    <>
                        <View style={[container, {borderBottomWidth: 1,borderColor:"#e6e6e6",}]}>
                            <View style={[flex_between]}>
                                <View style={[]}>
                                    <Text style={[h18, text_primary]}>추가 자재목록</Text>
                                </View>
                            </View>
                        </View>
                        {/**-----------------------------------------------------------반복문 구간----------------------------------------------------------------**/}
                        {add_goods_list.map((val,idx)=>(
                            <View tyle={[styles.CancelDetail_list_items]} key={idx}>
                                <View style={[container]}>
                                    {/**--------------------------------옵션--------------------------------**/}
                                    <View style={[d_flex, align_items_center, mb1,flex_between]}>
                                        {/*체크박스*/}
                                        <View style={{flex:1}}>
                                            {/*상품명*/}
                                            <Text style={[h14]}>{val.goods_name}</Text>
                                        </View>
                                        <View style={{flex:0.1,paddingLeft:5}}>
                                            <TouchableOpacity style={[flex,justify_content_end]} onPress={()=>{A_goods_del(val.goods_uid)}}>
                                                <Close width={15} height={15}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[flex_between_bottom]}>
                                        <View style={[flex_end]}>
                                            <View>
                                                <Image style={[styles.goods_thum]} source={{uri:`http://www.zazaero.com${val.list_img}`}} />
                                            </View>
                                            {/**-------------------수량조절---------------**/}
                                            <View style={ms2}>
                                                <View style={[d_flex]}>
                                                    <Text style={[h14,fw500,{paddingBottom:5,}]}>
                                                        수량
                                                    </Text>
                                                </View>

                                                <View style={[flex]}>
                                                    {/*=============마이너스 버튼==========*/}
                                                    <TouchableWithoutFeedback onPress={()=>A_goInput('goods_cnt',val.goods_cnt,val.goods_uid,'minus')}>
                                                        <View style={[count_btn]}>
                                                            <View style={[pos_center]}>
                                                                <Text style={[count_btn_txt]}>－</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                    {/*============수량=================*/}
                                                    {/**-----상품 uid, 발주 uid 추가----**/}
                                                    <View style={[countinput]}>
                                                        <TextInput
                                                            onChangeText={(goods_cnt)=>A_goInput('goods_cnt',goods_cnt,val.goods_uid)}
                                                            value={`${val.goods_cnt}`}
                                                            style={[text_center]}
                                                            maxLength={3}
                                                            keyboardType="numeric"
                                                        />
                                                    </View>
                                                    {/*=============플러스 버튼============*/}
                                                    <TouchableWithoutFeedback onPress={()=>A_goInput('goods_cnt',val.goods_cnt,val.goods_uid,'plus')}>
                                                        <View style={[count_btn]}>
                                                            <View style={[pos_center]}>
                                                                <Text style={[count_btn_txt]}>＋</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>


                                            </View>
                                        </View>
                                        <View style={justify_content_end}>
                                            <Text style={[h13]}>(단가 : {Price(val.price)}원)</Text>
                                            {/*단가*/}
                                            <Text style={[h16,text_right]}>{Price(val.price * val.goods_cnt)}원</Text>
                                            {/*총금액*/}
                                        </View>
                                    </View>
                                    <View style={[mt1]}>
                                        {/*옵션요청가격*/}
                                        <View style={[]}>
                                            <Text style={[h13]}>{(val.req_opt_guide_name) ? (val.req_opt_guide_name) : '자재 요청사항을 입력해주세요.'}</Text>
                                            <TextInput style={[textarea, h13]}
                                                       onChangeText={(req_memo)=>A_goInput('req_memo',req_memo,val.goods_uid)}
                                                       value={val.req_memo}
                                                       autoCapitalize="none"
                                            />
                                        </View>
                                        {/*옵션요청글*/}
                                    </View>

                                </View>
                            </View>
                        ))}
                    </>
                )}
                {/**----------------------------------------------배송지 입력--------------------------------------------------**/}
                <View style={[FormStyle.FormGroup]}>
                    {/**----------------------------------------------공사명--------------------------------------------------**/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <Text style={[FormStyle.FormLabel]}>공사명</Text>
                        <TextInput
                            style={[input,{flex:1},bg_light]}
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
                            value={(zonecode) ? (zonecode) : (get_gd_order.zonecode)}
                            onChangeText={(zonecode)=>goInput(`zonecode`,zonecode)}
                            />
                            <TouchableOpacity onPress={()=>navigation.navigate('주소검색',{page:"수정하기", get_gd_order:get_gd_order})}>
                                <View style={[bg_primary,{padding:8,borderRadius:5, marginLeft:16,}]}>
                                    <Text style={[text_light]}>주소찾기</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/**----------------------------------------------주소입력--------------------------------------------------**/}
                    <View style={{paddingBottom:15,}}>
                        <TextInput style={[input,{flex:1},bg_light]} editable={false} placeholder="주소"
                         value={(addr1) ? (addr1) : (get_gd_order.addr1)}
                         onChangeText={(addr1)=>goInput(`addr1`,addr1)}
                        />
                    </View>
                    {/**----------------------------------------------상세주소--------------------------------------------------**/}
                    <View>
                        <TextInput style={[input,{flex:1}]} placeholder="주소"
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
                    {/*==============시간입력==============*/}
                    <View style={[FormStyle.FormGroup]}>
                        <View style={[select_box]}>
                            <TouchableOpacity onPress={()=>{setShow_1(!Show_1)}}>
                                <Text style={[select_txt]}>
                                    {(get_gd_order.hope_deli_time) ? get_gd_order.hope_deli_time:'시간을 선택해주세요'}
                                </Text>
                                <View style={[select_icon_box]}>
                                    <Text style={[styles.select_icon]}>▼</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/**/}
                        {/**---------------------------클릭시 노출--------------------------------**/}
                        {(Show_1) && (
                            <View style={[styles.select_opt_list_box]}>
                                <ScrollView style={[{height:160}]} nestedScrollEnabled={true}>
                                    {Time2.map((val,ide)=>
                                        <View style={[styles.select_opt_list_itmes]}>
                                            <TouchableOpacity onPress={() => goSearch(`hope_deli_time`,val.value)}>
                                                <Text style={[text_center,h17]}>
                                                    {val.label}
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
                            {/*<Text style={[input,{paddingTop:12},bg_light]}>{get_gd_order.recv_name}</Text>*/}
                            <TextInput style={[input]}
                                       onChangeText={(recv_name)=>goInput("recv_name",recv_name)}
                                       placeholder="예 ) 홍길동"
                                       value={get_gd_order.recv_name}
                            />
                        </View>
                        {/*==============현장인도자 연락처==============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <View>
                                <Text style={[FormStyle.FormLabel]}>현장인도자 연락처</Text>
                                <TextInput style={[input]}
                                           onChangeText={(recv_mobile)=>goInput("recv_mobile",Phone(recv_mobile))}
                                           placeholder="010-xxxx-xxxx"
                                           keyboardType="number-pad"
                                           maxLength={13}
                                           value={`${get_gd_order.recv_mobile}`}
                                />
                            </View>
                        </View>
                        {/*==============배송 요청 사항==============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <View>
                                <Text style={[FormStyle.FormLabel]}>배송 요청 사항</Text>
                                <TouchableWithoutFeedback>
                                    <TextInput style={[input,{height:100,textAlignVertical: "top"}]} multiline={true}
                                   onChangeText={(order_memo)=>goInput('order_memo',order_memo)}
                                   numberOfLines={4}
                                   value={get_gd_order.order_memo}
                                   placeholder="배송요청사항"
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </View>



                {/**-----------------------------------------------------------결제금액----------------------------------------------------------------**/}
                {(
                    get_gd_order.ord_status === 'pay_ready'  ||
                    get_gd_order.ord_status === 'pay_done'   ||
                    get_gd_order.ord_status === 'deli_ready' ||
                    get_gd_order.ord_status === 'deli_doing' ||
                    get_gd_order.ord_status === 'deli_done'
                ) && (
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
                    </>
                )}
                <OrderTotalPrice/>
            </ScrollView>
            {/**----------------------------------------------결제전 수정하기--------------------------------------------------**/}
            <KeyboardAvoidingView behavior={Platform.select({ios:"padding"})}>
            {(
                get_gd_order.ord_status === 'ord_ready' ||
                get_gd_order.ord_status === 'pay_ready' ||
                get_gd_order.ord_status === 'pay_err' ||
                get_gd_order.ord_status === 'pay_try'
            ) && (
                <View style={[bg_gray,styles.btn_default]}>
                    <TouchableOpacity onPress={mod_recv_info}>
                        <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: (get_gd_order.ord_status === 'pay_ready') ? 20 : 10,}]}>
                            {(get_gd_order.ord_status === 'pay_ready') ? (
                                <></>
                            ) : (
                                <>
                                    <Text style={[text_light]}>관리자확인 후 결제가 가능합니다.</Text>
                                </>
                            )}
                        </View>
                        <Text style={[{textAlign: "center", color: "#fff", fontSize: 18,}]}>
                            수정완료
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            </KeyboardAvoidingView>
        </>
    );

    function PayReadyCancelTab() {
        return(
            <>
                <View style={[container]}>
                    <View style={[d_flex, justify_content_between,{marginBottom:15}]}>
                        <TouchableOpacity
                            onPress={AlldelOrder}
                            style={[styles.CancelBtnWrap, btn_outline_danger,{flex:1}]}>
                            <Text style={[text_center,styles.CancelBtn, text_danger]}>전체취소</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[d_flex, justify_content_between]}>
                        <TouchableOpacity
                            onPress={add_goods_listOrder}
                            style={[styles.CancelBtnWrap, btn_outline_primary, {width:"100%"}]}>
                            <Text style={[text_center,styles.CancelBtn, text_primary]}>자재추가</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }


    function OrderTotalPrice() {
        /**----------------총 결제금액은 자재가격 + 요청옵션비 + 배송비 + 포인트----------------**/
            // 총 결제금액
        let Settlekindprice = Number(get_gd_order.goodsprice)+Number(get_gd_order.deli_price)+Number(get_gd_order.tot_opt_price);
        return(
            <>
                <View>

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