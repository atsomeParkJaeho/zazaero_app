import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, useWindowDimensions} from 'react-native'
import logo from "../../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import RenderHTML from "react-native-render-html";

export default function NoticeView({route, navigation}){
    console.log('상세내용');
    const {bd_uid} = route.params;
    const [NoticeView, setNoticeView] = useState([]);
    useEffect(()=>{
        let data = {
            act_type    :'get_info',
            bd_uid      :bd_uid,
        }
        axios.post('http://49.50.162.86:80/ajax/UTIL_bd.php',data,{
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

    console.log(NoticeView);

    return(
        <ScrollView style={styles.container}>
            <View style={styles.NoticeView}>
                {/*================글제목====================*/}
                <View style={styles.NoticeView_title_box}>
                    <View style={styles.NoticeView_title_in}>
                        <Text style={styles.NoticeView_title}>{NoticeView.bd_title}</Text>
                    </View>
                    <View style={styles.NoticeView_date_in}>
                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                        <Text style={styles.NoticeView_date}>{NoticeView.reg_date} </Text>
                    </View>
                </View>
                {/*=============상세내용===============*/}
                <View style={styles.NoticeView_disc}>
                    <View style={styles.NoticeView_disc_in}>
                        <Text style={styles.NoticeView_disc}>
                            <RenderHTML source={{html:`${NoticeView.bd_contents}`}}/>
                        </Text>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff",
    },
    top_inner:{
        marginTop:50,
        paddingLeft:12,
        paddingRight:12,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    me_10:{
        marginRight:8,
    },
    top_innertwo:{
        flexDirection:"row",
        justifyContent:"space-around",
    },
    toptitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#222",
    },
    mypageinfo:{
        paddingLeft:12,
        paddingRight:12,
        padding:16,
        borderBottomWidth:8,
        borderColor:'#ededf1',

    },
    mypageList_name:{
        fontSize:20,
        color:"#08052f",
        fontFamily: "Amatic-Bold",
        fontWeight:"700",
    },
    id:{
        marginStart:6,
        fontSize:17,
        color:"#08052f",
        fontWeight:"700",
    },
    title: {
        fontSize:30,
        fontWeight:"700",
        color:"#fff",
        paddingLeft:30,
        paddingTop:100,
        paddingRight:30
    },
    textContainer: {

        backgroundColor:"#fff",
        marginTop:12,
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center"
    },
    aboutImage:{
        width:150,
        height:150,
        borderRadius:30
    },
    desc01: {
        textAlign:"center",
        fontSize:20,
        fontWeight:"700",
        paddingLeft:22,
        paddingRight:22

    },
    desc02: {
        textAlign:"center",
        fontSize:15,
        fontWeight:"700",
        padding:22
    },
    button:{
        backgroundColor:"orange",
        padding:20,
        borderRadius:15
    },
    buttonText:{
        color:"#fff",
        fontSize:15,
        fontWeight:"700"
    },
    mypageListItem:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
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
    mypageListItem:{
        paddingTop:16,
        paddingBottom:16,
        paddingLeft:20,
        paddingRight:20,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },
    NoticeView_disc_in:{
        marginTop:20,
    },
    NoticeView_disc:{
        fontSize:12,
        lineHeight:20,
        fontWeight:300,
    },
})