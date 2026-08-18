const testText = document.getElementById("test");
const image = document.getElementById("image");
const imageAdder = document.getElementById("addImage");
testText.textContent = "가족 웹사이트 환영해요!!"
imageAdder.addEventListener("click", function () {
    image.src = "logo.png"
});
if (localStorage.getItem("data") === null) {
    localStorage.setItem("data", JSON.stringify([]));
}
if (localStorage.getItem("log") === null) {
    localStorage.setItem("log", JSON.stringify([]));
}
if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify([]));
}
const data = JSON.parse(localStorage.getItem("data"))
const users = JSON.parse(localStorage.getItem("users"))
const log = JSON.parse(localStorage.getItem("log"))
let userId = 'none'
function genCode(mode, cod, reward) {
    data.push({ 'mode': mode, 'code': cod, 'reward': reward, 'expired': 0 })
    localStorage.setItem('data', JSON.stringify(data))
};
function signUp(id, pw) {
    let isFound = 0
    if (id != '') {
        if (pw != '') {
            for (let i = 0; i < users.length; i++) {
                if (users[i]['id'] == id) {
                    isFound++
                };
            };
            if (isFound == 0) {
                users.push({ 'id': id, 'pw': pw, '마사지': 0, '뽀뽀': 0 })
                localStorage.setItem('users', JSON.stringify(users))
                alert('계정이 생성되었습니다.')
            }
            else {
                alert('해당 아이디는 이미 존재합니다.')
            }
        }
        else {
            alert('비밀번호는 비어있을 수 없습니다.')
        }
    }
    else {
        alert('아이디는 비어있을 수 없습니다.')
    }
}
function logIn(id, pw) {
    let isFound = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i]['id'] == id) {
            if (users[i]['pw'] == pw) {
                userId = i;
                alert('로그인에 성공했습니다.')
                isFound = 1;
            }
        }
    };
    if (isFound == 0) {
        alert('아이디나 비밀번호가 일치하지 않습니다.')
    }
    if (users.length == 0) {
        alert('유저가 없습니다.')
    }
}
function useCode(code) {
    if (userId != 'none') {
        let isFound = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i]['code'] == code) {
                if (data[i]['expired'] == 0) {
                    isFound = 1;
                    alert('코드 보상을 받았습니다.')
                    data[i]['expired'] = 1;
                    localStorage.setItem('data', JSON.stringify(data))
                    users[userId][data[i]['mode']] += data[i]['reward']
                }
            }
        };
        if (isFound == 0) {
            alert('해당 코드를 찾을 수 없습니다.')
        }
    }
    else {
        alert('로그인 후 이용해 주세요.')
    }
}
function checkRewards() {
    if (userId != 'none') {
        alert('뽀뽀: ' + users[userId]['뽀뽀'] + '회, 마사지: ' + users[userId]["마사지"] + '분')
    }
    else {
        alert('로그인 이후 이용해 주세요.')
    }
}
function useReward(mode, amount) {
    if (userId != 'none') {
        if (Number.isInteger(amount)) {
            if (amount >= 0) {
                if (users[userId][mode] >= amount) {
                    users[userId][mode] -= amount
                    alert(mode + '를 ' + amount + ' 사용했습니다. (스크린샷 찍어 인증, 못 찍었다면 따로 연락)')
                    log.push(users[userId]['id'] + ' 님이 ' + mode + ' ' + amount + ' 사용')
                    localStorage.setItem('log', JSON.stringify(log))
                }
                else {
                    alert('받은 보상이 부족합니다.')
                }
            }
            else {
                alert('사용량은 0 이상이어야 합니다.')
            }
        }
        else {
            alert('사용량은 정수여야 합니다.')
        }
    }
    else {
        alert('로그인 이후 이용해 주세요.')
    }
}
document.getElementById('SignUpButton').addEventListener("click", function () {
    signUp(document.getElementById('inputId').value, document.getElementById('inputPw').value)
});
document.getElementById('LogInButton').addEventListener("click", function () {
    logIn(document.getElementById('inputId').value, document.getElementById('inputPw').value)
});
document.getElementById('UseCodeButton').addEventListener('click', function () {
    useCode(document.getElementById('inputCode').value)
})
document.getElementById('checkRewardsButton').addEventListener('click', function () {
    checkRewards()
})
document.getElementById('useRewardButton').addEventListener('click', function () {
    if (document.getElementById('inputUse').value != '') {
        if (document.getElementById('checkK').checked == true) {
            if (document.getElementById('checkM').checked == false) {
                useReward('뽀뽀',Number(document.getElementById('inputUse').value))
            }
            else {
                alert('하나만 선택해 주세요.')
            }
        }
        else if (document.getElementById('checkM').checked == true) {
            if (document.getElementById('checkK').checked == false) {
                useReward('마사지',Number(document.getElementById('inputUse').value))
            }
            else {
                alert('하나만 선택해 주세요.')
            }
        }
        else {
            alert('사용할 것을 하나 선택해 주세요.')
        }
    }
    else{
        alert('사용량을 입력해 주세요.')
    }
})