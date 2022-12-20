import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';


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
    wt7, wt3, justify_content_end
} from '../../common/style/AtStyle';
import {sub_page, gray_bar} from '../../common/style/SubStyle';


import BackArrow from '../../icons/back_arrow.svg';
import Search from '../../icons/search.svg';
import search_none from "../../assets/img/search_none.png";
import col2 from "../../assets/img/co2.png";
import col3 from "../../assets/img/co3.png";
import goods_image from "../../assets/img/goods_image.jpg";



export default function GoodsSearch({navigation, route}) {

    //1.
    const [GoodsSearch, setGoodsSearch]  = useState({
        input_val                  :"",    //검색입력값
    })

    //2. 입력폼 체크루틴
    const ChkInput = (keyValue, text)   =>{
        //기본 루틴
        setGoodsSearch({
            ...GoodsSearch,
            [keyValue]:text,
        })
    }

    console.log(GoodsSearch);

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




    return (

        <>
            <View style={[bg_white,sub_page]}>
                <View style={container}>
                    <View style={[flex,styles.flex_center]}>
                        {/*<View style={[styles.back]}>*/}
                        {/*    <TouchableOpacity style="" onPress={() => navigation.pop()} >*/}
                        {/*        <BackArrow width={22} height={18} style={[styles.center]} />*/}
                        {/*    </TouchableOpacity>*/}

                        {/*</View>*/}
                        <View style={[styles.search_input]}>
                            <TextInput style={[input,styles.input_wt]}
                                       onChangeText={(input_val)=>ChkInput("input_val",input_val)}
                                       value={GoodsSearch.input_val}
                                       placeholder="검색어를 입력하세요."/>

                        </View>
                        <View style={[styles.search_icon]}>
                            <TouchableOpacity style="" onPress={()=>{navigation.navigate('검색상품')}}>
                                <Search width={30} height={21} style={[styles.center]} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    {/*검색상단*/}
                    <View style={mt3}>
                        {/*=====================================검색어가 있을때======================================*/}
                        <View style={flex_between}>
                            <Text style={h16}>최근 검색어</Text>
                            <TouchableOpacity style="" >
                                <Text style={[h14,styles.txt_color]}>전체삭제</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.Recent_search_list,mt2]}>
                            {state.map((itmes,i) =>
                            <View style={styles.Recent_search_list_item} key={i}>
                                <View style={flex_between}>
                                    <View style={[wt7]}>
                                        <Text style={[h14,styles.txt_color2]}>{itmes.Recent_search_tit}</Text>
                                    </View>
                                    <View style={[wt3]}>
                                        <View style={[flex,justify_content_end]}>
                                            <Text style={[h14,styles.txt_color]}>{itmes.Recent_search_date}</Text>
                                            <TouchableOpacity style={ms2} >
                                                <Text style={[h14,styles.txt_color]}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            )}
                        </View>
                        {/*=====================================검색어가 없을때======================================*/}
                        <View style={[d_none,mt3,styles.flex_page]}>
                            <Image style={styles.goods_image} source={search_none}/>
                            <Text style={[mt2,h14,styles.txt_color]}>최근 검색어가 없습니다.</Text>
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
});