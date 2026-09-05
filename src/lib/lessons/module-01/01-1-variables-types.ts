import { DetailedLessonContent } from "../types";

export const lesson01_1: DetailedLessonContent = {
  chapterNumber: 1,
  categoryBadge: "Python Fundamentals · 20 min read · Beginner → Advanced",
  subtitle:
    "Master Python variables, memory references, dynamic typing, built-in data types (int, float, complex, str, bool, list, tuple, set, dict, None), mutability, type conversion, and how they power backend APIs and AI agents.",
  concept: {
    title: "1 · Concept: Variables & Core Data Types in Python",
    paragraphs: [
      "Python is a dynamically typed, high-level programming language widely used in web development, automation, data science, machine learning, and AI engineering.",
      "Before working with functions, APIs, databases, or AI agents, it is essential to understand two fundamental concepts: Variables and Data Types. These determine how Python stores, represents, and manipulates information in memory.",
      "What Is a Variable? A variable is a name that refers to a value or object in memory. For example, 'name = \"John\"' and 'age = 25' create names referencing a string object and an integer object. Python automatically infers types at runtime without explicit type declarations.",
      "Python Is Dynamically Typed: The object in memory possesses a type, while the variable is merely a reference label (e.g., 'age ───────► 25'). Reassigning 'x = 10' (<class 'int'>) to 'x = \"Hello\"' (<class 'str'>) rebinds the reference to a new string object.",
      "Python's Built-in Data Types encompass Numeric (int, float, complex), Text (str), Boolean (bool), Sequence (list, tuple), Set (set), Mapping (dict), and Null (NoneType). Each type serves distinct architectural purposes across backend systems, JSON payloads, and AI agent memory graphs."
    ]
  },
  subtopics: [
    {
      id: "subtopic-vars-dyn",
      title: "Variables, Memory References & Dynamic Typing",
      paragraphs: [
        "In Python, variables do not store values directly inside rigid memory slots; rather, variables are pointer tags bound to heap-allocated objects.",
        "Using type(x) reveals the runtime object class. Rebinding 'x = 10' to 'x = \"Hello\"' updates the reference pointer without requiring manual memory reallocation."
      ],
      codeSnippet: `x = 10\nprint(type(x))  # <class 'int'>\n\nx = "Hello"\nprint(type(x))  # <class 'str'>`
    },
    {
      id: "subtopic-numeric",
      title: "Numeric Types: Integer, Float & Complex",
      paragraphs: [
        "• int: Represents arbitrary-precision whole numbers (e.g., age = 25, count = 100). Standard division '/' returns a float, while floor division '//' truncates to integer.",
        "• float: Represents 64-bit IEEE 754 decimal values. For exact financial accounting, Python's decimal.Decimal module is preferred.",
        "• complex: Represents complex numbers with real and imaginary parts (e.g., z = 2 + 3j; z.real = 2.0, z.imag = 3.0)."
      ],
      mathFormula: "z = a + bj \\quad \\text{where } j = \\sqrt{-1}, \\quad \\text{and floor division } a // b = \\lfloor a/b \\rfloor",
      codeSnippet: `a = 10\nb = 3\nprint(a / b)   # 3.3333333333333335 (float)\nprint(a // b)  # 3 (int)\n\nz = 2 + 3j\nprint(z.real, z.imag)  # 2.0 3.0`
    },
    {
      id: "subtopic-strings-fstrings",
      title: "Strings (str) & Dynamic f-Strings",
      paragraphs: [
        "Strings represent immutable sequences of Unicode characters enclosed in single ('...') or double (\"...\") quotes.",
        "Modern Python recommends f-strings (f\"Hello {name}\") for dynamic text interpolation, essential for constructing LLM prompts, structured log traces, and API query parameters."
      ],
      codeSnippet: `name = "John"\nage = 25\nmessage = f"My name is {name} and I am {age} years old."\nprint(message)`
    },
    {
      id: "subtopic-booleans-none",
      title: "Booleans (bool) & NoneType (None)",
      paragraphs: [
        "• bool: Represents binary logical states (True and False), critical for conditional execution and application flags.",
        "• NoneType (None): Represents the intentional absence of a value, distinct from 0, False, or \"\". Used for uninitialized agent states and optional parameters."
      ],
      codeSnippet: `booking_confirmed = False\nbooking_id = None\n\nif booking_id is None:\n    print("Booking has not been created yet.")`
    },
    {
      id: "subtopic-collections",
      title: "Collections: List, Tuple, Set & Dictionary",
      paragraphs: [
        "• list ([1, 2, 3]): Ordered, mutable sequence with 0-based indexing for dynamic item collections.",
        "• tuple ((1, 2, 3)): Ordered, immutable sequence for fixed data structures (coordinates, RGB colors).",
        "• set ({1, 2, 3}): Unordered collection of unique elements with automatic deduplication and O(1) membership testing.",
        "• dict ({'key': 'value'}): Hash-map of key-value pairs representing structured JSON, API bodies, and AI state graphs."
      ],
      codeSnippet: `skills = ["Python", "AI", "Python", "SQL"]\nunique_skills = set(skills)  # {'Python', 'AI', 'SQL'}\n\nuser = {"name": "John", "age": 25, "city": "Hyderabad"}\nprint(user["name"])  # John`
    },
    {
      id: "subtopic-mutability-identity",
      title: "Mutability & Identity (== vs is)",
      paragraphs: [
        "• Mutability: Lists, dicts, and sets are mutable (modified in-place). Int, float, str, bool, and tuple are immutable (modifications create new objects).",
        "• '==' vs 'is': '==' evaluates equality of values, while 'is' checks object identity (whether both variables point to the exact same memory address). Always use 'is None'."
      ],
      codeSnippet: `a = [1, 2]\nb = [1, 2]\nprint(a == b)  # True (equal values)\nprint(a is b)  # False (distinct objects in memory)\n\n# Correct singleton check:\nif a is not None:\n    print("List exists")`
    }
  ],
  whyItMatters: {
    title: "2 · Real-World Context: Booking Systems & AI Engineering",
    paragraphs: [
      "Understanding Python's data types is not just academic—it forms the backbone of real-world backends, APIs, and AI systems.",
      "Real-World Example (Resort Booking System): Imagine building an AI-powered resort booking agent. A customer requests: 'I want to stay for 3 nights for 2 people.' You represent the data using customer_name (str), number_of_guests (int), number_of_nights (int), room_price_per_night (int/float), and booking_confirmed (bool). Calculating total = (room_price + food_price) * number_of_nights produces the exact billing, packaged into a structured dictionary for database persistence.",
      "AI Engineering Agent State: Modern agent architectures (LangGraph, OpenAI Swarm) pass state across nodes using structured dictionaries containing user_query (str), token_budget (int), retrieved_documents (list of str), tool_result (dict or None), and active_status (bool).",
      "The complete stack builds systematically: Variables & Data Types → Data Structures → Control Flow → Functions → REST APIs → Vector Databases → AI Agents."
    ]
  },
  architecture: {
    title: "3 · Architecture: Python Data Flow & State Lifecycle",
    flowSummary:
      "Raw Input (str) → Type Validation & Casting (int/float/bool) → Structured State (dict/list) → Business Logic / AI Inference → Serialized JSON Response",
    flowSteps: [
      {
        step: "01",
        label: "Input Ingestion",
        desc: "User inputs arrive as strings ('25', 'Rahul') via input() or HTTP request body."
      },
      {
        step: "02",
        label: "Type Casting & Validation",
        desc: "Convert strings to native numeric/boolean types (int('25') -> 25) with ValueError checks."
      },
      {
        step: "03",
        label: "Structured State Assembly",
        desc: "Group related variables into a dictionary representing application or agent session state."
      },
      {
        step: "04",
        label: "Computation & Output",
        desc: "Execute arithmetic, evaluate boolean flags, construct f-strings, and serialize to JSON."
      }
    ],
    paragraphs: [
      "Clean variable naming (snake_case) and precise data type assignments eliminate runtime type mismatches and ensure deterministic application behavior."
    ]
  },
  code: {
    title: "4 · Code: Unsafe Loose Variables vs Structured Production State",
    before: {
      filename: "naive_booking_system.py",
      language: "PYTHON",
      code: `# Problematic: Storing numbers and booleans as untyped strings
customer_name = "Rahul"
number_of_guests = "2"        # String: breaks arithmetic comparisons
number_of_nights = "3"        # String: breaks multiplication
room_price_per_night = "5000" # String
food_price_per_night = "1500" # String
booking_confirmed = "False"   # String: bool("False") evaluates to True!

# String concatenation instead of arithmetic
# total = room_price_per_night * number_of_nights  # Produces '500050005000'!

# Unstructured loose variables and error-prone '+' string joins
message = "Customer " + customer_name + " booked for " + number_of_nights + " nights."
print(message)`,
      problems: [
        "Storing numeric values as strings leads to string repetition ('5000' * 3 = '500050005000') instead of arithmetic",
        "String boolean 'False' is truthy (bool('False') == True), causing critical logic bugs",
        "String concatenation with '+' is clumsy and raises TypeError when combining non-string types"
      ]
    },
    after: {
      filename: "production_booking_system.py",
      language: "PYTHON",
      code: `# 1. Strong Primitive Data Types
customer_name: str = "Rahul"
number_of_guests: int = 2
number_of_nights: int = 3
room_price_per_night: int = 5000
food_price_per_night: int = 1500
booking_confirmed: bool = False

# 2. Exact Arithmetic Computation
room_total = room_price_per_night * number_of_nights
food_total = food_price_per_night * number_of_nights
total_amount = room_total + food_total  # 19500

# 3. Dynamic f-String Formatting
confirmation_msg = f"Booking for {customer_name}: {number_of_nights} nights, Total: ₹{total_amount:,}"

# 4. Structured Dictionary State (JSON-Ready)
booking_state = {
    "customer_name": customer_name,
    "guests": number_of_guests,
    "nights": number_of_nights,
    "room_total": room_total,
    "food_total": food_total,
    "total_amount": total_amount,
    "confirmed": booking_confirmed,
    "room_options": ["Deluxe", "Suite", "Villa"]  # List
}

# Confirm and mutate state
booking_state["confirmed"] = True
print(confirmation_msg)
print("Persisted Booking State:", booking_state)`,
      improvements: [
        "Native int and float primitives guarantee accurate arithmetic calculations",
        "Boolean flags ensure strictly correct conditional branching",
        "Modern f-strings provide clean, readable string interpolation with formatting support",
        "Dictionaries bundle application state cleanly for API endpoints and database records"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Python Data Types & State Mutation Sandbox",
    description:
      "Execute interactive simulations of variable rebinding, f-string dynamic prompts, list mutation, and dictionary state updates.",
    scenarios: [
      {
        name: "Resort Booking Calculation",
        method: "PYTHON",
        endpoint: "resort_booking.py",
        payload: `nights = 3\nrate = 5000\nfood = 1500\ntotal = (rate + food) * nights\nstatus = True\nbooking = {"nights": nights, "total": total, "confirmed": status}`,
        expectedStatus: 200,
        statusText: "CALCULATED",
        response: `{"nights": 3, "total": 19500, "confirmed": true}`,
        explanation:
          "Computes combined room and food totals using native integer arithmetic and packages into a structured dictionary."
      },
      {
        name: "Dynamic Prompt Template (f-string)",
        method: "PYTHON",
        endpoint: "prompt_engine.py",
        payload: `name = "Rahul"\ntopic = "AI Engineering"\nlevel = "advanced"\nprompt = f"Generate {level} tutorial on {topic} for {name}."`,
        expectedStatus: 200,
        statusText: "INTERPOLATED",
        response: `"Generate advanced tutorial on AI Engineering for Rahul."`,
        explanation:
          "F-strings cleanly interpolate variables into prompt templates without manual string concatenation."
      },
      {
        name: "Set Deduplication & List Mutation",
        method: "PYTHON",
        endpoint: "skills_filter.py",
        payload: `raw_skills = ["Python", "SQL", "Python", "PyTorch", "SQL"]\nunique_skills = list(set(raw_skills))\nunique_skills.append("LangGraph")`,
        expectedStatus: 200,
        statusText: "MUTATED",
        response: `["Python", "SQL", "PyTorch", "LangGraph"]`,
        explanation:
          "Casting list to set eliminates duplicate skills, then appending mutates the list in-place."
      }
    ]
  },
  observe: {
    title: "6 · Observe: Type System & Memory Characteristics",
    metrics: [
      { label: "Typing Discipline", value: "Dynamic", status: "good", note: "Types associated with objects, not variable names" },
      { label: "Dict Key Lookup", value: "O(1) Time", status: "good", note: "Constant-time hash table address resolution" },
      { label: "List Mutability", value: "Mutable", status: "good", note: "In-place modification via index or append" },
      { label: "Tuple Mutability", value: "Immutable", status: "good", note: "Fixed allocation with zero mutation risk" }
    ],
    logs: [
      {
        time: "00:00:00.001",
        level: "INFO",
        tag: "Memory Reference",
        message: "Variable 'age' allocated reference pointer to int object (25) at heap address 0x7f9a."
      },
      {
        time: "00:00:00.003",
        level: "INFO",
        tag: "Type Inspection",
        message: "type('Hello') evaluated as <class 'str'> | type(25.5) evaluated as <class 'float'>."
      },
      {
        time: "00:00:00.005",
        level: "INFO",
        tag: "Equality vs Identity",
        message: "[1, 2] == [1, 2] -> True (values match) | [1, 2] is [1, 2] -> False (distinct object IDs)."
      }
    ]
  },
  production: {
    title: "7 · Production: Rules & Best Practices for Variables & Types",
    rules: [
      {
        title: "Follow snake_case Naming Conventions",
        description:
          "Use descriptive, lowercase snake_case names (e.g. 'booking_confirmed', 'room_price_per_night'). Never use single-letter variables like 'x' or 'a' in production logic.",
        impact: "Improves readability and eliminates ambiguity across large codebase architectures."
      },
      {
        title: "Always Cast Input from input() or External APIs",
        description:
          "Remember that input() and raw HTTP query strings always return str. Explicitly cast to int(), float(), or parse via schema before arithmetic.",
        impact: "Prevents runtime TypeErrors and unexpected string concatenation bugs."
      },
      {
        title: "Use 'is None' for Singleton Checks",
        description:
          "Always test for missing values using 'if variable is None:' rather than 'if variable == None:'. 'is' compares memory identity with the singleton None object.",
        impact: "Ensures idiomatic Python execution and avoids custom __eq__ override pitfalls."
      },
      {
        title: "Bundle Related State in Structured Dictionaries",
        description:
          "Group related variables into a single dictionary or Pydantic model instead of passing 10 loose variables between functions.",
        impact: "Simplifies state persistence, API serialization, and multi-step pipeline handoffs."
      }
    ]
  },
  challenge: {
    title: "8 · Challenge: AI Resort Booking State Engine",
    prompt:
      "Write a Python script that takes booking variables (customer_name='Rahul', guests=2, nights=3, room_rate=5000, food_rate=1500), computes the total cost, bundles the state into a dictionary with a list of requested amenities (['WiFi', 'Breakfast', 'Spa']), and prints a formatted f-string confirmation summary.",
    hint: "Calculate total as (room_rate + food_rate) * nights. Use f-string formatting with commas f'₹{total:,}'.",
    solutionCode: `# AI Resort Booking State Engine
customer_name = "Rahul"
number_of_guests = 2
number_of_nights = 3
room_price_per_night = 5000
food_price_per_night = 1500
booking_confirmed = True

# Calculate totals
room_total = room_price_per_night * number_of_nights
food_total = food_price_per_night * number_of_nights
total_amount = room_total + food_total

# Structured Booking Dictionary
booking = {
    "customer_name": customer_name,
    "guests": number_of_guests,
    "nights": number_of_nights,
    "room_total": room_total,
    "food_total": food_total,
    "total_amount": total_amount,
    "confirmed": booking_confirmed,
    "amenities": ["High-Speed WiFi", "Complimentary Breakfast", "Spa Access"]
}

# Dynamic Summary
summary = (
    f"--- Booking Confirmation ---\\n"
    f"Guest: {booking['customer_name']} ({booking['guests']} guests)\\n"
    f"Stay Duration: {booking['nights']} nights\\n"
    f"Total Amount: ₹{booking['total_amount']:,}\\n"
    f"Amenities: {', '.join(booking['amenities'])}\\n"
    f"Status: {'Confirmed' if booking['confirmed'] else 'Pending'}"
)

print(summary)`
  },
  checklist: [
    { id: "c1", text: "Explain what a variable is and how it references memory objects", category: "Fundamentals" },
    { id: "c2", text: "Understand dynamic typing and runtime type rebinding in Python", category: "Type System" },
    { id: "c3", text: "Use numeric types (int, float, complex) and understand '/' vs '//'", category: "Numeric Types" },
    { id: "c4", text: "Format dynamic strings using modern Python f-strings", category: "Text & Strings" },
    { id: "c5", text: "Evaluate booleans (bool) and understand NoneType (None)", category: "Logic & Null" },
    { id: "c6", text: "Create and modify mutable lists (list) with 0-based indexing", category: "Collections" },
    { id: "c7", text: "Differentiate immutable tuples (tuple) from lists for fixed data", category: "Collections" },
    { id: "c8", text: "Use sets (set) for automatic deduplication and membership testing", category: "Collections" },
    { id: "c9", text: "Structure key-value mappings using dictionaries (dict)", category: "Collections" },
    { id: "c10", text: "Inspect variable types using the built-in type() function", category: "Type System" },
    { id: "c11", text: "Perform safe type conversions with int(), float(), str(), bool()", category: "Type Casting" },
    { id: "c12", text: "Understand why input() returns str and how to cast user input", category: "I/O & Casting" },
    { id: "c13", text: "Apply snake_case naming rules and recognize case-sensitivity", category: "Best Practices" },
    { id: "c14", text: "Use multiple assignment and in-place variable swapping (a, b = b, a)", category: "Syntax Tricks" },
    { id: "c15", text: "Understand mutable vs immutable objects in memory", category: "Memory Model" },
    { id: "c16", text: "Distinguish value equality (==) from object identity (is)", category: "Comparison" },
    { id: "c17", text: "Model real-world backend applications and AI agent state using Python data types", category: "AI Engineering" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "In Python, what does a variable actually store?",
      options: [
        "A reference (pointer) to an object allocated in memory",
        "A fixed-size memory slot hardcoded to one static type",
        "Only string representations of data",
        "A direct CPU register value"
      ],
      correctIndex: 0,
      explanation: "In Python, variables are names that point to objects allocated in memory; the type belongs to the object itself."
    },
    {
      id: "q2",
      question: "What is the output of '10 // 3' in Python?",
      options: ["3", "3.3333333333333335", "3.0", "1"],
      correctIndex: 0,
      explanation: "The '//' floor division operator performs integer division and returns the truncated whole number 3."
    },
    {
      id: "q3",
      question: "What is the result of 'type(input(\"Enter a number: \"))' if the user enters 25?",
      options: ["<class 'str'>", "<class 'int'>", "<class 'float'>", "<class 'number'>"],
      correctIndex: 0,
      explanation: "Python's input() function always returns user input as a string (<class 'str'>), requiring explicit casting."
    },
    {
      id: "q4",
      question: "Which of the following data structures is immutable in Python?",
      options: ["tuple", "list", "dict", "set"],
      correctIndex: 0,
      explanation: "Tuples are immutable sequences; once created, their elements cannot be modified, added, or removed."
    },
    {
      id: "q5",
      question: "What is the difference between '==' and 'is' in Python?",
      options: [
        "'==' checks for value equality, while 'is' checks for object memory identity",
        "'==' is only for numbers, while 'is' is only for strings",
        "'is' checks for value equality, while '==' checks for identity",
        "They are completely identical and interchangeable"
      ],
      correctIndex: 0,
      explanation: "'==' checks if two objects hold equal values, while 'is' verifies if both variables point to the exact same object in memory."
    },
    {
      id: "q6",
      question: "What will 'set([\"Python\", \"AI\", \"Python\", \"SQL\"])' produce?",
      options: [
        "{'Python', 'AI', 'SQL'} (unique set with duplicates removed)",
        "['Python', 'AI', 'Python', 'SQL']",
        "('Python', 'AI', 'SQL')",
        "TypeError: set cannot accept a list"
      ],
      correctIndex: 0,
      explanation: "Sets in Python enforce element uniqueness and automatically eliminate duplicate values."
    },
    {
      id: "q7",
      question: "What is the recommended way to test if a variable is None in Python?",
      options: [
        "if variable is None:",
        "if variable == None:",
        "if variable.equals(None):",
        "if variable == 0:"
      ],
      correctIndex: 0,
      explanation: "'if variable is None:' is the idiomatic standard because None is a singleton object in Python."
    },
    {
      id: "q8",
      question: "How do you swap two variables 'a' and 'b' in Python without a temporary variable?",
      options: [
        "a, b = b, a",
        "swap(a, b)",
        "a = b; b = a",
        "a.swap(b)"
      ],
      correctIndex: 0,
      explanation: "Python's tuple unpacking syntax 'a, b = b, a' allows simultaneous assignment and instant swapping."
    }
  ],
  skillsCount: 10,
  sectionsCount: 26,
  technologies: ["Python 3.11", "Variables", "Data Types", "f-Strings", "Dynamic Typing", "Memory References"],
  updatedDate: "2025-01-15"
};
