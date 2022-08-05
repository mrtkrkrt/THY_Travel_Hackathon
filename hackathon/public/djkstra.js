/* global latLng */
let graph = null
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
  deleteVertex(vertex){
    if(this.hasKey(vertex)) {
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
  graph = new WeightedGraph();

  graph.addVertex("A"); // 1
  graph.addVertex("B"); // 2
  graph.addVertex("C"); // 3
  graph.addVertex("D"); // 4
  graph.addVertex("E"); // 5
  graph.addVertex("F"); // 6
  graph.addVertex("G"); // 7
  graph.addVertex("H"); // 8
  graph.addVertex("I"); // 9
  graph.addVertex("J"); // 10
  graph.addVertex("K"); // 11
  graph.addVertex("L"); // 12
  graph.addVertex("M"); // 13
  graph.addVertex("N"); // 14
  graph.addVertex("U"); // 15
  graph.addVertex("P"); // 16
  graph.addVertex("R"); // 17
  graph.addVertex("S"); // 18
  graph.addVertex("T"); // 19
  graph.addVertex("X"); // 19

  graph.addEdge("A", "B", distance(latLng["A"], latLng["B"]));
  graph.addEdge("A", "I", distance(latLng["A"], latLng["I"]));
  graph.addEdge("I", "B", distance(latLng["I"], latLng["B"]));
  graph.addEdge("C", "B", distance(latLng["C"], latLng["B"]));
  graph.addEdge("C", "D", distance(latLng["C"], latLng["D"]));
  graph.addEdge("E", "D", distance(latLng["E"], latLng["D"]));
  graph.addEdge("E", "F", distance(latLng["E"], latLng["F"]));
  graph.addEdge("E", "H", distance(latLng["E"], latLng["H"]));
  graph.addEdge("E", "K", distance(latLng["E"], latLng["K"]));
  graph.addEdge("F", "G", distance(latLng["F"], latLng["G"]));
  graph.addEdge("H", "L", distance(latLng["H"], latLng["L"]));
  graph.addEdge("S", "L", distance(latLng["S"], latLng["L"]));
  graph.addEdge("S", "T", distance(latLng["S"], latLng["T"]));
  graph.addEdge("S", "R", distance(latLng["S"], latLng["R"]));
  graph.addEdge("K", "R", distance(latLng["K"], latLng["R"]));
  graph.addEdge("K", "J", distance(latLng["K"], latLng["J"]));
  graph.addEdge("I", "J", distance(latLng["I"], latLng["J"]));
  graph.addEdge("N", "J", distance(latLng["N"], latLng["J"]));
  graph.addEdge("I", "X", distance(latLng["I"], latLng["X"]));
  graph.addEdge("M", "X", distance(latLng["M"], latLng["X"]));
  graph.addEdge("M", "U", distance(latLng["M"], latLng["U"]));
  graph.addEdge("P", "U", distance(latLng["P"], latLng["U"]));
  graph.addEdge("P", "R", distance(latLng["P"], latLng["R"]));
  graph.addEdge("P", "N", distance(latLng["P"], latLng["N"]));
}

function distance(gps1, gps2) {
  return Math.sqrt(
    Math.abs(gps1.lat - gps2.lat) ** 2 + Math.abs(gps1.lng - gps2.lng) ** 2
  );
}

function betweenTwo(lat, lng) {
  let minError = Number.MAX_SAFE_INTEGER;
  let between = "";
  for (const [key, value] of Object.entries(graph.adjacencyList)) {
    if(key == "New")
        continue
    let nodeOne = latLng[key];
    for (let i = 0; i < value.length; i++) {
      let nodeTwo = latLng[value[i]["node"]];
      if(value[i]["node"] == "New")
        continue
      console.log(key, value[i]["node"])
      if (
        Math.min(nodeOne.lat, nodeTwo.lat) < lat &&
        Math.max(nodeOne.lat, nodeTwo.lat) > lat &&
        Math.min(nodeOne.lng, nodeTwo.lng) < lng &&
        Math.max(nodeOne.lng, nodeTwo.lng) > lng
      ) {
        console.log("between:",key, value[i]["node"]);
        return [key, value[i]["node"]];
      }
      let currentError = 0;

      let latError = 0;
      if (
        !(
          Math.min(nodeOne.lat, nodeTwo.lat) < lat &&
          Math.max(nodeOne.lat, nodeTwo.lat) > lat
        )
      ) {
        latError = Math.min(
          Math.abs(lat - nodeOne.lat),
          Math.abs(lat - nodeTwo.lat)
        );
      }

      let lngError = 0;
      if (
        !(
          Math.min(nodeOne.lng, nodeTwo.lng) < lng &&
          Math.max(nodeOne.lng, nodeTwo.lng) > lng
        )
      ) {
        lngError = Math.min(
          Math.abs(lng - nodeOne.lng),
          Math.abs(lng - nodeTwo.lng)
        );
      }

      currentError = latError + lngError;

      if (currentError < minError) {
        console.log(key, value[i]["node"], latError, lngError);
        between = [key, value[i]["node"]];
        minError = currentError;
      }
    }
  }
  console.log("between",between);
  return between;
}

function main() {
  const lat = 41.0375370594336;
  const lng = 28.870070136039054;
  const destination = "G";

  for (const [key, value] of Object.entries(latLng)) {
    if (value.lat == lat && value.lng == lng) {
      if (key == destination) return "You already in destination location !!!";

      console.log(graph.Dijkstra("key", destination));
      return;
    }
  }
  
  graph.deleteVertex("New")
  
  let between = betweenTwo(lat, lng);

  // yeni node oluştur
  graph.addVertex("New"); // 31
  graph.addEdge(between[0], "New", distance(latLng[between[0]], { lat, lng }));
  graph.addEdge(between[1], "New", distance(latLng[between[1]], { lat, lng }));
  
  let shortestPath = graph.Dijkstra("New", destination) 
  
  console.log("iii",shortestPath);
  return shortestPath
}

