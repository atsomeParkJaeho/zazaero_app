import {ScrollView, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {d_flex, justify_content_end, text_center} from "../../common/style/AtStyle";
import React, {useState} from "react";

function PriModal({priId}) {

    const [show, hide] = useState(priId);
    const close = () => {
        hide(``);
    }

    if(show) {
        return(
            <>
                <View style={[styles.modal]}>
                    <View>
                        <Text style={[text_center]}>약관처리방침</Text>
                    </View>
                    <ScrollView style={{height:250}}>

                    </ScrollView>
                    <View style={[d_flex, justify_content_end]}>
                        <TouchableOpacity onPress={close}>
                            <Text>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }
}

export default PriModal;

const styles = StyleSheet.create({
    modal:{
        position:"absolute",
        borderWidth:1,
        backgroundColor:"#fff",
        borderColor:"#f0f0f0",
        zIndex:99,
        width:"90%",
        padding:15,
        left:"5%",
        top:"20%",
    },
});