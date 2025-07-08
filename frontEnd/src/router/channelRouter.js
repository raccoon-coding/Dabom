import community from "@/views/channel/subview/Community.vue"
import playlist from "@/views/channel/subview/playlist/Playlist.vue"
import channel from "@/views/channel/ChannelMainView.vue"
import about from "@/views/channel/subview/About.vue"

const channelRoutes = [
    {
        path: '/channel',
        name: 'channel',
        component: channel,
        children: [
            {
                path: '/channel/playlists',
                component: playlist,
            },
            {
                path: '/channel/community',
                component: community,
            },
            {
                path: '/channel/about',
                component: about,
            },
        ],
    },
]

export default channelRoutes
