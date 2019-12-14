
var column = 3, row = 3;
var blank = column*row -1;
var BLANK;
var board = [];
var img = "dog2.jpg";
var starts = false;

//퍼즐시간 전송
function sendTime() {
    var hour = Math.floor(totalSeconds /3600);
    var minute = Math.floor((totalSeconds - hour*3600)/60);
    var seconds = totalSeconds - (hour*3600 + minute*60);
    var time = {"hour":hour, "minute":minute, "seconds":seconds};

    $.ajax({
        url: "try.php",
        type: "post",
        data: time,
    }).done(function(data) {
        alert(data);
    });
}


function changeWidth(changeP){
    var windowWidth = $(window).width()-10;
    var lengthP = (windowWidth)/3;
    console.log('현재 넓이 :' + windowWidth + ","  + lengthP);
    //모바일 리사이즈
    if(windowWidth < 768){
        $('.background').css('width', (windowWidth+6)+'px');
        $('.background').css('height', windowWidth+'px');
        for(var i = 1; i<=9; i++){
            $('.puzzle:nth-child(' + i + ')').css('width', lengthP+'px');
            $('.puzzle:nth-child(' + i + ')').css('height', lengthP+'px');
        }
        for(var i = 1; i<=3; i++){
            $('.puzzle:nth-child(' + i + ')').css('left', (lengthP * (i-1))+'px');
            if(changeP)
                $('.puzzle:nth-child(' + i + ')').css('background-position', -(lengthP * (i-1))+'px '+0+'px');
        }
        for(var i = 4; i<=6; i++){
            $('.puzzle:nth-child(' + i + ')').css('top', lengthP+'px');
            $('.puzzle:nth-child(' + i + ')').css('left', (lengthP * (i-4))+'px');
            if(changeP)
                $('.puzzle:nth-child(' + i + ')').css('background-position', -(lengthP * (i-4))+'px '+ -lengthP+'px');
        }
        for(var i = 7; i<=9; i++){
            $('.puzzle:nth-child(' + i + ')').css('top', (lengthP*2)+'px');
            $('.puzzle:nth-child(' + i + ')').css('left', (lengthP * (i-7))+'px');
            if(changeP)
                $('.puzzle:nth-child(' + i + ')').css('background-position', -(lengthP * (i-7))+'px '+ -(lengthP*2)+'px');
        }
    }
    else{
        //복원 (기본 430 x 430)
        $('.background').css('width', 426+'px');
        $('.background').css('height', 420+'px');
        for(var i = 1; i<=9; i++){
            $('.puzzle:nth-child(' + i + ')').css('width', 140+'px');
            $('.puzzle:nth-child(' + i + ')').css('height', 140+'px');
        }
        for(var i = 1; i<=3; i++){
            $('.puzzle:nth-child(' + i + ')').css('left', (140 * (i-1))+'px');
            if(changeP)
                $('.puzzle:nth-child(' + i + ')').css('background-position', -(140 * (i-1))+'px '+0+'px');
        }
        for(var i = 4; i<=6; i++){
            $('.puzzle:nth-child(' + i + ')').css('top', 140+'px');
            $('.puzzle:nth-child(' + i + ')').css('left', (140 * (i-4))+'px');
            if(changeP)
                $('.puzzle:nth-child(' + i + ')').css('background-position', -(140 * (i-4))+'px '+ -140+'px');
        }
        for(var i = 7; i<=9; i++){
            $('.puzzle:nth-child(' + i + ')').css('top', (140*2)+'px');
            $('.puzzle:nth-child(' + i + ')').css('left', (140 * (i-7))+'px');
            if(changeP)
                $('.puzzle:nth-child(' + i + ')').css('background-position', -(140 * (i-7))+'px '+ -(140*2)+'px');
        }
    }
}

//창 크기 변화시
$( window ).resize(function() {
    changeWidth(false);
 });


// 페이지 로딩 -> 퍼즐 초기화 
initPuzzle(img);

//퍼즐 클릭
$('.puzzle:nth-child(1)').click(function(){
    console.log('1 클릭');
    move(this, true);
})

$('.puzzle:nth-child(2)').click(function(){
    console.log('2 클릭');
    move(this, true);
})

$('.puzzle:nth-child(3)').click(function(){
    console.log('3 클릭');
    move(this, true);
})

$('.puzzle:nth-child(4)').click(function(){
    console.log('4 클릭');
    move(this, true);
})

$('.puzzle:nth-child(5)').click(function(){
    console.log('5 클릭');
    move(this, true);
})

$('.puzzle:nth-child(6)').click(function(){
    console.log('6 클릭');
    move(this, true);
})

$('.puzzle:nth-child(7)').click(function(){
    console.log('7 클릭');
    move(this, true);
})

$('.puzzle:nth-child(8)').click(function(){
    console.log('8 클릭');
    move(this, true);
})

$('.puzzle:nth-child(9)').click(function(){
    console.log('9 클릭');
    move(this, true);
})

// 퍼즐 섞기
function shuffle(){
    //ran = 1~9 5000번 무작위 생성, 이동
    for(var i = 0; i<500; i++){
        var ran = Math.floor(Math.random() * 9) + 1;
        // console.log('랜'+ ran);
        move($('.puzzle:nth-child(' + ran + ')'), false);
    }
    //board[] 재배열
    arrangeBoard();
}

