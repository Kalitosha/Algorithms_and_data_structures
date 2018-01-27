function Link(data){
	this.data = data;
	this.next = null;
	this.previous = null;
}

function List() {
	var first = null;
}

function traverse(link) {
	console.log(link.data);
	if (link.next != null)
		traverse(link.next);
	/*
	console.log(link.data);
	while (link.next != null) {		
		link = link.next;
		console.log(link.data);
	}
	*/
}

function addFirst(linkList, data){ // вставка в начало

	if	(linkList.first == null){ // если это первый добавляемый элемент
		linkList.first = new Link(data);
	}	
	else { // если список не пуст
		var link = linkList.first;
				
		linkList.first = new Link(data);

		linkList.first.next = link;
		link.previous = linkList.first;

	}
}

function addLast(linkList, data){ // вставка в конец

	if	(linkList.first == null){ // если это первый добавляемый элемент
		linkList.first = new Link(data);
	}	
	else { // если список не пуст
		var link = linkList.first;
		while (link.next != null) {
			link = link.next;
		}
		link.next = new Link(data);
		var newLink = link.next;
		newLink.previous = link;
	}
}

function add(linkList, data, place) { // вставка в определенное место

	if	(linkList.first == null && place != 1){ // если это первый элемент списка
		alert('список пуст, элемент можно втавить только на первое место');
	} 
	else if (linkList.first == null && place == 1) { // если список пуст и добавляется первый эл-т
		linkList.first = new Link(data);
	}
	else if (place == 1) { // если вставка в начало
		addFirst(linkList, data);
	}
	else { // если вставка в середину или конец
		var link = linkList.first;
		var i = 1;
		while (link != null) {
			if (i != place) {
				i++;
				link = link.next;
			}
			else 			
				break;
		}
		if (i != place) // если place выходит за пределы списка
			alert('некорректное место для вставки');
		else {
			if (link == null) // если вставка в конец
				addLast(linkList, data);
			else { // вставка в середину
				var newLink = new Link(data);
				newLink.next = link;
				newLink.previous = link.previous;
				link.previous = newLink;
				link = newLink.previous;
				link.next = newLink;
			} 
		}		
	}
}
/*
function remove(linkList, data){
	var link = linkList.first;
	while (link.next != null) {
		if (link.data == data) {
			break;
		}
		else link = link.next; 		
	}
	if (link.data != data)
		alert(' элемент с таким содержимым не существует ');
	else {
		var dopLink = link.previous;
		dopLink.next = link.next;
		dopLink = link.next;
		dopLink.previous = link.previous;
		link = null;
	}
}
*/

var linkList = new List();
//console.log(linkList);
addLast(linkList, 5);
addLast(linkList, 6);
addLast(linkList, 7);
addLast(linkList, 8);
addLast(linkList, 3);
addLast(linkList, 2);
traverse(linkList.first);
console.log('_________________');
add(linkList, 10, 3);
addFirst(linkList, 1);
//remove(linkList, 5);
traverse(linkList.first);