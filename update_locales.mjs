import fs from 'fs';

const locales = [
  {
    file: 'src/data/locales/fr.js',
    oldTitle: 'title: "🔴 Réserver Kyoto → Kanazawa",',
    newObj: `      id: "recogida-billetes-jrwest",
      title: "🎟️ RETIRER BILLETS JR-WEST — KYOTO → KANAZAWA",
      detail: "📅 11/09/2026 (Recommandé le soir)\\n📍 Kyoto Station (Machines vertes 5489)\\n🎟️ Retirer physiquement la réservation JR-West nº 47932.\\n⚠️ REQUIS :\\n- Carte physique Mastercard (**8625) utilisée pour le paiement.\\n- Numéro de réservation (47932).\\n- Identification Number (PIN) à 4 chiffres.",
      deadline: "11/09/2026",`
  },
  {
    file: 'src/data/locales/tl.js',
    oldTitle: 'title: "🔴 Mag-book ng Kyoto → Kanazawa",',
    newObj: `      id: "recogida-billetes-jrwest",
      title: "🎟️ KUNIN ANG JR-WEST TICKETS — KYOTO → KANAZAWA",
      detail: "📅 11/09/2026 (Inirerekomenda sa gabi)\\n📍 Kyoto Station (Green machines 5489)\\n🎟️ Kunin nang personal ang JR-West reservation #47932.\\n⚠️ KAILANGAN:\\n- Pisikal na Mastercard (**8625) na ginamit pambayad.\\n- Reservation number (47932).\\n- 4-digit Identification Number (PIN).",
      deadline: "11/09/2026",`
  }
];

locales.forEach(({file, oldTitle, newObj}) => {
  let content = fs.readFileSync(file, 'utf8');
  // Find the block corresponding to the old item
  const regex = new RegExp(`\\{\\s*id:\\s*"kyoto-kanazawa"[^\\}]*?${oldTitle.replace(/[\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]/g, '\\$&')}[^\\}]*?\\},`, 'm');
  content = content.replace(regex, `{\n${newObj}\n    },`);
  fs.writeFileSync(file, content);
});

