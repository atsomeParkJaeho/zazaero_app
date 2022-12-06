import React from 'react';
import {View, Image, Text, StyleSheet,TouchableOpacity} from 'react-native'

//개인정보약관 탭영역 표출
export default function ProvisionTap({content}){
    return(


            <View style={styles.NoticeView_disc_in}>
                <Text style={styles.NoticeView_disc}>
                        {content.desc}
                </Text>
            </View>



    )
}

const styles = StyleSheet.create({

    NoticeView_disc:{
        fontSize:12,
        color:'#333',
    }
})
