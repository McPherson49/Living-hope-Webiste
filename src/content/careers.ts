export type Opening = {
  title: string;
  department: string;
  description: string;
};

/**
 * Current job openings. While this is empty the Careers page shows the
 * "no open positions — send your CV" message instead.
 */
export const openings: Opening[] = [];
