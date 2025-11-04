export function parseMatchDate( date ) {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'shortOffset'
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    let formattedDate = formatter.formatToParts(date);

    let day = formattedDate.find(part => part.type === 'day').value;
    let month = formattedDate.find(part => part.type === 'month').value;
    let year = formattedDate.find(part => part.type === 'year').value;
    let hour = formattedDate.find(part => part.type === 'hour').value;
    let minute = formattedDate.find(part => part.type === 'minute').value;
    let period = formattedDate.find(part => part.type === 'dayPeriod').value;
    let timeZone = formattedDate.find(part => part.type === 'timeZoneName').value.replace('GMT', 'GMT ');

    return `${day}/${month}/${year} ${hour}:${minute}${period.toUpperCase()} ${timeZone}`;
}

export function formatMatchDate( dateStr ) {
    const dateTimeRegex = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{1,2}):(\d{2})(AM|PM) GMT([+-]\d+)$/;
    const match = dateStr.match(dateTimeRegex);

    if (!match) {
        throw new Error("Invalid date format");
    }

    let [, day, month, year, hour, minute, period, offset] = match;
    day = parseInt(day, 10);
    month = parseInt(month, 10) - 1; // Months are 0-based in JS
    year = parseInt(year, 10);
    hour = parseInt(hour, 10);
    minute = parseInt(minute, 10);
    offset = parseInt(offset, 10);

    // Convert 12-hour format to 24-hour format
    if (period === "PM" && hour !== 12) {
        hour += 12;
    } else if (period === "AM" && hour === 12) {
        hour = 0;
    }

    // Create a Date object in UTC
    const date = new Date(Date.UTC(year, month, day, hour, minute));

    // Adjust for the GMT offset
    date.setUTCMinutes(date.getUTCMinutes() - offset * 60);

    return date;
}

export function formatMatchDateInput( dateStr ) {
    const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2})/;
    const match = dateStr.match(dateTimeRegex);

    if (!match) {
        throw new Error("Invalid date format");
    }

    let [ year, month, day ] = dateStr.split("-");
    month-= 1;
    if ( month == 0 ) {
        month = 12;
        year -= 1;
    }

    // Create a Date object in UTC
    const date = new Date(Date.UTC(year, month, day, 0, 0));

    return date;
}