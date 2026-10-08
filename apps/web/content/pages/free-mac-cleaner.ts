import type { Localized } from '@/lib/localized'
import type { FaqItem } from '@/components/site/FaqSection'

export type FreeMacCleanerCopy = {
  metaTitle: string
  metaDescription: string
  breadcrumb: string
  h1: string
  h1Accent: string
  lead: string
  freeLabel: string
  freeFeatures: string[]
  proLabel: string
  proFeatures: string[]
  proLink: string
  howTitle: string
  howLead: string
  steps: { title: string; text: string }[]
  compareTitle: string
  compareLead: string
  compareLinks: { href: string; label: string }[]
  faq: FaqItem[]
}

export const freeMacCleanerCopy: Localized<FreeMacCleanerCopy> = {
  en: {
    metaTitle: 'Free Mac Cleaner — Clean Junk, Duplicates & Large Files (No Trial)',
    metaDescription:
      'A genuinely free Mac cleaner: scan everything free forever and clean up to 2 GB at no cost — junk, duplicates, large and old files. No trial, no account, no credit card.',
    breadcrumb: 'Free Mac Cleaner',
    h1: "A free Mac cleaner that's",
    h1Accent: 'actually free.',
    lead: 'No trial period. No credit card. Clean junk files, find duplicates and locate the large files hogging your storage — download and start scanning in under a minute.',
    freeLabel: 'Included free, forever',
    freeFeatures: [
      'Scan your whole Mac — every result visible, nothing blurred',
      'Duplicates, large & old files, downloads and junk',
      'Free cleanup up to 2 GB in total (lifetime allowance)',
      'Safe deletion — everything goes to the Trash first',
      'No account, no trial period, no credit card',
    ],
    proLabel: 'Unlocked with Pro ($12.99 one-time)',
    proFeatures: [
      'Unlimited cleanup — no 2 GB cap',
      'App Uninstaller that removes leftover files',
      'Privacy Cleaner & Startup Manager',
      'Scheduled automatic scans',
    ],
    proLink: 'See full pricing',
    howTitle: 'How the free tier works',
    howLead: 'Three steps, no account, no trial countdown.',
    steps: [
      { title: '1. Scan', text: 'One click scans your Mac — or just the folders you pick.' },
      { title: '2. Review', text: 'Every result is listed with its size and location. You decide what goes.' },
      { title: '3. Clean', text: 'Selected items are moved to the Trash first, so you can still put them back.' },
    ],
    compareTitle: 'Comparing free Mac cleaners?',
    compareLead: 'Honest, side-by-side comparisons with the tools people usually consider:',
    compareLinks: [
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'The best free Mac cleaners in 2026' },
      { href: '/vs/onyx', label: 'MacDiskCleaner vs OnyX' },
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac' },
      { href: '/vs/daisydisk', label: 'MacDiskCleaner vs DaisyDisk' },
    ],
    faq: [
      { q: 'Is MacDiskCleaner really free, or is this a trial?', a: 'There is no trial period and no expiration. Scanning and browsing are free forever, and you can clean up 2 GB in total for free — permanently, not for a limited time.' },
      { q: "What's the catch?", a: 'The one limit is a 2 GB lifetime cleanup allowance: you can scan as often as you like and see every duplicate, large file and junk item, but once you have deleted 2 GB in total the app asks for Pro (or a license key) before removing more. Pro removes the cap and adds an App Uninstaller, Privacy Cleaner, Startup Manager and Scheduled Scans.' },
      { q: 'Does it work on my MacBook or iMac?', a: 'Yes. It supports macOS 14 Sonoma and later on Apple Silicon (M1 and newer) and Intel Macs — MacBook Air, MacBook Pro, iMac, Mac mini, Mac Studio and Mac Pro.' },
      { q: 'Is it safe to use a free Mac cleaner?', a: 'It is, as long as the cleaner shows you what it will remove and moves files to the Trash instead of erasing them. MacDiskCleaner does both on the free and Pro tiers, and never touches system folders, your Keychains or Preferences.' },
      { q: 'Does the free version upload any of my data?', a: 'No. Scanning and analysis run entirely on your Mac — file names, paths and contents are never sent to a server, free or Pro.' },
      { q: 'If I upgrade later, do I lose anything?', a: 'No. Pro is strictly additive: space you already cleaned stays cleaned and your scan results are kept. Pro removes the 2 GB cap and unlocks four extra tools.' },
    ],
  },
  es: {
    metaTitle: 'Limpiador de Mac gratis: archivos basura, duplicados y archivos grandes (sin prueba)',
    metaDescription:
      'Un limpiador de Mac realmente gratis: analiza todo gratis para siempre y limpia hasta 2 GB sin pagar — archivos basura, duplicados, archivos grandes y antiguos. Sin prueba, sin cuenta, sin tarjeta.',
    breadcrumb: 'Limpiador de Mac gratis',
    h1: 'Un limpiador de Mac gratis que',
    h1Accent: 'es gratis de verdad.',
    lead: 'Sin periodo de prueba. Sin tarjeta de crédito. Elimina archivos basura, encuentra duplicados y localiza los archivos grandes que ocupan tu almacenamiento: descárgalo y empieza a analizar en menos de un minuto.',
    freeLabel: 'Incluido gratis, para siempre',
    freeFeatures: [
      'Analiza todo tu Mac: todos los resultados visibles, nada oculto',
      'Duplicados, archivos grandes y antiguos, descargas y archivos basura',
      'Limpieza gratuita de hasta 2 GB en total (de por vida)',
      'Borrado seguro: todo va primero a la Papelera',
      'Sin cuenta, sin periodo de prueba, sin tarjeta',
    ],
    proLabel: 'Con Pro (12,99 $, pago único)',
    proFeatures: [
      'Limpieza ilimitada, sin el límite de 2 GB',
      'Desinstalador que elimina también los archivos residuales',
      'Limpiador de privacidad y gestor de inicio',
      'Análisis automáticos programados',
    ],
    proLink: 'Ver todos los precios',
    howTitle: 'Cómo funciona el plan gratuito',
    howLead: 'Tres pasos, sin cuenta y sin cuenta atrás.',
    steps: [
      { title: '1. Analiza', text: 'Un clic analiza tu Mac, o solo las carpetas que elijas.' },
      { title: '2. Revisa', text: 'Cada resultado aparece con su tamaño y ubicación. Tú decides qué se va.' },
      { title: '3. Limpia', text: 'Lo que selecciones va primero a la Papelera, así que aún puedes recuperarlo.' },
    ],
    compareTitle: '¿Comparando limpiadores de Mac gratis?',
    compareLead: 'Comparativas honestas con las herramientas que la gente suele considerar:',
    compareLinks: [
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'Los mejores limpiadores de Mac gratis en 2026' },
      { href: '/vs/onyx', label: 'MacDiskCleaner vs OnyX' },
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac' },
      { href: '/vs/daisydisk', label: 'MacDiskCleaner vs DaisyDisk' },
    ],
    faq: [
      { q: '¿MacDiskCleaner es gratis de verdad o es una prueba?', a: 'No hay periodo de prueba ni caducidad. Analizar y ver los resultados es gratis para siempre, y puedes limpiar 2 GB en total sin pagar, de forma permanente.' },
      { q: '¿Dónde está la trampa?', a: 'El único límite es una cuota de limpieza de 2 GB de por vida: puedes analizar tantas veces como quieras y ver todos los duplicados, archivos grandes y archivos basura, pero cuando hayas borrado 2 GB en total la app te pedirá Pro (o una clave de licencia) para seguir eliminando. Pro quita el límite y añade el desinstalador, el limpiador de privacidad, el gestor de inicio y los análisis programados.' },
      { q: '¿Funciona en mi MacBook o iMac?', a: 'Sí. Es compatible con macOS 14 Sonoma y posteriores en Mac con Apple Silicon (M1 y posteriores) e Intel: MacBook Air, MacBook Pro, iMac, Mac mini, Mac Studio y Mac Pro.' },
      { q: '¿Es seguro usar un limpiador de Mac gratis?', a: 'Sí, siempre que el limpiador te muestre lo que va a eliminar y mueva los archivos a la Papelera en lugar de borrarlos directamente. MacDiskCleaner hace ambas cosas, en el plan gratuito y en Pro, y nunca toca carpetas del sistema, tus llaveros ni tus preferencias.' },
      { q: '¿La versión gratuita sube mis datos?', a: 'No. El análisis se realiza íntegramente en tu Mac: los nombres, rutas y contenidos de tus archivos nunca se envían a ningún servidor, ni en el plan gratuito ni en Pro.' },
      { q: 'Si me paso a Pro más tarde, ¿pierdo algo?', a: 'No. Pro solo añade: el espacio que ya liberaste sigue libre y tus resultados de análisis se conservan. Pro elimina el límite de 2 GB y desbloquea cuatro herramientas más.' },
    ],
  },
  de: {
    metaTitle: 'Mac Cleaner kostenlos: Datenmüll, Duplikate & große Dateien entfernen (ohne Testphase)',
    metaDescription:
      'Ein wirklich kostenloser Mac Cleaner: Alles gratis scannen – für immer – und bis zu 2 GB kostenlos aufräumen: Datenmüll, Duplikate, große und alte Dateien. Keine Testphase, kein Konto, keine Kreditkarte.',
    breadcrumb: 'Mac Cleaner kostenlos',
    h1: 'Ein kostenloser Mac Cleaner, der',
    h1Accent: 'wirklich gratis ist.',
    lead: 'Keine Testphase. Keine Kreditkarte. Entferne Datenmüll, finde Duplikate und spüre große Dateien auf, die deinen Speicher belegen – herunterladen und in unter einer Minute mit dem Scan beginnen.',
    freeLabel: 'Für immer kostenlos enthalten',
    freeFeatures: [
      'Deinen ganzen Mac scannen – alle Ergebnisse sichtbar, nichts verdeckt',
      'Duplikate, große & alte Dateien, Downloads und Datenmüll',
      'Kostenlos aufräumen bis insgesamt 2 GB (lebenslanges Kontingent)',
      'Sicheres Löschen – alles landet zuerst im Papierkorb',
      'Kein Konto, keine Testphase, keine Kreditkarte',
    ],
    proLabel: 'Mit Pro (einmalig 12,99 $)',
    proFeatures: [
      'Unbegrenzt aufräumen – keine 2-GB-Grenze',
      'App-Deinstallation, die auch Restdateien entfernt',
      'Datenschutz-Bereinigung & Startobjekte-Manager',
      'Geplante automatische Scans',
    ],
    proLink: 'Alle Preise ansehen',
    howTitle: 'So funktioniert die Gratis-Version',
    howLead: 'Drei Schritte, kein Konto, kein Countdown.',
    steps: [
      { title: '1. Scannen', text: 'Ein Klick scannt deinen Mac – oder nur die Ordner, die du auswählst.' },
      { title: '2. Prüfen', text: 'Jedes Ergebnis wird mit Größe und Speicherort angezeigt. Du entscheidest, was weg kann.' },
      { title: '3. Aufräumen', text: 'Ausgewähltes wandert zuerst in den Papierkorb – du kannst es also noch zurücklegen.' },
    ],
    compareTitle: 'Kostenlose Mac Cleaner im Vergleich?',
    compareLead: 'Ehrliche Vergleiche mit den Tools, die meist in Frage kommen:',
    compareLinks: [
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'Die besten kostenlosen Mac Cleaner 2026' },
      { href: '/vs/onyx', label: 'MacDiskCleaner vs OnyX' },
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac' },
      { href: '/vs/daisydisk', label: 'MacDiskCleaner vs DaisyDisk' },
    ],
    faq: [
      { q: 'Ist MacDiskCleaner wirklich kostenlos oder eine Testversion?', a: 'Es gibt keine Testphase und kein Ablaufdatum. Scannen und Ergebnisse ansehen ist für immer kostenlos, und du kannst insgesamt 2 GB gratis aufräumen – dauerhaft, nicht zeitlich begrenzt.' },
      { q: 'Wo ist der Haken?', a: 'Die einzige Grenze ist ein lebenslanges Aufräum-Kontingent von 2 GB: Du kannst so oft scannen, wie du willst, und alle Duplikate, großen Dateien und Datenmüll sehen. Sobald du insgesamt 2 GB gelöscht hast, fragt die App nach Pro (oder einem Lizenzschlüssel). Pro hebt die Grenze auf und bringt App-Deinstallation, Datenschutz-Bereinigung, Startobjekte-Manager und geplante Scans.' },
      { q: 'Läuft es auf meinem MacBook oder iMac?', a: 'Ja. Unterstützt werden macOS 14 Sonoma und neuer auf Macs mit Apple Silicon (ab M1) und Intel – MacBook Air, MacBook Pro, iMac, Mac mini, Mac Studio und Mac Pro.' },
      { q: 'Ist ein kostenloser Mac Cleaner sicher?', a: 'Ja, solange der Cleaner dir zeigt, was er entfernt, und Dateien in den Papierkorb verschiebt, statt sie sofort zu löschen. MacDiskCleaner macht beides – gratis und in Pro – und rührt Systemordner, Schlüsselbunde und Einstellungen nie an.' },
      { q: 'Lädt die Gratis-Version meine Daten hoch?', a: 'Nein. Scan und Analyse laufen komplett auf deinem Mac – Dateinamen, Pfade und Inhalte werden nie an einen Server gesendet, weder gratis noch mit Pro.' },
      { q: 'Verliere ich etwas, wenn ich später upgrade?', a: 'Nein. Pro ergänzt nur: Bereits freigegebener Speicher bleibt frei und deine Scan-Ergebnisse bleiben erhalten. Pro hebt die 2-GB-Grenze auf und schaltet vier zusätzliche Werkzeuge frei.' },
    ],
  },
  fr: {
    metaTitle: 'Nettoyeur Mac gratuit : fichiers inutiles, doublons et gros fichiers (sans essai)',
    metaDescription:
      'Un nettoyeur Mac vraiment gratuit : analysez tout gratuitement, pour toujours, et nettoyez jusqu’à 2 Go sans payer — fichiers inutiles, doublons, gros et anciens fichiers. Sans essai, sans compte, sans carte bancaire.',
    breadcrumb: 'Nettoyeur Mac gratuit',
    h1: 'Un nettoyeur Mac gratuit',
    h1Accent: 'vraiment gratuit.',
    lead: 'Pas de période d’essai. Pas de carte bancaire. Supprimez les fichiers inutiles, trouvez les doublons et repérez les gros fichiers qui encombrent votre stockage — téléchargez-le et lancez l’analyse en moins d’une minute.',
    freeLabel: 'Inclus gratuitement, pour toujours',
    freeFeatures: [
      'Analyse de tout votre Mac — tous les résultats visibles, rien de masqué',
      'Doublons, gros et anciens fichiers, téléchargements et fichiers inutiles',
      'Nettoyage gratuit jusqu’à 2 Go au total (quota à vie)',
      'Suppression sûre — tout passe d’abord par la Corbeille',
      'Sans compte, sans période d’essai, sans carte bancaire',
    ],
    proLabel: 'Avec Pro (12,99 $ en paiement unique)',
    proFeatures: [
      'Nettoyage illimité — plus de limite de 2 Go',
      'Désinstallateur qui supprime aussi les fichiers résiduels',
      'Nettoyage de la confidentialité et gestion des éléments au démarrage',
      'Analyses automatiques programmées',
    ],
    proLink: 'Voir tous les tarifs',
    howTitle: 'Comment fonctionne l’offre gratuite',
    howLead: 'Trois étapes, sans compte, sans compte à rebours.',
    steps: [
      { title: '1. Analyser', text: 'Un clic analyse votre Mac — ou seulement les dossiers que vous choisissez.' },
      { title: '2. Vérifier', text: 'Chaque résultat est affiché avec sa taille et son emplacement. C’est vous qui décidez.' },
      { title: '3. Nettoyer', text: 'La sélection passe d’abord par la Corbeille : vous pouvez encore la récupérer.' },
    ],
    compareTitle: 'Vous comparez les nettoyeurs Mac gratuits ?',
    compareLead: 'Des comparatifs honnêtes avec les outils que l’on envisage le plus souvent :',
    compareLinks: [
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'Les meilleurs nettoyeurs Mac gratuits en 2026' },
      { href: '/vs/onyx', label: 'MacDiskCleaner vs OnyX' },
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac' },
      { href: '/vs/daisydisk', label: 'MacDiskCleaner vs DaisyDisk' },
    ],
    faq: [
      { q: 'MacDiskCleaner est-il vraiment gratuit ou s’agit-il d’un essai ?', a: 'Il n’y a ni période d’essai ni expiration. L’analyse et la consultation des résultats sont gratuites pour toujours, et vous pouvez nettoyer 2 Go au total sans payer — définitivement.' },
      { q: 'Où est le piège ?', a: 'La seule limite est un quota de nettoyage de 2 Go à vie : vous pouvez analyser autant que vous voulez et voir tous les doublons, gros fichiers et fichiers inutiles, mais une fois 2 Go supprimés au total, l’app demande Pro (ou une clé de licence) avant d’en supprimer davantage. Pro lève la limite et ajoute le désinstallateur, le nettoyage de la confidentialité, la gestion du démarrage et les analyses programmées.' },
      { q: 'Est-ce compatible avec mon MacBook ou mon iMac ?', a: 'Oui. MacDiskCleaner fonctionne sur macOS 14 Sonoma et ultérieur, sur les Mac Apple Silicon (M1 et suivants) et Intel : MacBook Air, MacBook Pro, iMac, Mac mini, Mac Studio et Mac Pro.' },
      { q: 'Un nettoyeur Mac gratuit est-il sûr ?', a: 'Oui, à condition qu’il vous montre ce qu’il va supprimer et qu’il place les fichiers dans la Corbeille au lieu de les effacer directement. MacDiskCleaner fait les deux, en gratuit comme en Pro, et ne touche jamais aux dossiers système, à vos trousseaux ni à vos préférences.' },
      { q: 'La version gratuite envoie-t-elle mes données ?', a: 'Non. L’analyse se fait entièrement sur votre Mac : les noms, chemins et contenus de vos fichiers ne sont jamais envoyés à un serveur, en gratuit comme en Pro.' },
      { q: 'Si je passe à Pro plus tard, est-ce que je perds quelque chose ?', a: 'Non. Pro ne fait qu’ajouter : l’espace déjà libéré le reste et vos résultats d’analyse sont conservés. Pro supprime la limite de 2 Go et débloque quatre outils supplémentaires.' },
    ],
  },
}
