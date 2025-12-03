// content.js

function log(...args) {
    console.log("[Gmail Summarizer]", ...args);
  }
  
  // Find the email body element in Gmail
  function findEmailBodyElement() {
    // This selector may need tweaking based on Gmail layout.
    // Commonly, the message body is inside a div with class "a3s".
    const body = document.querySelector("div.a3s");
    return body || null;
  }
  
  // Find the subject element
  function findSubjectText() {
    // Subject is usually in an h2/h1-like element with class "hP"
    const subjectEl = document.querySelector("h2.hP, h1.hP");
    return subjectEl ? subjectEl.innerText.trim() : "";
  }
  
  function getEmailText() {
    const bodyEl = findEmailBodyElement();
    if (!bodyEl) return null;
  
    // Get visible text (strip reply quotes if needed later)
    const bodyText = bodyEl.innerText || bodyEl.textContent || "";
    const subjectText = findSubjectText();
  
    const fullText = `${subjectText}\n\n${bodyText}`.trim();
    return { bodyEl, subjectText, fullText };
  }
  
  // Inject the summary box above the email
  function insertSummaryBox(bodyEl, summary) {
    // Avoid duplicates
    if (document.getElementById("gmail-tldr-summary")) return;
  
    const container = document.createElement("div");
    container.id = "gmail-tldr-summary";
  
    const title = document.createElement("div");
    title.id = "gmail-tldr-summary-title";
    title.innerText = "TL;DR (Auto Summary)";
  
    const text = document.createElement("div");
    text.id = "gmail-tldr-summary-text";
    text.innerText = summary || "Could not generate summary.";
  
    container.appendChild(title);
    container.appendChild(text);
  
    // Insert before the body element
    bodyEl.parentNode.insertBefore(container, bodyEl);
  }
  
  let lastEmailKey = null;
  
  function summarizeCurrentEmail() {
    const email = getEmailText();
    if (!email) {
      log("No email body found yet.");
      return;
    }
  
    const { bodyEl, subjectText, fullText } = email;
  
    // Avoid re-summarizing the same email if nothing changed
    const key = subjectText + "|" + fullText.slice(0, 100);
    if (key === lastEmailKey) {
      return;
    }
    lastEmailKey = key;
  
    log("Generating summary...");
    const summary = window.summarizeText(fullText, 3);
    insertSummaryBox(bodyEl, summary);
  }
  
  // Watch for DOM changes to detect when a new email is opened
  function setupObserver() {
    const observer = new MutationObserver(() => {
      // Debounce a bit
      clearTimeout(window.__gmailSummarizerTimeout);
      window.__gmailSummarizerTimeout = setTimeout(() => {
        summarizeCurrentEmail();
      }, 800);
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  
    log("MutationObserver set up.");
  }
  
  // Init when Gmail is ready
  function init() {
    log("Content script loaded.");
    setupObserver();
  }
  
  init();
  