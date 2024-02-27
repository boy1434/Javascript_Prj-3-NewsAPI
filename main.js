const API_KEY= `50b049f2fbce4d8f94a2df193555ac3d`
let newsList = [];
const menus = document.querySelectorAll('.menus button');
menus.forEach((menu) =>
    menu.addEventListener("click", (e) => getNewsCategory(e) ) 
    );

    //1. 버튼에 클릭이벤트 주기
const getNewsCategory = async(e) => {
    const category = e.target.textContent.toLowerCase();
    console.log(category);
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)

    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log(data); 
          
}

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
).join('');

    document.getElementById('news-board').innerHTML = newsHTML;
}

getNews();



//2. 카테고리별 뉴스 가져오기
//3. 가져온 카테고리별 뉴스 보여주기

