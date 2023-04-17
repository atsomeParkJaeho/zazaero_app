import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, useWindowDimensions, Alert} from 'react-native'
import logo from "../../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import RenderHTML from "react-native-render-html";
import {bg_gray, bg_primary, bg_white, h14, pb1, pt1, text_center, text_white} from "../../../common/style/AtStyle";
import {get_Member} from "../../UTIL_mem";
import {get_bd_detail} from "../UTIL_bd";

export default function inquiryView({route, navigation}){
    console.log('상세내용');
    const {bd_uid} = route.params;
    const [Member,  setMember]          = useState(``);
    const [get_bd_data, set_bd_data]    = useState([]);
    const [get_file, set_file]          = useState([]);
    useEffect(()=>{
        get_Member().then((res)=>{if(res) {setMember(res);} else {
            Alert.alert(``,`실패`);
            return navigation.navigate('로그인');
        }});
        get_bd_detail(bd_uid, `inquiry`).then((res)=>{
            if(res) {
                console.log(res.data,'/[리턴값]');
                const {result,bd_data, A_file} = res.data;
                if(result === 'OK') {
                    set_bd_data(bd_data);
                    set_file(A_file);
                }  else {
                    return Alert.alert(``,`${result}`);
                }
            }
        });
    },[Member]);

    /**------------------------------수정하기 이동---------------------------------**/
    const form_mod = () => {
        return navigation.navigate('1:1문의작성',{get_bd_data:get_bd_data});
    }

    console.log(get_bd_data,'/[게시판 상세]');
    console.log(get_file,'/[이미지]');

    return(
        <>
            <ScrollView style={[bg_white]}>
                <View style={styles.get_bd_data}>
                    {/*================글제목====================*/}
                    <View style={styles.get_bd_data_title_box}>
                        <View style={styles.get_bd_data_title_in}>
                            <Text style={styles.get_bd_data_title}>{get_bd_data.bd_title}</Text>
                        </View>
                        <View style={styles.get_bd_data_date_in}>
                            <Text style={styles.get_bd_data_date}>{get_bd_data.reg_date}</Text>
                        </View>
                        <TouchableOpacity style={[bg_primary]} onPress={form_mod}>
                            <Text style={[text_white]}>
                                수정하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/*=============상세내용===============*/}
                    <View style={styles.get_bd_data_disc}>
                        <View style={styles.get_bd_data_disc_in}>
                            <RenderHTML source={{html:`${get_bd_data.bd_contents}`}}/>
                        </View>
                        {(get_bd_data.bd_status_name === '답변완료') ? (
                            <>
                                <View style={styles.reply}>
                                    <Text style={styles.get_bd_data_title}>답변내용</Text>
                                    <View style={styles.reply_box}>
                                        <Text style={[h14,styles.reply_txt]}>{get_bd_data.bd_reply}</Text>
                                    </View>
                                </View>
                            </>
                        ):(
                            <></>
                        )}

                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    get_bd_data:{
        marginTop:30,
        paddingLeft:16,
        paddingRight:16,
    },
    get_bd_data_title:{
        fontSize:18,
        paddingBottom:23,
    },
    get_bd_data_date_in:{
        paddingBottom:23,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },
    get_bd_data_date:{
        fontSize:12,
        color:'#b1b2c3',
    },
    get_bd_data_disc_in:{
        marginTop:20,
    },
    reply_box:{
        backgroundColor:"#eee",
        paddingVertical:16,
        paddingHorizontal:10,
        borderRadius:5,
    }
})