import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedSwitch } from 'reactRouterConnected'
import Loadable from 'react-loadable'
import Page from 'components/LayoutComponents/Page'
import NotFoundPage from 'pages/DefaultPages/NotFoundPage'
import HomePage from 'pages/DefaultPages/HomePage'
import DashboardAlphaPage from 'pages/Dashboard/DashboardAlphaPage'
import ClientPage from 'pages/DefaultPages/ClientPage'
import ClientNewPage from 'pages/DefaultPages/ClientNewPage'
import ClientDetailPage from 'pages/DefaultPages/ClientDetailPage'
import LoginPage from 'pages/DefaultPages/LoginPage'
import ProjectPage from 'pages/DefaultPages/ProjectPage'
import ProjectNewPage from 'pages/DefaultPages/ProjectNewPage'
import ProjectDetailPage from 'pages/DefaultPages/ProjectDetailPage'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  })

const loadableRoutes = {
  // Default Pages
  '/login': {
    component: loadable(() => import('pages/DefaultPages/LoginPage')),
  },
  '/clients': {
    component: loadable(() => import('pages/DefaultPages/ClientPage')),
  },
  '/clients/new': {
    component: loadable(() => import('pages/DefaultPages/ClientNewPage')),
  },
  '/clients/detail': {
    component: loadable(() => import('pages/DefaultPages/ClientDetailPage')),
  },
  '/projects': {
    component: loadable(() => import('pages/DefaultPages/ProjectPage')),
  },
  '/projects/new': {
    component: loadable(() => import('pages/DefaultPages/ProjectNewPage')),
  },
  '/projects/detail': {
    component: loadable(() => import('pages/DefaultPages/ProjectDetailPage')),
  },

  // Dashboards
  '/dashboard/alpha': {
    component: loadable(() => import('pages/Dashboard/DashboardAlphaPage')),
  },
}

class Routes extends React.Component {
  timeoutId = null

  componentDidMount() {
    this.timeoutId = setTimeout(
      () => Object.keys(loadableRoutes).forEach(path => loadableRoutes[path].component.preload()),
      5000, // load after 5 sec
    )
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return (
      <ConnectedSwitch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/clients" component={ClientPage} />
        <Route exact path="/clients/new" component={ClientNewPage} />
        <Route exact path="/clients/detail" component={ClientDetailPage} />
        <Route exact path="/projects" component={ProjectPage} />
        <Route exact path="/projects/new" component={ProjectNewPage} />
        <Route exact path="/projects/detail" component={ProjectDetailPage} />
        <Route exact path="/dashboard/alpha" component={DashboardAlphaPage} />
        <Route
          render={() => (
            <Page>
              <NotFoundPage />
            </Page>
          )}
        />
      </ConnectedSwitch>
    )
  }
}

export { loadableRoutes }
export default Routes
