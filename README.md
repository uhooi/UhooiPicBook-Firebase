# UhooiPicBook-Firebase

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
- https://github.com/firebase/quickstart-nodejs/tree/master/firestore-emulator/typescript-quickstart
- https://github.com/mogaming217/youtube-simple-todo-sample
