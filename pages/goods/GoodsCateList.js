import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import logo from "../../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";


import goods_img_1 from '../../assets/img/goods_img_1.png';
import goods_like from '../../assets/img/ico_heart.png';




export default function GoodsCateList() {

    //return 구문 밖에서는 슬래시 두개 방식으로 주석


    return (
        /*
          return 구문 안에서는 {슬래시 + * 방식으로 주석
        */
        <ScrollView style={[styles.subPage,styles.GoodsCateList]}>
            <ScrollView style={styles.cate_1st_list} horizontal indicatorStyle={"black"}>
                <TouchableOpacity style={styles.cate_1st_btn} onPress={()=>{category1('석고/보드류')}}><Text style={styles.cate_1st_btn_txt}>석고/보드류</Text></TouchableOpacity>
                <TouchableOpacity style={styles.cate_1st_btn} onPress={()=>{category1('합판/MDF/OSB')}}><Text style={styles.cate_1st_btn_txt}>합판/MDF/OSB</Text></TouchableOpacity>
                <TouchableOpacity style={styles.cate_1st_btn} onPress={()=>{category1('각재/구조재')}}><Text style={styles.cate_1st_btn_txt}>각재/구조재</Text></TouchableOpacity>
                <TouchableOpacity style={styles.cate_1st_btn} onPress={()=>{category1('몰딩')}}><Text style={styles.cate_1st_btn_txt}>몰딩</Text></TouchableOpacity>
                <TouchableOpacity style={styles.cate_1st_btn} onPress={()=>{category1('단열재')}}><Text style={styles.cate_1st_btn_txt}>단열재</Text></TouchableOpacity>
                <TouchableOpacity style={styles.cate_1st_btn} onPress={()=>{category1('도어/문틀')}}><Text style={styles.cate_1st_btn_txt}>도어/문틀</Text></TouchableOpacity>
            </ScrollView>
            {/*1차카테고리 메뉴 선택*/}
            <View style={styles.cate_2st_list}>
                <TouchableOpacity style={styles.cate_2st_btn} onPress={()=>{category2('all')}}>
                    <Text style={styles.cate_2st_btn_txt}>전체</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cate_2st_btn} onPress={()=>{category2('all')}}>
                    <Text style={styles.cate_2st_btn_txt}>석고보드</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cate_2st_btn} onPress={()=>{category2('all')}}>
                    <Text style={styles.cate_2st_btn_txt}>CRC보드</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cate_2st_btn} onPress={()=>{category2('all')}}>
                    <Text style={styles.cate_2st_btn_txt}>E보드</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cate_2st_btn} onPress={()=>{category2('all')}}>
                    <Text style={styles.cate_2st_btn_txt}>E보드</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cate_2st_btn} onPress={()=>{category2('all')}}>
                    <Text style={styles.cate_2st_btn_txt}>마감보드</Text>
                </TouchableOpacity>
            </View>
            {/*2차카테고리 메뉴 선택*/}
            <View style={styles.gary_bar}/>

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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    GoodsCateList:{
        backgroundColor:"#fff",
    },
    container: {
        //앱의 배경 색
        backgroundColor: '#fff',
    },
    gary_bar:{
        borderBottomWidth:8,
        borderColor:"#ededf1",
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