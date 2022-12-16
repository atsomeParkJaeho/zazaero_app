import React from 'react'
import {View,Text,StyleSheet,Image, TouchableOpacity, ScrollView} from 'react-native'
import logo from "../../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";



export default function NoticeList({navigation,route}){

    let mypageList_name = "가나인테리어";
    return(
        <ScrollView style={styles.container}>



            <View style={styles.mypageList}>

                <View style={styles.mypageListItem}>
                    <View style={styles.mypageListItemTitle}>
                        <TouchableOpacity style={styles.user_point_link} onPress={()=>{navigation.navigate('공지사항상세')}} >
                            <Text style={styles.mypageList_name}>[긴급점검]서비스 안정화를 위한 점검 안</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mypageListItemIcon}>
                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                        <Text style={styles.mypageList_name2}> 2022-11-18 </Text>
                    </View>
                </View>
                <View style={styles.mypageListItem}>
                    <View style={styles.mypageListItemTitle}>
                        <Text style={styles.mypageList_name}>[긴급점검]서비스 안정화를 위한 점검 안2</Text>
                    </View>
                    <View style={styles.mypageListItemIcon}>
                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                        <Text style={styles.mypageList_name2}> 2022-11-17 </Text>
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
    mypageList:{
        marginTop:30,
    },
    mypageListItem:{

        paddingTop:16,
        paddingBottom:16,
        paddingLeft:20,
        paddingRight:20,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },
    mypageList_name:{
        fontSize:16,
        paddingBottom:12,
    },
    mypageList_name2:{
        fontSize:12,
        color:'#b1b2c3',
    },
})