export function validateDate(userDate, startHour, endHour) {
  const accessDate = Date.parse(userDate + "T" + startHour);
  const endDate = Date.parse(userDate + "T" + endHour);

  const currentTime = Date.now();

  if (
    isNaN(accessDate) ||
    isNaN(endDate) ||
    currentTime >= accessDate ||
    accessDate > endDate
  ) {
    return false;
  }
  return true;
}
