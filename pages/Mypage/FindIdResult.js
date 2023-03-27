import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback, Keyboard
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




export default function FindId({route ,navigation}) {

    const [chk_num, set_chk_num] = useState({
        chk_num:'',
    });
    const ChkInput = useRef();
    console.log('아이디 확인');
    
    // 인증 전달값
    let mem_info = route.params.mem_id;
    const goInput = (key, value) => {
        set_chk_num({
            ...FindId,
            [key]:value,
        });
    }
    const goChk_num = (chk_num) => {

    }


    console.log(chk_num);

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
                            <TouchableOpacity style={[btn_outline_primary,mt3,styles.border_radius]} onPress={()=>{}}>
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