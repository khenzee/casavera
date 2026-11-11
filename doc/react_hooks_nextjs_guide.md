# React Hooks in Next.js

## Learning objective

By the end of this lesson, you should understand what React Hooks are,
why they exist, and what each of the following Hooks is used for:

-   `useState`
-   `useEffect`
-   `useContext`
-   `useRef`
-   `useReducer`
-   `useCallback`
-   `useMemo`

This lesson focuses on understanding the concepts. The examples use
React inside a Next.js application.

------------------------------------------------------------------------

## 1. What are React Hooks?

React is a JavaScript library for building user interfaces. A React
component is usually a function that describes what should appear on the
screen.

However, a component sometimes needs to do more than display
information. It may need to:

-   Remember information that changes over time.
-   Respond when something happens, such as a button click.
-   Run code when a component appears or when certain data changes.
-   Share information with other components.
-   Keep a reference to a DOM element.
-   Avoid repeating expensive calculations or unnecessarily recreating
    functions.

**React Hooks are special functions that allow function components to
use React features such as state, effects, context, references, and
performance optimizations.**

Think of a component as a worker carrying out a task. On its own, the
component can calculate and display information. Hooks give that worker
additional abilities: memory, access to shared information, a way to
interact with the outside world, and tools for managing complex work.

Hooks are not ordinary utility functions. They follow specific React
rules and must be called from React function components or from custom
Hooks.

### The Rules of Hooks

There are two important rules:

1.  **Call Hooks at the top level.** Do not call Hooks inside loops,
    conditions, nested functions, or `try`/`catch` blocks. Call them
    directly inside the component or custom Hook.
2.  **Call Hooks only from React functions.** Do not call Hooks from
    ordinary JavaScript functions or class components. They belong in
    function components and custom Hooks.

Correct:

``` jsx
function Counter() {
  const [count, setCount] = useState(0);

  if (count > 5) {
    console.log("The count is greater than five");
  }

  return <p>{count}</p>;
}
```

Incorrect:

``` jsx
function Counter() {
  if (someCondition) {
    // Do not call a Hook inside a condition.
    const [count, setCount] = useState(0);
  }

  return <p>Counter</p>;
}
```

The Hook must be called consistently whenever React renders the
component. This allows React to keep track of which Hook belongs to
which component.

### An important Next.js distinction

Next.js uses React, but it also supports **Server Components** and
**Client Components**.

-   Server Components are rendered on the server and are the default for
    components in the Next.js App Router.
-   Client Components can use browser-side interactivity and React Hooks
    such as `useState`, `useEffect`, `useContext`, and `useRef`.

When a component needs these interactive Hooks in the App Router, place
the directive `"use client"` at the top of the file, before imports.

``` jsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

`"use client"` marks a client-side entry point. It does not mean that
the component can never be pre-rendered; Next.js can still pre-render
Client Components and then hydrate them in the browser.

Do not add `"use client"` to every file automatically. Keep components
as Server Components when they do not need client-side features, and
introduce a Client Component where interactivity is needed.

------------------------------------------------------------------------

## 2. `useState` --- Managing component state

### What is state?

**State is information that a component remembers and that can change
over time.**

For example:

-   The number displayed by a counter.
-   Whether a menu is open or closed.
-   The text a user has typed into an input.
-   Whether a password is visible.
-   The currently selected tab.

A normal JavaScript variable does not tell React to render the component
again when its value changes. React state does.

### What does `useState` do?

`useState` is a Hook that allows a function component to create and
manage state.

``` jsx
const [count, setCount] = useState(0);
```

This statement gives us three things:

-   `useState(0)` creates state with an initial value of `0`.
-   `count` contains the current state value.
-   `setCount` is the function used to request an update to that value.

The names `count` and `setCount` are not special JavaScript keywords.
They are variable names chosen by the developer.

### Example: A counter

``` jsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increaseCount}>Increase</button>
    </div>
  );
}
```

When the button is clicked, `setCount` requests a state update. React
then renders the component again using the new state value.

### Updating state based on its previous value

Sometimes an update depends on the current value. In that situation, use
the functional update form:

``` jsx
setCount((previousCount) => previousCount + 1);
```

React passes the previous state value into the updater function. This is
especially useful when several updates may be queued before the next
render.

### Important things to understand

-   Calling a state setter requests a new render; it does not
    immediately change the state variable in the currently running
    render.
-   Do not change state directly. Use its setter.
-   When state contains an object or array, create a new object or array
    instead of mutating the existing one.
-   The initial value is used when the component is first initialized,
    not as a value that resets on every render.

**Mental model:** `useState` gives a component memory. When that memory
changes, React updates the interface to reflect the new information.

------------------------------------------------------------------------

## 3. `useEffect` --- Synchronizing with external systems

### What is an Effect?

A React component mainly describes what the user interface should look
like. Sometimes, however, the component must synchronize with something
outside React.

Examples include:

-   Setting up a timer.
-   Listening for browser events.
-   Connecting to a third-party service.
-   Subscribing to a data source.
-   Updating the browser document title.
-   Working with an external library that needs to be initialized.

**`useEffect` lets a component run side-effect code after React has
committed a render.**

An Effect is not simply a place to put any code that does not fit
elsewhere. It is primarily for synchronizing a component with an
external system.

### Basic structure

``` jsx
useEffect(() => {
  // Code to run after the render.

  return () => {
    // Optional cleanup code.
  };
}, [dependencies]);
```

There are three parts:

1.  The Effect function: the code React should run.
2.  The optional cleanup function: the code React should run to undo or
    clean up the Effect.
3.  The dependency array: values that determine when React should run
    the Effect again.

### Understanding the dependency array

The dependency array controls when an Effect is re-run.

**A. No dependency array**

``` jsx
useEffect(() => {
  console.log("Effect ran after a render");
});
```

The Effect runs after every committed render of the component.

**B. An empty dependency array**

``` jsx
useEffect(() => {
  console.log("Effect ran after mounting");
}, []);
```

The Effect runs after the component is mounted. In development, React
Strict Mode may run an additional setup-and-cleanup cycle to help reveal
bugs, so do not assume the setup will execute exactly once in every
development situation.

**C. A dependency array with values**

``` jsx
useEffect(() => {
  console.log("The user ID changed");
}, [userId]);
```

The Effect runs after the initial mount and again when `userId` changes.

### Example: Updating the document title

``` jsx
"use client";

import { useEffect, useState } from "react";

export default function PageTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

The Effect synchronizes the browser's document title with the current
count. Whenever `count` changes, React runs the Effect again.

### Cleanup: Why is it necessary?

Some Effects create something that continues running or listening after
the Effect has finished. Examples include timers and event listeners.

If the component no longer needs that activity, it should be cleaned up.

``` jsx
"use client";

import { useEffect } from "react";

export default function WindowListener() {
  useEffect(() => {
    function handleResize() {
      console.log(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <p>Resize the browser window.</p>;
}
```

The cleanup function removes the event listener. This prevents an old
listener from remaining active when it is no longer needed.

### `useEffect` in Next.js

`useEffect` runs in the browser, not during server rendering. A
component using it must be a Client Component in the Next.js App Router.

Do not use `useEffect` simply to fetch data that Next.js can fetch more
appropriately in a Server Component. For many data-fetching tasks,
Next.js server-side data fetching is simpler and avoids an unnecessary
client-side loading step.

Also, do not use an Effect for values that can be calculated directly
from existing props or state. For example, if a total is simply
`price * quantity`, calculate it during rendering instead of storing it
in state and updating it with an Effect.

**Mental model:** `useEffect` is a way for a component to keep something
outside React in sync with the component's current state or props.

------------------------------------------------------------------------

## 4. `useContext` --- Sharing data across components

### The problem: Passing props through many levels

Imagine an application with this component structure:

``` text
App
 └── Dashboard
      └── Sidebar
           └── UserProfile
                └── Avatar
```

Suppose `App` has the current user's information, but only `Avatar`
needs it.

Without context, you may have to pass the user information through
`Dashboard`, `Sidebar`, `UserProfile`, and finally `Avatar`. This is
called **prop drilling**.

Prop drilling is not automatically wrong, but passing props through many
components that do not need them can make the component structure harder
to maintain.

### What does `useContext` do?

