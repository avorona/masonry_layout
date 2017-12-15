//for  masonry infinite layout
import InfiniteScroll from 'infinite-scroll';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
// for modal layout
import $ from 'jquery';
import 'magnific-popup';
import PerfectScrollbar from 'perfect-scrollbar';

// init Modal

// modal slider

class Modal {
  constructor(selector) {
    this.trigger = {
      selector: selector
    };
    this.settings = [];
  }

  addData(prop) {
    function pushArray(arr, arr2) {
      arr.push.apply(arr, arr2);
    }
    pushArray(this.settings, prop);
  }

  refreshModal() {
    this.trigger.all = [].slice.call(
      document.querySelectorAll(`.${this.trigger.selector}`)
    );

    this._generateItems();
  }

  _generateItems() {
    let data = this.settings;

    let templates = this._getItemsFromTemplate(data).map(function(e) {
      let item = { src: e };
      return item;
    });

    // console.log(templates);
    this._generateModal(templates);
  }

  _generateModal(itemsTemplates) {
    let self = this;
    let triggers = this.trigger.all;

    // let indexStart=0;
    var magnificPopup = $.magnificPopup.instance;
    // console.log(itemsTemplates);
    magnificPopup.open({
      items: itemsTemplates,
      gallery: {
        enabled: true
      },
      fixedContentPos: true,
      // fixedBgPos: false,
      index: 0,
      type: 'inline'
    });

    magnificPopup.close();

    triggers.forEach(el => {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        let target = e.currentTarget;
        let indexStart = triggers.indexOf(target);

        $.magnificPopup.open({
          items: itemsTemplates,
          gallery: {
            enabled: true,
            arrowMarkup:
              '<button title="%title%" type="button" class="hidden-arrow controll-arrow__btn_%dir%"></button>' // markup of an arrow button
          },
          closeBtnInside: false,
          callbacks: {
            change: function() {
              setTimeout(() => {
                self._generateControlls();
                self._bindNavOnClick(magnificPopup);
                self._createCustomScrollbar();
              }, 100);
            }
          },
          navigateByImgClick: true,
          fixedContentPos: true,
          // fixedBgPos: false,
          index: indexStart,
          type: 'inline'
        });

        magnificPopup.goTo(indexStart);
      });
    });
  }

  _generateControlls() {
    const oldControlls = [].slice.call(
      document.querySelectorAll('.controll-arrow')
    );

    if (oldControlls) {
      oldControlls.forEach(node => {
        node.remove();
      });
    }

    let prev = document.createElement('div');
    prev.setAttribute('class', 'controll-arrow controll-arrow_left');
    // prev.classList.add('controll-arrow', 'controll-arrow_left');
    prev.innerHTML =
      '<button  type="button" class="controll-arrow__btn controll-arrow__btn_left"></button>';

    let next = document.createElement('div');
    // next.classList.add('controll-arrow', 'controll-arrow_right');
    next.setAttribute('class', 'controll-arrow controll-arrow_right');
    next.innerHTML =
      '<button  type="button" class="controll-arrow__btn controll-arrow__btn_right"></button>';

    this._moveControlls(prev, next);
  }

  _moveControlls(prev, next) {
    let wrap = document.querySelector('.public-modal__wrap');
    // console.log(prev,next);
    wrap.appendChild(prev);
    wrap.appendChild(next);
  }

  _bindNavOnClick(mfp) {
    let prevBtn = [].slice.call(
      document.querySelectorAll('.controll-arrow_left')
    );
    let nextBtn = [].slice.call(
      document.querySelectorAll('.controll-arrow_right')
    );
    // console.log(prevBtn);

    prevBtn.forEach(el => {
      el.addEventListener('click', function() {
        mfp.prev(); // go to prev item
      });
    });

    nextBtn.forEach(el => {
      el.addEventListener('click', function() {
        mfp.next(); // go to next item
      });
    });
  }

  _createCustomScrollbar() {
    // Add custom scrollbar to modal

    const targetModal = document.querySelector('.js-c-scrollbar');

    if (targetModal) {
      modalIsPresent(targetModal);
    }

    function modalIsPresent(target) {
      const ps = new PerfectScrollbar(target, {
        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: 10
      });
      ps.update();
    }
  }

  _getItemsFromTemplate(dataArray) {
    let self = this;

    let itemsHTML = [];

    dataArray.forEach(el => {
      if (el.size === 'sm') {
        el.items.forEach(e => {
          itemsHTML.push(self._getItemHTMLForModal(e));
        });
      } else {
        itemsHTML.push(self._getItemHTMLForModal(el));
      }
    });

    return itemsHTML;
  }

  _getItemHTMLForModal(item) {
    let self = this;

    let ItemTemplate;
    // self.template=template

    ItemTemplate = generateHTML(item);

    function generateHTML(item) {
      let template = document.createElement('div');
      template.classList.add('public-modal');

      let wrap = document.createElement('div');
      wrap.classList.add('public-modal__wrap');
      template.appendChild(wrap);

      let inner = document.createElement('div');
      inner.classList.add('public-modal__inner');
      wrap.appendChild(inner);

      let left = document.createElement('div');
      left.classList.add('public-modal__left');
      inner.appendChild(left);

      let right = document.createElement('div');
      right.classList.add('public-modal__right');
      inner.appendChild(right);

      //copyright

      let copyright = document.createElement('div');
      copyright.classList.add('public-modal__copyright');
      left.appendChild(copyright);

      // img

      let imgWrap = document.createElement('div');
      imgWrap.classList.add('public-modal__img');
      left.appendChild(imgWrap);

      let img = document.createElement('img');
      img.src = `img/gallery/${item.srcBig}`;
      imgWrap.appendChild(img);

      //header

      let header = document.createElement('header');
      header.classList.add('public-modal__header');
      right.appendChild(header);

      let company = document.createElement('div');
      company.classList.add('company-info');
      header.appendChild(company);

      let logos = document.createElement('div');
      logos.classList.add('company-info__logos');
      company.appendChild(logos);

      let logoSocial = document.createElement('a');
      logoSocial.href = '#';
      logoSocial.target = '_blank';
      logoSocial.setAttribute(
        'class',
        'company-info__logo company-info__logo_1 soc-logo'
      );
      logoSocial.style.backgroundImage = `url(img/${item.socialLogo})`;
      logos.appendChild(logoSocial);

      let logoCompany = document.createElement('a');
      logoCompany.href = '#';
      logoCompany.target = '_blank';
      logoCompany.setAttribute(
        'class',
        'company-info__logo company-info__logo_2 comp-logo'
      );
      logoCompany.style.backgroundImage = `url(img/${item.companyLogo})`;
      logos.appendChild(logoCompany);

      let title = document.createElement('a');
      title.href = '#';
      title.target = '_blank';
      title.classList.add('company-info__title');
      company.appendChild(title);

      let heading = document.createElement('h4');
      heading.classList.add('company-info__heading');
      heading.innerHTML = item.name;
      title.appendChild(heading);

      let lastSeen = document.createElement('p');
      lastSeen.classList.add('company-info__lastseen');
      lastSeen.innerHTML = item.lastseen;
      title.appendChild(lastSeen);

      // about

      let textual = document.createElement('div');
      textual.setAttribute('class', 'public-modal__textual js-c-scrollbar');
      right.appendChild(textual);

      let about = document.createElement('div');
      about.classList.add('public-modal__about');
      textual.appendChild(about);

      let row1 = document.createElement('div');
      row1.classList.add('public-modal__row');
      about.appendChild(row1);

      let row2 = document.createElement('div');
      row2.classList.add('public-modal__row');
      about.appendChild(row2);

      let row3 = document.createElement('div');
      row3.classList.add('public-modal__row');
      about.appendChild(row3);

      // 1 row

      let info = document.createElement('div');
      info.classList.add('info-box');
      item.about.forEach(el => {
        let p = document.createElement('p');
        p.classList.add('info-box__descr');
        p.innerHTML = el;
        info.appendChild(p);
      });

      row1.appendChild(info);

      // 2 row

      let fullLink = document.createElement('p');
      fullLink.classList.add('fullLink-box');

      let fullLinkHeader = document.createElement('p');
      fullLinkHeader.classList.add('fullLink-box__header');
      fullLinkHeader.innerHTML = 'Full article:';
      fullLink.appendChild(fullLinkHeader);

      let a = document.createElement('a');
      a.classList.add('fullLink-box__link');
      a.href = item.fullLink;
      a.innerHTML = item.fullLink;
      fullLink.appendChild(a);

      row2.appendChild(fullLink);

      // 3 row

      let tagList = document.createElement('ul');
      tagList.classList.add('taglist-box');
      row3.appendChild(tagList);

      item.tags.forEach(el => {
        let tag = document.createElement('li');
        tag.classList.add('taglist-box__item');
        tag.innerHTML = `<a href="#" target="_blank">#${el}</a>`;
        tagList.appendChild(tag);
      });

      // footer

      let footer = document.createElement('footer');
      footer.classList.add('public-modal__footer');
      right.appendChild(footer);

      let social = document.createElement('a');
      social.href = '#';
      social.target = '_blank';
      social.classList.add('social-box');
      footer.appendChild(social);

      let socialIcon = document.createElement('span');
      socialIcon.classList.add('social-box__icon');
      social.appendChild(socialIcon);

      let socialText = document.createElement('span');
      socialText.classList.add('social-box__text');
      socialText.innerHTML =
        'Like, comment and share ' + '<br>' + ' on Facebook';
      social.appendChild(socialText);

      return template.innerHTML;
    }

    // console.log(typeof ItemTemplate);
    return ItemTemplate;
  }
}

