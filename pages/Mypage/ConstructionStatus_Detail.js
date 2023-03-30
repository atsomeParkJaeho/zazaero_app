import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback, Switch
} from 'react-native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    flex,
    wt6,
    wt1,
    wt3,
    wt5,
    wt2,
    text_center,
    h16,
    mt2,
    pt1,
    pb1,
    h14,
    ps1,
    text_primary,
    wt8,
    pt2,
    pb2,
    bg_primary,
    ms1,
    me1,
    mb1,
    text_white,
    text_right,
    text_light,
    text_info,
    text_gray,
    wt7,
    h15,
    flex_top,
    text_black,
    h18,
    h17,
    fw500,
    text_left,
    mt1,
    flex_end,
    input,
    bg_light,
    d_flex,
    align_items_center,
    mb2,
    flex_between_bottom,
    ms2,
    count_btn,
    pos_center,
    count_btn_txt, countinput, justify_content_end, h13, text_danger, textarea, flex_between_top, h12, fw300, switch_bar
} from '../../common/style/AtStyle';
import {gray_bar, sub_page} from '../../common/style/SubStyle';
import Wishlist from "../../icons/ico_heart_c.svg";
import WishlistNon from "../../icons/ico_heart_nc.svg";
import {FormStyle} from "../../pages/order/FormStyle";
import {DateChg, Price} from "../../util/util";
import Checkbox from "expo-checkbox";
import col1 from "../../assets/img/co1.png";
import col2 from "../../assets/img/co2.png";
import col3 from "../../assets/img/co3.png";
import CloseBtn from "../../icons/close_btn.svg";


export default function ConstructionStatus_Detail({navigation,route}) {


    const order_Cate_List = [

        {
            "ct_user_id": "1",                                  //아이디값
            "ct_tit": "일반석고보드 9.5T X 900 X 1800",           //상품명
            "ct_img": col1,                                  //이미지
            "ct_price": "13,000",                                //판매가
            "ct_disc": "주문시 3일이내 배송가능",                                //간략설명
            "ct_count": "1",                                    //상품갯수
            "ct_Request": "확인중",                                    //요청사항금액
        },
        {
            "ct_user_id": "1",                                  //아이디값
            "ct_tit": "도배장판",           //상품명
            "ct_img": col2,                                  //이미지
            "ct_price": "50,000",                                //상품가격
            "ct_disc": "간략설명",                                //상품가격
            "ct_count": "1",                                    //상품갯수
            "ct_Request": "8,000 원",                                    //요청사항금액
        },
        {
            "ct_user_id": "1",                                  //아이디값
            "ct_tit": "롤하스롤 벽지",           //상품명
            "ct_img": col3,                                  //이미지
            "ct_price": "9,500",                                //상품가격
            "ct_disc": "간략설명",                                //상품가격
            "ct_count": "1",                                    //상품갯수
            "ct_Request": "15,000 원",                                    //요청사항금액
        },

    ];

    //


    return  (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.ConstructionStatus_Detail]}>
                    <View style={[mt2]}>
                        <View style={[ms1,me1]}>
                            <View style={[mt1]}>
                                <Text style={[FormStyle.FormLabel]}>공사명</Text>
                                <TextInput style={[input,{flex:1},bg_light]}
                                           editable={false}
                                           value="호반스테이트아파트 301호"
                                />
                            </View>
                            <View style={[mt1]}>
                                <Text style={[FormStyle.FormLabel]}>배송지</Text>
                                <View style={[d_flex,align_items_center]}>
                                    {/*우편번호*/}
                                    <TextInput style={[input,{flex:1},bg_light]}
                                               editable={false}
                                               placeholder="우편번호"
                                               value="86489"
                                    />
                                </View>
                            </View>
                            <View style={[mt1]}>
                                <TextInput
                                    style={[input,{flex:1},bg_light]}
                                    editable={false}
                                    value="광주 북구 서하로233번길 32"
                                />
                            </View>

                            <View style={[mt1]}>
                                <TextInput
                                    style={[input,{flex:1},bg_light]}
                                    editable={false}
                                    value="1층"
                                />
                            </View>
                        </View>

                        <View style={[mt2,gray_bar]} />

                        <View style={[d_flex, align_items_center, FormStyle.FormDate, {justifyContent: "space-between"}]}>
                            {/*체크박스*/}
                            <Text style={[FormStyle.FormDateLabel]}>희망배송일</Text>
                            <Text style={[FormStyle.FormDateLabel]}>
                                2023년 1월 31일
                            </Text>
                        </View>
                        <View style={[d_flex, align_items_center, FormStyle.FormDate, {justifyContent:"space-between"}]}>
                            {/*체크박스*/}
                            <Text style={[FormStyle.FormDateLabel]}>희망배송시간</Text>
                            <Text style={[FormStyle.FormDateLabel]}>
                                04:00
                            </Text>
                        </View>

                        <View style={[ms1,me1]}>
                            <View style={[mt1]}>
                                <Text style={[FormStyle.FormLabel]}>현장인도자 성명</Text>
                                <TextInput style={[input,{flex:1},bg_light]}
                                           value="홍길동"
                                />
                            </View>
                            <View style={[mt1]}>
                                <Text style={[FormStyle.FormLabel]}>현장인도자 연락처</Text>
                                <TextInput style={[input,{flex:1},bg_light]}
                                           value="010-1234-1234"
                                />
                            </View>
                            <View style={[mt1]}>
                                <Text style={[FormStyle.FormLabel]}>배송요청사항</Text>
                                <TextInput style={[input,{flex:1,height:100,textAlignVertical:"top"},bg_light]}
                                           editable
                                           multiline={true}
                                           numberOfLines={4}
                                           value="배송메세지1"
                                />
                            </View>
                        </View>

                        <View style={[mt2,gray_bar]} />

                        <View style={[styles.order_goods_list]}>
                            {order_Cate_List.map((items,i) =>
                                <View style={[styles.order_goods_list_items,]} key={i}>
                                    <View style={[container]}>
                                        <View style={[mb1]}>
                                            <Text style={[mt1]}>{items.ct_tit}</Text>
                                        </View>
                                        <View style={[flex_between,flex_end]}>
                                            <View style={[flex_end]}>
                                                <View style={[]}>
                                                    <Image style={styles.cart_goods_img} source={items.ct_img}/>
                                                </View>
                                                <View style={[ms2]}>
                                                    <Text style={[mb1,h14,fw500]}>수량</Text>
                                                    <Text style={[]}>2 개</Text>
                                                </View>
                                            </View>
                                            <View style={[]}>
                                                <Text style={[h12,]}>( 단가 :{items.ct_price} 원)</Text>
                                                <Text style={[h16,fw500,text_right]}>{items.ct_price} 원</Text>
                                            </View>
                                        </View>

                                        <View style={[mt2,flex_between]}>
                                            <Text style={styles.Request_txt}>이 자재에 모델명, 제작관련 등 요청사항이 있으신가요?</Text>

                                        </View>
                                        <TextInput style={textarea}   multiline={true} numberOfLines={4}    placeholder="" value=""/>
                                        <Text style={[mt1,h12,styles.text_r]}>요청사항 금액 : <Text style={[h12,,text_danger]}>{items.ct_Request} </Text></Text>
                                    </View>
                                    <View style={[styles.border_b1]} />
                                </View>
                            )}
                        </View>

                    </View>

                </View>
                <View style={[styles.ios_pb]} />
            </ScrollView>

        </>
    );
}

const styles = StyleSheet.create({

});