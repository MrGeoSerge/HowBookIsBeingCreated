//опля

///лгаорамормо
//трах-тиби-дох

//глобальные переменные для карточек
var numberOfCards = 21;//количество карточек
var cardId;//ID карточки
var topIndent = 0;//отступ сверху
var vIndent = 46;//вертикальный отступ между карточками
var cardXSize = 225;
var cardYSize = 225;
var cardXFullSize = cardXSize + (2 + 3) * 2;//полный размер с border и margin
var cardYFullSize = cardYSize + (2 + 3) * 2;//полный размер с border и margin
var cardFieldX = 3; //поле карточек по горизонтали (3 карточки в линию)
var cardFieldY = 7; //поле карточек по вертикали
var headerHeight = 161;//высота заголовка игры
var cards = [];//создаем массив карточек

//чтобы растягивание окна браузера не влияло на координаты мы из координат будем вычитать левый маржин
	var marginLeft = getComputedStyle(document.getElementById('wrapper')).marginLeft.slice(0,-2);

//массив с описанием этапов технологического процесса
var StagesDescription = [];
StagesDescription[0] = 'Автора відвідала Муза. Створення рукопису майбутньої книги';
StagesDescription[1] = 'Автор відніс рукопис книги до видавництва';
StagesDescription[2] = 'Попередній перегляд редактором рукопису книги. Винесення рішення про прийняття книги до друку';
StagesDescription[3] = 'Укладання угоди між автором та видавництвом. Авторська винагорода';
StagesDescription[4] = 'Редагування рукопису книги';
StagesDescription[5] = 'Набір тексту';
StagesDescription[6] = 'Коректура набору. Виправлення помилок';
StagesDescription[7] = 'Верстання. Компонування тексту, виготовлення схем, таблиць та малюнків';
StagesDescription[8] = 'Коректура верстки. Виправлення помилок';
StagesDescription[9] = 'Дизайн обкладинки книги';
StagesDescription[10] = 'Підписання верстки книги в технічного редактора';
StagesDescription[11] = 'Підписання книги в директора';
StagesDescription[12] = 'Відправка фотоформ майбутньої книги до типографії';
StagesDescription[13] = 'Закупівля сировини, необхідної для друку книги';
StagesDescription[14] = 'Друк внутрішнього блоку книги';
StagesDescription[15] = 'Друк обкладинки книги';
StagesDescription[16] = 'Збірка внутрішнього блоку та обкладинки книги';
StagesDescription[17] = 'Транспортування надрукованих книг на склад видавництва';
StagesDescription[18] = 'Транспортування книг до мережі збуту (книжкові магазини, книжковий ринок та ін.)';
StagesDescription[19] = 'Продаж книг';
StagesDescription[20] = 'Використання вчителями книг ВГ «Основа» під час проведення уроків';


//-----------------------
//карточки на левом поле 
//создаем объекты с координатами карточек
var CardsCoordinates = [];

//создаем объект Координаты карт, где будут храниться координаты всех карт
function CardXY(XLeft, XRight, YTop, YBottom, Occupied = false){
	this.XLeft = XLeft;
	this.XRight = XRight;
	this.YTop = YTop;
	this.YBottom = YBottom;
	this.Occupied = Occupied;
}

//прорисовываем серые карты на левом поле
var cardsDrawing = [];//создаем массив карт, в которых будем хранить div-ы карт

