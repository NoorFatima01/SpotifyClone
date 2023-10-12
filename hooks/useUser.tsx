import { useEffect, useState, createContext, useContext } from "react";
import {
  useUser as useSupaUser, //This hook provides information about the user of the specific session
  useSessionContext,
  User, //This User will be the user of that specific session (the one currently logged in)
} from "@supabase/auth-helpers-react";

import { UserDetails, Subscription } from "@/type";
//Shape of context. Our context will have these variables. Our goal is to assign values to these variables and then pass them down to the context provider.
type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};
//A user context is created. It will include all the necessary information about the user currently logged in.
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}
//Creating the context provider. This will return the user context
export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").single();
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  //Fetching details
  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled")
            setUserDetails(userDetailsPromise.value.data as UserDetails);

          if (subscriptionPromise.status === "fulfilled")
            setSubscription(subscriptionPromise.value.data as Subscription);

          setIsloadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  //These following values are passed to the context provider. They can be accessed by the children of the context provider
  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

//Now in order to use a context, we have multiple options. We can either use the react hook useContext() and pass it down the context we wanna use or we can create a custom hook that will use the useContext() hook and return the context we want to use. The second approach is more efficient because then we wont have to pass down this context, instead we can import the hook and use it anywhere in the app and get all the information about the user.
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};

//supabaseClient:
//the supabaseClient in both pieces of code refers to the same instance.

//The SupabaseProvider creates the supabaseClient and provides it to the SessionContextProvider.
//Components wrapped inside the SupabaseProvider (and by extension, the SessionContextProvider) can access the supabaseClient via the useSessionContext hook.
//The MyUserContextProvider is one such component that accesses the supabaseClient using the useSessionContext hook. It then uses this client to fetch user details and subscription data from the Supabase backend.
//So, in essence, the SupabaseProvider initializes the supabaseClient and makes it available to child components, and the MyUserContextProvider is a child component that uses this client to fetch and provide user-related data to its own children.
