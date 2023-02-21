import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Button,
    CheckBox,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView, Pressable, Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    flex,
    input,
    pe2,
    pos_center,
    ios_pb,
    mt2,
    text_danger
} from '../../common/style/AtStyle';
import {gray_bar, sub_page} from '../../common/style/SubStyle';

import {AddrMatch, BankCode, bizNum, EmailDomain, Phone, regPW,} from "../../util/util";
import CameraIcon from "../../icons/camera_icon.svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function MemInfo({route, navigation}) {

    let {uid} = route.params;
    console.log('로그인 아이디 uid : ' + uid);
    // 로그인 아이디 uid

    const Chkinput2 = useRef([]);                // 입력값 위치 설정
    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    })

    // 1. data로 넘길 status 셋팅
    const [MemInfo, setMemInfo] = useState({

    });


    useEffect(() => {
        axios.post('http://49.50.162.86:80/ajax/UTIL_mem_info_new.php', {
            act_type    :"my_page",
            mem_uid     :Member,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if(res) {
                const {result, test, mem_info} = res.data;
                if(result === 'OK') {
                    console.log('정상');

                    let mem_email = mem_info.mem_email;
                    let mem_email_split = mem_email.split("@");
                    let tax_calc_email = mem_info.tax_calc_email;
                    let tax_calc_email_split = tax_calc_email.split("@");

                    setMemInfo({
                        mem_pw:                     "",                                 // 비밀번호
                        mem_pw_chk:                 "",                                 // 비밀번호 확인
                        road_address:               mem_info.road_address,              // 지역코드
                        com_name:                   mem_info.com_name,                  // 업체명
                        mem_name:                   mem_info.mem_name,                  // 담당자명
                        rank_name:                  mem_info.rank_name,                 // 직급
                        mem_mobile:                 mem_info.mem_mobile,                // 담당자 연락처
                        mem_email1:                 mem_email_split[0],                 // 담당자 이메일1
                        mem_email2:                 mem_email_split[1],                 // 담당자 이메일2
                        mem_email_etc:              "",                                 // 담당자 이메일 직접입력
                        com_fax:                    mem_info.com_fax,                   // 팩스번호
                        com_biz_no:                 mem_info.com_biz_no,                // 사업자 등록번호
                        biz_cate:                   mem_info.biz_cate,                  // 업태
                        biz_item:                   mem_info.biz_item,                  // 종목
                        com_biz_name:               mem_info.com_biz_name,              // 상호명
                        ceo_name:                   mem_info.ceo_name,                  // 대표자명
                        zonecode:                   mem_info.zonecode,                  // 우편번호
                        addr1:                      mem_info.addr1,                     // 주소1
                        addr2:                      mem_info.addr2,                     // 주소2 상세
                        Tax_email1:                 tax_calc_email_split[0],            // 세금계산서 이메일1
                        Tax_email2:                 tax_calc_email_split[1],            // 세금계산서 이메일2
                            Tax_email_etc:              "",                             // 세금계산서 이메일_직접입력
                        pay_bank_code:              mem_info.pay_bank_code,             //은행코드
                        pay_bank_no:                mem_info.pay_bank_no,               // 계좌번호
                        pay_bank_owner:             mem_info.pay_bank_owner,            // 예금주

                        // img_file1       :'',            // 사업자등록증 사본
                        // img_file2       :'',            // 통장사본
                        // mem_id_chk      :'N',           // 회원아이디 체크
                        // all_chk         :false,
                    });
                    // setMemInfo(mem_email);
                }
                if(result === 'NG') {
                    console.log('비정상');
                }
            }
        });

    }, [Member]);

    // 2. 입력폼 체크루틴
    const ChkInput = (keyValue, text) => {
        // 기본 루틴
        setMemInfo({
            ...MemInfo,
            [keyValue]: text,
        });

        if(keyValue === 'mem_mobile') {
            setMemInfo({
                ...MemInfo,
                [keyValue]: Phone(text),
            });
        }
        if(keyValue === 'com_fax') {
            setMemInfo({
                ...MemInfo,
                [keyValue]: Phone(text),
            });
        }
        if(keyValue === 'com_biz_no') {
            setMemInfo({
                ...MemInfo,
                [keyValue]: bizNum(text),
            });
        }
    }


    // 3. 데이터 전송
    const goForm = () => {

        let mem_pw = MemInfo.mem_pw;                                //비밀번호
        let mem_pw_chk = MemInfo.mem_pw_chk;                        //바밀번호 확인
        let road_address = MemInfo.road_address;                    //지역
        let com_name = MemInfo.com_name;                            //업체명
        let com_biz_no =  MemInfo.com_biz_no;                       // 사업자 등록번호
        let mem_name = MemInfo.mem_name;                            // 담당자명
        let rank_name = MemInfo.rank_name;                          // 직급
        let mem_mobile = MemInfo.mem_mobile;                        // 담당자 연락처
        let mem_email1 = MemInfo.mem_email1;                        // 담당자 이메일1
        let mem_email2 = MemInfo.mem_email2;                        // 담당자 이메일2
        let mem_email_etc = MemInfo.mem_email_etc;                  // 담당자 이메일 직접입력
        let ceo_name = MemInfo.ceo_name;                            // 대표자명
        let zonecode = MemInfo.zonecode;                            // 우편번호
        let addr1 = MemInfo.addr1;                                  // 주소1
        let addr2 = MemInfo.addr2;                                  // 주소2 상세
        let biz_cate = MemInfo.biz_cate;                            // 업태
        let biz_item = MemInfo.biz_item;                            // 종목
        let com_biz_name = MemInfo.com_biz_name;                    // 상호명
        let com_fax = MemInfo.com_fax;                              // 팩스번호
        let Tax_email1 = MemInfo.Tax_email1;                        // 세금계산서 이메일1
        let Tax_email2 = MemInfo.Tax_email2;                        // 세금계산서 이메일2
        let Tax_email_etc = MemInfo.Tax_email_etc;                  // 세금계산서 이메일_직접입력
        let pay_bank_code = MemInfo.pay_bank_code;                  //은행코드
        let pay_bank_no = MemInfo.pay_bank_no;                      // 계좌번호
        let pay_bank_owner = MemInfo.pay_bank_owner;                // 예금주
        let img_file1  = MemInfo.img_file1;                         // 사업자등록증 사본
        let img_file2   = MemInfo.img_file2;                        // 통장사본
        let mem_id_chk   = MemInfo.mem_id_chk;                      // 회원아이디 체크

         console.log(
             "\n"+'비밀번호 : '+mem_pw+"\n",
             '비밀번호 확인 : '+mem_pw_chk+"\n",
             '지역 : '+road_address+"\n",
             '업체명 : '+com_name+"\n",
             '담당자명 : '+mem_name+"\n",
             '직급 : '+rank_name+"\n",
             '담당자연락처 : '+mem_mobile+"\n",
             '담당자 이메일1 : '+mem_email1+"\n",
             '담당자 이메일2 : '+mem_email2+"\n",
             '팩스 : '+com_fax+"\n",
             '사업자번호 : '+com_biz_no+"\n",
             '업태 : '+biz_cate+"\n",
             '종목 : '+biz_item+"\n",
             '상호명 : '+com_biz_name+"\n",
             '대표자명 : '+ceo_name+"\n",
             '사업장 주소 : '+"("+zonecode+")",addr1,' / '+addr2+"\n",
             '세금계산서 이메일 : '+Tax_email1,"@",Tax_email2+"\n",
             '은행코드 : '+pay_bank_code+"\n",
             '계좌번호 : '+pay_bank_no+"\n",
             '예금주 : '+pay_bank_owner+"\n",
             );

        if( !mem_pw) {             // 비밀번호 최소
            Alert.alert('',`비밀번호를 입력하세요.`);
            return Chkinput2.current[0].focus();
        }
        if(8 >= mem_pw.length) {             // 비밀번호 최소
            Alert.alert('',`8자 이상 입력해주세요.`);
            return Chkinput2.current[0].focus();
        }
        if(regPW.test(mem_pw) === false) {  // 특수문자 입력 필수
            Alert.alert('','특수 문자가 포함되어있지 않습니다.');
            return Chkinput2.current[0].focus();
        }
        if( mem_pw !== mem_pw_chk) {             // 비밀번호 체크
            Alert.alert('',`비밀번호가 일치 하지 않습니다.`);
            return Chkinput2.current[1].focus();
        }
        if( !com_name) {             // 업체명
            Alert.alert('',`업체명을 입력하세요.`);
            return Chkinput2.current[2].focus();
        }
        if( !mem_name) {             // 담당자명
            Alert.alert('',`담당자명을 입력하세요.`);
            return Chkinput2.current[3].focus();
        }
        if( !rank_name) {             // 담당자직급
            Alert.alert('',`담당자 직급을 입력하세요.`);
            return Chkinput2.current[4].focus();
        }
        if( !mem_mobile) {             // 담당자연락처
            Alert.alert('',`담당자연락처를 입력하세요.`);
            return Chkinput2.current[5].focus();
        }
        if( !mem_email1) {             // 담당자이메일
            Alert.alert('',`담당자 이메일을 입력하세요.`);
            return Chkinput2.current[6].focus();
        }
        if( !com_fax) {             // 팩스번호
            Alert.alert('',`팩스번호를 입력하세요.`);
            return Chkinput2.current[7].focus();
        }
        if( !com_biz_no) {             // 사업자등록번호
            Alert.alert('',`사업자등록번호를 입력하세요.`);
            return Chkinput2.current[8].focus();
        }
        if( !biz_cate) {             // 업태
            Alert.alert('',`업태를 입력하세요.`);
            return Chkinput2.current[9].focus();
        }
        if( !biz_item) {             // 종목
            Alert.alert('',`종목를 입력하세요.`);
            return Chkinput2.current[10].focus();
        }
        if( !com_biz_name) {             // 상호명
            Alert.alert('',`상호명를 입력하세요.`);
            return Chkinput2.current[11].focus();
        }
        if( !ceo_name) {             // 대표자명
            Alert.alert('',`대표자명를 입력하세요.`);
            return Chkinput2.current[12].focus();
        }
        if( !Tax_email1) {             // 세금계산서이메일
            Alert.alert('',`세금계산서 이메일을 입력하세요.`);
            return Chkinput2.current[13].focus();
        }
        if( !pay_bank_no) {             // 계좌번호
            Alert.alert('',`계좌번호를 입력하세요.`);
            return Chkinput2.current[14].focus();
        }
        if( !pay_bank_owner) {             // 예금주
            Alert.alert('',`예금주를 입력하세요.`);
            return Chkinput2.current[15].focus();
        }
    }

    console.log('들어간값 확인 ',MemInfo);
    const imgSrc = {uri : "http://49.50.162.86/upload/999999994022/client/60230916207049.jpg"};
    const imgSrc2 = {uri : "http://49.50.162.86/upload/999999994022/client/60230916207049.jpg"};

    return (
        <>
            <KeyboardAvoidingView style={[styles.avoidingView]} behavior={Platform.select({ios: 'padding'})}>
                <ScrollView style={[bg_white]}>
                    <View style={[styles.MemInfo]}>
                        <Text style={styles.MemInfo_txt}>비밀번호 변경</Text>
                        <View style={styles.container}>
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>비밀번호 <Text style={[text_danger]}>*</Text></Text>
                                    <TextInput style={[input]} secureTextEntry={true}
                                               onChangeText={(mem_pw) => ChkInput("mem_pw", mem_pw)}
                                               ref={val=>(Chkinput2.current[0] = val)}
                                               placeholder="비밀번호를 입력해주세요."
                                               value={MemInfo.mem_pw}/>
                                </View>
                            </View>
                            {/*============ 현재 비밀번호 ============ */}
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>비밀번호 확인 <Text style={[text_danger]}>*</Text></Text>
                                    <TextInput style={[input]}
                                               secureTextEntry={true}
                                               onChangeText={(mem_pw_chk) => ChkInput("mem_pw_chk", mem_pw_chk)}
                                               ref={val=>(Chkinput2.current[1] = val)}
                                               placeholder="비밀번호를 입력해주세요."
                                               value={MemInfo.mem_pw_chk}/>
                                </View>
                            </View>
                            {/*============ 변경 비밀번호 ============ */}
                        </View>


                        <Text style={styles.MemInfo_txt}>기본정보 변경</Text>
                        <View style={styles.container}>

                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>지역</Text>
                                    <View style={[styles.select_box]}>
                                        <RNPickerSelect
                                            placeholder={{label:"지역을 선택해주세요.", value:null}}
                                            onValueChange={(road_address) => ChkInput('road_address',road_address)}
                                            items={AddrMatch}
                                            value={MemInfo.road_address}
                                            useNativeAndroidPickerStyle={false}
                                            style={{
                                                placeholder:{color:'gray'},
                                                inputAndroid : styles.input,
                                                inputAndroidContainer : styles.inputContainer,
                                                inputIOS: styles.input,
                                                inputIOSContainer : styles.inputContainer,
                                            }}
                                        />
                                        <View style={[styles.select_icon_box]}>
                                            <Text style={[styles.select_icon]}>▼</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                            {/*============ 지역 ============ */}
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>업체명</Text>
                                    <TextInput style={[input]}
                                               onChangeText={(com_name) => ChkInput("com_name", com_name)}
                                               ref={val=>(Chkinput2.current[2] = val)}
                                               placeholder="가나인테리어"
                                               value={MemInfo.com_name}/>
                                </View>
                            </View>
                            {/*============ 업체명 ============ */}
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>담당자명 / 직급</Text>
                                    <View style={flex}>
                                        <View style={[styles.flex_item_4_half]}>
                                            <TextInput style={[input]}
                                                       onChangeText={(mem_name) => ChkInput("mem_name", mem_name)}
                                                       ref={val=>(Chkinput2.current[3] = val)}
                                                       placeholder="홍길동"
                                                       value={MemInfo.mem_name}/>
                                        </View>
                                        <View style={[styles.flex_item_1]}>
                                            <Text style={styles.txt_center}>/</Text>
                                        </View>
                                        <View style={[styles.flex_item_4_half]}>
                                            <TextInput style={[input]}
                                                       onChangeText={(rank_name) => ChkInput("rank_name", rank_name)}
                                                       ref={val=>(Chkinput2.current[4] = val)}
                                                       placeholder="과장"
                                                       value={MemInfo.rank_name}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/*============ 담당자명 / 직급 ============ */}
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>담당자 연락처</Text>
                                    <TextInput style={[input]}
                                               onChangeText={(mem_mobile) => ChkInput("mem_mobile", mem_mobile)}
                                               ref={val=>(Chkinput2.current[5] = val)}
                                               placeholder="010-1234-5678"
                                               maxLength={13}
                                               value={MemInfo.mem_mobile}/>
                                </View>
                            </View>
                            {/*============ 담당자 연락처 ============ */}
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>담당자 이메일</Text>
                                    <View style={flex}>
                                        <View style={[styles.flex_item, styles.flex_item1]}>
                                            <TextInput style={[input]}
                                                       onChangeText={(mem_email1) => ChkInput("mem_email1", mem_email1)}
                                                       ref={val=>(Chkinput2.current[6] = val)}
                                                       placeholder=""
                                                       value={MemInfo.mem_email1}/>
                                        </View>
                                        <View style={[styles.flex_item, styles.flex_item2]}>
                                            <Text style={styles.txt_center}>@</Text>
                                        </View>
                                        <View style={[styles.flex_item, styles.flex_item3]}>
                                            <View style={[styles.select_box]}>
                                                <RNPickerSelect
                                                    placeholder={{label: "직접입력", value: null}}
                                                    onValueChange={(mem_email2) => ChkInput('mem_email2', mem_email2)}
                                                    items={EmailDomain}
                                                    value={MemInfo.mem_email2}
                                                    useNativeAndroidPickerStyle={false}
                                                    style={{
                                                        placeholder: {color: 'gray'},
                                                        inputAndroid: styles.input,
                                                        inputAndroidContainer: styles.inputContainer,
                                                        inputIOS: styles.input,
                                                        inputIOSContainer: styles.inputContainer,
                                                    }}
                                                />
                                                <View style={[styles.select_icon_box]}>
                                                    <Text style={[styles.select_icon]}>▼</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/*============ 담당자 이메일 ============ */}
                            <View style={styles.formGroup}>
                                <Text style={styles.inputTopText}>팩스번호</Text>
                                <TextInput style={[input]}
                                           onChangeText={(com_fax) => ChkInput("com_fax", com_fax)}
                                           ref={val=>(Chkinput2.current[7] = val)}
                                           maxLength={13}
                                           placeholder=""
                                           value={MemInfo.com_fax}/>
                            </View>
                            {/*============ 팩스번호 ============ */}




                        </View>

                        <Text style={styles.MemInfo_txt}>사업자 정보</Text>
                        <View style={styles.container}>
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>사업자 등록번호</Text>
                                    <TextInput style={[input]}
                                               maxLength={15}
                                               onChangeText={(com_biz_no) => ChkInput("com_biz_no", com_biz_no)}
                                               ref={val=>(Chkinput2.current[8] = val)}
                                               maxLength={12}
                                               placeholder="12345-51-687891"
                                               value={MemInfo.com_biz_no}/>
                                </View>
                            </View>
                            {/*============ 사업자 등록번호 ============ */}
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>업태/종목</Text>
                                    <View style={flex}>
                                        <View style={[styles.flex_item_4_half]}>
                                            <TextInput style={[input]}
                                                       onChangeText={(biz_cate) => ChkInput("biz_cate", biz_cate)}
                                                       ref={val=>(Chkinput2.current[9] = val)}
                                                       placeholder=""
                                                       value={MemInfo.biz_cate}/>
                                        </View>
                                        <View style={[styles.flex_item_1]}>
                                            <Text style={styles.txt_center}>/</Text>
                                        </View>
                                        <View style={[styles.flex_item_4_half]}>
                                            <TextInput style={[input]}
                                                       onChangeText={(biz_item) => ChkInput("biz_item", biz_item)}
                                                       ref={val=>(Chkinput2.current[10] = val)}
                                                       placeholder=""
                                                       value={MemInfo.biz_item}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/*============ 업태/종목 ============ */}
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>상호명</Text>
                                    <TextInput style={[input]}
                                               onChangeText={(com_biz_name) => ChkInput("com_biz_name", com_biz_name)}
                                               ref={val=>(Chkinput2.current[11] = val)}
                                               placeholder=""
                                               value={MemInfo.com_biz_name}/>
                                </View>
                            </View>
                            {/*============ 상호명 ============ */}

                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>대표자명</Text>
                                    <TextInput style={[input]}
                                               onChangeText={(ceo_name) => ChkInput("ceo_name", ceo_name)}
                                               ref={val=>(Chkinput2.current[12] = val)}
                                               placeholder=""
                                               value={MemInfo.ceo_name}/>
                                </View>
                            </View>
                            {/*============ 대표자명 ============ */}
                            <View style={styles.formGroup}>
                                <Text style={styles.inputTopText}>사업장 주소</Text>
                                <View style={styles.flex}>
                                    <View style={[styles.inputGroup, styles.flexitem1, pe2]}>
                                        <TextInput style={[input, styles.me_18, styles.zonecode]}
                                                   onChangeText={(zonecode) => ChkInput("zonecode", zonecode)}
                                                   editable={false}
                                                   electTextOnFocus={false}
                                                   value={MemInfo.zonecode}/>
                                    </View>
                                    <View style={[styles.flexitem2]}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('주소검색', {page: '회원가입', order_uid: ''})}
                                            style={styles.find_id_btn}>
                                            <View style={[pos_center]}>
                                                <Text style={[styles.find_id_btn_txt]}>주소찾기</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/*=============주소 1==============*/}
                                <View style={[styles.inputGroup, styles.py_12]}>
                                    <TextInput style={[input]}
                                               onChangeText={(addr1) => ChkInput("addr1", addr1)}
                                               placeholder=""
                                               value={MemInfo.addr1}/>
                                </View>
                                {/*=============주소 2==============*/}
                                <View style={[styles.inputGroup]}>
                                    <TextInput style={[input]}
                                               onChangeText={(addr2) => ChkInput("addr2", addr2)}
                                               placeholder="상세주소 입력"
                                               value={MemInfo.addr2}/>
                                </View>
                            </View>
                            {/*============ 사업장 주소 ============ */}
                            <View style={styles.formGroup}>
                                <Text style={styles.inputTopText}>세금계산서 이메일</Text>
                                <View style={flex}>
                                    <View style={[styles.flex_item, styles.flex_item1]}>
                                        <TextInput style={[input]}
                                                   onChangeText={(Tax_email1) => ChkInput("Tax_email1", Tax_email1)}
                                                   ref={val=>(Chkinput2.current[13] = val)}
                                                   placeholder=""
                                                   value={MemInfo.Tax_email1}
                                        />
                                    </View>
                                    <View style={[styles.flex_item, styles.flex_item2]}>
                                        <Text style={styles.txt_center}>@</Text>
                                    </View>
                                    <View style={[styles.flex_item, styles.flex_item3]}>
                                        <View style={[styles.select_box]}>
                                            <RNPickerSelect
                                                placeholder={{label: "직접입력", value: null}}
                                                onValueChange={(Tax_email2) => ChkInput('Tax_email2', Tax_email2)}
                                                items={EmailDomain}
                                                value={MemInfo.Tax_email2}
                                                useNativeAndroidPickerStyle={false}
                                                style={{
                                                    placeholder: {color: 'gray'},
                                                    inputAndroid: styles.input,
                                                    inputAndroidContainer: styles.inputContainer,
                                                    inputIOS: styles.input,
                                                    inputIOSContainer: styles.inputContainer,
                                                }}
                                            />
                                            <View style={[styles.select_icon_box]}>
                                                <Text style={[styles.select_icon]}>▼</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/*============ 세금계산서 이메일 ============ */}

                            <View style={styles.formGroup}>
                                <Text style={styles.inputTopText}>계좌번호</Text>
                                <View style={flex}>
                                    <View style={[styles.flex_item, styles.bank_flex_item1]}>
                                        <View style={[styles.select_box]}>
                                            <RNPickerSelect
                                                placeholder={{label: "은행명", value: null}}
                                                onValueChange={(pay_bank_code) => ChkInput('pay_bank_code', pay_bank_code)}
                                                items={BankCode}
                                                value={MemInfo.pay_bank_code}
                                                useNativeAndroidPickerStyle={false}
                                                style={{
                                                    placeholder: {color: 'gray'},
                                                    inputAndroid: styles.input,
                                                    inputAndroidContainer: styles.inputContainer,
                                                    inputIOS: styles.input,
                                                    inputIOSContainer: styles.inputContainer,
                                                }}
                                            />
                                            <View style={[styles.select_icon_box]}>
                                                <Text style={[styles.select_icon]}>▼</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.flex_item, styles.bank_flex_item2]}>
                                        <TextInput style={[input]}
                                                   onChangeText={(pay_bank_no) => ChkInput("pay_bank_no", pay_bank_no)}
                                                   ref={val=>(Chkinput2.current[14] = val)}
                                                   placeholder=""
                                                   value={MemInfo.pay_bank_no}/>
                                    </View>
                                </View>
                            </View>
                            {/*============ 계좌번호 ============ */}

                            <View style={styles.formGroup}>
                                <Text style={styles.inputTopText}>예금주명</Text>
                                <TextInput style={[input]}
                                           onChangeText={(pay_bank_owner) => ChkInput("pay_bank_owner", pay_bank_owner)}
                                           ref={val=>(Chkinput2.current[15] = val)}
                                           placeholder=""
                                           value={MemInfo.pay_bank_owner}/>
                            </View>
                            {/*============ 예금주명 ============ */}

                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>사업자 등록증</Text>

                                    <Pressable style={[styles.upload_btn]}>
                                        <View  style={[pos_center]} >
                                            <CameraIcon width={30} height={24}/>
                                        </View>
                                    </Pressable>
                                    <View  style={[mt2,styles.upload_box]} >

                                        <Image style={styles.upload_img} source={imgSrc}/>
                                    </View>

                                </View>
                            </View>
                            {/*============ 사업자 등록증 ============ */}

                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>통장사본</Text>

                                    {/*<Pressable style={[styles.upload_btn]} onPress={(CopyBankbook=>uploadImage('CopyBankbook',CopyBankbook))}>*/}
                                    {/*    <View  style={[pos_center]} >*/}
                                    {/*        <CameraIcon width={30} height={24}/>*/}
                                    {/*    </View>*/}
                                    {/*</Pressable>*/}
                                    <View  style={[mt2,styles.upload_box]} >
                                        {/*<Image style={styles.upload_img} source={{uri: imageUrl.CopyBankbook}}/>*/}
                                    </View>

                                </View>
                            </View>
                            {/*============ 통장사본 ============ */}

                        </View>
                    </View>
                </ScrollView>
                <View style={[styles.form_btn, styles.form_meminfo_btn]}>
                    <TouchableOpacity
                        onPress={goForm}
                        style={[styles.form_btn_link, styles.form_btn_meminfo_link]}>
                        <Text style={styles.form_btn_txt}>정보변경</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        </>

    );
}

