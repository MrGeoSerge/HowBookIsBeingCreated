//расставляем справа карточки вертикально с наложением
var numberOfCards = 21;//количество карточек
var cardId;//ID карточки
var topIndent = 10;//отступ сверху
var vIndent = 40;//вертикальный отступ между карточками

var cards = [];//создаем массив карточек

for(cardId = 1; cardId <= numberOfCards; cardId++){
	//присваиваем массиву id div-ов с карточками
	cards[cardId-1] = document.getElementById("card-" + cardId);

	//расставляем карточки сверху вниз 
	cards[cardId-1].style.top = topIndent + "px";
	topIndent+=vIndent;
	
	//расставляем картинки в карточки
	cards[cardId-1].style.backgroundImage = "url(images/book" + cardId + ".png)";
	
	//делаем картинку видимой при наведении
	cards[ cardId - 1 ].addEventListener( "mouseover", function(){
		this.style.zIndex = 10;
	} )
	
	//скрываем картинку при отведении мышки
	cards[cardId-1].addEventListener( "mouseout", function(){
		this.style.zIndex = "auto";
	} )

	
}

//перетягивание картинки

//при клике мы берем координаты
var movingCard = cards[5];


movingCard.addEventListener("mousedown", moveCurCard);

var innerIntendX;
var innerIntendY;

function moveCurCard(event){
	innerIntendX = event.clientX - getComputedStyle(movingCard).left.slice(0,-2);
	innerIntendY = event.clientY - getComputedStyle(movingCard).top.slice(0,-2);
	
	//при движении после клика
	movingCard.addEventListener("mousemove", move2card)
}

function move2card(event){
			movingCard.style.left = event.clientX - innerIntendX + 'px';
			movingCard.style.top = event.clientY - innerIntendY + 'px';
}
	//при отпускании мыши возвращаем назад
	

	

	movingCard.addEventListener("mouseup", function(event){
		//берем координаты ячейки

		if(0 < event.clientX && event.clientX < 230 && 0 < event.clientY && event.clientY < 230) {
			movingCard.style.left = "0px";
			movingCard.style.top = "0px";	
		}
		else {
			movingCard.style.left = "";
			movingCard.style.top = "";
		}
		
		movingCard.removeEventListener("mousemove", move2card);

	 })
