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
    text_danger, pe1, textarea, input, align_items_center, mt2, mt1, padding_bottom2, h21,
} from '../../common/style/AtStyle';
import {borderBottom1, gray_bar, gray_bar2, sub_page} from '../../common/style/SubStyle';

import goodsthum1 from "../../assets/img/goods_thum1.jpg";
import col3 from "../../assets/img/co3.png";


// 샘플데이터
import {BankCode, cancel_d_List, cancelStatus, DateChg, Phone, Price, settleKind} from "../../util/util";
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
                Alert.alert(``,`로그인 후 확인 가능합니다.`);
                return navigation.replace(`로그인`);
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
    const [CanceDlList, setOrderList] = useState(cancel_d_List);     // 발주현황 출력


    console.log(gd_order,`\n/[발주정보]`);
    console.log(gd_cancel,`\n/[발주취소 정보]`);
    console.log(A_order_cancel_item,`\n/[발주취소 자재 리스트]`);


    return (
        <>
            <ScrollView style={[bg_white]}>
                <View style={[styles.Detail_page_top,d_flex,justify_content_center]}>

                    {(gd_cancel.refund_status === 'done') ? (
                        <Text style={[text_danger,h21]}>처리완료 되었습니다.</Text>
                    ):(
                        <Text style={[text_primary,h21]}>처리중입니다.</Text>
                    )}

                </View>
                {/**/}
                <View style={[FormStyle.FormGroup]}>
                    {/**----------------------------------------------공사명--------------------------------------------------**/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <Text style={[FormStyle.FormLabel]}>공사명</Text>
                        <Text style={[input,{paddingTop:12},bg_light]}>{gd_order.work_name}</Text>
                    </View>
                    {/**----------------------------------------------배송지주소 입력--------------------------------------------------**/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <Text style={[FormStyle.FormLabel]}>배송지</Text>
                        <View style={[d_flex,align_items_center]}>
                            {/*우편번호*/}
                            <Text style={[input,{paddingTop:12},bg_light]}>{gd_order.zonecode}</Text>
                        </View>
                    </View>
                    {/**----------------------------------------------주소입력--------------------------------------------------**/}
                    <View style={{paddingBottom:15,}}>
                        <Text style={[input,{paddingTop:12},bg_light]}>{gd_order.addr1}</Text>
                    </View>
                    {/**----------------------------------------------상세주소--------------------------------------------------**/}
                    <View>
                        <Text style={[input,{paddingTop:12},bg_light]}>{gd_order.addr2}</Text>
                    </View>
                    {/*==============현장인도자 성명==============*/}
                    <View style={[FormStyle.FormGroupItems,mt2]}>
                        <Text style={[FormStyle.FormLabel]}>현장인도자 성명</Text>
                        <Text style={[input,{paddingTop:12},bg_light]}>{gd_order.recv_name}</Text>
                    </View>

                    {/*==============현장인도자 연락처==============*/}
                    <View style={[FormStyle.FormGroupItems]}>
                        <View>
                            <Text style={[FormStyle.FormLabel]}>현장인도자 연락처</Text>
                            <Text style={[input,{paddingTop:12},bg_light]}>
                                {(gd_order.recv_mobile) && (
                                    <>
                                        {Phone(gd_order.recv_mobile)}
                                    </>
                                )}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.CancelDetail_sec]}>
                    <View style={[container]}>
                        <Text style={[h18]}>환불 요청 자재</Text>
                    </View>
                    <View style={gray_bar2}/>
                    <View style={[styles.CancelDetail_list]}>
                        {A_order_cancel_item.map((val,i)=>(
                            <>
                                <View style={[styles.CancelDetail_list_items]} key={i}>
                                    <View style={[container]}>
                                        <Text style={[h14,mb1]}>{val.goods_name}</Text>
                                        <View style={[flex_between_bottom]}>
                                            <View style={[flex_end]}>
                                                <Image style={styles.goods_thum} source={{uri:`http://www.zazaero.com${val.img_list}`}}/>
                                                <View style={[ms2]}>
                                                    <View style={[flex]}>
                                                        <Text style={[h14,fw500]}>기존수량 : </Text>
                                                        <Text style={[h14]}>{val.src_cnt} 개</Text>
                                                    </View>
                                                    <View style={[flex]}>
                                                        <Text style={[h14,fw500,text_danger]}>취소수량 : </Text>
                                                        <Text style={[h14,text_danger]}>-{val.cancel_cnt} 개</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={justify_content_end}>
                                                <Text style={[h13]}>( 단가 : {Price(val.price)}원)</Text>
                                                {/*단가*/}
                                                <Text style={[h13]}>
                                                    취소금액
                                                </Text>
                                                <Text style={[h16]}>{Price(val.refund_goods_price * val.cancel_cnt)} 원</Text>
                                                {/*총금액*/}

                                                {(Number(val.refound_opt_price) > 0) && (
                                                    <>
                                                        <Text style={[h12]}>
                                                            환불요청옵션비
                                                        </Text>
                                                        <Text style={[h12]}>
                                                            {Price(val.refund_opt_price)}원
                                                        </Text>
                                                    </>
                                                )}
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
                                    {0 >= Number(gd_order.settleprice) ? (
                                        <>
                                            전액포인트 사용
                                        </>
                                    ):(
                                        <>
                                            {settleKind(gd_order.settlekind)}
                                        </>
                                    )}
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
                                    {Price(gd_cancel.sum_refund_goods_price)}원
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
                                    {Price(gd_cancel.sum_refund_opt_price)}원
                                </Text>
                            </View>
                        </View>
                        {(gd_cancel.deli_status === 'done') && (
                            <>
                                <View style={[flex]}>
                                    {/**----------------------발주신청일--------------------------**/}
                                    <View style={[styles.wt30]}>
                                        <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>환불 합계금액</Text>
                                    </View>
                                    <View style={[styles.wt70]}>
                                        <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                            {Price(gd_cancel.sum_refund_money)}원
                                        </Text>
                                    </View>
                                </View>
                                <View style={[flex]}>
                                    {/**----------------------발주신청일--------------------------**/}
                                    <View style={[styles.wt30]}>
                                        <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>환불 차감금액</Text>
                                    </View>
                                    <View style={[styles.wt70]}>
                                        <Text style={[styles.GoodsDetail_info_txt_val,text_danger,styles.GoodsDetail_price_val]}>
                                            -{Price(gd_cancel.sum_de_refund_money)}원
                                        </Text>
                                    </View>
                                </View>
                            </>
                        )}
                        {(gd_cancel.deli_status === 'ready') && (
                            <>
                                <View style={[flex]}>
                                    {/**----------------------발주신청일--------------------------**/}
                                    <View style={[styles.wt30]}>
                                        <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>배송비</Text>
                                    </View>
                                    <View style={[styles.wt70]}>
                                        <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                            {Price(gd_cancel.refund_deli_price)}원
                                        </Text>
                                    </View>
                                </View>
                            </>
                        )}
                        <View style={[flex]}>
                            {/**----------------------발주신청일--------------------------**/}
                            <View style={[styles.wt30]}>
                                <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>총 환불금액</Text>
                            </View>
                            <View style={[styles.wt70]}>
                                <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                    {Price(gd_cancel.sum_set_refund_money)}원
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
                                    {Price(gd_cancel.real_refund_cash)}원
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
                                    {Price(gd_cancel.real_refund_point)}P
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/*결제정보*/}
                    {(gd_order.settlekind === 'bank') && (
                        <>
                            {(gd_cancel.refund_status === 'done') && (
                                <>
                                    <View style="">
                                        <View style={container}>
                                            <Text style={[h18]}>환불계좌 정보</Text>
                                        </View>
                                        <View style={[flex,mt1]}>
                                            {/**----------------------송금완료일시--------------------------**/}
                                            <View style={[styles.wt30]}>
                                                <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>송금완료일시</Text>
                                            </View>
                                            <View style={[styles.wt70]}>
                                                <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                    {DateChg(gd_cancel.refund_bank_send_date)}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={[flex]}>
                                            {/**----------------------은행명--------------------------**/}
                                            <View style={[styles.wt30]}>
                                                <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>은행명</Text>
                                            </View>
                                            <View style={[styles.wt70]}>
                                                <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                    {BankCode.map(val=>{
                                                        if(val.value === String(gd_cancel.refund_bank_code)) {
                                                            return val.label;
                                                        }
                                                    })}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={[flex]}>
                                            {/**----------------------계좌번호--------------------------**/}
                                            <View style={[styles.wt30]}>
                                                <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>계좌번호</Text>
                                            </View>
                                            <View style={[styles.wt70]}>
                                                <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                    {gd_cancel.refund_bank_no}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={[flex]}>
                                            {/**----------------------예금주--------------------------**/}
                                            <View style={[styles.wt30]}>
                                                <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>예금주</Text>
                                            </View>
                                            <View style={[styles.wt70]}>
                                                <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                    {gd_cancel.refund_bank_owner}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={[flex]}>
                                            {/**----------------------송금자--------------------------**/}
                                            <View style={[styles.wt30,borderBottom1]}>
                                                <Text style={[styles.GoodsDetail_info_txt,{textAlign: "left"}]}>송금자</Text>
                                            </View>
                                            <View style={[styles.wt70,borderBottom1]}>
                                                <Text style={[styles.GoodsDetail_info_txt_val,styles.GoodsDetail_price_val]}>
                                                    {gd_cancel.refund_bank_send_name}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    {/*환불계좌정보*/}
                                </>
                            )}

                        </>
                    )}
                    <View style={[padding_bottom2]} />
                </View>
                {/**/}
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