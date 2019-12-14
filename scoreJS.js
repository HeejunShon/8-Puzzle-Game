

function writeScore(){
    $.ajax({
        url: "testphp.php",
        dataType: "json",
        success: function(data){
            // $.each(data, function(key, value) {
            //     // $('h1').append(value.time+"</br>");
            // });

            //상위 성적 9개 출력 
            for(var i=0; i<9; i++){
                $('h1').append((i+1) + "."+ "&nbsp; &nbsp; " + data[i].time + "</br>");
            }
        },
        error: function(request, status, error){
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });   
}

writeScore();

//사이드 클릭 시 퍼즐 변경
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
