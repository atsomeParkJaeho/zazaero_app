import React, {useState, useEffect} from 'react';
import {Camera} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import {bg_primary, h13, text_center, text_white} from "../../common/style/AtStyle";
import {Alert, Platform, StyleSheet, Text, TouchableOpacity} from "react-native";
import {View} from "react-native-web";

export default function CameraModal({route, navigation}) {


    const {get_gd_order, addr1, addr2, zonecode, save_pic_list} = route.params;

    const [Member, setMember] = useState(``);
    const [camera, set_camera] = useState(null);
    const [media, set_media] = useState(null);
    const [picture, set_picture] = useState([]);

    useEffect(()=>{
        get_ready();
    },[Member]);

    /**-------------------1. 카메라 버튼--------------------------------**/
    const PicButton = async () => {
        try {
            const photo  = await camera.takePictureAsync({ base64: true });
            const save_pic  = await MediaLibrary.createAssetAsync(photo.uri);
            console.log(save_pic,'/[사진 데이터]');
            if(save_pic) {
                set_picture([...picture, save_pic]);
                let data = {
                    get_gd_order:get_gd_order,
                    addr1:addr1,
                    addr2:addr2,
                    zonecode:zonecode,
                    save_pic_list: {uri:photo.uri,base64:photo.base64},
                }
                return navigation.navigate(`반품요청`,data)
                // return Alert.alert(``,`사진이 저장되었습니다.`);
            } else {

            }
        } catch (err) {
            Alert.alert(``,`${err}`);
        }
    }

    /**-------------------2. 카메라 모듈 접근허용 셋팅--------------------------------**/
    const get_ready = async () => {
        const cameraStatus = await Camera.requestPermissionsAsync();
        const media_lib = await MediaLibrary.requestPermissionsAsync();
        set_camera(cameraStatus.status === "granted");
        set_camera(media_lib.status === "granted");
    }

    console.log(picture,'/[사진데이터]');
    
    return(
        <>
            {/*<View>*/}
                <Camera
                    style={{ width: "100%", height: "90%" }}
                    type={Camera.Constants.Type.back}
                    ref={(ref) => set_camera(ref)}
                />
                <TouchableOpacity onPress={PicButton} style={[styles.button,bg_primary]}>
                    <Text style={[h13,text_center,text_white]}>카메라로 사진 추가</Text>
                </TouchableOpacity>
            {/*</View>*/}
        </>
    );
}



const styles = StyleSheet.create({

    btn_default:{
        paddingTop      : 7,
        paddingBottom   : 38,
        width           : "100%",
        position        : "relative",
        left            : 0,
        bottom          : 0,
        zIndex          : 99,
        backgroundColor :"#B1B2C3",
    },

    AllGoodsChk:{
        position:"absolute",
        borderWidth:1,
        zIndex:99,
        width:"100%",
        height:"100%",
        opacity:0
    },
    CancelBtnWrap:{
        borderWidth:1,
        borderColor:"#333",
        width:"48%",
        borderRadius:5,
    },
    CancelBtn:{
        padding:10,
    },


    all_check:{
        borderRadius:5,
    },

    all_check_txt:{
        marginLeft:5,
    },

    chk_view:{
        position:"absolute",
        opacity:0,
        zIndex: 99,
        width:"100%",
    },

    PopupViewbtn:{
        width:"48%",
        padding:10,
    },

    Popupbtn:{
        justifyContent:"space-between"
    },

    PopupViewbg:{
        backgroundColor:"rgba(0, 0, 0, 0.5)",
        width:"100%",
        height:"100%",
        left:0,
        top:0,
        zIndex:200,
        position:"absolute",
    },

    PopupView :{
        position:"absolute",
        zIndex:99,
        backgroundColor:"#fff",
        padding:15,
        width:"90%",
        left:"5%",
        top:"30%",
    },

    payMement:{
        width:"100%",
    },

    payView:{
        padding:15,
        paddingBottom:30,
    },

    btn_fix:{
        flex:1,
    },

    goods_thum:{
        width:75,
        height:75,
    },

    border:{
        borderWidth:1,
        borderColor:"#EDEDF1",
        paddingVertical:12,
        paddingHorizontal:12,
        borderRadius:5,
    },
    ord_tit_list_box:{
        paddingHorizontal:10,
        paddingVertical:12,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
    },
    Recent_search_list_item:{
        paddingVertical:5,
    },
    formSelect : {
        borderWidth: 1,
        borderColor:"#e6e6e6",
        padding:10,
    },
    btn:{
        paddingVertical:10,
        paddingHorizontal:60,
        borderRadius:10,
    },
    modalStyle:{
        color:"#333",
        // backgroundColor:"rgba(255,255,255,0.5)",
    },
    border_Circle:{
        width:20,
        height:20,
        borderWidth:1,
        borderColor:"#999",
        borderRadius:50,

    },
    border_Circle_active:{
        width:13,
        height:13,
        borderRadius:50,
        backgroundColor:"#3D40E0",
    },
    CancelDetail_list_items:{
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
    },
    select_box:{
        position:"relative",
    },
    select_icon_box:{
        position: "absolute",
        top: 0,
        right: 10,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    cart_goods_img:{
        borderRadius:5,
        width:90,
        height:80,
    },
    wt25: {
        width: "25%",
        backgroundColor:"#f8f8f8",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderRightWidth:0,
        borderBottomWidth:0,
    },
    wt75: {
        width: "75%",
        padding:8,
        borderWidth:1,
        borderColor:"#ddd",
        borderLeftWidth:0,
        borderBottomWidth:0,
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
        fontSize: Platform.OS === 'ios' ? 15 : 14,
        lineHeight:24,
        fontWeight:"500",
        textAlign:"right",
    },
    select_opt_list_box:{
        paddingHorizontal:10,
        paddingVertical:12,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderColor:"#EDEDF1",
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
    },
    select_opt_list_itmes:{
        borderBottomWidth:1,
        paddingVertical:10,
        borderColor:"#eee",
    },
    // imagesContainer: {
    //     flexDirection: 'row',
    //     flexWrap: 'wrap',
    //     marginTop: 20,
    //     justifyContent:"center",
    // },
    image: {
        width: 160,
        height: 220,
        margin: 5,
        borderWidth:1,
        borderColor:"#ccc",
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        justifyContent:"center",
    },
    imageContainer: {
        position: 'relative',
        width: 160,
        height: 220,
        marginRight: 10,
        marginBottom: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: -5,
        zIndex: 1,
        backgroundColor:'red',
        borderRadius:100,
        padding:7,
    },

});