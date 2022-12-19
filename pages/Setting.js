import React, { useState } from "react";
import {View,Text,StyleSheet,Image, TouchableOpacity, ScrollView, Switch} from 'react-native'
import logo from "../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";

// 공통 CSS 추가
import {container, bg_white,flex,flex_between} from '../common/style/AtStyle';
import Footer from "./Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {reloadAsync} from "expo-updates";

export default function Setting({navigation,route}){

    console.log('설정');
    AsyncStorage.getItem('member').then((value)=>{
        console.log(value);
    });

    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnable2] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnable2(previousState => !previousState);

    // 로그아웃 로직
    let goLogout = () => {
        AsyncStorage.clear();
        AsyncStorage.getItem('member').then((value)=>{
            console.log(value);
        });
        reloadAsync();
        navigation.replace('로그인');
    }

    return(
        <>
            <ScrollView style={bg_white}>
                <View style={styles.mypageList}>
                    <View style={[flex,styles.mypageListItem]}>
                        <View style={styles.mypageListItemTitle}>
                            <Text style={styles.mypageList_name}>서비스 현황 알림</Text>
                        </View>
                        <View style={styles.mypageListItemIcon}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#4630eb" }}
                                thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style={styles.switch}
                            />
                        </View>
                    </View>
                    <View style={[flex,styles.mypageListItem]}>
                        <View style={styles.mypageListItemTitle}>
                            <Text style={styles.mypageList_name}>혜택 정보 알림</Text>
                        </View>
                        <View style={styles.mypageListItemIcon}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#4630eb" }}
                                thumbColor={isEnabled2 ? "#fff" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2}
                                value={isEnabled2}
                                style={styles.switch}
                            />
                        </View>
                    </View>
                    <View style={styles.mypageListItem}>
                        <View style={styles.mypageListItemTitle}>
                            <TouchableOpacity onPress={goLogout}>
                                <Text style={styles.mypageList_name}>
                                    로그아웃
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mypageListItemIcon}>
                            <Text style={styles.mypageList_name}> > </Text>
                        </View>
                    </View>

                    <View style={styles.mypageListItem}>
                        <TouchableOpacity style={styles.mypageListItem_link} onPress={()=>{navigation.navigate('회원탈퇴')}} >
                            <View style={flex_between}>
                                <View style={styles.mypageListItemTitle}>
                                    <Text style={styles.mypageList_name}>회원탈퇴</Text>
                                </View>
                                <View style={styles.mypageListItemIcon}>
                                    <Text style={styles.mypageList_name}> > </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
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
    switch:{
        transform: Platform.OS === 'ios' ? [{ scaleX: .7 }, { scaleY: .7 }] : [{ scaleX: 1.2 }, { scaleY: 1.2 }] ,
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