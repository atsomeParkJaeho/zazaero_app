import React,{useState,useEffect} from 'react';
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
    Alert, Platform
} from 'react-native';


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
    text_danger, pe1, textarea, input, align_items_center, mt2, mt1, padding_bottom2,
} from '../../common/style/AtStyle';
import {borderBottom1, gray_bar, gray_bar2, sub_page} from '../../common/style/SubStyle';

import goodsthum1 from "../../assets/img/goods_thum1.jpg";
import col3 from "../../assets/img/co3.png";


// 샘플데이터
import {cancel_d_List, cancelStatus, DateChg, Price, settleKind} from "../../util/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {gd_cancel_info} from "./UTIL_order";
import {get_Member} from "../UTIL_mem";
import {FormStyle} from "./FormStyle";


export default function CancelDetail({navigation,route}) {

    const {gd_cancel_uid, gd_order_uid} = route.params;

    const [Member, setMember] = useState();
    const [gd_order, set_gd_order] = useState([]);     // 취소한 자재 출력
    const [gd_cancel, set_gd_cancel] = useState([]);
    const [A_order_cancel_item, set_order_cancel_item] = useState([]);
    useEffect(()=>{
        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                Alert.alert(``,`실패`);
            }
        });

        gd_cancel_info(gd_cancel_uid, gd_order_uid).then((res)=>{
            if(res) {
                console.log(res.data,'/ 데이터 확인');
                const {result, gd_order, A_cancel_item, gd_cancel} = res.data;
                if(result === 'OK') {
                    // setOrderList(gd_cancel_info);
                    set_gd_order(gd_order);
                    set_order_cancel_item(A_cancel_item);
                    set_gd_cancel(gd_cancel);
                } else {
                    Alert.alert('','연결에러1');
                }
            }
        })
    },[Member]);

    console.log(gd_order.gd_order_uid,' / 발주정보');
    console.log(A_order_cancel_item,' / 취소자재 정보');
    console.log(gd_cancel,' / 취소정보');


    //예시
    const [CanceDlList, setOrderList] = useState(cancel_d_List);     // 발주내역 출력


    console.log(CanceDlList);

    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.Detail_page_top,d_flex,justify_content_center]}>
                    <Text style={[text_danger,h16]}>{cancelStatus(gd_order.cancel_status)}</Text>
                </View>
                {/**/}

                            <View style={[FormStyle.FormGroup]}>
                                {/**----------------------------------------------공사명--------------------------------------------------**/}
                                <View style={[FormStyle.FormGroupItems]}>
                                    <Text style={[FormStyle.FormLabel]}>공사명</Text>
                                    <TextInput style={[input,{flex:1},bg_light]}
                                               placeholder="공사명"
                                               value={"3월10일 공사명 1차"}


                                    />
                                </View>
                                {/**----------------------------------------------배송지주소 입력--------------------------------------------------**/}
                                <View style={[FormStyle.FormGroupItems]}>
                                    <Text style={[FormStyle.FormLabel]}>배송지</Text>
                                    <View style={[d_flex,align_items_center]}>
                                        {/*우편번호*/}
                                        <TextInput style={[input,{flex:1},bg_light]}
                                                   editable={false}
                                                   placeholder="우편번호"
                                                   value={"58762"}
                                                   returnKeyType="next"
                                                   blurOnSubmit={false}
                                        />
                                    </View>
                                </View>
                                {/**----------------------------------------------주소입력--------------------------------------------------**/}
                                <View style={{paddingBottom:15,}}>
                                    <TextInput
                                        style={[input,{flex:1},bg_light]}
                                        editable={false}
                                        placeholder="주소"
                                        value={"전남 목포시 고하대로 10"}
                                        returnKeyType="next"
                                        blurOnSubmit={false}

                                    />
                                </View>
                                {/**----------------------------------------------상세주소--------------------------------------------------**/}
                                <View>
                                    <TextInput style={[input, bg_light]}
                                               onChangeText={(addr2)=>goInput("addr2",addr2)}
                                               placeholder="상세주소"
                                               value={"33"}
                                               returnKeyType="done"
                                    />
                                </View>
                                {/*==============현장인도자 성명==============*/}
                                <View style={[FormStyle.FormGroupItems,mt2]}>
                                    <Text style={[FormStyle.FormLabel]}>현장인도자 성명</Text>
                                    <TextInput style={[input,bg_light]}
                                               placeholder="예 ) 홍길동"
                                               value={"홍길동"}
                                    />
                                </View>

                                {/*==============현장인도자 연락처==============*/}
                                <View style={[FormStyle.FormGroupItems]}>
                                    <View>
                                        <Text style={[FormStyle.FormLabel]}>현장인도자 연락처</Text>
                                        <TextInput style={[input,bg_light]}
                                                   keyboardType="number-pad"
                                                   placeholder="예 ) 010-XXXX-XXXX"
                                                   maxLength={13}
                                                   value={"010-1234-5678"}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.CancelDetail_sec]}>
                                <View style={[container]}>
                                    <Text style={[h18]}>환불 요청 자재</Text>
                                </View>
                                <View style={gray_bar2}/>
                                <View style={[styles.CancelDetail_list]}>
                                    {CanceDlList.map((val,i)=>(
                                        <>
                                            <View style={[styles.CancelDetail_list_items]} key={i}>
                                                <View style={[container]}>
                                                    <Text style={[h14,mb1]}>{val.title}</Text>
                                                    <View style={[flex_between_bottom]}>
                                                        <View style={[flex_end]}>
                                                            <Image style={styles.goods_thum} source={goodsthum1}/>
                                                            <View style={[ms2]}>
                                                                <View style={[flex]}>
                                                                    <Text style={[h14,fw500]}>기존수량 : </Text>
                                                                    <Text style={[h14]}>{val.count} 개</Text>
                                                                </View>
                                                                <View style={[flex]}>
                                                                    <Text style={[h14,fw500,text_danger]}>취소수량 : </Text>
                                                                    <Text style={[h14,text_danger]}>-{val.can_count} 개</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View style={justify_content_end}>
                                                            <Text style={[h13]}>( 단가 : {val.price})</Text>
                                                            {/*단가*/}
                                                            <Text style={[h13]}> 취소금액</Text>
                                                            <Text style={[h16]}> {val.total_price} 원</Text>
                                                            {/*총금액*/}
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
                                        <Text style={[h18]}>결제 정보</Text>
                                    </View>
                                    <View style={[flex,mt1]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>결제유형</Text>
                                        </View>
                                        <View style={[styles.wt70]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                무통장입금
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[flex]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>환불 자재금액</Text>
                                        </View>
                                        <View style={[styles.wt70]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                100,000 원
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[flex]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>환불 요청옵션비</Text>
                                        </View>
                                        <View style={[styles.wt70]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                20,000 원
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[flex]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>환불 차감금액</Text>
                                        </View>
                                        <View style={[styles.wt70]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                10,000 원
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[flex]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>배송비</Text>
                                        </View>
                                        <View style={[styles.wt70]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                50,000 원
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[flex]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>총 환불금액</Text>
                                        </View>
                                        <View style={[styles.wt70]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                180,000 원
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[flex]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>현금</Text>
                                        </View>
                                        <View style={[styles.wt70]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,text_primary]}>
                                                80,000 원
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[flex]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30,borderBottom1]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>포인트</Text>
                                        </View>
                                        <View style={[styles.wt70,borderBottom1]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,text_primary]}>
                                                100,000 원
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                {/*결제정보*/}

                                <View style="">
                                    <View style={container}>
                                        <Text style={[h18]}>환불계좌 정보</Text>
                                    </View>
                                    <View style={[flex,mt1]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>송금완료일시</Text>
                                        </View>
                                        <View style={[styles.wt70]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                2023년 3월 25일 14:00:00
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[flex]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>은행명</Text>
                                        </View>
                                        <View style={[styles.wt70]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                농협
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[flex]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>계좌번호</Text>
                                        </View>
                                        <View style={[styles.wt70]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                6889649843244
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[flex]}>
                                        {/**----------------------발주신청일--------------------------**/}
                                        <View style={[styles.wt30,borderBottom1]}>
                                            <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>예금주</Text>
                                        </View>
                                        <View style={[styles.wt70,borderBottom1]}>
                                            <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                홍길동
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                {/*환불계좌정보*/}

                                <View style={[padding_bottom2]} />
                            </View>

                {/**/}
                <View style={[styles.CancelDetail_sec]}>
                    <View style={[container]}>
                        <Text style={[h18]}>환불 요청 자재</Text>
                    </View>
                    <View style={gray_bar}/>
                    <View style={[styles.CancelDetail_list]}>
                        {/**--------------------반복문 구간----------------------**/}
                        {A_order_cancel_item.map((val,idx)=>(
                            <>
                                <View style={[styles.CancelDetail_list_items]}>
                                    <View style={[container]}>
                                        <Text style={[h14,mb1]}>{val.goods_name}</Text>
                                        <View style={[flex_between_bottom]}>
                                            <View style={[flex_end]}>
                                                <Image style={styles.goods_thum} source={{uri:`http://www.zazaero.com${val.img_list}`}}/>
                                                <View style={ms2}>
                                                    <Text style={[h14]}>기존수량 : {val.src_cnt}개</Text>
                                                    <Text style={[h14,fw500]}>취소수량 : -{val.cancel_cnt}개</Text>
                                                </View>

                                            </View>
                                            <View style={justify_content_end}>
                                                <Text style={[h13]}>( 단가 : {Price(val.price)} 원)</Text>
                                                {/*단가*/}
                                                <Text style={[h14]}>총 자재금액</Text>
                                                <Text style={[h16]}>{Price(val.price * val.src_cnt)}원</Text>
                                                {/*총금액*/}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </>
                        ))}

                    </View>
                    <View style={gray_bar}/>
                    {/*<View style="">*/}
                    {/*    <View style={container}>*/}
                    {/*        <Text style={[h18]}>취소사유</Text>*/}
                    {/*    </View>*/}
                    {/*    <View style={[container,styles.borderVertical]}>*/}
                    {/*        <TextInput*/}
                    {/*            multiline*/}
                    {/*            editable={false}*/}
                    {/*            selectTextOnFocus={false}*/}
                    {/*            style={[textarea,{padding: 10, backgroundColor:'#eee',}]}*/}
                    {/*            value="발주건 중복 결제"*/}
                    {/*        />*/}
                    {/*    </View>*/}
                    {/*</View>*/}
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
                                        <Text style={[h14]}>{DateChg(gd_order.pay_date)} {gd_order.pay_time}</Text>
                                    </View>
                                    {/*결제일*/}
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>결제방식</Text>
                                        <Text style={[h14]}>{settleKind(gd_order.settlekind)}</Text>
                                    </View>
                                    {/*결제일*/}
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>자재 가격</Text>
                                        <Text style={[h14]}>{Price(gd_order.goodsprice)}원</Text>
                                    </View>
                                    {/*자재 가격*/}
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>요청옵션비</Text>
                                        <Text style={[h14]}>{Price(gd_order.tot_opt_price)} 원</Text>
                                    </View>
                                    {/*요청옵션비*/}

                                    <View style={[flex,justify_content_end]}>
                                        <Text style={[h14,styles.color1,me2]}>총 결제금액</Text>
                                        <Text style={[h16,text_primary]}>{Price(gd_order.settleprice)}원</Text>
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
                                    {/*<View style={[flex,justify_content_end]}>*/}
                                    {/*    <Text style={[h14,styles.color1,me2]}>환불지급일</Text>*/}
                                    {/*    <Text style={[h16,text_primary]}>{Price(gd_order.settleprice)}원</Text>*/}
                                    {/*</View>*/}
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>현금</Text>
                                        <Text style={[h18,text_danger]}>{Price(gd_cancel.sum_refund_money)}원</Text>
                                    </View>
                                    {/*현금*/}
                                    <View style={[flex,justify_content_end,mb1]}>
                                        <Text style={[h14,styles.color1,me2]}>포인트</Text>
                                        <Text style={[h18,text_danger]}>{gd_cancel.real_refund_point}P</Text>
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
    },
    borderVertical:{
        borderTopWidth:1,

        borderColor:"#eee",
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
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        lineHeight:24,
        fontWeight:"500",
        textAlign:"right",
    },
});