import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import intro_img from '../assets/img/intro_img.png';
const main = '../assets/img/main_banner2.jpg'

export default function Loading(){
    return(
        <View style={styles.container}>
            <Image style={styles.introImage} source={intro_img}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        //앱의 배경 색
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#3D40E0',
    },
    introImage:{
        //컨텐츠의 넓이 값
        width:263,
        //컨텐츠의 높이 값
        height:73,
        //컨텐츠의 모서리 구부리기
        borderRadius:10,
        marginTop:20,
        //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
        //각 속성의 값들은 공식문서에 고대로~ 나와 있음
        alignSelf:"center"
    }

})