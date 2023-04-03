import React, {useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native'


// 공통 CSS 추가
import {
    container,
    bg_white,
    flex_between,
    flex,
    h16,
    h14,
    ms1,
    mb2,
    d_flex,
    justify_content_between, align_items_start
} from '../../../common/style/AtStyle';
import {sub_page} from '../../../common/style/SubStyle';

// svg 추가
import NotificationIcon from '../../../icons/Notification_icon.svg';
import BackArrow from "../../../icons/back_arrow.svg";




export default function NotificationList({route,navigation}){
    
    const [push_list, set_push_list] = useState([]);    // 1. 푸시리스트 출력
    
    // 2. 클릭시 페이지 링크 이동
    const goLink = (page, uid) => {
        console.log('페이지 이동');
    }
    // 3. 클릭시 페이지 삭제
    const goDel = (page, uid) => {
        console.log('푸시목록 삭제');
    }
    

    // 3. 플롯리스트 설정
    function PushList({item}) {
        return (
            <>
                <TouchableOpacity onPress={()=>goLink()}>
                    <View style={styles.NotificationListItem}>
                        <View style={[flex_between,mb2]}>
                            <View style={flex}>
                                <NotificationIcon width={16} height={18} style={[styles.icon]} />
                                <Text style={h16}>{item.title}</Text>
                            </View>
                            <View style="">
                                <Text style={[h14,styles.text_color]}>{item.date}</Text>
                            </View>
                        </View>
                        <View style={[d_flex,justify_content_between, align_items_start]}>
                            <View style={{flex:0.8}}>
                                <Text style={[h14,styles.text_color,ms1,styles.text_wet]}>{item.Notification_disc}</Text>
                            </View>
                            <TouchableOpacity onPress={()=>goDel()} style={[styles.del_btn]}>
                                <Text style={{textAlign:"center"}}>삭제</Text>
                            </TouchableOpacity>
                        </View>
                        {/*답변등록*/}
                    </View>
                </TouchableOpacity>
            </>
        );
    }


    return(
        <>
            <FlatList
                style={[bg_white,sub_page]}
                data={push_list}
                keyExtractor={(val) => String(val.goods_uid)}
                renderItem={PushList}
                windowSize={3}
            />
        </>
    )
}


const styles = StyleSheet.create({
    del_btn:{borderWidth:1, flex:0.2, padding:10, textAlign:"center"},
    icon:{
        marginRight:10,
    },
    text_color:{
        color:"#B1B2C3",
    },
    NotificationListItem:{
        paddingVertical:20,
        paddingHorizontal:16,
        borderBottomWidth:1,
        borderColor:"#ccc",
    },
    text_wet:{
        fontWeight:"200",
    }
})