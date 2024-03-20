import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className=" w-full rounded-tl-[10px] rounded-tr-[10px] sm:rounded-tl-[50px] sm:rounded-tr-[50px] bg-black mt-10 sm:mt-16 py-10 sm:py-16 flex justify-center items-center gap-3 sm:gap-5 flex-col sm:flex-row">
            <Image src="/logoOlympiqueWhite.png" alt="Paris 2024" width={100} height={100} />
            <Link href="/" className="text-white text-xl pt-5 sm:pt-0 border-t-2 sm:border-t-0 border-l-none sm:border-l-2 border-white pl-0 sm:pl-5">Accueil</Link>
            <Link href="/" className="text-white text-xl">Billetterie</Link>
            <Link href="/" className="text-white text-xl">Contact</Link>
            <span className="text-white text-xl">© Paris 2024</span>
        </footer>
    )
}