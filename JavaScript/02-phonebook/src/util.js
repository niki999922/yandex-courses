function isNonZeroString(value) {
  return typeof value === 'string' && value.length !== 0;
}

function isPhone(value) {
  return isNonZeroString(value);
}

function isEmail(value) {
  return !value || typeof value === 'string';
}

function convertPhoneEmail(phone, email) {
  if (typeof email === 'undefined' || email === null) {
    return `, ${convertPhone(phone)}`;
  }

  return `, ${convertPhone(phone)}, ${email}`;
}

function convertPhone(phone) {
  return `+7 (${phone.substr(0, 3)}) ${phone.substr(3, 3)}-${phone.substr(6, 2)}-${phone.substr(
    8,
    2
  )}`;
}

module.exports = {
  isNonZeroString,
  isPhone,
  isEmail,
  convertPhoneEmail
};
