
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

## Supabase Client Configuration

## Why `createServerComponentClient`?

As the name suggests, `createServerComponentClient` creates a Supabase client tailored to work with server-side tasks, while `createClientComponentClient` is designed for client-side tasks. Simply using `createClient` is not the ideal choice for tasks specific to the server side. For instance, we want our client to be 'aware' of the signed-in user and differentiate actions across multiple users (e.g., determining which songs have been uploaded by a particular user).

## Supabase.auth.getSession() and Cookies

In a standard client-side application, the Supabase client would utilize `localStorage` to manage the user session. However, when trying to retrieve the session on the server side, the server cannot access `localStorage`. Hence, we require a mechanism to transfer the user session from the client side to the server side, and this is where cookies come into play.

## Why use Cookies in Authentication and Session Management

When a user initially signs into a web application, the server dispatches a session or authentication token specifically for that user to the browser, which stores this data as a cookie. Consequently, every time the server requests authentication-requiring data from the browser, the latter sends this cookie back to the server. This process ensures that the user's session data is preserved and transferred between the browser and server, eliminating the need for repetitive sign-ins.

Moreover, employing cookies for authentication means that we can avoid transmitting user passwords with authentication-requiring requests, providing a layer of protection for sensitive data. 

One drawback of cookies is their expiration after a certain duration, necessitating user reauthentication. We can address this challenge using middleware. `Middleware.ts` refreshes the user session before loading server components, ensuring the Supabase client on the server acknowledges and honors an active user session.


>> TO DO: Look into how and why the 'use-sound' error for type decalration was resolved? Why did just creating the index.d.ts file and declaring module in it solved the issue? And why was it not reading from the files in node modules?