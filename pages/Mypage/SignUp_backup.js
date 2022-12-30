import React,{useState,useEffect} from 'react';
import { StyleSheet, Button,   Text, TextInput, View, Image, TouchableOpacity, ScrollView,Pressable} from 'react-native';
import Checkbox from 'expo-checkbox';
import {SelectList} from "react-native-dropdown-select-list";
import * as ImagePicker from 'expo-image-picker';

//로딩화면
import Loading from '../../components/Loading';

// 공통 CSS 추가
import {container, bg_white, flex, input, pos_center, pe1, me1, me2, pe2, mt2} from '../../common/style/AtStyle';
import {gray_bar, sub_page} from '../../common/style/SubStyle';
import axios from "axios";
import {AddrMatch, Minlangth, regId,regPW} from "../../util/util";
import CameraIcon from "../../icons/camera_icon.svg";

export default function SignUp({navigation,route}) {


    // 회원가입폼 상태 루틴
    const [selected, setSelected] = useState("");
    const [IsPostOpen, setIsPostOpen] = useState(false);


    // 1. data로 넘길 status 셋팅
    const [SignUpContent, setSignUpContent] = useState({
        mem_id          :"",  // 아이디
        mem_id_chk      :"",  // 아이디 중복체크
        mem_pw          :"",  // 패스워드
        mem_pw_chk      :"",  // 패스워드 체크
        addr_name       :"",  // 지역코드
        com_name        :"",  // 업체명
        com_biz_no      :"",  // 사업자번호        zonecode        :"",  // 우편번호
        addr1           :"",  // 주소1
        addr2           :"",  // 주소2 상세
        zonecode        :"",  // 우편번호
        mem_name        :"",  // 담당자 이름
        mem_mobile      :"",  // 담당자 전화번호
        privacy_1       :"N",  // 서비스 이용약관
        privacy_2       :"N",  // 개인정보처리방침
        privacy_3       :"N",  // 전자금율거래 이용약관
        privacy_4       :"N",  // 제3자 개인정보수집 동의
        privacy_5       :"N",  // 홍보 및 마케팅 이용 동의
    });

    const [imageUrl, setimageUrl] = useState({
        Businesslicense :'',    //사업자등록증
        CopyBankbook    :'',    //통장사본
    });
    //권한 요청을 위한 hooks
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const uploadImage = async (keyValue) => {
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
        console.log('keyvalue : '+keyValue);
        console.log('이미지경로 : '+ result.uri);
        if (keyValue === 'Businesslicense'){
            setimageUrl({
                ...imageUrl,
                Businesslicense    : result.uri,
            });
        }
        if (keyValue === 'CopyBankbook'){
            setimageUrl({
                ...imageUrl,
                CopyBankbook    : result.uri,
            });
        }
    }


    // 다음api 주소 찾기

    const DaumApi = () => {
        setIsPostOpen((prev) => !prev);
    };
    const DaumPopup = (data) => {
        setSignUpContent({
            ...SignUpContent,
            zonecode    : data.zonecode,
            addr1       : data.address,
        });
        DaumApi();
    };

    // 1. 아이디 중복 체크
    const IdChk = () => {

        if(!regId.test(SignUpContent.mem_id)) {
            alert('영문만 사용 가능합니다. 숫자만');
            return;
        }

        if(Minlangth > SignUpContent.mem_id.length) {
            alert('6자 이상 입력해주세요.');
            return;
        }

        const data = {
            act_type            : "chk_dup_id",
            mem_info_act_type   : "INS",
            mem_id              : SignUpContent.mem_id,
        }

        axios.post('http://49.50.162.86:80/ajax/UTIL_mem_reg.php',data,{
            headers:{
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res) {
                const {result} = res.data;
                if(result == 'OK') {
                    alert('사용가능합니다.');
                    setSignUpContent({
                        ...SignUpContent,
                        mem_id_chk:"Y",
                    });
                    return;
                }
                if(result == 'NG_dup') {
                    alert('사용불가능합니다.');
                    return;
                }
                if(result == 'BLANK') {
                    alert('아이디를 입력해주세요.');
                    return;
                }
            }
        });
    }


    // 2. 입력폼 체크루틴
    const ChkInput = (keyValue, text) => {
        if(keyValue === 'mem_birtday') {
            setSignUpContent({
                ...SignUpContent,
                "mem_birtday":text.replace(''),
            });
        }

        // 기본 루틴
        setSignUpContent({
            ...SignUpContent,
            [keyValue]:text,
        });



    }

    const reSet = () => {
        setSignUpContent({
            ...SignUpContent,
            mem_id_chk:"",
            mem_id:"",
        });
    }

    // 회원가입 신청
    const goSignUp = () => {
        const {
            mem_id          ,
            mem_id_chk     ,
            mem_pw         ,
            mem_pw_chk      ,
            com_name       ,
            com_biz_no     ,
            addr1           ,
            addr2          ,
            zonecode       ,
            mem_name      ,
            mem_mobile    ,
            privacy_1     ,
            privacy_2      ,
            privacy_3      ,
            privacy_4     ,
            privacy_5,
        } = SignUpContent;

        if(mem_id === '')                               { alert('아이디를 입력하세요.'); return;}
        if(mem_id_chk === 'N' || mem_id_chk === '')     { alert('아이디 중복체크를 확인해주세요'); return;}
        if(mem_pw === '')                               { alert('비밀번호를 입력하세요.'); return;}
        if(mem_pw_chk === '')                           { alert('비밀번호를 입력하세요.'); return;}
        if(regPW.test(mem_pw)) {
            alert('특수문자 혼합해주세요');
            return;
        }
        if(mem_pw !== mem_pw_chk) {
            alert('비밀번호가 맞지 않습니다');
            return;
        }
        if(com_biz_no === '')                           { alert('사업자번호를 입력해주세요.'); return;}
        if(privacy_1  === 'N' || privacy_1 === '')      { alert('서비스 이용약관에 체크해주세요'); return;}
        if(privacy_2  === 'N' || privacy_1 === '')      { alert('개인정보 처리방침에 체크해주세요'); return;}
        if(privacy_3  === 'N' || privacy_1 === '')      { alert('전자금융거래 이용약관에 체크해주세요'); return;}
        if(privacy_4  === 'N' || privacy_1 === '')      { alert('제3자 개인정보수집동의에 체크해주세요.'); return;}


        if(!window.confirm('회원가입을 하시겠습니까?')) { alert('취소하였습니다'); return;}


        const data = {
            act_type        :"mem_reg",
            mem_id          :mem_id,        //아이디
            mem_pw          :mem_pw,        //패스워드
            mem_name        :mem_name,      // 담당자이름
            com_name        :com_name,      // 업체명
            com_biz_no      :com_biz_no,      // 사업자번호
            mem_mobile      :mem_mobile,    // 담당자 전화번호
            addr1           :addr1,
            addr2           :addr2,
            zonecode        :zonecode
        };
        const req  = new URLSearchParams(data);

        axios.post('/ajax/UTIL_mem_reg.php',req).then((res)=>{
            if(res) {
                const {result} = res.data;
                if(result == 'OK') {
                    alert('회원가입에 성공하였습니다.');
                    window.location.href = '/';
                    return;
                }
                else {
                    alert('회원가입에 실패하였습니다.');
                }

            }
        });

    }





    // 전체 체크
    const AllChk = (text) => {
        const {checked} = text.target;

        if(checked == true) {

            setSignUpContent({
                ...SignUpContent,
                privacy_1: "Y",
                privacy_2: "Y",
                privacy_3: "Y",
                privacy_4: "Y",
                privacy_5: "Y",
            });
            return;
        } else {
            setSignUpContent({
                ...SignUpContent,
                privacy_1: "N",
                privacy_2: "N",
                privacy_3: "N",
                privacy_4: "N",
                privacy_5: "N",
            });
            return;
        }
    }



    const chks = (
        SignUpContent.mem_id == '' ||
        SignUpContent.mem_pw == '' ||
        SignUpContent.mem_pw_chk == '' ||
        SignUpContent.mem_mobile == '' ||
        SignUpContent.mem_name == '' ||
        SignUpContent.com_biz_no == '' ||
        SignUpContent.com_name == '' ||
        SignUpContent.addr1 == '' ||
        SignUpContent.addr2 == '' ||
        SignUpContent.zonecode == ''
    ) ? true : false;


    //console.log(SignUpContent);
    console.log(selected);

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[sub_page,styles.signup]}>
                    <View style={[container]}>

                        <View style={styles.formGroup}>
                            <Text style={styles.inputTopText}>아이디</Text>
                            <View style={styles.flex}>
                                <View style={[styles.inputGroup,styles.flexitem1,pe2]}>
                                    <TextInput style={[input]}
                                               onChangeText={(mem_id)=>ChkInput("mem_id",mem_id)}
                                               placeholder="아이디를 입력해주세요"
                                               editable={(SignUpContent.mem_id_chk == 'Y') ? false : true}
                                               value={SignUpContent.mem_id}/>
                                </View>
                                <View style={[styles.flexitem2]}>
                                    {(SignUpContent.mem_id_chk == 'Y') ? (
                                        <TouchableOpacity style={styles.find_id_btn} onPress={reSet} >
                                            <View  style={[pos_center]} >
                                                <Text style={[styles.find_id_btn_txt]}>아이디 변경하기</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ):(
                                        <TouchableOpacity style={[styles.find_id_btn]} onPress={IdChk} >
                                            <View  style={[pos_center]} >
                                                <Text style={[styles.find_id_btn_txt]}>아이디 중복확인</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) }
                                </View>
                            </View>
                        </View>
                        {/*아이디 입력창/중복확인*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>비밀번호</Text>
                                <TextInput style={[input]} secureTextEntry={true} onChangeText={(mem_pw)=>ChkInput("mem_pw",mem_pw)}  placeholder="비밀번호를 입력해주세요." value={SignUpContent.mem_pw}/>
                            </View>
                        </View>
                        {/*비밀번호 입력창*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>비밀번호 확인</Text>
                                <TextInput style={[input]} secureTextEntry={true}
                                           onChangeText={(mem_pw_chk)=>ChkInput("mem_pw_chk",mem_pw_chk)}
                                           placeholder="비밀번호를 확인해주세요."
                                           value={SignUpContent.mem_pw_chk}/>
                            </View>
                        </View>
                        {/*비밀번호확인 입력창*/}

                    </View>

                    <View style={[gray_bar]}/>

                    <View style={styles.container}>
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>지역</Text>
                                <SelectList
                                    setSelected={(val) => setSelected(val)}
                                    data={AddrMatch}
                                    onSelect={(selected)=>ChkInput("addr_name",selected)}
                                    defaultOption={{key: '서울특별시', value: '서울'}}
                                    save="value"
                                />
                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>업체명</Text>
                                <TextInput style={[input]} onChangeText={(com_name)=>ChkInput("com_name",com_name)} placeholder="가나인테리어" value={SignUpContent.com_name}/>
                            </View>
                        </View>
                        {/*업체명 입력창*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>사업자 등록번호</Text>
                                <TextInput style={[input]}
                                           keyboardType="number-pad"
                                           onChangeText={(com_biz_no)=>ChkInput("com_biz_no",com_biz_no)} placeholder="12345-51-687891"   value={SignUpContent.com_biz_no}/>
                            </View>
                        </View>
                        {/*사업자 등록번호 입력창*/}
                        <View style={styles.formGroup}>
                            <Text style={styles.inputTopText}>사업장 주소</Text>
                            <View style={styles.flex}>
                                <View style={[styles.inputGroup,styles.flexitem1,pe2]}>
                                    <TextInput style={[input,styles.me_18,styles.zonecode]} onChangeText={(zonecode)=>ChkInput("zonecode",zonecode)} editable={false} selectTextOnFocus={false}  value={SignUpContent.zonecode}/>
                                </View>
                                <View style={[styles.flexitem2]}>
                                    <TouchableOpacity style={styles.find_id_btn} onPress={DaumApi} >
                                        <View  style={[pos_center]} >
                                            <Text style={[styles.find_id_btn_txt]}>주소찾기</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                                {IsPostOpen && (
                                    <View>
                                        <DaumPostcode onComplete={DaumPopup} />
                                    </View>
                                )}
                            </View>
                            {/*=============주소 1==============*/}
                            <View style={[styles.inputGroup,styles.py_12]}>
                                <TextInput style={[input]} onChangeText={(addr1)=>ChkInput("addr1",addr1)} placeholder=""   value={SignUpContent.addr1}/>
                            </View>
                            {/*=============주소 2==============*/}
                            <View style={[styles.inputGroup]}>
                                <TextInput style={[input]}
                                           onChangeText={(addr2)=>ChkInput("addr2",addr2)}
                                           placeholder="상세주소 입력"
                                           value={SignUpContent.addr2}/>
                            </View>
                        </View>
                        {/*사업장 주소 입력창*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>담당자명</Text>
                                <TextInput style={[input]} onChangeText={(mem_name)=>ChkInput("mem_name",mem_name)} placeholder=""   value={SignUpContent.mem_name}/>
                            </View>
                        </View>
                        {/*담당자명 입력창*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>담당자 연락처</Text>
                                <TextInput style={[input]} onChangeText={(mem_mobile)=>ChkInput("mem_mobile",mem_mobile)} placeholder=""   value={SignUpContent.mem_mobile}/>
                            </View>
                        </View>
                        {/*사업장 주소 입력창*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>사업자 등록증</Text>

                                <Pressable style={[styles.upload_btn]} onPress={(Businesslicense=>uploadImage('Businesslicense',Businesslicense))}>
                                    <View  style={[pos_center]} >
                                        <CameraIcon width={30} height={24}/>
                                    </View>
                                </Pressable>
                                <View  style={[mt2,styles.upload_box]} >
                                    <Image style={styles.upload_img} source={{uri: imageUrl.Businesslicense}}/>
                                </View>

                            </View>
                        </View>
                        {/*사업자 등록증 업로드*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>통장사본</Text>

                                <Pressable style={[styles.upload_btn]} onPress={(CopyBankbook=>uploadImage('CopyBankbook',CopyBankbook))}>
                                    <View  style={[pos_center]} >
                                        <CameraIcon width={30} height={24}/>
                                    </View>
                                </Pressable>
                                <View  style={[mt2,styles.upload_box]} >
                                    <Image style={styles.upload_img} source={{uri: imageUrl.CopyBankbook}}/>
                                </View>

                            </View>
                        </View>
                        {/*통장사본 업로드*/}
                    </View>

                    <View style={[gray_bar]}/>

                    <View style={styles.container}>
                        <View style={styles.privacy_wrap}>
                            <View style={[styles.privacy_chek_all,flex]}>
                                <Checkbox style={styles.checkbox} color={"#4630eb"}  />
                                <Text style={styles.privacy_chek_all_txt} >전체 약관 동의</Text>
                            </View>
                            <View style={styles.privacy_list}>
                                <View style={[styles.privacy_list_item,styles.privacy_list_flex]}>
                                    <View style={[styles.privacy_list_flex_item,flex]}>
                                        <Checkbox style={styles.checkbox} color={"#4630eb"}  />
                                        <Text style={styles.privacy_list_flex_item_txt}>서비스 이용약관 <Text style={styles.privacy_list_flex_item_txt2}>(필수) </Text></Text>
                                    </View>
                                    <View style={styles.privacy_list_flex_item}>
                                        <TouchableOpacity style={styles.privacy_btn}  >
                                            <Text style={styles.privacy_btn_txt}>보기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* 서비스 이용약관  */}
                                <View style={[styles.privacy_list_item,styles.privacy_list_flex]}>
                                    <View style={[styles.privacy_list_flex_item,flex]}>
                                        <Checkbox style={styles.checkbox} color={"#4630eb"}  />
                                        <Text style={styles.privacy_list_flex_item_txt}>개인정보 처리방침 동의 <Text style={styles.privacy_list_flex_item_txt2}>(필수) </Text></Text>
                                    </View>
                                    <View style={styles.privacy_list_flex_item}>
                                        <TouchableOpacity style={styles.privacy_btn}  >
                                            <Text style={styles.privacy_btn_txt}>보기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* 개인정보 처리방침 동의 */}
                                <View style={[styles.privacy_list_item,styles.privacy_list_flex]}>
                                    <View style={[styles.privacy_list_flex_item,flex]}>
                                        <Checkbox style={styles.checkbox} color={"#4630eb"}  />
                                        <Text style={styles.privacy_list_flex_item_txt}>전자금융거래 이용약관  <Text style={styles.privacy_list_flex_item_txt2}>(필수) </Text></Text>
                                    </View>
                                    <View style={styles.privacy_list_flex_item}>
                                        <TouchableOpacity style={styles.privacy_btn}  >
                                            <Text style={styles.privacy_btn_txt}>보기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* 전자금융거래 이용약관 */}
                                <View style={[styles.privacy_list_item,styles.privacy_list_flex]}>
                                    <View style={[styles.privacy_list_flex_item,flex]}>
                                        <Checkbox style={styles.checkbox} color={"#4630eb"}  />
                                        <Text style={styles.privacy_list_flex_item_txt}>제3자 개인정보수집 동의  <Text style={styles.privacy_list_flex_item_txt2}>(필수) </Text></Text>
                                    </View>
                                    <View style={styles.privacy_list_flex_item}>
                                        <TouchableOpacity style={styles.privacy_btn}  >
                                            <Text style={styles.privacy_btn_txt}>보기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* 제3자 개인정보수집 동의 */}
                                <View style={[styles.privacy_list_item,styles.privacy_list_flex]}>
                                    <View style={[styles.privacy_list_flex_item,flex]}>
                                        <Checkbox style={styles.checkbox} color={"#4630eb"}  />
                                        <Text style={styles.privacy_list_flex_item_txt}>홍보 및 마케팅 이용 동의 (선택) </Text>
                                    </View>
                                    <View style={styles.privacy_list_flex_item}>
                                        <TouchableOpacity style={styles.privacy_btn}  >
                                            <Text style={styles.privacy_btn_txt}>보기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* 제3자 개인정보수집 동의 */}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.form_btn,styles.form_meminfo_btn]}>
                <TouchableOpacity onPress={goSignUp} style={[styles.form_btn_link,styles.form_btn_meminfo_link]} >
                    <Text style={styles.form_btn_txt}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    subPage: {
        backgroundColor: '#fff',
        height:"100%",
    },
    container:{
        padding:16,
        width:"100%",
    },

    flex:{
      flexDirection:"row",
      alignItems:"center",
    },
    formGroup:{
        paddingBottom:22,
    },
    inputTopText:{
        marginBottom:12,
    },
    input: {
        height: 36,
        margin: 0,
        borderWidth: 1,
        paddingVertical:7,
        paddingHorizontal: 18,
        borderColor:"#ededf1",
        fontSize:12,
        color:"#000",
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
    },
    find_id_btn:{
        backgroundColor:"#4549e0",
        height:46,
        borderRadius:5,
        paddingHorizontal:16,
    },
    find_id_btn_txt:{
        color:"#fff",
        fontSize:12,
        textAlign:"center",
    },
    flexitem1:{
        width:"70%"
    },
    flexitem2:{
        width:"30%"
    },
    me_18:{
        marginRight:18,
    },
    zonecode:{
        backgroundColor:"#eaecf3",
    },
    py_12:{
        paddingVertical:12,
    },
    privacy_chek_all:{
        paddingBottom:15,
    },
    privacy_chek_all_txt:{
        fontSize:16,
    },
    privacy_list:{
        borderWidth:1,
        borderColor:"#ededf1",
        padding:15,
    },
    privacy_list_flex:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    privacy_list_flex_item:{
        paddingBottom:14,
    },
    privacy_list_flex_item_txt:{
        fontSize:14,
        color:"#222",
    },
    privacy_list_flex_item_txt2:{
        color:"#4549e0",
    },
    privacy_btn_txt:{
        fontSize:12,
        color:"#b1b2c3",
    },
    form_btn:{
        backgroundColor:"#B1B2C3",
        paddingVertical:20,
    },
    form_btn_txt:{
        textAlign:"center",
        fontSize:17,
        lineHeight:24,
        color:"#fff",
    },
    checkbox: {
      marginRight:8,
    },
    select_box:{
        borderColor:"#EDEDF1",
        borderRadius:0,
        minHeight:36,
        height:36,
    },
    upload_btn:{
        backgroundColor:"#ddd",
        borderRadius:5,
        height:40,
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