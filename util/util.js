import {LocaleConfig} from "react-native-calendars/src/index";
import 'moment/locale/ko';
export const regPW = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
export const regId = /^[a-z0-9_]{4,20}$/;
export const Minlangth = 6;


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


// 자재목록
export const goodsList = [
    {
        goods_uid:"125",
        goods_name:"일반석고보드 9.5T X 900 X 1800",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"발주일로부터 5일 소요",
    },
    {
        goods_uid:"115",
        goods_name:"라이트 브라운 테라조 포쉐린 타일[300*300] 일반석고보드",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"발주일로부터 3일 소요",
    },
    {
        goods_uid:"119",
        goods_name:"도배장판",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"즉시 발주가능",
    },  {
        goods_uid:"125",
        goods_name:"일반석고보드 9.5T X 900 X 1800",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"발주일로부터 5일 소요",
    },
    {
        goods_uid:"115",
        goods_name:"라이트 브라운 테라조 포쉐린 타일[300*300] 일반석고보드",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"발주일로부터 3일 소요",
    },
    {
        goods_uid:"119",
        goods_name:"도배장판",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"즉시 발주가능",
    },
    {
        goods_uid:"125",
        goods_name:"일반석고보드 9.5T X 900 X 1800",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"발주일로부터 5일 소요",
    },
    {
        goods_uid:"115",
        goods_name:"라이트 브라운 테라조 포쉐린 타일[300*300] 일반석고보드",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"발주일로부터 3일 소요",
    },
    {
        goods_uid:"119",
        goods_name:"도배장판",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"즉시 발주가능",
    },
];

//발주상세
// 자재목록
export const goodsDetail = [
    {

        goods_uid:"306",                                        //상품번호
        goods_1thct:"목/형틀공사",                                    //1차카테고리
        goods_2thct:"석고/보드류",                                    //2차카테고리
        goods_3thct:"E보드",                                          //3차카테고리
        goods_name:"일반석고보드 9.5T X 900 X 1800",                  //상품명
        goods_price:"8000",                                         //판매가
        goods_wish_chk:"N",                                         //즐겨찾기 상태
        goods_cart_chk:false,                                       //장바구니 상태
        goods_guid_link:"당일출고 가능합니다.",                         //가이드 멘트
    },
];

// 발주내역 샘플

// 발주상태 (order_status) : ready(발주신청),doing(발주검수중), done(검수완료)

// 결제상태 (pay_status) : ready(결제대기), done(결제완료)

// 배송상태 (deli_status) : raedy(배송준비), doing(배송중), done(배송완료)


export const order_List = [

    {
        user_id: "1",                                                 //아이디값
        goods_num: "A_123451231",                                     //발주번호
        Construction_name: "호반베르디움 102동 604호 아파트리모델링",                //공사명
        Desired_Delivery_Date: "2022-05-11 19:00 도착예정",                   //희망배송일
        Delivery_destination_name: "경기 성남시 분당구 구미로 16 호반베르디움",       //배송지
        order_type: "ready",                                     //발주상태
        order_status  :"done",      // 발주상태
        pay_status    :"done",      // 결제상태
        deli_status   :"raedy",      // 배송상태

    },
    {
        user_id: "1",                                                 //아이디값
        goods_num: "B_123451231",                                     //발주번호
        Construction_name: "스타리우빌딩 3층 상가리모델링",       //공사명
        Desired_Delivery_Date: "2022-05-11 19:00 도착예정",                   //희망배송일
        Delivery_destination_name: "경기 성남시 분당구 구미로 16 호반베르디움",       //배송지
        order_type: "request",                                     //발주상태
        order_status  :"done",      // 발주상태
        pay_status    :"ready",      // 결제상태
        deli_status   :"doing",      // 배송상태
    },
    {
        user_id: "1",                                                 //아이디값
        goods_num: "C_123451231",                                     //발주번호
        Construction_name: "석촌호수공원 분수대 옆 호반베르디움 102동 604호 아파트리모델링",       //공사명
        Desired_Delivery_Date: "2022-05-11 19:00 도착예정",                   //희망배송일
        Delivery_destination_name: "경기 성남시 분당구 구미로 16 호반베르디움",       //배송지
        order_type: "ready",                                     //발주상태
        order_status  :"doing",      // 발주상태
        pay_status    :"ready",      // 결제상태
        deli_status   :"raedy",      // 배송상태
    },
    {
        user_id: "1",                                                 //아이디값
        goods_num: "A_123451231",                                     //발주번호
        Construction_name: "스타리우빌딩 3층 상가리모델링",       //공사명
        Desired_Delivery_Date: "2022-05-11 19:00 도착예정",                   //희망배송일
        Delivery_destination_name: "경기 성남시 분당구 구미로 16 호반베르디움",       //배송지
        order_type: "request",                                     //발주상태
        order_status  :"done",      // 발주상태
        pay_status    :"done",      // 결제상태
        deli_status   :"done",      // 배송상태
    },

];

