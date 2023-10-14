const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const form = document.querySelector("#form");
const submitBtn = document.querySelector("#submitBtn");

/**
 * Check for the validity of the full name & email using regex...
 */
const isValidFullName = (fullName) => {
  const re = /^[a-zA-Z]+ [a-zA-Z]+$/;
  return re.test(String(fullName).toLowerCase());
};
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Function to set the error message and remove the error message...
 */
const setSuccessFunction = (field) => {
  const fieldParent = field.parentElement;
  const errorSpan = fieldParent.querySelector(".custom-error");
  errorSpan.classList.add("hidden");
  errorSpan.innerText = "";
};
const setErrorFunction = (field, message) => {
  const fieldParent = field.parentElement;
  const errorSpan = fieldParent.querySelector(".custom-error");
  errorSpan.classList.remove("hidden");
  errorSpan.innerText = message;
};

/**
 * Validations...
 */
const validateFullNameFunction = (fullNameValue) => {
  if (fullNameValue === "") {
    setErrorFunction(fullName, "Please provide a fullname.");
    return false;
  } else if (!isValidFullName(fullNameValue)) {
    setErrorFunction(fullName, "Please provide a valid fullname.");
    return false;
  } else {
    setSuccessFunction(fullName);
    return true;
  }
};
const validateEmailFunction = (emailValue) => {
  if (emailValue === "") {
    setErrorFunction(email, "Please provide an email.");
    return false;
  } else if (!isValidEmail(emailValue)) {
    setErrorFunction(email, "Please provide a valid email.");
    return false;
  } else {
    setSuccessFunction(email);
    return true;
  }
};
const validateMessageFunction = (messageValue) => {
  if (messageValue === "") {
    setErrorFunction(message, "Love to hear your messages 😄.");
    return false;
  } else {
    setSuccessFunction(message);
    return true;
  }
};

/**
 * Main Function that send messages...
 */
function sendEmail(fullNameValue, emailValue, messageValue) {
  Email.send({
    SecureToken: "____________<YOUR SECURE TOKEN>__________",
    To: "___________<DESTINATION EMAIL>_________",
    From: "_________<SENDER MAIL>____________",
    Subject: `Message from the website by ${fullNameValue}`,
    Body: `
      <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Email Response</title>
            <style>
              .outer {
                background-color: #052F18;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 50px;
              }

              .email-container {
                background-color: white;
                width: 100%;
                padding: 20px;
                border-radius: 20px;
              }

              p {
                font-size: 1.12rem;
              }

              .prioritize {
                text-decoration: underline;
                font-weight: bold;
              }
            </style>
          </head>

          <body>
            <div class="outer">
              <div class="email-container">
              <p>Fullname : ${fullNameValue}</p>
              <p>Email ID : ${emailValue}</p>
              <p>Message : ${messageValue}</p>

              </div>
            </div>
          </body>
          </html>`,
  }).then((message) => {
    if (message === "OK") {
      Toastify({
        text: "Email sent successfully! ✈️",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    } else {
      Toastify({
        text: "Sorry, unable to send message! 🚫",
        className: "info",
        style: {
          background: "linear-gradient(to right, #c03c68, #f38366)",
        },
      }).showToast();
    }
    form.reset();
    submitBtn.removeAttribute("disabled");
    submitBtn.value = "Submit 👻";
  });
}

/**
 * Adding the event listener to the form...
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();
  let isFullNameValid = validateFullNameFunction(fullNameValue);
  let isEmailValid = validateEmailFunction(emailValue);
  let isMessageValid = validateMessageFunction(messageValue);

  if (isFullNameValid && isEmailValid && isMessageValid) {
    submitBtn.setAttribute("disabled", "disabled");
    submitBtn.value = "Submitting 🌊...";
    sendEmail(fullNameValue, emailValue, messageValue);
  }
});
