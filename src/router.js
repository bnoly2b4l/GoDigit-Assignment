import VueRouter from 'vue-router'

const Home = () => import('../src/components/DataTablePage.vue')
const Login = () => import('../src/components/LoginPage.vue')
const Navbar = () => import('../src/components/Navbar.vue')
const Detail = () => import('../src/components/DetailPage.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: Home,
      header: Navbar,
    },
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: Login,
    },
  },
  {
    path: '/detail/:id',
    name: 'detail',
    components: {
      default: Detail,
      header: Navbar,
    },
  }
]

const router = new VueRouter({
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  const userName = localStorage.getItem('userName')
  if (to.name !== 'login' && !userName) {
    alert('Please Login')
    next({ name: 'login' })
  }
  else next()
})

export default router