var gameField = document.getElementById("game-field"); //игровое поле
for (var i=0; i<numberOfCards; i++){
	var XLeft = i % cardFieldX * cardXFullSize;
	var XRight = i % cardFieldX * cardXFullSize  + cardXSize;
	var YTop = Math.floor(i/cardFieldX) * cardYFullSize + topIndent;
	var YBottom = Math.floor(i/cardFieldX) * cardYFullSize + cardYSize + topIndent; 

	CardsCoordinates[i] = new CardXY(XLeft, XRight, YTop, YBottom);

	cardsDrawing[i] = document.createElement('div');
	cardsDrawing[i].className = 'stages';
	cardsDrawing[i].style.position = "absolute";
	cardsDrawing[i].style.top = YTop + "px";
	cardsDrawing[i].style.left = XLeft + "px";
	cardsDrawing[i].style.zIndex = 0;
	cardsDrawing[i].innerHTML = (i+1) + "<div class=\"description\">" + StagesDescription[i] + "</div>";
	
	
	//добавляем анимацию
	if(!(i%3)) {
		$( cardsDrawing[i] ).addClass( "wow bounceInLeft" );
	}
	if(!((i-2)%3)){
			$( cardsDrawing[i] ).addClass( "wow bounceInRight" );
		}
	if(!((i-1)%3)){
		$( cardsDrawing[i] ).addClass( "wow bounceInUp" );
	}
	gameField.appendChild(cardsDrawing[i]);
}


//------------------
//перемешивание карт
var mixedCards = []; //массив перемешанных карт 
//индексом будет номер перемешанной карты, а значением - номер правильной карты

//задаем значение от 1 до 21
for (var i = 1; i <= numberOfCards; i++){
	mixedCards[i] = i; 
	}
//вызываем у массива метод сортировки и
mixedCards.sort(compareRandom);

//... и как функцию подставляем метод случайных чисел
function compareRandom(a, b) {
  return Math.random() - 0.5;
}
console.log( mixedCards );






//-----------------------
//блок для расставления карточек справа
for(cardId = 1; cardId <= numberOfCards; cardId++){
	cards[mixedCards[cardId-1]-1] = document.createElement('div');
	cards[mixedCards[cardId-1]-1].className = "cards";
		
	//расставляем карточки сверху вниз 
	cards[mixedCards[cardId-1]-1].style.top = topIndent + "px";
	topIndent+=vIndent;
	
	//расставляем картинки в карточки
	cards[mixedCards[cardId-1]-1].style.backgroundImage = "url(images/book" + mixedCards[cardId-1] + ".png)";
	
	gameField.appendChild(cards[mixedCards[cardId-1]-1]);
	
	//переменная прямоугольник для выделения объекта при наведении мыши и снятия выделения
	var cardSelected = document.createElement('div');
	cardSelected.className = "card-selected";
	cards[mixedCards[cardId-1]-1].appendChild(cardSelected);

	//делаем картинку видимой при наведении
	cards[ mixedCards[cardId-1] - 1 ].firstChild.addEventListener( "mouseover", showMouseOver);
	
	//скрываем картинку при отведении мышки
	cards[mixedCards[cardId-1]-1].firstChild.addEventListener( "mouseout", hideCard);

	//добавляем метод возвращения карты назад при неправильном ходе
	cards[mixedCards[cardId-1]-1].CardBack = function (){
		this.style.transition = "all 1s ease-out 0.5s";
		this.style.webkitTransition = "all 1s ease-out 0.5s";
		this.style.left = "";
		this.style.zIndex ="auto";
		this.style.top = cardComputedTop;
		this.style.borderColor = "";
		this.removeEventListener("mousemove", moveCard);
		this.firstChild.addEventListener( "mouseout", hideCard);
		
		//используем замыкания, чтобы можно было передать в функцию аргумент
		var self = this;
		function cancelTransition(){
			self.style.webkitTransition = "all 0s ease-out 0s";
		}
		setTimeout(cancelTransition,2000);
	};
}

//функция для скрытия картинки в правом 
function hideCard(){
		this.parentNode.style.zIndex = "auto";
}

//функция делания картинки видимой при наведении
function showMouseOver(){
		this.parentNode.style.zIndex = 30;
}
//-----------------------
//перетягивание карточек
var innerIntendX; //отступ, чтобы вычислить, в каком месте картинки кликнули по Х
var innerIntendY; //отступ, чтобы вычислить, в каком месте картинки кликнули по Y

var cardComputedTop;//переменная будет хранить отступ сверху для карточки, которую вытягиваем, 


