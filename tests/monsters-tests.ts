import * as firebase from '@firebase/testing'
import * as fs from 'fs'

//#region Types

type Auth = {
  uid?: string,
  [key: string]: any
}

//#endregion

//#region Consts

const projectId = 'uhooipicbook'
const databaseName = 'uhooipicbook'
const rules = fs.readFileSync('./firestore.rules', 'utf8')
const authedApp = (auth?: Auth) => firebase.initializeTestApp({ projectId: projectId, databaseName, auth }).firestore()
const adminApp =firebase.initializeAdminApp({ projectId: projectId, databaseName }).firestore()
const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectId}:ruleCoverage.html`

//#endregion

//#region TestCase Life-Cycle Methods

beforeAll(async () => {
  await firebase.loadFirestoreRules({ projectId: projectId, rules })
})

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: projectId })
})

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()))
  console.log(`View rule coverage information at ${coverageUrl}\n`)
})

//#endregion

//#region Test Methods

describe('/monsters', () => {
  describe('create', () => {
    it('can not create', async () => {
      const db = authedApp(null)

      await firebase.assertFails(db.collection('monsters').doc('uhooi').set({
        name: 'uhooi',
        description: 'ゆかいな　みどりの　せいぶつ。\nわるそうに　みえるが　むがい。',
        base_color: '#FFFFFF',
        icon_url: 'https://example.com/example.png',
        dancing_url: 'https://example.com/example.gif',
        order: 1
      }))
    })
  })

  describe('update', () => {
    it('can not update', async () => {
      createTestData('monsters', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('monsters').doc('uhooi').set({
        name: 'uhooi',
        description: 'ゆかいな　みどりの　せいぶつ。\nわるそうに　みえるが　むがい。',
        base_color: '#FFFFFF',
        icon_url: 'https://example.com/example.png',
        dancing_url: 'https://example.com/example.gif',
        order: 1
      }))
    })
  })

  describe('delete', () => {
    it('can not delete', async () => {
      createTestData('monsters', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('monsters').doc('uhooi').delete())
    })
  })

  describe('get', () => {
    it('can not get', async () => {
      createTestData('monsters', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('monsters').doc('uhooi').get())
    })
  })
  
  describe('list', () => {
    it('can get list', async () => {
      createTestData('monsters', 'uhooi')
      const db = authedApp(null)

      await firebase.assertSucceeds(db.collection('monsters').get())
    })
  })
})

describe('/others', () => {
  describe('create', () => {
    it('can not create', async () => {
      const db = authedApp(null)

      await firebase.assertFails(db.collection('others').doc('uhooi').set({
        name: 'uhooi',
        description: 'ゆかいな　みどりの　せいぶつ。\nわるそうに　みえるが　むがい。',
        base_color: '#FFFFFF',
        icon_url: 'https://example.com/example.png',
        dancing_url: 'https://example.com/example.gif',
        order: 1
      }))
    })
  })

  describe('update', () => {
    it('can not update', async () => {
      createTestData('others', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('others').doc('uhooi').set({
        name: 'uhooi',
        description: 'ゆかいな　みどりの　せいぶつ。\nわるそうに　みえるが　むがい。',
        base_color: '#FFFFFF',
        icon_url: 'https://example.com/example.png',
        dancing_url: 'https://example.com/example.gif',
        order: 1
      }))
    })
  })

  describe('delete', () => {
    it('can not delete', async () => {
      createTestData('others', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('others').doc('uhooi').delete())
    })
  })

  describe('get', () => {
    it('can not get', async () => {
      createTestData('others', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('others').doc('uhooi').get())
    })
  })
  
  describe('list', () => {
    it('can not get list', async () => {
      createTestData('others', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('others').get())
    })
  })
})

//#endregion

//#region Other Methods

function createTestData(collectionId: string, documentId: string) {
  const db = adminApp

  db.collection(collectionId).doc(documentId).set({
    name: 'uhooi',
    description: 'ゆかいな　みどりの　せいぶつ。\nわるそうに　みえるが　むがい。',
    base_color: '#FFFFFF',
    icon_url: 'https://example.com/example.png',
    dancing_url: 'https://example.com/example.gif',
    order: 1
  })
}

//#endregion