const terminal = document.getElementById("terminal");
const output = document.getElementById("output");

let inMatrix = false;

const commands = {
  cmd: [
    "about       - about me",
    "education   - my education background",
    "projects    - view my work",
    "contact     - contact information",
    "clear       - clear the terminal",
    "back        - return to the menu "
  ],
  about: [
    "Creative and curious Frontend Developer who sees code as a canvas to solve problems and build meaningful digital experiences. Passionate about learning, experimenting, and turning bold ideas into polished, user-friendly interfaces.",
    "type back to return ",
  ],
  education: [
    "MCA, Vivekanand Education Society's Institute of Technology ,Mumbai   2024-present",
    "BscIT, Vidyalankar School of Information and Technology ,Mumbai  2021-2024",
    "type back to return ",
  ],
  projects: [
    "1. Water Supply System",
    "              A web app built using ReactJS and Firebase that simulates  water distribution tracking system",
    "2. Obys Agency UI CLone ",
    "                    A pixel-perfect UI clone of the Obys agency site built with modern frontend tools.",
    "type 1 For Water Supply System Github",
    "type 2 for Obys Agency Github",
    "type back to return ",
  ],
  contact: [
    "Email",
    "GitHub",
    "LinkedIn",
    "Type Command Git , Email or LinkedIn to Reach Out"
  ],
};
const fightCLub = [
  "Welcome to F***T C**B ",
  "                   ~Tyler Durden",
  "First Rule of F***T C**B is Do not Write wrong command",
  "Second Rule of F***T C**B is DO NOT WRITE  wrong command",
  "type back to return ",
];
function typeLine(text, delay = 35) {
  return new Promise((resolve) => {
    const line = document.createElement("p");
    output.appendChild(line);
    
    const audio = document.getElementById("typingSound");
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {}); // catch autoplay errors
    }

    let i = 0;
    const interval = setInterval(() => {
      line.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(interval);
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        resolve();
      }
    }, delay);
  });
}

async function introSequence() {
  const lines = [
    "This is your last chance.",
    " ",
    "You take the blue pill – the story ends, you view my resume.",
    " or",
    "You take the red pill – you stay in Wonderland and See how deep the rabbit hole goes.",
    "Choose Carefully  : ",
  ];
  for (const line of lines) {
    await typeLine(line);
  }
  createInputLine(); // wait for user input
}

function createInputLine() {
  const inputLine = document.createElement("div");
  inputLine.classList.add("input-line");

  const prompt = document.createElement("span");
  prompt.classList.add("prompt");
  prompt.innerHTML = ">>";

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.autofocus = true;

  inputLine.appendChild(prompt);
  inputLine.appendChild(input);
  terminal.appendChild(inputLine);
  input.focus();

  input.addEventListener("keydown", async function (e) {
    if (e.key === "Enter") {
      const cmds = input.value.trim().toLowerCase();
      input.disabled = true;

      inputLine.remove();

      // Handle pre-Matrix stage
      if (!inMatrix) {
        if (cmds === "redpill" || cmds === "red pill" || cmds === "Red Pill") {
          output.innerHTML = "";
          inMatrix = true;
          await typeLine("Welcome to the Matrix.");
          await typeLine("Type 'cmds' to dive deep ...");
          createInputLine();
        } else if (
          cmds === "bluepill" ||
          cmds === "blue pill" ||
          cmds === "Blue Pill"
        ) {
          await typeLine("Taking you back to Matrix...");
          output.innerHTML = "";
          await new Promise((resolve) => setTimeout(resolve, 1000));
          window.open(
            "https://drive.google.com/file/d/1jcII0m1j5YYXIrksrCQfZXDtOKa9sZId/view?usp=drive_link",
            "_blank"
          );
        } else {
          await typeLine("Choose wisely: redpill or bluepill");
          createInputLine();
        }
        return;
      }

      // Handle terminal commands after redpill
      if (cmds === "clear") {
        output.innerHTML = "";
        createInputLine();
        return;
      }

      if (cmds.endsWith("\\")) {
        await typeLine("Usage: help");
        createInputLine();
        return;
      }
if(cmds === "Back" || cmds=="back"){
  if(!inMatrix){
    introSequence()
  }
  output.innerHTML = "";
   const echoed = document.createElement("p");
        echoed.innerHTML = `<span class="prompt"><span class="user">visitor</span>@<span class="host">terminal.Aryan.dev</span>:~$</span> ${cmds}`;
        output.appendChild(echoed);
   for (const line of commands["cmd"]) {
          await typeLine(line);
        }
    createInputLine()
    return 
}
if (cmds === "github") {
  await typeLine("ReDirecting to GitHub...");
  window.open("https://github.com/Aaryany25", "_blank");
  createInputLine();
  return;
} 
if (cmds === "linkedin") {
  await typeLine("ReDirecting to LinkedIN...");
  window.open("https://www.linkedin.com/in/aryan-yadav25/", "_blank");
  createInputLine();
  return;
}
if (cmds === "Email") {
  await typeLine("Opening Gmail...");
  window.open("https://mail.google.com/mail/?view=cm&fs=1&to=aryan.yadav.03ay@gmail.com", "_blank");
  createInputLine();
  return;
}
if(cmds ==="1"){
   await typeLine("ReDirecting to the Project");
  window.open("https://github.com/Aaryany25/WMS", "_blank");
  createInputLine();
  return;
}
if(cmds ==="2"){
   await typeLine("ReDirecting to the Project");
  window.open("https://github.com/Aaryany25/obys-agency", "_blank");
  createInputLine();
  return;
}
 
      if (commands[cmds]) {
        output.innerHTML = "";
        const echoed = document.createElement("p");
        echoed.innerHTML = `<span class="prompt"><span class="user">visitor</span>@<span class="host">terminal.Aryan.dev</span>:~$</span> ${cmds}`;
        output.appendChild(echoed);

        for (const line of commands[cmds]) {
          await typeLine(line);
        }
      } else {
        output.innerHTML = "";
        for (const line of fightCLub) {
          await typeLine(line);
        }
      }

      createInputLine();
    }
  });
}

introSequence();
