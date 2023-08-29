function getUpcomingWeekFormatted() {
    // Get the current date
    const currentDate = new Date();

    // Calculate the number of days until the next Sunday
    const daysUntilNextSunday = currentDate.getDay();

    // console.log(daysUntilNextSunday)
    // Calculate the date of the next Sunday
    const nextSundayDate = new Date(currentDate);
    nextSundayDate.setDate(currentDate.getDate() + daysUntilNextSunday);
    // console.log(nextSundayDate.setDate(currentDate.getDate() + daysUntilNextSunday))

    // Calculate the dates for the upcoming week in YYYY-MM-DD format
    const upcomingWeekDatesFormatted = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(nextSundayDate);
        date.setDate(nextSundayDate.getDate() + i);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        upcomingWeekDatesFormatted.push(formattedDate);
    }

    return upcomingWeekDatesFormatted;
}

function getWeekBeforeSunday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilPreviousSunday = dayOfWeek === 0 ? 7 : dayOfWeek;

    // Calculate the previous Sunday's date
    const previousSunday = new Date(today);
    previousSunday.setDate(today.getDate() - daysUntilPreviousSunday);

    // Calculate the dates of the week leading up to the previous Sunday
    const weekDates = [];
    for (let i = 6; i >= 0; i--) {
        const currentDate = new Date(previousSunday);
        currentDate.setDate(previousSunday.getDate() - i);
        weekDates.push(currentDate.toISOString().split('T')[0]);
    }

    return weekDates;
}

function getClientNextDate(days) {
    const currentDate = new Date(); // Get the current date
  
    // Calculate the timestamp for the next date by adding days
    const nextDateTimestamp = currentDate.getTime() + days * 24 * 60 * 60 * 1000;
  
    const nextDate = new Date(nextDateTimestamp);
  
    // Check if the calculated nextDate's month is different from the current month
    // and if the day is greater than the last day of the calculated month
    if (nextDate.getMonth() !== currentDate.getMonth() && nextDate.getDate() > new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate()) {
      // Adjust the month and set the day to the last day of the month
      nextDate.setMonth(nextDate.getMonth() + 1);
      nextDate.setDate(0);
    }
  
    // Format the nextDate as 'yyyy-MM-dd'
    const formattedNextDate = `${nextDate.getFullYear()}-${(nextDate.getMonth() + 1).toString().padStart(2, '0')}-${nextDate.getDate().toString().padStart(2, '0')}`;
    return formattedNextDate; // Return the calculated date
  }
  


export {getWeekBeforeSunday, getUpcomingWeekFormatted, getClientNextDate}