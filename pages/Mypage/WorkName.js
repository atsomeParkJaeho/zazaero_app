import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';


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
    text_right, text_light, text_info, text_gray, wt7, h15, flex_top, text_black, h18, h17, fw500
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';
import {get_Member, get_my_point_log} from "../UTIL_mem";
import {get_work_name} from "../order/UTIL_order";
import {DateChg} from "../../util/util";
import Spinner from "../board/inquiry/spiner";


export default function WorkName({navigation,route}) {

    const [Mebmer ,setMember]           = useState(``);
    const [work_name, set_work_name]    = useState([]);
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
                return console.log('마지막 페이지 입니다.');
            } else if(Number(now_page) >= Number(get_page) ) {
                return console.log('1페이지만 있습니다.');
            } else {
                get_work_name(Mebmer,next_page).then((res)=>{
                    if(res) {
                        const {result, A_work_info, total_page, now_page} = res.data;
                        if(result === 'OK') {
                            set_work_name([...work_name, ...A_work_info]);
                            set_page(total_page);
                            set_now_page(next_page);
                        } else {
                            return Alert.alert(``,`${result}`);
                        }
                    }
                });
            }
        } else if (!isEndReached && scrollEndReached) {
            setScrollEndReached(false);
        }
    };

    const go_work_name_list = (work_uid, order_cnt) => {
        if(0 >= Number(order_cnt)) {
            return Alert.alert(``,`발주현황이 존재하지 않습니다.`);
        } else {
            navigation.navigate(`공사현황발주서목록`,{work_uid:work_uid});
        }
    }


    useEffect(()=>{
        get_Member().then((res)=>{
            if(res) {setMember(res);} else {
                // Alert.alert(``,`로그인 후 확인 가능합니다.`);
            }
        });
        get_work_name(Mebmer,``).then((res)=>{
            if(res) {
                // console.log(res.data,'/콘솔');
                const {result, A_work_info, total_page, now_page} = res.data;
                if(result === 'OK') {
                    set_work_name(A_work_info);
                    set_page(total_page);
                    set_now_page(now_page);
                } else {
                    // return Alert.alert(``,`${result}`);
                }
            }
        });


    },[Mebmer]);

    console.log(Mebmer,'/회원코드');
    console.log(work_name,'/공사명 가져오기');
    console.log(get_page,'/전체 페이지');
    console.log(now_page,'/현재 페이지');

    return  (
        <>
            <ScrollView style={[bg_white]}
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            >
                <View style={[styles.ConstructionStatus]}>
                    <View style={[styles.ConstructionStatus_list,mt2]}>
                        {/**------------------------반복문 구간------------------------**/}
                        {work_name.map((val,idx)=>(
                            <>
                                <TouchableOpacity onPress={() => go_work_name_list(val.work_uid, val.order_cnt)}>
                                    <View style={[styles.bg,ms1,me1,mb1,styles.border_raound]}>
                                        <View style={[]}>
                                            <Text style={[h14,,text_right,pb1]} >첫 등록일시 : {DateChg(val.reg_date)} {val.reg_time}</Text>
                                            <View style={[flex_top]}>
                                                <View style={[wt7]}>
                                                    <Text style={[h14,]}>공사명</Text>
                                                    <Text style={[h15,,fw500]}>{val.work_name}</Text>
                                                </View>
                                                <View style={[wt3]}>
                                                    <Text style={[text_right,h14,]}>총 발주서</Text>
                                                    <Text style={[text_right,h17,,fw500]}>{val.order_cnt}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </>
                        ))}
                        <View style={[mt2]}/>
                    </View>
                </View>
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

        </>
    );
}

const styles = StyleSheet.create({
    MyPoint_list_item:{
        paddingVertical:16,
        paddingHorizontal:20,
    },
    MyPoint_title:{
        fontSize: Platform.OS === 'ios' ? 16 : 15,
        lineHeight:24,
        color:"#333",
    },
    MyPoint_date:{
        fontSize:12,
        lineHeight:22,
        color:"#B1B2C3",
    },
    MyPoint_Score:{
        fontSize: Platform.OS === 'ios' ? 16 : 15,
        lineHeight:24,
    },
    MyPoint_Score_p:{
        color:"#4549e0",
    },
    MyPoint_Score_m:{
        color:"#f25767",
    },
    ios_pb:{
        paddingBottom: Platform.OS === 'ios' ? 17 : 0,
    },
    border_bottom:{
        borderBottomWidth:1,
        borderColor:"#000",
    },
    border_bottom2:{
        borderBottomWidth:1,
        borderColor:"#ccc",
    },
    border_raound:{
        borderRadius:10,
        paddingTop:10,
        paddingBottom:20,
        paddingHorizontal:10,
    },
    bg:{
        backgroundColor:"#ededf1",
    }
});