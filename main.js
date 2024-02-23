const API_KEY= `50b049f2fbce4d8f94a2df193555ac3d`
let newsList = [];
// 뉴스를 가지고 오는 함수
 const getNews = async() => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);

        // 데이터 요청
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log(newsList);
}

const render = () => {
    let newsHTML = ``;
    newsHTML = newsList.map(
        (news) =>`
     <div class="container row news">
    <div class="col-lg-4 col-md-6">
        <img src=${news.urlToImage} class="news-img-size">
    </div>

    <div class="col-lg-8 col-md-6">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
        <div>
            ${news.source.name} ${news.publishedAt}
        </div>
    </div>
</div>`
);

    document.getElementById('news-board').innerHTML = newsHTML;
}

getNews();
