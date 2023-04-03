import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Button,
    TouchableWithoutFeedback,
    Switch,
    Alert, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { List } from 'react-native-paper';
import Checkbox from 'expo-checkbox';

// 공통 CSS 추가
import {
    container,
    bg_white,
    flex,
    flex_between,
    textarea,
    flex_top,
    align_items_center,
    pb2,
    wt8,
    wt2,
    d_flex,
    justify_content_end,
    btn_circle,
    bg_primary,
    bg_light,
    h13,
    text_primary,
    justify_content_center, text_light, ms1, padding_bottom, mt10, mt2, h15, text_center, h12, text_danger, bg_success
} from '../../common/style/AtStyle';
import Footer from "../Footer";

import {Price} from "../../util/util";
import Chk from "../../icons/chk.svg";
import CartBag from "../../icons/cart_bag.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WishIcon from "../../icons/ico_heart_c.svg";
import { useIsFocused } from '@react-navigation/native';
import {ins_cart} from "./UTIL_goods";
import Wish from "../../icons/ico_heart_nc.svg";
import {get_my_zzim_list_new, getCartList, set_my_zzim} from "../cart/UTIL_cart";
import {get_Member} from "../UTIL_mem";
import Toast from "react-native-easy-toast";

export default function Wishlist({route,navigation}) {

    const [Member, setMember] = useState();
    const Update = useIsFocused();
    // ==========1. 상태정의 리스트
    const [WishList, setWishList]       = useState([]);     // 즐겨찾기 상태정의
    const [cart_list, set_cart_list]            = useState([]);   // 장바구니 가져오기
    const [Cate1stUid, setCate1stuid]          = useState(``);   // 동일카테고리 락
    const toastRef = useRef();
    // A_goods_list_o 에서 goods_uid만 뽑아서 배열을 만든다.
    //A_goods_list_o

    // ===========2. 불러오기
    useEffect(()=>{
        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                Alert.alert(``,`실패`);
            }
        });
        // ==============2) 즐겨찾기 리스트 불러오기
        get_my_zzim_list_new(Member).then((res)=>{
            console.log(res.data,'/즐겨찾기 불러오기')
            if(res) {
                console.log(res.data,'/콘솔 확인');
                const {result, A_zzim} = res.data;
                if(result === 'OK') {
                    /**1. 장바구니 체크 배열 넣기**/
                    /* 즐겨찾기 체크        : goods_chk */
                    /* 즐겨찾기 리스트 삭제  : goods_wish */
                    let temp = A_zzim.map((cate)=>{
                        return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                            return {...val, goods_chk:false, goods_wish:true}
                            })}
                    })
                    setWishList(temp);
                } else {
                    console.log('실패');
                }
            }
        });
        get_cart_list(Member);

    },[Member]);


    const get_cart_list = async (Member)=>{
        let {data:{result, query, A_order}} = await getCartList(Member);
        if(result === 'OK') {
            let res = A_order.map(val=>val.A_goods_list.map(item=>String(item.goods_uid)));
            let temp = res.reduce((val,idx)=>{return val.concat(idx); })
            return set_cart_list(temp);
        } else {
            // Alert.alert(``,`${result}`);
        }
    }
    console.log(cart_list,'/장바구니 리스트 확인');

    /**---------------------즐겨찾기에 삭제----------------------------**/
    const delWish = (uid) => {
        // 즐겨찾기 상품리스트 가져오기
        set_my_zzim(uid, Member).then((res)=>{
            if(res) {
                const {result, my_zzim_flag} = res.data;
                if(result === 'OK') {
                    console.log('연결');
                }
                if(my_zzim_flag === 'N') {
                    Alert.alert('즐겨찾기에서 삭제하였습니다.');
                } else {
                    console.log('실패');
                }
            }
        });

        setWishList(WishList.map((cate)=>{
            return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                    if(val.goods_uid === uid) {
                        return {...val, goods_chk:false, goods_wish:false}
                    } else {
                        return val;
                    }
                })}
        }));
    }
    
    /**---------------------체크시 상태 변경----------------------------**/
    const goChk = (uid, cate_1st_uid) => {
        // A_goods_list_o의 goods_uid중에 중복되는 경우 alert를 띄우고 체크를 못하도록 한다.
        if(route.params) {
            const {get_gd_order, add_goods_list} = route.params;
            if(add_goods_list) {
                let A_order_list_o_uid = get_gd_order.A_order.map(val=>val.goods_uid);
                let chk_uid            = add_goods_list.map(val=>val.goods_uid);
                let result             = chk_uid.includes(uid);
                let result2            = A_order_list_o_uid.includes(uid);

                console.log(cate_1st_uid,'/ [카테uid]');
                console.log(get_gd_order.goods_cate1_uid);
                console.log(chk_uid,'/1');
                console.log(result2,'/2');
                if(cate_1st_uid !== get_gd_order.goods_cate1_uid) {
                    return Alert.alert(``,`동일공정 카테고리만 가능합니다.`);
                }
                if(result) {
                    return Alert.alert('','이미 추가하신 자재입니다.[2]');
                }
                if(result2) {
                    return Alert.alert('','이미 추가하신 자재입니다.[1]');
                }
            }
            setWishList(WishList.map((cate)=>{
                return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                        if(val.goods_uid === uid) {
                            return {...val, goods_chk:!val.goods_chk}
                        } else {
                            return val;
                        }
                    })}
            }));
        } else {

            if(cart_list.includes(uid)) {return Alert.alert(``,`이미 장바구니에 추가된 자재입니다.`);}

            setWishList(WishList.map((cate)=>{
                return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                        if(val.goods_uid === uid) {
                            return {...val, goods_chk:!val.goods_chk}
                        } else {
                            return val;
                        }
                    })}
            }));
        }
    }
    /**---------------------------------자재추가 이벤트----------------------------------------**/
    const AddGoods = () => {
        // 테이블 AT_order, gd_order, AT_order_item
        
        const {get_gd_order, add_goods_list} = route.params;
        console.log(get_gd_order.gd_order_uid,'/ 발주 uid');
        console.log(add_goods_list,'/ 기존 추가발주 자재');

        if(route.params) {
            /**------------------------------1. 체크한상품 필터링------------------------**/
            console.log(add_goods_list,' / 결제전 자재추가');
            let add_goods_list_o = (add_goods_list) ? add_goods_list : '';
            let temp            = WishList.map(cate=>cate.A_goods_list.filter(val=>val.goods_chk === true));
            let A_goods_list    = temp.reduce((val,idx)=>{return val.concat(idx)});
            let A_filter        = [...new Set([...A_goods_list, ...add_goods_list_o])];
            console.log(A_filter,'/[추가한 자재 리스트]');
            Alert.alert('','선택하신 자재를 추가하시겠습니까?',[
                {text:"취소",onPress:()=>{}},
                {text:"추가",onPress:()=>{
                        // return navigation.navigate('발주상세',{gd_order_uid:gd_order_uid, A_goods_list:A_filter})
                        let data = {
                            get_gd_order    :get_gd_order,
                            add_goods_list  :A_filter,
                        }
                        if(get_gd_order.ord_status === 'ord_ready' || get_gd_order.ord_status === 'pay_ready') {
                            return navigation.navigate('수정하기',data);
                        } else {
                            return navigation.navigate('추가발주',data);
                        }
                        
                    }
                }
            ]);
        }
    }


    /**---------------------------------클릭시 배송정보 입력창으로 이동----------------------------------------**/
    const goCart = () => {
        let result = WishList.map(val=>val.A_goods_list.filter(item=>item.goods_chk));
        let chk_goods = result.reduce((val,idx)=>{
            return val.concat(idx);
        });
        let goods_uid_list = "";
        chk_goods.map(items => {
            if (goods_uid_list !== "") {
                goods_uid_list += ",";
            }
            goods_uid_list += items.goods_uid;
        });
        ins_cart(Member, goods_uid_list).then((res) => {
            if (res) {
                const {result, order_uid} = res.data;
                console.log(result);
                if (result === 'OK') {
                    get_my_zzim_list_new(Member).then((res)=>{
                        if(res) {
                            console.log(res.data,'/콘솔 확인');
                            const {result, A_zzim} = res.data;
                            if(result === 'OK') {
                                /**1. 장바구니 체크 배열 넣기**/
                                /* 즐겨찾기 체크        : goods_chk */
                                /* 즐겨찾기 리스트 삭제  : goods_wish */
                                let temp = A_zzim.map((cate)=>{
                                    return {...cate, A_goods_list:cate.A_goods_list.map((val)=>{
                                            return {...val, goods_chk:false, goods_wish:true}
                                        })}
                                })
                                showCopyToast();
                                setWishList(temp);
                                get_cart_list(Member);
                                // return Alert.alert(``,`장바구니에 추가하였습니다.`);
                            } else {
                                console.log('실패');
                            }
                        }
                    });

                } else {
                    console.log('실패');

                }
            }
        });

    }
