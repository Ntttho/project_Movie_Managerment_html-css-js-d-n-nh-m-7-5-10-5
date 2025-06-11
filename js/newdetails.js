let url = new URLSearchParams(window.location.search);
let id = Number(url.get("id"));
const news = JSON.parse(localStorage.getItem("news")) || [];
let newsItem = news.find(item => item.id === id);

if (newsItem) {
    let div = document.querySelector(".news-detail");
    let des = newsItem.description.replace(/\n/g, "<br>");

    div.innerHTML = `
        <h3>${newsItem.title}</h3>
        ${des}
    
    `;
    newsItem.img.forEach((img) => {
        console.log(img);
        
        div.innerHTML += `
        <img src="${img}" alt="" class="news-detail-img">
        `;
    });
}
