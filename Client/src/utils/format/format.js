export function numberFormat(num) {
  return new Intl.NumberFormat().format(num);
}

export function removeFormat(num) {
  return num.replace(/[.,Rp\s]/g, '');
}
