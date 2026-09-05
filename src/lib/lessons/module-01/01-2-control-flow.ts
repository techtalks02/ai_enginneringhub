import { DetailedLessonContent } from "../types";

export const lesson01_2: DetailedLessonContent = {
  chapterNumber: 2,
  categoryBadge: "Python Fundamentals · 22 min read · Beginner → Advanced",
  subtitle:
    "Master decision making (if/elif/else), comparison/logical/membership operators, loops (for, while, range, break, continue, pass), modular functions, type hints, variable scope, composition, and AI agent execution loops.",
  concept: {
    title: "1 · Concept: Control Flow & Modular Functions in Python",
    paragraphs: [
      "Once you understand variables and data types, the next step is learning how to control the execution of a Python program and organize your code into reusable components.",
      "Two fundamental concepts make this possible: Control Flow — which determines which code runs, when it runs, and how many times it runs; and Functions — which allow you to package business logic into reusable, maintainable units.",
      "By default, Python executes code sequentially from top to bottom. Real-world applications, however, must evaluate dynamic conditions ('If user is authenticated, display dashboard; otherwise prompt for login'), repeat operations across collections, and delegate tasks to specialized routines.",
      "Python relies on strict indentation to delimit blocks of code (unlike languages that use curly braces {}). Combined with first-class functions and type annotations, these building blocks power everything from command-line utilities to enterprise REST APIs, background task queues, and autonomous AI agents."
    ]
  },
  subtopics: [
    {
      id: "subtopic-conditionals",
      title: "Conditional Statements (if, elif, else) & Indentation",
      paragraphs: [
        "Conditional statements enable programs to branch dynamically based on boolean evaluations.",
        "The if statement executes a block only if the predicate evaluates to True. When multiple alternative conditions exist, elif allows cascading checks evaluated top-to-bottom, falling back to an optional else block."
      ],
      codeSnippet: `score = 85\n\nif score >= 90:\n    grade = "A"\nelif score >= 75:\n    grade = "B"\nelif score >= 60:\n    grade = "C"\nelse:\n    grade = "D"\n\nprint(f"Final Grade: {grade}")  # Output: Final Grade: B`
    },
    {
      id: "subtopic-operators",
      title: "Comparison, Logical & Membership Operators",
      paragraphs: [
        "• Comparison Operators (==, !=, >, <, >=, <=): Compare values and return boolean outcomes.",
        "• Logical Operators (and, or, not): Combine multiple conditions. 'and' requires both operands to be True; 'or' requires at least one; 'not' inverts the boolean state.",
        "• Membership Operators (in, not in): Test for existence inside sequences, sets, or dictionary keys.",
        "• Identity Operators (is, is not): Verify whether two references point to the exact same memory address (standard for 'if result is None:')."
      ],
      codeSnippet: `age = 25\nhas_id = True\nallowed_roles = {"admin", "manager"}\nuser_role = "admin"\n\n# Logical combination and membership check\nif age >= 18 and has_id and user_role in allowed_roles:\n    print("Access granted to administrative portal.")`
    },
    {
      id: "subtopic-truthy-falsy",
      title: "Truthy vs Falsy Values & Guard Clauses",
      paragraphs: [
        "In Python, any object can be evaluated directly within a conditional statement.",
        "Falsy values include: False, None, 0, 0.0, empty strings (''), empty lists ([]), empty dicts ({}), and empty sets (set()). All other values are truthy.",
        "Using idiomatic truthy checks allows clean guard clauses that simplify code by avoiding deeply nested if-statements."
      ],
      codeSnippet: `user_name = ""\n\n# Idiomatic falsy check\nif not user_name:\n    print("Name is required.")\n\nitems = ["Doc1", "Doc2"]\nif items:\n    print(f"Processing {len(items)} retrieved items.")`
    },
    {
      id: "subtopic-loops",
      title: "Iteration with for Loops, range() & Dictionaries",
      paragraphs: [
        "A for loop iterates over elements in any iterable (lists, tuples, strings, dictionaries, generators).",
        "• range(start, stop, step): Generates an arithmetic sequence of integers up to (but not including) stop.",
        "• dict.items(): Traverses dictionary key-value pairs simultaneously, essential for processing API payloads and JSON metadata."
      ],
      codeSnippet: `# Iterate through dictionary items\nuser_profile = {"name": "Rahul", "role": "AI Engineer", "city": "Hyderabad"}\n\nfor key, value in user_profile.items():\n    print(f"{key.capitalize()}: {value}")\n\n# Range with step\nfor i in range(0, 10, 2):\n    print(f"Step {i}")  # 0, 2, 4, 6, 8`
    },
    {
      id: "subtopic-while-break-continue",
      title: "while Loops, break, continue & pass",
      paragraphs: [
        "• while loop: Executes continuously as long as its condition remains True. Must include an update step or termination check to avoid infinite loops.",
        "• break: Immediately terminates the innermost loop.",
        "• continue: Skips the remainder of the current loop iteration and proceeds to the next cycle.",
        "• pass: Syntactic placeholder that performs no action, useful when scaffolding unfinished functions or classes."
      ],
      codeSnippet: `count = 1\nwhile count <= 5:\n    if count == 3:\n        count += 1\n        continue  # Skip number 3\n    if count == 5:\n        break     # Stop at 5\n    print(f"Count: {count}")\n    count += 1\n\ndef payment_webhook_handler():\n    pass  # Placeholder for future implementation`
    },
    {
      id: "subtopic-functions-anatomy",
      title: "Function Anatomy, Parameters & return vs print()",
      paragraphs: [
        "A function is a named, reusable block of code defined with the def keyword.",
        "Parameters define the input signature, while arguments are the actual values passed during invocation.",
        "Crucial distinction: print() merely outputs characters to stdout for human inspection, while return hands computation data back to the caller for downstream processing and composition."
      ],
      codeSnippet: `def calculate_total(price: float, quantity: int) -> float:\n    """Compute total price with tax calculation."""\n    return price * quantity\n\n# The returned value can be stored, mutated, and passed forward\ntotal = calculate_total(100.0, 3)\ndiscounted_total = total * 0.90\nprint(f"Final Payable: ₹{discounted_total}")`
    },
    {
      id: "subtopic-params-hints-scope",
      title: "Default Values, Keyword Arguments, Type Hints & Scope",
      paragraphs: [
        "• Default Parameters: Allow optional parameters with fallback values (e.g. def greet(name='Guest')).",
        "• Keyword Arguments: Pass arguments by parameter name for clarity (e.g. create_user(name='Rahul', age=25)).",
        "• Type Hints (PEP 484): Annotate expected parameter and return types (def add(a: int, b: int) -> int) for enhanced IDE autocomplete, documentation, and static type checking.",
        "• Variable Scope (LEGB): Local variables created inside functions are private to that function's stack frame and cannot be accessed globally."
      ],
      codeSnippet: `def create_booking(\n    customer_name: str,\n    nights: int = 1,\n    guests: int = 1,\n    room_type: str = "Standard"\n) -> dict:\n    # nights and guests have default values\n    return {\n        "customer": customer_name,\n        "nights": nights,\n        "guests": guests,\n        "room": room_type\n    }\n\n# Call using keyword arguments\nbooking = create_booking(customer_name="Rahul", nights=3, room_type="Deluxe")`
    },
    {
      id: "subtopic-composition",
      title: "Function Composition & Workflow Decomposition",
      paragraphs: [
        "Professional software engineering decomposes large monolithic scripts into small, single-responsibility functions that compose cleanly.",
        "Each function handles one isolated domain responsibility (validation, computation, persistence) and returns predictable data structures."
      ],
      codeSnippet: `def calculate_room_cost(price_per_night: int, nights: int) -> int:\n    return price_per_night * nights\n\ndef calculate_food_cost(price_per_night: int, nights: int) -> int:\n    return price_per_night * nights\n\ndef compute_full_resort_bill(room_rate: int, food_rate: int, nights: int) -> int:\n    room_total = calculate_room_cost(room_rate, nights)\n    food_total = calculate_food_cost(food_rate, nights)\n    return room_total + food_total\n\ntotal_bill = compute_full_resort_bill(5000, 1500, 3)  # ₹19,500`
    }
  ],
  whyItMatters: {
    title: "2 · Real-World Context: Booking Pipelines & AI Agent Loops",
    paragraphs: [
      "In production systems, control flow and functions are the mechanisms that translate business logic into verifiable code.",
      "Real-World Resort Booking Pipeline: An online reservation system receives incoming requests, checks room availability via boolean guards, calculates multi-night room and meal costs through composed helper functions, applies discount tiers via if/elif logic, and returns a verified confirmation dictionary.",
      "Autonomous AI Agent Execution Loops: In modern AI systems (ReAct loops, LangGraph, OpenAI Tool Calling), agents do not execute linear paths. The orchestrator repeatedly extracts intent from user requests, checks if required tool arguments exist (if/else), calls external API functions, inspects tool availability, and loops until termination tokens are emitted."
    ]
  },
  architecture: {
    title: "3 · Architecture: Agentic Decision & Execution Flow",
    flowSummary:
      "User Request (str) → Extract Details & Validate (if/else) → Availability Check → Compute Pricing via Composed Functions → Confirmation Gate → Persist Booking (dict)",
    flowSteps: [
      {
        step: "01",
        label: "Information Extraction",
        desc: "Parse raw user prompt into typed arguments (guests: int, nights: int, room: str)."
      },
      {
        step: "02",
        label: "Validation Guard",
        desc: "Evaluate input constraints (if guests <= 0 or nights <= 0) to abort early on bad data."
      },
      {
        step: "03",
        label: "Domain Computation",
        desc: "Execute pure functions calculate_room_cost() and calculate_food_cost()."
      },
      {
        step: "04",
        label: "Confirmation & Output",
        desc: "Format dynamic summary f-string and emit structured JSON response."
      }
    ],
    paragraphs: [
      "Decomposing monolithic workflows into pure, typed functions ensures testability, prevents unhandled edge cases, and provides deterministic execution paths."
    ]
  },
  code: {
    title: "4 · Code: Monolithic Script vs Modular Production Functions",
    before: {
      filename: "naive_booking_script.py",
      language: "PYTHON",
      code: `# Problematic: Unstructured script with hardcoded globals and zero validation
guests = 2
nights = 3
room_price = 5000
food_price = 1500

# Duplicated computation logic scattered across script
room_total = room_price * nights
food_total = food_price * nights
total = room_total + food_total

# No validation checks: negative guests or nights produce bogus charges!
# Unreusable: logic cannot be imported by API endpoints or background workers
print("Booking confirmed: " + str(total))`,
      problems: [
        "Unstructured global variables pollute scope and prevent reusability across API handlers",
        "Zero input validation allows invalid states (negative nights or zero guests)",
        "Logic is not encapsulated in functions, making automated unit testing impossible"
      ]
    },
    after: {
      filename: "production_booking_pipeline.py",
      language: "PYTHON",
      code: `from typing import Dict, Any, Optional

def validate_booking_request(guests: int, nights: int) -> bool:
    """Validate that guest and night quantities satisfy business rules."""
    if guests <= 0 or nights <= 0:
        return False
    if nights > 30:  # Maximum booking limit
        return False
    return True

def calculate_stay_cost(
    room_rate_per_night: float,
    food_rate_per_night: float,
    nights: int,
    discount_tier: Optional[str] = None
) -> float:
    """Calculate total stay cost with optional tiered loyalty discounts."""
    subtotal = (room_rate_per_night + food_rate_per_night) * nights
    
    # Tiered discount control flow
    discount_multiplier = 1.0
    if discount_tier == "VIP":
        discount_multiplier = 0.80  # 20% discount
    elif discount_tier == "MEMBER":
        discount_multiplier = 0.90  # 10% discount

    return round(subtotal * discount_multiplier, 2)

def process_resort_booking(
    customer_name: str,
    guests: int,
    nights: int,
    room_rate: float = 5000.0,
    food_rate: float = 1500.0,
    tier: Optional[str] = None
) -> Dict[str, Any]:
    """Orchestrate validation, pricing, and booking state assembly."""
    if not validate_booking_request(guests, nights):
        return {
            "status": "error",
            "message": "Invalid booking parameters. Guests and nights must be positive integers."
        }

    total_amount = calculate_stay_cost(
        room_rate_per_night=room_rate,
        food_rate_per_night=food_rate,
        nights=nights,
        discount_tier=tier
    )

    return {
        "status": "success",
        "customer_name": customer_name,
        "guests": guests,
        "nights": nights,
        "total_amount": total_amount,
        "confirmation_message": f"Confirmed booking for {customer_name} ({nights} nights). Total: ₹{total_amount:,.2f}"
    }

# Execute pipeline
result = process_resort_booking(customer_name="Rahul", guests=2, nights=3, tier="MEMBER")
print(result["confirmation_message"])
print("State Output:", result)`,
      improvements: [
        "Separation of concerns: validation, pricing, and orchestration are isolated in focused functions",
        "PEP 484 type hints and docstrings document expectations for team collaboration",
        "Clean guard clauses prevent invalid states from reaching pricing computation",
        "Returns structured dictionary payloads ready for REST API responses and database persistence"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Control Flow & Function Composition Sandbox",
    description:
      "Simulate function composition, tiered discount branching, and loop iterations for booking and agent workflows.",
    scenarios: [
      {
        name: "Resort Pricing with Member Discount",
        method: "PYTHON",
        endpoint: "booking_pricing.py",
        payload: `nights = 3\nrate = 5000\nfood = 1500\ntier = "MEMBER"\n\ndef calc(n, r, f, t):\n    total = (r + f) * n\n    return total * 0.9 if t == 'MEMBER' else total\n\nresult = calc(nights, rate, food, tier)`,
        expectedStatus: 200,
        statusText: "COMPUTED",
        response: `{"subtotal": 19500, "discount": 1950, "final_total": 17550}`,
        explanation:
          "Applies a 10% membership discount branch to a 3-night stay computation."
      },
      {
        name: "Input Validation Guard Clause",
        method: "PYTHON",
        endpoint: "validator.py",
        payload: `def validate(guests, nights):\n    if guests <= 0 or nights <= 0:\n        return False\n    return True\n\nstatus = validate(guests=-1, nights=3)`,
        expectedStatus: 200,
        statusText: "VALIDATED",
        response: `{"is_valid": false, "reason": "Guests count cannot be negative"}`,
        explanation:
          "Guard clause detects invalid guest count and immediately returns False without executing billing logic."
      },
      {
        name: "Dictionary Iteration for Agent State",
        method: "PYTHON",
        endpoint: "state_traversal.py",
        payload: `agent_tools = {"search": True, "calculator": True, "database": False}\nactive_tools = [k for k, v in agent_tools.items() if v]`,
        expectedStatus: 200,
        statusText: "PROCESSED",
        response: `["search", "calculator"]`,
        explanation:
          "Iterates through tool availability dictionary and filters active capabilities into a clean list."
      }
    ]
  },
  observe: {
    title: "6 · Observe: Control Flow & Execution Performance",
    metrics: [
      { label: "Function Call Overhead", value: "~100 ns", status: "good", note: "CPython stack frame allocation" },
      { label: "Loop Efficiency", value: "O(N) Linear", status: "good", note: "Iterates through items sequentially" },
      { label: "Dict Key Check (in)", value: "O(1) Constant", status: "good", note: "Constant-time hash table lookup" },
      { label: "Branching Cost", value: "< 5 ns", status: "good", note: "Near-instant CPU instruction branch" }
    ],
    logs: [
      {
        time: "00:00:00.001",
        level: "INFO",
        tag: "Validation",
        message: "validate_booking_request(guests=2, nights=3) evaluated True."
      },
      {
        time: "00:00:00.002",
        level: "INFO",
        tag: "Control Flow",
        message: "Branching on discount_tier='MEMBER' -> applied 0.90 multiplier."
      },
      {
        time: "00:00:00.004",
        level: "INFO",
        tag: "Function Return",
        message: "calculate_stay_cost returned float value 17550.00."
      }
    ]
  },
  production: {
    title: "7 · Production: Best Practices for Functions & Control Flow",
    rules: [
      {
        title: "Keep Functions Small and Focused",
        description:
          "Adhere to the Single Responsibility Principle. A function should perform one specific task (e.g., validate_input(), calculate_price()) rather than being a 200-line monolith.",
        impact: "Simplifies unit testing, debugging, and code reusability across microservices."
      },
      {
        title: "Always Return Values Instead of Just Printing",
        description:
          "Reusable functions must return computed values. Printing values inside functions prevents callers from capturing, mutating, or passing the result forward.",
        impact: "Enables functional composition, automated testing, and API serialization."
      },
      {
        title: "Use Early Returns (Guard Clauses) to Avoid Deep Nesting",
        description:
          "Check failure conditions first and return immediately (e.g., 'if not is_valid: return error'). Avoid wrapping the entire function body in deeply nested if-else ladders.",
        impact: "Flattens indentation, significantly improving readability and cognitive maintainability."
      },
      {
        title: "Annotate with PEP 484 Type Hints",
        description:
          "Always specify parameter types and return types on public functions (def fn(a: int, b: str) -> bool).",
        impact: "Catches type mismatches during development via IDE analysis and prevents runtime type errors."
      }
    ]
  },
  challenge: {
    title: "8 · Challenge: Automated Resort Booking Engine",
    prompt:
      "Write a Python function 'book_resort(customer: str, nights: int, guests: int, is_vip: bool = False) -> dict' that validates inputs (guests and nights must be > 0), computes pricing (₹5,000/night room + ₹1,500/night food per room), applies a 15% VIP discount if is_vip is True, and returns a structured dictionary containing status, customer, total_amount, and formatted confirmation message.",
    hint: "Use an early return if validation fails. Calculate total as (5000 + 1500) * nights, then multiply by 0.85 if is_vip.",
    solutionCode: `# Automated Resort Booking Engine
from typing import Dict, Any

def book_resort(
    customer: str,
    nights: int,
    guests: int,
    is_vip: bool = False
) -> Dict[str, Any]:
    # 1. Validation Guard Clause
    if guests <= 0 or nights <= 0:
        return {
            "status": "error",
            "message": "Guests and nights must be positive integers."
        }

    # 2. Pricing Calculation
    room_rate = 5000
    food_rate = 1500
    subtotal = (room_rate + food_rate) * nights

    # 3. VIP Discount Branch
    discount = 0.15 if is_vip else 0.0
    total_amount = round(subtotal * (1.0 - discount), 2)

    # 4. Return Structured Response
    return {
        "status": "success",
        "customer": customer,
        "nights": nights,
        "guests": guests,
        "is_vip": is_vip,
        "total_amount": total_amount,
        "message": f"Booking confirmed for {customer}: {nights} nights, ₹{total_amount:,.2f} ({'VIP 15% applied' if is_vip else 'Standard Rate'})."
    }

# Test Cases
print(book_resort("Rahul", nights=3, guests=2, is_vip=True)["message"])
print(book_resort("Sneha", nights=-1, guests=2)["message"])`
  },
  checklist: [
    { id: "c1", text: "Understand sequential execution and why control flow is needed", category: "Fundamentals" },
    { id: "c2", text: "Use if, elif, and else to build branching decision trees", category: "Conditionals" },
    { id: "c3", text: "Apply comparison (==, !=, >, <) and logical operators (and, or, not)", category: "Operators" },
    { id: "c4", text: "Use membership (in) and identity (is None) operators idiomatic to Python", category: "Operators" },
    { id: "c5", text: "Evaluate truthy and falsy values to write clean guard clauses", category: "Conditionals" },
    { id: "c6", text: "Traverse sequences and dictionary key-value pairs using for loops", category: "Loops" },
    { id: "c7", text: "Use range(start, stop, step) for bounded counter iteration", category: "Loops" },
    { id: "c8", text: "Control loop execution with break, continue, and while conditions", category: "Loops" },
    { id: "c9", text: "Define reusable functions with def, parameters, and arguments", category: "Functions" },
    { id: "c10", text: "Distinguish returning data with return vs printing to console with print()", category: "Functions" },
    { id: "c11", text: "Set default parameter values and call functions with keyword arguments", category: "Functions" },
    { id: "c12", text: "Annotate functions with PEP 484 type hints for parameters and return values", category: "Type Hints" },
    { id: "c13", text: "Understand local vs global variable scope (LEGB rules)", category: "Scope" },
    { id: "c14", text: "Compose multiple smaller functions into larger end-to-end workflows", category: "Composition" },
    { id: "c15", text: "Model real-world business pipelines and AI agent tool calling loops", category: "AI Engineering" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What is the difference between '=' and '==' in Python?",
      options: [
        "'=' assigns a value to a variable, while '==' compares two values for equality",
        "'=' is only for integers, while '==' is for strings",
        "'==' assigns values and '=' compares them",
        "They are completely interchangeable"
      ],
      correctIndex: 0,
      explanation: "'=' is the assignment operator used to bind names to objects; '==' is the equality comparison operator."
    },
    {
      id: "q2",
      question: "What will 'for i in range(1, 6):' iterate over?",
      options: ["1, 2, 3, 4, 5", "1, 2, 3, 4, 5, 6", "0, 1, 2, 3, 4, 5", "0, 1, 2, 3, 4, 5, 6"],
      correctIndex: 0,
      explanation: "range(start, stop) starts at 'start' (1) and stops just before 'stop' (6), producing 1, 2, 3, 4, 5."
    },
    {
      id: "q3",
      question: "Which statement immediately terminates the execution of a loop in Python?",
      options: ["break", "continue", "pass", "return"],
      correctIndex: 0,
      explanation: "'break' immediately exits the loop; 'continue' skips only the current iteration."
    },
    {
      id: "q4",
      question: "Why is 'return' preferred over 'print()' inside reusable functions?",
      options: [
        "'return' passes the computed value back so other functions or variables can use it",
        "'print()' causes syntax errors inside functions",
        "'return' prints text faster than 'print()'",
        "There is no difference"
      ],
      correctIndex: 0,
      explanation: "Returning data allows functions to compose and pass values across API handlers, pipelines, and tests."
    },
    {
      id: "q5",
      question: "What is the purpose of Python type hints (e.g., 'def add(a: int, b: int) -> int:')?",
      options: [
        "To document expected types, enhance IDE autocomplete, and enable static type checking",
        "To compile Python into native C machine code",
        "To force Python to run 10x faster at runtime",
        "To turn Python into a statically compiled language like C++"
      ],
      correctIndex: 0,
      explanation: "Type hints document developer intent, power IDE linting, and catch type errors before deployment."
    },
    {
      id: "q6",
      question: "Which of the following values is evaluated as Falsy in Python?",
      options: ["[] (empty list)", "[0] (list with zero)", "'False' (string with text)", "1"],
      correctIndex: 0,
      explanation: "Empty collections ([]), empty strings (''), 0, None, and False are evaluated as Falsy in Python."
    },
    {
      id: "q7",
      question: "How do you loop through both keys and values of a dictionary 'user' simultaneously?",
      options: [
        "for key, value in user.items():",
        "for key, value in user.values():",
        "for key, value in user.all():",
        "for key, value in user.keys():"
      ],
      correctIndex: 0,
      explanation: "The '.items()' method yields (key, value) tuple pairs on each iteration."
    }
  ],
  skillsCount: 10,
  sectionsCount: 36,
  technologies: ["Python 3.11", "Control Flow", "Functions", "Type Hints", "Branching", "Iteration"],
  updatedDate: "2025-01-15"
};
