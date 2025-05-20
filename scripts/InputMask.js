const rootSelector = '[data-js-input-mask]'

class InputMask {
  constructor(rootElement) {
    this.rootElement = rootElement
    this.init()
  }

  init() {
    const isLibReady = typeof window.IMask !== 'undefined'

    if (isLibReady) {
      window.IMask(this.rootElement, {
        mask: this.rootElement.dataset.jsInputMask
      })
    } else {
      console.error('Библиотека "imask" не подключена!')
    }
  }
}

class InputMaskCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new InputMask(element)
    })
  }
}

export default InputMaskCollection
document.addEventListener('DOMContentLoaded', function () {
  const prefixSelect = document.getElementById('phoneNumberPrefix');
  const phoneInput = document.getElementById('phoneNumber');

  const masks = {
    '+7': '(XX) XXX-XX-XX',
    '+375': '(XX) XXX-XX-XX',
    '+1': '(XXX) XXX-XXXX',
    '+47': 'XX XX XX XX'
  };

  const imaskPatterns = {
    '+7': '(000) 000-00-00',
    '+375': '(00) 000-00-00',
    '+1': '(000) 000-0000',
    '+47': '00 00 00 00'
  };

  let currentMask = null;

  function applyMask(maskPattern) {
    if (currentMask) {
      currentMask.destroy();
    }

    phoneInput.setAttribute('data-js-input-mask', maskPattern);

    if (typeof IMask !== 'undefined') {
      currentMask = IMask(phoneInput, { mask: maskPattern });
    } else {
      console.error('IMask не подключён!');
    }
  }

  function updateMaskAndPlaceholder() {
    const selectedPrefix = prefixSelect.value;
    phoneInput.placeholder = masks[selectedPrefix];
    applyMask(imaskPatterns[selectedPrefix]);
  }

  document.querySelectorAll('[data-js-select-option]').forEach(option => {
    option.addEventListener('click', () => {
      setTimeout(updateMaskAndPlaceholder, 0);
    });
  });

  prefixSelect.addEventListener('change', updateMaskAndPlaceholder);

  updateMaskAndPlaceholder();
});
// test change