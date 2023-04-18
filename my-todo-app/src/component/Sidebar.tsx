import { useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { themeColorState } from "../stores/TaskState"

export const SideBar = () => {
  const themeColor = useRecoilValue(themeColorState);
  const [isHover, setIsHover] = useState(false);
  const [hoverItem, setHoverItem] = useState("");

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setIsHover(true);
    setHoverItem(e.currentTarget.id);
  }

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if(hoverItem === e.currentTarget.id){
      setIsHover(false);
      setHoverItem("");
    }
    
  }
  const menuItemStyle = {
    borderColor: isHover ? themeColor.accentColor : "transparent",
  }
  return (
    <>
      <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 h-full transition-all duration-300 border-none z-10 sidebar" style={{ backgroundColor: themeColor.bgColor, color: themeColor.textColor }}>
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm tracking-wide uppercase">Main</div>
              </div>
            </li>
            <li>
              <Link to="/" id="all" className="relative flex flex-row items-center h-11 focus:outline-solid hover:border-l-4 pr-6"
                onMouseEnter={(event)=>handleHover(event)}
                onMouseLeave={(event)=>handleLeave(event)}
                style={menuItemStyle}>
                <span className="inline-flex justify-center items-center ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
                    <path d="M16 3v4"></path>
                    <path d="M8 3v4"></path>
                    <path d="M4 11h16"></path>
                    <path d="M11 15h1"></path>
                    <path d="M12 15v3"></path>
                  </svg></span>
                <span className="ml-2 text-sm tracking-wide truncate">すべて</span>
              </Link>
            </li>
            <li>
              <Link to="today" id="today" className="relative flex flex-row items-center h-11 focus:outline-none hover:border-l-4 pr-6"
                onMouseEnter={(event)=>handleHover(event)}
                onMouseLeave={(event)=>handleLeave(event)}
                style={menuItemStyle}>
                <span className="inline-flex justify-center items-center ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M16 3l0 4"></path>
                    <path d="M8 3l0 4"></path>
                    <path d="M4 11l16 0"></path>
                    <path d="M8 15h2v2h-2z"></path>
                  </svg>                  </span>
                <span className="ml-2 text-sm tracking-wide truncate">今日</span>
              </Link>
            </li>
            <li>
              <Link to="future" id="future" className="relative flex flex-row items-center h-11 focus:outline-none hover:border-l-4 pr-6"
                onMouseEnter={(event)=>handleHover(event)}
                onMouseLeave={(event)=>handleLeave(event)}
                style={menuItemStyle}>
                <span className="inline-flex justify-center items-center ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"></path>
                    <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                    <path d="M15 3v4"></path>
                    <path d="M7 3v4"></path>
                    <path d="M3 11h16"></path>
                    <path d="M18 16.496v1.504l1 1"></path>
                  </svg>                  </span>
                <span className="ml-2 text-sm tracking-wide truncate">未来</span>
              </Link>
            </li>
            <li>
              <Link to="nodeadline" id="nodeadline" className="relative flex flex-row items-center h-11 focus:outline-none hover:border-l-4 pr-6"
                onMouseEnter={(event)=>handleHover(event)}
                onMouseLeave={(event)=>handleLeave(event)}
                style={menuItemStyle}>
                <span className="inline-flex justify-center items-center ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5"></path>
                    <path d="M16 3v4"></path>
                    <path d="M8 3v4"></path>
                    <path d="M4 11h16"></path>
                    <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    <path d="M17 21l4 -4"></path>
                  </svg>                  </span>
                <span className="ml-2 text-sm tracking-wide truncate">期日なし</span>
              </Link>
            </li>
            <li>
              <Link to="expired" id="expired" className="relative flex flex-row items-center h-11 focus:outline-none hover:border-l-4 pr-6"
                onMouseEnter={(event)=>handleHover(event)}
                onMouseLeave={(event)=>handleLeave(event)}
                style={menuItemStyle}>
                <span className="inline-flex justify-center items-center ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15 21h-9a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5"></path>
                    <path d="M16 3v4"></path>
                    <path d="M8 3v4"></path>
                    <path d="M4 11h16"></path>
                    <path d="M11 15h1"></path>
                    <path d="M12 15v3"></path>
                    <path d="M19 16v3"></path>
                    <path d="M19 22v.01"></path>
                  </svg>                  </span>
                <span className="ml-2 text-sm tracking-wide truncate">期限切れ</span>
              </Link>
            </li>
            <li>
              <Link to="compleated" id="compleated" className="relative flex flex-row items-center h-11 focus:outline-none hover:border-l-4 pr-6"
                onMouseEnter={(event)=>handleHover(event)}
                onMouseLeave={(event)=>handleLeave(event)}
                style={menuItemStyle}>
                <span className="inline-flex justify-center items-center ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6"></path>
                    <path d="M16 3v4"></path>
                    <path d="M8 3v4"></path>
                    <path d="M4 11h16"></path>
                    <path d="M15 19l2 2l4 -4"></path>
                  </svg>                  </span>
                <span className="ml-2 text-sm tracking-wide truncate">完了したタスク</span>
              </Link>
            </li>
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center mt-5 h-8">
                <div className="text-sm tracking-wide uppercase">Settings</div>
              </div>
            </li>
            <li>
              <Link to="setting" id="setting" className="relative flex flex-row items-center h-11 focus:outline-none hover:border-l-4 pr-6"
                onMouseEnter={(e)=>setIsHover(true)}
                onMouseLeave={(e)=>setIsHover(false)}
                style={menuItemStyle}>
                <span className="inline-flex justify-center items-center ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                  </svg>                </span>
                <span className="ml-2 text-sm tracking-wide truncate">設定</span>
              </Link>
            </li>
          </ul>
          <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright Matsuzawa.dev</p>
        </div>
      </div>
    </>
  )
}