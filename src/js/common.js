


// FORM LABELS TRANSFORM


(function animateLabels() {

  let inputs = [].slice.call(document.querySelectorAll('.js-s-input'));

  let labels = [].slice.call(document.querySelectorAll('.js-s-label'));

  inputs.forEach(function(el, i, array) {

    el.addEventListener('input', function(e) {

      let lab = labels[i];

      checkLength(el, lab);

    });

    el.addEventListener('focus', function(e) {

      let lab = labels[i];

      moveLabel(lab, 'up');

    });

    el.addEventListener('focusout', function(e) {

      let lab = labels[i];

      checkLength(el, lab);


    });


  });



})();

function checkLength(el, lab) {

  if (el.value.length !== 0) {
    moveLabel(lab, 'up');
  } else {
    moveLabel(lab, 'down');
  }

}

function moveLabel(lab, dir) {
  if (dir === 'up') {
    lab.classList.add('is-active');
  } else if (dir = 'down') {
    lab.classList.remove('is-active');
  }


}



/// CHECKBOX LABELS TRIGGERING

(function labelTriggering() {


  // let checkbox = [].slice.call(document.querySelectorAll('.js-s-checkbox'));

  let checkLabel = [].slice.call(document.querySelectorAll('.js-s-checkLabel'));

  if (!checkLabel) return false;

  checkLabel.forEach(el => {
    el.addEventListener('click', function(e) {

      toggleLabels(e.currentTarget);
      toggleCaptcha();

    });

  });



})();



function toggleLabels(t) {
  
  t.classList.toggle('is-checked');

}


function toggleCaptcha() {
  let captcha = document.querySelector('.js-form-recaptcha');

  captcha.classList.toggle('is-visible');
}