//при нажатии на картинку вызываем функцию, которая считает координаты нажатия, относительно карточки
//и вызывает функцию передвижения
function activateCard(event){
	//чтобы растягивание окна браузера не влияло на координаты мы из координат будем вычитать левый маржин
	marginLeft = getComputedStyle(document.getElementById('wrapper')).marginLeft.slice(0,-2);


	innerIntendX = event.pageX -marginLeft - getComputedStyle(this).left.slice(0,-2);
	innerIntendY = event.pageY - getComputedStyle(this).top.slice(0,-2);
	
	//запоминаем Top карточки, чтобы можно было вернуть ее назад
	
	if(this.style.zIndex == 30){
		cardComputedTop = getComputedStyle(this).top;
	}

	//при движении после клика
	this.addEventListener("mousemove", moveCard)
}

//функция передвижения карточки
function moveCard(event){
	this.style.left = event.pageX -marginLeft - innerIntendX + 'px';
	this.style.top = event.pageY - innerIntendY + 'px';
	this.style.zIndex = 35;
	this.addEventListener("mouseup", mouseCardUp);

	//удаляем прокрутку правого поля при передвижении карты
	window.removeEventListener("scroll", runOnScroll);
}



//функция отпускания мыши и освобождения карточки
function mouseCardUp(event){
		//берем координаты ячейки
	

	
	//добавляем прокрутку правого поля после опускания карты
	window.addEventListener("scroll", runOnScroll);

	//пробегаем по циклу и сверяем координаты положенной карты со всеми остальными
	for(var i = 0; i < numberOfCards; i++) {
		
		//если карта еще не положена
		if(CardsCoordinates[i].XLeft < (event.pageX - marginLeft) && (event.pageX - marginLeft) < CardsCoordinates[i].XRight && CardsCoordinates[i].YTop < (event.pageY - 161) && (event.pageY - 161) < CardsCoordinates[i].YBottom) {
			
			//если ячейка занята
			if(CardsCoordinates[i].Occupied == true){
				this.CardBack();
				return;
			}


			this.style.left = CardsCoordinates[i].XLeft + "px";
			this.style.top = CardsCoordinates[i].YTop + "px";	
			this.style.zIndex = 25;
			this.removeEventListener("mousemove", moveCard);
			//this.firstChild.removeEventListener( "mouseout", hideCard);//чтобы не вызывалась функция прятать карты при отведении
			 
			//и сравниваем его с индексом карт
			
			
			if (cards.indexOf(this) == i) {
			//выясняем индекс переданного в функцию массива cards
			//условие, если правильно карта положена
				
				//задаем зеленую границу для правильно положенной карты
				this.style.borderColor = "green";
				this.style.zIndex = 34;
				rightAnswer();
				this.removeEventListener("mousedown", activateCard);
				this.removeEventListener("mousemove", moveCard);
				this.removeEventListener("mouseup", mouseCardUp);
				this.firstChild.remove();
				//this.firstChild.removeEventListener("mouseover", showMouseOver);
				CardsCoordinates[i].Occupied = true;
				RedrawRightColumn();
				return;
			}
			else {
				this.style.borderColor = "red";
				// this.style.left = CardsCoordinates[i].XLeft + "px";
				// this.style.top = CardsCoordinates[i].YTop + "px";	
				wrongAnswer();
				
				//замыкание, чтобы передать this в setTimeout
				var self = this;
				function delay(){
					self.CardBack()
				}
				setTimeout(delay, 500);
				return;
			}
	}

			

	}
	this.CardBack();
		
		//this.removeEventListener("mousemove", moveCard);
		//this.removeEventListener("mousedown", activateCard);//не надо удалять этот обработчик, иначе карта после опускания не двигается
	 
}


//правый столбец перерисовывается после правильного ответа
//наверх поднимаются все карты выше правильной
var startIndentTop = 0;
function RedrawRightColumn(){
	topIndent = startIndentTop;
	for(cardId = 1; cardId <= numberOfCards; cardId++){
		//расставляем карточки сверху вниз 
		if (cards[mixedCards[cardId-1]-1].style.zIndex != 34){
		cards[mixedCards[cardId-1]-1].style.top = topIndent + "px";
		topIndent+=vIndent;
		}
	}
}

