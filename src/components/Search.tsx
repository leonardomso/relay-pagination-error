import React, { useState, useEffect, Suspense, ChangeEvent } from "react";
import graphql from "babel-plugin-relay/macro";
import { useQueryLoader } from "react-relay/hooks";

import SearchPodcast from "./SearchPodcast";

import { SearchQuery } from "./__generated__/SearchQuery.graphql";

const searchQuery = graphql`
   query SearchQuery($podcastName: String!) {
    ...SearchPodcast_podcasts @arguments(podcastName: $podcastName)
  }
`;

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [shouldLoadMore, setShouldLoadMore] = useState<boolean>(false);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onLoadMore = (value: any) => {
    if (value.top === 1) {
      setShouldLoadMore(true);
    }
    setShouldLoadMore(false);
  };

  const [queryReference, loadQuery, disposeQuery] = useQueryLoader<SearchQuery>(searchQuery);

  useEffect(() => {
    loadQuery({ podcastName: search });

    return () => {
      disposeQuery();
    };
  }, [loadQuery, disposeQuery, search]);

  return (
    <div>
      <input type="text" value={search} onChange={onSearch} />
      {queryReference && (
        <Suspense fallback={<h1>Loading...</h1>}>
          <SearchPodcast
            searchQuery={searchQuery}
            queryReference={queryReference}
            shouldLoadMore={shouldLoadMore}
          />
        </Suspense>
      )}
    </div>
  )
};

export default Search;