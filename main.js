const API_KEY= `50b049f2fbce4d8f94a2df193555ac3d`
let newsList = [];
const menus = document.querySelectorAll('.menus button');
menus.forEach((menu) =>
    menu.addEventListener("click", (e) => getNewsCategory(e) ) 
    );
let url =  new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

// 반복되는 함수 리팩토링
 const getNews = async() => {

    // 에러 발생시 처리하는 함수
    try{

    const response = await fetch(url);

    const data = await response.json();
    if(response.status === 200){
        if(data.articles.length===0) {
            throw new Error("No result for this search");
        }
        newsList = data.articles;
        totalResults = data.totalResults;
        render();    
        pagiNationRender();
    } else {
        throw new Error(data.message);
    }
    } catch(error){
        
        errorRender(error.message);
    }

    
 }
    
// 카테고리 클릭시 보여주는 함수
const getNewsCategory = async(e) => {
    const category = e.target.textContent.toLowerCase();
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)

    getNews();      
}

// 뉴스를 가지고 오는 함수
 const getLatesNews = async() => {
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);

        // 데이터 요청
        getNews();   
}


// 뉴스 보여주는 함수
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



// 검색 함수
const getNewsKeyword = async() => {
    const keyword = document.getElementById('search-input').value;
    
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);

    getNews(); 
}

// 에러메세지만 보여주는 함수 
const errorRender =  (errorMessage) => {
    const errorHTML =
    `<div class="alert alert-danger">
        ${errorMessage}
    </div>`

    document.getElementById("news-board").innerHTML=errorHTML;
}

const pagiNationRender = () =>{
    const pageGroup = Math.ceil(page/groupSize);
    const lastPage = pageGroup*groupSize;
    const firstPage = lastPage - (groupSize -1);

    let paginationHTML='';

    for(let i =firstPage; i <=lastPage; i++) {
        paginationHTML += `       
        <li class="page-item"><a class="page-link" href="#">${i}</a></li>
        `
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
    
//     <nav aria-label="Page navigation example">
//   <ul class="pagination">
//     <li class="page-item">
//       <a class="page-link" href="#" aria-label="Previous">
//         <span aria-hidden="true">&laquo;</span>
//       </a>
//     </li>
//     <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item"><a class="page-link" href="#">2</a></li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
//     <li class="page-item">
//       <a class="page-link" href="#" aria-label="Next">
//         <span aria-hidden="true">&raquo;</span>
//       </a>
//     </li>
//   </ul>
// </nav>
}

getLatesNews();