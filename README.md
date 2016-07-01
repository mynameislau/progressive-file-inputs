## How to use :

Flag the inputs you want enhanced with a [data-progressive-file-input] attribute.
The script will add a "progressive-file-input__input" class to the input and a "progressive-file-input__label" class to the label when the document is ready.

The string template for the multiple files selected goes into a [data-multiple-files-label] attribute,
the {n} part will be replaced by the number of files.

If you ever want to rerun the enabling script, call window.enableProgressiveFileInputs();