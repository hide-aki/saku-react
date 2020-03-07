export function numberFormat(num) {
  return new Intl.NumberFormat().format(num);
}

export function removeFormat(num) {
  return num.replace(/[.,Rp\s]/g, "");
}

export function formatDate(date) {
  const nameMonth = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  const removeFormatDate = date.replace(/\-/g, "");
  const year = removeFormatDate.substr(0, 4);
  const month = parseFloat(removeFormatDate.substr(4, 2)) - 1;
  const monthName = nameMonth[month];
  const dateOnly = removeFormatDate.substr(6, 2);
  const finalDate = dateOnly.concat(" ", monthName, " ", year);
  return finalDate;
}