let modal = new Modal('js-info-modal');

// init Masonry

let grid = document.querySelector('.js-masonry');
let pathToJSON = 'public-photos-';
let publicPage = document.querySelector('.js-public-data');

if (!publicPage) {
  throw Error('The layout script is stopped for this page');
}
switch (publicPage.getAttribute('data-public-page')) {
  case '1':
    pathToJSON += '1';
    break;
  case '2':
    pathToJSON += '2';
    break;
  case '3':
    pathToJSON += '3';
    break;
  case '4':
    pathToJSON += '4';
    break;
  case '5':
    pathToJSON += '5';
    break;
  case '6':
    pathToJSON += '6';
    break;
}

// console.log(pathToJSON);

var msnry;

if (publicPage.getAttribute('data-padd', 'padd')) {
  msnry = new Masonry(grid, {
    itemSelector: '.js-masonry__item',
    columnWidth: '.grid-sizer',
    gutter: 0,
    stagger: 20,
    // percentPosition: true,

    // nicer reveal transition
    transitionDuration: '0.8s',
    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 }
  });
} else {
  msnry = new Masonry(grid, {
    itemSelector: '.js-masonry__item',
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    stagger: 20,
    // percentPosition: true,
    // nicer reveal transition
    transitionDuration: '0.8s',
    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 }
  });
}

