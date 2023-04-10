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
    Pressable
} from 'react-native';


// 공통 CSS 추가
import {container, bg_white, flex_between, flex, input, textarea, mt2} from '../../../common/style/AtStyle';
import {sub_page} from '../../../common/style/SubStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CameraIcon from "../../../icons/camera_icon.svg";


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
    /*
    const [imageUrl, setimageUrl] = useState('');
    //권한 요청을 위한 hooks
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const uploadImage = async () => {
        //권한 확인 코드 : 권한 없으면 물어보고, 승인하지 않으면 함수종료
        if (!status.granted){
            const permission = await requestPermission();
            if (!permission.granted){
                return null;
            }
        }
        //이미지 업로드 가능
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing : false,
            quality: 1,
            aspect:[1,1]
        });
        if (result.cancelled){
            return null; //이미지 업로드 취소한 경우
        }
        //이미지 업로드 결과 및 이미지 경로 업데이트
        console.log('이미지경로 : '+ result.uri);

        setimageUrl(result.uri);

    }
    console.log('이미지경로데이터값 : '+ imageUrl);
    */

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
                                <View  style={[]} >
                                    <Pressable style={[styles.upload_btn]} onPress={uploadImage}>
                                        <View  style={[]} >
                                            <CameraIcon width={30} height={24} style={[styles.CameraIcon]}/>
                                        </View>
                                    </Pressable>
                                    <View  style={[mt2,styles.upload_box,]} >
                                        <Image style={styles.upload_img} source={{uri: imageUrl}}/>
                                    </View>
                                </View>
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
    upload_btn:{
        borderWidth:1,
        borderColor:"#EDEDF1",
        borderRadius:5,
        paddingVertical:10,
    },
    camera_line:{
        borderWidth:1,
        height:75,
        borderColor:"#EDEDF1",
        position:"relative",
    },
    upload_box:{
        borderWidth:1,
        borderColor:"#EDEDF1",
        width:"100%",
        height:300,
        position:"relative",
        paddingVertical:10,
    },
    upload_img:{
        resizeMode:"contain",
        width:"100%",
        height:'100%',
    },
    CameraIcon:{
        borderWidth:1,
        borderColor:"#fff",
        marginLeft:'auto',
        marginRight:'auto',
    },
});