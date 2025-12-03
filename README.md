#  AI Email Summarizer (Chrome Extension)

A lightweight Chrome extension that generates instant **TL;DR summaries** for Gmail emails using an NLP-based extractive summarization algorithm.  
Runs entirely **client-side** with **no external servers**, ensuring complete privacy and fast performance.

---

##  Features

-  Automatically generates a concise **TL;DR summary** for any opened Gmail email  
-  Uses a custom **JavaScript extractive summarizer** (sentence scoring + word frequency analysis)  
-  Detects when a new email is opened using Gmail’s dynamic DOM  
-  Injects a clean summary widget directly above the email body  
-  100% **privacy-friendly** — no data leaves the browser  
-  Works instantly without API calls or server hosting  
-  Easy to modify or extend with your own ML models  

---

##  Screenshots  
<img width="1375" height="809" alt="Screenshot 2025-12-04 at 00 37 44" src="https://github.com/user-attachments/assets/e215c50b-f6a1-4488-969d-9b5af68860bc" />


---

## 🛠️ How It Works

1. **Content script** runs on Gmail pages  
2. Detects when an email is opened  
3. Extracts the email **subject + body text**  
4. Sends combined text to `summarizeText()`  
5. Summarizer:
   - Splits into sentences  
   - Tokenizes and removes stopwords  
   - Scores sentences based on important word frequency  
   - Picks top N sentences  
6. Injects a styled **TL;DR summary box** before the email body  

All running **locally** inside your browser.

---

---

##  Installation (Developer Mode)

1. Clone this repo:
    ```bash
    git clone https://github.com/EpicGamerJay/gmail-summarizer-extension.git
    ```
2. Open Chrome → go to:
    ```
    chrome://extensions
    ```
3. Enable **Developer Mode** (top-right)
4. Click **Load unpacked**
5. Select this project folder
6. Open Gmail → open any email → TL;DR appears at the top 

---

##  Future Improvements

-  Optional backend with Transformer-based summarizer (T5/BART)  
-  “Summarize Again / Shorter / Longer” buttons  
-  Better signature + quoted text cleaning  
-  Support for Outlook Web, ProtonMail, etc.  
-  Highlight important sentences inside the email  

---

## 📄 License

MIT License. Free to use and modify.
