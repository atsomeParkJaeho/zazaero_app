import React, {useState, useEffect, useRef} from 'react';
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
    FlatList, Alert
} from 'react-native';


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    flex,
    h12,
    h18,
    ms1,
    h16,
    btn_primary,
    p1,
    text_light, text_center, text_white, padding_bottom
} from '../../common/style/AtStyle';
import {gray_bar, sub_page} from '../../common/style/SubStyle';
import Footer from "../Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {get_order_cancel_list} from "./UTIL_order";
import {cancelType, DateChg, Price, refundStatus} from "../../util/util";
import {get_Member} from "../UTIL_mem";
import Spinner from "../board/inquiry/spiner";

export default function Return({route, navigation}) {
    const [Member, setMember] = useState();
    const [cancel_list, set_cancel_list] = useState([]);
    const [get_page, set_page]              = useState();           // 전체 페이지
    const [now_page, set_now_page]          = useState();           // 현재 페이지
    /**--------------------스크롤 설정----------------------**/
    const scrollViewRef = useRef();
    const [scrollEndReached, setScrollEndReached] = useState(false);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 10; // adjust the value as needed

        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

        if (isEndReached && !scrollEndReached) {
            setScrollEndReached(true);
            // Alert.alert(``,`스크롤 끝`);
            /**----------------기존 스테이터스에 데이터를 추가한다.----------------**/
            let next_page = Number(now_page + 1);
            if(Number(get_page) === 1) {
                console.log('1페이지만 있습니다.');
            } else if( Number(now_page) >= Number(get_page)) {
                console.log('마지막 페이지 입니다.');
            } else {

                get_order_cancel_list(Member,next_page).then((res)=>{
                    if(res) {
                        console.log(res.data,'/ 데이터 확인');
                        const {result, gd_cancel, total_page, now_page} = res.data;
                        if(result === 'OK') {
                            let temp = gd_cancel.filter((val)=>val.deli_status === 'done');
                            set_page(total_page);       // 전체페이지
                            set_now_page(next_page);     // 현재페이지
                            set_cancel_list(temp);      // 취소리스트 불러오기
                        } else {
                            Alert.alert('',`${result}`);
                        }
                    }
                });

            }
        } else if (!isEndReached && scrollEndReached) {
            setScrollEndReached(false);
        }
    };

    /**1. 발주취소 내역 리스트 출력 **/
    useEffect(()=>{

        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                Alert.alert(``,`실패`);
            }
        });

        get_order_cancel_list(Member,``).then((res)=>{
            if(res) {
                console.log(res.data,'/ 데이터 확인');
                const {result, gd_cancel, total_page, now_page} = res.data;
                if(result === 'OK') {
                    let temp = gd_cancel.filter((val)=>val.deli_status !== 'done');
                    set_page(total_page);       // 전체페이지
                    set_now_page(now_page);     // 현재페이지
                    set_cancel_list(temp);      // 취소리스트 불러오기
                } else {
                    Alert.alert('',`${result}`);
                }
            }
        });



    },[Member]);

    console.log(cancel_list,'/ [결제취소 리스트1]');
    console.log(Member,'/ 회원 코드12');
    console.log(get_page,'/ 전체 페이지');
    console.log(now_page,'/ 현재 페이지');

    return(
        <>
            {/**=================================탭===================================================**/}
            <View style={[styles.Tab, flex, bg_white]}>
                <View style={[styles.InquiryTab_item]}>
                    <TouchableOpacity style={[styles.InquiryTab_link]} onPress={() => {
                        navigation.navigate('취소내역')
                    }}>
                        <Text style={[styles.InquiryTab_txt]}>취소내역</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.InquiryTab_item]}>
                    <TouchableOpacity style={[styles.InquiryTab_link, styles.active_link]} onPress={() => {
                        navigation.navigate('반품내역')
                        // Alert.alert('준비중입니다.');
                    }}>
                        <Text style={[styles.InquiryTab_txt, styles.active_txt]}>반품내역</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/**==============================--리스트--================================================**/}
            <ScrollView
                style={[bg_white]}
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/**반복문 구간**/}
                {cancel_list.map((val,idx)=>(
                    <>
                        <View style={[styles.order_list_items]} key={idx}>
                            <View style={[styles.order_list_items]}>
                                <View style={[container]}>
                                    {/**--------------------발주번호----------------------------**/}
                                    <View style={[flex, styles.mb_5]}>
                                        <View style={[styles.wt3]}>
                                            <Text style={[styles.goods_num, styles.ft_16]}> 발주번호 : </Text>
                                        </View>
                                        <View style={[styles.wt7]}>
                                            <Text
                                                style={[styles.ft_16, styles.fw_6]}>{val.order_no}</Text>
                                        </View>
                                    </View>
                                    {/**--------------------공사명----------------------------**/}
                                    <View style={[flex, styles.mb_5]}>
                                        <View style={[styles.wt3]}>
                                            <Text style={[styles.Construction_name, styles.ft_14]}> 취소일 :</Text>
                                        </View>
                                        <View style={[styles.wt7]}>
                                            <Text
                                                style={[styles.ft_14]}>{DateChg(val.reg_date)} {val.reg_time}</Text>
                                        </View>
                                    </View>
                                    {/**--------------------공사명----------------------------**/}
                                    <View style={[flex, styles.mb_5]}>
                                        <View style={[styles.wt3]}>
                                            <Text style={[styles.Construction_name, styles.ft_14]}> 공사명 :</Text>
                                        </View>
                                        <View style={[styles.wt7]}>
                                            <Text
                                                style={[styles.ft_14]}>{val.work_name}</Text>
                                        </View>
                                    </View>
                                    {/**--------------------수거지----------------------------**/}
                                    <View style={[flex]}>
                                        <View style={[styles.wt3]}>
                                            <Text style={[styles.ft_14, val.text_gray]}> 반품 수거지:</Text>
                                        </View>
                                        <View style={[styles.wt7]}>
                                            <Text style={[styles.ft_14, styles.text_gray]}>
                                                {val.zonecode} {val.addr1} {val.addr2}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.border_b_dotted]}></View>
                                <View style={[container]}>
                                    <View style={[flex_between]}>
                                        <View style={[styles.wt2]}>
                                            <TouchableOpacity style={[btn_primary, p1,]} onPress={()=>navigation.navigate('취소내역상세',{gd_cancel_uid:val.gd_cancel_uid, gd_order_uid:val.gd_order_uid})}>
                                                <Text style={[text_center, text_white]}>상세내역 </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style="">
                                            <View style={[flex, styles.justify_content_end]}>
                                                {(val.refund_status === 'done') ? (
                                                    <>
                                                        <Text>처리완료</Text>
                                                    </>
                                                ):(
                                                    <>
                                                        <Text>{cancelType(val.cancel_type)}</Text>
                                                    </>
                                                )}

                                            </View>
                                            <View style="">
                                                <View style={flex}>
                                                    <Text style={[h12, styles.color1]}>취소금액 :</Text>
                                                    <Text style={[ms1, h18]}>
                                                        {Price(val.sum_set_refund_money)}원
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={gray_bar}/>
                            </View>
                        </View>
                    </>
                ))}
                {(scrollEndReached && Number(get_page) >  1) && (
                    <>
                        {(Number(get_page) === Number(now_page)) ? (
                            <></>
                        ):(
                            <Spinner/>
                        )}

                    </>
                )}
            </ScrollView>
            {/**==============================--하단--================================================**/}
            <Footer navigation={navigation}/>

        </>
    );
}

