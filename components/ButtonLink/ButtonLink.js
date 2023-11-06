import Link from "next/link";

export const ButtonLink = ({ destination, label, btnClass }) => {
  return (
    <Link href={destination} className={`${btnClass}`}>
      {label}
    </Link>
  );
};