// Toast 메세지 출력
    const showCopyToast = useCallback(() => {
        toastRef.current.show('장바구니에 추가되었습니다.');
    }, []);
    let list      = WishList.map(cate=>cate.A_goods_list.filter(val=>val.goods_chk === true));
    let arr       = list.map(val=>val.length);
    let cont      = 0;
    for (let i = 0; i < arr.length; i++) {
        cont += arr[i];
    }


    let result = WishList.map(cate=> {
        return {...cate, A_goods_list:cate.A_goods_list.filter((val)=>val.goods_wish === true)}
    });
    
    /**------------------------------장바구니 선택 항목 필터링------------------------------**/

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.Wishlist]}>
                    {/*=================즐겨찾기 리스트 출력-================*/}
                    <List.Section style={[styles.Section, {padding: 0, margin: 0}]}>
                            {/**-------------------------1차 카테고리 항목 불러오기---------------------------**/}
                            {(result.length !== 0) ? (
                                <>
                                    {result.map((cate,idx)=> {
                                        let wish_cnt = cate.A_goods_list.filter(val=>val.goods_wish === true);
                                        if(wish_cnt.length > 0) {
                                            return(
                                                <>
                                                    <List.Accordion title={cate.cate_1st_name} style={[container, styles.Accordion_tit]}>
                                                        {cate.A_goods_list.map(val => {
                                                            if (val.goods_wish) {
                                                                return (
                                                                    <>
                                                                        <View key={idx} style={[styles.cate_goods_list]}>
                                                                            <View style={styles.cate_goods_list_item}>
                                                                                {/**/}
                                                                                <View style={[flex_top, {
                                                                                    paddingLeft: 15,
                                                                                    paddingRight: 15,
                                                                                }]}>
                                                                                    <View style={[styles.flex_item, styles.flex_item1]}>
                                                                                        <View style={[styles.cate_list_Thumbnail_box]}>
                                                                                            <Image style={styles.cate_list_Thumbnail} source={{uri: 'http://www.zazaero.com' + val.list_img}}/>
                                                                                            <View style={styles.goods_like}>
                                                                                                {/*=============찜하기=================*/}
                                                                                                <TouchableOpacity onPress={() => delWish(val.goods_uid)}>
                                                                                                    <WishIcon width={35} height={24} color={'blue'}/>
                                                                                                </TouchableOpacity>
                                                                                            </View>
                                                                                        </View>
                                                                                    </View>
                                                                                    <View
                                                                                        style={[styles.flex_item, styles.flex_item2]}>
                                                                                        <View
                                                                                            style={[flex_between, align_items_center, pb2]}>
                                                                                            <View style={[wt8]}>

                                                                                                {(route.params) ? (
                                                                                                    <>
                                                                                                        <TouchableOpacity style="" onPress={() => {navigation.navigate('상품상세', {uid: val.goods_uid, ord_status:route.params.gd_order_uid})}}>
                                                                                                            {/*========상품명========*/}
                                                                                                            <Text
                                                                                                                style={[styles.cate_2st_btn_txt, (val.goods_wish_chk_chk) ? {color: "red"} : {color: "#000"}]}
                                                                                                                numberOfLines={2}>{val.goods_name}</Text>
                                                                                                        </TouchableOpacity>
                                                                                                    </>
                                                                                                ):(
                                                                                                    <>
                                                                                                        <TouchableOpacity style="" onPress={() => {navigation.navigate('상품상세', {uid: val.goods_uid})}}>
                                                                                                            {/*========상품명========*/}
                                                                                                            <Text
                                                                                                                style={[styles.cate_2st_btn_txt, (val.goods_wish_chk_chk) ? {color: "red"} : {color: "#000"}]}
                                                                                                                numberOfLines={2}>{val.goods_name}</Text>
                                                                                                        </TouchableOpacity>
                                                                                                    </>
                                                                                                )}

                                                                                            </View>
                                                                                            <View style={[wt2, d_flex, justify_content_end]}>
                                                                                                {(route.params) ? (
                                                                                                    <>
                                                                                                        {(val.goods_chk) ? (
                                                                                                            // 체크시에 노출
                                                                                                            <View
                                                                                                                style={[btn_circle, bg_primary]}>
                                                                                                                <Checkbox
                                                                                                                    style={styles.btn_cart}
                                                                                                                    value={val.goods_chk}
                                                                                                                    onValueChange={() => {goChk(val.goods_uid,val.cate_1st_uid);}}/>
                                                                                                                <View style={{
                                                                                                                    flex: 1,
                                                                                                                    alignItems: "center",
                                                                                                                    justifyContent: "center"
                                                                                                                }}>
                                                                                                                    <Chk width={16} height={22}></Chk>
                                                                                                                </View>
                                                                                                            </View>
                                                                                                        ) : (
                                                                                                            // 체크가 없을시 노출
                                                                                                            <View
                                                                                                                style={[btn_circle, bg_light]}>
                                                                                                                <Checkbox
                                                                                                                    style={styles.btn_cart}
                                                                                                                    value={val.goods_chk}
                                                                                                                    onValueChange={() => {goChk(val.goods_uid,val.cate_1st_uid)}}
                                                                                                                />
                                                                                                                <View style={{
                                                                                                                    flex: 1,
                                                                                                                    alignItems: "center",
                                                                                                                    justifyContent: "center"
                                                                                                                }}>
                                                                                                                    <CartBag width={16}
                                                                                                                             height={22}></CartBag>
                                                                                                                </View>
                                                                                                            </View>
                                                                                                        )}
                                                                                                    </>
                                                                                                ):(
                                                                                                    <>
                                                                                                        {(cart_list.includes(val.goods_uid)) ? (
                                                                                                            <>
                                                                                                                <View
                                                                                                                    style={[btn_circle, bg_success]}>
                                                                                                                    <Checkbox
                                                                                                                        style={styles.btn_cart}
                                                                                                                        value={val.goods_chk}
                                                                                                                        onValueChange={() => {goChk(val.goods_uid,val.cate_1st_uid);}}/>
                                                                                                                    <View style={{
                                                                                                                        flex: 1,
                                                                                                                        alignItems: "center",
                                                                                                                        justifyContent: "center"
                                                                                                                    }}>
                                                                                                                        <Chk width={16} height={22}></Chk>
                                                                                                                    </View>
                                                                                                                </View>
                                                                                                            </>
                                                                                                        ):(
                                                                                                            <>
                                                                                                                {(val.goods_chk) ? (
                                                                                                                    // 체크시에 노출
                                                                                                                    <View
                                                                                                                        style={[btn_circle, bg_primary]}>
                                                                                                                        <Checkbox
                                                                                                                            style={styles.btn_cart}
                                                                                                                            value={val.goods_chk}
                                                                                                                            onValueChange={() => {goChk(val.goods_uid,val.cate_1st_uid);}}/>
                                                                                                                        <View style={{
                                                                                                                            flex: 1,
                                                                                                                            alignItems: "center",
                                                                                                                            justifyContent: "center"
                                                                                                                        }}>
                                                                                                                            <Chk width={16} height={22}></Chk>
                                                                                                                        </View>
                                                                                                                    </View>
                                                                                                                ) : (
                                                                                                                    // 체크가 없을시 노출
                                                                                                                    <View
                                                                                                                        style={[btn_circle, bg_light]}>
                                                                                                                        <Checkbox
                                                                                                                            style={styles.btn_cart}
                                                                                                                            value={val.goods_chk}
                                                                                                                            onValueChange={() => {goChk(val.goods_uid,val.cate_1st_uid)}}
                                                                                                                        />
                                                                                                                        <View style={{
                                                                                                                            flex: 1,
                                                                                                                            alignItems: "center",
                                                                                                                            justifyContent: "center"
                                                                                                                        }}>
                                                                                                                            <CartBag width={16}
                                                                                                                                     height={22}></CartBag>
                                                                                                                        </View>
                                                                                                                    </View>
                                                                                                                )}
                                                                                                            </>
                                                                                                        )}
                                                                                                    </>
                                                                                                )}
                                                                                            </View>
                                                                                        </View>
                                                                                        <View style={styles.flex_bottom}>
                                                                                            <View style="">
                                                                                                <Text
                                                                                                    style={[styles.cate_list_disc,h13]}>
                                                                                                    {(val.goods_guide_name) && val.goods_guide_name}
                                                                                                </Text>
                                                                                                {(val.disable_cancel === 'Y') && (
                                                                                                <Text style={[styles.cate_list_disc,h13, text_danger]}>
                                                                                                    결제 후 반품/취소 불가
                                                                                                </Text>
                                                                                                )}
                                                                                            </View>
                                                                                            <View style="">
                                                                                                <Text
                                                                                                    style={styles.cate_list_price}>{Price(val.price)}원</Text>
                                                                                            </View>
                                                                                        </View>
                                                                                    </View>
                                                                                </View>
                                                                                {/**/}
                                                                            </View>
                                                                        </View>
                                                                    </>
                                                                );
                                                            }
                                                        })}

                                                    </List.Accordion>
                                                </>
                                            );
                                        }


                                    })}
                                </>
                            ):(
                                <>
                                    <View style={[flex,justify_content_center]}>
                                        <View style={[mt10]}>
                                            <Wish width={200} height={223} style={[styles.CartIcon]}/>
                                            <Text style={[mt2,h15,text_center]}>
                                                즐겨찾기에 추가된 자재가 없습니다.
                                            </Text>
                                        </View>

                                    </View>
                                </>
                            )}

                    </List.Section>

                </View>
            </ScrollView>
            <Footer navigation={navigation}/>
            <Toast ref={toastRef}
                   fadeInDuration={200}
                   fadeOutDuration={1000}
                   style={[styles.toast]}
            />
            {/*========상품체크시 노출=========*/}

            {(route.params) ? (
                <>
                    <View style={[styles.go_cart, bg_primary, {paddingBottom: 36, paddingTop: 7,}]}>
                        <TouchableOpacity onPress={AddGoods}>
                            <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                                <Text style={text_light}>총 </Text>
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 50,
                                    marginRight: 10,
                                    backgroundColor: "#fff"
                                }}>
                                    <Text style={{textAlign: "center", color: "#333",}}>{cont}</Text>
                                </View>
                                <Text style={text_light}> 개</Text>
                            </View>
                            <Text style={[{textAlign: "center", color: "#FFF", fontSize: 18,}, text_light]}>
                                자재추가하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            ):(
                <>
                    {(cont > 0) ? (
                        <>
                            <View style={[styles.go_cart, bg_primary, {paddingBottom: 36, paddingTop: 36,}]}>
                                <TouchableOpacity onPress={goCart}>
                                    <View style={[d_flex, justify_content_center, align_items_center]}>
                                        <View style={{width: 20, height: 20, borderRadius: 50, marginRight: 10, backgroundColor: "#fff"}}>
                                            <Text style={{textAlign: "center", color: "#333",}}>{cont}</Text>
                                        </View>
                                        <Text style={[{textAlign: "center", color: "#FFF", fontSize: 18,}, text_light]}>
                                            장바구니 추가
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </>
            )}


        </>
    );
}


