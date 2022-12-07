import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';



// 공통 CSS 추가
import {container, bg_white} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';



export default function FindId({navigation,route}) {


    return   (

            <View style={[styles.subPage,styles.FindId]}>
                <View style={styles.container}>
                    <View style={styles.center_middle}>
                        <Text style={styles.FindId_txt}>
                            가입시 입력하신 {'\n'}
                            담당자의 연락처 인증을 통해{'\n'}
                            아이디를 찾을 수 있습니다.
                        </Text>
                        <TouchableOpacity style={styles.FindId_btn}  >
                            <Text style={[styles.FindId_btn_txt]}>본인인증</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


    );
}

const styles = StyleSheet.create({
    FindId:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#fff",
    },
    container:{
        padding:32,
        width:"100%",
    },
    FindId_txt:{
        fontSize:20,
        lineHeight:24,
        fontWeight:"600",
        color:"#333",
        paddingBottom:24,
    },
    FindId_btn:{
        backgroundColor:"#4549E0",
        paddingVertical:7,
        borderRadius:5,
    },
    FindId_btn_txt:{
        textAlign:"center",
        fontSize:20,
        lineHeight:24,
        color:"#fff",
    },

});