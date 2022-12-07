import React,{useState,useEffect} from 'react';
import { StyleSheet, Button, CheckBox,  Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';


// 공통 CSS 추가
import {container, bg_white,flex_between} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';



export default function MemInfo({navigation,route}) {


    const [id, onChangeText] = React.useState("");
    const [pw, onChangePW] = React.useState("");
    const [pwch, onChangePWch] = React.useState("");
    const [com_name, onChangecom_name] = React.useState("");
    const [addr1, onChangeaddr1] = React.useState("");
    const [addr2, onChangeaddr2] = React.useState("");




    return (
        <ScrollView style={[bg_white]}>
            <View style={[styles.subPage,styles.MemInfo]}>
                <View style={styles.container}>
                    <Text style={styles.MemInfo_txt}>비밀번호 변경</Text>
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>비밀번호</Text>
                            <TextInput style={styles.input} secureTextEntry={true} onChangeText={onChangePW}  placeholder="비밀번호를 입력해주세요." value={pw}/>
                        </View>
                    </View>
                    {/*비밀번호 입력창*/}
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>비밀번호 변경</Text>
                            <TextInput style={styles.input} secureTextEntry={true} onChangeText={onChangePWch}  placeholder="비밀번호를 입력해주세요." value={pwch}/>
                        </View>
                    </View>
                    {/*비밀번호확인 입력창*/}
                </View>

                <View style={styles.gary_bar}/>

                <View style={styles.container}>
                    <Text style={styles.MemInfo_txt}>필수정보 변경</Text>
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>업체명</Text>
                            <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder="가나인테리어" value={com_name}/>
                        </View>
                    </View>
                    {/*업체명 입력창*/}
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>사업자 등록번호</Text>
                            <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder="12345-51-687891"   value={com_name}/>
                        </View>
                    </View>
                    {/*사업자 등록번호 입력창*/}
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>담당자 연락처</Text>
                            <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder=""   value={com_name}/>
                        </View>
                    </View>
                    {/*담당자명 입력창*/}
                </View>

                <View style={styles.gary_bar}/>
                <View style={styles.container}>
                    <Text style={styles.MemInfo_txt}>선택정보 입력/변경</Text>
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>담당자 이메일</Text>
                            <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder=""   value={com_name}/>
                        </View>
                    </View>
                    {/*담당자 이메일 입력창*/}
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>대표자명</Text>
                            <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder=""   value={com_name}/>
                        </View>
                    </View>
                    {/*대표자명 입력창*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.inputTopText}>사업장 주소</Text>
                        <View style={styles.flex}>
                            <View style={[styles.inputGroup,styles.flexitem1]}>
                                <TextInput style={[styles.input,styles.me_18,styles.zonecode]} editable={false} selectTextOnFocus={false}  value=""/>
                            </View>
                            <View style={[styles.flexitem2]}>
                                <TouchableOpacity style={styles.find_id_btn}  >
                                    <Text style={[styles.find_id_btn_txt]}>주소찾기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.inputGroup,styles.py_12]}>
                            <TextInput style={[styles.input]} onChangeaddr1={onChangecom_name} placeholder=""   value={addr1}/>
                        </View>
                        <View style={[styles.inputGroup]}>
                            <TextInput style={[styles.input]} onChangeaddr2={onChangecom_name} placeholder=""   value={addr2}/>
                        </View>
                    </View>
                    {/*사업장 주소 입력창*/}
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>업태/종목</Text>
                            <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder=""   value={com_name}/>
                        </View>
                    </View>
                    {/*업태/종목 입력창*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.inputTopText}>대표전화번호</Text>
                        <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder=""   value={com_name}/>
                    </View>
                    {/*대표전화번호 입력창*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.inputTopText}>팩스번호</Text>
                        <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder=""   value={com_name}/>
                    </View>
                    {/*팩스번호 입력창*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.inputTopText}>세금계산서 이메일</Text>
                        <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder=""   value={com_name}/>
                    </View>
                    {/*세금계산서 이메일 입력창*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.inputTopText}>계좌번호</Text>
                        <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder=""   value={com_name}/>
                    </View>
                    {/*계좌번호 입력창*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.inputTopText}>예금주명</Text>
                        <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder=""   value={com_name}/>
                    </View>
                    {/*예금주명 입력창*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.inputTopText}>사업자 등록증 이미지</Text>
                        <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder=""   value={com_name}/>
                    </View>
                    {/*사업자 등록증 이미지 입력창*/}
                </View>

                <View style={[styles.form_btn,styles.form_meminfo_btn]}>
                    <TouchableOpacity style={[styles.form_btn_link,styles.form_btn_meminfo_link]} >
                        <Text style={styles.form_btn_txt}>정보변경</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    subPage: {
        backgroundColor: '#fff',
        height:"100%",
    },
    MemInfo_txt:{
        fontSize:14,
        fontWeight:"600",
        lineHeight:22,
        color:"#222",
        paddingBottom:20,
    },
    container:{
        padding:16,
        width:"100%",
    },
    gary_bar:{
        borderBottomWidth:1,
        borderColor:"#ededf1",
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
        fontSize:12,
        lineHeight:22,
        color:"#696A81",
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
        paddingVertical:9,
        paddingHorizontal:16,
    },
    find_id_btn_txt:{
        color:"#fff",
        fontSize:12,
        textAlign:"center",
    },
    flexitem1:{
        width:"65%"
    },
    flexitem2:{
        width:"35%"
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
});