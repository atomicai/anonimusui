import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

import { ApiService } from '../services';

const ApiContext = createContext<ApiService | undefined>(undefined);

export const ApiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [apiService] = useState(new ApiService());
  return <ApiContext.Provider value={apiService}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const apiService = useContext(ApiContext);
  if (!apiService) {
    throw new Error('There is no wrapping ApiProvider!');
  }
  return apiService;
};
