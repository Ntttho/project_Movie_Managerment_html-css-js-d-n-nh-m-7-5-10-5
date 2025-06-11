let account = JSON.parse(localStorage.getItem("accounts"))
let user = JSON.parse(localStorage.getItem("user"))

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

let checkHide = 0

let ContainerLogRegis = document.getElementById("ContainerLogRegis");
let ContainerLogin = document.getElementById("ContainerLogin")
let ContainerRegister = document.getElementById("ContainerRegister")
// btn open modal register and login
let openRegister = document.getElementById("openRegister")
let  openLogin = document.getElementById("openLogin")
// close button
let closeBTN1 = document.getElementById("closeBTN1")
let closeBTN2 = document.getElementById("closeBTN2")
// re register login
let Dangkylai = document.getElementById("Dangkylai")
let dangnhaplai = document.getElementById("dangnhaplai")

// P error text-danger Register
let PfirstName = document.getElementById("PfirstName")
let PlastName = document.getElementById("PlastName")
let PuserName = document.getElementById("PuserName")
let PphoneNumber = document.getElementById("PphoneNumber")
let PemailRegister = document.getElementById("PemailRegister")
let PpasswordRegister = document.getElementById("PpasswordRegister")
let PconfirmPassword = document.getElementById("PconfirmPassword")

// P error text-danger login
let PemailLogin = document.getElementById("PemailLogin")
let PpasswordLogin = document.getElementById("PpasswordLogin")

// submit button
let registerBtn = document.getElementById("registerBtn")
let loginBtn = document.getElementById("loginBtn")

// navlink admin
let a_admin = document.getElementById("admin")
// a_admin.style.display = "none"
// a_admin.style.padding = "3px"
// a_admin.style.border = "solid 0.3px white"
// a_admin.style.borderRadius = "5px"
// a_admin.style.backgroundColor = "rgb(155, 13, 1)"

// reset Register
const resetRegister = () =>{
PfirstName.textContent = ""
    PlastName.textContent = ""
    PuserName.textContent = ""
    PphoneNumber.textContent = ""
    PemailRegister.textContent = ""
    PpasswordRegister.textContent = ""
    PconfirmPassword.textContent = ""
}

function ShowHide(){
    if(checkHide == 0){
        ContainerLogRegis.style.display = "none"
        ContainerLogin.style.display = "none"
        ContainerRegister.style.display = "none"
    }else{
        // 1 login 2 register
        ContainerLogRegis.style.display = ""
        if(checkHide == 1){
            ContainerLogin.style.display = ""
            ContainerRegister.style.display = "none"
            // p error = ""
            PemailLogin.textContent = ""
            PpasswordLogin.textContent = ""

        }else if(checkHide == 2){
            ContainerLogin.style.display = "none"
            ContainerRegister.style.display = ""
            // p error = ""
            resetRegister()
        }
    }
} // => 2 register/ 1 login

// show register modal
if(openRegister != null){
    openRegister.addEventListener("click", ()=>{
        checkHide = 2
        ShowHide()
    })
}
Dangkylai.addEventListener("click", ()=>{
    checkHide = 2
    ShowHide()
})

// show login modal
if(openLogin != null){
    openLogin.addEventListener("click", ()=>{
        checkHide = 1
        ShowHide()
    })
}

dangnhaplai.addEventListener("click", ()=>{
    checkHide = 1
    ShowHide()
})

// hide modal popup
closeBTN1.addEventListener("click", ()=>{
    checkHide = 0
    ShowHide()
})
closeBTN2.addEventListener("click", ()=>{
    checkHide = 0
    ShowHide()
})

