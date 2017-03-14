import AppContainer from 'containers/App'

// Auth
import RegisterScene from 'scenes/Auth/scenes/Register'
import LoginScene from 'scenes/Auth/scenes/Login'

// NoMatch
import NoMatchScene from 'scenes/NoMatch'

export const getRoutes = (store) => {
  return [
    {
      path: '/',
      component: AppContainer,
      childRoutes: [
        {
          path: '/register',
          component: RegisterScene
        },
        {
          path: '/login',
          component: LoginScene
        }
      ]
    },
    {
      path: '*',
      component: NoMatchScene
    }
  ]
}