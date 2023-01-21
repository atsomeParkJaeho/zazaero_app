import React,{useState,useEffect} from 'react';
import { StyleSheet, Button, CheckBox,  Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';


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



export default function InquiryList({navigation,route}) {
    console.log('나의 문의내역');

    const [InqList, setInqList] = useState([]);  // 공지사항 불러오기
    useEffect(() => {
        // 1. 설정
        let data = {
            act_type: "bd_list",
            bd_type: "inquiry",
        }
        // 3. 연결 추출
        axios.post('http://49.50.162.86:80/ajax/UTIL_bd.php', data, {
            headers: {
                'Content-type': 'multipart/form-data',
            }
        }).then((res) => {
            if (res) {
                const {bd_list} = res.data;
                setInqList(bd_list);
            }
        });
    }, []);
    console.log('1:1문의 리스트목록',InqList);
    return (
        <>
            <ScrollView style={bg_white}>
                <View>
                    {/*  상단탭 영역  */}
                    <View style={[styles.InquiryTab,flex]}>
                        <View style={[styles.InquiryTab_item]}>
                            <TouchableOpacity style={styles.InquiryTab_link} onPress={()=>{navigation.navigate('1:1문의작성')}} >
                                <Text style={[styles.InquiryTab_txt]}>1:1 문의</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.InquiryTab_item]}>
                            <TouchableOpacity style={[styles.InquiryTab_link,styles.active_link]} onPress={()=>{navigation.navigate('1:1문의목록')}} >
                                <Text style={[styles.InquiryTab_txt,styles.active_txt]}>나의 문의 내역</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {(InqList) ? (
                        <>
                            {InqList.map((val,idx)=>(
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
                                                {(val.bd_reply) ? (
                                                    <>
                                                        <View style={[bg_primary,pt1,pb1,styles.round1]}>
                                                            <Text style={[text_center,text_white,h14]}>답변완료</Text>
                                                        </View>
                                                    </>
                                                ):(
                                                    <>
                                                        <View style={[bg_gray,pt1,pb1,styles.round1]}>
                                                            <Text style={[text_center,text_white,h14]}>답변대기</Text>
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