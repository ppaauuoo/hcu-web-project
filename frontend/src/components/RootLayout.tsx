
import {
  Menu,
} from "lucide-react"


import { Button } from "@/components/ui/button"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { Link, Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <>

      <header className="sticky top-0 flex justify-between md:justify-center h-16 items-center gap-30 bg-transparent px-4 md:px-6 ">
        <img className="h-10 w-10 m-1 md:mr-20 lg:mr-40" src="/images.jpg" alt="image description" />
        {/* mobile nav */}
        <nav className="flex justify-center">
          <h1 className="text-muted-foreground text-white lg:hidden md:hidden sm:not-sr-only flex justify-end">คณะวิทยาศาสตร์และเทคโนโลยี<br />มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ</h1>
        </nav>
        {/* navbar */}
        <nav className="hidden flex-col gap-6 text-lgfont-medium md:flex md:flex-row md:items-center md:gap-4 md:text-sm lg:gap-6">

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
        </nav>

        {/* side menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
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
      </header>

      <Outlet />
    </>)
}