var infScroll = new InfiniteScroll(grid, {
  // use path string with {{#}} for page number

  path: `data/${pathToJSON}-{{#}}.json`,
  // load response as flat text
  responseType: 'text',
  outlayer: msnry,
  status: '.page-load-status',
  history: false
});

// use element to turn HTML string into elements
var proxyElem = document.createElement('div');

infScroll.on('load', function(response) {
  // parse response into JSON data
  var data = JSON.parse(response);
  // compile data into HTML
  // console.log(data);
  var itemsArray = data.gallery.items;

  checkModiffier(data);
  var itemsHTML = data.gallery.items.map(getItemHTML).join('');
  // console.log(itemsHTML);
  // convert HTML string into elements
  proxyElem.innerHTML = itemsHTML;
  // append item elements
  var items = proxyElem.querySelectorAll('.js-masonry__item');

  imagesLoaded(items, function() {
    infScroll.appendItems(items);
    msnry.appended(items);

    // generate mnodal
    modal.addData(itemsArray);
    modal.refreshModal();
  });
});

// load initial page
infScroll.loadNextPage();

//------------------//

// check for padding  modification

function checkModiffier(data) {
  if (data.gallery.modif.length === 'padd') {
    grid.setAttribute('data-padd', 'padd');
    grid.classList.add('plate_padd');
  }
}
//

function getItemHTML(photo) {
  var itemTemplateSrc;
  if (photo.size === 'lg' && photo.modif === 'no') {
    itemTemplateSrc = document.querySelector('#photo-item-template-lg')
      .innerHTML;

    return microTemplate(itemTemplateSrc, photo);
  } else if (photo.size === 'sm' && photo.modif === 'no') {
    itemTemplateSrc = document.querySelector('#photo-item-template-sm')
      .innerHTML;

    photo.items.forEach(el => {
      let smallSrc = document.querySelector('#photo-item-template-sm-inner')
        .innerHTML;

      let plate = microTemplate(smallSrc, el);

      itemTemplateSrc += plate;
    });

    itemTemplateSrc += '</div >';

    return itemTemplateSrc;
  } else if (photo.size === 'lg' && photo.modif === 'padd') {
    itemTemplateSrc = document.querySelector('#photo-item-template-lg-pad')
      .innerHTML;

    addPaddedStatus();

    return microTemplate(itemTemplateSrc, photo);
  } else if (photo.size === 'sm' && photo.modif === 'padd') {
    itemTemplateSrc = document.querySelector('#photo-item-template-sm')
      .innerHTML;

    photo.items.forEach(el => {
      let smallSrc = document.querySelector('#photo-item-template-sm-pad-inner')
        .innerHTML;
      // console.log(el);
      let plate = microTemplate(smallSrc, el);

      itemTemplateSrc += plate;
    });

    itemTemplateSrc += '</div >';
    // console.log(itemTemplateSrc);

    addPaddedStatus();

    return itemTemplateSrc;
  }
}

function addPaddedStatus() {
  let container = document.querySelector('.js-masonry-container');

  container.classList.add('has-padding');
}
// micro templating, sort-of
function microTemplate(src, data) {
  // console.error('and now here');
  // replace {{tags}} in source
  return src.replace(/\{\{([\w\-_\.]+)\}\}/gi, function(match, key) {
    // walk through objects to get value
    var value = data;
    key.split('.').forEach(function(part) {
      // console.log(value);
      value = value[part];
    });
    return value;
  });
}

imagesLoaded('.js-masonry', { background: '.plate__item' }, function() {
  msnry.layout();
});

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

window.addEventListener(
  'resize',
  debounce(function(e) {
    // console.log('resize');

    setTimeout(() => {
      msnry.layout();
    }, 2000);
  })
);
