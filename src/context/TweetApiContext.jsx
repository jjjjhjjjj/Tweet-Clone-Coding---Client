import { createContext, useContext } from "react";

export const TweetApiContext = createContext();

export function TweetApiProvider({ tweetService, children }) {
  return (
    <TweetApiContext.Provider value={{ tweetService }}>
      {children}
    </TweetApiContext.Provider>
  );
}

export function useTweetApi() {
  return useContext(TweetApiContext);
}
