import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import logo from "../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";


export default function Cscenter({navigation}) {

    console.log('고객센터');


    return (
        <ScrollView style={styles.container}>
            <View style={styles.mypageList}>
                <TouchableOpacity onPress={()=>{navigation.navigate('자주묻는질문')}}>
                    <View style={styles.mypageListItem}>
                        <View style={styles.mypageListItemTitle}>
                            <Text style={styles.mypageList_name}>자주묻는질문</Text>
                        </View>
                        <View style={styles.mypageListItemIcon}>
                            <Text style={styles.mypageList_name}> > </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('1:1문의작성')}}>
                    <View style={styles.mypageListItem}>
                        <View style={styles.mypageListItemTitle}>
                            <Text style={styles.mypageList_name}>1:1문의</Text>
                        </View>
                        <View style={styles.mypageListItemIcon}>
                            <Text style={styles.mypageList_name}> > </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('고객센터')}>
                    <View style={styles.mypageListItem}>
                        <View style={styles.mypageListItemTitle}>
                            <Text style={styles.mypageList_name}>고객센터</Text>
                        </View>
                        <View style={styles.mypageListItemIcon}>
                            {/*<Icon name="chevron-forward-outline" size={25} color="#000" />*/}
                            <Text style={styles.mypageList_name}> > </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
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
        fontSize: Platform.OS === 'ios' ? 18 : 17,
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
        fontSize: Platform.OS === 'ios' ? 20 : 19,
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
        fontSize: Platform.OS === 'ios' ? 30 : 29,
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
        fontSize: Platform.OS === 'ios' ? 20 : 19,
        fontWeight: "700",
        paddingLeft: 22,
        paddingRight: 22

    },
    desc02: {
        textAlign: "center",
        fontSize: Platform.OS === 'ios' ? 15 : 14,
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
        fontSize: Platform.OS === 'ios' ? 15 : 14,
        fontWeight: "700"
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