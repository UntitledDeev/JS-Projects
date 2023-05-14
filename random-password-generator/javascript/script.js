document.addEventListener("DOMContentLoaded", function () {
  const upper = document.getElementById("upperCase");
  const lower = document.getElementById("lowerCase");
  const number = document.getElementById("number");
  const symbol = document.getElementById("symbol");
  const passwordLength = document.getElementById("length");
  const passwordBox = document.getElementById("passwordBox");
  const copyToClipboard = document.getElementById("copyToClipboard");
  const generateBtn = document.getElementById("generateBtn");

  const keys = {
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    symbol: "!@#$%^&*()_+~\\|}{[]:;?></-=",
  };

  function generateCharacter(set) {
    return set[Math.floor(Math.random() * set.length)];
  }

  function createPassword() {
    if (
      !upper.checked &&
      !lower.checked &&
      !number.checked &&
      !symbol.checked
    ) {
      return;
    }
    let generatedPassword = "";

    while (generatedPassword.length < passwordLength.value) {
      if (upper.checked) {
        generatedPassword += generateCharacter(keys.upperCase);
      }
      if (lower.checked) {
        generatedPassword += generateCharacter(keys.lowerCase);
      }
      if (number.checked) {
        generatedPassword += generateCharacter(keys.number);
      }
      if (symbol.checked) {
        generatedPassword += generateCharacter(keys.symbol);
      }
    }
    passwordBox.innerHTML = generatedPassword;
  }

  function copyToClipboardFunction() {
    const password = passwordBox.innerText;
    if (!password) {
      return;
    }
    navigator.clipboard.writeText(password).then(() => {
      console.log(password);
    });
  }

  createPassword();

  copyToClipboard.addEventListener("click", copyToClipboardFunction);
  generateBtn.addEventListener("click", createPassword);
});
