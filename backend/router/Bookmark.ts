import * as express from 'express'
import { knex } from '../dbConnect'

class Bookmark {
  router = () => {
    const router = express.Router();
    router.post('/create', this.createBookmark); // create bookmark and insert note into bookmark, first creation
    router.get('/show', this.showbookmark); // show bookmark
    router.post('/insertnote/:bookmarkid', this.insertNote); // create bookmark and insert note into bookmark, after bookmark created
    router.get('/user/bookmark/:bookmarkid', this.custombookmark) // show notes of the bookmark, custom bookmark
    router.get('/user/draft', this.draftbookmark) // show all draft notes of the user by clicking draft button
    router.get('/user/publish', this.publishbookmark) // show all draft notes of the user by clicking draft button
    return router;
  }

  // router.post('/create', this.createBookmark);
  // create bookmark and insert note into bookmark, first creation
  private createBookmark = (req: express.Request, res: express.Response) => {
    return knex.transaction((trx) => {
      knex.insert({
        bookmarkname: req.body.bookmarkname,
        userID: (req.user) ? req.user.id : null
      }, "id").into("bookmark")
        .transacting(trx)
        .then((ids) => {
          console.log(ids);
          // create batchinsert array
          const noteListArray = [];
          const batchSize = 30;

          for (let i = 0; i < req.body.noteList.length; i++) { // noteList from req.body
            noteListArray.push({
              bookmarkid: ids[0],
              noteid: req.body.noteList[i].noteID
            })
          }
          console.log(noteListArray)
          return knex.batchInsert("bookmarkrelation", noteListArray, batchSize)
            .transacting(trx).returning("bookmarkid")
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }).then((ids) => {
      res.json({
        userID: (req.user) ? req.user.id : null,
        id: ids[0],
        bookmarkname: req.body.bookmarkname
      })
    }).catch((err) => {
      res.json(err)
    })
  }

  // router.get('/bookmarks', this.showbookmark);
  // show bookmark
  private showbookmark = (req: express.Request, res: express.Response) => {
    let query = knex.select("*").from("bookmark").where("userID", (req.user) ? req.user.id : null);
    query.then((rows) => {
        res.json(rows)
    }).catch((err) => {
      res.json(err)
    })
  }

  // router.post('/insertnote/:bookmarkid', this.insertNote);
  // create bookmark and insert note into bookmark, after bookmark created
  private insertNote = (req: express.Request, res: express.Response) => {
    let query = knex.select("*").from("bookmark").where("id", req.params.bookmarkid);
    query.then((rows) => {
      console.log(rows)
      if (rows.length == 0) {
        res.json({ err: "wrong handling..." })
      } else {
        res.json({ msg: "success" })
      }
    })
  }

  // router.get('/user/:userid/bookmark/:bookmarkid', this.custombookmark)
  // show notes of the bookmark, custom bookmark
  private custombookmark = (req: express.Request, res: express.Response) => {
    return knex.select("bookmark.id as bookmarkid", "bookmark.bookmarkname", "bookmark.userID", knex.raw('ARRAY_AGG(ROW_TO_JSON(tcom)) as notes'))
      .from("bookmark")
      .innerJoin("bookmarkrelation", "bookmark.id", "bookmarkrelation.bookmarkid")
      .innerJoin(knex.select("notes.id as noteID", "notes.userID", "notes.status", "notes.note_title", "users.firstName", "users.lastName", "t1.imagelinks as imagelinks", "t2.tags")
        .from("notes")
        .innerJoin(knex.select("notes.id", knex.raw('array_agg(notesimage.imageurl) as imagelinks'))
          .from("notes")
          .innerJoin("notesimage", "notes.id", "notesimage.noteID")
          .groupBy("notes.id")
          .as("t1"), 'notes.id', 't1.id')
        .leftJoin(knex.select("notes.id", knex.raw('array_agg(tags.notetags) as tags'))
          .from("notes")
          .innerJoin("tags", "notes.id", "tags.noteID")
          .groupBy("notes.id")
          .as("t2"), 'notes.id', 't2.id')
        .innerJoin("users", "notes.userID", "users.id")
        .groupBy("notes.id", "notes.userID", "notes.status", "notes.note_title", "users.firstName", "users.lastName", "t1.imagelinks", "t2.tags")
        .whereNot("notes.status", "draft")
        .as("tcom"), "bookmarkrelation.noteid", "tcom.noteID")
      .where({
        "bookmark.userID": (req.user) ? req.user.id : null,
        "bookmark.id": req.params.bookmarkid
      })
      .groupBy("bookmark.id", "bookmark.bookmarkname", "bookmark.userID")
      .then((rows) => {
        res.json(rows)
      })
      .catch((err) => {
        console.log(err)
        res.json(err)
      })
  }

  // router.get('/user/draft', this.defaultbookmark)
  // show all draft notes of the user by clicking draft button
  private draftbookmark = (req: express.Request, res: express.Response) => {
    return knex.select("notes.id as noteID", "notes.status", "notes.note_title", "users.firstName", "users.lastName", "users.id as userID", "t1.imagelinks", "t2.tags")
      .from("notes")
      .innerJoin("users", "notes.userID", "users.id")
      .innerJoin(knex.select("notes.id", knex.raw('array_agg(notesimage.imageurl) as imagelinks'))
        .from("notes")
        .innerJoin("notesimage", "notes.id", "notesimage.noteID")
        .groupBy("notes.id")
        .as("t1"), 'notes.id', 't1.id')
      .leftJoin(knex.select("notes.id", knex.raw('array_agg(tags.notetags) as tags'))
        .from("notes")
        .innerJoin("tags", "notes.id", "tags.noteID")
        .groupBy("notes.id")
        .as("t2"), 'notes.id', 't2.id')
      .groupBy("notes.id", "notes.status", "notes.note_title", "users.firstName", "users.lastName", "users.id", "t1.imagelinks", "t2.tags")
      .where({
        "notes.status": "draft",
        "users.id": (req.user) ? req.user.id : null,
      })
      .orderBy("notes.id")
      .then((rows) => {
        res.json(rows)
      })
      .catch((err) => {
        console.log(err)
        res.json(err)
      })
  }

  // router.get('/user/publish', this.defaultbookmark)
  // show all draft notes of the user by clicking draft button
  private publishbookmark = (req: express.Request, res: express.Response) => {
    return knex.select("notes.id as noteID", "notes.status", "notes.note_title", "users.firstName", "users.lastName", "users.id as userID", "t1.imagelinks", "t2.tags")
      .from("notes")
      .innerJoin("users", "notes.userID", "users.id")
      .innerJoin(knex.select("notes.id", knex.raw('array_agg(notesimage.imageurl) as imagelinks'))
        .from("notes")
        .innerJoin("notesimage", "notes.id", "notesimage.noteID")
        .groupBy("notes.id")
        .as("t1"), 'notes.id', 't1.id')
      .leftJoin(knex.select("notes.id", knex.raw('array_agg(tags.notetags) as tags'))
        .from("notes")
        .innerJoin("tags", "notes.id", "tags.noteID")
        .groupBy("notes.id")
        .as("t2"), 'notes.id', 't2.id')
      .groupBy("notes.id", "notes.status", "notes.note_title", "users.firstName", "users.lastName", "users.id", "t1.imagelinks", "t2.tags")
      .where({
        "notes.status": "publish",
        "users.id": (req.user) ? req.user.id : null,
      })
      .orderBy("notes.id")
      .then((rows) => {
        res.json(rows)
      })
      .catch((err) => {
        console.log(err)
        res.json(err)
      })
  }
}

export { Bookmark }
