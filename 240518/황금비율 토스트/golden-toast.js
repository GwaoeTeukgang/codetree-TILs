// Node 클래스를 만들어줍니다.
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

// 이중 연결 리스트 클래스를 만들어줍니다.
class DoublyLinkedList {
    constructor() {
        this.END = new Node(-1);                         // 구현의 편의를 위해 dummy 값을 넣어놓고 시작합니다.
        this.head = this.END;
        this.tail = this.END;
    }

    pushFront(newData) {                                 // 원소를 첫 번째 위치에 넣어줍니다.
        const newNode = new Node(newData);               // 새로운 노드를 만들어줍니다.
        newNode.next = this.head;                        // 새로운 노드의 next 값을 head로 바꿔줍니다.

        this.head.prev = newNode;                        // 이전 head의 prev값을 바꾼 뒤
        this.head = newNode;                             // head값을 변경해줍니다.
        newNode.prev = null;
    }

    pushBack(newData) {                                  // 원소를 맨 끝 위치에 넣어줍니다.
        if (this.begin() === this.end()) {               // 만약 리스트가 비어있다면
            this.pushFront(newData);                     // 맨 앞에 원소를 넣어주는 것과 로직이 같습니다.
        } else {
            const newNode = new Node(newData);           // 새로운 노드를 만들어줍니다.
            newNode.prev = this.tail.prev;               // 새로운 노드의 prev 값을 맨 끝 dummy의 prev로 변경해준 뒤
            this.tail.prev.next = newNode;               // 맨 끝 dummy의 next로 새로운 노드를 연결해주고
            newNode.next = this.tail;                    // 새로운 노드의 next값을 맨 끝 dummy 값으로 바꿔주고
            this.tail.prev = newNode;                    // 맨 끝 dummy의 prev값을 새로운 노드로 변경합니다.
        }
    }

    erase(node) {
        const nextNode = node.next;

        if (node === this.begin()) {                     // 만약 head가 삭제되어야 한다면
            const temp = this.head;
            temp.next.prev = null;                       // 새로 head가 될 노드의 prev값을 지워줍니다.
            this.head = temp.next;                       // head값을 새로 갱신해주고
            temp.next = null;                            // 이전 head의 next 값을 지워줍니다.
        } else {                                         // head가 삭제되는 것이 아니라면
            node.prev.next = node.next;                  // 바로 전 노드의 next값을 바꿔주고
            node.next.prev = node.prev;                  // 바로 다음 노드의 prev값을 바꿔주고
            node.prev = null;                            // 해당 노드의 prev 와
            node.next = null;                            // 해당 노드의 next 값을 모두 지워줍니다.
        }

        return nextNode;
    }

    insert(node, newData) {
        if (node === this.end()) {                       // node가 맨 끝 위치에 있다면
            this.pushBack(newData);                      // 맨 뒤에 원소를 추가합니다.
        } else if (node === this.begin()) {              // node가 맨 앞 위치에 있다면
            this.pushFront(newData);                     // 맨 앞에 원소를 추가합니다.
        } else {                                         // 그렇지 않다면
            const newNode = new Node(newData);           // 새로운 노드를 만들어줍니다.
            newNode.prev = node.prev;                    // 새로운 노드의 prev값을 node의 prev값으로 하고
            newNode.next = node;                         // 새로운 노드의 next값을 node로 하고
            node.prev.next = newNode;                    // node의 prev의 next값을 새로운 노드로 변경하고
            node.prev = newNode;                         // node의 prev 값을 새로운 노드로 변경합니다.
        }
    }

    begin() {
        return this.head;
    }

    end() {
        return this.tail;
    }
}


const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input.shift().split(' ');
const list = new DoublyLinkedList();
input.shift().split('').map((it) => list.pushBack(it));

let it = list.end();
for(let i of input) {
    const [command, value] = i.split(' ');
    
    switch(command) {
        case 'L':
            it = it.prev;
            break;
        case 'P':
            list.insert(it, value);
            break;
        case 'R':
            it = it.next;
            break;
        case 'D':
            it = list.erase(it)
    }
}

let result = []
it = list.begin();
while (it !== list.end() && it) {  
    result.push(it.data);
    it = it.next;         
}

console.log(result.join(''))