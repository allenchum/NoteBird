import * as express from 'express'
import { knex } from '../dbConnect'

class NoteAndPinRouter {
  router = () => {
    const router = express.Router();
    router.post('/', this.writeNPs); // wrting and updating the note from create route
    router.get('/allUsers/allNotes', this.allNotes) // return all notes of all users
    router.get('/userNote', this.userNotes) // return first match of each notes of current user
    router.get('/userNote/published', this.userNotesPublished) // return first match of each notes of current user, status publish
    router.get('/note/:id', this.getNPs) // current user's specific note with id
    router.get('/user/:userID/note/:noteID', this.getUserNote) // other user's spcific note with id
    return router;
  }

  //    router.post('/', this.writeNPs); // wrting and updating the note from create route
  private writeNPs = (req: express.Request, res: express.Response) => {
    if (req.body.noteID == null) { // first insert
      return knex.transaction((trx) => {
        knex.insert({
          note_title: req.body.title,
          //        note_description: req.body.description, // there's no such thing in object yet
          status: req.body.status,
          userID: (req.user) ? req.user.id : null,
        }, "id").into("notes")
          .transacting(trx)
          .then((ids) => {
            const imageListArrayRow = [];
            const batchSize = 30;

            for (let i = 0; i < req.body.imageList.length; i++) {
              imageListArrayRow.push({
                coords_0: req.body.imageList[i].coords[0],
                coords_1: req.body.imageList[i].coords[1],
                dragging: req.body.imageList[i].dragging,
                offs_0: req.body.imageList[i].offs[0],
                offs_1: req.body.imageList[i].offs[1],
                imageurl: req.body.imageList[i].url,
                style_top: req.body.imageList[i].style.top,
                style_left: req.body.imageList[i].style.left,
                style_height: req.body.imageList[i].style.height,
                style_width: req.body.imageList[i].style.width,
                style_border: req.body.imageList[i].style.border,
                noteID: ids[0],
              })
            };

            return knex.batchInsert("notesimage", imageListArrayRow, batchSize)
              .transacting(trx)
              .returning("noteID")
          }).then((ids) => {
            const pinListArrayRow = [];
            const batchSize = 50;

            for (let i = 0; i < req.body.pinList.length; i++) {
              pinListArrayRow.push({
                p1_0_: req.body.pinList[i].p1[0],
                p1_1_: req.body.pinList[i].p1[1],
                pt_dragging: req.body.pinList[i].dragging,
                title: req.body.pinList[i].title,
                content: req.body.pinList[i].content,
                p2_0_: req.body.pinList[i].p2[0],
                p2_1_: req.body.pinList[i].p2[1],
                length: req.body.pinList[i].length,
                angle: req.body.pinList[i].angle,
                pt_style_Height: req.body.pinList[i].style.height,
                pt_style_Width: req.body.pinList[i].style.width,
                style_background_color: req.body.pinList[i].style["background-color"],
                style_position: req.body.pinList[i].style.position,
                pt_style_Top: req.body.pinList[i].style.top,
                pt_style_Left: req.body.pinList[i].style.left,
                style_transform: req.body.pinList[i].style.transform,
                style_transform_origin: req.body.pinList[i].style["transform-origin"],
                style_textboxupright_transform: req.body.pinList[i].textboxUpright.transform,
                style_textboxposition_top: req.body.pinList[i].textboxPosition.top,
                style_textboxposition_left: req.body.pinList[i].textboxPosition.left,
                noteID: ids[0],
              })
            };
            return knex.batchInsert("points", pinListArrayRow, batchSize)
              .transacting(trx).returning("noteID")
          }).then((ids) => {
            if (req.body.tagsList.length > 0) {

              const tagsListArray = [];
              const batchSize = 30;

              for (let i = 0; i < req.body.tagsList.length; i++) {
                tagsListArray.push({
                  notetags: req.body.tagsList[i],
                  noteID: ids[0],
                })
              }
              return knex.batchInsert("tags", tagsListArray, batchSize)
                .transacting(trx).returning("noteID")
            } else {
              return ids;
            }
          }).then(trx.commit)
          .catch(trx.rollback)
      }).then((ids) => {
        res.json({
          status: req.body.status,
          noteID: ids[0]
        })
      }).catch((err) => {
        console.log(err);
        res.json(err)
      })

    } else { // delete all entries and update tables
      // delete first
      console.log('noteId is, ', req.body.noteID);
      return knex.transaction((trx) => {
        return knex("notesimage").transacting(trx).where("noteID", req.body.noteID).del()
          .then(() => knex("points").where("noteID", req.body.noteID).del()
            .transacting(trx)
          ).then(() => {
            let query = knex.select("*").from("tags").where("noteID", "=", req.body.noteID);
            return query.then((rows) => {
              if (rows.length > 0) {
                return knex("tags").where("noteID", req.body.noteID).del()
                  .transacting(trx)
              } else {
                return;
              }
            })
          }).then(() => {
            return knex("notes").where("id", req.body.noteID).del()
              .transacting(trx)
            //update
          }
          ).then(() => {
            return knex.insert({
              note_title: req.body.title,
              //        note_description: req.body.description, // there's no such thing in object yet
              status: req.body.status,
              userID: (req.user) ? req.user.id : null,
            }, "id").into("notes")
              .transacting(trx)
          }).then((ids) => {
            console.log("after first trx", ids)
            const imageListArrayRow = [];
            const batchSize = 30;

            for (let i = 0; i < req.body.imageList.length; i++) {
              imageListArrayRow.push({
                coords_0: req.body.imageList[i].coords[0],
                coords_1: req.body.imageList[i].coords[1],
                dragging: req.body.imageList[i].dragging,
                offs_0: req.body.imageList[i].offs[0],
                offs_1: req.body.imageList[i].offs[1],
                imageurl: req.body.imageList[i].url,
                style_top: req.body.imageList[i].style.top,
                style_left: req.body.imageList[i].style.left,
                style_height: req.body.imageList[i].style.height,
                style_width: req.body.imageList[i].style.width,
                style_border: req.body.imageList[i].style.border,
                noteID: ids[0],
              })
            };

            return knex.batchInsert("notesimage", imageListArrayRow, batchSize)
              .transacting(trx)
              .returning("noteID")
          }).then((ids) => {
            const pinListArrayRow = [];
            const batchSize = 50;

            for (let i = 0; i < req.body.pinList.length; i++) {
              pinListArrayRow.push({
                p1_0_: req.body.pinList[i].p1[0],
                p1_1_: req.body.pinList[i].p1[1],
                pt_dragging: req.body.pinList[i].dragging,
                title: req.body.pinList[i].title,
                content: req.body.pinList[i].content,
                p2_0_: req.body.pinList[i].p2[0],
                p2_1_: req.body.pinList[i].p2[1],
                length: req.body.pinList[i].length,
                angle: req.body.pinList[i].angle,
                pt_style_Height: req.body.pinList[i].style.height,
                pt_style_Width: req.body.pinList[i].style.width,
                style_background_color: req.body.pinList[i].style["background-color"],
                style_position: req.body.pinList[i].style.position,
                pt_style_Top: req.body.pinList[i].style.top,
                pt_style_Left: req.body.pinList[i].style.left,
                style_transform: req.body.pinList[i].style.transform,
                style_transform_origin: req.body.pinList[i].style["transform-origin"],
                style_textboxupright_transform: req.body.pinList[i].textboxUpright.transform,
                style_textboxposition_top: req.body.pinList[i].textboxPosition.top,
                style_textboxposition_left: req.body.pinList[i].textboxPosition.left,
                noteID: ids[0],
              })
            };
            return knex.batchInsert("points", pinListArrayRow, batchSize)
              .transacting(trx).returning("noteID")
          }).then((ids) => {
            if (req.body.tagsList.length > 0) {

              const tagsListArray = [];
              const batchSize = 30;

              for (let i = 0; i < req.body.tagsList.length; i++) {
                tagsListArray.push({
                  notetags: req.body.tagsList[i],
                  noteID: ids[0],
                })
              }
              return knex.batchInsert("tags", tagsListArray, batchSize)
                .transacting(trx).returning("noteID")

            } else {
              return ids;
            }

          }).then(trx.commit)
          .catch(trx.rollback)
      }).then((ids) => {
        res.json({
          status: req.body.status,
          noteID: ids[0]
        })
      }).catch((err) => {
        console.log(err);
        res.json(err)
      })
    }
  }

