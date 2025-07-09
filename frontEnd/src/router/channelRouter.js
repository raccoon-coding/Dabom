import community from "@/views/channel/subview/Community.vue"
import playlist from "@/views/channel/subview/playlist/Playlist.vue"
import channel from "@/views/channel/ChannelMainView.vue"
import about from "@/views/channel/subview/About.vue"
import mychannel from "@/views/channel/MychannelMainView.vue"

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
            {
                path: '/channel/mychannel',
                name: 'mychannel',
                component: mychannel,
            },
            {
                path: '/channel/community/:id',
                component: () => import('@/components/channel/ChannelPost.vue')
            }
        ],
    },
]

export default channelRoutes
