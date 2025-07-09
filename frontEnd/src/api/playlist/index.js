// import playlistData from './playlist.json';

export const playlist_show = async () => {
    return new Promise((resolve) => {
        resolve(playlistData);
    });
};

export default { playlist_show };