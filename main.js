const fallbackQuotes = [
    { q: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", a: "Martin Fowler" },
    { q: "First, solve the problem. Then, write the code.", a: "John Johnson" },
    { q: "Code is like humor. When you have to explain it, it's bad.", a: "Cory House" },
    { q: "Simplicity is the soul of efficiency.", a: "Austin Freeman" },
    { q: "The best way to get a project done faster is to start sooner.", a: "Jim Highsmith" },
    { q: "Programming isn't about what you know; it's about what you can figure out.", a: "Chris Pine" },
    { q: "Make it work, make it right, make it fast.", a: "Kent Beck" },
    { q: "Every great developer you know got there by solving problems they were unqualified to solve until they did it.", a: "Patrick McKenzie" },
    { q: "The most disastrous thing that you can ever learn is your first programming language.", a: "Alan Kay" },
    { q: "Software is a great combination between artistry and engineering.", a: "Bill Gates" },
    { q: "One of the best programming skills you can have is knowing when to walk away for a while.", a: "Oscar Godson" },
    { q: "Debugging is twice as hard as writing the code in the first place.", a: "Brian W. Kernighan" },
    { q: "Talk is cheap. Show me the code.", a: "Linus Torvalds" },
    { q: "An idiot admires complexity, a genius admires simplicity.", a: "Terry A. Davis" },
    { q: "The function of good software is to make the complex appear simple.", a: "Grady Booch" },
    { q: "It's not a bug — it's an undocumented feature.", a: "Anonymous" },
    { q: "The computer was born to solve problems that did not exist before.", a: "Bill Gates" },
    { q: "Clean code always looks like it was written by someone who cares.", a: "Robert C. Martin" },
    { q: "First, think. Second, dream. Third, believe. And finally, dare.", a: "Walt Disney" },
    { q: "Don't comment bad code — rewrite it.", a: "Brian W. Kernighan" },
];

function getRandomFallback() {
    const pick = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    document.getElementById('quoteText').textContent = pick.q;
    document.getElementById('quoteAuthor').textContent = '— ' + pick.a;
}

async function loadQuote() {
    const btn = document.getElementById('quoteRefresh');
    const textEl = document.getElementById('quoteText');
    const authorEl = document.getElementById('quoteAuthor');

    if (btn) btn.textContent = '↻ Loading...';
    textEl.style.opacity = '0.4';

    try {
        // cache-bust with timestamp so browser never uses cached response
        const res = await fetch(
            `https://api.quotable.io/random?tags=technology,inspirational,success,wisdom&maxLength=200&_=${Date.now()}`,
            { cache: 'no-store' }
        );
        if (!res.ok) throw new Error('API failed');
        const data = await res.json();
        textEl.textContent = data.content;
        authorEl.textContent = '— ' + data.author;
    } catch {
        getRandomFallback();
    }

    textEl.style.opacity = '1';
    if (btn) btn.textContent = '↻ New Quote';
}

// Load fresh quote on every page load
loadQuote();
