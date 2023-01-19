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

    

    /**--------------------------------------필수 정보사항--------------------------------------------------**/
    const {order_uid, addr1, zonecode} = route.params;
    const [Member, setMember]          = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    /**--------------------------------------상태값 셋팅--------------------------------------------------**/
    const [modAddr,       setmodAddr]              = useState('add');  // 최근배송지, 신규배송지 상태정의
    const [OrderTitle,    setOrderTitle]           = useState([]);    // 최근배송지 가져오기
    const [Selected,      setSelected]             = useState([]);    // 최근배송지 가져오기
    const [Select,        setSelect]               = useState([]);
    const [Hope, setHope]                          = useState({
        hopeDate    :'',
        hopeTime    :'',
    });
    const Update = useIsFocused();
    /**--------------------------------------주문서 셋팅--------------------------------------------------**/
    const [OrderData, setOrderDate]                = useState({
        act_type                    :"ins_order",           // 주문추가하기 로직
        order_uid                   :'',             // 주문번호
        login_status                :'',
        A_order_uid                 :'',
        mgr_mem_uid                 :'',
        mem_uid                     :'',                // 회원 uid
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
        zonecode                    :'',              // 배송지 우편번호
        addr1                       :'',                 // 배송지 주소1
        addr2                       :'',                    // 배송지 주소2 상세주소
        deli_price                  :'',                    // 배송비
        deli_mem_name               :'',                    // 배송자명
        deli_mem_mobile             :'',                    // 배송자 전화번호
        make_price                  :'',                    // 제작비
        hope_opt_price              :'',                    // 옵션요청비
        tot_order_price             :'',            // 상품합계
        settleprice                 :'',            // 상품합계

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
    /**---------------------------------장바구니 정보 유틸에서 출력---------------------------------------------------**/
    const getCartList = () => {
        let order_result_uid = order_uid.map(val=>val.order_uid);

        axios.post('http://49.50.162.86:80/ajax/UTIL_app_order.php', {
            act_type        : "get_order_ready",
            // mem_uid         : Member,
            order_uid       : order_result_uid,         // 배열로감
        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                console.log(res.data);
                const {result} = res.data;
                if (result === 'OK') {

                } else {
                    console.log('실패');
                }
            }
        });

    }

    /**---------------------------------페이지 진입시 노출---------------------------------------------------**/
    useEffect(() => {
        daumApi();
        getCartList();
    },[Update]);

    // console.log(OrderData, '/ 주문정보 ');
    return (
        <>

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