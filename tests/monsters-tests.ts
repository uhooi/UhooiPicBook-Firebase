import * as firebase from '@firebase/testing'
import * as fs from 'fs'

//#region Types

type Auth = {
  uid?: string,
  [key: string]: any
}

type Monster = {
  name: string,
  description: string,
  base_color: string,
  icon_url: string,
  dancing_url: string,
  order: number
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
      const monster = createTestMonster()

      await firebase.assertFails(db.collection('monsters').doc('uhooi').set(monster))
    })
  })

  describe('update', () => {
    it('can not update', async () => {
      await configureTestData('monsters', 'uhooi')
      const db = authedApp(null)
      const monster = createTestMonster()

      await firebase.assertFails(db.collection('monsters').doc('uhooi').update(monster))
    })
  })

  describe('delete', () => {
    it('can not delete', async () => {
      await configureTestData('monsters', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('monsters').doc('uhooi').delete())
    })
  })

  describe('get', () => {
    it('can not get', async () => {
      await configureTestData('monsters', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('monsters').doc('uhooi').get())
    })
  })
  
  describe('list', () => {
    it('can get list', async () => {
      await configureTestData('monsters', 'uhooi')
      const db = authedApp(null)

      await firebase.assertSucceeds(db.collection('monsters').get())
    })
  })

  describe('/document/subcollection', () => {
    describe('create', () => {
      it('can not create', async () => {
        await configureTestData('monsters', 'document')
        const db = authedApp(null)
        const monster = createTestMonster()
  
        await firebase.assertFails(db.collection('monsters').doc('document').collection('subcollection').doc('uhooi').set(monster))
      })
    })
  
    describe('update', () => {
      it('can not update', async () => {
        await configureSubCollectionTestData('monsters', 'document', 'subcollection', 'uhooi')
        const db = authedApp(null)
        const monster = createTestMonster()
  
        await firebase.assertFails(db.collection('monsters').doc('document').collection('subcollection').doc('uhooi').update(monster))
      })
    })
  
    describe('delete', () => {
      it('can not delete', async () => {
        await configureSubCollectionTestData('monsters', 'document', 'subcollection', 'uhooi')
        const db = authedApp(null)
  
        await firebase.assertFails(db.collection('monsters').doc('document').collection('subcollection').doc('uhooi').delete())
      })
    })
  
    describe('get', () => {
      it('can not get', async () => {
        await configureSubCollectionTestData('monsters', 'document', 'subcollection', 'uhooi')
        const db = authedApp(null)
  
        await firebase.assertFails(db.collection('monsters').doc('document').collection('subcollection').doc('uhooi').get())
      })
    })
    
    describe('list', () => {
      it('can not get list', async () => {
        await configureSubCollectionTestData('monsters', 'document', 'subcollection', 'uhooi')
        const db = authedApp(null)
  
        await firebase.assertFails(db.collection('monsters').doc('document').collection('subcollection').get())
      })
    })
  })
})

describe('/others', () => {
  describe('create', () => {
    it('can not create', async () => {
      const db = authedApp(null)
      const monster = createTestMonster()

      await firebase.assertFails(db.collection('others').doc('uhooi').set(monster))
    })
  })

  describe('update', () => {
    it('can not update', async () => {
      await configureTestData('others', 'uhooi')
      const db = authedApp(null)
      const monster = createTestMonster()

      await firebase.assertFails(db.collection('others').doc('uhooi').update(monster))
    })
  })

  describe('delete', () => {
    it('can not delete', async () => {
      await configureTestData('others', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('others').doc('uhooi').delete())
    })
  })

  describe('get', () => {
    it('can not get', async () => {
      await configureTestData('others', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('others').doc('uhooi').get())
    })
  })
  
  describe('list', () => {
    it('can not get list', async () => {
      await configureTestData('others', 'uhooi')
      const db = authedApp(null)

      await firebase.assertFails(db.collection('others').get())
    })
  })
})

//#endregion

//#region Other Methods

function configureTestData(collectionId: string, documentId: string) {
  const db = adminApp

  return db.collection(collectionId).doc(documentId).set(createTestMonster())
}

function configureSubCollectionTestData(collectionId: string, documentId: string, subCollectionId: string, subDocumentId: string) {
  const db = adminApp

  return db.collection(collectionId).doc(documentId).collection(subCollectionId).doc(subDocumentId).set(createTestMonster())
}

function createTestMonster(): Monster {
  return {
    name: 'uhooi',
    description: 'ゆかいな　みどりの　せいぶつ。\nわるそうに　みえるが　むがい。',
    base_color: '#FFFFFF',
    icon_url: 'https://example.com/example.png',
    dancing_url: 'https://example.com/example.gif',
    order: 1
  }
}

//#endregion
