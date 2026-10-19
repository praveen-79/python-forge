import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// ==========================================
// APPLICATION API: CHAT SERVICE FOR PYTHON COACH
// Only receives minimal context: { lessonContext, question, mode, userCode, latestError, hintLevel }
// Zero personal or account credentials are exchanged or stored
// ==========================================
function processChatRequest({ mode, question, userCode, latestError, lessonContext, hintLevel = 1 }) {
  const q = (question || '').toLowerCase().trim();
  const code = (userCode || '').trim();
  const error = (latestError || '').trim();
  const ctx = lessonContext || {};

  // 1. Full Solution Request
  if (mode === 'solution' || q.includes('solution') || q.includes('show answer') || q.includes('reveal answer')) {
    const solutionCode = ctx.solution || ctx.expected || '# Solution code';
    return {
      mode: 'solution',
      reply: `### ⚔️ FULL SOLUTION REVEAL\n\nHere is a clean, idiomatic implementation for **${ctx.title || 'this challenge'}**:\n\n\`\`\`python\n${solutionCode}\n\`\`\`\n\n**Why it works:** ${ctx.concept || 'Follows idiomatic Python logic.'}\n\n⚠️ **Invitation:** Now that you've reviewed the reference solution, reset your editor and challenge yourself to type it out from memory, or modify it to handle an extra edge case!`,
      suggestedNextStep: "Reset the editor and try typing the solution from memory, or adapt it with your own variable names."
    };
  }

  // 2. Explain Error Request
  if (mode === 'explain_error' || q.includes('error') || q.includes('traceback') || q.includes('bug') || q.includes('why is it failing')) {
    if (error) {
      let explanation = "";
      let fixSnippet = "";
      if (error.includes('TypeError')) {
        explanation = "**TypeError** occurs when an operation is applied to incompatible types (like adding a string and an integer).";
        fixSnippet = "age = 25\n# Fix: convert with str() or use an f-string\nprint(f'Age: {age}')";
      } else if (error.includes('IndexError')) {
        explanation = "**IndexError: list index out of range** occurs when you request an index that doesn't exist. Python lists are 0-indexed, so valid indices are `0` through `len(list) - 1`.";
        fixSnippet = "items = ['a', 'b', 'c']\n# Last item is at index 2, not 3!\nprint(items[len(items) - 1])";
      } else if (error.includes('KeyError')) {
        explanation = "**KeyError** means Python looked for a dictionary key that does not exist.";
        fixSnippet = "user = {'name': 'Alex'}\n# Safe access with .get() avoids KeyError:\nrole = user.get('role', 'guest')";
      } else if (error.includes('SyntaxError')) {
        explanation = "**SyntaxError** means Python couldn't parse the code. Check for missing colons (`:`) after `if`/`for`/`def`, unclosed quotes, or unbalanced parentheses `()`.";
      } else if (error.includes('IndentationError')) {
        explanation = "**IndentationError** happens when indentation levels are inconsistent. Python requires 4 spaces for each indented block.";
      } else if (error.includes('ZeroDivisionError')) {
        explanation = "**ZeroDivisionError** means the denominator was 0. Protect against it with a conditional guard or `try/except`.";
        fixSnippet = "if count != 0:\n    avg = total / count\nelse:\n    avg = 0";
      } else if (error.includes('Output mismatch') || error.includes('Expected')) {
        explanation = "**Test Output Mismatch:** Your syntax executed without crashing, but the printed output didn't match the expected test case. Pay special attention to exact spacing, capital letters, or missing newline characters.";
      } else {
        explanation = `**Error Encountered:** \`${error}\`\nCheck the line number in the traceback and verify variable types and syntax.`;
      }

      return {
        mode: 'explain_error',
        reply: `### 🐞 Understanding Your Error\n\n${explanation}${fixSnippet ? `\n\n\`\`\`python\n${fixSnippet}\n\`\`\`` : ''}`,
        suggestedNextStep: "Apply the adjustment in your editor and click [Run ▶] or [Check Tests ✓] to re-verify."
      };
    } else {
      return {
        mode: 'explain_error',
        reply: `### ✅ No Unhandled Exceptions Detected\n\nYour code is running without crashing! If your test isn't passing yet:\n1. Check the **🧪 Test Cases** tab to compare your output with the expected format.\n2. Ensure there are no extra leading/trailing spaces.\n3. Make sure you printed what the task requested.`,
        suggestedNextStep: "Click 'Check Tests ✓' to inspect the exact test case differences."
      };
    }
  }

  // 3. Explain Code Request
  if (mode === 'explain_code' || q.includes('explain this code') || q.includes('explain my code') || q.includes('what does this code do') || q.includes('explain this line')) {
    let breakdown = [];
    if (code.includes('range(')) {
      breakdown.push("- **`range(start, stop)`**: Generates numbers starting at `start` and ending *strictly before* `stop`. The upper bound is exclusive!");
    }
    if (code.includes('for ') && code.includes(' in ')) {
      breakdown.push("- **`for item in sequence:`**: Loops through each element in the iterable one by one, binding it to the loop variable.");
    }
    if (code.includes('while ')) {
      breakdown.push("- **`while condition:`**: Continues repeating as long as the condition evaluates to `True`. Make sure the condition eventually becomes `False` to prevent an infinite loop!");
    }
    if (code.includes('print(')) {
      breakdown.push("- **`print()`**: Sends output to stdout. `sep=` defines what goes between arguments, and `end=` defines the trailing character (default is `\\n`).");
    }
    if (code.includes('def ')) {
      breakdown.push("- **`def func_name(...)`**: Defines a reusable function block with parameters and an optional `return` value.");
    }
    if (code.includes('//') || code.includes('%')) {
      breakdown.push("- **`//` and `%`**: `//` performs integer division (flooring the quotient), while `%` returns the remainder modulo.");
    }
    if (code.includes('left') && code.includes('right')) {
      breakdown.push("- **Two Pointers (`left < right`)**: Converges indices from both ends in $O(N)$ time, common in palindrome verification and array reversals.");
    }

    const explanation = breakdown.length > 0 
      ? breakdown.join('\n')
      : `- **Core Action:** ${ctx.concept || 'Executes sequential Python statements according to control flow.'}`;

    return {
      mode: 'explain_code',
      reply: `### 🔍 Line-by-Line Breakdown\n\nHere is how Python interprets your current code:\n\n${explanation}\n\n**Current Task Context:** *${ctx.task || 'Follow the lesson instructions.'}*`,
      suggestedNextStep: "Try running the code and inspecting each value in the output terminal."
    };
  }

  // 4. Progressive Hint Request
  if (mode === 'hint' || q.includes('hint') || q.includes('nudge') || q.includes('clue') || q.includes('stuck')) {
    if (hintLevel === 1) {
      return {
        mode: 'hint',
        hintLevel: 1,
        reply: `### 💡 Gentle Nudge (Hint 1)\n\nTake a look at the goal: *${ctx.task || 'Solve the challenge.'}*\n\n**Key Concept:** ${ctx.concept || 'Review the lesson topic.'}\n\n🤔 *Predict before running:* What built-in parameter or function does Python provide for this? Ask yourself what happens if you test with a small input first!`,
        suggestedNextStep: "Try testing your idea in the editor. Need a stronger hint? Click 'Give me a hint' again!"
      };
    } else if (hintLevel === 2) {
      return {
        mode: 'hint',
        hintLevel: 2,
        reply: `### 💡 Structural Pattern (Hint 2)\n\nHere is the exact structural pattern you need:\n\n\`\`\`python\n${ctx.hint2 || ctx.hint1 || '# Use the appropriate Python keyword or function here'}\n\`\`\`\n\nNotice how the syntax aligns with the expected output format.`,
        suggestedNextStep: "Fill in the specific values into this pattern in your editor and click [Run ▶]."
      };
    } else {
      return {
        mode: 'hint',
        hintLevel: 3,
        reply: `### 💡 Detailed Walkthrough (Hint 3)\n\nHere is the exact assembly:\n\n${ctx.concept || 'Assemble the variables and function calls as specified.'}\n\nIf you want to inspect the exact reference solution, ask for the full solution!`,
        suggestedNextStep: "Give it one more attempt, or click 'Reveal solution' if you want to inspect the reference code."
      };
    }
  }

  // 5. Example Request
  if (mode === 'example' || q.includes('example') || q.includes('sample') || q.includes('demo')) {
    let exampleCode = "";
    if (ctx.day === 1) {
      exampleCode = "# Formatting print delimiters\nprint('Python', 'Forge', sep=' · ', end=' ⚡\\n')\n# Output: Python · Forge ⚡";
    } else if (ctx.day === 2) {
      exampleCode = "# Iterating with range(start, stop)\nfor n in range(1, 6):\n    print(f'Step {n}')\n# Stops strictly before 6!";
    } else if (ctx.day === 3) {
      exampleCode = "# Safe dictionary lookup\nuser_scores = {'alice': 95, 'bob': 88}\nprint(user_scores.get('charlie', 0)) # Returns 0 instead of crashing!";
    } else if (ctx.day === 4) {
      exampleCode = "# Pure function with default parameters\ndef calculate_tax(amount, rate=0.08):\n    return round(amount * rate, 2)\n\nprint(calculate_tax(100)) # 8.0";
    } else if (ctx.day === 5) {
      exampleCode = "# Safe file handling with context manager\n# with open('data.txt', 'w') as f:\n#     f.write('Safe write!')";
    } else if (ctx.day === 6) {
      exampleCode = "# Class definition and self binding\nclass Hero:\n    def __init__(self, name):\n        self.name = name\n    def shout(self):\n        return f'{self.name} enters the forge!'\n\nh = Hero('Kael')\nprint(h.shout())";
    } else {
      exampleCode = "# Two Pointers convergence pattern\ndef is_palindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True\n\nprint(is_palindrome('racecar')) # True";
    }

    return {
      mode: 'example',
      reply: `### 🧪 Runnable Example Pattern\n\nHere is an example illustrating the underlying concept:\n\n\`\`\`python\n${exampleCode}\n\`\`\`\n\nNotice how this pattern separates the logic cleanly. You can apply this exact structure to your challenge!`,
      suggestedNextStep: "Observe the pattern above and translate it to your task in the editor."
    };
  }

  // 6. Specific natural language questions
  if (q.includes('stop at 5') || q.includes('stops at 5') || q.includes('why 5') || (q.includes('range') && q.includes('stop'))) {
    return {
      mode: 'general',
      reply: `### 🔢 Why \`range(1, 6)\` Stops at 5\n\nIn Python, \`range(start, stop)\` uses a **half-open interval**: \`[start, stop)\`.\n\n* **\`start\` (1)** is **inclusive** (included).\n* **\`stop\` (6)** is **exclusive** (excluded)!\n\nSo \`range(1, 6)\` generates: \`1, 2, 3, 4, 5\`.\n\n💡 **Why Python does this:**\n1. The length is always \`stop - start\` (e.g. \`6 - 1 = 5\` items).\n2. It prevents off-by-one errors when slicing lists (\`list[0:5]\` cleanly grabs the first 5 elements).`,
      suggestedNextStep: "Try changing range(1, 6) to range(1, 7) in your editor and click Run ▶ to see 6 printed!"
    };
  }

  if (q.includes('simpler') || q.includes('simple words') || q.includes('eli5')) {
    return {
      mode: 'general',
      reply: `### 🌟 Simplified Concept\n\nThink of this lesson like following a simple recipe:\n1. **Input:** You give Python ingredients (variables, numbers, or text strings).\n2. **Execution:** Python reads your instructions from top to bottom, one line at a time.\n3. **Output:** Python prints the result to your terminal screen.\n\nIn this challenge (*${ctx.title || 'current lesson'}*), focus strictly on what the task asks you to print. Don't worry about extra complexity!`,
      suggestedNextStep: "Write one simple line in the editor and click [Run ▶] to see what happens."
    };
  }

  if (q.includes('how can i test') || q.includes('how to test') || q.includes('test my code')) {
    return {
      mode: 'general',
      reply: `### 🧪 How to Test Your Code in Python Forge\n\n1. **Quick Test:** Click the green **Run ▶** button (or press \`Ctrl + Enter\`). This executes your code in the \`>_ Output\` terminal immediately.\n2. **Inspect Variables:** Add temporary \`print()\` statements inside your code to inspect variables at critical lines.\n3. **Automated Verification:** Click the purple **Check Tests ✓** button to compare your output against the exact test case expectations.`,
      suggestedNextStep: "Click 'Check Tests ✓' to see if your current solution passes the automated test suite."
    };
  }

  // 7. General fallback / contextual answer
  return {
    mode: 'general',
    reply: `### 🤖 Python Coach Context\n\nWe are currently in **Day ${ctx.day || 1}: ${ctx.title || 'Python Foundations'}**.\n\n**Task:** *${ctx.task || 'Write Python code to solve this challenge.'}*\n\n**Concept Summary:** ${ctx.concept || 'Focus on understanding the syntax and inspecting outputs.'}\n\nWhat would you like to explore? You can ask:\n- *"Why does this loop stop at 5?"*\n- *"What does this error mean?"*\n- *"Give me a hint without showing the answer"*\n- Or click one of the quick mode buttons above!`,
    suggestedNextStep: "Click [Give me a hint] or type a specific question about your code."
  };
}

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API ROUTE: CHAT SERVICE
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const responseData = processChatRequest(payload);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // API ROUTE: COACH FEEDBACK
  if (req.method === 'POST' && req.url === '/api/coach-feedback') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        // Record feedback (in-memory log or local log)
        console.log(`[Coach Feedback] Lesson: ${payload.lessonId} | Rating: ${payload.rating} | Mode: ${payload.mode}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'recorded' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid feedback payload' }));
      }
    });
    return;
  }

  // STATIC FILE SERVING
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (error, fallback) => {
          if (error) {
            res.writeHead(500);
            res.end(`Server Error: ${error.code}`);
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(fallback, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 PYTHON FORGE IS RUNNING!`);
  console.log(`🔗 Local: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
