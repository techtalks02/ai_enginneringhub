import { DetailedLessonContent } from "../types";

export const lesson01_3: DetailedLessonContent = {
  chapterNumber: 3,
  categoryBadge: "Python Fundamentals · 25 min read · Intermediate → Advanced",
  subtitle:
    "Master classes, objects, the four pillars of OOP (Encapsulation, Abstraction, Inheritance, Polymorphism), dunder methods, dataclasses, properties, and design patterns for building scalable AI systems and provider abstractions.",
  concept: {
    title: "1 · Concept: Object-Oriented Architecture in Python",
    paragraphs: [
      "As software systems grow in complexity, procedural code (a flat list of sequential instructions and loose variables) becomes difficult to maintain, test, and scale. Object-Oriented Programming (OOP) solves this by bundling data (attributes) and behavior (methods) into cohesive, reusable entities called objects.",
      "In Python, everything is an object—from simple integers and strings to functions, modules, and classes. Mastering OOP enables you to architect robust software models, such as database ORMs, REST API service layers, custom memory buffers, and multi-provider AI model orchestrators.",
      "A Class serves as a blueprint or template that defines the structure and capabilities of an entity (e.g., 'ResortBooking', 'LLMClient', 'AgentTool'). An Object (or instance) is a concrete instantiation of that blueprint created in memory (e.g., 'booking_101 = ResortBooking(...)').",
      "Modern AI engineering frameworks (LangChain, LlamaIndex, vLLM, PyTorch, LiteLLM) are built entirely on OOP abstractions: Abstract Base Classes (ABCs) enforce consistent interfaces across model providers, dataclasses serialize messages, and polymorphic tool classes enable autonomous agent execution loops."
    ]
  },
  subtopics: [
    {
      id: "subtopic-classes-objects",
      title: "Classes, Objects, __init__, and the 'self' Keyword",
      paragraphs: [
        "A class is defined using the 'class' keyword (using PascalCase naming).",
        "The '__init__' method is the constructor initializer that automatically executes whenever a new instance is created. It initializes the object's initial state.",
        "The 'self' parameter represents the specific instance being operated on, allowing methods to bind and access instance-specific data."
      ],
      codeSnippet: `class ResortBooking:\n    def __init__(self, guest_name: str, nights: int, room_rate: float = 5000.0):\n        # Instance attributes bound to self\n        self.guest_name = guest_name\n        self.nights = nights\n        self.room_rate = room_rate\n        self.is_confirmed = False\n\n    def calculate_total(self) -> float:\n        return self.nights * self.room_rate\n\n# Create an instance (object)\nbooking1 = ResortBooking("Rahul", nights=3)\nprint(f"Guest: {booking1.guest_name}, Total: ₹{booking1.calculate_total():,}")`
    },
    {
      id: "subtopic-attributes-methods",
      title: "Instance vs Class Attributes & Method Types (@classmethod, @staticmethod)",
      paragraphs: [
        "• Instance Attributes: Bound to 'self' and unique to each object instance.",
        "• Class Attributes: Defined directly in the class body and shared across all instances (e.g., TAX_RATE = 0.18).",
        "• Instance Methods: Receive 'self' and operate on instance state.",
        "• Class Methods (@classmethod): Receive 'cls' (the class itself) and are often used for alternative constructors (e.g., 'from_json()').",
        "• Static Methods (@staticmethod): Self-contained utility functions that do not access 'self' or 'cls'."
      ],
      codeSnippet: `class BookingService:\n    TAX_RATE: float = 0.18  # Class attribute (shared)\n\n    def __init__(self, room_cost: float):\n        self.room_cost = room_cost  # Instance attribute\n\n    @classmethod\n    def create_deluxe(cls) -> "BookingService":\n        """Factory class method."""\n        return cls(room_cost=8000.0)\n\n    @staticmethod\n    def format_currency(amount: float) -> str:\n        """Pure utility function."""\n        return f"₹{amount:,.2f}"\n\ndeluxe = BookingService.create_deluxe()\nprint(BookingService.format_currency(deluxe.room_cost * (1 + BookingService.TAX_RATE)))`
    },
    {
      id: "subtopic-encapsulation-properties",
      title: "Encapsulation & Managed Attributes (@property)",
      paragraphs: [
        "Encapsulation hides internal implementation details and protects state from unauthorized external modification.",
        "• Protected (_name): Convention indicating internal use.",
        "• Private (__name): Triggers name mangling to prevent accidental overriding in subclasses.",
        "• @property Decorator: Provides a clean, pythonic way to define getters, setters, and validation logic without breaking existing attribute-access syntax."
      ],
      codeSnippet: `class BankAccount:\n    def __init__(self, owner: str, balance: float):\n        self.owner = owner\n        self._balance = max(0.0, balance)  # Protected attribute\n\n    @property\n    def balance(self) -> float:\n        """Getter for balance."""\n        return self._balance\n\n    @balance.setter\n    def balance(self, value: float) -> None:\n        """Setter with validation."""\n        if value < 0:\n            raise ValueError("Balance cannot be negative.")\n        self._balance = value\n\nacc = BankAccount("Rahul", 15000.0)\nacc.balance = 20000.0  # Validated via setter\nprint(f"Current Balance: ₹{acc.balance:,}")`
    },
    {
      id: "subtopic-inheritance-super",
      title: "Inheritance & Method Overriding with super()",
      paragraphs: [
        "Inheritance allows a child (derived) class to inherit attributes and methods from a parent (base) class, promoting code reuse.",
        "The child class can override specific methods to specialize behavior and invoke parent logic using 'super()'.",
        "Python supports single and multiple inheritance, resolved deterministically via the Method Resolution Order (MRO)."
      ],
      codeSnippet: `class BaseAgent:\n    def __init__(self, name: str, role: str):\n        self.name = name\n        self.role = role\n\n    def execute(self, prompt: str) -> str:\n        return f"[{self.role}] {self.name} processing: {prompt}"\n\nclass CodingAgent(BaseAgent):\n    def __init__(self, name: str, language: str = "Python"):\n        super().__init__(name=name, role="Code Generator")\n        self.language = language\n\n    def execute(self, prompt: str) -> str:\n        base_msg = super().execute(prompt)\n        return f"{base_msg}\\nGenerating production {self.language} code."\n\nagent = CodingAgent("Copilot-X", language="Python")\nprint(agent.execute("Build a REST API endpoint"))`
    },
    {
      id: "subtopic-polymorphism-abcs",
      title: "Polymorphism & Abstract Base Classes (ABCs)",
      paragraphs: [
        "Polymorphism allows different classes to expose the same method interface, enabling unified consumption by downstream systems.",
        "Python adheres to Duck Typing ('If it walks like a duck and quacks like a duck, it is a duck').",
        "The 'abc' module provides 'ABC' and '@abstractmethod' to enforce contract compliance: child classes must implement all abstract methods before instantiation is permitted."
      ],
      codeSnippet: `from abc import ABC, abstractmethod\n\nclass BaseLLM(ABC):\n    """Abstract protocol for all LLM providers."""\n    @abstractmethod\n    def generate_response(self, prompt: str) -> str:\n        pass\n\nclass OpenAIProvider(BaseLLM):\n    def generate_response(self, prompt: str) -> str:\n        return f"OpenAI (GPT-4o) output for '{prompt}'"\n\nclass AnthropicProvider(BaseLLM):\n    def generate_response(self, prompt: str) -> str:\n        return f"Anthropic (Claude 3.5 Sonnet) output for '{prompt}'"\n\n# Polymorphic function accepts any BaseLLM implementation\ndef run_pipeline(llm: BaseLLM, query: str):\n    return llm.generate_response(query)\n\nprint(run_pipeline(OpenAIProvider(), "Summarize article"))\nprint(run_pipeline(AnthropicProvider(), "Summarize article"))`
    },
    {
      id: "subtopic-magic-methods",
      title: "Dunder (Magic) Methods: __str__, __repr__, __len__, and __call__",
      paragraphs: [
        "Dunder (double underscore) methods allow custom classes to integrate with Python built-in operations (string representation, length calculation, equality, and function-call syntax).",
        "• __str__: Human-friendly string representation for print().",
        "• __repr__: Unambiguous developer representation for debugging.",
        "• __len__: Enables len(object).",
        "• __call__: Allows an instance to be called directly like a function (e.g. 'agent(\"prompt\")')."
      ],
      codeSnippet: `class AgentMemoryBuffer:\n    def __init__(self):\n        self._history = []\n\n    def add_message(self, role: str, content: str):\n        self._history.append({"role": role, "content": content})\n\n    def __len__(self) -> int:\n        return len(self._history)\n\n    def __call__(self, prompt: str) -> str:\n        self.add_message("user", prompt)\n        return f"Added message to memory. Total turns: {len(self)}"\n\n    def __repr__(self) -> str:\n        return f"AgentMemoryBuffer(turns={len(self._history)})"\n\nmemory = AgentMemoryBuffer()\nprint(memory("Hello AI"))  # Uses __call__\nprint(repr(memory))        # Uses __repr__`
    },
    {
      id: "subtopic-dataclasses",
      title: "Modern Data Structures: @dataclass for Clean Schemas",
      paragraphs: [
        "Introduced in Python 3.7 (PEP 557), '@dataclass' eliminates boilerplate by automatically generating '__init__', '__repr__', '__eq__', and type validation mechanisms.",
        "Adding 'frozen=True' creates immutable dataclasses, ideal for thread-safe configurations, embeddings, and telemetry events."
      ],
      codeSnippet: `from dataclasses import dataclass, field\nfrom typing import List\n\n@dataclass(frozen=True)\nclass LLMConfig:\n    model_name: str\n    temperature: float = 0.7\n    max_tokens: int = 4096\n    stop_sequences: List[str] = field(default_factory=lambda: ["<END>"])\n\nconfig = LLMConfig(model_name="gpt-4o", temperature=0.2)\nprint(config)  # Clean auto-generated repr`
    }
  ],
  whyItMatters: {
    title: "2 · Real-World Context: Extensible AI Architectures & Memory Buffers",
    paragraphs: [
      "Why is OOP vital for modern backend development and AI engineering?",
      "Model Provider Abstraction: In production AI products, you never hardcode a single vendor SDK (like raw openai calls). Instead, you define an abstract BaseLLMClient interface and implement concrete adapters (OpenAIClient, AnthropicClient, OllamaClient, MockClient). Downstream RAG pipelines and agents consume the interface, allowing you to hot-swap models without modifying any business logic.",
      "Custom Agent Memory & Tool Systems: LangChain tools and LangGraph nodes are modeled as callable classes with lifecycle methods (setup, validate, execute, teardown). Encapsulating API keys and rate limiters within tool instances prevents credential leakage and simplifies concurrency."
    ]
  },
  architecture: {
    title: "3 · Architecture: Polymorphic Model Provider & Tool System",
    flowSummary:
      "Client Application → BaseLLMClient (ABC) → Concrete Adapters (OpenAI / Anthropic / Ollama) → Standardized LLMResponse Dataclass → Agent State Graph",
    flowSteps: [
      {
        step: "01",
        label: "Abstract Base Contract",
        desc: "BaseLLMClient defines standard synchronous and streaming generate() protocols."
      },
      {
        step: "02",
        label: "Provider Adapter",
        desc: "Concrete classes encapsulate vendor SDKs, API authentication, and payload parsing."
      },
      {
        step: "03",
        label: "Normalized Dataclass",
        desc: "Maps divergent vendor schemas into a uniform LLMResponse (content, tokens, cost)."
      },
      {
        step: "04",
        label: "Dependency Injection",
        desc: "Inject mock or production LLM clients into agent graphs for deterministic testing."
      }
    ],
    paragraphs: [
      "Polymorphic design decouples application logic from third-party vendor SDK changes, providing zero-downtime flexibility."
    ]
  },
  code: {
    title: "4 · Code: Monolithic API Calls vs Production OOP Provider Pattern",
    before: {
      filename: "hardcoded_vendor_calls.py",
      language: "PYTHON",
      code: `# Brittle procedural approach: hardcoded vendor calls scattered everywhere
import openai
import anthropic

def generate_chat_response(prompt, provider="openai"):
    if provider == "openai":
        # Direct vendor dependency
        res = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}]
        )
        return res.choices[0].message.content
    elif provider == "anthropic":
        client = anthropic.Client(api_key="sk-ant-...")
        res = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            messages=[{"role": "user", "content": prompt}]
        )
        return res.content[0].text
    else:
        raise ValueError("Unknown provider")`,
      problems: [
        "Violates Open-Closed Principle: adding a new model requires editing core routing functions",
        "Impossible to unit test with mock data without mocking global network modules",
        "Divergent vendor response formats lead to KeyError exceptions across the codebase"
      ]
    },
    after: {
      filename: "production_oop_llm_engine.py",
      language: "PYTHON",
      code: `from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Dict, Any, Optional
import time

# 1. Type-Safe Standardized Response Schema
@dataclass(frozen=True)
class LLMResponse:
    content: str
    tokens_used: int
    model: str
    latency_ms: float

# 2. Abstract Base Class Contract
class BaseLLMProvider(ABC):
    """Unified interface for all foundational LLM backends."""
    
    def __init__(self, api_key: str, default_model: str):
        self._api_key = api_key
        self.default_model = default_model

    @abstractmethod
    def complete(self, prompt: str, **kwargs) -> LLMResponse:
        """Execute text completion and return normalized LLMResponse."""
        pass

# 3. Concrete OpenAI Adapter
class OpenAIProvider(BaseLLMProvider):
    def complete(self, prompt: str, **kwargs) -> LLMResponse:
        start_time = time.time()
        # Simulated sanitized vendor execution
        simulated_output = f"[OpenAI {self.default_model}]: Response for '{prompt}'"
        latency = (time.time() - start_time) * 1000
        return LLMResponse(
            content=simulated_output,
            tokens_used=145,
            model=self.default_model,
            latency_ms=round(latency, 2)
        )

# 4. Concrete Anthropic Adapter
class AnthropicProvider(BaseLLMProvider):
    def complete(self, prompt: str, **kwargs) -> LLMResponse:
        start_time = time.time()
        simulated_output = f"[Anthropic {self.default_model}]: Response for '{prompt}'"
        latency = (time.time() - start_time) * 1000
        return LLMResponse(
            content=simulated_output,
            tokens_used=132,
            model=self.default_model,
            latency_ms=round(latency, 2)
        )

# 5. Zero-Cost Mock Provider for CI/CD Testing
class MockLLMProvider(BaseLLMProvider):
    def complete(self, prompt: str, **kwargs) -> LLMResponse:
        return LLMResponse(
            content="MOCK_TEST_PASSED",
            tokens_used=10,
            model="mock-v1",
            latency_ms=0.5
        )

# 6. Consumer Application utilizing Dependency Injection
class AIAssistantAgent:
    def __init__(self, provider: BaseLLMProvider):
        self.provider = provider

    def answer_user(self, user_question: str) -> str:
        response = self.provider.complete(user_question)
        return f"Agent Response ({response.model} in {response.latency_ms}ms):\\n{response.content}"

# Hot-swap providers seamlessly with zero consumer changes
agent = AIAssistantAgent(provider=OpenAIProvider(api_key="sk-...", default_model="gpt-4o"))
print(agent.answer_user("Explain OOP in Python"))

mock_agent = AIAssistantAgent(provider=MockLLMProvider(api_key="none", default_model="mock"))
print(mock_agent.answer_user("Run unit test"))`,
      improvements: [
        "Open-Closed Principle: add new providers (Gemini, Mistral, Ollama) by creating a class without altering existing code",
        "Deterministic unit testing using MockLLMProvider with zero network overhead",
        "Normalized LLMResponse dataclass eliminates divergent vendor payload handling"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Provider Hot-Swapping & Memory Buffers",
    description:
      "Execute interactive simulations of hot-swapping polymorphic LLM clients and testing state encapsulation in memory buffers.",
    scenarios: [
      {
        name: "OpenAI Provider Dispatch",
        method: "PYTHON",
        endpoint: "provider_dispatcher.py",
        payload: `provider = OpenAIProvider(api_key="sk-...", default_model="gpt-4o")\nresponse = provider.complete("What is RAG?")`,
        expectedStatus: 200,
        statusText: "DISPATCHED",
        response: `{"content": "[OpenAI gpt-4o]: Response for 'What is RAG?'", "tokens_used": 145, "model": "gpt-4o"}`,
        explanation:
          "OpenAIProvider satisfies BaseLLMProvider abstract contract and emits normalized dataclass."
      },
      {
        name: "Mock Provider for Zero-Cost Testing",
        method: "PYTHON",
        endpoint: "mock_test.py",
        payload: `mock = MockLLMProvider(api_key="none", default_model="mock-v1")\nresponse = mock.complete("Healthcheck")`,
        expectedStatus: 200,
        statusText: "TEST_PASSED",
        response: `{"content": "MOCK_TEST_PASSED", "tokens_used": 10, "model": "mock-v1", "latency_ms": 0.5}`,
        explanation:
          "Mock client allows running 1,000 automated CI/CD unit tests in 0.05 seconds with $0.00 API cost."
      }
    ]
  },
  observe: {
    title: "6 · Observe: OOP Performance & Memory Characteristics",
    metrics: [
      { label: "Attribute Access", value: "~45 ns", status: "good", note: "Optimized CPython __dict__ hash slot" },
      { label: "Dataclass Overhead", value: "0% Overhead", status: "good", note: "Compiles to standard bytecode __init__" },
      { label: "ABC Contract Validation", value: "Instantiation Time", status: "good", note: "Fails early if methods missing" },
      { label: "Polymorphism Dispatch", value: "< 20 ns", status: "good", note: "Dynamic method resolution overhead" }
    ],
    logs: [
      {
        time: "00:00:00.001",
        level: "INFO",
        tag: "Class Init",
        message: "OpenAIProvider instantiated with default_model='gpt-4o'."
      },
      {
        time: "00:00:00.003",
        level: "INFO",
        tag: "Contract Check",
        message: "BaseLLMProvider abstract methods validated successfully."
      },
      {
        time: "00:00:00.005",
        level: "INFO",
        tag: "Polymorphism",
        message: "AIAssistantAgent dispatched complete() to injected provider."
      }
    ]
  },
  production: {
    title: "7 · Production: Rules & Best Practices for Object-Oriented Python",
    rules: [
      {
        title: "Favor Composition Over Inheritance",
        description:
          "Do not create deep 8-level inheritance hierarchies. Prefer composing small objects (e.g. an Agent 'has-a' LLMClient, MemoryBuffer, and ToolList) rather than inheriting from all of them.",
        impact: "Prevents fragile base-class problems and makes components modular."
      },
      {
        title: "Never Use Mutable Default Arguments in __init__",
        description:
          "Avoid 'def __init__(self, history=[])'. The default list is shared across all instances. Use 'def __init__(self, history: Optional[List] = None): self.history = history or []'.",
        impact: "Eliminates cross-instance state pollution and critical memory bugs."
      },
      {
        title: "Use @dataclass for Pure Data Containers",
        description:
          "When a class exists primarily to hold data (like API responses, telemetry events, or configurations), use '@dataclass' with type annotations.",
        impact: "Eliminates hundreds of lines of repetitive boilerplate and guarantees clean debugging representations."
      },
      {
        title: "Enforce Interface Contracts with ABCs",
        description:
          "Define abstract base classes for core extensible components (vector stores, embedders, LLMs).",
        impact: "Prevents runtime AttributeError exceptions by catching missing methods at instantiation."
      }
    ]
  },
  challenge: {
    title: "8 · Challenge: Build an Extensible AI Agent Memory System",
    prompt:
      "Design an OOP memory system with an abstract base class 'BaseMemory' having abstract methods 'add(role: str, text: str)' and 'get_context() -> str'. Then implement a concrete 'RollingWindowMemory' class that stores a maximum of 'max_messages: int' (default 4) turns and formats them as a prompt string.",
    hint: "Use abc.ABC and @abstractmethod. In RollingWindowMemory, maintain a list and trim it using self.messages[-self.max_messages:] in get_context().",
    solutionCode: `# Extensible AI Agent Memory System
from abc import ABC, abstractmethod
from typing import List, Dict

class BaseMemory(ABC):
    @abstractmethod
    def add(self, role: str, text: str) -> None:
        pass

    @abstractmethod
    def get_context(self) -> str:
        pass

class RollingWindowMemory(BaseMemory):
    def __init__(self, max_messages: int = 4):
        self.max_messages = max_messages
        self._history: List[Dict[str, str]] = []

    def add(self, role: str, text: str) -> None:
        self._history.append({"role": role, "content": text})

    def get_context(self) -> str:
        # Keep only the latest max_messages
        active_window = self._history[-self.max_messages:]
        return "\\n".join([f"{msg['role'].upper()}: {msg['content']}" for msg in active_window])

    def __len__(self) -> int:
        return len(self._history)

# Verification
mem = RollingWindowMemory(max_messages=2)
mem.add("user", "What is Python?")
mem.add("assistant", "Python is an interpreted language.")
mem.add("user", "Explain OOP.")

print("Context for LLM Prompt:\\n" + mem.get_context())
print(f"Total History Length: {len(mem)}")`
  },
  checklist: [
    { id: "c1", text: "Explain the difference between a class (blueprint) and an object (instance)", category: "Fundamentals" },
    { id: "c2", text: "Implement __init__ constructors and understand the 'self' instance binding", category: "Syntax" },
    { id: "c3", text: "Distinguish instance attributes from shared class attributes", category: "Attributes" },
    { id: "c4", text: "Use @classmethod factory constructors and @staticmethod utility methods", category: "Methods" },
    { id: "c5", text: "Apply encapsulation with private attributes (_name, __name) and @property", category: "Encapsulation" },
    { id: "c6", text: "Implement single inheritance and invoke parent logic with super()", category: "Inheritance" },
    { id: "c7", text: "Enforce contract compliance using Abstract Base Classes (ABCs)", category: "Abstraction" },
    { id: "c8", text: "Leverage polymorphism and duck typing to swap concrete providers seamlessly", category: "Polymorphism" },
    { id: "c9", text: "Implement dunder methods (__str__, __repr__, __len__, __call__)", category: "Magic Methods" },
    { id: "c10", text: "Use @dataclass to create type-safe data transfer objects and schemas", category: "Dataclasses" },
    { id: "c11", text: "Avoid mutable default arguments in class initializers", category: "Best Practices" },
    { id: "c12", text: "Apply the 'Composition over Inheritance' design principle in AI architectures", category: "Design Patterns" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What is the purpose of the '__init__' method in a Python class?",
      options: [
        "It initializes an instance's attributes when a new object is created",
        "It destroys the object when memory is full",
        "It converts the class into a string",
        "It compiles the class into machine code"
      ],
      correctIndex: 0,
      explanation: "'__init__' is the constructor initializer executed immediately when a new object instance is allocated."
    },
    {
      id: "q2",
      question: "What does the '@property' decorator do in Python?",
      options: [
        "Allows a method to be accessed as an attribute with getter and setter validation",
        "Makes all class variables public",
        "Deletes the underlying attribute",
        "Makes the method run on a separate CPU thread"
      ],
      correctIndex: 0,
      explanation: "'@property' defines managed attributes that provide clean syntax while supporting custom validation logic."
    },
    {
      id: "q3",
      question: "What happens if a child class inherits from an ABC with an '@abstractmethod' but fails to implement it?",
      options: [
        "Python raises a TypeError and prevents the child class from being instantiated",
        "Python automatically writes the code for you",
        "The class runs normally until that method is called",
        "The method returns None"
      ],
      correctIndex: 0,
      explanation: "Abstract Base Classes enforce contract compliance at instantiation time, raising TypeError if any abstract method is missing."
    },
    {
      id: "q4",
      question: "Why should you avoid 'def __init__(self, tags=[])' with a mutable default list?",
      options: [
        "The default list is created once at definition time and shared across all instances",
        "It causes an immediate SyntaxError",
        "Python does not support lists in __init__",
        "Lists cannot hold strings in classes"
      ],
      correctIndex: 0,
      explanation: "Mutable default arguments are shared globally across all instances, leading to cross-instance state pollution."
    },
    {
      id: "q5",
      question: "Which magic method allows an object instance to be called directly like a function (e.g. 'agent(\"query\")')?",
      options: ["__call__", "__run__", "__init__", "__exec__"],
      correctIndex: 0,
      explanation: "Implementing '__call__' makes an instance callable like a standard function."
    }
  ],
  skillsCount: 12,
  sectionsCount: 28,
  technologies: ["Python 3.11", "OOP", "Classes", "ABCs", "Dataclasses", "Polymorphism", "Encapsulation"],
  updatedDate: "2025-01-15"
};
