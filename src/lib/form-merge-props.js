import _ from 'lodash';

export const mergeProps = (_merge) => (sProps, dProps, oProps) => {
  const {
    model = {},
    fields = {},
    errors = {},
  } = sProps;
  let {
    values = {}
  } = sProps;
  values = { ...model, ...values } || {};
  Object.keys(sProps.fields).forEach(el => {
    fields[el].error = errors[el];
    fields[el].input = fields[el].input || { type: 'text' };
    values[el] = values[el] || fields[el].defaultValue;
    switch(fields[el].input.type) {
      case 'select':
        fields[el].input.value = values[el] || '';
        fields[el].input.onChange = e =>
          dProps.setValues(oProps.formId, { [el]: e.target.value });
        break;
      case 'checkbox':
        fields[el].input.onChange = e => {
          dProps.setValues(oProps.formId, {
            [el]: e.target.checked,
          });
        };
        fields[el].input.checked = values[el] === false ? false : !!values[el];
        break;
      default:
        fields[el].input.value = values[el] || '';
        fields[el].input.onChange = e => dProps.setValues(oProps.formId, { [el]: e.target.value });
    }
  });
  return {
    ...sProps,
    model,
    fields,
    errors,
    values,
    ...dProps,
    ...(_merge(sProps, dProps, oProps) || {}),
  };
};
