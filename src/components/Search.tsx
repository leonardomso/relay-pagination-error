import React, { useState, useEffect, Suspense, ChangeEvent } from "react";
import graphql from "babel-plugin-relay/macro";
import { useQueryLoader } from "react-relay/hooks";
import { useDebounce } from "use-debounce";

import SearchPodcast from "./SearchPodcast";

import { SearchQuery } from "./__generated__/SearchQuery.graphql";

const searchQuery = graphql`
   query SearchQuery($podcastName: String!) {
    ...SearchPodcast_podcasts @arguments(podcastName: $podcastName)
  }
`;

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  const [shouldLoadMore] = useState<boolean>(false);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    loadQuery({ podcastName: e.target.value });
  };

  const [queryReference, loadQuery] = useQueryLoader<SearchQuery>(searchQuery);

  useEffect(() => {
    loadQuery({ podcastName: "" });
  }, [loadQuery]);

  return (
    <div>
      <input type="text" value={search} onChange={onSearch} />
      {queryReference && (
        <Suspense fallback={<h1>Loading...</h1>}>
          <SearchPodcast
            searchQuery={searchQuery}
            queryReference={queryReference}
            shouldLoadMore={shouldLoadMore}
            search={debouncedSearch}
          />
        </Suspense>
      )}
    </div>
  )
};

export default Search;