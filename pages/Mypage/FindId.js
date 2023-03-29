import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from 'react-native';

// 공통 CSS 추가
import {
    container,
    bg_white,
    btn_outline_primary,
    text_primary,
    text_center,
    pt2,
    pb2, h20, pt1, pb1, mt3
} from '../../common/style/AtStyle';
import {Phone} from "../../util/util";
import axios from "axios";
import {search_id} from "../UTIL_mem";
import {useIsFocused} from "@react-navigation/native";


export default function FindId({route, navigation}) {

    console.log('아이디 찾기');

    const ChkInput = useRef([]);


    // 1. 전달값 셋팅
    const [FindId,setFindId] = useState({
        type          :'id',
        mem_name      :'',
        mem_mobile    :'',
    });
    // 2. 입력시 상태 값 저장
    const goInput = (key, value) => {
        setFindId({
            ...FindId,
            [key]:value,
        });
    }



    // 3. 본인 인증창 실행
    const goFind = () => {
        if(FindId.mem_name === '') {
            Alert.alert('','이름을 입력해주세요.');
            return ChkInput.current[0].focus();
        }

        if(FindId.mem_mobile === '') {
            Alert.alert('','휴대폰번호를 입력해주세요.');
            return ChkInput.current[1].focus();
        }

        search_id(FindId).then((res) => {
            if (res) {
                console.log(res.data);
                const {result, alert_msg} = res.data;
                if (result === 'OK') {
                    navigation.replace('아이디 찾기결과',{FindId:FindId});
                    return Alert.alert('','회원님의 연락처로 인증번호가\n전송되었습니다.');
                }
                if(alert_msg) {
                    Alert.alert('',`${alert_msg}`);
                }
            }
        }).catch((err) => console.log(err));
    }

    console.log(FindId)

    return   (
            <>
                <KeyboardAvoidingView style={[styles.avoidingView]} behavior={Platform.select({ios: 'padding'})}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={[styles.FindId]}>
                            <View style={[styles.container,{paddingTop:0}]}>
                                <View style={styles.center_middle}>
                                    <Text style={styles.FindId_txt}>
                                        가입시 입력하신 {'\n'}
                                        담당자의 연락처 인증을 통해{'\n'}
                                        아이디를 찾을 수 있습니다.
                                    </Text>
                                    {/*이름*/}
                                    <TextInput
                                        style={[styles.input,{marginBottom: 15}]}
                                        onChangeText={(mem_name)=>goInput('mem_name',mem_name)}
                                        value={`${FindId.mem_name}`}
                                        ref={val=>ChkInput.current[0] = val}
                                        placeholder="이름"
                                        autoCapitalize="none"
                                    />
                                    {/*전화번호*/}
                                    <TextInput
                                        onChangeText={(mem_mobile)=>goInput('mem_mobile',mem_mobile)}
                                        style={styles.input}
                                        value={Phone(FindId.mem_mobile)}
                                        ref={val=>ChkInput.current[1] = val}
                                        placeholder="전화번호"
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity style={[btn_outline_primary,mt3,styles.border_radius]} onPress={()=>goFind()}>
                                        <Text style={[text_primary,text_center,pt1,pb1,h20]}>본인인증</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>

            </>
    );
}

const styles = StyleSheet.create({
    avoidingView: {
        flex: 1,
    },

    FindId:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#fff",
    },
    container:{
        padding:32,
        width:"100%",
    },
    FindId_txt:{
        fontSize:20,
        lineHeight:24,
        fontWeight:"500",
        color:"#333",
        paddingBottom:24,
    },
    FindId_btn:{
        backgroundColor:"#4549E0",
        paddingVertical:7,
        borderRadius:5,
    },
    FindId_btn_txt:{
        textAlign:"center",
        fontSize:20,
        lineHeight:24,
        color:"#fff",
    },
    border_radius:{
        borderRadius:5,
    },
    input: {
        height: 46,
        margin: 0,
        borderRadius:5,
        borderWidth: 1,
        paddingVertical:7,
        paddingHorizontal: 18,
        borderColor:"#ededf1",
        fontSize:12,
        marginBottom:0,
    },
});