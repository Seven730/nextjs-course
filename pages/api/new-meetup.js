import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function newMeetupHandler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://mwojcieszak:Test1234@nextjs.pryfqad.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    try {
      const result = await meetupsCollection.insertOne(data);
      alert(result);
    } catch (error) {
      alert(error);
    }

    client.close();

    // Sending a response to the server
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default newMeetupHandler;
