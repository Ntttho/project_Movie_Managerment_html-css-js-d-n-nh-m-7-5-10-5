let newMain= document.getElementById("newsMain");
const news = JSON.parse(localStorage.getItem("news")) || [];
let countNewsPage = 8;
let currentPage = 0;
let totalPages = Math.ceil(news.length / countNewsPage);


function renderNews(news){
    newMain.innerHTML = "";
    news.forEach((n) =>{
        let newsItem = `
        <div class="cursor news-mother" onclick="window.location.href='newdetails.html?id=${n.id}'">
        <img src="${n.img[0]}" alt="News Image">
        <div class="news-baby">
            <h3 class="news-date"> ${n.date}</h3>
            <p class="news-title"> ${n.title}</p>
        </div>
    </div>
        `;
        newMain.innerHTML += newsItem;

    })
    document.getElementById("pagination").innerHTML = `
            <button class="btnclick ${currentPage == 0 ? "return" : ""}" onclick="prevPage()">Quay lại</button>
            <button class="btnclick ${currentPage == totalPages - 1? "return" : ""}" onclick="nextPage()">Tiếp theo</button>
    `
}
renderNews(paginationNewsList(currentPage));


function prevPage(){
    if(currentPage > 0 ){
        currentPage--;
        renderNews(paginationNewsList(currentPage));
    }
}
function nextPage(){
    if( currentPage < totalPages - 1){
        currentPage++;
        renderNews(paginationNewsList(currentPage));

    }
}
function paginationNewsList(page){
    let startIndex = page * countNewsPage;
    let endIndex = startIndex + countNewsPage;
    return news.slice(startIndex, endIndex);
}