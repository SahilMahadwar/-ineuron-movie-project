import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Poster from "../components/Poster";
import useAuth from "../hooks/useAuth";
import { axiosApiInstance } from "../lib/axiosApiInstance";

const movies = [
  {
    adult: false,
    backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
    genre_ids: [28, 12, 878],
    id: 505642,
    original_language: "en",
    original_title: "Black Panther: Wakanda Forever",
    overview:
      "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
    popularity: 6621.904,
    poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    release_date: "2022-11-09",
    title: "Black Panther: Wakanda Forever",
    video: false,
    vote_average: 7.5,
    vote_count: 2812,
  },
  {
    adult: false,
    backdrop_path: "/tGwO4xcBjhXC0p5qlkw37TrH6S6.jpg",
    genre_ids: [16, 12, 35, 10751, 14],
    id: 315162,
    original_language: "en",
    original_title: "Puss in Boots: The Last Wish",
    overview:
      "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
    popularity: 3384.324,
    poster_path: "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
    release_date: "2022-12-07",
    title: "Puss in Boots: The Last Wish",
    video: false,
    vote_average: 8.5,
    vote_count: 3481,
  },
  {
    adult: false,
    backdrop_path: "/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
    genre_ids: [28, 10749, 35],
    id: 758009,
    original_language: "en",
    original_title: "Shotgun Wedding",
    overview:
      "Darcy and Tom gather their families for the ultimate destination wedding but when the entire party is taken hostage, “’Til Death Do Us Part” takes on a whole new meaning in this hilarious, adrenaline-fueled adventure as Darcy and Tom must save their loved ones—if they don’t kill each other first.",
    popularity: 3137.252,
    poster_path: "/t79ozwWnwekO0ADIzsFP1E5SkvR.jpg",
    release_date: "2022-12-28",
    title: "Shotgun Wedding",
    video: false,
    vote_average: 6.3,
    vote_count: 314,
  },
  {
    adult: false,
    backdrop_path: "/a4I481szRmycyreQTLrRe4f4YJe.jpg",
    genre_ids: [80, 53, 18],
    id: 842544,
    original_language: "en",
    original_title: "Transfusion",
    overview:
      "Ryan Logan, a former Special Forces operative, is battling to cope with life after the loss of his wife.  He is thrusted into the criminal underworld to keep his only son from being taken from him.",
    popularity: 1941.514,
    poster_path: "/bxh5xCCW9Ynfg6EZJWUkc1zqTnr.jpg",
    release_date: "2023-01-05",
    title: "Transfusion",
    video: false,
    vote_average: 6.5,
    vote_count: 54,
  },
  {
    adult: false,
    backdrop_path: "/q2fY4kMXKoGv4CQf310MCxpXlRI.jpg",
    genre_ids: [878, 27, 35],
    id: 536554,
    original_language: "en",
    original_title: "M3GAN",
    overview:
      "A brilliant toy company roboticist uses artificial intelligence to develop M3GAN, a life-like doll programmed to emotionally bond with her newly orphaned niece. But when the doll's programming works too well, she becomes overprotective of her new friend with terrifying results.",
    popularity: 1930.533,
    poster_path: "/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg",
    release_date: "2022-12-28",
    title: "M3GAN",
    video: false,
    vote_average: 7.6,
    vote_count: 1431,
  },
  {
    adult: false,
    backdrop_path: "/tCpMRsHlfR6CcqJYA3kJMS3YApt.jpg",
    genre_ids: [28, 53, 80],
    id: 1035806,
    original_language: "en",
    original_title: "Detective Knight: Independence",
    overview:
      "Detective James Knight 's last-minute assignment to the Independence Day shift turns into a race to stop an unbalanced ambulance EMT from imperiling the city's festivities. The misguided vigilante, playing cop with a stolen gun and uniform, has a bank vault full of reasons to put on his own fireworks show... one that will strike dangerously close to Knight's home.",
    popularity: 1812.859,
    poster_path: "/jrPKVQGjc3YZXm07OYMriIB47HM.jpg",
    release_date: "2023-01-20",
    title: "Detective Knight: Independence",
    video: false,
    vote_average: 6.4,
    vote_count: 37,
  },
  {
    adult: false,
    backdrop_path: "/qHdPNd1cUaSNYLLNgt1Pv3LVd0T.jpg",
    genre_ids: [878, 28, 12],
    id: 843794,
    original_language: "ko",
    original_title: "정이",
    overview:
      "On an uninhabitable 22nd-century Earth, the outcome of a civil war hinges on cloning the brain of an elite soldier to create a robot mercenary.",
    popularity: 1615.3,
    poster_path: "/z2nfRxZCGFgAnVhb9pZO87TyTX5.jpg",
    release_date: "2023-01-20",
    title: "JUNG_E",
    video: false,
    vote_average: 6.4,
    vote_count: 260,
  },
  {
    adult: false,
    backdrop_path: "/9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg",
    genre_ids: [28, 12, 53],
    id: 646389,
    original_language: "en",
    original_title: "Plane",
    overview:
      "After a heroic job of successfully landing his storm-damaged aircraft in a war zone, a fearless pilot finds himself between the agendas of multiple militias planning to take the plane and its passengers hostage.",
    popularity: 2279.383,
    poster_path: "/2g9ZBjUfF1X53EinykJqiBieUaO.jpg",
    release_date: "2023-01-13",
    title: "Plane",
    video: false,
    vote_average: 6.9,
    vote_count: 239,
  },
  {
    adult: false,
    backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    genre_ids: [878, 12, 28],
    id: 76600,
    original_language: "en",
    original_title: "Avatar: The Way of Water",
    overview:
      "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    popularity: 1419.65,
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    release_date: "2022-12-14",
    title: "Avatar: The Way of Water",
    video: false,
    vote_average: 7.7,
    vote_count: 5153,
  },
  {
    adult: false,
    backdrop_path: "/5pMy5LF2JAleBNBtuzizfCMWM7k.jpg",
    genre_ids: [10752, 36, 18],
    id: 653851,
    original_language: "en",
    original_title: "Devotion",
    overview:
      "The harrowing true story of two elite US Navy fighter pilots during the Korean War. Their heroic sacrifices would ultimately make them the Navy's most celebrated wingmen.",
    popularity: 1278.151,
    poster_path: "/26yQPXymbWeCLKwcmyL8dRjAzth.jpg",
    release_date: "2022-11-23",
    title: "Devotion",
    video: false,
    vote_average: 7.7,
    vote_count: 258,
  },
  {
    adult: false,
    backdrop_path: "/f9PSbuMeBS5CuHEOVyymg5lcq8J.jpg",
    genre_ids: [28, 53, 9648, 80, 27],
    id: 996727,
    original_language: "en",
    original_title: "The Price We Pay",
    overview:
      "After a pawn shop robbery goes askew, two criminals take refuge at a remote farmhouse to try to let the heat die down, but find something much more menacing.",
    popularity: 1263.087,
    poster_path: "/8fwJt0qZieQ7dKaiiqehObWpXYT.jpg",
    release_date: "2023-01-13",
    title: "The Price We Pay",
    video: false,
    vote_average: 6.3,
    vote_count: 32,
  },
  {
    adult: false,
    backdrop_path: "/cU7itLM8qmwMiaNnWsJPQLKe79j.jpg",
    genre_ids: [878, 27, 12, 28],
    id: 1013870,
    original_language: "en",
    original_title: "Kids vs. Aliens",
    overview:
      "All Gary wants is to make awesome home movies with his best buds. All his older sister Samantha wants is to hang with the cool kids. When their parents head out of town one Halloween weekend, an all-time rager of a teen house party turns to terror when aliens attack, forcing the siblings to band together to survive the night.",
    popularity: 1258.11,
    poster_path: "/wQ53sO5n9LCFbssV3oQ4CuajL1L.jpg",
    release_date: "2023-01-20",
    title: "Kids vs. Aliens",
    video: false,
    vote_average: 5.8,
    vote_count: 8,
  },
  {
    adult: false,
    backdrop_path: "/vLPSvAt1CnfmDCeqG3zkFh0s6S4.jpg",
    genre_ids: [10752, 28],
    id: 542196,
    original_language: "en",
    original_title: "Wolf Hound",
    overview:
      'Inspired by the real-life German special operations unit KG 200 that shot down, repaired, and flew Allied aircraft as Trojan horses, "Wolf Hound" takes place in 1944 German-occupied France and follows the daring exploits of Jewish-American fighter pilot Captain David Holden. Ambushed behind enemy lines, Holden must rescue a captured B-17 Flying Fortress crew, evade a ruthless enemy stalking him at every turn, and foil a plot that could completely alter the outcome of World War II.',
    popularity: 1072.36,
    poster_path: "/gHC0eFvXXNokP3sSNCTG2uks87R.jpg",
    release_date: "2022-06-03",
    title: "Wolf Hound",
    video: false,
    vote_average: 7.3,
    vote_count: 44,
  },
  {
    adult: false,
    backdrop_path: "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
    genre_ids: [14, 28, 878],
    id: 436270,
    original_language: "en",
    original_title: "Black Adam",
    overview:
      "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
    popularity: 982.919,
    poster_path: "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
    release_date: "2022-10-19",
    title: "Black Adam",
    video: false,
    vote_average: 7.2,
    vote_count: 4089,
  },
  {
    adult: false,
    backdrop_path: "/dKqa850uvbNSCaQCV4Im1XlzEtQ.jpg",
    genre_ids: [35, 80, 9648],
    id: 661374,
    original_language: "en",
    original_title: "Glass Onion: A Knives Out Mystery",
    overview:
      "World-famous detective Benoit Blanc heads to Greece to peel back the layers of a mystery surrounding a tech billionaire and his eclectic crew of friends.",
    popularity: 902.555,
    poster_path: "/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
    release_date: "2022-11-23",
    title: "Glass Onion: A Knives Out Mystery",
    video: false,
    vote_average: 7.1,
    vote_count: 3378,
  },
  {
    adult: false,
    backdrop_path: "/Aqldsq65Nj1KAkQD2MzkZsAk5N5.jpg",
    genre_ids: [28, 53, 18],
    id: 846433,
    original_language: "es",
    original_title: "The Enforcer",
    overview:
      "A noir thriller set in Miami, the film follows an enforcer who discovers his femme fatale boss has branched out into cyber sex trafficking, putting a young runaway he’s befriended at risk. He sacrifices everything to save the young girl from the deadly organization he’s spent his life building.",
    popularity: 885.393,
    poster_path: "/pXC8JJbfnRWtbD8i2yKFqqWEO4X.jpg",
    release_date: "2022-09-22",
    title: "The Enforcer",
    video: false,
    vote_average: 7.4,
    vote_count: 183,
  },
  {
    adult: false,
    backdrop_path: "/96SADhPnkXnVN3KaRKsDeBovLcm.jpg",
    genre_ids: [28, 14, 10770],
    id: 877703,
    original_language: "en",
    original_title: "Teen Wolf: The Movie",
    overview:
      "The wolves are howling once again, as a terrifying ancient evil emerges in Beacon Hills. Scott McCall, no longer a teenager yet still an Alpha, must gather new allies and reunite trusted friends to fight back against this powerful and deadly enemy.",
    popularity: 800.639,
    poster_path: "/wAkpPm3wcHRqZl8XjUI3Y2chYq2.jpg",
    release_date: "2023-01-18",
    title: "Teen Wolf: The Movie",
    video: false,
    vote_average: 8.2,
    vote_count: 377,
  },
  {
    adult: false,
    backdrop_path: "/8oj1pbizI6RS5xlyETmlWh9mVqN.jpg",
    genre_ids: [27],
    id: 955991,
    original_language: "en",
    original_title: "The Offering",
    overview:
      "In the wake of a young Jewish girl’s disappearance, the son of a Hasidic funeral director returns home with his pregnant wife in hopes of reconciling with his father. Little do they know that directly beneath them in the family morgue, an ancient evil with sinister plans for the unborn child lurks inside a mysterious corpse.",
    popularity: 759.555,
    poster_path: "/tbaTFgGIaTL1Uhd0SMob6Dhi5cK.jpg",
    release_date: "2023-01-11",
    title: "The Offering",
    video: false,
    vote_average: 5.7,
    vote_count: 48,
  },
  {
    adult: false,
    backdrop_path: "/sBOenwOZGRN5nZZGw4TxwtnfrEf.jpg",
    genre_ids: [28, 35, 80, 53],
    id: 899112,
    original_language: "en",
    original_title: "Violent Night",
    overview:
      "When a team of mercenaries breaks into a wealthy family compound on Christmas Eve, taking everyone inside hostage, the team isn’t prepared for a surprise combatant: Santa Claus is on the grounds, and he’s about to show why this Nick is no saint.",
    popularity: 795.033,
    poster_path: "/1XSYOP0JjjyMz1irihvWywro82r.jpg",
    release_date: "2022-11-30",
    title: "Violent Night",
    video: false,
    vote_average: 7.6,
    vote_count: 1144,
  },
  {
    adult: false,
    backdrop_path: "/53BC9F2tpZnsGno2cLhzvGprDYS.jpg",
    genre_ids: [14, 28, 12, 53],
    id: 736526,
    original_language: "no",
    original_title: "Troll",
    overview:
      "Deep inside the mountain of Dovre, something gigantic awakens after being trapped for a thousand years. Destroying everything in its path, the creature is fast approaching the capital of Norway. But how do you stop something you thought only existed in Norwegian folklore?",
    popularity: 691.476,
    poster_path: "/9z4jRr43JdtU66P0iy8h18OyLql.jpg",
    release_date: "2022-12-01",
    title: "Troll",
    video: false,
    vote_average: 6.8,
    vote_count: 1154,
  },
];

const getMovies = async (params) => {
  const { data, status } = await axiosApiInstance.get(`/movies`);

  return data.data;
};

export async function loader({ params }) {
  return getMovies(params.tmdbId);
}

export function Home() {
  const { getUser } = useAuth();

  const movies = useLoaderData();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div>
        {movies?.length === 0 ? (
          <div>no movies found</div>
        ) : (
          <div className="grid grid-cols-6 gap-x-7 gap-y-10">
            {movies?.map((movie) => (
              <Poster
                movieId={movie.id}
                posterPath={movie.poster}
                title={movie.title}
                key={movie.id}
                overview={movie.overview}
                adult={movie.adult}
                voteAverage={movie.vote_average}
                releaseDate={movie.release_date}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
