export default class VideoInfo {
    constructor() {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.videoUrl = '';
        this.tags = [];
        this.views = 0;
        this.likes = 0;
        this.dislikes = 0;
        this.channel = {
            name: '',
            avatarUrl: ''
        };
        this.uploadDate = '';
    }
}