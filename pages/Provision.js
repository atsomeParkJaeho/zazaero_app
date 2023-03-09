import React, {useEffect, useState} from 'react'
import {View,Text,StyleSheet,Image, TouchableOpacity, ScrollView} from 'react-native'
import logo from "../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import ProvisionDisc from "../ProvisionDisc.json";
import ProvisionTap from "../components/ProvisionTap";
import {getAppInfo} from "./order/UTIL_order";
import {priName} from "../util/util";
import {text_primary} from "../common/style/AtStyle";


export default function Provision({route, navigation}){


    const {cfg_part2} = route.params;
    const [A_provision, set_A_provision] = useState([]);
    const [show_provision, set_show_provision] = useState(`${cfg_part2}`);

    useEffect(()=>{
        getAppInfo().then((res)=>{
            if(res) {
                console.log(res.data);
                const {result , app_info} = res.data;
                if(result === 'OK') {
                    let temp = app_info.A_provision.filter(val=>val.cfg_part2 !== "default_provision" );
                    set_A_provision(temp);
                }
            }
        });
    },[]);

    console.log(A_provision);
    console.log(show_provision);


    return  (
        <ScrollView style={styles.container}>

            <View style={styles.Provision_tap}>
                {A_provision.map((val,idx)=>{
                    if(val.cfg_part2 !== '') {
                        return(
                            <>
                                <View key={idx} style={styles.Provision_tap_item}>
                                    <TouchableOpacity
                                        onPress={()=>set_show_provision(`${val.cfg_part2}`)}
                                        style={[styles.Provision_tap_item_link, styles.borderTop, styles.borderRight]} >
                                        {(val.cfg_part2 === show_provision) ? (
                                            <Text numberOfLines={1} style={[styles.Provision_tap_item_title, text_primary]}>
                                                {priName(val.cfg_part2)}
                                            </Text>
                                        ):(
                                            <Text numberOfLines={1} style={styles.Provision_tap_item_title}>
                                                {priName(val.cfg_part2)}
                                            </Text>
                                        )}

                                    </TouchableOpacity>
                                </View>
                            </>
                        );
                    }
                })}
            </View>

            {/**/}
            <View style={styles.NoticeView_disc_box}>
                {/* 개인정보처리탭영역 */}
                {A_provision.map((val,idx)=>{
                    if(val.cfg_part2 === show_provision) {
                        return (
                            <>
                                <View>
                                    <Text>
                                        {val.cfg_txt_val1}
                                    </Text>
                                </View>
                            </>
                        );
                    }
                })}
            </View>
            {/**/}
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
    top_innertwo:{
        flexDirection:"row",
        justifyContent:"space-around",
    },
    toptitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#222",
    },
    Provision_tap:{
        marginTop:30,
        flexDirection:"row",
        flexWrap:"wrap",
    },
    Provision_tap_item:{
        width:'50%',
    },
    Provision_tap_item_link:{
        padding:12,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },
    Provision_tap_item_title:{
        fontSize:14,
    },
    borderTop:{
        borderTopWidth:1,
        borderColor:'#ededf1',
    },
    borderRight:{
        borderRightWidth:1,
        borderColor:'#ededf1',
    },
    NoticeView_disc_box:{
        padding:16,
    }
})