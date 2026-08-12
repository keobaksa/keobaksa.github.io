const testText = document.getElementById("test");
const image = document.getElementById("image");
const imageAdder = document.getElementById("addImage");
testText.textContent = "가족 웹사이트 환영해요!!"
imageAdder.addEventListener("click",function(){
    image.src = "logo.png"
});