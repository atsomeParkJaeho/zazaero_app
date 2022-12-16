import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Button,
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
} from 'react-native';

import {SelectList} from 'react-native-dropdown-select-list'
//셀렉트박스



//다음주소 api

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
    count_btn_txt, pos_center, switch_bar, pt3, pb3, zonecode, wt7, wt3, ps1, h18, mb2, btn_outline_black,
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
import {bankAccount} from "../../util/util";




export default function OrderDetail({navigation, route}) {

    //1.
    const [selected, setSelected] = useState("");
    const [OrderDetail, setOrderDetail]  = useState({
        order_title                  :"",    //공사명
        addr1                        :"",   // 주소1
        addr2                        :"",   // 주소2 상세
        zonecode                     :"",   // 우편번호
        recv_name                    :"",   // 현장인도자 성명
        recv_phone                   :"",   // 현장인도자 연락처
        order_memo                   :"",   // 배송메모
        bankSender                   :"",   // 입금자명 확인
    })


    //2. 입력폼 체크루틴
    const ChkInput = (keyValue, text)   =>{
        //기본 루틴
        setOrderDetail({
            ...OrderDetail,
            [keyValue]:text,
        })
    }

    console.log(OrderDetail);

    const order_Cate_List = [

        {
            "ct_user_id": "1",                                  //아이디값
            "ct_tit": "일반석고보드 9.5T X 900 X 1800",           //상품명
            "ct_img": col1,                                  //이미지
            "ct_price": "13,000",                                //판매가
            "ct_disc": "주문시 3일이내 배송가능",                                //간략설명
            "ct_count": "1",                                    //상품갯수
            "ct_Request": "확인중",                                    //요청사항금액
        },
        {
            "ct_user_id": "1",                                  //아이디값
            "ct_tit": "도배장판",           //상품명
            "ct_img": col2,                                  //이미지
            "ct_price": "50,000",                                //상품가격
            "ct_disc": "즉시발주 가능",                                //상품가격
            "ct_count": "1",                                    //상품갯수
            "ct_Request": "8,000 원",                                    //요청사항금액
        },
        {
            "ct_user_id": "1",                                  //아이디값
            "ct_tit": "롤하스롤 벽지",           //상품명
            "ct_img": col3,                                  //이미지
            "ct_price": "9,500",                                //상품가격
            "ct_disc": "주문시 7일이내 배송가능",                                //상품가격
            "ct_count": "1",                                    //상품갯수
            "ct_Request": "15,000 원",                                    //요청사항금액
        },

    ];
    const [state,setState] = useState(order_Cate_List);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    //스위치

    let order_num = "A_123451231";


    var radio_props = [
        {label: 'param1', value: 0 },
        {label: 'param2', value: 1 }
    ];

    const cardCheck = (order_num) => {
        Alert.alert(
            '카드결제',
            '발주번호 : '+order_num+'\n'+'총금액 : 1,500,000 원',
            [
                {text: '취소', onPress: () => {}, style: 'cancel'},
                {
                    text: '삭제',
                    onPress: () => {
                        onDelete(id);
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
                            <Text style={[styles.OrderDetail_txt,h16,text_center]}>결제 대기중 입니다. </Text>
                        </View>
                    </View>
                    {/*==============발주 내역을 확인==============*/}
                    <View style={[FormStyle.FormGroup]}>
                        <View style={[pb2]}>
                            <Text style={[styles.OrderDetail_txt,h16,pb1]}>발주번호 </Text>
                            <Text style={[styles.OrderDetail_txt,h16,fw500]}>{order_num} </Text>
                        </View>
                        {/*발주번호*/}
                        <View style="">
                            <Text style={[styles.OrderDetail_txt,h16,pb1]}>공사명 </Text>
                            <TextInput style={[input,styles.input_wt]}
                                       onChangeText={(order_title)=>ChkInput("order_title",order_title)}
                                       value={OrderDetail.order_title} />
                        </View>
                        {/*발주번호*/}
                    </View>

                    <View style={[FormStyle.FormGroup]}>
                        <View>
                            <View style={[FormStyle.FormGroupItems]}>
                                <Text style={[FormStyle.FormLabel]}>배송지</Text>
                                <View  style={[flex,mt1]} >
                                    <View  style={[wt7]} >
                                        <TextInput style={[input]} value="" />
                                    </View>
                                    <View  style={[wt3,ps1]} >
                                        <TouchableOpacity style={[styles.addr_btn]}>
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
                                    <Text style={[FormStyle.FormLabel]}>상세주소</Text>
                                    <TextInput style={[input]}
                                               onChangeText={(addr1)=>ChkInput("addr1",addr1)}
                                               value={OrderDetail.addr1}
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
                            <Text style={[FormStyle.FormDateLabel]}>2022-12-12</Text>
                        </View>
                        {/*==============캘린더==============*/}
                        <View style={[FormStyle.FormGroup]}>

                        </View>

                    </View>
                    {/*==============희망배송시간==============*/}
                    <View>
                        {/*==============제목==============*/}
                        <View style={[d_flex, align_items_center, FormStyle.FormDate, {justifyContent:"space-between"}]}>
                            {/*체크박스*/}
                            <Text style={[FormStyle.FormDateLabel]}>도착시간</Text>
                            <Text style={[FormStyle.FormDateLabel]}>2022-12-12</Text>
                        </View>
                        {/*==============시간입력==============*/}
                        <View style={[FormStyle.FormGroup]}>
                            <View style={[d_flex, justify_content_center]}>
                                {/*오전, 오후*/}
                                <View></View>
                                {/*시*/}
                                <TextInput style={[input]}/>
                                {/*분*/}
                                <TextInput style={[input]}/>
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
                            {state.map((items,i) =>
                                <View style={[styles.order_goods_list_items,]} key={i}>
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
                                        <TextInput style={textarea}   multiline={true} numberOfLines={4}    placeholder="" value=""/>
                                        <Text style={[mt1,h12,styles.text_r]}>요청사항 금액 : <Text style={[h12,,text_danger]}>{items.ct_Request} </Text></Text>
                                    </View>
                                    <View style={[styles.border_b1]} />
                                </View>
                            )}
                        </View>
                        <View style={[container]}>
                            <View style={[flex_around]}>
                                <TouchableOpacity style="" >
                                    <Text style={[styles.btn,btn_outline_primary]}>자재추가</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style="" >
                                    <Text style={[styles.btn,btn_outline_danger]}>전체취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[gray_bar]} />
                        <View style={container}>
                            <Text style={[h18,mb2]}>결제유형</Text>

                            <View style={[flex_around]}>
                                <TouchableOpacity style="" >
                                    <Text style={[styles.btn,btn_outline_black]}>무통장 입금</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style="" onPress={() => cardCheck(order_num)}>
                                    <Text style={[styles.btn,btn_outline_black]}>카드 결제</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[]}>
                                <SelectList
                                    setSelected={(val) => setSelected(val)}
                                    data={bankAccount}
                                    onSelect={(selected)=>ChkInput("addr_name",selected)}
                                    defaultOption={{key: '입금계좌를 선택해주세요', value: '입금계좌를 선택해주세요'}}
                                    save="value"
                                />
                                <TextInput style={[input]}
                                           onChangeText={(bankSender)=>ChkInput("bankSender",bankSender)}
                                           value={OrderDetail.bankSender}
                                           placeholder="입금자명 입력"/>
                            </View>
                        </View>
                        <View style={[padding_bottom]} />
                    </View>
                </View>

            </ScrollView>
            <View style={[bg_gray,pt3,pb3]}>
                <TouchableOpacity >
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