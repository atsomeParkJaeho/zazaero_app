import {Platform, StyleSheet} from "react-native";

export const styles = StyleSheet.create({});


export const padding_bottom = {
    paddingBottom: 100,
}

export const sub_page = {      // 하단 간격 설정
    height:"100%",
    marginBottom:100,
}

export const container = {      // 하단 간격 설정
    padding:16,
    width:"100%",
}

export const min_height = {
    height:"100%",
}

// export const bg_white = {
//     backgroundColor:"#fff",
//     height:"100%",
// }

export const text_center = {textAlign:"center"}
export const text_left = {textAlign:"left"}
export const text_right = {textAlign:"right"}

export const pos_center = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
}


//active 상태
export const active_link = { borderBottomWidth:5, borderColor:"#3D40E0"}
export const active_txt = { color:"#3D40E0",}

//switch 상태
export const switch_bar = { transform: Platform.OS === 'ios' ? [{ scaleX: .7 }, { scaleY: .7 }] : [{ scaleX: 1 }, { scaleY: 1 }] ,}

//count_button 상태
export const count_btn = {
    alignItems: "center",
    borderColor:"#EDEDF1",
    height:36,
    borderWidth:1,
    width:30,
}
export const count_btn_txt = {
    fontSize:  Platform.OS === 'ios' ? 18 : 14,
    fontWeight:"500",
}

// 폰트사이즈 설정
export const h12 = {fontSize:12, lineHeight: 21,}
export const h13 = {fontSize:13, lineHeight: 21,}
export const h14 = {fontSize:14, lineHeight: 21,}
export const h15 = {fontSize:15, lineHeight: 22,}
export const h16 = {fontSize:16, lineHeight: 24,}
export const h17 = {fontSize:17, lineHeight: 25,}
export const h18 = {fontSize:18, lineHeight: 27,}
export const h19 = {fontSize:19, lineHeight: 28,}
export const h20 = {fontSize:20, lineHeight: 30,}
export const h21 = {fontSize:21, lineHeight: 31,}
export const h22 = {fontSize:22, lineHeight: 33,}
export const h23 = {fontSize:23, lineHeight: 34,}
export const h24 = {fontSize:24, lineHeight: 36,}
export const h25 = {fontSize:25, lineHeight: 37,}
export const h26 = {fontSize:26, lineHeight: 39,}
export const h27 = {fontSize:27, lineHeight: 40,}
export const h28 = {fontSize:28, lineHeight: 42,}
export const h29 = {fontSize:29, lineHeight: 43,}
export const h30 = {fontSize:30, lineHeight: 45,}

// 폰트두계 설정
export const fw100 = {fontWeight:"100"}
export const fw200 = {fontWeight:"200"}
export const fw300 = {fontWeight:"300"}
export const fw400 = {fontWeight:"400"}
export const fw500 = {fontWeight:"500"}
export const fw600 = {fontWeight:"600"}
export const fw700 = {fontWeight:"700"}
export const fw800 = {fontWeight:"800"}
export const fw900 = {fontWeight:"900"}

// margin 설정
export const m1 = {margin:10}
export const m2 = {margin:20}
export const m3 = {margin:30}
export const m4 = {margin:40}
export const m5 = {margin:50}
export const m6 = {margin:60}
export const m7 = {margin:70}
export const m8 = {margin:80}
export const m9 = {margin:90}
export const m10 = {margin:100}
//
export const mt1 = {marginTop:10}
export const mt2 = {marginTop:20}
export const mt3 = {marginTop:30}
export const mt4 = {marginTop:40}
export const mt5 = {marginTop:50}
export const mt6 = {marginTop:60}
export const mt7 = {marginTop:70}
export const mt8 = {marginTop:80}
export const mt9 = {marginTop:90}
export const mt10 = {marginTop:100}
//
export const mb1 = {marginBottom:10}
export const mb2 = {marginBottom:20}
export const mb3 = {marginBottom:30}
export const mb4 = {marginBottom:40}
export const mb5 = {marginBottom:50}
export const mb6 = {marginBottom:60}
export const mb7 = {marginBottom:70}
export const mb8 = {marginBottom:80}
export const mb9 = {marginBottom:90}
export const mb10 = {marginBottom:100}
//
export const ms1 = {marginLeft:10}
export const ms2 = {marginLeft:20}
export const ms3 = {marginLeft:30}
export const ms4 = {marginLeft:40}
export const ms5 = {marginLeft:50}
export const ms6 = {marginLeft:60}
export const ms7 = {marginLeft:70}
export const ms8 = {marginLeft:80}
export const ms9 = {marginLeft:90}
export const ms10 = {marginLeft:100}
//
export const me1 = {marginRight:10}
export const me2 = {marginRight:20}
export const me3 = {marginRight:30}
export const me4 = {marginRight:40}
export const me5 = {marginRight:50}
export const me6 = {marginRight:60}
export const me7 = {marginRight:70}
export const me8 = {marginRight:80}
export const me9 = {marginRight:90}
export const me10 = {marginRight:100}

