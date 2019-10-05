export const hooks = [
  {
    name: "useArray",
    author: "kitze",
    link: "https://github.com/kitze/react-hanger",
    description: "react hook to manage array state",
    implementationCode: `
  import { useCallback, useState } from "react";

  export const useArray = initial => {
    const [value, setValue] = useState(initial);
    return {
      value,
      setValue,
      add: useCallback(a => setValue(v => [...v, a])),
      clear: useCallback(() => setValue(() => [])),
      removeById: useCallback(id =>
        setValue(arr => arr.filter(v => v && v.id !== id))
      ),
      removeIndex: useCallback(index =>
        setValue(v => {
          v.splice(index, 1);
          return v;
        })
      )
    };
  };
    `,
    usageCode: `
    const App = () => {
      const todos = useArray(["hi there", "sup", "world"]);
      return (
        <div>
          <h3>Todos</h3>
          <button onClick={() => todos.add(Math.random())}>
            add
          </button>
          <ul>
            {todos.value.map((todo, i) => (
              <li key={i}>
                {todo}
                <button onClick={() => todos.removeIndex(i)}>delete</button>
              </li>
            ))}
          </ul>
          <button onClick={todos.clear}> clear todos </button>
        </div>
      )
    }
      `
  },
  {
    name: "useBoolean",
    author: "kitze",
    link: "https://github.com/kitze/react-hanger",
    description: "react hook to manage boolean state",
    implementationCode: `
  import { useCallback, useState } from "react";

  export const useBoolean = initial => {
    const [value, setValue] = useState(initial);
    return {
      value,
      setValue,
      toggle: useCallback(() => setValue(v => !v)),
      setTrue: useCallback(() => setValue(true)),
      setFalse: useCallback(() => setValue(false))
    };
  };
    `,
    usageCode: `
  const App = () => {
    const showCounter = useBoolean(true);
    return (
      <div>
        {
          showCounter.value ? <h3>Hello</h3> : null
        }
        <button onClick={showCounter.toggle}>Toggle</button>
      </div>
    )
  }
    `
  },
  {
    name: "useOnlineStatus",
    author: "mathdroid",
    link: "https://github.com/rehooks/online-status",
    description: "react hook for online status",
    implementationCode: `
  import { useEffect, useState } from "react";

  function getOnlineStatus() {
    return typeof navigator !== "undefined" &&
      typeof navigator.onLine === "boolean"
      ? navigator.onLine
      : true;
  }

  export const useOnlineStatus = () => {
    let [onlineStatus, setOnlineStatus] = useState(getOnlineStatus());
    const goOnline = () => setOnlineStatus(true);
    const goOffline = () => setOnlineStatus(false);

    useEffect(() => {
      window.addEventListener("online", goOnline);
      window.addEventListener("offline", goOffline);
      return () => {
        window.removeEventListener("online", goOnline);
        window.removeEventListener("offline", goOffline);
      };
    }, []);

    return onlineStatus;
  }
    `,
    usageCode: `
  const App = () => {
    let onlineStatus = useOnlineStatus();
    return (
      <div>
        <h1>You are {onlineStatus ? "Online" : "Offline"}</h1>
      </div>
    );
  }
    `
  },
  {
    name: "useDocumentTitle",
    author: "iamsolankiamit",
    link: "https://github.com/rehooks/document-title",
    description: "react hook for updating the document-title",
    implementationCode: `
  const { useEffect } = require('react');

  export const useDocumentTitle = title => {
    useEffect(() => {
      document.title = title;
    }, [title])
  }
    `,
    usageCode: `
  const App = () => {
    return <NestedComponent />;
  }

  const NestedComponent = () => {
    const [value, setValue] = useState("page title");
    useDocumentTitle(value);
    return (
      <div>
        <input value={value} onChange={e => setValue(e.target.value)} />
      </div>
    );
  }
    `
  },
  {
    name: "useEventListener",
    author: "Gabe Ragland",
    link: "https://codesandbox.io/s/z64on3ypm",
    description:
      "react hook that checks if addEventListener is supported, add the event listener, and remove it during cleanup",
    implementationCode: `
    function useEventListener(eventName, handler, element = window){
      // Create a ref that stores handler
      const savedHandler = useRef();
      
      // Update ref.current value if handler changes.
      // This allows our effect below to always get latest handler ...
      // ... without us needing to pass it in effect deps array ...
      // ... and potentially cause effect to re-run every render.
      useEffect(() => {
        savedHandler.current = handler;
      }, [handler]);
    
      useEffect(
        () => {
          // Make sure element supports addEventListener
          // On 
          const isSupported = element && element.addEventListener;
          if (!isSupported) return;
          
          // Create event listener that calls handler function stored in ref
          const eventListener = event => savedHandler.current(event);
          
          // Add event listener
          element.addEventListener(eventName, eventListener);
          
          // Remove event listener on cleanup
          return () => {
            element.removeEventListener(eventName, eventListener);
          };
        },
        [eventName, element] // Re-run if eventName or element changes
      );
    };
    `,
    usageCode: `
    function App(){
      // State for storing mouse coordinates
      const [coords, setCoords] = useState({ x: 0, y: 0 });
      
      // Event handler utilizing useCallback ...
      // ... so that reference never changes.
      const handler = useCallback(
        ({ clientX, clientY }) => {
          // Update coordinates
          setCoords({ x: clientX, y: clientY });
        },
        [setCoords]
      );
      
      // Add event listener using our hook
      useEventListener('mousemove', handler);
      
      return (
        <h1>
          The mouse position is ({coords.x}, {coords.y})
        </h1>
      );
    }
    `
  }, {
    name: "useMedia",
    author: "Ryan Florence",
    link: "https://github.com/ryanflorence/react-conf-2018",
    description: "React hook for using a CSS media query",
    implementationCode: `
  const { useEffect, useState } = require('react');

  export function useMedia(query) {
    let [matches, setMatches] = useState(
      window.matchMedia(query).matches
    );
  
    useEffect(() => {
        let media = window.matchMedia(query);
        if (media.matches !== matches) {
          setMatches(media.matches);
        }
        let listener = () => setMatches(media.matches);
        media.addListener(listener);
        return () => media.removeListener(listener);
      },
      [query]
    );
  
    return matches;
  }
    `,
    usageCode: `
  const App = () => {
    return <NestedComponent />;
  }

  const NestedComponent = () => {
    let small = useMedia("(max-width: 400px)");
    let large = useMedia("(min-width: 800px)");
    return (
      <div className="Media">
        <h1>Media</h1>
        <p>Small? {small ? "Yep" : "Nope"}.</p>
        <p>Large? {large ? "Yep" : "Nope"}.</p>
      </div>
    );
  }
    `
  }
];
