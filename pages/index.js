import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Meetups list" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// Static Generation
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://mwojcieszak:Test1234@nextjs.pryfqad.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
    /**
     * Incremental static generation
     * If there are requests this page will be regenerated on the server every 10 seconds
     * Data is never older than 10 seconds
     */
    revalidate: 10,
  };
}

/**
 * Server-side Generation
 * This is not executed on a client side, but on a server side
 * It will not run during build process, but always on the server after deployment
 * Page is regenerated with every incoming request
 */
// export async function getServerSideProps() {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
