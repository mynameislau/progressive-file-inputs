'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var selectAll = function selectAll(selector) {
    var context = arguments.length <= 1 || arguments[1] === undefined ? window.document : arguments[1];
    return [].concat(_toConsumableArray(context.querySelectorAll(selector)));
  };

  var select = function select(selector) {
    var context = arguments.length <= 1 || arguments[1] === undefined ? window.document : arguments[1];
    return context.querySelector(selector);
  };

  var getFileInputLabel = function getFileInputLabel(input) {
    var label = input.getAttribute('data-default-label');

    if (input.files && input.files.length > 1) {
      var multiFileStringTemplate = input.getAttribute('data-multiple-files-label');
      label = multiFileStringTemplate.replace('{n}', input.files.length);
    } else {
      var filenameRegExpResult = /[^\\\/]+$/.exec(input.value);
      var filename = filenameRegExpResult ? filenameRegExpResult[0] : label;
      var shortened = filename.length > 30 ? filename.substr(0, 30) + '...' : filename;
      label = shortened;
    }

    return label;
  };

  var dispatchEvent = function dispatchEvent() {
    var labelChangedEvent = document.createEvent('Event');
    labelChangedEvent.initEvent('labelChanged', true, true);
    input.dispatchEvent(labelChangedEvent);
  };

  var setLabel = function setLabel(input, labelElement, label) {
    if (input.getAttribute('data-label') !== label) {
      input.setAttribute('data-label', label);
    }
    if (labelElement.textContent !== label) {
      labelElement.textContent = label;
    }
  };

  var reAddClassWithReflow = function reAddClassWithReflow(element, className) {
    //element.classList.remove(className);
    var sibling = element.nextSibling;
    var parent = element.parentElement;
    parent.removeChild(element);
    parent.insertBefore(element, sibling);
    element.classList.add(className);
  };

  var setClasses = function setClasses(input, labelElement, label) {
    var filesSelectedInput = 'progressive-file-input__input--files-selected';
    var filesSelectedLabel = 'progressive-file-input__label--files-selected';

    if (label !== input.getAttribute('data-default-label')) {
      reAddClassWithReflow(input, filesSelectedInput);
      reAddClassWithReflow(labelElement, filesSelectedLabel);
    } else {
      labelElement.classList.remove(filesSelectedLabel);
      input.classList.remove(filesSelectedInput);
    }
  };

  window.enableProgressiveFileInputs = function () {
    var inputs = selectAll('[data-progressive-file-input]:not([data-progressive-file-input-enabled])');
    inputs.forEach(function (input) {
      var labelElement = select('[for=' + input.getAttribute('id'));
      input.setAttribute('data-progressive-file-input-enabled', 'true');
      input.setAttribute('data-default-label', labelElement.textContent);

      input.classList.add('progressive-file-input__input');
      labelElement.classList.add('progressive-file-input__label');
      setLabel(input, labelElement, labelElement.textContent);

      input.addEventListener('change', function (event) {
        var label = getFileInputLabel(input);
        setClasses(input, labelElement, label);
        setLabel(input, labelElement, label);
      });
    });
  };

  var stateCheck = setInterval(function () {
    if (document.readyState === 'complete') {

      clearInterval(stateCheck);
      try {
        window.enableProgressiveFileInputs();
      } catch (error) {
        console.log(error);
      }
    }
  }, 100);
})();