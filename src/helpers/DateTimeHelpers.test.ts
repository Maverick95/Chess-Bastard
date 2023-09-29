import DateDifferenceType from '../models/DateDifferenceType';
import getCurrentDateTime from './CurrentDateTimeHelper';
import { getDateTimeDifferenceDescription } from './DateTimeHelpers';

jest.mock('./CurrentDateTimeHelper');

const mockedGetCurrentDateTime = getCurrentDateTime as jest.Mock<Date>;

const mockedCurrentDateTime = new Date(2022, 3, 1, 16, 34, 58, 345);

describe('DateTimeHelpers', () => {

    describe('getDateTimeDifferenceDescription', () => {

        beforeEach(() => {
            mockedGetCurrentDateTime.mockReturnValue(mockedCurrentDateTime);
        });

        afterEach(() => {
            jest.resetAllMocks();
        });

        it.each([
            // ARRANGE
            //Compare to 
            //new Date(2022, 3, 1,  16, 34, 58, 345);
            [ new Date(2022, 3, 1,  16, 34, 58, 213), { type: DateDifferenceType.SECONDS,   difference: '0 seconds ago' } ],
            [ new Date(2022, 3, 1,  16, 34, 23, 234), { type: DateDifferenceType.SECONDS,   difference: '35 seconds ago' } ],
            [ new Date(2022, 3, 1,  16, 33, 58, 567), { type: DateDifferenceType.SECONDS,   difference: '59 seconds ago' } ],
            [ new Date(2022, 3, 1,  15, 49, 23, 123), { type: DateDifferenceType.MINUTES,   difference: '45 minutes ago' } ],
            [ new Date(2022, 3, 1,  15, 35, 33, 659), { type: DateDifferenceType.MINUTES,   difference: '59 minutes ago' } ],
            [ new Date(2022, 3, 1,  12, 45, 11, 321), { type: DateDifferenceType.HOURS,     difference: '3 hours ago' } ],
            [ new Date(2022, 2, 31, 16, 59, 21, 198), { type: DateDifferenceType.HOURS,     difference: '23 hours ago' } ],
            [ new Date(2022, 2, 30,  3, 23, 12, 574), { type: DateDifferenceType.DAYS,      difference: '2 days ago' } ],
            [ new Date(2022, 2, 27, 17, 59, 21, 556), { type: DateDifferenceType.DAYS,      difference: '4 days ago' } ],
            [ new Date(2022, 1, 25, 15, 40,  3, 155), { type: DateDifferenceType.WEEKS,     difference: '4 weeks ago' } ], // Daylight saving time makes these two interesting
            [ new Date(2022, 1, 25, 15, 34,  3, 155), { type: DateDifferenceType.WEEKS,     difference: '5 weeks ago' } ], // Daylight saving time makes these two interesting
            [ new Date(2021, 2, 31, 16, 59, 21, 198), { type: DateDifferenceType.LONG_TIME, difference: 'A long time ago' } ]
            
        ])('Positive Test Case %#', (pastDate, expected) => {

            // ACT
            const actual = getDateTimeDifferenceDescription(pastDate);
            // ASSERT
            expect(actual).toEqual(expected);

        });

        it('should throw exception if future data is passed', () => {

            // ARRANGE
            const futureDate = new Date(2022, 4, 1, 16, 34, 58, 345);

            // ACT and ASSERT
            expect(() => getDateTimeDifferenceDescription(futureDate)).toThrow();

        });

    });

});