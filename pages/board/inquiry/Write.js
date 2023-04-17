import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    Button,
    CheckBox,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Pressable, Alert
} from 'react-native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    flex,
    input,
    textarea,
    mt2,
    justify_content_between, wt5, bg_primary, ms1, me1, h13, text_center, text_white
} from '../../../common/style/AtStyle';
import {sub_page} from '../../../common/style/SubStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CameraIcon from "../../../icons/camera_icon.svg";
import * as ImagePicker from "expo-image-picker";
import {img_upload_test} from "../../order/UTIL_order";
import Close from "../../../icons/close_black.svg";


export default function InquiryWrite({navigation,route}) {

    // console.log('1:1문의작성');

    // 1. 글입력 상태 셋팅
    const [Write,setWrite] = useState({
        bd_type:'inquiry',
        man_name:'',                // 작성자
        bd_title:'',                // 제목
        bd_contents:'',             // 내용
        act_type:'INS',             // 글쓰기 옵션
    }); // 작성폼 설정
    // 2. 글쓰는 회원 uid 정보 추가
    useEffect(()=>{
        const mem_uid = AsyncStorage.getItem('member').then((value) => {
            if (value) {
                setWrite({
                    ...Write,
                    man_name:value,
                });
            }
        });
    },[])
    // 3. 글입력시 status 업데이트
    const goInput = (keyValue, e) => {
        setWrite({
            ...Write,
            [keyValue]:e,
        });
    };

    // 4. 문의하기 클릭시 관리자로 전달
    const goForm = () => {
        axios.post('',Write,{
            headers:{
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                alert('문의하기에 등록되었습니다.');
                navigation.navigate('나의 문의내역');
            } else {
                alert('연결실패');
            }
        });
    }
    console.log(Write);

    //===========================================
    const [selectedImages, setSelectedImages] = useState([]);   // 첨부이미지
    const MAX_IMAGES = 2;
    const takePicture = async () => {
        let data = {
            get_gd_order:get_gd_order,
            addr1:addr1,
            addr2:addr2,
            zonecode:zonecode,
            save_pic_list:save_pic_list,
        }
        navigation.navigate(`카메라`,data);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes          :ImagePicker.MediaTypeOptions.Images,
            allowsEditing       :false,
            quality             :1,
            base64              :true,
        });
        console.log(result,'/[첨부확인]');
        if (!result.cancelled) {
            if (selectedImages.length < MAX_IMAGES) {
                setSelectedImages([...selectedImages, result]);
            } else {
                return Alert.alert(``,`최대 2장까지만 등록 가능합니다.`);
            }
        }
    };

    const removeImage = (index) => {
        const images = [...selectedImages];
        images.splice(index, 1);
        setSelectedImages(images);
    };

    const upload_test = () => {
        img_upload_test(selectedImages).then((res)=>{
            if(res) {
                const {result} = res.data;
                if(result === 'OK') {
                    return Alert.alert(``,`성공`);
                } else {
                    return Alert.alert(``,`${result}`);
                }
            }
        });
    }
    //===========================================

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.InquiryWrite]}>
                    {/*  상단탭 영역  */}
                    <View style={[styles.InquiryTab,flex]}>
                        <View style={[styles.InquiryTab_item]}>
                            <TouchableOpacity style={[styles.InquiryTab_link,styles.active_link]} onPress={()=>{navigation.navigate('1:1문의작성')}} >
                                <Text style={[styles.InquiryTab_txt,styles.active_txt]}>1:1 문의</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.InquiryTab_item]}>
                            <TouchableOpacity style={styles.InquiryTab_link} onPress={()=>{navigation.navigate('1:1문의목록')}} >
                                <Text style={[styles.InquiryTab_txt]}>나의 문의 내역</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*내용 입력*/}
                    <View style={[styles.InquiryForm]}>
                        <View style={[container]}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>제목</Text>
                                <TextInput
                                    onChangeText={(bd_title) => goInput("bd_title", bd_title)} value={Write.bd_title}
                                    style={input}/>
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>내용</Text>
                                <TextInput
                                    onChangeText={(bd_contents) => goInput("bd_contents", bd_contents)} value={Write.bd_contents}
                                    style={textarea} multiline={true} numberOfLines={4}/>
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>첨부파일</Text>
                                {/**/}
                                <View  style={[]} >
                                    <View  style={[flex,justify_content_between]} >
                                        <View  style={[wt5]} >
                                            <TouchableOpacity onPress={takePicture} style={[styles.button,bg_primary,ms1,me1]}>
                                                <Text style={[h13,text_center,text_white]}>사진 촬영</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View  style={[wt5]} >
                                            <TouchableOpacity onPress={pickImage} style={[styles.button,bg_primary,ms1,me1]}>
                                                <Text style={[h13,text_center,text_white]}>사진 업로드</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {(selectedImages !== undefined) && (
                                        <>
                                            <View style={[styles.imagesContainer]}>
                                                {selectedImages.map((image, index) => (
                                                    <View key={index} style={styles.imageContainer}>
                                                        <TouchableOpacity onPress={() => removeImage(index)} style={styles.deleteButton}>
                                                            <Close width={11} height={11}/>
                                                        </TouchableOpacity>
                                                        {(image.base64) && (
                                                            <Image source={{ uri: `data:image/jpg;base64,${image.base64}` }} style={styles.image}  resizeMode="contain"/>
                                                        )}
                                                    </View>
                                                ))}
                                            </View>
                                        </>
                                    )}

                                    {/*<TouchableOpacity onPress={upload_test} style={[styles.button,bg_primary]}>*/}
                                    {/*    <Text style={[h13,text_center,text_white]}>이미지 업로드 테스트</Text>*/}
                                    {/*</TouchableOpacity>*/}
                                </View>
                                {/**/}
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
            {/*  1:1문의 작성영역  */}
            <View style={[styles.form_btn,styles.form_meminfo_btn]}>
                <TouchableOpacity onPress={goForm} style={[styles.form_btn_link,styles.form_btn_meminfo_link]} >
                    <Text style={styles.form_btn_txt}>문의하기</Text>
                </TouchableOpacity>
            </View>
            {/*  전송버튼  */}
        </>


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
//
    image: {
        width: 160,
        height: 220,
        margin: 5,
        borderWidth:1,
        borderColor:"#ccc",
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        justifyContent:"center",
    },
    imageContainer: {
        position: 'relative',
        width: 160,
        height: 220,
        marginRight: 10,
        marginBottom: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: -5,
        zIndex: 1,
        backgroundColor:'red',
        borderRadius:100,
        padding:7,
    },
});