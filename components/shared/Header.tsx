import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  return (
    <nav className="bg-slate-900 sticky top-0">
      <div className="max-w-7xl p-3 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              width={30}
              height={30}
              alt="balance logo"
              priority
            />
            <h2 className="text-2xl">TEST</h2>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
