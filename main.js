const API_KEY= `50b049f2fbce4d8f94a2df193555ac3d`

// 뉴스를 가지고 오는 함수
const getLatestNews = () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    console.log(url)
}
getLatestNews();