import React,{useState,useEffect} from 'react';
import { StyleSheet, Button, CheckBox,  Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';


// 공통 CSS 추가
import {container, bg_white,flex_between,flex} from '../../../common/style/AtStyle';
import {sub_page} from '../../../common/style/SubStyle';



export default function InquiryList({navigation,route}) {
    let mypageList_test = "가나인테리어";


    return (
        <ScrollView style={[bg_white]}>
            <View style={[styles.InquiryWrite]}>
                <View style={[styles.InquiryTab,flex]}>
                    <View style={[styles.InquiryTab_item]}>
                        <TouchableOpacity style={styles.InquiryTab_link} onPress={()=>{navigation.navigate('1:1문의작성')}} >
                            <Text style={[styles.InquiryTab_txt]}>1:1 문의</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.InquiryTab_item]}>
                        <TouchableOpacity style={[styles.InquiryTab_link,styles.active_link]} onPress={()=>{navigation.navigate('1:1문의목록')}} >
                            <Text style={[styles.InquiryTab_txt,styles.active_txt]}>나의 문의 내역</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    InquiryTab_item:{
        width:"50%",
    },

    InquiryTab_txt:{
        textAlign:"center",
        fontSize:16,
        lineHeight:24,
        paddingBottom:16.
    },
    InquiryTab_link:{
        borderBottomWidth:1,
        borderColor:"#ededf1"
    },
    active_txt:{
        color:"#3D40E0",
    },
    active_link:{
        borderBottomWidth:5,
        borderColor:"#3D40E0"
    },
});