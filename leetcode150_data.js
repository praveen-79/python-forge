/**
 * 150 DSA Problems across 15 Patterns
 * Source: DSA 150 Patterns Guide
 */
window.LEETCODE_PATTERNS = [
  {
    "id": 1,
    "name": "Two Pointers",
    "count": 10,
    "description": "Searching pairs or partitioning elements using two moving indices from ends or same direction."
  },
  {
    "id": 2,
    "name": "Sliding Window",
    "count": 10,
    "description": "Maintaining a contiguous subarray/substring window that expands and contracts dynamically."
  },
  {
    "id": 3,
    "name": "Fast & Slow Pointers",
    "count": 10,
    "description": "Hare & Tortoise algorithm for cycle detection, middle node retrieval, and loop lengths."
  },
  {
    "id": 4,
    "name": "Merge Intervals",
    "count": 10,
    "description": "Sorting intervals by start time and merging overlapping or finding conflicts."
  },
  {
    "id": 5,
    "name": "Cyclic Sort",
    "count": 10,
    "description": "Placing numbers 1..n or 0..n at their matching indices in O(n) time and O(1) space."
  },
  {
    "id": 6,
    "name": "In-place Reversal of a LinkedList",
    "count": 10,
    "description": "Reversing linked list nodes without allocating additional node memory."
  },
  {
    "id": 7,
    "name": "Tree Breadth First Search",
    "count": 10,
    "description": "Level-by-level traversal using double-ended queues for tree hierarchies."
  },
  {
    "id": 8,
    "name": "Tree Depth First Search",
    "count": 10,
    "description": "Recursive or stack-based traversal exploring root-to-leaf paths and subtrees."
  },
  {
    "id": 9,
    "name": "Two Heaps",
    "count": 10,
    "description": "Balancing a Max-Heap and Min-Heap to find running medians and manage dynamic sets."
  },
  {
    "id": 10,
    "name": "Subsets & Backtracking",
    "count": 10,
    "description": "Systematic decision trees for generating permutations, combinations, and subsets."
  },
  {
    "id": 11,
    "name": "Modified Binary Search",
    "count": 10,
    "description": "Logarithmic search across sorted, rotated, or bitonic arrays."
  },
  {
    "id": 12,
    "name": "Top K Elements",
    "count": 10,
    "description": "Using Min-Heaps or Max-Heaps of size K to find extremes without full sorting."
  },
  {
    "id": 13,
    "name": "K-way Merge",
    "count": 10,
    "description": "Merging K sorted lists, arrays, or matrices efficiently with a priority queue."
  },
  {
    "id": 14,
    "name": "0/1 Knapsack & Dynamic Programming",
    "count": 10,
    "description": "Optimal substructure and memoization/tabulation for decision-making under constraints."
  },
  {
    "id": 15,
    "name": "Graphs (BFS, DFS, Topological Sort)",
    "count": 10,
    "description": "Modeling networks, dependencies, connectivity, and shortest paths."
  }
];

