import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    useWindowDimensions,
    Alert,
    Platform,
    Modal
} from 'react-native'
import logo from "../../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import RenderHTML from "react-native-render-html";
import {
    align_items_center,
    bg_gray,
    bg_primary,
    bg_white,
    d_flex,
    h14, h18, justify_content_center, mb2, mb3, mt3,
    pb1,
    pt1,
    text_center,
    text_white
} from "../../../common/style/AtStyle";
import {get_Member} from "../../UTIL_mem";
import {get_bd_detail} from "../UTIL_bd";

export default function inquiryView({route, navigation}){
    console.log('상세내용');
    const {bd_uid} = route.params;
    const [Member,  setMember]          = useState(``);
    const [get_bd_data, set_bd_data]    = useState([]);
    const [get_file, set_file]          = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
        get_Member().then((res)=>{if(res) {setMember(res);} else {
            Alert.alert(``,`실패`);
            return navigation.navigate('로그인');
        }});
        get_bd_detail(bd_uid, `inquiry`).then((res)=>{
            if(res) {
                console.log(res.data,'/[리턴값]');
                const {result,bd_data, A_file} = res.data;
                if(result === 'OK') {
                    set_bd_data(bd_data);
                    set_file(A_file);
                }  else {
                    return Alert.alert(``,`${result}`);
                }
            }
        });
    },[Member]);

    /**------------------------------수정하기 이동---------------------------------**/
    const form_mod = () => {
        return navigation.navigate('1:1문의작성',{get_bd_data:get_bd_data});
    }



    console.log(get_bd_data,'/[게시판 상세]');
    console.log(get_file,'/[이미지]');

    return(
        <>
            <ScrollView style={[bg_white]}>
                <View style={styles.get_bd_data}>
                    {/*================글제목====================*/}
                    <View style={styles.get_bd_data_title_box}>
                        <View style={styles.get_bd_data_title_in}>
                            <Text style={styles.get_bd_data_title}>{get_bd_data.bd_title}</Text>
                        </View>
                        <View style={styles.get_bd_data_date_in}>
                            <Text style={styles.get_bd_data_date}>{get_bd_data.reg_date}</Text>
                        </View>
                    </View>
                    {/*=============상세내용===============*/}
                    <View style={styles.get_bd_data_disc}>
                        <View style={styles.get_bd_data_disc_in}>
                            <RenderHTML source={{html:`${get_bd_data.bd_contents}`}}/>
                        </View>
                        <View style={[mt3,mb3]}>
                            <Text style={[h14,mb2]}>첨부사진</Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Image source={{ uri: `http://www.zazaero.com/upload/999999994022/mem_photo/61151121098446.jpg` }} style={styles.image} />
                            </TouchableOpacity>
                            <Modal visible={modalVisible} transparent={true}>
                                <View style={styles.modalBackground}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <View style={[styles.modalBackground_flex]}>
                                            <Image source={{ uri: `http://www.zazaero.com/upload/999999994022/mem_photo/61151121098446.jpg` }} style={styles.modalImage} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </View>
                        {(get_bd_data.bd_status_name === '답변완료') ? (
                            <>
                                <View style={styles.reply}>
                                    <Text style={styles.get_bd_data_title}>답변내용</Text>
                                    <View style={styles.reply_box}>
                                        <Text style={[h14,styles.reply_txt]}>{get_bd_data.bd_reply}</Text>
                                    </View>
                                </View>
                            </>
                        ):(
                            <></>
                        )}

                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={[bg_primary,styles.btn_default]} onPress={form_mod}>
                <View style={[d_flex, justify_content_center, align_items_center]}>
                    <Text style={[text_white,h18]}>
                        수정하기
                    </Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    btn_default:{
        paddingTop      : 25,
        paddingBottom   : Platform.OS === 'ios' ? 35 : 25,
        width           : "100%",

    },
    get_bd_data:{
        marginTop:30,
        paddingLeft:16,
        paddingRight:16,
    },
    get_bd_data_title:{
        fontSize:18,
        paddingBottom:23,
    },
    get_bd_data_date_in:{
        paddingBottom:23,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },
    get_bd_data_date:{
        fontSize:12,
        color:'#b1b2c3',
    },
    get_bd_data_disc_in:{
        marginTop:20,
    },
    reply_box:{
        backgroundColor:"#eee",
        paddingVertical:16,
        paddingHorizontal:10,
        borderRadius:5,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalBackground_flex:{
        width: 350,
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
})