import type { Localized } from '@/lib/localized'
import type { FaqItem } from '@/components/site/FaqSection'

export type PricingCopy = {
  metaTitle: string
  metaDescription: string
  breadcrumb: string
  h1: string
  h1Accent: string
  lead: string
  freeName: string
  freeSub: string
  freeFeatures: string[]
  proBadge: string
  proName: string
  proSub: string
  proFeatures: string[]
  proCta: string
  compareTitle: string
  compareRows: { label: string; free: string; pro: string }[]
  faqTitle: string
  faq: FaqItem[]
}

export const pricingCopy: Localized<PricingCopy> = {
  en: {
    metaTitle: 'MacDiskCleaner Pricing — Free Tier & $12.99 One-Time Pro (No Subscription)',
    metaDescription:
      'MacDiskCleaner pricing: scan free and clean up to 2 GB at no cost, then unlimited cleanup with Pro for $12.99 once. No subscription, 30-day refund.',
    breadcrumb: 'Pricing',
    h1: 'Simple. Honest.',
    h1Accent: 'One price.',
    lead: 'No subscriptions. No hidden fees. Pay once for Pro, or use a genuinely free tier forever.',
    freeName: 'Free',
    freeSub: 'Free forever — no trial.',
    freeFeatures: [
      'Scan your whole Mac — nothing hidden or blurred',
      'Duplicates, large & old files, downloads and junk, all visible',
      'Free cleanup up to 2 GB in total (lifetime allowance)',
      'Unlimited scans',
      'Safe deletion — everything goes to the Trash first',
    ],
    proBadge: 'BEST VALUE',
    proName: 'Pro',
    proSub: 'One-time payment. No subscription, ever.',
    proFeatures: [
      'Unlimited cleanup — no 2 GB cap',
      'App Uninstaller — removes leftover support files',
      'Privacy Cleaner — browser history, cache, cookies, Recent Items',
      'Startup Manager — see and disable login items',
      'Scheduled Scans — automatic background scanning',
      'Lifetime updates',
      'Priority support',
    ],
    proCta: 'Get Pro — $12.99',
    compareTitle: 'Free vs Pro at a glance',
    compareRows: [
      { label: 'Scanning & browsing results', free: 'Unlimited', pro: 'Unlimited' },
      { label: 'Cleanup', free: '2 GB total', pro: 'Unlimited' },
      { label: 'Developer cleanup (Xcode, node_modules…)', free: 'Within 2 GB', pro: 'Unlimited' },
      { label: 'App Uninstaller', free: '—', pro: 'Included' },
      { label: 'Privacy Cleaner', free: '—', pro: 'Included' },
      { label: 'Startup Manager', free: '—', pro: 'Included' },
      { label: 'Scheduled Scans', free: '—', pro: 'Included' },
      { label: 'Price', free: '$0', pro: '$12.99 once' },
    ],
    faqTitle: 'Pricing questions',
    faq: [
      { q: 'Is Pro a subscription?', a: "No. It's a single $12.99 payment — no recurring billing, ever. You own the license." },
      { q: 'How many Macs can one license activate?', a: 'Each Pro license activates on one Mac. Getting a new Mac? Choose Deactivate License in the old app (or contact support) and activate it on the new one.' },
      { q: 'Can I get a refund?', a: 'Yes — a full 30-day, no-questions-asked refund on all Pro purchases. Email support@macdiskcleaner.com with your license key.' },
      { q: 'What payment methods are accepted?', a: 'Card, Apple Pay and Google Pay, charged in USD and processed securely at checkout. Your bank may show the amount converted to your local currency.' },
      { q: 'What happens when I reach the free 2 GB?', a: 'Scanning and browsing stay free forever — you can always see everything MacDiskCleaner finds. Once you have cleaned up 2 GB in total, the app asks for Pro (or a license key) before it deletes anything more. The 2 GB is a lifetime allowance, not a monthly one.' },
      { q: 'Do I need to copy a license key after buying in the app?', a: 'No. When you buy from inside the app, Pro unlocks automatically once the payment completes. The key is also emailed to you as a backup, and you can enter it any time with “Enter license key” in the app.' },
    ],
  },
  es: {
    metaTitle: 'Precios de MacDiskCleaner: plan gratuito y Pro por 12,99 $ (pago único, sin suscripción)',
    metaDescription:
      'Precios de MacDiskCleaner: analiza gratis y limpia hasta 2 GB; después, Pro por 12,99 $ una sola vez. Sin suscripción y con reembolso de 30 días.',
    breadcrumb: 'Precios',
    h1: 'Sencillo. Honesto.',
    h1Accent: 'Un solo precio.',
    lead: 'Sin suscripciones. Sin costes ocultos. Paga una vez por Pro o usa un plan gratuito de verdad, para siempre.',
    freeName: 'Gratis',
    freeSub: 'Gratis para siempre, sin prueba.',
    freeFeatures: [
      'Analiza todo tu Mac: nada oculto ni difuminado',
      'Duplicados, archivos grandes y antiguos, descargas y archivos basura, todo visible',
      'Limpieza gratuita de hasta 2 GB en total (de por vida)',
      'Análisis ilimitados',
      'Borrado seguro: todo va primero a la Papelera',
    ],
    proBadge: 'MEJOR OPCIÓN',
    proName: 'Pro',
    proSub: 'Pago único. Nunca una suscripción.',
    proFeatures: [
      'Limpieza ilimitada, sin el límite de 2 GB',
      'Desinstalador: elimina también los archivos residuales',
      'Limpiador de privacidad: historial, caché y cookies del navegador, ítems recientes',
      'Gestor de inicio: ve y desactiva los ítems de inicio de sesión',
      'Análisis programados: escaneos automáticos en segundo plano',
      'Actualizaciones de por vida',
      'Soporte prioritario',
    ],
    proCta: 'Obtener Pro — 12,99 $',
    compareTitle: 'Gratis vs Pro de un vistazo',
    compareRows: [
      { label: 'Análisis y consulta de resultados', free: 'Ilimitado', pro: 'Ilimitado' },
      { label: 'Limpieza', free: '2 GB en total', pro: 'Ilimitada' },
      { label: 'Limpieza para desarrolladores (Xcode, node_modules…)', free: 'Dentro de los 2 GB', pro: 'Ilimitada' },
      { label: 'Desinstalador de apps', free: '—', pro: 'Incluido' },
      { label: 'Limpiador de privacidad', free: '—', pro: 'Incluido' },
      { label: 'Gestor de inicio', free: '—', pro: 'Incluido' },
      { label: 'Análisis programados', free: '—', pro: 'Incluido' },
      { label: 'Precio', free: '0 $', pro: '12,99 $ una vez' },
    ],
    faqTitle: 'Preguntas sobre precios',
    faq: [
      { q: '¿Pro es una suscripción?', a: 'No. Es un único pago de 12,99 $, sin cobros recurrentes. La licencia es tuya.' },
      { q: '¿En cuántos Mac puedo activar una licencia?', a: 'Cada licencia Pro se activa en un Mac. ¿Cambias de Mac? Elige «Desactivar licencia» en la app del Mac antiguo (o escribe a soporte) y actívala en el nuevo.' },
      { q: '¿Puedo pedir un reembolso?', a: 'Sí: reembolso completo durante 30 días, sin preguntas, en todas las compras de Pro. Escribe a support@macdiskcleaner.com con tu clave de licencia.' },
      { q: '¿Qué métodos de pago se aceptan?', a: 'Tarjeta, Apple Pay y Google Pay. El cobro se hace en dólares (USD) de forma segura; tu banco puede mostrar el importe convertido a tu moneda.' },
      { q: '¿Qué pasa cuando llego a los 2 GB gratuitos?', a: 'Analizar y ver los resultados sigue siendo gratis para siempre. Cuando hayas limpiado 2 GB en total, la app te pedirá Pro (o una clave de licencia) antes de borrar más. Los 2 GB son una cuota de por vida, no mensual.' },
      { q: '¿Tengo que copiar una clave tras comprar en la app?', a: 'No. Si compras desde la propia app, Pro se activa automáticamente al completarse el pago. También recibes la clave por correo como respaldo, y puedes introducirla cuando quieras con el botón «Enter license key» de la app.' },
    ],
  },
  de: {
    metaTitle: 'MacDiskCleaner Preise: Gratis-Version & Pro für einmalig 12,99 $ (kein Abo)',
    metaDescription:
      'MacDiskCleaner Preise: gratis scannen und bis zu 2 GB aufräumen, danach Pro für einmalig 12,99 $. Kein Abo, 30 Tage Geld-zurück-Garantie.',
    breadcrumb: 'Preise',
    h1: 'Einfach. Ehrlich.',
    h1Accent: 'Ein Preis.',
    lead: 'Keine Abos. Keine versteckten Kosten. Einmal für Pro bezahlen – oder für immer eine wirklich kostenlose Version nutzen.',
    freeName: 'Gratis',
    freeSub: 'Für immer kostenlos – keine Testphase.',
    freeFeatures: [
      'Deinen ganzen Mac scannen – nichts versteckt oder verschwommen',
      'Duplikate, große & alte Dateien, Downloads und Datenmüll – alles sichtbar',
      'Kostenlos aufräumen bis insgesamt 2 GB (lebenslanges Kontingent)',
      'Unbegrenzt viele Scans',
      'Sicheres Löschen – alles landet zuerst im Papierkorb',
    ],
    proBadge: 'BESTES ANGEBOT',
    proName: 'Pro',
    proSub: 'Einmalzahlung. Niemals ein Abo.',
    proFeatures: [
      'Unbegrenzt aufräumen – keine 2-GB-Grenze',
      'App-Deinstallation – entfernt auch Restdateien',
      'Datenschutz-Bereinigung – Browserverlauf, Cache, Cookies, zuletzt benutzte Objekte',
      'Startobjekte-Manager – Anmeldeobjekte sehen und deaktivieren',
      'Geplante Scans – automatisches Scannen im Hintergrund',
      'Lebenslange Updates',
      'Bevorzugter Support',
    ],
    proCta: 'Pro holen – 12,99 $',
    compareTitle: 'Gratis vs Pro im Überblick',
    compareRows: [
      { label: 'Scannen & Ergebnisse ansehen', free: 'Unbegrenzt', pro: 'Unbegrenzt' },
      { label: 'Aufräumen', free: '2 GB insgesamt', pro: 'Unbegrenzt' },
      { label: 'Entwickler-Bereinigung (Xcode, node_modules …)', free: 'Innerhalb der 2 GB', pro: 'Unbegrenzt' },
      { label: 'App-Deinstallation', free: '—', pro: 'Enthalten' },
      { label: 'Datenschutz-Bereinigung', free: '—', pro: 'Enthalten' },
      { label: 'Startobjekte-Manager', free: '—', pro: 'Enthalten' },
      { label: 'Geplante Scans', free: '—', pro: 'Enthalten' },
      { label: 'Preis', free: '0 $', pro: '12,99 $ einmalig' },
    ],
    faqTitle: 'Fragen zu den Preisen',
    faq: [
      { q: 'Ist Pro ein Abo?', a: 'Nein. Es ist eine einmalige Zahlung von 12,99 $ – ohne wiederkehrende Abbuchung. Die Lizenz gehört dir.' },
      { q: 'Auf wie vielen Macs kann ich eine Lizenz aktivieren?', a: 'Jede Pro-Lizenz wird auf einem Mac aktiviert. Neuer Mac? Wähle in der App auf dem alten Mac „Lizenz deaktivieren“ (oder schreib dem Support) und aktiviere sie auf dem neuen.' },
      { q: 'Kann ich mein Geld zurückbekommen?', a: 'Ja – 30 Tage volle Rückerstattung ohne Rückfragen für alle Pro-Käufe. Schreib an support@macdiskcleaner.com mit deinem Lizenzschlüssel.' },
      { q: 'Welche Zahlungsarten werden akzeptiert?', a: 'Karte, Apple Pay und Google Pay. Abgerechnet wird sicher in US-Dollar; deine Bank zeigt den Betrag ggf. in Euro umgerechnet an.' },
      { q: 'Was passiert, wenn die kostenlosen 2 GB erreicht sind?', a: 'Scannen und Ansehen bleiben für immer kostenlos. Sobald du insgesamt 2 GB aufgeräumt hast, fragt die App nach Pro (oder einem Lizenzschlüssel), bevor sie mehr löscht. Die 2 GB sind ein lebenslanges, kein monatliches Kontingent.' },
      { q: 'Muss ich nach dem Kauf in der App einen Schlüssel kopieren?', a: 'Nein. Wenn du direkt in der App kaufst, wird Pro nach Abschluss der Zahlung automatisch freigeschaltet. Den Schlüssel bekommst du zusätzlich per E-Mail und kannst ihn jederzeit über die Schaltfläche „Enter license key“ in der App eintragen.' },
    ],
  },
  fr: {
    metaTitle: 'Tarifs MacDiskCleaner : offre gratuite et Pro à 12,99 $ en paiement unique (sans abonnement)',
    metaDescription:
      'Tarifs MacDiskCleaner : analyse gratuite et 2 Go nettoyés sans frais, puis Pro à 12,99 $ une seule fois. Sans abonnement, remboursé sous 30 jours.',
    breadcrumb: 'Tarifs',
    h1: 'Simple. Honnête.',
    h1Accent: 'Un seul prix.',
    lead: 'Pas d’abonnement. Pas de frais cachés. Payez une fois pour Pro, ou utilisez une offre vraiment gratuite, pour toujours.',
    freeName: 'Gratuit',
    freeSub: 'Gratuit pour toujours, sans essai.',
    freeFeatures: [
      'Analyse de tout votre Mac — rien de masqué ni de flouté',
      'Doublons, gros et anciens fichiers, téléchargements et fichiers inutiles, tout est visible',
      'Nettoyage gratuit jusqu’à 2 Go au total (quota à vie)',
      'Analyses illimitées',
      'Suppression sûre — tout passe d’abord par la Corbeille',
    ],
    proBadge: 'MEILLEUR CHOIX',
    proName: 'Pro',
    proSub: 'Paiement unique. Jamais d’abonnement.',
    proFeatures: [
      'Nettoyage illimité — plus de limite de 2 Go',
      'Désinstallateur — supprime aussi les fichiers résiduels',
      'Nettoyage de la confidentialité — historique, cache et cookies des navigateurs, éléments récents',
      'Éléments au démarrage — voir et désactiver les éléments d’ouverture',
      'Analyses programmées — analyse automatique en arrière-plan',
      'Mises à jour à vie',
      'Assistance prioritaire',
    ],
    proCta: 'Passer à Pro — 12,99 $',
    compareTitle: 'Gratuit vs Pro en un coup d’œil',
    compareRows: [
      { label: 'Analyse et consultation des résultats', free: 'Illimitées', pro: 'Illimitées' },
      { label: 'Nettoyage', free: '2 Go au total', pro: 'Illimité' },
      { label: 'Nettoyage développeur (Xcode, node_modules…)', free: 'Dans la limite de 2 Go', pro: 'Illimité' },
      { label: 'Désinstallateur', free: '—', pro: 'Inclus' },
      { label: 'Nettoyage de la confidentialité', free: '—', pro: 'Inclus' },
      { label: 'Éléments au démarrage', free: '—', pro: 'Inclus' },
      { label: 'Analyses programmées', free: '—', pro: 'Inclus' },
      { label: 'Prix', free: '0 $', pro: '12,99 $ une fois' },
    ],
    faqTitle: 'Questions sur les tarifs',
    faq: [
      { q: 'Pro est-il un abonnement ?', a: 'Non. C’est un paiement unique de 12,99 $, sans facturation récurrente. La licence vous appartient.' },
      { q: 'Sur combien de Mac puis-je activer une licence ?', a: 'Chaque licence Pro s’active sur un Mac. Nouveau Mac ? Choisissez « Désactiver la licence » dans l’app de l’ancien Mac (ou contactez l’assistance), puis activez-la sur le nouveau.' },
      { q: 'Puis-je être remboursé ?', a: 'Oui — remboursement intégral pendant 30 jours, sans justification, sur tous les achats Pro. Écrivez à support@macdiskcleaner.com avec votre clé de licence.' },
      { q: 'Quels moyens de paiement sont acceptés ?', a: 'Carte bancaire, Apple Pay et Google Pay. Le paiement est sécurisé et facturé en dollars US ; votre banque peut afficher le montant converti en euros.' },
      { q: 'Que se passe-t-il quand j’atteins les 2 Go gratuits ?', a: 'L’analyse et la consultation restent gratuites pour toujours. Une fois 2 Go nettoyés au total, l’app demande Pro (ou une clé de licence) avant de supprimer davantage. Les 2 Go sont un quota à vie, pas mensuel.' },
      { q: 'Dois-je copier une clé après un achat dans l’app ?', a: 'Non. Si vous achetez depuis l’app, Pro se débloque automatiquement dès que le paiement est validé. La clé vous est aussi envoyée par e-mail et peut être saisie à tout moment via le bouton « Enter license key » de l’app.' },
    ],
  },
}
