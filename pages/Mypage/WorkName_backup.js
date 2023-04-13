import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    flex,
    wt6,
    wt1,
    wt3,
    wt5,
    wt2,
    text_center,
    h16,
    mt2,
    pt1,
    pb1,
    h14,
    ps1,
    text_primary,
    wt8,
    pt2,
    pb2,
    bg_primary,
    ms1,
    me1,
    mb1,
    text_white,
    text_right, text_light, text_info, text_gray, wt7, h15, flex_top, text_black, h18, h17, fw500
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';


export default function WorkName({navigation,route}) {


    const order_List = [

        {
            Construction_name: "호반스테이트아파트 301호",       //공사명
            Construction_count: "4",                        //총 발주목록
            Date: "2022-10-11",                    //처음등록일시

        },
        {
            Construction_name: "스타리우빌딩 3층 상가리모델링",       //공사명
            Construction_count: "5",                        //총 발주목록
            Date: "2022-11-11",                    //처음등록일시
        },
        {
            Construction_name: "석촌호수공원 분수대 옆 호반베르디움 102동 604호 아파트리모델링",       //공사명
            Construction_count: "2",                        //총 발주목록
            Date: "2022-11-16",                    //처음등록일시
        },
        {
            Construction_name: "호반베르디움 102동 604호 아파트리모델링",       //공사명
            Construction_count: "1",                        //총 발주목록
            Date: "2022-12-11",                    //처음등록일시
        },
        {
            Construction_name: "호반스테이트아파트 301호",       //공사명
            Construction_count: "4",                        //총 발주목록
            Date: "2022-10-11",                    //처음등록일시

        },
        {
            Construction_name: "스타리우빌딩 3층 상가리모델링",       //공사명
            Construction_count: "5",                        //총 발주목록
            Date: "2022-11-11",                    //처음등록일시
        },
        {
            Construction_name: "석촌호수공원 분수대 옆 호반베르디움 102동 604호 아파트리모델링",       //공사명
            Construction_count: "2",                        //총 발주목록
            Date: "2022-11-16",                    //처음등록일시
        },
        {
            Construction_name: "호반베르디움 102동 604호 아파트리모델링",       //공사명
            Construction_count: "1",                        //총 발주목록
            Date: "2022-12-11",                    //처음등록일시
        },

    ];

    return  (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.ConstructionStatus]}>
                    <View style={[styles.ConstructionStatus_list,mt2]}>
                        {/*    */}
                        <View style={[mt2]}/>
                        {order_List.map((val,ide)=>
                            <TouchableOpacity onPress={() => {navigation.navigate('공사현황발주서목록')}}>
                                <View style={[styles.bg,ms1,me1,mb1,styles.border_raound]}>
                                    <View style={[]}>
                                        <Text style={[h14,,text_right,pb1]} >첫 등록일시 : {val.Date}</Text>
                                        <View style={[flex_top]}>
                                            <View style={[wt7]}>
                                                <Text style={[h14,]}>공사명</Text>
                                                <Text style={[h15,,fw500]} >{val.Construction_name}</Text>
                                            </View>
                                            <View style={[wt3]}>
                                                <Text style={[text_right,h14,]}>총 발주서</Text>
                                                <Text style={[text_right,h17,,fw500]}>{val.Construction_count}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        {/*    */}

                    </View>
                </View>
                <View style={[styles.ios_pb]} />
            </ScrollView>

        </>
    );
}

const styles = StyleSheet.create({
    MyPoint_list_item:{
        paddingVertical:16,
        paddingHorizontal:20,
    },
    MyPoint_title:{
        fontSize: Platform.OS === 'ios' ? 16 : 15,
        lineHeight:24,
        color:"#333",
    },
    MyPoint_date:{
        fontSize:12,
        lineHeight:22,
        color:"#B1B2C3",
    },
    MyPoint_Score:{
        fontSize: Platform.OS === 'ios' ? 16 : 15,
        lineHeight:24,
    },
    MyPoint_Score_p:{
        color:"#4549e0",
    },
    MyPoint_Score_m:{
        color:"#f25767",
    },
    ios_pb:{
        paddingBottom: Platform.OS === 'ios' ? 17 : 0,
    },
    border_bottom:{
        borderBottomWidth:1,
        borderColor:"#000",
    },
    border_bottom2:{
        borderBottomWidth:1,
        borderColor:"#ccc",
    },
    border_raound:{
        borderRadius:10,
        paddingTop:10,
        paddingBottom:20,
        paddingHorizontal:10,
    },
    bg:{
        backgroundColor:"#ededf1",
    }
});