import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';


// 공통 CSS 추가
import {container, bg_white,flex_between} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';
import {get_Member} from "../UTIL_mem";
import {useIsFocused} from "@react-navigation/native";
import {get_my_point_log} from "../board/UTIL_bd";


export default function MyPoint({navigation, route}) {

    const [Member, setMember]                  = useState();
    const [get_my_point, set_my_point]         = useState([]); // 나의 포인트 내역
    const Update = useIsFocused();
    useEffect(()=>{
        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                // Alert.alert(``,`실패`);
            }
        });
        get_my_point_log(Member,`get_my_point_log`).then((res)=>{
            console.log(res,'/[데이터 로그 확인]');
        });

    },[Member,Update]);


    return  (

        <View style={[sub_page,styles.MyPoint,bg_white]}>
            <View style={[styles.MyPoint_list]}>
                <View style={[styles.MyPoint_list_item,flex_between]}>
                    <View style={styles.item}>
                        <Text style={styles.MyPoint_title}>상품구입시 적립금 결제 사용</Text>
                        <Text style={styles.MyPoint_date}>2022-12-05</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.MyPoint_Score,styles.MyPoint_Score_p]}>+5000P</Text>
                    </View>
                </View>
                <View style={[styles.MyPoint_list_item,flex_between]}>
                    <View style={[styles.item]}>
                        <Text style={styles.MyPoint_title}>상품환불로 인한 포인트 적립</Text>
                        <Text style={styles.MyPoint_date}>2022-12-05</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.MyPoint_Score,styles.MyPoint_Score_m]}>-5000P</Text>
                    </View>
                </View>
                <View style={[styles.MyPoint_list_item,flex_between]}>
                    <View style={styles.item}>
                        <Text style={styles.MyPoint_title}>상품구입시 적립금 결제 사용</Text>
                        <Text style={styles.MyPoint_date}>2022-12-05</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.MyPoint_Score,styles.MyPoint_Score_p]}>+5000P</Text>
                    </View>
                </View>
                <View style={[styles.MyPoint_list_item,flex_between]}>
                    <View style={[styles.item]}>
                        <Text style={styles.MyPoint_title}>상품환불로 인한 포인트 적립</Text>
                        <Text style={styles.MyPoint_date}>2022-12-05</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.MyPoint_Score,styles.MyPoint_Score_m]}>-5000P</Text>
                    </View>
                </View>
                <View style={[styles.MyPoint_list_item,flex_between]}>
                    <View style={styles.item}>
                        <Text style={styles.MyPoint_title}>상품구입시 적립금 결제 사용</Text>
                        <Text style={styles.MyPoint_date}>2022-12-05</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.MyPoint_Score,styles.MyPoint_Score_p]}>+5000P</Text>
                    </View>
                </View>
                <View style={[styles.MyPoint_list_item,flex_between]}>
                    <View style={[styles.item]}>
                        <Text style={styles.MyPoint_title}>상품환불로 인한 포인트 적립</Text>
                        <Text style={styles.MyPoint_date}>2022-12-05</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.MyPoint_Score,styles.MyPoint_Score_m]}>-5000P</Text>
                    </View>
                </View>
            </View>
        </View>
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
});