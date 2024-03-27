import Image from "next/image";
import Header from "../header";
import Link from "next/link";

export default function Homepage() {
    return (
        <div className="w-full h-[calc(100dvh)] bg-[url('/background.webp')] bg-cover bg-center flex flex-col rounded-[30px] sm:rounded-[50px] border-[10px] sm:border-[15px] border-white">
            <Header color={{ color: "white" }} bgColor="bg-white" borderColor="border-white"/>
            
            <div className="flex-grow flex flex-col justify-center items-center w-full px-5">

            <Image src="/logoOlympique.png" alt="Paris 2024" width={100} height={100} />
            <h1 className="text-center text-white text-4xl sm:text-6xl xl:text-8xl font-bold w-full md:w-3/4">Vivez l'esprit Olympique au cœur de la France !</h1>
            <Link href="#presentation" className="bg-white text-black px-5 py-2 rounded-full mt-5 flex items-center gap-3 text-xl hover:bg-opacity-70 transition duration-300">
            Découvrir 
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="30" viewBox="0 0 35 35" fill="none">
            <path d="M31.1012 17.5C31.1012 17.1337 30.955 16.7969 30.6619 16.5188L20.9644 6.83625C20.6419 6.51375 20.32 6.39625 19.9681 6.39625C19.2506 6.39625 18.6937 6.92375 18.6937 7.65625C18.6937 8.00813 18.8112 8.34438 19.0456 8.57938L22.3269 11.9188L27.2631 16.4163L23.7181 16.1963H5.18812C4.44125 16.1963 3.89875 16.7381 3.89875 17.5C3.89875 18.2619 4.44062 18.8038 5.18812 18.8038H23.7181L27.2781 18.5838L22.3269 23.0813L19.0456 26.4206C18.8112 26.6406 18.6937 26.9919 18.6937 27.3438C18.6937 28.0763 19.25 28.6037 19.9687 28.6037C20.32 28.6037 20.6275 28.4719 20.9206 28.1931L30.6619 18.4812C30.955 18.2031 31.1012 17.8663 31.1012 17.5Z" fill="black"/>
            </svg>
            </Link>
            </div>

            <div className="absolute right-0 bottom-0 px-2 py-2 sm:py-4 bg-transparent sm:bg-white rounded-tl-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none" className="p-2 animate-bounce fill-white sm:fill-black">
            <path d="M25 46.3446C36.6563 46.3446 46.3446 36.6768 46.3446 25C46.3446 13.3437 36.6348 3.65536 24.9786 3.65536C13.3027 3.65536 3.65625 13.3437 3.65625 25C3.65625 36.6768 13.3232 46.3446 25 46.3446ZM25.0009 42.7875C15.1223 42.7875 7.23214 34.8768 7.23214 25C7.23214 15.1429 15.1009 7.2125 24.9786 7.2125C34.8348 7.2125 42.7652 15.1438 42.7866 25C42.8071 34.8777 34.8554 42.7875 24.9991 42.7875M24.9991 35.8188C25.4589 35.8188 25.8152 35.6098 26.2339 35.2116L33.3071 28.1393C33.6 27.867 33.7464 27.4902 33.7464 27.05C33.7464 26.1929 33.0768 25.5437 32.2187 25.5437C31.758 25.5437 31.3812 25.7116 31.1098 26.0045L28.5143 28.6205L26.4009 31.1741L26.5688 26.7366V15.8134C26.5688 14.9134 25.8991 14.2438 24.9991 14.2438C24.0786 14.2438 23.4295 14.9134 23.4295 15.8134V26.7366L23.5973 31.1313L21.483 28.6205L18.8884 26.0045C18.5937 25.7111 18.1953 25.5456 17.7795 25.5437C16.9214 25.5437 16.2732 26.1929 16.2732 27.0509C16.2732 27.4902 16.3982 27.867 16.6705 28.1393L23.7848 35.2125C24.2045 35.6304 24.5384 35.8188 24.9991 35.8188Z"/>
            </svg>
            </div>

        </div>
    );
}