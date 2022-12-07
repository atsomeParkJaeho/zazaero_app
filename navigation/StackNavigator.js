import React, {useState} from 'react';
//설치한 스택 네비게이션 라이브러리를 가져옵니다
import { createStackNavigator } from '@react-navigation/stack';

//페이지로 만든 컴포넌트들을 불러옵니다
import Login from '../pages/Mypage/Login';                //로그인
import SignUp from '../pages/Mypage/SignUp';              //회원가입
import MainPage from '../pages/MainPage';                 //메인페이지
import GoodsCateList from '../pages/goods/GoodsCateList';                 //메인페이지
import DetailPage from '../pages/DetailPage';
import MainPage2 from '../pages/MainPage2';
import MyPage from '../pages/MyPage';
import Setting from '../pages/Setting';
import NoticeList from '../pages/NoticeList';
import NoticeView from '../pages/NoticeView';
import Cscenter from '../pages/Cscenter';
import Provision from '../pages/Provision';

import Loading from '../components/Loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../pages/Footer";

//스택 네비게이션 라이브러리가 제공해주는 여러 기능이 담겨있는 객체를 사용합니다
//그래서 이렇게 항상 상단에 선언하고 시작하는게 규칙입니다!
const Stack = createStackNavigator();





const StackNavigator = () =>{

    const member = AsyncStorage.getItem('mem_uid');
    console.log(member);
    if(member) {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'dark',
                        borderBottomColor: "#fff",
                        shadowColor: "#fff",
                        height:100
                    },
                    //헤더의 텍스트를 왼쪾에 둘지 가운데에 둘지를 결정
                    headerTitleAlign:'center',
                    headerTintColor: "#000",
                    headerBackTitleVisible: false
                }}

            >
                {/*==============회원관련===============*/}
                <Stack.Screen name="로그인" component={Login}/>
                <Stack.Screen name="회원가입" component={SignUp}/>
                <Stack.Screen name="마이페이지" component={MyPage}/>
                <Stack.Screen name="설정" component={Setting}/>
                {/*==============메인페이지===============*/}
                <Stack.Screen name="메인페이지" component={MainPage}/>
                <Stack.Screen name="MainPage" component={MainPage2}/>
                <Stack.Screen name="약관/개인정보처리방침" component={Provision}/>
                {/*==============게시판===============*/}
                <Stack.Screen name="고객센터" component={Cscenter}/>
                <Stack.Screen name="공지사항상세" component={NoticeView}/>
                <Stack.Screen name="공지사항" component={NoticeList}/>
                {/*==============상품상세===============*/}
                <Stack.Screen name="DetailPage" component={DetailPage}/>
                <Stack.Screen name="상품목록" component={GoodsCateList}/>
                {/*노출영역*/}
                <Stack.Screen name="하단" component={Footer}/>
            </Stack.Navigator>
        );
    }
}

export default StackNavigator;