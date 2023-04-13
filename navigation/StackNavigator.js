import React, {useEffect, useState} from 'react';
//설치한 스택 네비게이션 라이브러리를 가져옵니다
import {CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators} from '@react-navigation/stack';

//페이지로 만든 컴포넌트들을 불러옵니다
//비회원
import Login from '../pages/Mypage/Login';                                  //로그인
import SignUp from '../pages/Mypage/SignUp';                                //회원가입
import FindId from '../pages/Mypage/FindId';                                //아이디 찾기
import FindIdResult from '../pages/Mypage/FindIdResult';                                //아이디 찾기결과
import FindPw from '../pages/Mypage/FindPw';                                //비밀번호 찾기
import FindPwResult  from '../pages/Mypage/FindPwResult';                                //비밀번호 찾기

//메인페이지
import MainPage from '../pages/MainPage';                                   //메인페이지
import NotificationList from '../pages/board/Notification/List';            //알림
import GoodsSearch from "../pages/goods/GoodsSearch";                       //검색
import GoodsSearchList from "../pages/goods/GoodsSearchList";               //검색상품리스트
import GoodsCateList from '../pages/goods/GoodsCateList';                   //상품목록
import GoodsDetail from "../pages/goods/GoodsDetail";                       //상품상세
import Cart from '../pages/cart/Cart';                                      //장바구니
import OrderForm from '../pages/order/OrderForm';                           //배송정보등록

//마이페이지
import MyPage from '../pages/MyPage';                                        //마이페이지
import MyPoint from '../pages/Mypage/MyPoint';                               //포인트 내역
import MyRefund from "../pages/Mypage/MyRefund";                            //환불상세내역
import WorkName from "../pages/Mypage/WorkName";        //공사현황총목록
import WorkNameList from "../pages/Mypage/WorkNameList";        //공사현황발주서별 목록
import ConstructionStatusDetail from "../pages/Mypage/ConstructionStatus_Detail";        //공사현황발주서별 목록
import Setting from '../pages/Setting';                                      //설정
import MemOut from '../pages/Mypage/MemOut';                                 //회원탈퇴
import MemInfo from '../pages/Mypage/MemInfo';                               //회원정보 변경
import NoticeList from '../pages/board/notice/NoticeList';                                //공지사항목록
import NoticeView from '../pages/board/notice/NoticeView';                                //공지사항상세
import Cscenter from '../pages/Cscenter';                                    //고객센터
import inquiryWrite from '../pages/board/inquiry/Write';                     //1:1문의 작성
import inquiryList from '../pages/board/inquiry/List';                       //1:1문의 목록
import Provision from '../pages/Provision';                                  //개인정보처리방침


import Loading from '../components/Loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../pages/Footer";                                       //풋터
import Wishlist from "../pages/goods/Wishlist";                             //즐겨찾기
import OrderDetail from "../pages/order/OrderDetail";                       //발주상세
import Cancel from "../pages/order/Cancel";                                 //취소내역
import Return from "../pages/order/Return";                                 //반품내역
import FaqList from "../pages/board/faq/FaqList";                              //자주묻는 질문
import OrderStatus from "../pages/order/OrderStatus";
import PayStatus from "../pages/order/PayStatus";
import DeliStatus from "../pages/order/DeliStatus";

import CancelDetail from "../pages/order/CancelDetail";                     //취소상세내역
import ReturnDetail from "../pages/order/ReturnDetail";

import RequestReturn from "../pages/order/RequestReturn";
import Postcode from "@actbase/react-daum-postcode/lib/app.native";
import DaumPostCode from "../util/DaumPostCode";
import Payment from "../util/ImportPay";
import Push from "../Push";
import {Alert, Animated, LogBox, YellowBox} from "react-native";
import {my_page} from "../pages/UTIL_mem";
import {reloadAsync} from "expo-updates";

import ModOrder from "../pages/order/OrderMod";
import AddOrder from "../pages/order/AddOrder";


//스택 네비게이션 라이브러리가 제공해주는 여러 기능이 담겨있는 객체를 사용합니다
//그래서 이렇게 항상 상단에 선언하고 시작하는게 규칙입니다!
const Stack = createStackNavigator();

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};


