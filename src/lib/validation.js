import _ from 'lodash'

const eMailRX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  required: (value = '') => !_.isNil(value) && !!(`${ value }`.trim()),
  cyrillic: (value = '') => !value || /^[а-я\-\s\d\[\]\(\)]*$/im.test(`${ value }`),
  latin: (value = '') => !value || /^[a-z\-\s\d\[\]\(\)]*$/im.test(`${ value }`),
  birthday: (value = '') => new Date(value) < new Date() || value === '',
  'mask-length': (value = '') =>
    value.length === value.replace(/_/g, '').length,
  'e-mail': (value = '') => `${ value }`.search(eMailRX) !== -1,
};
