// Create constructor function with a method called type
const TypeWriter = function (txtElement, words, wait = 3000) {
  // We can assign properties using "this."
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  // Words are formatted as an array - set words array at 0
  this.wordIndex = 0;
  // The parseInt() function parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems).
  this.wait = parseInt(wait, 10);
  // type() is the main method
  this.type();
  // Represents the state if the text is deleting or not - default to false
  this.isDeleting = false;
};

// Type method
TypeWriter.prototype.type = function () {
  // Get current index of word
  const current = this.wordIndex % this.words.length;
  // Get full text of the current word
  const fullTxt = this.words[current];
  // Check if deleting
  if (this.isDeleting) {
    // Remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add character
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  // Output txt - insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  // Initial Type Speed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }
  // If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    // Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before typing new word
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Initialise on DOM Load
document.addEventListener('DOMContentLoaded', init);
// Initialise App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Initialise the typewriter
  new TypeWriter(txtElement, words, wait);
}
