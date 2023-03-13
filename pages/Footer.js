import {Platform, Text, TouchableOpacity, View} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import HomeLogo from '../icons/home_logo.svg';
import HomeLogoAt from '../icons/home_logo_at.svg';
import Wish from '../icons/wish.svg';
import WishAt from '../icons/wish_at.svg';
import Cart from '../icons/cart.svg';
import CartAt from '../icons/cart_at.svg';
import OrderList from '../icons/order_list.svg';
import OrderListAt from '../icons/order_list_at.svg';
import Mypage from '../icons/mypage.svg';
import MypageAt from '../icons/mypage_at.svg';
import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fw500, pos_center, text_center, text_primary} from "../common/style/AtStyle";
import {useNavigationState} from "@react-navigation/native";





function Footer({navigation,pages}) {


    const routes = useNavigationState(state => state.routes)
    const currentRoute = routes[routes.length -1].name

    console.log(currentRoute);

    return(
        <>
            <View style={styles.FooterWrap}>
                {/**---------------------메인페이지--------------------**/}
                <View style={[styles.Tabs, styles.TextCenter]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('메인페이지')}}>
                        <View style={styles.SvgIcons}>
                            {(currentRoute === '메인페이지') ? (
                                <>
                                    <HomeLogoAt width={22} height={18}/>
                                </>
                            ):(
                                <>
                                    <HomeLogo width={22} height={18} />
                                </>
                            )}

                        </View>
                        <View>
                            <Text style={[text_center,(currentRoute === '메인페이지') &&  text_primary,fw500]}>홈</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/**---------------------즐겨찾기--------------------**/}
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('즐겨찾기')}}>
                        <View style={styles.SvgIcons}>
                            {(currentRoute === '즐겨찾기') ? (
                                <>
                                    <WishAt width={22} height={18}/>
                                </>
                            ):(
                                <>
                                    <Wish width={22} height={18}/>
                                </>
                            )}

                        </View>
                        <View>
                            <Text style={[text_center,(currentRoute === '즐겨찾기') &&  text_primary,fw500]}>즐겨찾기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/**---------------------장바구니--------------------**/}
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('장바구니')}}>
                        <View style={styles.SvgIcons}>
                            {(currentRoute === '장바구니') ? (
                                <>
                                    <CartAt width={22} height={18}/>
                                </>
                            ):(
                                <>
                                    <Cart width={22} height={18}/>
                                </>
                            )}

                        </View>
                        <View>
                            <Text style={[text_center,(currentRoute === '장바구니') &&  text_primary,fw500]}>장바구니</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/**---------------------발주상태--------------------**/}
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('발주상태')}}>
                        <View style={styles.SvgIcons}>
                            {(currentRoute === '발주상태') ? (
                                <>
                                    <OrderListAt width={22} height={18}/>
                                </>
                            ):(
                                <>
                                    <OrderList width={22} height={18}/>
                                </>
                            )}

                        </View>
                        <View>
                            <Text style={[text_center,(currentRoute === '발주상태') &&  text_primary,fw500]}>발주상태</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/**---------------------마이페이지--------------------**/}
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('마이페이지')}}>
                        <View style={styles.SvgIcons}>
                            {(currentRoute === '마이페이지') ? (
                                <>
                                    <MypageAt width={22} height={18}/>
                                </>
                            ):(
                                <>
                                    <Mypage width={22} height={18}/>
                                </>
                            )}

                        </View>
                        <View>
                            <Text style={[text_center,(currentRoute === '마이페이지') &&  text_primary,fw500]}>마이페이지</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
} export default Footer;


const styles = styleSheet.create({
    FooterWrap : {
        flexDirection:"row",
        backgroundColor:"#fff",
        paddingTop: 10,
        paddingBottom:5,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 10,
                    height: 10,
                },
                shadowOpacity: 0.5,
                shadowRadius: 10,
            },
            android: {
                // position:"absolute",
                // bottom:0,
                // left:0,
                // width:"100%",
                elevation: 20,
            },
        }),
    },
    Tabs:{
        paddingTop:15,
        textAlign:"center",
        paddingBottom: Platform.OS === 'ios' ? 40 : 15,
        flex:0.3,
    },
    TextCenter : {
        textAlign: "center",
    },
    SvgIcons: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        paddingBottom: 15,
    }

});