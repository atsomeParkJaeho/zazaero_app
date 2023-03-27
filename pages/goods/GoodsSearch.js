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
    wt7, wt3, justify_content_end
} from '../../common/style/AtStyle';
import {sub_page, gray_bar} from '../../common/style/SubStyle';
import Search from '../../icons/search.svg';
import search_none from "../../assets/img/search_none.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useIsFocused} from "@react-navigation/native";



export default function GoodsSearch({route,navigation}) {


    const [Member, setMember] = useState();
    const mem_uid                           = AsyncStorage.getItem("member").then((value)=>{setMember(value);});

    // 1. 상태정의
    const [GoodsSearch, setGoodsSearch] = useState({    // 검색어 확인
        search:'',
    });

    const [SearchLog, setSearchLog] = useState([]);     // 최근검색어
    const update = useIsFocused();

    useEffect(()=>{
        // 최근검색목록을 불러온다
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
            act_type        : "get_mem_search_log_list",
            login_status    : 'Y',
            mem_uid         :Member,
        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result, A_data} = res.data;
                // console.log(que);
                if (result === 'OK') {
                    let temp = A_data.map(val=>{
                        return {...val, log_show:true}
                    })
                    setSearchLog(temp);
                } else {
                    console.log('실패');
                }
            }
        });
    },[Member, update]);



    // 입력하기
    const ChkInput = (key, value) => {
        setGoodsSearch({
            ...GoodsSearch,
            [key]:value
        });
    }


    // 2. 검색상품 불러오기
    const goSearch = (search) => {
        console.log(search);

        // 검색상품으로 이동한다
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
                console.log(res.data,'/ [검색결과]');
                if (result === 'OK') {
                    if(A_goods.length === 0) {
                        Alert.alert('','검색하신 상품이 없습니다');
                    } else {

                        // 검색로그 저장
                        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
                            act_type        :"ins_mem_search_log",
                            login_status    :"Y",
                            find_txt        :search,
                            mem_uid         :Member,
                        }, {
                            headers: {
                                'Content-type': 'multipart/form-data'
                            }
                        }).then((res) => {
                            if (res) {
                                const {result} = res.data;
                                if (result === 'OK') {
                                    console.log('기록 저장');

                                } else {
                                    console.log('실패');
                                }
                            }
                        });

                        navigation.navigate('검색결과',{search:search});
                    }
                } else {
                    console.log('실패');
                }
            }
        });
    }


    // 3. 최근검색어 삭제
    const delLog = (uid) => {
        // 검색상품으로 이동한다
        axios.post('http://49.50.162.86:80/ajax/UTIL_app_goods.php', {
            act_type                :"del_mem_search_log",
            login_status            :"Y",
            mem_uid                 :Member,
            mem_find_txt_log_uid    :uid
        }, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res) {
                const {result} = res.data;
                console.log(result);

                let temp = SearchLog.map(val=>{
                    if(uid=== val.mem_find_txt_log_uid){
                        return {...val, log_show:false}
                    }
                    return val;
                })
                setSearchLog(temp);

            }
        });
    }


    console.log('검색어2 / ',GoodsSearch);
    console.log('최근검색어 / ',SearchLog);

    return (

        <>
            <View style={[bg_white,sub_page]}>
                <View style={container}>
                    <View style={[flex,styles.flex_center]}>
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
                    {/*검색상단*/}
                    <View style={mt3}>
                        {/*=====================================검색어가 있을때======================================*/}
                        {(SearchLog.length > 0) ? (
                            <>
                                <View style={flex_between}>
                                    <Text style={h16}>최근 검색어</Text>
                                </View>
                                <View style={[mt2]}>
                                {SearchLog.map(val=>(
                                    <>
                                        {(val.log_show) && (
                                        <View style={styles.Recent_search_list_item}>
                                            <View style={flex_between}>
                                                <View>
                                                    <TouchableOpacity
                                                    onPress={()=>goSearch(val.find_txt)}
                                                    >
                                                        <Text style={[h14,styles.txt_color2]}>
                                                            {val.find_txt}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <View style={[flex,justify_content_end]}>
                                                        <Text style={[h14,styles.txt_color]}>
                                                            {val.reg_dt}
                                                        </Text>
                                                        <TouchableOpacity style={ms2}
                                                        onPress={()=>delLog(val.mem_find_txt_log_uid)}
                                                        >
                                                            <Text style={[h14,styles.txt_color]}>X</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        )}
                                    </>
                                ))}
                                </View>
                            </>
                        ):(
                            <>
                                {/*=====================================검색어가 없을때======================================*/}
                                <View style={[mt3,styles.flex_page]}>
                                    <Image style={styles.goods_image} source={search_none}/>
                                    <Text style={[mt2,h14,styles.txt_color]}>최근 검색어가 없습니다.</Text>
                                </View>
                            </>
                        )}

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