**`useContext` allows a component to read a value from a React Context
without receiving that value through every level of props.**

Context is useful for information that several components need, such as:

-   The current authenticated user.
-   A theme preference.
-   A selected language.
-   Application-wide settings.

### How context works

There are three main steps:

1.  Create a context.
2.  Place a Provider around the components that need access to the
    value.
3.  Use `useContext` in a component that needs to read the value.

### Example

First, create the context:

``` jsx
import { createContext } from "react";

export const UserContext = createContext(null);
```

Next, provide a value:

``` jsx
"use client";

import { UserContext } from "./UserContext";

export default function AppLayout({ children }) {
  const user = {
    name: "Alex",
    role: "Administrator",
  };

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
```

Finally, read the value from a nested component:

``` jsx
"use client";

import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function UserProfile() {
  const user = useContext(UserContext);

  return <h2>Welcome, {user.name}</h2>;
}
```

The `UserProfile` component can access the value because it is rendered
inside the context Provider.

### Important things to understand

-   `createContext` creates the context object; `useContext` reads its
    value.
-   The Provider makes a value available to components beneath it in the
    React component tree.
-   A component outside the matching Provider receives the context's
    default value.
-   When the Provider's value changes, components that read that context
    can re-render.
-   Context does not automatically replace all state management or make
    every value globally available. It is a way to share values across a
    part of the component tree.

In modern React, you may also see the newer provider syntax using the
context object itself. The `.Provider` syntax shown above remains widely
understood and works in Next.js applications.

**Mental model:** Context is like a shared noticeboard. A parent
component places information on it, and any component inside the
relevant area can read that information without having it passed through
every person in between.

------------------------------------------------------------------------

## 5. `useRef` --- Keeping a value without triggering a render

### What is a reference?

A reference is a way to hold onto something so that you can access it
later.

**`useRef` creates a persistent reference object whose `.current`
property can be changed without causing the component to render again.**

``` jsx
const myRef = useRef(initialValue);
```

The reference object has a property called `current`.

``` jsx
myRef.current
```

React keeps the same ref object between renders. Changing
`myRef.current` does not trigger a re-render.

### Use case 1: Accessing a DOM element

One common use of `useRef` is interacting with an actual HTML element.

``` jsx
"use client";

import { useRef } from "react";

export default function SearchBox() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus input</button>
    </div>
  );
}
```

Here is what happens:

1.  `useRef(null)` creates a reference.
2.  The `ref` attribute connects that reference to the input element.
3.  After React places the input in the DOM, `inputRef.current` points
    to that element.
4.  Calling `focus()` moves the cursor into the input.

### Use case 2: Storing a value that does not affect the interface

A ref can also store information that a component needs to remember but
does not need to display.

``` jsx
"use client";

import { useRef } from "react";

export default function ClickTracker() {
  const clickCount = useRef(0);

  function handleClick() {
    clickCount.current += 1;
    console.log(clickCount.current);
  }

  return <button onClick={handleClick}>Track click</button>;
}
```

The number increases, but the component does not re-render because the
ref changes.

### `useRef` versus `useState`

  -----------------------------------------------------------------------
  `useState`                          `useRef`
  ----------------------------------- -----------------------------------
  Stores information used to render   Stores a value that needs to
  the interface                       persist between renders

  Updating it requests a re-render    Updating `.current` does not
                                      request a re-render

  Access the value directly through   Access the value through `.current`
  the state variable                  

  Suitable for visible, changing UI   Suitable for DOM references and
  data                                values that do not need to update
                                      the UI
  -----------------------------------------------------------------------

**Mental model:** `useState` is memory that tells React when the
interface needs updating. `useRef` is a small storage box the component
can keep using without asking React to redraw the interface.

------------------------------------------------------------------------

## 6. `useReducer` --- Managing more complex state logic

### Why do we need `useReducer`?

For simple state, `useState` is usually enough.

But imagine a shopping cart. A user can:

-   Add an item.
-   Remove an item.
-   Increase an item's quantity.
-   Decrease an item's quantity.
-   Clear the cart.

As the number of possible state changes grows, the logic for updating
the state can become more complicated.

`useReducer` provides a structured way to manage state transitions.

### What does `useReducer` do?

