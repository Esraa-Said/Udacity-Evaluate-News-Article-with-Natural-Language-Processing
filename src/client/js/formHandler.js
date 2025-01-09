import { checkForName } from "./nameChecker";
import axios from "axios";

const serverURL = "https://localhost:8000/api";

const form = document.getElementById("urlForm");
const error = document.querySelector("#error");
const agreement = document.getElementById("agreement");
const subjectivity = document.getElementById("subjectivity");
const confidence = document.getElementById("confidence");
const irony = document.getElementById("irony");
const score_tag = document.getElementById("score_tag");
const results = document.getElementById("results");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  // Get the URL from the input field
  const formText = document.getElementById("name").value;


  // Check if the URL is valid
  if(!checkForName(formText)){
    show_error("please, enter a valid url");
    return;
  }

  
  // If the URL is valid, send it to the server using the serverURL constant above
  const { data } = await axios.post("http://localhost:8000/", form, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { msg, sample } = data;
  if (msg) {
    show_error(msg);
    return;
  }
  show_results(sample);
}

// Function to send data to the server
const show_error = (msg) => {
    error.style.display = "block";
    results.style.display = "none";

  error.innerHTML = msg;
};

const show_results = (sample) => {
  error.style.display = "none";
  results.style.display = "block";

  agreement.innerHTML = `Agreement: ${sample.agreement}`;

  subjectivity.innerHTML = `Subjectivity: ${sample.subjectivity}`;

  confidence.innerHTML = `Confidence: ${sample.confidence}`;
  irony.innerHTML = `Irony: ${sample.irony}`;

  score_tag.innerHTML = `Score Tag: ${sample.score_tag}`;
};

// Export the handleSubmit function
export default handleSubmit;
