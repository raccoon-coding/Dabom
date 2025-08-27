import community from "@/views/channel/subview/Community.vue"
import playlist from "@/views/channel/subview/playlist/Playlist.vue"
import channel from "@/views/channel/ChannelMainView.vue"
import about from "@/views/channel/subview/About.vue"
import mychannel from "@/views/channel/MychannelMainView.vue"

import videos from "@/views/channel/subview/video/Video_Fix.vue"

import community_write from "@/views/channel/subview/community/Community_Write.vue"


const channelRoutes = [
    {
        path: '/channel',
        name: 'channel',
        component: channel,
        children: [
            {
                path: '/channel/videos',
                name: 'videos',
                component: videos,
            },
            {
                path: '/channel/playlists',
                name: 'playlist',
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
                path: '/channel/community_write',
                component: community_write,
            },
            {
                path: '/channel/community/:id',
                component: () => import('@/components/channel/ChannelPost.vue')
            }
        ],
    },
]

export default channelRoutes