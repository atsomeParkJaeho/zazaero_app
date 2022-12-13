import React, {useEffect, useState} from 'react';
//설치한 스택 네비게이션 라이브러리를 가져옵니다
import {createStackNavigator} from '@react-navigation/stack';

//페이지로 만든 컴포넌트들을 불러옵니다
import Login from '../pages/Mypage/Login';                                  //로그인
import SignUp from '../pages/Mypage/SignUp';                                //회원가입
import FindId from '../pages/Mypage/FindId';                                //아이디 찾기
import FindPw from '../pages/Mypage/FindPw';                                //비밀번호 찾기

import MainPage from '../pages/MainPage';                                   //메인페이지
import GoodsCateList from '../pages/goods/GoodsCateList';                   //상품목록
import DetailPage from '../pages/DetailPage';                                //상품목록
import MainPage2 from '../pages/MainPage2';                                  //

import Cart from '../pages/cart/Cart';                                  //장바구니
import OrderForm from '../pages/order/OrderForm';                                  //배송정보등록

import MyPage from '../pages/MyPage';                                        //마이페이지
import MyPoint from '../pages/Mypage/MyPoint';                               //포인트 내역
import Setting from '../pages/Setting';                                      //설정
import MemOut from '../pages/Mypage/MemOut';                                 //회원탈퇴
import MemInfo from '../pages/Mypage/MemInfo';                               //회원정보 변경
import NoticeList from '../pages/NoticeList';                                //공지사항목록
import NoticeView from '../pages/NoticeView';                                //공지사항상세
import Cscenter from '../pages/Cscenter';                                    //고객센터
import inquiryWrite from '../pages/board/inquiry/Write';                     //1:1문의 작성
import inquiryList from '../pages/board/inquiry/List';                       //1:1문의 목록
import Provision from '../pages/Provision';                                  //개인정보처리방침


import Loading from '../components/Loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../pages/Footer";
import Wishlist from "../pages/goods/Wishlist";
import Order from "../pages/order/Order";

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
                        backgroundColor: 'dark',
                        borderBottomColor: "#fff",
                        shadowColor: "#fff",
                        height: 100
                    },
                    //헤더의 텍스트를 왼쪾에 둘지 가운데에 둘지를 결정
                    headerTitleAlign: 'center',
                    headerTintColor: "#000",
                    headerBackTitleVisible: false
                }}

            >


                {/*==============비회원===============*/}
                <Stack.Screen name="로그인" component={Login}/>
                <Stack.Screen name="회원가입" component={SignUp}/>
                {/*==============메인페이지===============*/}
                <Stack.Screen name="메인페이지" component={MainPage}/>
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
                <Stack.Screen name="발주내역" component={Order}/>
                <Stack.Screen name="DetailPage" component={DetailPage}/>

                <Stack.Screen name="고객센터" component={Cscenter}/>
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