const styles = StyleSheet.create({
    avoidingView: {
        flex: 1,
    },
    MemInfo: {
        //앱의 배경 색
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    MemInfo_txt: {
        width:"100%",
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 22,
        color: "#222",
        marginBottom: 20,
        paddingVertical:6,
        paddingLeft:16,
        backgroundColor:'#eee',
    },

    container: {
        padding: 16,
        width: "100%",
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
    },
    formGroup: {
        paddingBottom: 22,
    },
    input: {
        fontSize: 12,
        height: 40,
        width: "100%",
        color: '#000000',
        paddingHorizontal: 10
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ededf1',
    },
    inputTopText: {
        marginBottom: 12,
        fontSize: 12,
        lineHeight: 22,
        color: "#696A81",
    },
    loginformbtn: {
        backgroundColor: "#b1b2c3",
        textAlign: "center",
        borderRadius: 5,
        paddingVertical: 10,
        marginBottom: 26
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
        fontSize: 12,
        color: "#718096",
        paddingHorizontal: 18,
    },
    br_1: {
        borderRightWidth: 1,
        borderColor: "#b1b2c3",
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
    find_id_btn_txt: {
        color: "#fff",
        fontSize: 12,
        textAlign: "center",
    },
    flexitem1: {
        width: "65%"
    },
    flexitem2: {
        width: "35%"
    },
    me_18: {
        marginRight: 18,
    },
    zonecode: {
        backgroundColor: "#eaecf3",
    },
    py_12: {
        paddingVertical: 12,
    },
    privacy_chek_all: {
        paddingBottom: 15,
    },
    privacy_chek_all_txt: {
        fontSize: 16,
    },
    privacy_list: {
        borderWidth: 1,
        borderColor: "#ededf1",
        padding: 15,
    },
    privacy_list_flex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    privacy_list_flex_item: {
        paddingBottom: 14,
    },
    privacy_list_flex_item_txt: {
        fontSize: 14,
        color: "#222",
    },
    privacy_list_flex_item_txt2: {
        color: "#4549e0",
    },
    privacy_btn_txt: {
        fontSize: 12,
        color: "#b1b2c3",
    },
    form_btn: {
        backgroundColor: "#B1B2C3",
        paddingVertical: 20,
    },
    form_btn_txt: {
        textAlign: "center",
        fontSize: 17,
        lineHeight: 24,
        color: "#fff",
    },
    flex_item1: {
        width: "45%",
    },
    flex_item2: {
        width: "10%",
    },
    flex_item3: {
        width: "45%",
    },
    bank_flex_item1: {
        width: "30%",
    },
    bank_flex_item2: {
        width: "70%",
        paddingLeft: 20,
    },
    flex_item_4_half: {
        width: "45%",
    },
    flex_item_1: {
        width: "10%",
    },
    txt_center: {
        textAlign: "center",
    },
    find_id_btn: {
        backgroundColor: "#4549e0",
        height: 38,
        borderRadius: 5,
    },
    select_box:{
        position:"relative",
    },
    select_icon_box:{
        position: "absolute",
        top: 0,
        right: 10,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    select_icon:{
      color:"#999",
    },
    upload_box:{
        width: "100%",
        height: 500,
      borderWidth: 1,
    },
    upload_img:{
        resizeMode:"contain",
        width: "100%",
        height: "100%",
    }
});