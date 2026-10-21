const fs = require('fs');
const vm = require('vm');
const path = require('path');

function loadModule(relativePath) {
  const code = fs.readFileSync(path.join(__dirname, relativePath), 'utf8');
  const sandbox = { module: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.module.exports;
}

const p1 = loadModule('data_p1_p5.js');
const p2 = loadModule('data_p6_p10.js');
const p3 = loadModule('data_p11_p15.js');
const allProblems = [...p1, ...p2, ...p3];

const patterns = [
  { id: 1, name: "Two Pointers", count: 10, description: "Searching pairs or partitioning elements using two moving indices from ends or same direction." },
  { id: 2, name: "Sliding Window", count: 10, description: "Maintaining a contiguous subarray/substring window that expands and contracts dynamically." },
  { id: 3, name: "Fast & Slow Pointers", count: 10, description: "Hare & Tortoise algorithm for cycle detection, middle node retrieval, and loop lengths." },
  { id: 4, name: "Merge Intervals", count: 10, description: "Sorting intervals by start time and merging overlapping or finding conflicts." },
  { id: 5, name: "Cyclic Sort", count: 10, description: "Placing numbers 1..n or 0..n at their matching indices in O(n) time and O(1) space." },
  { id: 6, name: "In-place Reversal of a LinkedList", count: 10, description: "Reversing linked list nodes without allocating additional node memory." },
  { id: 7, name: "Tree Breadth First Search", count: 10, description: "Level-by-level traversal using double-ended queues for tree hierarchies." },
  { id: 8, name: "Tree Depth First Search", count: 10, description: "Recursive or stack-based traversal exploring root-to-leaf paths and subtrees." },
  { id: 9, name: "Two Heaps", count: 10, description: "Balancing a Max-Heap and Min-Heap to find running medians and manage dynamic sets." },
  { id: 10, name: "Subsets & Backtracking", count: 10, description: "Systematic decision trees for generating permutations, combinations, and subsets." },
  { id: 11, name: "Modified Binary Search", count: 10, description: "Logarithmic search across sorted, rotated, or bitonic arrays." },
  { id: 12, name: "Top K Elements", count: 10, description: "Using Min-Heaps or Max-Heaps of size K to find extremes without full sorting." },
  { id: 13, name: "K-way Merge", count: 10, description: "Merging K sorted lists, arrays, or matrices efficiently with a priority queue." },
  { id: 14, name: "0/1 Knapsack & Dynamic Programming", count: 10, description: "Optimal substructure and memoization/tabulation for decision-making under constraints." },
  { id: 15, name: "Graphs (BFS, DFS, Topological Sort)", count: 10, description: "Modeling networks, dependencies, connectivity, and shortest paths." }
];

const fileContent = `/**
 * 150 DSA Problems across 15 Patterns
 * Source: DSA 150 Patterns Guide
 */
window.LEETCODE_PATTERNS = ${JSON.stringify(patterns, null, 2)};

window.LEETCODE_PROBLEMS = ${JSON.stringify(allProblems, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'leetcode150_data.js'), fileContent, 'utf8');
console.log('Successfully generated leetcode150_data.js with ' + allProblems.length + ' problems and ' + patterns.length + ' patterns.');
