/**
 * Datos oficiales de la póliza de seguro de viaje contratada con Heymondo
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

  dates: {
    start: "06/09/2026",
    end: "22/09/2026",
    bookingDate: "28/08/2026",
    destination: "Japón",
  },

  holder: {
    name: "Pablo",
    surnames: "Crespo Bellido",
    dni: "50620910A",
    phone: "+34 616 597 026",
    email: "pcbcrespo@gmail.com",
  },

  travelers: [
    { name: "PABLO", surnames: "CRESPO BELLIDO", dni: "50620910A" },
    { name: "SERGIO", surnames: "CRESPO BELLIDO", dni: "50621353D" },
    { name: "JUAN CARLOS", surnames: "RODRÍGUEZ PÉREZ", dni: "70902540A" },
    { name: "GERUNDIO", surnames: "GUIAL", dni: "Y9699185F" },
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

  fullParticularConditions: `CERTIFICADO DE PÓLIZA DE SEGURO DE ASISTENCIA EN VIAJE
Nº DE PÓLIZA: 2368219
PRODUCTO: Viaje Tranquilidad - Heymondo
COMPAÑÍA ASEGURADORA: IMA IBÉRICA ASISTENCIA (COD DGSFP: E0258)
MEDIADOR: SMART INSURANCE CORREDURÍA DE SEGUROS S.L. (J3422 - CIF B-66843798)

DATOS DEL VIAJE:
• Destino: Japón
• Fecha inicio: 06/09/2026
• Fecha fin: 22/09/2026
• Fecha de contratación: 28/08/2026
• Nº de asegurados: 4

TOMADOR Y TITULAR:
• Pablo Crespo Bellido (DNI: 50620910A · Tel: +34 616 597 026 · Email: pcbcrespo@gmail.com)

VIAJEROS ASEGURADOS:
1. PABLO CRESPO BELLIDO (DNI: 50620910A)
2. SERGIO CRESPO BELLIDO (DNI: 50621353D)
3. JUAN CARLOS RODRÍGUEZ PÉREZ (DNI: 70902540A)
4. GERUNDIO GUIAL (DNI: Y9699185F)

PRECIO Y PAGO:
• Prima seguro: 266,00 € (280,00 € con 14,00 € dto.)
• Servicio AirHelp Plus: 7,60 € (8,00 € con 0,40 € dto.)
• PRECIO TOTAL: 273,60 €

ASISTENCIA MÉDICA Y EMERGENCIAS 24H:
• Teléfono 24h: +34 91 353 63 23
• Portal de siniestros y reembolsos: https://siniestros.imaiberica.es
• Reclamación de vuelos AirHelp: https://funnel.airhelp.com/claims/new/trip-details?lang=es&partner=heymondo

TABLA DE COBERTURAS:
1. Gastos médicos por enfermedad o accidente: 1.500.000 €
2. Gastos odontológicos de urgencia: 150 €
3. Repatriación o traslado de heridos o enfermos: INCLUIDO (ILIMITADO)
4. Repatriación o traslado del asegurado fallecido: INCLUIDO
5. Repatriación o traslado de los demás asegurados: INCLUIDO
6. Regreso anticipado por fallecimiento de un familiar: INCLUIDO
7. Regreso anticipado por hospitalización de un familiar: INCLUIDO
8. Regreso anticipado por graves perjuicios en domicilio o local profesional: INCLUIDO
9. Regreso anticipado por atentado o catástrofe (<100 km): 500 €
10. Gastos de desplazamiento de un familiar: INCLUIDO (Billete I/V)
11. Gastos de estancia del familiar desplazado: 1.200 € (80 €/día hasta 15 días)
12. Convalecencia en hotel por enfermedad o cuarentena médica: 1.200 € (80 €/día)
13. Servicio de intérprete en el extranjero: INCLUIDO
14. Servicio de información: INCLUIDO
15. Transmisión de mensajes urgentes: INCLUIDO
16. Vehículo de sustitución por inmovilización: 400 € (40 €/día)
17. Robo y daños materiales al equipaje: 2.000 €
18. Demora en la entrega de equipajes: 200 € (a partir de 10 horas)
19. Búsqueda, localización y envío de equipajes extraviados: INCLUIDO
20. Interrupción de viaje ya iniciado: 1.500 €
21. Demora en la salida del medio de transporte: 200 € (50 € cada 6 horas)
22. Gastos por pérdida de enlaces del medio de transporte: 150 €
23. Defensa de la responsabilidad penal en el extranjero: 3.000 €
24. Defensa jurídica para la recuperación de vivienda ocupada: 3.000 €
25. Defensa jurídica cuestiones administrativas (excluida vía contenciosa): 3.000 €
26. Responsabilidad civil privada: 60.000 €
27. Indemnización adicional por fallecimiento o invalidez por accidente: 6.000 €
28. Indemnización por accidente en transporte público: 12.000 €
29. Deportes de aventura: Básico (senderismo <3.000 m, paseos en bici, etc.)
30. Equipamiento electrónico: 1.000 €`,

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
Reclamación y gestión legal integral frente a aerolíneas por retrasos superiores a 3 horas, cancelaciones con menos de 14 días o pérdidas de conexión en vuelos cubiertos por normativa UE (Reglamento CE 261/2004) con indemnizaciones de hasta 600 € por pasajero.`,
};
