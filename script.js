const terminal = document.getElementById("terminal");
const output = document.getElementById("output");

let inMatrix = false;

const commands = {
  help : [
    "about       - about me",
    "education   - my education background",
    "projects    - view my work",
    "contact     - contact information",
    "clear       - clear the terminal",
    "help        - Show All Commmand "
  ],
  about: [
    "Creative and curious Frontend Developer who sees code as a canvas to solve problems and build meaningful digital experiences. Passionate about learning, experimenting, and turning bold ideas into polished, user-friendly interfaces."
  ],
  education: [
   "MCA, Vivekanand Education Society's Institute of Technology ,Mumbai   2024-present",
   "BscIT, Vidyalankar School of Information and Technology ,Mumbai  2021-2024"

  ],
  projects: [
    "1. Water Supply System- ReactJs and Firebase",
    "2. Obys Agency UI CLone ",
    
  ],
  contact: [
    "Email: aryan.yadav.03ay@gmail.com",
    "GitHub: https://github.com/Aaryany25",
    "LinkedIn: https://www.linkedin.com/in/aryan-yadav25/"
  ],

};

function typeLine(text, delay = 80) {
  return new Promise((resolve) => {
    const line = document.createElement("p");
    output.appendChild(line);
    let i = 0;
    const interval = setInterval(() => {
      line.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(interval);
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
    "Choose : "

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
      const cmd = input.value.trim().toLowerCase();
      input.disabled = true;

      const echoed = document.createElement("p");
      // echoed.innerHTML = ``;
       echoed.innerHTML = `<span class="prompt"><span class="user">visitor</span>@<span class="host">terminal.satnaing.dev</span>:~$</span> ${cmd}`;
      output.appendChild(echoed);

      inputLine.remove();

      // Handle pre-Matrix stage
      if (!inMatrix) {
        if (cmd === "redpill") {
          output.innerHTML = '';
          inMatrix = true;
          await typeLine("Welcome to the Matrix.");
          await typeLine("Type 'help' to begin.");
          createInputLine();
        } else if (cmd === "bluepill") {
          await typeLine("Opening resume...");
         output.innerHTML = '';
          await new Promise((resolve) => setTimeout(resolve, 1000));
          window.open("https://drive.google.com/file/d/1jcII0m1j5YYXIrksrCQfZXDtOKa9sZId/view?usp=drive_link", "_blank");
        } else {
          await typeLine("Choose wisely: redpill or bluepill");
          createInputLine();
        }
        return;
      }

      // Handle terminal commands after redpill
      if (cmd === "clear") {
        output.innerHTML = "";
        createInputLine();
        return;
      }

      if (cmd.endsWith("\\")) {
        await typeLine("Usage: help");
        createInputLine();
        return;
      }

      if (commands[cmd]) {
        for (const line of commands[cmd]) {
          await typeLine(line);
        }
      } else {
        await typeLine(`Command not found: ${cmd}`);
      }

      createInputLine();
    }
  });
}

introSequence();
