import React, {useState, useEffect} from 'react';
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
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';

// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    input,
    h14,
    ps1,
    wt7,
    wt3,
    mt1,
    mb1,
    mt2,
    ms1,
    pt4,
    pb4,
    flex,
    btn_primary,
    textarea,
    flex_top,
    bg_primary,
    d_flex,
    justify_content_center, align_items_center, text_light, text_dark, bg_gray, justify_content_between, pos_center
} from '../../common/style/AtStyle';
import {sub_page, gary_bar} from '../../common/style/SubStyle';
import axios from "axios";

import CameraIcon from '../../icons/camera_icon.svg';



export default function RequestReturn({navigation, route}) {

    const [isChecked, setChecked] = useState(true);
    const [isChecked2, setChecked2] = useState(false);

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

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.RequestReturn]}>
                    <View style={[container]}>
                        {/*==============수거지 입력==============*/}
                        <Text style={[styles.FormTitle]}>수거지 입력</Text>
                        <View style={[styles.FormGroup]}>
                            <View  style={[flex]} >
                                {/*체크박스*/}
                                <Checkbox 
                                    style={styles.checkbox} 
                                    value={isChecked} 
                                    onValueChange={setChecked}
                                    color={"#4630eb"}/>
                                <Text style={[ms1]}>배송지</Text>
                            </View>
                            <View  style={[mt1]} >
                                <TextInput style={[input]} value="경기도 성남시 분당구 판교로289번길 20, 5층" />
                            </View>
                        </View>
                        {/*==============배송지 가져오기==============*/}
                        <View  style={[styles.FormGroup,mt2]} >
                            <View  style={[flex]} >
                                {/*체크박스*/}
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isChecked2}
                                    onValueChange={setChecked2}
                                    color={"#4630eb"}/>
                                <Text style={[ms1]}>직접입력</Text>
                            </View>
                            <View  style={[flex,mt1]} >
                                <View  style={[wt7]} >
                                    <TextInput style={[input]} value="" />
                                </View>
                                <View  style={[wt3,ps1]} >
                                    <TouchableOpacity style={[styles.addr_btn]}>
                                        <View  style={[pos_center]} >
                                            <Text style={[styles.addr_btn_txt]}>주소찾기</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View  style={[flex,mt1]} >
                               <Text style={[ms1]}>상세주소</Text>
                            </View>
                            <View  style={[mt1]} >
                                <TextInput style={[input]} value="" />
                            </View>
                        </View>
                        {/*==============배송지 직접입력==============*/}
                    </View>
                    <View  style={[styles.border_line]} />
                    <View  style={[container]} >
                        <View  style={[flex]} >
                            <Text style={[mb1]}>반품 자재 사진 등록</Text>
                        </View>
                        <View  style={[]} >
                            <Pressable style={[styles.upload_btn]} onPress={uploadImage}>
                                <View  style={[pos_center]} >
                                    <CameraIcon width={30} height={24}/>
                                </View>
                            </Pressable>
                            <View  style={[mt2,styles.upload_box]} >
                                <Image style={styles.upload_img} source={{uri: imageUrl}}/>
                            </View>
                        </View>
                    </View>
                    {/*==============반품사진 등록==============*/}
                    <View  style={[styles.border_line]} />
                    <View  style={[container]} >
                        <View  style={[flex]} >
                            <Text style={[mb1]}>반품 사유 및 수거 요청 사항</Text>
                        </View>
                        <View  style={[]} >
                            <TextInput style={[textarea]}/>
                        </View>
                    </View>
                    {/*==============반품사진 등록==============*/}
                </View>
            </ScrollView>
            {/*============배송정보 입력시 활성화=============*/}
            <View style={[bg_gray,pt4,pb4]}>
                <TouchableOpacity >
                    <Text style={[{textAlign: "center", color: "#fff", fontSize: 18,}]}>반품요청</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    FormTitle:{
        fontSize:16,
        marginBottom:20,
    },
    addr_btn:{
        backgroundColor:"#3D40E0",
        height:36,
        borderRadius:5,
    },
    addr_btn_txt:{
        fontSize:14,
        textAlign:"center",
        color:"#fff",
    },
    border_line:{
        marginBottom:5,
        marginTop:5,
        borderTopWidth:1,
        borderColor:"#eee",
    },
    camera_line:{
        borderWidth:1,
        height:75,
        borderColor:"#EDEDF1",
        position:"relative",
    },
    upload_box:{
        borderWidth:1,
        width:"100%",
        height:300,
        position:"relative",
    },
    upload_img:{
        resizeMode:"contain",
        width:"100%",
        height:'100%',

    },
});

