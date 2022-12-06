import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';

//로딩화면
import Loading from '../../components/Loading';
//자재로로고이미지
import logo from '../../assets/img/m_logo.png';





export default function Login({navigation,route}) {
    //useState 사용법
    //[state,setState] 에서 state는 이 컴포넌트에서 관리될 상태 데이터를 담고 있는 변수
    //setState는 state를 변경시킬때 사용해야하는 함수

    //모두 다 useState가 선물해줌
    //useState()안에 전달되는 값은 state 초기값
    const [state,setState] = useState([])
    const [ready,setReady] = useState(true)

    useEffect(()=>{

        //뒤의 1000 숫자는 1초를 뜻함
        //1초 뒤에 실행되는 코드들이 담겨 있는 함수
        setTimeout(()=>{
            setReady(false)
        },1000)


    },[])

    const [id, onChangeText] = React.useState("");
    const [pw, onChangePW] = React.useState("");
    const [number, onChangeNumber] = React.useState(null);

    return ready ? <Loading/> :  (

            <View style={[styles.subPage,styles.login]}>
                <View style={styles.container}>
                    <Image style={styles.loginLogo} source={logo}/>
                    {/*자재로 로고*/}
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>아이디</Text>
                            <TextInput style={styles.input} onChangeText={onChangeText} placeholder="아이디를 입력해주세요" value={id}/>
                        </View>
                    </View>
                    {/*아이디 입력창*/}
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>비밀번호</Text>
                            <TextInput style={styles.input} secureTextEntry={true} onChangeText={onChangePW}  placeholder="비밀번호를 입력해주세요." value={pw}/>
                        </View>
                    </View>
                    {/*비밀번호 입력창*/}
                    <TouchableOpacity style={styles.loginformbtn} onPress={()=>{navigation.navigate('메인페이지')}}>
                        <Text style={styles.loginformbtntxt}>로그인</Text>
                    </TouchableOpacity>
                    {/*로그인 버튼*/}
                    <View style={styles.link_idpw}>
                        <View style={styles.findId}>
                            <TouchableOpacity style={styles.link_find_id} onPress={()=>{navigation.navigate('DetailPage',content)}} >
                                <Text style={[styles.link_find_txt,styles.br_1]}>아이디 찾기</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.findpw}>
                            <TouchableOpacity style={styles.link_find_pw} onPress={()=>{navigation.navigate('DetailPage',content)}} >
                                <Text style={styles.link_find_txt}>비밀번호 찾기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*아이디/비밀번호 찾기*/}
                    <View style={styles.signUpbox}>
                        <Text style={styles.link_txt}>
                            회원이 아니신가요?
                        </Text>
                        <TouchableOpacity style={styles.link_signUp} onPress={()=>{navigation.navigate('회원가입')}} >
                            <Text style={styles.link_signUp_txt}>회원가입하기</Text>
                        </TouchableOpacity>
                    </View>
                    {/*회원가입*/}
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    login: {
        //앱의 배경 색
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fff',
    },
    container:{
        padding:16,
        width:"100%"
    },
    formGroup:{
      paddingBottom:22,
    },
   loginLogo: {
        //컨텐츠의 넓이 값
        width:191,
        //컨텐츠의 높이 값
        height:52,
        alignSelf:"center",
       marginBottom:60,
    },
    inputTopText:{
      marginBottom:8,
    },
    input: {
        height: 36,
        margin: 0,
        borderWidth: 1,
        paddingVertical:7,
        paddingHorizontal: 18,
        borderColor:"#ededf1",
        fontSize:12,
    },
    loginformbtn:{
        backgroundColor:"#b1b2c3",
        textAlign:"center",
        borderRadius:5,
        paddingVertical:10,
        marginBottom:26
    },
    loginformbtntxt:{
        fontSize:16,
        color:"#fff",
        textAlign:"center",
    },
    link_idpw:{
        flexDirection:"row",
        justifyContent:"center",
        paddingBottom:64,
    },
    link_find_txt:{
        fontSize:12,
        color:"#718096",
        paddingHorizontal:18,
    },
    br_1:{
      borderRightWidth:1,
      borderColor:"#b1b2c3",
    },
    signUpbox:{
        flexDirection:"row",
        justifyContent:"center",
    },
    link_signUp:{
        marginBottom:0,
    },
    link_signUp_txt:{
        color:"#4549e0",
        marginLeft:6,
        marginBottom:0,
        fontWeight:"500",
    },
    link_txt:{
        fontWeight:"500",
        textAlign:"center",
    }
});