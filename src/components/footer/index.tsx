import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6 flex justify-between text-sm text-zinc-500">
        <span>© 2026 QueryNow</span>
        <div className="flex gap-6">
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Twitter</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
