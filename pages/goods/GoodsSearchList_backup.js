import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';


// 공통 CSS 추가
import {container, bg_white, flex_between, input, flex,flex_end,d_none,h14,h16,mt3,mt2,ms2} from '../../common/style/AtStyle';



import BackArrow from '../../icons/back_arrow.svg';
import Search from '../../icons/search.svg';
import search_none from "../../assets/img/search_none.png";
import col2 from "../../assets/img/co2.png";
import col3 from "../../assets/img/co3.png";
import goods_image from "../../assets/img/goods_image.jpg";
import goods_img_1 from "../../assets/img/goods_img_1.png";
import goods_like from "../../assets/img/ico_heart.png";
import Icon from "react-native-vector-icons/AntDesign";



export default function GoodsSearchList({route,navigation}) {

    const Recent_search = [

        {
            "Recent_search_id": "1",                                    //검색번호
            "Recent_search_tit": "일반석고보드 9.5T X 900 X 1800",           //상품명
            "Recent_search_date": "10.17",                                //검색날짜
        },
        {
            "Recent_search_id": "2",                                    //검색번호
            "Recent_search_tit": "도어표시락 실린더",           //상품명
            "Recent_search_date": "10.05",                                //검색날짜
        },
        {
            "Recent_search_id": "3",                                    //검색번호
            "Recent_search_tit": "PF보드 ( 고단열 / 준불연 폼보드 )",           //상품명
            "Recent_search_date": "10.17",                                //검색날짜
        },
        {
            "Recent_search_id": "4",                                    //검색번호
            "Recent_search_tit": "우레탄GCS단열보드",           //상품명
            "Recent_search_date": "10.17",                                //검색날짜
        },
        {
            "Recent_search_id": "5",                                    //검색번호
            "Recent_search_tit": "미네랄울 보온단열재 BOX당 10매 50T*450*1000 (1박스=4.5헤배)",           //상품명
            "Recent_search_date": "10.17",                                //검색날짜
        },
        {
            "Recent_search_id": "1",                                    //검색번호
            "Recent_search_tit": "일반석고보드 9.5T X 900 X 1800",           //상품명
            "Recent_search_date": "10.17",                                //검색날짜
        },
        {
            "Recent_search_id": "2",                                    //검색번호
            "Recent_search_tit": "도어표시락 실린더",           //상품명
            "Recent_search_date": "10.05",                                //검색날짜
        },


    ];

    const [state,setState] = useState(Recent_search);


    const [SearchVal, onChangeSearchVal] = React.useState("");
    //내용

    console.log(SearchVal);

    return (

        <>
            <View style={bg_white}>
                <View style={container}>
                    <View style={[flex,styles.flex_center]}>
                        <View style={[styles.back]}>
                            <BackArrow width={22} height={18} style={[styles.center]} />
                        </View>
                        <View style={[styles.search_input]}>
                            <TextInput style={[input,styles.input_wt]} onChangeText={onChangeSearchVal}  placeholder="검색어"  value={SearchVal} />
                        </View>
                        <View style={[styles.search_icon]}>
                            <TouchableOpacity style="" onPress={()=>{navigation.navigate('검색상품')}}>
                                <Search width={22} height={18} style={[styles.center]} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    {/*검색상단*/}
                    <View style={mt3}>
                        {/*=====================================검색어가 있을때======================================*/}

                        <ScrollView style="">
                        {/**/}
                            <View style={styles.cate_goods_list}>
                                <View style={styles.cate_goods_list_item}>
                                    <View style={styles.flex}>
                                        <View style={[styles.flex_item,styles.flex_item1]}>
                                            <Image style={styles.cate_list_Thumbnail} source={goods_img_1}/>
                                            <View style={styles.goods_like}>
                                                <Image style={styles.goods_like_icon} source={goods_like}/>
                                            </View>
                                        </View>
                                        <View style={[styles.flex_item,styles.flex_item2]}>
                                            <View style={styles.flex_top}>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style=""   onPress={() => {navigation.navigate('상품상세') }}>
                                                        <Text style={styles.cate_2st_btn_txt}>일반석고보드 9.5T X 900 X 1800 </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style={styles.cart_btn} >
                                                        <Icon name="shoppingcart" size={30} color="#3143e8" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={styles.flex_bottom}>
                                                <View style="">
                                                    <Text style={styles.cate_list_disc}>당일출고</Text>
                                                </View>
                                                <View style="">
                                                    <Text style={styles.cate_list_price}>3,410원</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/*    */}
                                <View style={styles.cate_goods_list_item}>
                                    <View style={styles.flex}>
                                        <View style={[styles.flex_item,styles.flex_item1]}>
                                            <Image style={styles.cate_list_Thumbnail} source={goods_img_1}/>
                                            <View style={styles.goods_like}>
                                                <Image style={styles.goods_like_icon} source={goods_like}/>
                                            </View>
                                        </View>
                                        <View style={[styles.flex_item,styles.flex_item2]}>
                                            <View style={styles.flex_top}>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style="" >
                                                        <Text style={styles.cate_2st_btn_txt}>일반석고보드 9.5T X 900 X 1800 </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style={styles.cart_btn} >
                                                        <Icon name="shoppingcart" size={30} color="#3143e8" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={styles.flex_bottom}>
                                                <View style="">
                                                    <Text style={styles.cate_list_disc}>당일출고</Text>
                                                </View>
                                                <View style="">
                                                    <Text style={styles.cate_list_price}>3,410원</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.cate_goods_list_item}>
                                    <View style={styles.flex}>
                                        <View style={[styles.flex_item,styles.flex_item1]}>
                                            <Image style={styles.cate_list_Thumbnail} source={goods_img_1}/>
                                            <View style={styles.goods_like}>
                                                <Image style={styles.goods_like_icon} source={goods_like}/>
                                            </View>
                                        </View>
                                        <View style={[styles.flex_item,styles.flex_item2]}>
                                            <View style={styles.flex_top}>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style="" >
                                                        <Text style={styles.cate_2st_btn_txt}>일반석고보드 9.5T X 900 X 1800 </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style={styles.cart_btn} >
                                                        <Icon name="shoppingcart" size={30} color="#3143e8" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={styles.flex_bottom}>
                                                <View style="">
                                                    <Text style={styles.cate_list_disc}>당일출고</Text>
                                                </View>
                                                <View style="">
                                                    <Text style={styles.cate_list_price}>3,410원</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.cate_goods_list_item}>
                                    <View style={styles.flex}>
                                        <View style={[styles.flex_item,styles.flex_item1]}>
                                            <Image style={styles.cate_list_Thumbnail} source={goods_img_1}/>
                                            <View style={styles.goods_like}>
                                                <Image style={styles.goods_like_icon} source={goods_like}/>
                                            </View>
                                        </View>
                                        <View style={[styles.flex_item,styles.flex_item2]}>
                                            <View style={styles.flex_top}>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style="" >
                                                        <Text style={styles.cate_2st_btn_txt}>일반석고보드 9.5T X 900 X 1800 </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style={styles.cart_btn} >
                                                        <Icon name="shoppingcart" size={30} color="#3143e8" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={styles.flex_bottom}>
                                                <View style="">
                                                    <Text style={styles.cate_list_disc}>당일출고</Text>
                                                </View>
                                                <View style="">
                                                    <Text style={styles.cate_list_price}>3,410원</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.cate_goods_list_item}>
                                    <View style={styles.flex}>
                                        <View style={[styles.flex_item,styles.flex_item1]}>
                                            <Image style={styles.cate_list_Thumbnail} source={goods_img_1}/>
                                            <View style={styles.goods_like}>
                                                <Image style={styles.goods_like_icon} source={goods_like}/>
                                            </View>
                                        </View>
                                        <View style={[styles.flex_item,styles.flex_item2]}>
                                            <View style={styles.flex_top}>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style="" >
                                                        <Text style={styles.cate_2st_btn_txt}>일반석고보드 9.5T X 900 X 1800 </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style={styles.cart_btn} >
                                                        <Icon name="shoppingcart" size={30} color="#3143e8" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={styles.flex_bottom}>
                                                <View style="">
                                                    <Text style={styles.cate_list_disc}>당일출고</Text>
                                                </View>
                                                <View style="">
                                                    <Text style={styles.cate_list_price}>3,410원</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.cate_goods_list_item}>
                                    <View style={styles.flex}>
                                        <View style={[styles.flex_item,styles.flex_item1]}>
                                            <Image style={styles.cate_list_Thumbnail} source={goods_img_1}/>
                                            <View style={styles.goods_like}>
                                                <Image style={styles.goods_like_icon} source={goods_like}/>
                                            </View>
                                        </View>
                                        <View style={[styles.flex_item,styles.flex_item2]}>
                                            <View style={styles.flex_top}>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style="" >
                                                        <Text style={styles.cate_2st_btn_txt}>일반석고보드 9.5T X 900 X 1800 </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flex}>
                                                    <TouchableOpacity style={styles.cart_btn} >
                                                        <Icon name="shoppingcart" size={30} color="#3143e8" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={styles.flex_bottom}>
                                                <View style="">
                                                    <Text style={styles.cate_list_disc}>당일출고</Text>
                                                </View>
                                                <View style="">
                                                    <Text style={styles.cate_list_price}>3,410원</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/*    */}
                            </View>
                        {/*    */}
                        </ScrollView>
                        {/*=====================================검색어가 없을때======================================*/}
                        <View style={[d_none,mt3,styles.flex_page]}>
                            <Image style={styles.goods_image} source={search_none}/>
                            <Text style={[mt2,h14,styles.txt_color]}> 검색어가 없습니다.</Text>
                        </View>

                    </View>
                </View>
            </View>






        </>
    );
}

