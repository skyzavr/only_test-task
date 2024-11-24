import { RefObject } from 'react';

type textItemProps = {
  title: string | number;
  styles: { [key: string]: string };
  refLink: RefObject<HTMLHeadingElement>;
};

export const TextItem = (props: textItemProps) => {
  const { title, styles, refLink } = props;
  return (
    <h2 style={styles} ref={refLink}>
      {title}
    </h2>
  );
};
