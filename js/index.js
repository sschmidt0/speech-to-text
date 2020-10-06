// boolean to know if recording or not
let onRecording = false;

let mic = document.querySelector("#circlein");
let speechToText = '';
let interimTranscript = '';


const webkitSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new webkitSpeechRecognition();
recognition.interimResults = true;


// recognizing text, transformation into HTML
recognition.addEventListener("result", e => {
  let language = document.getElementById("language").value;
  console.log(language);
  recognition.lang = language;

  for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
    let transcript = e.results[i][0].transcript;
    console.log(transcript);

    if (e.results[i].isFinal) {
      speechToText += transcript;
      interimTranscript = '';
    } else {
      interimTranscript += transcript;
    }
  }
  $(".transcr").val(speechToText + interimTranscript);
  $(".btns").css("visibility", "visible");
});


// activate / deactivate microphone
mic.addEventListener("click", () => {
  if (onRecording) stopRecording();
  else startRecording();
});


// copy text
let text = document.querySelector(".transcr");
$(".copy").click(copyText);
$(".delete").click(deleteText);




function copyText() {
  text.select();
  text.setSelectionRange(0, 99999);
  document.execCommand("Copy");
}

function deleteText() {
  $(".transcr").val("");
  speechToText = '';
  interimTranscript = '';
  stopRecording();
  $(".btns").css("visibility", "hidden");
  location.reload();
}

function stopRecording() {
  recognition.stop();
  onRecording = false;
  console.log("recognition end");
  mic.style.backgroundColor = "rgb(0, 255, 255)";
}

function startRecording() {
  recognition.start();
  onRecording = true;
  console.log("recognition start");
  mic.style.backgroundColor = "rgba(0, 0, 255, .4)";
}
