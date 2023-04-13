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
import {get_Member} from "../UTIL_mem";


export default function WorkName({route, navigation}) {

    const [Member, setMember]        = useState(``);
    const [work_name, set_work_name] = useState([]);

    useEffect(()=>{
        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                // Alert.alert(``,`실패`);
            }
        });
        get_ready(Member);

    },[Member]);

    const get_ready = async (Member)=> {

    }


    return  (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.ConstructionStatus]}>
                    <View style={[styles.ConstructionStatus_list,mt2]}>
                        <View style={[mt2]}/>
                        {/**=========================반복문 구간===================================**/}
                        {work_name.map((val,ide)=>
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