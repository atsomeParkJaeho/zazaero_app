import React from 'react';
//설치한 스택 네비게이션 라이브러리를 가져옵니다
import { createStackNavigator } from '@react-navigation/stack';

//페이지로 만든 컴포넌트들을 불러옵니다
import Login from '../pages/Mypage/Login';                                  //로그인
import SignUp from '../pages/Mypage/SignUp';                                //회원가입
import FindId from '../pages/Mypage/FindId';                                //아이디 찾기
import FindPw from '../pages/Mypage/FindPw';                                //비밀번호 찾기
import MainPage from '../pages/MainPage';                                   //메인페이지
import GoodsCateList from '../pages/goods/GoodsCateList';                   //상품목록
import DetailPage from '../pages/DetailPage';                                //상품목록
import MainPage2 from '../pages/MainPage2';                                  //

import Setting from '../pages/Setting';                                      //설정
import NoticeList from '../pages/NoticeList';                               //공지사항목록
import NoticeView from '../pages/NoticeView';                                //공지사항상세
import Cscenter from '../pages/Cscenter';                                    //고객센터
import Provision from '../pages/Provision';                                 //개인정보처리방침
import MyPage from '../pages/MyPage';                                        //마이페이지
import MyPoint from '../pages/Mypage/MyPoint';                              //포인트 내역
import MemInfo from '../pages/Mypage/MemInfo';                              //회원정보 변경
//스택 네비게이션 라이브러리가 제공해주는 여러 기능이 담겨있는 객체를 사용합니다
//그래서 이렇게 항상 상단에 선언하고 시작하는게 규칙입니다!
const Stack = createStackNavigator();


const StackNavigator = () =>{
    return (

        //컴포넌트들을 페이지처럼 여기게끔 해주는 기능을 하는 네비게이터 태그를 선언합니다.
        //위에서 선언한 const Stack = createStackNavigator(); Stack 변수에 들어있는 태그를 꺼내 사용합니다.
        //Stack.Navigator 태그 내부엔 페이지(화면)를 스타일링 할 수 있는 다양한 옵션들이 담겨 있습니다.
        <Stack.Navigator>

            {/* 컴포넌트를 페이지로 만들어주는 엘리먼트에 끼워 넣습니다. 이 자체로 이제 페이지 기능을 합니다*/}
{/*<Stack.Screen name="로딩" component={Loading}/>*/}

            <Stack.Screen name="로그인" component={Login}/>
            <Stack.Screen name="마이페이지" component={MyPage}/>
            <Stack.Screen name="회원정보수정" component={MemInfo}/>
            <Stack.Screen name="포인트내역" component={MyPoint}/>
            <Stack.Screen name="설정" component={Setting}/>
            <Stack.Screen name="아이디 찾기" component={FindId}/>
            <Stack.Screen name="비밀번호 찾기" component={FindPw}/>
            <Stack.Screen name="회원가입" component={SignUp}/>
            <Stack.Screen name="메인페이지" component={MainPage}/>
            <Stack.Screen name="MainPage" component={MainPage2}/>
            <Stack.Screen name="약관/개인정보처리방침" component={Provision}/>
            <Stack.Screen name="고객센터" component={Cscenter}/>

            <Stack.Screen name="공지사항" component={NoticeList}/>
            <Stack.Screen name="공지사항상세" component={NoticeView}/>
            <Stack.Screen name="DetailPage" component={DetailPage}/>

            <Stack.Screen name="상품목록" component={GoodsCateList}/>
    </Stack.Navigator>
    )
}

export default StackNavigator;