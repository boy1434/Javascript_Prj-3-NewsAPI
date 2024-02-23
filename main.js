const API_KEY= `50b049f2fbce4d8f94a2df193555ac3d`

// 뉴스를 가지고 오는 함수
 const getNews = async() => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

        // 데이터 요청
    const response = await fetch(url);
    console.log(response);
}
getNews();