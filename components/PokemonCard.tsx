import { getDataId, getImageUrl } from "@/lib/api";
import { Pokemon } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps extends Pokemon {
  index?: number;
}

export default function PokemonCard({
  name,
  url,
  index = 0,
}: PokemonCardProps) {
  const id = getDataId(url);
  const imageUrl = getImageUrl(id);

  return (
    <Link
      href={`/pokemon/${name}`}
      className="fade-in-scale group pokemon-card w-full overflow-hidden rounded-xl p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_0_#d4a900] sm:rounded-2xl sm:p-4 sm:hover:-translate-y-2 sm:hover:shadow-[0_12px_0_#d4a900]"
      style={{
        perspective: "1000px",
        animationDelay: `${Math.min(index * 40, 400)}ms`,
      }}
    >
      <div
        className="transition-transform duration-500 ease-out group-hover:transform-[rotateX(5deg)_rotateY(-5deg)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="image-bg flex aspect-square w-full items-center justify-center">
          <Image
            src={imageUrl}
            alt={name}
            width={180}
            height={180}
            loading="eager"
            className="relative z-10 h-auto w-[75%] max-w-40 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
          />
        </div>

        <h2 className="mt-2 truncate text-center text-base font-black capitalize text-blue-900 sm:mt-3 sm:text-xl">
          {name}
        </h2>
      </div>
    </Link>
  );
}