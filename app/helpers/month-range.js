import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function monthChecker([
  month,
  year,
  startMonth,
  endMonth,
  startYear,
  endYear,
]) {
  var classes = '';
  var today = new Date();
  let previousMonth = moment(
    new Date(`${startYear},${startMonth},01`)
  ).subtract(1, 'months');
  previousMonth = new Date(previousMonth);

  const monthDifference = moment(new Date(`${endYear},${endMonth},01`)).diff(
    new Date(`${startYear},${startMonth},01`),
    'months',
    true
  );

  if (startMonth === month && startYear === year) {
    classes += ' selected-month';
  }

  if (previousMonth.getTime() === new Date(`${year},${month},01`).getTime()) {
    classes += ' offset-month';
  }
  const offsetStartMonth = moment(
    new Date(`${startYear},${startMonth},01`)
  ).subtract(monthDifference + 1, 'months');

  if (startMonth === month && startYear === year) {
    classes += ' selected-month';
  }

  if (new Date(`${year},${month},01`) > today) {
    classes += 'future-months';
  }

  if (
    `${month} ${year}`.toUpperCase() ===
    moment(new Date()).format('MMM YYYY').toUpperCase()
  ) {
    classes += ' current-month';
  }

  if (![startMonth, endMonth, startYear, endYear].includes(undefined)) {
    classes += '';

    if (
      new Date(`${startYear},${startMonth},01`) <
        new Date(`${year},${month},01`) &&
      new Date(`${endYear},${endMonth},01`) > new Date(`${year},${month},01`)
    ) {
      classes += ' in-between-month';
    }

    if (
      new Date(offsetStartMonth).getTime() <=
        new Date(`${year},${month},01`).getTime() &&
      new Date(`${year},${month},01`).getTime() <
        new Date(`${startYear},${startMonth},01`).getTime()
    ) {
      classes += ' offset-month';
    }

    if (endMonth === month && endYear === year) {
      classes += ' selected-month';
    }
  }
  return classes;
});
