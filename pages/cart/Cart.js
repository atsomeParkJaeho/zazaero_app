import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Button, TouchableWithoutFeedback,Switch} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { List } from 'react-native-paper';
import Checkbox from 'expo-checkbox';

// 공통 CSS 추가
import {
    container,
    bg_white,
    flex,
    flex_between,
    textarea,
    count_btn,
    pos_center,
    switch_bar,
    count_btn_txt, countinput
} from '../../common/style/AtStyle';
import {sub_page} from '../../common/style/SubStyle';

//이미지 추가
import col1 from "../../assets/img/co1.png";
import col2 from "../../assets/img/co2.png";
import col3 from "../../assets/img/co3.png";



export default function Cart({navigation,route}) {

    const cate_list = [ "목/형틀공사","바닥공사", "욕식공사", "도배공사"];
    const Cate_List2 = [

        {
            "ct_user_id": "1",                                  //아이디값
            "ct_tit": "일반석고보드 9.5T X 900 X 1800",           //상품명
            "ct_img": col1,                                  //이미지
            "ct_price": "13,000",                                //상품가격
            "ct_disc": "간략설명",                                //상품가격
            "ct_count": "1",                                    //상품갯수
        },
        {
            "ct_user_id": "1",                                  //아이디값
            "ct_tit": "도배장판",           //상품명
            "ct_img": col2,                                  //이미지
            "ct_price": "50,000",                                //상품가격
            "ct_disc": "간략설명",                                //상품가격
            "ct_count": "1",                                    //상품갯수
        },
        {
            "ct_user_id": "1",                                  //아이디값
            "ct_tit": "롤하스롤 벽지",           //상품명
            "ct_img": col3,                                  //이미지
            "ct_price": "9,500",                                //상품가격
            "ct_disc": "간략설명",                                //상품가격
            "ct_count": "1",                                    //상품갯수
        },

    ];

    const [state,setState] = useState(Cate_List2);
    const [ready,setReady] = useState(true)



    const [isChecked, setChecked] = useState(false);


    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    //아코디언

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //스위치

    const numberState = useState(0);
    const number = numberState[0];
    const setNumber = numberState[1];

    const [countr, setCount] = useState(0);

    const onPress = () => {
        setNumber(countr + 1);
    };

    const onIncrease = () => {
        setNumber(number * 2);
    }

    const onDecrease = () => {
        setNumber(number - 1);
    }


    // setState(Cate_List2);
     console.log(state);

    return (

        <ScrollView style={[bg_white]}>
            <View style={[styles.Cart]}>
                <View style={[container]}>
                    <View style={[flex_between]}>
                        <View style={[flex]}>
                            <Checkbox style={styles.all_check} value={isChecked} onValueChange={setChecked}  color={"#4630eb"}  />
                            <Text style={styles.all_check_txt}>전체선택(0/2)</Text>
                        </View>
                        <View style="">
                            <Text style={styles.goods_cart_del_btn}>상품삭제</Text>
                        </View>
                    </View>
                    {/* 전체선택 체크박스 영역*/}
                </View>
                <View style={[styles.cartList]}>
                    <List.Section style={styles.Section}>

                        {cate_list.map((items, index) =>

                            <List.Accordion
                                style={[container,styles.Accordion_tit]}
                                title={[items]}
                                key={index}
                                left={ props =>  <Checkbox style={[styles.all_check]}
                                value={isChecked}
                                onValueChange={setChecked}
                                color={"#4630eb"}  />}
                            >
                                <View style={styles.Accordion_items}>
                                    <View style={[styles.Accordion_itemsflex]}>
                                        {state.map((cart_items,i)=>
                                            <View style={styles.pb_2}>
                                                <View style={[flex_between,styles.pd_18]}>
                                                    <View style={[flex]}>
                                                        <Checkbox style={styles.all_check} value={isChecked} onValueChange={setChecked}  color={"#4630eb"}  />
                                                        <Text style={styles.all_check_txt}>{cart_items.ct_tit} </Text>
                                                    </View>
                                                    <View style="">
                                                        <Icon name="close" size={25} color="#000"/>
                                                    </View>
                                                </View>
                                                <View style={[flex]}>
                                                    <View style={[styles.flex_items,styles.flex_items1]}>
                                                        <Image style={styles.cart_goods_img} source={cart_items.ct_img}/>
                                                    </View>
                                                    <View style={[styles.flex_items,styles.flex_items2]}>
                                                        <View style={[flex_between,styles.pd_20]}>
                                                            <View style="">
                                                                <Text style={styles.goods_disc}>{cart_items.ct_disc} </Text>
                                                            </View>
                                                            <View style="">
                                                                <Text style={styles.goods_price}>{cart_items.ct_price}원 </Text>
                                                            </View>
                                                        </View>
                                                        <View style={[flex]}>
                                                            <TouchableWithoutFeedback >
                                                                <View style={[count_btn]}>
                                                                    <View style={[pos_center]}>
                                                                        <Text style={[count_btn_txt]}>－</Text>
                                                                    </View>
                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                            <TextInput style={[countinput,]}   value="1" />
                                                            <TouchableWithoutFeedback >
                                                                <View style={[count_btn]}>
                                                                    <View style={[pos_center]}>
                                                                        <Text style={[count_btn_txt]}>＋</Text>
                                                                    </View>
                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={flex_between}>
                                                    <Text style={styles.Request_txt}>이 자재에 모델명, 제작관련 등 요청사항이 있으신가요?</Text>
                                                    <Switch
                                                        trackColor={{ false: "#767577", true: "#4630eb" }}
                                                        thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                                                        ios_backgroundColor="#3e3e3e"
                                                        onValueChange={toggleSwitch}
                                                        value={isEnabled}
                                                        style={[switch_bar]}
                                                    />
                                                </View>
                                                <TextInput style={textarea}   multiline={true} numberOfLines={4}    placeholder="" value=""/>
                                                {/**/}
                                            </View>
                                        )}

                                    </View>
                                </View>
                            </List.Accordion>
                        )}

                    </List.Section>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    all_check:{
        borderRadius:5,
    },
    all_check_txt:{
        marginLeft:5,
    },
    goods_cart_del_btn:{
        fontSize:12,
        color:"#a0aec0",
    },
    Accordion_tit:{
        backgroundColor:"#f9f9fb",
        borderBottomWidth:1,
        borderColor:"#ededf1",
    },
    Accordion_items:{
        paddingVertical:10,
        paddingHorizontal:16,
        paddingLeft:16,
    },
    pd_18:{
        paddingBottom:18,
    },
    pd_20:{
        paddingBottom:20,
    },
    flex_items1:{
        width:"30%",
    },
    flex_items2:{
        width:"70%",
    },
    cart_goods_img:{
        borderRadius:5,
        width:90,
        height:80,
    },
    goods_disc:{
        fontSize:14,
        color:"#4549e0",
    },
    goods_price:{
        fontSize:22,
        color:"#222",
        letterSpacing:-1,
    },
    input: {
        width:"auto",
        height: 36,
        margin: 0,
        borderWidth: 1,
        paddingVertical:7,
        paddingHorizontal: 18,
        borderColor:"#ededf1",
        fontSize:12,
        color:"#000",
        textAlign:"center",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 8,
        borderWidth:1,
        borderColor:"#eee",

    },
    button_txt:{
        fontSize:12,
        fontWeight:"600",
    },
    Request_txt:{
        fontSize:13,
    },
    pb_2:{
        borderBottomWidth:1,
        borderColor:"#999",
        paddingBottom:20,
        marginBottom:20,
    },
});