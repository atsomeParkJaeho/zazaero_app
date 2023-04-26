import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch, Alert} from 'react-native'
import logo from "../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";

// 공통 CSS 추가
import {container, bg_white, flex, flex_between, switch_bar} from '../common/style/AtStyle';
import Footer from "./Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {reloadAsync} from "expo-updates";
import {save_push_id} from "../push/UTIL_push";
import {get_Member, my_page} from "./UTIL_mem";

export default function Setting({navigation,route}){

    console.log('설정');
    AsyncStorage.getItem('member').then((value)=>{
        console.log(value);
    });
    const [Member, setMember]           = useState();
    const [mem_info, set_mem_info]      = useState([]);
    const [isEnabled, setIsEnabled]     = useState(false);


    useEffect(()=>{

        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                // Alert.alert(``,`로그인 후 확인 가능합니다.`);
            }
        });

        my_page(Member).then((res)=>{
            if(res) {
                const {result, mem_info} = res.data;
                if(result === 'OK') {
                    if(mem_info.push_ad_flag === 'Y') {
                        setIsEnabled(true);
                    }
                    set_mem_info(mem_info);
                } else {
                    return Alert.alert(``,`${result}`);
                }
            }
        });

    },[Member]);


    const toggleSwitch = () => {
        if(!isEnabled) {
            setIsEnabled(!isEnabled);
        } else {
            setIsEnabled(!isEnabled);
        }
    }


    return(
        <>
            <ScrollView style={bg_white}>
                <View style={styles.mypageList}>
                    <View style={[flex,styles.mypageListItem]}>
                        <View style={styles.mypageListItemTitle}>
                            <Text style={styles.mypageList_name}>혜택 정보 알림</Text>
                        </View>
                        <View style={styles.mypageListItemIcon}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#4630eb" }}
                                thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style={[switch_bar]}
                            />
                        </View>
                    </View>


                </View>
            </ScrollView>
            <Footer navigation={navigation}/>
        </>

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
        fontSize:16,
        color:"#08052f",
        fontFamily: "Amatic-Bold",
        fontWeight:"500",
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

    mypageList:{
        marginTop:30,
    },
    mypageListItem:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingTop:16,
        paddingBottom:16,
        paddingLeft:20,
        paddingRight:20,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },

    mypageListItem_link:{
        width:"100%",
    },
})