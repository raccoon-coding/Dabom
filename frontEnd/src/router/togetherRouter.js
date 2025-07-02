import TogetherView from '@/views/together/TogetherView.vue'
import TogetherMainView from '@/views/together/subview/TogetherMainView.vue'
import TogetherRoom from '@/views/TogetherRoom.vue'

const togetherRoutes = [
  {
    path: '/together',
    name: 'Together',
    component: TogetherView,
    children: [
      {
        path: '/together',
        name: 'TogetherMain',
        component: TogetherMainView,
      },
      {
        path: '/together/search',
        name: 'TogetherSearch',
        component: () => import('@/views/together/subview/TogetherSearchView.vue'),
      },
    ],
  },
  {
    path: '/together/:id',
    name: 'TogetherRoom',
    component: TogetherRoom,
  },
]

export default togetherRoutes
