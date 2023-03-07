import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView, Alert, Platform,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
//로딩화면
import Loading from '../../components/Loading';
//자재로로고이미지
import Logo from '../../icons/login_logo.svg';

// 공통 CSS 추가
import {
    container,
    bg_white,
    flex,
    h14,
    justify_content_center,
    mb2,
    mb4,
    mb5,
    input, pos_center,
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import * as Update from "expo-updates";
import {reloadAsync} from "expo-updates";
import HomeLogo from "../../icons/home_logo.svg";
import {login} from "../UTIL_mem";

export default function Login({navigation, route}) {


    const [Member, setMember] = useState();


    useEffect(() => {
        AsyncStorage.getItem('member').then((value) => {
            if (value) {
                setMember(value);
            }
        });
    }, []);

    console.log('회원코드 / ', Member);


    const ChkValue = useRef([]);




    // 1. data로 넘길 status 셋팅
    const [Login, setLogin] = useState({    // 로그인상태 셋팅
        mem_id: "",
        mem_pw: ""
    });
    const [ready, setReady] = useState(true);    // 로딩 액션
    // =================로그인 액션 설정=====================//
    const goInput = (keyValue, e) => {
        setLogin({
            ...Login,
            [keyValue]: e,
        });
    };
    //==================로그인 하기=======================//
    const goLogin = () => {

        if (!Login.mem_id) {
            Alert.alert(
                '아이디를 입력하세요.',
            );
            return;
        }
        if (!Login.mem_pw) {
            Alert.alert('비밀번호를 입력해주세요.');
            return;
        }
        // 포스트시에 header 셋팅 할것
        login(Login).then((res) => {
            if (res) {
                console.log(res.data);
                const {result, mem_uid} = res.data;
                if (result === 'OK') {
                    AsyncStorage.setItem('member', mem_uid);
                    navigation.replace('메인페이지');
                } else {
                    Alert.alert('',result);
                }
            }
        }).catch((err) => console.log(err));
    }
    // 로딩액션
    useEffect(() => {
        //뒤의 1000 숫자는 1초를 뜻함
        //1초 뒤에 실행되는 코드들이 담겨 있는 함수
        setTimeout(() => {
            setReady(false)
        }, 1000)

    }, []);

    console.log(Platform.OS);

    if (Member === undefined) {

        return ready ? <Loading/> : (
            <>
                <KeyboardAvoidingView style={[styles.avoidingView]} behavior={Platform.select({ios: 'padding'})}>
                    <View style={[sub_page, styles.login]}>
                        <View style={[container]}>
                            {/*자재로 로고*/}
                            <View style={[flex,justify_content_center,mb5]}>
                                <Logo width={191} height={51} />
                            </View>
                            {/*아이디 입력창*/}
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>아이디</Text>
                                    <TextInput style={[input]} onChangeText={(mem_id) => goInput("mem_id", mem_id)}
                                    value={Login.mem_id} placeholder="아이디를 입력해주세요"
                                    ref={value=>(ChkValue.current[0] = value)}
                                    onSubmitEditing={()=>ChkValue.current[1].focus()}
                                    autoCapitalize="none"
                                    returnKeyType="next"
                                    />
                                </View>
                            </View>
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>비밀번호</Text>
                                    <TextInput style={[input]} secureTextEntry={true}
                                     onChangeText={(mem_pw) => goInput("mem_pw", mem_pw)} value={Login.mem_pw}
                                     placeholder="비밀번호를 입력해주세요."
                                     ref={value=>(ChkValue.current[1] = value)}
                                     onSubmitEditing={goLogin}
                                     autoCapitalize="none"
                                     returnKeyType="done"
                                    />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.loginformbtn} onPress={goLogin}>
                                <View  style={[pos_center]} >
                                    <Text style={styles.loginformbtntxt}>로그인</Text>
                                </View>
                            </TouchableOpacity>
                            {/*로그인 버튼*/}
                            <View style={styles.link_idpw}>
                                <View style={[styles.findId, styles.br_1]}>
                                    <TouchableOpacity style={styles.link_find_id} onPress={() => {navigation.navigate('아이디 찾기')}}>
                                        <Text style={[styles.link_find_txt, ]}>아이디 찾기</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.findpw}>
                                    <TouchableOpacity style={styles.link_find_pw} onPress={() => {navigation.navigate('비밀번호 찾기')}}>
                                        <Text style={styles.link_find_txt}>비밀번호 찾기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/*아이디/비밀번호 찾기*/}
                            <View style={styles.signUpbox}>
                                <Text style={styles.link_txt}>
                                    회원이 아니신가요?
                                </Text>
                                <TouchableOpacity style={styles.link_signUp} onPress={() => {
                                    navigation.navigate('회원가입')
                                }}>
                                    <Text style={styles.link_signUp_txt}>회원가입하기</Text>
                                </TouchableOpacity>
                            </View>
                            {/*회원가입*/}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </>

        );
    } else {
        navigation.replace('메인페이지');

    }
}

const styles = StyleSheet.create({
    avoidingView: {
        flex: 1,
    },
    login: {
        //앱의 배경 색
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    container: {
        padding: 16,
        width: "100%"
    },
    formGroup: {
        paddingBottom: 22,
    },
    loginLogo: {
        //컨텐츠의 넓이 값
        width: 191,
        //컨텐츠의 높이 값
        height: 52,
        alignSelf: "center",
        marginBottom: 60,
    },
    inputTopText: {
        marginBottom: 8,
    },
    loginformbtn: {
        backgroundColor: "#b1b2c3",
        height:48,
        borderRadius: 5,
        marginBottom: 25,
    },
    loginformbtntxt: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
    },
    link_idpw: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 64,
    },
    link_find_txt: {
        fontSize: 14,
        color: "#718096",
        paddingHorizontal: 18,
    },
    br_1: {
        borderRightWidth: 1,
        borderColor: "#b1b2c3",
        overflow:"hidden",
    },
    signUpbox: {
        flexDirection: "row",
        justifyContent: "center",
    },
    link_signUp: {
        marginBottom: 0,
    },
    link_signUp_txt: {
        color: "#4549e0",
        marginLeft: 6,
        marginBottom: 0,
        fontWeight: "500",
    },
    link_txt: {
        fontWeight: "500",
        textAlign: "center",
    },
    checkbox: {
        marginRight: 8,
    },
    pb_24: {
        paddingBottom: 24,
    },
});