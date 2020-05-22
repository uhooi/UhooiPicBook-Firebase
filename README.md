# UhooiPicBook-Firebase

[![](https://github.com/uhooi/UhooiPicBook-Firebase/workflows/CI/badge.svg)](https://github.com/uhooi/UhooiPicBook-Firebase/actions?query=workflow%3ACI)
[![License](https://img.shields.io/github/license/uhooi/UhooiPicBook-Firebase)](https://github.com/uhooi/UhooiPicBook-Firebase/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fthe_uhooi)](https://twitter.com/the_uhooi)

![logo](./docs/logo.png)

Testing Firestore security rules for Uhooi's character book.

## Environment

- Node.js: v12.14.0
- npm: 6.13.4

## Setup

1. Clone the project.

```
$ git clone https://github.com/uhooi/UhooiPicBook-Firebase.git
$ cd UhooiPicBook-Firebase
```

2. Install Firebase CLI.

```
$ npm install -g firebase-tools
```

3. Install the emulator.

```
$ firebase setup:emulators:firestore
```

4. Install packages managed by npm.

```
$ npm install
```

## Testing

Run `npm test` .

## References

- https://firebase.google.com/docs/cli/
- https://firebase.google.com/docs/firestore/security/test-rules-emulator
- https://firebase.google.com/docs/firestore/security/rules-structure
- https://github.com/firebase/quickstart-nodejs/tree/master/firestore-emulator/typescript-quickstart
- https://github.com/mogaming217/youtube-simple-todo-sample
- https://techlife.cookpad.com/entry/2018/11/05/143000
