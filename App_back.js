import React, {useState} from 'react';
import * as Font from "expo-font";
import MainPage from './pages/MainPage';
import MainPage2 from './pages/MainPage2';
import MyPage from './pages/MyPage';
import MyPage2 from './pages/MyPage2';
import DetailPage from './pages/DetailPage';

const getFonts = () => Font.loadAsync({
    "Amatic-Bold": require("./assets/fonts/Amatic-Bold.ttf"),
    "ARCHRISTY": require("./assets/fonts/ARCHRISTY.ttf"),
    "Ycomputer": require("./assets/fonts/Ycomputer.ttf"),
});

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false)

    // if(fontsLoaded){
    //     return (
    //         <MainPage />
    //
    //     );
    // } else {
    //     return(
    //         <MyPage
    //             startAsync={getFonts}  // 요구된 data 및 asset을 미리 로드한다.
    //             onFinish={()=> setFontsLoaded(true)}  //startAsync가 끝났을 때 실행되고, 다시 렌더링이 일어난다.
    //             onError={console.warn} // startAsync 에서 오류 발생 시 실행
    //         />
    //         <DetailPage />
    //     )
    // }
    return( <MainPage2 /> )
}
