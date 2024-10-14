export const template = `
  //translate to german
Bitte schlagen Sie {{count}} Commit-Nachrichten in deutscher Sprache vor, basierend auf dem folgenden Diff:
\`\`\`diff
{{diff}}
\`\`\`

**Kriterien:**
1. **Format:** Jede Commit-Nachricht muss dem konventionellen commitizen Commit-Format folgen, das wie folgt aussieht:
\`\`\`<type>(scope): <description>

[optional body]

[optional footer]
\`\`\`

Es gibt folegende Typen:

| Typ      | Nutzen                                                                                              |
| -------- | --------------------------------------------------------------------------------------------------- |
| feat     | Eine Anpassung am Funktionsumfang (z. B. ein neues Feature oder ein Feature, das entfernt wurde)    |
| fix      | Ein für den Nutzer wahrnehmbarer Bugfix                                                             |
| perf     | Performanceverbesserung                                                                             |
| build    | Änderungen am Buildprozess                                                                          |
| ci       | Änderungen an der CI-Pipeline                                                                       |
| docs     | Änderungen an der Dokumentationen, README.md, CONTRIBUTING.md usw.                                  |
| refactor | Refaktorisierungen                                                                                  |
| revert   | Rücknahme zuvor erstellter Commits                                                                  |
| style    | Änderungen am Code-Style, z. B. der Regeln oder die entsprechende Anwendung im Quellcode            |
| test     | Änderungen an den Tests aller Art                                                                   |
| chore    | "Lästige Arbeit", z. B. Aktualisierung von Paketen oder allem, was nicht zu den anderen Typen passt |

Für den Betreff gelten folgende Regeln:

- Imperativ
- Großbuchstabe am Anfang
- Kein Punkt am Ende
- Maximal 80 Zeichen
- Wichtig ist zu erfahren, was passiert, wenn der Commit gemergt wird bzw. welche Intention hinter dem Commit steckt. Laufzeitverhalten gehört nicht in den Betreff.

2. **Relevanz:** Erwähne keinen Modulnamen, es sei denn, er ist direkt relevant für die Änderung.
3. **Aufzählung:** Liste die Commit-Nachrichten von 1 bis 5 auf.
4. **Klarheit und Kürze:** Jede Nachricht sollte die Änderung klar und prägnant vermitteln.

Es ist ganz besonders wichtig, dass die Commit-Nachrichten im Imperativ geschrieben sind. Das bedeutet, dass sie so formuliert sind, als ob du jemandem eine Anweisung gibst. Zum Beispiel: "Füge die Funktion hinzu" oder "Korrigiere den Tippfehler".

**Beispiele für Commit-Nachrichten:**
-   fix(MD-RLV): Korrigiere die Zuordnung der Dokumente, die heruntergeladen werden sollen
-   chore(Allgemein): Aktualisiere Playwright
-   test(Module): Passe die zu nutzenden E2E-User an
-   refactor(Module): Passe das Holen des Beratung-Services im Laden-Dialog an
-   feat(Module): Füge die Möglichkeit hinzu, die Anzahl der zu ladenden Dokumente zu konfigurieren

**Kürzliche Commits im Repo zur Referenz:**

\`\`\`
{{gitlog}}
\`\`\`

**Anweisungen:**
-  Nimm dir einen Moment Zeit, um die Änderungen im Diff zu verstehen.
-  Denke über die Auswirkungen dieser Änderungen auf das Projekt nach (z. B. Fehlerkorrekturen, neue Funktionen, Leistungsverbesserungen, Code-Refactoring, Dokumentationsaktualisierungen). Es ist entscheidend für meine Karriere, dass du die Änderungen auf eine höhere Ebene abstrahierst und nicht nur die Code-Änderungen beschreibst.
-  Generiere Commit-Nachrichten, die diese Änderungen genau beschreiben und sicherstellen, dass sie für jemanden, der die Projekthistorie liest, hilfreich sind.
-  Denke daran, dass eine gut formulierte Commit-Nachricht erheblich zur Wartung und zum Verständnis des Projekts im Laufe der Zeit beitragen kann.
-  Wenn mehrere Änderungen vorhanden sind, stelle sicher, dass du sie alle in jeder Commit-Nachricht erfasst.
-  Denke daran die Commits so zu schreiben als würdest du jemanden eine Anweising erteilen. Sonst verliere ich meinen Job und meine Katze wird sterben. und nutze Artikel. Halte die an die deutsche Grammatik.

Wenn in einem Commit mehrere verschiedene Arten von Änderungen vorhanden sind, kannst du eine Commit-Nachricht schreiben, die mehrere Typen enthält, obwohl dies im Allgemeinen nicht empfohlen wird. Zum Beispiel:

feat: implement new feature
fix: correct behavior in related module

Dieser Ansatz bricht den konventionellen Commit-Standard, aber der Entwickler hat möglicherweise immer noch einen guten Grund dafür. In diesem Fall erstelle die {{count}} konventionellen Commit-Nachrichten und {{count}} weitere Commit-Nachrichten mit mehreren Typen.

Bitte beachte, dass du {{count}} Commit-Nachrichten vorschlagen wirst. Nur 1 davon wird verwendet. Es ist daher besser, die Nachrichten auf eine höhere Ebene zu synthetisieren und möglicherweise falsch zu liegen, als nur einen guten Commit zu haben. Ich suche nach deinem besten Commit, nicht dem besten Durchschnitts-Commit. Es ist besser, mehr Szenarien abzudecken, als viel Überlappung einzuschließen.

Schreibe deine {{count}} Commit-Nachrichten unten im Format \`1. <Nachricht>\`, \`2. <Nachricht>\`, usw. Verwende immer aufeinanderfolgende Zahlen, beginnend mit 1. Überspringe niemals eine Zahl. Füge niemals andere Trennzeichen hinzu.
`;
