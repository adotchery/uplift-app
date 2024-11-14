import SubmitForm from "../components/forms/submit-form";
import Image from "next/image";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      {/* <img src="/Huronlogo.svg" alt="Huron Logo" className="w-32 h-8 mb-8" /> */}
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center">Uplift</h1>
        <SubmitForm />
        <footer className="flex items-center justify-center mt-8 w-full text-center">
        <a
          href="https://www.huronconsultinggroup.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <Image
            aria-hidden
            src="/Huron_Vertical-Black.svg"
            alt="Huron Logo"
            width={32}
            height={32}
          />
          <h1>Powered by Huron Consulting Group</h1>
        </a>
      </footer>
    </div>
    </div>
  );
}
