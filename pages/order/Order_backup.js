import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, CheckBox, Text, TextInput, View, Image, TouchableOpacity, ScrollView,useWindowDimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// 공통 CSS 추가
import {container, bg_white, flex_between, input, flex, flex_top} from '../../common/style/AtStyle';
import {sub_page, gary_bar} from '../../common/style/SubStyle';

// 샘플데이터
import {order_List} from "../../util/util";


function FeedScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed!</Text>
        </View>
    );
}

function NotificationsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Notifications!</Text>
        </View>
    );
}

function ProfileScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();


function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: 'powderblue' },
            }}
        >
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{ tabBarLabel: 'Updates' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
}

export default function Order({navigation, route}) {

    const [Orderstate, setState] = useState(order_List);

    return (
        <>
            <View style={[bg_white]}>
                <View style={[styles.Order]}>
                    <NavigationContainer independent={true}>
                        <MyTabs />
                    </NavigationContainer>
                    <View style={[flex]}>
                        <TouchableOpacity style={[styles.wt_3, styles.active]} onPress={() => {
                            category('Home')
                        }}><Text style={styles.tab_txt}>발주상태</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.wt_3} onPress={() => {
                            category('Updates')
                        }}><Text style={styles.tab_txt}>결제상태</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.wt_3} onPress={() => {
                            category('Profile')
                        }}><Text style={styles.tab_txt}>배송상태</Text></TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={[styles.bt, styles.bb]}>
                        <View style={[styles.order_list]}>
                            {Orderstate.map((items, i) =>
                                <View style={[styles.order_list_items]} key={i}>
                                    <View style={[container]}>
                                        <View style={[flex, styles.mb_5]}>
                                            <View style={[styles.wt3]}>
                                                <Text style={[styles.goods_num, styles.ft_16]}> 발주번호 :</Text>
                                            </View>
                                            <View style={[styles.wt7]}>
                                                <Text
                                                    style={[styles.goods_num_val, styles.ft_16, styles.fw_6]}>{items.goods_num}</Text>
                                            </View>
                                        </View>
                                        {/*발주번호*/}
                                        <View style={[flex, styles.mb_5]}>
                                            <View style={[styles.wt3]}>
                                                <Text style={[styles.Construction_name, styles.ft_14]}> 공사명 :</Text>
                                            </View>
                                            <View style={[styles.wt7]}>
                                                <Text
                                                    style={[styles.Construction_name_val, styles.ft_14]}>{items.Construction_name}</Text>
                                            </View>
                                        </View>
                                        {/*공사명*/}
                                        <View style={[flex, styles.mb_5]}>
                                            <View style={[styles.wt3]}>
                                                <Text style={[styles.Desired_Delivery_Date_name, styles.ft_14]}> 희망배송일 :</Text>
                                            </View>
                                            <View style={[styles.wt7]}>
                                                <Text style={[styles.Desired_Delivery_Date_val, styles.ft_14]}>{items.Desired_Delivery_Date} 도착예정</Text>
                                            </View>
                                        </View>
                                        {/*희망배송일*/}
                                        <View style={[flex]}>
                                            <View style={[styles.wt3]}>
                                                <Text
                                                    style={[styles.Delivery_destination_name, styles.ft_14, styles.text_gray]}> 배송지 :</Text>
                                            </View>
                                            <View style={[styles.wt7]}>
                                                <Text style={[styles.Delivery_destination_name_val, styles.ft_14, styles.text_gray]}>{items.Delivery_destination_name}</Text>
                                            </View>
                                        </View>
                                        {/*배송지*/}
                                    </View>
                                    <View style={[styles.border_b_dotted]}></View>
                                    <View style={[container]}>
                                        <View style={[flex_between]}>
                                            <View style="">
                                                <TouchableOpacity style={styles.border} onPress="">
                                                    <Text style={styles.middleButtonText}>상세내역 / 정보변경</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={[flex]}>
                                                <Text style={[styles.ft_14]}>발주상태</Text>
                                                {(items.order_type == 'ready') ? (
                                                    <Text style={[styles.order_type,styles.text_danger]}>신청</Text>
                                                ):(
                                                    <Text style={[styles.order_type,styles.text_primary ]}>검수중</Text>
                                                )}

                                            </View>
                                        </View>
                                    </View>
                                    <View style={gary_bar}/>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={gary_bar}/>
                </ScrollView>
            </View>


        </>


    );
}

const styles = StyleSheet.create({
    wt_3: {
        width: "33.333%",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    active: {
        borderBottomWidth: 4,
        borderColor: "#4549E0",
    },
    tab_txt: {
        textAlign: "center",
        paddingVertical: 16,
    },
    bt: {
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    bb: {
        borderBottomWidthWidth: 1,
        borderColor: "#ddd",
    },
    wt3: {
        width: "25%",
    },
    wt7: {
        width: "75%",
    },
    order_list_items: {},
    ft_16: {
        fontSize: 16,
        lineHeight: 24,
    },
    ft_14: {
        fontSize: 14,
        lineHeight: 24,
    },
    fw_6: {
        fontWeight: "600",
    },
    mb_5: {
        marginBottom: 5,
    },
    border_b_dotted: {
        borderStyle: 'dashed',
        borderWidth: 1,
        margin: -2,
        borderColor: "#eee"
    },
    border: {
        borderWidth: 1,
        borderColor: "#eee",
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    order_type: {
        fontSize:16,
        lineHeight: 24,
        marginLeft: 10,
        fontWeight:"500",
    },
    text_danger:{
        color:"#f25767"
    },
    text_primary:{
        color:"#4549e0"
    },
    text_gray: {
        color: "#a0aec0",
    }
});