const StackNavigator = () => {

    console.disableYellowBox = true;
    // 회원접속상태 확인
    console.log('네비게이션');
    const [Member, setMember] = useState();


    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    useEffect(() => {
        AsyncStorage.getItem('member').then((value) => {
            if (value) {
                setMember(value);
            }
        });


    }, [Member]);

    console.log('회원코드 / ', Member);

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#fff',
                        borderBottomColor: "#fff",
                        shadowColor: "#fff",
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                    },
                    //헤더의 텍스트를 왼쪾에 둘지 가운데에 둘지를 결정
                    headerTitleAlign: 'center',
                    headerTintColor: "#000",
                    headerBackTitleVisible: false,
                    headerShown:true,

                }}
            >
                {/*==============비회원===============*/}
                <Stack.Screen name="로그인" component={Login} options={{headerTitle:'',headerStatusBarHeight:0,}}/>
                <Stack.Screen name="회원가입" component={SignUp} options={{
                    cardStyleInterpolator: forFade
                }}/>
                {/*==============메인페이지===============*/}
                <Stack.Screen name="메인페이지" component={MainPage} options={
                    {
                        headerTitle:'',
                        headerStatusBarHeight:0,
                        cardStyleInterpolator: forFade,
                        // headerLeftContainerStyle:
                    }
                }/>
                {/*==============상단===============*/}
                {/*<Stack.Screen name="검색" component={GoodsSearch}/>*/}
                {/*<Stack.Screen name="검색상품" component={GoodsSearchList}/>*/}
                {/*==============마이페이지===============*/}
                <Stack.Screen name="회원탈퇴" component={MemOut} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="마이페이지" component={MyPage} options={{
                     cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="회원정보수정" component={MemInfo} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="포인트내역" component={MyPoint}/>
                <Stack.Screen name="환불내역" component={MyRefund}/>
                <Stack.Screen name="설정" component={Setting}/>
                <Stack.Screen name="공사현황목록" component={WorkName} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="공사현황발주서목록" component={WorkNameList}/>
                <Stack.Screen name="공사현황발주서상세" component={ConstructionStatusDetail}/>
                <Stack.Screen name="배송정보등록" component={OrderForm} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="장바구니" component={Cart} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="즐겨찾기" component={Wishlist} options={{
                    cardStyleInterpolator: forFade
                }} />
                <Stack.Screen name="아이디 찾기" component={FindId} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="아이디 찾기결과" component={FindIdResult} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="비밀번호 찾기" component={FindPw} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="비밀번호 찾기결과" options={{title:'비밀번호 찾기',cardStyleInterpolator: forFade}} component={FindPwResult}/>
                <Stack.Screen name="약관/개인정보처리방침" component={Provision} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="상품목록" component={GoodsCateList} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="상품상세" component={GoodsDetail} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="발주상세" component={OrderDetail} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="추가발주" component={AddOrder}/>
                <Stack.Screen name="수정하기" component={ModOrder}/>
                {/*================발주내역 상태 변경===================*/}
                <Stack.Screen name="결제상태" options={{title:'발주내역',cardStyleInterpolator: forFade,}} component={PayStatus} />
                <Stack.Screen name="발주상태" options={{title:'발주내역',cardStyleInterpolator: forFade,}} component={OrderStatus}/>
                <Stack.Screen name="배송상태" options={{title:'발주내역',cardStyleInterpolator: forFade,}} component={DeliStatus}/>
                {/*================취소/반품===================*/}
                <Stack.Screen name="취소내역" options={{title:'취소,반품내역',cardStyleInterpolator: forFade}} component={Cancel}/>
                <Stack.Screen name="취소내역상세" options={{title:'취소내역',cardStyleInterpolator: forFade}} component={CancelDetail}/>
                <Stack.Screen name="반품내역" options={{title:'취소,반품내역',cardStyleInterpolator: forFade}} component={Return}/>
                <Stack.Screen name="반품내역상세" options={{title:'반품내역',cardStyleInterpolator: forFade}} component={ReturnDetail}/>
                <Stack.Screen name="반품요청" options={{title:'반품요청',cardStyleInterpolator: forFade}} component={RequestReturn}/>
                {/*=================게시판===============*/}
                <Stack.Screen name="고객센터" component={Cscenter} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="자주묻는질문" component={FaqList} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="알림" component={NotificationList} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="검색" component={GoodsSearch} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="검색결과" component={GoodsSearchList} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="1:1문의작성" component={inquiryWrite} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="1:1문의목록" component={inquiryList} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="공지사항" component={NoticeList} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="공지사항상세" component={NoticeView} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="하단" component={Footer}/>
                {/*다음 주소 api 추가*/}
                <Stack.Screen name="주소검색" component={DaumPostCode} options={{
                    cardStyleInterpolator: forFade
                }}/>
                {/**--------------------아임포트 결제 모듈 추가-------------------------**/}
                <Stack.Screen name="카드결제" component={Payment} options={{
                    cardStyleInterpolator: forFade
                }}/>
                <Stack.Screen name="푸시알림" component={Push}/>
            </Stack.Navigator>
        </>
    );


}

export default StackNavigator;