// padding 설정
export const p1 = {padding:10}
export const p2 = {padding:20}
export const p3 = {padding:30}
export const p4 = {padding:40}
export const p5 = {padding:50}
export const p6 = {padding:60}
export const p7 = {padding:70}
export const p8 = {padding:80}
export const p9 = {padding:90}
export const p10 = {padding:100}
//
export const pt1 = {paddingTop:10}
export const pt2 = {paddingTop:20}
export const pt3 = {paddingTop:30}
export const pt4 = {paddingTop:40}
export const pt5 = {paddingTop:50}
export const pt6 = {paddingTop:60}
export const pt7 = {paddingTop:70}
export const pt8 = {paddingTop:80}
export const pt9 = {paddingTop:90}
export const pt10 = {paddingTop:100}
//
export const pb1 = {paddingBottom:10}
export const pb2 = {paddingBottom:20}
export const pb3 = {paddingBottom:30}
export const pb4 = {paddingBottom:40}
export const pb5 = {paddingBottom:50}
export const pb6 = {paddingBottom:60}
export const pb7 = {paddingBottom:70}
export const pb8 = {paddingBottom:80}
export const pb9 = {paddingBottom:90}
export const pb10 = {paddingBottom:100}
//
export const ps1 = {paddingLeft:10}
export const ps2 = {paddingLeft:20}
export const ps3 = {paddingLeft:30}
export const ps4 = {paddingLeft:40}
export const ps5 = {paddingLeft:50}
export const ps6 = {paddingLeft:60}
export const ps7 = {paddingLeft:70}
export const ps8 = {paddingLeft:80}
export const ps9 = {paddingLeft:90}
export const ps10 = {paddingLeft:100}
//
export const pe1 = {paddingRight:10}
export const pe2 = {paddingRight:20}
export const pe3 = {paddingRight:30}
export const pe4 = {paddingRight:40}
export const pe5 = {paddingRight:50}
export const pe6 = {paddingRight:60}
export const pe7 = {paddingRight:70}
export const pe8 = {paddingRight:80}
export const pe9 = {paddingRight:90}
export const pe10 = {paddingRight:100}

// width 설정
export const wt1 = {width:"10%"}
export const wt2 = {width:"20%"}
export const wt3 = {width:"30%"}
export const wt4 = {width:"40%"}
export const wt5 = {width:"50%"}
export const wt6 = {width:"60%"}
export const wt7 = {width:"70%"}
export const wt8 = {width:"80%"}
export const wt9 = {width:"90%"}
export const wt10 = {width:"100%"}


// 폼 이동 버튼 설정
export const btn_box  = {position:"absolute", left:0, bottom:0, width:"100%", backgroundColor: "#B1B2C3"}

// 가로 세로 설정

export const d_none = {display:"none",}
export const d_flex = {flexDirection:"row",}
export const justify_content_start = { justifyContent:"flex-start" }
export const justify_content_end = {justifyContent:"flex-end"}
export const justify_content_center = {justifyContent: "center"}
export const justify_content_between = {justifyContent: "between"}
export const justify_content_around = {justifyContent: "around"}
export const justify_content_evenly = {justifyContent: "space-evenly"}

export const align_items_start = {alignItems: "flex-start"}
export const align_items_end = {alignItems: "flex-end"}
export const align_items_center = {alignItems: "center"}
export const align_items_baseline = {alignItems: "baseline"}
export const align_items_stretch = {alignItems: "stretch"}


// 원모양 만들기
export const btn_circle = {
    width:37,
    height:37,
    borderRadius:37,
}

// 색상 클래스
export const text_primary = {color:"#3D40E0",}
export const text_secondary = {color:"#15db95",}
export const text_success = {color:"#5cc9a7",}
export const text_info = {color:"#50b5ff",}
export const text_warning = {color:"#FFBE3D",}
export const text_danger = {color:"#F24A64",}
export const text_white = {color:"#fff",}
export const text_dark = {color:"#08052f",}
export const text_black = {color:"#000",}
export const text_gray = {color:"#B1B2C3",}
export const text_light = {color:"#F9F9FB",}

