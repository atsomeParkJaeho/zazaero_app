import {LocaleConfig} from "react-native-calendars/src/index";
import 'moment/locale/ko';
import {Alert} from "react-native";
import axios from "axios";
import * as Notifications from "expo-notifications";

export const regId = /^[a-z0-9_]{4,20}$/;
export const Minlangth = 6;

export const regPW = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
export const app_version = '9.1.6';
export const app_build   = '2.0.0';
// 시간 변경 포맷

export const Time = (time) => {
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    if(month<10) month = '0' + month;
    let date = time.getDate();
    if(date<10) date = '0' + date;
    let hour = time.getHours();
    if(hour<10) hour = '0' + hour;
    let min = time.getMinutes();
    if(min<10) min = '0' + min;
    let sec = time.getSeconds();
    if(sec) sec = '0' + sec;
    return hour + ":" + min;
}


// 푸시키 설정

export const push_key = async () => {
    // 1. expo 인지 확인한다
    let {type, data} = await Notifications.getExpoPushTokenAsync();
    console.log(type);
    if(type === 'expo') {
        console.log(data,' / 엑스포키');
        return data;
    } else {
        // expo가 아닐경우
        let {type, data} = await Notifications.getDevicePushTokenAsync();
        console.log(data,' / 일반 디바이스 키');
        return data;
    }
}

const locale = {
    name: 'fr',
    config: {
        months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split(
            '_'
        ),
        monthsShort: 'Janv_Févr_Mars_Avr_Mai_Juin_Juil_Août_Sept_Oct_Nov_Déc'.split(
            '_'
        ),
        weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
        weekdaysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY LT',
            LLLL: 'dddd D MMMM YYYY LT'
        },
        calendar: {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'une année',
            yy: '%d années'
        },
        ordinalParse: /\d{1,2}(er|ème)/,
        ordinal: function(number) {
            return number + (number === 1 ? 'er' : 'ème');
        },
        meridiemParse: /PD|MD/,
        isPM: function(input) {
            return input.charAt(0) === 'M';
        },
        // in case the meridiem units are not separated around 12, then implement
        // this function (look at locale/id.js for an example)
        // meridiemHour : function (hour, meridiem) {
        //     return /* 0-23 hour, given meridiem token and hour 1-12 */
        // },
        meridiem: function(hours, minutes, isLower) {
            return hours < 12 ? 'PD' : 'MD';
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    }
};


// 경로
export const At_db = 'http://49.50.162.86:80';

