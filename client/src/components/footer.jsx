import Logo from "@/assets/logo";

export function Footer({ className }) {
  return (
    <footer className="bg-gray-900 border-t border-t-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://twitter.com/mahadwar_sahil"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Sahil Mahadwar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
