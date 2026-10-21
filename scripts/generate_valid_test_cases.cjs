const fs = require('fs');
const path = require('path');
const vm = require('vm');

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

// Comprehensive test cases for Pattern 1 problems:
const p1TestCases = {
  "1.1": [
    { id: 1, name: "Case 1", input: "arr = [1, 2, 3, 4, 6], target = 6", expected: "[1, 3]" },
    { id: 2, name: "Case 2", input: "arr = [2, 5, 9, 11], target = 11", expected: "[0, 2]" },
    { id: 3, name: "Case 3", input: "arr = [1, 2, 3, 4], target = 10", expected: "[-1, -1]" }
  ],
  "1.2": [
    { id: 1, name: "Case 1", input: "arr = [2, 3, 3, 3, 6, 9, 9]", expected: "4" },
    { id: 2, name: "Case 2", input: "arr = [1, 1, 1, 1]", expected: "1" },
    { id: 3, name: "Case 3", input: "arr = [1, 2, 3, 4, 5]", expected: "5" }
  ],
  "1.3": [
    { id: 1, name: "Case 1", input: "arr = [-4, -1, 0, 3, 10]", expected: "[0, 1, 9, 16, 100]" },
    { id: 2, name: "Case 2", input: "arr = [-2, -1, 0, 2, 3]", expected: "[0, 1, 4, 4, 9]" },
    { id: 3, name: "Case 3", input: "arr = [-3, 0, 3]", expected: "[0, 9, 9]" }
  ],
  "1.4": [
    { id: 1, name: "Case 1", input: "arr = [-3, 0, 1, 2, -1, 1, -2]", expected: "[[-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]]" },
    { id: 2, name: "Case 2", input: "arr = [-5, 2, -1, -2, 3]", expected: "[[-5, 2, 3], [-2, -1, 3]]" },
    { id: 3, name: "Case 3", input: "arr = [1, 2, 3]", expected: "[]" }
  ],
  "1.5": [
    { id: 1, name: "Case 1", input: "arr = [-2, 0, 1, 2], target = 2", expected: "1" },
    { id: 2, name: "Case 2", input: "arr = [-3, -1, 1, 2], target = 1", expected: "0" },
    { id: 3, name: "Case 3", input: "arr = [1, 0, 1, 1], target = 100", expected: "3" }
  ],
  "1.6": [
    { id: 1, name: "Case 1", input: "arr = [-1, 0, 2, 3], target = 3", expected: "2" },
    { id: 2, name: "Case 2", input: "arr = [-1, 4, 2, 1, 3], target = 5", expected: "4" },
    { id: 3, name: "Case 3", input: "arr = [1, 2, 3], target = 1", expected: "0" }
  ],
  "1.7": [
    { id: 1, name: "Case 1", input: "arr = [2, 5, 3, 10], target = 30", expected: "[[2], [5], [2, 5], [3], [5, 3], [10]]" },
    { id: 2, name: "Case 2", input: "arr = [8, 2, 6, 5], target = 50", expected: "[[8], [2], [8, 2], [6], [2, 6], [5], [6, 5]]" },
    { id: 3, name: "Case 3", input: "arr = [1, 2, 3], target = 0", expected: "[]" }
  ],
  "1.8": [
    { id: 1, name: "Case 1", input: "arr = [1, 0, 2, 1, 0]", expected: "[0, 0, 1, 1, 2]" },
    { id: 2, name: "Case 2", input: "arr = [2, 2, 0, 1, 2, 0]", expected: "[0, 0, 1, 2, 2, 2]" },
    { id: 3, name: "Case 3", input: "arr = [0, 1, 2]", expected: "[0, 1, 2]" }
  ],
  "1.9": [
    { id: 1, name: "Case 1", input: "heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]", expected: "6" },
    { id: 2, name: "Case 2", input: "heights = [4, 2, 0, 3, 2, 5]", expected: "9" },
    { id: 3, name: "Case 3", input: "heights = [1, 2, 3, 4, 5]", expected: "0" }
  ],
  "1.10": [
    { id: 1, name: "Case 1", input: "heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]", expected: "49" },
    { id: 2, name: "Case 2", input: "heights = [1, 1]", expected: "1" },
    { id: 3, name: "Case 3", input: "heights = [4, 3, 2, 1, 4]", expected: "16" }
  ]
};

// Update allProblems
allProblems.forEach(p => {
  if (p1TestCases[p.id]) {
    p.testCases = p1TestCases[p.id];
  } else if (!p.testCases) {
    const exRegex = /Input:\s*([^\n]+)[\s\S]*?Output:\s*([^\n]+)/g;
    let match = exRegex.exec(p.description || '');
    if (match) {
      let inp = match[1].trim().replace(/\s*\(.*\)$/, '').replace(/;$/, '');
      let out = match[2].trim().replace(/\s*\(.*\)$/, '').replace(/;$/, '');
      p.testCases = [
        { id: 1, name: "Case 1", input: inp, expected: out },
        { id: 2, name: "Case 2", input: inp, expected: out },
        { id: 3, name: "Case 3", input: inp, expected: out }
      ];
    } else {
      p.testCases = [
        { id: 1, name: "Case 1", input: "Sample input", expected: "Expected result" },
        { id: 2, name: "Case 2", input: "Sample input", expected: "Expected result" },
        { id: 3, name: "Case 3", input: "Sample input", expected: "Expected result" }
      ];
    }
  }
});

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
console.log('Updated leetcode150_data.js with cleaned testCases!');
