import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import logo from "../../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import {List} from 'react-native-paper';
import axios from "axios";
import {bg_gray, bg_light, bg_white, btn_black, text_dark, text_white} from "../../../common/style/AtStyle";

import RenderHTML from "react-native-render-html";

function FaqList({navigation}) {
    console.log('자주묻는질문');


    const [FaqList, setFaqList] = useState([]);  // 자주묻는질문 불러오기
    useEffect(() => {
        // 1. 설정
        let data = {
            act_type: "bd_list",
            bd_type: "faq",
        }
        // 3. 연결 추출
        axios.post('http://49.50.162.86:80/ajax/UTIL_bd.php', data, {
            headers: {
                'Content-type': 'multipart/form-data',
            }
        }).then((res) => {
            if (res) {
                const {bd_list} = res.data;
                setFaqList(bd_list);
            }
        });
    }, []);

    console.log(FaqList);
    return (
        <>
            <ScrollView style={[bg_white]}>
                <List.Section style={[bg_white]}>
                    {(FaqList.map((val,idx)=>(
                        // 제목
                        <List.Accordion style={[text_white, bg_white, {borderBottomWidth:1, borderColor:"#EDEDF1"}]} title={val.bd_title} key={idx}>
                            <View style={{padding:16}}>
                                <View style={[bg_light,{padding:16}]}>
                                    <Text style={[{lineHeight:20,}]}>
                                        {val.bd_contents}
                                    </Text>
                                </View>
                            </View>
                        </List.Accordion>
                        // 내용
                    )))}
                </List.Section>
            </ScrollView>
        </>
    );
}

export default FaqList;


