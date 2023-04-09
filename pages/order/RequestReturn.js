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
    Pressable, Alert, Platform, KeyboardAvoidingView
} from 'react-native';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';

// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    input,
    h14,
    ps1,
    wt7,
    wt3,
    mt1,
    mb1,
    mt2,
    ms1,
    pt4,
    pb4,
    flex,
    btn_primary,
    textarea,
    flex_top,
    bg_primary,
    d_flex,
    justify_content_center,
    align_items_center,
    text_light,
    text_dark,
    bg_gray,
    justify_content_between,
    pos_center,
    pe1,
    h25,
    justify_content_end,
    bg_light,
    text_center,
    h13,
    text_white,
    h18,
    fw500,
    me2,
    align_items_end,
    h16,
    text_right,
    pb2, ms2, mb2, text_gray, wt5, btn_outline_primary, wt10
} from '../../common/style/AtStyle';

import CameraIcon from '../../icons/camera_icon.svg';
import {get_Member} from "../UTIL_mem";
import {get_deli_addr_list, getOrderInfo, order_cancel} from "./UTIL_order";
import {app_info, get_order} from "./OrderInfo";
import Close from "../../icons/close_black.svg";
import {FormStyle} from "./FormStyle";
import {borderBottom1} from "../../common/style/SubStyle";
import {Phone, Price} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";



