export function formatDate(date) {
  return new Intl.DateTimeFormat().format(new Date(date))
}

export const formatDateTime = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = String(d.getHours()),
    minute = String(d.getMinutes())

  if (month.length < 2)
    month = '0' + month
  if (day.length < 2)
    day = '0' + day
  if (hour.length < 2)
    hour = '0' + hour
  if (minute.length < 2)
    minute = '0' + minute

  return `${year}/${month}/${day} ${hour}:${minute}`
}