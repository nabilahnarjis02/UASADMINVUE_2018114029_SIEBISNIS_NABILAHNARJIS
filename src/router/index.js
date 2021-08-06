import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/profiles/Home.vue'
import Createprofiles from '../views/profiles/Createprofiles.vue'
import Editprofiles from '../views/profiles/Editprofiles.vue'

 import Hp from '../views/hps/Index.vue'
 import Createhps from '../views/hps/Createhps.vue'
  import Edithps from '../views/hps/Edithps.vue'

 import Pengalaman from '../views/pengalamans/Index.vue'
 import Createpengalamans from '../views/pengalamans/Createpengalamans.vue'
 import Editpengalamans from '../views/pengalamans/Editpengalamans.vue'

 import Kontak from '../views/kontaks/Index.vue'
 import Createkontaks from '../views/kontaks/Createkontaks.vue'
 import Editkontaks from '../views/kontaks/Editkontaks.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/createprofiles',
    name: 'Createprofile',
    component: Createprofiles
  },
  {
    path: '/editprofiles/:id',
    name: 'Editprofile',
    component: Editprofiles
  },
   {
     path: '/hps',
     name: 'Hp',
     component: Hp
   },
   {
     path: '/createhps',
     name: 'Createhp',
     component: Createhps
   },
   {
     path: '/edithps/:id',
     name: 'Edithp',
     component: Edithps
   },
   {
    path: '/pengalamans',
     name: 'Pengalaman',
     component:Pengalaman
   },
   {
     path: '/createpengalamans',
     name: 'Createpengalaman',
     component: Createpengalamans
   },
   {
     path: '/editpengalamans/:id',
     name: 'Editpengalaman',
     component: Editpengalamans
   },
   {
     path: '/kontaks',
     name: 'Kontak',
     component: Kontak
   },
   {
     path: '/createkontaks',
     name: 'Createkontak',
     component: Createkontaks
   },
   {
     path: '/editkontaks/:id',
     name: 'Editkontak',
     component: Editkontaks
   },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router