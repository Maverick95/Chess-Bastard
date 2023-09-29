import GetLastLiveGameService from './GetLastLiveGameService';
import getCurrentDateTime from '../helpers/CurrentDateTimeHelper';
import axios from 'axios';
import Game from '../models/Game';

jest.mock('../helpers/CurrentDateTimeHelper');
jest.mock('axios');

const mockGetCurrentDateTime = getCurrentDateTime as jest.Mock<Date>;
const mockAxiosGet = axios.get as jest.Mock;

/*
possible rules -  "chess", "chess960", "bughouse", "kingofthehill", "threecheck", "crazyhouse"
*/

describe('GetLastLiveGameService', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Query current month only', () => {

        const currentDate = new Date(2022, 2, 13, 22, 22, 22);

        it('should return most recent Live game', async () => {
            // ARRANGE
            const data: { [url: string]: any[] } = {
                'https://api.chess.com/pub/player/NickEmmerson/games/2022/03': [
                    {
                        rules: 'chess',
                        end_time: Math.floor(currentDate.getTime() / 1000) - 40,
                        time_class: 'bullet',
                        time_control: 60,
                        white: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        black: {
                            username: 'VladmirPutin',
                            result: 'checkmated'
                        }
                    },
                    {
                        rules: 'chess',
                        end_time: Math.floor(currentDate.getTime() / 1000) - 30,
                        time_class: 'blitz',
                        time_control: 300,
                        white: {
                            username: 'DonaldTrump',
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
                opponent: 'DonaldTrump',
                playerColour: 'black',
                result: 'checkmated'
            };
            mockAxiosGet.mockImplementation((url: string) => Promise.resolve({
                data: { games: data[url] ?? [] }
            }));
            mockGetCurrentDateTime.mockReturnValue(currentDate);

            // ACT
            const actual = await GetLastLiveGameService('NickEmmerson', 60);

            // ASSERT
            expect(actual).toEqual(expected);
            expect(mockAxiosGet).toHaveBeenCalledTimes(1);
        });

        it('should apply filters correctly to return most recent Live game', async () => {
            // ARRANGE
            const data: { [url: string]: any[] } = {
                'https://api.chess.com/pub/player/NickEmmerson/games/2022/03': [
                    {
                        rules: 'chess',
                        end_time: Math.floor(currentDate.getTime() / 1000) - 40,
                        time_class: 'bullet',
                        time_control: 60,
                        white: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        black: {
                            username: 'VladmirPutin',
                            result: 'checkmated'
                        }
                    },
                    {
                        rules: 'chess',
                        end_time: Math.floor(currentDate.getTime() / 1000) - 30,
                        time_class: 'blitz',
                        time_control: 300,
                        white: {
                            username: 'DonaldTrump',
                            result: 'win'
                        },
                        black: {
                            username: 'NickEmmerson',
                            result: 'checkmated'
                        }
                    },
                    {
                        rules: 'bughouse',
                        end_time: Math.floor(currentDate.getTime() / 1000) - 18,
                        time_class: 'bullet',
                        time_control: 60,
                        white: {
                            username: 'TonyBlair',
                            result: 'win'
                        },
                        black: {
                            username: 'NickEmmerson',
                            result: 'checkmated'
                        }
                    },
                    {
                        rules: 'kingofthehill',
                        end_time: Math.floor(currentDate.getTime() / 1000) - 15,
                        time_class: 'bullet',
                        time_control: 60,
                        white: {
                            username: 'ChrisWhittey',
                            result: 'win'
                        },
                        black: {
                            username: 'NickEmmerson',
                            result: 'checkmated'
                        }
                    },
                    {
                        rules: 'chess',
                        end_time: Math.floor(currentDate.getTime() / 1000) - 19,
                        time_class: 'daily',
                        time_control: 1440,
                        white: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        black: {
                            username: 'RobertMugabe',
                            result: 'checkmated'
                        }
                    },
                ]
            };
            const expected: Game = {
                timeClass: 'blitz',
                time: 300,
                player: 'NickEmmerson',
                opponent: 'DonaldTrump',
                playerColour: 'black',
                result: 'checkmated'
            };
            mockAxiosGet.mockImplementation((url: string) => Promise.resolve({
                data: { games: data[url] ?? [] }
            }));
            mockGetCurrentDateTime.mockReturnValue(currentDate);

            // ACT
            const actual = await GetLastLiveGameService('NickEmmerson', 60);

            // ASSERT
            expect(actual).toEqual(expected);
            expect(mockAxiosGet).toHaveBeenCalledTimes(1);
        });

        it('should return null if no games found within time frame', async() => {
            // ARRANGE
            const data: { [url: string]: any[] } = {
                'https://api.chess.com/pub/player/NickEmmerson/games/2022/03': [
                    {
                        rules: 'chess',
                        end_time: Math.floor(currentDate.getTime() / 1000) - 65,
                        time_class: 'bullet',
                        time_control: 60,
                        white: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        black: {
                            username: 'VladmirPutin',
                            result: 'checkmated'
                        }
                    },
                    {
                        rules: 'chess',
                        end_time: Math.floor(currentDate.getTime() / 1000) - 80,
                        time_class: 'blitz',
                        time_control: 300,
                        white: {
                            username: 'DonaldTrump',
                            result: 'win'
                        },
                        black: {
                            username: 'NickEmmerson',
                            result: 'checkmated'
                        }
                    }
                ]
            };
            mockAxiosGet.mockImplementation((url: string) => Promise.resolve({
                data: { games: data[url] ?? [] }
            }));
            mockGetCurrentDateTime.mockReturnValue(currentDate);

            // ACT
            const actual = await GetLastLiveGameService('NickEmmerson', 60);

            // ASSERT
            expect(actual).toBeNull();
            expect(mockAxiosGet).toHaveBeenCalledTimes(1);
        });

    });

    describe('Query current and previous month', () => {

        const currentDate = new Date(2022, 2, 1, 9, 9, 9);

        it('should return most recent Live game from current month', async () => {
            // ARRANGE
            const data: { [url: string]: any[] } = {
                'https://api.chess.com/pub/player/NickEmmerson/games/2022/03': [
                    {
                        rules: 'chess',
                        end_time: Math.floor((new Date(2022, 2, 1, 0, 0, 1)).getTime() / 1000),
                        time_class: 'bullet',
                        time_control: 60,
                        white: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        black: {
                            username: 'VladmirPutin',
                            result: 'checkmated'
                        }
                    }
                ],
                'https://api.chess.com/pub/player/NickEmmerson/games/2022/02': [
                    {
                        rules: 'chess',
                        end_time: Math.floor((new Date(2022, 1, 28, 23, 30, 30)).getTime() / 1000),
                        time_class: 'bullet',
                        time_control: 60,
                        white: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        black: {
                            username: 'DonaldTrump',
                            result: 'checkmated'
                        }
                    }
                ],

            };
            const expected: Game = {
                timeClass: 'bullet',
                time: 60,
                player: 'NickEmmerson',
                opponent: 'VladmirPutin',
                playerColour: 'white',
                result: 'win'
            };
            mockAxiosGet.mockImplementation((url: string) => Promise.resolve({
                data: { games: data[url] ?? [] }
            }));
            mockGetCurrentDateTime.mockReturnValue(currentDate);

            // ACT
            const actual = await GetLastLiveGameService('NickEmmerson', 60 * 60 * 24);

            // ASSERT
            expect(actual).toEqual(expected);
            expect(mockAxiosGet).toHaveBeenCalledTimes(1);
        });


    });

});
