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
    fields[el].input.value = values[el] || '';
    fields[el].input.onChange = e => dProps.setValues(oProps.formId, { [el]: e.target.value });
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
