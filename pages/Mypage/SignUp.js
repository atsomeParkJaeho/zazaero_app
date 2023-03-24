import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Button,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Pressable,
    Alert, Platform, Modal
} from 'react-native';
import Checkbox from 'expo-checkbox';

// 공통 CSS 추가
import {
    container,
    bg_white,
    flex,
    input,
    pos_center,
    pe1,
    me1,
    me2,
    pe2,
    mt2,
    ios_pb,
    justify_content_end,
    justify_content_between,
    d_flex,
    text_center,
    mb1,
    flex_between,
    h14,
    text_gray,
    ms2,
    h15, h18, h17, text_black, bg_primary
} from '../../common/style/AtStyle';
import {gray_bar, sub_page} from '../../common/style/SubStyle';
import axios from "axios";
import {AddrMatch, bizNum, DateChg, Minlangth, OnlyEng, Phone, PwChk, regId, regPW} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";
import {chk_dup_id, Sign_up} from "../UTIL_mem";
import {DeviceInfo} from "react-native-web";
import PriModal from "./PriModal";
import {getAppInfo} from "../order/UTIL_order";
export default function SignUp({route, navigation}) {


    // 1. 상태정의
    const Chkinput = useRef([]);                // 입력값 위치 설정
    const Update   = useIsFocused();                     //
    const [SignUp, setSignUp] = useState({      // 회원가입 양식
        mem_id          :'',            // 아이디
        mem_pw          :'',            // 비밀번호
        mem_name        :'',            // 담당자명
        com_name        :'',            // 회사명
        mem_mobile      :'',            // 담당자 전화번호
        com_biz_no      :'',            // 사업자번호
        road_address    :'',            // 지역코드
        zonecode        :'',            // 우편번호
        addr1           :'',            // 주소
        addr2           :'',            // 상세주소
        privacy_1       :false,         // 약관
        privacy_2       :false,         // 개인정보처리방침
        privacy_3       :false,         // 정보수집
        privacy_4       :false,         // 홍보 및 마케팅
        privacy_5       :false,         // 전자금율거래이용약관
        mem_id_chk      :'N',           // 회원아이디 체크
        mem_pw_chk      :'',            // 비밀번호 확인
        all_chk         :false,
    });

    //
    const [Show, setShow]         = useState(false);    // 셀렉트창 노출 여부
    let act_btn = !!(
        SignUp.mem_id &&
        SignUp.mem_pw &&
        SignUp.mem_name &&
        SignUp.com_name &&
        SignUp.mem_mobile &&
        SignUp.com_biz_no &&
        SignUp.road_address &&
        SignUp.zonecode &&
        SignUp.addr1 &&
        SignUp.addr2 &&
        SignUp.privacy_1 &&
        SignUp.privacy_2 &&
        SignUp.privacy_3 &&
        SignUp.privacy_4 &&
        SignUp.privacy_5 &&
        SignUp.mem_pw_chk &&
        SignUp.all_chk
    );


    useEffect(()=>{

        if(route.params) {
            let {zonecode, addr1} = route.params;
            setSignUp({
                ...SignUp,
                zonecode    :zonecode,
                addr1       :addr1
            })
        }
    },[Update]);

    // 2. 입력상태 설정
    const goInput = (name, value) => {
        setSignUp({
            ...SignUp,
            [name]:value,
        })
    }

    // 3. 아이디 중복확인
    const chkName = () => {

        if(!SignUp.mem_id) {
            Alert.alert('','아이디를 입력해주세요.');
            return Chkinput.current[0].focus();
        }
        if(SignUp.mem_id_chk === 'Y') {
            setSignUp({
                ...SignUp,
                mem_id_chk: 'N',
            });
        } else {
            chk_dup_id(SignUp).then((res)=>{
                if(res) {
                    const {result} = res.data;
                    console.log(result);
                    if(result === 'OK') {
                        Alert.alert('','사용가능한 아이디 입니다.');
                        setSignUp({
                            ...SignUp,
                            mem_id_chk: 'Y',
                        });
                    }
                    if(result === 'NG_dup') {
                        return Alert.alert('','사용이 불가능한 아이디 입니다.');
                    }
                    if(result === 'NG_dup_id') {
                        return Alert.alert('','사용이 불가능한 아이디 입니다.');
                    }
                }
            });
        }
    }

    // 약관처리 체크

    const privacyChk = (key,value) => {
        console.log(key);
        console.log(value);

        if(key === 'All') {
            console.log('전체');
            setSignUp({
                ...SignUp,
                privacy_1: value,
                privacy_2: value,
                privacy_3: value,
                privacy_4: value,
                privacy_5: value,
                all_chk  : value,
            });

        } else {
            setSignUp({
                ...SignUp,
                [key]: value,
            });
        }
    }

    let chk = [SignUp.privacy_1, SignUp.privacy_2, SignUp.privacy_3, SignUp.privacy_4, SignUp.privacy_5];
    let TChk = chk.filter(val=>val===true);
    // 3. 회원가입 신청
    const goForm = ()=> {

        let regPw = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

        if(!SignUp.mem_id) {  /*아이디 */Alert.alert('',`아이디를 입력해주세요.`);return Chkinput.current[0].focus();}

        if(Minlangth >= SignUp.mem_id.length) {     // 아이디 최소
            Alert.alert('',`${Minlangth}자 이상 입력해주세요.`);
            return Chkinput.current[0].focus();
        }

        if(SignUp.mem_id_chk === 'N') {             // 아이디 중복체크
            Alert.alert('',`아이디 중복체크를 확인해주세요.`);
            return Chkinput.current[0].focus();
        }

        // 체크루틴
        if(!SignUp.mem_pw) {  // 비밀번호
            Alert.alert('',`비밀번호를 입력해주세요.`);
            return Chkinput.current[1].focus();
        }

        if(8 >= SignUp.mem_pw.length) {             // 비밀번호 최소
            Alert.alert('',`8자 이상 입력해주세요.`);
            return Chkinput.current[2].focus();
        }

        if(!SignUp.mem_pw_chk) {  // 비밀번호 확인
            Alert.alert('',`비밀번호 확인을 입력해주세요.`);
            return Chkinput.current[2].focus();
        }

        if(regPw.test(SignUp.mem_pw) === false) {  // 특수문자 입력 필수
            Alert.alert('','특수 문자가 포함되어있지 않습니다.');
            return Chkinput.current[2].focus();
        }

        if(SignUp.mem_pw !== SignUp.mem_pw_chk) {  // 비밀번호 일치
            Alert.alert('','비밀번호가 일치 하지 않습니다.');
            return Chkinput.current[2].focus();
        }

        if(!SignUp.road_address) { // 지역코드
            Alert.alert('','지역을 선택해주세요');
            return Chkinput.current[6].focus();
        }

        if(!SignUp.com_name) {  // 업체명
            Alert.alert('',`업체명을 입력해주세요.`);
            return Chkinput.current[3].focus();
        }
        
        if(!SignUp.com_biz_no) {  // 사업자 등록증
            Alert.alert('',`사업자 등록증을 입력해주세요.`);
            return Chkinput.current[4].focus();
        }
        if(!SignUp.zonecode) {  // 우편번호
            Alert.alert('',`우편번호를 입력해주세요.`);
            return Chkinput.current[5].focus();
        }
        if(!SignUp.addr1) {  // 주소
            Alert.alert('',`주소를 입력해주세요.`);
            return Chkinput.current[6].focus();
        }


        if(!SignUp.addr2) {  // 상세주소
            Alert.alert('',`상세주소를 입력해주세요.`);
            return Chkinput.current[7].focus();
        }

        if(!SignUp.mem_name) {  // 담당자명
            Alert.alert('',`담당자명을 입력해주세요.`);
            return Chkinput.current[8].focus();
        }

        if(!SignUp.mem_mobile) {  // 담당자 연락처
            Alert.alert('',`담당자 연락처를 입력해주세요.`);
            return Chkinput.current[9].focus();
        }

        if(SignUp.privacy_1 === false) {  // 서비스 이용약관
            return Alert.alert('',`서비스 이용약관을 체크해주세요.`);
        }

        if(SignUp.privacy_2 === false) {  // 개인정보처리방침 동의
            return Alert.alert('',`개인정정보처리방침을 동의하지 않으셨습니다.`);
        }

        if(SignUp.privacy_3 === false) {  // 전자금융거래 이용약관
            return Alert.alert('',`전자금융거래를 체크하지 않으셨습니다.`);
        }

        if(SignUp.privacy_4 === false) {  // 제3자 개인정보수집동의
            return Alert.alert('',`제3자 개인정보수집동의 체크하지 않으셨습니다.`);
        }

        /**--------------------------첨부파일 요청---------------------------------------**/
        Sign_up(SignUp).then((res)=>{
            if(res) {
                const {result} = res.data;
                console.log(result);
                if(result === 'OK') {
                    Alert.alert('','축하합니다.\n회원가입이 완료되었습니다. 로그인 해주세요.');
                    return navigation.navigate('로그인');
                } else {
                    console.log('실패');
                }
            } else {

            }
        })
    }

    const goSearch = (name) => {
        setShow(!Show);
        setSignUp({
            ...SignUp,
            road_address: name,
        });
    }
    // console.log(Selected.select_title);


    console.log(act_btn,'/ 전체 채우면 true');
    console.log(SignUp,' / ');


    return (
        <>

            {/**------------모달창------------**/}
            <ScrollView style={[bg_white]}>
                <View style={[sub_page,styles.signup]}>
                    <View style={[container]}>
                        <View style={styles.formGroup}>
                            {/*아이디*/}
                            <Text style={styles.inputTopText}>아이디</Text>
                            <View style={styles.flex}>
                                <View style={[styles.inputGroup,styles.flexitem1,pe2]}>
                                    <TextInput style={[input]}
                                               onChangeText={(mem_id)=>goInput('mem_id',mem_id)}
                                               editable={(SignUp.mem_id_chk !== 'Y')}
                                               value={OnlyEng(SignUp.mem_id)}
                                               ref={val=>(Chkinput.current[0] = val)}
                                               onEndEditing={()=>chkName}
                                               returnKeyType="next"
                                               placeholder="아이디를 입력해주세요"
                                               autoCapitalize="none"
                                    />
                                </View>
                                <View style={[styles.flexitem2]}>
                                    <TouchableOpacity onPress={chkName} style={styles.find_id_btn}>
                                        <View style={[pos_center]} >
                                            {/*상태에 따라 텍스트 변경*/}
                                            {(SignUp.mem_id_chk === 'Y') ? (
                                                <Text style={[styles.find_id_btn_txt]}>
                                                    아이디 변경하기
                                                </Text>
                                            ):(
                                                <Text style={[styles.find_id_btn_txt]}>
                                                    중복확인
                                                </Text>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/*아이디 입력창/중복확인*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>비밀번호</Text>
                                <TextInput style={[input]}
                                           onChangeText={(mem_pw)=>goInput('mem_pw',mem_pw)}
                                           value={SignUp.mem_pw}
                                           ref={val=>(Chkinput.current[1] = val)}
                                           secureTextEntry={true}
                                           placeholder="비밀번호를 입력해주세요."
                                           autoCapitalize="none"
                                />
                            </View>
                        </View>
                        {/*비밀번호 입력창*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>비밀번호 확인</Text>
                                <TextInput style={[input]}
                                           onChangeText={(mem_pw_chk)=>goInput('mem_pw_chk',mem_pw_chk)}
                                           value={SignUp.mem_pw_chk}
                                           ref={val=>(Chkinput.current[2] = val)}
                                           secureTextEntry={true}
                                           placeholder="비밀번호를 확인해주세요."
                                           autoCapitalize="none"
                                />
                            </View>
                        </View>
                        {/*비밀번호확인 입력창*/}
                    </View>

                    <View style={[gray_bar]}/>

                    <View style={styles.container}>
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>지역</Text>
                                <View style={[styles.select_box]}>
                                    <TouchableOpacity onPress={()=>{setShow(!Show)}}>
                                        <View style={[styles.border]}>
                                            {/**---------------------------선택주소 노출--------------------------------**/}
                                            <Text style={[styles.select_txt,(SignUp.road_address) ? text_black:'']}>
                                                {(SignUp.road_address) ? SignUp.road_address:'지역을 선택해주세요'}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={[styles.select_icon_box]}>
                                        <Text style={[styles.select_icon]}>▼</Text>
                                    </View>
                                </View>
                                {/**/}
                                {/**---------------------------클릭시 노출--------------------------------**/}
                                {(Show) && (
                                <View style={[styles.select_opt_list_box]}>
                                    <ScrollView style={[{height:160}]} nestedScrollEnabled={true}>
                                        {AddrMatch.map((val,idx)=>
                                            <View style={[styles.select_opt_list_itmes]}>
                                                <TouchableOpacity onPress={() => goSearch(val.value)}>
                                                    <Text style={[text_center,h17]}>
                                                        {val.label}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </ScrollView>
                                </View>
                                )}
                                {/**/}
                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>업체명</Text>
                                <TextInput style={[input]}
                                           placeholder="업체명을 입력해주세요."
                                           onChangeText={(com_name)=>goInput('com_name',com_name)}
                                           value={SignUp.com_name}
                                           ref={val=>(Chkinput.current[3] = val)}
                                />
                            </View>
                        </View>
                        {/*<View style={styles.formGroup}>*/}
                        {/*    <View style={styles.inputGroup}>*/}
                        {/*        <Text style={styles.inputTopText}>상호명</Text>*/}
                        {/*        <TextInput style={[input]}*/}
                        {/*                   placeholder="상호명을 입력해주세요."*/}
                        {/*                   onChangeText={(com_biz_name)=>goInput('com_biz_name',com_biz_name)}*/}
                        {/*                   value={SignUp.com_biz_name}*/}
                        {/*                   ref={val=>(Chkinput.current[3] = val)}*/}
                        {/*        />*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                        {/*업체명 입력창*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>사업자 등록번호</Text>
                                <TextInput style={[input]}
                                           onChangeText={(com_biz_no)=>goInput('com_biz_no',com_biz_no)}
                                           value={bizNum(SignUp.com_biz_no)}
                                           ref={val=>(Chkinput.current[4] = val)}
                                           maxLength={12}
                                           placeholder="12345-51-687891"
                                           keyboardType="numeric"
                                />
                            </View>
                        </View>
                        {/*사업자 등록번호 입력창*/}
                        <View style={styles.formGroup}>
                            <Text style={styles.inputTopText}>사업장 주소</Text>
                            <View style={styles.flex}>
                                {/*우편번호*/}
                                <View style={[styles.inputGroup,styles.flexitem1,pe2]}>
                                    <TextInput style={[input,styles.me_18,styles.zonecode]}
                                               value={SignUp.zonecode}
                                               ref={val=>(Chkinput.current[5] = val)}
                                               editable={false}
                                    />
                                </View>
                                {/*주소찾기*/}
                                <View style={[styles.flexitem2]}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('주소검색',{page:'회원가입', order_uid:''})} style={styles.find_id_btn} >
                                        <View  style={[pos_center]} >
                                            <Text style={[styles.find_id_btn_txt]}>주소찾기</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/*=============주소 1==============*/}
                            <View style={[styles.inputGroup,styles.py_12]}>
                                <TextInput style={[input]}
                                           value={SignUp.addr1}
                                           editable={false}
                                           ref={val=>(Chkinput.current[6] = val)}
                                           placeholder="예 ) 서울특별시 00구 00로"
                                />
                            </View>
                            {/*=============주소 2==============*/}
                            <View style={[styles.inputGroup]}>
                                <TextInput style={[input]}
                                           onChangeText={(addr2)=>goInput('addr2',addr2)}
                                           value={SignUp.addr2}
                                           ref={val=>(Chkinput.current[7] = val)}
                                           placeholder="상세주소 입력"
                                />
                            </View>
                        </View>
                        {/*사업장 주소 입력창*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>담당자명</Text>
                                <TextInput style={[input]}
                                           onChangeText={(mem_name)=>goInput('mem_name',mem_name)}
                                           value={SignUp.mem_name}
                                           ref={val=>(Chkinput.current[8] = val)}
                                           placeholder="예 ) 홍길동"
                                />
                            </View>
                        </View>
                        {/*담당자명 입력창*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>담당자 연락처</Text>
                                <TextInput style={[input]}
                                           onChangeText={(mem_mobile)=>goInput('mem_mobile',mem_mobile)}
                                           maxLength={13}
                                           value={Phone(SignUp.mem_mobile)}
                                           ref={val=>(Chkinput.current[9] = val)}
                                           keyboardType="numeric"
                                           placeholder="예 ) 010-0000-0000"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={[gray_bar]}/>

                    <View style={styles.container}>
                        <View style={styles.privacy_wrap}>
                            <View style={[styles.privacy_chek_all,flex]}>
                                <Checkbox
                                    onValueChange={(all)=>privacyChk('All',all)}
                                    value={(TChk.length === 5)}
                                    style={styles.checkbox} color={"#4630eb"}
                                />
                                <Text style={styles.privacy_chek_all_txt} >전체 약관 동의</Text>
                            </View>
                            <View style={styles.privacy_list}>
                                <View style={[styles.privacy_list_item,styles.privacy_list_flex]}>
                                    <View style={[styles.privacy_list_flex_item,flex]}>
                                        <Checkbox
                                            onValueChange={(privacy_1) => privacyChk('privacy_1',privacy_1)}
                                            value={SignUp.privacy_1}
                                            ref={val=> (Chkinput.current[10] = val)}
                                            style={[styles.checkbox]} color={"#4630eb"}
                                        />
                                        <Text style={styles.privacy_list_flex_item_txt}>서비스 이용약관 <Text style={styles.privacy_list_flex_item_txt2}>(필수)</Text></Text>
                                    </View>
                                    <View style={styles.privacy_list_flex_item}>
                                        <TouchableOpacity style={styles.privacy_btn}
                                        onPress={()=>navigation.navigate('약관/개인정보처리방침',{cfg_part2:`access`})}
                                        >
                                            <Text style={styles.privacy_btn_txt}>보기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* 서비스 이용약관  */}
                                <View style={[styles.privacy_list_item,styles.privacy_list_flex]}>
                                    <View style={[styles.privacy_list_flex_item,flex]}>
                                        <Checkbox
                                            onValueChange={(privacy_2) => privacyChk('privacy_2',privacy_2)}
                                            value={SignUp.privacy_2}
                                            ref={val=> (Chkinput.current[11] = val)}
                                            style={styles.checkbox} color={"#4630eb"}
                                        />
                                        <Text style={styles.privacy_list_flex_item_txt}>개인정보 처리방침 동의 <Text style={styles.privacy_list_flex_item_txt2}>(필수) </Text></Text>
                                    </View>
                                    <View style={styles.privacy_list_flex_item}>
                                        <TouchableOpacity style={styles.privacy_btn}
                                        onPress={()=>navigation.navigate('약관/개인정보처리방침',{cfg_part2:`etc_provision`})}
                                        >
                                            <Text style={styles.privacy_btn_txt}>보기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* 개인정보 처리방침 동의 */}
                                <View style={[styles.privacy_list_item,styles.privacy_list_flex]}>
                                    <View style={[styles.privacy_list_flex_item,flex]}>
                                        <Checkbox
                                            onValueChange={(privacy_3) => privacyChk('privacy_3',privacy_3)}
                                            value={SignUp.privacy_3}
                                            style={styles.checkbox} color={"#4630eb"}
                                            ref={val=> (Chkinput.current[12] = val)}
                                        />
                                        <Text style={styles.privacy_list_flex_item_txt}>전자금융거래 이용약관  <Text style={styles.privacy_list_flex_item_txt2}>(필수) </Text></Text>
                                    </View>
                                    <View style={styles.privacy_list_flex_item}>
                                        <TouchableOpacity style={styles.privacy_btn}
                                        onPress={()=>navigation.navigate('약관/개인정보처리방침',{cfg_part2:`ad_acces`})}
                                        >
                                            <Text style={styles.privacy_btn_txt}>보기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* 전자금융거래 이용약관 */}
                                <View style={[styles.privacy_list_item,styles.privacy_list_flex]}>
                                    <View style={[styles.privacy_list_flex_item,flex]}>
                                        <Checkbox
                                            onValueChange={(privacy_4) => privacyChk('privacy_4',privacy_4)}
                                            value={SignUp.privacy_4}
                                            ref={val=> (Chkinput.current[13] = val)}
                                            style={styles.checkbox} color={"#4630eb"}
                                        />
                                        <Text style={styles.privacy_list_flex_item_txt}>제3자 개인정보수집 동의  <Text style={styles.privacy_list_flex_item_txt2}>(필수) </Text></Text>
                                    </View>
                                    <View style={styles.privacy_list_flex_item}>
                                        <TouchableOpacity style={styles.privacy_btn}
                                        onPress={()=>navigation.navigate('약관/개인정보처리방침',{cfg_part2:`other_provision`})}
                                        >
                                            <Text style={styles.privacy_btn_txt}>보기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* 제3자 개인정보수집 동의 */}
                                <View style={[styles.privacy_list_item,styles.privacy_list_flex]}>
                                    <View style={[styles.privacy_list_flex_item,flex]}>
                                        <Checkbox
                                            onValueChange={(privacy_5) => privacyChk('privacy_5',privacy_5)}
                                            value={SignUp.privacy_5}
                                            ref={val=> (Chkinput.current[14] = val)}
                                            style={styles.checkbox} color={"#4630eb"}
                                        />
                                        <Text style={styles.privacy_list_flex_item_txt}>홍보 및 마케팅 이용 동의 (선택) </Text>
                                    </View>
                                    <View style={styles.privacy_list_flex_item}>
                                        <TouchableOpacity style={styles.privacy_btn}
                                        onPress={()=>navigation.navigate('약관/개인정보처리방침',{cfg_part2:`ad_acces`})}
                                        >
                                            <Text style={styles.privacy_btn_txt}>보기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.form_btn,ios_pb, (act_btn) && bg_primary]}>
                <TouchableOpacity
                    onPress={goForm}
                    style={[styles.form_btn_link,styles.form_btn_meminfo_link,]} >
                    <Text style={styles.form_btn_txt}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}



const styles = StyleSheet.create({

    modal:{
        position:"absolute",
        borderWidth:1,
        backgroundColor:"#fff",
        borderColor:"#f0f0f0",
        zIndex:99,
        width:"90%",
        padding:15,
        left:"5%",
        top:"20%",
    },

    subPage: {
        backgroundColor: '#fff',
        height:"100%",
    },
    container:{
        padding:16,
        width:"100%",
    },
    Chk:{opacity:0, position:"absolute", zIndex:99, width:"100%", right:0, top:0},
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
        fontSize: 12,
        height: 40,
        width: "100%",
        color: '#000000',
        paddingHorizontal: 10
    },
    inputContainer:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ededf1',
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
        height:38,
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
        position:"relative",
        borderWidth:1,
        borderColor:"#eee",
        borderRadius:5,
        paddingVertical:10,
        paddingHorizontal:16,
    },
    select_txt:{
        fontSize:12,
        color:"#999",
    },
    select_icon_box:{
        position: "absolute",
        top: 0,
        right: 10,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
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
    select_opt_list_box:{
        paddingHorizontal:10,
        paddingVertical:12,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
    },
    select_opt_list_itmes:{
        borderBottomWidth:1,
        paddingVertical:10,
        borderColor:"#eee",

    },
});