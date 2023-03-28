import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback, Keyboard, Alert
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
    let {FindId} = route.params;
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
        console.log(FindId.mem_id,'/ 아이디');
        console.log(FindId.mem_name,'/ 담당자명');
        console.log(FindId.mem_mobile,'/ 담당자 연락처');
        // 인증번호 체크

        return  navigation.replace('비밀번호 찾기결과');
        // find_chk_mem(FindId).then((res)=>{
        //     if(res) {
        //       const {result} = res.data;
        //       if(result === 'OK') {
        //           if(FindId.type === 'id') {
        //             return Alert.alert('',``);
        //           } else {
        //               return  navigation.replace('비밀번호 찾기결과');
        //           }
        //       } else {
        //           return  Alert.alert('',`${res.data}`);
        //       }
        //     }
        // });
        
    }


    console.log(route.params, '/ 인증번호 확인');

    return   (
        <>
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
                                onChangeText={(chk_num)=>goInput('chk_num',chk_num)}
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