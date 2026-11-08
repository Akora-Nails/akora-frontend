export function Footer() {
  return (
    <footer className="overflow-hidden bg-foreground pt-20 text-background">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-8 px-6">
        <div>
          <p className="font-display text-3xl italic">Akora Nails</p>
          <p className="mt-2 text-sm opacity-70">Nail Technician · Sri Lanka · Home-based studio</p>
        </div>
        <ul className="flex gap-6 text-sm opacity-80">
          <li><a href="#menu">Menu</a></li><li><a href="#gallery">Gallery</a></li><li><a href="#shop">Shop</a></li><li><a href="#book">Book</a></li>
        </ul>
      </div>
      <p aria-hidden className="text-giant mt-10 select-none text-center text-background/10">Akora</p>
    </footer>
  );
}
