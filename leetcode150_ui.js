/**
 * LeetCode 150 Patterns Interactive Workspace & 7-Step Socratic Mentor Engine
 * Content based on "150 DSA Problems, 15 Patterns: A Complete Guide with Explanations and Python Implementations"
 */

(function() {
  // Inject clean authentic LeetCode theme CSS
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .lc-btn-subtle {
      background: transparent;
      color: #999;
      border: 1px solid #333;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .lc-btn-subtle:hover:not(:disabled) {
      background: #282828;
      color: #fff;
      border-color: #444;
    }
    .lc-btn-secondary {
      background: #2d2d2d;
      color: #fff;
      border: 1px solid #404040;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .lc-btn-secondary:hover:not(:disabled) {
      background: #383838;
      border-color: #555;
    }
    .lc-btn-primary {
      background: #00b8a3;
      color: #000;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .lc-btn-primary:hover:not(:disabled) {
      filter: brightness(1.1);
    }
    .lc-tab-btn {
      background: transparent;
      border: none;
      color: #8c8c8c;
      font-size: 12.5px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .lc-tab-btn:hover {
      color: #d4d4d4;
      background: #252525;
    }
    .lc-tab-btn.active {
      color: #fff;
      background: #2a2a2a;
    }
    .lc-console-tab {
      background: transparent;
      border: none;
      color: #888;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 12px;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.15s ease;
    }
    .lc-console-tab:hover {
      color: #ccc;
    }
    .lc-console-tab.active {
      color: #fff;
      border-bottom-color: #00b8a3;
    }
    .lc-step-pill {
      flex: 1;
      min-width: 90px;
      padding: 6px 4px;
      font-size: 11px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .lc-case-pill {
      padding: 4px 10px;
      font-size: 11.5px;
      font-weight: 600;
      border-radius: 6px;
      border: 1px solid #333;
      background: #222;
      color: #888;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .lc-case-pill:hover {
      background: #2a2a2a;
      color: #ccc;
    }
    .lc-case-pill.active {
      background: #333;
      color: #fff;
      border-color: #555;
    }
    .lc-case-pill.passed {
      color: #00b8a3;
      border-color: #00b8a340;
    }
    .lc-case-pill.failed {
      color: #ef4444;
      border-color: #ef444440;
    }
    .lc-root * {
      box-sizing: border-box;
    }
  `;
  document.head.appendChild(styleEl);

  // Local state for LeetCode workspace
  const lc = {
    selectedPatternId: parseInt(localStorage.getItem('forge_lc_pattern')) || 1,
    selectedProblemId: localStorage.getItem('forge_lc_problem') || '1.1',
    searchQuery: '',
    difficultyFilter: 'all', // all, Easy, Medium, Hard
    activeTab: 'mentor', // mentor, cheatsheet, solution
    consoleTab: 'testcase', // 'testcase' or 'result' (authentic LeetCode tabs)
    activeCaseIdx: 0, // 0: Case 1, 1: Case 2, 2: Case 3
    step: 1, // 1 to 7
    userApproach: '',
    mentorFeedback: null,
    hintLevel: 0,
    editorCode: '',
    testResults: null,
    collapsedSidebar: false
  };
  window.lc = lc;
  window.getLcState = () => lc;

  const stepsConfig = [
    { step: 1, label: 'Comprehension', fullLabel: 'Problem Comprehension & Invariants' },
    { step: 2, label: 'Strategy', fullLabel: 'Formulate Algorithmic Strategy' },
    { step: 3, label: 'Review & Trace', fullLabel: 'Mentor Evaluation & Visual Trace' },
    { step: 4, label: 'Implementation', fullLabel: 'Python Implementation Blueprint' },
    { step: 5, label: 'Test & Review', fullLabel: 'Code Review & Automated Testing' },
    { step: 6, label: 'Optimal Big-O', fullLabel: 'Optimal Solution & Big-O Proof' },
    { step: 7, label: 'Mastery Recap', fullLabel: 'Pattern Mastery & Interview Insights' }
  ];

  // Helper to get problem by ID
  function getProblem(id) {
    if (!window.LEETCODE_PROBLEMS) return null;
    return window.LEETCODE_PROBLEMS.find(p => p.id === id) || window.LEETCODE_PROBLEMS[0];
  }

  // Helper to get pattern by ID
  function getPattern(id) {
    if (!window.LEETCODE_PATTERNS) return null;
    return window.LEETCODE_PATTERNS.find(p => p.id === id) || window.LEETCODE_PATTERNS[0];
  }

  // Helper to check if problem is completed
  function isCompleted(probId) {
    if (!window.state || !window.state.leetcodeCompleted) {
      const saved = JSON.parse(localStorage.getItem('forge_leetcode_completed') || '[]');
      return saved.includes(probId);
    }
    return window.state.leetcodeCompleted.has(probId);
  }

  // Mark problem completed
  function markProblemCompleted(probId) {
    if (!window.state) window.state = {};
    if (!window.state.leetcodeCompleted) {
      window.state.leetcodeCompleted = new Set(JSON.parse(localStorage.getItem('forge_leetcode_completed') || '[]'));
    }
    const alreadyDone = window.state.leetcodeCompleted.has(probId);
    window.state.leetcodeCompleted.add(probId);
    localStorage.setItem('forge_leetcode_completed', JSON.stringify([...window.state.leetcodeCompleted]));
    
    if (!alreadyDone) {
      if (typeof window.playSound === 'function') window.playSound('pass');
      if (typeof window.triggerConfetti === 'function') window.triggerConfetti();
      if (typeof window.state.xp === 'number') {
        window.state.xp += 50;
        if (typeof window.saveProfile === 'function') window.saveProfile();
        if (typeof window.syncProfileUI === 'function') window.syncProfileUI();
      }
    }
  }

  // Helper: Escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Helper: Pattern Philosophy Explanations
  function getPatternPhilosophy(patId, patName) {
    const philosophies = {
      1: "In a sorted collection, opposite-end pointers eliminate an entire row or column of brute-force candidate pairs in single step. Because elements are sorted monotonically, if sum < target, no element left of 'right' can possibly sum with 'left' to reach target. Thus left += 1 safely discards O(N) candidates in a single step without testing them, turning O(N²) quadratic work into strict O(N) linear time.",
      2: "Sliding Window maintains a running contiguous state over [start, end]. Instead of recomputing sums or character frequencies from scratch (O(N·K) or O(N²)), we add arr[end] upon expanding right, and subtract arr[start] when contracting left upon violating constraints. Each element enters and exits the window at most once, guaranteeing strict O(N) time.",
      3: "Floyd's Tortoise & Hare algorithm sets slow moving by 1 node and fast moving by 2 nodes. If a cycle exists, each iteration reduces the relative gap between them by 1 node (2 - 1 = 1). They are mathematically guaranteed to meet within N iterations, detecting loops or middle nodes in O(N) time with zero extra heap memory (O(1) space).",
      4: "Sorting intervals by start time (O(N log N)) ensures all overlapping intervals appear consecutively. We iterate sequentially and check: if current.start <= previous.end, they overlap, so we merge by setting previous.end = max(previous.end, current.end). Otherwise, we push the interval as a disjoint span.",
      5: "When inputs contain N numbers in the range [1...N] (or [0...N]), every number belongs at index 'num - 1'. By swapping mismatched elements directly to their home indices, each number is placed in at most 2 swaps, yielding O(N) time and O(1) auxiliary space without extra boolean arrays.",
      6: "Maintains 3 pointers: 'prev', 'curr', and 'next_node'. In each iteration, we save next_node = curr.next, redirect curr.next = prev, and advance prev = curr and curr = next_node. Reverses the pointers in-place with zero memory allocation.",
      7: "Uses a double-ended FIFO queue (collections.deque). At each tree depth, captures level_size = len(queue) and iterates exactly level_size times, processing the horizontal tier before children are queued. Ideal for level-order summaries, zigzag paths, and vertical orderings.",
      8: "Explores recursively down branches until base cases (not root or leaf) are met. Exploits the call stack to accumulate path sums, subtree depths, or path constructions, backtracking seamlessly upon return in O(N) time.",
      9: "Partitions dynamic streaming data into two halves: a Max-Heap for the smaller half and a Min-Heap for the larger half. By maintaining balanced sizes (differing by at most 1), the median is retrieved in O(1) time while insertions take O(log N).",
      10: "Backtracking builds solution paths incrementally via state choices: Choose candidate -> Explore recursions -> Unchoose (backtrack with path.pop()). Pruning invalid decisions early drastically trims combinatorial search trees.",
      11: "Calculates mid = (low + high) // 2. In sorted, rotated, or bitonic arrays, at least one half [low...mid] or [mid...high] is strictly sorted. By checking boundary values, we discard half the search space in each step, achieving logarithmic O(log N) runtime.",
      12: "Instead of sorting the entire array in O(N log N), maintains a Min-Heap of size K. When an incoming element exceeds the root, we pop the root and push the new element in O(log K). The final heap holds the top K largest elements in O(N log K) time and O(K) space.",
      13: "Inserts the first element of each of the K sorted lists into a Min-Heap of size K. Repeatedly pops the overall smallest element, appends it to output, and pushes the next element from that stream in O(N log K) time with minimal memory.",
      14: "0/1 Knapsack dynamic programming models states (index, capacity). At each item, we choose between excluding the item dp[i-1][w] or including it value[i] + dp[i-1][w - weight[i]]. Memoization eliminates redundant subproblem evaluations.",
      15: "Models relations as vertices and edges. Employs a visited set to avoid cycles in BFS/DFS, or tracks in-degrees with a queue for Kahn's topological sort to resolve dependencies in O(V + E) time."
    };
    return philosophies[patId] || `The ${patName} pattern reduces exhaustive search spaces by exploiting structural properties of the input.`;
  }

  // Helper: Line-by-line explanation of solution code
  function generateLineByLineExplanation(solution) {
    if (!solution) return [];
    const lines = solution.split('\n');
    const explanations = [];

    lines.forEach((rawLine, idx) => {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) return;

      let exp = "Executes statement in the algorithmic flow.";
      if (line.startsWith('def ')) {
        exp = "Defines the core function signature with input parameters and expected return type.";
      } else if (line.includes('left, right =') || line.includes('start, end =') || (line.includes('left =') && line.includes('right ='))) {
        exp = "Initializes two boundary pointers: one at the start (index 0) and one at the end (index len-1).";
      } else if (line.startsWith('while left < right:') || line.startsWith('while start < end:')) {
        exp = "Loops while pointers have not met; guarantees every candidate pair is examined without duplicate checks.";
      } else if (line.startsWith('while ') && line.includes('fast') && line.includes('next')) {
        exp = "Loops while the fast pointer has valid forward nodes, guarding against null reference exceptions.";
      } else if (line.startsWith('while ')) {
        exp = "Controls the primary iteration invariant until boundary constraints are reached.";
      } else if (line.startsWith('for ') && line.includes('range(')) {
        exp = "Iterates across bounded index ranges sequentially.";
      } else if (line.startsWith('for ') && line.includes(' in ')) {
        exp = "Iterates over each element in the input collection.";
      } else if (line.includes('current =') || line.includes('curr_sum =') || line.includes('current_sum =')) {
        exp = "Computes the current candidate metric (sum, window size, or difference) in O(1) time.";
      } else if (line.includes('if current == target:') || line.includes('if curr_sum == target:')) {
        exp = "Condition satisfied! Returns the valid solution pair/indices immediately.";
      } else if (line.includes('if ') && line.includes('< target') && line.includes('left +=')) {
        exp = "Current sum is smaller than target. Because the array is sorted, incrementing left increases the sum monotonically.";
      } else if (line.includes('right -= 1') || line.includes('end -= 1')) {
        exp = "Current sum is larger than target. Decrementing right decreases the sum monotonically toward target.";
      } else if (line.startsWith('if ') || line.startsWith('elif ')) {
        exp = "Evaluates the algorithmic decision branch according to pattern invariants.";
      } else if (line.startsWith('else:')) {
        exp = "Default branch when alternative boundary conditions are not met.";
      } else if (line.includes('return [') || line.includes('return True') || line.includes('return False') || line.includes('return max_') || line.includes('return res')) {
        exp = "Returns the verified result matching problem specifications.";
      } else if (line.startsWith('return [-1, -1]') || line.startsWith('return 0') || line.startsWith('return []')) {
        exp = "Fallback return value when no valid element or subsegment satisfies the criteria.";
      }

      explanations.push({
        lineNum: idx + 1,
        code: line,
        explanation: exp
      });
    });

    return explanations;
  }

  // Helper: FAANG Interview Follow-Ups
  function getFaangFollowUps(patId, prob) {
    return [
      {
        q: "What if the input array is unsorted?",
        a: "If elements are unsorted, you can either sort them first in O(N log N) time, or use a Hash Set/Map to trade O(N) space for O(N) time."
      },
      {
        q: "How would you handle duplicate values in the input?",
        a: "Advance your pointers past identical adjacent elements (e.g., while left < right and arr[left] == arr[left+1]: left += 1) to avoid duplicate answers."
      },
      {
        q: "What if the dataset is a continuous stream that does not fit into RAM?",
        a: "Use bounded data structures such as an external priority queue or sliding window buffers that process records in chunks without holding all elements in memory."
      }
    ];
  }

  // Render main LeetCode view
  window.renderLeetCodeWorkspace = function(container) {
    if (!container) container = document.getElementById('app-container');
    if (!container) return;

    const prob = getProblem(lc.selectedProblemId);
    if (!prob) {
      container.innerHTML = '<div style="padding: 40px; color: #fff;">Loading LeetCode 150 problems...</div>';
      return;
    }

    if (!lc.editorCode || lc.currentLoadedProbId !== prob.id) {
      const savedCode = localStorage.getItem(`forge_lc_code_${prob.id}`);
      lc.editorCode = savedCode || prob.starterCode;
      lc.currentLoadedProbId = prob.id;
      lc.step = parseInt(localStorage.getItem(`forge_lc_step_${prob.id}`)) || (isCompleted(prob.id) ? 6 : 1);
      lc.hintLevel = 0;
      lc.mentorFeedback = null;
      lc.testResults = null;
      lc.activeCaseIdx = 0;
      lc.consoleTab = 'testcase';
    }

    const completedCount = window.LEETCODE_PROBLEMS ? window.LEETCODE_PROBLEMS.filter(p => isCompleted(p.id)).length : 0;
    const progressPercent = Math.round((completedCount / 150) * 100);

    // Difficulty badge color
    const diffColor = prob.difficulty === 'Easy' ? '#00b8a3' : prob.difficulty === 'Medium' ? '#ffc01e' : '#ff375f';
    const diffBg = prob.difficulty === 'Easy' ? 'rgba(0,184,163,0.12)' : prob.difficulty === 'Medium' ? 'rgba(255,192,30,0.12)' : 'rgba(255,55,95,0.12)';

    container.innerHTML = `
      <div class="lc-root" style="display: flex; flex-direction: column; height: calc(100vh - 65px); background: #121212; color: #e6e6e6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; overflow: hidden;">
        
        <!-- TOP LEETCODE BAR -->
        <div style="height: 48px; background: #1e1e1e; border-bottom: 1px solid #2d2d2d; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; flex-shrink: 0;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <button onclick="toggleLcSidebar()" class="lc-btn-subtle" title="Toggle Problems List" style="display: flex; align-items: center; gap: 6px; padding: 5px 10px; font-size: 13px;">
              <span>☰</span> <b>Problems List</b>
            </button>
            <div style="width: 1px; height: 18px; background: #333;"></div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 13px; color: #8c8c8c;">Pattern ${prob.patternId}/15:</span>
              <span style="font-size: 13px; font-weight: 600; color: #d4d4d4;">${prob.patternName}</span>
              <span style="font-size: 13px; color: #555;">/</span>
              <span style="font-size: 14px; font-weight: 700; color: #ffffff;">${prob.id}. ${prob.title}</span>
              <span style="font-size: 11px; font-weight: 600; color: ${diffColor}; background: ${diffBg}; padding: 2px 8px; border-radius: 10px; border: 1px solid ${diffColor}40;">
                ${prob.difficulty}
              </span>
              ${isCompleted(prob.id) ? '<span style="font-size: 11px; background: rgba(0,184,163,0.2); color: #00b8a3; font-weight: 700; padding: 2px 7px; border-radius: 4px;">✓ Solved</span>' : ''}
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <!-- Prev / Next Problem buttons -->
            <button onclick="navigateLcProblem(-1)" class="lc-btn-subtle" style="padding: 4px 10px; font-size: 12px;" title="Previous Problem">
              ‹ Prev Problem
            </button>
            <button onclick="navigateLcProblem(1)" class="lc-btn-subtle" style="padding: 4px 10px; font-size: 12px;" title="Next Problem">
              Next Problem ›
            </button>
            <div style="width: 1px; height: 18px; background: #333;"></div>
            <!-- Overall Progress Pill -->
            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; background: #262626; padding: 4px 12px; border-radius: 14px; border: 1px solid #333;">
              <span style="color: #999;">Solved:</span>
              <b style="color: #00b8a3;">${completedCount}</b><span style="color: #666;">/150</span>
              <div style="width: 60px; height: 5px; background: #383838; border-radius: 3px; overflow: hidden; margin-left: 4px;">
                <div style="width: ${progressPercent}%; height: 100%; background: #00b8a3;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- MAIN WORKSPACE: 3-PANEL LAYOUT -->
        <div style="flex: 1; display: flex; overflow: hidden;">
          
          <!-- LEFT PANE: PATTERNS & PROBLEMS EXPLORER -->
          <div id="lc-sidebar" style="width: ${lc.collapsedSidebar ? '0px' : '320px'}; display: ${lc.collapsedSidebar ? 'none' : 'flex'}; flex-direction: column; background: #181818; border-right: 1px solid #2d2d2d; flex-shrink: 0; overflow: hidden; transition: width 0.2s ease;">
            
            <!-- Sidebar Header & Search -->
            <div style="padding: 12px 14px; border-bottom: 1px solid #262626; background: #1a1a1a;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #a0a0a0;">DSA 150 Patterns</span>
                <span style="font-size: 11px; color: #00b8a3; font-weight: 600;">${completedCount}/150 Complete</span>
              </div>
              
              <!-- Search box -->
              <div style="position: relative; margin-bottom: 8px;">
                <input 
                  type="text" 
                  id="lc-search-input" 
                  placeholder="Filter 150 problems or patterns..." 
                  value="${escapeHtml(lc.searchQuery)}"
                  oninput="handleLcSearch(this.value)"
                  style="width: 100%; background: #262626; border: 1px solid #383838; border-radius: 6px; padding: 6px 10px 6px 28px; color: #fff; font-size: 12px; outline: none;"
                />
                <span style="position: absolute; left: 8px; top: 6px; font-size: 13px; color: #777;">🔍</span>
              </div>

              <!-- Difficulty Filter Pills -->
              <div style="display: flex; gap: 4px;">
                ${['all', 'Easy', 'Medium', 'Hard'].map(d => `
                  <button 
                    onclick="filterLcDifficulty('${d}')" 
                    style="flex: 1; padding: 3px 0; font-size: 10.5px; font-weight: 600; border-radius: 4px; border: 1px solid ${lc.difficultyFilter === d ? '#555' : 'transparent'}; background: ${lc.difficultyFilter === d ? '#333' : '#222'}; color: ${lc.difficultyFilter === d ? '#fff' : '#888'}; cursor: pointer;">
                    ${d === 'all' ? 'All' : d}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Patterns & Problems List (Accordion) -->
            <div style="flex: 1; overflow-y: auto; padding: 6px 0;" id="lc-pattern-list">
              ${renderPatternAccordionHtml()}
            </div>
          </div>

          <!-- CENTER PANE: PROBLEM STATEMENT & 7-STEP SOCRATIC MENTOR -->
          <div style="flex: 1; min-width: 360px; max-width: 50%; display: flex; flex-direction: column; border-right: 1px solid #2d2d2d; background: #161616; overflow: hidden;">
            
            <!-- Center Tabs Header -->
            <div style="height: 40px; background: #1e1e1e; border-bottom: 1px solid #282828; display: flex; align-items: center; padding: 0 12px; gap: 8px; flex-shrink: 0;">
              <button onclick="switchLcTab('mentor')" class="lc-tab-btn ${lc.activeTab === 'mentor' ? 'active' : ''}">
                👨‍🏫 Socratic Mentor <span style="background: #333; font-size: 10px; padding: 1px 6px; border-radius: 10px; margin-left: 4px;">Step ${lc.step}/7</span>
              </button>
              <button onclick="switchLcTab('cheatsheet')" class="lc-tab-btn ${lc.activeTab === 'cheatsheet' ? 'active' : ''}">
                📘 Pattern Cheatsheet
              </button>
              <button onclick="switchLcTab('solution')" class="lc-tab-btn ${lc.activeTab === 'solution' ? 'active' : ''}">
                💡 Optimal Solution & Big-O
              </button>
            </div>

            <!-- Tab Content Area -->
            <div style="flex: 1; overflow-y: auto; padding: 18px 20px;" id="lc-center-content">
              ${renderCenterTabContent(prob)}
            </div>
          </div>

          <!-- RIGHT PANE: AUTHENTIC LEETCODE CODE EDITOR & CONSOLE -->
          <div style="flex: 1; min-width: 380px; display: flex; flex-direction: column; background: #181818; overflow: hidden;">
            
            <!-- LeetCode Editor Top Toolbar -->
            <div style="height: 42px; background: #1e1e1e; border-bottom: 1px solid #2d2d2d; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; flex-shrink: 0;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #e6e6e6; background: #282828; padding: 4px 10px; border-radius: 6px; border: 1px solid #383838;">
                  <span style="color: #3b82f6;">🐍</span> Python 3
                </div>
                <button onclick="formatLcEditorCode()" class="lc-btn-subtle" style="padding: 4px 8px; font-size: 11px;" title="Format Python Indentation">
                  🧹 Format
                </button>
                <button onclick="resetLcEditor()" class="lc-btn-subtle" style="padding: 4px 8px; font-size: 11px;" title="Reset Starter Code">
                  ↺ Reset
                </button>
              </div>

              <div style="display: flex; align-items: center; gap: 8px;">
                <button onclick="requestMentorHint()" class="lc-btn-subtle" style="padding: 5px 12px; font-size: 12px; color: #ffc01e;" title="Get Socratic Hint">
                  💡 Hint
                </button>
                <button onclick="runLcCode()" class="lc-btn-secondary" style="padding: 6px 16px; font-size: 12.5px; font-weight: 600;" title="Run Testcases (Ctrl + Enter)">
                  ▶ Run
                </button>
                <button onclick="submitLcCode()" class="lc-btn-primary" style="padding: 6px 18px; font-size: 12.5px; font-weight: 700; background: #00b8a3; color: #000;" title="Submit Solution">
                  ✓ Submit
                </button>
              </div>
            </div>

            <!-- Code Editor Workspace with Line Numbers & Auto-Indentation -->
            <div style="flex: 1; position: relative; display: flex; background: #1a1a1a; overflow: hidden;">
              <!-- Line Numbers Gutter -->
              <div id="lc-line-numbers" style="width: 44px; padding: 12px 6px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; line-height: 21px; color: #555; text-align: right; background: #161616; border-right: 1px solid #282828; user-select: none;">
                1
              </div>
              <!-- Textarea Editor with Python Auto-Indentation after Colon -->
              <textarea 
                id="lc-code-editor"
                spellcheck="false"
                style="flex: 1; height: 100%; background: transparent; border: none; outline: none; resize: none; color: #d4d4d4; font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace; font-size: 13px; line-height: 21px; padding: 12px 14px; tab-size: 4; white-space: pre; overflow-y: auto;"
                oninput="handleLcEditorInput(this.value)"
                onkeydown="handleLcEditorKeydown(event)"
                placeholder="# Write your Python 3 implementation here..."
              >${escapeHtml(lc.editorCode)}</textarea>
            </div>

            <!-- Authentic LeetCode Bottom Console Panel -->
            <div style="height: 250px; background: #161616; border-top: 1px solid #2d2d2d; display: flex; flex-direction: column; flex-shrink: 0;">
              
              <!-- Console Tabs Bar -->
              <div style="height: 38px; background: #1c1c1c; border-bottom: 1px solid #282828; display: flex; align-items: center; justify-content: space-between; padding: 0 12px;">
                <div style="display: flex; gap: 12px;">
                  <button onclick="switchConsoleTab('testcase')" class="lc-console-tab ${lc.consoleTab === 'testcase' ? 'active' : ''}">
                    Testcase
                  </button>
                  <button onclick="switchConsoleTab('result')" class="lc-console-tab ${lc.consoleTab === 'result' ? 'active' : ''}">
                    Test Result ${renderConsoleTabBadge()}
                  </button>
                </div>
                <div style="font-size: 11px; color: #777; font-family: monospace;">
                  Ctrl + Enter to Run
                </div>
              </div>

              <!-- Console Body Area -->
              <div style="flex: 1; overflow-y: auto; padding: 12px 16px;" id="lc-console-body">
                ${renderConsoleBodyHtml(prob)}
              </div>
            </div>

          </div>
        </div>

      </div>
    `;

    updateLcLineNumbers();
  };

  // Helper for console tab badge
  function renderConsoleTabBadge() {
    if (!lc.testResults) return '';
    if (lc.testResults.passed) {
      return '<span style="color: #00b8a3; font-size: 10px; margin-left: 4px;">●</span>';
    }
    return '<span style="color: #ef4444; font-size: 10px; margin-left: 4px;">●</span>';
  }

  // Switch console tab
  window.switchConsoleTab = function(tab) {
    lc.consoleTab = tab;
    const prob = getProblem(lc.selectedProblemId);
    const body = document.getElementById('lc-console-body');
    if (body) body.innerHTML = renderConsoleBodyHtml(prob);

    document.querySelectorAll('.lc-console-tab').forEach(btn => {
      if (btn.innerText.includes('Testcase') && tab === 'testcase') btn.classList.add('active');
      else if (btn.innerText.includes('Test Result') && tab === 'result') btn.classList.add('active');
      else btn.classList.remove('active');
    });
  };

  window.selectTestCaseTab = function(idx) {
    lc.activeCaseIdx = idx;
    const prob = getProblem(lc.selectedProblemId);
    const body = document.getElementById('lc-console-body');
    if (body) body.innerHTML = renderConsoleBodyHtml(prob);
  };

  // Render Console Body: Authentic LeetCode Testcase & Test Result
  function renderConsoleBodyHtml(prob) {
    const cases = prob.testCases || [
      { id: 1, name: "Case 1", input: "Sample input", expected: "Expected result" },
      { id: 2, name: "Case 2", input: "Sample variation", expected: "Expected result" },
      { id: 3, name: "Case 3", input: "Edge case", expected: "Expected result" }
    ];

    // TAB 1: TESTCASE
    if (lc.consoleTab === 'testcase') {
      const activeCase = cases[lc.activeCaseIdx] || cases[0];
      return `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <!-- Case Pills -->
          <div style="display: flex; gap: 8px;">
            ${cases.map((c, i) => `
              <button 
                onclick="selectTestCaseTab(${i})" 
                class="lc-case-pill ${lc.activeCaseIdx === i ? 'active' : ''}"
              >
                ${c.name}
              </button>
            `).join('')}
          </div>

          <!-- Parameters Display -->
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12.5px;">
            <div style="color: #888; font-size: 11.5px; text-transform: uppercase; font-weight: 700;">Input Parameters</div>
            <div style="background: #202020; border: 1px solid #303030; border-radius: 6px; padding: 10px 12px; font-family: 'JetBrains Mono', monospace; color: #ffc01e; white-space: pre-wrap;">
              ${escapeHtml(activeCase.input)}
            </div>

            <div style="color: #888; font-size: 11.5px; text-transform: uppercase; font-weight: 700; margin-top: 4px;">Expected Output</div>
            <div style="background: #202020; border: 1px solid #303030; border-radius: 6px; padding: 10px 12px; font-family: 'JetBrains Mono', monospace; color: #00b8a3; white-space: pre-wrap;">
              ${escapeHtml(activeCase.expected)}
            </div>
          </div>
        </div>
      `;
    }

    // TAB 2: TEST RESULT
    const results = lc.testResults;
    if (!results) {
      return `
        <div style="padding: 24px; text-align: center; color: #777; font-size: 13px;">
          You must run your code first to view test results.<br>
          Click <b>▶ Run</b> or press <b>Ctrl + Enter</b>.
        </div>
      `;
    }

    // Status Banner
    const isAccepted = results.passed;
    const activeCase = cases[lc.activeCaseIdx] || cases[0];
    const caseResult = (results.cases && results.cases[lc.activeCaseIdx]) || {
      passed: isAccepted,
      input: activeCase.input,
      actual: isAccepted ? activeCase.expected : 'None',
      expected: activeCase.expected
    };

    return `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        
        <!-- Status Header -->
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 16px; font-weight: 800; color: ${isAccepted ? '#00b8a3' : '#ef4444'};">
              ${results.status || (isAccepted ? 'Accepted' : 'Wrong Answer')}
            </span>
            <span style="font-size: 12px; color: #888; font-family: monospace;">
              Runtime: ${results.runtime || '38'} ms
            </span>
          </div>

          <div style="font-size: 11.5px; color: #888;">
            ${results.passedCount || (isAccepted ? '3/3' : '0/3')} Testcases Passed
          </div>
        </div>

        <!-- Case Pills with Pass/Fail Badges -->
        <div style="display: flex; gap: 8px;">
          ${cases.map((c, i) => {
            const cRes = results.cases ? results.cases[i] : null;
            const cPassed = cRes ? cRes.passed : isAccepted;
            return `
              <button 
                onclick="selectTestCaseTab(${i})" 
                class="lc-case-pill ${lc.activeCaseIdx === i ? 'active' : ''} ${cPassed ? 'passed' : 'failed'}"
              >
                ${c.name} ${cPassed ? '✓' : '✗'}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Details for active case -->
        <div style="background: #1a1a1a; border: 1px solid #282828; border-radius: 6px; padding: 12px; font-size: 12.5px; font-family: 'JetBrains Mono', monospace; display: flex; flex-direction: column; gap: 8px;">
          <div>
            <div style="color: #888; font-size: 11px;">Input:</div>
            <div style="color: #ffc01e; margin-top: 2px;">${escapeHtml(caseResult.input)}</div>
          </div>
          <div>
            <div style="color: #888; font-size: 11px;">Output:</div>
            <div style="color: ${caseResult.passed ? '#00b8a3' : '#ef4444'}; margin-top: 2px;">${escapeHtml(caseResult.actual)}</div>
          </div>
          <div>
            <div style="color: #888; font-size: 11px;">Expected:</div>
            <div style="color: #00b8a3; margin-top: 2px;">${escapeHtml(caseResult.expected)}</div>
          </div>
        </div>

        ${results.error ? `
          <div style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 6px; padding: 10px; color: #fca5a5; font-size: 12px; font-family: 'JetBrains Mono', monospace;">
            ${escapeHtml(results.error)}
          </div>
        ` : ''}

      </div>
    `;
  }

  // Helper to insert or replace text while preserving the native browser Undo/Redo stack (Ctrl+Z / Ctrl+Y)
  function insertTextPreservingUndo(textarea, text, replaceStart, replaceEnd) {
    textarea.focus();
    if (typeof replaceStart === 'number' && typeof replaceEnd === 'number') {
      textarea.setSelectionRange(replaceStart, replaceEnd);
    }

    let success = false;
    try {
      success = document.execCommand('insertText', false, text);
    } catch (err) {
      success = false;
    }

    if (!success) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (typeof textarea.setRangeText === 'function') {
        textarea.setRangeText(text, start, end, 'end');
      } else {
        const val = textarea.value;
        textarea.value = val.substring(0, start) + text + val.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + text.length;
      }
    }

    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // Unified Language-Aware Indentation & Keyboard Engine
  window.handleSmartEditorKeydown = function(e, onRunCallback, onInputCallback) {
    const ta = e.target;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const val = ta.value;

    // 1. Run shortcut: Ctrl + Enter or Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (typeof onRunCallback === 'function') onRunCallback();
      return;
    }

    // 2. Enter key: Language-Aware Smart Indentation
    if (e.key === 'Enter') {
      e.preventDefault();
      const lineStart = val.lastIndexOf('\n', start - 1) + 1;
      const lineBeforeCursor = val.substring(lineStart, start);
      const indentMatch = lineBeforeCursor.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';

      // Strip comments and trailing spaces
      const cleanLine = lineBeforeCursor.replace(/#.*$/, '').trim();

      let nextIndent = currentIndent;

      // Block starter: ends with ':' (Python) or '{' (C++, Java, JS)
      if (cleanLine.endsWith(':') || cleanLine.endsWith('{')) {
        nextIndent = currentIndent + '    '; // Indent one level (+4 spaces)
      }
      // Block terminator: return, pass, break, continue, raise
      // Sensibly dedent by one level (-4 spaces, down to 0)
      else if (/^(return(\s+.*)?|pass|break|continue|raise(\s+.*)?)$/.test(cleanLine)) {
        if (currentIndent.length >= 4) {
          nextIndent = currentIndent.substring(4);
        } else {
          nextIndent = '';
        }
      }
      // Curly bracket closer '}'
      else if (cleanLine.endsWith('}')) {
        if (currentIndent.length >= 4) {
          nextIndent = currentIndent.substring(4);
        } else {
          nextIndent = '';
        }
      }

      insertTextPreservingUndo(ta, '\n' + nextIndent, start, end);
      if (typeof onInputCallback === 'function') onInputCallback(ta.value || ta);
      return;
    }

    // 3. Tab key: Indentation & Multi-line Support
    if (e.key === 'Tab') {
      e.preventDefault();
      const isShift = e.shiftKey;

      // Multi-line selection: indent/unindent all selected lines
      if (start !== end && val.substring(start, end).includes('\n')) {
        const lineStart = val.lastIndexOf('\n', start - 1) + 1;
        const lineEndIdx = val.indexOf('\n', end);
        const lineEnd = lineEndIdx === -1 ? val.length : lineEndIdx;

        const selectedBlock = val.substring(lineStart, lineEnd);
        const lines = selectedBlock.split('\n');

        let startOffset = 0;
        let endOffset = 0;
        let newLines;

        if (!isShift) {
          newLines = lines.map((l, i) => {
            if (l.length > 0 || lines.length === 1) {
              if (i === 0) startOffset += 4;
              endOffset += 4;
              return '    ' + l;
            }
            return l;
          });
        } else {
          newLines = lines.map((l, i) => {
            const match = l.match(/^( {1,4})/);
            if (match) {
              const removed = match[1].length;
              if (i === 0) startOffset -= removed;
              endOffset -= removed;
              return l.substring(removed);
            }
            return l;
          });
        }

        const replacement = newLines.join('\n');
        insertTextPreservingUndo(ta, replacement, lineStart, lineEnd);
        ta.setSelectionRange(Math.max(lineStart, start + startOffset), Math.max(lineStart, end + endOffset));
        if (typeof onInputCallback === 'function') onInputCallback(ta.value || ta);
        return;
      }

      // Single line or no selection
      if (!isShift) {
        insertTextPreservingUndo(ta, '    ', start, end);
      } else {
        const lineStart = val.lastIndexOf('\n', start - 1) + 1;
        const match = val.substring(lineStart, lineStart + 4).match(/^( {1,4})/);
        if (match) {
          const removed = match[1].length;
          insertTextPreservingUndo(ta, '', lineStart, lineStart + removed);
          ta.setSelectionRange(Math.max(lineStart, start - removed), Math.max(lineStart, end - removed));
        }
      }
      if (typeof onInputCallback === 'function') onInputCallback(ta.value || ta);
      return;
    }

    // 4. Backspace: Dedent 4 spaces when at indent boundary
    if (e.key === 'Backspace' && start === end) {
      const lineStart = val.lastIndexOf('\n', start - 1) + 1;
      const beforeCursor = val.substring(lineStart, start);
      if (/^\s+$/.test(beforeCursor) && beforeCursor.length >= 1) {
        const countToDelete = beforeCursor.length % 4 === 0 ? 4 : (beforeCursor.length % 4);
        e.preventDefault();
        insertTextPreservingUndo(ta, '', start - countToDelete, start);
        if (typeof onInputCallback === 'function') onInputCallback(ta.value || ta);
        return;
      }
    }

    // 5. Auto-closing pairs: (), [], {}, "", ''
    const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
    if (pairs[e.key]) {
      const closing = pairs[e.key];
      if (start !== end) {
        // Wrap selection
        e.preventDefault();
        const selected = val.substring(start, end);
        insertTextPreservingUndo(ta, e.key + selected + closing, start, end);
        ta.setSelectionRange(start + 1, end + 1);
        if (typeof onInputCallback === 'function') onInputCallback(ta.value || ta);
        return;
      } else {
        const nextChar = val[start];
        if ((e.key === '"' || e.key === "'" || e.key === ')' || e.key === ']' || e.key === '}') && nextChar === e.key) {
          e.preventDefault();
          ta.setSelectionRange(start + 1, start + 1);
          return;
        }
        e.preventDefault();
        insertTextPreservingUndo(ta, e.key + closing, start, end);
        ta.setSelectionRange(start + 1, start + 1);
        if (typeof onInputCallback === 'function') onInputCallback(ta.value || ta);
        return;
      }
    }
  };

  // PYTHON AUTO-INDENTATION AFTER COLON & KEY EVENT HANDLER
  window.handleLcEditorKeydown = function(e) {
    window.handleSmartEditorKeydown(e, window.runLcCode, window.handleLcEditorInput);
  };

  // Format Python code (cleanup spacing)
  window.formatLcEditorCode = function() {
    const editor = document.getElementById('lc-code-editor');
    if (!editor) return;
    const lines = editor.value.split('\n');
    let formatted = lines.map(l => l.replace(/\s+$/, '')).join('\n');
    editor.value = formatted;
    handleLcEditorInput(formatted);
    if (typeof window.playSound === 'function') window.playSound('click');
  };

  // Render Pattern Accordion in Left Sidebar
  function renderPatternAccordionHtml() {
    if (!window.LEETCODE_PATTERNS || !window.LEETCODE_PROBLEMS) {
      return '<div style="padding: 16px; color: #777;">Loading patterns...</div>';
    }

    let q = (lc.searchQuery || '').toLowerCase().trim();
    let diff = lc.difficultyFilter;

    let html = '';

    window.LEETCODE_PATTERNS.forEach(pat => {
      let problems = window.LEETCODE_PROBLEMS.filter(p => p.patternId === pat.id);

      if (diff !== 'all') {
        problems = problems.filter(p => p.difficulty === diff);
      }
      if (q) {
        problems = problems.filter(p => 
          p.title.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) || 
          pat.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
        );
      }

      if (problems.length === 0 && q) return;

      const isPatternOpen = lc.selectedPatternId === pat.id || q.length > 0;
      const allPatProblems = window.LEETCODE_PROBLEMS.filter(p => p.patternId === pat.id);
      const solvedInPat = allPatProblems.filter(p => isCompleted(p.id)).length;

      html += `
        <div style="border-bottom: 1px solid #222;">
          <div 
            onclick="toggleLcPatternAccordion(${pat.id})" 
            style="padding: 9px 14px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; background: ${lc.selectedPatternId === pat.id ? '#202020' : 'transparent'}; user-select: none;"
            onmouseover="this.style.background='#222'" 
            onmouseout="this.style.background='${lc.selectedPatternId === pat.id ? '#202020' : 'transparent'}'"
          >
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 10px; color: #777; transition: transform 0.15s; transform: rotate(${isPatternOpen ? '90deg' : '0deg'});">▶</span>
              <span style="font-size: 12.5px; font-weight: 600; color: ${lc.selectedPatternId === pat.id ? '#fff' : '#ccc'};">
                ${pat.id}. ${pat.name}
              </span>
            </div>
            <span style="font-size: 11px; font-weight: 600; color: ${solvedInPat === 10 ? '#00b8a3' : '#777'}; background: #262626; padding: 1px 6px; border-radius: 8px;">
              ${solvedInPat}/${allPatProblems.length}
            </span>
          </div>

          ${isPatternOpen ? `
            <div style="background: #141414; padding: 2px 0;">
              ${problems.map(prob => {
                const isSel = lc.selectedProblemId === prob.id;
                const done = isCompleted(prob.id);
                const probDiffColor = prob.difficulty === 'Easy' ? '#00b8a3' : prob.difficulty === 'Medium' ? '#ffc01e' : '#ff375f';
                return `
                  <div 
                    onclick="selectLcProblem('${prob.id}')"
                    style="padding: 7px 14px 7px 28px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; background: ${isSel ? '#242424' : 'transparent'}; border-left: 3px solid ${isSel ? '#00b8a3' : 'transparent'};"
                    onmouseover="if (!${isSel}) this.style.background='#1c1c1c'"
                    onmouseout="if (!${isSel}) this.style.background='transparent'"
                  >
                    <div style="display: flex; align-items: center; gap: 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      <span style="font-size: 12px; color: ${done ? '#00b8a3' : '#555'}; font-weight: 700;">
                        ${done ? '✓' : '○'}
                      </span>
                      <span style="font-size: 12px; color: ${isSel ? '#ffffff' : '#b8b8b8'}; font-weight: ${isSel ? '600' : '400'}; overflow: hidden; text-overflow: ellipsis;">
                        ${prob.id} ${prob.title}
                      </span>
                    </div>
                    <span style="font-size: 10px; font-weight: 600; color: ${probDiffColor}; flex-shrink: 0; margin-left: 6px;">
                      ${prob.difficulty}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>
      `;
    });

    return html;
  }

  // Render Center Tab Content
  function renderCenterTabContent(prob) {
    if (lc.activeTab === 'cheatsheet') {
      const pat = getPattern(prob.patternId);
      return renderPatternCheatsheetHtml(pat, prob);
    }
    if (lc.activeTab === 'solution') {
      return renderOptimalSolutionHtml(prob);
    }
    return renderSocraticMentorFlowHtml(prob);
  }

  // Format problem description
  function formatProblemDescription(text) {
    if (!text) return '';
    let out = escapeHtml(text);
    out = out.replace(/(Example \d+:)/g, '<b style="color: #ffffff; display: block; margin-top: 10px;">$1</b>');
    out = out.replace(/(Input:)/g, '<span style="color: #ffc01e; font-weight: 600;">$1</span>');
    out = out.replace(/(Output:)/g, '<span style="color: #00b8a3; font-weight: 600;">$1</span>');
    out = out.replace(/(Constraints:)/g, '<b style="color: #ffffff; display: block; margin-top: 12px;">$1</b>');
    return out;
  }

  // 7-Step Socratic Mentoring Flow HTML with Step 5 Gatekeeper
  function renderSocraticMentorFlowHtml(prob) {
    const curConfig = stepsConfig[lc.step - 1];
    const prevConfig = lc.step > 1 ? stepsConfig[lc.step - 2] : null;
    const nextConfig = lc.step < 7 ? stepsConfig[lc.step] : null;

    const isPassed = lc.testResults && lc.testResults.passed;
    const canMoveToStep6 = isCompleted(prob.id) || isPassed;

    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        
        <!-- TOP STEP NAVIGATION HEADER: PREV & NEXT BUTTONS -->
        <div style="display: flex; align-items: center; justify-content: space-between; background: #1c1c1c; border: 1px solid #2d2d2d; border-radius: 8px; padding: 8px 12px;">
          <button 
            onclick="navigateLcStep(-1)" 
            class="lc-btn-subtle" 
            ${lc.step === 1 ? 'disabled style="opacity: 0.35; cursor: not-allowed; padding: 5px 12px; font-size: 12px;"' : 'style="padding: 5px 12px; font-size: 12px; font-weight: 600;"'}
            title="${prevConfig ? 'Go back to Step ' + prevConfig.step + ': ' + prevConfig.label : 'Already at first step'}"
          >
            ‹ Prev Step
          </button>
          
          <div style="text-align: center;">
            <div style="font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.6px; color: #888;">Step ${lc.step} of 7</div>
            <div style="font-size: 13px; font-weight: 700; color: #00b8a3;">${curConfig.fullLabel}</div>
          </div>

          <button 
            onclick="navigateLcStep(1)" 
            class="lc-btn-subtle" 
            ${lc.step === 7 ? 'disabled style="opacity: 0.35; cursor: not-allowed; padding: 5px 12px; font-size: 12px;"' : 'style="padding: 5px 12px; font-size: 12px; font-weight: 600; color: #00b8a3; border-color: #00b8a340;"'}
            title="${nextConfig ? 'Advance to Step ' + nextConfig.step + ': ' + nextConfig.label : 'Already at final step'}"
          >
            Next Step ›
          </button>
        </div>

        <!-- 7 CLICKABLE STEP PILLS (WITH LOCK INDICATOR ON STEP 6) -->
        <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 2px;">
          ${stepsConfig.map(s => {
            const isCur = lc.step === s.step;
            const isPast = lc.step > s.step;
            const isStep6Locked = s.step >= 6 && !canMoveToStep6;

            return `
              <button 
                onclick="setLcStep(${s.step})" 
                class="lc-step-pill"
                style="border: 1px solid ${isCur ? '#3b82f6' : isPast ? '#00b8a340' : '#282828'}; background: ${isCur ? 'rgba(59,130,246,0.18)' : isPast ? 'rgba(0,184,163,0.08)' : '#181818'}; color: ${isCur ? '#60a5fa' : isPast ? '#00b8a3' : (isStep6Locked ? '#666' : '#888')};"
                title="Jump to Step ${s.step}: ${s.fullLabel} ${isStep6Locked ? '(Locked - Pass tests in Step 5)' : ''}"
              >
                <span style="display: block; font-size: 9px; opacity: 0.85;">STEP ${s.step} ${isStep6Locked ? '🔒' : ''}</span>
                ${s.label}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Problem Description Card -->
        <div style="background: #1e1e1e; border: 1px solid #2d2d2d; border-radius: 8px; padding: 16px 18px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <h2 style="font-size: 17px; font-weight: 700; color: #fff;">
              ${prob.id}. ${prob.title}
            </h2>
            <span style="font-size: 11px; color: #888; font-family: monospace;">Pattern: ${prob.patternName}</span>
          </div>
          <div style="font-size: 13.5px; line-height: 1.6; color: #d0d0d0; white-space: pre-line;">
            ${formatProblemDescription(prob.description)}
          </div>
        </div>

        <!-- ACTIVE SOCRATIC STEP DIALOGUE CARD -->
        <div style="background: #1b1e24; border: 1px solid #283344; border-radius: 8px; padding: 18px;">
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #283344;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 32px; height: 32px; border-radius: 6px; background: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 16px;">
                👨‍🏫
              </div>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: #fff;">LeetCode Socratic Mentor</div>
                <div style="font-size: 11px; color: #8cb4ff;">${curConfig.fullLabel}</div>
              </div>
            </div>

            <span style="font-size: 11px; background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); font-weight: 700; padding: 3px 8px; border-radius: 12px;">
              Step ${lc.step} / 7
            </span>
          </div>

          <!-- Dynamic Detailed Dialogue Content based on Step -->
          ${renderCurrentStepDialogue(prob)}

          <!-- BOTTOM STEP NAVIGATION FOOTER: PREV & NEXT BUTTONS -->
          <div style="margin-top: 22px; padding-top: 14px; border-top: 1px solid #283344; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            ${lc.step > 1 ? `
              <button onclick="navigateLcStep(-1)" class="lc-btn-subtle" style="display: flex; align-items: center; gap: 6px; padding: 7px 14px; font-size: 12px; font-weight: 600;">
                <span>‹</span> Previous: ${prevConfig ? prevConfig.label : 'Back'}
              </button>
            ` : `<div></div>`}

            <div style="display: flex; gap: 8px; align-items: center;">
              <span style="font-size: 11.5px; color: #777;">Step ${lc.step} of 7</span>
            </div>

            ${lc.step < 7 ? `
              <button 
                onclick="navigateLcStep(1)" 
                class="lc-btn-primary" 
                ${(lc.step === 5 && !canMoveToStep6) ? 'disabled style="opacity: 0.5; cursor: not-allowed; display: flex; align-items: center; gap: 6px; padding: 7px 18px; font-size: 12.5px; font-weight: 700; background: #333; color: #888;"' : 'style="display: flex; align-items: center; gap: 6px; padding: 7px 18px; font-size: 12.5px; font-weight: 700; background: #00b8a3; color: #000;"'}
              >
                ${lc.step === 5 && !canMoveToStep6 ? '🔒 Pass Tests to Unlock Step 6' : 'Next: ' + (nextConfig ? nextConfig.label : 'Advance') + ' ›'}
              </button>
            ` : `
              <button onclick="navigateLcProblem(1)" class="lc-btn-primary" style="display: flex; align-items: center; gap: 6px; padding: 7px 18px; font-size: 12.5px; font-weight: 700; background: #00b8a3; color: #000;">
                Next Problem in Pattern <span>›</span>
              </button>
            `}
          </div>

        </div>

      </div>
    `;
  }

  // Render dialogue content for current Socratic step
  function renderCurrentStepDialogue(prob) {
    const philosophy = getPatternPhilosophy(prob.patternId, prob.patternName);

    // STEP 1: COMPREHENSION
    if (lc.step === 1) {
      return `
        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
          <div>
            <b style="color: #fff; font-size: 14.5px;">Step 1: Deconstruct the Problem & Constraints</b>
            <p style="color: #94a3b8; margin-top: 4px;">
              Before writing code or jumping to algorithms, let's deconstruct what the problem demands and why simple brute force is unfeasible.
            </p>
          </div>

          <div style="background: #14171d; border: 1px solid #283344; border-radius: 6px; padding: 12px 14px;">
            <div style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; color: #60a5fa; margin-bottom: 6px; letter-spacing: 0.5px;">
              📋 I/O Contract & Data Types
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12.5px;">
              <div>
                <span style="color: #888;">Function Signature:</span><br>
                <code style="color: #ffc01e; font-family: 'JetBrains Mono', monospace;">${escapeHtml(prob.starterCode.split('\n')[0])}</code>
              </div>
              <div>
                <span style="color: #888;">Target Efficiency:</span><br>
                <b style="color: #00b8a3;">${prob.complexity}</b>
              </div>
            </div>
          </div>

          <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 6px; padding: 12px 14px;">
            <div style="font-weight: 700; color: #f87171; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
              <span>⚠️ The Brute Force Complexity Trap</span>
            </div>
            <p style="color: #cbd5e1; font-size: 13px; margin: 0;">
              A naive brute force approach (such as nested loops checking all combinations) requires <b>O(N²)</b> or <b>O(2ᴺ)</b> time.
              With input lengths up to 10⁵, 10¹⁰ operations would take over 10 seconds in Python (where standard runtimes allow ~10⁷ operations/second).
              Hence, nested loops will trigger a <b>Time Limit Exceeded (TLE)</b>.
            </p>
          </div>

          <div style="background: rgba(0, 184, 163, 0.08); border: 1px solid rgba(0, 184, 163, 0.25); border-radius: 6px; padding: 12px 14px;">
            <div style="font-weight: 700; color: #00b8a3; margin-bottom: 4px;">
              💡 The Core Constraint Clue
            </div>
            <p style="color: #cbd5e1; font-size: 13px; margin: 0;">
              ${philosophy}
            </p>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
            <button onclick="navigateLcStep(1)" class="lc-btn-primary" style="padding: 7px 18px; font-size: 12.5px; background: #2563eb; color: #fff; font-weight: 600;">
              Proceed to Step 2: Formulate Strategy →
            </button>
            <button onclick="requestMentorClarification()" class="lc-btn-subtle" style="padding: 7px 14px; font-size: 12.5px;">
              Explain in Simpler Terms
            </button>
          </div>
        </div>
      `;
    }

    // STEP 2: STRATEGY
    if (lc.step === 2) {
      return `
        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
          <div>
            <b style="color: #fff; font-size: 14.5px;">Step 2: Formulate Your Strategy (${prob.patternName})</b>
            <p style="color: #94a3b8; margin-top: 4px;">
              In an engineering interview, you should outline your strategy in plain words before typing code.
            </p>
          </div>

          <div style="background: #14171d; border: 1px solid #283344; border-radius: 6px; padding: 12px 14px;">
            <div style="font-size: 12px; font-weight: 700; color: #ffc01e; text-transform: uppercase; margin-bottom: 6px;">
              🧠 Strategic Blueprint for ${prob.patternName}:
            </div>
            <div style="font-size: 13px; color: #cbd5e1;">
              • <b>1. State Variables:</b> What variables or pointers will you track from the start?<br>
              • <b>2. Iteration Condition:</b> What invariant guards the while/for loop?<br>
              • <b>3. Monotonic Decision:</b> When do you increment, decrement, expand, or shrink state?<br>
              • <b>4. Termination & Fallback:</b> What do you return if no valid answer exists?
            </div>
          </div>

          <div>
            <label style="display: block; font-size: 11.5px; font-weight: 700; color: #8cb4ff; margin-bottom: 6px; text-transform: uppercase;">
              Explain Your Approach in Your Own Words:
            </label>
            <textarea 
              id="lc-approach-input"
              rows="4" 
              placeholder="e.g., I will initialize two pointers left=0 and right=len-1. Since the array is sorted, if arr[left] + arr[right] < target, I increment left to increase the sum..."
              style="width: 100%; background: #12151b; border: 1px solid #334155; border-radius: 6px; padding: 10px; color: #f1f5f9; font-size: 12.5px; font-family: sans-serif; resize: vertical; outline: none;"
            >${escapeHtml(lc.userApproach)}</textarea>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="submitLcApproach()" class="lc-btn-primary" style="padding: 7px 18px; font-size: 12.5px; background: #2563eb; color: #fff; font-weight: 600;">
              Submit Approach for Mentor Review
            </button>
            <button onclick="requestMentorHint()" class="lc-btn-subtle" style="padding: 7px 14px; font-size: 12.5px; color: #ffc01e;">
              💡 Request a Nudge
            </button>
            <button onclick="revealIntuitionWalkthrough()" class="lc-btn-subtle" style="padding: 7px 14px; font-size: 12.5px;">
              View Pattern Walkthrough
            </button>
          </div>
        </div>
      `;
    }

    // STEP 3: MENTOR REVIEW
    if (lc.step === 3) {
      const feedback = lc.mentorFeedback || evaluateUserApproach(lc.userApproach, prob);
      return `
        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
          <div>
            <b style="color: #fff; font-size: 14.5px;">Step 3: Mentor Review & Detailed Visual Trace</b>
            <p style="color: #94a3b8; margin-top: 4px;">
              Review the algorithmic critique below and trace through how the state evolves on the sample input.
            </p>
          </div>

          <div style="background: ${feedback.sound ? 'rgba(0,184,163,0.1)' : 'rgba(255,192,30,0.1)'}; border: 1px solid ${feedback.sound ? '#00b8a340' : '#ffc01e40'}; border-radius: 6px; padding: 12px 14px;">
            <div style="font-weight: 700; color: ${feedback.sound ? '#00b8a3' : '#ffc01e'}; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <span>${feedback.sound ? '✅ Approach Validated' : '💡 Mentor Guidance'}</span>
            </div>
            <div style="color: #cbd5e1; font-size: 13px; line-height: 1.5; white-space: pre-line;">
              ${feedback.message}
            </div>
          </div>

          <div style="background: #14171d; border: 1px solid #283344; border-radius: 6px; padding: 12px 14px;">
            <div style="font-size: 11.5px; font-weight: 700; color: #60a5fa; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
              🔍 Step-by-Step Operational Trace
            </div>
            <div style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
              <b>Core Invariant:</b> ${prob.approach}<br><br>
              <b>Why this avoids nested loops:</b> Because each decision discards candidates that cannot possibly be part of the solution, the search boundaries contract monotonically.
            </div>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="navigateLcStep(1)" class="lc-btn-primary" style="padding: 7px 18px; font-size: 12.5px; background: #00b8a3; color: #000; font-weight: 700;">
              Proceed to Step 4: Write Code →
            </button>
            <button onclick="navigateLcStep(-1)" class="lc-btn-subtle" style="padding: 7px 14px; font-size: 12.5px;">
              ✏️ Refine My Strategy
            </button>
            <button onclick="requestMentorHint()" class="lc-btn-subtle" style="padding: 7px 14px; font-size: 12.5px; color: #ffc01e;">
              💡 Progressive Hint (${lc.hintLevel}/3)
            </button>
          </div>
        </div>
      `;
    }

    // STEP 4: IMPLEMENTATION
    if (lc.step === 4) {
      return `
        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
          <div>
            <b style="color: #fff; font-size: 14.5px;">Step 4: Implementation Blueprint in Python 3</b>
            <p style="color: #94a3b8; margin-top: 4px;">
              Now translate the strategy into code in the editor on the right. Note that pressing <b>Enter after a colon (':')</b> automatically indents by 4 spaces.
            </p>
          </div>

          <div style="background: #14171d; border: 1px solid #283344; border-radius: 6px; padding: 12px 14px;">
            <div style="font-size: 12px; font-weight: 700; color: #00b8a3; text-transform: uppercase; margin-bottom: 6px;">
              ✅ Pre-Flight Implementation Checklist:
            </div>
            <div style="font-size: 12.5px; color: #cbd5e1; line-height: 1.6;">
              1. <b>Zero-Indexing:</b> Python arrays are 0-indexed; the final element is at index <code>len(arr) - 1</code>.<br>
              2. <b>Termination Condition:</b> Ensure loop boundary checks prevent infinite loops (e.g. <code>while left &lt; right</code>).<br>
              3. <b>Simultaneous Assignment:</b> Use Python idioms like <code>left, right = 0, len(arr) - 1</code>.<br>
              4. <b>Guard Against Missing Answers:</b> Return the required default (e.g. <code>[-1, -1]</code>) if no pair matches.
            </div>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="runLcCode()" class="lc-btn-primary" style="padding: 7px 18px; font-size: 12.5px; background: #3b82f6; color: #fff; font-weight: 600;">
              ▶ Run Code (Ctrl+Enter)
            </button>
            <button onclick="requestMentorHint()" class="lc-btn-subtle" style="padding: 7px 14px; font-size: 12.5px; color: #ffc01e;">
              💡 Implementation Hint
            </button>
            <button onclick="navigateLcStep(1)" class="lc-btn-subtle" style="padding: 7px 14px; font-size: 12.5px;">
              Proceed to Step 5: Test & Diagnostics →
            </button>
          </div>
        </div>
      `;
    }

    // STEP 5: CODE REVIEW & TEST (GATEKEEPER FOR STEP 6)
    if (lc.step === 5) {
      const results = lc.testResults;
      const isPassed = results && results.passed;

      if (!isPassed) {
        return `
          <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
            <div>
              <b style="color: #fff; font-size: 14.5px;">Step 5: Code Verification & Test Suite Execution</b>
              <p style="color: #94a3b8; margin-top: 4px;">
                Your code must be verified against all 3 test cases before Step 6 can be unlocked.
              </p>
            </div>

            <!-- Lock Banner -->
            <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; padding: 14px;">
              <div style="font-weight: 700; color: #ef4444; font-size: 13.5px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                <span>🔒 Step 6 Locked: Pass All Test Cases to Unlock</span>
              </div>
              <div style="font-size: 12.5px; color: #cbd5e1; line-height: 1.5;">
                ${results ? `<b>Status: ${results.status || 'Tests Failed'}.</b> ${results.error || 'Your code did not match all expected test outputs. Check the bottom console for details.'}` : 'You have not run your code yet. Click <b>Run</b> or press <b>Ctrl + Enter</b> in the editor to execute test cases.'}
              </div>
            </div>

            <!-- Controls -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button onclick="runLcCode()" class="lc-btn-primary" style="padding: 7px 20px; font-size: 12.5px; background: #3b82f6; color: #fff; font-weight: 700;">
                ▶ Run Code Against 3 Testcases
              </button>
              <button disabled class="lc-btn-subtle" style="padding: 7px 18px; font-size: 12.5px; opacity: 0.45; cursor: not-allowed; border-color: #ef444450; color: #ef4444;">
                🔒 Unlock Step 6 (Tests Incomplete)
              </button>
              <button onclick="requestMentorHint()" class="lc-btn-subtle" style="padding: 7px 14px; font-size: 12.5px; color: #ffc01e;">
                💡 Need a Hint?
              </button>
              <button onclick="forceUnlockSolution()" class="lc-btn-subtle" style="padding: 7px 12px; font-size: 11.5px; color: #888;">
                I'm stuck — unlock solution
              </button>
            </div>
          </div>
        `;
      } else {
        return `
          <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
            <div>
              <b style="color: #fff; font-size: 14.5px;">Step 5: Code Verification Complete!</b>
              <p style="color: #94a3b8; margin-top: 4px;">
                Your Python implementation has been successfully verified.
              </p>
            </div>

            <!-- Pass Banner -->
            <div style="background: rgba(0, 184, 163, 0.1); border: 1px solid rgba(0, 184, 163, 0.35); border-radius: 6px; padding: 14px;">
              <div style="font-weight: 700; color: #00b8a3; font-size: 13.5px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                <span>✅ All 3 Test Cases Passed! (3/3)</span>
              </div>
              <div style="font-size: 12.5px; color: #cbd5e1; line-height: 1.5;">
                Your algorithm produced correct outputs across all test scenarios in ${results.runtime || 38}ms. Step 6 (Optimal Reference Solution & Big-O Proof) is now unlocked!
              </div>
            </div>

            <!-- Controls -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button onclick="navigateLcStep(1)" class="lc-btn-primary" style="padding: 7px 20px; font-size: 12.5px; background: #00b8a3; color: #000; font-weight: 700;">
                ✅ Tests Passed → Proceed to Step 6: Optimal Solution & Big-O ›
              </button>
              <button onclick="setLcStep(4)" class="lc-btn-subtle" style="padding: 7px 14px; font-size: 12.5px;">
                ✏️ Edit Code Further
              </button>
            </div>
          </div>
        `;
      }
    }

    // STEP 6: OPTIMAL SOLUTION
    if (lc.step === 6) {
      const lineExplanations = generateLineByLineExplanation(prob.solution);
      return `
        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
              <b style="color: #fff; font-size: 14.5px;">Step 6: Optimal Reference Solution & Line-by-Line Breakdown</b>
              <p style="color: #94a3b8; margin-top: 4px;">
                Study how each line of the reference code enforces the algorithmic invariant.
              </p>
            </div>
            <button onclick="copySolutionToEditor()" class="lc-btn-subtle" style="padding: 4px 10px; font-size: 11.5px;">
              📥 Insert Code
            </button>
          </div>

          <div style="background: #12151b; border: 1px solid #283344; border-radius: 6px; padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #e2e8f0; overflow-x: auto; white-space: pre;">
${escapeHtml(prob.solution)}
          </div>

          <div style="background: #14171d; border: 1px solid #283344; border-radius: 6px; overflow: hidden;">
            <div style="padding: 8px 12px; background: #1a1f29; font-size: 11.5px; font-weight: 700; color: #60a5fa; text-transform: uppercase;">
              📖 Line-by-Line Code Explanation
            </div>
            <div style="max-height: 240px; overflow-y: auto; padding: 8px 12px; font-size: 12.5px;">
              ${lineExplanations.map(item => `
                <div style="padding: 6px 0; border-bottom: 1px solid #222b38;">
                  <div style="font-family: 'JetBrains Mono', monospace; color: #ffc01e; font-size: 11.5px;">
                    Line ${item.lineNum}: ${escapeHtml(item.code)}
                  </div>
                  <div style="color: #94a3b8; margin-top: 2px;">
                    ${item.explanation}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="background: #14171d; border: 1px solid #283344; border-radius: 6px; padding: 10px 12px;">
              <div style="font-size: 11px; font-weight: 700; color: #8cb4ff; text-transform: uppercase;">Time Complexity</div>
              <div style="font-size: 14px; font-weight: 700; color: #00b8a3; margin: 4px 0;">${prob.complexity.split(',')[0]}</div>
              <div style="font-size: 11.5px; color: #888;">Every element or boundary is checked at most once or twice.</div>
            </div>
            <div style="background: #14171d; border: 1px solid #283344; border-radius: 6px; padding: 10px 12px;">
              <div style="font-size: 11px; font-weight: 700; color: #8cb4ff; text-transform: uppercase;">Space Complexity</div>
              <div style="font-size: 14px; font-weight: 700; color: #00b8a3; margin: 4px 0;">${prob.complexity.split(',')[1]}</div>
              <div style="font-size: 11.5px; color: #888;">Allocates strictly constant or minimal auxiliary memory.</div>
            </div>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="navigateLcStep(1)" class="lc-btn-primary" style="padding: 7px 18px; font-size: 12.5px; background: #00b8a3; color: #000; font-weight: 700;">
              Proceed to Step 7: Pattern Mastery Recap →
            </button>
            <button onclick="copySolutionToEditor()" class="lc-btn-subtle" style="padding: 7px 14px; font-size: 12.5px;">
              📥 Copy into Editor
            </button>
          </div>
        </div>
      `;
    }

    // STEP 7: PATTERN MASTERY
    if (lc.step === 7) {
      markProblemCompleted(prob.id);
      const followUps = getFaangFollowUps(prob.patternId, prob);

      return `
        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">🏆</span>
            <div>
              <b style="font-size: 15px; color: #00b8a3;">Problem ${prob.id} Mastered!</b>
              <div style="font-size: 11.5px; color: #888;">Marked as completed (✓) in your curriculum progress</div>
            </div>
          </div>

          <div style="background: rgba(0,184,163,0.08); border: 1px solid #00b8a330; border-radius: 6px; padding: 14px;">
            <div style="font-size: 11.5px; font-weight: 800; text-transform: uppercase; color: #00b8a3; margin-bottom: 6px; letter-spacing: 0.5px;">
              💎 Key Interview Invariant (${prob.patternName})
            </div>
            <div style="font-size: 13px; color: #e2e8f0; line-height: 1.5;">
              ${prob.keyLesson}
            </div>
          </div>

          <div style="background: #14171d; border: 1px solid #283344; border-radius: 6px; padding: 12px 14px;">
            <div style="font-size: 12px; font-weight: 700; color: #ffc01e; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">
              🎯 Typical FAANG Interview Follow-Up Questions
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12.5px;">
              ${followUps.map(f => `
                <div>
                  <b style="color: #60a5fa;">Q: ${f.q}</b><br>
                  <span style="color: #94a3b8;">A: ${f.a}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px;">
            <button onclick="navigateLcProblem(1)" class="lc-btn-primary" style="padding: 7px 18px; font-size: 12.5px; background: #00b8a3; color: #000; font-weight: 700;">
              Next Problem in Pattern (${prob.patternName}) →
            </button>
            <button onclick="setLcStep(1)" class="lc-btn-subtle" style="padding: 7px 14px; font-size: 12.5px;">
              ↺ Review from Step 1
            </button>
          </div>
        </div>
      `;
    }

    return '';
  }

  // Force unlock solution if user is completely stuck
  window.forceUnlockSolution = function() {
    if (confirm("Are you sure you want to reveal the reference solution before all tests pass? Trying to solve it yourself first will build stronger problem-solving intuition!")) {
      const prob = getProblem(lc.selectedProblemId);
      lc.testResults = {
        passed: true,
        status: 'Solution Unlocked',
        runtime: 40,
        cases: prob.testCases ? prob.testCases.map(c => ({ passed: true, input: c.input, actual: c.expected, expected: c.expected })) : []
      };
      setLcStep(6);
    }
  };

  // Socratic Evaluation of Learner's Approach
  function evaluateUserApproach(text, prob) {
    if (!text || text.trim().length < 15) {
      return {
        sound: false,
        message: `Your approach description is a bit brief! In an interview, communicating your thought process is half the battle.\n\nTake a moment to describe: How will you track elements? For **${prob.patternName}**, consider: ${prob.approach.slice(0, 75)}... Try typing a sentence or two explaining the state you track.`
      };
    }

    const t = text.toLowerCase();
    const patId = prob.patternId;

    let matchedKeywords = 0;
    let suggestions = [];

    if (patId === 1) { // Two Pointers
      if (t.includes('pointer') || t.includes('left') || t.includes('right') || t.includes('start') || t.includes('end')) matchedKeywords++;
      if (t.includes('sort') || t.includes('inward') || t.includes('sum') || t.includes('shrink')) matchedKeywords++;
      if (t.includes('nested') || t.includes('o(n^2)') || t.includes('brute')) {
        suggestions.push("Notice the input properties (e.g. sorted order)! A brute-force nested loop is O(n²), whereas two pointers achieve linear O(n).");
      }
    } else if (patId === 2) { // Sliding Window
      if (t.includes('window') || t.includes('expand') || t.includes('shrink') || t.includes('contract')) matchedKeywords++;
      if (t.includes('start') || t.includes('end') || t.includes('frequency') || t.includes('dict') || t.includes('k')) matchedKeywords++;
    } else if (patId === 3) { // Fast & Slow
      if (t.includes('slow') || t.includes('fast') || t.includes('tortoise') || t.includes('hare')) matchedKeywords++;
      if (t.includes('cycle') || t.includes('step') || t.includes('middle') || t.includes('2x')) matchedKeywords++;
    } else if (patId === 4) { // Merge Intervals
      if (t.includes('sort') || t.includes('interval') || t.includes('overlap') || t.includes('start') || t.includes('end')) matchedKeywords++;
    } else if (patId === 5) { // Cyclic Sort
      if (t.includes('cyclic') || t.includes('swap') || t.includes('index') || t.includes('place') || t.includes('1 to n')) matchedKeywords++;
    } else if (patId === 6) { // LinkedList In-place Reversal
      if (t.includes('prev') || t.includes('curr') || t.includes('next') || t.includes('reverse') || t.includes('pointer')) matchedKeywords++;
    } else if (patId === 7) { // Tree BFS
      if (t.includes('queue') || t.includes('level') || t.includes('bfs') || t.includes('deque')) matchedKeywords++;
    } else if (patId === 8) { // Tree DFS
      if (t.includes('dfs') || t.includes('recursion') || t.includes('root') || t.includes('base case') || t.includes('path')) matchedKeywords++;
    } else if (patId === 9) { // Two Heaps
      if (t.includes('heap') || t.includes('median') || t.includes('min') || t.includes('max') || t.includes('balance')) matchedKeywords++;
    } else if (patId === 10) { // Subsets / Backtracking
      if (t.includes('backtrack') || t.includes('subset') || t.includes('decision') || t.includes('include') || t.includes('exclude')) matchedKeywords++;
    } else if (patId === 11) { // Modified Binary Search
      if (t.includes('binary') || t.includes('mid') || t.includes('low') || t.includes('high') || t.includes('sorted')) matchedKeywords++;
    } else if (patId === 12) { // Top K Elements
      if (t.includes('heap') || t.includes('k') || t.includes('priority') || t.includes('frequency')) matchedKeywords++;
    } else if (patId === 13) { // K-way Merge
      if (t.includes('merge') || t.includes('heap') || t.includes('pointer') || t.includes('lists')) matchedKeywords++;
    } else if (patId === 14) { // Knapsack DP
      if (t.includes('dp') || t.includes('memo') || t.includes('table') || t.includes('subproblem') || t.includes('choice')) matchedKeywords++;
    } else if (patId === 15) { // Graphs
      if (t.includes('graph') || t.includes('visited') || t.includes('bfs') || t.includes('dfs') || t.includes('degree')) matchedKeywords++;
    }

    if (matchedKeywords >= 1) {
      return {
        sound: true,
        message: `Strong intuition! You clearly recognized the core mechanics of ${prob.patternName}.\n\nSpecifically: "${prob.approach}"\n\nYour strategy will run in optimal ${prob.complexity.split(',')[0]} time without wasting memory.`
      };
    }

    let advice = suggestions.length > 0 ? suggestions.join('\n') : `Good start! To make this optimal using ${prob.patternName}, consider: ${prob.approach}`;
    return {
      sound: false,
      message: advice
    };
  }

  // Pattern Cheatsheet Tab HTML
  function renderPatternCheatsheetHtml(pat, prob) {
    const philosophy = getPatternPhilosophy(pat.id, pat.name);
    return `
      <div style="background: #1e1e1e; border: 1px solid #2d2d2d; border-radius: 8px; padding: 20px; font-size: 13.5px; line-height: 1.6; color: #d4d4d4;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #fff;">
            Pattern ${pat.id}: ${pat.name}
          </h2>
          <span style="font-size: 12px; background: #262626; color: #00b8a3; font-weight: 600; padding: 3px 8px; border-radius: 4px;">
            10 Problems in Guide
          </span>
        </div>

        <p style="color: #cbd5e1; margin-bottom: 14px;">
          ${pat.description}
        </p>

        <div style="background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.3); border-radius: 6px; padding: 14px; margin-bottom: 16px;">
          <div style="font-size: 12px; font-weight: 700; color: #60a5fa; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
            📐 Core Mathematical Philosophy
          </div>
          <div style="color: #cbd5e1; font-size: 13px;">
            ${philosophy}
          </div>
        </div>

        <div style="background: #141414; border: 1px solid #282828; border-radius: 6px; padding: 14px; margin-bottom: 16px;">
          <div style="font-size: 12px; font-weight: 700; color: #ffc01e; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">
            🔍 When to Use This Pattern
          </div>
          <ul style="padding-left: 20px; color: #a0a0a0; font-size: 13px;">
            <li>Input exhibits sorted arrays, ranges, sequences, or trees/graphs.</li>
            <li>Searching for pairs, triplets, contiguous windows, or topological dependencies.</li>
            <li>Reducing an O(n²) or O(2ⁿ) exhaustive search into O(n) or O(n log n).</li>
          </ul>
        </div>

        <div style="background: #141414; border: 1px solid #282828; border-radius: 6px; padding: 14px;">
          <div style="font-size: 12px; font-weight: 700; color: #3b82f6; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">
            💡 Typical Algorithmic Template
          </div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #e2e8f0; line-height: 1.5; white-space: pre-wrap;">
${escapeHtml(prob.solution.split('\n').slice(0, 6).join('\n') + '\n    # ... logic continues')}
          </div>
        </div>
      </div>
    `;
  }

  // Optimal Solution Tab HTML
  function renderOptimalSolutionHtml(prob) {
    const lineExplanations = generateLineByLineExplanation(prob.solution);
    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: #1e1e1e; border: 1px solid #2d2d2d; border-radius: 8px; padding: 18px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="font-size: 16px; font-weight: 700; color: #fff;">
              Optimal Reference Solution
            </h3>
            <button onclick="copySolutionToEditor()" class="lc-btn-subtle" style="padding: 4px 10px; font-size: 11.5px;">
              📥 Insert into Editor
            </button>
          </div>

          <div style="background: #12151b; border: 1px solid #262c37; border-radius: 6px; padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #e2e8f0; overflow-x: auto; white-space: pre; margin-bottom: 14px;">
${escapeHtml(prob.solution)}
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px;">
            <div style="background: #161a22; border: 1px solid #252e3d; border-radius: 6px; padding: 10px 12px;">
              <span style="font-size: 11px; font-weight: 700; color: #8cb4ff; text-transform: uppercase;">Time Complexity</span>
              <div style="font-size: 13.5px; font-weight: 700; color: #00b8a3; margin-top: 4px;">${prob.complexity.split(',')[0] || 'O(n)'}</div>
            </div>
            <div style="background: #161a22; border: 1px solid #252e3d; border-radius: 6px; padding: 10px 12px;">
              <span style="font-size: 11px; font-weight: 700; color: #8cb4ff; text-transform: uppercase;">Space Complexity</span>
              <div style="font-size: 13.5px; font-weight: 700; color: #00b8a3; margin-top: 4px;">${prob.complexity.split(',')[1] || 'O(1)'}</div>
            </div>
          </div>

          <div style="background: #14171d; border: 1px solid #283344; border-radius: 6px; overflow: hidden; margin-bottom: 14px;">
            <div style="padding: 8px 12px; background: #1a1f29; font-size: 11.5px; font-weight: 700; color: #60a5fa; text-transform: uppercase;">
              📖 Detailed Line-by-Line Code Breakdown
            </div>
            <div style="max-height: 240px; overflow-y: auto; padding: 8px 12px; font-size: 12.5px;">
              ${lineExplanations.map(item => `
                <div style="padding: 6px 0; border-bottom: 1px solid #222b38;">
                  <div style="font-family: 'JetBrains Mono', monospace; color: #ffc01e; font-size: 11.5px;">
                    Line ${item.lineNum}: ${escapeHtml(item.code)}
                  </div>
                  <div style="color: #94a3b8; margin-top: 2px;">
                    ${item.explanation}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="background: rgba(0,184,163,0.08); border: 1px solid #00b8a330; border-radius: 6px; padding: 12px 14px;">
            <div style="font-size: 11.5px; font-weight: 700; color: #00b8a3; text-transform: uppercase; margin-bottom: 4px;">
              Pattern Principle
            </div>
            <div style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
              ${prob.keyLesson}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Line numbers updater
  function updateLcLineNumbers() {
    const editor = document.getElementById('lc-code-editor');
    const gutter = document.getElementById('lc-line-numbers');
    if (!editor || !gutter) return;
    const lineCount = (editor.value.match(/\n/g) || []).length + 1;
    let nums = '';
    for (let i = 1; i <= lineCount; i++) nums += i + '<br>';
    gutter.innerHTML = nums;
  }

  // Event handlers
  window.handleLcEditorInput = function(val) {
    lc.editorCode = val;
    localStorage.setItem(`forge_lc_code_${lc.selectedProblemId}`, val);
    updateLcLineNumbers();
  };

  window.toggleLcSidebar = function() {
    lc.collapsedSidebar = !lc.collapsedSidebar;
    window.renderLeetCodeWorkspace();
  };

  window.handleLcSearch = function(query) {
    lc.searchQuery = query;
    const list = document.getElementById('lc-pattern-list');
    if (list) list.innerHTML = renderPatternAccordionHtml();
  };

  window.filterLcDifficulty = function(diff) {
    lc.difficultyFilter = diff;
    const list = document.getElementById('lc-pattern-list');
    if (list) list.innerHTML = renderPatternAccordionHtml();
  };

  window.toggleLcPatternAccordion = function(patternId) {
    lc.selectedPatternId = lc.selectedPatternId === patternId ? null : patternId;
    const list = document.getElementById('lc-pattern-list');
    if (list) list.innerHTML = renderPatternAccordionHtml();
  };

  window.selectLcProblem = function(probId) {
    lc.selectedProblemId = probId;
    localStorage.setItem('forge_lc_problem', probId);
    const prob = getProblem(probId);
    if (prob) lc.selectedPatternId = prob.patternId;
    localStorage.setItem('forge_lc_pattern', lc.selectedPatternId);
    window.renderLeetCodeWorkspace();
  };

  window.navigateLcProblem = function(delta) {
    if (!window.LEETCODE_PROBLEMS) return;
    const curIdx = window.LEETCODE_PROBLEMS.findIndex(p => p.id === lc.selectedProblemId);
    if (curIdx === -1) return;
    let nextIdx = curIdx + delta;
    if (nextIdx < 0) nextIdx = window.LEETCODE_PROBLEMS.length - 1;
    if (nextIdx >= window.LEETCODE_PROBLEMS.length) nextIdx = 0;
    selectLcProblem(window.LEETCODE_PROBLEMS[nextIdx].id);
  };

  window.switchLcTab = function(tab) {
    lc.activeTab = tab;
    const prob = getProblem(lc.selectedProblemId);
    const container = document.getElementById('lc-center-content');
    if (container) container.innerHTML = renderCenterTabContent(prob);
    
    document.querySelectorAll('.lc-tab-btn').forEach(btn => {
      if (btn.innerText.includes('Mentor') && tab === 'mentor') btn.classList.add('active');
      else if (btn.innerText.includes('Cheatsheet') && tab === 'cheatsheet') btn.classList.add('active');
      else if (btn.innerText.includes('Solution') && tab === 'solution') btn.classList.add('active');
      else btn.classList.remove('active');
    });
  };

  // STEP NAVIGATION: FORWARD & BACKWARD WITH GATEKEEPER
  window.setLcStep = function(stepNum) {
    if (stepNum < 1 || stepNum > 7) return;

    const prob = getProblem(lc.selectedProblemId);
    const isPassed = lc.testResults && lc.testResults.passed;
    const canMoveToStep6 = isCompleted(prob.id) || isPassed;

    // Gatekeeper: Do not allow moving to Step 6 or 7 unless tests passed or problem completed
    if (stepNum >= 6 && !canMoveToStep6) {
      stepNum = 5;
      if (typeof window.playSound === 'function') window.playSound('fail');
      alert("🔒 Step 6 is locked! You must run your code and pass all 3 test cases in Step 5 before unlocking the reference solution.");
    }

    lc.step = stepNum;
    localStorage.setItem(`forge_lc_step_${lc.selectedProblemId}`, stepNum);
    lc.activeTab = 'mentor';

    const container = document.getElementById('lc-center-content');
    if (container) {
      container.innerHTML = renderCenterTabContent(prob);
      container.scrollTop = 0;
    }
  };

  window.navigateLcStep = function(delta) {
    let next = lc.step + delta;
    if (next < 1) next = 1;
    if (next > 7) next = 7;
    window.setLcStep(next);
  };

  window.submitLcApproach = function() {
    const input = document.getElementById('lc-approach-input');
    if (input) lc.userApproach = input.value;
    const prob = getProblem(lc.selectedProblemId);
    lc.mentorFeedback = evaluateUserApproach(lc.userApproach, prob);
    setLcStep(3);
  };

  window.requestMentorHint = function() {
    const prob = getProblem(lc.selectedProblemId);
    lc.hintLevel = (lc.hintLevel % 3) + 1;
    
    let hintText = "";
    if (lc.hintLevel === 1) {
      hintText = `💡 <b>Hint 1 (Nudge):</b> Remember this problem falls under <b>${prob.patternName}</b>. How can you prune branches or update pointers monotonically?`;
    } else if (lc.hintLevel === 2) {
      hintText = `💡 <b>Hint 2 (Direction):</b> ${prob.approach}`;
    } else {
      hintText = `💡 <b>Hint 3 (Walkthrough):</b> Start with: <code>${escapeHtml(prob.solution.split('\n')[1] || '')}</code>, then evaluate the condition inside the loop.`;
    }

    lc.mentorFeedback = {
      sound: true,
      message: hintText
    };
    setLcStep(3);
  };

  window.requestMentorClarification = function() {
    const prob = getProblem(lc.selectedProblemId);
    lc.mentorFeedback = {
      sound: true,
      message: `Here is the goal in plain terms:\n\nWe need to process the input according to the rule: <b>${prob.title}</b>.\nLook at Example 1: input matches the requirement and immediately produces the required output. Your goal is to write a Python function that does this dynamically for any valid input under the constraints.`
    };
    setLcStep(3);
  };

  window.revealIntuitionWalkthrough = function() {
    const prob = getProblem(lc.selectedProblemId);
    lc.mentorFeedback = {
      sound: true,
      message: `<b>Pattern Intuition Walkthrough:</b>\n\n${prob.approach}\n\nNotice that by exploiting the structure of the data, we only need a single pass or logarithmic steps!`
    };
    setLcStep(3);
  };

  window.resetLcEditor = function() {
    const prob = getProblem(lc.selectedProblemId);
    if (!prob) return;
    if (confirm('Reset editor to starter code?')) {
      lc.editorCode = prob.starterCode;
      localStorage.removeItem(`forge_lc_code_${prob.id}`);
      const editor = document.getElementById('lc-code-editor');
      if (editor) editor.value = lc.editorCode;
      updateLcLineNumbers();
    }
  };

  window.copySolutionToEditor = function() {
    const prob = getProblem(lc.selectedProblemId);
    if (!prob) return;
    lc.editorCode = prob.solution;
    localStorage.setItem(`forge_lc_code_${prob.id}`, prob.solution);
    const editor = document.getElementById('lc-code-editor');
    if (editor) editor.value = lc.editorCode;
    updateLcLineNumbers();
    if (typeof window.playSound === 'function') window.playSound('click');
  };

  // ==============================================================
  // GENUINE PYTHON EXECUTION & TESTCASE VERIFICATION ENGINE (SKULPT)
  // ==============================================================

  function pyLiteral(val) {
    if (val === null || val === undefined) return 'None';
    if (typeof val === 'boolean') return val ? 'True' : 'False';
    if (typeof val === 'string') return JSON.stringify(val);
    if (typeof val === 'number') return String(val);
    if (Array.isArray(val)) {
      return '[' + val.map(pyLiteral).join(', ') + ']';
    }
    if (typeof val === 'object') {
      const items = Object.entries(val).map(([k, v]) => `${JSON.stringify(k)}: ${pyLiteral(v)}`);
      return '{' + items.join(', ') + '}';
    }
    return String(val);
  }

  function parseAndAlignArgs(inputStr, formalParams) {
    if (!inputStr || !inputStr.trim()) return [];

    const parts = [];
    let cur = '';
    let depth = 0;
    let inQuote = null;

    for (let i = 0; i < inputStr.length; i++) {
      const ch = inputStr[i];
      if (inQuote) {
        cur += ch;
        if (ch === inQuote && inputStr[i - 1] !== '\\') inQuote = null;
      } else {
        if (ch === '"' || ch === "'") {
          inQuote = ch;
          cur += ch;
        } else if (ch === '[' || ch === '(' || ch === '{') {
          depth++;
          cur += ch;
        } else if (ch === ']' || ch === ')' || ch === '}') {
          depth--;
          cur += ch;
        } else if (ch === ',' && depth === 0) {
          parts.push(cur.trim());
          cur = '';
        } else {
          cur += ch;
        }
      }
    }
    if (cur.trim()) parts.push(cur.trim());

    const namedArgs = {};
    const unassigned = [];

    for (const part of parts) {
      const eqIdx = part.indexOf('=');
      if (eqIdx !== -1) {
        const key = part.substring(0, eqIdx).trim().toLowerCase();
        const valStr = part.substring(eqIdx + 1).trim();
        let val;
        try {
          val = JSON.parse(valStr.replace(/'/g, '"').replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false').replace(/\bNone\b/g, 'null'));
        } catch (e) {
          val = valStr;
        }
        namedArgs[key] = val;
      } else {
        let val;
        try {
          val = JSON.parse(part.replace(/'/g, '"').replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false').replace(/\bNone\b/g, 'null'));
        } catch (e) {
          val = part;
        }
        unassigned.push(val);
      }
    }

    if (formalParams && formalParams.length > 0) {
      const alignedArgs = new Array(formalParams.length).fill(undefined);
      const usedFormalIndices = new Set();

      // 1. Match named arguments by key
      formalParams.forEach((param, pIdx) => {
        const pLower = param.toLowerCase();
        for (const [key, val] of Object.entries(namedArgs)) {
          if (key === pLower || key.startsWith(pLower) || pLower.startsWith(key) || (pLower === 's' && key === 'string') || (pLower === 'arr' && key === 'nums')) {
            alignedArgs[pIdx] = val;
            usedFormalIndices.add(pIdx);
            delete namedArgs[key];
            break;
          }
        }
      });

      // 2. Unassigned values fill empty parameter slots
      for (let pIdx = 0; pIdx < formalParams.length; pIdx++) {
        if (!usedFormalIndices.has(pIdx) && unassigned.length > 0) {
          alignedArgs[pIdx] = unassigned.shift();
          usedFormalIndices.add(pIdx);
        }
      }

      // 3. Remaining named args fill remaining slots
      const remainingNamed = Object.values(namedArgs);
      for (let pIdx = 0; pIdx < formalParams.length; pIdx++) {
        if (!usedFormalIndices.has(pIdx) && remainingNamed.length > 0) {
          alignedArgs[pIdx] = remainingNamed.shift();
          usedFormalIndices.add(pIdx);
        }
      }

      while (unassigned.length > 0) {
        alignedArgs.push(unassigned.shift());
      }

      return alignedArgs;
    }

    return [...unassigned, ...Object.values(namedArgs)];
  }

  function comparePythonOutputs(actual, expected) {
    if (actual === expected) return true;
    let expVal = expected;
    if (typeof expected === 'string') {
      const trimmed = expected.trim();
      if (trimmed === 'True') expVal = true;
      else if (trimmed === 'False') expVal = false;
      else if (trimmed === 'None') expVal = null;
      else if (/^-?\d+(\.\d+)?$/.test(trimmed)) expVal = Number(trimmed);
      else if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
        try {
          expVal = JSON.parse(trimmed.replace(/'/g, '"').replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false').replace(/\bNone\b/g, 'null'));
        } catch (e) {
          expVal = trimmed;
        }
      } else if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        expVal = trimmed.slice(1, -1);
      }
    }

    // Numbers: integer and float equivalence (9.0 === 9)
    if (typeof actual === 'number' && typeof expVal === 'number') {
      return Math.abs(actual - expVal) < 1e-6;
    }

    // Booleans
    if (typeof actual === 'boolean' && typeof expVal === 'boolean') {
      return actual === expVal;
    }

    // Null / None
    if (actual === null && expVal === null) {
      return true;
    }

    // Arrays / Lists
    if (Array.isArray(actual) && Array.isArray(expVal)) {
      if (actual.length !== expVal.length) return false;
      let allMatch = true;
      for (let i = 0; i < actual.length; i++) {
        if (!comparePythonOutputs(actual[i], expVal[i])) {
          allMatch = false;
          break;
        }
      }
      if (allMatch) return true;

      // Sorted match fallback (e.g. 3Sum triplets or anagram indices)
      const sortKey = (x) => JSON.stringify(Array.isArray(x) ? [...x].sort() : x);
      try {
        const sortedActual = [...actual].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
        const sortedExp = [...expVal].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
        return JSON.stringify(sortedActual) === JSON.stringify(sortedExp);
      } catch (e) {
        return false;
      }
    }

    // Strings
    if (typeof actual === 'string' && typeof expVal === 'string') {
      return actual.trim().replace(/^['"]|['"]$/g, '') === expVal.trim().replace(/^['"]|['"]$/g, '');
    }

    return String(actual).trim().replace(/\s+/g, ' ').replace(/'/g, '"') === String(expected).trim().replace(/\s+/g, ' ').replace(/'/g, '"');
  }

  function formatPythonValue(val) {
    if (val === null || val === undefined) return 'None';
    if (typeof val === 'boolean') return val ? 'True' : 'False';
    if (Array.isArray(val)) {
      return '[' + val.map(formatPythonValue).join(', ') + ']';
    }
    if (typeof val === 'string') return `"${val}"`;
    return String(val);
  }

  function executePythonSubmission(code, prob, testCases) {
    const startTime = Date.now();
    const trimmed = code.trim();

    // 1. Incomplete check
    const isOnlyPass = (trimmed.includes('pass') && trimmed.length < 60) || !trimmed.includes('return');
    if (isOnlyPass) {
      return {
        passed: false,
        status: 'Incomplete',
        error: "NotImplementedError: function body is empty or contains 'pass'. Please implement your logic before running tests.",
        runtime: 4,
        passedCount: `0/${testCases.length}`,
        cases: testCases.map((c, idx) => ({ id: c.id || (idx + 1), name: c.name || `Case ${idx + 1}`, passed: false, input: c.input, actual: 'None', expected: c.expected }))
      };
    }

    const starterMatch = prob.starterCode.match(/def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)/);
    const expectedFuncName = starterMatch ? starterMatch[1] : null;
    const formalParams = starterMatch ? starterMatch[2].split(',').map(x => x.trim().split(':')[0].split('=')[0].trim()).filter(Boolean) : [];

    let targetFuncName = expectedFuncName;
    if (expectedFuncName && !code.includes(`def ${expectedFuncName}`)) {
      const userFuncMatch = code.match(/def\s+([a-zA-Z0-9_]+)\s*\(/);
      if (userFuncMatch) targetFuncName = userFuncMatch[1];
    }

    if (!targetFuncName) {
      return {
        passed: false,
        status: 'Syntax Error',
        error: "SyntaxError: No function definition found. Make sure your code starts with 'def ...':",
        runtime: 4,
        passedCount: `0/${testCases.length}`,
        cases: testCases.map((c, idx) => ({ id: c.id || (idx + 1), name: c.name || `Case ${idx + 1}`, passed: false, input: c.input, actual: 'SyntaxError', expected: c.expected }))
      };
    }

    const Sk = (typeof window !== 'undefined' && window.Sk) ? window.Sk : null;

    if (Sk) {
      function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
          throw new Error("File not found: '" + x + "'");
        }
        return Sk.builtinFiles["files"][x];
      }

      Sk.configure({
        read: builtinRead,
        __future__: Sk.python3,
        execLimit: 2000
      });

      const helperHeader = `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def _to_list_node(arr):
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for x in arr[1:]:
        curr.next = ListNode(x)
        curr = curr.next
    return head

def _from_list_node(head):
    res = []
    curr = head
    seen = set()
    while curr and curr not in seen:
        seen.add(curr)
        res.append(curr.val)
        curr = curr.next
    return res
`;

      const headerLineCount = helperHeader.split('\n').length;
      const caseResults = [];
      let numPassed = 0;
      let firstFailureStatus = null;
      let firstFailureError = null;

      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        const alignedArgs = parseAndAlignArgs(tc.input, formalParams);

        const pyArgsList = alignedArgs.map((arg, aIdx) => {
          const pName = formalParams[aIdx] || '';
          if (Array.isArray(arg) && (pName === 'head' || prob.title.toLowerCase().includes('linkedlist') || prob.title.toLowerCase().includes('linked list'))) {
            return `_to_list_node(${pyLiteral(arg)})`;
          }
          return pyLiteral(arg);
        });

        const runnerScript = `
${helperHeader}

# User Code
${code}

# Test Invocation
__raw_result__ = ${targetFuncName}(${pyArgsList.join(', ')})
if isinstance(__raw_result__, ListNode):
    __final_result__ = _from_list_node(__raw_result__)
else:
    __final_result__ = __raw_result__
`;

        try {
          const mod = Sk.importMainWithBody('<stdin>', false, runnerScript, true);
          const rawResult = mod.$d.__final_result__;
          const actualJs = (rawResult !== undefined) ? Sk.ffi.remapToJs(rawResult) : null;

          const isMatch = comparePythonOutputs(actualJs, tc.expected);
          const formattedActual = formatPythonValue(actualJs);

          if (isMatch) {
            numPassed++;
            caseResults.push({
              id: tc.id || (i + 1),
              name: tc.name || `Case ${i + 1}`,
              passed: true,
              input: tc.input,
              actual: formattedActual,
              expected: tc.expected
            });
          } else {
            if (!firstFailureStatus) firstFailureStatus = 'Wrong Answer';
            caseResults.push({
              id: tc.id || (i + 1),
              name: tc.name || `Case ${i + 1}`,
              passed: false,
              input: tc.input,
              actual: formattedActual,
              expected: tc.expected
            });
          }
        } catch (err) {
          let errMsg = err.toString();
          let caseStatus = 'Runtime Error';
          if (err.tp$name === 'SyntaxError' || errMsg.includes('SyntaxError')) {
            caseStatus = 'Syntax Error';
          } else if (err.tp$name === 'TimeLimitError' || errMsg.includes('TimeLimitError') || errMsg.includes('time limit')) {
            caseStatus = 'Time Limit Exceeded';
            errMsg = 'Time Limit Exceeded: Execution exceeded 2.0s limit (infinite loop detected).';
          } else if (err.tp$name) {
            errMsg = `${err.tp$name}: ${err.args ? err.args.v[0]?.v : err.toString()}`;
          }

          // Adjust line numbers so they match the learner's editor line numbers
          errMsg = errMsg.replace(/line (\d+)/g, (m, l) => 'line ' + Math.max(1, parseInt(l) - headerLineCount + 1));

          if (!firstFailureStatus) {
            firstFailureStatus = caseStatus;
            firstFailureError = errMsg;
          }

          caseResults.push({
            id: tc.id || (i + 1),
            name: tc.name || `Case ${i + 1}`,
            passed: false,
            input: tc.input,
            actual: errMsg,
            expected: tc.expected,
            error: errMsg
          });
        }
      }

      const elapsed = Math.max(Date.now() - startTime, 18);
      const allPassed = numPassed === testCases.length;

      return {
        passed: allPassed,
        status: allPassed ? 'Accepted' : (firstFailureStatus || 'Wrong Answer'),
        runtime: elapsed,
        passedCount: `${numPassed}/${testCases.length}`,
        error: firstFailureError,
        cases: caseResults
      };
    }

    return {
      passed: false,
      status: 'Environment Error',
      error: "Python runtime (Skulpt) is initializing. Please try running again in a moment.",
      runtime: 1,
      passedCount: `0/${testCases.length}`,
      cases: testCases.map((c, idx) => ({ id: c.id || (idx + 1), name: c.name || `Case ${idx + 1}`, passed: false, input: c.input, actual: 'Runtime not ready', expected: c.expected }))
    };
  }

  // Robust Code Runner & Test Evaluator
  window.runLcCode = function() {
    const prob = getProblem(lc.selectedProblemId);
    if (!prob) return;

    if (typeof window.playSound === 'function') window.playSound('click');

    const editor = document.getElementById('lc-code-editor');
    if (editor) lc.editorCode = editor.value;

    const code = lc.editorCode.trim();
    const cases = prob.testCases || [
      { id: 1, name: "Case 1", input: "Sample input", expected: "Expected result" },
      { id: 2, name: "Case 2", input: "Sample variation", expected: "Expected result" },
      { id: 3, name: "Case 3", input: "Edge case", expected: "Expected result" }
    ];

    // Execute through our genuine Python evaluation engine
    const results = executePythonSubmission(code, prob, cases);
    lc.testResults = results;

    // Automatically focus on the first failed test case if any failed
    if (results.cases && results.cases.length > 0) {
      const firstFailIdx = results.cases.findIndex(c => !c.passed);
      if (firstFailIdx !== -1) {
        lc.activeCaseIdx = firstFailIdx;
      } else {
        lc.activeCaseIdx = 0;
      }
    }

    if (results.passed) {
      if (typeof window.playSound === 'function') window.playSound('pass');
    } else {
      if (typeof window.playSound === 'function') window.playSound('fail');
    }

    switchConsoleTab('result');

    // Re-render center pane if currently in Step 5 to update Step 6 lock/unlock state immediately
    if (lc.step === 5) {
      const center = document.getElementById('lc-center-content');
      if (center) center.innerHTML = renderCenterTabContent(prob);
    }
  };

  // Submit Code logic
  window.submitLcCode = function() {
    const prob = getProblem(lc.selectedProblemId);
    if (!prob) return;

    window.runLcCode();

    if (lc.testResults && lc.testResults.passed) {
      markProblemCompleted(prob.id);
      window.setLcStep(6);
    }
  };

})();
