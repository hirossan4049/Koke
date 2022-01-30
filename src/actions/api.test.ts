
import { fetchLatestTracklists, fetchTracklists } from './api';

describe("api", () => {
    test("latestTracklists", (done) => {
        fetchLatestTracklists(result => {
            expect(result[0].trackName).toBe("Mr. Belt & Wezol Room, Episode #70 (2021 Summer Edition)");
            done()
        })
    })


    test("tracklists", done => {
        fetchTracklists("8LIfod6dNd0", result => {
            expect(result.trackName).toBe("Vintage Culture live at Laroc - Extended Set");
            expect(result.trackId).toBe("8LIfod6dNd0");
            expect(result.tracks[0].name).toBe("Intro")
            expect(result.tracks.length).toBe(170)
            done();
        })
    })

    
})