const styles = StyleSheet.create({
    InquiryTab_item: {
        width: "50%",
    },
    wt4: {
        width: "40%",
    },
    InquiryTab_txt: {
        textAlign: "center",
        fontSize: 16,
        lineHeight: 24,
        paddingBottom: 16.
    },
    InquiryTab_link: {
        borderBottomWidth: 1,
        borderColor: "#ededf1"
    },
    active_txt: {
        color: "#3D40E0",
    },
    active_link: {
        borderBottomWidth: 5,
        borderColor: "#3D40E0"
    },
    ft_16: {
        fontSize: 16,
        lineHeight: 24,
    },
    ft_14: {
        fontSize: 14,
        lineHeight: 24,
    },
    fw_6: {
        fontWeight: "600",
    },
    mb_5: {
        marginBottom: 5,
    },
    border_b_dotted: {
        borderStyle: 'dashed',
        borderWidth: 1,
        margin: -2,
        borderColor: "#eee"
    },
    detail_btn: {
        borderWidth: 1,
        borderColor: "#eee",
        paddingVertical: 8,
        width: "100%",
        borderRadius: 5,
    },
    detail_btn_txt: {
        textAlign: "center",
    },
    text_danger: {
        color: "#f25767"
    },
    text_primary: {
        color: "#4549e0"
    },
    text_gray: {
        color: "#a0aec0",
    },
    wt3: {
        width: "25%",
    },
    wt7: {
        width: "75%",
    },
    color1: {
        color: "#b1b2c3",
    },
    justify_content_end: {
        justifyContent: "flex-end",
    }
});