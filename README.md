# ndjson-to-csv
This is a specific example of converting an NDJSON to CSV file, not a generic tool. You'll notice that there are hardcoded headers from the only subfield I was interested in parsing.

Specifically, this example demonstrates transforming an exported PouchDB database (produced by [PouchDB Replication Stream](https://github.com/nolanlawson/pouchdb-replication-stream)) to a CSV file. My docs had variable keys on them, so I hardcoded all of the possible keys to ensure that every entry was written to the CSV (csv-write-stream will assume the first entry has the correct headers and ignore headers on subsequent entries if they differ).

## Usage

Install.

```sh
npm i
```

Run.

```sh
node . path/to/input.txt path/to/output.csv
```
