import type { Localized } from '@/lib/localized'
import type { FaqItem } from '@/components/site/FaqSection'

export type ClearSystemDataCopy = {
  metaTitle: string
  metaDescription: string
  breadcrumb: string
  h1: string
  h1Accent: string
  lead: string
  quickTitle: string
  quick: string
  insideTitle: string
  inside: { name: string; where: string }[]
  manualTitle: string
  manualLead: string
  manual: { title: string; text: string; code?: string }[]
  avoidTitle: string
  avoid: string[]
  fastTitle: string
  fast: { title: string; text: string }[]
  guideLink: string
  faq: FaqItem[]
  ctaTitle: string
}

export const clearSystemDataCopy: Localized<ClearSystemDataCopy> = {
  en: {
    metaTitle: 'How to Clear System Data on Mac (Safe Step-by-Step Guide, 2026)',
    metaDescription:
      'What "System Data" in Mac storage really contains and how to reduce it safely: Time Machine snapshots, caches, logs, old iPhone backups, Xcode data and app leftovers — with exact paths and commands.',
    breadcrumb: 'Clear System Data',
    h1: 'Clear "System Data" on Mac',
    h1Accent: 'the safe way.',
    lead: 'System Data is often the biggest — and least explained — bar in your Mac’s storage view. Here is what is actually inside it, and how to shrink it without breaking anything.',
    quickTitle: 'Quick answer',
    quick:
      'You can’t delete “System Data” as one thing, but you can shrink it: remove old Time Machine local snapshots, clear app caches and logs in ~/Library, delete old iPhone/iPad backups, clear Xcode and other developer data, and restart to drop temporary swap files. Check the result in System Settings → General → Storage.',
    insideTitle: 'What is usually inside System Data',
    inside: [
      { name: 'Time Machine local snapshots', where: 'Managed by macOS; listed with tmutil' },
      { name: 'App caches', where: '~/Library/Caches' },
      { name: 'Logs and diagnostic reports', where: '~/Library/Logs' },
      { name: 'iPhone and iPad backups', where: '~/Library/Application Support/MobileSync/Backup' },
      { name: 'Xcode, simulators and other developer data', where: '~/Library/Developer' },
      { name: 'Leftovers from deleted apps', where: '~/Library/Application Support, ~/Library/Containers' },
      { name: 'Swap and temporary files', where: 'Created by macOS while it runs; cleared on restart' },
    ],
    manualTitle: 'Step by step: reduce System Data manually',
    manualLead: 'Work top to bottom — the first steps usually free the most space. Quit apps before clearing their caches.',
    manual: [
      { title: '1. See what macOS reports', text: 'Open System Settings → General → Storage and wait for the bar to finish calculating. Note the System Data size so you can measure the result.' },
      { title: '2. Remove old Time Machine local snapshots', text: 'If you use Time Machine, macOS keeps local snapshots on your disk and counts them in System Data. List them, then delete the ones you don’t need using the date part of each name (macOS also removes them automatically when space runs low).', code: 'tmutil listlocalsnapshots /\nsudo tmutil deletelocalsnapshots 2026-10-01-120000' },
      { title: '3. Clear app caches', text: 'In Finder choose Go → Go to Folder…, enter ~/Library/Caches, and move the folders of apps you use heavily (browsers, Spotify, Slack, Adobe…) to the Trash. Apps rebuild what they need.' },
      { title: '4. Delete old logs', text: 'Go to ~/Library/Logs and remove old log folders and DiagnosticReports. They are only useful for troubleshooting.' },
      { title: '5. Delete old iPhone and iPad backups', text: 'Connect your iPhone or iPad, select it in the Finder sidebar, click Manage Backups and delete the backups you no longer need. Without the device, open ~/Library/Application Support/MobileSync/Backup and move old backup folders to the Trash. A full backup can be tens of gigabytes.' },
      { title: '6. Clear Xcode and simulator data (developers)', text: 'DerivedData and old simulators are safe to remove; Xcode recreates what it needs.', code: 'rm -rf ~/Library/Developer/Xcode/DerivedData\nxcrun simctl delete unavailable' },
      { title: '7. Remove leftovers from apps you deleted', text: 'Check ~/Library/Application Support and ~/Library/Containers for folders named after apps you no longer have, and move them to the Trash.' },
      { title: '8. Empty the Trash and restart', text: 'Nothing is freed until the Trash is emptied. A restart then clears swap and temporary files. Re-check Storage — the System Data figure can take a few minutes to update.' },
    ],
    avoidTitle: 'Don’t delete these',
    avoid: [
      'Anything inside /System, /Library/Apple or /private — macOS protects these for a reason.',
      'Your Keychains (~/Library/Keychains) and Preferences (~/Library/Preferences).',
      'Containers of apps you still use — that is where their documents and settings live.',
    ],
    fastTitle: 'The faster way: let MacDiskCleaner find it',
    fast: [
      { title: 'See the real breakdown', text: 'One scan lists the caches, logs, developer data and app leftovers that make up System Data — with sizes.' },
      { title: 'Pick what goes', text: 'Safe items are labelled; anything that needs a second look is marked Review first and left unselected.' },
      { title: 'Clean safely', text: 'Everything goes to the Trash first, and protected system paths are blocked, so nothing important can be lost.' },
    ],
    guideLink: 'Why is System Data so big (100 GB+)? Read the full explainer',
    faq: [
      { q: 'What exactly is "System Data" on a Mac?', a: 'It’s the catch-all category in Storage for anything that isn’t Applications, Documents, Photos, iCloud Drive or another named category: caches, logs, Time Machine local snapshots, device backups, developer data, app support files and temporary files.' },
      { q: 'Can I clear System Data on Mac?', a: 'Not as a single item, but you can safely reduce it by removing what it is made of: old local snapshots, caches, logs, device backups, developer data and app leftovers. Never delete files inside /System or your Keychains.' },
      { q: 'Why is my System Data over 100 GB?', a: 'Usually one or two culprits: Time Machine local snapshots that haven’t been purged, several old iPhone/iPad backups, or Xcode and simulator data. Check those three first.' },
      { q: 'Does restarting reduce System Data?', a: 'Yes, a little: a restart clears swap and some temporary files, and gives macOS a chance to purge snapshots it no longer needs. It won’t remove caches, backups or developer data.' },
      { q: 'Is it safe to delete ~/Library/Caches?', a: 'Clearing the cache folders of individual apps is safe — they are rebuilt automatically, though the app may be slower the first time. Quit the app first, and move the folders to the Trash instead of erasing them.' },
      { q: 'Why does System Data keep growing back?', a: 'Caches, logs and snapshots regenerate as you use your Mac. That’s normal; a cleanup every month or two keeps it in check, and MacDiskCleaner Pro can scan on a schedule.' },
    ],
    ctaTitle: 'See what’s really inside your System Data',
  },
  es: {
    metaTitle: 'Cómo borrar Datos del sistema en Mac (guía segura paso a paso, 2026)',
    metaDescription:
      'Qué contiene de verdad «Datos del sistema» en el almacenamiento del Mac y cómo reducirlo con seguridad: instantáneas de Time Machine, cachés, registros, copias de iPhone, datos de Xcode y restos de apps, con rutas y comandos exactos.',
    breadcrumb: 'Borrar Datos del sistema',
    h1: 'Borra «Datos del sistema» en Mac',
    h1Accent: 'de forma segura.',
    lead: '«Datos del sistema» suele ser la barra más grande —y peor explicada— del almacenamiento de tu Mac. Esto es lo que contiene de verdad y cómo reducirla sin romper nada.',
    quickTitle: 'Respuesta rápida',
    quick:
      'No puedes borrar «Datos del sistema» de una vez, pero sí reducirlo: elimina instantáneas locales antiguas de Time Machine, borra cachés y registros de ~/Library, elimina copias de seguridad antiguas del iPhone/iPad, limpia los datos de Xcode y reinicia para liberar archivos temporales. Comprueba el resultado en Ajustes del Sistema → General → Almacenamiento.',
    insideTitle: 'Qué suele haber dentro de Datos del sistema',
    inside: [
      { name: 'Instantáneas locales de Time Machine', where: 'Las gestiona macOS; se listan con tmutil' },
      { name: 'Cachés de apps', where: '~/Library/Caches' },
      { name: 'Registros e informes de diagnóstico', where: '~/Library/Logs' },
      { name: 'Copias de seguridad de iPhone y iPad', where: '~/Library/Application Support/MobileSync/Backup' },
      { name: 'Xcode, simuladores y otros datos de desarrollo', where: '~/Library/Developer' },
      { name: 'Restos de apps eliminadas', where: '~/Library/Application Support, ~/Library/Containers' },
      { name: 'Swap y archivos temporales', where: 'Los crea macOS mientras funciona; se borran al reiniciar' },
    ],
    manualTitle: 'Paso a paso: reduce Datos del sistema manualmente',
    manualLead: 'Sigue el orden: los primeros pasos suelen liberar más espacio. Cierra las apps antes de borrar sus cachés.',
    manual: [
      { title: '1. Mira lo que indica macOS', text: 'Abre Ajustes del Sistema → General → Almacenamiento y espera a que termine de calcular. Anota el tamaño de Datos del sistema para medir el resultado.' },
      { title: '2. Elimina instantáneas locales antiguas de Time Machine', text: 'Si usas Time Machine, macOS guarda instantáneas locales en el disco y las cuenta como Datos del sistema. Lístalas y borra las que no necesites indicando la fecha de cada nombre (macOS también las elimina solo cuando falta espacio).', code: 'tmutil listlocalsnapshots /\nsudo tmutil deletelocalsnapshots 2026-10-01-120000' },
      { title: '3. Borra cachés de apps', text: 'En el Finder elige Ir → Ir a la carpeta…, escribe ~/Library/Caches y mueve a la Papelera las carpetas de las apps que más usas (navegadores, Spotify, Slack, Adobe…). Las apps regeneran lo que necesitan.' },
      { title: '4. Elimina registros antiguos', text: 'Ve a ~/Library/Logs y borra carpetas de registros antiguos y DiagnosticReports. Solo sirven para diagnosticar problemas.' },
      { title: '5. Borra copias antiguas de iPhone y iPad', text: 'Conecta tu iPhone o iPad, selecciónalo en la barra lateral del Finder, haz clic en «Gestionar copias de seguridad» y elimina las que ya no necesites. Sin el dispositivo, abre ~/Library/Application Support/MobileSync/Backup y mueve las carpetas antiguas a la Papelera. Una copia completa puede ocupar decenas de gigas.' },
      { title: '6. Limpia datos de Xcode y simuladores (desarrolladores)', text: 'DerivedData y los simuladores antiguos se pueden borrar; Xcode recrea lo que necesita.', code: 'rm -rf ~/Library/Developer/Xcode/DerivedData\nxcrun simctl delete unavailable' },
      { title: '7. Elimina restos de apps que borraste', text: 'Revisa ~/Library/Application Support y ~/Library/Containers en busca de carpetas de apps que ya no tienes y muévelas a la Papelera.' },
      { title: '8. Vacía la Papelera y reinicia', text: 'No se libera nada hasta vaciar la Papelera. Después, un reinicio borra el swap y los archivos temporales. Vuelve a mirar Almacenamiento: la cifra puede tardar unos minutos en actualizarse.' },
    ],
    avoidTitle: 'No borres esto',
    avoid: [
      'Nada dentro de /System, /Library/Apple o /private: macOS lo protege por algo.',
      'Tus llaveros (~/Library/Keychains) y preferencias (~/Library/Preferences).',
      'Los contenedores de apps que sigues usando: ahí están sus documentos y ajustes.',
    ],
    fastTitle: 'La forma rápida: deja que MacDiskCleaner lo encuentre',
    fast: [
      { title: 'Mira el desglose real', text: 'Un solo análisis lista las cachés, registros, datos de desarrollo y restos de apps que forman Datos del sistema, con sus tamaños.' },
      { title: 'Elige qué se va', text: 'Lo seguro está etiquetado; lo que conviene revisar se marca como «Revisar antes» y no se selecciona.' },
      { title: 'Limpia con seguridad', text: 'Todo va primero a la Papelera y las rutas protegidas del sistema están bloqueadas, así que no se pierde nada importante.' },
    ],
    guideLink: '¿Por qué Datos del sistema ocupa tanto (más de 100 GB)? Lee la explicación completa',
    faq: [
      { q: '¿Qué es exactamente «Datos del sistema» en un Mac?', a: 'Es la categoría comodín del Almacenamiento para todo lo que no es Aplicaciones, Documentos, Fotos, iCloud Drive u otra categoría con nombre: cachés, registros, instantáneas locales de Time Machine, copias de dispositivos, datos de desarrollo, archivos de soporte de apps y temporales.' },
      { q: '¿Se pueden borrar los Datos del sistema en Mac?', a: 'No como un único elemento, pero sí reducirlos con seguridad eliminando lo que los forma: instantáneas antiguas, cachés, registros, copias de dispositivos, datos de desarrollo y restos de apps. Nunca borres archivos dentro de /System ni tus llaveros.' },
      { q: '¿Por qué mis Datos del sistema superan los 100 GB?', a: 'Normalmente por uno o dos motivos: instantáneas locales de Time Machine que no se han purgado, varias copias antiguas de iPhone/iPad o datos de Xcode y simuladores. Revisa esos tres primero.' },
      { q: '¿Reiniciar reduce los Datos del sistema?', a: 'Un poco: el reinicio borra el swap y algunos temporales, y permite a macOS purgar instantáneas que ya no necesita. No elimina cachés, copias ni datos de desarrollo.' },
      { q: '¿Es seguro borrar ~/Library/Caches?', a: 'Borrar las carpetas de caché de apps concretas es seguro: se regeneran solas, aunque la app puede ir más lenta la primera vez. Cierra la app antes y mueve las carpetas a la Papelera en lugar de eliminarlas directamente.' },
      { q: '¿Por qué los Datos del sistema vuelven a crecer?', a: 'Las cachés, los registros y las instantáneas se regeneran con el uso. Es normal; una limpieza cada uno o dos meses lo mantiene a raya, y MacDiskCleaner Pro puede analizar de forma programada.' },
    ],
    ctaTitle: 'Descubre qué hay de verdad en tus Datos del sistema',
  },
  de: {
    metaTitle: 'Systemdaten auf dem Mac löschen (sichere Schritt-für-Schritt-Anleitung, 2026)',
    metaDescription:
      'Was „Systemdaten“ im Mac-Speicher wirklich enthält und wie du sie sicher verkleinerst: Time-Machine-Snapshots, Caches, Protokolle, alte iPhone-Backups, Xcode-Daten und App-Reste – mit genauen Pfaden und Befehlen.',
    breadcrumb: 'Systemdaten löschen',
    h1: '„Systemdaten“ auf dem Mac löschen –',
    h1Accent: 'aber sicher.',
    lead: 'Systemdaten sind oft der größte – und am schlechtesten erklärte – Balken in der Speicheranzeige deines Macs. Hier steht, was wirklich drinsteckt und wie du sie verkleinerst, ohne etwas kaputt zu machen.',
    quickTitle: 'Kurze Antwort',
    quick:
      '„Systemdaten“ lassen sich nicht als Ganzes löschen, aber verkleinern: alte lokale Time-Machine-Snapshots entfernen, App-Caches und Protokolle in ~/Library leeren, alte iPhone-/iPad-Backups löschen, Xcode- und Entwicklerdaten bereinigen und neu starten, um Auslagerungsdateien freizugeben. Das Ergebnis siehst du unter Systemeinstellungen → Allgemein → Speicher.',
    insideTitle: 'Was meist in den Systemdaten steckt',
    inside: [
      { name: 'Lokale Time-Machine-Snapshots', where: 'Von macOS verwaltet; mit tmutil auflisten' },
      { name: 'App-Caches', where: '~/Library/Caches' },
      { name: 'Protokolle und Diagnoseberichte', where: '~/Library/Logs' },
      { name: 'iPhone- und iPad-Backups', where: '~/Library/Application Support/MobileSync/Backup' },
      { name: 'Xcode, Simulatoren und andere Entwicklerdaten', where: '~/Library/Developer' },
      { name: 'Reste gelöschter Apps', where: '~/Library/Application Support, ~/Library/Containers' },
      { name: 'Auslagerungs- und temporäre Dateien', where: 'Von macOS im Betrieb erzeugt; beim Neustart entfernt' },
    ],
    manualTitle: 'Schritt für Schritt: Systemdaten manuell verkleinern',
    manualLead: 'Von oben nach unten vorgehen – die ersten Schritte bringen meist am meisten. Apps vor dem Leeren ihrer Caches beenden.',
    manual: [
      { title: '1. Anzeige von macOS prüfen', text: 'Öffne Systemeinstellungen → Allgemein → Speicher und warte, bis die Berechnung fertig ist. Notiere die Größe der Systemdaten, um das Ergebnis zu vergleichen.' },
      { title: '2. Alte lokale Time-Machine-Snapshots entfernen', text: 'Wenn du Time Machine nutzt, legt macOS lokale Snapshots auf der Festplatte an und zählt sie zu den Systemdaten. Liste sie auf und lösche, was du nicht brauchst, anhand des Datums im Namen (macOS entfernt sie bei Platzmangel auch selbst).', code: 'tmutil listlocalsnapshots /\nsudo tmutil deletelocalsnapshots 2026-10-01-120000' },
      { title: '3. App-Caches leeren', text: 'Im Finder Gehe zu → Gehe zum Ordner … wählen, ~/Library/Caches eingeben und die Ordner viel genutzter Apps (Browser, Spotify, Slack, Adobe …) in den Papierkorb legen. Die Apps bauen an, was sie brauchen.' },
      { title: '4. Alte Protokolle löschen', text: 'In ~/Library/Logs alte Protokollordner und DiagnosticReports entfernen. Sie dienen nur der Fehlersuche.' },
      { title: '5. Alte iPhone- und iPad-Backups löschen', text: 'iPhone oder iPad anschließen, in der Finder-Seitenleiste auswählen, auf „Backups verwalten“ klicken und nicht mehr benötigte Backups löschen. Ohne Gerät: ~/Library/Application Support/MobileSync/Backup öffnen und alte Backup-Ordner in den Papierkorb legen. Ein vollständiges Backup kann Dutzende Gigabyte groß sein.' },
      { title: '6. Xcode- und Simulatordaten bereinigen (Entwickler)', text: 'DerivedData und alte Simulatoren können weg; Xcode erstellt Benötigtes neu.', code: 'rm -rf ~/Library/Developer/Xcode/DerivedData\nxcrun simctl delete unavailable' },
      { title: '7. Reste gelöschter Apps entfernen', text: 'In ~/Library/Application Support und ~/Library/Containers nach Ordnern von Apps suchen, die du nicht mehr hast, und sie in den Papierkorb legen.' },
      { title: '8. Papierkorb leeren und neu starten', text: 'Erst nach dem Leeren des Papierkorbs wird Platz frei. Ein Neustart entfernt dann Auslagerungs- und temporäre Dateien. Speicher erneut prüfen – die Anzeige kann ein paar Minuten nachhinken.' },
    ],
    avoidTitle: 'Das bitte nicht löschen',
    avoid: [
      'Nichts in /System, /Library/Apple oder /private – macOS schützt das aus gutem Grund.',
      'Deine Schlüsselbunde (~/Library/Keychains) und Einstellungen (~/Library/Preferences).',
      'Container von Apps, die du noch nutzt – dort liegen ihre Dokumente und Einstellungen.',
    ],
    fastTitle: 'Schneller: MacDiskCleaner findet es für dich',
    fast: [
      { title: 'Echte Aufschlüsselung sehen', text: 'Ein Scan listet Caches, Protokolle, Entwicklerdaten und App-Reste, aus denen die Systemdaten bestehen – mit Größen.' },
      { title: 'Auswählen, was weg kann', text: 'Sichere Objekte sind gekennzeichnet; was einen zweiten Blick braucht, ist als „Erst prüfen“ markiert und nicht ausgewählt.' },
      { title: 'Sicher aufräumen', text: 'Alles landet zuerst im Papierkorb, und geschützte Systempfade sind gesperrt – nichts Wichtiges geht verloren.' },
    ],
    guideLink: 'Warum sind Systemdaten so groß (über 100 GB)? Zur ausführlichen Erklärung',
    faq: [
      { q: 'Was genau sind „Systemdaten“ auf dem Mac?', a: 'Die Sammelkategorie im Speicher für alles, was nicht Programme, Dokumente, Fotos, iCloud Drive oder eine andere benannte Kategorie ist: Caches, Protokolle, lokale Time-Machine-Snapshots, Geräte-Backups, Entwicklerdaten, App-Supportdateien und temporäre Dateien.' },
      { q: 'Kann ich Systemdaten auf dem Mac löschen?', a: 'Nicht als Ganzes, aber du kannst sie sicher verkleinern, indem du entfernst, woraus sie bestehen: alte Snapshots, Caches, Protokolle, Geräte-Backups, Entwicklerdaten und App-Reste. Lösche nie Dateien in /System oder deine Schlüsselbunde.' },
      { q: 'Warum sind meine Systemdaten über 100 GB groß?', a: 'Meist wegen ein oder zwei Ursachen: nicht bereinigte lokale Time-Machine-Snapshots, mehrere alte iPhone-/iPad-Backups oder Xcode- und Simulatordaten. Prüfe diese drei zuerst.' },
      { q: 'Verkleinert ein Neustart die Systemdaten?', a: 'Etwas: Ein Neustart entfernt Auslagerungs- und einige temporäre Dateien und lässt macOS nicht mehr benötigte Snapshots bereinigen. Caches, Backups und Entwicklerdaten bleiben.' },
      { q: 'Kann ich ~/Library/Caches gefahrlos löschen?', a: 'Die Cache-Ordner einzelner Apps zu leeren ist sicher – sie werden automatisch neu erstellt, die App ist beim ersten Start evtl. langsamer. Beende die App vorher und lege die Ordner in den Papierkorb, statt sie sofort zu löschen.' },
      { q: 'Warum wachsen die Systemdaten wieder an?', a: 'Caches, Protokolle und Snapshots entstehen bei der Nutzung neu. Das ist normal; ein Aufräumen alle ein, zwei Monate hält sie im Rahmen, und MacDiskCleaner Pro kann nach Zeitplan scannen.' },
    ],
    ctaTitle: 'Sieh, was wirklich in deinen Systemdaten steckt',
  },
  fr: {
    metaTitle: 'Comment supprimer les Données système sur Mac (guide sûr étape par étape, 2026)',
    metaDescription:
      'Ce que contiennent vraiment les « Données système » du stockage Mac et comment les réduire sans risque : instantanés Time Machine, caches, journaux, anciennes sauvegardes d’iPhone, données Xcode et restes d’apps — avec chemins et commandes exacts.',
    breadcrumb: 'Supprimer les Données système',
    h1: 'Supprimer les « Données système » sur Mac',
    h1Accent: 'sans risque.',
    lead: 'Les Données système sont souvent la plus grosse barre — et la moins expliquée — du stockage de votre Mac. Voici ce qu’elles contiennent vraiment et comment les réduire sans rien casser.',
    quickTitle: 'Réponse rapide',
    quick:
      'On ne peut pas supprimer « Données système » d’un bloc, mais on peut les réduire : supprimez les anciens instantanés locaux Time Machine, videz les caches et journaux de ~/Library, effacez les vieilles sauvegardes d’iPhone/iPad, nettoyez les données Xcode et redémarrez pour libérer les fichiers temporaires. Vérifiez le résultat dans Réglages Système → Général → Stockage.',
    insideTitle: 'Ce que contiennent généralement les Données système',
    inside: [
      { name: 'Instantanés locaux Time Machine', where: 'Gérés par macOS ; listés avec tmutil' },
      { name: 'Caches des apps', where: '~/Library/Caches' },
      { name: 'Journaux et rapports de diagnostic', where: '~/Library/Logs' },
      { name: 'Sauvegardes d’iPhone et d’iPad', where: '~/Library/Application Support/MobileSync/Backup' },
      { name: 'Xcode, simulateurs et autres données de développement', where: '~/Library/Developer' },
      { name: 'Restes d’apps supprimées', where: '~/Library/Application Support, ~/Library/Containers' },
      { name: 'Swap et fichiers temporaires', where: 'Créés par macOS en fonctionnement ; effacés au redémarrage' },
    ],
    manualTitle: 'Étape par étape : réduire les Données système à la main',
    manualLead: 'Procédez dans l’ordre — les premières étapes libèrent généralement le plus d’espace. Quittez les apps avant de vider leurs caches.',
    manual: [
      { title: '1. Regardez ce qu’indique macOS', text: 'Ouvrez Réglages Système → Général → Stockage et attendez la fin du calcul. Notez la taille des Données système pour mesurer le résultat.' },
      { title: '2. Supprimez les anciens instantanés Time Machine', text: 'Si vous utilisez Time Machine, macOS conserve des instantanés locaux sur le disque et les compte dans les Données système. Listez-les et supprimez ceux dont vous n’avez pas besoin en indiquant la date de leur nom (macOS les supprime aussi automatiquement quand l’espace manque).', code: 'tmutil listlocalsnapshots /\nsudo tmutil deletelocalsnapshots 2026-10-01-120000' },
      { title: '3. Videz les caches des apps', text: 'Dans le Finder, choisissez Aller → Aller au dossier…, saisissez ~/Library/Caches et placez dans la Corbeille les dossiers des apps que vous utilisez beaucoup (navigateurs, Spotify, Slack, Adobe…). Les apps recréent ce dont elles ont besoin.' },
      { title: '4. Supprimez les anciens journaux', text: 'Allez dans ~/Library/Logs et supprimez les anciens dossiers de journaux et DiagnosticReports. Ils ne servent qu’au dépannage.' },
      { title: '5. Effacez les vieilles sauvegardes d’iPhone et d’iPad', text: 'Branchez votre iPhone ou iPad, sélectionnez-le dans la barre latérale du Finder, cliquez sur « Gérer les sauvegardes » et supprimez celles dont vous n’avez plus besoin. Sans l’appareil, ouvrez ~/Library/Application Support/MobileSync/Backup et placez les anciens dossiers dans la Corbeille. Une sauvegarde complète peut peser des dizaines de Go.' },
      { title: '6. Nettoyez Xcode et les simulateurs (développeurs)', text: 'DerivedData et les anciens simulateurs peuvent être supprimés ; Xcode recrée ce qui est nécessaire.', code: 'rm -rf ~/Library/Developer/Xcode/DerivedData\nxcrun simctl delete unavailable' },
      { title: '7. Supprimez les restes d’apps désinstallées', text: 'Vérifiez ~/Library/Application Support et ~/Library/Containers à la recherche de dossiers d’apps que vous n’avez plus, et placez-les dans la Corbeille.' },
      { title: '8. Videz la Corbeille et redémarrez', text: 'Rien n’est libéré tant que la Corbeille n’est pas vidée. Un redémarrage efface ensuite le swap et les fichiers temporaires. Revérifiez le Stockage — le chiffre peut mettre quelques minutes à se mettre à jour.' },
    ],
    avoidTitle: 'Ne supprimez pas ceci',
    avoid: [
      'Rien dans /System, /Library/Apple ou /private — macOS les protège pour une bonne raison.',
      'Vos trousseaux (~/Library/Keychains) et préférences (~/Library/Preferences).',
      'Les conteneurs des apps que vous utilisez encore — leurs documents et réglages s’y trouvent.',
    ],
    fastTitle: 'Plus rapide : laissez MacDiskCleaner les trouver',
    fast: [
      { title: 'Voir la vraie répartition', text: 'Une seule analyse liste les caches, journaux, données de développement et restes d’apps qui composent les Données système, avec leur taille.' },
      { title: 'Choisir ce qui part', text: 'Les éléments sûrs sont étiquetés ; ce qui mérite un second regard est marqué « À vérifier » et non sélectionné.' },
      { title: 'Nettoyer en sécurité', text: 'Tout passe d’abord par la Corbeille et les chemins système protégés sont bloqués : rien d’important ne peut être perdu.' },
    ],
    guideLink: 'Pourquoi les Données système sont-elles si volumineuses (plus de 100 Go) ? Lire l’explication complète',
    faq: [
      { q: 'Que sont exactement les « Données système » sur Mac ?', a: 'C’est la catégorie fourre-tout du Stockage pour tout ce qui n’est pas Applications, Documents, Photos, iCloud Drive ou une autre catégorie nommée : caches, journaux, instantanés locaux Time Machine, sauvegardes d’appareils, données de développement, fichiers de support d’apps et fichiers temporaires.' },
      { q: 'Peut-on supprimer les Données système sur Mac ?', a: 'Pas d’un seul bloc, mais on peut les réduire sans risque en supprimant ce qui les compose : anciens instantanés, caches, journaux, sauvegardes d’appareils, données de développement et restes d’apps. Ne supprimez jamais de fichiers dans /System ni vos trousseaux.' },
      { q: 'Pourquoi mes Données système dépassent-elles 100 Go ?', a: 'Généralement à cause d’un ou deux coupables : des instantanés locaux Time Machine non purgés, plusieurs vieilles sauvegardes d’iPhone/iPad, ou des données Xcode et de simulateurs. Vérifiez ces trois points en premier.' },
      { q: 'Redémarrer réduit-il les Données système ?', a: 'Un peu : le redémarrage efface le swap et certains fichiers temporaires, et permet à macOS de purger les instantanés devenus inutiles. Il ne supprime ni les caches, ni les sauvegardes, ni les données de développement.' },
      { q: 'Peut-on supprimer ~/Library/Caches sans risque ?', a: 'Vider les dossiers de cache d’apps précises est sans danger : ils se recréent automatiquement, l’app peut juste être plus lente la première fois. Quittez l’app avant et placez les dossiers dans la Corbeille au lieu de les effacer directement.' },
      { q: 'Pourquoi les Données système grossissent-elles à nouveau ?', a: 'Caches, journaux et instantanés se recréent à l’usage. C’est normal ; un nettoyage tous les un ou deux mois les maintient sous contrôle, et MacDiskCleaner Pro peut analyser selon un calendrier.' },
    ],
    ctaTitle: 'Découvrez ce que contiennent vraiment vos Données système',
  },
}
