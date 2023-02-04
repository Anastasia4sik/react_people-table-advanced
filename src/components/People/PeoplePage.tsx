import { useState, useEffect } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadedPeople = async () => {
    setIsLoading(true);

    try {
      const loadPeople = await getPeople();

      const preparedPeople = loadPeople.map(person => {
        const father = loadPeople.find(dad => person.fatherName === dad.name);
        const mother = loadPeople.find(mom => person.motherName === mom.name);

        return {
          ...person,
          father,
          mother,
        };
      });

      setPeople(preparedPeople);
    } catch {
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadedPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            { error
              ? (
                <p
                  data-cy="peopleLoadingError"
                >
                  Something went wrong
                </p>
              )
              : (
                <div className="box table-container">
                  {isLoading
                    ? <Loader />
                    : <PeopleTable people={people} />}
                </div>
              )}

            <p>There are no people matching the current search criteria</p>
          </div>
        </div>
      </div>
    </>
  );
};