export default function RequestReturn({route, navigation}) {

    const {get_gd_order:{gd_order_uid},zonecode,addr1,addr2} = route.params;

    const [Member, setMember] = useState(``);                   // 회원 uid 가져오기
    const [get_gd_order, set_get_gd_order] = useState([]);      // 발주내역 가져오기
    const [modAddr, setmodAddr]           = useState(`add`); // 신규수거지, 기존 배송지 선택 상태 정의
    const [DeliList, setDeliList] = useState([]);
    const [ret_order, set_ret_order] = useState({
        zonecode    :'',
        addr1       :'',
        addr2       :'',
        return_mem_mobile:''
    });            // 반품신청 내역 작성
    const [Selected, setSelected] = useState({
        zonecode        :'',
        addr1           :'',
    });
    const [A_order_list, set_A_order_list] = useState([]);      // 발주자재 내역 리스트 가져오기
    const [cancel_doing, set_cancel_doing] = useState([]);      // 발주자재 내역 리스트 가져오기
    const [selectedImages, setSelectedImages] = useState([]);
    const MAX_IMAGES = 4;
    const Update    = useIsFocused();
    useEffect(()=>{
        /**------------------------회원정보 가져오기------------------------**/
        get_Member().then((res)=>{
            if(res) {
                setMember(res);
            } else {
                return Alert.alert(``,`에러`);
            }
        });
        /**------------------------발주내역 가져오기------------------------**/
        get_ready(Member, gd_order_uid);
        /**------------------------발주자재 내역 가져오기-----------------------**/
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        get_deli_addr_list(Member).then((res)=>{
            if (res) {
                console.log(res.data,'/[최근 공사명 리스트 출력]');
                const {result, A_deli_info} = res.data;
                if (result === 'OK') {
                    let temp = A_deli_info.sort((a,b)=>{
                        return new Date(b.gmd_sno) - new Date(a.gmd_sno);
                    });
                    setDeliList(temp);
                } else {
                    console.log('실패');
                }
            }
        });

    },[Member,Update]);
    const select_addr = (type) => {
        if(type === 'add') {
            setmodAddr(type);
        }
        if(type === 'mod') {
            setmodAddr(type);
        }
    }
    const get_ready = async (Member, gd_order_uid) => {
        /**은행코드 추출**/
        let {A_pay_bank} = await app_info();
        let temp = A_pay_bank.map(val=>{return {label:val.name, value:val.key,}});
        /**발주정보 추출**/
        let {gd_order, cancel_doing_cnt} = await get_order(Member, gd_order_uid);
        let temp2 = gd_order.A_order.map(val =>{return {...val, goods_chk: false, goods_del: false,}});
        navigation.setOptions({title:'반품신청'});
        set_get_gd_order(gd_order);
        set_A_order_list(temp2);
        set_cancel_doing(cancel_doing_cnt);
        if(route.params) {
            set_ret_order({
                ...ret_order,
                zonecode    :zonecode,
                addr1       :addr1,
                addr2       :addr2
            });
        } else {
            set_ret_order({
                ...ret_order,
                zonecode    :get_gd_order.zonecode,
                addr1       :get_gd_order.addr1,
                addr2       :get_gd_order.addr2
            });
        }
    }
    const order_Cancel = (cancel_type) => {
        if(cancel_type === 'all') {
            Alert.alert('','자재를 전부 반품하시겠습니까?',[
                {text:'반품', onPress:()=>{}},
                {text:'확인',
                    onPress:()=>{
                        // ================1. 결제반품 이벤트 실행====================
                        order_cancel(get_gd_order, cancel_type, A_order_list, Member, ret_order).then((res)=>{
                            if(res) {
                                const {result} = res.data;
                                if(result === 'OK') {
                                    Alert.alert('','반품접수가 완료 되었습니다.\n(환불은 관리자 확인 후 2~3일 소요됩니다.)',[
                                        {text:'확인',
                                            onPress:()=>{
                                                // ================2. 결제반품 이벤트 결과값 db에 전송====================
                                                return navigation.replace('배송상태');
                                            }
                                        }
                                    ]);
                                } else {
                                    return Alert.alert('',`${result}`);
                                }
                            }
                        })
                    }
                }
            ]);
        } else {
            Alert.alert('','입력하신 수량으로 반품하시겠습니까?',[
                {text:'취소', onPress:()=>{}},
                {text:'확인',
                    onPress:()=>{
                        // ================1. 결제반품 이벤트 실행====================
                        let cancel_cnt_chk = A_order_list.map(val=>Number(val.cancel_cnt));
                        let all_cancel_cnt = 0;
                        for(let i = 0; cancel_cnt_chk.length > i; i++) {all_cancel_cnt += cancel_cnt_chk[i];}
                        if(all_cancel_cnt === 0) {return Alert.alert('','반품수량을 입력해주세요.');}
                        order_cancel(get_gd_order, cancel_type, A_order_list, Member, ret_order).then((res)=>{
                            if(res) {
                                const {result} = res.data;
                                if(result === 'OK') {
                                    Alert.alert('','반품접수가 완료 되었습니다.\n(환불은 관리자 확인 후 2~3일 소요됩니다.)',[
                                        {text:'확인',
                                            onPress:()=>{
                                                // ================2. 결제반품 이벤트 결과값 db에 전송====================
                                                console.log(res.data,'/발주완료시 파라미터');
                                                return navigation.replace('발주상세',{gd_order_uid:get_gd_order.gd_order_uid});
                                            }
                                        }
                                    ]);
                                } else {
                                    return Alert.alert('',`${result}`);
                                }
                            }
                        })
                    }
                }
            ])
        }
    }
    const goInput = (name, value, goods_uid, order_uid) => {
        console.log(name,'/속성');
        console.log(value,'/값');
        console.log(goods_uid,'/자재 uid');
        console.log(order_uid,'/발주자재 uid');

        if(ret_order.zonecode === undefined) {
            set_ret_order({
                ...ret_order,
                zonecode    :get_gd_order.zonecode,
                addr1       :get_gd_order.addr1,
                addr2       :get_gd_order.addr2,
            });
        } else if(name === 'cancel_cnt') {
            let temp = A_order_list.map(val=>{
                if(val.order_uid === order_uid) {
                    let limited = Number(val.A_sel_option.map(item=>item.option_cnt));
                    console.log(limited,'/제한');
                    return {
                        ...val,
                        [name]:(value > limited) ? (limited):Number(value),
                    }
                } else {
                    return val;
                }
            });
            set_A_order_list(temp);
        } else {
            set_ret_order({
                ...ret_order,
                [name]:value,
            });
        }

    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            if (selectedImages.length < MAX_IMAGES) {
                setSelectedImages([...selectedImages, result]);
            } else {
                alert('4장이상 등록할수 없습니다!');
            }
        }
    };

    const removeImage = (index) => {
        const images = [...selectedImages];
        images.splice(index, 1);
        setSelectedImages(images);
    };
    console.log(Member,'/[회원uid]');
    console.log(get_gd_order,'/[발주내역]');
    console.log(ret_order,'/[반품신청]');
    console.log(A_order_list,'/[발주자재]');

    let disable_cancel = A_order_list.map(val=>val.disable_cancel);
    let disable_cancel_chk = (disable_cancel.includes('Y'));


    function OrderSearch() {
        const [Search, setSearch]     = useState(``);
        const [Show, setShow]         = useState(false);    // 검색창 노출 여부

        let find = DeliList.filter(text=>(text.gmd_title.includes(Search) && text));
        const goSearch = (gmd_zonecode, gmd_address, gmd_address_sub, work_name, work_uid) => {
            route.params.zonecode = gmd_zonecode;
            route.params.addr1 = gmd_address;
            setSelected({
                ...Selected,
                zonecode        :gmd_zonecode,
                addr1           :gmd_address,
                order_title     :work_name,
                work_uid        :work_uid,
            });

            set_ret_order({
                ...ret_order,
                zonecode        :gmd_zonecode,
                addr1           :gmd_address,
                addr2           :gmd_address_sub,
            });

        }

        console.log(Selected);
        console.log(find);
        return(
            <>
                <Text style={[mb1]}>기존 공사명 검색</Text>
                <View style={[styles.ord_tit_list_search,mb2]}>
                    <View style={[styles.select_box]}>
                        <TouchableOpacity onPress={()=>{setShow(!Show)}}>
                            <View style={[styles.border]}>
                                {/**---------------------------선택주소 노출--------------------------------**/}
                                <Text style={[]}>
                                    {(Selected.order_title) ? Selected.order_title:'최근 공사명을 선택해주세요.'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.select_icon_box]}>
                            <Text style={[styles.select_icon]}>▼</Text>
                        </View>
                    </View>
                    {/**---------------------------클릭시 노출--------------------------------**/}
                    {(Show) && (
                        <View style={[styles.ord_tit_list_box]}>
                            <TextInput style={[input,{flex:1,marginRight:16},mb1]} placeholder="공사명 입력"
                                       onChangeText={(word)=>setSearch(word)}
                                       editable={(modAddr === 'mod')}
                                       value={Search}
                            />
                            <ScrollView style={[{height:160}]} nestedScrollEnabled={true}>
                                <View style={[styles.ord_tit_list]}>
                                    {/**---------------------------반복문 구간--------------------------------**/}
                                    {find.map((val,idx)=> {
                                        return (
                                            <>
                                                <View style={[styles.Recent_search_list_item]} key={idx}>
                                                    <View style={flex_between}>
                                                        <View>
                                                            <TouchableOpacity onPress={() => goSearch(val.gmd_zonecode, val.gmd_address, val.gmd_address_sub, val.work_name, val.work_uid)}>
                                                                <Text style={[h14, styles.txt_color2]}>
                                                                    {val.work_name}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                            <View style={[flex, justify_content_end]}>
                                                                <Text style={[h14, text_gray]}>
                                                                    {val.gmd_moddate}
                                                                </Text>
                                                                <TouchableOpacity style={ms2} onPress={() => delDeli(val.gmd_sno)}>
                                                                    <Text style={[h14, styles.txt_color]}>X</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    )}
                </View>
            </>
        );
    }

    /**------------------------------신규배송지, 기존배송지 선택-------------------------------**/
    function OrderAddress() {
        return (
            <>
                <View style={[flex,pb2]}>
                    {/**----------------------------------------------신규공사--------------------------------------------------**/}
                    <TouchableOpacity onPress={()=>select_addr('add')}>
                        <View style={[flex]}>
                            <View style={[styles.border_Circle]}>
                                {(modAddr === 'add') &&
                                    <View style={[pos_center]}>
                                        <View style={[styles.border_Circle_active]}/>
                                    </View>
                                }
                            </View>
                            <Text style={[styles.Chk, {paddingLeft: 5}]}>신규수거배송지</Text>
                        </View>
                    </TouchableOpacity>
                    {/**----------------------------------------------기존 공사--------------------------------------------------**/}
                    <TouchableOpacity onPress={()=>select_addr('mod')}>
                        <View style={[flex,ms2]}>
                            <View style={[styles.border_Circle]}>
                                {(modAddr === 'mod') &&
                                    <View style={[pos_center]}>
                                        <View style={[styles.border_Circle_active]}/>
                                    </View>
                                }
                            </View>
                            <Text style={[styles.Chk, {paddingLeft: 5}]}>기존배송지</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.RequestReturn]}>
                    <View style={[FormStyle.FormGroup]}>
                        {/*<View style={[FormStyle.FormGroupItems]}>*/}
                        {/*    <OrderAddress/>*/}
                        {/*</View>*/}
                        {/*<View>*/}
                        {/*    <OrderSearch/>*/}
                        {/*</View>*/}
                        {/*==============배송지 가져오기==============*/}
                        <View  style={[styles.FormGroup]} >
                            <View  style={[flex]} >
                                <Text style={[]}>수거배송지</Text>
                            </View>
                            <View  style={[d_flex,mt1]} >
                                <View  style={{flex:0.7,marginRight:10}} >
                                    <TextInput
                                        value={(zonecode) ? (zonecode):(ret_order.zonecode)}
                                        defaultValue={`${get_gd_order.zonecode}`}
                                        editable={false}
                                        onChangeText={(zonecode)=>goInput(`zonecode`,zonecode)} placeholder="우편번호" style={[input,bg_light]}/>
                                </View>
                                <TouchableOpacity style={{flex:0.3}} onPress={()=>{navigation.navigate(`주소검색`,{page:'반품요청',get_gd_order:get_gd_order})}}>
                                    <View style={[bg_primary, {padding:8,borderRadius:5}]}>
                                        <Text style={[text_light,text_center,]}>주소찾기</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View  style={[mt1]} >
                                <TextInput
                                    value={(addr1) ? (addr1):(ret_order.addr1)}
                                    defaultValue={`${get_gd_order.addr1}`}
                                    editable={false}
                                    onChangeText={(addr1)=>goInput(`addr1`,addr1)} placeholder="주소" style={[input,bg_light]}/>
                            </View>
                            <View  style={[mt1]} >
                                <TextInput
                                    value={(addr2) ? (addr2):(ret_order.addr2)}
                                    defaultValue={`${get_gd_order.addr2}`}
                                    onChangeText={(addr2)=>goInput(`addr2`,addr2)} placeholder="상세주소" style={[input]}/>
                            </View>
                        </View>
                        {/*============================*/}
                        <View  style={[styles.FormGroup,mt2]} >
                            <View  style={[flex]} >
                                <Text style={[]}>반품 담당자 성명</Text>
                            </View>
                            <View  style={[mt1]} >
                                <TextInput onChangeText={(return_mem_name)=>goInput(`return_mem_name`,return_mem_name)}
                                           placeholder="이름을 입력해주세요."
                                           style={[input,]}/>
                            </View>
                            <View  style={[flex,mt2]} >
                                <Text style={[]}>반품 담당자 연락처</Text>
                            </View>
                            <View  style={[mt1]} >
                                <TextInput onChangeText={(return_mem_mobile)=>goInput(`return_mem_mobile`,Phone(return_mem_mobile))}
                                           placeholder="연락처를 입력해주세요."
                                           keyboardType="numeric"
                                           value={`${ret_order.return_mem_mobile}`}
                                           maxLength={13}
                                           style={[input,]}/>
                            </View>
                            <View  style={[flex,mt2]} >
                                <Text style={[mb1]}>반품 사유 및 수거 요청 사항</Text>
                            </View>
                            <View  style={[]} >
                                <TextInput onChangeText={(return_req_memo)=>goInput(`return_req_memo`,return_req_memo)} style={[textarea]}/>
                            </View>
                        </View>
                        <View  style={[flex,mt2]} >
                            <Text style={[]}>반품 자재 사진 등록</Text>
                        </View>
                        <View  style={[]} >
                            <TouchableOpacity onPress={pickImage} style={[styles.button,bg_primary]}>
                                <Text style={[h13,text_center,text_white]}>사진 선택하기</Text>
                            </TouchableOpacity>
                            {(selectedImages.length > 0) ? (
                                <>
                                    <View style={[styles.imagesContainer,{borderWidth:1,borderColor:'#000'}]}>
                                        {selectedImages.map((image, index) => (
                                            <View key={index} style={styles.imageContainer}>
                                                <TouchableOpacity onPress={() => removeImage(index)} style={styles.deleteButton}>
                                                    <Close width={11} height={11}/>
                                                </TouchableOpacity>
                                                <Image source={{ uri: `data:image/jpg;base64,${image.base64}` }} style={styles.image}  resizeMode="contain"/>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            ):(
                                <>
                                    {/* 값이없을때*/}
                                </>
                            )}

                        </View>
                        {/*==============반품사진 등록==============*/}
                    </View>
                    {/*=======================================*/}
                    <View  style={[container]} >
                        <View  style={[flex]} >
                            <Text style={[h18,fw500]}>반품요청 자재목록</Text>
                        </View>
                    </View>
                    <View  style={[borderBottom1]} />
                    {/**-----------------반복문 구간---------------------------------------**/}
                    {A_order_list.map((val,idx)=>{
                        if(val.disable_cancel === 'N') {
                            return(
                                <>
                                    <View key={idx} style={[styles.CancelDetail_list_items,]} >
                                        <View style={[container]}>
                                            <View style={[d_flex, align_items_center, mb1,flex_between]}>
                                                {/*체크박스*/}
                                                <View style={{flex:1}}>
                                                    {/*상품명*/}
                                                    <Text style={[h14]}>{val.goods_name}</Text>
                                                </View>
                                            </View>

                                            <View style={[d_flex, align_items_center, mb1]}>
                                                <View style={[me2]}>
                                                    <Image style={[styles.goods_thum]} source={{uri: `http://www.zazaero.com${val.list_img_url}`}}/>
                                                </View>
                                                <View style={[wt7,flex_between,align_items_end]}>
                                                    {(val.A_sel_option.map((item,idx)=>(
                                                        <>
                                                            <View style={ms1} key={idx}>
                                                                <View style={[d_flex]}>
                                                                    <Text style={[h14,fw500,{paddingBottom:10,}]}>
                                                                        기존수량 : {item.option_cnt}개
                                                                    </Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={[h14,fw500,{paddingBottom:5,}]}>
                                                                        반품수량
                                                                    </Text>
                                                                    <TextInput
                                                                        style={[input]}
                                                                        onChangeText={(cancel_cnt)=>goInput(`cancel_cnt`,cancel_cnt,``,val.order_uid)}
                                                                        defaultValue={`0`}
                                                                        value={`${val.cancel_cnt}`}
                                                                        placeholder="반품수량"
                                                                        maxLength={3}
                                                                        keyboardType="numeric"
                                                                    />
                                                                </View>
                                                            </View>
                                                            <View style={[justify_content_end]}>
                                                                <Text style={[h13]}>( 단가 : {Price(item.option_price)} 원)</Text>
                                                                {/*단가*/}
                                                                <Text style={[h16,text_right]}>{Price(item.option_price)} 원</Text>
                                                                {/*총금액*/}
                                                            </View>
                                                        </>
                                                    )))}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </>
                            );
                        }
                    })}
                </View>

            </ScrollView>
            {(disable_cancel_chk) ? (
                <>
                    <KeyboardAvoidingView behavior={Platform.select({ios:"padding"})}>
                        {/* 저장버튼 */}
                        <View style={[flex_between, bg_white]}>
                            <View style={[wt10,ps1,pe1]}>
                                <TouchableOpacity style={[btn_outline_primary,{borderRadius:5,paddingTop:7, paddingBottom:7,}]}
                                                  onPress={()=>order_Cancel(`part`)}
                                >
                                    <Text style={[text_center,h18]}>반품신청</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </>
            ):(
                <>
                    <KeyboardAvoidingView behavior={Platform.select({ios:"padding"})}>
                        {/* 저장버튼 */}
                        <View style={[flex_between, bg_white]}>
                            <View style={[wt5,ps1,pe1]}>
                                <TouchableOpacity style={[btn_outline_primary,{borderRadius:5,paddingTop:7, paddingBottom:7,}]}
                                                  onPress={()=>order_Cancel(`part`)}
                                >
                                    <Text style={[text_center,h18]}>반품신청</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[wt5,ps1,pe1]}>
                                <TouchableOpacity style={[btn_primary,{borderRadius:5,paddingTop:7,paddingBottom:7}]}
                                                  onPress={()=>order_Cancel(`all`)}
                                >
                                    <Text style={[text_white,text_center,h18]}>전체반품</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </>
            )}

        </>
    );
}

const styles = StyleSheet.create({

    btn_default:{
        paddingTop      : 7,
        paddingBottom   : 38,
        width           : "100%",
        position        : "relative",
        left            : 0,
        bottom          : 0,
        zIndex          : 99,
        backgroundColor :"#B1B2C3",
    },

    AllGoodsChk:{
        position:"absolute",
        borderWidth:1,
        zIndex:99,
        width:"100%",
        height:"100%",
        opacity:0
    },
    CancelBtnWrap:{
        borderWidth:1,
        borderColor:"#333",
        width:"48%",
        borderRadius:5,
    },
    CancelBtn:{
        padding:10,
    },


    all_check:{
        borderRadius:5,
    },

    all_check_txt:{
        marginLeft:5,
    },

    chk_view:{
        position:"absolute",
        opacity:0,
        zIndex: 99,
        width:"100%",
    },

    PopupViewbtn:{
        width:"48%",
        padding:10,
    },

    Popupbtn:{
        justifyContent:"space-between"
    },

    PopupViewbg:{
        backgroundColor:"rgba(0, 0, 0, 0.5)",
        width:"100%",
        height:"100%",
        left:0,
        top:0,
        zIndex:200,
        position:"absolute",
    },

    PopupView :{
        position:"absolute",
        zIndex:99,
        backgroundColor:"#fff",
        padding:15,
        width:"90%",
        left:"5%",
        top:"30%",
    },

    payMement:{
        width:"100%",
    },

    payView:{
        padding:15,
        paddingBottom:30,
    },

    btn_fix:{
        flex:1,
    },

    goods_thum:{
        width:75,
        height:75,
    },

    border:{
        borderWidth:1,
        borderColor:"#EDEDF1",
        paddingVertical:12,
        paddingHorizontal:12,
        borderRadius:5,
    },
    ord_tit_list_box:{
        paddingHorizontal:10,
        paddingVertical:12,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
    },
    Recent_search_list_item:{
        paddingVertical:5,
    },
    formSelect : {
        borderWidth: 1,
        borderColor:"#e6e6e6",
        padding:10,
    },
    btn:{
        paddingVertical:10,
        paddingHorizontal:60,
        borderRadius:10,
    },
    modalStyle:{
        color:"#333",
        // backgroundColor:"rgba(255,255,255,0.5)",
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
    CancelDetail_list_items:{
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
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
    cart_goods_img:{
        borderRadius:5,
        width:90,
        height:80,
    },
    wt25: {
        width: "25%",
        backgroundColor:"#f8f8f8",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderRightWidth:0,
        borderBottomWidth:0,
    },
    wt75: {
        width: "75%",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderLeftWidth:0,
        borderBottomWidth:0,
    },
    wt30: {
        width: "30%",
        backgroundColor:"#f8f8f8",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderRightWidth:0,
        borderBottomWidth:0,
    },
    wt70: {
        width: "70%",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderLeftWidth:0,
        borderBottomWidth:0,
    },
    GoodsDetail_info_txt:{
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        color:"#333",
        lineHeight:24,
        textAlign:"right",
    },
    GoodsDetail_info_txt_val:{
        fontSize: Platform.OS === 'ios' ? 15 : 14,
        lineHeight:24,
        fontWeight:"500",
        textAlign:"right",
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
    // imagesContainer: {
    //     flexDirection: 'row',
    //     flexWrap: 'wrap',
    //     marginTop: 20,
    //     justifyContent:"center",
    // },
    image: {
        width: 160,
        height: 220,
        margin: 5,
        borderWidth:1,
        borderColor:"#ccc",
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        justifyContent:"center",
    },
    imageContainer: {
        position: 'relative',
        width: 160,
        height: 220,
        marginRight: 10,
        marginBottom: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: -5,
        zIndex: 1,
        backgroundColor:'red',
        borderRadius:100,
        padding:7,
    },

});

