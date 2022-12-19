import React from 'react'
import {View,Text,StyleSheet,Image, TouchableOpacity, ScrollView, Linking} from 'react-native'
import logo from "../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";

// 공통 CSS 추가
import {container, bg_white,flex,flex_between} from '../common/style/AtStyle';
import {sub_page} from '../common/style/SubStyle';

export default function Cscenter({navigation,route}){

    let phoneNumber = "1600-7099";
    return(
        <ScrollView style={styles.container}>



            <View style={styles.mypageList}>
                <View style={styles.mypageListItem}>
                    <View style={styles.mypageListItemTitle}>
                        <Text style={styles.mypageList_name}>자주묻는질문</Text>
                    </View>
                    <View style={styles.mypageListItemIcon}>
                        {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                        <Text style={styles.mypageList_name}> > </Text>
                    </View>
                </View>
                <View style={styles.mypageListItem}>
                    <TouchableOpacity style={styles.mypageListItem_link} onPress={()=>{navigation.navigate('1:1문의작성')}} >
                        <View style={flex_between}>
                            <View style={styles.mypageListItemTitle}>
                                <Text style={styles.mypageList_name}>1:1문의</Text>
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
                        <Text style={styles.mypageList_name}>자재로 고객센터</Text>
                    </View>
                    <View style={styles.mypageListItemIcon}>
                        {/*<TouchableOpacity style="" onPress={{Linking.openURL(`tel:01012341234`}} >*/}
                        {/*    <Text style={styles.csphone}> 1666-7099 </Text>*/}
                        {/*</TouchableOpacity>*/}
                        <Text style={styles.csphone}> 1666-7099 </Text>
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
        fontSize:16,
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
    mypageList:{
        marginTop:30,
    },
    mypageListItem:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingTop:16,
        paddingBottom:16,
        paddingLeft:20,
        paddingRight:20,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },
    csphone:{
        fontSize:14,
        color:'#3d40e0',
    },
    mypageListItem_link:{
        width:"100%",
    },
})