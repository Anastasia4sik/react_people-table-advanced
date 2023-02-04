import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import className from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = memo(({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={`../${person.slug}/${location.search}`}
      className={className(
        { 'has-text-danger': person.sex === 'f' },
      )}
    >
      {person.name}
    </Link>
  );
});
