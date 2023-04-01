import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, useWindowDimensions,Dimensions } from 'react-native'
import logo from "../../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import RenderHTML from "react-native-render-html";
import {bg_white} from "../../../common/style/AtStyle";

export default function NoticeView({route, navigation}){
    console.log('상세내용');
    const {bd_uid} = route.params;
    const [NoticeView, setNoticeView] = useState([]);
    useEffect(()=>{
        let data = {
            act_type    :'get_bd_detail',
            bd_uid      :bd_uid,
        }
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_bd.php',data,{
            headers: {
                'Content-type': 'multipart/form-data',
            }
        }).then((res)=>{
            if(res) {
                const {bd_data} = res.data;
                setNoticeView(bd_data);
            }
        });
    },[]);



    const source = {
        html: NoticeView.bd_contents
    };
    const tagsStyles = {
        p:{
            margin:0,
        },
    };

    console.log(NoticeView);

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
                            <Text style={styles.NoticeView_date}>{NoticeView.reg_date} </Text>
                        </View>
                    </View>
                    {/*=============상세내용===============*/}
                    <View style={styles.NoticeView_disc}>
                        <View style={styles.NoticeView_disc_in}>
                           <RenderHTML source={source} contentWidth={350} containerStyle={[styles.RenderHTML]} tagsStyles={tagsStyles}/>
                        </View>
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
    RenderHTML:{
        color:'red',
    },
})