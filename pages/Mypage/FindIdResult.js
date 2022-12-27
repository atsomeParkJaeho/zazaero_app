import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';

// 공통 CSS 추가
import {
    container,
    bg_white,
    btn_outline_primary,
    text_primary,
    text_center,
    pt2,
    pb2, h20, pt1, pb1, mt3
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';



export default function FindId({navigation,route}) {


    return   (
        <>
            <View style={[styles.FindId]}>
                <View style={[styles.container,{paddingTop:0}]}>
                    <View style={styles.center_middle}>
                        <Text style={styles.FindId_txt}>
                            가입시 아이디는 {'\n'}
                            아이디값표출 입니다.
                        </Text>
                        <TouchableOpacity style={[btn_outline_primary,mt3,styles.border_radius]} onPress={() => {navigation.navigate('로그인')}}>
                            <Text style={[text_primary,text_center,pt1,pb1,h20]}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
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
        fontWeight:"500",
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
    border_radius:{
        borderRadius:5,
    }
});