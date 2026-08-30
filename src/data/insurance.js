/**
 * Datos públicos del seguro Heymondo (sin DNI ni datos personales sensibles).
 * Documentación completa (póliza, DNI, certificados): carpeta Drive del grupo.
 */

export const heymondoInsurance = {
  policyNumber: "2368219",
  product: "Seguro de Viaje TRANQUILIDAD - HEYMONDO",
  company: "IMA IBÉRICA ASISTENCIA, SUCURSAL DE IMA ASSURANCES ESPAÑA (COD DGSFP: E0258)",
  broker: "Smart Insurance Correduría de Seguros S.L. (Clave DGSFP: J3422, NIF B-66843798)",
  assistancePhone: "+34 91 353 63 23",
  reimbursementPhone: "+34 91 353 63 24",
  portalUrl: "https://siniestros.imaiberica.es",
  airHelpUrl: "https://funnel.airhelp.com/claims/new/trip-details?lang=es&partner=heymondo",
  appStoreUrl: "https://apps.apple.com/es/app/heymondo-asistencia-en-viaje/id1450096956",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.heymondo.app",
  /** Carpeta Drive con póliza, DNI y documentación sensible (acceso solo del grupo). */
  documentsDriveUrl: "https://drive.google.com/drive/folders/1BFL40EA0_6E7GzIB5O8dPAwOXRZTxweh",

  dates: {
    start: "06/09/2026",
    end: "22/09/2026",
    bookingDate: "28/08/2026",
    destination: "Japón",
  },

  /** Solo nombres de pila — sin DNI ni apellidos en la web. */
  travelers: [
    { name: "Pablo" },
    { name: "Sergio" },
    { name: "Juan Carlos" },
    { name: "Gerundio" },
  ],

  pricing: {
    insuranceGross: "280,00 €",
    discount: "14,00 €",
    insuranceNet: "266,00 €",
    airHelpGross: "8,00 €",
    airHelpDiscount: "0,40 €",
    airHelpNet: "7,60 €",
    totalPrice: "273,60 €",
  },

  topCoverages: [
    { label: "Gastos médicos por enfermedad o accidente", amount: "1.500.000 €", highlight: true },
    { label: "Repatriación y traslado sanitario de heridos/enfermos", amount: "ILIMITADO / INCLUIDO", highlight: true },
    { label: "Robo y daños materiales al equipaje", amount: "2.000 € (electrónica 1.000 €)", highlight: true },
    { label: "Responsabilidad civil privada", amount: "60.000 €", highlight: true },
    { label: "Interrupción de viaje ya iniciado", amount: "1.500 €", highlight: false },
    { label: "Convalecencia en hotel / cuarentena médica", amount: "1.200 € (80 €/día)", highlight: false },
    { label: "Gastos de estancia familiar desplazado", amount: "1.200 € (80 €/día)", highlight: false },
    { label: "Desplazamiento de un familiar por hospitalización", amount: "Billete I/V Incluido", highlight: false },
    { label: "Gastos odontológicos de urgencia", amount: "150 €", highlight: false },
    { label: "Demora en salida de transporte (>6h)", amount: "200 € (50 € cada 6h)", highlight: false },
    { label: "Demora en entrega de equipaje (>10h)", amount: "200 €", highlight: false },
    { label: "Pérdida de enlaces de transporte", amount: "150 €", highlight: false },
    { label: "Accidentes personales 24h / Transporte público", amount: "6.000 € / 12.000 €", highlight: false },
    { label: "Defensa jurídica penal en el extranjero", amount: "3.000 €", highlight: false },
    { label: "Servicio de intérprete y transmisión de mensajes", amount: "INCLUIDO", highlight: false },
    { label: "Deportes de aventura", amount: "Básico (Trekking <3.000m)", highlight: false },
  ],

  /** Resumen sin datos personales — la póliza completa está en Drive. */
  fullParticularConditions: `RESUMEN PÚBLICO — SEGURO HEYMONDO TRANQUILIDAD
Nº DE PÓLIZA: 2368219
COMPAÑÍA: IMA IBÉRICA ASISTENCIA (COD DGSFP: E0258)
MEDIADOR: SMART INSURANCE CORREDURÍA DE SEGUROS S.L. (J3422)

DATOS DEL VIAJE:
• Destino: Japón
• Fecha inicio: 06/09/2026
• Fecha fin: 22/09/2026
• Nº de asegurados: 4

PRECIO TOTAL: 273,60 € (incluye AirHelp Plus)

ASISTENCIA 24H: +34 91 353 63 23
Portal siniestros: https://siniestros.imaiberica.es

⚠️ Documentación completa (condiciones particulares con datos personales, DNI, certificados PDF):
carpeta Drive del grupo — no se publica en esta web.`,

  fullGeneralConditions: `CONDICIONES GENERALES - SEGURO DE VIAJE TRANQUILIDAD
COMPAÑÍA: IMA IBÉRICA ASISTENCIA, SUCURSAL DE IMA ASSURANCES ESPAÑA

CLAÚSULA PRELIMINAR:
El presente contrato se rige por la Ley 50/1980 de Contrato de Seguro y por lo convenido en las Condiciones Generales y Particulares.

RESUMEN DE DISPOSICIONES:
1. OBJETO DEL SEGURO:
Garantizar las consecuencias de los riesgos especificados durante el curso de un viaje fuera del domicilio habitual. Es un seguro de asistencia en viaje con gastos médicos de urgencia por enfermedades o accidentes sobrevenidos.

2. ÁMBITO TERRITORIAL:
Válido en todo el Mundo (incluido Japón).

3. ACTIVIDADES DEPORTIVAS INCLUIDAS:
Atletismo, excursiones en general, senderismo y trekking por debajo de 3.000 metros de altitud, paseos en bicicleta, cicloturismo, natación, snorkel, piragüismo, patinaje y actividades afines sin carácter profesional ni de competición.

4. TRÁMITES EN CASO DE SINIESTRO:
Comunicación inmediata antes de recibir asistencia llamando al +34 91 353 63 23 (24 horas). En caso de fuerza mayor que impida el aviso previo, comunicarse inmediatamente después del cese de la causa.
Para reembolsos de gastos autorizados: gestionar a través de https://siniestros.imaiberica.es aportando justificantes originales, facturas e informes médicos con diagnóstico.

5. RESPONSABILIDAD CIVIL PRIVADA:
Hasta 60.000 € para indemnizaciones derivadas de daños corporales o materiales causados involuntariamente a terceros en sus personas o cosas durante el viaje.

6. SERVICIO AIRHELP PLUS:
Reclamación y gestión legal integral frente a aerolíneas por retrasos superiores a 3 horas, cancelaciones con menos de 14 días o pérdidas de conexión en vuelos cubiertos por normativa UE (Reglamento CE 261/2004) con indemnizaciones de hasta 600 € por pasajero.

⚠️ El PDF oficial de condiciones generales y particulares está en la carpeta Drive del grupo.`,
};
