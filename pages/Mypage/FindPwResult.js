import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';



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


export default function FindPw({navigation,route}) {

    const [focus,setFocus] = useState(false);
    const customStyle = focus ? styles.textInputFocus : styles.input;
    //1.
    const [FindPw, setFindPw]  = useState({
        mem_out_pw                  :"",    //비밀번호
        mem_out_pw_ch               :"",   // 비밀번호 확인

    })


    //2. 입력폼 체크루틴
    const ChkInput = (keyValue, text)   =>{
        //기본 루틴
        setFindPw({
            ...FindPw,
            [keyValue]:text,
        })
    }

    console.log(FindPw);

    console.log(focus);

    const goFindPw = async () => {
        const {mem_out_pw, mem_out_pw_ch} = FindPw;
        if (!FindPw.mem_out_pw) {
            Alert.alert(
                '비밀번호를 입력하세요.',
            );
            return;
        }
        if (!FindPw.mem_out_pw_ch) {
            Alert.alert('비밀번호확인을 입력해주세요.');
            return;
        }
        if (FindPw.mem_out_pw !== FindPw.mem_out_pw_ch){
            Alert.alert('비밀번호가 일치하지 않습니다!!');
            return;
        }

    }


    return   (
        <>
            <View style={[styles.subPage,styles.FindId]}>
                <View style={styles.container}>
                    <View style={styles.center_middle}>
                        <Text style={styles.FindId_txt}>
                            재설정 할 비밀번호를 {'\n'}
                            입력해주세요
                        </Text>
                        <TextInput style={styles.input}
                                   secureTextEntry={true}
                                   onFocus={()=>setFocus(true)}
                                   onChangeText={(mem_out_pw)=>ChkInput("mem_out_pw",mem_out_pw)}
                                   placeholder="비밀번호를 입력해주세요."
                                   value={FindPw.mem_out_pw}/>
                        <TextInput style={[styles.input,mt2]}
                                   secureTextEntry={true}
                                   onChangeText={(mem_out_pw_ch)=>ChkInput("mem_out_pw_ch",mem_out_pw_ch)}
                                   placeholder="비밀번호를 확인해주세요."
                                   value={FindPw.mem_out_pw_ch}/>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={[styles.btn_color]} onPress={goFindPw}>
                <Text style={[text_center,pt3,pb3,text_white]}>비밀번호 변경</Text>
            </TouchableOpacity>
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