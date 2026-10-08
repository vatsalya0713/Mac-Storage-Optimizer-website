import type { Localized } from '@/lib/localized'
import type { FaqItem } from '@/components/site/FaqSection'

export type SecurityCopy = {
  metaTitle: string
  metaDescription: string
  breadcrumb: string
  h1: string
  h1Accent: string
  lead: string
  promises: { title: string; text: string }[]
  sizeTitle: string // {size}
  sizeText: string
  verifyTitle: string
  verifyText: string // {version}
  notarizedNote: string
  faq: FaqItem[]
}

export const securityCopy: Localized<SecurityCopy> = {
  en: {
    metaTitle: 'Is MacDiskCleaner Safe? How It Protects Your Files & Privacy',
    metaDescription:
      'MacDiskCleaner moves everything to the Trash, blocks protected system paths, scans locally with no file uploads, and publishes a SHA-256 checksum for every release.',
    breadcrumb: 'Safety & privacy',
    h1: 'Built to be',
    h1Accent: 'safe to trust.',
    lead: 'A cleaner is only useful if you can trust it with your files. Here is exactly how MacDiskCleaner protects them.',
    promises: [
      { title: 'Everything goes to the Trash first', text: 'No file is erased outright. Cleanup uses the macOS Trash, so anything you remove can be put back until you empty it.' },
      { title: 'Protected paths are off limits', text: 'System folders, your Keychains, Preferences and privacy databases are on a hard block list. Every deletion is checked against it right before it happens, whichever screen you clicked from.' },
      { title: 'You approve every deletion', text: 'Nothing is removed without you seeing it. Recently used projects, Xcode archives and similar items are marked "Review first" and left unselected.' },
      { title: 'Scanning stays on your Mac', text: 'File names, paths and contents are analysed locally and never uploaded. The only network calls are license activation, checkout, the update check and, on the free plan, the running total of space cleaned (a number — no file details).' },
      { title: 'You choose what is scanned', text: 'Pick the whole home folder or just the folders you want. Results are stored only on your Mac and can be cleared at any time.' },
      { title: 'Verified updates', text: "Each release publishes a SHA-256 checksum. The built-in updater refuses to install a download that doesn't match it." },
    ],
    sizeTitle: 'Why is the download only {size} MB?',
    sizeText:
      "Because it's genuinely native. MacDiskCleaner is written in Swift and SwiftUI — Apple's own languages for macOS — and calls the built-in file and Trash APIs directly. There's no embedded browser engine and no bundled runtime, so a small download is exactly what a focused native Mac utility should be.",
    verifyTitle: 'Verify your download',
    verifyText: 'Version {version}. Compare this checksum with your file using the Terminal command below.',
    notarizedNote:
      "MacDiskCleaner is distributed directly from this website and isn't on the Mac App Store, so macOS asks you to confirm the first launch of the downloaded .dmg — the download page shows how, and the Terminal installer avoids the prompt entirely. After that, updates install from inside the app.",
    faq: [
      { q: 'Can MacDiskCleaner delete system files?', a: 'No. System folders, Keychains, Preferences and privacy databases are on a block list that is checked immediately before every deletion, so they can never be removed — even by mistake.' },
      { q: 'Can I undo a cleanup?', a: 'Yes. Everything is moved to the Trash, so you can open the Trash and use Put Back until you empty it.' },
      { q: 'Does it need Full Disk Access?', a: "It's optional. Without it, scans skip folders macOS protects (such as Mail and Safari data). With it, scans can see those too. You can grant or revoke it any time in System Settings → Privacy & Security → Full Disk Access." },
      { q: 'What data leaves my Mac?', a: 'Only your license key and a hashed hardware ID during activation, the total amount of space cleaned on the free plan (a single number), the checkout page when you buy, and a version check for updates. No file names, paths or contents are ever sent.' },
    ],
  },
  es: {
    metaTitle: '¿Es seguro MacDiskCleaner? Cómo protege tus archivos y tu privacidad',
    metaDescription:
      'MacDiskCleaner mueve todo a la Papelera, bloquea las rutas protegidas del sistema, analiza en local sin subir archivos y publica una suma SHA-256 de cada versión.',
    breadcrumb: 'Seguridad y privacidad',
    h1: 'Diseñado para',
    h1Accent: 'que puedas confiar.',
    lead: 'Un limpiador solo es útil si puedes confiarle tus archivos. Así es exactamente como MacDiskCleaner los protege.',
    promises: [
      { title: 'Todo va primero a la Papelera', text: 'Ningún archivo se borra directamente. La limpieza usa la Papelera de macOS, así que puedes recuperar lo que elimines hasta que la vacíes.' },
      { title: 'Las rutas protegidas no se tocan', text: 'Las carpetas del sistema, tus llaveros, las preferencias y las bases de datos de privacidad están en una lista de bloqueo estricta, que se comprueba justo antes de cada borrado.' },
      { title: 'Tú apruebas cada borrado', text: 'Nada se elimina sin que lo veas. Los proyectos usados recientemente, los archivos de Xcode y similares se marcan como «Revisar antes» y no se seleccionan.' },
      { title: 'El análisis se queda en tu Mac', text: 'Los nombres, rutas y contenidos de los archivos se analizan en local y nunca se suben. Las únicas conexiones son la activación de la licencia, el pago, la comprobación de actualizaciones y, en el plan gratuito, el total de espacio limpiado (una cifra, sin detalles de archivos).' },
      { title: 'Tú eliges qué se analiza', text: 'Elige toda la carpeta de inicio o solo las carpetas que quieras. Los resultados se guardan solo en tu Mac y puedes borrarlos cuando quieras.' },
      { title: 'Actualizaciones verificadas', text: 'Cada versión publica una suma SHA-256. El actualizador integrado se niega a instalar una descarga que no coincida.' },
    ],
    sizeTitle: '¿Por qué la descarga ocupa solo {size} MB?',
    sizeText:
      'Porque es nativa de verdad. MacDiskCleaner está escrito en Swift y SwiftUI, los lenguajes de Apple para macOS, y usa directamente las API del sistema de archivos y de la Papelera. No incluye un motor de navegador ni un runtime empaquetado: una descarga pequeña es justo lo que debe ser una utilidad nativa de Mac.',
    verifyTitle: 'Verifica tu descarga',
    verifyText: 'Versión {version}. Compara esta suma de control con tu archivo usando el comando de Terminal de abajo.',
    notarizedNote:
      'MacDiskCleaner se distribuye directamente desde esta web y no está en la Mac App Store, por eso macOS te pide confirmar el primer arranque del .dmg descargado; la página de descarga explica cómo, y el instalador por Terminal evita el aviso. Después, las actualizaciones se instalan desde la app.',
    faq: [
      { q: '¿Puede MacDiskCleaner borrar archivos del sistema?', a: 'No. Las carpetas del sistema, los llaveros, las preferencias y las bases de datos de privacidad están en una lista de bloqueo que se comprueba justo antes de cada borrado, así que nunca se pueden eliminar, ni siquiera por error.' },
      { q: '¿Puedo deshacer una limpieza?', a: 'Sí. Todo se mueve a la Papelera, así que puedes abrirla y usar «Devolver» hasta que la vacíes.' },
      { q: '¿Necesita acceso total al disco?', a: 'Es opcional. Sin él, el análisis omite las carpetas que macOS protege (como los datos de Mail y Safari); con él, también las ve. Puedes concederlo o retirarlo en Ajustes del Sistema → Privacidad y seguridad → Acceso total al disco.' },
      { q: '¿Qué datos salen de mi Mac?', a: 'Solo tu clave de licencia y un identificador de hardware cifrado (hash) al activar, el total de espacio limpiado en el plan gratuito (una sola cifra), la página de pago cuando compras y una comprobación de versión para las actualizaciones. Nunca se envían nombres, rutas ni contenidos de archivos.' },
    ],
  },
  de: {
    metaTitle: 'Ist MacDiskCleaner sicher? So schützt die App deine Dateien & Privatsphäre',
    metaDescription:
      'MacDiskCleaner verschiebt alles in den Papierkorb, sperrt geschützte Systempfade, scannt lokal ohne Datei-Uploads und veröffentlicht für jede Version eine SHA-256-Prüfsumme.',
    breadcrumb: 'Sicherheit & Datenschutz',
    h1: 'Gebaut, um',
    h1Accent: 'vertrauenswürdig zu sein.',
    lead: 'Ein Cleaner ist nur nützlich, wenn du ihm deine Dateien anvertrauen kannst. So schützt MacDiskCleaner sie.',
    promises: [
      { title: 'Alles landet zuerst im Papierkorb', text: 'Keine Datei wird sofort gelöscht. Das Aufräumen nutzt den macOS-Papierkorb – du kannst alles zurücklegen, bis du ihn leerst.' },
      { title: 'Geschützte Pfade sind tabu', text: 'Systemordner, Schlüsselbunde, Einstellungen und Datenschutz-Datenbanken stehen auf einer festen Sperrliste, die direkt vor jedem Löschvorgang geprüft wird.' },
      { title: 'Du bestätigst jedes Löschen', text: 'Nichts wird entfernt, ohne dass du es siehst. Kürzlich genutzte Projekte, Xcode-Archive u. Ä. sind als „Erst prüfen“ markiert und nicht ausgewählt.' },
      { title: 'Der Scan bleibt auf deinem Mac', text: 'Dateinamen, Pfade und Inhalte werden lokal analysiert und nie hochgeladen. Netzwerkzugriffe gibt es nur für Lizenzaktivierung, Kauf, Update-Prüfung und – in der Gratis-Version – die Gesamtmenge an aufgeräumtem Speicher (eine Zahl, keine Dateidetails).' },
      { title: 'Du wählst, was gescannt wird', text: 'Den ganzen Benutzerordner oder nur bestimmte Ordner. Ergebnisse werden nur auf deinem Mac gespeichert und lassen sich jederzeit löschen.' },
      { title: 'Geprüfte Updates', text: 'Jede Version veröffentlicht eine SHA-256-Prüfsumme. Der eingebaute Updater installiert keinen Download, der nicht übereinstimmt.' },
    ],
    sizeTitle: 'Warum ist der Download nur {size} MB groß?',
    sizeText:
      'Weil die App wirklich nativ ist. MacDiskCleaner ist in Swift und SwiftUI geschrieben – Apples eigenen Sprachen für macOS – und nutzt die Datei- und Papierkorb-APIs direkt. Keine eingebettete Browser-Engine, keine mitgelieferte Laufzeitumgebung: Ein kleiner Download ist genau das, was ein fokussiertes Mac-Werkzeug sein sollte.',
    verifyTitle: 'Download überprüfen',
    verifyText: 'Version {version}. Vergleiche diese Prüfsumme mit deiner Datei per Terminal-Befehl unten.',
    notarizedNote:
      'MacDiskCleaner wird direkt über diese Website vertrieben und ist nicht im Mac App Store. Deshalb bittet macOS beim ersten Start der geladenen .dmg um Bestätigung – die Download-Seite zeigt wie, und der Terminal-Installer vermeidet die Abfrage ganz. Danach installieren sich Updates aus der App.',
    faq: [
      { q: 'Kann MacDiskCleaner Systemdateien löschen?', a: 'Nein. Systemordner, Schlüsselbunde, Einstellungen und Datenschutz-Datenbanken stehen auf einer Sperrliste, die direkt vor jedem Löschen geprüft wird – sie können also nie entfernt werden, auch nicht versehentlich.' },
      { q: 'Kann ich ein Aufräumen rückgängig machen?', a: 'Ja. Alles wird in den Papierkorb verschoben – öffne ihn und nutze „Zurücklegen“, solange du ihn nicht geleert hast.' },
      { q: 'Braucht die App Festplattenvollzugriff?', a: 'Optional. Ohne ihn überspringt der Scan von macOS geschützte Ordner (etwa Mail- und Safari-Daten), mit ihm werden auch diese erfasst. Du kannst ihn jederzeit unter Systemeinstellungen → Datenschutz & Sicherheit → Festplattenvollzugriff erteilen oder entziehen.' },
      { q: 'Welche Daten verlassen meinen Mac?', a: 'Nur dein Lizenzschlüssel und eine gehashte Hardware-ID bei der Aktivierung, in der Gratis-Version die Gesamtmenge an aufgeräumtem Speicher (eine einzelne Zahl), die Kaufseite beim Bezahlen und eine Versionsabfrage für Updates. Dateinamen, Pfade oder Inhalte werden nie gesendet.' },
    ],
  },
  fr: {
    metaTitle: 'MacDiskCleaner est-il sûr ? Comment il protège vos fichiers et votre vie privée',
    metaDescription:
      'MacDiskCleaner place tout dans la Corbeille, bloque les chemins système protégés, analyse en local sans envoyer de fichiers et publie une somme SHA-256 pour chaque version.',
    breadcrumb: 'Sécurité et confidentialité',
    h1: 'Conçu pour',
    h1Accent: 'mériter votre confiance.',
    lead: 'Un nettoyeur n’est utile que si vous pouvez lui confier vos fichiers. Voici précisément comment MacDiskCleaner les protège.',
    promises: [
      { title: 'Tout passe d’abord par la Corbeille', text: 'Aucun fichier n’est effacé directement. Le nettoyage utilise la Corbeille de macOS : vous pouvez tout récupérer tant qu’elle n’est pas vidée.' },
      { title: 'Les chemins protégés sont intouchables', text: 'Les dossiers système, vos trousseaux, les préférences et les bases de confidentialité figurent sur une liste de blocage stricte, vérifiée juste avant chaque suppression.' },
      { title: 'Vous validez chaque suppression', text: 'Rien n’est supprimé sans que vous le voyiez. Les projets récents, les archives Xcode et éléments similaires sont marqués « À vérifier » et non sélectionnés.' },
      { title: 'L’analyse reste sur votre Mac', text: 'Les noms, chemins et contenus des fichiers sont analysés localement et jamais envoyés. Les seuls accès réseau : activation de licence, paiement, vérification des mises à jour et, en offre gratuite, le total d’espace nettoyé (un nombre, sans détail sur les fichiers).' },
      { title: 'Vous choisissez ce qui est analysé', text: 'Tout le dossier de départ ou seulement certains dossiers. Les résultats restent sur votre Mac et peuvent être effacés à tout moment.' },
      { title: 'Mises à jour vérifiées', text: 'Chaque version publie une somme SHA-256. Le système de mise à jour intégré refuse d’installer un fichier qui ne correspond pas.' },
    ],
    sizeTitle: 'Pourquoi le téléchargement ne fait-il que {size} Mo ?',
    sizeText:
      'Parce qu’il est vraiment natif. MacDiskCleaner est écrit en Swift et SwiftUI — les langages d’Apple pour macOS — et utilise directement les API de fichiers et de Corbeille. Pas de moteur de navigateur intégré ni d’environnement d’exécution embarqué : un petit téléchargement est exactement ce que doit être un utilitaire Mac natif.',
    verifyTitle: 'Vérifiez votre téléchargement',
    verifyText: 'Version {version}. Comparez cette somme de contrôle avec votre fichier grâce à la commande Terminal ci-dessous.',
    notarizedNote:
      'MacDiskCleaner est distribué directement depuis ce site et n’est pas sur le Mac App Store : macOS vous demande donc de confirmer le premier lancement du .dmg téléchargé — la page de téléchargement explique comment, et l’installateur Terminal évite l’alerte. Ensuite, les mises à jour s’installent depuis l’app.',
    faq: [
      { q: 'MacDiskCleaner peut-il supprimer des fichiers système ?', a: 'Non. Les dossiers système, trousseaux, préférences et bases de confidentialité sont sur une liste de blocage vérifiée juste avant chaque suppression : ils ne peuvent jamais être supprimés, même par erreur.' },
      { q: 'Puis-je annuler un nettoyage ?', a: 'Oui. Tout est placé dans la Corbeille : ouvrez-la et utilisez « Remettre » tant qu’elle n’est pas vidée.' },
      { q: 'A-t-il besoin de l’accès complet au disque ?', a: 'C’est facultatif. Sans lui, l’analyse ignore les dossiers protégés par macOS (comme les données de Mail et Safari) ; avec lui, elle les voit aussi. Vous pouvez l’accorder ou le retirer dans Réglages Système → Confidentialité et sécurité → Accès complet au disque.' },
      { q: 'Quelles données quittent mon Mac ?', a: 'Uniquement votre clé de licence et un identifiant matériel haché lors de l’activation, le total d’espace nettoyé en offre gratuite (un seul nombre), la page de paiement lors d’un achat et une vérification de version pour les mises à jour. Aucun nom, chemin ou contenu de fichier n’est envoyé.' },
    ],
  },
}
