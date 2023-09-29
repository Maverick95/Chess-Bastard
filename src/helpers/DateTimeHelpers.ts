import getCurrentDateTime from './CurrentDateTimeHelper';
import DateDifferenceType from '../models/DateDifferenceType';

interface IDateDifference {
    type: DateDifferenceType,
    difference: string
};

const getDateTimeDifferenceDescription = (pastDate: Date): IDateDifference => {

    const currentTime = getCurrentDateTime().getTime();
    const pastTime = pastDate.getTime();
    var difference = currentTime - pastTime;
    
    if (difference < 0) {
        throw new RangeError('Cannot accept a pastDate that occurs in the future.');
    }

    difference = Math.floor(difference / 1000);

    /* Seconds. */
    if (difference < 60) {
        return { type: DateDifferenceType.SECONDS, difference: `${difference} seconds ago` };
    }
    difference = Math.floor(difference / 60);

    /* Minutes. */
    if (difference < 60) {
        return { type: DateDifferenceType.MINUTES, difference: `${difference} minutes ago` };
    }
    difference = Math.floor(difference / 60);

    /* Hours. */
    if (difference < 24) {
        return { type: DateDifferenceType.HOURS, difference: `${difference} hours ago` };
    }
    difference = Math.floor(difference / 24);

    /* Days. */
    if (difference < 7) {
        return { type: DateDifferenceType.DAYS, difference: `${difference} days ago` };
    }
    difference = Math.floor(difference / 7);

    /* Weeks. */
    if (difference < 30) {
        return { type: DateDifferenceType.WEEKS, difference: `${difference} weeks ago` };
    }

    return { type: DateDifferenceType.LONG_TIME, difference: 'A long time ago' };

};

export { getDateTimeDifferenceDescription };