import { ModeToggle } from "@/components";
import { appConfig } from "@/config";

export function Footer() {
  return (
    <footer className="py-8 border-t bottom-0 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href={appConfig.author.url}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {appConfig.author.name}
          </a>
        </p>
        <div className="hidden md:block">
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
