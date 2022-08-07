/* global latLng */
/* global consoleElem2 */
/* global consoleElem3 */
/* global destinationsElem */
let graph = null;
class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
  deleteVertex(vertex) {
    if (this.hasKey(vertex)) {
      delete this.adjacencyList[vertex];
      return true;
    }
    return false;
  }
  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = [];
    let smallest;
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;

          if (candidate < distances[nextNeighbor]) {
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}

function initDjkstra() {
  graph.addVertex("misafirOdasi"); // 1
  graph.addVertex("salon"); // 1
  graph.addVertex("mutfak"); // 1

  graph.addEdge(
    "misafirOdasi",
    "salon",
    distance(latLng["misafirOdasi"], latLng["salon"])
  );
  
  graph.addEdge(
    "salon",
    "mutfak",
    distance(latLng["salon"], latLng["mutfak"])
  );
}

function distance(gps1, gps2) {
  return Math.sqrt(
    Math.abs(gps1.lat - gps2.lat) ** 2 + Math.abs(gps1.lng - gps2.lng) ** 2
  );
}

let startPoints = {
  1: "misafirOdasi",
  2: "salon",
  3: "mutfak",
};

function setDestination() {
  const destinationVal = destinationsElem.value;
  let id = JSON.parse(localStorage.getItem("id")).id;
  let shortestPath = graph.Dijkstra(startPoints[id], destinationVal).slice(1);
  localStorage.setItem('shortestPath', JSON.stringify(shortestPath));
  localStorage.setItem('heading', shortestPath[0])
  consoleElem2.textContent = shortestPath;
  
  console.log(shortestPath);
}


function main() {
  graph = new WeightedGraph();
  initDjkstra();

  let id = JSON.parse(localStorage.getItem("id")).id;
  
  for (const [key, value] of Object.entries(latLng)) {
  latLng[key].lat += -1 * latLng[startPoints[id]].lat
  latLng[key].lng += -1 * latLng[startPoints[id]].lng
  }
  
  consoleElem3.textContent = JSON.stringify(latLng["misafirOdasi"])
  
  let shortestPath = graph.Dijkstra(startPoints[id], "salon").slice(1)
  localStorage.setItem('shortestPath', JSON.stringify(shortestPath));
  localStorage.setItem('heading', shortestPath[0])
    consoleElem2.textContent = shortestPath;

  return shortestPath;
}

main();
