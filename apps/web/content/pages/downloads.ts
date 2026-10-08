import type { Localized } from '@/lib/localized'
import type { FaqItem } from '@/components/site/FaqSection'

export type DownloadsCopy = {
  metaTitle: string
  metaDescription: string
  breadcrumb: string
  h1: string
  h1Accent: string
  lead: string
  versionLine: string // {version} {size} {date}
  whatsNew: string
  verify: string
  recommended: string
  terminalTitle: string
  terminalText: string
  terminalHint: string
  viewScript: string
  steps: { title: string; text: string }[]
  dmgLabel: string
  dmgButton: string
  dmgNote: string
  gkTitle: string
  gkIntro: string
  gkWarning: string // rich: <b>
  gkNewTitle: string
  gkNewSteps: string[] // rich: <b>
  gkOldTitle: string
  gkOldSteps: string[]
  gkTerminalSummary: string
  gkTerminalText: string
  gkFooter: string
  reqTitle: string
  requirements: string[]
  faq: FaqItem[]
}

export const downloadsCopy: Localized<DownloadsCopy> = {
  en: {
    metaTitle: 'Download MacDiskCleaner for Mac — Free, Apple Silicon & Intel',
    metaDescription:
      'Download the latest MacDiskCleaner: one free, universal app for Apple Silicon and Intel Macs on macOS 14+. No account, verified SHA-256 checksum.',
    breadcrumb: 'Download',
    h1: 'One download.',
    h1Accent: 'Every Mac.',
    lead: 'MacDiskCleaner ships as a single universal app compiled natively for both Apple Silicon and Intel — no version to pick, it just runs fast on whichever Mac you have.',
    versionLine: 'Version {version} · {size} MB · released {date}',
    whatsNew: "What's new",
    verify: 'Verify checksum',
    recommended: 'RECOMMENDED — INSTALLS WITH NO macOS WARNING',
    terminalTitle: 'Install from Terminal',
    terminalText:
      "Because MacDiskCleaner isn't on the App Store, macOS shows a warning the first time you open an app downloaded in a browser. This one command skips that: it downloads the latest version, checks its published checksum, installs it in Applications and opens it.",
    terminalHint: 'Open Terminal (Applications → Utilities), paste, press Return.',
    viewScript: 'View the script',
    steps: [
      { title: 'Open Terminal', text: 'Applications → Utilities → Terminal (or search "Terminal" in Spotlight).' },
      { title: 'Paste the command', text: 'Copy the line above, paste it in and press Return.' },
      { title: 'Done', text: 'MacDiskCleaner installs and opens automatically. Future updates install themselves from inside the app.' },
    ],
    dmgLabel: 'Prefer a regular download?',
    dmgButton: 'Download the .dmg',
    dmgNote: 'Same universal file for Apple Silicon and Intel. macOS shows a one-time warning before the first launch — here is exactly how to get past it.',
    gkTitle: '"Apple could not verify this app…"',
    gkIntro: "This is expected for the .dmg download — MacDiskCleaner isn't on the App Store, so macOS asks you to confirm the very first launch. It only happens once.",
    gkWarning: '<b>If the warning only offers "Move to Bin":</b> close it with the other button — don\'t click Move to Bin, the download is fine. Then follow the steps below.',
    gkNewTitle: 'macOS 15 Sequoia or later',
    gkNewSteps: [
      'Open MacDiskCleaner once; on the warning, click <b>Done</b> (not Move to Bin).',
      'Open <b>System Settings → Privacy & Security</b>.',
      'Scroll down, click <b>Open Anyway</b> next to MacDiskCleaner, then confirm with your password.',
    ],
    gkOldTitle: 'macOS 14 Sonoma',
    gkOldSteps: ['Right-click (or Control-click) MacDiskCleaner in Applications.', 'Choose <b>Open</b>.', 'Click <b>Open</b> again in the dialog.'],
    gkTerminalSummary: 'Already downloaded the .dmg? Clear the warning from Terminal',
    gkTerminalText: 'Paste this once, then open the app normally:',
    gkFooter: 'Once past this one-time check, future updates install from inside the app with no warning. You can verify your download with its published checksum on the safety page.',
    reqTitle: 'System requirements',
    requirements: [
      'macOS 14 Sonoma or later',
      'Apple Silicon (M1 or newer) or Intel processor',
      'About 50 MB of free disk space',
      'No account or sign-up required',
    ],
    faq: [
      { q: 'Is the download free?', a: 'Yes. The download is free and the free tier never expires: scan everything and clean up to 2 GB in total at no cost. Pro is an optional $12.99 one-time upgrade.' },
      { q: 'Which version do I need for an M-series or Intel Mac?', a: 'There is only one. The app is a universal binary with native code for Apple Silicon and Intel, so the same download runs natively on both.' },
      { q: 'Why does macOS warn me when I open it?', a: 'macOS shows that warning for apps downloaded in a browser that are not distributed through the App Store. It is a one-time confirmation; the Terminal install above avoids it entirely, and the published SHA-256 checksum lets you verify the file.' },
      { q: 'How do I update MacDiskCleaner?', a: 'The app checks for updates automatically and installs them in one click from inside the app, so you never need to download it again from the website.' },
      { q: 'How do I uninstall it?', a: 'Quit the app and drag MacDiskCleaner from Applications to the Trash. Its settings live in ~/Library/Application Support/MacStorageOptimizer and can be removed the same way.' },
    ],
  },
  es: {
    metaTitle: 'Descargar MacDiskCleaner para Mac: gratis, Apple Silicon e Intel',
    metaDescription:
      'Descarga la última versión de MacDiskCleaner: una app gratis y universal para Mac Apple Silicon e Intel con macOS 14+. Sin cuenta, con SHA-256.',
    breadcrumb: 'Descargar',
    h1: 'Una descarga.',
    h1Accent: 'Todos los Mac.',
    lead: 'MacDiskCleaner es una sola app universal compilada de forma nativa para Apple Silicon e Intel: no hay versión que elegir, simplemente funciona rápido en tu Mac.',
    versionLine: 'Versión {version} · {size} MB · publicada el {date}',
    whatsNew: 'Novedades',
    verify: 'Verificar suma de control',
    recommended: 'RECOMENDADO: SE INSTALA SIN AVISOS DE macOS',
    terminalTitle: 'Instalar desde Terminal',
    terminalText:
      'Como MacDiskCleaner no está en la App Store, macOS muestra un aviso la primera vez que abres una app descargada desde el navegador. Este comando lo evita: descarga la última versión, comprueba su suma de control publicada, la instala en Aplicaciones y la abre.',
    terminalHint: 'Abre Terminal (Aplicaciones → Utilidades), pega el comando y pulsa Retorno.',
    viewScript: 'Ver el script',
    steps: [
      { title: 'Abre Terminal', text: 'Aplicaciones → Utilidades → Terminal (o busca «Terminal» en Spotlight).' },
      { title: 'Pega el comando', text: 'Copia la línea de arriba, pégala y pulsa Retorno.' },
      { title: 'Listo', text: 'MacDiskCleaner se instala y se abre solo. Las próximas actualizaciones se instalan desde la propia app.' },
    ],
    dmgLabel: '¿Prefieres una descarga normal?',
    dmgButton: 'Descargar el .dmg',
    dmgNote: 'El mismo archivo universal para Apple Silicon e Intel. macOS mostrará un aviso una sola vez antes del primer arranque; aquí tienes cómo superarlo.',
    gkTitle: '«Apple no ha podido verificar esta app…»',
    gkIntro: 'Es lo normal con la descarga .dmg: como MacDiskCleaner no está en la App Store, macOS te pide confirmar el primer arranque. Solo ocurre una vez.',
    gkWarning: '<b>Si el aviso solo ofrece «Trasladar a la Papelera»:</b> ciérralo con el otro botón; no lo traslades a la Papelera, la descarga está bien. Después sigue estos pasos.',
    gkNewTitle: 'macOS 15 Sequoia o posterior',
    gkNewSteps: [
      'Abre MacDiskCleaner una vez y cierra el aviso (sin trasladarlo a la Papelera).',
      'Abre <b>Ajustes del Sistema → Privacidad y seguridad</b>.',
      'Baja y haz clic en <b>Abrir igualmente</b> junto a MacDiskCleaner; confirma con tu contraseña.',
    ],
    gkOldTitle: 'macOS 14 Sonoma',
    gkOldSteps: ['Haz clic derecho (o Control + clic) en MacDiskCleaner dentro de Aplicaciones.', 'Elige <b>Abrir</b>.', 'Vuelve a hacer clic en <b>Abrir</b> en el cuadro de diálogo.'],
    gkTerminalSummary: '¿Ya descargaste el .dmg? Quita el aviso desde Terminal',
    gkTerminalText: 'Pega esto una vez y luego abre la app con normalidad:',
    gkFooter: 'Superada esta comprobación única, las actualizaciones se instalan desde la app sin avisos. Puedes verificar tu descarga con la suma de control publicada en la página de seguridad.',
    reqTitle: 'Requisitos del sistema',
    requirements: ['macOS 14 Sonoma o posterior', 'Procesador Apple Silicon (M1 o posterior) o Intel', 'Unos 50 MB de espacio libre', 'Sin cuenta ni registro'],
    faq: [
      { q: '¿La descarga es gratis?', a: 'Sí. La descarga es gratuita y el plan gratuito no caduca: analiza todo y limpia hasta 2 GB en total sin pagar. Pro es una mejora opcional de pago único de 12,99 $.' },
      { q: '¿Qué versión necesito para un Mac con chip M o Intel?', a: 'Solo hay una. La app es un binario universal con código nativo para Apple Silicon e Intel, así que la misma descarga funciona de forma nativa en ambos.' },
      { q: '¿Por qué macOS me muestra un aviso al abrirla?', a: 'macOS muestra ese aviso con las apps descargadas desde el navegador que no se distribuyen a través de la App Store. Es una confirmación única; la instalación por Terminal lo evita y la suma SHA-256 publicada te permite verificar el archivo.' },
      { q: '¿Cómo actualizo MacDiskCleaner?', a: 'La app busca actualizaciones automáticamente y las instala con un clic desde dentro, así que no necesitas volver a descargarla desde la web.' },
      { q: '¿Cómo la desinstalo?', a: 'Cierra la app y arrastra MacDiskCleaner desde Aplicaciones a la Papelera. Sus ajustes están en ~/Library/Application Support/MacStorageOptimizer y se pueden eliminar igual.' },
    ],
  },
  de: {
    metaTitle: 'MacDiskCleaner für Mac herunterladen – kostenlos, Apple Silicon & Intel',
    metaDescription:
      'Neueste Version von MacDiskCleaner laden: eine kostenlose, universelle App für Apple-Silicon- und Intel-Macs ab macOS 14. Ohne Konto, mit SHA-256.',
    breadcrumb: 'Download',
    h1: 'Ein Download.',
    h1Accent: 'Jeder Mac.',
    lead: 'MacDiskCleaner ist eine einzige universelle App, nativ kompiliert für Apple Silicon und Intel – keine Version auswählen, sie läuft einfach schnell auf deinem Mac.',
    versionLine: 'Version {version} · {size} MB · veröffentlicht am {date}',
    whatsNew: 'Neuerungen',
    verify: 'Prüfsumme prüfen',
    recommended: 'EMPFOHLEN – INSTALLATION OHNE macOS-WARNUNG',
    terminalTitle: 'Über das Terminal installieren',
    terminalText:
      'Da MacDiskCleaner nicht im App Store ist, zeigt macOS beim ersten Öffnen einer im Browser geladenen App eine Warnung. Dieser eine Befehl umgeht das: Er lädt die neueste Version, prüft die veröffentlichte Prüfsumme, installiert sie in „Programme“ und öffnet sie.',
    terminalHint: 'Terminal öffnen (Programme → Dienstprogramme), einfügen, Return drücken.',
    viewScript: 'Skript ansehen',
    steps: [
      { title: 'Terminal öffnen', text: 'Programme → Dienstprogramme → Terminal (oder „Terminal“ in Spotlight suchen).' },
      { title: 'Befehl einfügen', text: 'Zeile oben kopieren, einfügen und Return drücken.' },
      { title: 'Fertig', text: 'MacDiskCleaner wird installiert und öffnet sich automatisch. Künftige Updates installieren sich direkt aus der App.' },
    ],
    dmgLabel: 'Lieber ein normaler Download?',
    dmgButton: '.dmg herunterladen',
    dmgNote: 'Dieselbe universelle Datei für Apple Silicon und Intel. macOS zeigt vor dem ersten Start einmalig eine Warnung – so kommst du daran vorbei.',
    gkTitle: '„Apple konnte nicht überprüfen …“',
    gkIntro: 'Beim .dmg-Download ist das normal: Da MacDiskCleaner nicht im App Store ist, lässt macOS dich den allerersten Start bestätigen. Das passiert nur einmal.',
    gkWarning: '<b>Wenn die Warnung nur „In den Papierkorb legen“ anbietet:</b> schließe sie mit der anderen Taste – nicht in den Papierkorb legen, der Download ist in Ordnung. Folge dann den Schritten unten.',
    gkNewTitle: 'macOS 15 Sequoia oder neuer',
    gkNewSteps: [
      'MacDiskCleaner einmal öffnen und die Warnung mit <b>Fertig</b> schließen (nicht in den Papierkorb).',
      '<b>Systemeinstellungen → Datenschutz & Sicherheit</b> öffnen.',
      'Nach unten scrollen, bei MacDiskCleaner auf <b>Dennoch öffnen</b> klicken und mit deinem Passwort bestätigen.',
    ],
    gkOldTitle: 'macOS 14 Sonoma',
    gkOldSteps: ['Im Ordner „Programme“ mit rechts (oder Ctrl-Klick) auf MacDiskCleaner klicken.', '<b>Öffnen</b> wählen.', 'Im Dialog erneut auf <b>Öffnen</b> klicken.'],
    gkTerminalSummary: '.dmg schon geladen? Warnung über das Terminal entfernen',
    gkTerminalText: 'Einmal einfügen, dann die App ganz normal öffnen:',
    gkFooter: 'Nach dieser einmaligen Prüfung installieren sich Updates ohne Warnung aus der App. Deinen Download kannst du mit der veröffentlichten Prüfsumme auf der Sicherheitsseite prüfen.',
    reqTitle: 'Systemvoraussetzungen',
    requirements: ['macOS 14 Sonoma oder neuer', 'Apple Silicon (ab M1) oder Intel-Prozessor', 'Etwa 50 MB freier Speicher', 'Kein Konto, keine Registrierung'],
    faq: [
      { q: 'Ist der Download kostenlos?', a: 'Ja. Der Download ist kostenlos und die Gratis-Version läuft nie ab: alles scannen und insgesamt bis zu 2 GB gratis aufräumen. Pro ist ein optionales Upgrade für einmalig 12,99 $.' },
      { q: 'Welche Version brauche ich für einen Mac mit M-Chip oder Intel?', a: 'Es gibt nur eine. Die App ist ein Universal Binary mit nativem Code für Apple Silicon und Intel – derselbe Download läuft auf beiden nativ.' },
      { q: 'Warum warnt macOS beim Öffnen?', a: 'macOS zeigt diese Warnung bei im Browser geladenen Apps, die nicht über den App Store verteilt werden. Es ist eine einmalige Bestätigung; die Terminal-Installation vermeidet sie ganz, und mit der veröffentlichten SHA-256-Prüfsumme kannst du die Datei prüfen.' },
      { q: 'Wie aktualisiere ich MacDiskCleaner?', a: 'Die App sucht automatisch nach Updates und installiert sie mit einem Klick direkt in der App – ein erneuter Download von der Website ist nicht nötig.' },
      { q: 'Wie deinstalliere ich die App?', a: 'App beenden und MacDiskCleaner aus „Programme“ in den Papierkorb ziehen. Die Einstellungen liegen unter ~/Library/Application Support/MacStorageOptimizer und lassen sich genauso entfernen.' },
    ],
  },
  fr: {
    metaTitle: 'Télécharger MacDiskCleaner pour Mac — gratuit, Apple Silicon et Intel',
    metaDescription:
      'Téléchargez la dernière version de MacDiskCleaner : une app gratuite et universelle pour Mac Apple Silicon et Intel sous macOS 14+, sans compte.',
    breadcrumb: 'Télécharger',
    h1: 'Un seul téléchargement.',
    h1Accent: 'Tous les Mac.',
    lead: 'MacDiskCleaner est une app universelle compilée nativement pour Apple Silicon et Intel : aucune version à choisir, elle tourne simplement vite sur votre Mac.',
    versionLine: 'Version {version} · {size} Mo · publiée le {date}',
    whatsNew: 'Nouveautés',
    verify: 'Vérifier la somme de contrôle',
    recommended: 'RECOMMANDÉ — INSTALLATION SANS AVERTISSEMENT macOS',
    terminalTitle: 'Installer depuis le Terminal',
    terminalText:
      'MacDiskCleaner n’étant pas sur l’App Store, macOS affiche un avertissement à la première ouverture d’une app téléchargée dans le navigateur. Cette commande l’évite : elle télécharge la dernière version, vérifie sa somme de contrôle publiée, l’installe dans Applications et l’ouvre.',
    terminalHint: 'Ouvrez le Terminal (Applications → Utilitaires), collez, appuyez sur Entrée.',
    viewScript: 'Voir le script',
    steps: [
      { title: 'Ouvrez le Terminal', text: 'Applications → Utilitaires → Terminal (ou recherchez « Terminal » dans Spotlight).' },
      { title: 'Collez la commande', text: 'Copiez la ligne ci-dessus, collez-la et appuyez sur Entrée.' },
      { title: 'C’est fait', text: 'MacDiskCleaner s’installe et s’ouvre automatiquement. Les mises à jour suivantes s’installent depuis l’app.' },
    ],
    dmgLabel: 'Vous préférez un téléchargement classique ?',
    dmgButton: 'Télécharger le .dmg',
    dmgNote: 'Le même fichier universel pour Apple Silicon et Intel. macOS affiche un avertissement unique avant le premier lancement — voici comment le passer.',
    gkTitle: '« Apple n’a pas pu vérifier cette app… »',
    gkIntro: 'C’est normal avec le .dmg : MacDiskCleaner n’étant pas sur l’App Store, macOS vous demande de confirmer le tout premier lancement. Cela n’arrive qu’une fois.',
    gkWarning: '<b>Si l’avertissement ne propose que « Placer dans la corbeille » :</b> fermez-le avec l’autre bouton — ne le mettez pas à la corbeille, le fichier est sain. Suivez ensuite les étapes ci-dessous.',
    gkNewTitle: 'macOS 15 Sequoia ou ultérieur',
    gkNewSteps: [
      'Ouvrez MacDiskCleaner une fois et fermez l’avertissement (sans le placer dans la corbeille).',
      'Ouvrez <b>Réglages Système → Confidentialité et sécurité</b>.',
      'Descendez, cliquez sur <b>Ouvrir quand même</b> à côté de MacDiskCleaner, puis confirmez avec votre mot de passe.',
    ],
    gkOldTitle: 'macOS 14 Sonoma',
    gkOldSteps: ['Faites un clic droit (ou Contrôle-clic) sur MacDiskCleaner dans Applications.', 'Choisissez <b>Ouvrir</b>.', 'Cliquez de nouveau sur <b>Ouvrir</b> dans la fenêtre.'],
    gkTerminalSummary: 'Vous avez déjà téléchargé le .dmg ? Retirez l’avertissement depuis le Terminal',
    gkTerminalText: 'Collez ceci une fois, puis ouvrez l’app normalement :',
    gkFooter: 'Après cette vérification unique, les mises à jour s’installent depuis l’app sans avertissement. Vous pouvez vérifier votre téléchargement grâce à la somme de contrôle publiée sur la page sécurité.',
    reqTitle: 'Configuration requise',
    requirements: ['macOS 14 Sonoma ou ultérieur', 'Processeur Apple Silicon (M1 ou plus récent) ou Intel', 'Environ 50 Mo d’espace libre', 'Aucun compte ni inscription'],
    faq: [
      { q: 'Le téléchargement est-il gratuit ?', a: 'Oui. Le téléchargement est gratuit et l’offre gratuite n’expire jamais : analysez tout et nettoyez jusqu’à 2 Go au total sans payer. Pro est une option à 12,99 $ en paiement unique.' },
      { q: 'Quelle version pour un Mac à puce M ou Intel ?', a: 'Il n’y en a qu’une. L’app est un binaire universel avec du code natif pour Apple Silicon et Intel : le même téléchargement fonctionne nativement sur les deux.' },
      { q: 'Pourquoi macOS m’avertit-il à l’ouverture ?', a: 'macOS affiche cet avertissement pour les apps téléchargées dans un navigateur et non distribuées via l’App Store. C’est une confirmation unique ; l’installation par le Terminal l’évite, et la somme SHA-256 publiée vous permet de vérifier le fichier.' },
      { q: 'Comment mettre à jour MacDiskCleaner ?', a: 'L’app recherche les mises à jour automatiquement et les installe en un clic depuis l’app : inutile de la retélécharger sur le site.' },
      { q: 'Comment la désinstaller ?', a: 'Quittez l’app et faites glisser MacDiskCleaner depuis Applications vers la Corbeille. Ses réglages se trouvent dans ~/Library/Application Support/MacStorageOptimizer et se suppriment de la même façon.' },
    ],
  },
}