const styles = StyleSheet.create({
    toast:{
        backgroundColor:'rgba(33, 87, 243, 0.5)',
        position:"absolute",
        bottom:70,
    },
    Section:{
      marginBottom: Platform.OS === 'ios' ? 110 : 90,
    },
    go_cart: {
        paddingBottom: 36,
        paddingTop: 6,
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 50,
        textAlign: "center",
        width: "100%",
    },
    all_check:{
        borderRadius:5,
    },
    all_check_txt:{
        marginLeft:5,
    },
    Accordion_tit:{
        backgroundColor:"#f9f9fb",
        borderBottomWidth:1,
        borderColor:"#ededf1",
    },
    flex_item1:{
        width:"25%",
    },
    flex_item2:{
        width:"75%",
        paddingLeft:8,
    },
    cate_list_Thumbnail_box:{
        paddingTop:"100%",
    },
    cate_list_Thumbnail: {
        paddingTop:"100%",
        position: "absolute",
        width: "100%",
        borderRadius:10,
        borderWidth:1,
        borderColor:"#eee",
    },
    goods_like:{
        position:"absolute",
        right:"0%",
        bottom:"1%",
    },
    cate_2st_btn:{
        padding:6,
        width:"33.3333%",
        borderBottomWidth:1,
        borderRightWidth:1,
        borderColor:"#ddd",
    },
    cate_2st_btn_txt:{
        fontSize: Platform.OS === 'ios' ? 14 : 13,
    },
    cate_goods_list_item:{
        paddingVertical:26,
        borderBottomWidth:1,
        borderColor:"#ddd",
    },
    flex_bottom:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    cate_list_disc:{
        fontSize: Platform.OS === 'ios' ? 14 : 13,
    },
    cate_list_price:{
        fontSize: Platform.OS === 'ios' ? 18 : 17,
        fontWeight:"600",
        color:"#222",
    },
    btn_cart: {
        width: 37,
        height: 37,
        opacity: 0,
        position: "absolute",
        zIndex: 10,
    },

});