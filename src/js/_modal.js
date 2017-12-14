import PerfectScrollbar from 'perfect-scrollbar';


// Add custom scrollbar to modal

const targetModal = document.querySelector('.js-c-scrollbar');

if ( targetModal ) {

  modalIsPresent(targetModal);
  
}


function modalIsPresent(target) {

  const ps = new PerfectScrollbar(target, {
    wheelSpeed: 1,
    wheelPropagation: true,
    minScrollbarLength: 10

  });

  /// SHOW MODAL

  (function getTheModal() {

    const modalWrapper = document.querySelector('.js-privacy-policy-modal');
    const modal = document.querySelector('.js-actual-modal');
    const trigger = [].slice.call(document.querySelectorAll('.js-show-textual-modal'));
    const close = [].slice.call(document.querySelectorAll('.js-close-textual-modal'));



    bindEvents(modalWrapper,modal, trigger, close);

  })();


  function bindEvents(w, m, t, c) {

    bindClickOnTrigger(w, t);
    bindClickOnClose(w, c);
    clickOutside(t, m, w);
  }

  function bindClickOnTrigger(modal, trigger) {

    trigger.forEach(function(e) {
      e.addEventListener('click', function(e) {
        showTheModal(modal);
      });
    });

  }


  function bindClickOnClose(modal, close) {

    close.forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.stopPropagation();
        closeTheModal(modal);

      });
    });

  }


  function showTheModal(t) {
    t.classList.add('is-active');
  }

  function closeTheModal(t) {
    t.classList.remove('is-active');
  }


  function clickOutside(trigger, block, wrapper) {


    const body = document.querySelector('body');
    const b = block;
    const w = wrapper;
    const t = trigger;

    // console.log(block, trigger);

    body.addEventListener('click', function(e) {

      closeTheModal(w);
      // console.log('body');

    });


    b.addEventListener('click', function(e) {


      if (!e.target.classList.contains('.js-show-textual-modal')) {
        e.stopPropagation();
      }

      // console.log('wrap');
      showTheModal(w);

    });


    t.forEach(function(el) {

      el.addEventListener('click', function(e) {


        if (!e.target.classList.contains('.js-actual-modal')) {
          e.stopPropagation();
        }

        console.log('wrap');
        showTheModal(w);

      });


    });




  }

}
