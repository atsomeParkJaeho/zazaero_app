import React, {useState, useEffect} from 'react';
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
    KeyboardAvoidingView,
    Alert
} from 'react-native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    input,
    flex,
    pb2,
    pos_center,
    ms2,
    mb1,
    h14, justify_content_end, text_gray, select_box, select_icon_box, text_center, h17, mt2
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';
import Wishlist from "../../icons/ico_heart_c.svg";
import WishlistNon from "../../icons/ico_heart_nc.svg";
import {DateChg, Time2} from "../../util/util";


export default function MemOut({navigation, route}) {

    const [modAddr, setmodAddr]           = useState(`add`); // 사유선택, 직접입력 선택 상태 정의
    const [Show, setShow]         = useState(false);    // 셀렉트창 노출 여부

    //1.
    const [MemOut, setMemOut] = useState({
        mem_out_pw: "",    //비밀번호
        mem_out_pw_ch: "",   // 비밀번호 확인

    })


    //2. 입력폼 체크루틴
    const ChkInput = (keyValue, text) => {
        //기본 루틴
        setMemOut({
            ...MemOut,
            [keyValue]: text,
        })
    }

    console.log(MemOut);

    const goMemOut = async () => {
        const {mem_out_pw, mem_out_pw_ch} = MemOut;
        if (!MemOut.mem_out_pw) {
            Alert.alert(
                '비밀번호를 입력하세요.',
            );
            return;
        }
        if (!MemOut.mem_out_pw_ch) {
            Alert.alert('비밀번호확인을 입력해주세요.');
            return;
        }
        if (MemOut.mem_out_pw !== MemOut.mem_out_pw_ch) {
            Alert.alert('비밀번호가 일치하지 않습니다!!');

        }

    }

    /**--------------------------------------신규공사, 기존공사 선택 이벤트--------------------------------------------**/
    const select_addr = (type) => {
        if(type === 'Select') {
            setmodAddr(type);
        }
        if(type === 'Direct') {
            setmodAddr(type);
        }
    }

    /**------------------------------신규배송지, 기존배송지 선택-------------------------------**/
    function MemOutChoice() {
        return (
            <>
                <View style={[flex,pb2]}>
                    {/**----------------------------------------------사유선택--------------------------------------------------**/}
                    <TouchableOpacity onPress={()=>select_addr('Select')}>
                        <View style={[flex]}>
                            <View style={[styles.border_Circle]}>
                                {(modAddr === 'Select') &&
                                    <View style={[pos_center]}>
                                        <View style={[styles.border_Circle_active]}/>
                                    </View>
                                }
                            </View>
                            <Text style={[styles.Chk, {paddingLeft: 5}]}>사유선택</Text>
                        </View>
                    </TouchableOpacity>
                    {/**----------------------------------------------직접입력--------------------------------------------------**/}
                    <TouchableOpacity onPress={()=>select_addr('Direct')}>
                        <View style={[flex,ms2]}>
                            <View style={[styles.border_Circle]}>
                                {(modAddr === 'Direct') &&
                                    <View style={[pos_center]}>
                                        <View style={[styles.border_Circle_active]}/>
                                    </View>
                                }
                            </View>
                            <Text style={[styles.Chk, {paddingLeft: 5}]}>직접입력</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.subPage, styles.MemInfo]}>
                    <View style={styles.container}>
                        <Text style={styles.inputTopText}>회원탈퇴 사유</Text>
                        <MemOutChoice/>
                        {(modAddr === 'Direct') ? (
                            <>
                                <TextInput style={styles.input}

                                           onChangeText={(mem_out_pw) => ChkInput("mem_out_pw", mem_out_pw)}
                                           placeholder="탈퇴사유를 적어주세요."
                                           value={MemOut.mem_out_pw}/>

                            </>
                        ) : (
                            <>
                                <View style={[select_box]}>
                                    <TouchableOpacity onPress={()=>{setShow(!Show)}}>
                                        <View style={[styles.border]}>
                                            {/**---------------------------선택주소 노출--------------------------------**/}
                                            <Text style={[]}>
                                                탙퇴사유를 선택해주세요.
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={[select_icon_box]}>
                                        <Text style={[styles.select_icon]}>▼</Text>
                                    </View>
                                </View>
                                {/**---------------------------클릭시 노출--------------------------------**/}
                                {(Show) && (
                                    <View style={[styles.select_opt_list_box]}>
                                        <ScrollView style={[{height:160}]} nestedScrollEnabled={true}>

                                                <View style={[styles.select_opt_list_itmes]}>
                                                    <TouchableOpacity onPress={() => goSearch(val.value)}>
                                                        <Text style={[text_center,h14]}>
                                                           테스트1
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>

                                        </ScrollView>
                                    </View>

                                )}
                            </>
                        )}


                        <View style={[styles.formGroup,mt2]}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>비밀번호</Text>
                                <TextInput style={styles.input}
                                           secureTextEntry={true}
                                           onChangeText={(mem_out_pw) => ChkInput("mem_out_pw", mem_out_pw)}
                                           placeholder="비밀번호를 입력해주세요."
                                           value={MemOut.mem_out_pw}/>
                            </View>
                        </View>
                        {/*비밀번호 입력창*/}
                        <View style={styles.formGroup}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputTopText}>비밀번호 입력확인</Text>
                                <TextInput style={styles.input}
                                           secureTextEntry={true}
                                           onChangeText={(mem_out_pw_ch) => ChkInput("mem_out_pw_ch", mem_out_pw_ch)}
                                           placeholder="비밀번호를 확인해주세요."
                                           value={MemOut.mem_out_pw_ch}/>
                            </View>
                        </View>
                        {/*비밀번호확인 입력창*/}
                    </View>
                    <View style={styles.gary_bar}/>
                </View>
            </ScrollView>

            <View style={[styles.form_btn, styles.form_meminfo_btn]}>
                <TouchableOpacity style={[styles.form_btn_link, styles.form_btn_meminfo_link]} onPress={goMemOut}>
                    <Text style={styles.form_btn_txt}>회원탈퇴</Text>
                </TouchableOpacity>
            </View>
        </>


    );
}

const styles = StyleSheet.create({
    subPage: {
        backgroundColor: '#fff',
        height: "100%",
    },
    MemInfo_txt: {
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 22,
        color: "#222",
        paddingBottom: 20,
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
    inputTopText: {
        marginBottom: 12,
        fontSize: 12,
        lineHeight: 22,
        color: "#696A81",
    },
    input: {
        height: 46,
        margin: 0,
        borderRadius: 5,
        borderWidth: 1,
        paddingVertical: 7,
        paddingHorizontal: 18,
        borderColor: "#ededf1",
        fontSize: 12,
        color: "#000",
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
    find_id_btn: {
        backgroundColor: "#4549e0",
        paddingVertical: 9,
        paddingHorizontal: 16,
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
    border_Circle:{
        width:20,
        height:20,
        borderWidth:1,
        borderColor:"#999",
        borderRadius:50,

    },
    border_Circle_active:{
        width:13,
        height:13,
        borderRadius:50,
        backgroundColor:"#3D40E0",
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