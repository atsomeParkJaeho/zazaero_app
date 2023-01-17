import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    input,
    flex,
    flex_end,
    d_none,
    h14,
    h16,
    mt3,
    mt2,
    ms2,
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
    justify_content_center, text_light, sub_page, min_height, text_primary
} from '../../common/style/AtStyle';



import BackArrow from '../../icons/back_arrow.svg';
import Search from '../../icons/search.svg';
import search_none from "../../assets/img/search_none.png";
import col2 from "../../assets/img/co2.png";
import col3 from "../../assets/img/co3.png";
import goods_image from "../../assets/img/goods_image.jpg";
import goods_img_1 from "../../assets/img/goods_img_1.png";
import goods_like from "../../assets/img/ico_heart.png";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import Wishlist from "../../icons/ico_heart_c.svg";
import WishlistNon from "../../icons/ico_heart_nc.svg";
import Checkbox from "expo-checkbox";
import Chk from "../../icons/chk.svg";
import CartBag from "../../icons/cart_bag.svg";
import {Price} from "../../util/util";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function GoodsSearchList({route,navigation}) {

    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    })
    const {search} = route.params;

    // 1. 상태정의
    const [GoodsList, setGoodsList] = useState([]);


    // 2. 검색상품 출력
    useEffect(()=>{
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
            act_type        : "get_goods_list",
            f_goods_name    :search,
        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_goods} = res.data;
                if (result === 'OK') {
                    setGoodsList(A_goods);
                } else {
                    console.log('실패');
                }
            }
        });
    },[]);


    // 1. 상태정의
    const [GoodsSearch, setGoodsSearch] = useState({    // 검색어 확인
        search:'',
    });

    const [SearchLog, setSearchLog] = useState([]);     // 최근검색어



    // 입력하기

    const ChkInput = (key, value) => {
        setGoodsSearch({
            ...GoodsSearch,
            [key]:value
        });
    }


    // 4. ================상품체크시 상태변경=======================
    const goChk = (uid) => {
        let temp = GoodsList.map((val) => {
            if (uid === val.goods_uid) {
                return {...val, goods_cart_chk: !val.goods_cart_chk,};
            }
            return val;
        });
        setGoodsList(temp);
    }

    // 5. 즐겨찾기 액션
    const goWish = (uid) => {
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php',{
            act_type        :"set_my_zzim",
            login_status    :"Y",
            mem_uid         :Member,
            link_uid        :uid,
        },{
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res)=>{
            console.log(res.data);
            if(res) {
                const {result} = res.data;
                if(result === 'OK') {
                    console.log(result);
                    alert('즐겨찾기에 추가 하였습니다.');
                }
            } else {
                const {result} = res.data;
                console.log(result);
            }
        }).catch((error)=>{console.log(error)});

        // 내 즐겨찾기에 등록된 상품 필터링하기
        let temp = GoodsList.map((val) => {
            if (uid === val.goods_uid) {
                return {...val, goods_wish_chk: !val.goods_wish_chk,};
            }
            return val;
        });
        setGoodsList(temp);

    }


    // 6. 장바구니 추가 이벤트
    const goCart = () => {
        let goForm = GoodsList.filter((val) => val.goods_cart_chk);
        // 반복문
        goForm.map(items=>(
            axios.post('http://49.50.162.86:80/ajax/UTIL_cart.php',{
                act_type            : 'save_cart',
                goods_uid           : items.goods_uid,           // 상품 uid
                mem_uid             : Member,                    // 회원 uid
                ord_cnt             :  '1'
            },{
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }).then((res)=>{
                if(res) {
                    const {result, order_uid} = res.data;
                    console.log(result);
                    if(result === 'OK') {
                        console.log(order_uid);
                    } else {
                        console.log('실패');
                        return;
                    }
                } else {

                }
            })
        ));

        alert('장바구니에 추가하였습니다. ');
        navigation.navigate('장바구니');

    }

    // 2. 검색상품 불러오기
    const goSearch = (search) => {
        console.log(search);
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
            act_type        : "get_goods_list",
            f_goods_name    :search,
        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_goods, que} = res.data;
                console.log(que);
                if (result === 'OK') {
                    if(A_goods.length === 0) {
                        Alert.alert('','검색하신 상품이 없습니다');
                    } else {
                        setGoodsList(A_goods);
                    }
                } else {
                    console.log('실패');
                }
            }
        });
    }


    // 체크한 상품 버튼 생성
    let goForm = GoodsList.filter((val) => val.goods_cart_chk);



    console.log(GoodsList);

    return (
        <>
            <ScrollView style={[styles.GoodsCateList, sub_page, min_height]}>
                <View style={[flex,styles.flex_center,{paddingLeft:15,}]}>
                    <View style={[styles.search_input]}>
                        <TextInput style={[input,styles.input_wt]}
                                   onSubmitEditing={()=>goSearch(GoodsSearch.search)}
                                   returnKeyType="done"
                                   onChangeText={(search)=>ChkInput("search",search)}
                                   value={GoodsSearch.search}
                                   placeholder="검색어를 입력하세요."
                        />

                    </View>
                    <View style={[styles.search_icon]}>
                        <TouchableOpacity style="" onPress={()=>goSearch(GoodsSearch.search)}>
                            <Search width={30} height={21} style={[styles.center]} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/*========================자재목록 출력(반복문)====================*/}
                {GoodsList.map((val, idx) => (
                    <View style={styles.cate_goods_list} key={idx}>
                        <View style={styles.cate_goods_list_item}>
                            {/**/}
                            <View style={[flex_top]}>
                                <View style={[styles.flex_item, styles.flex_item1]}>
                                    <View style={[styles.cate_list_Thumbnail_box]}>
                                        <Image style={styles.cate_list_Thumbnail} source={{uri:'http://www.zazaero.com'+val.list_img_url}}/>
                                        <View style={styles.goods_like}>
                                            {/*=============찜하기=================*/}
                                            <TouchableOpacity onPress={()=>goWish(val.goods_uid)}>
                                                {/*<Text>찜하기</Text>*/}
                                                {(val.goods_wish_chk) ? (
                                                    <>
                                                        <Wishlist width={35} height={24} color={'blue'}  />
                                                    </>
                                                ) :(
                                                    <WishlistNon width={35} height={24} color={'blue'}  />

                                                )}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.flex_item,styles.flex_item2]}>
                                    <View style={[flex_between,align_items_center,pb2]}>
                                        <View style={[wt8]}>
                                            <TouchableOpacity style="" onPress={() => {navigation.navigate('상품상세',{uid:val.goods_uid})}}>
                                                {/*========상품명========*/}
                                                <Text style={[styles.cate_2st_btn_txt,(val.goods_wish_chk) ? {color:"red"}:{color:"#000"}]} numberOfLines={1}>{val.goods_name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[wt2,d_flex,justify_content_end]}>
                                            {(val.goods_cart_chk) ? (
                                                // 체크시에 노출
                                                <View style={[btn_circle, bg_primary]}>
                                                    <Checkbox style={styles.btn_cart} value={val.goods_cart_chk}
                                                              onValueChange={() => {
                                                                  goChk(val.goods_uid);
                                                              }}/>
                                                    <View style={{flex: 1,alignItems: "center",justifyContent: "center"}}>
                                                        <Chk width={16} height={22}></Chk>
                                                    </View>
                                                </View>
                                            ) : (
                                                // 체크가 없을시 노출
                                                <View style={[btn_circle, bg_light]}>
                                                    <Checkbox style={styles.btn_cart} value={val.goods_cart_chk}
                                                              onValueChange={() => {
                                                                  goChk(val.goods_uid)
                                                              }}/>
                                                    <View style={{flex: 1,alignItems: "center",justifyContent: "center"}}>
                                                        <CartBag width={16} height={22}></CartBag>
                                                    </View>
                                                </View>
                                            )}

                                        </View>
                                    </View>
                                    <View style={styles.flex_bottom}>
                                        <View style="">
                                            <Text style={styles.cate_list_disc}>
                                                {val.goods_guide_name}
                                            </Text>
                                        </View>
                                        <View style="">
                                            <Text style={styles.cate_list_price}>{Price(val.price)}원</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/**/}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/*========상품체크시 노출=========*/}
            {(goForm.length > 0) ? (
                <>
                    <View style={[styles.go_cart, bg_primary, {paddingBottom: 36, paddingTop: 7,}]}>
                        <TouchableOpacity onPress={goCart} >
                            <View style={[d_flex, justify_content_center, align_items_center, {paddingBottom: 10,}]}>
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 50,
                                    marginRight: 10,
                                    backgroundColor: "#fff"
                                }}>
                                    <Text style={{textAlign: "center", color: "#333",}}>{goForm.length}</Text>
                                </View>
                                <Text style={text_light}>장바구니 가기</Text>
                            </View>
                            <Text style={[{textAlign: "center", color: "#FFF", fontSize: 18,}, text_light]}>
                                수량 및 추가정보 입력
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <></>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    go_cart: {
        paddingBottom: 36,
        paddingTop: 7,
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 50,
        textAlign: "center",
        width: "100%",
    }
    ,
    btn_cart: {
        width: 37,
        height: 37,
        opacity: 0,
        position: "absolute",
        zIndex: 10,
    }
    ,
    goCart: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    GoodsCateList: {
        backgroundColor: "#fff",
    },
    container: {
        //앱의 배경 색
        backgroundColor: '#fff',
    },
    gary_bar: {
        borderBottomWidth: 8,
        borderColor: "#ededf1",
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    flex_item1: {
        width: "25%",
    },
    flex_item2: {
        width: "75%",
        paddingLeft: 10,
    },
    goods_like: {
        position: "absolute",
        right: "10%",
        bottom: 10,
    },
    cate_1st_btn: {
        padding: 12,
    },
    cate_1st_btn_txt: {
        fontSize: 16,
    },
    cate_2st_list: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderTopWidth: 2,
        borderColor: "#EDEDF1",
        borderBottomWidth: 8,

    },
    cate_2st_btn: {
        padding: 6,
        width: "33.3333%",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ddd",
    },
    cate_2st_btn_txt: {
        fontSize: 14,
    },
    cate_goods_list_item: {
        paddingVertical: 26,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: "#ddd",
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
    cart_btn: {
        flex: 1,
        justifyItems: "center",
        backgroundColor: "#ededf1",
        color: "#696a81",
        // borderRadius: 50,
    },
    flex_top: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingBottom: 24,
    },
    flex_bottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cate_list_disc: {
        fontSize: 14,
    },
    cate_list_price: {
        fontSize: 18,
        fontWeight: "600",
        color: "#222",
    },
    search_input:{
        width:"85%",
    },
    search_icon:{
        width:"15%",
    },
    txt_color:{
        color:"#B1B2C3",
    },
    Recent_search_list_item:{
        paddingBottom:12,
    },
    txt_color2:{
        color:"#222",
    },
    flex_page:{
        justifyContent:"center",
        alignItems:"center",
    },
    flex_center:{
        justifyContent:"center",
    },
    center:{
        marginLeft:"auto",
        marginRight:"auto",
    },
    back:{
        width:"10%",
    },
});