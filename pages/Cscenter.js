import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,Linking} from 'react-native'
import logo from "../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import {bg_white, text_primary} from "../common/style/AtStyle";
import ArrowRight from "../icons/arrow_r.svg";


export default function Cscenter({navigation}) {

    // console.log('고객센터');


    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={styles.mypageList}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('자주묻는질문')}}>
                        <View style={styles.mypageListItem}>
                            <View style={styles.mypageListItemTitle}>
                                <Text style={styles.mypageList_name}>자주묻는질문</Text>
                            </View>
                            <View style={styles.mypageListItemIcon}>
                                <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('1:1문의작성')}}>
                        <View style={styles.mypageListItem}>
                            <View style={styles.mypageListItemTitle}>
                                <Text style={styles.mypageList_name}>1:1문의</Text>
                            </View>
                            <View style={styles.mypageListItemIcon}>
                                <Text style={styles.mypageList_name}> <ArrowRight width={11} height={18} /> </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {Linking.openURL('tel:1666-7099');}}>
                        <View style={styles.mypageListItem}>
                            <View style={styles.mypageListItemTitle}>
                                <Text style={styles.mypageList_name}>고객센터</Text>
                            </View>
                            <View style={styles.mypageListItemIcon}>
                                {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                                <Text style={[styles.mypageList_name,text_primary]}> 1666-7099 </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    mypageList_name: {
        fontSize: Platform.OS === 'ios' ? 17 : 16,
        color: "#08052f",
    },
    mypageList: {
        marginTop: 30,
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
        fontSize: Platform.OS === 'ios' ? 16 : 15,
    },
    csphone: {
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        color: '#3d40e0',
    },
})