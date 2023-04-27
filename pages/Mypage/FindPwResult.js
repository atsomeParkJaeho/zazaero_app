import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback
} from 'react-native';



// 공통 CSS 추가
import {
    container,
    bg_white,
    btn_outline_primary,
    mt3,
    text_primary,
    text_center,
    pt1, pb1, h20, mt2, pt3, pb3, text_white
} from '../../common/style/AtStyle';
import {reset_pw} from "../UTIL_mem";


export default function FindPw({route,navigation}) {

    const {mem_info} = route.params;
    const [focus,setFocus] = useState(false);
    const customStyle = focus ? styles.textInputFocus : styles.input;
    //1.
    const [FindPw, setFindPw]  = useState({
        mem_id                  :mem_info.mem_id,
        mem_pw                  :"",    //비밀번호
        mem_pw_ch               :"",   // 비밀번호 확인
    })


    //2. 입력폼 체크루틴
    const ChkInput = (keyValue, text)   =>{
        //기본 루틴
        setFindPw({
            ...FindPw,
            [keyValue]:text,
        })
    }
    const goFindPw = async () => {

        let regPw = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
        if (!FindPw.mem_pw) {
            return Alert.alert(``,'비밀번호를 입력하세요.',);
        }
        if (!FindPw.mem_pw_ch) {
            return Alert.alert(``,'비밀번호 확인을 입력하세요.',);
        }
        if(8 >= FindPw.mem_pw.length) {             // 비밀번호 최소
            return Alert.alert('',`8자 이상 입력해주세요.`);
        }
        if(regPw.test(FindPw.mem_pw) === false) {  // 특수문자 입력 필수
            return  Alert.alert('','특수 문자가 포함되어있지 않습니다.');
        }
        if (FindPw.mem_pw !== FindPw.mem_pw_ch){
            return Alert.alert(``,'비밀번호가 일치하지 않습니다.',);
        }

        Alert.alert(``,`비밀번호를 변경하시겠습니까?`,[
            {text:"취소"},
            {text:"확인",
            onPress:()=>{
                reset_pw(FindPw).then((res)=>{
                    if(res) {
                        console.log(res.data,'/[콜백확인]');
                        const {result} = res.data;
                        if(result === 'OK') {
                            Alert.alert(``,`비밀번호가 변경되었습니다.`,[
                                {text:'OK',
                                onPress:()=>{
                                    return navigation.navigate(`로그인`);
                                }
                                }
                            ]);
                        } else {
                            return Alert.alert(``,`${result}`);
                        }
                    }
                });
            }
            }
        ]);
    }
    
    console.log(FindPw,` / [비밀번호 입력값]`);
    
    return   (
        <>

            <KeyboardAvoidingView behavior={Platform.select({ios: 'padding'})} style={[styles.subPage,styles.FindId]}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.center_middle}>
                            <Text style={styles.FindId_txt}>
                                재설정 할 비밀번호를 {'\n'}
                                입력해주세요
                            </Text>
                            <TextInput style={styles.input}
                                       secureTextEntry={true}
                                       onFocus={()=>setFocus(true)}
                                       onChangeText={(mem_pw)=>ChkInput("mem_pw",mem_pw)}
                                       placeholder="비밀번호를 입력해주세요."
                                       value={FindPw.mem_pw}/>
                            <TextInput style={[styles.input,mt2]}
                                       secureTextEntry={true}
                                       onChangeText={(mem_pw_ch)=>ChkInput("mem_pw_ch",mem_pw_ch)}
                                       placeholder="비밀번호를 확인해주세요."
                                       value={FindPw.mem_pw_ch}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <View>
                <TouchableOpacity style={[styles.btn_color]} onPress={goFindPw}>
                    <Text style={[text_center,pt3,pb3,text_white]}>비밀번호 변경</Text>
                </TouchableOpacity>
            </View>

        </>



    );
}

const styles = StyleSheet.create({
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
    },
    btn_color:{
        backgroundColor:"#B1B2C3",
    },
    textInputFocus:{
        borderColor:"#3D40E0",
    }
});