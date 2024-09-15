---
title: "Manual Micro Frontends"
date: "15/09/2024"
description: "Micro Frontends with independent routing."
---

# Micro Frontends with independent routing

When thinking about using a [Micro Frontends](https://en.wikipedia.org/wiki/Microfrontend) architecture for a frontend application, there are some complexities that we have to think about, that don't exists when building a monolithic frontend. One of which is, how do we handle client side routing? In a typical monolithic SPA (single page application), there would only be one router which handles all the routes and navigation between them. So considering that we want to use a Micro Frontends architecture, we could simply have each of our Micro Frontends use the same router (and same version of that router), and nest the MFEs (Micro Frontends) as routes, inside a main parent router.

But what if we wanted to have each of our MFEs use different routers, or even different frontend frameworks all together? For example we might want to do this for the following reasons, among others:

-   Different teams responsible for building and deploying different sections of the application
-   Migrating a legacy codebase from an old framework / router to a new one using the [strangler pattern](https://www.geeksforgeeks.org/strangler-pattern-in-micro-services-system-design)
-   One section of the application needs to use a certain framework / router for technical reasons, or it matches the skill sets of team members

In this case, ideally we'd like to be able to compose our application of MFEs, which can each be potentially built and maintained by different teams, using different frameworks and/or routers, with different development life cycles, and can be deployed independently of each other. In this article we will explore how we can achieve this. There are tools like [Single-SPA](https://single-spa.js.org/) which can be used to help solve some of the problems we will discuss in this article, but I think it can often be helpful to try to understand how to achieve something like this "from scratch" (or reasonably close) before bringing in a library or framework to get the job done.

## Project structure

We will create one "Host" application which will act as the shell that our MFEs will sit within. We will then create 2 MFE applications which can be developed completely independently of the host, and each other, but will be rendered inside the host when the user visits certain routes.

Our example application will be the website for a chain of grocery stores. The main "Host" application will contain things that always display, like the header and the footer. Then lets say we have the following two features, for which we will create two MFEs:

-   Online shop - renders at `/online-shop/*` routes
-   Store locator - renders at `/store-locator/*` routes

For the host application we will use React, and [React Router](https://reactrouter.com/en/main) for the router. For the online shop we will also use React, but for its router we will use [Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/overview). And finally for the store locator, we will use Vue, and it's built in [Vue Router](https://router.vuejs.org/introduction.html).

To get started we will just create a folder called `manual_micro_frontends` to contain our entire project, and inside it we will create separate directories for each application.

```
host/
onlineShop/
storeLocator/
```

We will use [Vite](https://vitejs.dev/) to generate and serve our applications, so we will generate a new vite/react app inside of the `host` directory. After following the vite docs to create a new application using the react/javascript template, we will remove all the boilerplate JSX and styling, along with the excess files inside the `src` directory, and apply a small CSS reset. We should then be left with just the following inside our src directory:

```
// host/src/main.jsx

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(<App />);
```

```
// host/src/index.css

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```

```
// host/src/App.jsx

function App() {
    return <div>Host</div>;
}

export default App;
```

We will repeat the above process for the online shop application. The only difference being in the online shop application we will also delete the `index.css` file. Styling Micro Frontends is another problem that needs some thought, but it's outside the scope of this tutorial, so for the sake of focusing our routing, we will just style everything in the host application's index.css file.

```
// onlineShop/src/main.jsx

import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
```

```
// onlineShop/src/App.jsx

function App() {
    return <div>Host</div>;
}

export default App;
```

We should then be able to install dependencies in each application, and run them both separately on different ports, and see our outputs in the browser:

![Host](./blog_images/host_init.PNG)
![Online Shop](./blog_images/online_shop_init.PNG)

## The Host application

First we will install `react-router-dom`, and create a minimal router including the following routes:

-   A "root route" which will act as a layout route, rendering common UI that appears on every other route, in our case just a header and footer. This route will be the parent of every other route
-   "/" - just part of the host application
-   "/about" - also just part of host
-   "/online-shop" - the route which will render our Online Shop MFE
-   "/store-locator" - the route which will render our Store Locator MFE

```
// host/src/router.jsx

import { createBrowserRouter, Link, Outlet } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: (
            <div>
                <header>
                    Header
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/online-shop">Online Shop</Link>
                        <Link to="/store-locator">Store Locator</Link>
                    </nav>
                </header>
                <main>
                    <Outlet />
                </main>
                <footer>Footer</footer>
            </div>
        ),
        children: [
            {
                path: "/",
                element: <div>Host: /</div>,
            },
            {
                path: "/about",
                element: <div>Host: /about</div>,
            },
            {
                path: "/online-shop/*",
                element: <div id="onlineShopRoot">Host: /online-shop</div>,
            },
            {
                path: "/store-locator/*",
                element: (
                    <div id="storeLocatorRoot">Host: /store-locator</div>
                ),
            },
        ],
    },
]);
```

We'll then modify our App.jsx to import and render the router

```
// host/src/App.jsx

import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
    return <RouterProvider router={router} />;
}

export default App;
```

Next we'll add some minimal styling

```
// host/src/index.css

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

header,
footer {
    height: 60px;
    padding: 0 30px;
    background-color: lightblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header nav {
    display: flex;
    gap: 20px;
}

main {
    padding: 30px;
    height: 250px;
}

footer {
    background-color: lightpink;
}
```

Now if we go back to our host app in the browser, we should have a nav with a link to each of our routes, and the code for each route should render in the main page when that route is active.

![Online Shop](./blog_images/host_scaffolding.PNG)

## Online Shop MFE

Again we will install the routing library, this time Tanstack Router, and set up a minimal router with a few routes. We will use Tanstack Router's [code based routing](https://tanstack.com/router/latest/docs/framework/react/guide/code-based-routing) (as opposed to their alternative, file base routing).

```
// onlineShop/src/router.jsx

import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
    notFoundComponent: () => null,
});

const baseRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/online-shop",
    component: () => (
        <div>
            <div>
                <Link to="/online-shop/products">Products</Link>
            </div>
            <div>
                <Link to="/online-shop/cart">Cart</Link>
            </div>
            <div>
                <Link to="/">Home</Link>
            </div>
            <p>Online Shop: /online-shop</p>
            <Outlet />
        </div>
    ),
});

const productsRoute = createRoute({
    getParentRoute: () => baseRoute,
    path: "products",
    component: () => <div>Online Shop: /online-shop/products</div>,
});

const cartRoute = createRoute({
    getParentRoute: () => baseRoute,
    path: "cart",
    component: () => <div>Online Shop: /online-shop/cart</div>,
});

const routeTree = rootRoute.addChildren([
    baseRoute.addChildren([productsRoute, cartRoute]),
]);

export const router = createRouter({
    routeTree,
});
```

```
// onlineShop/src/App.jsx

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

function App() {
    return <RouterProvider router={router} />;
}

export default App;
```

Note that in the `router.jsx` file, we define a `notFoundComponent` on our root route, to render nothing. Most routing libraries provide a default "not found" component, but we need to override that because we want our Online Shop MFE to render nothing if it somehow gets rendered at a route not starting with `/online-shop`.

Also note that we added a link to `/` in the Tanstack Router. When we click this link, it will route us out of the Online Shop MFE, and back into the host application.

Finally, we need to change the id of the element that we mount the React app inside of, to match the id of the div with `id="onlineShopRoot"` we created in the host app's `/online-shop` route, for mounting the Online Shop MFE. And also change the id of the mount div in the online store's index.html, so it can mount correctly when running independently.

```
// onlineShop/src/main.jsx

createRoot(document.getElementById("onlineShopRoot")).render(<App />);
```

```
// onlineShop/index.html

<div id="onlineShopRoot"></div>
```

## Rendering the Online Shop MFE inside the host app

Now that we have a host application and an MFE, we will try to integrate the MFE into the host application (we'll come back to the 2nd MFE, Store Locator, later on).

We already have a div in which to mount the Online Shop MFE inside of the host application's `/online-shop` route, and starting the host dev server with vite will take care of loading the javascript for the host application, but we need to also load the javascript of the Online Shop MFE to render that application inside of the host, when the route matches `/online-shop/*`.

For now we will use a quick fix in order to have access to the script for the the MFE, inside of the host, and we will return to this problem later on. For now lets just build the MFE, and move the script into the host app's `public` folder:

-   Create a production build of our MFE using `npm run build` from inside the `onlineShop` directory.
-   Find the built js file inside of `onlineShop/dist/assets`. The file name will be different every time, something like `index-mbwqfhvj.js`.
-   Move the above js file inside of the host application's `public` directory.

In order to mount and unmount the Online Shop MFE when we match and un-match the `/online-shop` route in the host, we will implement a script loader component which will fetch and run the script when the `/online-shop` route mounts and unmounts:

```
// host/src/onlineShopLoader.jsx

import { useEffect } from "react";

export function OnlineShopLoader() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `/index-DX0otGb_.js`;
        script.type = "module";
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div id="onlineShopRoot"></div>;
}
```

Note that we set the src of the script to the file name of the MFE build that we moved into the host public folder.

Now lets add the `onlineShopLoader` to our host router, inside the `/online-shop/*` route:

```
// host/src/router.jsx

{
    path: "/online-shop/*",
    element: (
        <div>
            <div>Host: /online-shop</div>
            <OnlineShopLoader />
        </div>
    ),
},
```

So we now have the JS of the MFE linked inside the host application, we should be able to run the host app and see our online shop rendering inside of our host application. Lets take a look, we will run our host app and navigate to the `/online-shop` route using our header link.

![Host](./blog_images/online_shop_inside_host.PNG)

Great, looks like the Online Shop MFE is successfully rendering inside of the host app!

## MFE integration issues

### MFE not rendering after navigating away and back

So we have our Online Shop app rendering at the `/online-shop` route. However, if we then navigate to a different route, and then back to the `/online-shop` route again, we no longer see the Online Shop MFE rendering.

![Host](./blog_images/online_shop_inside_host_renavigate.PNG)

If we open the dev tools "elements" tab while we navigate back and forth to and from the `/online-shop` route, we can see that the MFE script is being added and removed from the dom every time. But the browser is actually caching the script and marking it as "already run", so it doesn't run again on subsequent loads after the first one.

We can fix this by adding a query param with a timestamp to the script src:

```
// host/src/onlineShopLoader.jsx

script.src = `/index-DX0otGb_.js?date=${new Date().getTime()}`;
```

This will prevent the browser caching the script as it will see it as a new script every time it loads, so our MFE will now mount again every time we navigate back to the `/online-shop` route.

### Online Shop MFE not properly unmounting

Lets add a console log to the `/online-shop` route component of our MFE app, to verify that everything is working as expected when we mount and unmount the MFE.

```
// onlineShop/src/router.jsx

const baseRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/online-shop",
    component: () => {
        console.log('Online Shop MFE "/online-shop" route rendered');
```

Note: We then need to rebuild our Online Shop MFE, and re-link the JS script in our host, like we did earlier.

Now if we click back and forth between the "Home" and "Online Shop" header links a few times, we can see that our console log is actually running more times every time we go back to the `/online-shop` route.

This is because although we are removing the dom element that the Online Shop MFE is mounted in, the React tree of the MFE still exists in memory, so the router of the MFE still exists and is still being rendered ("rendered" in terms of React renders, not actually rendering to the dom). Therefore each time we umnount and remount the MFE, we are essentially creating a new version of the MFE router, without removing the previous one from memory.

In order to solve this problem, we can use a method that React DOM adds to the result of it's `createRoot` function, called `unmount`. With a regular React app we don't need to use this method, because we are only rendering one app on the page, and it never needs to be removed and re-added.

So we'll do 2 things in order to call this `unmount` method at the correct time. First we'll update our `onlineShopLoader` in the host app. We'll use `window.postMessage` in the useEffect cleanup function to send a message to the `window` object, in order to notify the MFE that it needs to unmount itself.

```
// host/src/onlineShopLoader.jsx

useEffect(() => {
    const script = document.createElement("script");
    script.src = `/index-D56CCO_z.js?date=${new Date().getTime()}`;
    script.type = "module";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
        window.postMessage("UNMOUNT_ONLINE_SHOP");
        document.body.removeChild(script);
    };
}, []);
```

Then in the Online Shop MFE app, we will update our main.jsx file to store the result of `createRoot` in a variable, and then add a "message" event listener to the window to listen for the "UNMOUNT_ONLINE_SHOP" being posted from the host app. When the MFE receives this message from the host, we will call `root.unmount()`, in order to remove the whole React tree of the MFE from memory.

```
// onlineShop/src/main.jsx

const rootDiv = document.getElementById("onlineShopRoot");
const root = createRoot(rootDiv);
root.render(<App />);

function messageListener(event) {
    if (event.data === "UNMOUNT_ONLINE_SHOP") {
        root.unmount();

        window.removeEventListener("message", messageListener);
    }
}

window.addEventListener("message", messageListener);
```

Now once we rebuild and re-link our MFE, we will see that our console log is now only running once each time we unmount and remount the MFE.

### Host app and MFE routing not in sync

We can successfully navigate to and from our `/online-shop` route, and inside of the MFE, we can also navigate between the `/online-shop/products` and `/online-shop/cart` routes and everything works as expected. But what about if we click our "Home" link inside the MFE app, to navigate back to our `/` route? The URL has changed to `/`, and the MFE is no longer rendering anything, but the host app is still rendering its `/online-shop` page.

![Navigate back to /](./blog_images/navigate_back_to_slash.PNG)

If we look at the elements in the dev tools, we can see that the MFE script has not actually unmounted. This is because there is currently no communication between the two routers in the two separate applications, so the host app's router does not know that the route has changed (because the navigation was done within the MFE). The "router state" in the host app and the actual URL pathname have become out of sync.

We need a way for the host app to listen for route changes within the MFE, and update it's own router state accordingly. For this, we will again use `window.postMessage`.

We'll add a useEffect in the root route of our MFE, which listens for changes to the pathname, and then posts a custom message to the window to notify the host application that there has been a route change. Given that we're adding a "component" to the root route, we need to make sure we return an `<Outlet />` from that component (in Tanstack Router, the default route component is an outlet if none is specified), otherwise none of the child routes will render.

```
// onlineShop/src/router.jsx

function RootRouteComponent() {
    const location = useLocation();

    useEffect(() => {
        window.postMessage("ROUTE_CHANGE");
    }, [location.pathname]);

    return <Outlet />;
}

const rootRoute = createRootRoute({
    notFoundComponent: () => null,
    component: RootRouteComponent,
});
```

Note: We now need to rebuild our Online Shop MFE, and re-link JS again.

Now in our host application, we will add a message event listener on the window, on mount of the root route, which listens for the "ROUTE_CHANGE" message. When this message is received by the host application, we know that a navigation has happened within the MFE, so therefore the URL pathname has changed and is now different to the pathname stored in the router state in our host application. We can then read the new pathname directly from `window.location.pathname`, and trigger a navigation to that new pathname in our host application.

Lets extract our root route "element" out into a component so that we can use a useEffect to add the event listener, and for now we'll just console.log `event.data`, so that we can verify that the route change message is being received by the host app:

```
// host/src/router.jsx

function RootRoute() {
    useEffect(() => {
        function messageListener(event) {
            console.log(event.data);
        }

        window.addEventListener("message", messageListener);

        return () => {
            window.removeEventListener("message", messageListener);
        };
    }, []);

    return (
        <div>
            <header>
                Header
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/online-shop">Online Shop</Link>
                    <Link to="/store-locator">Store Locator</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>Footer</footer>
        </div>
    );
}

export const router = createBrowserRouter([
    {
        element: <RootRoute />,
```

Now if we click the "Online Shop" header link to load up the MFE, and the click "Products" within the MFE navigation, we should see `ROUTE_CHANGE` being logged to the console:

![Route change](./blog_images/route_change_log.PNG)

Now, when we receive that message telling us that the MFE has changed route, lets call the `navigate` function returned from React Router's `useNavigate` hook, in order to sync up our host app router state with the actual URL state. We must also pass the `replace` flag to the `navigate` function, otherwise we would end up with a duplicate entry in the browsers history stack, meaning the browser "back" button wouldn't work correctly.

```
// host/src/router.jsx

function RootRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        function messageListener(event) {
            if (event.data === "ROUTE_CHANGE") {
                navigate(window.location.pathname, { replace: true });
            }
        }
```

Now, if we navigate to our `/online-shop` route, and click the "Home" link inside the MFE app's navigation, the host app now recognizes that we have navigated back to the `/` route, and updates it's UI accordingly, to show it's home page, meaning that we've now successfully synced up the navigation between the two different routers:

![Host home](./blog_images/host_home.PNG)

## Store locator MFE

So now that we have the host app and the Online Shop MFE playing nicely together (both React apps), lets introduce a second MFE into the mix, which as mentioned earlier, will be a Vue application.

I won't go into too much detail about how we create the Vue MFE, as it's pretty similar to our React Online Shop MFE. We will spin up a new Vue app in the `storeLocator` directory by following the Vue JS [quick start guide](https://vuejs.org/guide/quick-start.html). We will then strip out most of the `src` directory, and add some new stuff, so we just have the following files:

```
// storeLocator/src/main.js

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";

const app = createApp(App);
app.use(router);
app.mount("#storeLocatorRoot");
```

```
// storeLocator/src/router.js

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import LocationsView from "./views/LocationsView.vue";
import OpeningHoursView from "./views/OpeningHoursView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/store-locator",
            name: "home",
            component: HomeView,
            children: [
                {
                    path: "/store-locator/locations",
                    name: "locations",
                    component: LocationsView,
                },
                {
                    path: "/store-locator/opening-hours",
                    name: "hours",
                    component: OpeningHoursView,
                },
            ],
        },
    ],
});

export default router;
```

```
// storeLocator/src/App.vue

<script setup>
import { RouterView } from "vue-router";
</script>

<template>
    <RouterView />
</template>
```

```
// storeLocator/src/views/HomeView.vue

<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
    <div>
        <RouterLink to="/store-locator/locations">Locations</RouterLink>
    </div>
    <div>
        <RouterLink to="/store-locator/opening-hours">Opening Hours</RouterLink>
    </div>
    <div>
        <RouterLink to="/">Home</RouterLink>
    </div>

    <div>Store Locator: /store-locator</div>

    <RouterView />
</template>
```

```
// storeLocator/src/views/LocationsView.vue

<template>
    <div>Store Locator: /store-locator/locations</div>
</template>
```

```
// storeLocator/src/views/OpeningHoursView.vue

<template>
    <div>Store Locator: /store-locator/opening-hours</div>
</template>
```

And finally we'll change the id of the root dom node in our html file to match the div id we will use when mounting it as an MFE inside the host:

```
// storeLocator/index.html

<body>
    <div id="storeLocatorRoot"></div>
    <script type="module" src="/src/main.js"></script>
</body>
```

Now if we run the Store Locator MFE and navigate to the `/store-locator/locations` route, we should see a similar structure to what our Online Shop MFE renders:

![Host home](./blog_images/vue_mfe.PNG)

## Rendering the Store Locator MFE inside the host app

Now we need to add a `storeLocatorLoader` component to handle the loading and unloading of the Store Locator MFE, just like we did for the Online Shop MFE. Lets create that component and add it to our host app's router, inside the `/store-locator/*` route:

```
// host/src/storeLocatorLoader.jsx

import { useRef } from "react";
import { useEffect } from "react";

export function StoreLocatorLoader() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `/index-CAZf1r2y.js?date=${new Date().getTime()}`;
        script.type = "module";
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            window.postMessage("UNMOUNT_STORE_LOCATOR");
            document.body.removeChild(script);
        };
    }, []);

    return <div id="storeLocatorRoot"></div>;
}
```

```
// host/src/router.jsx

{
    path: "/store-locator/*",
    element: (
        <div>
            <div>Host: /store-locator</div>
            <StoreLocatorLoader />
        </div>
    ),
},
```

Next we just need to listen for that `UNMOUNT_STORE_LOCATOR` window message, in the Store Locator MFE, and then call the `unmount` function from Vue, just like we did for the React MFE:

```
// storeLocator/src/main.js

const app = createApp(App);
app.use(router);
app.mount("#storeLocatorRoot");

function messageListener(event) {
    if (event.data === "UNMOUNT_STORE_LOCATOR") {
        app.unmount();

        window.removeEventListener("message", messageListener);
    }
}

window.addEventListener("message", messageListener);
```

Next, lets build our Vue MFE using the Vue build command via `npm run build`. Then, like we did for the Online Shop MFE, we will move the generated JS file into the host app's public folder, and link it in the `storeLocatorLoader.jsx` file in the host.

Now if we run our host app and navigate to the `/store-locator` route by clicking Store Locator in the header, we should see our Store Locator MFE rendering within the host application, along with the MFE's child routes, visible if we click the "Locations" link inside the MFE navigation.

![Host with Vue MFE](./blog_images/host_with_vue_mfe.PNG)

Finally, we need to handle the same issue we had with our Online Shop MFE, where the host was not aware that a navigation had been performed by the MFE's router. Lets follow a similar pattern within the Store Locator MFE, to notify the host app of the route change. The `ROUTE_CHANGE` message listener that we added to the host app already should handle this for us, we just need to post the `ROUTE_CHANGE` message from within the Store Locator MFE every time we navigate.

To achieve this with the Vue router, we can add an `afterEach` hook to the router:

```
// storeLocator/src/router.js

router.afterEach(() => {
    window.postMessage("ROUTE_CHANGE");
});

export default router;
```

Lets rebuild our Vue MFE, re-link in the host, and then navigate back to the `/store-locator` route in the host app. If we then click the "Home" link inside the Store Locator MFE's navigation, it navigates us back to the `/` route in the host, and the "Host: /" page is displayed, telling us that the host app successfully recognized the navigation from with the Store Locator MFE.

## Decoupling deployments

So we've now got the whole setup working correctly. We have our host app running, and loading our two MFEs at runtime and rendering them when their respective routes are triggered. However we still have the issue to solve that we skipped over earlier. Currently if we make changes to either of the MFEs, we then have to also make a change in our host app (linking the JS files) in order to pull in the new version of the MFE.

Lets fix that now. What we want to do is have some way to have the host application, when it needs to load one of the MFEs, query some other server to fetch the JS for the MFE it needs, but have that be served from the same URL every time, so that if we make changes to one of our MFEs and re-deploy it, the host will automatically pull in the new version of the MFE without requiring any code changes itself.

To achieve this, we will spin up a simple [Express](https://expressjs.com/) server to serve our MFE JS files with. We can create an endpoint to send back the JS file we have deployed for each particular MFE, when that MFE is queried by the host.

Firstly, lets navigate into our `host` directory, and install express and cors with `npm i express cors`. We need the `cors` package so that we don't get a cors error when requesting a script on a different domain (different port on localhost).

Next we will spin up a bare bones express server with one endpoint (`GET - /assets/:mfeName`), and have that endpoint look for a JS file with the name of the MFE being queried inside an `assets` folder, read in the JS file contents, and send it back in the response with a `Content-Type: text/javascript` header:

```
// host/server/index.js

import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());

app.get("/assets/:mfeName", (req, res) => {
    res.setHeader("Content-Type", "text/javascript");
    const js = fs.readFileSync(`./server/assets/${req.params.mfeName}.js`);
    res.send(js);
});

app.listen(4000, () => console.log("server listening on port 4000"));
```

Then, we will take each built JS file from our two MFEs, move them both inside `host/server/assets`, and rename them to the name of the MFEs. So the JS file from the Online Shop MFE would now become `host/server/assets/onlineShop.js`, and the JS file from the Store Locator MFE becomes `host/server/assets/storeLocator.js`.

Finally we need to update our `OnlineShopLoader` and `StoreLocatorLoader` components to now fetch the JS for their respective MFE from the express endpoint. This means that we can now have the host always just hit the same endpoint, and get back the latest deployed version of the MFEs:

```
// host/src/storeLocatorLoader.jsx

useEffect(() => {
    const script = document.createElement("script");
    script.src = `http://localhost:4000/assets/storeLocator?date=${new Date().getTime()}`;
```

```
// host/src/onlineShopLoader.jsx

useEffect(() => {
    const script = document.createElement("script");
    script.src = `http://localhost:4000/assets/onlineShop?date=${new Date().getTime()}`;
```

Note: We still need the timestamp as a query param so that the browser doesn't cache the script requests.

Now we can run both our host frontend with `npm run dev` (from inside the `host` directory), and our host express server with `node ./server/index.js` at the same time. If we navigate to `/online-shop` and `/store-locator`, we should see that the respective MFEs are still loaded and unloaded correctly.

![MFEs with Express](./blog_images/mfes_with_express.PNG)

Now comes the magic! If we navigate to the host app in the browser and go to the `/store-locator/locations` route, we see the Locations View UI, which currently just displays the App name and the route we are on:

![Store Locator locations](./blog_images/store_locator_locations.PNG)

Next lets add some locations to our Store Locator MFE's "locations" page:

```
// storeLocator/src/views/LocationsView.vue

<template>
    <div>
        <div>Store Locator: /store-locator/locations</div>
        <h2>Lets see some of the locations</h2>
        <p>London</p>
        <p>Tokyo</p>
        <p>Paris</p>
        <p>New York</p>
    </div>
</template>
```

Now lets rebuild the Store Locator MFE and redploy the built js to the host server assets folder. If we now go back to the browser and refresh the `/store-locator/locations` route, we can see our list of locations, without having to make any changes to the host applications code, or redploy the host app!

![Store Locator locations with list](./blog_images/store_locator_locations_with_list.PNG)

## Summary

So there we've seen an example of how we can have three separate applications, written with different frontend frameworks, using different routers, and bring them all together on same webpage, while having the ability to deploy each application separately without having to update anything in the other applications.

This was a pretty minimal, "hand rolled" example of one way to achieve this, but there are existing tools out there such as Module Federation, and Single-SPA, which can help us overcome some of the issues faced when trying to implement Micro Frontends. Maybe I'll explore those tools in a future blog post, but I always believe it's good to try and understand the abstractions in a deeper way by figuring out how they work, and trying to achieve a similar result with a relatively "from scratch" solution. Even if it's just for learning purposes.

The full code for this project can be found here [https://github.com/jbower493/manual_micro_frontends](https://github.com/jbower493/manual_micro_frontends).
