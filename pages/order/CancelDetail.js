import React,{useState,useEffect} from 'react';
import { StyleSheet, Button, CheckBox,  Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    padding_bottom,
    flex_between,
    flex,
    h12,
    h13,
    h14,
    h16,
    h18,
    ms1,
    ms2,
    mb1,
    text_primary,
    d_flex,
    justify_content_center,
    flex_end,
    flex_between_bottom,
    fw500,
    justify_content_end,
    bg_gray,
    bg_light,
    pe3,
    pe5,
    me2,
    text_danger, pe1, textarea,
} from '../../common/style/AtStyle';
import {gray_bar, sub_page} from '../../common/style/SubStyle';

import goodsthum1 from "../../assets/img/goods_thum1.jpg";
import col3 from "../../assets/img/co3.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {gd_cancel_info} from "./UTIL_order";


// 샘플데이터


export default function CancelDetail({navigation,route}) {

    const {gd_cancel_uid} = route.params;

    const [Member, setMember] = useState({});
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    });
    const [CancelInfo, setCancelInfo] = useState();

    useEffect(()=>{
        gd_cancel_info(Member, gd_cancel_uid).then((res)=>{
            if(res) {
                console.log(res);
                const {result, gd_cancel_info} = res.data;
                if(result === 'OK') {
                    setCancelInfo(gd_cancel_info);
                }
            }
        });
    },[Member]);

    console.log(CancelInfo,'/123');
    return (
        <>

        </>
    );
}

const styles = StyleSheet.create({
    Detail_page_top:{
        paddingVertical:16,

    },
    CancelDetail_list_items:{
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
    },
    goods_thum:{
        maxWidth:100,
        width:"100%",
        minHeight:100,
        height:"100%",
        borderRadius:10,
    },
    color1:{
        color:"#696A81",
    },
    borderVertical:{
        borderTopWidth:1,

        borderColor:"#eee",
    }
});