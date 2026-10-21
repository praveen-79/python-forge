const fs = require('fs');
const vm = require('vm');

// Load leetcode150_data.js
const dataCode = fs.readFileSync('leetcode150_data.js', 'utf8');
const uiCode = fs.readFileSync('leetcode150_ui.js', 'utf8');

const domMocks = {
  window: {},
  document: {
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, addEventListener: () => {} }),
    head: { appendChild: () => {} },
    getElementById: (id) => {
      if (id === 'lc-code-editor') return { value: domMocks.currentCode || '' };
      return null;
    },
    querySelectorAll: () => []
  },
  localStorage: {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = v; },
    removeItem(k) { delete this.data[k]; }
  },
  alert: (msg) => console.log('[Alert]', msg)
};

domMocks.window = domMocks;

vm.runInNewContext(dataCode, domMocks);
vm.runInNewContext(uiCode, domMocks);

console.log('Total problems loaded:', domMocks.window.LEETCODE_PROBLEMS.length);

const prob1 = domMocks.window.LEETCODE_PROBLEMS[0];
console.log('Problem 1:', prob1.id, prob1.title);
console.log('Test Cases:', prob1.testCases);

// Helper to run code through window.runLcCode
function testSubmission(code) {
  domMocks.currentCode = code;
  domMocks.window.selectLcProblem('1.1');
  domMocks.window.runLcCode();
  return domMocks.window.lc.testResults;
}

console.log('\n======================================================');
console.log('TEST 1: Buggy User Code from Screenshot (syntax error: if s = target:)');
console.log('======================================================');
const code1 = `def pair_with_target_sum(arr, target):
    left = 0
    right = len(arr) - 1
    solution = []
    while left < right:
        s = arr[left] + arr[right]
        if s = target:
            solution.append((left, right))
            return solution
        elif s < target:
            left += 1
        else:
            right += 1
    return [-1, -1]`;

const res1 = testSubmission(code1);
console.log('Passed:', res1.passed);
console.log('Status:', res1.status);
console.log('PassedCount:', res1.passedCount);
console.log('Error:', res1.error);
if (!res1.passed && res1.status === 'Syntax Error') {
  console.log('>>> TEST 1 PASSED: Successfully detected Syntax Error!');
} else {
  console.error('>>> TEST 1 FAILED!');
  process.exit(1);
}

console.log('\n======================================================');
console.log('TEST 2: Buggy User Code with Logic Error (else: right += 1)');
console.log('======================================================');
const code2 = `def pair_with_target_sum(arr, target):
    left = 0
    right = len(arr) - 1
    solution = []
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            solution.append((left, right))
            return solution
        elif s < target:
            left += 1
        else:
            right += 1
    return [-1, -1]`;

const res2 = testSubmission(code2);
console.log('Passed:', res2.passed);
console.log('Status:', res2.status);
console.log('PassedCount:', res2.passedCount);
console.log('Error:', res2.error);
console.log('Case 1 actual output:', res2.cases[0].actual);
console.log('Case 1 expected:', res2.cases[0].expected);
if (!res2.passed && (res2.status === 'Runtime Error' || res2.status === 'Time Limit Exceeded')) {
  console.log('>>> TEST 2 PASSED: Successfully detected Runtime Error/IndexError!');
} else {
  console.error('>>> TEST 2 FAILED!');
  process.exit(1);
}

console.log('\n======================================================');
console.log('TEST 3: Wrong Answer (returns [(1, 3)] instead of [1, 3])');
console.log('======================================================');
const code3 = `def pair_with_target_sum(arr, target):
    left = 0
    right = len(arr) - 1
    solution = []
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            solution.append((left, right))
            return solution
        elif s < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]`;

const res3 = testSubmission(code3);
console.log('Passed:', res3.passed);
console.log('Status:', res3.status);
console.log('PassedCount:', res3.passedCount);
console.log('Case 1 Actual:', res3.cases[0].actual, '| Expected:', res3.cases[0].expected, '| Case 1 Passed:', res3.cases[0].passed);
if (!res3.passed && res3.status === 'Wrong Answer') {
  console.log('>>> TEST 3 PASSED: Successfully detected Wrong Answer!');
} else {
  console.error('>>> TEST 3 FAILED!');
  process.exit(1);
}

console.log('\n======================================================');
console.log('TEST 4: 100% CORRECT SOLUTION');
console.log('======================================================');
const code4 = `def pair_with_target_sum(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current = arr[left] + arr[right]
        if current == target:
            return [left, right]
        if current < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]`;

const res4 = testSubmission(code4);
console.log('Passed:', res4.passed);
console.log('Status:', res4.status);
console.log('PassedCount:', res4.passedCount);
console.log('Cases:', res4.cases.map(c => ({ name: c.name, passed: c.passed, actual: c.actual, expected: c.expected })));
if (res4.passed && res4.status === 'Accepted' && res4.passedCount === '3/3') {
  console.log('>>> TEST 4 PASSED: Correct solution accepted with 3/3 passed!');
} else {
  console.error('>>> TEST 4 FAILED!');
  process.exit(1);
}

console.log('\n======================================================');
console.log('TEST 5: Infinite Loop (Time Limit Exceeded)');
console.log('======================================================');
const code5 = `def pair_with_target_sum(arr, target):
    count = 0
    while True:
        count += 1
    return count`;

const res5 = testSubmission(code5);
console.log('Passed:', res5.passed);
console.log('Status:', res5.status);
console.log('Error:', res5.error);
if (!res5.passed && res5.status === 'Time Limit Exceeded') {
  console.log('>>> TEST 5 PASSED: Infinite loop stopped with Time Limit Exceeded!');
} else {
  console.error('>>> TEST 5 FAILED!');
  process.exit(1);
}

console.log('\n======================================================');
console.log('TEST 6: Step 5 Gatekeeper Check');
console.log('======================================================');
// If tests not passed, step 6 is locked
testSubmission(code1); // failing code
domMocks.window.setLcStep(6);
console.log('Current Step after trying to jump to Step 6 with failing code:', domMocks.window.lc.step);
if (domMocks.window.lc.step === 5) {
  console.log('>>> GATEKEEPER PASSED: Step 6 remains locked when tests fail!');
} else {
  console.error('>>> GATEKEEPER FAILED! Step was unlocked inappropriately!');
  process.exit(1);
}

// Now submit correct code
testSubmission(code4);
domMocks.window.setLcStep(6);
console.log('Current Step after passing tests and moving to Step 6:', domMocks.window.lc.step);
if (domMocks.window.lc.step === 6) {
  console.log('>>> GATEKEEPER PASSED: Step 6 cleanly unlocks when tests pass!');
} else {
  console.error('>>> GATEKEEPER FAILED! Step was not unlocked!');
  process.exit(1);
}

console.log('\n======================================================');
console.log('ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY! 🎉');
console.log('======================================================');
