const getDateAndDay = ()=> {
    const currentDate = new Date();

    // Extract day, month, and year
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because month is zero-indexed
    const year = currentDate.getFullYear();

    // Define an array of days
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = currentDate.getDay();

    // Get the day name from the array
    const dayName = daysOfWeek[dayOfWeek];

    // Format the date as dd-mm-yyyy
    const formattedDate = `${day}-${month}-${year}`;

    return { date: formattedDate, day: dayName };
}
module.exports = getDateAndDay