  //    router.get('/allUsers/allNotes', this.allNotes) // return all notes of all users except current user
  private allNotes = (req: express.Request, res: express.Response) => {
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
      .whereNot("notes.status", "draft")
      .orderBy("notes.id")
      .then((rows) => {
        res.json(rows)
      }).catch((err) => {
        console.log(err)
        res.json(err)
      })
  }

  //    router.get('/userNote', this.userNotes) // return first match of each notes of current user
  private userNotes = (req: express.Request, res: express.Response) => {
    let query = knex.select("notes.id as noteID", "notes.status", "notes.note_title", "users.firstName", "users.lastName", "users.id as userID", "t1.imagelinks", "t2.tags")
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
//      .whereNot("notes.status", "draft")
      .where("users.id", (req.user) ? req.user.id : null)
      .orderBy("notes.id")
    return query.then((rows) => {
      res.json(rows)
    }).catch((err) => {
      console.log(err)
      res.json(err);
    })
  }

  // router.get('/userNote/published', this.userNotesPublished)  // return first match of each notes of current user, status publish
  private userNotesPublished = (req: express.Request, res: express.Response) => {
  let query = knex.select("notes.id as noteID", "notes.status", "notes.note_title", "users.firstName", "users.lastName", "users.id as userID", "t1.imagelinks", "t2.tags")
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
      .whereNot("notes.status", "draft")
    .where("users.id", (req.user) ? req.user.id : null)
    .orderBy("notes.id")
    return query.then((rows) => {
      res.json(rows)
    }).catch((err) => {
      console.log(err)
      res.json(err);
    })
  }

