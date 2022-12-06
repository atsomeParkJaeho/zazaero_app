import React from 'react'
import {View,Text,StyleSheet,Image, TouchableOpacity, ScrollView} from 'react-native'
import logo from "../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";

// 공통 CSS 추가
import {container, bg_white} from '../common/style/AtStyle';
import {sub_page} from '../common/style/SubStyle';

export default function MyPage({navigation,route}){

    let mypageList_test = "가나인테리어";


    return(
        <ScrollView style={[bg_white]}>

            <View style={styles.top_inner}>
                <View style={styles.top_innerone}>
                    <Icon name="arrowleft" size={25} color="#000" />
                </View>
                <View style={styles.top_innerone}>
                    <Text style={styles.toptitle}>마이페이지</Text>
                </View>
                <View style={styles.top_innertwo}>
                    <Icon name="home" size={25} color="#000" />
                </View>
            </View>
            {/*상단영역*/}

            <View style={[styles.mypageinfo]}>
                <View style={[container]}>
                    <Text style={styles.user_cmy_name}>가나인테리어</Text>
                    <Text style={styles.user_name}>홍길동 담당자 (01012345678)</Text>
                    <Text style={styles.user_point}>보유포인트:<Text style={styles.user_point_score}>5000P</Text></Text>
                    <TouchableOpacity style={styles.user_point_link} onPress={()=>{navigation.navigate('포인트내역')}} >
                        <Text style={[styles.user_point_link_txt]}>나의 포인트 보유내역 확인하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.mypageList}>
                <View style={styles.mypageListItem}>
                    <TouchableOpacity style={styles.mypageListItem_link} onPress={()=>{navigation.navigate('설정')}} >
                        <View style={styles.flex}>
                            <View style={styles.mypageListItemTitle}>
                                <Text style={styles.mypageList_name}>설정</Text>
                            </View>
                            <View style={styles.mypageListItemIcon}>
                                {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                <Text style={styles.mypageList_name}> > </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.mypageListItem}>
                    <View style={styles.mypageListItemTitle}>
                        <Text style={styles.mypageList_name}>회원정보변경</Text>
                    </View>
                    <View style={styles.mypageListItemIcon}>
                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                        <Text style={styles.mypageList_name}> > </Text>
                    </View>
                </View>
                <View style={styles.mypageListItem}>
                    <View style={styles.mypageListItemTitle}>
                        <Text style={styles.mypageList_name}>취소, 반품내역</Text>
                    </View>
                    <View style={styles.mypageListItemIcon}>
                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                        <Text style={styles.mypageList_name}> > </Text>
                    </View>
                </View>
                <View style={styles.mypageListItem}>
                    <View style={styles.mypageListItemTitle}>
                        <Text style={styles.mypageList_name}>공지사항</Text>
                    </View>
                    <View style={styles.mypageListItemIcon}>
                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                        <Text style={styles.mypageList_name}> > </Text>
                    </View>
                </View>
                <View style={styles.mypageListItem}>
                    <View style={styles.mypageListItemTitle}>
                        <Text style={styles.mypageList_name}>고객센터</Text>
                    </View>
                    <View style={styles.mypageListItemIcon}>
                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                        <Text style={styles.mypageList_name}> > </Text>
                    </View>
                </View>
                <View style={styles.mypageListItem}>
                    <View style={styles.mypageListItemTitle}>
                        <Text style={styles.mypageList_name}>약관 * 개인정보처리방침</Text>
                    </View>
                    <View style={styles.mypageListItemIcon}>
                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                        <Text style={styles.mypageList_name}> > </Text>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    top_inner:{
        marginTop:50,
        paddingLeft:12,
        paddingRight:12,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    me_10:{
        marginRight:8,
    },
    top_innertwo:{
        flexDirection:"row",
        justifyContent:"space-around",
    },
    toptitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#222",
    },
    mypageinfo:{
        borderBottomWidth:8,
        borderColor:'#ededf1',
    },
    mypageList_name:{
        fontSize:20,
        color:"#08052f",
        fontFamily: "Amatic-Bold",
        fontWeight:"700",
    },
    user_cmy_name:{
        fontSize:20,
        fontWeight:"600",
        paddingBottom:10,
    },
    user_name:{
        fontSize:16,
        color:"#696A81",
        paddingBottom:10,
    },
    user_point:{
        fontSize:14,
        color:"#4549e0",
        marginBottom:24,
    },
    user_point_score:{
        paddingLeft:24,
    },
    user_point_link:{
        borderWidth:1,
        borderColor:"#3d40e0",
        borderRadius:5,
        paddingVertical:7,
        paddingHorizontal:18,
    },
    user_point_link_txt:{
        textAlign:"center",
        fontSize:12,
        lineHeight:22,
        color:"#3d40e0",
    },
    title: {
        fontSize:30,
        fontWeight:"700",
        color:"#fff",
        paddingLeft:30,
        paddingTop:100,
        paddingRight:30
    },
    textContainer: {
        backgroundColor:"#fff",
        marginTop:12,
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center"
    },
    aboutImage:{
        width:150,
        height:150,
        borderRadius:30
    },
    desc01: {
        textAlign:"center",
        fontSize:20,
        fontWeight:"700",
        paddingLeft:22,
        paddingRight:22

    },
    desc02: {
        textAlign:"center",
        fontSize:15,
        fontWeight:"700",
        padding:22
    },
    button:{
        backgroundColor:"orange",
        padding:20,
        borderRadius:15
    },
    buttonText:{
        color:"#fff",
        fontSize:15,
        fontWeight:"700"
    },
    mypageListItem:{

    },
    mypageListItem_link:{
        width:"100%",
    },
    flex:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",

    },
    mypageList:{

    },
    mypageListItem:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop:16,
        paddingBottom:16,
        paddingLeft:20,
        paddingRight:20,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },
    mypageList_name:{
        fontSize:16,
    }
})