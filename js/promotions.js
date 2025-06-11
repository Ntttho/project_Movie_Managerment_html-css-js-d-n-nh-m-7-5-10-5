const newsBody = document.getElementById("newsBody");
let countPromotionsPage = 8;
let currentPage = 0;

const promotionsLists = JSON.parse(localStorage.getItem("promotions")) || [];
let totalpages = Math.ceil(promotionsLists.length / countPromotionsPage);



function renderPromotions(promotionsLists) {
    newsBody.innerHTML = "";
    promotionsLists.forEach(p => {
        const promotionsItem = `
        <div class="cursor news-mother" onclick="window.location.href='promotionsdetails.html?id=${p.id}'">
    <img src="${p.img[0]}" alt="PHIM THẬT HAY">
    <div class="news-baby">
      <h3 class="news-date">${p.date}</h3>
      <p class="news-title"> ${p.title}</p>
    </div>
  </div>
        `;
        newsBody.innerHTML += promotionsItem;
    });

    document.getElementById("pagination").innerHTML = `
        <button class="btnclick ${currentPage == 0 ? "return" : ""}" onclick="prevPage()">Quay lại</button>
        <button class="btnclick ${currentPage == totalpages-1 ? "return" : ""}" onclick="nextPage ()">Tiếp theo</button>
    `
}
renderPromotions(paginationPromosionList(currentPage));

function prevPage(){
    if(currentPage > 0){
        currentPage--
        renderPromotions(paginationPromosionList(currentPage))
    }
}

function nextPage (){
    if(currentPage < totalpages - 1){
        currentPage++;
        renderPromotions(paginationPromosionList(currentPage))
        console.log(currentPage)
    }
}

function paginationPromosionList(page){
    let startIndex = page*countPromotionsPage
    let endIndex = startIndex + countPromotionsPage
    return promotionsLists.slice(startIndex, endIndex)
}