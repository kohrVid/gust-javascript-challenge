function checkboxes(widget) {
  const controllingCheckboxes = widget.querySelectorAll('[kjs-role=controlling-checkbox]');
  const relatedCheckboxes = widget.querySelectorAll('[kjs-role=related-checkbox]');

  function handleControllingCheckboxClick(e) {
    const controllingCheckbox = e.target
    const id = controllingCheckbox.getAttribute('kjs-id')
    const linkedCheckboxes = widget.querySelectorAll(`[kjs-checkbox-id="${id}"]`);

    linkedCheckboxes.forEach((checkbox) => {
      checkbox.checked = controllingCheckbox.checked;
    });
  }


  function handleRelatedCheckboxClick(e) {
    const linkedCheckbox = e.target
    const id = linkedCheckbox.getAttribute('kjs-checkbox-id')
    const controllingCheckbox = widget.querySelector(`[kjs-id="${id}"]`);

    if (!linkedCheckbox.checked && controllingCheckbox.checked) {
      controllingCheckbox.indeterminate = true;
    }

    if (linkedCheckbox.checked && !controllingCheckbox.checked) {
      controllingCheckbox.indeterminate = true;
    }
  }

  let actions = [];

  controllingCheckboxes.forEach((checkbox) => {
    actions.push({
      element: checkbox,
      event: 'change',
      handler: handleControllingCheckboxClick
    });
  });

  relatedCheckboxes.forEach((checkbox) => {
    actions.push({
      element: checkbox,
      event: 'change',
      handler: handleRelatedCheckboxClick
    });
  });

  return { actions };
}

module.exports = checkboxes;
