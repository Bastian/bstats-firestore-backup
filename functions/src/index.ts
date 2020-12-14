import * as functions from 'firebase-functions';
import * as firestore from '@google-cloud/firestore';

export const runBackup = functions.pubsub
  .schedule('30 5 * * 1') // Once per week on monday at 05:30 UTC
  .timeZone('UTC')
  .onRun(async () => {
    const client = new firestore.v1.FirestoreAdminClient();

    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    const databaseName = client.databasePath(projectId, 'default');

    await client.exportDocuments({
      name: databaseName,
      outputUriPrefix: 'gs://bstats-backup',
      collectionIds: [], // All collections
    });
  })