import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';


// 공통 CSS 추가
import {container, bg_white,flex_between} from '../../common/style/AtStyle';
import {get_Member, get_my_point_log, get_my_refund_log} from "../UTIL_mem";
import {DateChg, Price} from "../../util/util";


export default function MyRefund({route, navigation}) {
    const [Member, setMember] = useState(``);
    const [my_refund_log, set_my_refund_log] = useState([]);
    useEffect(()=>{

        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                // Alert.alert(``,`실패`);
            }
        });

        get_my_refund_log(Member).then((res)=>{
            if(res) {
                console.log(res.data,'/[데이터 로그]');
                const {result,A_refund_log} = res.data;
                if(result === 'OK') {
                    set_my_refund_log(A_refund_log);
                } else {
                    return Alert.alert(``,`${result}`);
                }
            }
        });
    },[Member]);

    return  (
            <>
                <ScrollView style={[bg_white]}>
                    <View style={[styles.MyRefund]}>
                        <View style={[styles.MyPoint_list]}>
                            {my_refund_log.map((val,ide)=>
                                <View style={[styles.MyPoint_list_item,flex_between]}>
                                    <View style={styles.item}>
                                        {/*<Text style={styles.MyPoint_title}>{val.refund_bank_name} {val.refund_bank_no} {val.refund_bank_owner}</Text>*/}
                                        <Text style={styles.MyPoint_title}>{val.refund_memo}</Text>
                                        <Text style={styles.MyPoint_date}>{DateChg(val.reg_date)} {val.reg_time}</Text>
                                    </View>
                                    <View style={[styles.item]}>
                                        <Text style={[styles.MyPoint_Score,styles.MyPoint_Score_p]}>{Price(val.sum_set_refund_money)}원</Text>
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