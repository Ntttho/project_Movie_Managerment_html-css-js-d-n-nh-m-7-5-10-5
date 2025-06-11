// document.querySelector("head").innerHTML += `<link rel="stylesheet" href="../css/layout.css"/>`
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "../css/layout.css";
document.head.appendChild(link);

const link1 = document.createElement("link");
link1.rel = "stylesheet";
link1.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css";
document.head.appendChild(link1);

document.querySelector("header").innerHTML += `
        <div class="logo">
            <img src="../assets/icon/logo.png" alt="NCC" onclick="location.href='./HomePage.html'">
            <div class="logo-text">
                <strong>TRUNG TÂM CHIẾU PHIM QUỐC GIA</strong>
                <p>National Cinema Cente</p>
            </div>
        </div>
        <input type="checkbox" id="menu-toggle" hidden>
        <label for="menu-toggle" class="menu-icon">
            <span></span>
            <span></span>
            <span></span>
        </label>
        <nav class="nav">
            <div class="nav-links">
                <a href="./HomePage.html" class="" id="HomePage.html">Trang chủ</a>
                <a href="./Calendar.html" id="Calendar.html">Lịch chiếu</a>
                <a href="./news.html" id="news.html">Tin tức</a>
                <a href="./promotions.html" id="promotions.html">Khuyến mãi</a>
                <a href="./ticket-price.html" id="ticket-price.html">Giá vé</a>
                <a href="./Festival.html" id="Festival.html">Liên hoan phim, Tuần phim</a>
                <a href="./admin/dashboard.html" class="text-red-gradient" id="admin">Admin</a>
            </div>
            <div class="button">
                <button class="button-black" id="openRegister">Đăng ký</button>
                <button class="button-red btn-red-gradient" id="openLogin">Đăng nhập</button>
            </div>
        </nav>`

document.body.insertAdjacentHTML("beforeend",
    `
<div class="modal-layout" id="ContainerLogRegis" style="display: none">
        <div class="blur"></div>

        <!-- login -->
        <div class="login-container" id="ContainerLogin" style="display: none;">
            <div class="couple">
                <h2 class="text-white">Đăng nhập</h2>
                <span class="close" id="closeBTN1">X</span>
            </div>
            <div class="login-box">
                <label for="emailLogin" class="text-white">Email</label>
                <input type="email" id="emailLogin" placeholder="Email" />
                <p class="text-danger" id="PemailLogin"></p>

                <label for="passwordLogin" class="text-white">Mật khẩu</label>
                <input type="password" id="passwordLogin" placeholder="Mật khẩu" />
                <p class="text-danger" id="PpasswordLogin"></p>

                <div class="forgot-password">
                    <a href="#">Quên mật khẩu?</a>
                </div>
                <button id="loginBtn" class="btn-red-gradient">Đăng nhập</button>
                <div class="link text-white" >
                    Bạn chưa có tài khoản? <a href="#" id="Dangkylai">Đăng ký</a>
                </div>
            </div>
        </div>

        <!-- register -->
        <div class="login-container text-white" id="ContainerRegister" style="display: none">
            <div class="couple">
                <h2>Đăng ký</h2>
                <span class="close" id="closeBTN2">X</span>
            </div>
            <div class="login-box">
                <label>Họ và tên</label>
                <div class="couple">
                    <div>
                        <input type="text" placeholder="Họ" id="firstName" />
                        <p class="text-danger" id="PfirstName"></p>
                    </div>
                    <div>
                        <input type="text" placeholder="Tên" id="lastName" />
                        <p class="text-danger" id="PlastName"></p>
                    </div>
                </div>
                <label>Tên tài khoản</label>
                <input type="text" placeholder="Tên tài khoản" id="userName" />
                <p class="text-danger" id="PuserName"></p>
                <label>Số điện thoại</label>
                <div class="couple">
                    <div>
                        <input type="number" placeholder="Số điện thoại" id="phoneNumber" />
                        <p class="text-danger" id="PphoneNumber"></p>
                    </div>
                    <div>
                        <input type="email" placeholder="Email" id="emailRegister" />
                        <p class="text-danger" id="PemailRegister"></p>
                    </div>
                </div>
                <label>Mật khẩu</label>
                <div class="couple">
                    <div>
                        <input type="password" placeholder="Mật khẩu" id="passwordRegister" />
                        <p class="text-danger" id="PpasswordRegister"></p>
                    </div>
                    <div>
                        <input type="password" placeholder="Xác nhận mật khẩu" id="confirmPassword" />
                        <p class="text-danger" id="PconfirmPassword"></p>
                    </div>
                </div>
                <button id="registerBtn" class="btn-red-gradient">Đăng ký</button>
                <div class="link">
                    Bạn đã có tài khoản? <a href="#" id="dangnhaplai">Đăng nhập</a>
                </div>
            </div>
        </div>
    </div>

`
    );



document.querySelector("footer").innerHTML += `
        <div class="footer-links">
            <a href="#">Chính sách</a>
            <a href="#">Lịch chiếu</a>
            <a href="#">Tin tức</a>
            <a href="#">Giá vé</a>
            <a href="#">Hỏi đáp</a>
            <a href="#">Liên hệ</a>
        </div>
        <div class="social-items">
            <div class="group">
                <img src="../assets/icon/facebook.png" alt="">
                <img src="../assets/icon/zalo.png" alt="">
                <img src="../assets/icon/youtube.png" alt="">
            </div>
            <div class="group">
                <img src="../assets/icon/ggplay.png" alt="">
                <img src="../assets/icon/appstore.png" alt="">
                <img src="../assets/icon/copyright.png" alt="">
            </div>
        </div>
        <div class="footer-info">
            <p>Cơ quan chủ quản: <strong>BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH</strong></p>
            <p>Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.</p>
            <p>Giấy phép số: 224/GP-TTĐT ngày 31/8/2010 - Chịu trách nhiệm: Vũ Đức Tùng – Giám đốc.</p>
            <p>Địa chỉ: 87 Láng Hạ, Quận Ba Đình, Tp. Hà Nội - Điện thoại: 024.35141791</p>
            <p>© 2023 By NCC - All rights reserved.</p>
        </div>
`

const script = document.createElement("script");
script.src = "../js/showModal-Login-Register.js";
document.body.appendChild(script);

// ============================================

// let component = document.getElementsByClassName("active")[0]
// component.classList.remove("active")

const current = window.location.pathname.split('/').pop()

let navLink = document.querySelectorAll("nav a")
navLink.forEach((Element, index) =>{
    if(Element.toString().includes(current)){
        navLink[index].classList.add("active")
    }
})


window.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const buttonContainer = document.querySelector(".button");

    if (user) {
        buttonContainer.innerHTML = `
            <div class="dropdown-user">
                <button class="btn-user" id="userMenuBtn">
                    <i class="fa-solid fa-user me-1"></i> ${user.firstName} ${user.lastName}
                    <i class="fa-solid fa-caret-down ms-1"></i>
                </button>
                <div class="dropdown-content" id="userDropdown">
                    <a href="#" id="logoutBtn">Đăng xuất</a>
                </div>
            </div>
        `;


        const userMenuBtn = document.getElementById("userMenuBtn");
        const dropdown = document.getElementById("userDropdown");
        userMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", () => {
            dropdown.style.display = "none";
        });

        // Logout
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.reload();
        });
    }
});

