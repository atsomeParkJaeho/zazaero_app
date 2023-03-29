import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import logo from "../../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import {bd_list} from "../UTIL_bd";


export default function NoticeList({navigation}) {
    console.log('공지사항');
    const [NoticeList, setNoticeList] = useState([]);  // 공지사항 불러오기
    useEffect(() => {
        bd_list().then((res) => {
            if (res) {
                const {bd_list} = res.data;
                let temp = bd_list.sort((a,b)=>{
                    return b.bd_uid - a.bd_uid
                });
                setNoticeList(temp);
            }
        });
    }, []);
    console.log(NoticeList);
    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.mypageList}>
                    {NoticeList.map((val,idx)=>(
                        <>
                            {(val.hide_flag === 'N') && (
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
                            )}
                        </>
                    ))}
                </View>
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
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