  //    router.get('/note/:id', this.getNPs) // current user's specific note with id
  private getNPs = (req: express.Request, res: express.Response) => {
    // should only return one note as it is bounded by ID
    let query = knex.select("*").from("notes").where({
      "userID": (req.user) ? req.user.id : null,
      "notes.id": req.params.id
    })
      .innerJoin("notesimage", "notes.id", "notesimage.noteID");
    return query.then((rows) => {

      let pinListArray: any = [];
      let imageListArray: any = [];
      let tagListArray: any = [];
      let specificNote: any = [];

      // create pinListArray for object
      let pinQuery = knex.select("*").from("points").where("noteID", '=', req.params.id)
      return pinQuery.then((rows) => {
        for (let i = 0; i < rows.length; i++) {
          pinListArray.push({
            p1: [rows[i].p1_0_, rows[i].p1_1_],
            dragging: rows[i].pt_dragging,
            title: rows[i].title,
            content: rows[i].content,
            p2: [rows[i].p2_0_, rows[i].p2_1_],
            length: rows[i].length,
            angle: rows[i].angle,
            style: {
              height: rows[i].pt_style_Height,
              width: rows[i].pt_style_Width,
              ['background-color']: rows[i].style_background_Color,
              position: rows[i].style_position,
              top: rows[i].pt_style_Top,
              left: rows[i].pt_style_Left,
              transform: rows[i].style_transform,
              ['transform-origin']: rows[i].style_transform_origin,
            },
            textboxUpright: { transform: rows[i].style_textboxupright_transform },
            textboxPosition: { top: rows[i].style_textboxposition_top, left: rows[i].style_textboxposition_left }
          })
        }
      }).then(() => {
        // create imageListArray for object
        let imageQuery = knex.select("*").from("notesimage").where("noteID", '=', req.params.id);
        return imageQuery.then((rows) => {
          for (let i = 0; i < rows.length; i++) {
            imageListArray.push({
              coords: [rows[i].coords_0, rows[i].coords_1],
              dragging: rows[i].dragging,
              offs: [rows[i].offs_0, rows[i].offs_1],
              url: rows[i].imageurl,
              style: [{
                top: rows[i].style_top,
                left: rows[i].style_left,
                height: rows[i].style_height,
                width: `${rows[i].style_width}px`,
                border: `${rows[i].style_border}px`,
              }],
            })
          }
        })
      }).then(() => {
        // create imageListArray for object
        let tagQuery = knex.select("*").from("tags").where("noteID", '=', req.params.id);
        return tagQuery.then((rows) => {
          for (let i = 0; i < rows.length; i++) {
            tagListArray.push(rows[i].notetags)
          }
        })
      }).then(() => {
        specificNote.push({
          userID: rows[0].userID,
          userFirstName: rows[0].firstName,
          userLastName: rows[0].lastName,
          userPic: rows[0].profPicLink,
          status: rows[0].status,
          title: rows[0].note_title,
          //        description: rows[0].note_description,  // there's no such thing in object yet
          pinList: pinListArray,
          imageList: imageListArray,
          tagsList: tagListArray
        })
        return specificNote;
      })
    }).then((specificNote) => {
      res.json(specificNote)
    })
      .catch((err) => {
        console.log(err)
        res.json(err)
      })
  }

