# Buone & Cattive News

Buone News è un progetto che seleziona notizie positive e incoraggianti da una varietà di fonti per offrirti una visione più luminosa del mondo. Utilizzando l'intelligenza artificiale e feed RSS, Buone News filtra le buone notizie dalle cattive e le presenta sul sito [buone.news](https://buone.news).

## Descrizione del Progetto

### Motivazione

Il progetto nasce dall'idea di due catanesi, Alberto Abate (Marketing Specialist a Fullstack Lab, Roma) e Francesco Pasqua (SSWE Associate Manager a Jakala, Milano), con l'obiettivo di fare un esperimento etico. Vogliamo capire se l'intelligenza artificiale può navigare nel marasma delle notizie e guidare gli utenti verso contenuti positivi, attraverso l'utilizzo di patti parasociali universalmente e collettivamente accettati.

### Come Funziona

Buone News utilizza un'AI di OpenAI e feed RSS provenienti da varie fonti per raccogliere e filtrare le notizie. La selezione delle notizie è basata su:

- **Sentiment Analysis**: L'AI analizza il tono di ogni notizia e la classifica in base al livello di positività.
- **Filtraggio Sociopolitico e Psicologico**: Prendiamo in considerazione le implicazioni sociologiche, politiche e psicologiche delle notizie per garantire che quelle selezionate abbiano un impatto positivo.
- **Apprendimento Continuo**: L'algoritmo si adatta e migliora nel tempo in base al feedback e ai nuovi dati, diventando sempre più preciso nel discernere le notizie.

### Buone News e Cattive News

Parallelamente, il progetto **cattive.news** raccoglie le notizie negative. Questo ci permette di offrire un contrasto chiaro e dimostrare come il filtro delle informazioni possa influenzare la percezione della realtà.

## Struttura del Codice

### Requisiti

- **Node.js**: v14 o superiore
- **Astro**: Framework di frontend per costruire siti web statici.
- **DatoCMS**: Utilizzato come headless CMS per gestire i contenuti del sito.

### Installazione

1. Clona il repository:

   ```bash
   git clone https://github.com/tuo-utente/buone-news.git
   cd buone-news
   ```

2. Installa le dipendenze:

   ```bash
   npm install
   ```

3. Configura le variabili d'ambiente. Crea un file `.env` e aggiungi le seguenti chiavi:

   ```env
   DATOCMS_API_TOKEN=tuo_token
   ```

4. Avvia il server di sviluppo:

   ```bash
   npm run dev
   ```

   Ora il progetto dovrebbe essere accessibile all'indirizzo `http://localhost:3000`.

## Struttura del Progetto

- **/src**: Contiene il codice sorgente dell'applicazione.
  - **/pages**: Le diverse pagine del sito.
  - **/components**: Componenti riutilizzabili, come le card per le notizie.
- **/public**: File statici come immagini e favicon.
- **/styles**: Contiene gli stili CSS globali.

## Contributi

Accogliamo contributi per migliorare il progetto! Puoi contribuire in vari modi:

- **Segnalazione Bug**: Apri un "issue" per segnalare eventuali problemi.
- **Aggiunta di Funzionalità**: Se hai idee per nuove funzionalità, sentiti libero di aprire un "pull request".

### Linee Guida per i Contributi

1. **Fork del Repository**.
2. Crea un nuovo branch per la tua feature:

   ```bash
   git checkout -b nuova-feature
   ```

3. Committa le tue modifiche:

   ```bash
   git commit -m "Aggiunta di una nuova feature"
   ```

4. Fai il push del branch e apri una Pull Request.

## Licenza

Buone News è rilasciato sotto la licenza MIT. Sentiti libero di usarlo, modificarlo e distribuirlo come preferisci.

[Supporta il progetto su Buy Me a Coffee](https://buymeacoffee.com/buone.news)

## Contatti

Per ulteriori informazioni, puoi contattare:

- **Alberto Abate** - [LinkedIn](https://www.linkedin.com/in/albertoabate)
- **Francesco Pasqua** - [LinkedIn](https://www.linkedin.com/in/francescopasqua)