//функция возвращения карты назад на правое поле
//делаем через метод
// function CardBack(){
// 	this.style.left = "";
// 	this.style.zIndex ="auto";
// 	this.style.top = cardComputedTop;
// 	this.style.borderColor = "";
// 	this.removeEventListener("mousemove", moveCard);
// 	this.addEventListener( "mouseout", hideCard);
// }

//цикл, чтобы активировать у всех карточек функции передвижения
for(cardId = 1; cardId <= numberOfCards; cardId++){

	//назначаем событие на нажатие карты
	cards[cardId-1].addEventListener("mousedown", activateCard);

	//при отпускании мыши возвращаем назад
	//cards[cardId-1].addEventListener("mouseup", mouseCardUp)
}


var countRhtAns = 0;
//счетчик правильных ответов
//вірно 4 з 21
function rightAnswer(){
	countRhtAns++;
	showPointsRight()
}

function wrongAnswer(){
	// мы не будем вычитать очки
	showPointsWrong()
}

var points;
//показываем очки
	points = document.createElement('div');
	points.className = 'show-points';
	points.style.position = "fixed";
	points.style.top = document.documentElement.clientHeight/2 - 17 + "px";
	points.style.left = document.documentElement.clientWidth/2 - 115 + "px";
	points.style.zIndex = 100;
	points.style.display = "none";



function showPointsRight(){
	points.style.display = "block"
	points.innerHTML = "Вірно! " + countRhtAns + " з " + numberOfCards + '!';
	document.body.appendChild(points);
	if( countRhtAns==numberOfCards ){
			win();
	}
	else{
		setTimeout(function(){ points.style.display = "none"}, 2000);
	}
}

function showPointsWrong(){
	points.style.display = "block"
	points.innerHTML = "Невірно! " + countRhtAns + " з " + numberOfCards + '!';
	document.body.appendChild(points);
	setTimeout(function(){ points.style.display = "none"}, 2000);
	
}

function win(){
	points.style.display = "block"
	points.style.height = "auto";
	points.innerHTML = "Вітаємо. Ви виграли. Золотими монетами вiдображено вiдноснi витрати на кожний етап виробництва.";
	document.body.appendChild(points);
	showProductionCosts();
}

//при скроле правый блок едет вниз
window.addEventListener("scroll", runOnScroll);
function runOnScroll() {
  //console.log(window.pageYOffset);
  if(window.pageYOffset > 175 && window.pageYOffset < 1000 ){
  	startIndentTop = pageYOffset - 175;
  	RedrawRightColumn();
  };
  
}



//функция показа затрат на производство
function showProductionCosts(){
	//массив затрат: индекс - номер карты, значение - количество монет
	var costs = [0, 0, 0, 5, 2, 1, 1, 2, 1, 2, 1, 0, 1, 6, 4, 4, 2, 2, 2, 6, 0];
	

	//объявление метода рисования монеток у каждой карты
	for(cardId = 1; cardId <= numberOfCards; cardId++){
		
		cards[cardId-1].drawCoins = function(coinsNumber){
			
			var bottomIndent = 10;//отступ снизу
			
			for(var i = 0; i < coinsNumber; i++) {
				var coinDraw = document.createElement('div');
				coinDraw.className = "coin";
				coinDraw.style.bottom = bottomIndent*i + 10 + "px"
				this.appendChild(coinDraw);
			}
		}
	}

	for(i = 0; i < numberOfCards; i++){
		cards[i].drawCoins(costs[i]);
	}

}




//функция рисования затрат в отдельной карте
// function DrawCoins(coinsNumber){
	
// 	var bottomIndent = 10;//отступ снизу

// 	for(var i = 0; i < coinsNumber; i++) {
// 		var coinDraw = document.createElement('div');
// 		coinDraw.className = "coin";
// 		coinDraw.style.bottom = bottomIndent*i + 10 + "px"
// 		this.appendChild(coinDraw);
// 	}
// }

//добавляем анимацию
new WOW().init();
