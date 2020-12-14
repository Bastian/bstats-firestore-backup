# bStats Firestore Backup

A simple Firebase Cloud Function that exports the bStats Firestore once per week into a Google Cloud Bucket.

## Once per week? Are you crazy? 😱

> Once per week sounds far to rare.!
> Imagine if the backup runs on Monday and the Firestore database gets lost on Sunday.
> We would lose a full week of historic line chart data!

This is a legitimate concern.
Fortunately, one backup per week is more than enough because we also do hourly backups of the Redis database.
In the (very unlikely) case that the Firestore database gets lost (e.g., because of a programming error that purged 
all data), we can easily use the Redis backups to restore the data that was lost since the last Firestore backup.

### But still: Why not do a backup more often?

Because Firestore exports are expensive.
Exporting data from Cloud Firestore will incur one read operation per document exported.

## License

This work is under exclusive copyright. You are not allowed to copy, distribute, or modify this work.