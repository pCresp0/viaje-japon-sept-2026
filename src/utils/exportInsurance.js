import { heymondoInsurance } from "../data/insurance";

export function downloadInsuranceConditions(type = "particular") {
  const content = type === "particular"
    ? heymondoInsurance.fullParticularConditions
    : heymondoInsurance.fullGeneralConditions;

  const filename = type === "particular"
    ? `Heymondo_Poliza_${heymondoInsurance.policyNumber}_Condiciones_Particulares.txt`
    : `Heymondo_Poliza_${heymondoInsurance.policyNumber}_Condiciones_Generales.txt`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
