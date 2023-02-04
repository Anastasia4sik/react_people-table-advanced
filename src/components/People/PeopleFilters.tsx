import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function updateSearch(params: { [key: string]: string | string[] | null }) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        value.forEach(part => {
          searchParams.append(key, part);
        });
      } else {
        searchParams.set(key, value);
      }
    });

    setSearchParams(searchParams);
  }

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">All</a>
        <a className="" href="#/people?sex=m">Male</a>
        <a className="" href="#/people?sex=f">Female</a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(century.toString()) },
                )}
                to={`..?centuries=${century.toString()}`}
                onClick={() => {
                  updateSearch({
                    centuries: centuries.includes(century.toString())
                      ? centuries.filter(cent => +cent !== century)
                      : [...centuries, century.toString()],
                  });
                }}
              >
                {century.toString()}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="./"
              onClick={() => {
                if (centuries.length < 5) {
                  updateSearch({
                    centuries: ['16', '17', '18', '19', '20'],
                  });
                } else {
                  updateSearch({
                    centuries: null,
                  });
                }
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={() => {
            updateSearch({
              query: null,
              centuries: null,
            });
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
