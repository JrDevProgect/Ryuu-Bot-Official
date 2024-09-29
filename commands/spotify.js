const axios = require('axios');
const fs = require('fs');
const path = require('path');

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const fetchLyrics = async (trackName) => {
  const lyricsUrl = `https://markdevs-last-api-t48o.onrender.com/search/lyrics?q=${encodeURIComponent(trackName)}`;
  const response = await axios.get(lyricsUrl);
  return response.data.result ? response.data.result : null;
};

module.exports = {
  name: "spotify",
  description: "Search music from Spotify",
  prefixRequired: false,
  adminOnly: false,
  async execute(api, event, args) {
    if (args.length === 0) {
      return api.sendMessage(global.convertToGothic("Please provide a track name to search."), event.threadID, event.messageID);
    }

    const trackName = args.join(' ').replace(/[^\w\s]/gi, '');
    const searchUrl = `https://spotifydl-api-54n8.onrender.com/spotifydl?search=${encodeURIComponent(trackName)}`;

    try {
      const searchResponse = await axios.get(searchUrl);

      if (searchResponse.data && searchResponse.data.track) {
        const { name, artist, album, downloadLink } = searchResponse.data.track;
        const formattedDuration = formatDuration(Math.floor(searchResponse.data.track.duration / 1000));

        const lyrics = await fetchLyrics(name);
        const lyricsMessage = lyrics ? global.convertToGothic(`Lyrics for "${lyrics.title}" by ${lyrics.artist}:\n${lyrics.lyrics}`) : global.convertToGothic("Lyrics not found.");

        const filePath = path.join(__dirname, `${name}.mp3`);
        try {
          const fileResponse = await axios.get(downloadLink, { responseType: 'arraybuffer' });
          fs.writeFileSync(filePath, fileResponse.data);

          await api.sendMessage(lyricsMessage, event.threadID);
          await api.sendMessage({
            attachment: fs.createReadStream(filePath)
          }, event.threadID);
        } catch (downloadError) {
          console.error(downloadError);
          await api.sendMessage(global.convertToGothic("An error occurred while downloading the track."), event.threadID, event.messageID);
        } finally {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
      } else {
        await api.sendMessage(global.convertToGothic("No results found. Please try again."), event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
      await api.sendMessage(global.convertToGothic("An error occurred while searching for the track."), event.threadID, event.messageID);
    }
  },
};