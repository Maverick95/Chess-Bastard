import GetLastLiveGameService from './GetLastLiveGameService';
import getCurrentDateTime from '../helpers/CurrentDateTimeHelper';
import axios from 'axios';
import Game from '../models/Game';

jest.mock('../helpers/CurrentDateTimeHelper');
jest.mock('axios');

const mockGetCurrentDateTime = getCurrentDateTime as jest.Mock<Date>;
const mockAxiosGet = axios.get as jest.Mock;

describe('GetLastLiveGameService', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return most recent Live game', async() => {
        // ARRANGE
        const data: {[url: string]: any[]} = {
            'https://api.chess.com/pub/player/NickEmmerson/games/2022/03': [
                {
                    rules: 'chess',
                    end_time: 1647210142 - 40,
                    time_class: 'bullet',
                    time_control: 60,
                    white: {
                        username: 'NickEmmerson',
                        result: 'win'
                    },
                    black: {
                        username: 'Vladmir Putin',
                        result: 'checkmated'
                    }
                },
                {
                    rules: 'chess',
                    end_time: 1647210142 - 30,
                    time_class: 'blitz',
                    time_control: 300,
                    white: {
                        username: 'Donald Trump',
                        result: 'win'
                    },
                    black: {
                        username: 'NickEmmerson',
                        result: 'checkmated'
                    }
                }
            ]
        };
        const expected: Game = {
            timeClass: 'blitz',
            time: 300,
            player: 'NickEmmerson',
            opponent: 'Donald Trump',
            playerColour: 'black',
            result: 'checkmated'
        };
        mockAxiosGet.mockImplementation((url: string) => Promise.resolve({
            data: { games: data[url] ?? [] }
        }));
        mockGetCurrentDateTime.mockReturnValue(new Date(2022, 2, 13, 22, 22, 22));

        // ACT
        const actual = await GetLastLiveGameService('NickEmmerson', 60);

        // ASSERT
        expect(actual).toEqual(expected);
    });

});
