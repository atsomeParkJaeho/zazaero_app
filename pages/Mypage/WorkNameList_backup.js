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
    text_right,
    text_light,
    text_info,
    text_gray,
    wt7,
    h15,
    flex_top,
    text_black,
    h18,
    h17,
    fw500,
    text_left,
    mt1,
    flex_end,
    text_warning,
    text_secondary,
    text_danger,
    text_success,
    border1,
    border_gray,
    wt4,
    border_success,
    border_primary, border_danger, border_warning, border_black
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';
import Wishlist from "../../icons/ico_heart_c.svg";
import WishlistNon from "../../icons/ico_heart_nc.svg";


export default function WorkNameList({navigation,route}) {


    const order_List = [
        {
            Construction_name: "F_607205262301",       //공사명
            Construction_count: "800,000",                        //총금액
            Date: "2022-12-25",                    //처음등록일시
            Type: "발주신청",                               //상태

        },
        {
            Construction_name: "E_607205262301",       //공사명
            Construction_count: "800,000",                        //총금액
            Date: "2022-12-25",                    //처음등록일시
            Type: "발주검수중",                               //상태

        },
        {
            Construction_name: "D_607205262301",       //공사명
            Construction_count: "1,800,000",                        //총금액
            Date: "2022-12-18",                    //처음등록일시
            Type: "결제대기",                               //상태
        },
        {
            Construction_name: "C_607205262301",       //공사명
            Construction_count: "1,800,000",                        //총금액
            Date: "2022-12-18",                    //처음등록일시
            Type: "배송대기",                               //상태
        },
        {
            Construction_name: "B_607205262301",       //공사명
            Construction_count: "300,000",                        //총금액
            Date: "2022-12-13",                    //처음등록일시
            Type: "배송진행중",                               //상태
        },
        {
            Construction_name: "A_607205262301",       //공사명
            Construction_count: "4,000,000",                        //총금액
            Date: "2022-12-11",                    //처음등록일시
            Type: "배송완료",                               //상태
        },
    ];

    return  (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.ConstructionStatus_DetailList]}>
                    <View style={[mt2]}>
                        {/*    */}
                        <View style={[mt2]}/>
                        {order_List.map((val,ide)=>
                            <TouchableOpacity onPress={() => {navigation.navigate('공사현황발주서상세')}}>
                                <View style={[styles.bg,ms1,me1,mb1,styles.border_raound]}>
                                    <View style={[]}>
                                        <View style={[flex_top]}>
                                            <View style={[wt7]}>
                                                <Text style={[h14,text_black]}>발주번호</Text>
                                                <Text style={[h15,text_black,fw500]} >{val.Construction_name}</Text>
                                            </View>
                                            <View style={[wt3]}>
                                                <Text style={[h14,text_black,text_right]} >{val.Date}</Text>
                                            </View>
                                        </View>

                                        <View style={[flex_end,mt1]}>
                                            <View style={[wt3]}>
                                                {val.Type === '발주신청' &&  (<Text style={[h15,text_warning,fw500,border_warning]} >{val.Type}</Text>)}
                                                {val.Type === '발주검수중' && (<Text style={[h15,text_danger,fw500,border_danger]} >{val.Type}</Text>)}
                                                {val.Type === '결제대기' && (<Text style={[h15,text_gray,fw500,border_gray]} >{val.Type}</Text>)}
                                                {val.Type === '배송대기' && (<Text style={[h15,text_black,fw500,border_black]} >{val.Type}</Text>)}
                                                {val.Type === '배송진행중' && (<Text style={[h15,text_success,fw500,border_success]} >{val.Type}</Text>)}
                                                {val.Type === '배송완료' && (<Text style={[h15,text_primary,fw500,border_primary]} >{val.Type}</Text>)}
                                            </View>
                                            <View style={[wt7]}>

                                                <Text style={[text_right,h14,text_black]}>총 금액</Text>
                                                <Text style={[text_right,h17,text_black,fw500]}>{val.Construction_count}</Text>
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