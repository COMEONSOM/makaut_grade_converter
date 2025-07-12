// === DOM Elements ===
const sgpaInput = document.getElementById("sgpa");
const sgpaResult = document.getElementById("sgpaResult");

const ygpaOddCP = document.getElementById("ygpaOddCP");
const ygpaOddC = document.getElementById("ygpaOddC");
const ygpaEvenCP = document.getElementById("ygpaEvenCP");
const ygpaEvenC = document.getElementById("ygpaEvenC");
const ygpaResult = document.getElementById("ygpaResult");

const dgpaResult = document.getElementById("dgpaResult");
const courseType = document.getElementById("courseType");
const ygpaInputs = [
  document.getElementById("yg1"),
  document.getElementById("yg2"),
  document.getElementById("yg3"),
  document.getElementById("yg4")
];

const cgpaCP = document.getElementById("cgpaCP");
const cgpaC = document.getElementById("cgpaC");
const cgpaResult = document.getElementById("cgpaResult");

const calcScreen = document.getElementById("calcScreen");

// === Helper Functions ===
function toPercentage(gpa) {
  return ((gpa - 0.75) * 10).toFixed(2);
}

function showMessage(element, message, status) {
  element.textContent = message;
  element.className = `output ${status}`;
}

// === SGPA Converter ===
function convertSGPA() {
  const sgpa = parseFloat(sgpaInput.value);
  if (isNaN(sgpa) || sgpa <= 0 || sgpa > 10) {
    showMessage(sgpaResult, "❌ Please enter a valid SGPA (0-10).", "error");
    return;
  }
  const percent = toPercentage(sgpa);
  showMessage(sgpaResult, `✅ Percentage: ${percent}%`, "success");
}

// === YGPA Calculator ===
function calculateYGPA() {
  const oddCP = parseFloat(ygpaOddCP.value);
  const oddC = parseFloat(ygpaOddC.value);
  const evenCP = parseFloat(ygpaEvenCP.value);
  const evenC = parseFloat(ygpaEvenC.value);

  if ([oddCP, oddC, evenCP, evenC].some(v => isNaN(v) || v < 0)) {
    showMessage(ygpaResult, "❌ Fill all fields with valid numbers.", "error");
    return;
  }

  const totalCP = oddCP + evenCP;
  const totalC = oddC + evenC;

  if (totalC === 0) {
    showMessage(ygpaResult, "❌ Total credits cannot be zero.", "error");
    return;
  }

  const ygpa = (totalCP / totalC).toFixed(2);
  const percent = toPercentage(ygpa);
  showMessage(ygpaResult, `✅ YGPA: ${ygpa}, Percentage: ${percent}%`, "success");
}

// === DGPA Calculator ===
function calculateDGPA() {
  const type = courseType.value;
  let dgpa = 0;

  const y = ygpaInputs.map(input => parseFloat(input.value) || 0);

  switch (type) {
    case "1": dgpa = y[0]; break;
    case "2": dgpa = ((y[0] + y[1]) / 2).toFixed(2); break;
    case "3": dgpa = ((y[0] + y[1] + y[2]) / 3).toFixed(2); break;
    case "3l": dgpa = ((y[1] + 1.5 * y[2] + 1.5 * y[3]) / 4).toFixed(2); break;
    case "4": dgpa = ((y[0] + y[1] + 1.5 * y[2] + 1.5 * y[3]) / 5).toFixed(2); break;
    default:
      showMessage(dgpaResult, "❌ Invalid degree type.", "error");
      return;
  }

  const percent = toPercentage(dgpa);
  showMessage(dgpaResult, `✅ DGPA: ${dgpa}, Percentage: ${percent}%`, "success");
}

// === CGPA Calculator ===
function calculateCGPA() {
  const cp = parseFloat(cgpaCP.value);
  const c = parseFloat(cgpaC.value);

  if (isNaN(cp) || isNaN(c) || cp <= 0 || c <= 0) {
    showMessage(cgpaResult, "❌ Enter valid credit points and credits.", "error");
    return;
  }

  const cgpa = (cp / c).toFixed(2);
  const percent = toPercentage(cgpa);
  showMessage(cgpaResult, `✅ CGPA: ${cgpa}, Percentage: ${percent}%`, "success");
}

// === Dynamic YGPA Fields ===
function updateYGPAFields() {
  const type = courseType.value;
  ygpaInputs.forEach((input, idx) => {
    input.parentElement.style.display = "none";
    if (
      (type === "1" && idx === 0) ||
      (type === "2" && idx < 2) ||
      (type === "3" && idx < 3) ||
      (type === "3l" && idx >= 1) ||
      (type === "4")
    ) {
      input.parentElement.style.display = "block";
    }
  });
}

// === Fullscreen Toggle ===
function showCalculations() {
  calcScreen.classList.add("show");
}

function hideCalculations() {
  calcScreen.classList.remove("show");
}

// === Initialize ===
document.addEventListener("DOMContentLoaded", () => {
  updateYGPAFields();
  courseType.addEventListener("change", updateYGPAFields);
});
