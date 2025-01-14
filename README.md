[![Netlify Status](https://api.netlify.com/api/v1/badges/1026fc08-b879-4046-a480-cb6a29055fe0/deploy-status)](https://app.netlify.com/sites/adoring-mayer-6eabd9/deploys)

**NeetoUI** is the library that drives the experience in all Neeto products built at [BigBinary](https://www.bigbinary.com).

## Installation

```
yarn add @bigbinary/neetoui
```

This would install `neetoui` package inside your application.
Starting `3.0.x`, neetoUI stylesheet has been separated from the bundle. To get the styles working, please import the neetoUI stylesheet to your main `scss` entry point.

```scss
@import "@bigbinary/neetoui";
```

**NeetoUI** has few peer dependencies which are required to use NeetoUI properly. Install the peer dependencies using the below command:

```
yarn add react-toastify@8.0.2 formik@2.2.0 react-router-dom@5.2.0 react-router-nav-prompt@0.4.1
```

**NeetoUI** depends on `react-toastify` for Toasters, so the styles for toaster must be imported to your main `scss` entry point.

```scss
@import "react-toastify/dist/ReactToastify.min.css";
```

Also make sure to include `<ToastContainer />` in your application.

```jsx
import React from "react";

import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      // Other children
    </>
  );
};
```

## Development

Install all the dependencies by executing following command.

```
yarn
```

You can create new components in the `lib/components` and export them from `lib/index.js`.

Running the `yarn storybook` command starts a storybook app. Use this application to test out changes. Note that nothing in the `stories` folder will be bundled with NeetoUI.

## Building

NeetoUI gets auto-published to npm on new commit to master. You can checkout the `publish` workflow in git actions to get a live update.

## Documentation

Read the docs here

https://neetoui.netlify.app

## Theming

Theme override gist: [Override Gist](https://gist.github.com/goutham-subramanyam/d0619f8d089b10e7474a32478110ea0f)

## Other Libraries

- [neetoIcons](https://github.com/bigbinary/neeto-icons): **NeetoIcons** is the official icons library from BigBinary.
- [neetoUtils](https://github.com/bigbinary/neeto-utils): **NeetoUtils** is a collection of react hooks and utility functions used at BigBinary.