**`useReducer` manages state using a reducer function. The reducer
receives the current state and an action, then returns the next state.**

``` jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

There are three important parts:

-   `state`: the current state.
-   `dispatch`: a function used to send an action describing what should
    happen.
-   `reducer`: a function that decides how the state should change.

### Understanding the reducer

A reducer commonly receives two arguments:

``` jsx
function reducer(state, action) {
  // Decide what the next state should be.
}
```

-   `state` is the current state.
-   `action` describes the requested change.

The reducer returns the new state. It should be a pure function: given
the same state and action, it should produce the same result without
changing the existing state or causing side effects.

### Example: A counter with a reducer

``` jsx
"use client";

import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increase":
      return { count: state.count + 1 };

    case "decrease":
      return { count: state.count - 1 };

    case "reset":
      return initialState;

    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>

      <button onClick={() => dispatch({ type: "increase" })}>
        Increase
      </button>

      <button onClick={() => dispatch({ type: "decrease" })}>
        Decrease
      </button>

      <button onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </div>
  );
}
```

### Follow the flow

When the user clicks Increase:

1.  The click handler calls `dispatch`.
2.  It sends an action: `{ type: "increase" }`.
3.  React passes the current state and that action to the reducer.
4.  The reducer calculates and returns the next state.
5.  React renders the component using the new state.

Notice that the click handler does not calculate the new count itself.
It describes the action, while the reducer contains the state-update
logic.

### `useState` versus `useReducer`

  -----------------------------------------------------------------------
  `useState`                          `useReducer`
  ----------------------------------- -----------------------------------
  Often simpler for independent or    Useful when state transitions
  straightforward state values        involve several actions or related
                                      values

  State updates are written where the State-update logic is centralized
  setter is called                    in a reducer

  Uses a state setter                 Uses `dispatch` to send actions

  Good for simple toggles, inputs,    Good for complex forms, carts, and
  and counters                        multi-step state logic
  -----------------------------------------------------------------------

`useReducer` is not automatically better than `useState`. Choose the
simpler approach that makes the state logic clear.

**Mental model:** `useReducer` is like a receptionist receiving
requests. Each request describes an action, and the reducer decides how
the application's current state should change.

------------------------------------------------------------------------

## 7. `useCallback` --- Preserving a function between renders

### First, understand the problem

In JavaScript, a function is a value. When a component renders again, a
function declared inside it is created again.

``` jsx
function MyComponent() {
  function handleClick() {
    console.log("Clicked");
  }

  return <button onClick={handleClick}>Click</button>;
}
```

Every time `MyComponent` renders, JavaScript creates a new `handleClick`
function.

That is normally fine. Recreating a small function is usually
inexpensive. However, in some situations, a new function reference can
cause unnecessary work --- for example, when passing a callback to a
memoized child component or when a function is a dependency of another
Hook.

### What does `useCallback` do?

**`useCallback` caches a function definition between renders and returns
the same function reference until one of its dependencies changes.**

``` jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

The empty dependency array means React can keep returning the cached
function while those dependencies remain unchanged. If a dependency
changes, React returns the function created during the new render.

### Example

``` jsx
"use client";

import { useCallback, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const increaseCount = useCallback(() => {
    setCount((previousCount) => previousCount + 1);
  }, []);

  return (
    <button onClick={increaseCount}>
      Count: {count}
    </button>
  );
}
```

The function reference is preserved because the callback has no changing
dependencies. The functional state update means the callback does not
need to depend on the current `count` value.

### When is `useCallback` useful?

It can be useful when:

-   Passing a function to a child component optimized with `memo`.
-   A function is used as a dependency of another Hook.
-   Preserving a callback reference helps avoid unnecessary work in a
    measured performance-sensitive part of an application.

Do not wrap every function in `useCallback`. It adds complexity, and it
is not automatically a performance improvement. Use it when stable
function identity is useful.

**Mental model:** `useCallback` helps React reuse the same function
reference instead of receiving a newly created one on every render.

------------------------------------------------------------------------

## 8. `useMemo` --- Caching a calculated value

### The problem: Repeating expensive calculations

Imagine a component that receives a large list of products and must
filter them based on a search term.

