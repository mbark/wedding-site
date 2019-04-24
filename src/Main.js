/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { Route, Switch } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import Frontpage from './Frontpage';
import RSVP  from './RSVP/RSVP';
import { usePrevious } from './hooks';
import Guests from './guests/Guests';
import useRouter from './useRouter';
import Info from './info/Info';

export default function Main() {
  const paths = ['/', '/rsvp', '/info', '/guests'];

  const { location } = useRouter();
  const prevLocation = usePrevious(location);

  const transitions = useTransition(location, location => location.pathname, {
    from: item => {
      const previous = prevLocation ? prevLocation.pathname : undefined;
      const pageDiff = paths.indexOf(item.pathname) - paths.indexOf(previous);
      return {
        opacity: 0,
        transform: `translate3d(${pageDiff * 20}%,0,0)`,
      };
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: item => {
      const pageDiff =
        paths.indexOf(item.pathname) - paths.indexOf(location.pathname);
      return {
        opacity: 0,
        transform: `translate3d(${pageDiff * 20}%,0,0)`,
        position: 'absolute',
      };
    },
  });

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {transitions.map(({ item, props, key }) => (
        <animated.div
          key={key}
          style={props}
          css={css`
            margin-top: 2rem;
            width: 100%;
          `}
        >
          <Switch location={item}>
            <Route exact path="/" component={Frontpage} />
            <Route path="/rsvp" component={RSVP} />
            <Route path="/guests" component={Guests} />
            <Route path="/info" component={Info} />
            <Route component={Frontpage} />
          </Switch>
        </animated.div>
      ))}
    </div>
  );
}
