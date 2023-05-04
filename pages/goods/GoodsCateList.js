import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
    View,
    Modal,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    Platform, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView
} from 'react-native';
import Checkbox from 'expo-checkbox';
import CartBag from "../../icons/cart_bag.svg";
import WishlistNon from "../../icons/ico_heart_nc.svg";
import Wishlist from "../../icons/ico_heart_c.svg";
import Chk from "../../icons/chk.svg";
import Modal_Close from '../../icons/close_black.svg';
import Footer from "../Footer";
import {
    align_items_center,
    bg_danger,
    bg_gray,
    bg_light,
    bg_primary, bg_success,
    bg_white, btn_black,
    btn_circle, btn_outline_primary, btn_primary,
    container, count_btn, count_btn_txt, countinput,
    d_flex, flex, flex_around, flex_between, flex_between_top,
    flex_top, h13,
    h18, h20,
    justify_content_center, justify_content_end, mb1, mb2, me1,
    min_height, ms1, mt1, mt3, mt5, pb2, pos_center,
    sub_page, text_center, text_danger,
    text_light, text_primary, text_right, wt2, wt3, wt4, wt5, wt6, wt7, wt8
} from "../../common/style/AtStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search from "../../icons/search.svg";
import {Price} from "../../util/util";
import {useIsFocused} from "@react-navigation/native";
import {
    get_cate_list,
    get_goods_cate2nd_list,
    get_goods_cate3rd_list, get_goods_info,
    get_goods_list,
    go_goods_cate3rd_list,
    goods_cate, ins_cart, save_wish
} from "./UTIL_goods";
import RenderHtml from "react-native-render-html";
import {get_Member, get_my_point_log} from "../UTIL_mem";
import {getCartList} from "../cart/UTIL_cart";
import Toast from 'react-native-easy-toast';
import Spinner from "../board/inquiry/spiner";



