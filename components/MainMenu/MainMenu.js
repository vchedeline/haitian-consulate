import Link from "next/link";
import { ButtonLink } from "components/ButtonLink";
import Image from "next/image";

export const MainMenu = ({
  items,
  callToActionLabel,
  callToActionDestination,
  logo,
}) => {
  return (
    <div className="menu">
      <div className="py-4 flex max-w-sm w-1/3 h-full justify-items-center bg-white/10 relative">
        <Image src={logo.sourceUrl} alt={logo.title} fill />
      </div>
      <div className="flex flex-1 justify-end">
        {(items || []).map((item) => (
          <div
            key={item.id}
            className="hover:bg-blue-950 cursor-pointer relative group"
          >
            <div>
              <Link href={item.destination} className="p-6 block">
                {item.label}
              </Link>
            </div>
            {!!item.subMenuItems?.length && (
              <div className="group-hover:block hidden bg-blue-960 text-center absolute right-0 top-full -mt-3">
                {item.subMenuItems.map((subMenuItem) => (
                  <Link
                    key={subMenuItem.id}
                    href={subMenuItem.destination}
                    className="block whitespace-nowrap p-5 hover:bg-blue-950"
                  >
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
  );
};
