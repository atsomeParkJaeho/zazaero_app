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

import { Calendar, CalendarList } from 'react-native-calendars';
import {CalKR} from "../../util/util";

export default function OrderForm({route,navigation}) {

    // 1. 주문정보 상태 설정
    const [OrderData, setOrderDate] = useState({
        mem_name:'', // 담당자 이름
        mem_uid:'', // 회원 uid
        mem_mobile:'',  // 담당자 전화번호
        addr1:'',       // 주소1
        addr2:'',       // 주소2
        zonecode:'',    // 다음 api 우편번호
        project_title:'',   // 공사명
        hope_deli_date:'',  // 희망배송일
        hope_deli_time:'',  // 희망배송시간
        recv_name:'',       // 현장인도자 이름
        recv_phone:'',      // 현장인도자 전화번호
        order_memo:'',      // 배송시 요청사항 메모
    });

    // 2. 주문정보 입력상태 설정
    const goInput = (keyValue, e) => {
        setOrderDate({
            ...OrderData,
            [keyValue]:e,
        });
    }

    // 3. 발주신청
    const goForm = () => {
        axios.post('',data,{
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

    console.log(OrderData);

    return (
        <>
            <ScrollView style={[bg_white]}>

                <View>
                    {/*==============최근배송지 불러오기==============*/}
                    <View style={[FormStyle.FormGroup]}>
                        <View>
                            <View style={[flex]}>
                                <View style={[]}>
                                    <Text style={[FormStyle.FormTitle]}>최근 배송지 불러오기</Text>
                                    {/*최근배송지 라디오 박스*/}
                                </View>
                                <View style={[ms2]}>
                                    <Text style={[FormStyle.FormTitle]}>신규 배송지 추가</Text>
                                    {/*신규배송지 라디오 박스*/}
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
                            <View style={[FormStyle.FormGroupItems]}>
                                <Text style={[FormStyle.FormLabel]}>공사명</Text>
                                <TextInput style={[FormStyle.InputStyle]}
                                           onChangeText={(project_title)=>goInput("project_title",project_title)}
                                           placeholder="ex)공사명 입력"
                                           value={OrderData.project_title}/>

                            </View>
                            <View style={[FormStyle.FormGroupItems]}>
                                <Text style={[FormStyle.FormLabel]}>배송지</Text>
                                <View style={[d_flex,align_items_center]}>
                                   <TextInput style={[FormStyle.InputStyle,{flex:1,marginRight:16,}]}
                                               onChangeText={(addr1)=>goInput("addr1",addr1)}
                                               placeholder="배송지"
                                               value={OrderData.addr1}/>
                                    <TouchableOpacity>
                                        <View style={[bg_primary,{padding:10,}]}>
                                            <Text style={[text_light]}>주소찾기</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
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
                            <Calendar
                                horizontal={true}
                                week
                                onDayPress={({dateString})=>{goInput('hope_deli_date',dateString)}}
                                initialDate={OrderData.hope_deli_date}  // 선택한 날짜를 추출합니다.
                                enableSwipeMonths={true}
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
