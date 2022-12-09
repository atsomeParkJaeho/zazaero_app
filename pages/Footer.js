import {Text, TouchableOpacity, View} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import HomeLogo from '../icons/home_logo.svg';
import Wish from '../icons/wish.svg';
import Cart from '../icons/cart.svg';
import OrderList from '../icons/order_list.svg';
import Mypage from '../icons/mypage.svg';

const styles = styleSheet.create({
    FooterWrap : {
        flexDirection:"row",
        position:"absolute",
        left:0,
        bottom:0,
        backgroundColor:"#fff",
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
                elevation: 20,
            },
        }),
    },
    Tabs:{
        paddingTop:11,
        textAlign:"center", paddingBottom:40,
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
    return(
        <>
            <View style={styles.FooterWrap}>
                <View style={[styles.Tabs, styles.TextCenter]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('메인페이지')}}>
                        <View style={styles.SvgIcons}>
                            <HomeLogo width={22} height={18} />
                        </View>
                        <View>
                            <Text style={styles.TextCenter}>홈</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('즐겨찾기')}}>
                        <View style={styles.SvgIcons}>
                            <Wish width={22} height={18}/>
                        </View>
                        <View>
                            <Text style={styles.TextCenter}>즐겨찾기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('장바구니')}}>
                        <View style={styles.SvgIcons}>
                            <Cart width={22} height={18}/>
                        </View>
                        <View>
                            <Text style={styles.TextCenter}>장바구니</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('발주내역')}}>
                        <View style={styles.SvgIcons}>
                            <OrderList width={22} height={18}/>
                        </View>
                        <View>
                            <Text style={styles.TextCenter}>발주내역</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.Tabs,]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('마이페이지')}}>
                        <View style={styles.SvgIcons}>
                            <Mypage width={22} height={18}/>
                        </View>
                        <View>
                            <Text style={styles.TextCenter}>마이페이지</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
} export default Footer;