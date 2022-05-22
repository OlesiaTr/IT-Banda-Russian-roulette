// 1. При нажатии на кнопку "Начать":
// 1.1 Сделать кнопку не активной
// 1.2 Вставить патрон в барабан
// 1.3 Начать крутить барабан
// 1.4 Скрыть пулю
// 1.5 Записать случайное число от 1 до 6, это число отвечает за место пули в барабане
// 1.6 Отобразить револьвер
// 1.7 Изменить текст кнопки на "Сделать выстрел"
// 1.8 Сделать кнопку активной

// 2. При нажатии на кнопку "Сделать выстрел"
// 2.1 Проверяется число выстрела
// 2.2 Если пуля совпадает числу пули в барабане, то персонаж убит
// 2.3 Иначе револьвер переворачивается и далее повторяется п.2
// 2.4 При успешном выстреле залить соответствующую иконку красной жидкостью
// 2.5 Прокрутить барабан

// 3.При завершении игры
// 3.1 Изменить текст кнопки на "Рестарт"
// 3.2 При нажатии на эту кнопку перезагрузить страницу

// Мои переменные
var countShot = 0;
var bulletPosition = random(1, 6);
var btnShot = document.querySelector("#shot");
var bullet = document.querySelector("#bullet");
var revolver = document.querySelector("#revolver");
var currentPlayer = 1;
var baraban = document.querySelector("#baraban");
var rotate = 0;
var rotateBaraban = 0;

btnShot.onclick = start;

// Первый клик по кнопке "Начать"
function start() {
  btnShot.className = "off";

  bullet.style.display = "block";

  revolver.style.display = "block";

  btnShot.onclick = "";
  var timer = setInterval(function () {
    rotate = rotate + 10;
    baraban.style.transform = "rotate(" + rotate + "deg)";
    if (rotate > 300) {
      bullet.style.display = "none";
    }
    if (rotate == 720) {
      clearInterval(timer);
      btnShot.innerText = "Сделать выстрел";
      btnShot.onclick = shot;

      btnShot.className = "";
    }
  }, 50);
}

//Количество выстрелов
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Делаем выстрел
function shot() {
  countShot = countShot + 1;

  if (bulletPosition == countShot) {
    var blood = document.createElement("div");
    blood.id = "blood";
    var player = document.querySelector("#player" + currentPlayer);
    player.appendChild(blood);
    endGame();
  } else {
    if (currentPlayer == 1) {
      rotationRight();
      currentPlayer = 2;
    } else {
      rotationLeft();
      currentPlayer = 1;
    }
    var rotate = rotateBaraban;
    var timer = setInterval(function () {
      rotate = rotate + 10;
      baraban.style.transform = "rotate(" + rotate + "deg)";
      if (rotate == rotateBaraban + 60) {
        clearInterval(timer);
        rotateBaraban = rotate;
      }
    }, 10);
  }
}

// Поворот револьвера
function rotationRight() {
  revolver.style.background = 'url("./images/revolver-right.png") no-repeat';
}
rotationRight();

function rotationLeft() {
  revolver.style.background = 'url("./images/revolver-left.png") no-repeat';
}
rotationLeft();

// Конец игры
function endGame() {
  alert("Game over!!");
  btnShot.innerText = "Restart";
  btnShot.onclick = restart;
}

// Рестарт игры
function restart() {
  location.reload();
}
