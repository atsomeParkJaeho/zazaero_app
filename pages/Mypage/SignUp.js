import React,{useState,useEffect} from 'react';
import { StyleSheet, Button,   Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Checkbox from 'expo-checkbox';

import {SelectList} from 'react-native-dropdown-select-list'
//셀렉트박스

//로딩화면
import Loading from '../../components/Loading';

// 공통 CSS 추가
import {container, bg_white, flex} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';

export default function SignUp({navigation,route}) {
    //useState 사용법
    //[state,setState] 에서 state는 이 컴포넌트에서 관리될 상태 데이터를 담고 있는 변수
    //setState는 state를 변경시킬때 사용해야하는 함수

    //모두 다 useState가 선물해줌
    //useState()안에 전달되는 값은 state 초기값
    const [state,setState] = useState([])
    const [ready,setReady] = useState(false)

    const [isChecked, setChecked] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);
    const [isChecked4, setChecked4] = useState(false);
    const [isChecked5, setChecked5] = useState(false);
    const [isChecked6, setChecked6] = useState(false);



    const [selected, setSelected] = React.useState("");
    const data = [
        {key: '1', value: '서울특별시',},
        {key: '2', value: '부산광역시',},
        {key: '3', value: '울산광역시',},
        {key: '4', value: '대구광역시',},
        {key: '5', value: '인천광역시',},
        {key: '6', value: '대전광역시',},
        {key: '7', value: '광주광역시',},
        // {key:'4', value:'Computers', disabled:true},

    ]
    //배송지 불러오기 셀렉트박스

    useEffect(()=>{

        //뒤의 1000 숫자는 1초를 뜻함
        //1초 뒤에 실행되는 코드들이 담겨 있는 함수
        setTimeout(()=>{
            setReady(false)
        },1000)


    },[])

    const [id, onChangeText] = React.useState("");
    const [pw, onChangePW] = React.useState("");
    const [pwch, onChangePWch] = React.useState("");
    const [com_name, onChangecom_name] = React.useState("");
    const [addr1, onChangeaddr1] = React.useState("");
    const [addr2, onChangeaddr2] = React.useState("");




    return ready ? <Loading/> :  (
        <ScrollView >
            <View style={[styles.subPage,styles.signup]}>
                <View style={styles.container}>

                    <View style={styles.formGroup}>
                        <Text style={styles.inputTopText}>아이디</Text>
                        <View style={styles.flex}>
                            <View style={[styles.inputGroup,styles.flexitem1]}>
                                <TextInput style={[styles.input,styles.me_18]} onChangeText={onChangeText} placeholder="아이디를 입력해주세요" value={id}/>
                            </View>
                            <View style={[styles.flexitem2]}>
                                <TouchableOpacity style={styles.find_id_btn}  >
                                    <Text style={[styles.find_id_btn_txt]}>아이디 중복확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/*아이디 입력창/중복확인*/}
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>비밀번호</Text>
                            <TextInput style={styles.input} secureTextEntry={true} onChangeText={onChangePW}  placeholder="비밀번호를 입력해주세요." value={pw}/>
                        </View>
                    </View>
                    {/*비밀번호 입력창*/}
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>비밀번호 확인</Text>
                            <TextInput style={styles.input} secureTextEntry={true} onChangeText={onChangePWch}  placeholder="비밀번호를 입력해주세요." value={pwch}/>
                        </View>
                    </View>
                    {/*비밀번호확인 입력창*/}

                </View>

                <View style={styles.gary_bar}/>

                <View style={styles.container}>
                    <View style={styles.formGroup}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputTopText}>지역</Text>
                            <SelectList
                                setSelected={(val) => setSelected(val)}
                                data={data}
                                save="value"
                                defaultOption={{key: '1', value: '서울특별시'}}
                                boxStyles={{borderRadius: 0, borderColor: "#ededf1"}}
                                inputStyles={{fontSize: 12, color: "#696A81"}}
                                search={false}
                            />
                        </View>
                    </View>
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
                            <Text style={styles.inputTopText}>담당자명</Text>
                            <TextInput style={[styles.input]} onChangeText={onChangecom_name} placeholder=""   value={com_name}/>
                        </View>
                    </View>
                    {/*담당자명 입력창*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.inputTopText}>담당자 연락처</Text>
                        <View style={styles.flex}>
                            <View style={[styles.inputGroup,styles.flexitem2]}>
                                <TextInput style={[styles.input,styles.me_18]}   value=""/>
                            </View>
                            <View style={[styles.flexitem2]}>
                                <TextInput style={[styles.input,styles.me_18]}   value=""/>
                            </View>
                            <View style={[styles.flexitem2]}>
                                <TextInput style={[styles.input,styles.me_18]}  value=""/>
                            </View>
                        </View>

                    </View>
                    {/*사업장 주소 입력창*/}
                </View>

                <View style={styles.gary_bar}/>

                <View style={styles.container}>
                    <View style={styles.privacy_wrap}>
                        <View style={[styles.privacy_chek_all,flex]}>
                            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked}  color={"#4630eb"}  />
                            <Text style={styles.privacy_chek_all_txt} >전체 약관 동의</Text>
                        </View>
                        <View style={styles.privacy_list}>
                            <View style={[styles.privacy_list_item,styles.privacy_list_flex]}>
                                <View style={[styles.privacy_list_flex_item,flex]}>
                                    <Checkbox style={styles.checkbox} value={isChecked2} onValueChange={setChecked2}  color={"#4630eb"}  />
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
                                    <Checkbox style={styles.checkbox} value={isChecked3} onValueChange={setChecked3}  color={"#4630eb"}  />
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
                                    <Checkbox style={styles.checkbox} value={isChecked4} onValueChange={setChecked4}  color={"#4630eb"}  />
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
                                    <Checkbox style={styles.checkbox} value={isChecked5} onValueChange={setChecked5}  color={"#4630eb"}  />
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
                                    <Checkbox style={styles.checkbox} value={isChecked6} onValueChange={setChecked6}  color={"#4630eb"}  />
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
                <View style={styles.gary_bar}/>
                <View style={[styles.form_btn,styles.form_meminfo_btn]}>
                    <TouchableOpacity style={[styles.form_btn_link,styles.form_btn_meminfo_link]} >
                        <Text style={styles.form_btn_txt}>회원가입</Text>
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
    container:{
        padding:16,
        width:"100%",
    },
    gary_bar:{
      borderBottomWidth:8,
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
        marginTop:30,
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
});