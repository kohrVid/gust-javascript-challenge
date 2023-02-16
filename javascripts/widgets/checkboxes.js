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
    const relatedCheckbox = e.target
    const id = relatedCheckbox.getAttribute('kjs-checkbox-id')
    const controllingCheckbox = widget.querySelector(`[kjs-id="${id}"]`);

    const allRelatedCheckboxes = Array.prototype.slice.call(
      widget.querySelectorAll(`[kjs-checkbox-id="${id}"]`)
    );

    const allCheckboxesEqual = allRelatedCheckboxes.every((checkbox) => {
      return relatedCheckbox.checked === checkbox.checked
    });

    if (allCheckboxesEqual) {
      controllingCheckbox.checked = relatedCheckbox.checked;
      controllingCheckbox.indeterminate = false;
      return
    }

    controllingCheckbox.checked = false;
    controllingCheckbox.indeterminate = true;
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
