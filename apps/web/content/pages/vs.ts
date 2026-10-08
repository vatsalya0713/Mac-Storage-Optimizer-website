import type { Localized } from '@/lib/localized'
import type { FaqItem } from '@/components/site/FaqSection'

export type Cell = boolean | string

export type ComparisonCopy = {
  metaTitle: string
  metaDescription: string
  breadcrumb: string
  h1: string
  lead: string
  columns: string[] // first is always MacDiskCleaner
  rows: { label: string; values: Cell[] }[]
  tableNote: string
  differencesTitle: string
  differences: { title: string; text: string }[]
  verdictTitle: string
  verdicts: { name: string; text: string }[]
  faq: FaqItem[]
  ctaTitle: string
  ctaText: string
  related: { href: string; label: string }[]
}

// Competitor facts were checked against each vendor's public pages
// (pricing, trial terms, feature lists) in October 2026. Prices vary by
// region and promotions, so they are stated as approximate list prices.

export const vsCleanMyMac: Localized<ComparisonCopy> = {
  en: {
    metaTitle: 'MacDiskCleaner vs CleanMyMac (2026): One-Time $12.99 vs Subscription — Full Comparison',
    metaDescription:
      'MacDiskCleaner vs CleanMyMac (with OnyX for reference): subscription vs one-time price, free tiers, duplicate and large-file finders, uninstallers, malware tools and safety — compared honestly.',
    breadcrumb: 'vs. CleanMyMac',
    h1: 'MacDiskCleaner vs CleanMyMac',
    lead: 'Two popular Mac cleaners with very different price models — a yearly subscription versus a one-time $12.99 — plus the free OnyX for reference. Here is an honest side-by-side so you can pick the right one.',
    columns: ['MacDiskCleaner', 'CleanMyMac', 'OnyX'],
    rows: [
      { label: 'Price', values: ['Free tier + $12.99 one-time Pro', 'Subscription (from about $39.95/yr) or a pricier one-time licence', 'Free'] },
      { label: 'Free option', values: ['Free forever: full scan + 2 GB cleanup', '7-day trial, then a paid plan', 'Completely free'] },
      { label: 'Junk & cache cleanup', values: [true, true, true] },
      { label: 'Duplicate file finder', values: [true, true, false] },
      { label: 'Large & old file finder', values: [true, true, false] },
      { label: 'App uninstaller (removes leftovers)', values: ['Pro', true, false] },
      { label: 'Developer cleanup (Xcode, node_modules…)', values: [true, 'Partly', false] },
      { label: 'Malware scanning', values: [false, true, false] },
      { label: 'Advanced system maintenance scripts', values: [false, 'Some', true] },
      { label: 'Guided, beginner-friendly interface', values: [true, true, false] },
      { label: 'Moves files to Trash first', values: [true, true, 'Depends on the task'] },
    ],
    tableNote: 'Competitor prices are approximate list prices and vary by region and promotion. Check each vendor’s site for current pricing.',
    differencesTitle: 'The key differences',
    differences: [
      { title: 'Price model', text: 'CleanMyMac is mainly sold as a yearly subscription; its one-time licence covers only the current major version. OnyX is free. MacDiskCleaner has a free tier that never expires and a single $12.99 Pro upgrade with lifetime updates.' },
      { title: 'Scope', text: 'CleanMyMac is the broadest suite — cleanup plus malware scanning, performance tools and an app updater. MacDiskCleaner focuses on storage: junk, duplicates, large and old files, developer caches, uninstalling and privacy. OnyX is a maintenance toolbox for experienced users.' },
      { title: 'Ease of use', text: 'CleanMyMac and MacDiskCleaner guide you and show what each item is before removing it. OnyX exposes powerful system tasks with little explanation, so it suits people who already know what they do.' },
    ],
    verdictTitle: 'Which one should you choose?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Best if you want a focused storage cleaner without a subscription: a free tier you can actually use, then $12.99 once.' },
      { name: 'CleanMyMac', text: 'Best if you want the widest all-in-one feature set, including malware scanning, and don’t mind a yearly fee.' },
      { name: 'OnyX', text: 'Best for technically confident users who want free, manual maintenance tools and don’t need a duplicate or large-file finder.' },
    ],
    faq: [
      { q: 'Is CleanMyMac better than OnyX?', a: 'They do different jobs. CleanMyMac is a guided, paid all-in-one cleaner with malware scanning; OnyX is a free maintenance utility for advanced users. If you mainly need disk space back, a focused cleaner like MacDiskCleaner covers that for a one-time $12.99.' },
      { q: 'Is there a free alternative to CleanMyMac?', a: 'Yes. OnyX is completely free but technical. MacDiskCleaner has a free tier with no time limit: scan everything and clean up to 2 GB, then upgrade once for $12.99 if you need more.' },
      { q: 'Is CleanMyMac a subscription?', a: 'Mostly. MacPaw sells CleanMyMac as a yearly subscription and also offers a one-time licence that includes updates only for the current major version.' },
      { q: 'Can I use MacDiskCleaner and OnyX together?', a: 'Yes. Many people use OnyX for occasional maintenance scripts and MacDiskCleaner to find and safely remove the files actually taking up space.' },
    ],
    ctaTitle: 'Try MacDiskCleaner before you decide',
    ctaText: 'Free download, no account. See exactly what it finds on your Mac.',
    related: [
      { href: '/vs/onyx', label: 'MacDiskCleaner vs OnyX in detail' },
      { href: '/vs/daisydisk', label: 'MacDiskCleaner vs DaisyDisk' },
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'Best free Mac cleaners' },
    ],
  },
  es: {
    metaTitle: 'MacDiskCleaner vs CleanMyMac (2026): 12,99 $ una vez o suscripción — comparativa completa',
    metaDescription:
      'CleanMyMac vs OnyX vs MacDiskCleaner, comparados con honestidad: suscripción o pago único, planes gratuitos, buscadores de duplicados y archivos grandes, desinstaladores, antimalware y seguridad.',
    breadcrumb: 'vs. CleanMyMac',
    h1: 'MacDiskCleaner vs CleanMyMac',
    lead: 'Dos limpiadores de Mac populares con modelos de precio muy distintos —suscripción anual frente a un pago único de 12,99 $—, con OnyX, gratuito, como referencia. Aquí tienes una comparativa honesta para elegir bien.',
    columns: ['MacDiskCleaner', 'CleanMyMac', 'OnyX'],
    rows: [
      { label: 'Precio', values: ['Plan gratis + Pro por 12,99 $ (pago único)', 'Suscripción (desde unos 39,95 $/año) o licencia única más cara', 'Gratis'] },
      { label: 'Opción gratuita', values: ['Gratis para siempre: análisis completo + 2 GB de limpieza', 'Prueba de 7 días y después de pago', 'Totalmente gratis'] },
      { label: 'Limpieza de basura y cachés', values: [true, true, true] },
      { label: 'Buscador de duplicados', values: [true, true, false] },
      { label: 'Buscador de archivos grandes y antiguos', values: [true, true, false] },
      { label: 'Desinstalador (elimina restos)', values: ['Pro', true, false] },
      { label: 'Limpieza para desarrolladores (Xcode, node_modules…)', values: [true, 'En parte', false] },
      { label: 'Análisis de malware', values: [false, true, false] },
      { label: 'Scripts avanzados de mantenimiento', values: [false, 'Algunos', true] },
      { label: 'Interfaz guiada y sencilla', values: [true, true, false] },
      { label: 'Mueve a la Papelera primero', values: [true, true, 'Según la tarea'] },
    ],
    tableNote: 'Los precios de la competencia son aproximados y varían según la región y las promociones. Consulta la web de cada fabricante.',
    differencesTitle: 'Las diferencias clave',
    differences: [
      { title: 'Modelo de precio', text: 'CleanMyMac se vende sobre todo como suscripción anual; su licencia única solo cubre la versión principal actual. OnyX es gratis. MacDiskCleaner tiene un plan gratuito que no caduca y una única mejora Pro de 12,99 $ con actualizaciones de por vida.' },
      { title: 'Alcance', text: 'CleanMyMac es la suite más amplia: limpieza, antimalware, rendimiento y actualizador de apps. MacDiskCleaner se centra en el almacenamiento: basura, duplicados, archivos grandes y antiguos, cachés de desarrollo, desinstalación y privacidad. OnyX es una caja de herramientas de mantenimiento para usuarios avanzados.' },
      { title: 'Facilidad de uso', text: 'CleanMyMac y MacDiskCleaner te guían y muestran qué es cada elemento antes de borrarlo. OnyX ofrece tareas potentes del sistema con poca explicación, así que es para quien ya sabe lo que hace.' },
    ],
    verdictTitle: '¿Cuál deberías elegir?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Ideal si quieres un limpiador de almacenamiento centrado y sin suscripción: un plan gratuito útil de verdad y después 12,99 $ una sola vez.' },
      { name: 'CleanMyMac', text: 'Ideal si quieres el conjunto de funciones más amplio, antimalware incluido, y no te importa pagar cada año.' },
      { name: 'OnyX', text: 'Ideal para usuarios con conocimientos que quieren herramientas de mantenimiento gratis y no necesitan buscar duplicados ni archivos grandes.' },
    ],
    faq: [
      { q: '¿CleanMyMac es mejor que OnyX?', a: 'Hacen trabajos distintos. CleanMyMac es un limpiador guiado de pago con antimalware; OnyX es una utilidad de mantenimiento gratuita para usuarios avanzados. Si sobre todo necesitas recuperar espacio, un limpiador centrado como MacDiskCleaner lo cubre por 12,99 $ una vez.' },
      { q: '¿Hay una alternativa gratuita a CleanMyMac?', a: 'Sí. OnyX es totalmente gratis pero técnico. MacDiskCleaner tiene un plan gratuito sin límite de tiempo: analiza todo y limpia hasta 2 GB, y si necesitas más, mejora una sola vez por 12,99 $.' },
      { q: '¿CleanMyMac es una suscripción?', a: 'Principalmente. MacPaw vende CleanMyMac como suscripción anual y también ofrece una licencia única que solo incluye actualizaciones de la versión principal actual.' },
      { q: '¿Puedo usar MacDiskCleaner y OnyX a la vez?', a: 'Sí. Mucha gente usa OnyX para tareas de mantenimiento ocasionales y MacDiskCleaner para encontrar y eliminar con seguridad lo que de verdad ocupa espacio.' },
    ],
    ctaTitle: 'Prueba MacDiskCleaner antes de decidir',
    ctaText: 'Descarga gratis, sin cuenta. Mira exactamente lo que encuentra en tu Mac.',
    related: [
      { href: '/vs/onyx', label: 'MacDiskCleaner vs OnyX en detalle' },
      { href: '/vs/daisydisk', label: 'MacDiskCleaner vs DaisyDisk' },
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'Los mejores limpiadores de Mac gratis' },
    ],
  },
  de: {
    metaTitle: 'MacDiskCleaner vs CleanMyMac (2026): einmalig 12,99 $ oder Abo – der komplette Vergleich',
    metaDescription:
      'CleanMyMac vs OnyX vs MacDiskCleaner ehrlich verglichen: Abo oder Einmalkauf, Gratis-Versionen, Duplikat- und Große-Dateien-Finder, Deinstallation, Malware-Scan und Sicherheit.',
    breadcrumb: 'vs. CleanMyMac',
    h1: 'MacDiskCleaner vs CleanMyMac',
    lead: 'Zwei beliebte Mac Cleaner mit sehr unterschiedlichem Preismodell – Jahresabo gegen einmalig 12,99 $ – plus das kostenlose OnyX als Referenz. Hier der ehrliche Vergleich, damit du das Passende wählst.',
    columns: ['MacDiskCleaner', 'CleanMyMac', 'OnyX'],
    rows: [
      { label: 'Preis', values: ['Gratis-Version + Pro für einmalig 12,99 $', 'Abo (ab ca. 39,95 $/Jahr) oder teurere Einmal-Lizenz', 'Kostenlos'] },
      { label: 'Kostenlose Option', values: ['Für immer gratis: kompletter Scan + 2 GB Aufräumen', '7 Tage Test, danach kostenpflichtig', 'Komplett kostenlos'] },
      { label: 'Datenmüll & Caches entfernen', values: [true, true, true] },
      { label: 'Duplikat-Finder', values: [true, true, false] },
      { label: 'Große & alte Dateien finden', values: [true, true, false] },
      { label: 'App-Deinstallation (inkl. Reste)', values: ['Pro', true, false] },
      { label: 'Entwickler-Bereinigung (Xcode, node_modules …)', values: [true, 'Teilweise', false] },
      { label: 'Malware-Scan', values: [false, true, false] },
      { label: 'Erweiterte Wartungsskripte', values: [false, 'Einige', true] },
      { label: 'Geführte, einsteigerfreundliche Oberfläche', values: [true, true, false] },
      { label: 'Zuerst in den Papierkorb', values: [true, true, 'Je nach Aufgabe'] },
    ],
    tableNote: 'Preise der Mitbewerber sind ungefähre Listenpreise und variieren je nach Region und Aktion. Aktuelle Preise auf der jeweiligen Website prüfen.',
    differencesTitle: 'Die wichtigsten Unterschiede',
    differences: [
      { title: 'Preismodell', text: 'CleanMyMac wird vor allem als Jahresabo verkauft; die Einmal-Lizenz gilt nur für die aktuelle Hauptversion. OnyX ist kostenlos. MacDiskCleaner hat eine Gratis-Version ohne Ablauf und ein einmaliges Pro-Upgrade für 12,99 $ mit lebenslangen Updates.' },
      { title: 'Umfang', text: 'CleanMyMac ist die umfangreichste Suite – Aufräumen plus Malware-Scan, Leistungswerkzeuge und App-Updater. MacDiskCleaner konzentriert sich auf Speicher: Datenmüll, Duplikate, große und alte Dateien, Entwickler-Caches, Deinstallation und Datenschutz. OnyX ist ein Wartungs-Werkzeugkasten für Erfahrene.' },
      { title: 'Bedienung', text: 'CleanMyMac und MacDiskCleaner führen dich und zeigen, was jedes Objekt ist, bevor es entfernt wird. OnyX bietet mächtige Systemaufgaben mit wenig Erklärung – eher für Leute, die genau wissen, was sie tun.' },
    ],
    verdictTitle: 'Welches solltest du wählen?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Ideal, wenn du einen fokussierten Speicher-Cleaner ohne Abo willst: eine wirklich nutzbare Gratis-Version, danach einmalig 12,99 $.' },
      { name: 'CleanMyMac', text: 'Ideal, wenn du den größten Funktionsumfang inklusive Malware-Scan willst und eine Jahresgebühr in Kauf nimmst.' },
      { name: 'OnyX', text: 'Ideal für technisch versierte Nutzer, die kostenlose manuelle Wartungswerkzeuge wollen und keinen Duplikat- oder Große-Dateien-Finder brauchen.' },
    ],
    faq: [
      { q: 'Ist CleanMyMac besser als OnyX?', a: 'Die beiden haben unterschiedliche Aufgaben. CleanMyMac ist ein geführter, kostenpflichtiger All-in-one-Cleaner mit Malware-Scan; OnyX ist ein kostenloses Wartungstool für Fortgeschrittene. Wenn du vor allem Speicher zurück willst, deckt ein fokussierter Cleaner wie MacDiskCleaner das für einmalig 12,99 $ ab.' },
      { q: 'Gibt es eine kostenlose Alternative zu CleanMyMac?', a: 'Ja. OnyX ist komplett kostenlos, aber technisch. MacDiskCleaner hat eine Gratis-Version ohne Zeitlimit: alles scannen und bis zu 2 GB aufräumen – bei Bedarf einmalig für 12,99 $ upgraden.' },
      { q: 'Ist CleanMyMac ein Abo?', a: 'Überwiegend. MacPaw verkauft CleanMyMac als Jahresabo und bietet zusätzlich eine Einmal-Lizenz, die nur Updates der aktuellen Hauptversion enthält.' },
      { q: 'Kann ich MacDiskCleaner und OnyX zusammen nutzen?', a: 'Ja. Viele nutzen OnyX für gelegentliche Wartungsskripte und MacDiskCleaner, um die Dateien zu finden und sicher zu entfernen, die wirklich Platz belegen.' },
    ],
    ctaTitle: 'Teste MacDiskCleaner, bevor du dich entscheidest',
    ctaText: 'Kostenloser Download, kein Konto. Sieh genau, was auf deinem Mac gefunden wird.',
    related: [
      { href: '/vs/onyx', label: 'MacDiskCleaner vs OnyX im Detail' },
      { href: '/vs/daisydisk', label: 'MacDiskCleaner vs DaisyDisk' },
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'Die besten kostenlosen Mac Cleaner' },
    ],
  },
  fr: {
    metaTitle: 'MacDiskCleaner vs CleanMyMac (2026) : 12,99 $ une fois ou abonnement — comparatif complet',
    metaDescription:
      'CleanMyMac vs OnyX vs MacDiskCleaner, comparés honnêtement : abonnement ou paiement unique, offres gratuites, recherche de doublons et de gros fichiers, désinstallation, antimalware et sécurité.',
    breadcrumb: 'vs. CleanMyMac',
    h1: 'MacDiskCleaner vs CleanMyMac',
    lead: 'Deux nettoyeurs Mac populaires aux modèles de prix très différents — abonnement annuel contre 12,99 $ une seule fois — avec OnyX, gratuit, en référence. Voici un comparatif honnête pour bien choisir.',
    columns: ['MacDiskCleaner', 'CleanMyMac', 'OnyX'],
    rows: [
      { label: 'Prix', values: ['Offre gratuite + Pro à 12,99 $ (paiement unique)', 'Abonnement (à partir d’environ 39,95 $/an) ou licence unique plus chère', 'Gratuit'] },
      { label: 'Option gratuite', values: ['Gratuit pour toujours : analyse complète + 2 Go de nettoyage', 'Essai de 7 jours, puis payant', 'Entièrement gratuit'] },
      { label: 'Nettoyage des fichiers inutiles et caches', values: [true, true, true] },
      { label: 'Recherche de doublons', values: [true, true, false] },
      { label: 'Recherche de gros et anciens fichiers', values: [true, true, false] },
      { label: 'Désinstallateur (supprime les restes)', values: ['Pro', true, false] },
      { label: 'Nettoyage développeur (Xcode, node_modules…)', values: [true, 'En partie', false] },
      { label: 'Analyse antimalware', values: [false, true, false] },
      { label: 'Scripts de maintenance avancés', values: [false, 'Quelques-uns', true] },
      { label: 'Interface guidée et accessible', values: [true, true, false] },
      { label: 'Passe d’abord par la Corbeille', values: [true, true, 'Selon la tâche'] },
    ],
    tableNote: 'Les prix des concurrents sont des prix catalogue approximatifs, variables selon la région et les promotions. Vérifiez sur le site de chaque éditeur.',
    differencesTitle: 'Les différences essentielles',
    differences: [
      { title: 'Modèle de prix', text: 'CleanMyMac se vend surtout en abonnement annuel ; sa licence unique ne couvre que la version majeure en cours. OnyX est gratuit. MacDiskCleaner propose une offre gratuite sans limite de durée et une seule mise à niveau Pro à 12,99 $ avec mises à jour à vie.' },
      { title: 'Périmètre', text: 'CleanMyMac est la suite la plus complète — nettoyage, antimalware, outils de performance et mise à jour des apps. MacDiskCleaner se concentre sur le stockage : fichiers inutiles, doublons, gros et anciens fichiers, caches de développement, désinstallation et confidentialité. OnyX est une boîte à outils de maintenance pour utilisateurs expérimentés.' },
      { title: 'Facilité d’utilisation', text: 'CleanMyMac et MacDiskCleaner vous guident et montrent ce qu’est chaque élément avant de le supprimer. OnyX donne accès à des tâches système puissantes avec peu d’explications : il s’adresse à ceux qui savent ce qu’ils font.' },
    ],
    verdictTitle: 'Lequel choisir ?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Idéal si vous voulez un nettoyeur de stockage ciblé, sans abonnement : une offre gratuite vraiment utile, puis 12,99 $ une seule fois.' },
      { name: 'CleanMyMac', text: 'Idéal si vous voulez l’ensemble de fonctions le plus large, antimalware compris, et qu’un abonnement annuel ne vous gêne pas.' },
      { name: 'OnyX', text: 'Idéal pour les utilisateurs avertis qui veulent des outils de maintenance gratuits et manuels, sans besoin de chercher doublons ou gros fichiers.' },
    ],
    faq: [
      { q: 'CleanMyMac est-il meilleur qu’OnyX ?', a: 'Ils ne font pas le même travail. CleanMyMac est un nettoyeur guidé et payant avec antimalware ; OnyX est un utilitaire de maintenance gratuit pour utilisateurs avancés. Si vous voulez surtout récupérer de l’espace, un nettoyeur ciblé comme MacDiskCleaner le fait pour 12,99 $ une fois.' },
      { q: 'Existe-t-il une alternative gratuite à CleanMyMac ?', a: 'Oui. OnyX est entièrement gratuit mais technique. MacDiskCleaner propose une offre gratuite sans limite de durée : analysez tout et nettoyez jusqu’à 2 Go, puis passez à Pro une seule fois pour 12,99 $ si besoin.' },
      { q: 'CleanMyMac est-il un abonnement ?', a: 'Principalement. MacPaw vend CleanMyMac en abonnement annuel et propose aussi une licence unique qui n’inclut que les mises à jour de la version majeure en cours.' },
      { q: 'Peut-on utiliser MacDiskCleaner et OnyX ensemble ?', a: 'Oui. Beaucoup utilisent OnyX pour des scripts de maintenance ponctuels et MacDiskCleaner pour trouver et supprimer sans risque les fichiers qui prennent vraiment de la place.' },
    ],
    ctaTitle: 'Essayez MacDiskCleaner avant de décider',
    ctaText: 'Téléchargement gratuit, sans compte. Voyez exactement ce qu’il trouve sur votre Mac.',
    related: [
      { href: '/vs/onyx', label: 'MacDiskCleaner vs OnyX en détail' },
      { href: '/vs/daisydisk', label: 'MacDiskCleaner vs DaisyDisk' },
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'Les meilleurs nettoyeurs Mac gratuits' },
    ],
  },
}

