/*
		 8
	 3		 10
  1    6	   14
	  4	7    13	
*/



function Node(data){
	this.data = data;
	this.left = null;
	this.right = null;
}

function traverse(node) { // обход дерева
	
	if (node != null) {
		console.log(node.data);
		traverse(node.left);
		//console.log(node.data); /*обходит так: 1 3 4 6 7 8 10 13 14*/
		traverse(node.right);

	}
}; 

function search(node, data) { 
/* рукурсия 
	if (node == null || data == node.data) {
		return node.data;
	}
	if (data < node.data) 
		return search(node.left, data);
	else 
		return search(node.right, data);
*/	
	while (node != null && data != node.data){
		if (data < node.data) 
			node = node.left;
		else 
			node = node.right;
	}
	return node.data;
}

/*
	if (node != null) {		
		if (data != node.data) {			
			if (data < node.data)
				search(node.left, data);
			else
				search(node.right, data);
		}
		else {
			console.log(node.data);
			return node.data; // тут какая-то дичь происходит, но алгоритм работает правильно
		} 
	}  
*/
/*
	var stack = [];
	while(stack.length != 0 || node != null){
		
		if (node != null) {	
			if (data == node.data) { 
				console.log(node.data); 
				return node.data; 
			}				
			if (node.right != null) {
				stack.push(node.right);
			}
			node = node.left;			
		} else {
			node = stack.pop();
		}
	}
*/	



function addNode(node, data){

	if (node.data == data) {
		console.log("узел " + data + " уже существует");
		return;
	} else 
	if (node.data > data) {
		console.log('left');
		if (node.left != null)
			addNode(node.left, data);
		else {
			node.left = new Node(data);
			return;
		}
	} else
	if (node.data < data) {
		console.log('right');
		if (node.right != null) 
			addNode(node.right, data);
		else{
			node.right = new Node(data);
			return;
		}
	} 
}


function countOfNodes(node){
	
	var count = 0;
	var stack = [];
	while(stack.length != 0 || node != null){

		if (node != null) {
			count++;
			//console.log( 'node.data = '+ node.data );
			if (node.right != null) {
				stack.push(node.right);
			}
			node = node.left;
		} else {
			node = stack.pop();
		}	
	}	
	return count;
}


function heightTree(node){

	if (node == null) {
		return 0;
	}
	else {
		var heightLeft = heightTree(node.left);
		var heightRight = heightTree(node.right);
		return 1+Math.max(heightLeft, heightRight);
	}

/* сокращенный вариант
	if (node == null) {
		return 0;
	}
	else {
		return 1+Math.max( heightTree(node.left), heightTree(node.right) );
	}
*/
}


function removeNode(node, data){
/*
	var parent = node;
	// надо найти вершину для удаления	
	while (node != null && data != node.data){
		parent = node;
		if (data < node.data) 
			node = node.left;
		else 
			node = node.right;
	}	
	var delNode = node; // удаляемая вершина

	//если узел не имеет потомков, он просто удаляется
	if (delNode.left == null && delNode.right == null) {
		if (parent.left == delNode) // удаляем ссылку на узел из родителя
			parent.left = null;
		else if (parent.right == delNode)
			parent.right = null;
		delNode = null;		
	}
	// если нет правого потомка, узел заменяется левымм поддеревом
	else if (delNode.right == null && delNode.left != null) {
		if (parent.left == delNode) // двигаем указатель родителя
			parent.left = delNode.left;
		else if (parent.right == delNode)
			parent.right = delNode.left;
		delNode = null;		
	}
	// если нет левого потомка, узел заменяется правым поддеревом
	else if (delNode.left == null && delNode.right != null) {
		if (parent.left == delNode) // двигаем указатель родителя
			parent.left = delNode.right;
		else if (parent.right == delNode)
			parent.right = delNode.right;
		delNode = null;	
	}
	// если есть оба потомка, узел заменяется следующим по величине(один шаг вправо, после влево до упора)
	else {
		// ищем узел для замены
		node = node.right;
		var parentNode; 
		while (node.left != null){		
			parentNode = node;
			node = node.left;
		}	
		//далее надо заменить удаляемый на найденный и поменять все ссылкина него
		if (node.right != null) { // если у найденного есть правый ребенок, надо подвинуть ссылки

		}
		else {

		}
	}
*/

	var parentDelNode = node;
	// надо найти вершину для удаления	
	while (node != null && data != node.data){
		parentDelNode = node;
		if (data < node.data) 
			node = node.left;
		else 
			node = node.right;
	}	
	var delNode = node; // удаляемая вершина

	if (delNode.right != null) { // если есть правый потомок и не важно, есть ли левый
		console.log('есть правый')
		var parentNode = node;
		node = node.right; //Спускаемся на один уровень вправо	

		if (node.left != null) {
			console.log('node.left != null');
			while(node.left != null){ // дальше идем влево до упора
				parentNode = node;
				node = node.left;
			} // node это наш "узел на замену"

			if (node.right == null) { //теперь надо проверить, есть ли у него правый ребенок							
				parentNode.left = null;
			}
			else { // если у найденного есть правый потомок
				parentNode.left = node.right; // заменяем ссылку у "узла на замену"								
			}			
			node.right = delNode.right;	
			//node.left = delNode.left;
		}

		//node.right = delNode.right;
		node.left = delNode.left;
		//if (parentDelNode != delNode) { // если это не корень		
			parentDelNode.right = node;			
		//}
		//delNode = node;	
		delNode = null;
		node = null;
	}
	else if (delNode.left != null) { // если нет правого узла и есть только левый
		console.log('есть только левый')
		//if (parentDelNode != delNode) { // надо учитывать не удаляем ли мы корень		
			if (parentDelNode.left == delNode) // меняем указатели
				parentDelNode.left = delNode.left;
			else if (parentDelNode.right == delNode)
				parentDelNode.right = delNode.left;
		//}
		delNode = null;

	}
	else { // если нет дочерних узлов
		console.log('нет дочерних узлов')
		//if (parentDelNode != delNode) { // надо учитывать не удаляем ли мы корень
			if (parentDelNode.left == delNode) // удаляем ссылку на узел из родителя
				parentDelNode.left = null;
			else if (parentDelNode.right == delNode)
				parentDelNode.right = null;
		//}
		delNode = null;		
	}

}

var root = new Node(8); // создаем корень

addNode(root, 3);
console.log('________');

addNode(root, 6);
console.log('________');

addNode(root, 7);
console.log('________');

addNode(root, 1);
console.log('________');

addNode(root, 10);
console.log('________');

addNode(root, 14);
console.log('________');

addNode(root, 13);
console.log('________');

addNode(root, 4);
console.log('________');


traverse(root); // обход дерева
console.log('________');

console.log( '\nвсего '+ countOfNodes(root) +' узлов');

console.log( 'высота равна: '+ heightTree(root));

console.log( 'search: '+ search(root, 6) );
console.log('________');

removeNode(root, 8);
console.log( '\nвсего '+ countOfNodes(root) +' узлов');
traverse(root); // обход дерева