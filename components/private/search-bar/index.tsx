import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as _ from 'lodash';

import UserProfile from '@/components/common/users/profile';
import { IUser } from '@/types/user';

interface Props {}

const SearchBar = (props: Props) => {
  const [searchResults, setSearchResults] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // @ts-ignore
      if (ref?.current && !ref?.current?.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleFetchSearchResults = async (searchText: string) => {
    const res = await fetch(`/api/search?q=${searchText}`);
    if (res.ok) {
      const json = await res.json();
      setSearchResults(json?.data);
    } else {
      setSearchResults([]);
    }
  };
  const debounceFetchSearchResults = _.debounce(handleFetchSearchResults, 500); // 500 ms
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    if (value?.length > 2) {
      debounceFetchSearchResults(value);
    }
    if (!value) setSearchResults([]);
  };
  return (
    <div
      className="flex flex-row max-w-md w-full justify-end relative"
      ref={ref}
    >
      <input
        type="text"
        onChange={handleChange}
        className="p-2 rounded-lg dark:bg-gray-700 dark:text-white bg-white text-black my-2 max-w-xs"
        placeholder="Search users"
      />
      {searchResults?.length > 0 && (
        <ul className="flex flex-col gap-2 dark:bg-gray-700 dark:text-white bg-white text-black absolute p-2 rounded-lg top-14 w-full max-w-sm ring-2">
          {searchResults?.map((result: IUser) => (
            <li
              key={result?.id}
              className="my-3"
              onClick={() => setSearchResults([])}
            >
              <UserProfile user={result} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
