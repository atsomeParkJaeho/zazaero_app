import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    Button,
    CheckBox,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    flex,
    wt7,
    wt3,
    bg_gray,
    text_center,
    bg_primary, text_white, pt2, pt1, pb1, h14
} from '../../../common/style/AtStyle';
import {sub_page} from '../../../common/style/SubStyle';
import axios from "axios";
import {get_Member} from "../../UTIL_mem";
import {bd_list} from "../UTIL_bd";



export default function InquiryList({route, navigation}) {
    console.log('나의 문의내역');
    const [Member,  setMember] = useState();
    const [A_board, set_A_board] = useState([]);  // 공지사항 불러오기
    useEffect(() => {
        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                Alert.alert(``,`실패`);
            }
        });
        bd_list(`inquiry`,Member,``).then((res)=>{
            if(res) {
                const {result, A_board} = res.data;
                if(result === 'OK') {
                    return set_A_board(A_board);
                } else {
                    return Alert.alert(``,`${result}`);
                }
            }
        });

    }, [Member]);
    console.log(A_board,'/[1:1문의 리스트]');
    return (
        <>
            <ScrollView style={bg_white}>
                <View>
                    {/*  상단탭 영역  */}
                    <View style={[styles.InquiryTab,flex]}>
                        <View style={[styles.InquiryTab_item]}>
                            <TouchableOpacity style={styles.InquiryTab_link} onPress={()=>{navigation.replace('1:1문의작성')}} >
                                <Text style={[styles.InquiryTab_txt]}>1:1 문의</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.InquiryTab_item]}>
                            <TouchableOpacity style={[styles.InquiryTab_link,styles.active_link]} onPress={()=>{navigation.replace('1:1문의목록')}} >
                                <Text style={[styles.InquiryTab_txt,styles.active_txt]}>나의 문의 내역</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {(A_board) ? (
                        <>
                            {A_board.map((val,idx)=>(
                                <View style={styles.mypageListItem} key={idx}>
                                    <TouchableOpacity onPress={() => navigation.navigate('1:1문의상세',{bd_uid:val.bd_uid})}>
                                        <View style={[flex]} >
                                            <View style={[wt7]} >
                                                {/*===========제목=========*/}
                                                <View style={styles.mypageListItemTitle}>
                                                    <Text style={styles.mypageList_name}>{val.bd_title}</Text>
                                                </View>
                                                {/*===========날짜============*/}
                                                <View style={styles.mypageListItemRegDate}>
                                                    <Text style={styles.mypageList_name2}>{val.reg_date}</Text>
                                                </View>
                                            </View>
                                            <View style={[wt3]} >
                                                {(val.bd_status === 'doing') ? (
                                                    <>
                                                        <View style={[bg_gray,pt1,pb1,styles.round1]}>
                                                            <Text style={[text_center,text_white,h14]}>답변대기</Text>
                                                        </View>

                                                    </>
                                                ):(
                                                    <>
                                                        <View style={[bg_primary,pt1,pb1,styles.round1]}>
                                                            <Text style={[text_center,text_white,h14]}>답변완료</Text>
                                                        </View>
                                                    </>
                                                )}
                                                
                                            </View>
                                        </View>


                                    </TouchableOpacity>
                                </View>
                            ))}
                        </>

                    ):(
                        <>
                            <View>
                                <View>
                                    <Text>
                                    내용이 없습니다.
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}

                </View>
            </ScrollView>

        </>
    );
}

const styles = StyleSheet.create({
    InquiryTab_item:{
        width:"50%",
    },
    InquiryTab_txt:{
        textAlign:"center",
        fontSize:16,
        lineHeight:24,
        paddingBottom:16.
    },
    InquiryTab_link:{
        borderBottomWidth:1,
        borderColor:"#ededf1"
    },
    active_txt:{
        color:"#3D40E0",
    },
    active_link:{
        borderBottomWidth:5,
        borderColor:"#3D40E0"
    },
    mypageListItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderColor: '#ededf1',
    },
    mypageList_name: {
        fontSize: 16,
        paddingBottom: 12,
    },
    mypageList_name2: {
        fontSize: 12,
        color: '#b1b2c3',
    },
    round1:{
        borderRadius:5,
    }
})