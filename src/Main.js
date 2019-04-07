/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { Route, Switch } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import Frontpage from './Frontpage';
import RSVP, { usePrevious } from './RSVP/RSVP';
import OtherAttending from './OtherAttending';
import useRouter from './useRouter';

export default function Main() {
  const paths = ['/', '/rsvp', '/info', '/guests'];

  const { location } = useRouter();
  const prevLocation = usePrevious(location);

  const transitions = useTransition(location, location => location.pathname, {
    from: item => {
      const previous = prevLocation ? prevLocation.pathname : undefined;
      const fromRight = paths.indexOf(previous) > paths.indexOf(item.pathname);
      return {
        opacity: 0,
        transform: `translate3d(${fromRight ? '-' : ''}50%,0,0)`,
      };
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: item => {
      const toRight =
        paths.indexOf(location.pathname) < paths.indexOf(item.pathname);
      return {
        opacity: 0,
        transform: `translate3d(${toRight ? '' : '-'}50%,0,0)`,
      };
    },
  });

  return transitions.map(({ item, props, key }) => {
    return (
      <animated.div
        key={key}
        style={props}
        css={css`
          position: absolute;
          bottom: 70px;
          align-self: flex-end;
          height: 60%;
          width: 100%;
          display: flex;
        `}
      >
        <Switch location={item}>
          <Route exact path="/" component={Frontpage} />
          <Route path="/rsvp" component={RSVP} />
          <Route path="/guests" component={OtherAttending} />
          <Route component={Frontpage} />
        </Switch>
      </animated.div>
    );
  });
}
