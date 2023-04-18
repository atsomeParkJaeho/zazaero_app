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
import {get_Member} from "../../UTIL_mem";
import {get_bd_detail, save_bd} from "../UTIL_bd";
import {useIsFocused} from "@react-navigation/native";


export default function Inquirybd_data({route, navigation}) {
    // 1. 글입력 상태 셋팅
    const [Member,  setMember] = useState(``);
    const [bd_data, set_bd_data]    = useState({
        bd_type             :'inquiry',
        bd_title            :'',
        bd_contents         :'',
    }); // 작성폼 설정
    const [A_del_file,        set_A_del_file]      = useState([]);   // 삭제 이미지
    const [get_bd_file1,      set_bd_file1]             = useState([]);
    const [get_bd_file2,      set_bd_file2]             = useState([]);
    const update = useIsFocused();
    const MAX_IMAGES = 2;
    // 2. 글쓰는 회원 uid 정보 추가
    useEffect(()=>{
        get_Member().then((res)=>{if(res) {setMember(res);} else {
            Alert.alert(``,`실패`);
            return navigation.navigate('로그인');
        }});
        /**-----------------------------------게시물 수정시----------------------------------------**/
        if(route.params) {
            const {get_bd_data,save_pic_list,bd_file} = route.params;
            if(get_bd_data.bd_uid) {
                get_bd_detail(get_bd_data.bd_uid, get_bd_data.bd_type).then((res)=>{
                    if(res) {
                        console.log(res.data);
                        const {result, bd_data, A_file} = res.data;
                        if(result === 'OK') {
                            // 1. 상세보기 데이터 불러오기
                            set_bd_data(bd_data);
                            if(A_file.bd_file1) {
                                let bd_file1 = {
                                    uri      :(A_file.bd_file1.src_path) ? A_file.bd_file1.src_path:'',
                                    uid      :(A_file.bd_file1.uid) ? A_file.bd_file1.uid:'',
                                    upload_name :(A_file.bd_file1.upload_name) ? A_file.bd_file1.upload_name:'',
                                };
                                set_bd_file1(bd_file1);
                            }
                            if(A_file.bd_file2) {
                                let bd_file2 = {
                                    uri      :(A_file.bd_file2.src_path) ? A_file.bd_file2.src_path:'',
                                    uid      :(A_file.bd_file2.uid) ? A_file.bd_file2.uid:'',
                                    upload_name :(A_file.bd_file2.upload_name) ? A_file.bd_file2.upload_name:'',
                                };
                                set_bd_file2(bd_file2);
                            }
                            // 2. 첨부파일 이미지 불러오기
                        } else {
                            return Alert.alert(``,`${result}`);
                        }
                    }
                });
            }
            if(save_pic_list) {
                if(bd_file === 'bd_file1') {
                    set_bd_file1(save_pic_list);
                }
                if(bd_file === 'bd_file2') {
                    set_bd_file2(save_pic_list);
                }
            }
        }
    },[Member,update]);

    const takePicture = async (bd_file) => {
        let data = {
            page         :'1:1문의 작성',
            bd_file      :bd_file,
            save_pic_list:[get_bd_file1, get_bd_file2],
        }
        navigation.navigate(`카메라`,data);
    };

    const pickImage = async (pickImage) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes          :ImagePicker.MediaTypeOptions.Images,
            allowsEditing       :false,
            quality             :1,
            base64              :true,
        });
        console.log(result,'/[첨부확인]');
        if (!result.cancelled) {
            /** ----------------------------사업자 등록증 사본 ----------------------------**/
            if(pickImage === 'bd_file1') {
                set_bd_file1(result);
            }
            /** ----------------------------통장사본 ----------------------------**/
            if(pickImage === 'bd_file2') {
                set_bd_file2(result);
            }
        }
    };

    const removeImage = (name,uid) => {
        if(name === 'get_bd_file1') {
            set_bd_file1([]);
            set_A_del_file([...A_del_file, uid]);
        }
        if(name === 'get_bd_file2') {
            set_bd_file1([]);
            set_A_del_file([...A_del_file, uid]);
        }
    };

    // 3. 글입력시 status 업데이트
    const goInput = (name, value) => {
        set_bd_data({
            ...bd_data,
            [name]:value,
        });
    };
    // 4. 문의하기 클릭시 관리자로 전달
    const goForm = () => {
        if(!bd_data.bd_title) {
            return  Alert.alert(``,`제목을 입력해주세요.`);
        }
        if(!bd_data.bd_contents) {
            return  Alert.alert(``,`내용을 입력해주세요.`);
        }
        Alert.alert(``,`게시물을 등록하시겠습니까?`,[
            {text:'취소', onPress:()=>{}},
            {text:"확인", onPress:()=>{
                    save_bd(Member, bd_data, A_del_file, get_bd_file1, get_bd_file2).then((res)=>{
                        if(res) {
                            const {result} = res.data;
                            if(result === 'OK') {
                                navigation.replace(`1:1문의목록`);
                                return Alert.alert(``,`등록이 완료되었습니다.`);
                            } else {
                                return Alert.alert(``,`${result}`);
                            }
                        }
                    });
                }}
        ]);
    }

    //===========================================


    //===========================================
    console.log(A_del_file,'/삭제이미지');
    console.log(get_bd_file1,'/이미지1');
    console.log(get_bd_file2,'/이미지2');

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.Inquirybd_data]}>
                    {/*  상단탭 영역  */}
                    <View style={[styles.InquiryTab,flex]}>
                        <View style={[styles.InquiryTab_item]}>
                            <TouchableOpacity style={[styles.InquiryTab_link,styles.active_link]} onPress={()=>{navigation.replace('1:1문의작성')}} >
                                <Text style={[styles.InquiryTab_txt,styles.active_txt]}>1:1 문의</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.InquiryTab_item]}>
                            <TouchableOpacity style={styles.InquiryTab_link} onPress={()=>{navigation.replace('1:1문의목록')}} >
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
                                    onChangeText={(bd_title) => goInput("bd_title", bd_title)} value={bd_data.bd_title}
                                    style={input}/>
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>내용</Text>
                                <TextInput
                                    onChangeText={(bd_contents) => goInput("bd_contents", bd_contents)} value={bd_data.bd_contents}
                                    style={textarea} multiline={true} numberOfLines={4}
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>첨부파일</Text>
                                {/**/}
                                <View  style={[]} >
                                    {/**등록시 노출**/}

                                    {(get_bd_file1.uri) ? (
                                        <>
                                            <View style={[styles.imagesContainer]}>
                                                <View style={styles.imageContainer}>
                                                    <TouchableOpacity onPress={() => removeImage(`get_bd_file1`,`${get_bd_file1.uid}`)} style={styles.deleteButton}>
                                                        <Close width={11} height={11}/>
                                                    </TouchableOpacity>
                                                    {(get_bd_file1.base64) ? (
                                                        <Image source={{ uri: `data:image/jpg;base64,${get_bd_file1.base64}` }} style={styles.image}  resizeMode="contain"/>
                                                    ):(
                                                        <>
                                                            <Image source={{ uri: `http://www.zazaero.com${get_bd_file1.uri}` }} style={styles.image}  resizeMode="contain"/>
                                                        </>
                                                    )}
                                                </View>
                                            </View>
                                        </>
                                    ) : (
                                        <>
                                            <View  style={[flex,justify_content_between]} >
                                                <View  style={[wt5]} >
                                                    <TouchableOpacity onPress={()=>takePicture(`bd_file1`)} style={[styles.button,bg_primary,ms1,me1]}>
                                                        <Text style={[h13,text_center,text_white]}>사진 촬영</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View  style={[wt5]} >
                                                    <TouchableOpacity onPress={()=>pickImage(`bd_file1`)} style={[styles.button,bg_primary,ms1,me1]}>
                                                        <Text style={[h13,text_center,text_white]}>사진 업로드</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </>
                                    )}
                                    {(get_bd_file2.uri) ? (
                                        <>
                                            <View style={[styles.imagesContainer]}>
                                                <View style={styles.imageContainer}>
                                                    <TouchableOpacity onPress={() => removeImage(`get_bd_file2`,`${get_bd_file2.uid}`)} style={styles.deleteButton}>
                                                        <Close width={11} height={11}/>
                                                    </TouchableOpacity>
                                                    {(get_bd_file2.base64) ? (
                                                        <Image source={{ uri: `data:image/jpg;base64,${get_bd_file2.base64}` }} style={styles.image}  resizeMode="contain"/>
                                                    ):(
                                                        <>
                                                            <Image source={{ uri: `http://www.zazaero.com${get_bd_file2.uri}` }} style={styles.image}  resizeMode="contain"/>
                                                        </>
                                                    )}
                                                </View>
                                            </View>
                                        </>
                                    ) : (
                                        <>
                                            <View  style={[flex,justify_content_between]} >
                                                <View  style={[wt5]} >
                                                    <TouchableOpacity onPress={()=>takePicture(`bd_file2`)} style={[styles.button,bg_primary,ms1,me1]}>
                                                        <Text style={[h13,text_center,text_white]}>사진 촬영</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View  style={[wt5]} >
                                                    <TouchableOpacity onPress={()=>pickImage(`bd_file2`)} style={[styles.button,bg_primary,ms1,me1]}>
                                                        <Text style={[h13,text_center,text_white]}>사진 업로드</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </>
                                    )}
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