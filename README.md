# CAP Anonymizer Plugin

A CAP (Cloud Application Programming) plugin designed to anonymize fields based on specific annotations. This plugin replaces sensitive property names on entities with generic values, ensuring data privacy and security.

## Features

- **Automatic Detection**: Automatically detects fields with the `@dbg.anonymize` annotation.
- **Anonymization**: Replaces sensitive field values with generic placeholders.
- **Logging**: Logs the entities and fields that are marked for anonymization.

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- @sap/cds (latest version)

### Installation

1. Install it as an npm package using the Github repo URL