  //    router.get('/user/:userID/note/:noteID', this.getUserNote) // other user's spcific note with id
  private getUserNote = (req: express.Request, res: express.Response) => {
    let query = knex.select("*").from("notes").where({
      userID: req.params.userID,
      noteID: req.params.noteID
    })
      .innerJoin("notesimage", "notes.id", "notesimage.noteID");
    return query.then((rows) => {
      if (rows.length >= 1) {

        let pinListArray: any = [];
        let imageListArray: any = [];
        let tagListArray: any = [];
        let specificNote: any = [];

        // create pinListArray for object
        let pinQuery = knex.select("*").from("points").where("noteID", '=', req.params.noteID)
        return pinQuery.then((rows) => {
          for (let i = 0; i < rows.length; i++) {
            pinListArray.push({
              p1: [rows[i].p1_0_, rows[i].p1_1_], //
              dragging: rows[i].pt_dragging, //
              title: rows[i].title, //
              content: rows[i].content, //
              p2: [rows[i].p2_0_, rows[i].p2_1_],//
              length: rows[i].length, //
              angle: rows[i].angle, //
              style: {
                height: rows[i].pt_style_Height, //
                width: rows[i].pt_style_Width, //
                ['background-color']: rows[i].style_background_color, //
                position: rows[i].style_position, //
                top: rows[i].pt_style_Top, //
                left: rows[i].pt_style_Left, //
                transform: rows[i].style_transform, //
                ['transform-origin']: rows[i].style_transform_origin, //
              },
              textboxUpright: { transform: rows[i].style_textboxupright_transform },
              textboxPosition: { top: rows[i].style_textboxposition_top, left: rows[i].style_textboxposition_left }
            })
          }
        }).then(() => {
          // create imageListArray for object
          let imageQuery = knex.select("*").from("notesimage").where("noteID", '=', req.params.noteID);
          return imageQuery.then((rows) => {
            for (let i = 0; i < rows.length; i++) {
              imageListArray.push({
                coords: [rows[i].coords_0, rows[i].coords_1], //
                dragging: rows[i].dragging, //
                offs: [rows[i].offs_0, rows[i].offs_1], //
                url: rows[i].imageurl, //
                style: {
                  top: rows[i].style_top, //
                  left: rows[i].style_left, //
                  height: `${rows[i].style_height}px`, //
                  width: `${rows[i].style_width}px`, //
                  border: rows[i].style_border, //
                },
              })
            }
          })
        }).then(() => {
          // create imageListArray for object
          let tagQuery = knex.select("*").from("tags").where("noteID", '=', req.params.noteID);
          return tagQuery.then((rows) => {
            for (let i = 0; i < rows.length; i++) {
              tagListArray.push(rows[i].notetags)
            }
          })
        }).then(() => {
          specificNote.push({
            userID: rows[0].userID,
            userFirstName: rows[0].firstName,
            userLastName: rows[0].lastName,
            userPic: rows[0].profPicLink,
            status: rows[0].status,
            title: rows[0].note_title,
            //        description: rows[0].note_description,  // there's no such thing in object yet
            pinList: pinListArray,
            imageList: imageListArray,
            tagsList: tagListArray
          })
          return specificNote;
        })
      } else {
        return {};
      }
    }).then((specificNote) => {
      res.json(specificNote)
    })
      .catch((err) => {
        console.log(err)
        res.json(err)
      })
  }
}

export { NoteAndPinRouter };
