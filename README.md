# Maverick

A small ingestion and CLI utility project that provides a simple server with ingest endpoints and a command-line interface for interacting with the dataset.

## Description

This repository contains two main apps:

- `server` — an HTTP server that exposes health and ingest routes and contains an ingestion walker to process documents.
- `apps/cli` — a lightweight command-line interface for interacting with the project (querying, running ingest tasks, etc.).

The project also includes a sample dataset at `data/documents.json` used by the ingest logic.

## Features

- HTTP server with a healthcheck endpoint to verify the service is running.
- Ingest endpoints to accept and trigger processing of documents.
- Ingestion walker that iterates and processes documents from the data store.
- A CLI tool to run ingestion tasks or interact with the dataset directly.
- Minimal, modular code layout to make it easy to extend ingestion logic and routes.

## Getting started

Prerequisites: Node.js (14+ recommended) and `npm`.

1. Install dependencies for server and CLI:

   - In `apps/server`:
     npm install

   - In `apps/cli`:
     npm install

2. Run the server (from `server`):

   npm run dev

   The server exposes at least the following routes:
   - `GET /health` — basic health check
   - `POST /ingest` — trigger or submit documents for ingestion (refer to code for payload schema)

3. Use the CLI (from `apps/cli`):

   npm start -- <command>

   The CLI can be used to invoke ingestion tasks or operate on the `data/documents.json` file. Check `apps/cli/package.json` and `apps/cli/src/index.js` for available commands.

## Data

- `data/documents.json` is a sample dataset. The ingest logic in `server/src/ingest` and the CLI read or walk this file for processing.

## Extending the project

- Add new routes under `server/src/routes` and wire them into `server/src/index.js`.
- Extend ingestion logic in `server/src/ingest/walker.js` and `server/src/ingest/index.js`.
- Add CLI commands in `apps/cli/src/index.js` and update `apps/cli/package.json` scripts.

## Contributing

Open issues or submit pull requests. Keep changes small and focused. Add tests where appropriate.

## License

This project does not include a license file. Add a `LICENSE` if you need to specify reuse terms.
