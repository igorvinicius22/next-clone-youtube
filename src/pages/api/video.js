import { ObjectId } from "bson";
import nc from "next-connect";
import connectToDatabase from "src/utils/mongodb";
import upload from "src/utils/upload";

const handler = nc()  
  .use(upload.single('file'))
  .get((req, res) => {
    res.send("Hello world");
  })
  .post(async (req, res) => {
    res.json({ hello: "world" });
    const { title, authorId, authorName, authorAvatar, videoUrl } = req.body;
    const { db } = await connectToDatabase()
    const collection = db.collection('videos');

    await collection.insertOne({
      title,
      authorId: ObjectId(authorId),
      authorName,
      authorAvatar,
      views: 0,
      thumb: req.file.location,
      videoUrl,
      updatedAt: new Date(),
    });

    return res.status(200).json({ ok: true });
  })
  .put(async (req, res) => {
    res.end("async/await is also supported!");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

  export const config = {
    api: {
      bodyParser: false,
    },
  };

  export default handler;