//취소/반품내역
export const cancel_List = [

    {
        user_id: "1",                                                 //아이디값
        goods_num: "A_123451231",                                     //발주번호
        Construction_name: "호반베르디움 102동 604호 아파트리모델링",                //공사명
        Desired_Delivery_Date: "2022-05-11 19:00 도착예정",                   //희망배송일
        Delivery_destination_name: "경기 성남시 분당구 구미로 16 호반베르디움",       //배송지
        cancel_type: "doing",                                               //취소상태


    },
    {
        user_id: "1",                                                 //아이디값
        goods_num: "B_123451231",                                     //발주번호
        Construction_name: "스타리우빌딩 3층 상가리모델링",       //공사명
        Desired_Delivery_Date: "2022-05-11 19:00 도착예정",                   //희망배송일
        Delivery_destination_name: "경기 성남시 분당구 구미로 16 호반베르디움",       //배송지
        cancel_type: "done",                                            //취소상태
    },
    {
        user_id: "1",                                                 //아이디값
        goods_num: "C_123451231",                                     //발주번호
        Construction_name: "석촌호수공원 분수대 옆 호반베르디움 102동 604호 아파트리모델링",       //공사명
        Desired_Delivery_Date: "2022-05-11 19:00 도착예정",                   //희망배송일
        Delivery_destination_name: "경기 성남시 분당구 구미로 16 호반베르디움",       //배송지
        cancel_type: "doing",                                               //취소상태
    },
    {
        user_id: "1",                                                 //아이디값
        goods_num: "A_123451231",                                     //발주번호
        Construction_name: "스타리우빌딩 3층 상가리모델링",       //공사명
        Desired_Delivery_Date: "2022-05-11 19:00 도착예정",                   //희망배송일
        Delivery_destination_name: "경기 성남시 분당구 구미로 16 호반베르디움",       //배송지
        cancel_type: "done",                                            //취소상태
    },

];

//취소상세
export const cancel_d_List = [

    {
        user_id: "1",                                                   //아이디값
        goods_num: "165196846",                                         //상품번호
        title: "일반석고보드 9.5T X 900 X 1800",                          //상품명
        goods_thum: "../../assets/img/goods_thum1.jpg",             //상품이미지
        count: "15",                                                    //수량

        price: "3,5000",                                                //판매가
        total_price: "350,000",                                         //총금액


    },
    {
        user_id: "1",                                                   //아이디값
        goods_num: "165196846",                                         //상품번호
        title: "방부목 2×4×12",                          //상품명
        count: "15",                                                    //수량

        price: "3,5000",                                                //판매가
        total_price: "350,000",                                         //총금액
    },
    {
        user_id: "1",                                                   //아이디값
        goods_num: "165196846",                                         //상품번호
        title: "원목루바 레드파인",                          //상품명
        count: "15",                                                    //수량

        price: "3,5000",                                                //판매가
        total_price: "350,000",                                         //총금액
    },
    {
        user_id: "1",                                                   //아이디값
        goods_num: "165196846",                                         //상품번호
        title: "오비스기수직사이딩 17*140*3600",                          //상품명
        count: "15",                                                    //수량

        price: "3,5000",                                                //판매가
        total_price: "350,000",                                         //총금액
    },

];


// =================가격표 설정=====================//
export const Price = (text) => {
    return String(text).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// =================전화번호 입력제어=====================//
export const Phone = (num) => {
   return num.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

// =================사업자 번호 입력제어 입력제어=====================//
export const bizNum = (num) => {
    return num.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

// =================숫자만 입력 가능=================//
export const OnlyNum = (text) => {
    const val = text.target.value;
    val.replace(/[^0-9]/g, '');
};
// =================영어만 입력 가능===============//
export const OnlyEng = (text) => {
    const val = text.target.value;
    val.replace(/[^A-Za-z]/ig, '');
}

export const bankAccount = ["자재로(이정완)_국민은행 1234-23-5968714"];

export const AddrMatch = [
    {
        key          :"서울특별시",
        value        :"서울",
    },
    {
        key          :"부산광역시",
        value        :"부산",
    },
    {
        key          :"울산광역시",
        value        :"울산",
    },
    {
        key          :"대구광역시",
        value        :"대구",
    },
    {
        key          :"인천광역시",
        value        :"인천",
    },
    {
        key          :"대전광역시",
        value        :"대전",
    },
    {
        key          :"광주광역시",
        value        :"광주",
    },
    {
        key          :"세종특별자치시",
        value        :"세종",
    },
    {
        key          :"경기도",
        value        :"경기",
    },
    {
        key          :"강원도",
        value        :"강원",
    },
    {
        key          :"충청남도",
        value        :"충남",
    },
    {
        key          :"충청북도",
        value        :"충북",
    },
    {
        key          :"경상남도",
        value        :"경남",
    },
    {
        key          :"경상북도",
        value        :"경북",
    },
    {
        key          :"전라남도",
        value        :"전남",
    },
    {
        key          :"전라북도",
        value        :"전북",
    },
    {
        key          :"제주특별자치도",
        value        :"제주",
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
        "name"  :"직접입력",
        "val"   :"etc",
    },
    {
        "name"  :"다음(daum.net)",
        "val"   :"daum.net",
    },
    {
        "name"  :"한메일(hanmail)",
        "val"   :"hanmail.net",
    },
    {
        "name"  :"네이트(nate.com)",
        "val"   :"nate.com",
    },
    {
        "name"  :"구글(gmail.com)",
        "val"   :"gmail.com",
    },
    {
        "name"  :"야후(yahoo.com)",
        "val"   :"yahoo.com",
    },
];
