
import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Home from '../../containers/Home'
import Settings from '../../containers/Settings'
import TravelResuls from '../../pages/TravelResuls'
import TravelPage from '../../pages/TravelPage'
import TravelPageDriver from '../../pages/TravelPageDriver'
import TransfertPage from '../../pages/TransfertPage'

import { addLocaleData } from 'react-intl'
import { Provider } from 'react-redux'
import {IntlProvider} from "react-intl";
import CarManager from '../CarManager/CarManager'
import TravelManager  from '../TravelManager/TravelManager'
import TravelEnd  from '../TravelEnd/TravelEnd'


import generateStore from '../generateStore'
import en from 'react-intl/locale-data/en'
import localeData from '../../locales/data.json'

import { initializeParse } from '../initParse'

import 'semantic-ui-css/semantic.min.css'
import { ThemeProvider } from 'styled-components'
import { Theme } from '../Theme'
import { Section, Wrapper } from './styles'
const availables = ['en']

addLocaleData([...en])

const language = (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]

const messages = localeData

const initialData = {
  intl: {
    defaultLocale: 'en',
    locale: languageWithoutRegionCode,
    messages
  }
}

const store = generateStore(initialData)
initializeParse()

function App({ location }){
  return (
    <IntlProvider locale={availables.includes(languageWithoutRegionCode) ? languageWithoutRegionCode : 'en'} defaultLocale ='en' messages={messages[availables.includes(languageWithoutRegionCode) ? languageWithoutRegionCode : 'en']}>
       <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <Wrapper>
            <TransitionGroup component="main" className="page-main" style={{ height: '100%' }}>
              <CSSTransition key={location.key} timeout={{ enter: 300, exit: 0 }} classNames="fade">
                <Section className="page-main-inner">
                  <Switch location={location}>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/home/transfert" component={TransfertPage} />
                    <Route exact path="/home/results" component={TravelResuls} />
                    <Route exact path="/home/car" component={TravelPageDriver} />
                    <Route exact path="/home/car/manage" component={CarManager} />
                    <Route exact path="/home/travel" component={TravelPage} />
                    <Route exact path="/home/travel/manage" component={TravelManager} />
                    <Route exact path="/home/travel/:travelId" component={TravelEnd} />
                    <Route exact path="/home/params" component={Settings} />
                    <Route exact path="/" component={Home} />
                  </Switch>
                </Section>
              </CSSTransition>
            </TransitionGroup>
          </Wrapper>
        </ThemeProvider>
      </Provider>
    </IntlProvider>
  )
}

export default withRouter(App)