export const bg_primary = {backgroundColor:"#3D40E0",}
export const bg_secondary = {backgroundColor:"#15db95",}
export const bg_success = {backgroundColor:"#5cc9a7",}
export const bg_info = {backgroundColor:"#50b5ff",}
export const bg_warning = {backgroundColor:"#FFBE3D",}
export const bg_danger = {backgroundColor:"#F24A64",}
export const bg_white = {backgroundColor:"#fff", }
export const bg_dark = {backgroundColor:"#08052f",}
export const bg_black = {backgroundColor:"#000",}
export const bg_gray = {backgroundColor:"#B1B2C3",}
export const bg_light = {backgroundColor:"#F9F9FB",}

// 버튼 설정
export const btn_primary = {backgroundColor:"#3D40E0", color:"#FFF",}
export const btn_secondary = {backgroundColor:"#15db95", color:"#FFF",}
export const btn_success = {backgroundColor:"#5cc9a7", color:"#FFF",}
export const btn_info = {backgroundColor:"#50b5ff", color:"#FFF",}
export const btn_warning = {backgroundColor:"#FFBE3D", color:"#FFF",}
export const btn_danger = {backgroundColor:"#F24A64", color:"#FFF",}
export const btn_white = {backgroundColor:"#fff", color:"#FFF",}
export const btn_dark = {backgroundColor:"#08052f", color:"#FFF",}
export const btn_black = {backgroundColor:"#000", color:"#FFF",}
export const btn_gray = {backgroundColor:"#B1B2C3", color:"#3E3E4C",}
export const btn_light = {backgroundColor:"#F9F9FB", color:"#3E3E4C",}

export const btn_outline_primary = {borderColor:"#3D40E0", borderWidth:1, color:"#3D40E0",}
export const btn_outline_secondary = {borderColor:"#15db95", borderWidth:1, color:"#15db95",}
export const btn_outline_success = {borderColor:"#5cc9a7", borderWidth:1, color:"#5cc9a7",}
export const btn_outline_info = {borderColor:"#50b5ff", borderWidth:1, color:"#50b5ff",}
export const btn_outline_warning = {borderColor:"#FFBE3D", borderWidth:1, color:"#FFBE3D",}
export const btn_outline_danger = {borderColor:"#F24A64", borderWidth:1, color:"#F24A64",}
export const btn_outline_white = {borderColor:"#fff", borderWidth:1, color:"#fff",}
export const btn_outline_dark = {borderColor:"#08052f", borderWidth:1, color:"#08052f",}
export const btn_outline_black = {borderColor:"#000", borderWidth:1, color:"#000",}
export const btn_outline_gray = {borderColor:"#B1B2C3", borderWidth:1, color:"#B1B2C3",}
export const btn_outline_light = {borderColor:"#F9F9FB", borderWidth:1, color:"#F9F9FB",}




export const flex = {
    flexDirection:"row",
    alignItems:"center",
}
export const flex_end = {
    flexDirection:"row",
    alignItems:"flex-end",

}
export const flex_top = {
    flexDirection:"row",
    alignItems:"flex-start",
}
export const flex_between = {
    flexDirection:"row",
    alignItems:"center",
    justifyContent: "space-between",
}
export const flex_between_bottom = {
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent: "space-between",
}
export const flex_between_top = {
    flexDirection:"row",
    alignItems:"flex-start",
    justifyContent: "space-between",
}
export const flex_around = {
    flexDirection:"row",
    alignItems:"center",
    justifyContent: "space-around",
}

export const input = {
    width:"100%",
    height: 46,
    margin: 0,
    borderWidth: 1,
    paddingVertical:7,
    paddingHorizontal: 18,
    borderColor:"#ededf1",
    fontSize:12,
    color:"#000",
    borderRadius: 5,
}
export const countinput = {
    width:60,
    textAlign:"center",
    height: 36,
    margin: 0,
    borderWidth: 1,
    paddingVertical:7,
    paddingHorizontal: 18,
    borderColor:"#ededf1",
    fontSize:12,
    color:"#000",
    text_center:'center',
}
export const textarea = {
    width:"100%",
    height: 60,
    margin: 0,
    textAlignVertical: 'top',
    borderWidth: 1,
    paddingVertical:7,
    paddingHorizontal: 18,
    borderColor:"#ededf1",
    fontSize:12,
    color:"#000",
}

export const zonecode = {
    backgroundColor:"#eaecf3",
    // borderRadius:5,
}