// board, 퍼즐 초기화, 빈칸 생성
function initPuzzle(image) {
    img = image;
    //board, 퍼즐 초기화
    for(var i = 1; i <= 9; i++){
        board[i-1] = i;
        $('.puzzle:nth-child(' + i + ')').css({"background-image":"url(" + image + ")"});
        $('.puzzle:nth-child(' + i + ')').text(i);
        console.log($('.puzzle:nth-child(' + i + ')').text());
    }
    $('.puzzle').css("margin", "1px");
    changeWidth(true);
    
    //BLANK = 9
    BLANK = board[8];
    $('.puzzle:nth-child(' + BLANK + ')').css({"background-image":"url('')"});
    //섞기
    findBlank(board);
    shuffle();
    //타이머 초기화
    clearInterval(timer);
    starts = false;
    $('#timer').css("color", "black");
    $('#timer').css("font-weight", "initial");
}

//빈칸 위치 찾기
function findBlank(board){
    var loc;
    for(var i=0; i<9; i++){
        if(board[i] == BLANK){
            loc = i;
            break;
        }
    }
    // console.log('보드: ' + board + ' 빈칸: ' + (loc+1));
    return loc;
}

//board[] 재배열
function arrangeBoard(){
    for(var i=0; i<9; i++){
        board[i] = Number($('.puzzle:nth-child(' + (i+1) + ')').text().trim());
    }
    // console.log('새 보드 :' + board);
}

//퍼즐 이동
function move(to, manual){
    var num = Number($(to).text().trim());
    // console.log('번호 : ' + num);
    // console.log('인덱스:' + board.indexOf(num));
    // console.log('빈칸인덱스: ' + findBlank(board));


    //Index : [0, 1, 2] 
    //        [3, 4, 5]
    //        [6, 7, 8]

    //퍼즐,빈칸 열 동일
    if((board.indexOf(num)%3) == (findBlank(board)%3)){
        if(board.indexOf(num)-findBlank(board) == 3){
            console.log("위로 이동");
        }
        else if(findBlank(board)-board.indexOf(num) == 3){
            console.log("아래로 이동");
        }
        else{
            console.log("열 이동x");
            // console.log('블랭크열 :' +findBlank(board));
            return;
        }
    }//퍼즐,빈칸 행 동일
    else if(parseInt(board.indexOf(num)/3) == parseInt(findBlank(board)/3)){
        if(board.indexOf(num)-findBlank(board) == 1){
            console.log("왼쪽 이동")
        }
        else if(findBlank(board)-board.indexOf(num) == 1){
            console.log("오른쪽 이동")
        }
        else{
            console.log("행 이동x");
            return;
        }
    }
    else{
        console.log("이동x");
        // console.log('블랭크행 :' +findBlank(board));
        return;
    }

    //백그라운드-포지션 교환
    var temp = $(to).css("background-position");
    $(to).css("background-position", $('.puzzle:nth-child(' + (findBlank(board)+1) + ')').css("background-position"));
    $('.puzzle:nth-child(' + (findBlank(board)+1) + ')').css("background-position", temp);


    //그림 교환(그림 <-> 빈칸)
    $(to).css({"background-image":"url('')"});
    $('.puzzle:nth-child(' + (findBlank(board)+1) + ')').css({"background-image":"url(" + img + ")"});

    
    //span num 교환
    $('.puzzle:nth-child(' + (findBlank(board)+1) + ')').text(num);   
    $(to).text(BLANK);
    
    //board[]  업데이트
    arrangeBoard();
    
    //클릭 시 게임시작, 타이머 작동
    if(manual == true && starts == false){
        timer = setInterval(countTimer, 1000);
        starts = true;
        console.log('--타이머 시작--')
    }
    
    //정답 검사
    if(manual == true){
        isCorrect();
    }
}

//퍼즐 완성 검사
function isCorrect(){
    for(var i = 0; i < 9; i++){
        if(board[i] != (i+1)){
            return;
        }
    }
    alert('정답!');
    $('#timer').css("color", "blue");
    $('#timer').css("font-weight", "bold");
    $('.puzzle').css("margin", "0");
    clearInterval(timer);
    //시간 서버로 전송
    sendTime();
}

//타이머
var timer;
var totalSeconds = 0;

function countTimer() {
   ++totalSeconds;
   var hour = Math.floor(totalSeconds /3600);
   var minute = Math.floor((totalSeconds - hour*3600)/60);
   var seconds = totalSeconds - (hour*3600 + minute*60);

   if(hour != 0){
        $('#timer').html(leadingZeros(hour,2) + " : " + leadingZeros(minute,2) + " : " + leadingZeros(seconds,2));
   }
   else{
        $('#timer').html(leadingZeros(minute,2) + " : " + leadingZeros(seconds,2));
   }
}

//0추가
function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();
  
    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  }


//사이드 클릭 시 퍼즐 변경
$('.picture').click(function(){
    var imgS = $(this).html().trim().substring(10);
    img = imgS.substr(0, imgS.length - 2);
    totalSeconds = 0;
    manual = false;
    changePuzzle(img)
})


//퍼즐 변경
function changePuzzle(newImage){
    $('.puzzle').css({"background-image":"url(" + newImage + ")"});
    console.log($('.puzzle').css("background-image"));
    initPuzzle(newImage);
}