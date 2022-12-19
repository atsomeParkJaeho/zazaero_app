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
    switch_bar,
    count_btn, pos_center, count_btn_txt,
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


export default function DeliDetail({navigation, route}) {

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
            "ct_disc": "간략설명",                                //상품가격
            "ct_count": "1",                                    //상품갯수
            "ct_Request": "8,000 원",                                    //요청사항금액
        },
        {
            "ct_user_id": "1",                                  //아이디값
            "ct_tit": "롤하스롤 벽지",           //상품명
            "ct_img": col3,                                  //이미지
            "ct_price": "9,500",                                //상품가격
            "ct_disc": "간략설명",                                //상품가격
            "ct_count": "1",                                    //상품갯수
            "ct_Request": "15,000 원",                                    //요청사항금액
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
                            <Text style={[styles.OrderDetail_txt,h16,text_center]}>배송 대기중 입니다. </Text>
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
                            <TextInput style={[input,styles.input_wt]}   placeholder=""  value="호반베르디움 102동 604호 아파트리모델링" />
                        </View>
                        {/*발주번호*/}
                    </View>

                    <View style={[FormStyle.FormGroup]}>
                        <View>
                            <View style={[FormStyle.FormGroupItems]}>
                                <Text style={[FormStyle.FormLabel]}>배송지</Text>
                                <View style={[d_flex,align_items_center]}>
                                    <TextInput style={[FormStyle.InputStyle,{flex:1,marginRight:16,}]} placeholder="배송지"/>
                                    <TouchableOpacity>
                                        <View style={[bg_primary,{padding:10,}]}>
                                            <Text style={[text_light]}>주소찾기</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/*==============배송지==============*/}
                            <View style={[FormStyle.FormGroupItems]}>
                                <View>
                                    <Text style={[FormStyle.FormLabel]}>상세주소</Text>
                                    <TextInput style={[FormStyle.InputStyle,{flex:1}]} placeholder="1304동 502호"/>
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
                                <TextInput style={[FormStyle.InputStyle,{flex:1,marginRight:16,}]}/>
                                {/*분*/}
                                <TextInput style={[FormStyle.InputStyle,{flex:1}]}/>
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
                                <TextInput style={[FormStyle.InputStyle,{flex:1}]} placeholder="홍길동"/>
                            </View>
                        </View>
                        {/*==============현장인도자 연락처==============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <View>
                                <Text style={[FormStyle.FormLabel]}>현장인도자 연락처</Text>
                                <TextInput style={[FormStyle.InputStyle,{flex:1}]} placeholder="010-1234-1234"/>
                            </View>
                        </View>
                        {/*==============배송 요청 사항==============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <View>
                                <Text style={[FormStyle.FormLabel]}>배송 요청 사항</Text>
                                <TextInput style={[FormStyle.InputStyle,{flex:1}]} placeholder="도착지 건물 지하주차장에 내려주세요"/>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.order_goods_list_sec]}>
                        <View style={[flex,styles.border_b_dotted,container]}>
                            <Shippingicon  width={34} height={20} style={[styles.icon]}/>
                            <Text style={[FormStyle.FormLabel]}>직접배송</Text>
                        </View>
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
                                                <TextInput style={[countinput,]}   value="1" />
                                                <TouchableWithoutFeedback >
                                                    <View style={[count_btn]}>
                                                        <View style={[pos_center]}>
                                                            <Text style={[count_btn_txt]}>＋</Text>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <View style="">
                                                <Text style={[h12,]}>( 판매가:{items.ct_price} )</Text>
                                                <Text style={[h16,fw500]}>{items.ct_price} 원</Text>
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
                                <TouchableOpacity style="" onPress={()=>goDel()}>
                                    <Text style={[styles.btn,btn_outline_danger]}>전체취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[padding_bottom]} />
                    </View>
                </View>

            </ScrollView>


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
    button: {
        alignItems: "center",
        backgroundColor: "#eee",
        padding: 8,
        borderWidth:1,
        borderTopLeftRadius:100,
        borderTopRightRadius:100,
        borderBottomLeftRadius:100,
        borderBottomRightRadius:100,
        borderColor:"#eee",

    },
    button_txt:{
        fontSize:12,
        fontWeight:"500",
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