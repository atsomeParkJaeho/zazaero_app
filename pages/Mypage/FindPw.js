import React,{useState,useEffect,useRef} from 'react';
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
    mt3,
    text_primary,
    text_center,
    pt1, pb1, h20
} from '../../common/style/AtStyle';
import axios from "axios";
import {Phone} from "../../util/util";
import {search_pw_mobile} from "../UTIL_mem";




export default function FindPw({navigation,route}) {

    const ChkInput = useRef([]);


    // 1. 전달값 셋팅
    const [FindId,setFindId] = useState({
        type            :'pw',
        mem_id          :'',
        mem_name        :'',
        mem_mobile      :'',
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

        let {mem_mobile, mem_id, mem_name} = FindId;

        if(mem_id === '') {
            Alert.alert('','아이디를 입력해주세요.');
            return ChkInput.current[0].focus();
        }

        if(mem_name === '') {
            Alert.alert('','이름 입력해주세요.');
            return ChkInput.current[1].focus();
        }

        if(mem_mobile === '') {
            Alert.alert('','휴대폰번호를 입력해주세요.');
            return ChkInput.current[2].focus();
        }

        search_pw_mobile(FindId).then((res) => {
            if (res) {
                console.log(res.data);
                const {result} = res.data;
                if (result === 'OK') {
                    Alert.alert('본인인증','회원님의 연락처로 인증번호가\n전송되었습니다.');
                    return navigation.replace('아이디 찾기결과',{FindId:FindId});
                }
                if(result === 'NG') {
                    Alert.alert('','계정정보가 없습니다.');
                    return ChkInput.current[0].focus();
                }

                if (result === 'NG_info') {
                    Alert.alert('해당계정이 없습니다.');
                }
                if (result === 'NG_sns') {
                    Alert.alert('SNS로 회원가입하신 회원입니다.');
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
                                    담당자의 아이디/연락처{`\n`}
                                    인증을 통해 비밀번호를{`\n`}
                                    찾을 수 있습니다.
                                </Text>
                                {/*아이디*/}
                                <TextInput
                                    style={[styles.input,{marginBottom: 15}]}
                                    onChangeText={(mem_id)=>goInput('mem_id',mem_id)}
                                    value={`${FindId.mem_id}`}
                                    ref={val=>ChkInput.current[0] = val}
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    placeholder="아이디"
                                />
                                {/*이름*/}
                                <TextInput
                                    style={[styles.input,{marginBottom: 15}]}
                                    onChangeText={(mem_name)=>goInput('mem_name',mem_name)}
                                    value={`${FindId.mem_name}`}
                                    ref={val=>ChkInput.current[1] = val}
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    placeholder="이름"
                                />
                                {/*전화번호*/}
                                <TextInput
                                    onChangeText={(mem_mobile)=>goInput('mem_mobile',mem_mobile)}
                                    style={styles.input}
                                    value={Phone(FindId.mem_mobile)}
                                    ref={val=>ChkInput.current[2] = val}
                                    autoCapitalize="none"
                                    placeholder="전화번호"
                                    keyboardType="number-pad"
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
    border_radius:{
        borderRadius:5,
    }
});