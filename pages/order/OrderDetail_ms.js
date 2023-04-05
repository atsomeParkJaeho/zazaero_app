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
    Platform, SafeAreaView, Pressable,
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
    btn_warning, wt3, wt5, wt4, wt7, ms1, align_items_start, align_items_end, wt6, wt10, mt2, mb3, pb2, h25,
} from '../../common/style/AtStyle';
import {sub_page, gray_bar, borderBottom1} from '../../common/style/SubStyle';
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
import * as ImagePicker from 'expo-image-picker';
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
import CameraIcon from "../../icons/camera_icon.svg";
import HomeLogo from "../../icons/home_logo.svg";



export default function OrderDtail({route,navigation}) {


    /**------------페이지 파라미터-----------**/
    const {gd_order_uid, imp_log, addr1, zonecode, A_goods_list} = route.params;
    /**--------------------------------------필수 정보사항--------------------------------------------------**/
    const [Member, setMember]          = useState();
    const InputFocus = useRef([]);
    /**-----------------------------------------수정 상태 설정-------------------------------------------------------**/
    const [Mod, setMod] = useState(false);          // 발주상태시 수정 변경가능
    /**--------------------------------------상태값 셋팅--------------------------------------------------**/
    const [A_order_list,  set_A_order_list]              = useState([]);             // 발주상품상태정의
    const [BankCode,        setBankCode]                    = useState([]);             // 관리자 무통장입금계좌 출력
    const [PayMement,       setPayMement]                   = useState('bank');         // 결제창 노출 여부
    const [get_gd_order,    set_get_gd_order]                   = useState([]);
    const [cancel_doing,    set_cancel_doing]               = useState(0);
    const [Show_1,          setShow_1]                      = useState(false);
    const [Show_2,          setShow_2]                      = useState(false);           // 셀렉트창 노출 여부
    //모달창 오픈
    const [isModalVisible, setIsModalVisible]               = useState(false);
    const [isModalVisible2, setIsModalVisible2]             = useState(false);
    const [isModalVisible3, setIsModalVisible3]             = useState(false);
    const [ret_order, set_ret_order]                        = useState({});

    // 추가발주 창 오픈 상태정의
    const [add_goods_list, set_add_goods_list]              = useState(false);
    const [A_goods, set_A_goods]                            = useState([]);
    /**------------------------입력값 설정----------------------**/
    const goInput = (name, value, goods_uid, order_uid) => {
        console.log(name,'[입력값] 타입');
        console.log(value,'[value] 타입');
        console.log(goods_uid,'[자재uid] 타입');
        console.log(order_uid,'[발주uid] 타입');

        if(name === 'cancel_cnt') {
            let temp = A_order_list.map(val=>{
                if(val.order_uid === order_uid) {
                    let limited = Number(val.A_sel_option.map(item=>item.option_cnt));
                    console.log(limited,'/제한');
                    return {
                        ...val,
                        [name]:(value > limited) ? (limited):Number(value),
                    }
                } else {
                    return val;
                }
            });
            set_A_order_list(temp);
        } else {
            set_get_gd_order({
                ...get_gd_order,
                [name]:value,
            });
        }

    }

    /**-------------------------추출항목-----------------------**/
    const get_ready = async (Member, gd_order_uid) => {
        /**은행코드 추출**/
        let {A_pay_bank} = await app_info();
        let temp = A_pay_bank.map(val=>{return {label:val.name, value:val.key,}});
        /**발주정보 추출**/
        let {gd_order, cancel_doing_cnt} = await get_order(Member, gd_order_uid);
        let temp2 = gd_order.A_order.map(val =>{return {...val, goods_chk: false, goods_del: false,}});
        navigation.setOptions({title:gd_order.ord_status_name+' 상태 입니다.',});
        setBankCode(temp);
        set_get_gd_order(gd_order);
        set_A_order_list(temp2);
        set_cancel_doing(cancel_doing_cnt);
    }
    /**-------------------------발주정보수정하기 페이지 이동---------------------------**/
    const mod_recv_info = () => {
        console.log('수정하기 페이지 이동');
        if(get_gd_order.ord_status === 'pay_ready') {
            Alert.alert(``,`발주 정보 변경시\n관리자의 재 확인 후 결제가 가능합니다.`,[
                {text:'확인',
                    onPress:()=>{
                        let data = {
                            get_gd_order:get_gd_order,
                            A_order_list:A_order_list,
                        }
                        return navigation.replace('수정하기',data);
                    }
                }
            ]);
        } else {
            let data = {
                get_gd_order:get_gd_order,
                A_order_list:A_order_list,
            }
            return navigation.replace('수정하기',data);
        }

    }
    const goPay = () => {
        if(PayMement === 'bank') {
            if(get_gd_order.bankAccount === "0")     { return Alert.alert('','입금계좌를 선택해주세요.')}
            if(!get_gd_order.bankSender)             { return Alert.alert('','예금주명을 입력해주세요.')}
        }
        let bank_msg = '무통장입금을 진행하시겠습니까?';
        let card_msg = '결제를 진행하시겠습니까?';

        Alert.alert('',`${(PayMement === 'bank') ? bank_msg : card_msg}`,
            [
                {text:'취소', onPress:()=>{},},
                {
                    text:'확인', onPress:()=>{donePay(get_gd_order, PayMement, navigation)}
                },
            ]
        );
    }
    const goSearch = (name, value, label) => {
        if(name === 'settlekind') {
            setShow_2(!Show_2);
            set_get_gd_order({
                ...get_gd_order,
                bankAccount:value,
                bankLabel:label,
            });
        }
    }
    const go_add_order = () => {
        Alert.alert(``,`자재추가시 \n추가발주가 생성됩니다.`,[
            {text:'취소'},
            {text:'확인',
                onPress:()=>{
                    let data = {
                        get_gd_order:get_gd_order,
                    }
                    return navigation.replace(`추가발주`,data);
                }
            }
        ]);
    }

    const toggleModal2 = () => {
        if(cancel_doing > 0) { return Alert.alert('','기존 취소가 처리된 이후에\n발주취소 하실수 있습니다.') }
        setIsModalVisible2(!isModalVisible2);
        let temp = A_order_list.map(val=>{
            return {
                ...val,
                cancel_cnt:0,
            }
        });
        set_A_order_list(temp);
    };

    const toggleModal3 = () => {
        if(cancel_doing > 0) { return Alert.alert('','기존 취소가 처리된 이후에\n발주취소 하실수 있습니다.') }
        setIsModalVisible3(!isModalVisible3);
        let temp = A_order_list.map(val=>{
            return {
                ...val,
                cancel_cnt:0,
            }
        });
        set_A_order_list(temp);
    };


    // 결제후 취소
    const order_Cancel = (cancel_type) => {
        if(cancel_type === 'all') {
            Alert.alert('','자재목록을 전부 취소 하시겠습니까?',[
                {text:'취소', onPress:()=>{}},
                {text:'확인',
                    onPress:()=>{
                        // ================1. 결제취소 이벤트 실행====================
                        order_cancel(get_gd_order, cancel_type, A_order_list, Member).then((res)=>{
                            if(res) {
                                const {result} = res.data;
                                if(result === 'OK') {
                                    Alert.alert('','자재가 전부 취소 완료되었습니다.\n(환불은 2~3일 정도 소요됩니다.)',[
                                        {text:'확인',
                                            onPress:()=>{
                                                // ================2. 결제취소 이벤트 결과값 db에 전송====================
                                                return navigation.replace('배송상태');
                                            }
                                        }
                                    ]);
                                } else {
                                    return Alert.alert('','에러');
                                }
                            }
                        })
                    }
                }
            ]);
        } else {
            Alert.alert('','입력하신 수량으로 취소하시겠습니까?',[
                {text:'취소', onPress:()=>{}},
                {text:'확인',
                    onPress:()=>{
                        // ================1. 결제취소 이벤트 실행====================
                        let cancel_cnt_chk = A_order_list.map(val=>Number(val.cancel_cnt));
                        let all_cancel_cnt = 0;
                        for(let i = 0; cancel_cnt_chk.length > i; i++) {all_cancel_cnt += cancel_cnt_chk[i];}
                        if(all_cancel_cnt === 0) {return Alert.alert('','취소수량을 입력해주세요.');}
                        order_cancel(get_gd_order, cancel_type, A_order_list, Member).then((res)=>{
                            if(res) {
                                const {result} = res.data;
                                if(result === 'OK') {
                                    Alert.alert('','선택하신 자재 취소 완료되었습니다.\n(환불은 2~3일 정도 소요됩니다.)',[
                                        {text:'확인',
                                            onPress:()=>{
                                                // ================2. 결제취소 이벤트 결과값 db에 전송====================
                                                console.log(res.data,'/발주완료시 파라미터');
                                                return navigation.replace('발주상세',{gd_order_uid:get_gd_order.gd_order_uid});
                                            }
                                        }
                                    ]);
                                } else {
                                    return Alert.alert('','에러');
                                }
                            }
                        })
                    }
                }
            ])
        }
    }

    const [modAddr, setmodAddr]           = useState(`add`); // 신규수거지, 기존 배송지 선택 상태 정의
    /**--------------------------------------신규공사, 기존공사 선택 이벤트--------------------------------------------**/
    const select_addr = (type) => {
        if(type === 'add') {
            setmodAddr(type);
        }
        if(type === 'mod') {
            setmodAddr(type);
        }
    }
    /**------------------------------신규배송지, 기존배송지 선택-------------------------------**/
    function OrderAddress() {
        return (
            <>
                <View style={[flex,pb2]}>
                    {/**----------------------------------------------신규공사--------------------------------------------------**/}
                    <TouchableOpacity onPress={()=>select_addr('add')}>
                        <View style={[flex]}>
                            <View style={[styles.border_Circle]}>
                                {(modAddr === 'add') &&
                                    <View style={[pos_center]}>
                                        <View style={[styles.border_Circle_active]}/>
                                    </View>
                                }
                            </View>
                            <Text style={[styles.Chk, {paddingLeft: 5}]}>신규수거배송지</Text>
                        </View>
                    </TouchableOpacity>
                    {/**----------------------------------------------기존 공사--------------------------------------------------**/}
                    <TouchableOpacity onPress={()=>select_addr('mod')}>
                        <View style={[flex,ms2]}>
                            <View style={[styles.border_Circle]}>
                                {(modAddr === 'mod') &&
                                    <View style={[pos_center]}>
                                        <View style={[styles.border_Circle_active]}/>
                                    </View>
                                }
                            </View>
                            <Text style={[styles.Chk, {paddingLeft: 5}]}>기존배송지</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    //================이미지업로드 [S]================
    const MAX_IMAGES = 4;
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            if (selectedImages.length < MAX_IMAGES) {
                setSelectedImages([...selectedImages, result]);
            } else {
                alert('4장이상 등록할수 없습니다!');
            }
        }
    };

    const removeImage = (index) => {
        const images = [...selectedImages];
        images.splice(index, 1);
        setSelectedImages(images);
    };


    //================이미지업로드 [E]================


    const re_goInput = (name, value) => {
        set_ret_order({
            ...ret_order,
            [name]:value,
        });
    }

    useEffect(()=>{
        /**------------------------------회원 값 가져오기-----------------------**/
        get_Member().then((res)=>{if(res) {setMember(res);} else {Alert.alert(``,`실패`);}});
        /**------------------------------발주정보 가져오기----------------------------**/
        get_ready(Member, gd_order_uid);

    },[Member]);


    //console.log(get_gd_order,'/[데이터 확인1]');
    let btn = {
        marginBottom:86
    }

    //console.log(BankCode,'/[은행코드 확인]');
    //console.log(ret_order,'/[반품 입력 정보]');

    return (
        <>


            <ScrollView style={[bg_white]}>
                {/**----------------------------------------------배송지 입력--------------------------------------------------**/}
                <View style={[FormStyle.FormGroup]}>
                    {/**----------------------------------------------공사명--------------------------------------------------**/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <Text style={[FormStyle.FormLabel]}>공사명</Text>
                        <Text style={[input,{paddingTop:12},bg_light]}>{get_gd_order.work_name}</Text>
                    </View>
                    {/**----------------------------------------------배송지주소 입력--------------------------------------------------**/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <Text style={[FormStyle.FormLabel]}>배송지</Text>
                        <View style={[d_flex,align_items_center]}>
                            {/**-------------------------우편번호---------------------**/}
                            <Text style={[input,{paddingTop:12},bg_light]}>{get_gd_order.zonecode}</Text>
                        </View>
                    </View>
                    {/**----------------------------------------------주소입력--------------------------------------------------**/}
                    <View style={{paddingBottom:15,}}>
                        <Text style={[input,{paddingTop:12},bg_light]}>{get_gd_order.addr1}</Text>
                    </View>
                    {/**----------------------------------------------상세주소--------------------------------------------------**/}
                    <View>
                        <Text style={[input,{paddingTop:12},bg_light]}>{get_gd_order.addr2}</Text>
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
                        {/**----------------------------------------------주문취소--------------------------------------------------**/}
                        {(get_gd_order.ord_status === 'pay_done' || get_gd_order.ord_status === 'deli_ready') && (
                            <>
                                <View style={[flex]}>
                                    <TouchableOpacity onPress={()=>{go_add_order()}} style={[btn_primary,{paddingVertical:7,paddingHorizontal:7,}]}>
                                        <Text style={[text_white,text_center,h13]}>추가발주</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{toggleModal2()}} style={[ms2,btn_warning,{paddingVertical:7,paddingHorizontal:7,}]}>
                                        <Text style={[text_white,text_center,h13]}>발주취소</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                        {/**----------------------------------------------반품신청--------------------------------------------------**/}
                        {(get_gd_order.ord_status === 'deli_done') && (
                            <>
                                <View style={[flex]}>
                                    <TouchableOpacity onPress={()=>{toggleModal3()}} style={[ms2,btn_warning,{paddingVertical:7,paddingHorizontal:7,}]}>
                                        <Text style={[text_white,text_center,h13]}>반품신청</Text>
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
                {/**-----------------------------------------------------------차량정보----------------------------------------------------------------**/}
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
                {/**-----------------------------------------------------------결제금액----------------------------------------------------------------**/}
                <OrderTotalPrice/>
                {/**-----------------------------------------------------------결제유형 선택----------------------------------------------------------------**/}
                {(get_gd_order.ord_status === 'pay_ready' || get_gd_order.ord_status === 'pay_try' || get_gd_order.ord_status === 'pay_err') && (
                    <>
                        {(get_gd_order.settlekind === 'bank') ? (
                            <></>
                        ) : (
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
                                                <View style={[styles.select_box]}>
                                                    <TouchableOpacity onPress={()=>{setShow_2(!Show_2)}}>
                                                        <View style={[styles.border]}>
                                                            {/**---------------------------선택주소 노출--------------------------------**/}
                                                            <Text style={[styles.select_txt, h12, (get_gd_order.bankAccount !== '0') ? text_black:text_gray]}>
                                                                {(get_gd_order.bankLabel) ? get_gd_order.bankLabel : '계좌번호를 선택해주세요.'}
                                                                {/*{BankCode.map(label=>label.value === get_gd_order.bankAccount ? label.label : '계좌번호를 선택해주세요')}*/}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={[styles.select_icon_box]}>
                                                        <Text style={[styles.select_icon]}>▼</Text>
                                                    </View>
                                                </View>
                                                {/**/}
                                                {/**---------------------------클릭시 노출--------------------------------**/}
                                                {(Show_2) && (
                                                    <View style={[styles.select_opt_list_box]}>
                                                        <ScrollView style={[{height:160}]} nestedScrollEnabled={true}>
                                                            {BankCode.map((val,idx)=>(
                                                                <>
                                                                    <View style={[styles.select_opt_list_itmes]}>
                                                                        <TouchableOpacity onPress={() => goSearch(`settlekind`,val.value, val.label)}>
                                                                            <Text style={[text_center,h14]}>
                                                                                {val.label}
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </>
                                                            ))}
                                                        </ScrollView>
                                                    </View>
                                                )}
                                                {/**/}
                                                {/*예금주 입력*/}
                                                <View style={[{flex:1},mt1]}>
                                                    <TextInput style={[input,{width:"100%"}]} placeholder="예금주명" value={get_gd_order.bankSender}
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
                            <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                                <Text style={[text_light]}>관리자확인 후 결제가 가능합니다.</Text>
                            </View>
                            <Text style={[{textAlign: "center", color: "#fff", fontSize: 18,}]}>
                                수정하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAvoidingView>
            {/**--------------------------------모달(배송대기전 결제취소)------------------------**/}
            <Modal visible={isModalVisible2} animationType="slide">
                <View style={[{ paddingTop:Platform.OS === 'ios' ? 70 : 50,}]}>

                    <View style={[flex_between,ps1,pe1]} >
                        <Text style={[h18,]}>자재목록</Text>
                        <TouchableOpacity style={[flex,justify_content_end]} onPress={toggleModal2}>
                            <Close width={20} height={20}/>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={[{height:"80%",borderColor:"#EDEDF1", borderTopWidth:1}]} nestedScrollEnabled={true}>
                        {/**-----------------반복문 구간---------------------------------------**/}
                        {A_order_list.map((val, idx)=>(
                            <>
                                <View key={idx} style={[styles.CancelDetail_list_items,]} >
                                    <View style={[container]}>
                                        <View style={[d_flex, align_items_center, mb1,flex_between]}>
                                            {/*체크박스*/}
                                            <View style={{flex:1}}>
                                                {/*상품명*/}
                                                <Text style={[h14]}>{val.goods_name}</Text>
                                            </View>
                                        </View>

                                        <View style={[d_flex, align_items_center, mb1]}>
                                            <View style={[me2]}>
                                                <Image style={[styles.goods_thum]} source={{uri: `http://www.zazaero.com${val.list_img_url}`}}/>
                                            </View>
                                            <View style={[wt7,flex_between,align_items_end]}>
                                                {(val.A_sel_option.map((item,idx)=>(
                                                    <>
                                                        <View style={ms1} key={idx}>
                                                            <View style={[d_flex]}>
                                                                <Text style={[h14,fw500,{paddingBottom:10,}]}>
                                                                    기존수량 : {item.option_cnt}개
                                                                </Text>
                                                            </View>
                                                            <View>
                                                                <Text style={[h14,fw500,{paddingBottom:5,}]}>
                                                                    취소수량
                                                                </Text>
                                                                <TextInput
                                                                    style={[input]}
                                                                    onChangeText={(cancel_cnt)=>goInput(`cancel_cnt`,cancel_cnt,``,val.order_uid)}
                                                                    defaultValue={`0`}
                                                                    value={`${val.cancel_cnt}`}
                                                                    placeholder="취소수량"
                                                                    maxLength={3}
                                                                    keyboardType="numeric"
                                                                />
                                                            </View>
                                                        </View>
                                                        <View style={[justify_content_end]}>
                                                            <Text style={[h13]}>( 단가 : {Price(item.option_price)} 원)</Text>
                                                            {/*단가*/}
                                                            <Text style={[h16,text_right]}>{Price(item.option_price)} 원</Text>
                                                            {/*총금액*/}
                                                        </View>
                                                    </>
                                                )))}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </>
                        ))}
                    </ScrollView>

                    {/* 저장버튼 */}
                    <View style={[flex_between]}>
                        <View style={[wt5,ps1,pe1]}>
                            <TouchableOpacity style={[btn_outline_primary,{borderRadius:5,paddingTop:7, paddingBottom:7,}]}
                                              onPress={()=>order_Cancel(`part`)}
                            >
                                <Text style={[text_center,h18]}>발주취소</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[wt5,ps1,pe1]}>
                            <TouchableOpacity style={[btn_primary,{borderRadius:5,paddingTop:7,paddingBottom:7}]}
                                              onPress={()=>order_Cancel(`all`)}
                            >
                                <Text style={[text_white,text_center,h18]}>전체취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/**--------------------------------모달(반품신청)------------------------**/}
            <Modal visible={isModalVisible3} animationType="slide">
                <View style={[{ paddingTop:Platform.OS === 'ios' ? 70 : 30,}]}>

                    <View style={[flex_between,ps1,pe1]} >
                        <View style={[]}>
                        </View>
                        <View style={[]}>
                            <Text style={[h25,]}>반품신청</Text>
                        </View>
                        <View style={[]}>
                            <TouchableOpacity style={[flex,justify_content_end]} onPress={toggleModal3}>
                                <Close width={20} height={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView style={[{height:"85%",borderColor:"#EDEDF1", borderTopWidth:1}]} nestedScrollEnabled={true}>
                        <View style={[styles.RequestReturn]}>
                            <View style={[FormStyle.FormGroup]}>
                                <View style={[FormStyle.FormGroupItems]}>
                                    <OrderAddress/>
                                </View>
                                {/*==============배송지 가져오기==============*/}
                                <View  style={[styles.FormGroup]} >
                                    <View  style={[flex]} >
                                        <Text style={[]}>수거배송지</Text>
                                    </View>
                                    <View  style={[d_flex,mt1]} >
                                        <View  style={{flex:0.7,marginRight:10}} >
                                            <TextInput onChangeText={(refound_zonecode)=>re_goInput(`refound_zonecode`,refound_zonecode)}
                                                       placeholder="우편번호"
                                                       style={[input,bg_light]}/>
                                        </View>
                                        <TouchableOpacity style={{flex:0.3}} onPress={()=>{}}>
                                            <View style={[bg_primary, {padding:8,borderRadius:5,}]}>
                                                <Text style={[text_light,text_center,]}>주소찾기</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View  style={[mt1]} >
                                        <TextInput onChangeText={(refound_addr2)=>re_goInput(`refound_addr1`,refound_addr1)}
                                                   placeholder="주소"
                                                   style={[input,bg_light]}/>
                                    </View>
                                    <View  style={[mt1]} >
                                        <TextInput onChangeText={(refound_addr2)=>re_goInput(`refound_addr2`,refound_addr2)}
                                                   placeholder="상세주소"
                                                   style={[input]}/>
                                    </View>
                                </View>
                                {/*============================*/}
                                <View  style={[styles.FormGroup,mt2]} >
                                    <View  style={[flex]} >
                                        <Text style={[]}>반품 담당자 성명</Text>
                                    </View>
                                    <View  style={[mt1]} >
                                        <TextInput onChangeText={(refound_addr2)=>re_goInput(`refound_addr1`,refound_addr1)}
                                                   placeholder="이름을 입력해주세요."
                                                   style={[input,]}/>
                                    </View>
                                    <View  style={[flex,mt2]} >
                                        <Text style={[]}>반품 담당자 연락처</Text>
                                    </View>
                                    <View  style={[mt1]} >
                                        <TextInput onChangeText={(refound_addr2)=>re_goInput(`refound_addr1`,refound_addr1)}
                                                   placeholder="연락처를 입력해주세요."
                                                   style={[input,]}/>
                                    </View>
                                    <View  style={[flex,mt2]} >
                                        <Text style={[mb1]}>반품 사유 및 수거 요청 사항</Text>
                                    </View>
                                    <View  style={[]} >
                                        <TextInput onChangeText={(refound_memo)=>re_goInput(`refound_memo`,refound_memo)} style={[textarea]}/>
                                    </View>
                                </View>
                                <View  style={[flex,mt2]} >
                                    <Text style={[]}>반품 자재 사진 등록</Text>
                                </View>
                                <View  style={[]} >
                                    <TouchableOpacity onPress={pickImage} style={[styles.button,bg_primary]}>
                                        <Text style={[h13,text_center,text_white]}>사진 선택하기</Text>
                                    </TouchableOpacity>
                                    {(selectedImages.length > 0) ? (
                                        <>
                                            <View style={[styles.imagesContainer,{borderWidth:1,borderColor:'#000'}]}>
                                                {selectedImages.map((image, index) => (
                                                    <View key={index} style={styles.imageContainer}>
                                                        <TouchableOpacity onPress={() => removeImage(index)} style={styles.deleteButton}>
                                                            <Close width={11} height={11}/>
                                                        </TouchableOpacity>
                                                        <Image source={{ uri: `data:image/jpg;base64,${image.base64}` }} style={styles.image}  resizeMode="contain"/>
                                                    </View>
                                                ))}
                                            </View>
                                        </>
                                    ):(
                                        <>
                                            {/* 값이없을때*/}
                                        </>
                                    )}

                                </View>
                                {/*==============반품사진 등록==============*/}
                            </View>
                            {/*=======================================*/}
                            <View  style={[container]} >
                                <View  style={[flex]} >
                                    <Text style={[h18,fw500]}>반품요청 자재목록</Text>
                                </View>
                            </View>
                            <View  style={[borderBottom1]} />
                            {/**-----------------반복문 구간---------------------------------------**/}
                            {A_order_list.map((val, idx)=>(
                                <>
                                    <View key={idx} style={[styles.CancelDetail_list_items,]} >
                                        <View style={[container]}>
                                            <View style={[d_flex, align_items_center, mb1,flex_between]}>
                                                {/*체크박스*/}
                                                <View style={{flex:1}}>
                                                    {/*상품명*/}
                                                    <Text style={[h14]}>{val.goods_name}</Text>
                                                </View>
                                            </View>

                                            <View style={[d_flex, align_items_center, mb1]}>
                                                <View style={[me2]}>
                                                    <Image style={[styles.goods_thum]} source={{uri: `http://www.zazaero.com${val.list_img_url}`}}/>
                                                </View>
                                                <View style={[wt7,flex_between,align_items_end]}>
                                                    {(val.A_sel_option.map((item,idx)=>(
                                                        <>
                                                            <View style={ms1} key={idx}>
                                                                <View style={[d_flex]}>
                                                                    <Text style={[h14,fw500,{paddingBottom:10,}]}>
                                                                        기존수량 : {item.option_cnt}개
                                                                    </Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={[h14,fw500,{paddingBottom:5,}]}>
                                                                        반품수량
                                                                    </Text>
                                                                    <TextInput
                                                                        style={[input]}
                                                                        onChangeText={(cancel_cnt)=>goInput(`cancel_cnt`,cancel_cnt,``,val.order_uid)}
                                                                        defaultValue={`0`}
                                                                        value={`${val.cancel_cnt}`}
                                                                        placeholder="반품수량"
                                                                        maxLength={3}
                                                                        keyboardType="numeric"
                                                                    />
                                                                </View>
                                                            </View>
                                                            <View style={[justify_content_end]}>
                                                                <Text style={[h13]}>( 단가 : {Price(item.option_price)} 원)</Text>
                                                                {/*단가*/}
                                                                <Text style={[h16,text_right]}>{Price(item.option_price)} 원</Text>
                                                                {/*총금액*/}
                                                            </View>
                                                        </>
                                                    )))}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </>
                            ))}

                        </View>

                    </ScrollView>

                    {/* 저장버튼 */}
                    <View style={[flex_between]}>
                        <View style={[wt5,ps1,pe1]}>
                            <TouchableOpacity style={[btn_outline_primary,{borderRadius:5,paddingTop:7, paddingBottom:7,}]}
                                              onPress={()=>order_Cancel(`part`)}
                            >
                                <Text style={[text_center,h18]}>반품신청</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[wt5,ps1,pe1]}>
                            <TouchableOpacity style={[btn_primary,{borderRadius:5,paddingTop:7,paddingBottom:7}]}
                                              onPress={()=>order_Cancel(`all`)}
                            >
                                <Text style={[text_white,text_center,h18]}>전체반품</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </Modal>
        </>
    );

    function OrderTotalPrice() {
        /**----------------총 결제금액은 자재가격 + 요청옵션비 + 배송비 + 포인트----------------**/
            // 총 결제금액
        let Settlekindprice = Number(get_gd_order.goodsprice)+Number(get_gd_order.deli_price)+Number(get_gd_order.tot_opt_price);
        let cancel_detail = () => {
            console.log('[주문취소 상세페이지로 이동]');
            let data = {
                gd_order_uid    :get_gd_order.gd_order_uid,
                gd_cancel_uid   :get_gd_order.gd_cancel_uid
            }
            return navigation.navigate(`취소내역상세`,data);
        }

        return(
            <>
                <View>


                    {/**--------------결제정보---------------**/}
                    <View style={container}>
                        {(
                            get_gd_order.ord_status === 'pay_done'   ||
                            get_gd_order.ord_status === 'deli_ready' ||
                            get_gd_order.ord_status === 'deli_doing' ||
                            get_gd_order.ord_status === 'deli_done'
                        ) && (
                            <>
                                {(cancel_doing > 0) && (
                                    <>
                                        <View style={[]}>
                                            <TouchableOpacity onPress={cancel_detail} style={[mb3]}>
                                                <View style={[btn_danger,wt10,{borderRadius:10,}]}>
                                                    <Text style={[h16,text_white,text_center,pt1,pb1]}>주문취소 상세보기</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </>
                        )}
                        {/*주문취소시 상세내역으로 가는 버튼*/}
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
        backgroundColor :"#B1B2C3",
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
    // imagesContainer: {
    //     flexDirection: 'row',
    //     flexWrap: 'wrap',
    //     marginTop: 20,
    //     justifyContent:"center",
    // },
    image: {
        width: 160,
        height: 220,
        margin: 5,
        borderWidth:1,
        borderColor:"#ccc",
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        justifyContent:"center",
    },
    imageContainer: {
        position: 'relative',
        width: 160,
        height: 220,
        marginRight: 10,
        marginBottom: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: -5,
        zIndex: 1,
        backgroundColor:'red',
        borderRadius:100,
        padding:7,
    },

});