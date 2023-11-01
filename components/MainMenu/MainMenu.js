import Link from "next/link";
import { ButtonLink } from "components/ButtonLink";

export const MainMenu = ({items, callToActionLabel,
  callToActionDestination,}) => {
  console.log("MAIN MENU: ", items)
  return (
    <div className= "bg-blue-950 text-white px-5 h-[64px] sticky top-0 z-20 flex">
      <div className="py-4 pl-5 flex text-red-960">LEFT SIDE</div>
      <div className="flex flex-1 justify-end">
        {(items || []).map((item) => (
          <div
            key={item.id}
            className="hover:bg-red-950 cursor-pointer relative group"
          >
            <div>
              <Link href={item.destination} className="p-5 block">
                {item.label}
              </Link>
            </div>
            {!!item.subMenuItems?.length && (
              <div className="group-hover:block hidden bg-red-950 text-center absolute right-0 top-full -mt-3">
                {item.subMenuItems.map((subMenuItem) => (
                  <Link key={subMenuItem.id} href={subMenuItem.destination} className="block whitespace-nowrap p-5 hover:bg-red-960">
                      {subMenuItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="ml-3 my-auto">
          <ButtonLink
            destination={callToActionDestination}
            label={callToActionLabel}
          />
        </div>
      </div>
    </div>
  )
}