import React from 'react'
import Media from 'react-media'
import { mobileBreakpoint } from '../styles/common'
import MatchMobile from './MatchMobile'
import MatchDesktop from './MatchDesktop'
import EventMobile from './EventMobile'
import EventDesktop from './EventDesktop'

export default class MatchList extends React.Component {
  static contextTypes = {
    // Whether we're targeting a mobile device during a server-side render.
    isMobileAgent: React.PropTypes.bool
  }

  render () {
    const { isMobileAgent } = this.context
    const { d, timezone, entries } = this.props
    return (
      <Media query={mobileBreakpoint}>
        {isMobileViewport => {
          // isMobileAgent is `null` on client renders. We should only use it
          // for server renders.
          const isMobile = isMobileAgent !== null ? isMobileAgent : isMobileViewport

          const MatchComponent = isMobile ? MatchMobile : MatchDesktop
          const EventComponent = isMobile ? EventMobile : EventDesktop
          const toDate = (e) => new Date((e.time || e.nextstarttime) + ' UTC')
          const sorted = entries.sort((a, b) => (toDate(a) - toDate(b)))
          return (
            <div>
              {entries.map(entry => {
                if (entry.name) {
                  return <EventComponent key={entry.name} d={d} event={entry} timezone={timezone} />
                } else {
                  return <MatchComponent key={entry.event} d={d} match={entry} timezone={timezone} />
                }
              })}
            </div>
          )
        }}
      </Media>
    )
  }
}
