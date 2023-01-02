import React, {useState, useEffect} from 'react';
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
    TouchableWithoutFeedback, Switch, Alert
} from 'react-native';
//다음주소 api
import Postcode from '@actbase/react-daum-postcode';
import CalendarStrip from 'react-native-calendar-strip';
import { Calendar, CalendarList ,Agenda } from 'react-native-calendars';
import * as PropTypes from "prop-types";
import 'moment';
import 'moment/locale/ko';
import DateTimePickerModal from "react-native-modal-datetime-picker";


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
    count_btn_txt, pos_center, switch_bar, pt3, pb3, zonecode, wt7, wt3, ps1, h22, h20, pe1, h14, bg_light,
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
import {useIsFocused} from "@react-navigation/native";


export default function OrderDetail({navigation, route}) {

    let {orderType} = route.params;
    console.log('발주상태내역'+orderType);
    // 발주상태내역

    const [Member, setMember] = useState();
    const Update = useIsFocused();

    const {order_uid, zonecode, addr1} = route.params;

    console.log(route.params);

    //1.
    const [OrderDetail, setOrderDetail]  = useState({
        order_uid                   :order_uid,             // 주문번호
        order_title                  :"",    //공사명
        zonecode                     :zonecode,   // 우편번호
        addr1                        :addr1,   // 주소1
        addr2                        :"",   // 주소2 상세
        deli_date               :'',   // 도착일
        deli_time               :'',   // 도착시간
        recv_name                    :"",   // 현장인도자 성명
        recv_phone                   :"",   // 현장인도자 연락처
        order_memo                   :"",   // 배송메모
        hope_deli_date               :"",   //도착일
    })

    // 2. 주소 입력시 업데이트
    useEffect(()=>{
        setOrderDetail({
            ...OrderDetail,
            order_title    :"호반베르디움 102동 604호 아파트리모델링",
            zonecode        :"05681",
            addr1           :"경기 성남시 분당구 구미로 16 호반베르디움",
            addr2           :"1305동 608호",
            deli_time       :"14:30",
            recv_name       :"홍길동",
            recv_phone      :"010-1234-5678",
            order_memo      :"물건 내릴장소를 치워야하니 도착10분전 전화주세요"
        });
    },[Update,Member]);

    //2. 입력폼 체크루틴
    const ChkInput = (keyValue, text)   =>{
        //기본 루틴
        setOrderDetail({
            ...OrderDetail,
            [keyValue]:text,
        })
    }




    const [Hope, setHope]                   = useState({
        hopeDate    :'',
        hopeTime    :'',
    });       // 희망배송일시 설정,

    // 2_1. 주문정보 입력상태 설정
    const goInput = (keyValue, e) => {


        if(keyValue === 'zonecode') {
            setOrderDetail({
                ...OrderDetail,
                zonecode:e,
            });
        }

        if(keyValue === 'addr1') {
            setOrderDetail({
                ...OrderDetail,
                addr1:e,
            });
        }

        setOrderDetail({
            ...OrderDetail,
            [keyValue]:e,
        });
    }

    const order_Cate_List = [

        {
            "ct_user_id": "1",                                  //아이디값
            "order_num": "A_123451231",                                  //발주번호
            "ct_tit": "일반석고보드 9.5T X 900 X 1800",           //상품명
            "ct_img": col1,                                  //이미지
            "ct_price": "13,000",                                //판매가
            "ct_disc": "주문시 3일이내 배송가능",                                //간략설명
            "ct_count": "1",                                    //상품갯수
            "ct_Request": "확인중",                                    //요청사항금액
            "goods_memo": "자재 3단으로 재단해주세요",              //자재요청메모
        },
        {
            "ct_user_id": "1",                                  //아이디값
            "order_num": "A_123451231",                                  //발주번호
            "ct_tit": "도배장판",           //상품명
            "ct_img": col2,                                  //이미지
            "ct_price": "50,000",                                //상품가격
            "ct_disc": "즉시발주 가능",                                //상품가격
            "ct_count": "1",                                    //상품갯수
            "ct_Request": "확인중",                                    //요청사항금액
            "goods_memo": "자재 가로30cm x 세로 170cm  재단해주세요",              //자재요청메모
        },
        {
            "ct_user_id": "1",                                  //아이디값
            "order_num": "A_123451231",                                  //발주번호
            "ct_tit": "롤하스롤 벽지",           //상품명
            "ct_img": col3,                                  //이미지
            "ct_price": "9,500",                                //상품가격
            "ct_disc": "주문시 7일이내 배송가능",                                //상품가격
            "ct_count": "1",                                    //상품갯수
            "ct_Request": "확인중",                                    //요청사항금액
            "goods_memo": "자재 3단으로 재단해주세요",              //자재요청메모
        },

    ];
    const [state,setState] = useState(order_Cate_List);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    //스위치


    const goDel= (order_num) => {
        Alert.alert(
            '전체취소',
            '발주번호 : A_123451231',
            [
                {text: '취소', onPress: () => {}, style: 'cancel'},
                {
                    text: '삭제',
                    onPress: () => {
                        Alert.alert("취소완료 되었습니다.");
                    },
                    style: 'destructive',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => {},
            },
        );
    };
    //전체취소

    const goCheck= (orderType) => {
        //console.log(orderType);
        if(orderType === 'ready'){
            Alert.alert(
                '변경하신 내용으로 수정발주 요청하시겠습니까?',
                '',
                [
                    {text: '취소', onPress: () => {}, style: 'cancel'},
                    {
                        text: '확인',
                        onPress: () => {
                            Alert.alert("수정발주 되었습니다.");
                        },
                        style: 'destructive',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => {},
                },
            );
        }else if(orderType === 'request'){
            Alert.alert(
                '검수중',
                '내용을 변경하실 수 없습니다.',
                [
                    {text: '확인', onPress: () => {}, style: 'cancel'},
                ],
                {
                    cancelable: true,
                    onDismiss: () => {},
                },
            );
        }

    };
    //수정발주요청

    console.log(OrderDetail);

    return (
        <>

        {/*    */}
            <ScrollView style={[bg_white]}>
                <View style={[styles.OrderDetail]}>
                    {/*<View style={styles.sub_top_inner}>*/}
                    {/*    <View style={[flex_around]}>*/}
                    {/*        <View style="">*/}
                    {/*            <TouchableOpacity style={styles.link_signUp} onPress={() => {navigation.navigate('검색')}}>*/}
                    {/*                <BackArrow width={22} height={18} style={[styles.center]} />*/}
                    {/*            </TouchableOpacity>*/}
                    {/*        </View>*/}
                    {/*        <View style="">*/}
                    {/*            <Text style={styles.selectGroup_txt}>상세내역</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style="">*/}
                    {/*         */}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    {/*==============서브 탑 영역==============*/}
                    <View style={[FormStyle.FormGroup]}>
                        <View style={[container]}>
                            {(orderType == 'ready') ? (
                                <Text style={[styles.OrderDetail_txt,h16,text_center]}>발주 내역을 확인하고 있습니다. </Text>
                                // 발주 신청중 문구
                            ) : (
                                <Text style={[styles.OrderDetail_txt,h16,text_center]}>발주 <Text style={[text_primary,h20]}>검수중 </Text> 입니다. </Text>
                            // 발주 검수중 문구
                            )}
                        </View>
                    </View>
                    {/*==============발주 내역을 확인==============*/}
                    <View style={[FormStyle.FormGroup]}>
                        <View style={[pb2]}>
                            <Text style={[styles.OrderDetail_txt,h16,pb1]}>발주번호 </Text>
                            <Text style={[styles.OrderDetail_txt,h16,fw500]}>A_123451231 </Text>
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
                                                  value={zonecode}
                                                  onChangeText={(zonecode)=>goInput("zonecode",zonecode)}
                                                  returnKeyType="next"
                                                  placeholder="우편번호"
                                                   />
                                   </View>
                                   <View  style={[wt3,ps1]} >
                                       <TouchableOpacity style={[styles.addr_btn]} onPress={()=>navigation.navigate('주소검색',{page:"발주상세", order_uid:order_uid})}>
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
                            <Text style={[FormStyle.FormDateLabel]}>{OrderDetail.deli_time}</Text>
                        </View>
                        {/*==============시간입력==============*/}
                        <View style={[FormStyle.FormGroup]}>
                            <View style={[d_flex, justify_content_center]}>
                                <TextInput style={[input]}
                                           onChangeText={(deli_time)=>goInput("deli_time",deli_time)}
                                           placeholder="도착시간"
                                           value={OrderDetail.deli_time}
                                           blurOnSubmit={false}
                                />
                                {/*시간*/}
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
                                           placeholder="홍길동"/>
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
                                           placeholder="도착지 건물 지하주차장에 내려주세요 "/>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.order_goods_list_sec]}>
                        {/*<View style={[flex,styles.border_b_dotted,container]}>*/}
                        {/*    <Shippingicon  width={34} height={20} style={[styles.icon]}/>*/}
                        {/*    <Text style={[FormStyle.FormLabel]}>직접배송</Text>*/}
                        {/*</View>*/}
                        <View style={[styles.order_goods_list]}>
                            {state.map((items,idx) =>
                                <View style={[styles.order_goods_list_items,]} key={idx+1}>
                                    <View style={[container]}>
                                        <View style={[flex_between_top]}>
                                            <View style={flex_top}>
                                                <Image style={styles.cart_goods_img} source={items.ct_img}/>
                                                <View style={[ms1]}>
                                                    <Text style={[mt1]}>{items.ct_tit}</Text>
                                                    <Text style={[h12,mt1,text_primary,fw300]}>{items.ct_disc}</Text>
                                                </View>
                                            </View>
                                            <View style={[]}>
                                                <TouchableWithoutFeedback >
                                                    <CloseBtn  width={15} height={15} style={[mt1,styles.icon]}/>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                        <View style={[flex_between,mt1]}>
                                            <View style={flex}>
                                                <TouchableWithoutFeedback >
                                                    <View style={[count_btn]}>
                                                        <View style={[pos_center]}>
                                                            <Text style={[count_btn_txt]}>－</Text>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TextInput style={[countinput,]}  value="1" />
                                                <TouchableWithoutFeedback >
                                                    <View style={[count_btn]}>
                                                        <View style={[pos_center]}>
                                                            <Text style={[count_btn_txt]}>＋</Text>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <View style="">
                                                <Text style={[h12,]}>( 판매가:{items.ct_price} 원 )</Text>
                                                <Text style={[h16,fw500,styles.text_r]}>{items.ct_price} 원</Text>
                                            </View>
                                        </View>
                                        <View style={[mt2,flex_between]}>
                                            <Text style={styles.Request_txt}>이 자재에 모델명, 제작관련 등 요청사항이 있으신가요?</Text>
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#4630eb" }}
                                                thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch}
                                                value={isEnabled}
                                                style={[switch_bar]}
                                            />
                                        </View>
                                        <TextInput style={textarea}   multiline={true} numberOfLines={4}    placeholder="" value={items.goods_memo}/>
                                        <Text style={[mt1,h12,styles.text_r]}>요청사항 금액 : <Text style={[h12,,text_danger]}>{items.ct_Request} </Text></Text>
                                    </View>
                                   <View style={[styles.border_b1]} />
                                </View>
                            )}
                        </View>
                        <View style={[container]}>
                            <View style={[flex_around]}>
                                <TouchableOpacity style=""  onPress={()=> {navigation.navigate('즐겨찾기')}}>
                                    <Text style={[styles.btn,btn_outline_primary]}>자재추가</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style="" onPress={()=>goDel()}>
                                    <Text style={[styles.btn,btn_outline_danger]}>전체취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[padding_bottom]} />
                    </View>
                </View>

            </ScrollView>
            <View style={[bg_gray,pt3,pb3]}>
                <TouchableOpacity style={[]} onPress={()=> goCheck(orderType)}>
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
    }
});