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
    text_danger, text_black, text_center, h17, mb1, d_flex, bg_primary, text_gray
} from '../../common/style/AtStyle';
import {AddrMatch, BankCode, bizNum, EmailDomain, Minlangth, Phone, regPW,} from "../../util/util";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useIsFocused} from "@react-navigation/native";
import {get_Member, mod_mem_info} from "../UTIL_mem";
import HomeLogoAt from "../../icons/home_logo_at.svg";
import HomeLogo from "../../icons/home_logo.svg";


export default function MemInfo({route, navigation}) {

    let {uid, zonecode, addr1} = route.params;
    console.log('로그인 아이디 uid : ' + uid);
    // 로그인 아이디 uid

    const goInput2 = useRef([]);                // 입력값 위치 설정
    const [Member, setMember] = useState();

    console.log(Member);
    // 1. data로 넘길 status 셋팅
    const [MemInfo, setMemInfo] = useState({});
    const [Show_1, setShow_1]         = useState(false);    // 셀렉트창 노출 여부
    const [Show_2, setShow_2]         = useState(false);    // 셀렉트창 노출 여부
    const Update = useIsFocused();


    let act_btn = !!(
        MemInfo.road_address &&
        MemInfo.com_name &&
        MemInfo.mem_name &&
        MemInfo.rank_name &&
        MemInfo.mem_mobile &&
        MemInfo.mem_email1 &&
        MemInfo.mem_email2 &&
        MemInfo.com_biz_no &&
        MemInfo.addr1 &&
        MemInfo.addr2 &&
        MemInfo.tax_calc_email1 &&
        MemInfo.tax_calc_email2 &&
        MemInfo.pay_bank_code &&
        MemInfo.pay_bank_owner &&
        MemInfo.pay_bank_no
        // SignUp.all_chk
    );

    useEffect(() => {

        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                Alert.alert(``,`실패`);
            }
        });

        axios.post('http://49.50.162.86:80/ajax/UTIL_app.php', {
            act_type    :"get_mem_info",
            mem_uid     :Member,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if(res) {r
                const {result, mem_info} = res.data;
                console.log()
                if(result === 'OK') {
                    setMemInfo(mem_info);
                }
                if(result === 'NG') {
                    console.log('비정상');
                }
            }
        });
    }, [Update, Member]);


    const goSearch = (key,value) => {
        if(key === 'AddrMatch') {
            setShow_1(!Show_1)
            setMemInfo({
                ...MemInfo,
                road_address:value,
            });
        }

        if(key === 'bank') {
            setShow_2(!Show_2)
            setMemInfo({
                ...MemInfo,
                pay_bank_code:value,
            });

        }
    }


    const goInput = (keyValue, value) => {
        setMemInfo({...MemInfo,
            [keyValue]      :value,
        });
    }

    // 3. 데이터 전송
    const goForm = () => {
        let regPw = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

        if(!MemInfo.mem_pw && !MemInfo.mem_pw_chk) {
            //  비밀번호 변경의사 없음
        } else {
            if (!MemInfo.mem_pw && MemInfo.mem_pw_chk) {
                Alert.alert('', `비밀번호를 입력해주세요.`);
                return Alert.alert('', `비밀번호를 입력해주세요.`);
            }

            if (MemInfo.mem_pw && !MemInfo.mem_pw_chk) {
                Alert.alert('', `비밀번호 확인을 입력해주세요.`);
                return Alert.alert('', `비밀번호 확인을 입력해주세요.`);
            }

            if (MemInfo.mem_pw !== MemInfo.mem_pw_chk) {  // 비밀번호 일치
                Alert.alert('', '비밀번호가 일치 하지 않습니다.');
                return Alert.alert('', `비밀번호가 일치 하지 않습니다.`);
            }

            if (8 >= MemInfo.mem_pw.length) {             // 비밀번호 최소
                Alert.alert('', `8자 이상 입력해주세요.`);
                return Alert.alert('', `8자 이상 입력해주세요.`);
            }

            if (regPw.test(MemInfo.mem_pw) === false) {  // 특수문자 입력 필수
                Alert.alert('', '특수 문자가 포함되어있지 않습니다.');
                return Alert.alert('', '특수 문자가 포함되어있지 않습니다.');
            }
        }

        if(!MemInfo.road_address) { // 지역코드
            Alert.alert('','지역을 선택해주세요');
            return Alert.alert('','지역을 선택해주세요');
        }

        if(!MemInfo.com_name) {  // 업체명
            Alert.alert('',`업체명을 입력해주세요.`);
            return Alert.alert('',`업체명을 입력해주세요.`);
        }
        if(!MemInfo.com_biz_no) {  // 사업자 등록증
            Alert.alert('',`사업자 등록증을 입력해주세요.`);
            return Alert.alert('',`사업자 등록증을 입력해주세요.`);
        }
        if(!MemInfo.zonecode) {  // 우편번호
            Alert.alert('',`우편번호를 입력해주세요.`);
            return Alert.alert('',`우편번호를 입력해주세요.`);
        }
        if(!MemInfo.addr1) {  // 주소
            Alert.alert('',`주소를 입력해주세요.`);
            return Alert.alert('',`주소를 입력해주세요.`);
        }

        Alert.alert('','정보를 변경하시겠습니까?',[
            {
                text:"취소",
                onPress:()=>{}
            },
            {
                text:"확인",
                onPress:()=>{
                    console.log(MemInfo,'/전달값')
                    mod_mem_info(Member, MemInfo).then((res)=>{
                        if(res.data) {
                            console.log(res.data);
                            const {result} = res.data;
                            if(result === 'OK') {
                                Alert.alert('','회원정보가 수정되었습니다.');
                                return navigation.navigate('마이페이지');
                            } else {
                                Alert.alert('','실패');
                            }
                        }
                    });
                }
            },
        ])




    }

    console.log('들어간값 확인 ',MemInfo);

    return (
        <>
            <KeyboardAvoidingView style={[styles.avoidingView]} behavior={Platform.select({ios: 'padding'})}>
                <ScrollView style={[bg_white]}>
                    <View style={[styles.MemInfo]}>
                        <Text style={styles.MemInfo_txt}>비밀번호 변경</Text>
                        <View style={styles.container}>
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>변경 비밀번호 <Text style={[text_danger]}>*</Text></Text>
                                    <TextInput style={[input]} secureTextEntry={true}
                                               onChangeText={(mem_pw) => goInput("mem_pw", mem_pw)}
                                               defaultValue={``}
                                               autoCapitalize="none"
                                    />
                                </View>
                            </View>
                            {/*============ 현재 비밀번호 ============ */}
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>변경 비밀번호 확인 <Text style={[text_danger]}>*</Text></Text>
                                    <TextInput style={[input]} secureTextEntry={true}
                                               onChangeText={(mem_pw_chk) => goInput("mem_pw_chk", mem_pw_chk)}
                                               defaultValue={``}
                                               autoCapitalize="none"
                                    />
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
                                        <TouchableOpacity onPress={()=>{setShow_1(!Show_1)}}>
                                            <View style={[styles.border]}>
                                                {/**---------------------------선택주소 노출--------------------------------**/}
                                                <Text style={[styles.select_txt,(MemInfo.road_address) ? text_black:'']}>
                                                    {(MemInfo.road_address) ? MemInfo.road_address:'지역을 선택해주세요'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={[styles.select_icon_box]}>
                                            <Text style={[styles.select_icon]}>▼</Text>
                                        </View>
                                    </View>
                                    {/**/}
                                    {/**---------------------------클릭시 노출--------------------------------**/}
                                    {(Show_1) && (
                                        <View style={[styles.select_opt_list_box]}>
                                            <ScrollView style={[{height:160}]} nestedScrollEnabled={true}>
                                                {AddrMatch.map((val,idx)=>
                                                    <View style={[styles.select_opt_list_itmes]}>
                                                        <TouchableOpacity onPress={() => goSearch(`AddrMatch`, val.value)}>
                                                            <Text style={[text_center,h17]}>
                                                                {val.label}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </ScrollView>
                                        </View>
                                    )}
                                </View>
                            </View>
                            {/*============ 지역 ============ */}
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>업체명</Text>
                                    <TextInput style={[input]}
                                               onChangeText={(com_name) => goInput("com_name", com_name)}
                                               ref={val=>(goInput2.current[2] = val)}
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
                                                       onChangeText={(mem_name) => goInput("mem_name", mem_name)}
                                                       ref={val=>(goInput2.current[3] = val)}
                                                       placeholder="예시)홍길동"
                                                       value={MemInfo.mem_name}/>
                                        </View>
                                        <View style={[styles.flex_item_1]}>
                                            <Text style={styles.txt_center}>/</Text>
                                        </View>
                                        <View style={[styles.flex_item_4_half]}>
                                            <TextInput style={[input]}
                                                       onChangeText={(rank_name) => goInput("rank_name", rank_name)}
                                                       ref={val=>(goInput2.current[4] = val)}
                                                       placeholder="예시)과장"
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
                                               onChangeText={(mem_mobile) => goInput("mem_mobile", mem_mobile)}
                                               ref={val=>(goInput2.current[5] = val)}
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
                                        <View style={[styles.flex_item_4_half]}>
                                            <TextInput style={[input]}
                                                       autoCapitalize="none"
                                                       onChangeText={(mem_email1) => goInput("mem_email1", mem_email1)}
                                                       ref={val=>(goInput2.current[9] = val)}
                                                       placeholder=""
                                                       value={MemInfo.mem_email1}
                                            />
                                        </View>
                                        <View style={[styles.flex_item_1]}>
                                            <Text style={styles.txt_center}>@</Text>
                                        </View>
                                        <View style={[styles.flex_item_4_half]}>
                                            <TextInput style={[input]}
                                                       autoCapitalize="none"
                                                       onChangeText={(mem_email2) => goInput("mem_email2", mem_email2)}
                                                       ref={val=>(goInput2.current[10] = val)}
                                                       placeholder=""
                                                       value={MemInfo.mem_email2}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.MemInfo_txt}>사업자 정보</Text>
                        <View style={styles.container}>
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>사업자 등록번호</Text>
                                    <TextInput style={[input]}
                                               maxLength={15}
                                               onChangeText={(com_biz_no) => goInput("com_biz_no", com_biz_no)}
                                               ref={val=>(goInput2.current[8] = val)}
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
                                                       onChangeText={(biz_cate) => goInput("biz_cate", biz_cate)}
                                                       ref={val=>(goInput2.current[9] = val)}
                                                       placeholder=""
                                                       value={MemInfo.biz_cate}/>
                                        </View>
                                        <View style={[styles.flex_item_1]}>
                                            <Text style={styles.txt_center}>/</Text>
                                        </View>
                                        <View style={[styles.flex_item_4_half]}>
                                            <TextInput style={[input]}
                                                       onChangeText={(biz_item) => goInput("biz_item", biz_item)}
                                                       ref={val=>(goInput2.current[10] = val)}
                                                       placeholder=""
                                                       value={MemInfo.biz_item}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/*============ 업태/종목 ============ */}
                            {/*<View style={styles.formGroup}>*/}
                            {/*    <View style={styles.inputGroup}>*/}
                            {/*        <Text style={styles.inputTopText}>상호명</Text>*/}
                            {/*        <TextInput style={[input]}*/}
                            {/*                   onChangeText={(com_biz_name) => goInput("com_biz_name", com_biz_name)}*/}
                            {/*                   ref={val=>(goInput2.current[11] = val)}*/}
                            {/*                   placeholder=""*/}
                            {/*                   value={MemInfo.com_biz_name}/>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                            {/*============ 상호명 ============ */}

                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>대표자명</Text>
                                    <TextInput style={[input]}
                                               onChangeText={(ceo_name) => goInput("ceo_name", ceo_name)}
                                               ref={val=>(goInput2.current[12] = val)}
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
                                                   onChangeText={(zonecode) => goInput("zonecode", zonecode)}
                                                   editable={false}
                                                   electTextOnFocus={false}
                                                   value={(zonecode) ? (zonecode):(MemInfo.zonecode)}
                                        />
                                    </View>
                                    <View style={[styles.flexitem2]}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('주소검색', {page: '회원정보수정', order_uid: ''})}
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
                                               onChangeText={(addr1) => goInput("addr1", addr1)}
                                               placeholder=""
                                               value={(addr1) ? (addr1):(MemInfo.addr1)}
                                    />
                                </View>
                                {/*=============주소 2==============*/}
                                <View style={[styles.inputGroup]}>
                                    <TextInput style={[input]}
                                               onChangeText={(addr2) => goInput("addr2", addr2)}
                                               placeholder="상세주소 입력"
                                               value={MemInfo.addr2}/>
                                </View>
                            </View>
                            {/*============ 사업장 주소 ============ */}
                            <View style={styles.formGroup}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputTopText}>세금계산서 이메일</Text>
                                    <View style={flex}>
                                        <View style={[styles.flex_item_4_half]}>
                                            <TextInput style={[input]}
                                                       onChangeText={(tax_calc_email1) => goInput("tax_calc_email1", tax_calc_email1)}
                                                       ref={val=>(goInput2.current[9] = val)}
                                                       placeholder=""
                                                       value={MemInfo.tax_calc_email1}/>
                                        </View>
                                        <View style={[styles.flex_item_1]}>
                                            <Text style={styles.txt_center}>@</Text>
                                        </View>
                                        <View style={[styles.flex_item_4_half]}>
                                            <TextInput style={[input]}
                                                       onChangeText={(tax_calc_email2) => goInput("tax_calc_email2", tax_calc_email2)}
                                                       ref={val=>(goInput2.current[10] = val)}
                                                       placeholder=""
                                                       value={MemInfo.tax_calc_email2}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/*============ 세금계산서 이메일 ============ */}

                            <View style={styles.formGroup}>
                                <Text style={styles.inputTopText}>계좌번호</Text>
                                <View>
                                    <View style={[styles.select_box, mb1]}>
                                        <TouchableOpacity onPress={()=>{setShow_2(!Show_2)}}>
                                            <View style={[styles.border]}>
                                                {/**---------------------------선택주소 노출--------------------------------**/}
                                                <Text style={[styles.select_txt,(MemInfo.pay_bank_code) ? text_black:'']}>
                                                    {(!MemInfo.pay_bank_code) ? (
                                                        <>
                                                        <Text style={[text_gray]}>은행을 선택해주세요.</Text>
                                                        </>
                                                    ):(
                                                        <>
                                                            {BankCode.map(label=>label.value === MemInfo.pay_bank_code && label.label)}
                                                        </>
                                                    )}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={[styles.select_icon_box]}>
                                            <Text style={[styles.select_icon]}>▼</Text>
                                        </View>
                                    </View>
                                    {/**/}
                                    {/**---------------------------클릭시 노출--------------------------------**/}
                                    {(Show_2) && (
                                        <View style={[styles.select_opt_list_box]}>
                                            <ScrollView style={[{height:160}]} nestedScrollEnabled={true}>
                                                {BankCode.map((val,idx)=>
                                                    <View style={[styles.select_opt_list_itmes]}>
                                                        <TouchableOpacity onPress={() => goSearch(`bank`, val.value)}>
                                                            <Text style={[text_center,h17]}>
                                                                {val.label}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </ScrollView>
                                        </View>
                                    )}
                                    <View>
                                        <TextInput style={[input]}
                                                   onChangeText={(pay_bank_no) => goInput("pay_bank_no", pay_bank_no)}
                                                   ref={val=>(goInput2.current[14] = val)}
                                                   placeholder=""
                                                   value={MemInfo.pay_bank_no}/>
                                    </View>
                                </View>
                            </View>
                            {/*============ 계좌번호 ============ */}

                            <View style={styles.formGroup}>
                                <Text style={styles.inputTopText}>예금주명</Text>
                                <TextInput style={[input]}
                                           onChangeText={(pay_bank_owner) => goInput("pay_bank_owner", pay_bank_owner)}
                                           ref={val=>(goInput2.current[15] = val)}
                                           placeholder=""
                                           value={MemInfo.pay_bank_owner}/>
                            </View>
                            {/*============ 예금주명 ============ */}

                            {/*<View style={styles.formGroup}>*/}
                            {/*    <View style={styles.inputGroup}>*/}
                            {/*        <Text style={styles.inputTopText}>사업자 등록증</Text>*/}

                            {/*        <Pressable style={[styles.upload_btn]}>*/}
                            {/*            <View  style={[pos_center]} >*/}
                            {/*                <CameraIcon width={30} height={24}/>*/}
                            {/*            </View>*/}
                            {/*        </Pressable>*/}
                            {/*        <View  style={[mt2,styles.upload_box]} >*/}

                            {/*            <Image style={styles.upload_img} source={imgSrc}/>*/}
                            {/*        </View>*/}

                            {/*    </View>*/}
                            {/*</View>*/}
                            {/*============ 사업자 등록증 ============ */}

                            {/*<View style={styles.formGroup}>*/}
                            {/*    <View style={styles.inputGroup}>*/}
                            {/*        <Text style={styles.inputTopText}>통장사본</Text>*/}

                            {/*        <Pressable style={[styles.upload_btn]} onPress={(CopyBankbook=>uploadImage('CopyBankbook',CopyBankbook))}>*/}
                            {/*            <View  style={[pos_center]} >*/}
                            {/*                <CameraIcon width={30} height={24}/>*/}
                            {/*            </View>*/}
                            {/*        </Pressable>*/}
                            {/*        <View  style={[mt2,styles.upload_box]} >*/}
                            {/*            /!*<Image style={styles.upload_img} source={{uri: imageUrl.CopyBankbook}}/>*!/*/}
                            {/*        </View>*/}

                            {/*    </View>*/}
                            {/*</View>*/}
                            {/*============ 통장사본 ============ */}

                        </View>
                    </View>
                </ScrollView>
                <View style={[styles.form_btn,(act_btn) && bg_primary, styles.form_meminfo_btn]}>
                    <TouchableOpacity
                        onPress={goForm}
                        style={[styles.form_btn_link,  styles.form_btn_meminfo_link]}>
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
        paddingTop:32,
        paddingBottom:38,

    },
    form_btn_txt: {
        textAlign: "center",
        fontSize: 17,
        // lineHeight: 24,
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
        borderWidth:1,
        borderColor:"#eee",
        borderRadius:5,
        paddingVertical:10,
        paddingHorizontal:16,
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
        color:"#000",
    },
    upload_box:{
        width: "100%",
        height: 500,
        borderWidth: 1,
    },
    upload_img: {
        resizeMode: "contain",
        width: "100%",
        height: "100%",
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