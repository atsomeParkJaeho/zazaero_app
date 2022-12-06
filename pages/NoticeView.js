import React from 'react'
import {View,Text,StyleSheet,Image, TouchableOpacity, ScrollView} from 'react-native'
import logo from "../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";



export default function NoticeView(){

    let mypageList_name = "가나인테리어";
    return(
        <ScrollView style={styles.container}>

            <View style={styles.top_inner}>
                <View style={styles.top_innerone}>
                    <Icon name="arrowleft" size={25} color="#000" />
                </View>
                <View style={styles.top_innerone}>
                    <Text style={styles.toptitle}>공지사항</Text>
                </View>
                <View style={styles.top_innertwo}>
                    <Icon name="home" size={25} color="#000" />
                </View>
            </View>

            <View style={styles.NoticeView}>
                <View style={styles.NoticeView_title_box}>
                    <View style={styles.NoticeView_title_in}>
                        <Text style={styles.NoticeView_title}>[긴급점검]서비스 안정화를 위한 점검 안</Text>
                    </View>
                    <View style={styles.NoticeView_date_in}>
                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                        <Text style={styles.NoticeView_date}> 2022-11-18 </Text>
                    </View>
                </View>
                <View style={styles.NoticeView_disc}>
                    <View style={styles.NoticeView_disc_in}>
                        <Text style={styles.NoticeView_disc}>
                            안녕하세요. 자재로입니다.
                            카드사 점검으로 인해 일부 서비스가 제한될 예정입니다.

                            감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다.

                            국회는 선전포고, 국군의 외국에의 파견 또는 외국군대의 대한민국 영역안에서의 주류에 대한 동의권을 가진다. 공공필요에 의한 재산권의 수용·사용 또는 제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다.

                            국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 대통령이 임시회의 집회를 요구할 때에는 기간과 집회요구의 이유를 명시하여야 한다.

                            국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다. 가부동수인 때에는 부결된 것으
                        </Text>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff",
    },
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
        paddingLeft:12,
        paddingRight:12,
        padding:16,
        borderBottomWidth:8,
        borderColor:'#ededf1',

    },
    mypageList_name:{
        fontSize:20,
        color:"#08052f",
        fontFamily: "Amatic-Bold",
        fontWeight:"700",
    },
    id:{
        marginStart:6,
        fontSize:17,
        color:"#08052f",
        fontWeight:"700",
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
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    NoticeView:{
        marginTop:30,
        paddingLeft:16,
        paddingRight:16,
    },
    NoticeView_title:{
        fontSize:18,
        paddingBottom:23,
    },
    NoticeView_date_in:{
        paddingBottom:23,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },
    NoticeView_date:{
        fontSize:12,
        color:'#b1b2c3',
    },
    mypageListItem:{
        paddingTop:16,
        paddingBottom:16,
        paddingLeft:20,
        paddingRight:20,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },
    NoticeView_disc_in:{
        marginTop:20,
    },
    NoticeView_disc:{
        fontSize:12,
        lineHeight:20,
        fontWeight:300,
    },
})