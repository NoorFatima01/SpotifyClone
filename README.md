
## Why create a SupabaseProvider?

This `SupabaseProvider` actually returns a SessionContextProvider.    

`SessionContextProvider` is a provider from the Supabase helper library for React. This component is designed to make Supabase session data available to all child components wrapped inside it. Any child component can then access this session data without it being passed down as a prop.    

The `SupabaseProvider` serves as a convenient wrapper around the `SessionContextProvider` from the Supabase helper library for React. Its primary purpose is to make Supabase session data readily available to all child components wrapped inside it.    

1. **Centralized Session Data**: Instead of passing session-related data (like authentication status) through multiple layers of components, you can use the context to access it directly.    

2. **Consistency and Efficiency**: By using the `SupabaseProvider`, we ensure that there's a single instance of the `supabaseClient` for the entire application. This means child components can access and use this client without the need to recreate it, ensuring efficient and consistent interactions with the Supabase backend.   

Imagine a scenario where a component deep within your application needs to check if a user is authenticated. Instead of threading this information through multiple parent components, the component can directly access this data if it's wrapped inside the `SessionContextProvider`.    


`SupabaseProvider` will give us all the info about the session.   
`UserContext` is the context for user info.
`UserProvider` will provides us all the info  about the user.
`useUser` gives access to the context about the user. (commented code for better understanding)

## Short summary of the authentication process

1. Everything is wrapped around supabaseProvider. Value of session and client is passed to this provider.
2. use()context allows us to access any particular value of the supabaseProvider.
3. Auth is used for the GUI
4. When user signs up, a user id is automatically created in the database for that user.