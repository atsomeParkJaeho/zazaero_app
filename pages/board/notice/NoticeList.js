import React, {useEffect, useRef, useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert} from 'react-native'
import logo from "../../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import {bd_list} from "../UTIL_bd";
import {get_my_point_log} from "../../UTIL_mem";


export default function NoticeList({navigation}) {
    console.log('공지사항');
    const [NoticeList, setNoticeList] = useState([]);  // 공지사항 불러오기
    const [get_page, set_page]              = useState();           // 전체 페이지
    const [now_page, set_now_page]          = useState();           // 현재 페이지

    /**--------------------스크롤 설정----------------------**/
    const scrollViewRef = useRef();
    const [scrollEndReached, setScrollEndReached] = useState(false);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 10; // adjust the value as needed

        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

        if (isEndReached && !scrollEndReached) {
            setScrollEndReached(true);
            // Alert.alert(``,`스크롤 끝`);
            /**----------------기존 스테이터스에 데이터를 추가한다.----------------**/
            let next_page = Number(now_page + 1);
            if(Number(get_page) === 1 ) {
                return  console.log('1페이지만 있습니다.');
            } else if(Number(now_page) >= Number(get_page)) {
                return  console.log('마지막 페이지 입니다.');
            } else {
                bd_list(next_page).then((res)=>{
                    if(res) {
                        const {result, A_board, total_page, now_page} = res.data;
                        if(result === 'OK') {
                            let temp = A_board.sort((a,b)=>{
                                return b.bd_uid - a.bd_uid
                            });
                            set_page(total_page);
                            set_now_page(next_page);
                            setNoticeList(temp);
                        } else {
                            return Alert.alert(``,`${result}`);
                        }
                    }
                });
            }
        } else if (!isEndReached && scrollEndReached) {
            setScrollEndReached(false);
        }
    };

    useEffect(() => {
        bd_list(``).then((res) => {
            if (res) {
                console.log(res.data,'/[게시판 리턴값]');
                const {A_board, total_page, now_page} = res.data;
                let temp = A_board.sort((a,b)=>{
                    return b.bd_uid - a.bd_uid
                });
                set_page(total_page);
                set_now_page(now_page);
                setNoticeList(temp);
            }
        });
    }, []);
    console.log(NoticeList.length);
    console.log(get_page,'/[전체 페이지]');
    console.log(now_page,'/[현재 페이지]');



    return (
        <>
            <ScrollView style={styles.container}
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            >
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