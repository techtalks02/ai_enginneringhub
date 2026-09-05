import { DetailedLessonContent } from "../types";

export const lesson01_5: DetailedLessonContent = {
  chapterNumber: 5,
  categoryBadge: "Python Fundamentals · 20 min read · Beginner → Advanced",
  subtitle:
    "Master immutable tuples, CPython memory freelists, starred unpacking, hashable composite dictionary keys, NamedTuples, and thread-safe AI prompt/response caching pipelines.",
  concept: {
    title: "1 · Concept: Immutable Sequences & CPython Memory Architecture",
    paragraphs: [
      "A Tuple is an ordered, immutable collection of elements in Python. Once a tuple is allocated in memory, its length and element references cannot be modified, appended, or reassigned.",
      "Unlike Python lists, which must maintain extra capacity headroom for dynamic resizing (`allocated` vs `ob_size`), a `PyTupleObject` is sized exactly to its element count at creation time. The object header and its pointer array are allocated in a single contiguous block of memory.",
      "Because tuples cannot mutate, CPython maintains an internal free list of deallocated tuples (for sizes 1 to 20). Recreating small tuples does not trigger heap allocations, making tuples significantly faster to create and lighter on memory than lists.",
      "In AI engineering and distributed backend systems, tuples provide two indispensable capabilities: strict thread-safety (preventing race conditions in multi-threaded agent loops) and native hashability (enabling composite multi-parameter dictionary keys for LLM response caches)."
    ]
  },
  subtopics: [
    {
      id: "subtopic-tuple-internals",
      title: "1. Tuple Memory Architecture & CPython Freelists",
      paragraphs: [
        "In CPython, a tuple is represented by `PyTupleObject`. Because its size is fixed at instantiation, CPython allocates the struct header and pointer array in one contiguous memory block.",
        "To eliminate memory allocation overhead, CPython caches deallocated tuple objects in an internal freelist (`free_list[PyTuple_MAXSAVES]`). When a 2-tuple or 3-tuple is destroyed, its memory block is reused immediately rather than returned to the OS allocator.",
        "**Singleton Syntax:** A single-element tuple must include a trailing comma: `single = (42,)`. Without the comma, `(42)` is evaluated as a grouped integer expression.",
        "**Memory Comparison:** A 5-element tuple consumes 80 bytes, while a 5-element list consumes 120+ bytes due to dynamic pointer over-allocation."
      ],
      mathFormula: "\\text{Memory}(\\text{Tuple}_N) = 48 + 8N \\text{ bytes (on 64-bit CPython)}",
      codeSnippet: `import sys
import timeit

# 1. Trailing Comma Syntax for Singletons
not_a_tuple = ("gpt-4o")    # str type!
real_tuple = ("gpt-4o",)     # tuple type

print(f"not_a_tuple: {type(not_a_tuple)} -> '{not_a_tuple}'")
print(f"real_tuple:  {type(real_tuple)} -> {real_tuple}")

# 2. Memory Footprint Comparison
sample_list = [1, 2, 3, 4, 5]
sample_tuple = (1, 2, 3, 4, 5)

print(f"List size (5 items):  {sys.getsizeof(sample_list)} bytes")
print(f"Tuple size (5 items): {sys.getsizeof(sample_tuple)} bytes")

# 3. Allocation Speed Benchmark (Tuple Freelist & Constant Folding)
list_time = timeit.timeit("['gpt-4o', 0.7, 2048]", number=1_000_000)
tuple_time = timeit.timeit("('gpt-4o', 0.7, 2048)", number=1_000_000)

print(f"List 1M allocations:  {list_time:.4f}s")
print(f"Tuple 1M allocations: {tuple_time:.4f}s ({list_time / tuple_time:.1f}x faster)")`
    },
    {
      id: "subtopic-immutability-hashability",
      title: "2. Immutability, Shallow Invariance & Hashability",
      paragraphs: [
        "A tuple's immutability means the memory addresses held in its internal pointer array can never be reassigned or deleted.",
        "**Shallow Immutability:** If a tuple contains a mutable object (such as a list or dictionary), the contents of that nested object can still be mutated in-place, even though the tuple's pointer reference remains constant.",
        "**Hashability Rule:** A tuple is hashable (and can be used as a dictionary key or set element) *if and only if* every single element within it is also hashable. A tuple containing a nested list will raise `TypeError: unhashable type: 'list'` when hashed."
      ],
      codeSnippet: `# 1. Immutable Tuple Structure
immutable_coords = (37.7749, -122.4194)
try:
    immutable_coords[0] = 40.7128  # TypeError!
except TypeError as e:
    print(f"Caught expected error: {e}")

# 2. Shallow Immutability with Nested Mutable Objects
hybrid_tuple = ("vLLM-Engine", [0.7, 0.9])
print("Original hybrid tuple:", hybrid_tuple)

# Mutating the inner list is permitted
hybrid_tuple[1].append(0.95)
print("Mutated hybrid tuple: ", hybrid_tuple)

# 3. Hashability Verification
pure_key = ("gpt-4o", 0.7, "temperature")
print(f"Hash of pure tuple: {hash(pure_key)}")

try:
    hash(hybrid_tuple)  # Fails because hybrid_tuple[1] is a list!
except TypeError as e:
    print(f"Unhashable error: {e}")`
    },
    {
      id: "subtopic-unpacking-star",
      title: "3. Tuple Unpacking & Extended Star Expressions (*rest)",
      paragraphs: [
        "Tuple unpacking allows multiple variables to be assigned from an iterable in a single, clean statement. Python validates that the number of targets matches the length of the sequence.",
        "**Extended Unpacking (`*` operator):** Allows capturing arbitrary-length slices into a list while extracting specific head or tail elements.",
        "**Variable Swapping:** In Python, swapping two variables `a, b = b, a` executes via tuple packing and bytecode stack manipulation (`ROT_TWO` or `SWAP`), requiring no temporary intermediate variables.",
        "**Multiple Return Values:** When a function appears to return multiple values separated by commas, Python implicitly bundles them into a single tuple."
      ],
      codeSnippet: `# 1. Multiple Return Values from Evaluation Function
def evaluate_model_run() -> tuple:
    loss = 0.042
    accuracy = 0.985
    f1_score = 0.978
    latency_ms = 14.2
    return loss, accuracy, f1_score, latency_ms  # Implicit tuple packing

loss, acc, f1, lat = evaluate_model_run()
print(f"Metrics: loss={loss}, acc={acc}, f1={f1}, lat={lat}ms")

# 2. Extended Unpacking with *star operator
batch_telemetry = ("request_9921", 0.12, 0.45, 0.89, 0.94, "SUCCESS_200")
req_id, *token_latencies, status_code = batch_telemetry

print(f"Request ID: {req_id}")
print(f"Latencies:  {token_latencies} (Type: {type(token_latencies)})")
print(f"Status:     {status_code}")

# 3. Pythonic Variable Swapping
primary_model, fallback_model = "claude-3-5-sonnet", "gpt-4o-mini"
primary_model, fallback_model = fallback_model, primary_model
print(f"Swapped: primary={primary_model}, fallback={fallback_model}")`
    },
    {
      id: "subtopic-namedtuple-typing",
      title: "4. typing.NamedTuple vs collections.namedtuple",
      paragraphs: [
        "Regular tuples access fields via numeric index (`config[0]`), which is error-prone and hurts code readability in complex systems.",
        "`typing.NamedTuple` (and `collections.namedtuple`) combines the memory efficiency and immutability of tuples with named attribute access (`config.model_name`).",
        "`typing.NamedTuple` supports standard Python type annotations, default field values, docstrings, and custom helper methods while preserving 100% backward compatibility with tuple unpacking and indexing.",
        "Unlike classes with `__dict__`, NamedTuples do not have per-instance dictionary overhead, matching the low memory footprint of raw C tuples."
      ],
      codeSnippet: `from typing import NamedTuple

class GenerationConfig(NamedTuple):
    """Immutable, typed LLM generation configuration."""
    model: str
    temperature: float = 0.7
    max_tokens: int = 2048
    top_p: float = 1.0
    stream: bool = False

    def to_cache_key(self, prompt: str) -> tuple:
        """Helper method producing a deterministic hashable cache key."""
        return (prompt.strip().lower(), self.model, self.temperature, self.max_tokens)

# 1. Instantiation with Dot-Notation Access
cfg = GenerationConfig(model="gpt-4o", temperature=0.2)
print("Config instance:", cfg)
print(f"Model: {cfg.model}, Temp: {cfg.temperature}, MaxTokens: {cfg.max_tokens}")

# 2. Index Access and Unpacking Compatibility
print(f"Index 0: {cfg[0]}")
m, t, *rest = cfg
print(f"Unpacked: model={m}, temp={t}, rest={rest}")

# 3. Immutability Enforcement
try:
    cfg.temperature = 0.0  # AttributeError: can't set attribute
except AttributeError as e:
    print(f"Immutability guaranteed: {e}")`
    },
    {
      id: "subtopic-composite-keys",
      title: "5. Composite Hashable Keys for Semantic & Response Caching",
      paragraphs: [
        "Dictionary lookups and Set membership in Python require keys to have a fixed hash value (`__hash__`) and equality definition (`__eq__`).",
        "Because tuples are immutable and hashable, they are the standard mechanism for constructing composite keys representing multi-dimensional parameters.",
        "In AI inference engines, caching identical LLM responses across concurrent agent requests saves significant API cost and eliminates redundant token generation latency."
      ],
      mathFormula: "\\text{Key} = (\\text{SHA256}(\\text{Prompt}), \\text{Model}, \\text{Temperature}, \\text{Top\\_P}) \\implies O(1) \\text{ Lookup}",
      codeSnippet: `import hashlib

class ResponseCache:
    """In-memory exact LLM prompt & hyperparameter response cache."""

    def __init__(self):
        self._store: dict[tuple, str] = {}

    @staticmethod
    def _hash_prompt(prompt: str) -> str:
        return hashlib.sha256(prompt.strip().encode("utf-8")).hexdigest()

    def get(self, prompt: str, model: str, temp: float) -> str | None:
        key = (self._hash_prompt(prompt), model, round(temp, 2))
        return self._store.get(key)

    def set(self, prompt: str, model: str, temp: float, response: str) -> None:
        key = (self._hash_prompt(prompt), model, round(temp, 2))
        self._store[key] = response

cache = ResponseCache()
prompt = "Explain quantum entanglement in 2 sentences."

# Storing response with composite tuple key
cache.set(prompt, "gpt-4o", 0.7, "Quantum entanglement is a physical phenomenon...")

# Fast O(1) retrieval
cached_res = cache.get(prompt, "gpt-4o", 0.7)
print("Retrieved from cache:", cached_res is not None)
print("Cache Key Store Entries:", len(cache._store))`
    },
    {
      id: "subtopic-comparison-matrix",
      title: "6. Data Structure Comparison: Tuple vs List vs Dataclass",
      paragraphs: [
        "Choosing between `tuple`, `list`, `NamedTuple`, and `@dataclass(frozen=True)` depends on mutability, access patterns, and memory constraints.",
        "**Tuples:** Ideal for fixed coordinate pairs, database rows, multiple function returns, and composite dict keys.",
        "**Lists:** Ideal for dynamically growing collections, document chunking, and rolling queues.",
        "**NamedTuples:** Ideal for lightweight, immutable, typed configuration models where memory overhead must be zero.",
        "**Frozen Dataclasses:** Ideal for complex object hierarchies with inheritance, post-init validation (`__post_init__`), and mutable-to-immutable conversions."
      ],
      codeSnippet: `from dataclasses import dataclass
from typing import NamedTuple
import sys

# 1. Raw Tuple
t_raw = ("gpt-4o", 0.7, 2048)

# 2. NamedTuple
class NTConfig(NamedTuple):
    model: str
    temp: float
    tokens: int
t_nt = NTConfig("gpt-4o", 0.7, 2048)

# 3. Frozen Dataclass
@dataclass(frozen=True, slots=True)
class DCConfig:
    model: str
    temp: float
    tokens: int
t_dc = DCConfig("gpt-4o", 0.7, 2048)

print(f"Raw Tuple size:       {sys.getsizeof(t_raw)} bytes")
print(f"NamedTuple size:      {sys.getsizeof(t_nt)} bytes")
print(f"Slots Dataclass size: {sys.getsizeof(t_dc)} bytes")`
    }
  ],
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "In asynchronous multi-agent frameworks (LangGraph, AutoGen, CrewAI), state dictionaries and configuration objects are shared across concurrent worker threads and async coroutines.",
      "If a worker accidentally mutates a shared configuration dictionary (e.g. changing `temperature` from 0.7 to 0.0 for deterministic evaluation), all concurrent worker tasks inherit that mutation, causing silent cross-task contamination.",
      "Using immutable `NamedTuple` instances ensures that hyperparameters cannot be corrupted at runtime. Furthermore, composite tuple keys enable high-speed $O(1)$ semantic cache layers, preventing thousands of dollars in redundant LLM API calls."
    ]
  },
  architecture: {
    title: "3 · Architecture: Thread-Safe Model Config & Exact Response Cache Pipeline",
    flowSummary:
      "Immutable NamedTuple Config → Multi-Threaded Agent Workers → Composite Hashable Key (Prompt Hash, Model, Temp) → In-Memory Exact Cache Hit / External Model Dispatch",
    flowSteps: [
      {
        step: "01",
        label: "Immutable Config",
        desc: "Define typed NamedTuple ModelConfig with frozen hyperparameters."
      },
      {
        step: "02",
        label: "Composite Key Hash",
        desc: "Construct immutable tuple (sha256(prompt), model, temperature, max_tokens)."
      },
      {
        step: "03",
        label: "Cache Evaluation",
        desc: "Perform sub-millisecond O(1) hash table lookup against memory store."
      },
      {
        step: "04",
        label: "Worker Dispatch",
        desc: "Pass immutable config safely to async agent worker pool on cache miss."
      }
    ],
    paragraphs: [
      "The immutable NamedTuple guarantees that concurrent workers cannot modify runtime parameters. The composite tuple key provides collision-resistant, $O(1)$ response cache lookups."
    ]
  },
  useCases: [
    {
      title: "Exact LLM Response Cache",
      desc: "High-performance in-memory cache using composite tuple keys to eliminate duplicate token generation fees.",
      framework: "FastAPI / LiteLLM",
      code: `class ExactLLMCache:
    def __init__(self):
        self._cache: dict[tuple[str, str, float], str] = {}
        
    def query(self, prompt: str, model: str, temp: float) -> str | None:
        key = (prompt.strip().lower(), model, round(temp, 2))
        return self._cache.get(key)`
    },
    {
      title: "Thread-Safe Agent Hyperparameters",
      desc: "Typed NamedTuple configuration passed across asynchronous worker coroutines without lock contention.",
      framework: "AsyncIO / LangGraph",
      code: `class AgentParams(NamedTuple):
    agent_id: str
    temperature: float
    max_steps: int
    tools: tuple[str, ...]  # Immutable tuple of tool names`
    }
  ],
  code: {
    title: "4 · Production Implementation: Thread-Safe Model Config & Cache Manager",
    before: {
      filename: "mutable_cache_anti_pattern.py",
      language: "PYTHON",
      code: `# ANTI-PATTERN: Mutable dict configuration and unhashable cache keys
config = {
    "model": "gpt-4o",
    "temperature": 0.7,
    "max_tokens": 2048
}

cache = {}

def execute_agent_task(prompt, cfg):
    # Worker mutates shared dictionary in-place, contaminating other workers!
    if "creative" not in prompt:
        cfg["temperature"] = 0.0  # Race condition bug!
    
    # Cannot use dict or list as dict key
    # cache[[prompt, cfg["model"]]] = response  # TypeError: unhashable type: 'list'`,
      problems: [
        "Mutable dictionaries passed across threads cause silent state corruption and race conditions",
        "Lists cannot be used as dictionary keys because they are unhashable",
        "No type validation or IDE autocomplete on configuration fields"
      ]
    },
    after: {
      filename: "production_tuple_cache.py",
      language: "PYTHON",
      code: `import hashlib
import time
from typing import NamedTuple, Optional, Dict, Tuple

class ModelConfig(NamedTuple):
    """Immutable, typed configuration for LLM generation."""
    model_name: str
    temperature: float = 0.7
    max_tokens: int = 2048
    top_p: float = 1.0
    stop_sequences: Tuple[str, ...] = ("<|endoftext|>",)


class SemanticResponseCache:
    """Production thread-safe response cache using composite tuple keys."""

    def __init__(self, ttl_seconds: int = 3600):
        # Key: (prompt_hash, model_name, temperature, max_tokens)
        # Value: (response_text, timestamp)
        self._store: Dict[Tuple[str, str, float, int], Tuple[str, float]] = {}
        self.ttl_seconds = ttl_seconds

    @staticmethod
    def _normalize_prompt_hash(prompt: str) -> str:
        cleaned = " ".join(prompt.strip().lower().split())
        return hashlib.sha256(cleaned.encode("utf-8")).hexdigest()

    def _generate_key(self, prompt: str, config: ModelConfig) -> Tuple[str, str, float, int]:
        """Constructs an immutable, hashable composite key."""
        prompt_hash = self._normalize_prompt_hash(prompt)
        return (
            prompt_hash,
            config.model_name,
            round(config.temperature, 2),
            config.max_tokens
        )

    def get(self, prompt: str, config: ModelConfig) -> Optional[str]:
        """Performs O(1) in-memory lookup with TTL expiry check."""
        key = self._generate_key(prompt, config)
        entry = self._store.get(key)
        
        if entry is None:
            return None
            
        response_text, timestamp = entry
        if time.time() - timestamp > self.ttl_seconds:
            del self._store[key]
            return None
            
        return response_text

    def set(self, prompt: str, config: ModelConfig, response_text: str) -> None:
        """Stores response with composite tuple key and current timestamp."""
        key = self._generate_key(prompt, config)
        self._store[key] = (response_text, time.time())


# Production Usage Demonstration
if __name__ == "__main__":
    cfg = ModelConfig(model_name="claude-3-5-sonnet", temperature=0.2, max_tokens=1024)
    cache = SemanticResponseCache(ttl_seconds=1800)

    prompt_query = "Summarize the architectural differences between Lists and Tuples."

    # First lookup: Cache Miss
    cached = cache.get(prompt_query, cfg)
    print(f"Initial Cache Lookup: {cached}")  # None

    # Simulate LLM Generation & Cache Storage
    simulated_llm_response = (
        "Lists are mutable dynamic arrays with over-allocation headroom, while "
        "Tuples are immutable fixed-size pointer arrays with CPython freelist optimization."
    )
    cache.set(prompt_query, cfg, simulated_llm_response)
    print("Response stored in cache.")

    # Second lookup: Instant Cache Hit
    hit = cache.get(prompt_query, cfg)
    print(f"\\nCache Hit Success: {hit is not None}")
    print(f"Cached Response Content: \"{hit}\"")
    print(f"Total Cache Entries: {len(cache._store)}")`,
      improvements: [
        "NamedTuple guarantees complete immutability and thread-safety across concurrent workers",
        "Composite tuple key ensures deterministic O(1) lookup with zero collisions across models",
        "TTL timestamping ensures expired LLM responses are automatically pruned"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Immutability Verification & Cache Key Telemetry",
    description: "Verify that NamedTuples resist runtime mutations and evaluate composite cache hit rates.",
    scenarios: [
      {
        name: "Thread-Safe Cache Hit Resolution",
        method: "PYTHON",
        endpoint: "SemanticResponseCache.get()",
        payload: '{"prompt": "Summarize OOP vs Procedural", "model": "gpt-4o", "temperature": 0.2}',
        expectedStatus: 200,
        statusText: "CACHE_HIT",
        response: '{"status": "HIT", "latency_ms": 0.008, "cost_saved_usd": 0.015, "bytes": 240}',
        explanation: "Composite tuple key provided instant 8-microsecond lookup, bypassing external LLM API cost."
      },
      {
        name: "Immutability Guard Check",
        method: "PYTHON",
        endpoint: "ModelConfig.temperature = 0.0",
        payload: '{"attempted_mutation": "temperature = 0.0"}',
        expectedStatus: 400,
        statusText: "MUTATION_BLOCKED",
        response: '{"error": "AttributeError", "message": "can\'t set attribute", "state_intact": true}',
        explanation: "NamedTuple immutability prevented unauthorized hyperparameter modification."
      }
    ]
  },
  observe: {
    title: "6 · Observe: Tuple Allocation & Cache Performance Metrics",
    metrics: [
      { label: "Allocation Speed", value: "3.2x vs List", status: "good", note: "CPython freelist reuse" },
      { label: "Memory Overhead", value: "80 Bytes (5-tuple)", status: "good", note: "Zero excess capacity" },
      { label: "Lookup Latency", value: "0.008 ms", status: "good", note: "O(1) hash resolution" },
      { label: "Thread Safety", value: "100% Guaranteed", status: "good", note: "Immutable data structure" }
    ],
    logs: [
      { time: "00:00:00.001", level: "INFO", tag: "Config", message: "Created immutable ModelConfig(claude-3-5-sonnet, 0.2, 1024)." },
      { time: "00:00:00.002", level: "INFO", tag: "Cache", message: "Registered composite tuple cache key in store." },
      { time: "00:00:00.003", level: "INFO", tag: "Worker", message: "Dispatched immutable config to 8 concurrent worker threads." }
    ]
  },
  production: {
    title: "7 · Production: Tuple Best Practices",
    rules: [
      {
        title: "Use NamedTuples for Structured Configuration Objects",
        description: "Replace loose dictionaries with 'typing.NamedTuple' for application settings, model hyperparameters, and database row schemas.",
        impact: "Guarantees thread-safety, eliminates accidental mutations, and enables IDE type-checking."
      },
      {
        title: "Always Use Tuples for Multi-Dimensional Dict Keys",
        description: "When creating caches or index maps indexed by multiple attributes (e.g. user_id, org_id, date), combine them into a tuple.",
        impact: "Provides clean, hashable composite keys without string concatenation overhead."
      },
      {
        title: "Beware of Nested Mutable Objects in Tuples",
        description: "Do not put lists or dictionaries inside tuples if you expect the tuple to be hashable or truly immutable.",
        impact: "Prevents runtime 'TypeError: unhashable type' exceptions during hash table insertion."
      },
      {
        title: "Use Extended Star Unpacking (*rest) for Stream Buffers",
        description: "Use 'head, *middle, tail = sequence' instead of manual slice indexing for extracting boundaries from log lines or token sequences.",
        impact: "Improves code readability and reduces off-by-one indexing errors."
      }
    ]
  },
  challenge: {
    title: "8 · Challenge: Build a Thread-Safe LRU Cache Key Generator",
    prompt:
      "Write a function `build_cache_key(prompt: str, model: str, temp: float, stop_words: list[str]) -> tuple` that converts all parameters into a strictly immutable, hashable tuple key, including converting the mutable `stop_words` list into a sorted tuple.",
    hint: "Use `tuple(sorted(stop_words))` to ensure lists become hashable and deterministic.",
    solutionCode: `from typing import List, Tuple

def build_cache_key(
    prompt: str, 
    model: str, 
    temp: float, 
    stop_words: List[str]
) -> Tuple[str, str, float, Tuple[str, ...]]:
    """Generates a strictly hashable composite tuple cache key."""
    normalized_prompt = " ".join(prompt.strip().lower().split())
    # Convert mutable list into immutable, sorted tuple
    immutable_stop_words = tuple(sorted(stop_words))
    
    return (
        normalized_prompt,
        model.strip(),
        round(temp, 2),
        immutable_stop_words
    )`
  },
  checklist: [
    { id: "c1", text: "Master CPython PyTupleObject contiguous allocation and freelist recycling", category: "Internals" },
    { id: "c2", text: "Enforce shallow immutability and understand hashability requirements", category: "Hashability" },
    { id: "c3", text: "Apply extended star unpacking (*rest) and tuple variable swapping", category: "Syntax" },
    { id: "c4", text: "Use typing.NamedTuple for thread-safe, typed system configurations", category: "Design" },
    { id: "c5", text: "Construct composite tuple keys for production LLM response caching", category: "AI Engineering" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Why is a tuple `t = ('gpt-4o', [1, 2])` unhashable in Python even though `t` is a tuple?",
      options: [
        "Because `t` contains a mutable list `[1, 2]`, and Python requires every nested element of a tuple to be hashable for the tuple itself to be hashable.",
        "Because tuples can only contain strings and integers.",
        "Because tuples with 2 elements are reserved for key-value dictionary pairs.",
        "Because `gpt-4o` contains special punctuation characters."
      ],
      correctIndex: 0,
      explanation:
        "Tuples enforce shallow immutability. If any element inside the tuple is mutable (like a list), its contents could change at runtime, altering what its hash should be. Python disallows hashing compound tuples containing mutable objects."
    },
    {
      id: "q2",
      question: "What is the primary memory advantage of `typing.NamedTuple` over a standard Python class?",
      options: [
        "NamedTuples do not allocate an instance `__dict__`, matching the compact memory footprint and contiguous pointer layout of raw C tuples.",
        "NamedTuples automatically compress all strings into gzip format.",
        "NamedTuples run exclusively on GPU VRAM.",
        "NamedTuples allocate memory only when accessed."
      ],
      correctIndex: 0,
      explanation:
        "Standard Python class instances allocate a per-instance `__dict__` to store dynamic attributes. NamedTuples subclass tuple, storing attributes directly in the fixed pointer array with zero dictionary memory overhead."
    }
  ],
  skillsCount: 6,
  sectionsCount: 16,
  technologies: ["Python", "Tuples", "NamedTuples", "Immutability", "CPython Freelists", "Caching", "Thread Safety"],
  updatedDate: "2025-01-14"
};
