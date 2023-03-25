import React,{useState,useEffect} from 'react';
import { StyleSheet, Button, CheckBox,  Text, TextInput, View, Image, TouchableOpacity, ScrollView} from 'react-native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    padding_bottom,
    flex_between,
    flex,
    h12,
    h13,
    h14,
    h16,
    h18,
    ms1,
    ms2,
    mb1,
    text_primary,
    d_flex,
    justify_content_center,
    flex_end,
    flex_between_bottom,
    fw500,
    justify_content_end,
    bg_gray,
    bg_light,
    pe3,
    pe5,
    me2,
    textarea, pe1, text_danger,
} from '../../common/style/AtStyle';
import {gray_bar, sub_page} from '../../common/style/SubStyle';

import goodsthum1 from "../../assets/img/goods_thum1.jpg";
// 샘플데이터
import {cancel_d_List} from "../../util/util";


export default function ReturnDetail({navigation,route}) {

    const [CanceDlList, setOrderList] = useState(cancel_d_List);     // 발주내역 출력


    console.log(CanceDlList);

    return (
        <>
            <View style={[bg_white,sub_page]}>
                <View style={[styles.CancelDetail]}>
                    <ScrollView style="">
                        <View style={[styles.Detail_page_top,d_flex,justify_content_center]}>
                            <Text style={[text_primary,h16]}>처리중입니다.</Text>
                        </View>
                        <View style={[styles.CancelDetail_sec]}>
                            <View style={[container]}>
                                <Text style={[h18]}>환불 요청 자재</Text>
                            </View>
                            <View style={gray_bar}/>
                            <View style={[styles.CancelDetail_list]}>
                                {CanceDlList.map((val,i)=>(
                                    <>
                                        <View style={[styles.CancelDetail_list_items]} key={i}>
                                            <View style={[container]}>
                                                <Text style={[h14,mb1]}>{val.title}</Text>
                                                <View style={[flex_between_bottom]}>
                                                    <View style={[flex_end]}>
                                                        <Image style={styles.goods_thum} source={goodsthum1}/>
                                                        <View style={ms2}>
                                                            <Text style={[h14,fw500]}>수량</Text>
                                                            <Text style={[h14]}>{val.count} 개</Text>
                                                        </View>

                                                    </View>
                                                    <View style={justify_content_end}>
                                                        <Text style={[h13]}>( 단가 : {val.price})</Text>
                                                        <Text style={[h16]}> {val.total_price} 원</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                ))}
                            </View>
                            <View style={gray_bar}/>
                            <View style="">
                                <View style={container}>
                                    <Text style={[h18]}>반품사유</Text>
                                </View>
                                <View style={[container,styles.borderVertical]}>
                                    <TextInput
                                        multiline
                                        editable={false}
                                        selectTextOnFocus={false}
                                        style={[textarea,{padding: 10, backgroundColor:'#eee',}]}
                                        value="배송중 자재 깨짐으로인한 반품요청"
                                    />
                                </View>
                            </View>
                            {/*취소사유*/}
                            <View style="">
                                <View style={container}>
                                    <Text style={[h18]}>결제 정보</Text>
                                </View>
                                <View style={[container,bg_light]}>
                                    <View style={[d_flex,justify_content_end,pe1]}>
                                        <View style="">
                                            <View style={[flex,justify_content_end,mb1]}>
                                                <Text style={[h14,styles.color1,me2]}>결제일</Text>
                                                <Text style={[h14]}>2022.09.20</Text>
                                            </View>
                                            {/*결제일*/}
                                            <View style={[flex,justify_content_end,mb1]}>
                                                <Text style={[h14,styles.color1,me2]}>결제방식</Text>
                                                <Text style={[h14]}>카드결제</Text>
                                            </View>
                                            {/*결제일*/}
                                            <View style={[flex,justify_content_end,mb1]}>
                                                <Text style={[h14,styles.color1,me2]}>자재 가격</Text>
                                                <Text style={[h14]}>535,900 원</Text>
                                            </View>
                                            {/*자재 가격*/}
                                            <View style={[flex,justify_content_end,mb1]}>
                                                <Text style={[h14,styles.color1,me2]}>요청옵션비</Text>
                                                <Text style={[h14]}>48,000 원</Text>
                                            </View>
                                            {/*요청옵션비*/}

                                            <View style={[flex,justify_content_end]}>
                                                <Text style={[h14,styles.color1,me2]}>총 결제금액</Text>
                                                <Text style={[h16,text_primary]}>1,300,000 원</Text>
                                            </View>
                                            {/*총 결제금액*/}
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/*결제정보*/}
                            <View style="">
                                <View style={container}>
                                    <Text style={[h18]}>환불금액</Text>
                                </View>
                                <View style={[container,bg_light]}>
                                    <View style={[d_flex,justify_content_end,pe1]}>
                                        <View style="">
                                            <View style={[flex,justify_content_end,mb1]}>
                                                <Text style={[h14,styles.color1,me2]}>현금</Text>
                                                <Text style={[h18,text_danger]}>1,000,000 원</Text>
                                            </View>
                                            {/*현금*/}
                                            <View style={[flex,justify_content_end,mb1]}>
                                                <Text style={[h14,styles.color1,me2]}>포인트</Text>
                                                <Text style={[h18,text_danger]}>300,000</Text>
                                            </View>
                                            {/*포인트*/}

                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/*환불금액*/}
                            <View style={[padding_bottom]} />
                        </View>
                    </ScrollView>
                    {/*취소상세*/}
                </View>
            </View>
        </>


    );
}

const styles = StyleSheet.create({
    Detail_page_top:{
        paddingVertical:16,
    },
    CancelDetail_list_items:{
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
    },
    goods_thum:{
        maxWidth:100,
        width:"100%",
        minHeight:100,
        height:"100%",
        borderRadius:10,
    },
    color1:{
        color:"#696A81",
    }
});