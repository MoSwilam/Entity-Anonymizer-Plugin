# CAP Anonymizer Plugin

A CAP (Cloud Application Programming) plugin designed to anonymize fields based on `@dbg.anonymize` annotation. This plugin replaces sensitive property names on entities with generic values, ensuring data privacy and security.

<br>

## Features

- **Entity-Level Anonymization**: Anonymizes entire entities if they are annotated with `@dbg.anonymize` annotation.
- **Element-Level Anonymization**: Replaces sensitive field values with generic placeholders.
- **Logging**: Logs the entities and fields that are marked for anonymization.

<br>

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- @sap/cds (latest version)

<br>

### Installation

1. Install the plugin as an npm package using the Github repo URL

```sh
npm install <Github repo URL>
```

<br>

## Usage

Annotate your entities and elements with @dbg.anonymize to enable anonymization.



## Example - Entity Annotation:

```Cds
@dbg.anonymize
entity Authors {
  key ID : Integer;
  name   : String;
  birthdate : Date;
  email : String;
  nationality : String;
  phone: String;
}
```

Turns this
```Json
{
  "ID": 1,
  "name": "J.K. Rowling",
  "birthdate": "1965-07-31",
  "nationality": "British",
  "email": "jk.rowling@example.com",
  "phone": "+44-20-7946-0958"
}
```


To this

```Json
{
  "ID": 1,
  "name": "Jane Doe",
  "birthdate": "1980-01-15",
  "nationality": "American",
  "email": "jane.doe@example.com",
  "phone": "+1-123-456-7890"
}
```

<br>

## Example - Element Annotation:

```Cds

entity Authors {
  key ID : Integer;
  name   : String;
  birthdate : Date;
  @dbg.anonymize
  email : String;
  nationality : String;
  phone: String;
}
```


Turns this
```Json
{
  "ID": 1,
  "name": "J.K. Rowling",
  "birthdate": "1965-07-31",
  "nationality": "British",
  "email": "jk.rowling@example.com",
  "phone": "+44-20-7946-0958"
}
```

To this

```Json
{
  "ID": 1,
  "name": "J.K. Rowling",
  "birthdate": "1965-07-31",
  "nationality": "British",
  "email": "rock.paper@figures.com",
  "phone": "+44-20-7946-0958"
}
```

