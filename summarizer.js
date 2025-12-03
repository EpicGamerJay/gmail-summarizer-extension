// summarizer.js

// Very small stopword list (you can expand this)
const STOPWORDS = new Set([
    "the", "is", "in", "at", "which", "on", "and", "a", "an", "of", "to", "for", "it", "this", "that", "with", "as", "by"
  ]);
  
  function splitIntoSentences(text) {
    // naive sentence split
    return text
      .replace(/\s+/g, " ")
      .split(/(?<=[.?!])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }
  
  function tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(w => w && !STOPWORDS.has(w));
  }
  
  function buildWordFrequencies(tokens) {
    const freq = {};
    for (const t of tokens) {
      freq[t] = (freq[t] || 0) + 1;
    }
    return freq;
  }
  
  function scoreSentences(sentences, wordFreq) {
    const scores = [];
    for (const sentence of sentences) {
      const words = tokenize(sentence);
      if (words.length === 0) continue;
  
      let score = 0;
      for (const w of words) {
        if (wordFreq[w]) score += wordFreq[w];
      }
      scores.push({ sentence, score });
    }
    return scores;
  }
  
  function summarizeText(text, maxSentences = 3) {
    const sentences = splitIntoSentences(text);
    if (sentences.length <= maxSentences) {
      return sentences.join(" ");
    }
  
    const allTokens = tokenize(text);
    const wordFreq = buildWordFrequencies(allTokens);
    const scored = scoreSentences(sentences, wordFreq);
  
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, maxSentences).map(s => s.sentence);
  
    // Keep original order of sentences in summary
    const ordered = sentences.filter(s => top.includes(s));
    return ordered.join(" ");
  }
  
  // Make available to content.js
  window.summarizeText = summarizeText;
  