var canvas = document.getElementById('myCanvas'); // подключаем canvas по id
var ctx = canvas.getContext('2d'); // задаем контекст

window.addEventListener('resize', resizeCanvas, false);
/*************************************************************************/
const countNodes = 8; // количество вершин в графе
var arrMatrix = new Array(); // матрица смежности

var queue = [0]; // сюда будем добавлять все смежные вершины и удалять те, в которых уже побывали // первая вешнина - нулевая

var currentNode = 0; // текущая вершина, т.е. та, для которой смотрим смежные
var arrVisited = [0]; // массив посещенных и просмотренных вершин

var similar = false; // понадобится для проверки на совпадение с массивом arrVisited
/***********************************************************************************************/
var graph = new Springy.Graph(); // задаем граф, который будет отображаться с помощью библиотеки

window.onload = function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    init();
}

function resizeCanvas() { // вызывается при изменении размеров окна
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

function init() {

    InitMatrix();

    arrMatrix[0] = [-1, 2, 5, 3, 0, 0, 0, 0];
    arrMatrix[1] = [2, -1, 0, 1, 0, 0, 8, 0];
    arrMatrix[2] = [5, 0, -1, 0, 2, 4, 0, 0];
    arrMatrix[3] = [3, 1, 0, -1, 2, 0, 0, 0];

    arrMatrix[4] = [0, 0, 2, 2, -1, 0, 0, 1];
    arrMatrix[5] = [0, 0, 4, 0, 0, -1, 0, 5];
    arrMatrix[6] = [0, 8, 0, 0, 0, 0, -1, 6];
    arrMatrix[7] = [0, 0, 0, 0, 1, 5, 6, -1];

    draw(); // отрисовываем граф
}

function InitMatrix(){ // обнуляем матрицу смежности (элементы главной диагонали = -1)

    for (var i = 0; i < countNodes; i++) {

        arrMatrix[i] = new Array; // делаем из каждого элемента массив, в результате получаеся двумерный м.

        for (var j = 0; j < countNodes; j++){

            if (i == j) {
                arrMatrix[i][j] = -1;
            } 
            else{
                arrMatrix[i][j] = 0;
            }
        }
    }
}

document.addEventListener("keydown", function(e) { // срабатывает при нажатии кнопки на клавиатуре 

        if(queue.length != 0){ 
            traversalGraphInWidth() // главная функция алгоритма
        }
}, true)

function traversalGraphInWidth(){

    currentNode = queue[0]; // берем текущую вершину 
    arrVisited[currentNode] = currentNode; // помечаем вершину, как посещенную

    for (var i = 0; i < countNodes; i++) { // ищем смежные вершины для текущей // идем по матрице смежности   
                 
        if ( (arrMatrix[currentNode][i] != -1) && (arrMatrix[currentNode][i] != 0) ){ // если у текущей вершины есть смежная

            for (var j = 0; j < arrVisited.length; j++) { // проверяем, не посещали ли мы ее ранее

                if (i == arrVisited[j]) { 
                    similar = true; // если нашли хотя бы одно совпадение
                    break; // выходим из цикла
                }
            }
            if (similar == false) { // если еще не посещали, самое время посетить
                arrVisited.push(i); // отмечаем как посещенную
                queue.push(i);  // добавляем в конец очереди               
                addEdge(currentNode, i); // закрашиваем ребро
            }
            similar = false; // возвращаем значение в исходное состояние для корректной работы следущей итерации
        }
    }        
    queue.shift() // удаляем первый элемент из очереди, т.е. текущую фершину
}

function draw() { // функция отрисовки графа // непосредственная работа с библиотекой
    
    arrDraw = new Array; // создаем
    for (var i = 0; i < countNodes; i++) { 
        arrDraw[i] = graph.newNode({label: i}); // добавляем вершину для отрисовки
    }
    var j; // объявляем здесь, чтобы она не создавалась каждый раз при новой итерации цикла с i
    for (var i = 0; i < countNodes; i++) { // идем по матрице смежности
        for (j = 0; j < i; j++){ // т.к. матрица семмитрична, достаточно проверить элементы, находящиеся под диагональю минус единиц
            if ( (arrMatrix[i][j] != -1) && (arrMatrix[i][j] != 0) ){ // проверяем наличие ребер
                graph.newEdge(arrDraw[i], arrDraw[j], {color: 'rgb(255, 255, 255)'}); // добавляем ребро для отрисовки
            }
        }
    }

    $('#myCanvas').springy({ graph: graph }); // отрисовываем
}

function addEdge(node1, node2){

    graph.newEdge(arrDraw[node1], arrDraw[node2], {color: 'rgb(255, 0, 0)'});
}
