import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, CheckBox, Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';

import {SelectList} from 'react-native-dropdown-select-list'
//셀렉트박스


//다음주소 api

// 공통 CSS 추가
import {container, bg_white, flex_between, input, flex,flex_top} from '../../common/style/AtStyle';
import {sub_page, gary_bar} from '../../common/style/SubStyle';


export default function OrderForm({navigation, route}) {

    const [selected, setSelected] = React.useState("");

    const data = [
        {key: '1', value: '경기도 성남시 대왕판교로 452-2',},
        {key: '2', value: '경기도 성남시 화정로 452-2 스타우드빌딩 2층'},
        {key: '3', value: '경기도 성남시 분당구'},
        {key: '4', value: '광주 북구 서하로233번길 32'},
        // {key:'4', value:'Computers', disabled:true},

    ]
    //배송지 불러오기 셀렉트박스
    const [selected2, setSelected2] = React.useState("");

    const data2 = [
        {key: '1', value: '힐스테이트 103동 1206호 리모델링',},
        {key: '2', value: '스타우드빌딩 2층 208호 리모델링'},
        {key: '3', value: '분당구 로데오 빌딩 608호 리모델링'},

        // {key:'4', value:'Computers', disabled:true},

    ]
    //공사명 불러오기 셀렉트박스

    const [selected3, setSelected3] = React.useState("");

    const data3 = [
        {key: '1', value: '오전',},
        {key: '2', value: '오후'},


        // {key:'4', value:'Computers', disabled:true},

    ]
    //공사명 불러오기 셀렉트박스

    const [ConstructionName, onChangeConstructionName] = React.useState("");
    //공사명 입력
    const [addr, onChangeaddr] = React.useState("");
    //상세주소 입력
    const [hour, onChangehour] = React.useState("");
    //시간 입력
    const [minute, onChangeminute] = React.useState("");
    //분 입력
    const [ManagerPhone, onChangeManagerPhone] = React.useState("");
    //시간 입력
    const [DeliMemo, onChangeDeliMemo] = React.useState("");
    //분 입력

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