const styles = StyleSheet.create({
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
    search_input:{
        width:"80%",
    },
    search_icon:{
        width:"10%",
    },
    txt_color:{
        color:"#B1B2C3",
    },

    flex:{
        flexDirection:"row",
        alignItems:"flex-start",
    },
    flex_item1:{
        width:"25%",
    },
    flex_item2:{
        width:"75%",
        paddingLeft:10,
    },
    goods_like:{
        position:"absolute",
        right:"20%",
        bottom:"10%",
    },
    cate_1st_btn:{
        padding:12,
    },
    cate_1st_btn_txt:{
        fontSize:16,
    },
    cate_2st_list:{
        flexDirection:"row",
        flexWrap:"wrap",
        alignItems:"center",
        borderTopWidth:2,
        borderColor:"#ddd",

    },
    cate_2st_btn:{
        padding:6,
        width:"33.3333%",
        borderBottomWidth:1,
        borderRightWidth:1,
        borderColor:"#ddd",
    },
    cate_2st_btn_txt:{
        fontSize:14,
    },
    cate_goods_list_item:{
        paddingVertical:26,
        paddingHorizontal:16,
        borderBottomWidth:1,
        borderColor:"#ddd",
    },
    cate_list_Thumbnail:{
        width:80,
        height:80,
    },
    goods_like_icon:{
        width:21,
        height:18,
    },
    cart_btn:{
        width:36,
        lineHeight:36,
        fontSize:18,
        backgroundColor:"#ededf1",
        color:"#696a81",
        borderRadius:50,
    },
    flex_top:{
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:"space-between",
        paddingBottom:24,
    },
    flex_bottom:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    cate_list_disc:{
        fontSize:14,
    },
    cate_list_price:{
        fontSize:18,
        fontWeight:"600",
        color:"#222",
    },
});