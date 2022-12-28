import React,{useState,useEffect} from 'react';
import { StyleSheet, Button, CheckBox,  Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';


// 공통 CSS 추가
import {container, bg_white,flex_between,flex} from '../../../common/style/AtStyle';
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
    console.log(InqList);
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
                                    <TouchableOpacity onPress={() => navigation.navigate('공지사항상세',{bd_uid:val.bd_uid})}>
                                        {/*===========제목=========*/}
                                        <View style={styles.mypageListItemTitle}>
                                            <Text style={styles.mypageList_name}>{val.bd_title}</Text>
                                        </View>
                                        {/*===========날짜============*/}
                                        <View style={styles.mypageListItemIcon}>
                                            <Text style={styles.mypageList_name2}>{val.reg_date}</Text>
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

    container: {
        backgroundColor: "#fff",
    },
    top_inner: {
        marginTop: 50,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    me_10: {
        marginRight: 8,
    },
    top_innertwo: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    toptitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },
    mypageinfo: {
        paddingLeft: 12,
        paddingRight: 12,
        padding: 16,
        borderBottomWidth: 8,
        borderColor: '#ededf1',

    },
    mypageList_name: {
        fontSize: 20,
        color: "#08052f",
        fontFamily: "Amatic-Bold",
        fontWeight: "700",
    },
    id: {
        marginStart: 6,
        fontSize: 17,
        color: "#08052f",
        fontWeight: "700",
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#fff",
        paddingLeft: 30,
        paddingTop: 100,
        paddingRight: 30
    },
    textContainer: {

        backgroundColor: "#fff",
        marginTop: 12,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    aboutImage: {
        width: 150,
        height: 150,
        borderRadius: 30
    },
    desc01: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
        paddingLeft: 22,
        paddingRight: 22

    },
    desc02: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "700",
        padding: 22
    },
    button: {
        backgroundColor: "orange",
        padding: 20,
        borderRadius: 15
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700"
    },
    mypageListItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    mypageList: {
        marginTop: 30,
    },
    mypageListItem: {

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
})