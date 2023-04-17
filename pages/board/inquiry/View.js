import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, useWindowDimensions, Alert} from 'react-native'
import logo from "../../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import RenderHTML from "react-native-render-html";
import {bg_gray, bg_primary, bg_white, h14, pb1, pt1, text_center, text_white} from "../../../common/style/AtStyle";
import {get_Member} from "../../UTIL_mem";
import {get_bd_detail} from "../UTIL_bd";

export default function NoticeView({route, navigation}){
    console.log('상세내용');
    const {bd_uid} = route.params;
    const [Member, setMember]          = useState(``);
    const [NoticeView, setNoticeView] = useState([]);
    useEffect(()=>{
        get_Member().then((res)=>{if(res) {setMember(res);} else {
            Alert.alert(``,`실패`);
            return navigation.navigate('로그인');
        }});
        get_bd_detail(bd_uid).then((res)=>{
            if(res) {
                const {result,bd_data} = res.data;
                if(result === 'OK') {
                    setNoticeView(bd_data);
                }  else {
                    return Alert.alert(``,`${result}`);
                }
            }
        });
    },[Member]);


    const form_mod = () => {

    }

    console.log(NoticeView.length,'/[게시판 상세]');

    return(
        <>
            <ScrollView style={[bg_white]}>
                <View style={styles.NoticeView}>
                    {/*================글제목====================*/}
                    <View style={styles.NoticeView_title_box}>
                        <View style={styles.NoticeView_title_in}>
                            <Text style={styles.NoticeView_title}>{NoticeView.bd_title}</Text>
                        </View>
                        <View style={styles.NoticeView_date_in}>
                            <Text style={styles.NoticeView_date}>{NoticeView.reg_date}</Text>
                        </View>
                        <TouchableOpacity style={[bg_primary]} onPress={form_mod}>
                            <Text>
                                수정하기123123
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/*=============상세내용===============*/}
                    <View style={styles.NoticeView_disc}>
                        <View style={styles.NoticeView_disc_in}>
                            <RenderHTML source={{html:`${NoticeView.bd_contents}`}}/>
                        </View>
                        {(NoticeView.bd_status_name === '답변완료') ? (
                            <>
                                <View style={styles.reply}>
                                    <Text style={styles.NoticeView_title}>답변내용</Text>
                                    <View style={styles.reply_box}>
                                        <Text style={[h14,styles.reply_txt]}>{NoticeView.bd_reply}</Text>
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
    NoticeView:{
        marginTop:30,
        paddingLeft:16,
        paddingRight:16,
    },
    NoticeView_title:{
        fontSize:18,
        paddingBottom:23,
    },
    NoticeView_date_in:{
        paddingBottom:23,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },
    NoticeView_date:{
        fontSize:12,
        color:'#b1b2c3',
    },
    NoticeView_disc_in:{
        marginTop:20,
    },
    reply_box:{
        backgroundColor:"#eee",
        paddingVertical:16,
        paddingHorizontal:10,
        borderRadius:5,
    }
})