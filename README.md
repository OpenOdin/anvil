# OpenOdin Anvil

An application for exploring and forging OpenOdin data.

# Technical
Anvil is a RiotJS application with TypeScript support.

All components are located in `./src/components`. The directory structure is as:  

```sh
./src/components/anvil
    |
    |- anvil.riot (HTML goes here, style OK to include here, but script should only be two-three lines, see below)
    |- Anvil.ts (the components controller extending RiotBase from riotjs-simple-typescript)
    |- Anvil.js (transpiled from Anvil.ts, do not touch)
    |- anvil.css (CSS specific for the anvil tag and must be imported from the .riot file)
    |   Note that any `:host {}` styling must still be done in the `.riot` file.
    |- demo.ts (entry point for when building in demo mode using the build-demo.sh script
    |- test/ (TypeScript mocha test files here).
    |- README.md (markdown document explaining the specific component)
```

The `<script>` tag in the anvil.riot file should be:  

```html
<script>
    import "./anvil.css";
    import {Anvil} from "./Anvil";

    return new Anvil();
</script>
```

This will import the transpiled `Anvil.js` file from the same directory.

The `Anvil.ts` file looks like:  

```ts
import {
    RiotBase,
} from "riotjs-simple-typescript";

export interface AnvilProps {}

export interface AnvilState {}

export class Anvil extends RiotBase<AnvilProps, AnvilState> {
    protected onMounted(props: AnvilProps, state: AnvilState) {
    }
}
```

We register all global components in the file `./src/includes.ts`.

The `demo.ts` files do not have to rely on `./src/includes.ts`, but can use them if they want too.  

## Building

### Build TypeScript
Whenever any TypeScript file is updated run `npm run tsc`. This compiles all `.ts` files and the results are stored as `.js` files alongside the `.ts` files.

### Build RiotJS
Whenever the `.riot` or `.css` are changed or when the `.js` files have been rerendered run `npm run build-app` to build the RiotJS application.

### Build components in demo mode

When developing a specific component you can build the app using that components `demo.ts` file as entry point:  

```sh
./build-demo.sh anvil-404
```

The example above will build the app using `./src/components/anvil-404/demo.ts` as entry point. The `demo.ts` needs to setup required prerequisites and mount the component.

## Build typescript and riotjs app in dev mode

`npm run build`

## Serve locally watching for changes in dev mode

`npm run watch`

## Build release

`npm run release`

## Serve
Serve the `./dist` dir as you wish.  
Example `cd dist && python -m http.server 8000`.

## Testing
All components controllers should be tested using mocha.
`.riot` files are to be treated as views and not contain any logic. Any action within the HTML
which effects state must be done so by calling a function in the controller. Keeping to this pattern
will make components testable.

When testing componenets, the `.riot` templates are rendered in-mem using `linkedom` and the controllers can interact with the UI as if they are running inside riot for example by doing `this.$("#some-elm").value = "hello"`.

However, if your controller logic depends on reading the value from an HTML input element then do not init the value of that element using `<input id="name" value={props.name} />`, because when rendering the view using `linkedom` riotjs expressions are not parsed and the controller will not read back the `elm.value` as expected (it will simply read "{props.name}").

So for those elements, init their values on `onMounted`, as:  

```js
onMounted(props, state) {
    this.$("#name").value = props.name;
}
```

In this way the controllers can run in the test environment as expected.

In the event of `props.name` being updated while the component is mounted you can detect this and re-init the value of the element, just as riot does when values change.

To detect changes in `props` one could for example use the `shouldUpdate(newProps, oldProps)` function, or some other way of observing the `props` values.
