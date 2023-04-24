import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native'

import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./Footer";
import ArrowRight from '../icons/arrow_r.svg'
import {reloadAsync} from "expo-updates";
import {get_Member, my_page} from "./UTIL_mem";

// 공통 CSS 추가
import {container, bg_white, h20, h16, flex_around, wt1, wt5} from '../common/style/AtStyle';

export default function MyPage({navigation, route}) {
    const [Member, setMember]                  = useState();
    const [mem_info, set_mem_info] = useState([]);   // 회원정보 셋팅
    useEffect(() => {

        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                // Alert.alert(``,`실패`);
            }
        });

        my_page(Member).then((res) => {
            if(res) {
                const {result, mem_info} = res.data;
                if(result === 'OK') {
                    set_mem_info(mem_info);
                }
            } else {
                // Alert.alert('',`실패`);
            }
        });

    }, [Member]);

    // 로그아웃 로직
    let goLogout = () => {
        AsyncStorage.clear();
        AsyncStorage.getItem('member').then((value)=>{
            console.log(value);
        });
        reloadAsync();
        navigation.replace('로그인');
    }

    console.log(mem_info);
    console.log(Member,'/회원코드');

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.MyPage]}>
                    <View style={[styles.mypageinfo]}>
                        <View style={[container]}>
                            <Text style={[styles.user_cmy_name,h20]}>
                                {(mem_info.com_name) ? mem_info.com_name : '회사명'}
                            </Text>
                            <Text style={[styles.user_name,h16]}>
                                {mem_info.mem_name} ({mem_info.mem_mobile})
                            </Text>
                            <Text style={styles.user_point}>보유포인트:<Text style={styles.user_point_score}>{mem_info.mem_point}P</Text></Text>
                            <View style={[flex_around]}>
                                <TouchableOpacity style={[styles.user_point_link,wt5]} onPress={() => {navigation.navigate(`포인트내역`)}}>
                                    <Text style={[styles.user_point_link_txt]}>나의 포인트 내역</Text>
                                </TouchableOpacity>
                                <View style={[wt1]}/>
                                <TouchableOpacity style={[styles.user_point_link,wt5]} onPress={() => {navigation.navigate(`환불내역`)}}>
                                    <Text style={[styles.user_point_link_txt]}>나의 환불내역</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.mypageList]}>
                        <View style={styles.mypageListItem}>
                            <TouchableOpacity style={styles.mypageListItem_link} onPress={() => {
                                navigation.navigate('설정')
                            }}>
                                <View style={styles.flex}>
                                    <View style={styles.mypageListItemTitle}>
                                        <Text style={styles.mypageList_name}>설정</Text>
                                    </View>
                                    <View style={styles.mypageListItemIcon}>
                                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                        <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.mypageListItem]}>
                            <TouchableOpacity style={styles.mypageListItem_link} onPress={() => {navigation.navigate('회원정보수정',{uid:mem_info.mem_uid})}}>
                                <View style={styles.flex}>
                                    <View style={styles.mypageListItemTitle}>
                                        <Text style={styles.mypageList_name}>회원정보변경</Text>
                                    </View>
                                    <View style={styles.mypageListItemIcon}>
                                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                        <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mypageListItem}>
                            <TouchableOpacity style={styles.mypageListItem_link} onPress={() => {
                                 navigation.navigate('공사현황목록')
                                // Alert.alert(``,`준비중입니다.`);
                            }}>
                                <View style={styles.flex}>
                                    <View style={styles.mypageListItemTitle}>
                                        <Text style={styles.mypageList_name}>공사현황조회</Text>
                                    </View>
                                    <View style={styles.mypageListItemIcon}>
                                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                        <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.mypageListItem}>
                            <TouchableOpacity style={styles.mypageListItem_link} onPress={() => {navigation.navigate('취소내역')}}>
                                <View style={styles.flex}>
                                    <View style={styles.mypageListItemTitle}>
                                        <Text style={styles.mypageList_name}>취소,반품내역</Text>
                                    </View>
                                    <View style={styles.mypageListItemIcon}>
                                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                        <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mypageListItem}>
                            <TouchableOpacity style={styles.mypageListItem_link} onPress={() => {
                                navigation.navigate('공지사항')
                            }}>
                                <View style={styles.flex}>
                                    <View style={styles.mypageListItemTitle}>
                                        <Text style={styles.mypageList_name}>공지사항</Text>
                                    </View>
                                    <View style={styles.mypageListItemIcon}>
                                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                        <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.mypageListItem}>
                            <TouchableOpacity style={styles.mypageListItem_link} onPress={() => {
                                navigation.navigate('고객센터')
                            }}>
                                <View style={styles.flex}>
                                    <View style={styles.mypageListItemTitle}>
                                        <Text style={styles.mypageList_name}>고객센터</Text>
                                    </View>
                                    <View style={styles.mypageListItemIcon}>
                                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                        <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mypageListItem}>
                            <TouchableOpacity style={styles.mypageListItem_link} onPress={() => {
                                navigation.navigate('약관/개인정보처리방침',{cfg_part2:`access`})
                            }}>
                                <View style={styles.flex}>
                                    <View style={styles.mypageListItemTitle}>
                                        <Text style={styles.mypageList_name}>약관 * 개인정보처리방침</Text>
                                    </View>
                                    <View style={styles.mypageListItemIcon}>
                                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                        <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mypageListItem}>
                            <TouchableOpacity style={styles.mypageListItem_link} onPress={() => {
                                navigation.navigate('회원탈퇴',{uid:mem_info.mem_uid})
                            }}>
                                <View style={styles.flex}>
                                    <View style={styles.mypageListItemTitle}>
                                        <Text style={styles.mypageList_name}>회원탈퇴</Text>
                                    </View>
                                    <View style={styles.mypageListItemIcon}>
                                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                        <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mypageListItem}>
                            <TouchableOpacity style={styles.mypageListItem_link} onPress={goLogout}>
                                <View style={styles.flex}>
                                    <View style={styles.mypageListItemTitle}>
                                        <Text style={styles.mypageList_name}>로그아웃</Text>
                                    </View>
                                    <View style={styles.mypageListItemIcon}>
                                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                        <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {(Member === '97') && (
                            <>
                                <View style={styles.mypageListItem}>
                                    <TouchableOpacity style={styles.mypageListItem_link} onPress={() => {
                                        navigation.navigate('푸시알림')
                                    }}>
                                        <View style={styles.flex}>
                                            <View style={styles.mypageListItemTitle}>
                                                <Text style={styles.mypageList_name}>푸시알림</Text>
                                            </View>
                                            <View style={styles.mypageListItemIcon}>
                                                {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                                <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation} pages={`메인페이지`}/>
        </>
    )
}


const styles = StyleSheet.create({
    mypageinfo: {
        borderBottomWidth: 8,
        borderColor: '#ededf1',
    },
    mypageList_name: {
        fontSize: Platform.OS === 'ios' ? 17 : 16,
        color: "#08052f",
    },
    user_cmy_name: {
        fontWeight: "600",
        paddingBottom: 10,
    },
    user_name: {
        color: "#696A81",
        paddingBottom: 10,
    },
    user_point: {
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        color: "#4549e0",
        marginBottom: 24,
    },
    user_point_score: {
        paddingLeft: 24,
    },
    user_point_link: {
        borderWidth: 1,
        borderColor: "#3d40e0",
        borderRadius: 5,
        paddingVertical: 7,
        paddingHorizontal: 18,
    },
    user_point_link_txt: {
        textAlign: "center",
        fontSize: 12,
        lineHeight: 22,
        color: "#3d40e0",
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
    mypageListItem_link: {
        width: "100%",
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    mypageListItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderColor: '#ededf1',
    },

})