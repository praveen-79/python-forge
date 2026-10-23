const fs = require('fs');
const path = require('path');
const vm = require('vm');

const domMocks = {
  window: {},
  document: { createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, addEventListener: () => {} }) },
  navigator: {},
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
};
domMocks.window = domMocks;
domMocks.self = domMocks;

vm.runInNewContext(fs.readFileSync('scripts/vendor/skulpt.min.js', 'utf8'), domMocks);
vm.runInNewContext(fs.readFileSync('scripts/vendor/skulpt-stdlib.js', 'utf8'), domMocks);
vm.runInNewContext(fs.readFileSync('leetcode150_data.js', 'utf8'), domMocks);

const Sk = domMocks.window.Sk;
const problems = domMocks.window.LEETCODE_PROBLEMS;

function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
    throw new Error("File not found: '" + x + "'");
  }
  return Sk.builtinFiles["files"][x];
}

// Full python executor implementation
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

    const remainingNamed = Object.values(namedArgs);
    for (let pIdx = 0; pIdx < formalParams.length; pIdx++) {
      if (!usedFormalIndices.has(pIdx) && remainingNamed.length > 0) {
        alignedArgs[pIdx] = remainingNamed.shift();
        usedFormalIndices.add(pIdx);
      }
    }

    for (let pIdx = 0; pIdx < formalParams.length; pIdx++) {
      if (!usedFormalIndices.has(pIdx) && unassigned.length > 0) {
        alignedArgs[pIdx] = unassigned.shift();
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

  if (typeof actual === 'number' && typeof expVal === 'number') {
    return Math.abs(actual - expVal) < 1e-6;
  }
  if (typeof actual === 'boolean' && typeof expVal === 'boolean') {
    return actual === expVal;
  }
  if (actual === null && expVal === null) {
    return true;
  }
  if (Array.isArray(actual) && Array.isArray(expVal)) {
    if (actual.length !== expVal.length) return false;
    let allElementsMatch = true;
    for (let i = 0; i < actual.length; i++) {
      if (!comparePythonOutputs(actual[i], expVal[i])) {
        allElementsMatch = false;
        break;
      }
    }
    if (allElementsMatch) return true;
    const sortKey = (x) => JSON.stringify(Array.isArray(x) ? [...x].sort() : x);
    try {
      const sortedActual = [...actual].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
      const sortedExp = [...expVal].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
      return JSON.stringify(sortedActual) === JSON.stringify(sortedExp);
    } catch (e) {
      return false;
    }
  }
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

function executePythonWithSkulpt(code, prob, testCases) {
  const startTime = Date.now();
  const trimmed = code.trim();

  // Incomplete check
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
      let rawResult = mod.$d.__final_result__;
      let actualJs = (rawResult !== undefined) ? Sk.ffi.remapToJs(rawResult) : null;

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
      const headerLineCount = helperHeader.split('\n').length;
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

      // Adjust line numbers to match user editor
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

// ==========================================
// TEST SCENARIOS
// ==========================================

console.log('=== TEST 1: User Screenshot Code on Problem 2.1 (max_sub_array_of_size_k) ===');
const prob2_1 = problems.find(p => p.id === '2.1');
const userCodeScreenshot = `def max_sub_array_of_size_k(k, nums):
    window_sum=sum(nums[:k])
    max_sum=window_sum
    
    for right in range(k,len(nums)):
        window_sum+=nums[right]-nums[right-k]
        max_sum=max(max_sum,window_sum)
    return max_sum`;

const res1 = executePythonWithSkulpt(userCodeScreenshot, prob2_1, prob2_1.testCases);
console.log('Result 1:', { passed: res1.passed, status: res1.status, passedCount: res1.passedCount });
console.log('Case 1 actual output:', res1.cases[0].actual, '| Expected:', res1.cases[0].expected);
if (res1.passed && res1.status === 'Accepted' && res1.passedCount === '3/3') {
  console.log('>>> TEST 1 PASSED: Slicing nums[:k] and parameter alignment works cleanly!');
} else {
  console.error('>>> TEST 1 FAILED!');
  process.exit(1);
}

console.log('\n=== TEST 2: Problem 1.1 Correct Two Pointers ===');
const prob1_1 = problems.find(p => p.id === '1.1');
const correctTwoPointers = `def pair_with_target_sum(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]`;

const res2 = executePythonWithSkulpt(correctTwoPointers, prob1_1, prob1_1.testCases);
console.log('Result 2:', { passed: res2.passed, status: res2.status, passedCount: res2.passedCount });
if (res2.passed && res2.status === 'Accepted') {
  console.log('>>> TEST 2 PASSED: 1.1 Pair with Target Sum accepted!');
} else {
  console.error('>>> TEST 2 FAILED!');
  process.exit(1);
}

console.log('\n=== TEST 3: Problem 1.1 Syntax Error (if s = target:) ===');
const syntaxErrorTwoPointers = `def pair_with_target_sum(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s = target:
            return [left, right]
        left += 1
    return [-1, -1]`;

const res3 = executePythonWithSkulpt(syntaxErrorTwoPointers, prob1_1, prob1_1.testCases);
console.log('Result 3:', { passed: res3.passed, status: res3.status, error: res3.error });
if (!res3.passed && res3.status === 'Syntax Error') {
  console.log('>>> TEST 3 PASSED: Syntax Error caught by real Python parser!');
} else {
  console.error('>>> TEST 3 FAILED!');
  process.exit(1);
}

console.log('\n=== TEST 4: Problem 1.1 Logic Error (else: right += 1 -> IndexError) ===');
const logicErrorTwoPointers = `def pair_with_target_sum(arr, target):
    left = 0
    right = len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right += 1
    return [-1, -1]`;

const res4 = executePythonWithSkulpt(logicErrorTwoPointers, prob1_1, prob1_1.testCases);
console.log('Result 4:', { passed: res4.passed, status: res4.status, error: res4.error });
if (!res4.passed && res4.status === 'Runtime Error' && res4.error.includes('IndexError')) {
  console.log('>>> TEST 4 PASSED: IndexError caught by real Python runtime!');
} else {
  console.error('>>> TEST 4 FAILED!');
  process.exit(1);
}

console.log('\n=== TEST 5: Problem 1.1 Wrong Answer (returns [(left, right)] instead of [left, right]) ===');
const wrongAnswerTwoPointers = `def pair_with_target_sum(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [(left, right)]
        elif s < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]`;

const res5 = executePythonWithSkulpt(wrongAnswerTwoPointers, prob1_1, prob1_1.testCases);
console.log('Result 5:', { passed: res5.passed, status: res5.status, passedCount: res5.passedCount });
console.log('Case 1 actual output:', res5.cases[0].actual, '| Expected:', res5.cases[0].expected);
if (!res5.passed && res5.status === 'Wrong Answer') {
  console.log('>>> TEST 5 PASSED: Wrong Answer accurately detected!');
} else {
  console.error('>>> TEST 5 FAILED!');
  process.exit(1);
}

console.log('\n=== TEST 6: Problem 3.4 Middle of LinkedList ===');
const prob3_4 = problems.find(p => p.id === '3.4');
const middleLinkedListCode = `def find_middle(head):
    slow, fast = head, head
    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
    return slow`;

const res6 = executePythonWithSkulpt(middleLinkedListCode, prob3_4, prob3_4.testCases);
console.log('Result 6:', { passed: res6.passed, status: res6.status, passedCount: res6.passedCount });
console.log('Case 1 actual output:', res6.cases[0].actual, '| Expected:', res6.cases[0].expected);
if (res6.passed && res6.status === 'Accepted') {
  console.log('>>> TEST 6 PASSED: Linked list nodes handled with 100% fidelity!');
} else {
  console.error('>>> TEST 6 FAILED!');
  process.exit(1);
}

console.log('\n======================================================');
console.log('ALL INTEGRATION TESTS PASSED WITH 100% SUCCESS! 🎉');
console.log('======================================================');
