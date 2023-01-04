import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';


// 공통 CSS 추가
import {container, bg_white,flex_between} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';


export default function MyRefund({navigation,route}) {


    const order_List = [

        {
            Date: "2022-10-11 15:00:00",                    //등록일시
            bank_name: "기업은행",                          //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "100,000",                     //환불금액
        },
        {
            Date: "2022-10-11 15:00:00",            //등록일시
            bank_name: "광주은행 ",                  //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "500,000",                     //환불금액
        },
        {
            Date: "2022-10-11 15:00:00",            //등록일시
            bank_name: "국민은행",                  //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "50,000",                     //환불금액
        },
        {
            Date: "2022-10-11 15:00:00",            //등록일시
            bank_name: "농협 ",                  //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "90,000",                     //환불금액
        },
        {
            Date: "2022-10-11 15:00:00",                    //등록일시
            bank_name: "기업은행",                          //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "100,000",                     //환불금액
        },
        {
            Date: "2022-10-11 15:00:00",            //등록일시
            bank_name: "광주은행 ",                  //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "500,000",                     //환불금액
        },
        {
            Date: "2022-10-11 15:00:00",            //등록일시
            bank_name: "국민은행",                  //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "50,000",                     //환불금액
        },
        {
            Date: "2022-10-11 15:00:00",            //등록일시
            bank_name: "농협 ",                  //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "90,000",                     //환불금액
        },
        {
            Date: "2022-10-11 15:00:00",                    //등록일시
            bank_name: "기업은행",                          //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "100,000",                     //환불금액
        },
        {
            Date: "2022-10-11 15:00:00",            //등록일시
            bank_name: "광주은행 ",                  //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "500,000",                     //환불금액
        },
        {
            Date: "2022-10-11 15:00:00",            //등록일시
            bank_name: "국민은행",                  //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "50,000",                     //환불금액
        },
        {
            Date: "2022-10-11 15:00:00",            //등록일시
            bank_name: "농협 ",                  //은행명
            bankaccountnumber: "485154-12-4512",          //계좌번호
            accountholder: "홍길동",                       //예금주
            Refundamount: "90,000",                     //환불금액
        },

    ];

    return  (
            <>
                <ScrollView style={[bg_white]}>
                    <View style={[styles.MyRefund]}>
                        <View style={[styles.MyPoint_list]}>
                            {order_List.map((val,ide)=>
                                <View style={[styles.MyPoint_list_item,flex_between]}>
                                    <View style={styles.item}>
                                        <Text style={styles.MyPoint_title}>{val.bank_name} {val.bankaccountnumber} {val.accountholder}</Text>
                                        <Text style={styles.MyPoint_date}>{val.Date}</Text>
                                    </View>
                                    <View style={[styles.item]}>
                                        <Text style={[styles.MyPoint_Score,styles.MyPoint_Score_p]}>{val.Refundamount} 원</Text>
                                    </View>
                                </View>
                            )}
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
});