// =================가격표 설정=====================//
export const Price = (text) => {
    if(text) {
        if(0 > Number(text) ) {
            return String(0);
        } else {
            return String(text).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}

export const firebaseConfig = {
    apiKey                  : 'api-key',
    authDomain              : 'project-id.firebaseapp.com',
    databaseURL             : 'https://project-id.firebaseio.com',
    projectId               : 'pc-api-5961167133705272112-485',
    storageBucket           : 'project-id.appspot.com',
    messagingSenderId       : 'sender-id',
    appId                   : 'app-id',
    measurementId           : 'G-measurement-id',
};

// =================전화번호 입력제어=====================//
export const Phone = (num) => {
   return num.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

// =================사업자 번호 입력제어 입력제어=====================//
export const bizNum = (num) => {
    return num.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}
// FCM 서버키
export const FCM = 'AAAAX-gPrHo:APA91bFU53F2rZl1ERLue0Iv59XTl84m5yUr5Idddb77YwiUAVtvDhyyWgH9zVqT2r35WiA-7TGVqAJENrGE3j2DbGCdPODOcWZBDFdM0OjtcHbdj5cbm6fvsb5dlVF8hng9dwYUXy97';

export const ComPhone = (num) => {
    if(num) {
        return num.substring(4);
    }
}

// =================숫자만 입력 가능=================//
export const OnlyNum = (text) => {
    const val = text.target.value;
    val.replace(/[^0-9]/g, '');
};
// =================영어만 입력 가능===============//
export const OnlyEng = (text) => {
    return String(text).replace(/[^A-Za-z0-9]/ig, '');
}

export const DateChg = (text) => {
    let today = new Date(text);
    let dateFormat1 = today.getFullYear() + '년 ' + (today.getMonth()+1) + '월 ' + today.getDate() + '일 ';
    return String(dateFormat1);
}

export const DateChg2 = (text) => {
    let today = new Date(text);
    let dateFormat1 = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    return String(dateFormat1);
}

export const minDate = (text) => {
    let today = new Date(text);
    let dateFormat1 = (today.getFullYear()-2) + '-' + (today.getMonth()+1) + '-' + today.getDate();
    return String(dateFormat1);
}

export const maxDate = (text) => {
    let today = new Date(text);
    let dateFormat1 = (today.getFullYear()+2) + '-' + (today.getMonth()+1) + '-' + today.getDate();
    return String(dateFormat1);
}

export const IMPcode = 'imp45563562';


export const bankAccount = ["자재로(이정완)_국민은행 1234-23-5968714"];


export const priName = (key) => {
    if(key === 'access')            { return  `서비스 이용약관`}
    if(key === 'info_mgr')          { return  `개인정보처리방침` }
    if(key === 'etc_provision')     { return  `개인정보수집 및 이용동의`}
    if(key === 'other_provision')   { return  `제3자개인정보수집 및 이용동의`}
    if(key === 'ad_acces')          { return  `홍보 및 마케팅 이용약관`}
}

// 주문상태 정의 함수화

export const ordStatus = (key) => {
    if(key) {
        if(key === 'ord_ready')         {return '발주신청'; }
        if(key === 'ord_doing')         {return '발주검수중'; }
        if(key === 'ord_edit')          {return '발주수정중'; }
        if(key === 'ord_done')          {return '발주검수완료'; }
        if(key === 'pay_try')           {return '결제시도'; }
        if(key === 'pay_err')           {return '결제에러'; }
        if(key === 'pay_ready')         {return '결제대기'; }
        if(key === 'pay_done')          {return '결제완료'; }
        if(key === 'deli_ready')        {return '배송대기'; }
        if(key === 'deli_doing')        {return '배송중'; }
        if(key === 'deli_done')         {return '배송완료'; }
    }
}
export const payStatus = (key) => {
    if(key === 'ready')         {return '입금대기'; }
    if(key === 'try')           {return '결제시도'; }
    if(key === 'err')           {return '결제실패'; }
    if(key === 'done')          {return '결제완료'; }
}
export const deliStatus = (key) => {
    if(key === 'ready')         {return '배송대기'; }
    if(key === 'doing')         {return '배송진행'; }
    if(key === 'done')          {return '배송완료'; }
}
export const refundStatus = (key) => {
    if(key === 'ready')         {return '처리중'; }
    if(key === 'done')          {return '처리완료'; }
}
export const settleKind = (key) => {
    if(key === 'card')         {return '카드결제'; }
    if(key === 'bank')         {return '무통장입금'; }
}

export const Time1 = [
    {
        label     :"AM",
        value     :"AM",
    },
    {
        label     :"PM",
        value     :"PM",
    },
];

export const Time2 = [
    {
        label     :"07:00",
        value     :"07:00",
    },
    {
        label     :"07:30",
        value     :"07:30",
    },
    {
        label     :"08:00",
        value     :"08:00",
    },
    {
        label     :"08:30",
        value     :"08:30",
    },
    {
        label     :"09:00",
        value     :"09:00",
    },
    {
        label     :"09:30",
        value     :"09:30",
    },
    {
        label     :"10:00",
        value     :"10:00",
    },
    {
        label     :"10:30",
        value     :"10:30",
    },
    {
        label     :"11:00",
        value     :"11:00",
    },
    {
        label     :"11:30",
        value     :"11:30",
    },
    {
        label     :"12:00",
        value     :"12:00",
    },
    {
        label     :"12:30",
        value     :"12:30",
    },

    {
        label     :"13:00",
        value     :"13:00",
    },
    {
        label     :"13:30",
        value     :"13:30",
    },
    {
        label     :"14:00",
        value     :"14:00",
    },
    {
        label     :"14:30",
        value     :"14:30",
    },
    {
        label     :"15:00",
        value     :"15:00",
    },
    {
        label     :"15:30",
        value     :"15:30",
    },
    {
        label     :"16:00",
        value     :"16:00",
    },
    {
        label     :"16:30",
        value     :"16:30",
    },
    {
        label     :"17:00",
        value     :"17:00",
    },
    {
        label     :"17:30",
        value     :"17:30",
    },
    {
        label     :"18:00",
        value     :"18:00",
    },

];

export const AddrMatch = [
    {
        label          :"서울특별시",
        value        :"서울",
    },
    {
        label          :"부산광역시",
        value        :"부산",
    },
    {
        label          :"울산광역시",
        value        :"울산",
    },
    {
        label          :"대구광역시",
        value        :"대구",
    },
    {
        label          :"인천광역시",
        value        :"인천",
    },
    {
        label          :"대전광역시",
        value        :"대전",
    },
    {
        label          :"광주광역시",
        value        :"광주",
    },
    {
        label          :"세종특별자치시",
        value        :"세종",
    },
    {
        label          :"경기도",
        value        :"경기",
    },
    {
        label          :"강원도",
        value        :"강원",
    },
    {
        label          :"충청남도",
        value        :"충남",
    },
    {
        label          :"충청북도",
        value        :"충북",
    },
    {
        label          :"경상남도",
        value        :"경남",
    },
    {
        label          :"경상북도",
        value        :"경북",
    },
    {
        label          :"전라남도",
        value        :"전남",
    },
    {
        label          :"전라북도",
        value        :"전북",
    },
    {
        label          :"제주특별자치도",
        value        :"제주",
    },
];

// 휴대전화 번호
export const BankCode = [
    {
        label          :"국민은행",
        value        :"004",
    },
    {
        label          :"경남은행",
        value        :"039",
    },
    {
        label          :"광주은행",
        value        :"034",
    },
    {
        label          :"기업은행",
        value        :"003",
    },
    {
        label          :"농협",
        value        :"011",
    },
    {
        label          :"도이치은행",
        value        :"055",
    },
    {
        label          :"대구은행",
        value        :"031",
    },
    {
        label          :"부산은행",
        value        :"032",
    },
    {
        label          :"산업은행",
        value        :"002",
    },
    {
        label          :"상호저축은행",
        value        :"050",
    },
    {
        label          :"새마을금고",
        value        :"045",
    },
    {
        label          :"수협중앙",
        value        :"007",
    },
    {
        label          :"신용협동조합",
        value        :"048",
    },
    {
        label          :"신한은행",
        value        :"088",
    },
    {
        label          :"우리은행",
        value        :"020",
    },
    {
        label          :"우체국",
        value        :"071",
    },
    {
        label          :"외환은행",
        value        :"005",
    },
    {
        label          :"전북은행",
        value        :"037",
    },
    {
        label          :"제주은행",
        value        :"035",
    },
    {
        label          :"하나은행",
        value        :"081",
    },
    {
        label          :"한국씨티은행",
        value        :"027",
    },
    {
        label          :"홍콩상하이",
        value        :"054",
    },
    {
        label          :"SC제일은행",
        value        :"023",
    },
    {
        label          :"BOA(뱅크오브)",
        value        :"060",
    },
    {
        label          :"카카오뱅크",
        value        :"090",
    },
    {
        label          :"동양종합증권",
        value        :"209",
    },
    {
        label          :"현대증권",
        value        :"218",
    },
    {
        label          :"미래에셋증권",
        value        :"230",
    },
    {
        label          :"대우증권",
        value        :"238",
    },
    {
        label          :"삼성증권",
        value        :"240",
    },
    {
        label          :"한국투자증권",
        value        :"243",
    },
    {
        label          :"우리투자증권",
        value        :"247",
    },
    {
        label          :"교보증권",
        value        :"261",
    },
    {
        label          :"하이투자증권",
        value        :"262",
    },
    {
        label          :"HMC투자증권",
        value        :"263",
    },
    {
        label          :"이트레이드증권",
        value        :"265",
    },
    {
        label          :"SK증권",
        value        :"266",
    },
    {
        label          :"대신증권",
        value        :"267",
    },
    {
        label          :"한화증권",
        value        :"269",
    },
    {
        label          :"하나대투증권",
        value        :"270",
    },
    {
        label          :"신한금융투자",
        value        :"278",
    },
    {
        label          :"동부증권",
        value        :"279",
    },
    {
        label          :"유진투자증권",
        value        :"280",
    },
    {
        label          :"메리츠증권",
        value        :"287",
    },
    {
        label          :"NH투자증권",
        value        :"289",
    },
    {
        label          :"신영증권",
        value        :"291",
    },
    {
        label          :"LIG투자증권",
        value        :"292",
    },
    {
        label          :"부국증권",
        value        :"290",
    },

];

// 휴대전화 번호
export const MobileHead = [
    {
        "name"  :"010",
        "cate"  :"mobile",
        "key"   :"010"
    },
    {
        "name"  :"011",
        "cate"  :"mobile",
        "key"   :"011"
    },
    {
        "name"  :"013",
        "cate"  :"mobile",
        "key"   :"013"
    },
    {
        "name"  :"016",
        "cate"  :"mobile",
        "key"   :"016"
    },
    {
        "name"  :"017",
        "cate"  :"mobile",
        "key"   :"017"
    },
    {
        "name"  :"018",
        "cate"  :"mobile",
        "key"   :"018"
    },
    {
        "name"  :"019",
        "cate"  :"mobile",
        "key"   :"019"
    },
];
export const AllHead = [
    {
        "name"  :"전국",
        "key"   :"etc",
    },
    {
        "name"  :"070",
        "key"   :"070",
    },
    {
        "name"  :"서울 02",
        "key"   :"02",
    },
    {
        "name"  :"경기 031",
        "key"   :"02",
    },
    {
        "name"  :"인천 032",
        "key"   :"02",
    },
    {
        "name"  :"충남 041",
        "key"   :"02",
    },
    {
        "name"  :"대전 042",
        "key"   :"02",
    },
    {
        "name"  :"충북 043",
        "key"   :"02",
    },
    {
        "name"  :"세종 044",
        "key"   :"02",
    },
    {
        "name"  :"부산 051",
        "key"   :"02",
    },
    {
        "name"  :"울산 052",
        "key"   :"02",
    },
    {
        "name"  :"대구 053",
        "key"   :"02",
    },
    {
        "name"  :"경북 054",
        "key"   :"02",
    },
    {
        "name"  :"경남 055",
        "key"   :"02",
    },
    {
        "name"  :"전남 061",
        "key"   :"02",
    },
    {
        "name"  :"광주 062",
        "key"   :"02",
    },
    {
        "name"  :"전북 063",
        "key"   :"02",
    },
    {
        "name"  :"제주 064",
        "key"   :"02",
    },
];
// 이메일 코드
export const EmailDomain = [
    {
        label          :"네이버(naver.com)",
        value        :"naver.com",
    },
    {
        label          :"다음(daum.net)",
        value        :"daum.net",
    },
    {
        label          :"한메일(hanmail)",
        value        :"hanmail.net",
    },
    {
        label          :"네이트(nate.com)",
        value        :"nate.com\"",
    },
    {
        label          :"구글(gmail.com)",
        value        :"gmail.com",
    },
    {
        label          :"야후(yahoo.com)",
        value        :"yahoo.com",
    },
];

export const cancelType = (type) => {
    if(type) {
        if(type === 'part') { return '부분취소'; }
        if(type === 'all')  { return '전체취소'; }
    }
}
export const cancelStatus = (type) => {
    if(type) {
        if(type === 'none') { return ''; }
        if(type === 'ready')  { return '처리중'; }
        if(type === 'done')  { return '취소완료'; }
    }
}

export const returnType = (type) => {
    if(type) {
        if(type === 'part') { return '부분반품'; }
        if(type === 'all')  { return '전체반품'; }
    }
}

export const returnStatus = (type) => {
    if(type) {
        if(type === 'ready')    { return '반품대기'; }
        if(type === 'doing')    { return '반품진행'; }
        if(type === 'done')     { return '반품완료'; }
    }
}