window.LEETCODE_PROBLEMS = [
  {
    "id": "1.1",
    "patternId": 1,
    "patternName": "Two Pointers",
    "title": "Pair with Target Sum",
    "difficulty": "Easy",
    "description": "Given a sorted array of integers and a target sum, find a pair in the array whose sum equals the given target. Return the indices of the two numbers (0-indexed). If no such pair exists, return [-1, -1].\n\nExample 1:\nInput: arr = [1, 2, 3, 4, 6], target = 6\nOutput: [1, 3] (since arr[1] + arr[3] = 2 + 4 = 6)\n\nConstraints:\n- Array is sorted in ascending order.\n- 2 <= arr.length <= 10^5",
    "approach": "Start left at 0 and right at the end. If the sum is too small, move left right (left += 1); if too big, move right left (right -= 1).",
    "starterCode": "def pair_with_target_sum(arr, target):\n    # TODO: Implement two-pointer search\n    pass",
    "solution": "def pair_with_target_sum(arr, target):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        current = arr[left] + arr[right]\n        if current == target:\n            return [left, right]\n        if current < target:\n            left += 1\n        else:\n            right -= 1\n    return [-1, -1]",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "In a sorted array, moving pointers inward monotonically increases or decreases the sum in linear time without nested loops.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "arr = [1, 2, 3, 4, 6], target = 6",
        "expected": "[1, 3]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "arr = [1, 2, 3], target = 6",
        "expected": "[1, 3]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "arr = [0], target = 6",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "1.2",
    "patternId": 1,
    "patternName": "Two Pointers",
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "description": "Given a sorted array, remove duplicates in-place such that each unique element appears only once. The relative order should be kept the same. Return the new length.\n\nExample 1:\nInput: arr = [2, 3, 3, 3, 6, 9, 9]\nOutput: 4 (arr becomes [2, 3, 6, 9, ...])",
    "approach": "Maintain a slow pointer `next_non_dup` marking where the next unique element belongs, while a fast pointer scans forward.",
    "starterCode": "def remove_duplicates(arr):\n    # TODO: Remove duplicates in-place\n    pass",
    "solution": "def remove_duplicates(arr):\n    next_non_dup = 1\n    for i in range(1, len(arr)):\n        if arr[next_non_dup - 1] != arr[i]:\n            arr[next_non_dup] = arr[i]\n            next_non_dup += 1\n    return next_non_dup",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Use one pointer for the write frontier and another to explore unique values.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "arr = [2, 3, 3, 3, 6, 9, 9]",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "arr = [2, 3, 3]",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "1.3",
    "patternId": 1,
    "patternName": "Two Pointers",
    "title": "Squaring a Sorted Array",
    "difficulty": "Easy",
    "description": "Given a sorted array of positive and negative numbers, return a new array containing the squares of all numbers sorted in non-decreasing order.\n\nExample:\nInput: arr = [-4, -1, 0, 3, 10]\nOutput: [0, 1, 9, 16, 100]",
    "approach": "The largest squares come from the extremes (large negatives or large positives). Fill the result array backwards using pointers at both ends.",
    "starterCode": "def make_squares(arr):\n    # TODO: Square and sort via two pointers\n    pass",
    "solution": "def make_squares(arr):\n    n = len(arr)\n    squares = [0] * n\n    left, right = 0, n - 1\n    highest_index = n - 1\n    while left <= right:\n        left_sq, right_sq = arr[left] ** 2, arr[right] ** 2\n        if left_sq > right_sq:\n            squares[highest_index] = left_sq\n            left += 1\n        else:\n            squares[highest_index] = right_sq\n            right -= 1\n        highest_index -= 1\n    return squares",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Filling the output from largest to smallest allows two pointers to pick the maximal square in O(n) without sorting.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "arr = [-4, -1, 0, 3, 10]",
        "expected": "[0, 1, 9, 16, 100]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "arr = [-4, -1, 0]",
        "expected": "[0, 1, 9, 16, 100]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "arr = [0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "1.4",
    "patternId": 1,
    "patternName": "Two Pointers",
    "title": "Triplet Sum to Zero (3Sum)",
    "difficulty": "Medium",
    "description": "Given an array of unsorted numbers, find all unique triplets in it that add up to zero.\n\nExample:\nInput: arr = [-3, 0, 1, 2, -1, 1, -2]\nOutput: [[-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]]",
    "approach": "Sort the array. Fix one element arr[i], then use two pointers on the remainder to find pairs summing to -arr[i], skipping duplicates.",
    "starterCode": "def search_triplets(arr):\n    # TODO: Find all unique triplets summing to 0\n    pass",
    "solution": "def search_triplets(arr):\n    arr.sort()\n    triplets = []\n    for i in range(len(arr) - 2):\n        if i > 0 and arr[i] == arr[i - 1]:\n            continue\n        left, right = i + 1, len(arr) - 1\n        while left < right:\n            total = arr[i] + arr[left] + arr[right]\n            if total == 0:\n                triplets.append([arr[i], arr[left], arr[right]])\n                left += 1\n                right -= 1\n                while left < right and arr[left] == arr[left - 1]:\n                    left += 1\n                while left < right and arr[right] == arr[right + 1]:\n                    right -= 1\n            elif total < 0:\n                left += 1\n            else:\n                right -= 1\n    return triplets",
    "complexity": "O(n^2) time, O(n) space (sort)",
    "keyLesson": "Sorting enables two pointers for sub-pairs and trivial duplicate suppression with while loops.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "arr = [-3, 0, 1, 2, -1, 1, -2]",
        "expected": "[[-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "arr = [-3, 0, 1]",
        "expected": "[[-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "arr = [0]",
        "expected": "[-1, -1]"
      }
    ]
  },
  {
    "id": "1.5",
    "patternId": 1,
    "patternName": "Two Pointers",
    "title": "Triplet Sum Close to Target",
    "difficulty": "Medium",
    "description": "Given an array of unsorted numbers and a target sum, find a triplet whose sum is closest to the target. Return the sum of the triplet.\n\nExample:\nInput: arr = [-2, 0, 1, 2], target = 2\nOutput: 1 (The triplet [-2, 1, 2] has sum 1)",
    "approach": "Sort array. Fix element i, scan left and right, and track the smallest absolute difference |target - sum| seen so far.",
    "starterCode": "def triplet_sum_close_to_target(arr, target_sum):\n    # TODO: Find closest triplet sum\n    pass",
    "solution": "def triplet_sum_close_to_target(arr, target_sum):\n    arr.sort()\n    smallest_diff = float('inf')\n    result = 0\n    for i in range(len(arr) - 2):\n        left, right = i + 1, len(arr) - 1\n        while left < right:\n            target_diff = target_sum - arr[i] - arr[left] - arr[right]\n            if target_diff == 0:\n                return target_sum\n            if abs(target_diff) < abs(smallest_diff):\n                smallest_diff = target_diff\n                result = arr[i] + arr[left] + arr[right]\n            if target_diff > 0:\n                left += 1\n            else:\n                right -= 1\n    return result",
    "complexity": "O(n^2) time, O(n) space",
    "keyLesson": "Track the signed difference so you know both proximity and whether to move left or right.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "arr = [-2, 0, 1, 2], target = 2",
        "expected": "1"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "arr = [-2, 0, 1], target = 2",
        "expected": "1"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "1.6",
    "patternId": 1,
    "patternName": "Two Pointers",
    "title": "Triplets with Smaller Sum",
    "difficulty": "Medium",
    "description": "Given an array of unsorted numbers and a target, count all triplets whose sum is strictly less than target.\n\nExample:\nInput: arr = [-1, 0, 2, 3], target = 3\nOutput: 2 (Triplets: [-1, 0, 3], [-1, 0, 2])",
    "approach": "Sort array. For each i, when arr[i] + arr[left] + arr[right] < target, then all elements between left and right also form valid sums, contributing `right - left` triplets at once.",
    "starterCode": "def triplet_with_smaller_sum(arr, target):\n    # TODO: Count triplets with sum < target\n    pass",
    "solution": "def triplet_with_smaller_sum(arr, target):\n    arr.sort()\n    count = 0\n    for i in range(len(arr) - 2):\n        left, right = i + 1, len(arr) - 1\n        while left < right:\n            if arr[i] + arr[left] + arr[right] < target:\n                count += right - left\n                left += 1\n            else:\n                right -= 1\n    return count",
    "complexity": "O(n^2) time, O(n) space",
    "keyLesson": "Counting batches via (right - left) avoids explicitly iterating through all valid pairs.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "arr = [-1, 0, 2, 3], target = 3",
        "expected": "2"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "arr = [-1, 0, 2], target = 3",
        "expected": "2"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "1.7",
    "patternId": 1,
    "patternName": "Two Pointers",
    "title": "Subarrays with Product Less Than Target",
    "difficulty": "Medium",
    "description": "Given an array with positive numbers and a target, return all contiguous subarrays whose product is less than the target.\n\nExample:\nInput: arr = [2, 5, 3, 10], target = 30\nOutput: [[2], [5], [2, 5], [3], [5, 3], [10]]",
    "approach": "Maintain a sliding window with a running product. Shrink from the left when product >= target, then emit every suffix of the window.",
    "starterCode": "def find_subarrays(arr, target):\n    # TODO: Find contiguous subarrays with product < target\n    pass",
    "solution": "from collections import deque\ndef find_subarrays(arr, target):\n    result = []\n    left, product = 0, 1.0\n    window = deque()\n    for right in range(len(arr)):\n        window.append(arr[right])\n        product *= arr[right]\n        while product >= target and left < right:\n            product /= window.popleft()\n            left += 1\n        if product < target:\n            temp = list(window)\n            for i in range(len(temp) - 1, -1, -1):\n                result.append(list(temp[i:]))\n    return result",
    "complexity": "O(n^3) worst case for building output, O(n^2) window logic, O(n) extra space",
    "keyLesson": "Every new valid element at index `right` contributes all subarrays ending at `right` formed from window suffixes.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "arr = [2, 5, 3, 10], target = 30",
        "expected": "[[2], [5], [2, 5], [3], [5, 3], [10]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "arr = [2, 5, 3], target = 30",
        "expected": "[[2], [5], [2, 5], [3], [5, 3], [10]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "arr = [0], target = 30",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "1.8",
    "patternId": 1,
    "patternName": "Two Pointers",
    "title": "Dutch National Flag Problem (Sort Colors)",
    "difficulty": "Medium",
    "description": "Given an array containing only 0s, 1s, and 2s, sort the array in-place without using library sort functions.\n\nExample:\nInput: arr = [1, 0, 2, 1, 0]\nOutput: [0, 0, 1, 1, 2]",
    "approach": "Use three pointers: `low` for 0s frontier, `high` for 2s frontier, and `i` to scan. Swap 0s to `low` and 2s to `high` in a single pass.",
    "starterCode": "def dutch_flag_sort(arr):\n    # TODO: Sort 0s, 1s, 2s in-place\n    pass",
    "solution": "def dutch_flag_sort(arr):\n    low, i, high = 0, 0, len(arr) - 1\n    while i <= high:\n        if arr[i] == 0:\n            arr[i], arr[low] = arr[low], arr[i]\n            i += 1\n            low += 1\n        elif arr[i] == 1:\n            i += 1\n        else:\n            arr[i], arr[high] = arr[high], arr[i]\n            high -= 1\n    return arr",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Three-way partitioning divides an array into [< pivot, == pivot, > pivot] in a single pass.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "arr = [1, 0, 2, 1, 0]",
        "expected": "[0, 0, 1, 1, 2]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "arr = [1, 0, 2]",
        "expected": "[0, 0, 1, 1, 2]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "arr = [0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "1.9",
    "patternId": 1,
    "patternName": "Two Pointers",
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\nExample:\nInput: heights = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
    "approach": "Track `left_max` and `right_max`. The trapped water depends on `min(left_max, right_max) - height[i]`. Advance pointer from the smaller side.",
    "starterCode": "def trapping_rain_water(heights):\n    # TODO: Calculate trapped water\n    pass",
    "solution": "def trapping_rain_water(heights):\n    if not heights:\n        return 0\n    left, right = 0, len(heights) - 1\n    left_max, right_max = heights[left], heights[right]\n    water = 0\n    while left < right:\n        if left_max < right_max:\n            left += 1\n            left_max = max(left_max, heights[left])\n            water += left_max - heights[left]\n        else:\n            right -= 1\n            right_max = max(right_max, heights[right])\n            water += right_max - heights[right]\n    return water",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Water height is bottlenecked by the shorter boundary wall, so you can safely advance the side with the lower peak.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "heights = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "expected": "6"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "heights = [0,1,0,2,1,0,1,3,2,1,2,1] (Case 2)",
        "expected": "6"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "1.10",
    "patternId": 1,
    "patternName": "Two Pointers",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "description": "Given n non-negative integers representing vertical lines, find two lines that together with the x-axis form a container holding the maximum water.\n\nExample:\nInput: heights = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
    "approach": "Start with the widest container (left=0, right=n-1). Always move the pointer with the shorter height inward, as width decreases.",
    "starterCode": "def max_area(heights):\n    # TODO: Find max container area\n    pass",
    "solution": "def max_area(heights):\n    left, right = 0, len(heights) - 1\n    best = 0\n    while left < right:\n        width = right - left\n        best = max(best, width * min(heights[left], heights[right]))\n        if heights[left] < heights[right]:\n            left += 1\n        else:\n            right -= 1\n    return best",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Moving the taller wall can never increase area (width shrinks, height cannot exceed current short wall). Only moving the shorter wall has potential.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "heights = [1,8,6,2,5,4,8,3,7]",
        "expected": "49"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "heights = [1,8,6,2,5,4,8,3,7] (Case 2)",
        "expected": "49"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "2.1",
    "patternId": 2,
    "patternName": "Sliding Window",
    "title": "Maximum Sum Subarray of Size K",
    "difficulty": "Easy",
    "description": "Given an array of positive numbers and a positive number 'k', find the maximum sum of any contiguous subarray of size 'k'.\n\nExample:\nInput: [2, 1, 5, 1, 3, 2], k=3\nOutput: 9 (Subarray [5, 1, 3])",
    "approach": "Slide a window of size k: add the next element and subtract the trailing element once window reaches k.",
    "starterCode": "def max_sub_array_of_size_k(k, arr):\n    # TODO: Find maximum sum of size k subarray\n    pass",
    "solution": "def max_sub_array_of_size_k(k, arr):\n    window_sum, max_sum, start = 0.0, 0.0, 0\n    for end in range(len(arr)):\n        window_sum += arr[end]\n        if end >= k - 1:\n            max_sum = max(max_sum, window_sum)\n            window_sum -= arr[start]\n            start += 1\n    return max_sum",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Sliding windows avoid re-summing k elements from scratch on every step.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[2, 1, 5, 1, 3, 2], k=3",
        "expected": "9"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[2, 1, 5, 1, 3, 2], k=3 (Case 2)",
        "expected": "9"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "2.2",
    "patternId": 2,
    "patternName": "Sliding Window",
    "title": "Smallest Subarray with a Given Sum",
    "difficulty": "Easy",
    "description": "Given an array of positive integers and a number 'S', find the length of the smallest contiguous subarray whose sum is >= S. Return 0 if none.\n\nExample:\nInput: [2, 1, 5, 2, 3, 2], S=7\nOutput: 2 (Subarray [5, 2])",
    "approach": "Expand right until window_sum >= s. Then shrink from left while maintaining sum >= s to find minimal window length.",
    "starterCode": "def smallest_subarray_with_given_sum(s, arr):\n    # TODO: Find min subarray length with sum >= s\n    pass",
    "solution": "def smallest_subarray_with_given_sum(s, arr):\n    window_sum, min_length, start = 0, float('inf'), 0\n    for end in range(len(arr)):\n        window_sum += arr[end]\n        while window_sum >= s:\n            min_length = min(min_length, end - start + 1)\n            window_sum -= arr[start]\n            start += 1\n    return 0 if min_length == float('inf') else min_length",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Dynamic sliding windows expand to satisfy a condition, then shrink to find the minimum boundary.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[2, 1, 5, 2, 3, 2], S=7",
        "expected": "2"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[2, 1, 5, 2, 3, 2], S=7 (Case 2)",
        "expected": "2"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "2.3",
    "patternId": 2,
    "patternName": "Sliding Window",
    "title": "Longest Substring with K Distinct Characters",
    "difficulty": "Medium",
    "description": "Given a string, find the length of the longest substring in it with no more than K distinct characters.\n\nExample:\nInput: String=\"araaci\", K=2\nOutput: 4 (\"araa\")",
    "approach": "Track character frequencies in a hash map. When unique characters exceed K, shrink from left until unique characters <= K.",
    "starterCode": "def longest_substring_with_k_distinct(s, k):\n    # TODO: Find longest substring with <= k distinct chars\n    pass",
    "solution": "from collections import defaultdict\ndef longest_substring_with_k_distinct(s, k):\n    char_freq = defaultdict(int)\n    start, max_length = 0, 0\n    for end in range(len(s)):\n        char_freq[s[end]] += 1\n        while len(char_freq) > k:\n            char_freq[s[start]] -= 1\n            if char_freq[s[start]] == 0:\n                del char_freq[s[start]]\n            start += 1\n        max_length = max(max_length, end - start + 1)\n    return max_length",
    "complexity": "O(n) time, O(k) space",
    "keyLesson": "Hash map size directly indicates the count of distinct elements in the current window.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "String=\"araaci\", K=2",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "String=\"araaci\", K=2 (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "2.4",
    "patternId": 2,
    "patternName": "Sliding Window",
    "title": "Fruits into Baskets",
    "difficulty": "Medium",
    "description": "Given an array of characters where each character represents a fruit tree, you have 2 baskets. Put maximum fruit into 2 baskets (each basket holds 1 type of fruit).\n\nExample:\nInput: fruits=['A', 'B', 'C', 'A', 'C']\nOutput: 3 (['C', 'A', 'C'])",
    "approach": "Identical to longest substring with at most k distinct characters where k = 2.",
    "starterCode": "def fruits_into_baskets(fruits):\n    # TODO: Max fruits into 2 baskets\n    pass",
    "solution": "from collections import defaultdict\ndef fruits_into_baskets(fruits):\n    basket = defaultdict(int)\n    start, max_length = 0, 0\n    for end in range(len(fruits)):\n        basket[fruits[end]] += 1\n        while len(basket) > 2:\n            basket[fruits[start]] -= 1\n            if basket[fruits[start]] == 0:\n                del basket[fruits[start]]\n            start += 1\n        max_length = max(max_length, end - start + 1)\n    return max_length",
    "complexity": "O(n) time, O(1) space (at most 3 keys)",
    "keyLesson": "Real-world problem wrappers frequently map 1-to-1 to canonical sliding window problems.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "fruits=['A', 'B', 'C', 'A', 'C']",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "fruits=['A', 'B', 'C', 'A', 'C'] (Case 2)",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "2.5",
    "patternId": 2,
    "patternName": "Sliding Window",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "description": "Given a string, find the length of the longest substring which has no repeating characters.\n\nExample:\nInput: \"aabccbb\"\nOutput: 3 (\"abc\")",
    "approach": "Store the last seen index of each character. When a duplicate is seen at or after `start`, jump `start` past the previous occurrence.",
    "starterCode": "def longest_substring_without_repetition(s):\n    # TODO: Longest substring without duplicates\n    pass",
    "solution": "def longest_substring_without_repetition(s):\n    char_index = {}\n    start, max_length = 0, 0\n    for end in range(len(s)):\n        c = s[end]\n        if c in char_index and char_index[c] >= start:\n            start = char_index[c] + 1\n        char_index[c] = end\n        max_length = max(max_length, end - start + 1)\n    return max_length",
    "complexity": "O(n) time, O(min(n, alphabet)) space",
    "keyLesson": "Recording indices enables O(1) jumps of the left window boundary instead of single-step shrinking.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "\"aabccbb\"",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "\"aabccbb\" (Case 2)",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "2.6",
    "patternId": 2,
    "patternName": "Sliding Window",
    "title": "Longest Substring with Same Letters after Replacement",
    "difficulty": "Hard",
    "description": "Given a string with lowercase alphabets and an integer k, find the length of the longest substring with identical letters after replacing at most k letters.\n\nExample:\nInput: s = \"aabccbb\", k = 2\nOutput: 5 (Replace 'c's with 'b's -> \"bbbbb\")",
    "approach": "Track the frequency of the most common character in the window (`max_repeat_count`). The window is valid as long as `(length - max_repeat_count) <= k`.",
    "starterCode": "def length_of_longest_substring(s, k):\n    # TODO: Longest substring with replacement\n    pass",
    "solution": "from collections import defaultdict\ndef length_of_longest_substring(s, k):\n    freq = defaultdict(int)\n    start, max_length, max_repeat_count = 0, 0, 0\n    for end in range(len(s)):\n        freq[s[end]] += 1\n        max_repeat_count = max(max_repeat_count, freq[s[end]])\n        if (end - start + 1) - max_repeat_count > k:\n            freq[s[start]] -= 1\n            start += 1\n        max_length = max(max_length, end - start + 1)\n    return max_length",
    "complexity": "O(n) time, O(alphabet) space",
    "keyLesson": "You don't need to decrement max_repeat_count when shrinking because only a window with a higher max_repeat_count can beat the current max.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "s = \"aabccbb\", k = 2",
        "expected": "5"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "s = \"aabccbb\", k = 2 (Case 2)",
        "expected": "5"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "2.7",
    "patternId": 2,
    "patternName": "Sliding Window",
    "title": "Longest Subarray with Ones after Replacement",
    "difficulty": "Medium",
    "description": "Given an array of 0s and 1s, find the length of the longest contiguous subarray of 1s if you can flip at most k 0s into 1s.\n\nExample:\nInput: [0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], k=2\nOutput: 6",
    "approach": "Track count of 1s in the window. If `(end - start + 1) - max_ones_count > k`, shrink from left.",
    "starterCode": "def length_of_longest_substring_ones(arr, k):\n    # TODO: Longest subarray of 1s after flipping k 0s\n    pass",
    "solution": "def length_of_longest_substring_ones(arr, k):\n    start, max_length, max_ones_count = 0, 0, 0\n    for end in range(len(arr)):\n        if arr[end] == 1:\n            max_ones_count += 1\n        if (end - start + 1) - max_ones_count > k:\n            if arr[start] == 1:\n                max_ones_count -= 1\n            start += 1\n        max_length = max(max_length, end - start + 1)\n    return max_length",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Binary variant of character replacement: counting zeros flipped is simply window length minus count of ones.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], k=2",
        "expected": "6"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], k=2 (Case 2)",
        "expected": "6"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "2.8",
    "patternId": 2,
    "patternName": "Sliding Window",
    "title": "Permutation in a String",
    "difficulty": "Hard",
    "description": "Given a string and a pattern, check if the string contains any permutation of the pattern.\n\nExample:\nInput: str1=\"oidbcaf\", pattern=\"abc\"\nOutput: True (substring \"bca\" is a permutation)",
    "approach": "Fixed-size sliding window of len(pattern). Track character frequencies with a counter and match count.",
    "starterCode": "def find_permutation(str1, pattern):\n    # TODO: Check if str1 contains pattern permutation\n    pass",
    "solution": "from collections import Counter\ndef find_permutation(str1, pattern):\n    char_freq = Counter(pattern)\n    matched, start = 0, 0\n    for end in range(len(str1)):\n        right_char = str1[end]\n        if right_char in char_freq:\n            char_freq[right_char] -= 1\n            if char_freq[right_char] == 0:\n                matched += 1\n        if matched == len(char_freq):\n            return True\n        if end - start + 1 >= len(pattern):\n            left_char = str1[start]\n            start += 1\n            if left_char in char_freq:\n                if char_freq[left_char] == 0:\n                    matched -= 1\n                char_freq[left_char] += 1\n    return False",
    "complexity": "O(n + m) time, O(m) space",
    "keyLesson": "Using a `matched` count of distinct matched characters allows O(1) match verification instead of comparing dictionaries.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "str1=\"oidbcaf\", pattern=\"abc\"",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "str1=\"oidbcaf\", pattern=\"abc\" (Case 2)",
        "expected": "True"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "str1=\"oidbcaf\", pattern=\"abc\"",
        "expected": "False"
      }
    ]
  },
  {
    "id": "2.9",
    "patternId": 2,
    "patternName": "Sliding Window",
    "title": "String Anagrams (Find All Anagram Start Indices)",
    "difficulty": "Hard",
    "description": "Given a string and a pattern, find all starting indices of the pattern's anagrams in the given string.\n\nExample:\nInput: str1=\"ppqp\", pattern=\"pq\"\nOutput: [1, 2]",
    "approach": "Same as permutation in string, but append `start` to results list whenever `matched == len(char_freq)` instead of returning immediately.",
    "starterCode": "def find_string_anagrams(str1, pattern):\n    # TODO: Return all anagram start indices\n    pass",
    "solution": "from collections import Counter\ndef find_string_anagrams(str1, pattern):\n    char_freq = Counter(pattern)\n    result, matched, start = [], 0, 0\n    for end in range(len(str1)):\n        right_char = str1[end]\n        if right_char in char_freq:\n            char_freq[right_char] -= 1\n            if char_freq[right_char] == 0:\n                matched += 1\n        if matched == len(char_freq):\n            result.append(start)\n        if end - start + 1 >= len(pattern):\n            left_char = str1[start]\n            start += 1\n            if left_char in char_freq:\n                if char_freq[left_char] == 0:\n                    matched -= 1\n                char_freq[left_char] += 1\n    return result",
    "complexity": "O(n + m) time, O(m) space",
    "keyLesson": "Sliding window of fixed size preserves state cleanly as start and end advance synchronously.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "str1=\"ppqp\", pattern=\"pq\"",
        "expected": "[1, 2]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "str1=\"ppqp\", pattern=\"pq\" (Case 2)",
        "expected": "[1, 2]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "str1=\"ppqp\", pattern=\"pq\"",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "2.10",
    "patternId": 2,
    "patternName": "Sliding Window",
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "description": "Given strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.\n\nExample:\nInput: s=\"aabdec\", t=\"abc\"\nOutput: \"abdec\"",
    "approach": "Track characters needed. Expand right until all characters found, then contract left to find the tightest valid window.",
    "starterCode": "def min_window(s, t):\n    # TODO: Find min window substring containing t\n    pass",
    "solution": "from collections import Counter\ndef min_window(s, t):\n    if not s or not t:\n        return \"\"\n    need = Counter(t)\n    missing = len(t)\n    start, best_start, best_len = 0, 0, float('inf')\n    for end, char in enumerate(s, 1):\n        if need[char] > 0:\n            missing -= 1\n        need[char] -= 1\n        if missing == 0:\n            while need[s[start]] < 0:\n                need[s[start]] += 1\n                start += 1\n            if end - start < best_len:\n                best_start, best_len = start, end - start\n            need[s[start]] += 1\n            missing += 1\n            start += 1\n    return \"\" if best_len == float('inf') else s[best_start:best_start + best_len]",
    "complexity": "O(n + m) time, O(m) space",
    "keyLesson": "Tracking total missing count decouples character matching from dictionary size checks.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "s=\"aabdec\", t=\"abc\"",
        "expected": "\"abdec\""
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "s=\"aabdec\", t=\"abc\" (Case 2)",
        "expected": "\"abdec\""
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "3.1",
    "patternId": 3,
    "patternName": "Fast & Slow Pointers",
    "title": "LinkedList Cycle Detection",
    "difficulty": "Easy",
    "description": "Given the head of a Singly LinkedList, determine if the linked list has a cycle in it.\n\nExample:\nHead -> 1 -> 2 -> 3 -> 4 -> 5 -> 2 (Cycle)\nOutput: True",
    "approach": "Move slow 1 step and fast 2 steps. If there is a cycle, fast will eventually lap and meet slow.",
    "starterCode": "def has_cycle(head):\n    # TODO: Detect cycle\n    pass",
    "solution": "def has_cycle(head):\n    slow, fast = head, head\n    while fast is not None and fast.next is not None:\n        fast = fast.next.next\n        slow = slow.next\n        if slow == fast:\n            return True\n    return False",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Floyd's Tortoise and Hare algorithm detects loops in O(n) without hashing nodes.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "Standard sample for LinkedList Cycle Detection",
        "expected": "Valid output"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "Secondary sample for LinkedList Cycle Detection",
        "expected": "Valid output"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Edge boundary for LinkedList Cycle Detection",
        "expected": "Default result"
      }
    ]
  },
  {
    "id": "3.2",
    "patternId": 3,
    "patternName": "Fast & Slow Pointers",
    "title": "Start of LinkedList Cycle",
    "difficulty": "Medium",
    "description": "Given the head of a LinkedList with a cycle, find the starting node of the cycle.\n\nExample:\nHead -> 1 -> 2 -> 3 -> 4 -> 5 -> 3 (Cycle starts at node 3)\nOutput: Node 3",
    "approach": "After finding meeting point, reset one pointer to head and move both 1 step at a time. They meet at the cycle start.",
    "starterCode": "def find_cycle_start(head):\n    # TODO: Find start node of cycle\n    pass",
    "solution": "def find_cycle_start(head):\n    slow, fast = head, head\n    while True:\n        if fast is None or fast.next is None:\n            return None\n        fast = fast.next.next\n        slow = slow.next\n        if slow == fast:\n            break\n    pointer = head\n    while pointer != slow:\n        pointer = pointer.next\n        slow = slow.next\n    return pointer",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Mathematical proof: distance from head to cycle entrance equals distance from meeting point to cycle entrance.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "Standard sample for Start of LinkedList Cycle",
        "expected": "Valid output"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "Secondary sample for Start of LinkedList Cycle",
        "expected": "Valid output"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Edge boundary for Start of LinkedList Cycle",
        "expected": "Default result"
      }
    ]
  },
  {
    "id": "3.3",
    "patternId": 3,
    "patternName": "Fast & Slow Pointers",
    "title": "Happy Number",
    "difficulty": "Medium",
    "description": "A happy number is a number defined by: Starting with any positive integer, replace the number by the sum of the squares of its digits, repeat until it reaches 1. Determine if a number is happy.\n\nExample:\nInput: 23 -> 2^2+3^2=13 -> 1^2+3^2=10 -> 1^2+0^2=1\nOutput: True",
    "approach": "Treat the sequence of digit square sums as a linked list. Fast and slow pointers detect if an infinite non-happy loop occurs.",
    "starterCode": "def is_happy_number(num):\n    # TODO: Check if number is happy\n    pass",
    "solution": "def find_square_sum(num):\n    total = 0\n    while num > 0:\n        digit = num % 10\n        total += digit * digit\n        num //= 10\n    return total\n\ndef is_happy_number(num):\n    slow, fast = num, num\n    while True:\n        slow = find_square_sum(slow)\n        fast = find_square_sum(find_square_sum(fast))\n        if slow == fast:\n            break\n    return slow == 1",
    "complexity": "O(log n) time, O(1) space",
    "keyLesson": "Implicit state transitions with deterministic next steps can be treated as linked lists for cycle detection.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "23 -> 2^2+3^2=13 -> 1^2+3^2=10 -> 1^2+0^2=1",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "23 -> 2^2+3^2=13 -> 1^2+3^2=10 -> 1^2+0^2=1 (Case 2)",
        "expected": "True"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "23 -> 2^2+3^2=13 -> 1^2+3^2=10 -> 1^2+0^2=1",
        "expected": "False"
      }
    ]
  },
  {
    "id": "3.4",
    "patternId": 3,
    "patternName": "Fast & Slow Pointers",
    "title": "Middle of the LinkedList",
    "difficulty": "Easy",
    "description": "Given the head of a Singly LinkedList, return the middle node of the linked list. If two middle nodes, return the second.\n\nExample:\nInput: 1 -> 2 -> 3 -> 4 -> 5\nOutput: Node 3",
    "approach": "Slow moves 1 step while fast moves 2 steps. When fast reaches the end, slow is exactly at the middle.",
    "starterCode": "def find_middle(head):\n    # TODO: Find middle node\n    pass",
    "solution": "def find_middle(head):\n    slow, fast = head, head\n    while fast is not None and fast.next is not None:\n        fast = fast.next.next\n        slow = slow.next\n    return slow",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "A 2x speed differential locates the midpoint in a single pass without computing length.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "1 -> 2 -> 3 -> 4 -> 5",
        "expected": "Node 3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "1 -> 2 -> 3 -> 4 -> 5 (Case 2)",
        "expected": "Node 3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "3.5",
    "patternId": 3,
    "patternName": "Fast & Slow Pointers",
    "title": "Palindrome LinkedList",
    "difficulty": "Medium",
    "description": "Given the head of a Singly LinkedList, determine if it is a palindrome.\n\nExample:\nInput: 2 -> 4 -> 6 -> 4 -> 2\nOutput: True",
    "approach": "Find the middle using fast & slow pointers. Reverse the second half in-place. Compare first half and reversed second half.",
    "starterCode": "def is_palindromic_linked_list(head):\n    # TODO: Check if linked list is palindrome\n    pass",
    "solution": "def is_palindromic_linked_list(head):\n    if head is None or head.next is None:\n        return True\n    slow, fast = head, head\n    while fast is not None and fast.next is not None:\n        slow = slow.next\n        fast = fast.next.next\n    def reverse(node):\n        prev = None\n        while node:\n            nxt = node.next\n            node.next = prev\n            prev = node\n            node = nxt\n        return prev\n    second_half = reverse(slow)\n    first_half = head\n    matched = True\n    while first_half and second_half:\n        if first_half.value != second_half.value:\n            matched = False\n            break\n        first_half = first_half.next\n        second_half = second_half.next\n    return matched",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Combining middle-finding with in-place reversal solves palindrome checks in O(1) space.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "2 -> 4 -> 6 -> 4 -> 2",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "2 -> 4 -> 6 -> 4 -> 2 (Case 2)",
        "expected": "True"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "2 -> 4 -> 6 -> 4 -> 2",
        "expected": "False"
      }
    ]
  },
  {
    "id": "3.6",
    "patternId": 3,
    "patternName": "Fast & Slow Pointers",
    "title": "Rearrange a LinkedList (Odd-Even Interleave Reversal)",
    "difficulty": "Medium",
    "description": "Given a LinkedList L0 -> L1 -> ... -> Ln-1 -> Ln, reorder it to: L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...\n\nExample:\nInput: 2 -> 4 -> 6 -> 8 -> 10 -> 12\nOutput: 2 -> 12 -> 4 -> 10 -> 6 -> 8",
    "approach": "Find the middle with fast & slow pointers, reverse the second half, then interleave nodes from first half and reversed second half.",
    "starterCode": "def reorder(head):\n    # TODO: Reorder linked list\n    pass",
    "solution": "def reorder(head):\n    if head is None or head.next is None:\n        return\n    slow, fast = head, head\n    while fast is not None and fast.next is not None:\n        slow = slow.next\n        fast = fast.next.next\n    prev, node = None, slow\n    while node:\n        nxt = node.next\n        node.next = prev\n        prev = node\n        node = nxt\n    first, second = head, prev\n    while first is not None and second is not None:\n        temp = first.next\n        first.next = second\n        first = temp\n        temp = second.next\n        second.next = first\n        second = temp",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "The three-step recipe (split -> reverse -> merge) is the foundation of complex list manipulations.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "2 -> 4 -> 6 -> 8 -> 10 -> 12",
        "expected": "2 -> 12 -> 4 -> 10 -> 6 -> 8"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "2 -> 4 -> 6 -> 8 -> 10 -> 12 (Case 2)",
        "expected": "2 -> 12 -> 4 -> 10 -> 6 -> 8"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "3.7",
    "patternId": 3,
    "patternName": "Fast & Slow Pointers",
    "title": "Cycle in a Circular Array",
    "difficulty": "Hard",
    "description": "An array of non-zero integers contains jumps. Detect if there is a cycle of length > 1 moving in only one direction (all forward or all backward).\n\nExample:\nInput: [1, 2, -1, 2, 2]\nOutput: True",
    "approach": "Run fast and slow pointer jumps on indices: next_idx = (i + arr[i]) % n. If direction flips or 1-element self-loop, reject.",
    "starterCode": "def circular_array_loop_exists(arr):\n    # TODO: Detect valid circular loop\n    pass",
    "solution": "def circular_array_loop_exists(arr):\n    n = len(arr)\n    def next_index(i):\n        return (i + arr[i]) % n\n    for i in range(n):\n        is_forward = arr[i] > 0\n        slow, fast = i, i\n        while True:\n            slow = next_index(slow)\n            if is_forward != (arr[slow] > 0):\n                break\n            fast = next_index(fast)\n            if is_forward != (arr[fast] > 0):\n                break\n            fast = next_index(fast)\n            if is_forward != (arr[fast] > 0):\n                break\n            if slow == fast:\n                if slow == next_index(slow):\n                    break\n                return True\n    return False",
    "complexity": "O(n^2) worst case, O(1) space",
    "keyLesson": "Wrap-around indices `(i + step) % n` allow pointer chasing across fixed-size arrays.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[1, 2, -1, 2, 2]",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[1, 2, -1, 2, 2] (Case 2)",
        "expected": "True"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[1]",
        "expected": "False"
      }
    ]
  },
  {
    "id": "3.8",
    "patternId": 3,
    "patternName": "Fast & Slow Pointers",
    "title": "Find the Duplicate Number",
    "difficulty": "Medium",
    "description": "Given an array of n + 1 integers between 1 and n inclusive, find the duplicate number without modifying array and using O(1) extra space.\n\nExample:\nInput: [1, 4, 4, 3, 2]\nOutput: 4",
    "approach": "Treat array values as pointers: arr[i] points to arr[arr[i]]. The duplicate creates a cycle entrance found via Floyd's algorithm.",
    "starterCode": "def find_duplicate(arr):\n    # TODO: Find duplicate number\n    pass",
    "solution": "def find_duplicate(arr):\n    slow, fast = arr[0], arr[arr[0]]\n    while slow != fast:\n        slow = arr[slow]\n        fast = arr[arr[fast]]\n    fast = 0\n    while slow != fast:\n        slow = arr[slow]\n        fast = arr[fast]\n    return slow",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Arrays mapping values 1..n to indices 0..n are equivalent to linked lists with guaranteed convergence.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[1, 4, 4, 3, 2]",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[1, 4, 4, 3, 2] (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "3.9",
    "patternId": 3,
    "patternName": "Fast & Slow Pointers",
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "description": "Given the head of a linked list, remove the nth node from the end of the list and return its head.\n\nExample:\nInput: 1 -> 2 -> 3 -> 4 -> 5, n = 2\nOutput: 1 -> 2 -> 3 -> 5",
    "approach": "Advance `fast` n steps ahead. Then move `fast` and `slow` together until `fast.next` is None. `slow.next` is the node to delete.",
    "starterCode": "def remove_nth_from_end(head, n):\n    # TODO: Remove nth from end\n    pass",
    "solution": "def remove_nth_from_end(head, n):\n    dummy = ListNode(0, head)\n    slow = fast = dummy\n    for _ in range(n):\n        fast = fast.next\n    while fast.next:\n        fast = fast.next\n        slow = slow.next\n    slow.next = slow.next.next\n    return dummy.next",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "A dummy sentinel node eliminates edge-case checks when deleting the head node.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "1 -> 2 -> 3 -> 4 -> 5, n = 2",
        "expected": "1 -> 2 -> 3 -> 5"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "1 -> 2 -> 3 -> 4 -> 5, n = 2 (Case 2)",
        "expected": "1 -> 2 -> 3 -> 5"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "3.10",
    "patternId": 3,
    "patternName": "Fast & Slow Pointers",
    "title": "Reorder List (LeetCode variant)",
    "difficulty": "Medium",
    "description": "You are given the head of a singly linked-list. Reorder the list to alternate from front and back in-place without altering values.\n\nExample:\nInput: head = [1,2,3,4]\nOutput: [1,4,2,3]",
    "approach": "Split at middle using fast/slow, reverse second half, merge in-place.",
    "starterCode": "def reorder_list(head):\n    # TODO: Reorder list in-place\n    pass",
    "solution": "def reorder_list(head):\n    if not head:\n        return\n    slow, fast = head, head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    second = slow.next\n    slow.next = None\n    prev = None\n    while second:\n        nxt = second.next\n        second.next = prev\n        prev = second\n        second = nxt\n    first, second = head, prev\n    while second:\n        tmp1, tmp2 = first.next, second.next\n        first.next = second\n        second.next = tmp1\n        first, second = tmp1, tmp2",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Disconnecting `slow.next = None` cleanly isolates the two halves before weaving.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "head = [1,2,3,4]",
        "expected": "[1,4,2,3]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "head = [1,2,3,4] (Case 2)",
        "expected": "[1,4,2,3]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "head = [0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "4.1",
    "patternId": 4,
    "patternName": "Merge Intervals",
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "description": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.\n\nExample:\nInput: intervals = [[1,4], [2,5], [7,9]]\nOutput: [[1,5], [7,9]]",
    "approach": "Sort intervals by start time. Compare current interval with the last merged interval. If overlapping, extend end time.",
    "starterCode": "def merge(intervals):\n    # TODO: Merge overlapping intervals\n    pass",
    "solution": "def merge(intervals):\n    if not intervals:\n        return []\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for interval in intervals[1:]:\n        last = merged[-1]\n        if interval[0] <= last[1]:\n            last[1] = max(last[1], interval[1])\n        else:\n            merged.append(interval)\n    return merged",
    "complexity": "O(n log n) time, O(n) space",
    "keyLesson": "Sorting by start time guarantees that any overlap must occur with the immediately preceding interval in the merged list.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "intervals = [[1,4], [2,5], [7,9]]",
        "expected": "[[1,5], [7,9]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "intervals = [[1,4], [2,5], [7,9]] (Case 2)",
        "expected": "[[1,5], [7,9]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "intervals = [0], [2,5], [7,9]]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "4.2",
    "patternId": 4,
    "patternName": "Merge Intervals",
    "title": "Insert Interval",
    "difficulty": "Medium",
    "description": "Given a set of non-overlapping intervals sorted by start time, insert a new interval and merge if necessary.\n\nExample:\nInput: intervals=[[1,3], [5,7], [8,12]], new_interval=[4,6]\nOutput: [[1,3], [4,7], [8,12]]",
    "approach": "Three phases: 1) add all intervals ending before new_interval starts, 2) merge all overlapping intervals into new_interval, 3) add remaining intervals.",
    "starterCode": "def insert_interval(intervals, new_interval):\n    # TODO: Insert and merge interval\n    pass",
    "solution": "def insert_interval(intervals, new_interval):\n    merged = []\n    i, n = 0, len(intervals)\n    while i < n and intervals[i][1] < new_interval[0]:\n        merged.append(intervals[i])\n        i += 1\n    while i < n and intervals[i][0] <= new_interval[1]:\n        new_interval[0] = min(new_interval[0], intervals[i][0])\n        new_interval[1] = max(new_interval[1], intervals[i][1])\n        i += 1\n    merged.append(new_interval)\n    while i < n:\n        merged.append(intervals[i])\n        i += 1\n    return merged",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Because existing intervals are already sorted and non-overlapping, insertion takes O(n) without re-sorting.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "intervals=[[1,3], [5,7], [8,12]], new_interval=[4,6]",
        "expected": "[[1,3], [4,7], [8,12]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "intervals=[[1,3], [5,7], [8,12]], new_interval=[4,6] (Case 2)",
        "expected": "[[1,3], [4,7], [8,12]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "intervals=[0], [5,7], [8,12]], new_interval=[4,6]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "4.3",
    "patternId": 4,
    "patternName": "Merge Intervals",
    "title": "Intervals Intersection",
    "difficulty": "Medium",
    "description": "Given two lists of intervals sorted by start time, find their intersection.\n\nExample:\nInput: arr1=[[1, 3], [5, 6], [7, 9]], arr2=[[2, 3], [5, 7]]\nOutput: [[2, 3], [5, 6], [7, 7]]",
    "approach": "Intersection is [max(start1, start2), min(end1, end2)]. Advance the pointer whose interval ends earlier.",
    "starterCode": "def intervals_intersection(a, b):\n    # TODO: Find intersection of interval lists\n    pass",
    "solution": "def intervals_intersection(a, b):\n    result = []\n    i, j = 0, 0\n    while i < len(a) and j < len(b):\n        start = max(a[i][0], b[j][0])\n        end = min(a[i][1], b[j][1])\n        if start <= end:\n            result.append([start, end])\n        if a[i][1] < b[j][1]:\n            i += 1\n        else:\n            j += 1\n    return result",
    "complexity": "O(n + m) time, O(n + m) space",
    "keyLesson": "Two pointers advancing by earliest end time computes all pairwise overlaps in linear time.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "arr1=[[1, 3], [5, 6], [7, 9]], arr2=[[2, 3], [5, 7]]",
        "expected": "[[2, 3], [5, 6], [7, 7]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "arr1=[[1, 3], [5, 6], [7, 9]], arr2=[[2, 3], [5, 7]] (Case 2)",
        "expected": "[[2, 3], [5, 6], [7, 7]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "arr1=[0], [5, 6], [7, 9]], arr2=[[2, 3], [5, 7]]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "4.4",
    "patternId": 4,
    "patternName": "Merge Intervals",
    "title": "Conflicting Appointments (Can Attend All Meetings)",
    "difficulty": "Easy",
    "description": "Given an array of intervals representing appointments, determine if a person can attend all appointments.\n\nExample:\nInput: [[1,4], [2,5], [7,9]]\nOutput: False (overlap between [1,4] and [2,5])",
    "approach": "Sort intervals by start time. If any interval starts before the previous one ends, return False.",
    "starterCode": "def can_attend_all_meetings(intervals):\n    # TODO: Check if any meetings overlap\n    pass",
    "solution": "def can_attend_all_meetings(intervals):\n    intervals.sort(key=lambda x: x[0])\n    for i in range(1, len(intervals)):\n        if intervals[i][0] < intervals[i - 1][1]:\n            return False\n    return True",
    "complexity": "O(n log n) time, O(1) extra space",
    "keyLesson": "Conflict detection simplifies to adjacent checks once sorted.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[[1,4], [2,5], [7,9]]",
        "expected": "False"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[[1,4], [2,5], [7,9]] (Case 2)",
        "expected": "False"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[1], [2,5], [7,9]]",
        "expected": "False"
      }
    ]
  },
  {
    "id": "4.5",
    "patternId": 4,
    "patternName": "Merge Intervals",
    "title": "Minimum Meeting Rooms",
    "difficulty": "Medium",
    "description": "Given an array of meeting time intervals, find the minimum number of conference rooms required.\n\nExample:\nInput: [[1,4], [2,5], [7,9]]\nOutput: 2",
    "approach": "Sort meetings by start time. Use a min-heap to track ongoing meetings by their end times. Pop ended meetings before adding new ones.",
    "starterCode": "import heapq\ndef min_meeting_rooms(intervals):\n    # TODO: Find min meeting rooms\n    pass",
    "solution": "import heapq\ndef min_meeting_rooms(intervals):\n    if not intervals:\n        return 0\n    intervals.sort(key=lambda x: x[0])\n    min_heap = []\n    for interval in intervals:\n        if min_heap and min_heap[0] <= interval[0]:\n            heapq.heapreplace(min_heap, interval[1])\n        else:\n            heapq.heappush(min_heap, interval[1])\n    return len(min_heap)",
    "complexity": "O(n log n) time, O(n) space",
    "keyLesson": "The size of the active heap at any moment represents peak concurrent overlap.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[[1,4], [2,5], [7,9]]",
        "expected": "2"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[[1,4], [2,5], [7,9]] (Case 2)",
        "expected": "2"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "4.6",
    "patternId": 4,
    "patternName": "Merge Intervals",
    "title": "Maximum CPU Load",
    "difficulty": "Hard",
    "description": "Given jobs with start, end, and CPU load, find the maximum CPU load at any point in time.\n\nExample:\nInput: [[1,4,3], [2,5,4], [7,9,6]]\nOutput: 7 (from time 2 to 4, load is 3+4=7)",
    "approach": "Sort jobs by start time. Maintain min-heap of active jobs by end time. Track running load and max load.",
    "starterCode": "import heapq\ndef find_max_cpu_load(jobs):\n    # TODO: Find max cpu load\n    pass",
    "solution": "import heapq\ndef find_max_cpu_load(jobs):\n    jobs.sort(key=lambda x: x[0])\n    max_load, current_load = 0, 0\n    min_heap = []\n    for job in jobs:\n        start, end, load = job\n        while min_heap and min_heap[0][0] <= start:\n            current_load -= heapq.heappop(min_heap)[1]\n        heapq.heappush(min_heap, (end, load))\n        current_load += load\n        max_load = max(max_load, current_load)\n    return max_load",
    "complexity": "O(n log n) time, O(n) space",
    "keyLesson": "Generalizes meeting rooms to weighted intervals by maintaining a running accumulator.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[[1,4,3], [2,5,4], [7,9,6]]",
        "expected": "7"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[[1,4,3], [2,5,4], [7,9,6]] (Case 2)",
        "expected": "7"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "4.7",
    "patternId": 4,
    "patternName": "Merge Intervals",
    "title": "Employee Free Time",
    "difficulty": "Hard",
    "description": "Given schedules for multiple employees (each a list of disjoint sorted intervals), find the common free time across all employees.\n\nExample:\nInput: schedule = [[[1,3], [5,6]], [[2,3], [6,8]]]\nOutput: [[3,5]]",
    "approach": "Flatten and sort all employee intervals by start time. Merge overlapping intervals. The gaps between merged intervals are common free time.",
    "starterCode": "def employee_free_time(schedule):\n    # TODO: Find common free time gaps\n    pass",
    "solution": "def employee_free_time(schedule):\n    all_intervals = sorted((iv for employee in schedule for iv in employee), key=lambda x: x[0])\n    merged = [all_intervals[0]]\n    for iv in all_intervals[1:]:\n        last = merged[-1]\n        if iv[0] <= last[1]:\n            last[1] = max(last[1], iv[1])\n        else:\n            merged.append(iv)\n    free_time = []\n    for i in range(1, len(merged)):\n        free_time.append([merged[i - 1][1], merged[i][0]])\n    return free_time",
    "complexity": "O(n log n) time, O(n) space",
    "keyLesson": "Free time is the inverse of the union of all busy intervals.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "schedule = [[[1,3], [5,6]], [[2,3], [6,8]]]",
        "expected": "[[3,5]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "schedule = [[[1,3], [5,6]], [[2,3], [6,8]]] (Case 2)",
        "expected": "[[3,5]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "schedule = [0], [5,6]], [[2,3], [6,8]]]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "4.8",
    "patternId": 4,
    "patternName": "Merge Intervals",
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "description": "Given an array of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.\n\nExample:\nInput: intervals = [[1,2],[2,3],[3,4],[1,3]]\nOutput: 1 (remove [1,3])",
    "approach": "Greedy: sort by end time. Whenever an overlap occurs with the previous kept interval, greedily remove the one that ends later.",
    "starterCode": "def erase_overlap_intervals(intervals):\n    # TODO: Find min intervals to remove\n    pass",
    "solution": "def erase_overlap_intervals(intervals):\n    if not intervals:\n        return 0\n    intervals.sort(key=lambda x: x[1])\n    count, prev_end = 0, intervals[0][1]\n    for start, end in intervals[1:]:\n        if start < prev_end:\n            count += 1\n        else:\n            prev_end = end\n    return count",
    "complexity": "O(n log n) time, O(1) extra space",
    "keyLesson": "Greedily picking the earliest finish time maximizes room for future intervals (Interval Scheduling Theorem).",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
        "expected": "1"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "intervals = [[1,2],[2,3],[3,4],[1,3]] (Case 2)",
        "expected": "1"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "4.9",
    "patternId": 4,
    "patternName": "Merge Intervals",
    "title": "Interval List Intersections (Merge and Count Overlaps)",
    "difficulty": "Medium",
    "description": "Given a list of intervals with overlaps and duplicates, merge them and report how many original intervals contributed to the busiest merged interval.\n\nExample:\nInput: [[1,4], [2,5], [7,9]]\nOutput: Merged: [[1,5], [7,9]], Contributors: [2, 1]",
    "approach": "Sort by start time. Accumulate contributor counts for overlapping intervals as you merge.",
    "starterCode": "def merge_and_count(intervals):\n    # TODO: Merge intervals and count contributors\n    pass",
    "solution": "def merge_and_count(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = []\n    contributors = []\n    for interval in intervals:\n        if merged and interval[0] <= merged[-1][1]:\n            merged[-1][1] = max(merged[-1][1], interval[1])\n            contributors[-1] += 1\n        else:\n            merged.append(list(interval))\n            contributors.append(1)\n    return merged, contributors",
    "complexity": "O(n log n) time, O(n) space",
    "keyLesson": "Tracking metadata alongside merged ranges preserves lineage through transformations.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[[1,4], [2,5], [7,9]]",
        "expected": "Merged: [[1,5], [7,9]], Contributors: [2, 1]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[[1,4], [2,5], [7,9]] (Case 2)",
        "expected": "Merged: [[1,5], [7,9]], Contributors: [2, 1]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "4.10",
    "patternId": 4,
    "patternName": "Merge Intervals",
    "title": "Partition Labels",
    "difficulty": "Medium",
    "description": "Partition string s into as many parts as possible so that each letter appears in at most one part. Return list of part sizes.\n\nExample:\nInput: s = \"ababcbacadefegdehijhklij\"\nOutput: [9, 7, 8]",
    "approach": "Record the last occurrence index of each character. The end of a partition is max(last_occurrence) for all characters seen in that partition.",
    "starterCode": "def partition_labels(s):\n    # TODO: Partition string labels\n    pass",
    "solution": "def partition_labels(s):\n    last_occurrence = {c: i for i, c in enumerate(s)}\n    result = []\n    start = end = 0\n    for i, c in enumerate(s):\n        end = max(end, last_occurrence[c])\n        if i == end:\n            result.append(end - start + 1)\n            start = i + 1\n    return result",
    "complexity": "O(n) time, O(1) space (26 letters)",
    "keyLesson": "Treating each character's first and last occurrence as an interval turns partitioning into interval merging.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "s = \"ababcbacadefegdehijhklij\"",
        "expected": "[9, 7, 8]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "s = \"ababcbacadefegdehijhklij\" (Case 2)",
        "expected": "[9, 7, 8]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "s = \"ababcbacadefegdehijhklij\"",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "5.1",
    "patternId": 5,
    "patternName": "Cyclic Sort",
    "title": "Cyclic Sort",
    "difficulty": "Easy",
    "description": "Given an array containing n numbers from 1 to n, sort the numbers in-place in O(n) time and O(1) space.\n\nExample:\nInput: [3, 1, 5, 4, 2]\nOutput: [1, 2, 3, 4, 5]",
    "approach": "Iterate through array. For each number x, place it at index x - 1 by swapping until nums[i] is in its correct place.",
    "starterCode": "def cyclic_sort(nums):\n    # TODO: Sort in-place using cyclic sort\n    pass",
    "solution": "def cyclic_sort(nums):\n    i = 0\n    while i < len(nums):\n        correct = nums[i] - 1\n        if nums[i] != nums[correct]:\n            nums[i], nums[correct] = nums[correct], nums[i]\n        else:\n            i += 1\n    return nums",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Every swap puts at least one number in its permanent position, bounding total swaps to at most n - 1.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[3, 1, 5, 4, 2]",
        "expected": "[1, 2, 3, 4, 5]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[3, 1, 5, 4, 2] (Case 2)",
        "expected": "[1, 2, 3, 4, 5]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "5.2",
    "patternId": 5,
    "patternName": "Cyclic Sort",
    "title": "Find the Missing Number",
    "difficulty": "Easy",
    "description": "Given an array containing n distinct numbers in the range [0, n], find the one number in the range that is missing from the array.\n\nExample:\nInput: [4, 0, 3, 1]\nOutput: 2",
    "approach": "Cyclic sort with target index = value. The missing number is the first index i where nums[i] != i.",
    "starterCode": "def find_missing_number(nums):\n    # TODO: Find missing number in [0, n]\n    pass",
    "solution": "def find_missing_number(nums):\n    i, n = 0, len(nums)\n    while i < n:\n        correct = nums[i]\n        if correct < n and nums[i] != nums[correct]:\n            nums[i], nums[correct] = nums[correct], nums[i]\n        else:\n            i += 1\n    for i in range(n):\n        if nums[i] != i:\n            return i\n    return n",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Numbers equal to n are skipped during swaps; if all 0..n-1 are in place, then n is the missing number.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[4, 0, 3, 1]",
        "expected": "2"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[4, 0, 3, 1] (Case 2)",
        "expected": "2"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "5.3",
    "patternId": 5,
    "patternName": "Cyclic Sort",
    "title": "Find All Missing Numbers",
    "difficulty": "Easy",
    "description": "Given an array of integers from 1 to n where some elements appear twice and others once, find all numbers in [1, n] that do not appear.\n\nExample:\nInput: [2, 3, 1, 8, 2, 3, 5, 1]\nOutput: [4, 6, 7]",
    "approach": "Cyclic sort numbers into indices nums[i] - 1. Any index i where nums[i] != i + 1 corresponds to a missing number i + 1.",
    "starterCode": "def find_all_missing_numbers(nums):\n    # TODO: Find all missing numbers in [1, n]\n    pass",
    "solution": "def find_all_missing_numbers(nums):\n    i, n = 0, len(nums)\n    while i < n:\n        correct = nums[i] - 1\n        if nums[i] != nums[correct]:\n            nums[i], nums[correct] = nums[correct], nums[i]\n        else:\n            i += 1\n    missing = []\n    for i in range(n):\n        if nums[i] != i + 1:\n            missing.append(i + 1)\n    return missing",
    "complexity": "O(n) time, O(1) extra space",
    "keyLesson": "Cyclic sort gracefully tolerates duplicates: duplicates simply fail the swap condition and get left in incorrect spots.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[2, 3, 1, 8, 2, 3, 5, 1]",
        "expected": "[4, 6, 7]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[2, 3, 1, 8, 2, 3, 5, 1] (Case 2)",
        "expected": "[4, 6, 7]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "5.4",
    "patternId": 5,
    "patternName": "Cyclic Sort",
    "title": "Find the Duplicate Number (1..n-1 range)",
    "difficulty": "Medium",
    "description": "Given an unsorted array of numbers containing n + 1 numbers from 1 to n, find the duplicate number.\n\nExample:\nInput: [1, 4, 4, 3, 2]\nOutput: 4",
    "approach": "If a number is not in its correct index and the number already at that index equals it, we found our duplicate.",
    "starterCode": "def find_duplicate_cyclic(nums):\n    # TODO: Find duplicate via cyclic sort\n    pass",
    "solution": "def find_duplicate_cyclic(nums):\n    i = 0\n    while i < len(nums):\n        if nums[i] != i + 1:\n            correct = nums[i] - 1\n            if nums[i] != nums[correct]:\n                nums[i], nums[correct] = nums[correct], nums[i]\n            else:\n                return nums[i]\n        else:\n            i += 1\n    return -1",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Attempting to swap a value into an index that already contains that exact value immediately exposes the collision.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[1, 4, 4, 3, 2]",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[1, 4, 4, 3, 2] (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "5.5",
    "patternId": 5,
    "patternName": "Cyclic Sort",
    "title": "Find All Duplicate Numbers",
    "difficulty": "Medium",
    "description": "Given an integer array nums of length n where all integers are in [1, n] and each appears once or twice, return all duplicates.\n\nExample:\nInput: [3, 4, 4, 5, 5]\nOutput: [4, 5]",
    "approach": "Cyclic sort elements into position. In the second pass, any index where nums[i] != i + 1 contains a duplicate value.",
    "starterCode": "def find_all_duplicates(nums):\n    # TODO: Return all duplicates\n    pass",
    "solution": "def find_all_duplicates(nums):\n    i = 0\n    while i < len(nums):\n        correct = nums[i] - 1\n        if nums[i] != nums[correct]:\n            nums[i], nums[correct] = nums[correct], nums[i]\n        else:\n            i += 1\n    duplicates = []\n    for i in range(len(nums)):\n        if nums[i] != i + 1:\n            duplicates.append(nums[i])\n    return duplicates",
    "complexity": "O(n) time, O(1) extra space",
    "keyLesson": "Positions not holding `i + 1` house the misplaced duplicate values.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[3, 4, 4, 5, 5]",
        "expected": "[4, 5]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[3, 4, 4, 5, 5] (Case 2)",
        "expected": "[4, 5]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "5.6",
    "patternId": 5,
    "patternName": "Cyclic Sort",
    "title": "Find the Corrupt Pair (One Missing, One Duplicate)",
    "difficulty": "Easy",
    "description": "An array of n numbers contains 1 to n, but one number was duplicated and one was lost. Find [duplicate, missing].\n\nExample:\nInput: [3, 1, 2, 5, 2]\nOutput: [2, 4]",
    "approach": "Cyclic sort the array. The index i where nums[i] != i + 1 gives duplicate = nums[i] and missing = i + 1.",
    "starterCode": "def find_corrupt_pair(nums):\n    # TODO: Find [duplicate, missing]\n    pass",
    "solution": "def find_corrupt_pair(nums):\n    i = 0\n    while i < len(nums):\n        correct = nums[i] - 1\n        if nums[i] != nums[correct]:\n            nums[i], nums[correct] = nums[correct], nums[i]\n        else:\n            i += 1\n    for i in range(len(nums)):\n        if nums[i] != i + 1:\n            return [nums[i], i + 1]\n    return [-1, -1]",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "A single corrupt index simultaneously reveals the surplus intruder and the expected resident.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[3, 1, 2, 5, 2]",
        "expected": "[2, 4]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[3, 1, 2, 5, 2] (Case 2)",
        "expected": "[2, 4]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "5.7",
    "patternId": 5,
    "patternName": "Cyclic Sort",
    "title": "First Missing Positive",
    "difficulty": "Hard",
    "description": "Given an unsorted integer array nums, return the smallest missing positive integer in O(n) time and O(1) space.\n\nExample:\nInput: nums = [3, 4, -1, 1]\nOutput: 2",
    "approach": "Cyclic sort values in the range 1..n to indices 0..n-1. Ignore negatives, zero, and values > n. First index where nums[i] != i + 1 gives the answer.",
    "starterCode": "def first_missing_positive(nums):\n    # TODO: Find first missing positive integer\n    pass",
    "solution": "def first_missing_positive(nums):\n    i, n = 0, len(nums)\n    while i < n:\n        correct = nums[i] - 1\n        if 0 < nums[i] <= n and nums[i] != nums[correct]:\n            nums[i], nums[correct] = nums[correct], nums[i]\n        else:\n            i += 1\n    for i in range(n):\n        if nums[i] != i + 1:\n            return i + 1\n    return n + 1",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Any answer must lie between 1 and n + 1 (Pigeonhole principle), so values outside [1, n] can be safely ignored.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [3, 4, -1, 1]",
        "expected": "2"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [3, 4, -1]",
        "expected": "2"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "5.8",
    "patternId": 5,
    "patternName": "Cyclic Sort",
    "title": "Kth Missing Positive Number",
    "difficulty": "Easy",
    "description": "Given a sorted array of positive integers and an integer k, return the kth positive integer that is missing from this array.\n\nExample:\nInput: arr = [2, 3, 4, 7, 11], k = 5\nOutput: 9 (Missing: [1, 5, 6, 8, 9, 10...])",
    "approach": "Binary search on missing counts: at index mid, number of missing positives before it is `arr[mid] - (mid + 1)`. Narrow down until left + k.",
    "starterCode": "def find_kth_positive(nums, k):\n    # TODO: Find kth missing positive\n    pass",
    "solution": "def find_kth_positive(nums, k):\n    left, right = 0, len(nums)\n    while left < right:\n        mid = (left + right) // 2\n        missing_before = nums[mid] - (mid + 1)\n        if missing_before < k:\n            left = mid + 1\n        else:\n            right = mid\n    return left + k",
    "complexity": "O(log n) time, O(1) space",
    "keyLesson": "Index comparison `value - (index + 1)` quantifies missing count without enumerating missing items.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "arr = [2, 3, 4, 7, 11], k = 5",
        "expected": "9"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "arr = [2, 3, 4], k = 5",
        "expected": "9"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "5.9",
    "patternId": 5,
    "patternName": "Cyclic Sort",
    "title": "Set Mismatch",
    "difficulty": "Easy",
    "description": "You have a set of integers from 1 to n. Due to error, one number got duplicated. Return [duplicate, missing].\n\nExample:\nInput: nums = [1, 2, 2, 4]\nOutput: [2, 3]",
    "approach": "Same routine as 5.6: cyclic sort into indices nums[i] - 1, find index i where nums[i] != i + 1.",
    "starterCode": "def find_error_nums(nums):\n    # TODO: Find [duplicate, missing]\n    pass",
    "solution": "def find_error_nums(nums):\n    i = 0\n    while i < len(nums):\n        correct = nums[i] - 1\n        if nums[i] != nums[correct]:\n            nums[i], nums[correct] = nums[correct], nums[i]\n        else:\n            i += 1\n    for i in range(len(nums)):\n        if nums[i] != i + 1:\n            return [nums[i], i + 1]\n    return []",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "LeetCode phrasing of the corrupt pair pattern.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1, 2, 2, 4]",
        "expected": "[2, 3]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 2, 2]",
        "expected": "[2, 3]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums = [0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "5.10",
    "patternId": 5,
    "patternName": "Cyclic Sort",
    "title": "Smallest Missing Positive After Replacing Negatives",
    "difficulty": "Hard",
    "description": "Given an unsorted array with negative, zero, and positive numbers, neutralize negatives/zeros/out-of-range values, then find first missing positive.\n\nExample:\nInput: [3, -2, 0, 1, 2]\nOutput: 4",
    "approach": "Pre-pass neutralizes out-of-range elements to n + 1, then standard cyclic sort places valid positives 1..n into correct slots.",
    "starterCode": "def first_missing_positive_general(nums):\n    # TODO: Find first missing positive after neutralization\n    pass",
    "solution": "def first_missing_positive_general(nums):\n    n = len(nums)\n    for i in range(n):\n        if nums[i] <= 0 or nums[i] > n:\n            nums[i] = n + 1\n    i = 0\n    while i < n:\n        correct = nums[i] - 1\n        if nums[i] <= n and nums[i] != nums[correct]:\n            nums[i], nums[correct] = nums[correct], nums[i]\n        else:\n            i += 1\n    for i in range(n):\n        if nums[i] != i + 1:\n            return i + 1\n    return n + 1",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Normalizing messy inputs into a bounded range preserves cyclic sort's O(1) auxiliary space guarantee.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[3, -2, 0, 1, 2]",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[3, -2, 0, 1, 2] (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "6.1",
    "patternId": 6,
    "patternName": "In-place Reversal of a LinkedList",
    "title": "Reverse a LinkedList",
    "difficulty": "Easy",
    "description": "Given the head of a Singly LinkedList, reverse the list in-place and return the new head.\n\nExample:\nInput: 2 -> 4 -> 6 -> 8 -> 10\nOutput: 10 -> 8 -> 6 -> 4 -> 2",
    "approach": "Maintain prev, head (curr), and nxt pointers. Point head.next to prev, then advance prev and head.",
    "starterCode": "def reverse(head):\n    # TODO: Reverse linked list\n    pass",
    "solution": "def reverse(head):\n    prev = None\n    while head is not None:\n        nxt = head.next\n        head.next = prev\n        prev = head\n        head = nxt\n    return prev",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Standard 3-pointer pattern: save next, flip pointer, step forward.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "2 -> 4 -> 6 -> 8 -> 10",
        "expected": "10 -> 8 -> 6 -> 4 -> 2"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "2 -> 4 -> 6 -> 8 -> 10 (Case 2)",
        "expected": "10 -> 8 -> 6 -> 4 -> 2"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "6.2",
    "patternId": 6,
    "patternName": "In-place Reversal of a LinkedList",
    "title": "Reverse a Sub-list (Between Positions p and q)",
    "difficulty": "Medium",
    "description": "Reverse a linked list from position p to position q (1-indexed).\n\nExample:\nInput: 1 -> 2 -> 3 -> 4 -> 5, p = 2, q = 4\nOutput: 1 -> 4 -> 3 -> 2 -> 5",
    "approach": "Navigate to position p - 1. Repeatedly extract curr.next and insert it immediately after prev.",
    "starterCode": "def reverse_sub_list(head, p, q):\n    # TODO: Reverse sub-list from p to q\n    pass",
    "solution": "def reverse_sub_list(head, p, q):\n    if p == q:\n        return head\n    dummy = ListNode(0, head)\n    prev = dummy\n    for _ in range(p - 1):\n        prev = prev.next\n    curr = prev.next\n    for _ in range(q - p):\n        nxt = curr.next\n        curr.next = nxt.next\n        nxt.next = prev.next\n        prev.next = nxt\n    return dummy.next",
    "complexity": "O(q) time, O(1) space",
    "keyLesson": "In-place head-insertion avoids multiple passes and reconnecting dangling tails.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "1 -> 2 -> 3 -> 4 -> 5, p = 2, q = 4",
        "expected": "1 -> 4 -> 3 -> 2 -> 5"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "1 -> 2 -> 3 -> 4 -> 5, p = 2, q = 4 (Case 2)",
        "expected": "1 -> 4 -> 3 -> 2 -> 5"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "6.3",
    "patternId": 6,
    "patternName": "In-place Reversal of a LinkedList",
    "title": "Reverse Every K-element Sub-list",
    "difficulty": "Hard",
    "description": "Given the head of a linked list and a number k, reverse every k consecutive nodes of the list.\n\nExample:\nInput: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8, k = 3\nOutput: 3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 8 -> 7",
    "approach": "Reverse k elements at a time, connect the reversed group's head to prev_group_end, and reconnect its tail to the remaining unreversed list.",
    "starterCode": "def reverse_every_k_elements(head, k):\n    # TODO: Reverse every k nodes\n    pass",
    "solution": "def reverse_every_k_elements(head, k):\n    dummy = ListNode(0, head)\n    prev_group_end = dummy\n    curr = head\n    while curr:\n        prev, count = None, 0\n        while curr and count < k:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n            count += 1\n        old_next = prev_group_end.next\n        prev_group_end.next = prev\n        old_next.next = curr\n        prev_group_end = old_next\n    return dummy.next",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Keep track of `prev_group_end` and `old_next` (which becomes the new tail of the reversed chunk).",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8, k = 3",
        "expected": "3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 8 -> 7"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8, k = 3 (Case 2)",
        "expected": "3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 8 -> 7"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "6.4",
    "patternId": 6,
    "patternName": "In-place Reversal of a LinkedList",
    "title": "Reverse Alternating K-element Sub-list",
    "difficulty": "Hard",
    "description": "Given a linked list and number k, reverse every other k-element sub-list (reverse k, skip k, reverse k, etc.).\n\nExample:\nInput: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8, k = 2\nOutput: 2 -> 1 -> 3 -> 4 -> 6 -> 5 -> 7 -> 8",
    "approach": "After reversing k nodes, advance `prev_group_end` and `curr` forward by k nodes without reversing.",
    "starterCode": "def reverse_alternating_k_elements(head, k):\n    # TODO: Reverse alternating k elements\n    pass",
    "solution": "def reverse_alternating_k_elements(head, k):\n    dummy = ListNode(0, head)\n    prev_group_end = dummy\n    curr = head\n    while curr:\n        prev, count = None, 0\n        while curr and count < k:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n            count += 1\n        old_next = prev_group_end.next\n        prev_group_end.next = prev\n        old_next.next = curr\n        prev_group_end = old_next\n        count = 0\n        while curr and count < k:\n            prev_group_end = curr\n            curr = curr.next\n            count += 1\n    return dummy.next",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Interleaving reversal loops with skip loops handles arbitrary rhythmic transformations.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8, k = 2",
        "expected": "2 -> 1 -> 3 -> 4 -> 6 -> 5 -> 7 -> 8"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8, k = 2 (Case 2)",
        "expected": "2 -> 1 -> 3 -> 4 -> 6 -> 5 -> 7 -> 8"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "6.5",
    "patternId": 6,
    "patternName": "In-place Reversal of a LinkedList",
    "title": "Rotate a LinkedList",
    "difficulty": "Medium",
    "description": "Rotate the linked list to the right by k places.\n\nExample:\nInput: 1 -> 2 -> 3 -> 4 -> 5, k = 2\nOutput: 4 -> 5 -> 1 -> 2 -> 3",
    "approach": "Connect tail to head to form a circular list. Advance length - (k % length) steps, break the ring, and return new head.",
    "starterCode": "def rotate_right(head, k):\n    # TODO: Rotate linked list right by k\n    pass",
    "solution": "def rotate_right(head, k):\n    if not head or not head.next or k == 0:\n        return head\n    length, tail = 1, head\n    while tail.next:\n        tail = tail.next\n        length += 1\n    k %= length\n    if k == 0:\n        return head\n    tail.next = head\n    steps_to_new_tail = length - k\n    new_tail = head\n    for _ in range(steps_to_new_tail - 1):\n        new_tail = new_tail.next\n    new_head = new_tail.next\n    new_tail.next = None\n    return new_head",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Ring completion turns rotation into a simple modular cut point.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "1 -> 2 -> 3 -> 4 -> 5, k = 2",
        "expected": "4 -> 5 -> 1 -> 2 -> 3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "1 -> 2 -> 3 -> 4 -> 5, k = 2 (Case 2)",
        "expected": "4 -> 5 -> 1 -> 2 -> 3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "6.6",
    "patternId": 6,
    "patternName": "In-place Reversal of a LinkedList",
    "title": "Swap Nodes in Pairs",
    "difficulty": "Medium",
    "description": "Given a linked list, swap every two adjacent nodes and return its head without modifying node values.\n\nExample:\nInput: 1 -> 2 -> 3 -> 4\nOutput: 2 -> 1 -> 4 -> 3",
    "approach": "For each pair (first, second), set prev.next = second, first.next = second.next, second.next = first, prev = first.",
    "starterCode": "def swap_pairs(head):\n    # TODO: Swap nodes in pairs\n    pass",
    "solution": "def swap_pairs(head):\n    dummy = ListNode(0, head)\n    prev = dummy\n    while prev.next and prev.next.next:\n        first = prev.next\n        second = first.next\n        first.next = second.next\n        second.next = first\n        prev.next = second\n        prev = first\n    return dummy.next",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Special case of reverse-k with k=2, simplified using direct pointer rewiring.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "1 -> 2 -> 3 -> 4",
        "expected": "2 -> 1 -> 4 -> 3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "1 -> 2 -> 3 -> 4 (Case 2)",
        "expected": "2 -> 1 -> 4 -> 3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "6.7",
    "patternId": 6,
    "patternName": "In-place Reversal of a LinkedList",
    "title": "Reverse Nodes in Even Length Groups",
    "difficulty": "Medium",
    "description": "Nodes are grouped in increasing sizes 1, 2, 3, ... (last group may be shorter). Reverse only groups with an even number of nodes.\n\nExample:\nInput: [5,2,6,3,9,1,7,3,8,4]\nOutput: [5,6,2,3,9,1,4,8,3,7]",
    "approach": "Count actual length of current group. If length is even, reverse in-place; otherwise skip.",
    "starterCode": "def reverse_even_length_groups(head):\n    # TODO: Reverse even length groups\n    pass",
    "solution": "def reverse_even_length_groups(head):\n    prev, curr, group = head, head.next, 2\n    while curr:\n        node, num_nodes = prev, 0\n        for _ in range(group):\n            if not curr:\n                break\n            num_nodes += 1\n            node = curr\n            curr = curr.next\n        if num_nodes % 2 == 0:\n            reverse_curr = curr\n            node = prev.next\n            for _ in range(num_nodes):\n                nxt = node.next\n                node.next = reverse_curr\n                reverse_curr = node\n                node = nxt\n            temp = prev.next\n            prev.next = reverse_curr\n            prev = temp\n        else:\n            prev = node\n        group += 1\n    return head",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "Inspect actual count before reversing because the tail group may be smaller than group capacity.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[5,2,6,3,9,1,7,3,8,4]",
        "expected": "[5,6,2,3,9,1,4,8,3,7]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[5,2,6,3,9,1,7,3,8,4] (Case 2)",
        "expected": "[5,6,2,3,9,1,4,8,3,7]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "6.8",
    "patternId": 6,
    "patternName": "In-place Reversal of a LinkedList",
    "title": "Palindrome Check via In-place Reversal",
    "difficulty": "Medium",
    "description": "Check if a linked list is a palindrome by reversing the first half in-place as you walk to the middle.\n\nExample:\nInput: 1 -> 2 -> 2 -> 1\nOutput: True",
    "approach": "Use fast and slow pointers. Reverse the first half during iteration, then compare against second half.",
    "starterCode": "def is_palindrome_via_reversal(head):\n    # TODO: Palindrome check via in-place reversal\n    pass",
    "solution": "def is_palindrome_via_reversal(head):\n    slow, fast = head, head\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n    prev = None\n    while slow:\n        nxt = slow.next\n        slow.next = prev\n        prev = slow\n        slow = nxt\n    left, right = head, prev\n    is_palin = True\n    while right:\n        if left.value != right.value:\n            is_palin = False\n            break\n        left, right = left.next, right.next\n    return is_palin",
    "complexity": "O(n) time, O(1) space",
    "keyLesson": "In-place reversal confirms palindromic symmetry without node allocation.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "1 -> 2 -> 2 -> 1",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "1 -> 2 -> 2 -> 1 (Case 2)",
        "expected": "True"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "1 -> 2 -> 2 -> 1",
        "expected": "False"
      }
    ]
  },
  {
    "id": "6.9",
    "patternId": 6,
    "patternName": "In-place Reversal of a LinkedList",
    "title": "Add Two Numbers as LinkedLists",
    "difficulty": "Medium",
    "description": "Two non-empty linked lists represent two non-negative integers. Digits are stored in reverse order. Add the numbers and return sum as a linked list.\n\nExample:\nInput: (2 -> 4 -> 3) + (5 -> 6 -> 4)\nOutput: 7 -> 0 -> 8 (342 + 465 = 807)",
    "approach": "Walk both lists simultaneously, maintaining carry = sum // 10 and digit = sum % 10.",
    "starterCode": "def add_two_numbers(l1, l2):\n    # TODO: Add two numbers as linked lists\n    pass",
    "solution": "def add_two_numbers(l1, l2):\n    dummy = ListNode(0)\n    curr = dummy\n    carry = 0\n    while l1 or l2 or carry:\n        v1 = l1.value if l1 else 0\n        v2 = l2.value if l2 else 0\n        total = v1 + v2 + carry\n        carry = total // 10\n        curr.next = ListNode(total % 10)\n        curr = curr.next\n        l1 = l1.next if l1 else None\n        l2 = l2.next if l2 else None\n    return dummy.next",
    "complexity": "O(max(n, m)) time, O(max(n, m)) space",
    "keyLesson": "The loop condition `l1 or l2 or carry` elegantly handles disparate lengths and final leftover carries.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "",
        "expected": "7 -> 0 -> 8"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": " (Case 2)",
        "expected": "7 -> 0 -> 8"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "6.10",
    "patternId": 6,
    "patternName": "In-place Reversal of a LinkedList",
    "title": "Split LinkedList in Parts",
    "difficulty": "Medium",
    "description": "Split a linked list with head into k consecutive linked list parts as equally sized as possible. The lengths should differ by at most 1, with earlier parts larger.\n\nExample:\nInput: head = [1,2,3,4,5,6,7,8,9,10], k = 3\nOutput: [[1,2,3,4],[5,6,7],[8,9,10]]",
    "approach": "Compute length. Use divmod(length, k) to get base size and extra nodes. Sever connections between parts.",
    "starterCode": "def split_list_to_parts(head, k):\n    # TODO: Split list into k parts\n    pass",
    "solution": "def split_list_to_parts(head, k):\n    length = 0\n    node = head\n    while node:\n        length += 1\n        node = node.next\n    base_size, extra = divmod(length, k)\n    result = []\n    curr = head\n    for i in range(k):\n        part_size = base_size + (1 if i < extra else 0)\n        if part_size == 0:\n            result.append(None)\n            continue\n        part_head = curr\n        for _ in range(part_size - 1):\n            curr = curr.next\n        nxt = curr.next\n        curr.next = None\n        curr = nxt\n        result.append(part_head)\n    return result",
    "complexity": "O(n) time, O(k) space for output array",
    "keyLesson": "Divmod distributes remainder nodes to the first `extra` parts.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "head = [1,2,3,4,5,6,7,8,9,10], k = 3",
        "expected": "[[1,2,3,4],[5,6,7],[8,9,10]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "head = [1,2,3,4,5,6,7,8,9,10], k = 3 (Case 2)",
        "expected": "[[1,2,3,4],[5,6,7],[8,9,10]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "head = [0], k = 3",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "7.1",
    "patternId": 7,
    "patternName": "Tree Breadth-First Search (BFS)",
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "description": "Given the root of a binary tree, return the level order traversal of its nodes' values (from left to right, level by level).\n\nExample:\nInput: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]",
    "approach": "Use a queue. Process `len(queue)` nodes at each iteration to ensure strict level separation.",
    "starterCode": "from collections import deque\ndef level_order(root):\n    # TODO: Level order traversal\n    pass",
    "solution": "from collections import deque\ndef level_order(root):\n    result = []\n    if not root:\n        return result\n    queue = deque([root])\n    while queue:\n        level_size = len(queue)\n        level = []\n        for _ in range(level_size):\n            node = queue.popleft()\n            level.append(node.val)\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n        result.append(level)\n    return result",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Snapshotting `level_size = len(queue)` partitions nodes strictly by vertical depth.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "root = [3,9,20,null,null,15,7]",
        "expected": "[[3],[9,20],[15,7]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "root = [3,9,20,null,null,15,7] (Case 2)",
        "expected": "[[3],[9,20],[15,7]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "root = [0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "7.2",
    "patternId": 7,
    "patternName": "Tree Breadth-First Search (BFS)",
    "title": "Reverse Level Order Traversal",
    "difficulty": "Medium",
    "description": "Return bottom-up level order traversal of binary tree (from leaf level to root level).\n\nExample:\nInput: [3,9,20,null,null,15,7]\nOutput: [[15,7],[9,20],[3]]",
    "approach": "Standard level order BFS, inserting each level at index 0 of result (or append and reverse).",
    "starterCode": "from collections import deque\ndef reverse_level_order(root):\n    # TODO: Reverse level order traversal\n    pass",
    "solution": "from collections import deque\ndef reverse_level_order(root):\n    result = []\n    if not root:\n        return result\n    queue = deque([root])\n    while queue:\n        level_size = len(queue)\n        level = []\n        for _ in range(level_size):\n            node = queue.popleft()\n            level.append(node.val)\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n        result.insert(0, level)\n    return result",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Top-down BFS result reversed equals bottom-up traversal.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[3,9,20,null,null,15,7]",
        "expected": "[[15,7],[9,20],[3]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[3,9,20,null,null,15,7] (Case 2)",
        "expected": "[[15,7],[9,20],[3]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "7.3",
    "patternId": 7,
    "patternName": "Tree Breadth-First Search (BFS)",
    "title": "Zigzag Traversal",
    "difficulty": "Medium",
    "description": "Traverse tree zigzag: left to right on level 1, right to left on level 2, etc.\n\nExample:\nInput: [3,9,20,null,null,15,7]\nOutput: [[3],[20,9],[15,7]]",
    "approach": "Maintain a boolean flag `left_to_right`. Use a deque for the current level: append right or append left accordingly.",
    "starterCode": "from collections import deque\ndef zigzag_level_order(root):\n    # TODO: Zigzag level order\n    pass",
    "solution": "from collections import deque\ndef zigzag_level_order(root):\n    result = []\n    if not root:\n        return result\n    queue = deque([root])\n    left_to_right = True\n    while queue:\n        level_size = len(queue)\n        level = deque()\n        for _ in range(level_size):\n            node = queue.popleft()\n            if left_to_right:\n                level.append(node.val)\n            else:\n                level.appendleft(node.val)\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n        result.append(list(level))\n        left_to_right = not left_to_right\n    return result",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Populating levels with deque `appendleft` flips order in O(1) without reversing.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[3,9,20,null,null,15,7]",
        "expected": "[[3],[20,9],[15,7]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[3,9,20,null,null,15,7] (Case 2)",
        "expected": "[[3],[20,9],[15,7]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "7.4",
    "patternId": 7,
    "patternName": "Tree Breadth-First Search (BFS)",
    "title": "Level Averages in Binary Tree",
    "difficulty": "Easy",
    "description": "Given a binary tree, return an array of the average values of the nodes at each level.\n\nExample:\nInput: [3,9,20,null,null,15,7]\nOutput: [3.0, 14.5, 11.0]",
    "approach": "Accumulate sum of node values across each level, divide by `level_size`.",
    "starterCode": "from collections import deque\ndef find_level_averages(root):\n    # TODO: Calculate level averages\n    pass",
    "solution": "from collections import deque\ndef find_level_averages(root):\n    result = []\n    if not root:\n        return result\n    queue = deque([root])\n    while queue:\n        level_size = len(queue)\n        level_sum = 0\n        for _ in range(level_size):\n            node = queue.popleft()\n            level_sum += node.val\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n        result.append(level_sum / level_size)\n    return result",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Aggregation functions map directly over the level inner loop.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[3,9,20,null,null,15,7]",
        "expected": "[3.0, 14.5, 11.0]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[3,9,20,null,null,15,7] (Case 2)",
        "expected": "[3.0, 14.5, 11.0]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "7.5",
    "patternId": 7,
    "patternName": "Tree Breadth-First Search (BFS)",
    "title": "Minimum Depth of Binary Tree",
    "difficulty": "Easy",
    "description": "Find the minimum depth of a binary tree (shortest path from root down to nearest leaf node).\n\nExample:\nInput: [3,9,20,null,null,15,7]\nOutput: 2",
    "approach": "BFS finds shortest paths: return the depth the moment the first leaf node (`not node.left and not node.right`) is popped.",
    "starterCode": "from collections import deque\ndef find_min_depth(root):\n    # TODO: Find minimum depth via BFS\n    pass",
    "solution": "from collections import deque\ndef find_min_depth(root):\n    if not root:\n        return 0\n    queue = deque([root])\n    depth = 1\n    while queue:\n        level_size = len(queue)\n        for _ in range(level_size):\n            node = queue.popleft()\n            if not node.left and not node.right:\n                return depth\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n        depth += 1\n    return depth",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "BFS is optimal for minimum depth because it halts immediately upon seeing the first leaf.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[3,9,20,null,null,15,7]",
        "expected": "2"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[3,9,20,null,null,15,7] (Case 2)",
        "expected": "2"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "7.6",
    "patternId": 7,
    "patternName": "Tree Breadth-First Search (BFS)",
    "title": "Maximum Depth of Binary Tree (BFS)",
    "difficulty": "Easy",
    "description": "Find the maximum depth of a binary tree using BFS.\n\nExample:\nInput: [3,9,20,null,null,15,7]\nOutput: 3",
    "approach": "Level order BFS: increment depth by 1 for every level processed until the queue empties.",
    "starterCode": "from collections import deque\ndef find_max_depth(root):\n    # TODO: Find max depth via BFS\n    pass",
    "solution": "from collections import deque\ndef find_max_depth(root):\n    if not root:\n        return 0\n    queue = deque([root])\n    depth = 0\n    while queue:\n        depth += 1\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n    return depth",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Total levels processed in BFS equals tree height.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[3,9,20,null,null,15,7]",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[3,9,20,null,null,15,7] (Case 2)",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "7.7",
    "patternId": 7,
    "patternName": "Tree Breadth-First Search (BFS)",
    "title": "Level Order Successor",
    "difficulty": "Easy",
    "description": "Given a node's value in a binary tree, find the node that appears immediately after it in level order traversal.\n\nExample:\nInput: [1,2,3,4,5], key = 3\nOutput: 4",
    "approach": "Standard BFS: as soon as node.val == key, the next node popped from the queue is the successor.",
    "starterCode": "from collections import deque\ndef find_successor(root, key):\n    # TODO: Find level order successor\n    pass",
    "solution": "from collections import deque\ndef find_successor(root, key):\n    if not root:\n        return None\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node.left:\n            queue.append(node.left)\n        if node.right:\n            queue.append(node.right)\n        if node.val == key:\n            break\n    return queue[0] if queue else None",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "The next element in BFS queue order is exactly the level-order successor.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[1,2,3,4,5], key = 3",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[1,2,3,4,5], key = 3 (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "7.8",
    "patternId": 7,
    "patternName": "Tree Breadth-First Search (BFS)",
    "title": "Connect Level Order Siblings",
    "difficulty": "Medium",
    "description": "Populate each node's `next` pointer to point to its next right node. The last node in each level points to None.\n\nExample:\nInput: [1,2,3,4,5,6,7]\nOutput: 2 -> 3 -> None, 4 -> 5 -> 6 -> 7 -> None",
    "approach": "Track `prev = None` at start of each level. Inside the level loop, if prev: prev.next = node; prev = node.",
    "starterCode": "from collections import deque\ndef connect_all_siblings(root):\n    # TODO: Connect sibling pointers\n    pass",
    "solution": "from collections import deque\ndef connect_all_siblings(root):\n    if not root:\n        return\n    queue = deque([root])\n    while queue:\n        level_size = len(queue)\n        prev = None\n        for _ in range(level_size):\n            node = queue.popleft()\n            if prev:\n                prev.next = node\n            prev = node\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Resetting `prev = None` at each outer while-loop iteration cleanly caps the end of each level.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[1,2,3,4,5,6,7]",
        "expected": "2 -> 3 -> None, 4 -> 5 -> 6 -> 7 -> None"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[1,2,3,4,5,6,7] (Case 2)",
        "expected": "2 -> 3 -> None, 4 -> 5 -> 6 -> 7 -> None"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "7.9",
    "patternId": 7,
    "patternName": "Tree Breadth-First Search (BFS)",
    "title": "Right View of Binary Tree",
    "difficulty": "Medium",
    "description": "Given the root of a binary tree, imagine standing on the right side. Return values of nodes you can see ordered top to bottom.\n\nExample:\nInput: [1,2,3,null,5,null,4]\nOutput: [1,3,4]",
    "approach": "Level order BFS: the last node visited in each level loop (`i == level_size - 1`) is the rightmost visible node.",
    "starterCode": "from collections import deque\ndef right_view(root):\n    # TODO: Return right view nodes\n    pass",
    "solution": "from collections import deque\ndef right_view(root):\n    result = []\n    if not root:\n        return result\n    queue = deque([root])\n    while queue:\n        level_size = len(queue)\n        for i in range(level_size):\n            node = queue.popleft()\n            if i == level_size - 1:\n                result.append(node.val)\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n    return result",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Boundary views correspond to index `0` (left view) or `level_size - 1` (right view).",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[1,2,3,null,5,null,4]",
        "expected": "[1,3,4]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[1,2,3,null,5,null,4] (Case 2)",
        "expected": "[1,3,4]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "7.10",
    "patternId": 7,
    "patternName": "Tree Breadth-First Search (BFS)",
    "title": "Binary Tree Level Order Traversal II (Bottom-up)",
    "difficulty": "Medium",
    "description": "Return bottom-up level order traversal of nodes (from leaf level to root).\n\nExample:\nInput: [3,9,20,null,null,15,7]\nOutput: [[15,7],[9,20],[3]]",
    "approach": "Collect levels in standard BFS order, then slice `result[::-1]` at the end.",
    "starterCode": "from collections import deque\ndef level_order_bottom(root):\n    # TODO: Bottom up level order traversal\n    pass",
    "solution": "from collections import deque\ndef level_order_bottom(root):\n    result = []\n    if not root:\n        return result\n    queue = deque([root])\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            level.append(node.val)\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n        result.append(level)\n    return result[::-1]",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Reversing at the end avoids O(n) list insertion costs during traversal.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[3,9,20,null,null,15,7]",
        "expected": "[[15,7],[9,20],[3]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[3,9,20,null,null,15,7] (Case 2)",
        "expected": "[[15,7],[9,20],[3]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "8.1",
    "patternId": 8,
    "patternName": "Tree Depth-First Search (DFS)",
    "title": "Binary Tree Path Sum",
    "difficulty": "Easy",
    "description": "Given the root of a binary tree and an integer targetSum, return True if the tree has a root-to-leaf path such that adding up all values along the path equals targetSum.\n\nExample:\nInput: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22\nOutput: True",
    "approach": "Subtract node.val from target. If at a leaf node and remaining == 0, return True. Recursively check left and right.",
    "starterCode": "def has_path_sum(root, target_sum):\n    # TODO: Check if path sum exists\n    pass",
    "solution": "def has_path_sum(root, target_sum):\n    if not root:\n        return False\n    if not root.left and not root.right:\n        return root.val == target_sum\n    remaining = target_sum - root.val\n    return has_path_sum(root.left, remaining) or has_path_sum(root.right, remaining)",
    "complexity": "O(n) time, O(h) space",
    "keyLesson": "A path must terminate at a true leaf (`not left and not right`), not merely an internal None node.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22 (Case 2)",
        "expected": "True"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "root = [1], targetSum = 22",
        "expected": "False"
      }
    ]
  },
  {
    "id": "8.2",
    "patternId": 8,
    "patternName": "Tree Depth-First Search (DFS)",
    "title": "All Paths for a Sum",
    "difficulty": "Medium",
    "description": "Find all root-to-leaf paths where the sum of node values equals target_sum.\n\nExample:\nInput: targetSum = 12\nOutput: [[1, 7, 4], [1, 9, 2]]",
    "approach": "Backtracking DFS: append node.val to `current_path`, recurse, append copy if valid leaf, then pop before returning.",
    "starterCode": "def find_paths(root, target_sum):\n    # TODO: Return all paths matching target sum\n    pass",
    "solution": "def find_paths(root, target_sum):\n    all_paths = []\n    def dfs(node, remaining, current_path):\n        if not node:\n            return\n        current_path.append(node.val)\n        if not node.left and not node.right and node.val == remaining:\n            all_paths.append(list(current_path))\n        else:\n            dfs(node.left, remaining - node.val, current_path)\n            dfs(node.right, remaining - node.val, current_path)\n        current_path.pop()\n    dfs(root, target_sum, [])\n    return all_paths",
    "complexity": "O(n^2) worst case, O(h) recursion space",
    "keyLesson": "Backtracking with `current_path.pop()` avoids allocating new path lists at each depth level.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "targetSum = 12",
        "expected": "[[1, 7, 4], [1, 9, 2]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "targetSum = 12 (Case 2)",
        "expected": "[[1, 7, 4], [1, 9, 2]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "targetSum = 12",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "8.3",
    "patternId": 8,
    "patternName": "Tree Depth-First Search (DFS)",
    "title": "Sum of Path Numbers",
    "difficulty": "Medium",
    "description": "Each root-to-leaf path in a tree represents a number formed by concatenating digits. Return sum of all path numbers.\n\nExample:\nInput: root = [1, 2, 3] (Paths: 12 and 13)\nOutput: 25",
    "approach": "Pass `path_sum * 10 + node.val` down to children. At leaves, return the accumulated path number.",
    "starterCode": "def find_sum_of_path_numbers(root):\n    # TODO: Calculate sum of all path numbers\n    pass",
    "solution": "def find_sum_of_path_numbers(root):\n    def dfs(node, path_sum):\n        if not node:\n            return 0\n        path_sum = path_sum * 10 + node.val\n        if not node.left and not node.right:\n            return path_sum\n        return dfs(node.left, path_sum) + dfs(node.right, path_sum)\n    return dfs(root, 0)",
    "complexity": "O(n) time, O(h) space",
    "keyLesson": "Accumulating top-down via decimal shifting `val * 10 + digit` computes leaf integers in a single pass.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "root = [1, 2, 3]",
        "expected": "25"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "root = [1, 2, 3] (Case 2)",
        "expected": "25"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "8.4",
    "patternId": 8,
    "patternName": "Tree Depth-First Search (DFS)",
    "title": "Path With Given Sequence",
    "difficulty": "Medium",
    "description": "Given a binary tree and an integer sequence, determine if the sequence is a valid root-to-leaf path.\n\nExample:\nInput: sequence = [1, 9, 9]\nOutput: True",
    "approach": "At each step, verify `node.val == sequence[index]`. If at leaf and `index == len(sequence) - 1`, return True.",
    "starterCode": "def find_path(root, sequence):\n    # TODO: Verify sequence path\n    pass",
    "solution": "def find_path(root, sequence):\n    if not root:\n        return len(sequence) == 0\n    def dfs(node, index):\n        if not node or index >= len(sequence) or node.val != sequence[index]:\n            return False\n        if not node.left and not node.right and index == len(sequence) - 1:\n            return True\n        return dfs(node.left, index + 1) or dfs(node.right, index + 1)\n    return dfs(root, 0)",
    "complexity": "O(n) time, O(h) space",
    "keyLesson": "Index matching along DFS enables early pruning whenever prefix equality fails.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "sequence = [1, 9, 9]",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "sequence = [1, 9, 9] (Case 2)",
        "expected": "True"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "sequence = [1]",
        "expected": "False"
      }
    ]
  },
  {
    "id": "8.5",
    "patternId": 8,
    "patternName": "Tree Depth-First Search (DFS)",
    "title": "Count Paths for a Sum",
    "difficulty": "Medium",
    "description": "Count all paths that sum to a target (paths do not need to start at root or end at leaf, but must go downwards).\n\nExample:\nInput: targetSum = 8\nOutput: 3",
    "approach": "At each node, traverse backwards along the current path list and accumulate sums to count all valid suffixes.",
    "starterCode": "def count_paths(root, target_sum):\n    # TODO: Count downward paths summing to target\n    pass",
    "solution": "def count_paths(root, target_sum):\n    def dfs(node, current_path):\n        if not node:\n            return 0\n        current_path.append(node.val)\n        path_sum, path_count = 0, 0\n        for i in range(len(current_path) - 1, -1, -1):\n            path_sum += current_path[i]\n            if path_sum == target_sum:\n                path_count += 1\n        path_count += dfs(node.left, current_path)\n        path_count += dfs(node.right, current_path)\n        current_path.pop()\n        return path_count\n    return dfs(root, [])",
    "complexity": "O(n log n) average, O(n^2) worst case, O(h) space",
    "keyLesson": "Suffix summation along the active recursion stack evaluates all downward subpaths terminating at current node.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "targetSum = 8",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "targetSum = 8 (Case 2)",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "8.6",
    "patternId": 8,
    "patternName": "Tree Depth-First Search (DFS)",
    "title": "Diameter of Binary Tree",
    "difficulty": "Easy",
    "description": "Return length of longest path between any two nodes in a tree (path may or may not pass through root).\n\nExample:\nInput: [1,2,3,4,5]\nOutput: 3",
    "approach": "Post-order DFS: each node calculates max depth of left and right subtrees. Diameter through current node is `left + right`.",
    "starterCode": "def diameter_of_binary_tree(root):\n    # TODO: Find tree diameter\n    pass",
    "solution": "def diameter_of_binary_tree(root):\n    diameter = 0\n    def height(node):\n        nonlocal diameter\n        if not node:\n            return 0\n        left = height(node.left)\n        right = height(node.right)\n        diameter = max(diameter, left + right)\n        return 1 + max(left, right)\n    height(root)\n    return diameter",
    "complexity": "O(n) time, O(h) space",
    "keyLesson": "Post-order traversal computes local subtree metrics bottom-up while updating a global tracker.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[1,2,3,4,5]",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[1,2,3,4,5] (Case 2)",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "8.7",
    "patternId": 8,
    "patternName": "Tree Depth-First Search (DFS)",
    "title": "Lowest Common Ancestor",
    "difficulty": "Medium",
    "description": "Find lowest common ancestor (LCA) of two given nodes p and q in a binary tree.\n\nExample:\nInput: root = [3,5,1,6,2,0,8], p = 5, q = 1\nOutput: 3",
    "approach": "If root is p, q, or None, return root. Recurse left and right. If both return non-null, root is LCA.",
    "starterCode": "def lowest_common_ancestor(root, p, q):\n    # TODO: Find LCA of p and q\n    pass",
    "solution": "def lowest_common_ancestor(root, p, q):\n    if not root or root == p or root == q:\n        return root\n    left = lowest_common_ancestor(root.left, p, q)\n    right = lowest_common_ancestor(root.right, p, q)\n    if left and right:\n        return root\n    return left if left else right",
    "complexity": "O(n) time, O(h) space",
    "keyLesson": "When two targets are in different subtrees of a node, that node is their lowest split point.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "root = [3,5,1,6,2,0,8], p = 5, q = 1",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "root = [3,5,1,6,2,0,8], p = 5, q = 1 (Case 2)",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "8.8",
    "patternId": 8,
    "patternName": "Tree Depth-First Search (DFS)",
    "title": "Path Sum III (Count Subpaths, Not Necessarily Root-Rooted)",
    "difficulty": "Medium",
    "description": "Count downward paths summing to target using prefix-sums in O(n) time.\n\nExample:\nInput: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8\nOutput: 3",
    "approach": "Maintain a prefix sum hash map `prefix_counts[curr_sum]`. Count paths where `curr_sum - target_sum` exists in map.",
    "starterCode": "from collections import defaultdict\ndef path_sum_iii(root, target_sum):\n    # TODO: Count paths via prefix sums in O(n)\n    pass",
    "solution": "from collections import defaultdict\ndef path_sum_iii(root, target_sum):\n    prefix_counts = defaultdict(int)\n    prefix_counts[0] = 1\n    def dfs(node, curr_sum):\n        if not node:\n            return 0\n        curr_sum += node.val\n        count = prefix_counts[curr_sum - target_sum]\n        prefix_counts[curr_sum] += 1\n        count += dfs(node.left, curr_sum)\n        count += dfs(node.right, curr_sum)\n        prefix_counts[curr_sum] -= 1\n        return count\n    return dfs(root, 0)",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Prefix sum hashing reduces subpath counting from O(n^2) to O(n), with backtrack cleanup upon returning.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8 (Case 2)",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "8.9",
    "patternId": 8,
    "patternName": "Tree Depth-First Search (DFS)",
    "title": "Binary Tree Maximum Path Sum",
    "difficulty": "Hard",
    "description": "Find the maximum path sum between any two nodes in a binary tree (values can be negative).\n\nExample:\nInput: root = [-10,9,20,null,null,15,7]\nOutput: 42 (Path: 15 -> 20 -> 7)",
    "approach": "Post-order DFS: gain from subtree is max(dfs(child), 0). Max path through current node is `node.val + left_gain + right_gain`.",
    "starterCode": "def max_path_sum(root):\n    # TODO: Find max path sum in tree\n    pass",
    "solution": "def max_path_sum(root):\n    best = float('-inf')\n    def dfs(node):\n        nonlocal best\n        if not node:\n            return 0\n        left = max(dfs(node.left), 0)\n        right = max(dfs(node.right), 0)\n        best = max(best, node.val + left + right)\n        return node.val + max(left, right)\n    dfs(root)\n    return best",
    "complexity": "O(n) time, O(h) space",
    "keyLesson": "Ignoring negative subtree returns via `max(gain, 0)` prunes detrimental branches.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "root = [-10,9,20,null,null,15,7]",
        "expected": "42"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "root = [-10,9,20,null,null,15,7] (Case 2)",
        "expected": "42"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "8.10",
    "patternId": 8,
    "patternName": "Tree Depth-First Search (DFS)",
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "Hard",
    "description": "Serialize a binary tree into a string and deserialize that string back to the original tree structure.\n\nExample:\nInput: root = [1,2,3,null,null,4,5]\nOutput: Same tree reconstructed",
    "approach": "Pre-order DFS serialization: write node values separated by commas, using 'N' for None children. Deserialize with an iterator.",
    "starterCode": "def serialize(root):\n    # TODO: Serialize tree to string\n    pass\ndef deserialize(data):\n    # TODO: Deserialize string to tree\n    pass",
    "solution": "def serialize(root):\n    result = []\n    def dfs(node):\n        if not node:\n            result.append(\"N\")\n            return\n        result.append(str(node.val))\n        dfs(node.left)\n        dfs(node.right)\n    dfs(root)\n    return \",\".join(result)\n\ndef deserialize(data):\n    values = iter(data.split(\",\"))\n    def dfs():\n        val = next(values)\n        if val == \"N\":\n            return None\n        node = TreeNode(int(val))\n        node.left = dfs()\n        node.right = dfs()\n        return node\n    return dfs()",
    "complexity": "O(n) time, O(n) space",
    "keyLesson": "Explicit null markers in pre-order traversal encode unique tree topologies without needing an in-order pass.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "root = [1,2,3,null,null,4,5]",
        "expected": "Same tree reconstructed"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "root = [1,2,3,null,null,4,5] (Case 2)",
        "expected": "Same tree reconstructed"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "9.1",
    "patternId": 9,
    "patternName": "Two Heaps",
    "title": "Find the Median of a Number Stream",
    "difficulty": "Hard",
    "description": "Design a data structure that supports adding numbers from a stream and finding the median of all numbers added so far in O(1) time.\n\nExample:\nadd(3), add(1) -> median 2.0; add(5) -> median 3.0",
    "approach": "Store smaller half in max-heap and larger half in min-heap. Balance sizes so max_heap has at most 1 more element than min_heap.",
    "starterCode": "import heapq\nclass MedianFinder:\n    # TODO: Implement MedianFinder with two heaps\n    pass",
    "solution": "import heapq\nclass MedianFinder:\n    def __init__(self):\n        self.max_heap = []\n        self.min_heap = []\n    def insert_num(self, num):\n        if not self.max_heap or -self.max_heap[0] >= num:\n            heapq.heappush(self.max_heap, -num)\n        else:\n            heapq.heappush(self.min_heap, num)\n        if len(self.max_heap) > len(self.min_heap) + 1:\n            heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))\n        elif len(self.min_heap) > len(self.max_heap):\n            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))\n    def find_median(self):\n        if len(self.max_heap) == len(self.min_heap):\n            return (-self.max_heap[0] + self.min_heap[0]) / 2.0\n        return -self.max_heap[0] * 1.0",
    "complexity": "O(log n) insert, O(1) median query",
    "keyLesson": "Two balanced heaps split any sorted stream into halves, giving direct O(1) access to median elements.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "Standard sample for Find the Median of a Number Stream",
        "expected": "Valid output"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "Secondary sample for Find the Median of a Number Stream",
        "expected": "Valid output"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Edge boundary for Find the Median of a Number Stream",
        "expected": "Default result"
      }
    ]
  },
  {
    "id": "9.2",
    "patternId": 9,
    "patternName": "Two Heaps",
    "title": "Sliding Window Median",
    "difficulty": "Hard",
    "description": "Given an integer array nums and a sliding window of size k, return the median of each window.\n\nExample:\nInput: nums = [1,3,-1,-3,5,3,6,7], k = 3\nOutput: [1.0,-1.0,-1.0,3.0,5.0,6.0]",
    "approach": "Maintain two heaps for the window. As window slides, add incoming element and remove outgoing element with heap rebalancing.",
    "starterCode": "def median_sliding_window(nums, k):\n    # TODO: Calculate sliding window median\n    pass",
    "solution": "import heapq\nfrom collections import defaultdict\ndef median_sliding_window(nums, k):\n    def add_num(num, max_h, min_h):\n        if not max_h or -max_h[0] >= num:\n            heapq.heappush(max_h, -num)\n        else:\n            heapq.heappush(min_h, num)\n    def rebalance(max_h, min_h):\n        if len(max_h) > len(min_h) + 1:\n            heapq.heappush(min_h, -heapq.heappop(max_h))\n        elif len(max_h) < len(min_h):\n            heapq.heappush(max_h, -heapq.heappop(min_h))\n    def get_med(max_h, min_h, k):\n        return (-max_h[0] + min_h[0]) / 2.0 if k % 2 == 0 else -max_h[0] * 1.0\n    result = []\n    max_h, min_h = [], []\n    for i in range(len(nums)):\n        add_num(nums[i], max_h, min_h)\n        rebalance(max_h, min_h)\n        if i >= k - 1:\n            result.append(get_med(max_h, min_h, k))\n            out = nums[i - k + 1]\n            if out <= -max_h[0]:\n                max_h.remove(-out)\n                heapq.heapify(max_h)\n            else:\n                min_h.remove(out)\n                heapq.heapify(min_h)\n            rebalance(max_h, min_h)\n    return result",
    "complexity": "O(n log k) time, O(k) space",
    "keyLesson": "Sliding window median pairs sliding window bounds with the two-heap partition.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        "expected": "[1.0,-1.0,-1.0,3.0,5.0,6.0]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 3, -1], k = 3",
        "expected": "[1.0,-1.0,-1.0,3.0,5.0,6.0]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums = [0], k = 3",
        "expected": "[-1, -1]"
      }
    ]
  },
  {
    "id": "9.3",
    "patternId": 9,
    "patternName": "Two Heaps",
    "title": "Maximize Capital (IPO Problem)",
    "difficulty": "Hard",
    "description": "Given project capital requirements, profits, and initial capital W, choose up to K projects to maximize final capital.\n\nExample:\nInput: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]\nOutput: 4",
    "approach": "Min-heap for projects by capital requirement. Move all affordable projects into a max-heap of profits. Greedily pick highest profit.",
    "starterCode": "import heapq\ndef maximum_capital(capital, profits, num_projects, initial_capital):\n    # TODO: Maximize capital\n    pass",
    "solution": "import heapq\ndef maximum_capital(capital, profits, num_projects, initial_capital):\n    min_capital_heap = list(zip(capital, profits))\n    heapq.heapify(min_capital_heap)\n    max_profit_heap = []\n    available_capital = initial_capital\n    for _ in range(num_projects):\n        while min_capital_heap and min_capital_heap[0][0] <= available_capital:\n            c, p = heapq.heappop(min_capital_heap)\n            heapq.heappush(max_profit_heap, -p)\n        if not max_profit_heap:\n            break\n        available_capital += -heapq.heappop(max_profit_heap)\n    return available_capital",
    "complexity": "O(n log n) time, O(n) space",
    "keyLesson": "Dual heaps decouple what you can afford (min-heap by cost) from the greedy best choice (max-heap by gain).",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "k = 2, w = 0, profits = [1,2,3], capital = [0,1,1] (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "9.4",
    "patternId": 9,
    "patternName": "Two Heaps",
    "title": "Next Interval",
    "difficulty": "Hard",
    "description": "For each interval, find the interval that starts right after it ends with the smallest start time (the 'next interval'), or -1 if none.\n\nExample:\nInput: [[2,3], [3,4], [5,6]]\nOutput: [1, 2, -1]",
    "approach": "Max-heap of interval start times and max-heap of interval end times. Greedily match end times to the closest viable start.",
    "starterCode": "import heapq\ndef find_next_interval(intervals):\n    # TODO: Find next interval for each interval\n    pass",
    "solution": "import heapq\ndef find_next_interval(intervals):\n    n = len(intervals)\n    max_start_heap = [(-intervals[i][0], i) for i in range(n)]\n    min_end_heap = [(intervals[i][1], i) for i in range(n)]\n    heapq.heapify(max_start_heap)\n    heapq.heapify(min_end_heap)\n    result = [-1] * n\n    for _ in range(n):\n        top_end, top_idx = heapq.heappop(min_end_heap)\n        if -max_start_heap[0][0] < top_end:\n            continue\n        temp = []\n        while max_start_heap and -max_start_heap[0][0] >= top_end:\n            temp.append(heapq.heappop(max_start_heap))\n        result[top_idx] = temp[-1][1] if temp else -1\n        for item in temp[:-1]:\n            heapq.heappush(max_start_heap, item)\n        if temp:\n            heapq.heappush(max_start_heap, temp[-1])\n    return result",
    "complexity": "O(n log n) time, O(n) space",
    "keyLesson": "Dual priority queues pair consumers (intervals waiting for a next start) with producers (start points).",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[[2,3], [3,4], [5,6]]",
        "expected": "[1, 2, -1]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[[2,3], [3,4], [5,6]] (Case 2)",
        "expected": "[1, 2, -1]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0], [3,4], [5,6]]",
        "expected": "[-1, -1]"
      }
    ]
  },
  {
    "id": "9.5",
    "patternId": 9,
    "patternName": "Two Heaps",
    "title": "Task Scheduler",
    "difficulty": "Medium",
    "description": "Given tasks and cooldown n between identical tasks, find the minimum CPU intervals to finish all tasks.\n\nExample:\nInput: tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2\nOutput: 8",
    "approach": "Max-heap of task frequencies combined with a cooldown queue tracking (ready_time, remaining_count).",
    "starterCode": "import heapq\nfrom collections import Counter, deque\ndef least_interval(tasks, n):\n    # TODO: Calculate min intervals to finish tasks\n    pass",
    "solution": "import heapq\nfrom collections import Counter, deque\ndef least_interval(tasks, n):\n    counts = Counter(tasks)\n    max_heap = [-c for c in counts.values()]\n    heapq.heapify(max_heap)\n    time = 0\n    cooldown = deque()\n    while max_heap or cooldown:\n        time += 1\n        if max_heap:\n            count = heapq.heappop(max_heap) + 1\n            if count < 0:\n                cooldown.append((time + n, count))\n        if cooldown and cooldown[0][0] == time:\n            heapq.heappush(max_heap, cooldown.popleft()[1])\n    return time",
    "complexity": "O(m log 26) time, O(1) space",
    "keyLesson": "Two structures in harmony: a heap for greedy execution plus a FIFO queue for time-based cooldowns.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
        "expected": "8"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2 (Case 2)",
        "expected": "8"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "9.6",
    "patternId": 9,
    "patternName": "Two Heaps",
    "title": "Meeting Rooms II (Heap-based)",
    "difficulty": "Medium",
    "description": "Find minimum meeting rooms needed using explicit two-heap start/end bookkeeping.\n\nExample:\nInput: [[0,30],[5,10],[15,20]]\nOutput: 2",
    "approach": "Sort start and end points separately into arrays, simulate time sweeps.",
    "starterCode": "def min_meeting_rooms_two_heap(intervals):\n    # TODO: Calculate meeting rooms\n    pass",
    "solution": "def min_meeting_rooms_two_heap(intervals):\n    start_heap = sorted(i[0] for i in intervals)\n    end_heap = sorted(i[1] for i in intervals)\n    rooms = available = 0\n    e = 0\n    for s in start_heap:\n        while e < len(end_heap) and end_heap[e] <= s:\n            available += 1\n            e += 1\n        if available > 0:\n            available -= 1\n        else:\n            rooms += 1\n    return rooms",
    "complexity": "O(n log n) time, O(n) space",
    "keyLesson": "Two sorted streams (starts vs ends) act as chronological event triggers.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[[0,30],[5,10],[15,20]]",
        "expected": "2"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[[0,30],[5,10],[15,20]] (Case 2)",
        "expected": "2"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "9.7",
    "patternId": 9,
    "patternName": "Two Heaps",
    "title": "Kth Largest Element in a Stream",
    "difficulty": "Easy",
    "description": "Design a class to find the kth largest element in a stream repeatedly.\n\nExample:\nk = 3, nums = [4, 5, 8, 2]; add(3) -> 4; add(5) -> 5",
    "approach": "Maintain a min-heap of size k. The root of the min-heap is always the kth largest element.",
    "starterCode": "import heapq\nclass KthLargest:\n    # TODO: Maintain kth largest in min-heap\n    pass",
    "solution": "import heapq\nclass KthLargest:\n    def __init__(self, k, nums):\n        self.k = k\n        self.heap = nums\n        heapq.heapify(self.heap)\n        while len(self.heap) > k:\n            heapq.heappop(self.heap)\n    def add(self, val):\n        heapq.heappush(self.heap, val)\n        if len(self.heap) > self.k:\n            heapq.heappop(self.heap)\n        return self.heap[0]",
    "complexity": "O(log k) per insertion, O(k) space",
    "keyLesson": "A min-heap of size k acts as a VIP room: smallest candidate is evicted whenever size exceeds k.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "Standard sample for Kth Largest Element in a Stream",
        "expected": "Valid output"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "Secondary sample for Kth Largest Element in a Stream",
        "expected": "Valid output"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Edge boundary for Kth Largest Element in a Stream",
        "expected": "Default result"
      }
    ]
  },
  {
    "id": "9.8",
    "patternId": 9,
    "patternName": "Two Heaps",
    "title": "Rearrange String K Distance Apart",
    "difficulty": "Hard",
    "description": "Rearrange a string so that identical characters are at least k distance apart. If impossible, return empty string.\n\nExample:\nInput: s = \"aabbcc\", k = 3\nOutput: \"abcabc\"",
    "approach": "Greedy max-heap by frequency paired with a queue of size k - 1 enforcing the spacing constraint.",
    "starterCode": "import heapq\nfrom collections import Counter, deque\ndef rearrange_k_distance(s, k):\n    # TODO: Rearrange string k distance apart\n    pass",
    "solution": "import heapq\nfrom collections import Counter, deque\ndef rearrange_k_distance(s, k):\n    if k <= 1:\n        return s\n    counts = Counter(s)\n    max_heap = [(-freq, ch) for ch, freq in counts.items()]\n    heapq.heapify(max_heap)\n    result = []\n    queue = deque()\n    while max_heap:\n        freq, ch = heapq.heappop(max_heap)\n        result.append(ch)\n        queue.append((freq + 1, ch, len(result) + k - 1))\n        if queue and queue[0][2] == len(result):\n            f, c, _ = queue.popleft()\n            if -f > 0:\n                heapq.heappush(max_heap, (f, c))\n    return \"\".join(result) if len(result) == len(s) else \"\"",
    "complexity": "O(n log alphabet) time, O(alphabet) space",
    "keyLesson": "Cooldown queues preserve temporal spacing while heaps greedily exhaust high-frequency characters.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "s = \"aabbcc\", k = 3",
        "expected": "\"abcabc\""
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "s = \"aabbcc\", k = 3 (Case 2)",
        "expected": "\"abcabc\""
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "9.9",
    "patternId": 9,
    "patternName": "Two Heaps",
    "title": "Maximum Frequency Stack",
    "difficulty": "Hard",
    "description": "Design a stack-like data structure where pop removes the most frequent element. Ties broken by most recently pushed.\n\nExample:\npush(5), push(7), push(5), push(7), push(4), push(5); pop() -> 5, pop() -> 7",
    "approach": "Map of frequencies and map of `group[frequency] -> stack`. Maintain max_freq tracker.",
    "starterCode": "from collections import defaultdict\nclass FreqStack:\n    # TODO: Implement frequency stack\n    pass",
    "solution": "from collections import defaultdict\nclass FreqStack:\n    def __init__(self):\n        self.freq = defaultdict(int)\n        self.group = defaultdict(list)\n        self.max_freq = 0\n    def push(self, val):\n        f = self.freq[val] + 1\n        self.freq[val] = f\n        self.max_freq = max(self.max_freq, f)\n        self.group[f].append(val)\n    def pop(self):\n        val = self.group[self.max_freq].pop()\n        self.freq[val] -= 1\n        if not self.group[self.max_freq]:\n            self.max_freq -= 1\n        return val",
    "complexity": "O(1) time per push/pop, O(n) space",
    "keyLesson": "Grouping stacks by frequency levels achieves true O(1) multi-priority dispatching without a heap.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "Standard sample for Maximum Frequency Stack",
        "expected": "Valid output"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "Secondary sample for Maximum Frequency Stack",
        "expected": "Valid output"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Edge boundary for Maximum Frequency Stack",
        "expected": "Default result"
      }
    ]
  },
  {
    "id": "9.10",
    "patternId": 9,
    "patternName": "Two Heaps",
    "title": "Trapping Rain Water II",
    "difficulty": "Hard",
    "description": "Given an m x n integer matrix heightMap representing elevation, return volume of water it can trap after raining.\n\nExample:\nInput: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]\nOutput: 4",
    "approach": "Push outer boundary cells into min-heap. Pop lowest boundary cell and visit unvisited neighbors; trapped water is max(0, height - neighbor).",
    "starterCode": "import heapq\ndef trap_rain_water_2d(height_map):\n    # TODO: 2D trapped rain water\n    pass",
    "solution": "import heapq\ndef trap_rain_water_2d(height_map):\n    if not height_map or not height_map[0]:\n        return 0\n    m, n = len(height_map), len(height_map[0])\n    visited = [[False] * n for _ in range(m)]\n    heap = []\n    for i in range(m):\n        for j in range(n):\n            if i == 0 or i == m - 1 or j == 0 or j == n - 1:\n                heapq.heappush(heap, (height_map[i][j], i, j))\n                visited[i][j] = True\n    water = 0\n    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]\n    while heap:\n        height, x, y = heapq.heappop(heap)\n        for dx, dy in directions:\n            nx, ny = x + dx, y + dy\n            if 0 <= nx < m and 0 <= ny < n and not visited[nx][ny]:\n                visited[nx][ny] = True\n                water += max(0, height - height_map[nx][ny])\n                heapq.heappush(heap, (max(height, height_map[nx][ny]), nx, ny))\n    return water",
    "complexity": "O(mn log(mn)) time, O(mn) space",
    "keyLesson": "In 3D, water spills out of the lowest boundary opening, modeled by expanding inward from a boundary min-heap.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]] (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "10.1",
    "patternId": 10,
    "patternName": "Subsets / Backtracking",
    "title": "Subsets",
    "difficulty": "Medium",
    "description": "Given an integer array nums of unique elements, return all possible subsets (the power set).\n\nExample:\nInput: nums = [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
    "approach": "BFS / Cascading: start with [[]], and for each number, duplicate all existing subsets and append the current number.",
    "starterCode": "def subsets(nums):\n    # TODO: Generate all subsets\n    pass",
    "solution": "def subsets(nums):\n    result = [[]]\n    for num in nums:\n        result += [curr + [num] for curr in result]\n    return result",
    "complexity": "O(n * 2^n) time, O(n * 2^n) space",
    "keyLesson": "Each new element doubles the existing set collection: S_{k} = S_{k-1} + {s + num for s in S_{k-1}}.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1,2,3]",
        "expected": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 2, 3]",
        "expected": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums = [0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "10.2",
    "patternId": 10,
    "patternName": "Subsets / Backtracking",
    "title": "Subsets II (With Duplicates)",
    "difficulty": "Medium",
    "description": "Given an integer array nums that may contain duplicates, return all possible subsets without duplicate subsets.\n\nExample:\nInput: nums = [1,2,2]\nOutput: [[],[1],[1,2],[1,2,2],[2],[2,2]]",
    "approach": "Sort array. During backtracking loop, if `i > start and nums[i] == nums[i - 1]`, skip to avoid duplicate branches.",
    "starterCode": "def subsets_with_dup(nums):\n    # TODO: Subsets with duplicates handled\n    pass",
    "solution": "def subsets_with_dup(nums):\n    nums.sort()\n    result = []\n    def backtrack(start, path):\n        result.append(list(path))\n        for i in range(start, len(nums)):\n            if i > start and nums[i] == nums[i - 1]:\n                continue\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return result",
    "complexity": "O(n * 2^n) time, O(n * 2^n) space",
    "keyLesson": "Sorting plus `i > start and nums[i] == nums[i-1]` skips identical choices at the same recursion depth.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1,2,2]",
        "expected": "[[],[1],[1,2],[1,2,2],[2],[2,2]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 2, 2]",
        "expected": "[[],[1],[1,2],[1,2,2],[2],[2,2]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums = [0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "10.3",
    "patternId": 10,
    "patternName": "Subsets / Backtracking",
    "title": "Permutations",
    "difficulty": "Medium",
    "description": "Given an array nums of distinct integers, return all the possible permutations in any order.\n\nExample:\nInput: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
    "approach": "Backtracking with remaining items: loop over choices, add to path, recurse with slice excluding chosen item.",
    "starterCode": "def permute(nums):\n    # TODO: Generate all permutations\n    pass",
    "solution": "def permute(nums):\n    result = []\n    def backtrack(path, remaining):\n        if not remaining:\n            result.append(list(path))\n            return\n        for i in range(len(remaining)):\n            path.append(remaining[i])\n            backtrack(path, remaining[:i] + remaining[i + 1:])\n            path.pop()\n    backtrack([], nums)\n    return result",
    "complexity": "O(n * n!) time, O(n * n!) space",
    "keyLesson": "Permutations order matters, so each level chooses from all unpicked items rather than forward indices.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1,2,3]",
        "expected": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 2, 3]",
        "expected": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums = [0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "10.4",
    "patternId": 10,
    "patternName": "Subsets / Backtracking",
    "title": "Permutations II (With Duplicates)",
    "difficulty": "Medium",
    "description": "Given a collection of numbers nums that might contain duplicates, return all possible unique permutations.\n\nExample:\nInput: nums = [1,1,2]\nOutput: [[1,1,2],[1,2,1],[2,1,1]]",
    "approach": "Sort array. Use boolean `used` array. Skip duplicate when `nums[i] == nums[i-1] and not used[i-1]`.",
    "starterCode": "def permute_unique(nums):\n    # TODO: Permutations with duplicates\n    pass",
    "solution": "def permute_unique(nums):\n    nums.sort()\n    result = []\n    used = [False] * len(nums)\n    def backtrack(path):\n        if len(path) == len(nums):\n            result.append(list(path))\n            return\n        for i in range(len(nums)):\n            if used[i]:\n                continue\n            if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:\n                continue\n            used[i] = True\n            path.append(nums[i])\n            backtrack(path)\n            path.pop()\n            used[i] = False\n    backtrack([])\n    return result",
    "complexity": "O(n * n!) time, O(n * n!) space",
    "keyLesson": "The condition `not used[i-1]` enforces strict relative ordering among identical numbers.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1,1,2]",
        "expected": "[[1,1,2],[1,2,1],[2,1,1]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 1, 2]",
        "expected": "[[1,1,2],[1,2,1],[2,1,1]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums = [0]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "10.5",
    "patternId": 10,
    "patternName": "Subsets / Backtracking",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "description": "Given distinct integers candidates and target, return list of all unique combinations where chosen numbers sum to target (numbers reusable).\n\nExample:\nInput: candidates = [2,3,6,7], target = 7\nOutput: [[2,2,3],[7]]",
    "approach": "Backtrack passing index `i` (not i+1) to allow reuse. Prune when candidate exceeds remaining sum.",
    "starterCode": "def combination_sum(candidates, target):\n    # TODO: Combination sum with reuse\n    pass",
    "solution": "def combination_sum(candidates, target):\n    result = []\n    candidates.sort()\n    def backtrack(start, path, remaining):\n        if remaining == 0:\n            result.append(list(path))\n            return\n        for i in range(start, len(candidates)):\n            if candidates[i] > remaining:\n                break\n            path.append(candidates[i])\n            backtrack(i, path, remaining - candidates[i])\n            path.pop()\n    backtrack(0, [], target)\n    return result",
    "complexity": "Bounded by combinations count, exponential worst case",
    "keyLesson": "Passing `start = i` allows infinite element reuse while preventing duplicate permutations.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "candidates = [2,3,6,7], target = 7",
        "expected": "[[2,2,3],[7]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "candidates = [2,3,6,7], target = 7 (Case 2)",
        "expected": "[[2,2,3],[7]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "candidates = [0], target = 7",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "10.6",
    "patternId": 10,
    "patternName": "Subsets / Backtracking",
    "title": "Combination Sum II (No Reuse, With Duplicates)",
    "difficulty": "Medium",
    "description": "Given candidates that may contain duplicates and a target, find all unique combinations where each number is used at most once.\n\nExample:\nInput: candidates = [10,1,2,7,6,1,5], target = 8\nOutput: [[1,1,6],[1,2,5],[1,7],[2,6]]",
    "approach": "Sort array. Advance index with `i + 1`. Skip duplicates with `if i > start and candidates[i] == candidates[i-1]: continue`.",
    "starterCode": "def combination_sum2(candidates, target):\n    # TODO: Combination sum without reuse\n    pass",
    "solution": "def combination_sum2(candidates, target):\n    candidates.sort()\n    result = []\n    def backtrack(start, path, remaining):\n        if remaining == 0:\n            result.append(list(path))\n            return\n        for i in range(start, len(candidates)):\n            if i > start and candidates[i] == candidates[i - 1]:\n                continue\n            if candidates[i] > remaining:\n                break\n            path.append(candidates[i])\n            backtrack(i + 1, path, remaining - candidates[i])\n            path.pop()\n    backtrack(0, [], target)\n    return result",
    "complexity": "Exponential, pruned by sorting and skipping duplicates",
    "keyLesson": "Advance index to `i + 1` for single-use, while skipping duplicates at the same level.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "candidates = [10,1,2,7,6,1,5], target = 8",
        "expected": "[[1,1,6],[1,2,5],[1,7],[2,6]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "candidates = [10,1,2,7,6,1,5], target = 8 (Case 2)",
        "expected": "[[1,1,6],[1,2,5],[1,7],[2,6]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "candidates = [0], target = 8",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "10.7",
    "patternId": 10,
    "patternName": "Subsets / Backtracking",
    "title": "Letter Case Permutation",
    "difficulty": "Medium",
    "description": "Given a string s, transform every letter individually to lowercase or uppercase to create all possible strings.\n\nExample:\nInput: s = \"a1b2\"\nOutput: [\"a1b2\", \"a1B2\", \"A1b2\", \"A1B2\"]",
    "approach": "For letters, branch into lower and upper. For digits, simply append to existing paths.",
    "starterCode": "def letter_case_permutation(s):\n    # TODO: Permute letter cases\n    pass",
    "solution": "def letter_case_permutation(s):\n    result = [[]]\n    for ch in s:\n        if ch.isalpha():\n            result = [path + [c] for path in result for c in (ch.lower(), ch.upper())]\n        else:\n            for path in result:\n                path.append(ch)\n    return [\"\".join(path) for path in result]",
    "complexity": "O(n * 2^m) time where m is letter count",
    "keyLesson": "Binary branching at alphabetic positions creates a 2^m permutation set.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "s = \"a1b2\"",
        "expected": "[\"a1b2\", \"a1B2\", \"A1b2\", \"A1B2\"]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "s = \"a1b2\" (Case 2)",
        "expected": "[\"a1b2\", \"a1B2\", \"A1b2\", \"A1B2\"]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "s = \"a1b2\"",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "10.8",
    "patternId": 10,
    "patternName": "Subsets / Backtracking",
    "title": "Generate Parentheses",
    "difficulty": "Medium",
    "description": "Given n pairs of parentheses, generate all combinations of well-formed parentheses.\n\nExample:\nInput: n = 3\nOutput: [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
    "approach": "Backtracking with counts: add '(' if open_count < n; add ')' if close_count < open_count.",
    "starterCode": "def generate_parenthesis(n):\n    # TODO: Generate well-formed parentheses\n    pass",
    "solution": "def generate_parenthesis(n):\n    result = []\n    def backtrack(path, open_count, close_count):\n        if len(path) == 2 * n:\n            result.append(\"\".join(path))\n            return\n        if open_count < n:\n            path.append(\"(\")\n            backtrack(path, open_count + 1, close_count)\n            path.pop()\n        if close_count < open_count:\n            path.append(\")\")\n            backtrack(path, open_count, close_count + 1)\n            path.pop()\n    backtrack([], 0, 0)\n    return result",
    "complexity": "O(4^n / sqrt(n)) time (Catalan number bound)",
    "keyLesson": "Valid parentheses invariant: closing bracket count never exceeds opening bracket count.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "n = 3",
        "expected": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "n = 3 (Case 2)",
        "expected": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "n = 3",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "10.9",
    "patternId": 10,
    "patternName": "Subsets / Backtracking",
    "title": "Word Search",
    "difficulty": "Medium",
    "description": "Given an m x n board of characters and a word, return True if word exists in grid (adjacent cells, no reuse).\n\nExample:\nInput: board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"\nOutput: True",
    "approach": "DFS with in-place mutation: replace visited cell with '#', explore 4 directions, restore character on backtrack.",
    "starterCode": "def exist(board, word):\n    # TODO: Check if word exists in board\n    pass",
    "solution": "def exist(board, word):\n    rows, cols = len(board), len(board[0])\n    def backtrack(r, c, index):\n        if index == len(word):\n            return True\n        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[index]:\n            return False\n        temp, board[r][c] = board[r][c], \"#\"\n        found = (backtrack(r + 1, c, index + 1) or backtrack(r - 1, c, index + 1) or\n                 backtrack(r, c + 1, index + 1) or backtrack(r, c - 1, index + 1))\n        board[r][c] = temp\n        return found\n    for r in range(rows):\n        for c in range(cols):\n            if backtrack(r, c, 0):\n                return True\n    return False",
    "complexity": "O(m * n * 4^L) time where L is word length, O(L) space",
    "keyLesson": "In-place grid tagging `temp, board[r][c] = board[r][c], '#'` avoids visited set overhead.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\" (Case 2)",
        "expected": "True"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "board = [1],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
        "expected": "False"
      }
    ]
  },
  {
    "id": "10.10",
    "patternId": 10,
    "patternName": "Subsets / Backtracking",
    "title": "N-Queens",
    "difficulty": "Hard",
    "description": "Place n queens on an n x n board such that no two queens attack each other. Return all distinct board configurations.\n\nExample:\nInput: n = 4\nOutput: [[[col positions...]]]",
    "approach": "Place one queen per row. Track attacked columns, positive diagonals (row + col), and negative diagonals (row - col) with sets.",
    "starterCode": "def solve_n_queens(n):\n    # TODO: Solve n-queens\n    pass",
    "solution": "def solve_n_queens(n):\n    result = []\n    cols, diag1, diag2 = set(), set(), set()\n    board = []\n    def backtrack(row):\n        if row == n:\n            result.append(list(board))\n            return\n        for col in range(n):\n            if col in cols or (row - col) in diag1 or (row + col) in diag2:\n                continue\n            cols.add(col)\n            diag1.add(row - col)\n            diag2.add(row + col)\n            board.append(col)\n            backtrack(row + 1)\n            board.pop()\n            cols.remove(col)\n            diag1.remove(row - col)\n            diag2.remove(row + col)\n    backtrack(0)\n    return result",
    "complexity": "O(n!) worst case time, O(n^2) space",
    "keyLesson": "Diagonal mathematical invariant: cells on same diagonal share constant (row - col) or (row + col).",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "n = 4",
        "expected": "[[[col positions...]]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "n = 4 (Case 2)",
        "expected": "[[[col positions...]]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "n = 4",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "11.1",
    "patternId": 11,
    "patternName": "Modified Binary Search",
    "title": "Order-agnostic Binary Search",
    "difficulty": "Easy",
    "description": "Given a sorted array of numbers (sorted in either ascending or descending order), find if a given key is present.\n\nExample:\nInput: [4, 6, 10], key = 10 -> Output: 2\nInput: [10, 6, 4], key = 10 -> Output: 0",
    "approach": "Check if `arr[start] <= arr[end]` to detect ascending vs descending direction. Adjust pointers based on direction.",
    "starterCode": "def binary_search(arr, key):\n    # TODO: Order-agnostic binary search\n    pass",
    "solution": "def binary_search(arr, key):\n    start, end = 0, len(arr) - 1\n    ascending = arr[start] <= arr[end]\n    while start <= end:\n        mid = (start + end) // 2\n        if arr[mid] == key:\n            return mid\n        if ascending:\n            if key < arr[mid]:\n                end = mid - 1\n            else:\n                start = mid + 1\n        else:\n            if key > arr[mid]:\n                end = mid - 1\n            else:\n                start = mid + 1\n    return -1",
    "complexity": "O(log n) time, O(1) space",
    "keyLesson": "Compare ends once to adapt binary search to arbitrary monotonic directions.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[4, 6, 10], key = 10 -> Output: 2",
        "expected": "0"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[4, 6, 10], key = 10 -> Output: 2 (Case 2)",
        "expected": "0"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "11.2",
    "patternId": 11,
    "patternName": "Modified Binary Search",
    "title": "Ceiling of a Number",
    "difficulty": "Medium",
    "description": "Find the ceiling of a number in a sorted array (the smallest element >= key). Return index, or -1 if no ceiling.\n\nExample:\nInput: [4, 6, 10], key = 6 -> Output: 1\nInput: [1, 3, 8, 10, 15], key = 12 -> Output: 4 (element 15)",
    "approach": "Standard binary search: when while loop exits (`start > end`), `start` points to the smallest number > key.",
    "starterCode": "def search_ceiling_of_a_number(arr, key):\n    # TODO: Find index of ceiling of key\n    pass",
    "solution": "def search_ceiling_of_a_number(arr, key):\n    if key > arr[-1]:\n        return -1\n    start, end = 0, len(arr) - 1\n    while start <= end:\n        mid = (start + end) // 2\n        if key < arr[mid]:\n            end = mid - 1\n        elif key > arr[mid]:\n            start = mid + 1\n        else:\n            return mid\n    return start",
    "complexity": "O(log n) time, O(1) space",
    "keyLesson": "Binary search insertion point property: when key is absent, `start` is the ceiling and `end` is the floor.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[4, 6, 10], key = 6 -> Output: 1",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[4, 6, 10], key = 6 -> Output: 1 (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "11.3",
    "patternId": 11,
    "patternName": "Modified Binary Search",
    "title": "Next Letter",
    "difficulty": "Medium",
    "description": "Given a sorted circular list of letters and a key, find the smallest letter strictly greater than the key.\n\nExample:\nInput: letters = ['a', 'c', 'f', 'h'], key = 'f'\nOutput: 'h'",
    "approach": "Binary search with wrap-around modulo: `return letters[start % len(letters)]`.",
    "starterCode": "def next_letter(letters, key):\n    # TODO: Find next letter with wrap-around\n    pass",
    "solution": "def next_letter(letters, key):\n    start, end = 0, len(letters) - 1\n    while start <= end:\n        mid = (start + end) // 2\n        if key < letters[mid]:\n            end = mid - 1\n        else:\n            start = mid + 1\n    return letters[start % len(letters)]",
    "complexity": "O(log n) time, O(1) space",
    "keyLesson": "Modulo arithmetic on `start % n` resolves circular boundary lookups instantly.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "letters = ['a', 'c', 'f', 'h'], key = 'f'",
        "expected": "'h'"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "letters = ['a', 'c', 'f', 'h'], key = 'f' (Case 2)",
        "expected": "'h'"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "11.4",
    "patternId": 11,
    "patternName": "Modified Binary Search",
    "title": "Number Range (First and Last Position)",
    "difficulty": "Medium",
    "description": "Given a sorted array of integers nums, find the starting and ending position of a given target value.\n\nExample:\nInput: nums = [5,7,7,8,8,10], target = 8\nOutput: [3, 4]",
    "approach": "Two binary search passes: pass 1 searches left for first bound (`end = mid - 1`), pass 2 searches right for last bound (`start = mid + 1`).",
    "starterCode": "def find_range(arr, key):\n    # TODO: Find [first, last] index of key\n    pass",
    "solution": "def find_range(arr, key):\n    def find_bound(is_first):\n        start, end = 0, len(arr) - 1\n        result = -1\n        while start <= end:\n            mid = (start + end) // 2\n            if key < arr[mid]:\n                end = mid - 1\n            elif key > arr[mid]:\n                start = mid + 1\n            else:\n                result = mid\n                if is_first:\n                    end = mid - 1\n                else:\n                    start = mid + 1\n        return result\n    return [find_bound(True), find_bound(False)]",
    "complexity": "O(log n) time, O(1) space",
    "keyLesson": "Continuing to narrow the window after finding a match pinpoints the boundary extreme.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [5,7,7,8,8,10], target = 8",
        "expected": "[3, 4]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [5, 7, 7], target = 8",
        "expected": "[3, 4]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums = [0], target = 8",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "11.5",
    "patternId": 11,
    "patternName": "Modified Binary Search",
    "title": "Search in a Sorted Infinite Array",
    "difficulty": "Medium",
    "description": "Given an infinite sorted array (or ArrayReader of unknown size), find the index of a given key.\n\nExample:\nInput: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30...], key = 16\nOutput: 6",
    "approach": "Exponential backoff: double the window size (end *= 2) until `reader.get(end) >= key`, then standard binary search in `[start, end]`.",
    "starterCode": "def search_in_infinite_array(reader, key):\n    # TODO: Search in infinite sorted array\n    pass",
    "solution": "def search_in_infinite_array(reader, key):\n    start, end = 0, 1\n    while reader.get(end) is not None and reader.get(end) < key:\n        start = end\n        end *= 2\n    def binary_search_bounded(reader, key, start, end):\n        while start <= end:\n            mid = (start + end) // 2\n            val = reader.get(mid)\n            if val is None or val > key:\n                end = mid - 1\n            elif val < key:\n                start = mid + 1\n            else:\n                return mid\n        return -1\n    return binary_search_bounded(reader, key, start, end)",
    "complexity": "O(log n) time, O(1) space",
    "keyLesson": "Doubling step bounds the search range in O(log n) time without knowing total array size.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30...], key = 16",
        "expected": "6"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30...], key = 16 (Case 2)",
        "expected": "6"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "11.6",
    "patternId": 11,
    "patternName": "Modified Binary Search",
    "title": "Minimum Difference Element",
    "difficulty": "Medium",
    "description": "Given a sorted array of numbers, find the element in the array that has the minimum difference with a given key.\n\nExample:\nInput: [4, 6, 10], key = 7 -> Output: 6\nInput: [4, 6, 10], key = 4 -> Output: 4",
    "approach": "Binary search to locate key or its neighbors (`start` and `end`). Compare differences `arr[start] - key` vs `key - arr[end]`.",
    "starterCode": "def search_min_diff_element(arr, key):\n    # TODO: Find element with min difference\n    pass",
    "solution": "def search_min_diff_element(arr, key):\n    if key <= arr[0]:\n        return arr[0]\n    if key >= arr[-1]:\n        return arr[-1]\n    start, end = 0, len(arr) - 1\n    while start <= end:\n        mid = (start + end) // 2\n        if arr[mid] == key:\n            return arr[mid]\n        if arr[mid] < key:\n            start = mid + 1\n        else:\n            end = mid - 1\n    return arr[start] if arr[start] - key < key - arr[end] else arr[end]",
    "complexity": "O(log n) time, O(1) space",
    "keyLesson": "When an exact match is missing, the two closest candidates are precisely the floor and ceiling (`end` and `start`).",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[4, 6, 10], key = 7 -> Output: 6",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[4, 6, 10], key = 7 -> Output: 6 (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "11.7",
    "patternId": 11,
    "patternName": "Modified Binary Search",
    "title": "Search Bitonic Array",
    "difficulty": "Hard",
    "description": "Given a Bitonic array (monotonically increasing then monotonically decreasing), find a given key.\n\nExample:\nInput: [1, 3, 8, 12, 4, 2], key = 4\nOutput: 4",
    "approach": "Phase 1: Binary search for peak maximum. Phase 2: Binary search ascending half, then descending half.",
    "starterCode": "def search_bitonic_array(arr, key):\n    # TODO: Search in bitonic array\n    pass",
    "solution": "def search_bitonic_array(arr, key):\n    def find_max_index():\n        start, end = 0, len(arr) - 1\n        while start < end:\n            mid = (start + end) // 2\n            if arr[mid] > arr[mid + 1]:\n                end = mid\n            else:\n                start = mid + 1\n        return start\n    def binary_search(start, end, ascending):\n        while start <= end:\n            mid = (start + end) // 2\n            if arr[mid] == key:\n                return mid\n            if ascending:\n                if key < arr[mid]: end = mid - 1\n                else: start = mid + 1\n            else:\n                if key > arr[mid]: end = mid - 1\n                else: start = mid + 1\n        return -1\n    max_index = find_max_index()\n    result = binary_search(0, max_index, True)\n    if result != -1:\n        return result\n    return binary_search(max_index + 1, len(arr) - 1, False)",
    "complexity": "O(log n) time, O(1) space",
    "keyLesson": "Splitting a bitonic sequence at its peak reduces it to two standard monotonic binary searches.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[1, 3, 8, 12, 4, 2], key = 4",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[1, 3, 8, 12, 4, 2], key = 4 (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "11.8",
    "patternId": 11,
    "patternName": "Modified Binary Search",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "description": "Given a sorted array rotated at some pivot, find target index or -1.\n\nExample:\nInput: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4",
    "approach": "At least one half is always normally sorted. Check if target lies within the sorted half; otherwise search the other half.",
    "starterCode": "def search_rotated_array(arr, key):\n    # TODO: Search rotated sorted array\n    pass",
    "solution": "def search_rotated_array(arr, key):\n    start, end = 0, len(arr) - 1\n    while start <= end:\n        mid = (start + end) // 2\n        if arr[mid] == key:\n            return mid\n        if arr[start] <= arr[mid]:\n            if arr[start] <= key < arr[mid]:\n                end = mid - 1\n            else:\n                start = mid + 1\n        else:\n            if arr[mid] < key <= arr[end]:\n                start = mid + 1\n            else:\n                end = mid - 1\n    return -1",
    "complexity": "O(log n) time, O(1) space",
    "keyLesson": "Even with rotation, one partition `[start..mid]` or `[mid..end]` remains sorted, enabling deterministic range checks.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [4,5,6,7,0,1,2], target = 0",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [4, 5, 6], target = 0",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "11.9",
    "patternId": 11,
    "patternName": "Modified Binary Search",
    "title": "Find K Closest Elements",
    "difficulty": "Medium",
    "description": "Given a sorted integer array arr and numbers k and x, return the k closest integers to x in the array, sorted.\n\nExample:\nInput: arr = [1,2,3,4,5], k = 4, x = 3\nOutput: [1,2,3,4]",
    "approach": "Binary search for the start index of the k-length window: compare distance `x - arr[mid]` vs `arr[mid + k] - x`.",
    "starterCode": "def find_k_closest_elements(arr, k, x):\n    # TODO: Find k closest elements\n    pass",
    "solution": "def find_k_closest_elements(arr, k, x):\n    left, right = 0, len(arr) - k\n    while left < right:\n        mid = (left + right) // 2\n        if x - arr[mid] > arr[mid + k] - x:\n            left = mid + 1\n        else:\n            right = mid\n    return arr[left:left + k]",
    "complexity": "O(log(n - k)) time, O(k) space for output",
    "keyLesson": "Binary searching directly on window start positions avoids post-search expansion.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "arr = [1,2,3,4,5], k = 4, x = 3",
        "expected": "[1,2,3,4]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "arr = [1, 2, 3], k = 4, x = 3",
        "expected": "[1,2,3,4]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "arr = [0], k = 4, x = 3",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "11.10",
    "patternId": 11,
    "patternName": "Modified Binary Search",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "description": "Given two sorted arrays nums1 and nums2 of size m and n, return the median of the two sorted arrays in O(log (m+n)) time.\n\nExample:\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.0",
    "approach": "Binary search partition on the smaller array. Partition splits both arrays such that left halves contain (m + n + 1) // 2 elements and left_max <= right_min.",
    "starterCode": "def find_median_sorted_arrays(nums1, nums2):\n    # TODO: Find median in O(log(min(m, n)))\n    pass",
    "solution": "def find_median_sorted_arrays(nums1, nums2):\n    if len(nums1) > len(nums2):\n        nums1, nums2 = nums2, nums1\n    m, n = len(nums1), len(nums2)\n    low, high = 0, m\n    while low <= high:\n        partition1 = (low + high) // 2\n        partition2 = (m + n + 1) // 2 - partition1\n        left1 = nums1[partition1 - 1] if partition1 > 0 else float('-inf')\n        left2 = nums2[partition2 - 1] if partition2 > 0 else float('-inf')\n        right1 = nums1[partition1] if partition1 < m else float('inf')\n        right2 = nums2[partition2] if partition2 < n else float('inf')\n        if left1 <= right2 and left2 <= right1:\n            if (m + n) % 2 == 0:\n                return (max(left1, left2) + min(right1, right2)) / 2.0\n            return max(left1, left2)\n        elif left1 > right2:\n            high = partition1 - 1\n        else:\n            low = partition1 + 1",
    "complexity": "O(log(min(m, n))) time, O(1) space",
    "keyLesson": "Partitioning search space across two arrays reduces joint median finding to a single 1D binary search on the shorter list.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums1 = [1,3], nums2 = [2]",
        "expected": "2.0"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums1 = [1,3], nums2 = [2] (Case 2)",
        "expected": "2.0"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "12.1",
    "patternId": 12,
    "patternName": "Top K Elements (Heap)",
    "title": "Top K Numbers",
    "difficulty": "Easy",
    "description": "Given an unsorted array of numbers, find the K largest numbers in it.\n\nExample:\nInput: [3, 1, 5, 12, 2, 11], K = 3\nOutput: [5, 12, 11]",
    "approach": "Maintain a min-heap of size K. For each element, if larger than min_heap[0], replace root with element.",
    "starterCode": "import heapq\ndef find_k_largest_numbers(nums, k):\n    # TODO: Find k largest numbers\n    pass",
    "solution": "import heapq\ndef find_k_largest_numbers(nums, k):\n    min_heap = nums[:k]\n    heapq.heapify(min_heap)\n    for num in nums[k:]:\n        if num > min_heap[0]:\n            heapq.heapreplace(min_heap, num)\n    return min_heap",
    "complexity": "O(n log k) time, O(k) space",
    "keyLesson": "A min-heap maintains the K largest elements by constantly evicting the smallest contender.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[3, 1, 5, 12, 2, 11], K = 3",
        "expected": "[5, 12, 11]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[3, 1, 5, 12, 2, 11], K = 3 (Case 2)",
        "expected": "[5, 12, 11]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0], K = 3",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "12.2",
    "patternId": 12,
    "patternName": "Top K Elements (Heap)",
    "title": "Kth Smallest Number",
    "difficulty": "Easy",
    "description": "Given an unsorted array of numbers, find Kth smallest number in it.\n\nExample:\nInput: [1, 5, 12, 2, 11, 5], K = 3\nOutput: 5",
    "approach": "Maintain a max-heap of size K (using negated numbers in Python). Root holds the Kth smallest number.",
    "starterCode": "import heapq\ndef find_kth_smallest_number(nums, k):\n    # TODO: Find kth smallest number\n    pass",
    "solution": "import heapq\ndef find_kth_smallest_number(nums, k):\n    max_heap = [-n for n in nums[:k]]\n    heapq.heapify(max_heap)\n    for num in nums[k:]:\n        if -num > max_heap[0]:\n            heapq.heapreplace(max_heap, -num)\n    return -max_heap[0]",
    "complexity": "O(n log k) time, O(k) space",
    "keyLesson": "Dual inversion: use max-heap to track kth smallest, and min-heap to track kth largest.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[1, 5, 12, 2, 11, 5], K = 3",
        "expected": "5"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[1, 5, 12, 2, 11, 5], K = 3 (Case 2)",
        "expected": "5"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "12.3",
    "patternId": 12,
    "patternName": "Top K Elements (Heap)",
    "title": "K Closest Points to Origin",
    "difficulty": "Medium",
    "description": "Given an array of points where points[i] = [xi, yi], return the k closest points to origin (0, 0).\n\nExample:\nInput: points = [[1,3],[-2,2]], k = 1\nOutput: [[-2,2]]",
    "approach": "Max-heap of size K based on Euclidean distance. Evict furthest points whenever heap exceeds K.",
    "starterCode": "import heapq\ndef k_closest(points, k):\n    # TODO: Find k closest points to origin\n    pass",
    "solution": "import heapq\ndef k_closest(points, k):\n    max_heap = []\n    for x, y in points:\n        dist = -(x * x + y * y)\n        if len(max_heap) < k:\n            heapq.heappush(max_heap, (dist, x, y))\n        elif dist > max_heap[0][0]:\n            heapq.heapreplace(max_heap, (dist, x, y))\n    return [[x, y] for _, x, y in max_heap]",
    "complexity": "O(n log k) time, O(k) space",
    "keyLesson": "Distance squaring `x^2 + y^2` avoids expensive floating-point square root computations.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "points = [[1,3],[-2,2]], k = 1",
        "expected": "[[-2,2]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "points = [[1,3],[-2,2]], k = 1 (Case 2)",
        "expected": "[[-2,2]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "points = [0],[-2,2]], k = 1",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "12.4",
    "patternId": 12,
    "patternName": "Top K Elements (Heap)",
    "title": "Connect Ropes with Minimum Cost",
    "difficulty": "Easy",
    "description": "Connect N ropes of different lengths into one rope with minimum total cost, where cost to connect two ropes is their sum.\n\nExample:\nInput: [1, 3, 11, 5]\nOutput: 33 (1+3=4; 4+5=9; 9+11=20 -> total 33)",
    "approach": "Huffman coding greedy pattern: min-heapify ropes, repeatedly connect the two shortest ropes until one remains.",
    "starterCode": "import heapq\ndef minimum_cost_to_connect_ropes(rope_lengths):\n    # TODO: Connect ropes with min cost\n    pass",
    "solution": "import heapq\ndef minimum_cost_to_connect_ropes(rope_lengths):\n    heapq.heapify(rope_lengths)\n    total_cost = 0\n    while len(rope_lengths) > 1:\n        a = heapq.heappop(rope_lengths)\n        b = heapq.heappop(rope_lengths)\n        cost = a + b\n        total_cost += cost\n        heapq.heappush(rope_lengths, cost)\n    return total_cost",
    "complexity": "O(n log n) time, O(n) space",
    "keyLesson": "Greedily combining the smallest pairs minimizes their compound presence in later additions.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[1, 3, 11, 5]",
        "expected": "33"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[1, 3, 11, 5] (Case 2)",
        "expected": "33"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "12.5",
    "patternId": 12,
    "patternName": "Top K Elements (Heap)",
    "title": "Top K Frequent Numbers",
    "difficulty": "Medium",
    "description": "Given an integer array nums and an integer k, return the k most frequent elements in any order.\n\nExample:\nInput: nums = [1,1,1,2,2,3], k = 2\nOutput: [1,2]",
    "approach": "Count frequencies with Counter. Maintain a min-heap of size K keyed by frequency: `(count, num)`.",
    "starterCode": "import heapq\nfrom collections import Counter\ndef top_k_frequent(nums, k):\n    # TODO: Return k most frequent numbers\n    pass",
    "solution": "import heapq\nfrom collections import Counter\ndef top_k_frequent(nums, k):\n    freq = Counter(nums)\n    min_heap = []\n    for num, count in freq.items():\n        heapq.heappush(min_heap, (count, num))\n        if len(min_heap) > k:\n            heapq.heappop(min_heap)\n    return [num for count, num in min_heap]",
    "complexity": "O(n log k) time, O(n) space",
    "keyLesson": "Heap of size k preserves the k most frequent items by evicting low-frequency items.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1,1,1,2,2,3], k = 2",
        "expected": "[1,2]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 1, 1], k = 2",
        "expected": "[1,2]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums = [0], k = 2",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "12.6",
    "patternId": 12,
    "patternName": "Top K Elements (Heap)",
    "title": "Frequency Sort",
    "difficulty": "Medium",
    "description": "Sort characters of a string in decreasing order based on frequency of characters.\n\nExample:\nInput: \"tree\" -> Output: \"eert\" or \"eetr\"",
    "approach": "Count frequencies. Push `(-count, char)` into max-heap. Pop repeatedly and concatenate `char * count`.",
    "starterCode": "import heapq\nfrom collections import Counter\ndef frequency_sort(s):\n    # TODO: Sort characters by frequency\n    pass",
    "solution": "import heapq\nfrom collections import Counter\ndef frequency_sort(s):\n    freq = Counter(s)\n    max_heap = [(-count, ch) for ch, count in freq.items()]\n    heapq.heapify(max_heap)\n    result = []\n    while max_heap:\n        count, ch = heapq.heappop(max_heap)\n        result.append(ch * (-count))\n    return \"\".join(result)",
    "complexity": "O(n + d log d) time (d = unique chars), O(n) space",
    "keyLesson": "Heap extraction yields tokens in strictly descending frequency order.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "\"tree\" ->",
        "expected": "\"eert\" or \"eetr\""
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "\"tree\" -> (Case 2)",
        "expected": "\"eert\" or \"eetr\""
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "12.7",
    "patternId": 12,
    "patternName": "Top K Elements (Heap)",
    "title": "Kth Largest Number in a Stream",
    "difficulty": "Easy",
    "description": "Design a class to find the kth largest element in a stream repeatedly.\n\nExample:\nk = 3, nums = [4, 5, 8, 2]; add(3) -> 4",
    "approach": "Maintain a min-heap of size k. `heap[0]` is always the kth largest element.",
    "starterCode": "import heapq\nclass KthLargestStream:\n    # TODO: Implement KthLargestStream\n    pass",
    "solution": "import heapq\nclass KthLargestStream:\n    def __init__(self, k):\n        self.k = k\n        self.heap = []\n    def add(self, num):\n        heapq.heappush(self.heap, num)\n        if len(self.heap) > self.k:\n            heapq.heappop(self.heap)\n        return self.heap[0]",
    "complexity": "O(log k) per insertion, O(k) space",
    "keyLesson": "A bounded min-heap acts as an online filter for streaming percentiles.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "Standard sample for Kth Largest Number in a Stream",
        "expected": "Valid output"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "Secondary sample for Kth Largest Number in a Stream",
        "expected": "Valid output"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Edge boundary for Kth Largest Number in a Stream",
        "expected": "Default result"
      }
    ]
  },
  {
    "id": "12.8",
    "patternId": 12,
    "patternName": "Top K Elements (Heap)",
    "title": "K Closest Numbers (to a Given Value)",
    "difficulty": "Medium",
    "description": "Given a sorted array, find K closest numbers to a given value X using a heap.\n\nExample:\nInput: [5, 6, 7, 8, 9], K = 3, X = 7\nOutput: [6, 7, 8]",
    "approach": "Maintain a max-heap of size K based on absolute distance `(-abs(num - x), num)`.",
    "starterCode": "import heapq\ndef find_closest_elements(arr, k, x):\n    # TODO: Find k closest numbers\n    pass",
    "solution": "import heapq\ndef find_closest_elements(arr, k, x):\n    max_heap = []\n    for num in arr:\n        heapq.heappush(max_heap, (-abs(num - x), num))\n        if len(max_heap) > k:\n            heapq.heappop(max_heap)\n    return sorted(num for _, num in max_heap)",
    "complexity": "O(n log k) time, O(k) space",
    "keyLesson": "Max-heap retains the K smallest distances by ejecting the largest distances.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[5, 6, 7, 8, 9], K = 3, X = 7",
        "expected": "[6, 7, 8]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[5, 6, 7, 8, 9], K = 3, X = 7 (Case 2)",
        "expected": "[6, 7, 8]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0], K = 3, X = 7",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "12.9",
    "patternId": 12,
    "patternName": "Top K Elements (Heap)",
    "title": "Maximum Distinct Elements",
    "difficulty": "Medium",
    "description": "Given an array and K removals allowed, remove K elements to maximize the count of distinct numbers remaining.\n\nExample:\nInput: [7, 3, 5, 8, 5, 3, 3], K = 2\nOutput: 3",
    "approach": "Greedy: min-heap of frequencies > 1. Removing (count - 1) duplicates converts a repeated number into a distinct number.",
    "starterCode": "import heapq\nfrom collections import Counter\ndef maximum_distinct_elements(nums, k):\n    # TODO: Maximize distinct elements after k removals\n    pass",
    "solution": "import heapq\nfrom collections import Counter\ndef maximum_distinct_elements(nums, k):\n    freq = Counter(nums)\n    distinct_count = 0\n    min_heap = []\n    for num, count in freq.items():\n        if count == 1:\n            distinct_count += 1\n        else:\n            heapq.heappush(min_heap, (count, num))\n    while k > 0 and min_heap:\n        count, num = heapq.heappop(min_heap)\n        k -= count - 1\n        if k >= 0:\n            distinct_count += 1\n    if k > 0:\n        distinct_count -= k\n    return distinct_count",
    "complexity": "O(n log n) time, O(n) space",
    "keyLesson": "Pruning low-frequency duplicates first yields distinct numbers with the smallest subtraction cost.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[7, 3, 5, 8, 5, 3, 3], K = 2",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[7, 3, 5, 8, 5, 3, 3], K = 2 (Case 2)",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "12.10",
    "patternId": 12,
    "patternName": "Top K Elements (Heap)",
    "title": "Sum of Elements Between K1 and K2 Smallest",
    "difficulty": "Medium",
    "description": "Given an array, find the sum of all elements between the K1th and K2th smallest elements of the array.\n\nExample:\nInput: [1, 3, 12, 5, 15, 11], K1=3, K2=6\nOutput: 23 (Between 3rd smallest 5 and 6th smallest 15: 11+12=23)",
    "approach": "Min-heapify array. Pop k1 smallest elements, then sum next (k2 - k1 - 1) elements popped from heap.",
    "starterCode": "import heapq\ndef sum_between_k1_and_k2_smallest(nums, k1, k2):\n    # TODO: Sum elements between k1 and k2 smallest\n    pass",
    "solution": "import heapq\ndef sum_between_k1_and_k2_smallest(nums, k1, k2):\n    min_heap = list(nums)\n    heapq.heapify(min_heap)\n    for _ in range(k1):\n        heapq.heappop(min_heap)\n    total = 0\n    for _ in range(k2 - k1 - 1):\n        total += heapq.heappop(min_heap)\n    return total",
    "complexity": "O(n + k2 log n) time, O(n) space",
    "keyLesson": "Repeated heap popping extracts ordered range intervals directly.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[1, 3, 12, 5, 15, 11], K1=3, K2=6",
        "expected": "23"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[1, 3, 12, 5, 15, 11], K1=3, K2=6 (Case 2)",
        "expected": "23"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "13.1",
    "patternId": 13,
    "patternName": "K-way Merge",
    "title": "Merge K Sorted Lists",
    "difficulty": "Hard",
    "description": "Merge k sorted linked lists and return it as one sorted list.\n\nExample:\nInput: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
    "approach": "Seed min-heap with head of each list `(head.val, i, head)`. Pop smallest, connect to result, and push `node.next`.",
    "starterCode": "import heapq\ndef merge_k_sorted_lists(lists):\n    # TODO: Merge k sorted lists\n    pass",
    "solution": "import heapq\ndef merge_k_sorted_lists(lists):\n    min_heap = []\n    for i, head in enumerate(lists):\n        if head:\n            heapq.heappush(min_heap, (head.value, i, head))\n    dummy = ListNode(0)\n    curr = dummy\n    while min_heap:\n        val, i, node = heapq.heappop(min_heap)\n        curr.next = node\n        curr = curr.next\n        if node.next:\n            heapq.heappush(min_heap, (node.next.value, i, node.next))\n    return dummy.next",
    "complexity": "O(N log k) time (N total nodes, k lists), O(k) space",
    "keyLesson": "Min-heap of size k finds global minimum across k sorted sequences in O(log k) per element.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
        "expected": "[1,1,2,3,4,4,5,6]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "lists = [[1,4,5],[1,3,4],[2,6]] (Case 2)",
        "expected": "[1,1,2,3,4,4,5,6]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "lists = [0],[1,3,4],[2,6]]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "13.2",
    "patternId": 13,
    "patternName": "K-way Merge",
    "title": "Kth Smallest Number in M Sorted Lists",
    "difficulty": "Medium",
    "description": "Given M sorted lists, find the Kth smallest number among all lists.\n\nExample:\nInput: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4], K=5\nOutput: 4",
    "approach": "Min-heap storing `(val, list_idx, elem_idx)`. Pop k times, pushing next element from the same list each time.",
    "starterCode": "import heapq\ndef find_kth_smallest(lists, k):\n    # TODO: Find kth smallest in m lists\n    pass",
    "solution": "import heapq\ndef find_kth_smallest(lists, k):\n    min_heap = []\n    for i, lst in enumerate(lists):\n        if lst:\n            heapq.heappush(min_heap, (lst[0], i, 0))\n    count, result = 0, None\n    while min_heap:\n        result, list_idx, elem_idx = heapq.heappop(min_heap)\n        count += 1\n        if count == k:\n            return result\n        if elem_idx + 1 < len(lists[list_idx]):\n            heapq.heappush(min_heap, (lists[list_idx][elem_idx + 1], list_idx, elem_idx + 1))\n    return result",
    "complexity": "O(k log m) time, O(m) space",
    "keyLesson": "Only m candidates need to be tracked at any time, one per active sorted list.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4], K=5",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4], K=5 (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "13.3",
    "patternId": 13,
    "patternName": "K-way Merge",
    "title": "Kth Smallest Number in a Sorted Matrix",
    "difficulty": "Medium",
    "description": "Given an n x n matrix where each of the rows and columns is sorted in ascending order, find the kth smallest element.\n\nExample:\nInput: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8\nOutput: 13",
    "approach": "Treat matrix rows as sorted lists. Push first element of each row into min-heap. Pop and push `matrix[r][c+1]`.",
    "starterCode": "import heapq\ndef kth_smallest_in_matrix(matrix, k):\n    # TODO: Find kth smallest in sorted matrix\n    pass",
    "solution": "import heapq\ndef kth_smallest_in_matrix(matrix, k):\n    n = len(matrix)\n    min_heap = []\n    for r in range(min(k, n)):\n        heapq.heappush(min_heap, (matrix[r][0], r, 0))\n    number, count = -1, 0\n    while min_heap:\n        number, r, c = heapq.heappop(min_heap)\n        count += 1\n        if count == k:\n            break\n        if c + 1 < len(matrix[r]):\n            heapq.heappush(min_heap, (matrix[r][c + 1], r, c + 1))\n    return number",
    "complexity": "O(k log(min(k, n))) time, O(min(k, n)) space",
    "keyLesson": "Sorted rows naturally conform to the K-way merge paradigm.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8",
        "expected": "13"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8 (Case 2)",
        "expected": "13"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "13.4",
    "patternId": 13,
    "patternName": "K-way Merge",
    "title": "Smallest Number Range Covering K Lists",
    "difficulty": "Hard",
    "description": "Find smallest range [start, end] that includes at least one number from each of K sorted lists.\n\nExample:\nInput: [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]\nOutput: [20, 24]",
    "approach": "Min-heap holds 1 element from each list while tracking `current_max`. Range is `[min_heap[0], current_max]`. Advance minimum.",
    "starterCode": "import heapq\ndef smallest_range(lists):\n    # TODO: Find smallest range covering k lists\n    pass",
    "solution": "import heapq\ndef smallest_range(lists):\n    min_heap = []\n    current_max = float('-inf')\n    for i, lst in enumerate(lists):\n        heapq.heappush(min_heap, (lst[0], i, 0))\n        current_max = max(current_max, lst[0])\n    range_start, range_end = float('-inf'), float('inf')\n    while len(min_heap) == len(lists):\n        val, list_idx, elem_idx = heapq.heappop(min_heap)\n        if current_max - val < range_end - range_start:\n            range_start, range_end = val, current_max\n        if elem_idx + 1 < len(lists[list_idx]):\n            next_val = lists[list_idx][elem_idx + 1]\n            heapq.heappush(min_heap, (next_val, list_idx, elem_idx + 1))\n            current_max = max(current_max, next_val)\n    return [range_start, range_end]",
    "complexity": "O(N log k) time, O(k) space",
    "keyLesson": "Tracking current_max while popping min_val guarantees a window containing at least one item from all lists.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]",
        "expected": "[20, 24]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]] (Case 2)",
        "expected": "[20, 24]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0],[0,9,12,20],[5,18,22,30]]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "13.5",
    "patternId": 13,
    "patternName": "K-way Merge",
    "title": "K Pairs with Largest Sums",
    "difficulty": "Hard",
    "description": "Given two sorted arrays, find the K pairs with the largest sums.\n\nExample:\nInput: nums1 = [9, 8, 2], nums2 = [6, 3, 1], K = 3\nOutput: [[9, 6], [8, 6], [9, 3]]",
    "approach": "Min-heap of size K storing pair sums. If pair sum > min_heap[0], replace root. Break early if inner sum is too small.",
    "starterCode": "import heapq\ndef k_pairs_largest_sum(nums1, nums2, k):\n    # TODO: Find k pairs with largest sum\n    pass",
    "solution": "import heapq\ndef k_pairs_largest_sum(nums1, nums2, k):\n    min_heap = []\n    for i in range(min(k, len(nums1))):\n        for j in range(min(k, len(nums2))):\n            if len(min_heap) < k:\n                heapq.heappush(min_heap, (nums1[i] + nums2[j], nums1[i], nums2[j]))\n            elif nums1[i] + nums2[j] > min_heap[0][0]:\n                heapq.heapreplace(min_heap, (nums1[i] + nums2[j], nums1[i], nums2[j]))\n            else:\n                break\n    return [[a, b] for _, a, b in min_heap]",
    "complexity": "O(k^2 log k) time, O(k) space",
    "keyLesson": "Sorted input allows bounding inner loop search to at most min(k, len).",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums1 = [9, 8, 2], nums2 = [6, 3, 1], K = 3",
        "expected": "[[9, 6], [8, 6], [9, 3]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums1 = [9, 8, 2], nums2 = [6, 3, 1], K = 3 (Case 2)",
        "expected": "[[9, 6], [8, 6], [9, 3]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums1 = [0], nums2 = [6, 3, 1], K = 3",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "13.6",
    "patternId": 13,
    "patternName": "K-way Merge",
    "title": "Merge K Sorted Arrays",
    "difficulty": "Medium",
    "description": "Given K sorted arrays, merge them into a single sorted array.\n\nExample:\nInput: [[2, 6, 8], [3, 6, 7], [1, 3, 4]]\nOutput: [1, 2, 3, 3, 4, 6, 6, 7, 8]",
    "approach": "Min-heap storing `(arr[0], array_idx, elem_idx)`. Pop min, append to result, push next element from same array.",
    "starterCode": "import heapq\ndef merge_k_sorted_arrays(arrays):\n    # TODO: Merge k sorted arrays\n    pass",
    "solution": "import heapq\ndef merge_k_sorted_arrays(arrays):\n    min_heap = []\n    for i, arr in enumerate(arrays):\n        if arr:\n            heapq.heappush(min_heap, (arr[0], i, 0))\n    result = []\n    while min_heap:\n        val, arr_idx, elem_idx = heapq.heappop(min_heap)\n        result.append(val)\n        if elem_idx + 1 < len(arrays[arr_idx]):\n            heapq.heappush(min_heap, (arrays[arr_idx][elem_idx + 1], arr_idx, elem_idx + 1))\n    return result",
    "complexity": "O(N log k) time, O(k) space",
    "keyLesson": "Canonical K-way merge using array indices rather than pointer nodes.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[[2, 6, 8], [3, 6, 7], [1, 3, 4]]",
        "expected": "[1, 2, 3, 3, 4, 6, 6, 7, 8]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[[2, 6, 8], [3, 6, 7], [1, 3, 4]] (Case 2)",
        "expected": "[1, 2, 3, 3, 4, 6, 6, 7, 8]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0], [3, 6, 7], [1, 3, 4]]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "13.7",
    "patternId": 13,
    "patternName": "K-way Merge",
    "title": "Find K Pairs with Smallest Sums",
    "difficulty": "Medium",
    "description": "Given two sorted arrays nums1 and nums2, return the k pairs (u, v) with the smallest sums.\n\nExample:\nInput: nums1 = [1,7,11], nums2 = [2,4,6], k = 3\nOutput: [[1,2],[1,4],[1,6]]",
    "approach": "Min-heap initialized with `(nums1[i] + nums2[0], i, 0)` for i in range(k). When popping `(i, j)`, push `(nums1[i] + nums2[j + 1], i, j + 1)`.",
    "starterCode": "import heapq\ndef k_smallest_pairs(nums1, nums2, k):\n    # TODO: Find k pairs with smallest sums\n    pass",
    "solution": "import heapq\ndef k_smallest_pairs(nums1, nums2, k):\n    if not nums1 or not nums2:\n        return []\n    min_heap = [(nums1[i] + nums2[0], i, 0) for i in range(min(k, len(nums1)))]\n    heapq.heapify(min_heap)\n    result = []\n    while min_heap and len(result) < k:\n        total, i, j = heapq.heappop(min_heap)\n        result.append([nums1[i], nums2[j]])\n        if j + 1 < len(nums2):\n            heapq.heappush(min_heap, (nums1[i] + nums2[j + 1], i, j + 1))\n    return result",
    "complexity": "O(k log k) time, O(k) space",
    "keyLesson": "Seed min-heap with (i, 0), and expand solely along the j dimension as items are popped.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums1 = [1,7,11], nums2 = [2,4,6], k = 3",
        "expected": "[[1,2],[1,4],[1,6]]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums1 = [1,7,11], nums2 = [2,4,6], k = 3 (Case 2)",
        "expected": "[[1,2],[1,4],[1,6]]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums1 = [0], nums2 = [2,4,6], k = 3",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "13.8",
    "patternId": 13,
    "patternName": "K-way Merge",
    "title": "Kth Smallest Element in a BST",
    "difficulty": "Medium",
    "description": "Given the root of a binary search tree and an integer k, return the kth smallest value in the tree.\n\nExample:\nInput: root = [3,1,4,null,2], k = 1\nOutput: 1",
    "approach": "In-order traversal is inherently a sorted sequence. Use iterative stack-based in-order traversal and stop at count == k.",
    "starterCode": "def kth_smallest_in_bst(root, k):\n    # TODO: Find kth smallest in BST\n    pass",
    "solution": "def kth_smallest_in_bst(root, k):\n    stack = []\n    node = root\n    count = 0\n    while stack or node:\n        while node:\n            stack.append(node)\n            node = node.left\n        node = stack.pop()\n        count += 1\n        if count == k:\n            return node.val\n        node = node.right\n    return -1",
    "complexity": "O(h + k) time, O(h) space",
    "keyLesson": "BST in-order traversal yields elements in ascending order without requiring an explicit heap.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "root = [3,1,4,null,2], k = 1",
        "expected": "1"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "root = [3,1,4,null,2], k = 1 (Case 2)",
        "expected": "1"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "13.9",
    "patternId": 13,
    "patternName": "K-way Merge",
    "title": "Median of K Sorted Arrays",
    "difficulty": "Hard",
    "description": "Given K sorted arrays, find the median of all elements combined without fully materializing all elements.\n\nExample:\nInput: [[1, 3, 5], [2, 4, 6]]\nOutput: 3.5",
    "approach": "Merge using a min-heap up to the midpoint (total // 2), then return middle element or average of two middle elements.",
    "starterCode": "import heapq\ndef median_of_k_sorted_arrays(arrays):\n    # TODO: Find median of k sorted arrays\n    pass",
    "solution": "import heapq\ndef median_of_k_sorted_arrays(arrays):\n    total = sum(len(a) for a in arrays)\n    min_heap = []\n    for i, arr in enumerate(arrays):\n        if arr:\n            heapq.heappush(min_heap, (arr[0], i, 0))\n    merged = []\n    while min_heap and len(merged) <= total // 2:\n        val, arr_idx, elem_idx = heapq.heappop(min_heap)\n        merged.append(val)\n        if elem_idx + 1 < len(arrays[arr_idx]):\n            heapq.heappush(min_heap, (arrays[arr_idx][elem_idx + 1], arr_idx, elem_idx + 1))\n    if total % 2 == 1:\n        return merged[total // 2] * 1.0\n    return (merged[total // 2 - 1] + merged[total // 2]) / 2.0",
    "complexity": "O(total/2 * log k) time, O(k) space",
    "keyLesson": "Halting the merge at the median index halves runtime and minimizes memory footprint.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[[1, 3, 5], [2, 4, 6]]",
        "expected": "3.5"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[[1, 3, 5], [2, 4, 6]] (Case 2)",
        "expected": "3.5"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "13.10",
    "patternId": 13,
    "patternName": "K-way Merge",
    "title": "Find Common Elements in K Sorted Arrays",
    "difficulty": "Medium",
    "description": "Given K sorted arrays, find all numbers that appear in every single one of the K arrays.\n\nExample:\nInput: [[1,2,3,4],[2,4,6],[1,2,4,5]]\nOutput: [2, 4]",
    "approach": "Min-heap K-way merge: count consecutive occurrences of the minimum value. If count == k, the value is in all arrays.",
    "starterCode": "import heapq\nfrom collections import defaultdict\ndef common_elements_k_arrays(arrays):\n    # TODO: Find common elements across k arrays\n    pass",
    "solution": "import heapq\nfrom collections import defaultdict\ndef common_elements_k_arrays(arrays):\n    min_heap = []\n    for i, arr in enumerate(arrays):\n        if arr:\n            heapq.heappush(min_heap, (arr[0], i, 0))\n    counts = defaultdict(int)\n    result = []\n    k = len(arrays)\n    while min_heap:\n        val, arr_idx, elem_idx = heapq.heappop(min_heap)\n        counts[val] += 1\n        if counts[val] == k:\n            result.append(val)\n        if elem_idx + 1 < len(arrays[arr_idx]):\n            heapq.heappush(min_heap, (arrays[arr_idx][elem_idx + 1], arr_idx, elem_idx + 1))\n    return result",
    "complexity": "O(N log k) time, O(N) space",
    "keyLesson": "Co-occurring elements appear consecutively in the K-way merge stream.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "[[1,2,3,4],[2,4,6],[1,2,4,5]]",
        "expected": "[2, 4]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "[[1,2,3,4],[2,4,6],[1,2,4,5]] (Case 2)",
        "expected": "[2, 4]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "[0],[2,4,6],[1,2,4,5]]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "14.1",
    "patternId": 14,
    "patternName": "Dynamic Programming (Knapsack Family)",
    "title": "0/1 Knapsack",
    "difficulty": "Medium",
    "description": "Given weights and profits of N items, find a subset that gives maximum profit without exceeding capacity C (each item used at most once).\n\nExample:\nprofits = [1, 6, 10, 16], weights = [1, 2, 3, 5], capacity = 7\nOutput: 22 (weights 2+5 with profits 6+16)",
    "approach": "2D DP state dp[i][c]: max profit using first i items with capacity c. Either skip item i or include it: max(dp[i-1][c], profits[i-1] + dp[i-1][c - weights[i-1]]).",
    "starterCode": "def knapsack(profits, weights, capacity):\n    # TODO: 0/1 Knapsack\n    pass",
    "solution": "def knapsack(profits, weights, capacity):\n    n = len(profits)\n    dp = [[0] * (capacity + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for c in range(capacity + 1):\n            dp[i][c] = dp[i - 1][c]\n            if weights[i - 1] <= c:\n                dp[i][c] = max(dp[i][c], profits[i - 1] + dp[i - 1][c - weights[i - 1]])\n    return dp[n][capacity]",
    "complexity": "O(n * capacity) time, O(n * capacity) space",
    "keyLesson": "State transition: choose between excluding item (dp[i-1][c]) vs including item (profits[i-1] + dp[i-1][c - weight]).",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "Standard sample for 0/1 Knapsack",
        "expected": "Valid output"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "Secondary sample for 0/1 Knapsack",
        "expected": "Valid output"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Edge boundary for 0/1 Knapsack",
        "expected": "Default result"
      }
    ]
  },
  {
    "id": "14.2",
    "patternId": 14,
    "patternName": "Dynamic Programming (Knapsack Family)",
    "title": "Equal Subset Sum Partition",
    "difficulty": "Medium",
    "description": "Determine if an array of positive integers can be partitioned into two subsets such that the sum of elements in both subsets is equal.\n\nExample:\nInput: nums = [1, 5, 11, 5]\nOutput: True (Subsets: [1, 5, 5] and [11])",
    "approach": "If sum(nums) is odd, return False. Target is sum // 2. 1D boolean knapsack: dp[c] = dp[c] or dp[c - num] iterating backwards.",
    "starterCode": "def can_partition(nums):\n    # TODO: Equal subset sum partition\n    pass",
    "solution": "def can_partition(nums):\n    total = sum(nums)\n    if total % 2 != 0:\n        return False\n    target = total // 2\n    dp = [False] * (target + 1)\n    dp[0] = True\n    for num in nums:\n        for c in range(target, num - 1, -1):\n            dp[c] = dp[c] or dp[c - num]\n    return dp[target]",
    "complexity": "O(n * target) time, O(target) space",
    "keyLesson": "Iterating capacity backwards from target down to num prevents using the same item multiple times in 1D DP.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1, 5, 11, 5]",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 5, 11]",
        "expected": "True"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums = [1]",
        "expected": "False"
      }
    ]
  },
  {
    "id": "14.3",
    "patternId": 14,
    "patternName": "Dynamic Programming (Knapsack Family)",
    "title": "Subset Sum",
    "difficulty": "Medium",
    "description": "Given a set of positive numbers and a target sum, determine if there is a subset whose sum equals target.\n\nExample:\nInput: nums = [1, 2, 3, 7], target = 6\nOutput: True (1 + 2 + 3 = 6)",
    "approach": "1D boolean DP array initialized with `dp[0] = True`. For each num, `dp[c] = dp[c] or dp[c - num]`.",
    "starterCode": "def can_partition_target(nums, target):\n    # TODO: Subset sum\n    pass",
    "solution": "def can_partition_target(nums, target):\n    dp = [False] * (target + 1)\n    dp[0] = True\n    for num in nums:\n        for c in range(target, num - 1, -1):\n            dp[c] = dp[c] or dp[c - num]\n    return dp[target]",
    "complexity": "O(n * target) time, O(target) space",
    "keyLesson": "Boolean OR accumulation marks all reachable partial sums.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1, 2, 3, 7], target = 6",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 2, 3], target = 6",
        "expected": "True"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "nums = [1], target = 6",
        "expected": "False"
      }
    ]
  },
  {
    "id": "14.4",
    "patternId": 14,
    "patternName": "Dynamic Programming (Knapsack Family)",
    "title": "Minimum Subset Sum Difference",
    "difficulty": "Hard",
    "description": "Partition an array into two subsets S1 and S2 such that the difference |sum(S1) - sum(S2)| is minimized. Return the minimum difference.\n\nExample:\nInput: nums = [1, 2, 3, 9]\nOutput: 3 (Subsets [1, 2, 3] and [9], diff |6 - 9| = 3)",
    "approach": "Compute subset sum DP up to total // 2. Find closest reachable sum `s1 <= total // 2`. Minimum difference is `total - 2 * s1`.",
    "starterCode": "def can_partition_min_diff(nums):\n    # TODO: Min subset sum difference\n    pass",
    "solution": "def can_partition_min_diff(nums):\n    total = sum(nums)\n    target = total // 2\n    dp = [False] * (target + 1)\n    dp[0] = True\n    for num in nums:\n        for c in range(target, num - 1, -1):\n            dp[c] = dp[c] or dp[c - num]\n    closest = max(c for c in range(target, -1, -1) if dp[c])\n    return total - 2 * closest",
    "complexity": "O(n * total) time, O(total) space",
    "keyLesson": "Minimizing |s1 - s2| is equivalent to maximizing s1 <= total // 2.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1, 2, 3, 9]",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 2, 3]",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "14.5",
    "patternId": 14,
    "patternName": "Dynamic Programming (Knapsack Family)",
    "title": "Count of Subset Sum",
    "difficulty": "Medium",
    "description": "Given a set of numbers and a target sum, count total subsets that sum to target.\n\nExample:\nInput: nums = [1, 1, 2, 3], target = 4\nOutput: 3 (Subsets: [1, 1, 2], [1, 3], [1, 3])",
    "approach": "DP where `dp[c]` represents count of subsets summing to c. Transition: `dp[c] += dp[c - num]`.",
    "starterCode": "def count_subsets(nums, target):\n    # TODO: Count subsets summing to target\n    pass",
    "solution": "def count_subsets(nums, target):\n    dp = [0] * (target + 1)\n    dp[0] = 1\n    for num in nums:\n        for c in range(target, num - 1, -1):\n            dp[c] += dp[c - num]\n    return dp[target]",
    "complexity": "O(n * target) time, O(target) space",
    "keyLesson": "Replacing boolean OR with integer addition counts distinct combination paths.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1, 1, 2, 3], target = 4",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 1, 2], target = 4",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "14.6",
    "patternId": 14,
    "patternName": "Dynamic Programming (Knapsack Family)",
    "title": "Target Sum",
    "difficulty": "Medium",
    "description": "Assign '+' or '-' to each number so expression equals target. Return number of ways.\n\nExample:\nInput: nums = [1, 1, 1, 1, 1], target = 3\nOutput: 5",
    "approach": "Algebraic reduction: P - N = target and P + N = total -> 2P = total + target -> P = (total + target) // 2. Reduces to Count of Subset Sum.",
    "starterCode": "def find_target_sum_ways(nums, target):\n    # TODO: Target sum ways\n    pass",
    "solution": "def find_target_sum_ways(nums, target):\n    total = sum(nums)\n    if (total + target) % 2 != 0 or total < abs(target):\n        return 0\n    subset_target = (total + target) // 2\n    dp = [0] * (subset_target + 1)\n    dp[0] = 1\n    for num in nums:\n        for c in range(subset_target, num - 1, -1):\n            dp[c] += dp[c - num]\n    return dp[subset_target]",
    "complexity": "O(n * total) time, O(total) space",
    "keyLesson": "Math transformation converts two-choice (+/-) problems into standard subset sum.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "nums = [1, 1, 1, 1, 1], target = 3",
        "expected": "5"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "nums = [1, 1, 1], target = 3",
        "expected": "5"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "14.7",
    "patternId": 14,
    "patternName": "Dynamic Programming (Knapsack Family)",
    "title": "Unbounded Knapsack (Rod Cutting)",
    "difficulty": "Medium",
    "description": "Given weights and profits of N items, find maximum profit with capacity C where each item can be chosen unlimited times.\n\nExample:\nprofits = [15, 20, 50], weights = [1, 2, 3], capacity = 5\nOutput: 80",
    "approach": "Unbounded knapsack: iterate capacity forwards `for c in range(capacity + 1)` so that current item can be reused.",
    "starterCode": "def unbounded_knapsack(profits, weights, capacity):\n    # TODO: Unbounded knapsack\n    pass",
    "solution": "def unbounded_knapsack(profits, weights, capacity):\n    n = len(profits)\n    dp = [0] * (capacity + 1)\n    for c in range(capacity + 1):\n        for i in range(n):\n            if weights[i] <= c:\n                dp[c] = max(dp[c], profits[i] + dp[c - weights[i]])\n    return dp[capacity]",
    "complexity": "O(n * capacity) time, O(capacity) space",
    "keyLesson": "Forward capacity iteration allows unlimited reuse of each item.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "Standard sample for Unbounded Knapsack (Rod Cutting)",
        "expected": "Valid output"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "Secondary sample for Unbounded Knapsack (Rod Cutting)",
        "expected": "Valid output"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Edge boundary for Unbounded Knapsack (Rod Cutting)",
        "expected": "Default result"
      }
    ]
  },
  {
    "id": "14.8",
    "patternId": 14,
    "patternName": "Dynamic Programming (Knapsack Family)",
    "title": "Coin Change (Minimum Coins)",
    "difficulty": "Medium",
    "description": "Given coin denominations and amount, return fewest coins needed to make up amount. Return -1 if impossible.\n\nExample:\nInput: coins = [1,2,5], amount = 11\nOutput: 3 (5 + 5 + 1)",
    "approach": "DP array initialized to infinity with `dp[0] = 0`. For each c from 1..amount: `dp[c] = min(dp[c], dp[c - coin] + 1)`.",
    "starterCode": "def coin_change(coins, amount):\n    # TODO: Min coins for amount\n    pass",
    "solution": "def coin_change(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for c in range(1, amount + 1):\n        for coin in coins:\n            if coin <= c:\n                dp[c] = min(dp[c], dp[c - coin] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1",
    "complexity": "O(amount * len(coins)) time, O(amount) space",
    "keyLesson": "Unbounded knapsack minimizing item count: initialize with infinity, base case dp[0] = 0.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "coins = [1,2,5], amount = 11",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "coins = [1,2,5], amount = 11 (Case 2)",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "14.9",
    "patternId": 14,
    "patternName": "Dynamic Programming (Knapsack Family)",
    "title": "Coin Change II (Count Combinations)",
    "difficulty": "Medium",
    "description": "Given coins and amount, return number of combinations that make up that amount (infinite supply of each coin).\n\nExample:\nInput: amount = 5, coins = [1,2,5]\nOutput: 4 (5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1)",
    "approach": "Outer loop over coins, inner loop forwards over amount: `dp[c] += dp[c - coin]`.",
    "starterCode": "def change(amount, coins):\n    # TODO: Count coin combinations\n    pass",
    "solution": "def change(amount, coins):\n    dp = [0] * (amount + 1)\n    dp[0] = 1\n    for coin in coins:\n        for c in range(coin, amount + 1):\n            dp[c] += dp[c - coin]\n    return dp[amount]",
    "complexity": "O(amount * len(coins)) time, O(amount) space",
    "keyLesson": "Looping over coins first generates unique combinations (not permutations).",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "amount = 5, coins = [1,2,5]",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "amount = 5, coins = [1,2,5] (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "14.10",
    "patternId": 14,
    "patternName": "Dynamic Programming (Knapsack Family)",
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "description": "Given two strings text1 and text2, return the length of their longest common subsequence.\n\nExample:\nInput: text1 = \"abcde\", text2 = \"ace\"\nOutput: 3 (\"ace\")",
    "approach": "2D DP: if characters match: `1 + dp[i-1][j-1]`. Otherwise: `max(dp[i-1][j], dp[i][j-1])`.",
    "starterCode": "def longest_common_subsequence(text1, text2):\n    # TODO: Longest common subsequence\n    pass",
    "solution": "def longest_common_subsequence(text1, text2):\n    m, n = len(text1), len(text2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if text1[i - 1] == text2[j - 1]:\n                dp[i][j] = 1 + dp[i - 1][j - 1]\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    return dp[m][n]",
    "complexity": "O(m * n) time, O(m * n) space",
    "keyLesson": "Subsequence matching branches on character equality vs maximum alignment drop.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "text1 = \"abcde\", text2 = \"ace\"",
        "expected": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "text1 = \"abcde\", text2 = \"ace\" (Case 2)",
        "expected": "3"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "15.1",
    "patternId": 15,
    "patternName": "Graphs (BFS / DFS / Union-Find / Topological Sort)",
    "title": "Number of Islands",
    "difficulty": "Medium",
    "description": "Given an m x n 2D binary grid representing a map of '1's (land) and '0's (water), return the number of islands.\n\nExample:\nInput: grid = [[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]\nOutput: 2",
    "approach": "Traverse grid. Whenever '1' is encountered, increment island count and run DFS/BFS sink routine turning all connected '1's to '0's.",
    "starterCode": "def num_islands(grid):\n    # TODO: Count islands\n    pass",
    "solution": "def num_islands(grid):\n    if not grid:\n        return 0\n    rows, cols = len(grid), len(grid[0])\n    def dfs(r, c):\n        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != \"1\":\n            return\n        grid[r][c] = \"0\"\n        dfs(r + 1, c)\n        dfs(r - 1, c)\n        dfs(r, c + 1)\n        dfs(r, c - 1)\n    count = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == \"1\":\n                count += 1\n                dfs(r, c)\n    return count",
    "complexity": "O(m * n) time, O(m * n) worst-case recursion space",
    "keyLesson": "Sinking visited land cells in-place `grid[r][c] = '0'` avoids visited set memory overhead.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "grid = [[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]",
        "expected": "2"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "grid = [[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]] (Case 2)",
        "expected": "2"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "15.2",
    "patternId": 15,
    "patternName": "Graphs (BFS / DFS / Union-Find / Topological Sort)",
    "title": "Clone Graph",
    "difficulty": "Medium",
    "description": "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.\n\nExample:\nInput: adjList = [[2,4],[1,3],[2,4],[1,3]]\nOutput: Cloned graph",
    "approach": "Hash map `visited[original_node] = clone_node`. DFS traverses neighbors: if not visited, clone and recurse.",
    "starterCode": "def clone_graph(node):\n    # TODO: Deep copy graph\n    pass",
    "solution": "class Node:\n    def __init__(self, val=0, neighbors=None):\n        self.val = val\n        self.neighbors = neighbors or []\n\ndef clone_graph(node):\n    if not node:\n        return None\n    visited = {}\n    def dfs(n):\n        if n in visited:\n            return visited[n]\n        copy = Node(n.val)\n        visited[n] = copy\n        for neighbor in n.neighbors:\n            copy.neighbors.append(dfs(neighbor))\n        return copy\n    return dfs(node)",
    "complexity": "O(V + E) time, O(V) space",
    "keyLesson": "A dictionary mapping original nodes to cloned counterparts breaks graph cycles during deep copying.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        "expected": "Cloned graph"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "adjList = [[2,4],[1,3],[2,4],[1,3]] (Case 2)",
        "expected": "Cloned graph"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "15.3",
    "patternId": 15,
    "patternName": "Graphs (BFS / DFS / Union-Find / Topological Sort)",
    "title": "Course Schedule (Cycle Detection via Topological Sort)",
    "difficulty": "Medium",
    "description": "There are numCourses courses labeled 0 to numCourses - 1. You are given prerequisites [a, b]. Return True if you can finish all courses.\n\nExample:\nInput: numCourses = 2, prerequisites = [[1,0]]\nOutput: True\nInput: numCourses = 2, prerequisites = [[1,0],[0,1]]\nOutput: False (Cycle)",
    "approach": "Kahn's Algorithm (BFS Topological Sort): track in-degree of all nodes. Seed queue with in-degree 0 nodes. If visited count == numCourses, no cycle.",
    "starterCode": "from collections import deque, defaultdict\ndef can_finish(num_courses, prerequisites):\n    # TODO: Topological sort cycle check\n    pass",
    "solution": "from collections import deque, defaultdict\ndef can_finish(num_courses, prerequisites):\n    graph = defaultdict(list)\n    in_degree = [0] * num_courses\n    for course, prereq in prerequisites:\n        graph[prereq].append(course)\n        in_degree[course] += 1\n    queue = deque(c for c in range(num_courses) if in_degree[c] == 0)\n    visited = 0\n    while queue:\n        node = queue.popleft()\n        visited += 1\n        for neighbor in graph[node]:\n            in_degree[neighbor] -= 1\n            if in_degree[neighbor] == 0:\n                queue.append(neighbor)\n    return visited == num_courses",
    "complexity": "O(V + E) time, O(V + E) space",
    "keyLesson": "A directed graph is a DAG (acyclic) if and only if Kahn's topological sort visits every node.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "numCourses = 2, prerequisites = [[1,0]]",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        "expected": "False"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "numCourses = 2, prerequisites = []]",
        "expected": "0"
      }
    ]
  },
  {
    "id": "15.4",
    "patternId": 15,
    "patternName": "Graphs (BFS / DFS / Union-Find / Topological Sort)",
    "title": "Course Schedule II (Return the Order)",
    "difficulty": "Medium",
    "description": "Given numCourses and prerequisites, return the ordering of courses you should take to finish all courses. If impossible, return [].\n\nExample:\nInput: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]\nOutput: [0,2,1,3] or [0,1,2,3]",
    "approach": "Kahn's algorithm: append each popped node to `order`. If `len(order) == numCourses`, return order; else [].",
    "starterCode": "from collections import deque, defaultdict\ndef find_order(num_courses, prerequisites):\n    # TODO: Return topological sort order\n    pass",
    "solution": "from collections import deque, defaultdict\ndef find_order(num_courses, prerequisites):\n    graph = defaultdict(list)\n    in_degree = [0] * num_courses\n    for course, prereq in prerequisites:\n        graph[prereq].append(course)\n        in_degree[course] += 1\n    queue = deque(c for c in range(num_courses) if in_degree[c] == 0)\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph[node]:\n            in_degree[neighbor] -= 1\n            if in_degree[neighbor] == 0:\n                queue.append(neighbor)\n    return order if len(order) == num_courses else []",
    "complexity": "O(V + E) time, O(V + E) space",
    "keyLesson": "Topological order is the exact chronological sequence in which in-degree 0 tasks are processed.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        "expected": "[0,2,1,3] or [0,1,2,3]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]] (Case 2)",
        "expected": "[0,2,1,3] or [0,1,2,3]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "numCourses = 4, prerequisites = [0],[2,0],[3,1],[3,2]]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "15.5",
    "patternId": 15,
    "patternName": "Graphs (BFS / DFS / Union-Find / Topological Sort)",
    "title": "Number of Connected Components (Union-Find)",
    "difficulty": "Medium",
    "description": "Given n nodes labeled 0 to n - 1 and list of undirected edges, return number of connected components in the graph.\n\nExample:\nInput: n = 5, edges = [[0,1],[1,2],[3,4]]\nOutput: 2",
    "approach": "Union-Find with path compression. Initialize components = n. Each successful union of distinct sets decrements components by 1.",
    "starterCode": "class UnionFind:\n    # TODO: Disjoint set union-find\n    pass\ndef count_components(n, edges):\n    # TODO: Count connected components\n    pass",
    "solution": "class UnionFind:\n    def __init__(self, n):\n        self.parent = list(range(n))\n        self.rank = [0] * n\n    def find(self, x):\n        if self.parent[x] != x:\n            self.parent[x] = self.find(self.parent[x])\n        return self.parent[x]\n    def union(self, a, b):\n        root_a, root_b = self.find(a), self.find(b)\n        if root_a == root_b:\n            return False\n        if self.rank[root_a] < self.rank[root_b]:\n            root_a, root_b = root_b, root_a\n        self.parent[root_b] = root_a\n        if self.rank[root_a] == self.rank[root_b]:\n            self.rank[root_a] += 1\n        return True\n\ndef count_components(n, edges):\n    uf = UnionFind(n)\n    components = n\n    for a, b in edges:\n        if uf.union(a, b):\n            components -= 1\n    return components",
    "complexity": "O((V + E) log* V) time (near linear), O(V) space",
    "keyLesson": "Union-Find tracking component count answers dynamic connectivity queries in nearly O(1) amortized time.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "n = 5, edges = [[0,1],[1,2],[3,4]]",
        "expected": "2"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "n = 5, edges = [[0,1],[1,2],[3,4]] (Case 2)",
        "expected": "2"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "15.6",
    "patternId": 15,
    "patternName": "Graphs (BFS / DFS / Union-Find / Topological Sort)",
    "title": "Graph Valid Tree",
    "difficulty": "Medium",
    "description": "Given n nodes and list of edges, determine if edges form a valid tree (connected, acyclic).\n\nExample:\nInput: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]\nOutput: True",
    "approach": "A valid tree with n nodes must have exactly n - 1 edges and no cycles. Union-Find verifies zero cycle unions.",
    "starterCode": "def valid_tree(n, edges):\n    # TODO: Check if graph is valid tree\n    pass",
    "solution": "def valid_tree(n, edges):\n    if len(edges) != n - 1:\n        return False\n    uf = UnionFind(n)\n    for a, b in edges:\n        if not uf.union(a, b):\n            return False\n    return True",
    "complexity": "O(V + E) time, O(V) space",
    "keyLesson": "Euler's tree theorem: An undirected graph is a tree if and only if |E| = |V| - 1 and it contains no cycles.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
        "expected": "True"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]] (Case 2)",
        "expected": "True"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "n = 5, edges = [1],[0,2],[0,3],[1,4]]",
        "expected": "False"
      }
    ]
  },
  {
    "id": "15.7",
    "patternId": 15,
    "patternName": "Graphs (BFS / DFS / Union-Find / Topological Sort)",
    "title": "Redundant Connection",
    "difficulty": "Medium",
    "description": "A graph started as a tree. One additional edge was added, creating a cycle. Find and return the edge that can be removed.\n\nExample:\nInput: edges = [[1,2],[1,3],[2,3]]\nOutput: [2,3]",
    "approach": "Iterate through edges with Union-Find. The first edge whose vertices already share the same root is the redundant edge.",
    "starterCode": "def find_redundant_connection(edges):\n    # TODO: Find cycle-creating redundant edge\n    pass",
    "solution": "def find_redundant_connection(edges):\n    n = len(edges)\n    uf = UnionFind(n + 1)\n    for a, b in edges:\n        if not uf.union(a, b):\n            return [a, b]\n    return []",
    "complexity": "O(n) time with union by rank, O(n) space",
    "keyLesson": "The edge that attempts to connect two nodes already in the same disjoint set closes the cycle.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "edges = [[1,2],[1,3],[2,3]]",
        "expected": "[2,3]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "edges = [[1,2],[1,3],[2,3]] (Case 2)",
        "expected": "[2,3]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "edges = [0],[1,3],[2,3]]",
        "expected": "[]"
      }
    ]
  },
  {
    "id": "15.8",
    "patternId": 15,
    "patternName": "Graphs (BFS / DFS / Union-Find / Topological Sort)",
    "title": "Word Ladder (BFS Shortest Transformation)",
    "difficulty": "Hard",
    "description": "Given beginWord, endWord, and wordList, return length of shortest transformation sequence from beginWord to endWord (1 letter change per step).\n\nExample:\nInput: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]\nOutput: 5 (\"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\")",
    "approach": "BFS on word transformations: try replacing each letter with 'a'-'z'. Remove visited words from set to prevent cycles.",
    "starterCode": "from collections import deque\ndef ladder_length(begin_word, end_word, word_list):\n    # TODO: Shortest transformation length\n    pass",
    "solution": "from collections import deque\ndef ladder_length(begin_word, end_word, word_list):\n    word_set = set(word_list)\n    if end_word not in word_set:\n        return 0\n    queue = deque([(begin_word, 1)])\n    while queue:\n        word, steps = queue.popleft()\n        if word == end_word:\n            return steps\n        for i in range(len(word)):\n            for c in \"abcdefghijklmnopqrstuvwxyz\":\n                next_word = word[:i] + c + word[i + 1:]\n                if next_word in word_set:\n                    word_set.remove(next_word)\n                    queue.append((next_word, steps + 1))\n    return 0",
    "complexity": "O(N * L^2) time (N words, L word length), O(N) space",
    "keyLesson": "BFS computes shortest path in an unweighted graph where adjacent words differ by exactly 1 character.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        "expected": "5"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"] (Case 2)",
        "expected": "5"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "15.9",
    "patternId": 15,
    "patternName": "Graphs (BFS / DFS / Union-Find / Topological Sort)",
    "title": "Rotting Oranges (Multi-source BFS)",
    "difficulty": "Medium",
    "description": "Given m x n grid, 0=empty, 1=fresh orange, 2=rotten orange. Every minute, 4-directionally adjacent fresh oranges rot. Return min minutes until no fresh oranges remain.\n\nExample:\nInput: grid = [[2,1,1],[1,1,0],[0,1,1]]\nOutput: 4",
    "approach": "Multi-source BFS: seed queue with all initial rotten oranges (r, c, 0). Expand outward level by level, decrementing fresh count.",
    "starterCode": "from collections import deque\ndef oranges_rotting(grid):\n    # TODO: Multi-source BFS for rotting oranges\n    pass",
    "solution": "from collections import deque\ndef oranges_rotting(grid):\n    rows, cols = len(grid), len(grid[0])\n    queue = deque()\n    fresh = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 2:\n                queue.append((r, c, 0))\n            elif grid[r][c] == 1:\n                fresh += 1\n    minutes = 0\n    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]\n    while queue:\n        r, c, time = queue.popleft()\n        minutes = max(minutes, time)\n        for dr, dc in directions:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:\n                grid[nr][nc] = 2\n                fresh -= 1\n                queue.append((nr, nc, time + 1))\n    return minutes if fresh == 0 else -1",
    "complexity": "O(m * n) time, O(m * n) space",
    "keyLesson": "Seeding a single BFS queue with all initial sources models simultaneous wavefront propagation.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        "expected": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "grid = [[2,1,1],[1,1,0],[0,1,1]] (Case 2)",
        "expected": "4"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "Empty or minimal boundary case",
        "expected": "0"
      }
    ]
  },
  {
    "id": "15.10",
    "patternId": 15,
    "patternName": "Graphs (BFS / DFS / Union-Find / Topological Sort)",
    "title": "Dijkstra’s Shortest Path",
    "difficulty": "Medium",
    "description": "Given n nodes, weighted edges with non-negative weights, and source node, find shortest distance from source to all nodes.\n\nExample:\nInput: n = 4, edges = [[0,1,1],[1,2,2],[0,2,4],[2,3,1]], source = 0\nOutput: [0, 1, 3, 4]",
    "approach": "Min-heap priority queue storing `(dist, node)`. Greedily pop shortest distance and relax neighbor edge weights.",
    "starterCode": "import heapq\nfrom collections import defaultdict\ndef dijkstra(n, edges, source):\n    # TODO: Dijkstra shortest path\n    pass",
    "solution": "import heapq\nfrom collections import defaultdict\ndef dijkstra(n, edges, source):\n    graph = defaultdict(list)\n    for u, v, weight in edges:\n        graph[u].append((v, weight))\n        graph[v].append((u, weight))\n    distances = [float('inf')] * n\n    distances[source] = 0\n    min_heap = [(0, source)]\n    while min_heap:\n        dist, node = heapq.heappop(min_heap)\n        if dist > distances[node]:\n            continue\n        for neighbor, weight in graph[node]:\n            new_dist = dist + weight\n            if new_dist < distances[neighbor]:\n                distances[neighbor] = new_dist\n                heapq.heappush(min_heap, (new_dist, neighbor))\n    return distances",
    "complexity": "O((V + E) log V) time, O(V + E) space",
    "keyLesson": "Greedy relaxation with a min-heap guarantees optimal shortest path on graphs with non-negative weights.",
    "testCases": [
      {
        "id": 1,
        "name": "Case 1",
        "input": "n = 4, edges = [[0,1,1],[1,2,2],[0,2,4],[2,3,1]], source = 0",
        "expected": "[0, 1, 3, 4]"
      },
      {
        "id": 2,
        "name": "Case 2",
        "input": "n = 4, edges = [[0,1,1],[1,2,2],[0,2,4],[2,3,1]], source = 0 (Case 2)",
        "expected": "[0, 1, 3, 4]"
      },
      {
        "id": 3,
        "name": "Case 3",
        "input": "n = 4, edges = [0],[1,2,2],[0,2,4],[2,3,1]], source = 0",
        "expected": "[]"
      }
    ]
  }
];
