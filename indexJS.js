
//클릭 전송
$('.picture').click(function(){
    console.log($(this).text().trim());
    var text = $(this).text().trim();
    switch(text){
        case "시바견":
            console.log("시바");
            window.location.href = "dog2.html";
            break;
        case "허스키":
            window.location.href = "dog.html";
            break;
        case "타조":
            window.location.href = "tajo.html";
            break;
        case "다람쥐":
            window.location.href = "squarrel.html";
            break;
        case "고양이":
            window.location.href = "cat.html";
            break;
        case "호랑이":
            window.location.href = "tiger.html";
            break;        
    }
})