export const vsOnyx: Localized<ComparisonCopy> = {
  en: {
    metaTitle: 'MacDiskCleaner vs OnyX (2026): Which Free Mac Cleaner Is Right for You?',
    metaDescription:
      'OnyX vs MacDiskCleaner: OnyX is a free maintenance toolbox for advanced users; MacDiskCleaner is a guided cleaner with duplicate and large-file finders and a free tier. Full comparison.',
    breadcrumb: 'vs. OnyX',
    h1: 'MacDiskCleaner vs OnyX',
    lead: 'OnyX is a free, powerful maintenance utility for technically confident users. MacDiskCleaner is guided and beginner-friendly, and finds the duplicates and large files OnyX doesn’t look for.',
    columns: ['MacDiskCleaner', 'OnyX'],
    rows: [
      { label: 'Price', values: ['Free tier + $12.99 one-time Pro', 'Free'] },
      { label: 'Junk & cache cleanup', values: [true, true] },
      { label: 'Duplicate file finder', values: [true, false] },
      { label: 'Large & old file finder', values: [true, false] },
      { label: 'Folder-size browser', values: ['Space Lens', false] },
      { label: 'App uninstaller (removes leftovers)', values: ['Pro', false] },
      { label: 'Developer cleanup (Xcode, node_modules…)', values: [true, false] },
      { label: 'Startup items manager', values: ['Pro', false] },
      { label: 'Maintenance scripts, Spotlight/Launch Services rebuilds', values: [false, true] },
      { label: 'Hidden macOS settings', values: [false, true] },
      { label: 'One build for every recent macOS', values: [true, 'Separate build per macOS version'] },
      { label: 'Shows what will be removed first', values: [true, 'Partly'] },
    ],
    tableNote: 'OnyX is developed by Titanium Software and publishes a specific version for each major macOS release.',
    differencesTitle: 'The key differences',
    differences: [
      { title: 'Purpose', text: 'OnyX is a maintenance toolbox: it runs maintenance scripts, rebuilds databases and indexes, clears caches and exposes hidden settings. MacDiskCleaner is built to answer "what is using my space?" and remove it safely.' },
      { title: 'Finding space', text: 'MacDiskCleaner scans for duplicates, large and old files, old downloads, developer caches and app leftovers, with sizes for each. OnyX has no duplicate or large-file finder.' },
      { title: 'Who it suits', text: 'OnyX assumes you know what each task does. MacDiskCleaner explains every item, labels anything risky as Review first, and moves everything to the Trash.' },
    ],
    verdictTitle: 'Which one should you choose?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Best if your goal is getting disk space back safely, with a guided scan and a free tier that never expires.' },
      { name: 'OnyX', text: 'Best if you want free, manual system maintenance and customisation, and you’re comfortable with technical options.' },
    ],
    faq: [
      { q: 'Is OnyX safe to use?', a: 'OnyX is a long-standing, well-known free utility. It is safe when used as intended, but it assumes you understand each task — there’s no guided “here’s what’s safe to clean” view.' },
      { q: 'Does OnyX find duplicate or large files?', a: 'No. OnyX focuses on maintenance, cache cleaning and settings. To find duplicates and large files you need a separate tool such as MacDiskCleaner.' },
      { q: 'Is OnyX free?', a: 'Yes, OnyX is free. Download it only from the developer, Titanium Software, and pick the version that matches your macOS release.' },
      { q: 'Why pay for MacDiskCleaner Pro if OnyX is free?', a: 'You may not need to: the free tier lets you scan everything and clean up to 2 GB. Pro ($12.99 once) removes the cap and adds a guided uninstaller, privacy cleaner, startup manager and scheduled scans.' },
    ],
    ctaTitle: 'See what OnyX can’t show you',
    ctaText: 'Free download — find duplicates, large files and leftovers in one scan.',
    related: [
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac vs OnyX' },
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'Best free Mac cleaners' },
      { href: '/blog/how-to-clean-junk-files-mac', label: 'How to clean junk files on Mac' },
    ],
  },
  es: {
    metaTitle: 'MacDiskCleaner vs OnyX (2026): ¿qué limpiador de Mac gratis te conviene?',
    metaDescription:
      'OnyX vs MacDiskCleaner: OnyX es una caja de herramientas de mantenimiento gratuita para usuarios avanzados; MacDiskCleaner es un limpiador guiado con buscador de duplicados y archivos grandes y plan gratuito.',
    breadcrumb: 'vs. OnyX',
    h1: 'MacDiskCleaner vs OnyX',
    lead: 'OnyX es una utilidad de mantenimiento gratuita y potente para usuarios con conocimientos. MacDiskCleaner es guiado y sencillo, y encuentra los duplicados y archivos grandes que OnyX no busca.',
    columns: ['MacDiskCleaner', 'OnyX'],
    rows: [
      { label: 'Precio', values: ['Plan gratis + Pro por 12,99 $ (pago único)', 'Gratis'] },
      { label: 'Limpieza de basura y cachés', values: [true, true] },
      { label: 'Buscador de duplicados', values: [true, false] },
      { label: 'Buscador de archivos grandes y antiguos', values: [true, false] },
      { label: 'Explorador de tamaño de carpetas', values: ['Space Lens', false] },
      { label: 'Desinstalador (elimina restos)', values: ['Pro', false] },
      { label: 'Limpieza para desarrolladores (Xcode, node_modules…)', values: [true, false] },
      { label: 'Gestor de ítems de inicio', values: ['Pro', false] },
      { label: 'Scripts de mantenimiento, reconstrucción de Spotlight/Launch Services', values: [false, true] },
      { label: 'Ajustes ocultos de macOS', values: [false, true] },
      { label: 'Una sola versión para todos los macOS recientes', values: [true, 'Una versión por cada macOS'] },
      { label: 'Muestra antes lo que se va a borrar', values: [true, 'En parte'] },
    ],
    tableNote: 'OnyX lo desarrolla Titanium Software, que publica una versión específica para cada versión principal de macOS.',
    differencesTitle: 'Las diferencias clave',
    differences: [
      { title: 'Propósito', text: 'OnyX es una caja de herramientas de mantenimiento: ejecuta scripts, reconstruye bases de datos e índices, borra cachés y da acceso a ajustes ocultos. MacDiskCleaner está pensado para responder «¿qué ocupa mi espacio?» y eliminarlo con seguridad.' },
      { title: 'Encontrar espacio', text: 'MacDiskCleaner busca duplicados, archivos grandes y antiguos, descargas viejas, cachés de desarrollo y restos de apps, con el tamaño de cada uno. OnyX no tiene buscador de duplicados ni de archivos grandes.' },
      { title: 'Para quién es', text: 'OnyX da por hecho que sabes qué hace cada tarea. MacDiskCleaner explica cada elemento, marca lo delicado como «Revisar antes» y lo mueve todo a la Papelera.' },
    ],
    verdictTitle: '¿Cuál deberías elegir?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Ideal si tu objetivo es recuperar espacio con seguridad, con un análisis guiado y un plan gratuito que no caduca.' },
      { name: 'OnyX', text: 'Ideal si quieres mantenimiento y personalización del sistema gratis y manuales, y te sientes cómodo con opciones técnicas.' },
    ],
    faq: [
      { q: '¿Es seguro usar OnyX?', a: 'OnyX es una utilidad gratuita veterana y conocida. Es segura si se usa como está previsto, pero da por hecho que entiendes cada tarea: no hay una vista guiada de «esto es seguro limpiar».' },
      { q: '¿OnyX encuentra archivos duplicados o grandes?', a: 'No. OnyX se centra en el mantenimiento, la limpieza de cachés y los ajustes. Para encontrar duplicados y archivos grandes necesitas otra herramienta, como MacDiskCleaner.' },
      { q: '¿OnyX es gratis?', a: 'Sí, OnyX es gratis. Descárgalo solo desde la web de su desarrollador, Titanium Software, y elige la versión que corresponde a tu macOS.' },
      { q: '¿Por qué pagar MacDiskCleaner Pro si OnyX es gratis?', a: 'Puede que no lo necesites: el plan gratuito te permite analizar todo y limpiar hasta 2 GB. Pro (12,99 $ una vez) quita el límite y añade desinstalador guiado, limpiador de privacidad, gestor de inicio y análisis programados.' },
    ],
    ctaTitle: 'Descubre lo que OnyX no te muestra',
    ctaText: 'Descarga gratis: encuentra duplicados, archivos grandes y restos en un solo análisis.',
    related: [
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac vs OnyX' },
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'Los mejores limpiadores de Mac gratis' },
      { href: '/blog/how-to-clean-junk-files-mac', label: 'Cómo limpiar archivos basura en Mac' },
    ],
  },
  de: {
    metaTitle: 'MacDiskCleaner vs OnyX (2026): Welcher kostenlose Mac Cleaner passt zu dir?',
    metaDescription:
      'OnyX vs MacDiskCleaner: OnyX ist ein kostenloser Wartungs-Werkzeugkasten für Fortgeschrittene, MacDiskCleaner ein geführter Cleaner mit Duplikat- und Große-Dateien-Finder und Gratis-Version.',
    breadcrumb: 'vs. OnyX',
    h1: 'MacDiskCleaner vs OnyX',
    lead: 'OnyX ist ein kostenloses, mächtiges Wartungstool für technisch versierte Nutzer. MacDiskCleaner ist geführt und einsteigerfreundlich und findet die Duplikate und großen Dateien, nach denen OnyX nicht sucht.',
    columns: ['MacDiskCleaner', 'OnyX'],
    rows: [
      { label: 'Preis', values: ['Gratis-Version + Pro für einmalig 12,99 $', 'Kostenlos'] },
      { label: 'Datenmüll & Caches entfernen', values: [true, true] },
      { label: 'Duplikat-Finder', values: [true, false] },
      { label: 'Große & alte Dateien finden', values: [true, false] },
      { label: 'Ordnergrößen-Browser', values: ['Space Lens', false] },
      { label: 'App-Deinstallation (inkl. Reste)', values: ['Pro', false] },
      { label: 'Entwickler-Bereinigung (Xcode, node_modules …)', values: [true, false] },
      { label: 'Startobjekte-Manager', values: ['Pro', false] },
      { label: 'Wartungsskripte, Spotlight-/Launch-Services-Neuaufbau', values: [false, true] },
      { label: 'Versteckte macOS-Einstellungen', values: [false, true] },
      { label: 'Eine Version für alle aktuellen macOS', values: [true, 'Eigene Version je macOS'] },
      { label: 'Zeigt vorher, was entfernt wird', values: [true, 'Teilweise'] },
    ],
    tableNote: 'OnyX wird von Titanium Software entwickelt, das für jede macOS-Hauptversion eine eigene Version veröffentlicht.',
    differencesTitle: 'Die wichtigsten Unterschiede',
    differences: [
      { title: 'Zweck', text: 'OnyX ist ein Wartungs-Werkzeugkasten: Es führt Wartungsskripte aus, baut Datenbanken und Indizes neu auf, leert Caches und macht versteckte Einstellungen zugänglich. MacDiskCleaner beantwortet die Frage „Was belegt meinen Speicher?“ und entfernt es sicher.' },
      { title: 'Speicher finden', text: 'MacDiskCleaner sucht Duplikate, große und alte Dateien, alte Downloads, Entwickler-Caches und App-Reste – jeweils mit Größe. OnyX hat keinen Duplikat- oder Große-Dateien-Finder.' },
      { title: 'Für wen', text: 'OnyX setzt voraus, dass du jede Aufgabe verstehst. MacDiskCleaner erklärt jedes Objekt, markiert Riskantes als „Erst prüfen“ und verschiebt alles in den Papierkorb.' },
    ],
    verdictTitle: 'Welches solltest du wählen?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Ideal, wenn du sicher Speicher zurückgewinnen willst – mit geführtem Scan und einer Gratis-Version ohne Ablauf.' },
      { name: 'OnyX', text: 'Ideal, wenn du kostenlose, manuelle Systemwartung und Anpassung willst und mit technischen Optionen vertraut bist.' },
    ],
    faq: [
      { q: 'Ist OnyX sicher?', a: 'OnyX ist ein bewährtes, bekanntes Gratis-Tool. Es ist sicher, wenn es wie vorgesehen genutzt wird, setzt aber voraus, dass du jede Aufgabe verstehst – eine geführte Ansicht „das kann sicher weg“ gibt es nicht.' },
      { q: 'Findet OnyX doppelte oder große Dateien?', a: 'Nein. OnyX konzentriert sich auf Wartung, Cache-Bereinigung und Einstellungen. Für Duplikate und große Dateien brauchst du ein anderes Tool wie MacDiskCleaner.' },
      { q: 'Ist OnyX kostenlos?', a: 'Ja, OnyX ist kostenlos. Lade es nur beim Entwickler Titanium Software herunter und wähle die Version, die zu deinem macOS passt.' },
      { q: 'Warum MacDiskCleaner Pro kaufen, wenn OnyX gratis ist?', a: 'Vielleicht musst du das gar nicht: Mit der Gratis-Version kannst du alles scannen und bis zu 2 GB aufräumen. Pro (einmalig 12,99 $) hebt die Grenze auf und bringt geführte Deinstallation, Datenschutz-Bereinigung, Startobjekte-Manager und geplante Scans.' },
    ],
    ctaTitle: 'Sieh, was OnyX dir nicht zeigt',
    ctaText: 'Kostenloser Download – Duplikate, große Dateien und Reste in einem Scan finden.',
    related: [
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac vs OnyX' },
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'Die besten kostenlosen Mac Cleaner' },
      { href: '/blog/how-to-clean-junk-files-mac', label: 'Datenmüll auf dem Mac entfernen' },
    ],
  },
  fr: {
    metaTitle: 'MacDiskCleaner vs OnyX (2026) : quel nettoyeur Mac gratuit choisir ?',
    metaDescription:
      'OnyX vs MacDiskCleaner : OnyX est une boîte à outils de maintenance gratuite pour utilisateurs avancés ; MacDiskCleaner est un nettoyeur guidé avec recherche de doublons et de gros fichiers et offre gratuite.',
    breadcrumb: 'vs. OnyX',
    h1: 'MacDiskCleaner vs OnyX',
    lead: 'OnyX est un utilitaire de maintenance gratuit et puissant pour les utilisateurs avertis. MacDiskCleaner est guidé et accessible, et trouve les doublons et gros fichiers qu’OnyX ne cherche pas.',
    columns: ['MacDiskCleaner', 'OnyX'],
    rows: [
      { label: 'Prix', values: ['Offre gratuite + Pro à 12,99 $ (paiement unique)', 'Gratuit'] },
      { label: 'Nettoyage des fichiers inutiles et caches', values: [true, true] },
      { label: 'Recherche de doublons', values: [true, false] },
      { label: 'Recherche de gros et anciens fichiers', values: [true, false] },
      { label: 'Explorateur de taille des dossiers', values: ['Space Lens', false] },
      { label: 'Désinstallateur (supprime les restes)', values: ['Pro', false] },
      { label: 'Nettoyage développeur (Xcode, node_modules…)', values: [true, false] },
      { label: 'Gestion des éléments au démarrage', values: ['Pro', false] },
      { label: 'Scripts de maintenance, reconstruction Spotlight/Launch Services', values: [false, true] },
      { label: 'Réglages cachés de macOS', values: [false, true] },
      { label: 'Une seule version pour les macOS récents', values: [true, 'Une version par macOS'] },
      { label: 'Montre d’abord ce qui sera supprimé', values: [true, 'En partie'] },
    ],
    tableNote: 'OnyX est développé par Titanium Software, qui publie une version spécifique pour chaque version majeure de macOS.',
    differencesTitle: 'Les différences essentielles',
    differences: [
      { title: 'Objectif', text: 'OnyX est une boîte à outils de maintenance : il exécute des scripts, reconstruit bases de données et index, vide les caches et donne accès à des réglages cachés. MacDiskCleaner répond à la question « qu’est-ce qui occupe mon espace ? » et le supprime sans risque.' },
      { title: 'Trouver de l’espace', text: 'MacDiskCleaner recherche doublons, gros et anciens fichiers, vieux téléchargements, caches de développement et restes d’apps, avec la taille de chacun. OnyX n’a ni recherche de doublons ni de gros fichiers.' },
      { title: 'Pour qui', text: 'OnyX suppose que vous savez ce que fait chaque tâche. MacDiskCleaner explique chaque élément, marque ce qui est délicat « À vérifier » et place tout dans la Corbeille.' },
    ],
    verdictTitle: 'Lequel choisir ?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Idéal si votre objectif est de récupérer de l’espace en sécurité, avec une analyse guidée et une offre gratuite sans limite de durée.' },
      { name: 'OnyX', text: 'Idéal si vous voulez une maintenance et une personnalisation du système gratuites et manuelles, et que les options techniques ne vous font pas peur.' },
    ],
    faq: [
      { q: 'OnyX est-il sûr ?', a: 'OnyX est un utilitaire gratuit ancien et reconnu. Il est sûr s’il est utilisé comme prévu, mais suppose que vous comprenez chaque tâche — il n’y a pas de vue guidée « voici ce qu’on peut nettoyer ».' },
      { q: 'OnyX trouve-t-il les doublons ou les gros fichiers ?', a: 'Non. OnyX se concentre sur la maintenance, le nettoyage des caches et les réglages. Pour les doublons et gros fichiers, il faut un autre outil comme MacDiskCleaner.' },
      { q: 'OnyX est-il gratuit ?', a: 'Oui, OnyX est gratuit. Téléchargez-le uniquement chez son développeur, Titanium Software, et choisissez la version correspondant à votre macOS.' },
      { q: 'Pourquoi payer MacDiskCleaner Pro si OnyX est gratuit ?', a: 'Ce n’est peut-être pas nécessaire : l’offre gratuite permet de tout analyser et de nettoyer jusqu’à 2 Go. Pro (12,99 $ une fois) lève la limite et ajoute désinstallateur guidé, nettoyage de la confidentialité, gestion du démarrage et analyses programmées.' },
    ],
    ctaTitle: 'Découvrez ce qu’OnyX ne vous montre pas',
    ctaText: 'Téléchargement gratuit — doublons, gros fichiers et restes en une seule analyse.',
    related: [
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac vs OnyX' },
      { href: '/blog/best-free-mac-cleaner-apps-2026', label: 'Les meilleurs nettoyeurs Mac gratuits' },
      { href: '/blog/how-to-clean-junk-files-mac', label: 'Supprimer les fichiers inutiles sur Mac' },
    ],
  },
}

