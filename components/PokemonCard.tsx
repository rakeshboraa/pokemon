import { getDataId, getImageUrl } from "@/lib/api";
import { Pokemon } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps extends Pokemon { index?: number}

export default function PokemonCard({ name, url, index = 0 }: PokemonCardProps) {
  const id = getDataId(url);
  const imageUrl = getImageUrl(id);

  return (
    <Link href={`/pokemon/${name}`} className="group pokemon-card animate-fade-in-scale"
      style={{perspective: "1000px", animationDelay: `${Math.min(index * 40, 400)}ms`,}} >
      <div
        className="transition-transform duration-500 ease-out group-hover:transform-[rotateX(5deg)_rotateY(-5deg)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="image-bg">
          <Image
            src={imageUrl}
            alt={name}
            width={180}
            height={180}
            priority
            className="relative z-10 h-40 w-40 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
          />
        </div>
        <h2 className="text-xl font-black capitalize text-center text-blue-900">
          {name}
        </h2>
      </div>
    </Link>
  );
}