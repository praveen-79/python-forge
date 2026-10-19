# ⚡ PYTHON FORGE — 7-Day Intensive Python Coding Gym

> **Write real Python every day. Learn by building. Zero theory walls — 100% practical code.**

![Python Forge](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Tech](https://img.shields.io/badge/Tech-Vanilla%20JS%20%7C%20Tailwind%20%7C%20Web%20Audio-orange)

---

## 🎯 Overview

**Python Forge** is an interactive, hardcore coding gym designed for driven learners. It bridges raw syntax into **LeetCode & DSA readiness in 7 days or less**.

Unlike traditional courses filled with passive videos and boring slides, every single lesson follows a ruthless, hands-on loop:
1. **See a coding challenge.**
2. **Write real code in the browser.**
3. **Execute immediately and inspect output.**
4. **Error Deconstruction:** Get human-translated feedback when bugs occur.
5. **3-Tier Mastery:** Type the pattern $\to$ Hunt down deliberate bugs $\to$ Blank screen LeetCode challenge.

---

## 🗺️ 7-Day Curriculum Structure (42 Practical Lessons · 126 Challenges)

Each day includes 6 focused lessons, and every lesson provides 3 tiers of mastery:
- **Tier 1: Pattern Build** — Replicate and understand the idiomatic pattern.
- **Tier 2: Bug Hunt 🐞** — Spot and fix real-world anti-patterns and runtime traps.
- **Tier 3: Blank Screen (LeetCode Mini) ⚔️** — Solve without scaffolding to solidify problem-solving intuition.

| Day | Title | Topics & Core Patterns | Lessons |
| :---: | :--- | :--- | :---: |
| **Day 1** | **Python Foundations** | `print()` separators & delimiters (`sep=`, `end=`), dynamic typing & memory swap, integer division (`//` & `%`), string slicing & f-strings, input casting traps (`int()`, `float()`), interactive quiz project. | 6 |
| **Day 2** | **Logic & Repetition** | Truthiness & short-circuit evaluation (`and`/`or`), conditional chains, `range()` bounds & strides, `while` loops & sentinel flags, `enumerate()` & `zip()`, `for...else` search pattern. | 6 |
| **Day 3** | **Collections & Data** | List mutability & boundary traps, tuples & starred unpacking (`*rest`), dictionaries & $O(1)$ hash map `.get()`, sets & hash-table deduplication, list/dict comprehensions, in-place two-pointer reversal. | 6 |
| **Day 4** | **Functions & Reusability** | Pure functions & boolean simplification, default arguments (`*args`, `**kwargs`), LEGB variable scope, recursion base cases, standard library (`collections.Counter`), lambdas & custom `key=` sorting. | 6 |
| **Day 5** | **Real-World Data & Errors** | Exception hierarchy (`try/except/else/finally`), defensive validation & `raise`, `pathlib.Path`, context managers (`with open`), JSON serialization, persistent expense tracker. | 6 |
| **Day 6** | **Object-Oriented Programming** | Classes & `self` instance binding, dunder methods (`__str__`, `__repr__`), DSA `ListNode` pointer linking, modern `@dataclass` & type hints, generators & `yield`, `unittest` assertions. | 6 |
| **Day 7** | **The LeetCode Arena & Beyond** | Two Pointers opposite direction (Valid Palindrome), Fast & Slow pointers (Move Zeroes), Fixed Sliding Window sum, Hash map complement search (LeetCode #1 Two Sum), virtual environments (`venv`, PEP 8), Concurrency (`asyncio`) & advanced tracks. | 6 |

---

## ✨ Features & Architecture

* **🤖 Python Coach (Embedded Workspace Chatbot):** Sits directly inside the coding gym beside your editor (collapsible on desktop, full-screen drawer on mobile) so learners never lose lesson focus.
  * **5 Help Modes:**
    * `[ 💡 Give me a hint ]`: 3-tier progressive nudges (subtle hint $\to$ structural pattern $\to$ guided walkthrough).
    * `[ 🔍 Explain my code ]`: Line-by-line breakdown of loops, range boundaries, slicing, and functions.
    * `[ ⚠️ Explain this error ]`: Human-translated error diagnostics for `TypeError`, `IndexError`, `KeyError`, and test assertion mismatches.
    * `[ 🧪 Show an example ]`: Runnable, minimal code patterns demonstrating the core concept.
    * `[ ⚔️ Reveal solution ]`: Labeled reference solution with an invitation to re-type from memory or modify for edge cases.
  * **Privacy-First Minimal Context:** Only sends necessary task context (`userCode`, `latestError`, active challenge title); zero personal or account information is transmitted.
  * **Continuous Improvement Feedback:** Every reply features `[ 👍 Helpful ]` and `[ 👎 This explanation didn't help ]` buttons with automatic simpler re-explanations.
* **🎮 Cyberpunk Gym UI:** Dark obsidian theme (`#0c0916`), neon lime accents, retro CRT illustrations, and authentic pixel graffiti stickers.
* **⏱️ Precision Telemetry HUD:** Live timer with **60-second idle filter** (measures only active typing/running time) and dynamic velocity tracker against the $6.2\text{m/task}$ benchmark.
* **🐞 Error-First Deconstruction:** Human-translated diagnostic hints whenever code crashes (`TypeError`, `IndexError`, `KeyError`, `ZeroDivisionError`).
* **🔊 Retro 8-Bit Web Audio SFX:** Synthesized arcade chimes for test passes, error alerts, and XP gains.
* **🎊 Canvas Confetti Celebration:** Full-screen particle bursts on completed challenges.
* **⚡ Hybrid Architecture & 100% Offline Resilient:** Connects to Node.js Application API (`/api/chat`) when running locally, and seamlessly falls back to client-side inference on static hosts (like GitHub Pages) or offline `file://`.

---

## 🚀 Quick Start

### Option 1: One-Click Windows Launch
Double-click `Start_Python_Forge.bat`.

### Option 2: Open in Any Browser
Open `index.html` directly in Chrome, Edge, Brave, or Firefox.

### Option 3: Run via Node.js
```bash
node server.js
```
Open `http://localhost:3000` in your browser.

---

## 📜 License
MIT License. Created for enthusiastic learners ready to conquer Python.
