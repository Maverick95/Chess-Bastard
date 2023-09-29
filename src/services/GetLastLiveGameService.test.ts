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
                        uuid: 'b4f69510-da56-498b-bde1-84b52601b714',
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
                        },
                        pgn: 'Test PGN',
                    },
                    {
                        uuid: '952d65c7-cfb6-4668-838f-db44bdb6e792',
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
                        },
                        pgn: 'Test PGN',
                    }
                ]
            };
            const expected: Game = {
                uuid: '952d65c7-cfb6-4668-838f-db44bdb6e792',
                timeClass: 'blitz',
                time: 300,
                opponent: 'DonaldTrump',
                player: 'black',
                result: 'checkmated',
                pgn: 'Test PGN',
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
                        uuid: 'b4f69510-da56-498b-bde1-84b52601b714',
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
                        },
                        pgn: 'Test PGN',
                    },
                    {
                        uuid: '952d65c7-cfb6-4668-838f-db44bdb6e792',
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
                        },
                        pgn: 'Test PGN',
                    },
                    {
                        uuid: '9f175a02-0da6-452e-9d9d-eda142b01c79',
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
                        },
                        pgn: 'Test PGN',
                    },
                    {
                        uuid: 'd639e6a1-c1e4-4398-804d-c37cb484070c',
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
                        },
                        pgn: 'Test PGN',
                    },
                    {
                        uuid: 'c4d1bb53-af60-4cbb-9e54-8e28a0592acf',
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
                        },
                        pgn: 'Test PGN',
                    },
                ]
            };
            const expected: Game = {
                uuid: '952d65c7-cfb6-4668-838f-db44bdb6e792',
                timeClass: 'blitz',
                time: 300,
                opponent: 'DonaldTrump',
                player: 'black',
                result: 'checkmated',
                pgn: 'Test PGN',
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
                        uuid: 'b4f69510-da56-498b-bde1-84b52601b714',
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
                        },
                        pgn: 'Test PGN',
                    },
                    {
                        uuid: '952d65c7-cfb6-4668-838f-db44bdb6e792',
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
                        },
                        pgn: 'Test PGN',
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
        const monthStartDate = new Date(2022, 2);

        it('should return most recent Live game from current month', async () => {
            // ARRANGE
            const data: { [url: string]: any[] } = {
                'https://api.chess.com/pub/player/NickEmmerson/games/2022/03': [
                    {
                        uuid: 'b4f69510-da56-498b-bde1-84b52601b714',
                        rules: 'chess',
                        end_time: Math.floor(monthStartDate.getTime() / 1000),
                        time_class: 'bullet',
                        time_control: 60,
                        white: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        black: {
                            username: 'VladmirPutin',
                            result: 'checkmated'
                        },
                        pgn: 'Test PGN',
                    }
                ],
                'https://api.chess.com/pub/player/NickEmmerson/games/2022/02': [
                    {
                        uuid: '952d65c7-cfb6-4668-838f-db44bdb6e792',
                        rules: 'chess',
                        end_time: Math.floor(monthStartDate.getTime() / 1000) - 30,
                        time_class: 'bullet',
                        time_control: 60,
                        white: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        black: {
                            username: 'DonaldTrump',
                            result: 'checkmated'
                        },
                        pgn: 'Test PGN',
                    }
                ],

            };
            const expected: Game = {
                uuid: 'b4f69510-da56-498b-bde1-84b52601b714',
                timeClass: 'bullet',
                time: 60,
                opponent: 'VladmirPutin',
                player: 'white',
                result: 'win',
                pgn: 'Test PGN',
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

        it('should return most recent Live game from previous month', async () => {
            // ARRANGE
            const data: { [url: string]: any[] } = {
                'https://api.chess.com/pub/player/NickEmmerson/games/2022/03': [],
                  
                'https://api.chess.com/pub/player/NickEmmerson/games/2022/02': [
                    {
                        uuid: 'b4f69510-da56-498b-bde1-84b52601b714',
                        rules: 'chess',
                        end_time: Math.floor(monthStartDate.getTime() / 1000) - 30,
                        time_class: 'bullet',
                        time_control: 60,
                        white: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        black: {
                            username: 'DonaldTrump',
                            result: 'checkmated'
                        },
                        pgn: 'Test PGN',
                    },
                    {
                        uuid: '952d65c7-cfb6-4668-838f-db44bdb6e792',
                        rules: 'chess',
                        end_time: Math.floor(monthStartDate.getTime() / 1000) - 10,
                        time_class: 'blitz',
                        time_control: 300,
                        white: {
                            username: 'JohnnyDepp',
                            result: 'checkmated'
                        },
                        black: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        pgn: 'Test PGN',
                    }
                ],
            };
            const expected: Game = {
                uuid: '952d65c7-cfb6-4668-838f-db44bdb6e792',
                timeClass: 'blitz',
                time: 300,
                opponent: 'JohnnyDepp',
                player: 'black',
                result: 'win',
                pgn: 'Test PGN',
            };
            mockAxiosGet.mockImplementation((url: string) => Promise.resolve({
                data: { games: data[url] ?? [] }
            }));
            mockGetCurrentDateTime.mockReturnValue(currentDate);

            // ACT
            const actual = await GetLastLiveGameService('NickEmmerson', 60 * 60 * 24);

            // ASSERT
            expect(actual).toEqual(expected);
            expect(mockAxiosGet).toHaveBeenCalledTimes(2);
        });

        it('should return null if no games found within time frame for either month', async () => {
            // ARRANGE
            const data: { [url: string]: any[] } = {
                'https://api.chess.com/pub/player/NickEmmerson/games/2022/03': [],
                  
                'https://api.chess.com/pub/player/NickEmmerson/games/2022/02': [
                    {
                        uuid: 'b4f69510-da56-498b-bde1-84b52601b714',
                        rules: 'chess',
                        end_time: Math.floor(monthStartDate.getTime() / 1000) - (60 * 60 * 24) - 50,
                        time_class: 'bullet',
                        time_control: 60,
                        white: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        black: {
                            username: 'DonaldTrump',
                            result: 'checkmated'
                        },
                        pgn: 'Test PGN',
                    },
                    {
                        uuid: '952d65c7-cfb6-4668-838f-db44bdb6e792',
                        rules: 'chess',
                        end_time: Math.floor(monthStartDate.getTime() / 1000) - (60 * 60 * 24),
                        time_class: 'blitz',
                        time_control: 300,
                        white: {
                            username: 'JohnnyDepp',
                            result: 'checkmated'
                        },
                        black: {
                            username: 'NickEmmerson',
                            result: 'win'
                        },
                        pgn: 'Test PGN',
                    }
                ],
            };
            mockAxiosGet.mockImplementation((url: string) => Promise.resolve({
                data: { games: data[url] ?? [] }
            }));
            mockGetCurrentDateTime.mockReturnValue(currentDate);

            // ACT
            const actual = await GetLastLiveGameService('NickEmmerson', 60 * 60 * 24);

            // ASSERT
            expect(actual).toBeNull();
            expect(mockAxiosGet).toHaveBeenCalledTimes(2);
        });

    });

});
