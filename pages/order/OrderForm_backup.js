import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, CheckBox, Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';

import {SelectList} from 'react-native-dropdown-select-list'
//셀렉트박스


//다음주소 api

// 공통 CSS 추가
import {container, bg_white, flex_between, input, flex,flex_top} from '../../common/style/AtStyle';
import {sub_page, gary_bar} from '../../common/style/SubStyle';
import axios from "axios";


export default function OrderForm({navigation, route}) {

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
                <View style={[styles.OrderForm]}>
                    <View style={[container]}>
                        <View style={styles.selectGroup}>
                            <Text style={styles.selectGroup_txt}>배송지 불러오기</Text>
                            <SelectList
                                setSelected={(val) => setSelected(val)}
                                data={data}
                                save="value"
                                defaultOption={{key: '1', value: '경기도 성남시 대왕판교로 452-2'}}
                                boxStyles={{borderRadius: 0, borderColor: "#ededf1"}}
                                inputStyles={{fontSize: 12, color: "#696A81"}}
                            />
                        </View>
                        <View style={[styles.selectGroup, styles.mt_24]}>
                            <Text style={styles.selectGroup_txt}>공사명 불러오기</Text>
                            <SelectList
                                setSelected={(val) => setSelected2(val)}
                                data={data2}
                                save="value"
                                defaultOption={{key: '1', value: '직접입력'}}
                                boxStyles={{borderRadius: 0, borderColor: "#ededf1"}}
                                inputStyles={{fontSize: 12, color: "#696A81"}}
                                search={false}
                            />
                            <TextInput style={[input, styles.mt_10]} onChangeText={onChangeConstructionName}
                                       placeholder="ex)공사명 입력" value={ConstructionName}/>
                        </View>
                    </View>
                    <View style={gary_bar}/>
                    <View style={[container]}>
                        <View style={styles.selectGroup}>
                            <Text style={styles.selectGroup_txt}>배송지</Text>
                            <View style={[flex]}>
                                <View style={styles.w_70}>
                                    <TextInput style={[input, styles.me_18]} onChangeText={onChangeaddr}
                                               placeholder="ex)상세주소입력" value={addr}/>
                                </View>
                                <View style={[styles.w_30, styles.pl_2]}>
                                    <TouchableOpacity style={styles.addr_btn}>
                                        <View style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.addr_btn_txt}>주소찾기</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.selectGroup, styles.mt_24]}>
                            <Text style={styles.selectGroup_txt}>상세주소</Text>
                            <TextInput style={[input, styles.me_18]} onChangeText={onChangeaddr} placeholder="ex)상세주소입력" value={addr}/>
                        </View>
                    </View>
                    <View style={gary_bar}/>
                    <View style={{ overflow: 'hidden' }}>
                        <View style={[flex_between, styles.border_b_dotted,styles.p_16]}>
                            <View style="">
                                <Text style={styles.DateofArrival_txt}>도착일</Text>
                            </View>
                            <View style="">
                                <Text style={styles.DateofArrival_txt}>10월 4일</Text>
                            </View>
                        </View>
                        <View style={[container]}>
                            <Text style={styles.DateofArrival_txt}>10월 4일</Text>
                        </View>
                    </View>
                    <View style={gary_bar}/>
                    <View style={{ overflow: 'hidden' }}>
                        <View style={[flex_between, styles.border_b_dotted,styles.p_16]}>
                            <View style="">
                                <Text style={styles.DateofArrival_txt}>도착시간</Text>
                            </View>
                            <View style="">
                                <Text style={styles.DateofArrival_txt}>오전 10시 04분</Text>
                            </View>
                        </View>
                        <View style={[container]}>
                            <View style={[flex_top]}>
                                <View style="">
                                    <SelectList
                                        setSelected={(val) => setSelected3(val)}
                                        data={data3}
                                        save="value"
                                        defaultOption={{key: '1', value: '오전'}}
                                        boxStyles={{borderRadius: 0, borderColor: "#ededf1"}}
                                        inputStyles={{fontSize: 12, color: "#696A81"}}
                                        search={false}
                                    />
                                </View>
                                <View style="">
                                    <TextInput style={[input, styles.me_18]} onChangeText={onChangehour} placeholder="00" value={hour}/>
                                </View>
                                <View style="">
                                    <Text style={styles.DateofArrival_txt}>:</Text>
                                </View>
                                <View style="">
                                    <TextInput style={[input, styles.me_18]} onChangeText={onChangeminute} placeholder="00" value={minute}/>
                                </View>
                            </View>

                        </View>
                    </View>
                    <View style={gary_bar}/>
                    <View style={[container]}>
                        <View style={styles.selectGroup}>
                            <Text style={styles.selectGroup_txt}>현장 인도자 연락처</Text>
                            <TextInput style={[input, styles.mt_10]} onChangeText={onChangeManagerPhone} placeholder="" value={ManagerPhone}/>
                        </View>
                        <View style={[styles.selectGroup, styles.mt_24]}>
                            <Text style={styles.selectGroup_txt}>배송 요청 사항</Text>
                            <TextInput style={[input, styles.mt_10]} onChangeText={onChangeDeliMemo} placeholder="" value={DeliMemo}/>
                        </View>
                    </View>
                    <View style={gary_bar}/>
                </View>
            </ScrollView>
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
        borderWidth: 1,

        margin: -2,
    },
    p_16:{
        padding:16,
    }
});