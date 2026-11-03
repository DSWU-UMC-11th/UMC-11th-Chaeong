import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const menuItemClass = (active: boolean) =>
    cn(
      "font-bold text-sm leading-[17px] cursor-pointer",
      active ? "text-[#17191E] underline" : "text-[#606774]",
    );

  return (
    <header className="flex flex-row justify-between items-center px-4 sm:px-8 lg:px-20 py-6 w-full max-w-[1440px] min-h-[91px] bg-white box-border">
      <div className="flex flex-row items-center gap-[42px] h-8">
        <div className="flex flex-row items-center gap-2.5 h-8">
          <span className="box-border flex flex-col justify-center items-center py-1.5 w-8 h-8 border-2 border-[#17191E] rounded-lg">
            <img src="/images/movie-icons/movie.svg" alt="" className="w-6 h-6" />
          </span>
          <span className="w-[74px] h-6 font-black text-xl leading-6 tracking-[-0.7px] text-[#17191E] flex items-center">
            UMCine
          </span>
        </div>

        <nav className="flex flex-row items-center gap-[30px] h-[17px]">
          <Link to="/" className={menuItemClass(pathname === "/")}>
            영화
          </Link>
          <Link to="/search" className={menuItemClass(pathname === "/search")}>
            검색
          </Link>
          <span className={menuItemClass(false)}>내 정보</span>
        </nav>
      </div>

      <div className="flex flex-row items-center gap-2.5 h-[42px]">
        <Link
          to="/search"
          className="box-border flex flex-row justify-center items-center px-1.5 py-px w-[42px] h-[42px] bg-white border border-[#E3E6EB] rounded-lg"
        >
          <img src="/images/movie-icons/search.svg" alt="검색" className="w-6 h-6" />
        </Link>
        <button className="box-border flex flex-row justify-center items-center px-4 h-[42px] bg-[#2563EB] border border-white rounded-lg font-extrabold text-sm leading-[17px] text-white whitespace-nowrap">
  로그인
</button>
      </div>
    </header>
  );
}