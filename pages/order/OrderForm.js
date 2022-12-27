import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, CheckBox, Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';
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
    justify_content_center, align_items_center, text_light, text_dark, bg_gray, justify_content_between, ms1, ms2
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



export default function OrderForm({route,navigation}) {

    console.log('전달 값 / ',route.params);

    const {order_uid} = route.params;


    console.log(route.params.zonecode);

    // 1. 주문정보 상태 설정
    const [OrderData, setOrderDate] = useState({
        mem_name:'',                    // 담당자 이름
        mem_uid:'',                     // 회원 uid
        mem_mobile:'',                  // 담당자 전화번호
        addr1:'',                       // 주소1
        addr2:'',                       // 주소2
        zonecode:'',                    // 다음 api 우편번호
        project_title:'',               // 공사명
        hope_deli_date:'',              // 희망배송일
        hope_deli_time:'',              // 희망배송시간
        recv_name:'',                   // 현장인도자 이름
        recv_phone:'',                  // 현장인도자 전화번호
        order_memo:'',                  // 배송시 요청사항 메모
    });
    const [modAddr, setmodAddr] = useState('mod');  // 최근배송지, 신규배송지 상태정의

    // 2. 주문정보 입력상태 설정
    const goInput = (keyValue, e) => {
        setOrderDate({
            ...OrderData,
            [keyValue]:e,
        });
    }


    // 6. 발주신청
    const goForm = () => {
        axios.post('', {

        },{
            headers:{
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                alert('발주신청이 완료되었습니다.');
                navigation.navigate('발주내역');
            } else {
                alert('주문실패');
            }
        });
    }


    console.log()


    console.log(OrderData);
    console.log(modAddr);

    return (
        <>
            <ScrollView style={[bg_white]}>

                <View>
                    {/*==============최근배송지 불러오기==============*/}
                    <View style={[FormStyle.FormGroup]}>
                        <View>
                            <View style={[flex]}>
                                <View style={[flex]}>
                                    <View style={[styles.border]}>
                                        <TouchableOpacity onPress={()=>setmodAddr('mod')}>
                                            <View style={[flex]}>
                                                <RadioButton
                                                    status={modAddr === 'mod' ? 'checked':'unchecked'}
                                                    value="mod"
                                                    onPress={()=>setmodAddr('mod')}
                                                />
                                                <Text>최근 배송지 불러오기</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[flex]}>
                                    <View style={[styles.border]}>
                                        <TouchableOpacity onPress={()=>setmodAddr('add')}>
                                            <View style={[flex]}>
                                                <RadioButton
                                                    status={modAddr === 'add' ? 'checked':'unchecked'}
                                                    value="add"
                                                    onPress={()=>setmodAddr('add')}
                                                />
                                                <Text>신규 배송지 입력</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/*==============신규배송지 입력==============*/}
                    <View style={[FormStyle.FormGroup]}>
                        {/*==============제목==============*/}
                        <View>
                            {/*체크박스*/}
                            <Text style={[FormStyle.FormTitle]}>신규 배송지 입력</Text>
                        </View>
                        {/*==============배송지 입력==============*/}
                        <View>
                            {/*공사명*/}
                            <View style={[FormStyle.FormGroupItems]}>
                                <Text style={[FormStyle.FormLabel]}>공사명</Text>
                                <TextInput style={[FormStyle.InputStyle]}
                                           onChangeText={(project_title)=>goInput("project_title",project_title)}
                                           placeholder="ex)공사명 입력"
                                           value={OrderData.project_title}/>

                            </View>
                            {/*==============배송지 주소===============*/}
                            <View style={[FormStyle.FormGroupItems]}>
                                <Text style={[FormStyle.FormLabel]}>배송지</Text>
                                <View style={[d_flex,align_items_center]}>
                                    <TextInput style={[FormStyle.InputStyle,{flex:1,marginRight:16,}]}
                                               onChangeText={(zonecode)=>goInput("zonecode",zonecode)}
                                               placeholder="배송지"
                                               value={OrderData.zonecode}/>
                                    <TouchableOpacity onPress={()=>navigation.navigate('주소검색',{order_uid:order_uid})}>
                                        <View style={[bg_primary,{padding:10,}]}>
                                            <Text style={[text_light]}>주소찾기</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/*================주소============*/}
                            <View style={{paddingBottom:15,}}>
                                <TextInput style={[FormStyle.InputStyle,{flex:1}]} onChangeText={(addr1)=>goInput("addr1",addr1)} placeholder="주소" value={OrderData.addr1}/>
                            </View>
                            {/*============상세주소=================*/}
                            <View>
                                <TextInput style={[FormStyle.InputStyle,{flex:1}]} onChangeText={(addr2)=>goInput("addr2",addr2)} placeholder="상세주소" value={OrderData.addr2}/>
                            </View>
                            {/*다음 api 주소 팝업*/}

                            <View>
                                <Postcode
                                    style={{ flex: 1, width: '100%', zIndex: 999 }}
                                    jsOptions={{ animation: true }}
                                    onSelected={data => getAddressData(data)}
                                    onError={(error)=>console.log(error)}
                                />
                            </View>

                        </View>
                    </View>
                    {/*==============희망배송일==============*/}
                    <View>
                        {/*==============제목==============*/}
                        <View style={[d_flex, align_items_center, FormStyle.FormDate, {justifyContent:"space-between"}]}>
                            {/*체크박스*/}
                            <Text style={[FormStyle.FormDateLabel]}>도착일</Text>
                            <Text style={[FormStyle.FormDateLabel]}>{OrderData.hope_deli_date}</Text>
                        </View>
                        {/*==============캘린더==============*/}
                        <View style={[FormStyle.FormGroup]}>
                            <CalendarStrip
                                scrollable
                                onDateSelected={(Date)=>
                                    setOrderDate({
                                        ...OrderData,
                                        hope_deli_date: String(Date.format('M'+'월'+'D'+'일')),
                                    })
                                }
                                minDate={`2020-12-31`}
                                maxDate={`2024-12-31`}
                                style={{height:150, paddingTop: 20, paddingBottom: 10}}
                                daySelectionAnimation={{
                                    type:"background",
                                    highlightColor:"#3D40E0",
                                }}
                                highlightDateNumberStyle={{color:"#fff"}}
                                highlightDateNameStyle={{color:"#fff"}}
                            />
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
                    <View style={[FormStyle.FormGroup]}>
                        {/*==============현장인도자 연락처==============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <View>
                                <Text style={[FormStyle.FormLabel]}>현장인도자 연락처</Text>
                                <TextInput style={[FormStyle.InputStyle,{flex:1}]}
                                           onChangeText={(recv_name)=>goInput("recv_name",recv_name)}
                                           placeholder="ex)홍길동"
                                           value={OrderData.recv_name}/>
                            </View>
                        </View>
                        {/*==============배송 요청 사항==============*/}
                        <View style={[FormStyle.FormGroupItems]}>
                            <View>
                                <Text style={[FormStyle.FormLabel]}>배송 요청 사항</Text>

                                <TextInput style={[FormStyle.InputStyle,{flex:1}]}
                                           onChangeText={(order_memo)=>goInput("order_memo",order_memo)}
                                           placeholder="배송요청사항"
                                           value={OrderData.order_memo}/>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/*============배송정보 입력시 활성화=============*/}
            <View style={
                [bg_gray,
                    {paddingTop:6, paddingBottom:38,}
                ]
            }
            >
                <TouchableOpacity onPress={() => navigation.navigate("배송정보등록")}>
                    <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                        <Text style={[text_light]}>관리자확인 후 결제가 가능합니다.</Text>
                    </View>
                    <Text style={[{textAlign: "center", color: "#fff", fontSize: 18,}]}>
                        발주요청
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
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