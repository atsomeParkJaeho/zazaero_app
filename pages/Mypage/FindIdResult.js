import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView
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
import {find_chk_mem} from "../UTIL_mem";




export default function FindId({route ,navigation}) {
    let {FindId, mem_info} = route.params;
    const [chk_num, set_chk_num] = useState({
        chk_num:'',
    });
    const ChkInput = useRef();

    useEffect(()=>{
        navigation.setOptions({
            title:(FindId.type === 'id') ? '아이디 찾기':'비밀번호 찾기'
        });
    },[]);

    const goInput = (key, value) => {
        set_chk_num({
            [key]:value,
        });
    }
    
    const goFindMem = () => {
        console.log(FindId.type,'/ 찾기 옵션');
        console.log(mem_info.certi_no,'/ 서버 인증번호');
        console.log(chk_num.chk_num,'/ 입력인증번호');
        // 인증번호 체크
        if(mem_info.certi_no === chk_num.chk_num) {
            if(FindId.type === 'id') {
                find_chk_mem(FindId, mem_info).then((res)=>{
                    console.log(res.data,'/[인증번호 체크 리턴값]');
                    if(res) {
                        const {result} = res.data;
                        if(result === 'OK') {
                            Alert.alert(``,`등록하신 휴대폰 번호로 아이디가 전송되었습니다.`);
                            return navigation.navigate(`로그인`);
                        } else {
                            return Alert.alert(``,`${result}`);
                        }
                    }
                });
            } else {
                return navigation.replace(`비밀번호 찾기결과`,{mem_info:mem_info});
            }
        } else {
            return Alert.alert(``,`인증번호가 맞지 않습니다.`);
        }
    }


    console.log(FindId,'/ 사용자 정보');
    console.log(mem_info.certi_no,'/ 서버 인증번호');
    console.log(chk_num,'/ 입력인증번호');

    return   (
        <>
            <KeyboardAvoidingView style={[styles.avoidingView]} behavior={Platform.select({ios: 'padding'})}>
                <View style={[styles.FindId]}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={[styles.container,{paddingTop:0}]}>
                            <View style={styles.center_middle}>
                                <Text style={styles.FindId_txt}>
                                    인증번호를 입력해주세요.
                                    {/*{mem_info.mem_id} 입니다.*/}
                                </Text>
                                <TextInput
                                    style={[styles.input,{marginBottom: 15}]}
                                    onChangeText={(chk_num)=>goInput('chk_num',Number(chk_num))}
                                    value={`${chk_num.chk_num}`}
                                    // ref={val=>ChkInput.current = val}
                                    placeholder="인증번호를 입력해주세요."
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity style={[btn_outline_primary,mt3,styles.border_radius]} onPress={()=>{goFindMem()}}>
                                    <Text style={[text_primary,text_center,pt1,pb1,h20]}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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