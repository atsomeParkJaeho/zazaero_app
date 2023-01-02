import {Text, TouchableOpacity, View} from "react-native";
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

const styles = styleSheet.create({
    FooterWrap : {
        flexDirection:"row",
        position:"absolute",
        left:0,
        bottom:0,
        backgroundColor:"#fff",
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        // ...Platform.select({
        //     ios: {
        //         shadowColor: "#000",
        //         shadowOffset: {
        //             width: 10,
        //             height: 10,
        //         },
        //         shadowOpacity: 0.5,
        //         shadowRadius: 10,
        //     },
        //     android: {
        //         elevation: 20,
        //     },
        // }),
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
        paddingBottom: 6,
    }

});



function Footer({navigation,pages}) {

    const [Member, setMember] = useState();
    const mem_uid = AsyncStorage.getItem("member").then((value) => {
        setMember(value);
    })


    console.log('푸터');

    console.log('회원코드 / ' + Member);

    const routes = useNavigationState(state => state.routes)
    const currentRoute = routes[routes.length -1].name
    console.log('페이지 이름: ',currentRoute)

    let test = 'test';

    return(
        <>
            <View style={styles.FooterWrap}>
                <View style={[styles.Tabs, styles.TextCenter]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('메인페이지')}}>
                        {(currentRoute === '메인페이지') ? (
                            <>
                                <View style={styles.SvgIcons}>
                                    <HomeLogoAt width={22} height={18}/>
                                </View>
                                <View>
                                    <Text style={[text_center,text_primary,fw500]}>홈</Text>
                                </View>
                            </>

                        ):(
                            <>
                                <View style={styles.SvgIcons}>
                                    <HomeLogo width={22} height={18} />
                                </View>
                                <View>
                                    <Text style={styles.TextCenter}>홈</Text>
                                </View>
                            </>
                        ) }
                    </TouchableOpacity>
                </View>
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('즐겨찾기')}}>
                        {(currentRoute === '즐겨찾기') ? (
                            <>
                                <View style={styles.SvgIcons}>
                                    <WishAt width={22} height={18}/>
                                </View>
                                <View>
                                    <Text style={[text_center,text_primary,fw500]}>즐겨찾기</Text>
                                </View>
                            </>

                        ):(
                            <>
                                <View style={styles.SvgIcons}>
                                    <Wish width={22} height={18}/>
                                </View>
                                <View>
                                    <Text style={[text_center]}>즐겨찾기</Text>
                                </View>
                            </>
                        ) }
                    </TouchableOpacity>
                </View>
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('장바구니',{mem_uid:Member})}}>
                        {(currentRoute === '장바구니') ? (
                            <>
                                <View style={styles.SvgIcons}>
                                    <CartAt width={22} height={18}/>
                                </View>
                                <View>
                                    <Text style={[text_center,text_primary,fw500]}>장바구니</Text>
                                </View>
                            </>

                        ):(
                            <>
                                <View style={styles.SvgIcons}>
                                    <Cart width={22} height={18}/>
                                </View>
                                <View>
                                    <Text style={[text_center]}>장바구니</Text>
                                </View>
                            </>
                        ) }
                    </TouchableOpacity>
                </View>
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('발주상태')}}>
                        {(currentRoute === '발주상태' || currentRoute === '결제상태' || currentRoute === '배송상태') ? (
                            <>
                                <View style={styles.SvgIcons}>
                                    <OrderListAt width={22} height={18}/>
                                </View>
                                <View>
                                    <Text style={[text_center,text_primary,fw500]}>발주내역</Text>
                                </View>
                            </>

                        ):(
                            <>
                                <View style={styles.SvgIcons}>
                                    <OrderList width={22} height={18}/>
                                </View>
                                <View>
                                    <Text style={[text_center]}>발주내역</Text>
                                </View>
                            </>
                        ) }
                    </TouchableOpacity>
                </View>
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('마이페이지')}}>
                        {(currentRoute === '마이페이지') ? (
                            <>
                                <View style={styles.SvgIcons}>
                                    <MypageAt width={22} height={18}/>
                                </View>
                                <View>
                                    <Text style={[text_center,text_primary,fw500]}>마이페이지</Text>
                                </View>
                            </>

                        ):(
                            <>
                                <View style={styles.SvgIcons}>
                                    <Mypage width={22} height={18}/>
                                </View>
                                <View>
                                    <Text style={[text_center]}>마이페이지</Text>
                                </View>
                            </>
                        ) }
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
} export default Footer;