(() => {
  // not ie8 compatible
  // const selectAll = (selector, context = window.document) =>
  //   [...context.querySelectorAll(selector)];

  const selectAll = (selector, context = window.document) => {
    const query = context.querySelectorAll(selector);
    const length = query.length;
    let i = 0;
    const result = [];

    for (; i < length; i += 1)
    {
      result.push(query[i]);
    }

    return result;
  }

  const select = (selector, context = window.document) =>
    context.querySelector(selector);

  const getFileInputLabel = (input) => {
    let label = input.getAttribute('data-default-label');

    if (input.files && input.files.length > 1) {
      const multiFileStringTemplate = input.getAttribute('data-multiple-files-label');
      label = multiFileStringTemplate.replace('{n}', input.files.length);
    }
    else
    {
      const filenameRegExpResult = /[^\\\/]+$/.exec(input.value);
      const filename = filenameRegExpResult ? filenameRegExpResult[0] : label;
      const shortened = filename.length > 30 ? filename.substr(0, 30) + '...' : filename;
      label = shortened;
    }

    return label;
  };

  const dispatchEvent = () => {
    const labelChangedEvent = document.createEvent('Event');
    labelChangedEvent.initEvent('labelChanged', true, true);
    input.dispatchEvent(labelChangedEvent);
  };

  const setLabel = (input, labelElement, label) => {
    if (input.getAttribute('data-label') !== label) {
      input.setAttribute('data-label', label);
    }
    if (labelElement.textContent !== label) {
      labelElement.textContent = label;
    }
  };

  const reAddClassWithReflow = (element, className) => {
    //element.classList.remove(className);
    const sibling = element.nextSibling;
    const parent = element.parentElement;
    parent.removeChild(element);
    parent.insertBefore(element, sibling);
    element.classList.add(className);
  }

  const setClasses = (input, labelElement, label) => {
    const filesSelectedInput = 'progressive-file-input__input--files-selected';
    const filesSelectedLabel = 'progressive-file-input__label--files-selected';

    if (label !== input.getAttribute('data-default-label'))
    {
      reAddClassWithReflow(input, filesSelectedInput);
      reAddClassWithReflow(labelElement, filesSelectedLabel);
    }
    else
    {
      labelElement.classList.remove(filesSelectedLabel);
      input.classList.remove(filesSelectedInput);
    }
  }

  window.enableProgressiveFileInputs = () => {
    const inputs = selectAll('[data-progressive-file-input]:not([data-progressive-file-input-enabled])');
    inputs.forEach(input => {
      const labelElement = select(`[for=${input.getAttribute('id')}`);
      input.setAttribute('data-progressive-file-input-enabled', 'true');
      input.setAttribute('data-default-label', labelElement.textContent);

      input.classList.add('progressive-file-input__input');
      labelElement.classList.add('progressive-file-input__label');
      setLabel(input, labelElement, labelElement.textContent);

      input.addEventListener('change', event => {
        const label = getFileInputLabel(input);
        setClasses(input, labelElement, label);
        setLabel(input, labelElement, label);
      });
    });
  };

  const stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {

      clearInterval(stateCheck);
      try {
        window.enableProgressiveFileInputs();
      }
      catch (error) {
        // console.log(error);
      }
    }
  }, 100);
})();