export const vsDaisyDisk: Localized<ComparisonCopy> = {
  en: {
    metaTitle: 'MacDiskCleaner vs DaisyDisk (2026): Disk Map vs Guided Cleaner',
    metaDescription:
      'DaisyDisk vs MacDiskCleaner: DaisyDisk ($9.99) maps your disk visually and you delete manually; MacDiskCleaner finds junk, duplicates and large files and has a free tier. Full comparison.',
    breadcrumb: 'vs. DaisyDisk',
    h1: 'MacDiskCleaner vs DaisyDisk',
    lead: 'DaisyDisk draws a beautiful map of your disk, then you decide what to delete. MacDiskCleaner goes looking for junk, duplicates and large files for you — and has a genuinely free tier.',
    columns: ['MacDiskCleaner', 'DaisyDisk'],
    rows: [
      { label: 'Price', values: ['Free tier + $12.99 one-time Pro', '$9.99 one-time'] },
      { label: 'Free option', values: ['Scan everything + clean up to 2 GB', 'Trial scans but can’t delete'] },
      { label: 'Interactive visual disk map', values: [false, true] },
      { label: 'Folder-size browser', values: ['Space Lens', true] },
      { label: 'Junk & cache cleanup', values: [true, false] },
      { label: 'Duplicate file finder', values: [true, false] },
      { label: 'Large & old file finder', values: [true, 'Manually, via the map'] },
      { label: 'App uninstaller (removes leftovers)', values: ['Pro', false] },
      { label: 'Developer cleanup (Xcode, node_modules…)', values: [true, false] },
      { label: 'Files reviewed before deletion', values: [true, true] },
    ],
    tableNote: 'DaisyDisk pricing from the developer’s site; one licence covers up to five personal Macs.',
    differencesTitle: 'The key differences',
    differences: [
      { title: 'Exploring vs finding', text: 'DaisyDisk is the best way to see where space went: its sunburst map lets you drill into any folder. MacDiskCleaner instead searches for specific kinds of waste — duplicates, caches, old downloads, developer data — and lists them for you.' },
      { title: 'Cleaning', text: 'With DaisyDisk you collect items and delete them yourself. MacDiskCleaner suggests what is safe, marks anything risky as Review first, and moves everything to the Trash.' },
      { title: 'Free use', text: 'DaisyDisk’s trial can scan but not delete. MacDiskCleaner’s free tier scans everything and cleans up to 2 GB in total, with no time limit.' },
    ],
    verdictTitle: 'Which one should you choose?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Best if you want the app to find the waste for you — duplicates, junk, developer caches — and remove it safely.' },
      { name: 'DaisyDisk', text: 'Best if you enjoy exploring your disk visually and prefer to decide everything manually.' },
    ],
    faq: [
      { q: 'What does DaisyDisk do differently?', a: 'DaisyDisk’s strength is its interactive sunburst map of your disk: you explore folders visually and delete manually. It doesn’t automatically search for duplicates, junk files or app leftovers.' },
      { q: 'Can I use both?', a: 'Sure. Some people explore storage with DaisyDisk and use MacDiskCleaner for automatic duplicate and junk detection plus safe, Trash-first removal.' },
      { q: 'Does MacDiskCleaner have a visual breakdown?', a: 'Yes: the Storage view shows usage by category and Space Lens lists folders by size so you can drill down. It isn’t a sunburst map like DaisyDisk’s.' },
      { q: 'Is DaisyDisk free?', a: 'DaisyDisk has a free trial that can scan your disk, but deleting files requires the $9.99 licence.' },
    ],
    ctaTitle: 'Let MacDiskCleaner find the waste for you',
    ctaText: 'Free download — duplicates, junk and large files in one scan.',
    related: [
      { href: '/blog/find-delete-large-files-mac', label: 'How to find large files on Mac' },
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac vs OnyX' },
      { href: '/blog/best-mac-storage-cleaner-apps-2026', label: 'Best Mac storage cleaner apps' },
    ],
  },
  es: {
    metaTitle: 'MacDiskCleaner vs DaisyDisk (2026): mapa del disco o limpiador guiado',
    metaDescription:
      'DaisyDisk vs MacDiskCleaner: DaisyDisk (9,99 $) muestra un mapa visual del disco y tú borras a mano; MacDiskCleaner encuentra basura, duplicados y archivos grandes y tiene plan gratuito.',
    breadcrumb: 'vs. DaisyDisk',
    h1: 'MacDiskCleaner vs DaisyDisk',
    lead: 'DaisyDisk dibuja un mapa precioso de tu disco y luego tú decides qué borrar. MacDiskCleaner busca por ti archivos basura, duplicados y archivos grandes, y tiene un plan gratuito de verdad.',
    columns: ['MacDiskCleaner', 'DaisyDisk'],
    rows: [
      { label: 'Precio', values: ['Plan gratis + Pro por 12,99 $ (pago único)', '9,99 $ (pago único)'] },
      { label: 'Opción gratuita', values: ['Analiza todo + limpia hasta 2 GB', 'La prueba analiza pero no borra'] },
      { label: 'Mapa visual interactivo del disco', values: [false, true] },
      { label: 'Explorador de tamaño de carpetas', values: ['Space Lens', true] },
      { label: 'Limpieza de basura y cachés', values: [true, false] },
      { label: 'Buscador de duplicados', values: [true, false] },
      { label: 'Buscador de archivos grandes y antiguos', values: [true, 'A mano, con el mapa'] },
      { label: 'Desinstalador (elimina restos)', values: ['Pro', false] },
      { label: 'Limpieza para desarrolladores (Xcode, node_modules…)', values: [true, false] },
      { label: 'Revisión antes de borrar', values: [true, true] },
    ],
    tableNote: 'Precio de DaisyDisk según la web del desarrollador; una licencia cubre hasta cinco Mac personales.',
    differencesTitle: 'Las diferencias clave',
    differences: [
      { title: 'Explorar o encontrar', text: 'DaisyDisk es la mejor forma de ver adónde se fue el espacio: su mapa circular te deja entrar en cualquier carpeta. MacDiskCleaner, en cambio, busca tipos concretos de desperdicio (duplicados, cachés, descargas antiguas, datos de desarrollo) y te los lista.' },
      { title: 'Limpieza', text: 'Con DaisyDisk reúnes los elementos y los borras tú. MacDiskCleaner sugiere lo que es seguro, marca lo delicado como «Revisar antes» y lo mueve todo a la Papelera.' },
      { title: 'Uso gratuito', text: 'La prueba de DaisyDisk analiza pero no borra. El plan gratuito de MacDiskCleaner lo analiza todo y limpia hasta 2 GB en total, sin límite de tiempo.' },
    ],
    verdictTitle: '¿Cuál deberías elegir?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Ideal si quieres que la app encuentre el desperdicio por ti (duplicados, basura, cachés de desarrollo) y lo elimine con seguridad.' },
      { name: 'DaisyDisk', text: 'Ideal si disfrutas explorando tu disco de forma visual y prefieres decidirlo todo a mano.' },
    ],
    faq: [
      { q: '¿Qué hace DaisyDisk de forma distinta?', a: 'Su punto fuerte es el mapa circular interactivo del disco: exploras las carpetas visualmente y borras a mano. No busca automáticamente duplicados, archivos basura ni restos de apps.' },
      { q: '¿Puedo usar los dos?', a: 'Claro. Hay quien explora el almacenamiento con DaisyDisk y usa MacDiskCleaner para detectar duplicados y basura automáticamente y borrarlos con seguridad, pasando por la Papelera.' },
      { q: '¿MacDiskCleaner tiene un desglose visual?', a: 'Sí: la vista Almacenamiento muestra el uso por categorías y Space Lens lista las carpetas por tamaño para que profundices. No es un mapa circular como el de DaisyDisk.' },
      { q: '¿DaisyDisk es gratis?', a: 'DaisyDisk tiene una prueba gratuita que analiza el disco, pero para borrar archivos necesitas la licencia de 9,99 $.' },
    ],
    ctaTitle: 'Deja que MacDiskCleaner encuentre el desperdicio',
    ctaText: 'Descarga gratis: duplicados, basura y archivos grandes en un solo análisis.',
    related: [
      { href: '/blog/find-delete-large-files-mac', label: 'Cómo encontrar archivos grandes en Mac' },
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac vs OnyX' },
      { href: '/blog/best-mac-storage-cleaner-apps-2026', label: 'Mejores apps para limpiar el almacenamiento del Mac' },
    ],
  },
  de: {
    metaTitle: 'MacDiskCleaner vs DaisyDisk (2026): Speicher-Karte vs geführter Cleaner',
    metaDescription:
      'DaisyDisk vs MacDiskCleaner: DaisyDisk (9,99 $) zeigt eine visuelle Speicherkarte, gelöscht wird manuell; MacDiskCleaner findet Datenmüll, Duplikate und große Dateien und hat eine Gratis-Version.',
    breadcrumb: 'vs. DaisyDisk',
    h1: 'MacDiskCleaner vs DaisyDisk',
    lead: 'DaisyDisk zeichnet eine schöne Karte deiner Festplatte – dann entscheidest du, was weg kann. MacDiskCleaner sucht Datenmüll, Duplikate und große Dateien für dich und hat eine wirklich kostenlose Version.',
    columns: ['MacDiskCleaner', 'DaisyDisk'],
    rows: [
      { label: 'Preis', values: ['Gratis-Version + Pro für einmalig 12,99 $', 'Einmalig 9,99 $'] },
      { label: 'Kostenlose Option', values: ['Alles scannen + bis zu 2 GB aufräumen', 'Testversion scannt, löscht aber nicht'] },
      { label: 'Interaktive visuelle Speicherkarte', values: [false, true] },
      { label: 'Ordnergrößen-Browser', values: ['Space Lens', true] },
      { label: 'Datenmüll & Caches entfernen', values: [true, false] },
      { label: 'Duplikat-Finder', values: [true, false] },
      { label: 'Große & alte Dateien finden', values: [true, 'Manuell über die Karte'] },
      { label: 'App-Deinstallation (inkl. Reste)', values: ['Pro', false] },
      { label: 'Entwickler-Bereinigung (Xcode, node_modules …)', values: [true, false] },
      { label: 'Prüfung vor dem Löschen', values: [true, true] },
    ],
    tableNote: 'DaisyDisk-Preis laut Website des Entwicklers; eine Lizenz gilt für bis zu fünf private Macs.',
    differencesTitle: 'Die wichtigsten Unterschiede',
    differences: [
      { title: 'Erkunden vs. Finden', text: 'DaisyDisk zeigt am besten, wohin der Speicher verschwunden ist: Mit der Sunburst-Karte gehst du in jeden Ordner. MacDiskCleaner sucht stattdessen gezielt nach Verschwendung – Duplikate, Caches, alte Downloads, Entwicklerdaten – und listet sie auf.' },
      { title: 'Aufräumen', text: 'Bei DaisyDisk sammelst du Objekte und löschst sie selbst. MacDiskCleaner schlägt Sicheres vor, markiert Riskantes als „Erst prüfen“ und verschiebt alles in den Papierkorb.' },
      { title: 'Kostenlos nutzen', text: 'Die DaisyDisk-Testversion scannt, löscht aber nicht. Die Gratis-Version von MacDiskCleaner scannt alles und räumt insgesamt bis zu 2 GB auf – ohne Zeitlimit.' },
    ],
    verdictTitle: 'Welches solltest du wählen?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Ideal, wenn die App die Verschwendung für dich finden soll – Duplikate, Datenmüll, Entwickler-Caches – und sicher entfernt.' },
      { name: 'DaisyDisk', text: 'Ideal, wenn du deinen Speicher gern visuell erkundest und alles selbst entscheiden willst.' },
    ],
    faq: [
      { q: 'Was macht DaisyDisk anders?', a: 'Die Stärke von DaisyDisk ist die interaktive Sunburst-Karte: Du erkundest Ordner visuell und löschst manuell. Nach Duplikaten, Datenmüll oder App-Resten sucht es nicht automatisch.' },
      { q: 'Kann ich beide nutzen?', a: 'Klar. Manche erkunden den Speicher mit DaisyDisk und nutzen MacDiskCleaner für die automatische Suche nach Duplikaten und Datenmüll samt sicherem Löschen über den Papierkorb.' },
      { q: 'Hat MacDiskCleaner eine visuelle Aufschlüsselung?', a: 'Ja: Die Speicheransicht zeigt die Belegung nach Kategorien, und Space Lens listet Ordner nach Größe zum Hineinklicken. Eine Sunburst-Karte wie bei DaisyDisk ist es nicht.' },
      { q: 'Ist DaisyDisk kostenlos?', a: 'DaisyDisk hat eine kostenlose Testversion, die scannen kann; zum Löschen brauchst du die Lizenz für 9,99 $.' },
    ],
    ctaTitle: 'Lass MacDiskCleaner die Verschwendung finden',
    ctaText: 'Kostenloser Download – Duplikate, Datenmüll und große Dateien in einem Scan.',
    related: [
      { href: '/blog/find-delete-large-files-mac', label: 'Große Dateien auf dem Mac finden' },
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac vs OnyX' },
      { href: '/blog/best-mac-storage-cleaner-apps-2026', label: 'Die besten Mac-Speicher-Cleaner' },
    ],
  },
  fr: {
    metaTitle: 'MacDiskCleaner vs DaisyDisk (2026) : carte du disque ou nettoyeur guidé',
    metaDescription:
      'DaisyDisk vs MacDiskCleaner : DaisyDisk (9,99 $) affiche une carte visuelle du disque et vous supprimez à la main ; MacDiskCleaner trouve fichiers inutiles, doublons et gros fichiers et propose une offre gratuite.',
    breadcrumb: 'vs. DaisyDisk',
    h1: 'MacDiskCleaner vs DaisyDisk',
    lead: 'DaisyDisk dessine une superbe carte de votre disque, puis c’est à vous de décider quoi supprimer. MacDiskCleaner cherche pour vous les fichiers inutiles, doublons et gros fichiers — avec une offre vraiment gratuite.',
    columns: ['MacDiskCleaner', 'DaisyDisk'],
    rows: [
      { label: 'Prix', values: ['Offre gratuite + Pro à 12,99 $ (paiement unique)', '9,99 $ (paiement unique)'] },
      { label: 'Option gratuite', values: ['Tout analyser + nettoyer jusqu’à 2 Go', 'L’essai analyse mais ne supprime pas'] },
      { label: 'Carte visuelle interactive du disque', values: [false, true] },
      { label: 'Explorateur de taille des dossiers', values: ['Space Lens', true] },
      { label: 'Nettoyage des fichiers inutiles et caches', values: [true, false] },
      { label: 'Recherche de doublons', values: [true, false] },
      { label: 'Recherche de gros et anciens fichiers', values: [true, 'À la main, via la carte'] },
      { label: 'Désinstallateur (supprime les restes)', values: ['Pro', false] },
      { label: 'Nettoyage développeur (Xcode, node_modules…)', values: [true, false] },
      { label: 'Vérification avant suppression', values: [true, true] },
    ],
    tableNote: 'Prix de DaisyDisk selon le site de l’éditeur ; une licence couvre jusqu’à cinq Mac personnels.',
    differencesTitle: 'Les différences essentielles',
    differences: [
      { title: 'Explorer ou trouver', text: 'DaisyDisk est le meilleur moyen de voir où est parti l’espace : sa carte en rayons permet d’entrer dans n’importe quel dossier. MacDiskCleaner recherche plutôt des types précis de gaspillage — doublons, caches, vieux téléchargements, données de développement — et vous les liste.' },
      { title: 'Nettoyage', text: 'Avec DaisyDisk, vous rassemblez les éléments et les supprimez vous-même. MacDiskCleaner suggère ce qui est sûr, marque ce qui est délicat « À vérifier » et place tout dans la Corbeille.' },
      { title: 'Usage gratuit', text: 'L’essai de DaisyDisk analyse mais ne supprime pas. L’offre gratuite de MacDiskCleaner analyse tout et nettoie jusqu’à 2 Go au total, sans limite de durée.' },
    ],
    verdictTitle: 'Lequel choisir ?',
    verdicts: [
      { name: 'MacDiskCleaner', text: 'Idéal si vous voulez que l’app trouve le gaspillage pour vous — doublons, fichiers inutiles, caches de développement — et le supprime sans risque.' },
      { name: 'DaisyDisk', text: 'Idéal si vous aimez explorer votre disque visuellement et préférez tout décider vous-même.' },
    ],
    faq: [
      { q: 'Qu’est-ce que DaisyDisk fait différemment ?', a: 'Son point fort est sa carte interactive en rayons : vous explorez les dossiers visuellement et supprimez à la main. Il ne recherche pas automatiquement les doublons, fichiers inutiles ou restes d’apps.' },
      { q: 'Peut-on utiliser les deux ?', a: 'Bien sûr. Certains explorent leur stockage avec DaisyDisk et utilisent MacDiskCleaner pour détecter automatiquement doublons et fichiers inutiles, puis les supprimer via la Corbeille.' },
      { q: 'MacDiskCleaner propose-t-il une vue visuelle ?', a: 'Oui : la vue Stockage montre l’occupation par catégorie et Space Lens liste les dossiers par taille pour descendre dans l’arborescence. Ce n’est pas une carte en rayons comme DaisyDisk.' },
      { q: 'DaisyDisk est-il gratuit ?', a: 'DaisyDisk propose un essai gratuit qui analyse le disque, mais la suppression nécessite la licence à 9,99 $.' },
    ],
    ctaTitle: 'Laissez MacDiskCleaner trouver le gaspillage',
    ctaText: 'Téléchargement gratuit — doublons, fichiers inutiles et gros fichiers en une analyse.',
    related: [
      { href: '/blog/find-delete-large-files-mac', label: 'Trouver les gros fichiers sur Mac' },
      { href: '/vs/cleanmymac', label: 'MacDiskCleaner vs CleanMyMac vs OnyX' },
      { href: '/blog/best-mac-storage-cleaner-apps-2026', label: 'Meilleures apps de nettoyage du stockage Mac' },
    ],
  },
}
