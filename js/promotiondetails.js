let url = new URLSearchParams(window.location.search);
let id = Number(url.get("id"));
const promotionsLists = JSON.parse(localStorage.getItem("promotions")) || [];
let promotionItems = promotionsLists.find(item => item.id === id);

if (promotionItems) {
    let div = document.querySelector(".news-detail");
    let des = promotionItems.description.replace(/\n/g, "<br>");

    div.innerHTML = `
        <h3>${promotionItems.title}</h3>
        ${des}
    
    `;
    promotionItems.img.forEach((img) => {
        console.log(img);

        div.innerHTML += `
        <img src="${img}" alt="" class="news-detail-img">
        `;
    });
}
