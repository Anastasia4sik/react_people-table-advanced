import React, { memo } from 'react';
import { Person } from '../../types/Person';
import { PeopleTableBody } from './PeopleTableBody';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = memo(({ people }) => (
  people.length === 0
    ? (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    )
    : (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <a href="#/people?sort=name">
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <a href="#/people?sort=sex">
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <a href="#/people?sort=born&amp;order=desc">
                  <span className="icon">
                    <i className="fas fa-sort-up" />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <a href="#/people?sort=died">
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        {people.map(person => (
          <PeopleTableBody
            key={person.slug}
            person={person}
          />
        ))}
      </table>
    )
));
