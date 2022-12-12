export const regPW = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
export const regId = /^[a-z0-9_]{4,20}$/;
export const Minlangth = 6;

// 자재목록
export const goodsList = [
    {
        goods_uid:"125",
        goods_name:"일반석고보드 9.5T X 900 X 1800",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"당일출고 가능합니다.",
    },
    {
        goods_uid:"115",
        goods_name:"로하스",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"당일출고 가능합니다.",
    },
    {
        goods_uid:"119",
        goods_name:"도배장판",
        goods_price:"3,410",
        goods_wish_chk:"N",
        goods_cart_chk:false,
        goods_guid_link:"당일출고 가능합니다.",
    },
];



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