// submit form register
registerBtn.addEventListener("click", ()=>{
    // window.alert("hello may")
    let firstName = document.getElementById("firstName")
    let lastName = document.getElementById("lastName")
    let userName = document.getElementById("userName")
    let phoneNumber = document.getElementById("phoneNumber")
    let emailRegister = document.getElementById("emailRegister")
    let passwordRegister = document.getElementById("passwordRegister")
    let confirmPassword = document.getElementById("confirmPassword")

    // tao ra 1 bien xac nhan all
    let valRegister = 0;

    // firstName
    if(firstName.value == ""){
        PfirstName.textContent = "Họ không được để trống"
    } else{
        PfirstName.textContent = ""
        valRegister++ 
        // 1
    }

    // lastName
    if(lastName.value == ""){
        PlastName.textContent = "Tên không được để trống"
    }else{
        PlastName.textContent = ""
        valRegister++
        // 2
    }
    // userName khong bo trống không cách không trùng
    if(userName.value == ""){
        PuserName.textContent = "Tên tài khoản không được để trống"
    } else if(checkSpace(userName.value)){
        PuserName.textContent = "Tên tài khoản không được chứa khoảng trắng"
    } else{
        let x = account.some(element => {return element.userName == userName.value})
        if(x){
            PuserName.textContent = "Tên tài khoản này đã tồn tại rồi"
        }else{
            PuserName.textContent = ""
            valRegister++
        }
    }


    // phoneNumber (khong duoc de trong)
    if(phoneNumber.value.toString().length != 10 || !phoneNumber.value.toString().startsWith('0')){
        PphoneNumber.textContent = "Số điện thoại không hợp lệ"
    } else {
        let x = account.some(element => {return element.phoneNumber == phoneNumber.value})
        if(x){
            PphoneNumber.textContent = "Số điện thoại này đã tồn tại rồi"
        }else{
            PphoneNumber.textContent = ""
            valRegister++
        }
        // 4
    }
    // emailRegister
    if( validateEmail(emailRegister.value) == null){
        console.log(validateEmail(emailRegister.value));
        PemailRegister.textContent = "Email không hợp lệ"
    } else {

        let check = 1
        account.forEach(element => {
            if(emailRegister.value == element.email){
                check = 0
                console.log(emailRegister.value);
                return
            }
        })

        if(check == 0){
            PemailRegister.textContent = "Email này đã tồn tại"
        }else{
            PemailRegister.textContent = ""
            valRegister++
            // 5
        }
    }

    // password
    if( passwordRegister.value.length < 6){
        PpasswordRegister.textContent = "Mật khẩu nhiều hơn 6 ký tự"
    }else{
        if(passwordRegister.value != confirmPassword.value){
            PconfirmPassword.textContent = "Mật khẩu phải trung khớp"
        }else{
            PconfirmPassword.textContent = ""
            valRegister++
            // 6
        }
    }
    console.log(valRegister);
    
    // register success
    if(valRegister == 6){
        console.log(account);
        
        account.push({
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            email: emailRegister.value,
            phoneNumber: phoneNumber.value,
            password: passwordRegister.value,
            role: "user"
        })
        localStorage.setItem("accounts", JSON.stringify(account))
        
        resetRegister()
        firstName.value = ""
        lastName.value = ""
        userName.value = ""
        phoneNumber.value = ""
        emailRegister.value = ""
        phoneNumber.value = ""
        passwordRegister.value = ""
        confirmPassword.value = ""

        checkHide = 1
        ShowHide()
        // window.location.reload();
    }
})

loginBtn.addEventListener("click", ()=>{
    let emailLogin = document.getElementById("emailLogin")
    let passwordLogin = document.getElementById("passwordLogin")
    // email password
    let check = 0
    
    for(let index in account){
        if(account[index].email == emailLogin.value && account[index].password == passwordLogin.value){
            check++
            user = account[index]
            break
        }
    }

    if(check == 1){
        // window.alert("dang nhap thanh cong")
        console.log(user);
        localStorage.setItem("user",JSON.stringify(user))
        checkHide = 0
        ShowHide()
        if(user.role == "admin") a_admin.style.display = "block"
        else {a_admin.style.display = "none"}
        window.location.reload()

    }else{
        console.log(emailLogin.value , passwordLogin.value);
        PpasswordLogin.textContent = "Email hoặc mật khẩu không đúng"
    }
    
})

function checkSpace(str) {
    return /\s/.test(str);
}

if(user != null)
if(user.role == "admin"){
    a_admin.style.display = "block"
}else{
    a_admin.style.display = "none"
}