import { useEffect, useState } from 'react';
import { calculateInitialLimit } from '#/modules/home/utils/pagination.util';

interface PaginationLimitProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

export function usePaginationLimit({ cardRef }: PaginationLimitProps) {
  const [limit, setLimit] = useState(30);

  useEffect(() => {
    const initialNumberOfCards = calculateInitialLimit(cardRef.current, limit);
    setLimit(initialNumberOfCards);
  }, [limit, cardRef]);

  return { limit };
}
