import React,{useState,useEffect} from 'react';
import { StyleSheet, Button, CheckBox,  Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';


// 공통 CSS 추가
import {container, bg_white,flex_between,flex,input,textarea} from '../../../common/style/AtStyle';
import {sub_page} from '../../../common/style/SubStyle';



export default function InquiryWrite({navigation,route}) {

    const [Title, onChangeTitle] = React.useState("");
    //제목
    const [Disc, onChangeDisc] = React.useState("");
    //내용




    return (
        <ScrollView style={[bg_white]}>
            <View style={[styles.InquiryWrite]}>
                <View style={[styles.InquiryTab,flex]}>
                    <View style={[styles.InquiryTab_item]}>
                        <TouchableOpacity style={styles.InquiryTab_link,styles.active_link} onPress={()=>{navigation.navigate('1:1문의작성')}} >
                            <Text style={[styles.InquiryTab_txt,styles.active_txt]}>1:1 문의</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.InquiryTab_item]}>
                        <TouchableOpacity style={styles.InquiryTab_link} onPress={()=>{navigation.navigate('1:1문의목록')}} >
                            <Text style={[styles.InquiryTab_txt]}>나의 문의 내역</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*  상단탭 영역  */}
                <View style={[styles.InquiryForm]}>
                    <View style={[container]}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>제목</Text>
                            <TextInput style={input}  onChangeText={onChangeTitle}  placeholder="" value={Title}/>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>내용</Text>
                            <TextInput style={textarea}   multiline={true} numberOfLines={4}  onChangeText={onChangeDisc}  placeholder="" value={Disc}/>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>첨부파일</Text>
                            <TextInput style={input}  onChangeText={onChangeTitle}  placeholder="" value={Title}/>
                        </View>
                    </View>
                </View>
                {/*  1:1문의 작성영역  */}
                <View style={[styles.form_btn,styles.form_meminfo_btn]}>
                    <TouchableOpacity style={[styles.form_btn_link,styles.form_btn_meminfo_link]} >
                        <Text style={styles.form_btn_txt}>문의하기</Text>
                    </TouchableOpacity>
                </View>
                {/*  전송버튼  */}
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({

    InquiryTab:{
        marginBottom:25,
    },
    InquiryTab_item:{
        width:"50%",
    },
    InquiryTab_txt:{
        textAlign:"center",
        fontSize:16,
        lineHeight:24,
        paddingBottom:16.
    },
    InquiryTab_link:{
        borderBottomWidth:1,
        borderColor:"#ededf1"
    },
    active_txt:{
        color:"#3D40E0",
    },
    active_link:{
        borderBottomWidth:5,
        borderColor:"#3D40E0"
    },
    inputTopText:{
        fontSize:16,
        lineHeight:24,
        paddingBottom:17,
    },
    inputGroup:{
        paddingBottom:20,
    },
    form_btn:{
        backgroundColor:"#B1B2C3",
        paddingVertical:20,
    },
    form_btn_txt:{
        textAlign:"center",
        fontSize:17,
        lineHeight:24,
        color:"#fff",
    },
});