export default function GoodsCateList({route, navigation}) {
    const [Member, setMember] = useState();
    let {Cate1stUid, Cate2ndUid, name} = route.params; // 카테고리 uid

    console.log('회원 uid / ', Member);
    console.log('아이디값');

    // 1. ===============상태값 정의==================
    const [GoodsList, setGoodsList]             = useState([]);     // 자재리스트 설정
    const [Cate2List, setCate2List]             = useState([]);     // 2차 카테고리 담기
    const [Cate3rd, setCate3rd]                 = useState([]);     // 3차 카테고리 담기
    const [Cate2ndActive, setCate2ndActive]     = useState(``);     // 현재 페이지 상태
    const [Cate3rdActive, setCate3rdActive]     = useState(``);     // 현재 페이지 상태
    const [goods_detail, set_goods_detail]      = useState([]);     // 상세페이지 설정
    const [GoodsCnt, setGoodsCnt]               = useState(1);     // 상세페이지 설정
    const [cart_list, set_cart_list]            = useState([]);   // 장바구니 가져오기


    const [get_page, set_page]                  = useState();               // 전체페이지
    const [now_page, set_now_page]              = useState();               // 현재페이지


    const toastRef                                = useRef();
    const update                                  = useIsFocused();
    const scrollViewRef                           = useRef();
    const [scrollEndReached, setScrollEndReached] = useState(false);


    const handleScroll = async () => {
        setScrollEndReached(false);
        let next_page = Number(now_page + 1);
        if(Number(get_page) === 1 ) {
        } else if(Number(now_page) >= Number(get_page)) {
        } else {
            get_goods_list(Member, Cate1stUid, Cate2ndActive, Cate3rdActive, next_page).then((res)=>{
                if(res) {
                    const {result, A_goods, now_page, total_page} = res.data;
                    if(result === 'OK') {
                        setGoodsList([...GoodsList, ...A_goods]);
                        set_page(total_page);   // 전체페이지
                        set_now_page(next_page); // 현재페이지
                    } else {
                        return Alert.alert(``,`${result}`);
                    }
                }
            });
        }
    };

    // 우측 메뉴 설정
    const headerRight = () => {
        return (
            <>
                <View style={[flex, me1]}>
                    <TouchableOpacity style={styles.link_signUp} onPress={() => {navigation.navigate('검색')}}>
                        <Search width={30} height={21} style={[styles.icon]}/>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    // 2. ================최초 db 출력값 담기===================
    useEffect(() => {
        setCate2ndActive(Cate2ndUid); // 카테고리 값 설정
        navigation.setOptions({
            title: name,     // 상단 설정
            headerRight: headerRight,
        });

        get_cart_list(Member);

        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                return Alert.alert(``,`로그인 후 확인 가능합니다.`);
            }
        });

        // ==========================상품 불러오기 2023.01.02 수정 ========================== //
        get_goods_list(Member, Cate1stUid, Cate2ndUid, ``,``).then((res) => {
            if (res) {
                console.log(res.data,'/[ajax 자재리스트 연결 확인1]');
                const {result, A_goods, now_page, total_page} = res.data;
                if (result === 'OK') {
                    set_page(total_page);   // 전체페이지 추가
                    set_now_page(now_page); // 현재페이지
                    setGoodsList(A_goods);  // 자재목록 넣기
                } else {
                    return Alert.alert('','실패');
                }
            }
        });
        // 2차 카테고리 버튼 설정
        goods_cate(Cate1stUid).then((res) => {
            if (res) {
                const {result, A_cate_2nd} = res.data;
                if (result === 'OK') {
                    setCate2List(A_cate_2nd);
                } else {
                    Alert.alert('','실패');
                }
            }
        });
        // 3차 카테고리 버튼 설정
        get_cate_list(Cate1stUid, Cate2ndUid).then((res) => {
            if (res) {
                const {result, A_cate} = res.data;
                if (result === 'OK') {
                    setCate3rd(A_cate);
                } else {
                    Alert.alert('','실패');
                }
            }
        });
    }, [Member, update]);


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


    const goCate2nd = (Cate2ndUid) => {
        setCate2ndActive(Cate2ndUid);
        setCate3rdActive(``);
        console.log('2차 카테고리 uid', Cate2ndUid);
        // ==============2차 카테고리 상품 불러오기==============//
        get_goods_cate2nd_list(Cate1stUid, Cate2ndUid, Member, ``).then((res) => {
            if (res) {
                const {result, A_goods, now_page, total_page} = res.data;
                if (result === 'OK') {
                    console.log('확인');
                    set_now_page(now_page);
                    set_page(total_page);
                    setGoodsList(A_goods);
                    return
                } else {
                    return Alert.alert('','실패');
                }
            }
        });

        // ===================3차 카테고리 리스트를 출력=====================//
        // 3차 카테고리 버튼 설정
        get_goods_cate3rd_list(Cate1stUid, Cate2ndUid, Member).then((res) => {
            if (res) {
                const {result, A_cate} = res.data;
                if (result === 'OK') {
                    return setCate3rd(A_cate);
                } else {
                    return Alert.alert('','실패');
                }
            }
        });

    }

    // ==============3차 카테고리 상품 불러오기==============//
    const goCate3rd = (Cate3rdUid) => {
        setCate3rdActive(Cate3rdUid);
        console.log('3차 카테고리 uid', Cate3rdUid);
        go_goods_cate3rd_list(Cate1stUid, Cate2ndUid, Cate3rdUid, Member,``).then((res) => {
            if (res) {
                const {result, A_goods, now_page, total_page} = res.data;
                if (result === 'OK') {
                    console.log('확인');
                    set_now_page(now_page);
                    set_page(total_page);
                    setGoodsList(A_goods);
                    return
                } else {
                    return Alert.alert('','실패');
                }
            }
        });
    }

    // 4. ================상품체크시 상태변경=======================
    const goChk = (goods_uid) => {
        if(cart_list.includes(goods_uid)) {
            return Alert.alert(``,`장바구니에 있습니다.`);
        }
        let temp = GoodsList.map((val) => {
            if (goods_uid === val.goods_uid) {
                return {...val, goods_cart_chk: !val.goods_cart_chk,};
            }
            return val;
        });
        setGoodsList(temp);
    }

    // 5. 즐겨찾기 액션
    const goWish = (link_uid) => {
        save_wish(Member, link_uid).then((res) => {
            console.log(res.data);
            if (res) {
                const {result} = res.data;
                if (result === 'OK') {
                    console.log(result);
                    let temp = GoodsList.map((val) => {
                        if (link_uid === val.goods_uid) {
                            if (val.my_zzim_flag === 'Y') {
                                Alert.alert('', '즐겨찾기에서 삭제하였습니다.');
                                return {...val, my_zzim_flag: 'N',};
                            }
                            if (val.my_zzim_flag === 'N') {
                                Alert.alert('', '즐겨찾기에 추가하였습니다.');
                                return {...val, my_zzim_flag: 'Y',};
                            }
                        }
                        return val;
                    });
                    set_goods_detail({
                        ...goods_detail,
                        my_zzim_flag:(goods_detail.my_zzim_flag === 'Y') ? 'N':'Y',
                    });
                    setGoodsList(temp);
                }
            } else {
                console.log(result);
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    // 6. 장바구니 추가 이벤트
    const goCart = () => {
        /**-----1. 장바구니 클릭한 상품 배열을 만든다.--------------**/
        let goForm = GoodsList.filter((val) => val.goods_cart_chk);
        let goods_uid_list = "";

        /**-----1. 장바구니 클릭한 상품 배열을 만든다.--------------**/
        goForm.map(items => {
            if (goods_uid_list != "") {
                goods_uid_list += ",";
            }
            goods_uid_list += items.goods_uid;
        });
        ins_cart(Member, goods_uid_list).then((res) => {
            if (res) {
                const {result, order_uid} = res.data;
                console.log(result);
                if (result === 'OK') {
                    console.log(order_uid);
                    go_goods_cate3rd_list(Cate1stUid, Cate2ndActive, Cate3rdActive, Member).then((res)=>{
                        if(res) {
                            let {result, A_goods} = res.data;
                            if(result === 'OK') {
                                showCopyToast();
                                get_cart_list(Member);
                                setGoodsList(A_goods);
                            } else {
                                return Alert.alert(``,`에러`);
                            }
                        }
                    });
                } else {
                    console.log('실패');

                }
            }
        });
    }
    // 체크한 상품 버튼 생성
    let goForm = GoodsList.filter((val) => val.goods_cart_chk);
    const [modalVisible, setModalVisible] = useState(false);


    const goInput = (key, value, type) => {
        console.log(key,' / 키 ');
        console.log(value,' / 값 ');
        console.log(type,' / 타입 ');
        if(type === 'plus') {
            setGoodsCnt(GoodsCnt+1);
        } else if(type === 'minus') {
            setGoodsCnt((2 > GoodsCnt) ? 1 : GoodsCnt - 1);
        } else {
            setGoodsCnt((0 === value) ? 1 : Number(value));
        }
    }

    let goCartDetail = (type,uid) => {
        if(type === 'cart') {
            if(cart_list.includes(uid)) {return Alert.alert(``,`이미 장바구니에 추가된 자재입니다.`)}
            if(GoodsCnt === 0) {return Alert.alert('','수량을 입력해주세요');}
            Alert.alert('', '장바구니에 담으시겠습니까?', [
                    {text: '취소', onPress: () => {}, style: 'destructive'},
                    {text: '확인 ',
                        onPress: () => {
                            ins_cart(Member, uid, GoodsCnt).then((res)=>{
                                if(res) {
                                    const {result} = res.data;
                                    if(result === 'OK') {
                                        setGoodsCnt(1);
                                        return Alert.alert(``,`장바구니에 추가되었습니다.`);
                                    } else {

                                        return console.log('실패');
                                    }
                                }
                            })
                        },
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => {},
                },
            );
        }
        if(type === 'order') {
            navigation.replace('장바구니');
        }
    }


    // 상세페이지 노출
    const go_goods_detail = (goods_uid) => {
        console.log('이벤트');
        setModalVisible(!modalVisible); // 모달 노출
        // 1. 상세페이지 호출
        get_goods_info(Member, goods_uid).then((res)=>{
            if(res) {
                const {result, goods_info} = res.data;
                if(result === 'OK'){
                    return set_goods_detail(goods_info);
                } else {
                    return Alert.alert('','불러오기 실패');
                }
            }
        });
        console.log(goods_detail,' / 상품상세');
    }

    const source = {
        html: goods_detail.summary_contents
    };
// Toast 메세지 출력
    const showCopyToast = useCallback(() => {
        toastRef.current.show('장바구니에 추가되었습니다.');
    }, []);

    console.log(GoodsList.length,'/[자재목록 리스트]');
    console.log(get_page,'/[전체 페이지]');
    console.log(now_page,'/[현재 페이지]');
    // console.log(scrollEndReached,'/[스크롤 끝 확인]');



    /**-----------------------------------------------무한스크롤-------------------------------------------------------------------**/
    function goodsLlist({item}) {
        return(
            <>
                <View>
                    <View style={styles.cate_goods_list_item}>
                        <TouchableOpacity onPress={() => go_goods_detail(item.goods_uid)}>
                            <View style={[flex_top]}>
                                <View style={[styles.flex_item, styles.flex_item1]}>
                                    <View style={[styles.cate_list_Thumbnail_box]}>
                                        <Image style={styles.cate_list_Thumbnail} source={{uri: 'http://www.zazaero.com' + item.list_img_url}}/>
                                        <View style={styles.goods_like}>
                                            {/*=============찜하기=================*/}
                                            <TouchableOpacity onPress={() => goWish(item.goods_uid)}>
                                                {(item.my_zzim_flag === 'Y') ? (
                                                    <>
                                                        <Wishlist width={35} height={24} color={'blue'} zIndex={2000}/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <WishlistNon width={35} height={24} color={'blue'}/>
                                                    </>
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.flex_item, styles.flex_item2]}>
                                    <View style={[flex_between, align_items_center, pb2]}>
                                        <View style={[wt8]}>

                                            {/*========상품명========*/}
                                            <Text
                                                style={[styles.cate_2st_btn_txt, (item.goods_wish_chk) ? {color: "red"} : {color: "#000"}]}
                                                numberOfLines={2}>{item.goods_name}</Text>

                                        </View>
                                        {/**----------------------장바구니------------------------------**/}
                                        <View style={[wt2, d_flex, justify_content_end]}>
                                            {(cart_list.includes(item.goods_uid)) ? (
                                                <>
                                                    <View style={[btn_circle, bg_success]}>
                                                        <Checkbox style={styles.btn_cart} value={item.goods_cart_chk}
                                                                  onValueChange={() => {
                                                                      goChk(item.goods_uid);
                                                                  }}/>
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
                                                    {(item.goods_cart_chk) ? (
                                                        // 체크시에 노출
                                                        <View style={[btn_circle, bg_primary]}>
                                                            <Checkbox style={styles.btn_cart} value={item.goods_cart_chk}
                                                                      onValueChange={() => {
                                                                          goChk(item.goods_uid);
                                                                      }}/>
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
                                                        <View style={[btn_circle, bg_light]}>
                                                            <Checkbox style={styles.btn_cart} value={item.goods_cart_chk}
                                                                      onValueChange={() => {
                                                                          goChk(item.goods_uid)
                                                                      }}/>
                                                            <View style={{
                                                                flex: 1,
                                                                alignItems: "center",
                                                                justifyContent: "center"
                                                            }}>
                                                                <CartBag width={16} height={22} style={[styles.CartBagIcon]}></CartBag>
                                                            </View>
                                                        </View>
                                                    )}
                                                </>
                                            )}

                                        </View>
                                    </View>
                                    <View style={[]}>
                                        {/*-----------------------------가이드 안내-----------------------------*/}
                                        <View style={[]}>
                                            {/**자재안내**/}
                                            <Text style={[styles.cate_list_disc,text_primary]} numberOfLines={1}>
                                                {(item.goods_guide_name) ? item.goods_guide_name : ''}
                                            </Text>
                                            {/**반품가능여부**/}
                                            <Text style={[styles.cate_list_disc, text_danger]} numberOfLines={1}>
                                                {(item.disable_cancel === 'Y') && '결제 후 취소/반품 불가'}
                                            </Text>
                                        </View>
                                        <View style={[]}>
                                            <Text
                                                style={[styles.cate_list_price, text_right]}>{Price(item.price)}원</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>
                        {/**/}
                    </View>
                </View>
            </>
        );
    }

    return (
        /*
          return 구문 안에서는 {슬래시 + * 방식으로 주석
        */
        <>
            {/** ---------------------2차 카테고리--------------------- **/}
            <View style={bg_white}>
                <ScrollView style={styles.cate_1st_list} horizontal indicatorStyle={"black"}>
                    {Cate2List.map((val, idx) => (
                        <>
                            <TouchableOpacity key={idx} style={[styles.cate_1st_btn]} onPress={() => goCate2nd(val.ind_cfg_uid)}>
                                <Text style={[styles.cate_1st_btn_txt, (val.ind_cfg_uid === Cate2ndActive) && text_primary]}>
                                    {val.cfg_val1}
                                </Text>
                            </TouchableOpacity>
                        </>
                    ))}
                </ScrollView>
            </View>
            {/** ---------------------3차 카테고리--------------------- **/}
            <View style={[bg_white, styles.cate_2st_list]}>
                {Cate3rd &&
                    <>
                        <View style={[styles.cate_2st_btn,]}>
                            <TouchableOpacity style={[styles.cate_1st_btn]} onPress={() => goCate2nd(Cate2ndActive)}>
                                <Text style={[styles.cate_2st_btn_txt, (!Cate3rdActive) && text_primary]}>
                                    전체
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {Cate3rd.map((val, idx) => (
                            <>
                                <View style={[styles.cate_2st_btn,]} key={idx}>
                                    <TouchableOpacity style={[styles.cate_1st_btn]}
                                                      onPress={() => goCate3rd(val.ind_cfg_uid)}>
                                        <Text
                                            style={[styles.cate_2st_btn_txt, (val.ind_cfg_uid === Cate3rdActive) && text_primary]}>
                                            {val.cfg_val1}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ))}
                    </>
                }
            </View>

            <FlatList
                style={[bg_white]}
                data={GoodsList}
                renderItem={goodsLlist}
                keyExtractor={(item)=>item.id}
                onEndReachedThreshold={1}
                windowSize={3}
                onEndReached={()=>{
                    setScrollEndReached(true);
                    handleScroll();
                }}
            />

            {/**---------------------------자재목록------------------**/}
            <Toast ref={toastRef}
                   position='top'
                   positionValue={400}
                   fadeInDuration={200}
                   fadeOutDuration={1000}
                   style={[styles.toast]}
            />
            {/**-----------------------------------------------------모달-------------------------------------------------**/}
            <Modal visible={modalVisible} animationType="slide">

                <View style={[d_flex, flex_between,mb2,{paddingVertial:20, paddingTop:(Platform.OS === 'ios') ? 50:20,}]}>
                    <View style={{paddingLeft:20}}></View>
                    <View style={[]}>
                        <Text style={[h20]}>상품상세</Text>
                    </View>
                    <View style={{paddingRight:20}}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Modal_Close width={23} height={23}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={[bg_white ,{height:"50%"}]}>
                    <View style={[styles.GoodsDetail]}>
                        <View style={[container]}>
                            <View style={[styles.goods_iamge_box]}>
                                <Image style={styles.goods_image} source={{uri:`http://www.zazaero.com${goods_detail.list_img_url}`}}/>
                            </View>
                            {/*상품이미지*/}
                            <View style={[styles.GoodsDetail_info]}>
                                <Text Style={[styles.GoodsDetail_title]}>
                                    {goods_detail.goods_name}
                                </Text>
                                {/*상품명*/}
                                <View style={[flex,mt1]}>
                                    <View style={[styles.wt25]}>
                                        <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>판매가</Text>
                                    </View>
                                    <View style={[styles.wt75]}>
                                        <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                            {Price(goods_detail.price) } 원
                                        </Text>
                                    </View>
                                </View>
                                {(goods_detail.disable_cancel === 'Y') && (
                                    <View style={[flex]}>
                                        <View style={[styles.wt25]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>반품여부</Text>
                                        </View>
                                        <View style={[styles.wt75]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                {(goods_detail.disable_cancel === 'Y') ? '결제 후 반품/취소 불가능':' '}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                {/**판매가**/}
                                <View style={[flex,styles.border_b]}>
                                    <View style={[styles.wt25]}>
                                        <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>자재안내</Text>
                                    </View>
                                    {/**--자재안내--**/}
                                    <View style={[styles.wt75]}>
                                        <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                            {goods_detail.goods_guide_name}
                                        </Text>
                                    </View>
                                </View>

                                {/*자재안내*/}
                                <View style={[flex_between_top,mt3]}>
                                    <View style="">
                                        <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>수량</Text>
                                        <View style={[flex]}>
                                            {/*===============마이너스 수량==================*/}
                                            {/*=============마이너스 버튼==========*/}
                                            <TouchableWithoutFeedback onPress={()=>goInput(`goods_cnt`,GoodsCnt,`minus`)}>
                                                <View style={[count_btn]}>
                                                    <View style={[pos_center]}>
                                                        <Text
                                                            style={[count_btn_txt]}>－</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            {/*============수량=================*/}
                                            <TextInput style={[countinput,]}
                                                       onChangeText={(goods_cnt)=>goInput(`goods_cnt`,goods_cnt)}
                                                       defaultValue={`1`}
                                                       maxLength={3}
                                                       value={`${GoodsCnt}`}
                                                       keyboardType="number-pad"
                                            />
                                            {/*=============플러스 버튼============*/}
                                            <TouchableWithoutFeedback onPress={()=>goInput(`goods_cnt`,GoodsCnt,`plus`)}>
                                                <View style={[count_btn]}>
                                                    <View style={[pos_center]}>
                                                        <Text
                                                            style={[count_btn_txt]}>＋</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>


                                    </View>
                                    <View style="">
                                        <Text style={[styles.GoodsDetail_info_txt]}>총금액</Text>
                                        <Text style={[styles.GoodsDetail_total_price]}>
                                            {Price(goods_detail.price * GoodsCnt)}원
                                        </Text>
                                    </View>
                                </View>
                                {/*수량*/}

                                {/*상품정보*/}
                                <View style={[styles.GoodsDetail_more_image,mt5]}>
                                    <RenderHtml source={source} contentWidth={380} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={[styles.bottom_btn]}>
                    <View style={[flex]}>
                        <View style={[styles.wt1_5]}>
                            <TouchableOpacity style={[styles.md_wish]}  onPress={()=>goWish(goods_detail.goods_uid)}>
                                {(goods_detail.my_zzim_flag === 'Y') ? (
                                    <>
                                        <Wishlist width={35} height={24} />
                                    </>
                                ):(
                                    <>
                                        <WishlistNon width={35} height={24} />
                                    </>
                                )}
                                {/*<Wishlist width={35} height={24} />*/}
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.wt8_5]}>
                            <View style={[flex_around]}>
                                <TouchableOpacity style={styles.btn} onPress={()=>goCartDetail(`cart`,goods_detail.goods_uid)}>
                                    <Text style={[btn_primary,styles.center,styles.boottom_btn,styles.cart_btn]}>장바구니 담기</Text>
                                </TouchableOpacity>
                                {/*<TouchableOpacity style={styles.btn} onPress={() => goForm('order',GoodsDetail.goods_uid)}>*/}
                                <TouchableOpacity style={[styles.btn]} onPress={() => navigation.replace('장바구니')}>
                                    <Text style={[btn_black,styles.center,styles.boottom_btn,styles.cart_btn]}>장바구니 가기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

            </Modal>
            {/**-----------------------------------------------------모달-------------------------------------------------**/}

            {/**--------------------------------장바구니 영역----------------------------------------**/}
            {/*========상품체크시 노출=========*/}
            {(goForm.length > 0) ? (
                <>
                    <View style={[styles.go_cart, bg_primary, {paddingBottom: 36, paddingTop: 36,}]}>
                        <TouchableOpacity onPress={goCart}>
                            <View style={[d_flex, justify_content_center, align_items_center]}>
                                <View style={{width: 20, height: 20, borderRadius: 50, marginRight: 10, backgroundColor: "#fff"}}>
                                    <Text style={{textAlign: "center", color: "#333",}}>{goForm.length}</Text>
                                </View>
                                <Text style={[{textAlign: "center", color: "#FFF", fontSize: 18,}, text_light]}>
                                    장바구니 추가
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <></>
            )}
            {/**--------------------------------하단 영역-------------------------------------------**/}
            <Footer navigation={navigation}/>
        </>
    );



}



const styles = StyleSheet.create({
    toast:{
        backgroundColor:'rgba(33, 87, 243, 0.5)',
    },
    cart_btn:{
        paddingBottom:38,
        paddingTop:33,
    },
    GoodsCateList: {
        backgroundColor:"#fff",
    },
    cate_1st_btn: {
        padding: 12,
    },
    cate_1st_btn_txt: {
        fontSize: Platform.OS === 'ios' ? 16 : 15,
    },
    cate_2st_list: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderTopWidth: 2,
        borderColor: "#EDEDF1",
        borderBottomWidth: 8,
    },
    cate_goods_list_item: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    flex_item1: {
        width: "25%",
    },
    flex_item2: {
        width: "75%",
        paddingLeft: 10,
    },
    cate_list_Thumbnail_box: {
        paddingTop: "100%",
    },
    cate_list_Thumbnail: {
        paddingTop: "100%",
        position: "absolute",
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#eee",
    },
    goods_like: {
        position: "absolute",
        right: "1%",
        bottom: 1,
    },
    cate_2st_btn_txt: {
        fontSize: Platform.OS === 'ios' ? 14 : 13,
    },
    btn_cart: {
        width: 37,
        height: 37,
        opacity: 0,
        position: "absolute",
        zIndex: 10,
    },
    go_cart: {
        paddingBottom: (Platform.OS === 'ios') ? 42 : 38,
        paddingTop: 36,
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 50,
        // borderWidth:1,
        // borderColor:"red",
        textAlign: "center",
        width: "100%",
    },
    CartBagIcon:{
        borderWidth:1,
        borderColor:"#F9F9FB",
    },
    wish: {
        position: "absolute",
        left: 50,
        bottom: Platform.OS === 'ios' ? 120 : 100,
        zIndex: 50,
        width: "100%",
        transform: [{translateX: 40}],
    },
    wish_box: {
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 25,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        borderRadius: 50,
    },
    wish_box_txt: {
        color: "#fff",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cart: {
        position: "absolute",
        left: 50,
        bottom: Platform.OS === 'ios' ? 120 : 100,
        zIndex: 50,
        width: "100%",
        transform: [{translateX: 40}],
    },
    cart_box: {
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        borderRadius: 50,
    },
    cart_box_txt: {
        color: "#fff",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cate_2st_btn: {
        padding: 1,
        width: "33.3333%",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ddd",
    },
    flex_bottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cate_list_disc: {
        fontSize: Platform.OS === 'ios' ? 14 : 13,
    },
    cate_list_price: {
        fontSize: Platform.OS === 'ios' ? 18 : 17,
        fontWeight: "600",
        color: "#222",
    },
    goods_iamge_box:{
        borderWidth:1,
        borderColor:"#ccc",
        paddingTop:"100%",
    },
    goods_image:{
        paddingTop:"100%",
        position: "absolute",
        width: "100%",
        marginLeft:"auto",
        marginRight:"auto",
    },
    GoodsDetail_info:{
        paddingVertical:20,
    },
    GoodsDetail_title:{
        fontSize: Platform.OS === 'ios' ? 20 : 18,
        fontWeight:"500",
        color:"#333",
        lineHeight:28,
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
    border_b:{
        borderColor:"#ddd",
        borderBottomWidth:1,
    },
    GoodsDetail_total_price:{
        fontSize: Platform.OS === 'ios' ? 24 : 23,
        lineHeight:27,
        fontWeight:"500",
        color:"#3D40E0",
    },
    wt1_5:{
        width:"15%",
        paddingBottom:Platform.OS === 'ios' ? 30 : 0,
    },
    wt8_5:{
        width:"85%",
        paddingBottom:Platform.OS === 'ios' ? 30 : 0,
    },
    md_wish:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    btn:{
        width:"50%",
    },
    center:{
        fontSize:15,
        textAlign:"center",
        paddingVertical:20,
    },
    bottom_btn:{
        backgroundColor:"#eee",
    },
});