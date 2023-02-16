function checkboxes(widget) {
  const controllingCheckboxes = widget.querySelectorAll('[kjs-role=controlling-checkbox]');

  function handleControllingCheckboxClick(e) {
    const controllingCheckbox = e.target
    const id = controllingCheckbox.getAttribute('kjs-id')
    const linkedCheckboxes = widget.querySelectorAll(`[kjs-checkbox-id="${id}"]`);

    linkedCheckboxes.forEach((checkbox) => {
      checkbox.checked = controllingCheckbox.checked;
    });
  }

  let actions = [];

  controllingCheckboxes.forEach((checkbox) => {
    actions.push({
      element: checkbox,
      event: 'change',
      handler: handleControllingCheckboxClick
    });
  });

  return { actions };
}

module.exports = checkboxes;
