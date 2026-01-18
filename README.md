# n8n-nodes-topfact-archiv

[![npm version](https://img.shields.io/npm/v/n8n-nodes-topfact-archiv)](https://www.npmjs.com/package/n8n-nodes-topfact-archiv)
[![n8n](https://img.shields.io/badge/n8n-community%20node-orange)](https://www.n8n.io/)

Ein [n8n](https://n8n.io) Community-Node zur Integration der **topfact Archiv API** in Ihre Workflows. Ermöglicht den Zugriff auf Archive und die Dokumentensuche direkt aus n8n heraus.

## Inhaltsverzeichnis

- [Installation](#installation)
- [Operationen](#operationen)
- [Konfiguration](#konfiguration)
- [Verwendung](#verwendung)
- [Entwicklung](#entwicklung)
- [Lizenz](#lizenz)

## Installation

### Über n8n Community Nodes

1. Öffnen Sie n8n
2. Navigieren Sie zu **Settings** → **Community Nodes**
3. Klicken Sie auf **Install**
4. Geben Sie `n8n-nodes-topfact-archiv` ein
5. Klicken Sie auf **Install**

### Manuell über npm

Wenn Sie n8n über npm installiert haben, können Sie die Community Node mit folgendem Befehl installieren:

```bash
npm install n8n-nodes-topfact-archiv
```

Anschließend starten Sie n8n neu, um die Node zu laden.

## Operationen

Die Node bietet folgende Operationen:

### Archive abrufen (Get Archives)

Ruft eine Liste aller verfügbaren Archive ab.

**Ausgabe:** Array von Archiv-Objekten mit Details wie ID, Name und Typ.

### Dokumente suchen (Search Documents)

Durchsucht Dokumente in einem bestimmten Archiv.

**Parameter:**
- **Archiv-ID** (erforderlich): Die ID des zu durchsuchenden Archivs
- **Suchbegriff**: Optionaler Suchbegriff für die Volltextsuche
- **Limit**: Maximale Anzahl der zurückzugebenden Ergebnisse (Standard: 100)

**Ausgabe:** Array von Dokumenten mit Metadaten und Feldinformationen.

## Konfiguration

### Zugangsdaten einrichten

1. Fügen Sie in Ihrem n8n-Workflow eine topfact Archiv Node hinzu
2. Klicken Sie auf **Create New Credentials**
3. Geben Sie Ihre Zugangsdaten ein:
   - **Username**: Ihr topfact Archiv Benutzername
   - **Password**: Ihr topfact Archiv Passwort
   - **API URL**: Die URL Ihrer topfact Archiv Instanz (z.B. `https://myarchiv.topfact.de`)

> [!IMPORTANT]
> Die API verwendet ein zweistufiges Authentifizierungsverfahren. Bei jedem API-Aufruf wird automatisch zunächst ein Login durchgeführt, um einen Access Key zu erhalten, der dann für den eigentlichen Request verwendet wird.

## Verwendung

### Beispiel: Archive auflisten

1. Fügen Sie die **topfact Archiv** Node zu Ihrem Workflow hinzu
2. Wählen Sie die Operation **Get Archives**
3. Wählen Sie Ihre Zugangsdaten
4. Führen Sie den Workflow aus

### Beispiel: Dokumente suchen

1. Fügen Sie die **topfact Archiv** Node zu Ihrem Workflow hinzu
2. Wählen Sie die Operation **Search Documents**
3. Geben Sie die **Archiv-ID** ein (z.B. aus einer vorherigen "Get Archives" Operation)
4. Optional: Geben Sie einen **Suchbegriff** ein
5. Optional: Setzen Sie ein **Limit** für die Ergebnisse
6. Führen Sie den Workflow aus

## Entwicklung

### Voraussetzungen

- **[Node.js](https://nodejs.org/)** (v22 oder höher)
- **[npm](https://www.npmjs.com/)**
- **[git](https://git-scm.com/downloads)**

### Setup

1. Repository klonen:

```bash
git clone https://github.com/topfact-AG/n8n-nodes-topfact-archiv.git
cd n8n-nodes-topfact-archiv
```

2. Dependencies installieren:

```bash
npm install
```

3. Entwicklungsmodus starten:

```bash
npm run dev
```

Dies startet n8n lokal auf http://localhost:5678 mit Hot-Reload für Ihre Änderungen.

### Verfügbare Befehle

- **`npm run dev`** - Startet n8n im Entwicklungsmodus mit Watch-Build
- **`npm run build`** - Kompiliert TypeScript zu JavaScript im `dist/` Ordner
- **`npm run lint`** - Prüft Code-Qualität mit ESLint
- **`npm run lint:fix`** - Behebt automatisch behebbare Linting-Fehler
- **`npm run release`** - Erstellt ein neues Release mit release-it

### Projektstruktur

```
n8n-nodes-topfact-archiv/
├── credentials/
│   └── TopfactArchiv.credentials.ts    # Authentifizierungskonfiguration
├── nodes/
│   └── TopfactArchiv/
│       ├── TopfactArchiv.node.ts       # Haupt-Node-Definition
│       ├── TopfactArchiv.node.json     # Node-Metadaten
│       └── operations/
│           ├── getArchives.ts          # Archive abrufen
│           └── searchDocuments.ts      # Dokumente suchen
├── package.json
└── tsconfig.json
```

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe [LICENSE.md](LICENSE.md) für Details.

---

## Support & Kontakt

- **Homepage**: [topfact.de](https://topfact.de)
- **Repository**: [github.com/topfact-AG/n8n-nodes-topfact-archiv](https://github.com/topfact-AG/n8n-nodes-topfact-archiv)
- **E-Mail**: vertrieb@topfact.de

## Links

- [n8n.io](https://n8n.io) - Workflow Automation Tool
- [n8n Community Nodes](https://www.npmjs.com/search?q=keywords:n8n-community-node-package)
- [n8n Documentation](https://docs.n8n.io)

