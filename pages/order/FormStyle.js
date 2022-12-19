import {StyleSheet} from "react-native";

export const FormStyle = StyleSheet.create({
   FormGroup: {paddingTop:21, paddingLeft:16, paddingRight:16, paddingBottom:26,
   borderBottomColor:"#EDEDF1", borderBottomWidth:8,},
   FormGroupItems:{paddingBottom:14,},
   FormLabel : {fontSize:14, paddingBottom:13, color:"#333",},
   FormTitle:{fontSize:16, color:"#333", paddingBottom:16,},
   InputStyle:{borderWidth:1,
      borderColor:"#EDEDF1",
      fontSize:14,
      paddingBottom:13,
      paddingTop:8,
      paddingLeft:12,
      paddingRight:8,
   },
   FormDate : {
      borderWidth:1,
      borderColor:"#EDEDF1",
      borderStyle:"dashed",
      paddingTop:21,
      paddingLeft:16, paddingRight:16, paddingBottom:20,},
   FormDateLabel : {
      fontSize:14,
   }
});