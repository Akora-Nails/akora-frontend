export type Service = { id: string; group: string; name: string; detail?: string; price: number };

export const services: Service[] = [
  { id: "basic", group: "Manicure", name: "Basic Manicure", detail: "Nail shaping, cuticle care, scrub, massage and buffing for a clean look", price: 800 },
  { id: "gel-mani", group: "Manicure", name: "Manicure with Gel Polish", detail: "Nail shaping, cuticle care and gel polish of your choice", price: 2000 },
  { id: "structured", group: "Manicure", name: "Structured Manicure", detail: "Nail shaping, cuticle care, builder gel and gel polish of your choice", price: 3500 },
  { id: "gelx", group: "Gel X", name: "Gel X tips with Gel colour", price: 4000 },
  { id: "gelx-refill", group: "Gel X", name: "Gel X refill", detail: "Within 2 weeks", price: 3500 },
  { id: "poly", group: "Gel / Polygel Extensions", name: "Gel / Polygel Extensions with Gel colour", price: 4500 },
  { id: "poly-refill", group: "Gel / Polygel Extensions", name: "Gel / Polygel refill with Gel colour", price: 3500 },
  { id: "acrylic", group: "Acrylic Extensions", name: "Acrylic Extensions with Gel colour", price: 5000 },
  { id: "acrylic-refill", group: "Acrylic Extensions", name: "Acrylic refill with Gel colour", price: 4000 },
  { id: "soak", group: "Soak-off / Removal", name: "Soak off / removal", price: 600 },
  { id: "soak-foreign", group: "Soak-off / Removal", name: "Foreign soak off / removal", detail: "Work not done by Akora", price: 1000 },
];

export type Art = { id: string; name: string; price: number; upwards: boolean };

export const nailArt: Art[] = [
  { id: "stickers", name: "Stickers", price: 50, upwards: false },
  { id: "french", name: "French Tips", price: 100, upwards: false },
  { id: "cateye", name: "Cat Eye", price: 100, upwards: false },
  { id: "blooming", name: "Blooming Gel", price: 100, upwards: true },
  { id: "foil", name: "Foil Art", price: 100, upwards: true },
  { id: "chrome", name: "Chrome", price: 100, upwards: true },
  { id: "freehand", name: "Freehand Nail Art", price: 100, upwards: true },
  { id: "ombre", name: "Ombré", price: 150, upwards: true },
  { id: "marble", name: "Marble", price: 150, upwards: true },
  { id: "stamping", name: "Stamping Art", price: 150, upwards: true },
  { id: "3d", name: "3D Nail Art", price: 200, upwards: true },
  { id: "gems", name: "Gems / Pearls / Charms", price: 0, upwards: false },
];

export const policies = [
  { title: "Lateness", body: "If you'll be more than 30 minutes late, please let me know at least 1 hour before your appointment time." },
  { title: "Timing", body: "Appointments last between 1–3 hours, depending on your chosen design and nail service." },
  { title: "Location", body: "I'm home based. The exact address is shared with you once your appointment is confirmed." },
  { title: "Appointment", body: "I reserve the right to refuse a service if nails have infections or are severely damaged." },
  { title: "Payment", body: "Cash or immediate bank transfer, thank you <3" },
];

export const formatRs = (n: number) => `Rs. ${n.toLocaleString("en-US")}`;

/** Estimate = service price + per-nail art price × nails. Gems are complimentary. Returns whether it's a minimum ("upwards"). */
export function estimate(serviceId: string | null, art: Record<string, number>) {
  const s = services.find((x) => x.id === serviceId);
  let total = s ? s.price : 0;
  let upwards = false;
  for (const [id, nails] of Object.entries(art)) {
    const a = nailArt.find((x) => x.id === id);
    if (!a || nails <= 0) continue;
    total += a.price * nails;
    if (a.upwards) upwards = true;
  }
  return { total, upwards };
}
