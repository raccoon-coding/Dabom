import community from "@/views/channel/subview/Community.vue"
import playlist from "@/views/channel/subview/playlist/Playlist.vue"
import channel from "@/views/channel/ChannelMainView.vue"
import about from "@/views/channel/subview/About.vue"
import videos from "@/views/channel/subview/video/Video_Fix.vue"
import videoManagement from "@/components/channel/video-management/VideoManagementSection.vue";


// const channelRoutes = [
//     {
//         path: '/channel',
//         name: 'channel',
//         component: channel,
//         children: [
//             {
//                 path: '/channel/videos',
//                 name: 'channelVideos',
//                 component: videos,
//             },
//             {
//                 path: '/channel/playlists',
//                 name: 'playlist',
//                 component: playlist,
//             },
//             {
//                 path: '/channel/community',
//                 component: community,
//             },
//             {
//                 path: '/channel/about',
//                 component: about,
//             },
//             {
//                 path: '/channel/manage',
//                 name: 'manage',
//                 component: videoManagement,
//             },
//
//             {
//                 path: '/channel/community/:id',
//                 component: () => import('@/components/channel/community/ChannelPost.vue')
//             }
//         ],
//     },
// ]


const channelRoutes = [
    {
        path: '/channel/:channelName',
        component: () => import('@/views/channel/ChannelMainView.vue'),
        children: [
            {
                path: '', // 기본 탭: 영상
                name: 'channelVideos',
                component: () => import('@/views/channel/subview/video/Video_Fix.vue'),
            },
            {
                path: '/channel/playlists',
                name: 'playlist',
                component: playlist,
            },
            // {
            //     path: 'playlists',
            //     name: 'channelPlaylists',
            //     component: () => import('@/views/channel/subview/playlist/Playlist.vue'),
            // },
            {
                path: 'community',
                name: 'channelCommunity',
                component: () => import('@/views/channel/subview/Community.vue'),
            },
            {
                path: 'about',
                name: 'channelAbout',
                component: () => import('@/views/channel/subview/About.vue'),
            },
            {
                path: 'manage',
                name: 'channelManage',
                component: () => import('@/components/channel/video-management/VideoManagementSection.vue'),
                // meta: { requiresOwner: true }, // 권한 체크
            },
            {
                path: 'community/:id',
                name: 'channelPost',
                component: () => import('@/components/channel/community/ChannelPost.vue'),
            },
            // {
            //     path: '/channel/community/:id',
            //     component: () => import('@/components/channel/community/ChannelPost.vue')
            // }
        ],
    },
]

export default channelRoutes