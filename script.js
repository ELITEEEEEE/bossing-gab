/*
  PERSONALIZE YOUR WEBSITE HERE ♡
  1. Change herName / yourName if you want.
  2. Edit each slide's title and message.
  3. Put your pictures in a folder named "photos" next to these files.
     Example: photos/first-date.jpg
  4. Replace the secretMessage and finalMessage with your own words.
*/

const herName = "Bossing Gab";
const yourName = "Elet";

const slides = [
  {
    kicker: "A LITTLE MEMORY",
    title: "My favorite kind of magic",
    message: "The world is a pretty big place, but somehow my favorite place is wherever I get to share a moment with you.",
    image: "boss 1.jpg",
    alt: "Our first favorite memory"
  },
  {
    kicker: "THE LITTLE THINGS",
    title: "You make ordinary days glow",
    message: "It's the little things about you that stay with me: the way you talk, the way you laugh, and how you can make a regular day feel special without even trying.",
    image: "boss 3.jpg",
    alt: "A little moment we want to remember"
  },
  {
    kicker: "IF YOU ONLY KNEW",
    title: "You are so precious to me",
    message: "You don't have to do anything extraordinary to be special to me. You can just be yourself, have your quiet days, be silly, be tired—and I'll still be grateful that I get to know you.",
    image: "boss 4.jpg",
    alt: "A photo that makes us smile"
  },
  {
    kicker: "MORE MEMORIES TO COME",
    title: "My favorite is still ahead",
    message: "I hope we get to collect so many more little moments together. More laughs, more pictures, more stories that only we understand. More us.",
    image: "boss 2.jpg",
    alt: "A memory for the future"
  }
];

const secretMessage =
  "Here's my little secret, Bossing: even when I can't find the perfect words, I hope my actions remind you that you are cared for. I want to be someone who makes your days softer, celebrates your wins, listens on your hard days, and keeps choosing you in the small, everyday ways. ♡";

const finalMessage =
  "My dearest Bossing Gab,\n\n" +
  "I made this little corner of the internet just for you because sometimes a simple message doesn't feel like enough to hold everything I want to say. So I wanted to give you something you could open, revisit, and keep—a tiny collection of words and moments from me to you.\n\n" +
  "Thank you for being in my life. Thank you for the smiles, the conversations, the little things you might not even realize I remember. I hope you never feel like you have to earn my affection by being perfect. I want to know the real you: the happy you, the sleepy you, the overthinking you, and every version in between.\n\n" +
  "I can't promise every day will be perfect, but I can promise that what we have matters to me. I want to keep learning you, laughing with you, making memories with you, and finding new reasons to adore you. If you ever have a day when you forget how special you are, come back here and let me remind you.\n\n" +
  "Out of all the stars in the sky, I'm really glad I found you. I hope I get to keep choosing you, one ordinary and extraordinary day at a time.\n\n" +
  "I love you, Bossing. More than this little website could ever fit. ♡";

const welcome = document.getElementById("welcome");
const memories = document.getElementById("memories");
const secretScreen = document.getElementById("secretScreen");
const envelopeScreen = document.getElementById("envelopeScreen");
const slideImage = document.getElementById("slideImage");
const photoPlaceholder = document.getElementById("photoPlaceholder");
const slideKicker = document.getElementById("slideKicker");
const slideTitle = document.getElementById("slideTitle");
const slideMessage = document.getElementById("slideMessage");
const counter = document.getElementById("counter");
const progressFill = document.getElementById("progressFill");
const dots = document.getElementById("dots");
const envelope = document.getElementById("envelope");
let currentSlide = 0;
let envelopeOpened = false;

document.getElementById("herNameHeading").textContent = herName;
document.getElementById("letterNameHeading").textContent = herName;
document.getElementById("yourName").textContent = yourName;
document.getElementById("secretMessage").textContent = secretMessage;
document.getElementById("finalMessage").textContent = finalMessage;

function showScreen(screen) {
  [welcome, memories, secretScreen, envelopeScreen].forEach(item => item.classList.remove("active"));
  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDots() {
  dots.replaceChildren();
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = `dot ${index === currentSlide ? "active" : ""}`;
    dot.setAttribute("aria-label", `Go to memory ${index + 1}`);
    dot.addEventListener("click", () => {
      currentSlide = index;
      renderSlide();
    });
    dots.appendChild(dot);
  });
}

function renderSlide() {
  const slide = slides[currentSlide];
  slideImage.onerror = () => {
    slideImage.style.display = "none";
    photoPlaceholder.style.display = "flex";
  };
  slideImage.onload = () => {
    slideImage.style.display = "block";
    photoPlaceholder.style.display = "none";
  };
  slideImage.src = slide.image;
  slideImage.alt = slide.alt || slide.title;
  slideKicker.textContent = slide.kicker;
  slideTitle.textContent = slide.title;
  slideMessage.textContent = slide.message;
  counter.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  progressFill.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
  document.getElementById("prevBtn").style.visibility = currentSlide === 0 ? "hidden" : "visible";
  document.getElementById("nextBtn").textContent = currentSlide === slides.length - 1 ? "One last secret ✦" : "Next memory →";
  renderDots();
}

document.getElementById("startBtn").addEventListener("click", () => {
  currentSlide = 0;
  renderSlide();
  showScreen(memories);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    renderSlide();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    renderSlide();
  } else {
    showScreen(secretScreen);
  }
});

document.getElementById("unlockBtn").addEventListener("click", () => {
  const reveal = document.getElementById("secretReveal");
  reveal.hidden = false;
  document.getElementById("unlockBtn").textContent = "Your secret is unlocked ♡";
  document.getElementById("unlockBtn").disabled = true;
});

document.getElementById("toLetterBtn").addEventListener("click", () => showScreen(envelopeScreen));

document.getElementById("envelopeBtn").addEventListener("click", () => {
  if (!envelopeOpened) {
    envelopeOpened = true;
    envelope.classList.add("open");
    document.getElementById("envelopeHint").textContent = "a little love, just for you ♡";
    window.setTimeout(() => {
      document.getElementById("fullLetter").hidden = false;
      document.getElementById("fullLetter").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 650);
  } else {
    document.getElementById("fullLetter").hidden = false;
  }
});

document.getElementById("replayBtn").addEventListener("click", () => {
  currentSlide = 0;
  envelopeOpened = false;
  envelope.classList.remove("open");
  document.getElementById("fullLetter").hidden = true;
  document.getElementById("secretReveal").hidden = true;
  document.getElementById("unlockBtn").disabled = false;
  document.getElementById("unlockBtn").textContent = "Tap to unlock ♡";
  showScreen(memories);
  renderSlide();
});

renderSlide();
