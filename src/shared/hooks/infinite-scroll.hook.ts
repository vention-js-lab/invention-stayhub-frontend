import { useEffect } from 'react';

interface InfiniteScrollProps {
  isBottomOfPageInView: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const useInfiniteScroll = ({ isBottomOfPageInView, hasNextPage, fetchNextPage, isFetchingNextPage }: InfiniteScrollProps) => {
  useEffect(() => {
    if (isBottomOfPageInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isBottomOfPageInView, hasNextPage, fetchNextPage, isFetchingNextPage]);
};

export { useInfiniteScroll };
