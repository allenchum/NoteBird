import * as express from 'express'
import { knex } from '../dbConnect'

class NoteAndPinRouter {
  router = () => {
    const router = express.Router();
    router.post('/', this.writeNPs);
    router.get('/userNote', this.userNotes)
    router.get('/:id', this.getNPs)
    return router;
  }

  private writeNPs = (req: express.Request, res: express.Response) => {
    knex.transaction((trx) => {
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
              offs_0_: req.body.imageList[i].offs[0],
              offs_1_: req.body.imageList[i].offs[1],
              image_Url: req.body.imageList[i].url,
              style_top: req.body.imageList[i].style.height,
              style_left: req.body.imageList[i].style.left,
              style_height: req.body.imageList[i].style.height,
              style_width: req.body.imageList[i].style.width,
              style_border: req.body.imageList[i].style.border,
              noteID: ids[0],
            })
          };

          return knex.batchInsert("notes_Image", imageListArrayRow, batchSize)
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
              style_backgroud_Color: req.body.pinList[i].style["background-color"],
              style_position: req.body.pinList[i].style.position,
              pt_style_Top: req.body.pinList[i].style.top,
              pt_style_Left: req.body.pinList[i].style.left,
              style_transform: req.body.pinList[i].style.transform,
              style_transform_origin: req.body.pinList[i].style["transform-origin"],
              style_textboxUpright: req.body.pinList[i].textboxUpright,
              style_textPosition: req.body.pinList[i].textboxPosition,
              noteID: ids[0],
            })
          };
          return knex.batchInsert("points", pinListArrayRow, batchSize)
            .transacting(trx).returning("noteID")
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

  private userNotes = (req: express.Request, res: express.Response) => {
    let query = knex.from("notes").where("userID", '=', (req.user) ? req.user.id : null)
                    .innerJoin("notes_Image", "notes.id", "notes_Image.noteID")
    return query.then((rows) => {
      let duplicates: any = [];
      const notesReturn = rows.filter((element: any) => {
        // If it is not a duplicate, return true
        if (duplicates.indexOf(element.noteID) == -1) {
          duplicates.push(element.noteID);
          // return only the first match in rows returned from knex query
          return true;
        }
        return false;
      });
      res.json(notesReturn)
    })
  }

  private getNPs = (req: express.Request, res: express.Response) => {
    let query = knex.select("*").from("notes").where({
      "userID": (req.user) ? req.user.id : null,
      "notes.id": req.params.id
    })
      .innerJoin("notes_Image", "notes.id", "notes_Image.noteID")
      .innerJoin("points", "notes.id", "points.noteID")
      .innerJoin("users", "notes.userID", "users.id")

    // should only return one note as it is bounded by ID

    return query.then((rows) => {
      let pinListArray: any = [];
      let imageListArray: any = [];
      let specificNote: any = [];

      // create pinListArray for object
      for (let i = 0; i < rows.length; i++) {
        pinListArray.push({
          p1: [rows[i].p1_0_, rows[i].p1_1_],
          dragging: rows[i].pt_dragging,
          title: rows[i].title,
          content: rows[i].content,
          p2: [rows[i].p2_0_, rows[i].p2_1_],
          length: rows[i].length,
          angle: rows[i].angle,
          style: [{
            height: rows[i].pt_style_Height,
            width: rows[i].pt_style_Width,
            ['backgroud-color']: rows[i].style_background_Color,
            position: rows[i].style_position,
            top: rows[i].pt_style_Top,
            left: rows[i].pt_style_Left,
            transform: rows[i].style_transform,
            ['transform-origin']: rows[i].style_origin,
          }],
          textboxUpright: [rows[i].style_textboxUpright],
          textboxPosition: [rows[i].style_textPosition]
        })
      }

      // create imageListArray for object
      for (let i = 0; i < rows.length; i++) {
        imageListArray.push({
          coords: [rows[i].coords_0, rows[i].coords_1],
          dragging: rows[i].dragging,
          offs: [rows[i].offs_0_, rows[i].offs_1_],
          url: rows[i].image_Url,
          style: [{
            top: rows[i].style_top,
            left: rows[i].style_left,
            height: rows[i].style_height,
            width: rows[i].style_width,
            border: rows[i].style_border,
          }],
        })
      }

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
      })

      res.json(specificNote)
    })
  }
}

export { NoteAndPinRouter };