A calculation like this runs whenever the component renders:

``` jsx
const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

For a small list, this is usually not a problem. But if a calculation is
expensive and the component renders frequently, repeating that
calculation may waste work.

### What does `useMemo` do?

**`useMemo` caches the result of a calculation between renders and
recalculates it only when one of its dependencies changes.**

``` jsx
const result = useMemo(() => {
  return performCalculation();
}, [dependency]);
```

React checks the dependencies. If they have not changed, it can reuse
the previously calculated result. If a dependency changes, React runs
the calculation again.

### Example: Filtering products

``` jsx
"use client";

import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
  { id: 3, name: "Tablet" },
];

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search products"
      />

      {filteredProducts.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}
```

The filtered list is recalculated when `searchTerm` changes. If the
component renders for another reason while `searchTerm` remains the
same, React can reuse the cached result.

### When is `useMemo` useful?

It can help when:

-   A calculation is genuinely expensive.
-   A derived value is passed to a memoized child component and a stable
    value reference is useful.
-   Recalculating a value on every render has been identified as a
    performance problem.

Do not use `useMemo` for every variable or simple calculation. For
example, adding two small numbers does not need memoization.

**Mental model:** `useMemo` is like keeping the answer to a calculation.
If the information used in the calculation has not changed, React can
reuse the previous answer instead of calculating it again.

------------------------------------------------------------------------

## 9. `useCallback` versus `useMemo`

These two Hooks are related because both help cache something between
renders. The difference is what they cache.

  -----------------------------------------------------------------------
  `useCallback`                       `useMemo`
  ----------------------------------- -----------------------------------
  Caches a function definition        Caches the result of a calculation

  Returns a function                  Returns a calculated value

  Useful when function identity       Useful when a calculated value is
  matters                             expensive or its reference matters
  -----------------------------------------------------------------------

A useful way to remember the difference:

``` jsx
// Cache the function.
const handleClick = useCallback(() => {
  doSomething();
}, []);

// Cache the result of a calculation.
const total = useMemo(() => {
  return price * quantity;
}, [price, quantity]);
```

Conceptually, `useCallback(fn, dependencies)` is similar to
`useMemo(() => fn, dependencies)`. They are written differently because
their purposes are different.

------------------------------------------------------------------------

## 10. Quick comparison of all the Hooks

  -----------------------------------------------------------------------
  Hook                    Main purpose            Think of it as
  ----------------------- ----------------------- -----------------------
  `useState`              Stores state that       Component memory
                          affects the interface   

  `useEffect`             Synchronizes with       External-system
                          external systems        synchronization

  `useContext`            Reads shared            Shared noticeboard
                          information from        
                          context                 

  `useRef`                Holds a persistent      A storage box
                          value without           
                          triggering a render     

  `useReducer`            Manages state through   A state-change manager
                          actions and a reducer   

  `useCallback`           Caches a function       Reusing a function
                          reference               

  `useMemo`               Caches a calculated     Reusing a calculation
                          value                   
  -----------------------------------------------------------------------

## 11. How to decide which Hook to use

When building a feature in React or Next.js, ask yourself:

-   **Does the component need to remember information that changes the
    interface?** Use `useState`.
-   **Does the component need to synchronize with something outside
    React?** Consider `useEffect`.
-   **Do several components need to read the same shared value?**
    Consider `useContext`.
-   **Do I need to access a DOM element or preserve a value without
    causing a render?** Use `useRef`.
-   **Does the state have several related actions or complicated
    transition logic?** Consider `useReducer`.
-   **Do I need to preserve a function reference for a
    performance-related reason?** Consider `useCallback`.
-   **Do I need to cache an expensive calculation?** Consider `useMemo`.

### Final takeaway

Hooks are tools for giving React function components additional
capabilities. You do not need to use all of them in every component.

Start by understanding `useState`, because it introduces the idea of
state and re-rendering. Then learn `useEffect` and `useContext`,
followed by `useRef` and `useReducer`. Finally, understand `useCallback`
and `useMemo` as performance-related tools.

In Next.js, remember the Server Component and Client Component
distinction: use client-side Hooks inside Client Components, and keep
components on the server when they do not need client-side
interactivity.
