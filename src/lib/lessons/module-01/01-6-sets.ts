import { DetailedLessonContent } from "../types";

export const lesson01_6: DetailedLessonContent = {
  chapterNumber: 6,
  categoryBadge: "Python Fundamentals · 22 min read · Beginner → Advanced",
  subtitle:
    "Master Python sets from open-addressing hash table internals and frozenset immutability to mathematical set algebra, Jaccard similarity metrics, and order-preserving RAG deduplication pipelines.",
  concept: {
    title: "1 · Concept: Hash Table Architecture & Set Theory in Python",
    paragraphs: [
      "In Python, a Set is an unordered collection of unique, hashable elements. Under the hood, Python sets are implemented as open-addressing hash tables with perturbation-based probing, providing average O(1) time complexity for element lookups, additions, and deletions.",
      "Unlike Python lists which require an O(N) linear scan to verify membership ('x in my_list'), a set computes the element's hash value (`hash(x)`) and directly indexes into the hash table's internal array, resolving lookups in constant time.",
      "Python provides native mathematical set algebra—including union ($A \\cup B$), intersection ($A \\cap B$), difference ($A \\setminus B$), and symmetric difference ($A \\Delta B$)—expressed via both symbolic bitwise operators and optimized method calls.",
      "In modern AI engineering, sets are the foundational data structure for token vocabulary compilation, stop-word scrubbing, lexical Jaccard similarity calculation, and multi-source document deduplication in RAG pipelines."
    ]
  },
  subtopics: [
    {
      id: "subtopic-set-internals",
      title: "1. Open-Addressing Hash Table Internals & PySetObject",
      paragraphs: [
        "In CPython, a set is represented by `PySetObject`. It consists of an array of `setentry` structs, each storing the element's 64-bit hash code (`key_hash`) and a pointer to the element object (`key`).",
        "**Hash Probing & Perturbation:** When inserting an element, Python computes `i = hash(key) & mask`. If slot `i` is occupied, CPython uses a pseudo-random perturbation formula `i = (5 * i + 1 + perturb) & mask` to probe for the next available slot until an empty or dummy slot is found.",
        "**Dynamic Resizing & Load Factor:** A Python set dynamically resizes whenever its load factor exceeds approximately 60-66% (2/3 full). Resizing allocates a larger table (often $4\\times$ or $2\\times$ the size) and re-hashes all active entries.",
        "**Syntax Gotcha:** An empty set must be instantiated using `set()`. Writing `{}` creates an empty dictionary (`dict`), which shares the same curly-brace syntax."
      ],
      mathFormula: "\\text{Slot Index: } i = (\\text{hash}(\\text{key}) \\;\\&\\; \\text{mask}) \\quad \\text{with perturbation: } i_{\\text{next}} = (5i + 1 + \\text{perturb}) \\;\\&\\; \\text{mask}",
      codeSnippet: `import sys

# 1. Syntax: set() vs {}
empty_set = set()
empty_dict = {}
print(f"empty_set type:  {type(empty_set)}")   # <class 'set'>
print(f"empty_dict type: {type(empty_dict)}")  # <class 'dict'>

# 2. Inspecting Hash Table Memory Growth
tracked_set = set()
print(f"Empty set base size: {sys.getsizeof(tracked_set)} bytes")

for i in range(1, 30):
    tracked_set.add(f"token_{i}")
    # Set resizes in discrete power-of-two jumps
    if i in [1, 5, 9, 17, 25]:
        print(f"Elements: {len(tracked_set):2d} | Memory: {sys.getsizeof(tracked_set):4d} bytes")`
    },
    {
      id: "subtopic-hashability-frozenset",
      title: "2. Hashability Rules & The Immutable frozenset",
      paragraphs: [
        "Every element added to a set must be hashable. An object is hashable if it has an immutable hash code throughout its entire lifetime (`__hash__`) and can be compared for equality (`__eq__`).",
        "Mutable objects like `list`, `dict`, and regular `set` are unhashable and will raise `TypeError: unhashable type` if inserted into a set.",
        "**`frozenset`:** Python's built-in immutable variant of a set. Because a `frozenset` cannot be modified after creation, it implements `__hash__` and can be used as an element within other sets or as a composite dictionary key."
      ],
      codeSnippet: `# 1. Attempting to insert unhashable mutable objects
valid_set = {10, "embedding", (1, 2)}

try:
    valid_set.add([3, 4])  # TypeError: unhashable type: 'list'
except TypeError as e:
    print(f"Unhashable list error: {e}")

# 2. frozenset: Immutable & Hashable Set
frozen_vocab_a = frozenset(["attention", "transformer", "encoder"])
frozen_vocab_b = frozenset(["diffusion", "unet", "denoise"])

# frozenset can be used as a set element or dictionary key
nested_set_of_sets = {frozen_vocab_a, frozen_vocab_b}
print("Set containing frozensets:", nested_set_of_sets)

vocab_weights = {
    frozen_vocab_a: 0.95,
    frozen_vocab_b: 0.88
}
print(f"Lookup via frozenset key: {vocab_weights[frozen_vocab_a]}")`
    },
    {
      id: "subtopic-set-algebra",
      title: "3. Mathematical Set Algebra & Operators",
      paragraphs: [
        "Python sets provide a complete implementation of mathematical set theory with dedicated bitwise operators and method equivalents.",
        "**Union ($A \\cup B$ / `A | B`):** All elements in A, B, or both.",
        "**Intersection ($A \\cap B$ / `A & B`):** Elements present in both A and B.",
        "**Difference ($A \\setminus B$ / `A - B`):** Elements in A that are not in B.",
        "**Symmetric Difference ($A \\Delta B$ / `A ^ B`):** Elements in A or B, but not both.",
        "**Operator vs Method Difference:** Operators (`|`, `&`, `-`, `^`) require both operands to be `set` or `frozenset` instances. In contrast, method calls (`.union()`, `.intersection()`, etc.) accept any iterable sequence (lists, tuples, strings, generators)."
      ],
      mathFormula: "A \\Delta B = (A \\cup B) \\setminus (A \\cap B) = (A \\setminus B) \\cup (B \\setminus A)",
      codeSnippet: `retrieved_bm25 = {"doc_101", "doc_102", "doc_105", "doc_108"}
retrieved_vector = {"doc_102", "doc_105", "doc_109", "doc_112"}
blocked_docs = {"doc_105", "doc_999"}

# 1. Union (|): Combined candidate pool
all_candidates = retrieved_bm25 | retrieved_vector
print("Union (All Candidates):", all_candidates)

# 2. Intersection (&): High-confidence hybrid matches
hybrid_consensus = retrieved_bm25 & retrieved_vector
print("Intersection (Hybrid Consensus):", hybrid_consensus)

# 3. Difference (-): Vector-only unique discoveries & Blocklist filtering
vector_only = retrieved_vector - retrieved_bm25
clean_candidates = all_candidates - blocked_docs
print("Vector Unique:", vector_only)
print("Cleaned (after blocklist):", clean_candidates)

# 4. Symmetric Difference (^): Items in exactly one source
discrepant_docs = retrieved_bm25 ^ retrieved_vector
print("Symmetric Difference (Discrepant):", discrepant_docs)

# 5. Method vs Operator Flexibility (accepts list)
extended_pool = retrieved_bm25.union(["doc_200", "doc_201"])
print("Method union with list:", extended_pool)`
    },
    {
      id: "subtopic-mutation-inspection",
      title: "4. Set Mutation, Removal & Subset Testing",
      paragraphs: [
        "**`add(x)` vs `update(*iterables)`:** `add(x)` inserts a single element. `update()` inserts all elements from one or more iterables in-place.",
        "**`remove(x)` vs `discard(x)`:** `remove(x)` deletes `x` and raises `KeyError` if `x` is not in the set. `discard(x)` deletes `x` if present and silently does nothing if absent (essential for idempotent cleanup).",
        "**`pop()`:** Removes and returns an arbitrary element. Raises `KeyError` on empty sets.",
        "**Relational Checks:** `issubset()` (`<=`), `issuperset()` (`>=`), and `isdisjoint()` (checks if intersection is empty)."
      ],
      codeSnippet: `active_tools = {"web_search", "calculator", "python_repl"}

# 1. In-place Mutation
active_tools.add("sql_query")
active_tools.update(["file_reader", "bash_exec"])
print("After update:", active_tools)

# 2. Safe Removal: discard() vs remove()
active_tools.discard("non_existent_tool")  # No error raised!
active_tools.remove("calculator")          # Removes successfully

# 3. Relational Subset & Disjoint Testing
required_safety_tools = {"web_search", "sql_query"}
is_compliant = required_safety_tools.issubset(active_tools)
print(f"Contains required tools? {is_compliant} ({required_safety_tools <= active_tools})")

prohibited_tools = {"format_c_drive", "kernel_dump"}
is_safe = active_tools.isdisjoint(prohibited_tools)
print(f"Disjoint from prohibited tools? {is_safe}")`
    },
    {
      id: "subtopic-set-comprehensions",
      title: "5. Set Comprehensions & High-Throughput Tokenization",
      paragraphs: [
        "Set comprehensions provide an expressive, single-line syntax for mapping, filtering, and instantly deduplicating data streams.",
        "**Syntax:** `{expression for item in iterable if condition}`.",
        "In AI preprocessing pipelines, set comprehensions eliminate duplicate tokens, normalize casing, and strip punctuation in a single compiled C-speed pass."
      ],
      codeSnippet: `raw_corpus = [
    "Transformer architectures revolutionized NLP in 2017.",
    "Transformers rely on Self-Attention mechanisms.",
    "Attention is all you need for sequence modeling."
]

stop_words = {"is", "in", "for", "all", "you", "on"}

# Build normalized vocabulary set in one line
vocabulary = {
    word.strip(".,!?:;").lower()
    for sentence in raw_corpus
    for word in sentence.split()
    if len(word) > 2 and word.strip(".,!?:;").lower() not in stop_words
}

print(f"Unique Vocabulary ({len(vocabulary)} terms):")
print(sorted(vocabulary))`
    },
    {
      id: "subtopic-jaccard-dedup",
      title: "6. Jaccard Similarity & Order-Preserving Deduplication",
      paragraphs: [
        "**Jaccard Similarity Index:** A classic lexical overlap metric defined as the cardinality of the intersection divided by the cardinality of the union: $J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|}$. It is frequently used for keyword reranking and fast duplicate document filtering.",
        "**Order-Preserving Deduplication:** Converting a list directly to a set (`set(items)`) destroys element order. Using a secondary tracking set inside a list comprehension deduplicates in linear $O(N)$ time while preserving the original sequence."
      ],
      mathFormula: "J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|} = \\frac{|A \\cap B|}{|A| + |B| - |A \\cap B|}",
      codeSnippet: `from typing import List, Set

def calculate_jaccard_similarity(text_a: str, text_b: str) -> float:
    """Computes exact lexical Jaccard index between two text passages."""
    tokens_a = set(text_a.lower().split())
    tokens_b = set(text_b.lower().split())
    
    intersection_len = len(tokens_a & tokens_b)
    union_len = len(tokens_a | tokens_b)
    
    return intersection_len / union_len if union_len > 0 else 0.0

# Deduplicate while preserving original retrieved rank ordering
def deduplicate_preserve_order(items: List[str]) -> List[str]:
    seen: Set[str] = set()
    # seen.add(x) returns None, which evaluates to False
    return [x for x in items if not (x in seen or seen.add(x))]

sample_candidates = ["doc_A", "doc_B", "doc_A", "doc_C", "doc_B", "doc_D"]
unique_ordered = deduplicate_preserve_order(sample_candidates)
print("Original Candidate Stream:", sample_candidates)
print("Order-Preserved Deduplicated:", unique_ordered)

score = calculate_jaccard_similarity(
    "Large language models require vast compute resources",
    "Language models utilize vast compute clusters"
)
print(f"Jaccard Lexical Overlap: {score:.3f}")`
    },
    {
      id: "subtopic-complexity-reference",
      title: "7. Big-O Complexity Comparison: Set vs List",
      paragraphs: [
        "Understanding time complexity is critical when designing multi-agent search architectures and large-scale graph traversals.",
        "**Membership (`in`):** Set $O(1)$ vs List $O(N)$. At 1,000,000 items, set lookup is over $50,000\\times$ faster.",
        "**Addition/Deletion:** Set $O(1)$ average vs List $O(N)$ for arbitrary insertions/deletions.",
        "**Memory Trade-off:** Sets consume $4\\times$ to $8\\times$ more memory than raw lists due to open-addressing hash table sparsity (load factor $< 66\%$) and 64-bit hash caching."
      ],
      codeSnippet: `import time

N = 100_000
test_list = list(range(N))
test_set = set(range(N))
query = N - 1  # Worst-case item at the tail

# 1. List Membership Scan (O(N))
t0 = time.perf_counter()
for _ in range(100):
    _ = query in test_list
list_time = (time.perf_counter() - t0) / 100

# 2. Set Hash Lookup (O(1))
t0 = time.perf_counter()
for _ in range(100):
    _ = query in test_set
set_time = (time.perf_counter() - t0) / 100

print(f"List Lookup (O(N)): {list_time * 1e6:.2f} microseconds")
print(f"Set Lookup  (O(1)): {set_time * 1e6:.2f} microseconds")
print(f"Set Speedup: {list_time / set_time:.1f}x faster")`
    }
  ],
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "In production RAG pipelines, candidate documents are retrieved simultaneously from dense vector stores, sparse BM25 keyword indices, and web search engines.",
      "Passing duplicated document passages into an LLM context window causes catastrophic context waste, inflates token generation latency, and triggers redundant model hallucinations.",
      "Furthermore, multi-agent web crawlers and graph exploration algorithms (such as Deep Research agents) rely on sets to track visited URLs and explored state nodes in constant $O(1)$ time, preventing infinite cyclic loops."
    ]
  },
  architecture: {
    title: "3 · Architecture: Multi-Source RAG Deduplication & Reranking Engine",
    flowSummary:
      "Parallel Retrieval Streams (Vector DB + BM25 Keyword) → Candidate Document Stream → Order-Preserved Hash Set Filter (O(1) Deduplication) → Set Intersection Consensus → Clean LLM Prompt Assembly",
    flowSteps: [
      {
        step: "01",
        label: "Multi-Source Retrieval",
        desc: "Query dense vector database and sparse BM25 engine simultaneously."
      },
      {
        step: "02",
        label: "Set Intersection",
        desc: "Identify consensus documents retrieved by both dense and sparse indices."
      },
      {
        step: "03",
        label: "Order-Preserved Dedup",
        desc: "Filter duplicate passages using an O(1) hash set while preserving discovery rank."
      },
      {
        step: "04",
        label: "Context Assembly",
        desc: "Pass unique, high-relevance documents into LLM prompt with zero token redundancy."
      }
    ],
    paragraphs: [
      "Using set algebra, the deduplication engine extracts consensus documents with mathematical intersection ($A \\cap B$) while eliminating duplicate tokens in sub-millisecond time."
    ]
  },
  useCases: [
    {
      title: "Multi-Source RAG Context Deduplicator",
      desc: "Merges candidate document streams from vector databases and keyword search with zero duplicate text passages.",
      framework: "RAG Pipeline / LlamaIndex",
      code: `def deduplicate_rag_chunks(chunks: list[dict]) -> list[dict]:
    seen: set[str] = set()
    return [c for c in chunks if not (c["doc_id"] in seen or seen.add(c["doc_id"]))]`
    },
    {
      title: "Multi-Agent Visited URL Explorer Guard",
      desc: "Prevents autonomous web research agents from visiting duplicate domains or looping indefinitely across hyperlink graphs.",
      framework: "Multi-Agent Systems",
      code: `class GraphCrawlerGuard:
    def __init__(self):
        self.visited: set[str] = set()
    def should_visit(self, url: str) -> bool:
        if url in self.visited: return False
        self.visited.add(url); return True`
    }
  ],
  code: {
    title: "4 · Production Implementation: Hybrid RAG Deduplicator & Lexical Overlap Engine",
    before: {
      filename: "naive_deduplicator.py",
      language: "PYTHON",
      code: `# ANTI-PATTERN: Slow O(N^2) list search and manual string matching
def merge_and_deduplicate(vector_docs, bm25_docs):
    combined = vector_docs + bm25_docs
    unique_docs = []
    
    for doc in combined:
        # Slow O(N) linear search on list inside O(N) loop -> O(N^2)
        if doc["id"] not in [d["id"] for d in unique_docs]:
            unique_docs.append(doc)
            
    return unique_docs`,
      problems: [
        "Rebuilding `[d['id'] for d in unique_docs]` inside the loop creates catastrophic $O(N^2)$ quadratic latency",
        "Destroys retrieval rank weighting and cannot perform fast intersection consensus checks",
        "High garbage collection thrashing from creating thousands of temporary list instances"
      ]
    },
    after: {
      filename: "production_rag_deduplicator.py",
      language: "PYTHON",
      code: `from typing import List, Dict, Set, Any, Tuple
from dataclasses import dataclass

@dataclass(frozen=True, slots=True)
class RetrievedDocument:
    doc_id: str
    content: str
    source: str
    score: float

    def __hash__(self) -> int:
        return hash(self.doc_id)

    def __eq__(self, other: Any) -> bool:
        if isinstance(other, RetrievedDocument):
            return self.doc_id == other.doc_id
        return False


class HybridRAGDeduplicator:
    """Production multi-source document deduplication and hybrid reranker."""

    def __init__(self, stop_words: Set[str] | None = None):
        self.stop_words: Set[str] = stop_words or {"the", "is", "at", "which", "on", "a", "an", "and", "or"}

    def deduplicate_preserve_rank(
        self, 
        documents: List[RetrievedDocument]
    ) -> List[RetrievedDocument]:
        """Performs O(N) deduplication while strictly preserving source rank."""
        seen_ids: Set[str] = set()
        unique_docs: List[RetrievedDocument] = []
        
        for doc in documents:
            if doc.doc_id not in seen_ids:
                seen_ids.add(doc.doc_id)
                unique_docs.append(doc)
                
        return unique_docs

    def compute_hybrid_consensus(
        self, 
        vector_docs: List[RetrievedDocument], 
        bm25_docs: List[RetrievedDocument]
    ) -> Tuple[List[RetrievedDocument], Set[str]]:
        """Identifies consensus documents retrieved by both models via set intersection."""
        set_vector_ids: Set[str] = {d.doc_id for d in vector_docs}
        set_bm25_ids: Set[str] = {d.doc_id for d in bm25_docs}
        
        # Mathematical Intersection (A & B)
        consensus_ids: Set[str] = set_vector_ids & set_bm25_ids
        
        # Interleave ranking: consensus documents prioritized first
        merged_candidates = vector_docs + bm25_docs
        deduped = self.deduplicate_preserve_rank(merged_candidates)
        
        # Re-sort: Consensus items first, then descending score
        reranked = sorted(
            deduped, 
            key=lambda d: (d.doc_id in consensus_ids, d.score), 
            reverse=True
        )
        return reranked, consensus_ids

    def jaccard_keyword_similarity(self, query: str, document_text: str) -> float:
        """Computes lexical Jaccard overlap between query terms and document content."""
        query_terms: Set[str] = {w.lower() for w in query.split() if w.lower() not in self.stop_words}
        doc_terms: Set[str] = {w.lower() for w in document_text.split() if w.lower() not in self.stop_words}
        
        if not query_terms or not doc_terms:
            return 0.0
            
        intersection = query_terms & doc_terms
        union = query_terms | doc_terms
        return len(intersection) / len(union)


# Demonstration of Production Execution
if __name__ == "__main__":
    engine = HybridRAGDeduplicator()

    vector_results = [
        RetrievedDocument("doc_101", "Vector embeddings capture semantic similarity.", "dense_vector", 0.94),
        RetrievedDocument("doc_102", "Self-attention mechanisms scale with sequence length.", "dense_vector", 0.88),
        RetrievedDocument("doc_105", "Retrieval-Augmented Generation bridges factual gaps.", "dense_vector", 0.82),
    ]

    bm25_results = [
        RetrievedDocument("doc_105", "Retrieval-Augmented Generation bridges factual gaps.", "sparse_bm25", 0.91),
        RetrievedDocument("doc_108", "BM25 uses term frequency and inverted index scoring.", "sparse_bm25", 0.85),
        RetrievedDocument("doc_101", "Vector embeddings capture semantic similarity.", "sparse_bm25", 0.79),
    ]

    final_docs, consensus = engine.compute_hybrid_consensus(vector_results, bm25_results)

    print(f"Consensus Document IDs (Present in both streams): {consensus}")
    print(f"\\nFinal Deduplicated & Reranked Context Stream ({len(final_docs)} unique items):")
    for d in final_docs:
        is_consensus = "★ [CONSENSUS]" if d.doc_id in consensus else "  [SINGLE]   "
        print(f"  {is_consensus} {d.doc_id} (Score: {d.score:.2f}) -> {d.content[:45]}...")

    # Jaccard keyword overlap test
    query = "semantic similarity in vector embeddings"
    sim = engine.jaccard_keyword_similarity(query, vector_results[0].content)
    print(f"\\nLexical Jaccard Similarity with Query: {sim:.2%}")`,
      improvements: [
        "Eliminates quadratic O(N^2) list membership scans with O(1) hash set lookups",
        "Mathematical set intersection (&) cleanly isolates high-confidence consensus documents",
        "Preserves original discovery ranking while completely eliminating duplicate context tokens"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Set Operations & Hybrid Retrieval Telemetry",
    description: "Verify that set deduplication operates in linear O(N) time with 100% precision on consensus filtering.",
    scenarios: [
      {
        name: "Hybrid Retrieval Stream (5,000 Documents)",
        method: "PYTHON",
        endpoint: "HybridRAGDeduplicator.compute_hybrid_consensus()",
        payload: '{"vector_docs": 2500, "bm25_docs": 2500, "expected_overlap": 800}',
        expectedStatus: 200,
        statusText: "SUCCESS",
        response: '{"unique_docs": 4200, "consensus_count": 800, "execution_ms": 1.25, "tokens_saved": 145000}',
        explanation: "Deduplicated 5,000 candidate items in 1.25ms, saving 145,000 duplicate context tokens."
      },
      {
        name: "Lexical Jaccard Overlap Matrix",
        method: "PYTHON",
        endpoint: "HybridRAGDeduplicator.jaccard_keyword_similarity()",
        payload: '{"query_tokens": 12, "doc_tokens": 150}',
        expectedStatus: 200,
        statusText: "SUCCESS",
        response: '{"jaccard_index": 0.385, "intersection_terms": 5, "union_terms": 13, "latency_ms": 0.004}',
        explanation: "Computed token set intersection & union in 4 microseconds."
      }
    ]
  },
  observe: {
    title: "6 · Observe: Set Operations & Memory Performance Metrics",
    metrics: [
      { label: "Lookup Time", value: "O(1) Average", status: "good", note: "Open addressing hash table" },
      { label: "Dedup Speedup", value: "92x vs List", status: "good", note: "Linear O(N) scaling" },
      { label: "Context Saved", value: "38% Duplicate Tokens", status: "good", note: "Zero context waste" },
      { label: "Load Factor", value: "~66% Threshold", status: "good", note: "CPython automatic resize" }
    ],
    logs: [
      { time: "00:00:00.001", level: "INFO", tag: "RAGDeduplicator", message: "Received 5,000 candidates across Dense and Sparse engines." },
      { time: "00:00:00.002", level: "INFO", tag: "RAGDeduplicator", message: "Extracted 800 consensus document IDs via set intersection." },
      { time: "00:00:00.003", level: "INFO", tag: "RAGDeduplicator", message: "Emitted 4,200 unique ranked documents to LLM prompt assembler." }
    ]
  },
  production: {
    title: "7 · Production: Set Processing Best Practices",
    rules: [
      {
        title: "Always Use Sets for High-Frequency Membership Testing",
        description: "Whenever checking 'if item in collection' inside loops or high-throughput API handlers, use a set instead of a list.",
        impact: "Transforms $O(N)$ linear scans into $O(1)$ constant-time lookups."
      },
      {
        title: "Use discard() Instead of remove() for Safe Idempotent Cleanup",
        description: "Prefer 'my_set.discard(item)' over 'my_set.remove(item)' when the item may not be present in the set.",
        impact: "Eliminates boilerplate try/except KeyError blocks and protects asynchronous worker cleanup routines."
      },
      {
        title: "Use frozenset for Dictionary Keys and Nested Set Elements",
        description: "When grouping sets or using multi-token vocabularies as dictionary keys, wrap them in 'frozenset()'.",
        impact: "Guarantees immutability and satisfies Python's hashability requirement."
      },
      {
        title: "Be Mindful of Set Memory Footprint in Microservices",
        description: "Sets require 4x-8x more memory than contiguous arrays due to hash table sparsity and hash caching. Use bitarrays or Bloom filters for sets with 10M+ items.",
        impact: "Prevents Out-Of-Memory (OOM) worker restarts on memory-constrained containers."
      }
    ]
  },
  challenge: {
    title: "8 · Challenge: Build a Token Vocabulary Extractor with Stop-Word Pruning",
    prompt:
      "Write a function `build_filtered_vocab(documents: list[str], stop_words: set[str], min_length: int = 3) -> set[str]` that returns a clean set of all unique lowercase words that are at least `min_length` characters long and not in `stop_words`.",
    hint: "Use a set comprehension with nested loops for sentences and words, stripping punctuation.",
    solutionCode: `from typing import List, Set

def build_filtered_vocab(
    documents: List[str], 
    stop_words: Set[str], 
    min_length: int = 3
) -> Set[str]:
    """Extracts a unique, sanitized vocabulary set from raw documents."""
    return {
        word.strip(".,!?:;\\\"'()[]{}").lower()
        for doc in documents
        for word in doc.split()
        if len(word.strip(".,!?:;\\\"'()[]{}")) >= min_length
        and word.strip(".,!?:;\\\"'()[]{}").lower() not in stop_words
    }`
  },
  checklist: [
    { id: "c1", text: "Master CPython PySetObject open-addressing and perturbation probing mechanics", category: "Internals" },
    { id: "c2", text: "Enforce hashability requirements and utilize frozenset for immutable sets", category: "Data Structures" },
    { id: "c3", text: "Apply set mathematical operations (&, |, -, ^) for multi-source data fusion", category: "Set Algebra" },
    { id: "c4", text: "Implement order-preserving O(N) deduplication for RAG context windows", category: "RAG" },
    { id: "c5", text: "Calculate lexical Jaccard similarity metrics for text retrieval scoring", category: "AI Engineering" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What is the key functional difference between `my_set.remove(x)` and `my_set.discard(x)` in Python?",
      options: [
        "`remove(x)` raises a `KeyError` if `x` is not present in the set, whereas `discard(x)` silently does nothing.",
        "`discard(x)` works on lists, while `remove(x)` only works on sets.",
        "`remove(x)` creates a new set, while `discard(x)` modifies in-place.",
        "`discard(x)` deletes all elements matching `x` in nested collections."
      ],
      correctIndex: 0,
      explanation:
        "`remove(x)` enforces that `x` must exist, raising `KeyError` otherwise. `discard(x)` is idempotent and will not raise an error if `x` is absent."
    },
    {
      id: "q2",
      question: "Why can't a regular Python `set` be stored inside another `set`?",
      options: [
        "Because regular sets are mutable and therefore do not implement `__hash__`; you must use `frozenset` instead.",
        "Because Python restricts nested data structures to a maximum depth of 1.",
        "Because sets only support integer elements.",
        "Because hash tables cannot compute hashes of string types."
      ],
      correctIndex: 0,
      explanation:
        "Every element in a set must be hashable. Because sets are mutable, they do not have a constant hash value and cannot be placed inside another set. Wrapping the inner set in `frozenset()` resolves this."
    }
  ],
  skillsCount: 6,
  sectionsCount: 16,
  technologies: ["Python", "Sets", "Frozenset", "Hash Tables", "Set Algebra", "RAG", "Jaccard Similarity"],
  updatedDate: "2025-01-14"
};
