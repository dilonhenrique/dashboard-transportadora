import NextLink, { LinkProps } from 'next/link';
import { forwardRef, HTMLProps, FC } from 'react';

interface Props extends LinkProps {
}

const LinkIntegration = forwardRef<HTMLAnchorElement, Props>(function LinkIntegration(props, ref) {
  return <NextLink ref={ref} {...props} />;
});

export default LinkIntegration;