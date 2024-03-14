import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="h-fit w-full rounded-tl-[50px] rounded-tr-[50px] bg-black mt-16 py-16 flex justify-center items-center gap-5 flex-col sm:flex-row">
            <Image src="/logoOlympiqueWhite.png" alt="Paris 2024" width={100} height={100} />
            <Link href="/" className="text-white text-xl border-l-2 border-white pl-5">Accueil</Link>
            <Link href="/" className="text-white text-xl">Billetterie</Link>
            <Link href="/" className="text-white text-xl">Contact</Link>
            <span className="text-white text-xl">© Paris 2024</span>
        </footer>
    )
}