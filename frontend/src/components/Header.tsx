import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (): void => {
    const isScrolled = window.scrollY > 0;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
      
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between md:justify-center transition duration-500 ease-in-out z-50 ${
          scrolled ? "bg-black" : "bg-transparent "
        }`}
      >
        <img
          className="h-10 w-10 m-1 md:mr-20 lg:mr-40"
          src="/LOGO_Y.png"
          alt="image description"
        />
        {/* navbar */}
        <div className="hidden flex-col gap-6 text-lgfont-medium md:flex md:flex-row md:items-center md:gap-4 md:text-sm lg:gap-6">
          <Link
            to="index.tsx"
            className="flex  items-center gap-2 text-lg font-semibold md:text-base"
          >
            <span className="sr-only">หน้าแรก</span>
          </Link>
          <Link
            to="#"
            className="text-muted-foreground text-white transition-colors hover:text-foreground"
          >
            เกี่ยวกับเรา
          </Link>
          <Link
            to="#"
            className="text-muted-foreground text-white transition-colors hover:text-foreground"
          >
            หลักสูตร
          </Link>
          <Link
            to="#"
            className="text-muted-foreground text-white transition-colors hover:text-foreground"
          >
            การเรียนการสอน
          </Link>
          <Link
            to="#"
            className="text-muted-foreground text-white transition-colors hover:text-foreground"
          >
            การวิจัย
          </Link>
          <Link
            to="#"
            className="text-muted-foreground text-white transition-colors hover:text-foreground"
          >
            บริการวิชาการ
          </Link>
          <Link
            to="#"
            className="text-muted-foreground text-white transition-colors hover:text-foreground"
          >
            กิจการนักศึกษา
          </Link>
          <Link
            to="#"
            className="text-muted-foreground text-white transition-colors hover:text-foreground"
          >
            กิจการนักศึกษา
          </Link>
          <Link
            to="#"
            className="text-muted-foreground text-white transition-colors hover:text-foreground"
          >
            ติดต่อเรา
          </Link>
        </div>
        {/* mobile nav */}
        <div className="flex justify-center">
          <h1 className="text-muted-foreground text-white lg:hidden md:hidden sm:not-sr-only flex justify-end">
            คณะวิทยาศาสตร์และเทคโนโลยี
            <br />
            มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ
          </h1>
        </div>

        {/* side menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden mx-1"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-mediu">
              <Link
                to="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                เกี่ยวกับเรา
              </Link>
              <Link
                to="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                หลักสูตร
              </Link>
              <Link
                to="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                การเรียนการสอน
              </Link>
              <Link
                to="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                การวิจัย
              </Link>
              <Link
                to="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                บริการวิชาการ
              </Link>
              <Link
                to="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                กิจการนักศึกษา
              </Link>
              <Link
                to="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                กิจการนักศึกษา
              </Link>
              <Link
                to="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                ติดต่อเรา
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}
