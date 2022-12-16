import React, {useEffect, useState} from 'react'
import {View,Text,StyleSheet,Image, TouchableOpacity, ScrollView} from 'react-native'
import logo from "../assets/img/top_logo.png";
import Icon from "react-native-vector-icons/AntDesign";
import ProvisionDisc from "../ProvisionDisc.json";
import ProvisionTap from "../components/ProvisionTap";


export default function Provision(){

    const [state,setState] = useState([])
    const [cateState,setCateState] = useState([])

    //하단의 return 문이 실행되어 화면이 그려진다음 실행되는 useEffect 함수
    //내부에서 data.json으로 부터 가져온 데이터를 state 상태에 담고 있음
    const [ready,setReady] = useState(true)

    useEffect(()=>{

        //뒤의 1000 숫자는 1초를 뜻함
        //1초 뒤에 실행되는 코드들이 담겨 있는 함수
        setTimeout(()=>{


            setState(ProvisionDisc.disc)
            setCateState(ProvisionDisc.disc)
            setReady(false)
        },1000)


    },[])

    const category = (cate) =>{
        if(cate == 'Provision01'){
            setCateState(state)
        }else{
            setCateState(state.filter((d)=>{
                return d.category == cate
            }))
        }
    }


    //let Provisiontest = Provision.disc;

    return  (
        <ScrollView style={styles.container}>



            <View style={styles.Provision_tap}>
               <View style={styles.Provision_tap_item}>
                    <TouchableOpacity onPress={()=>{category('Provision01')}} style={[styles.Provision_tap_item_link, styles.borderTop, styles.borderRight]} >
                        <Text style={styles.Provision_tap_item_title}>서비스 이용약관</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Provision_tap_item}>
                    <TouchableOpacity onPress={()=>{category('Provision02')}} style={[styles.Provision_tap_item_link, styles.borderTop, ]} >
                        <Text style={styles.Provision_tap_item_title}>개인정보 처리방침</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Provision_tap_item}>
                    <TouchableOpacity onPress={()=>{category('Provision03')}} style={[styles.Provision_tap_item_link, styles.borderRight, ]} >
                        <Text style={styles.Provision_tap_item_title}>전자금융거래 이용약관</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Provision_tap_item}>
                    <TouchableOpacity onPress={()=>{category('Provision04')}} style={styles.Provision_tap_item_link} >
                        <Text style={styles.Provision_tap_item_title}>홍보 및 마케팅 이용약관</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/**/}
            <View style={styles.NoticeView_disc_box}>
                {/* 개인정보처리탭영역 */}
                {
                    cateState.map((content,i)=>{
                        return ( <ProvisionTap content={content} key={i} /> )
                    })
                }
            </View>
            {/**/}



        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff",
    },
    top_inner:{
        marginTop:50,
        paddingLeft:12,
        paddingRight:12,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    top_innertwo:{
        flexDirection:"row",
        justifyContent:"space-around",
    },
    toptitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#222",
    },
    Provision_tap:{
        marginTop:30,
        flexDirection:"row",
        flexWrap:"wrap",
    },
    Provision_tap_item:{
        width:'50%',
    },
    Provision_tap_item_link:{
        padding:12,
        borderBottomWidth:1,
        borderColor:'#ededf1',
    },
    Provision_tap_item_title:{
        fontSize:14,
    },
    borderTop:{
        borderTopWidth:1,
        borderColor:'#ededf1',
    },
    borderRight:{
        borderRightWidth:1,
        borderColor:'#ededf1',
    },
    NoticeView_disc_box:{
        padding:16,
    }
})