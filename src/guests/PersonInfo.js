/** @jsx jsx */
import ReactDOM from 'react-dom';
import { animated, useTransition } from 'react-spring';
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { Image } from 'cloudinary-react';
import { usePhoneQuery } from './Person';
import HideOverlay from '../HideOverlay';

export default function PersonInfo({ person, onHide }) {
  const transitions = useTransition(person, null, {
    from: { opacity: 0, transform: 'translate(-50%,-80%)' },
    enter: { opacity: 1, transform: 'translate(-50%,-50%)' },
    leave: { opacity: 0, transform: 'translate(-50%,-80%)' },
  });

  const isPhone = usePhoneQuery();
  const imageSize = isPhone ? 140 : 240;

  const defaultText = `Coming soon... Come back later!`;

  return ReactDOM.createPortal(
    <div>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              css={theme => css`
                position: fixed;
                z-index: 1000;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                min-width: 320px;
                min-height: 200px;
                border: 1px solid ${theme.colors.red.string()};
                border-radius: 4px;
                box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
                background-color: ${theme.colors.red
                  .mix(theme.colors.peach, 0.8)
                  .string()};
                padding: 1rem;
                display: flex;
              `}
            >
              <div
                css={css`
                  align-self: center;
                  justify-self: center;
                  margin-right: 1rem;
                `}
              >
                <Image publicId={`${item.id}-more`} width={imageSize} height={imageSize} />
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                `}
              >
                <h4
                  css={theme => css`
                    margin-bottom: 0.5rem;
                    font-family: ${theme.fonts.openSans};
                  `}
                >
                  {item.name}
                </h4>
                <p
                  css={css`
                    font-size: 0.8rem;
                    margin-top: 0;
                  `}
                >
                  {item.text || defaultText}
                </p>
              </div>
            </animated.div>
          ),
      )}
      {person && <HideOverlay onHide={onHide} />}
    </div>,
    document.body,
  );
}
