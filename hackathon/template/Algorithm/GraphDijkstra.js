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

var graph = new WeightedGraph();

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

let latLng = {
  A: {
    lat: 41.037085183193355,
    lng: 28.871345952817805,
  },
  B: {
    lat: 41.03745150856206,
    lng: 28.8713337349406,
  },
  C: {
    lat: 41.037702636096085,
    lng: 28.871272645554583,
  },
  D: {
    lat: 41.037969890034084,
    lng: 28.871232937453684,
  },
  E: {
    lat: 41.03804822287926,
    lng: 28.871217665107178,
  },
  F: {
    lat: 41.03825096628092,
    lng: 28.871318462594097,
  },
  G: {
    lat: 41.03844679738458,
    lng: 28.871623909524324,
  },
  H: {
    lat: 41.038333906585194,
    lng: 28.871113813151112,
  },
  I: {
    lat: 41.0371796446488,
    lng: 28.870921381585173,
  },
  J: {
    lat: 41.03752984202589,
    lng: 28.87073200448853,
  },
  K: {
    lat: 41.03792611575828,
    lng: 28.87062509806301,
  },
  L: {
    lat: 41.03827630916398,
    lng: 28.870628152532312,
  },
  M: {
    lat: 41.0370592117498,
    lng: 28.869877496586163,
  },
  N: {
    lat: 41.0374152142203,
    lng: 28.869767735032873,
  },
  U: {
    lat: 41.037034374296276,
    lng: 28.86968358450868,
  },
  P: {
    lat: 41.03741245451863,
    lng: 28.86960675142138,
  },
  R: {
    lat: 41.03777673413859,
    lng: 28.869526259615633,
  },
  S: {
    lat: 41.03815756976755,
    lng: 28.869434791654562,
  },
  T: {
    lat: 41.038450094189216,
    lng: 28.869390887033244,
  },
  X: {
    lat: 41.03712820462705,
    lng: 28.870675097206735,
  },
};

function distance(gps1, gps2) {
  return Math.sqrt(
    Math.abs(gps1.lat - gps2.lat) ** 2 + Math.abs(gps1.lng - gps2.lng) ** 2
  );
}

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

function betweenTwo(lat, lng) {
  for (const [key, value] of Object.entries(graph.adjacencyList)) {
    let nodeOne = latLng[key];
    for (let i = 0; i < value.length; i++) {
      let nodeTwo = latLng[value[i]["node"]];

      if (
        Math.min(nodeOne.lat, nodeTwo.lat) < lat &&
        Math.max(nodeOne.lat, nodeTwo.lat) > lat &&
        Math.min(nodeOne.lng, nodeTwo.lng) < lng &&
        Math.max(nodeOne.lng, nodeTwo.lng) > lng
      ) {
        console.log(key, value[i]["node"]);
        break;
      }
    }
  }
}

betweenTwo(41.037912193711165, 28.870593821994362);
