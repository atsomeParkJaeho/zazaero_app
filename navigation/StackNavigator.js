import React, {useEffect, useState} from 'react';
//설치한 스택 네비게이션 라이브러리를 가져옵니다
import {createStackNavigator} from '@react-navigation/stack';

//페이지로 만든 컴포넌트들을 불러옵니다
//비회원
import Login from '../pages/Mypage/Login';                                  //로그인
import SignUp from '../pages/Mypage/SignUp';                                //회원가입
import FindId from '../pages/Mypage/FindId';                                //아이디 찾기
import FindPw from '../pages/Mypage/FindPw';                                //비밀번호 찾기

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
import Order from "../pages/order/Order";                                   //발주내역
import OrderDetail from "../pages/order/OrderDetail";                       //발주상세
import Cancel from "../pages/order/Cancel";                                 //취소내역
import Return from "../pages/order/Return";                                 //반품내역
import FaqList from "../pages/board/faq/FaqList";                              //자주묻는 질문
import OrderStatus from "../pages/order/OrderStatus";
import PayStatus from "../pages/order/PayStatus";
import DeliStatus from "../pages/order/DeliStatus";

import DetailPage from '../pages/DetailPage';
import CancelDetail from "../pages/order/CancelDetail";                     //취소상세내역
import ReturnDetail from "../pages/order/ReturnDetail";
import PayDetail from "../pages/order/PayDetail";                     //결제상세내역_대기
import PayDetailY from "../pages/order/PayDetailY";                     //결제상세내역_완료
import DeliDetail from "../pages/order/DeliDetail";
import RequestReturn from "../pages/order/RequestReturn";
import DeliDetailIng from "../pages/order/DeliDetailIng";
import DeliDetailDone from "../pages/order/DeliDetailDone";                     //반품상세내역



//스택 네비게이션 라이브러리가 제공해주는 여러 기능이 담겨있는 객체를 사용합니다
//그래서 이렇게 항상 상단에 선언하고 시작하는게 규칙입니다!
const Stack = createStackNavigator();


const StackNavigator = () => {


    // 회원접속상태 확인
    console.log('네비게이션');
    const [Member, setMember] = useState();
    useEffect(() => {
        AsyncStorage.getItem('member').then((value) => {
            if (value) {
                setMember(value);
            }
        });
    }, []);

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
                    //헤더의 텍스트를 왼쪾에 둘지 가운데에 둘지를 결정
                    headerTitleAlign: 'center',
                    headerTintColor: "#000",
                    headerBackTitleVisible: false,
                    headerShown:true,

                }}
            >


                {/*==============비회원===============*/}
                <Stack.Screen name="로그인"
                  component={Login}
                  options={{headerTitle:'',headerStatusBarHeight:0,}}
                />
                <Stack.Screen name="회원가입"
                              component={SignUp}
                />
                {/*==============메인페이지===============*/}
                <Stack.Screen
                    name="메인페이지"
                    component={MainPage}
                    options={{headerTitle:'',headerStatusBarHeight:0,}}
                />
                {/*==============상단===============*/}
                {/*<Stack.Screen name="검색" component={GoodsSearch}/>*/}
                {/*<Stack.Screen name="검색상품" component={GoodsSearchList}/>*/}

                {/*==============마이페이지===============*/}
                <Stack.Screen name="회원탈퇴" component={MemOut}/>
                <Stack.Screen name="마이페이지" component={MyPage}/>
                <Stack.Screen name="회원정보수정" component={MemInfo}/>
                <Stack.Screen name="포인트내역" component={MyPoint}/>
                <Stack.Screen name="설정" component={Setting}/>
                <Stack.Screen name="배송정보등록" component={OrderForm}/>
                <Stack.Screen name="장바구니" component={Cart}/>
                <Stack.Screen name="즐겨찾기" component={Wishlist}/>
                <Stack.Screen name="아이디 찾기" component={FindId}/>
                <Stack.Screen name="비밀번호 찾기" component={FindPw}/>
                <Stack.Screen name="약관/개인정보처리방침" component={Provision}/>

                <Stack.Screen name="상품목록" component={GoodsCateList}/>
                <Stack.Screen name="상품상세" component={GoodsDetail}/>
                <Stack.Screen name="발주내역" component={Order}/>
                <Stack.Screen name="발주상세" component={OrderDetail}/>
                {/*================발주내역 상태 변경===================*/}
                <Stack.Screen name="결제상태" options={{title:'발주내역'}} component={PayStatus}/>
                <Stack.Screen name="발주상태" options={{title:'발주내역'}} component={OrderStatus}/>
                <Stack.Screen name="결제상세" options={{title:'상세내역'}} component={PayDetail}/>
                <Stack.Screen name="결제상세_완" options={{title:'상세내역'}} component={PayDetailY}/>
                <Stack.Screen name="배송상태" options={{title:'발주내역'}} component={DeliStatus}/>
                <Stack.Screen name="배송상세" options={{title:'상세내역'}} component={DeliDetail}/>
                <Stack.Screen name="배송상세_진행" options={{title:'상세내역'}} component={DeliDetailIng}/>
                <Stack.Screen name="배송상세_완료" options={{title:'상세내역'}} component={DeliDetailDone}/>
                <Stack.Screen name="DetailPage" component={DetailPage}/>
                {/*================취소/반품===================*/}
                <Stack.Screen name="취소내역" options={{title:'취소,반품내역'}} component={Cancel}/>
                <Stack.Screen name="취소내역상세" options={{title:'취소내역'}} component={CancelDetail}/>
                <Stack.Screen name="반품내역" options={{title:'취소,반품내역'}} component={Return}/>
                <Stack.Screen name="반품내역상세" options={{title:'반품내역'}} component={ReturnDetail}/>
                <Stack.Screen name="반품요청" options={{title:'반품요청'}} component={RequestReturn}/>
                {/*=================게시판===============*/}
                <Stack.Screen name="고객센터" component={Cscenter}/>
                <Stack.Screen name="자주묻는질문" component={FaqList}/>
                <Stack.Screen name="알림" component={NotificationList}/>
                <Stack.Screen name="검색" component={GoodsSearch}/>
                <Stack.Screen name="검색상품리스트" component={GoodsSearchList}/>
                <Stack.Screen name="1:1문의작성" component={inquiryWrite}/>
                <Stack.Screen name="1:1문의목록" component={inquiryList}/>
                <Stack.Screen name="공지사항" component={NoticeList}/>
                <Stack.Screen name="공지사항상세" component={NoticeView}/>
                <Stack.Screen name="하단" component={Footer}/>
            </Stack.Navigator>
        </>
    );


}

export default StackNavigator;