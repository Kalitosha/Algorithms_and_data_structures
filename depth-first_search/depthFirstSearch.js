var arrMatrix = [ //матрица смежности
	[0, 1, 1, 1, 0, 0, 0, 0],
	[1, 0, 0, 1, 0, 0, 1, 0],
	[1, 0, 0, 0, 1, 1, 0, 0],
	[1, 1, 0, 0, 1, 0, 0, 0],

	[0, 0, 1, 1, 0, 0, 0, 1],
	[0, 0, 1, 0, 0, 0, 0, 1],
	[0, 1, 0, 0, 0, 0, 0, 1],
	[0, 0, 0, 0, 1, 1, 1, 0],
    ];
    


var currentNode = 0; // текущая вершина, т.е. та, для которой смотрим смежные
const countNodes = 8; // количество вершин в графе
var arrVisited = [];
for (var i = 0; i < countNodes; i++) {
     arrVisited[i] = false;   
}

function DFS(currentNode) {
    var stack = [currentNode]; // положили вершину, с которой начнем обход
    while (stack.length != 0){
        currentNode = stack.pop();
        arrVisited[currentNode] = true;
        console.log('currentNode = ' + currentNode);
        for (var i = 0; i < countNodes; i++) {
            if (arrMatrix[currentNode][i] != 0) {
                if (arrVisited[i] == false) {
                    stack.push(i);  
                    break;                  
                }
            }
        }
    }
}

function recursionDFS(currentNode) {

    arrVisited[currentNode] = true;
    console.log('currentNode = ' + currentNode);
    for (var i = 0; i < countNodes; i++) {
       if (arrMatrix[currentNode][i] != 0) {
            if (arrVisited[i] == false) {
                recursionDFS(i);
            }
       }       
    }
}

//recursionDFS(currentNode);
console.log('________________');
//DFS(currentNode);


function traversalGraphInWidth(currentNode){
    var queue = [currentNode];
    while (queue.length != 0) {
        // берем текущую вершину
        currentNode = queue[0];
        // помечаем вершину, как посещенную
        console.log('currentNode = ' + currentNode);
        arrVisited[currentNode] = true; 
        // ищем смежные вершины для текущей // идем по матрице смежности
        for (var i = 0; i < countNodes; i++) {
            // если у текущей вершины есть смежная
            if (arrMatrix[currentNode][i] != 0) { 
                // проверяем, не посещали ли мы ее ранее
                if (arrVisited[i] == false) {                
                    // если еще не посещали, самое время посетить                    
                    arrVisited[i] = true;; 
                    // добавляем в конец очереди
                    queue.push(i);                 
                }
            }
        }        
        // удаляем первый элемент из очереди, т.е. текущую вершину
        queue.shift() 
    }
}
traversalGraphInWidth(currentNode);


