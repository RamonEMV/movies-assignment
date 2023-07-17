import { getMovieWithDetails, getReleaseDates } from "@/services/MovieServices";
import TopBar from "@/components/TopBar";
import DetailsTopBar from "@/components/details/DetailsTopBar";
import { IMovieWithDetails } from "../../../interfaces/Interfaces";
import moment from "moment";
import { toHoursAndMinutes } from "@/utils/minutesToHours";

import ButtonsContainer from "@/components/details/ButtonsContainer";
import SocialMediaContainer from "@/components/details/SocialMediaContainer";
import BasicInfoCard from "@/components/details/BasicInfoCard";
import CastSlider from "@/components/details/CastSlider";

interface MovieDetailsPageProps {
  params: { id: number };
}

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const movieData: IMovieWithDetails = await getMovieWithDetails(params.id);

  const ratingData = await getReleaseDates(movieData.id);

  const rating = ratingData?.results.find(
    (rating) => rating.iso_3166_1 === "MX"
  )?.release_dates[0].certification;

  const durationInHours = toHoursAndMinutes(movieData.runtime);

  const sortedCrew = movieData.credits.crew
    .sort((personA, personB) => personB.popularity - personA.popularity)
    .slice(0, 9);

  return (
    <div className="w-screen flex flex-col items-center">
      <TopBar />
      <DetailsTopBar />
      <div
        className="w-full flex justify-center p-6"
        style={{
          backgroundImage: `linear-gradient( rgba(32,11,95, 0.85), rgba(32,11,95, 0.675)), url("${process.env.NEXT_PUBLIC_IMAGE_BASE_URL_BG}${movieData.backdrop_path}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex p-6 min-w-7xl items-start">
          <img
            className="rounded-xl object-contain"
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${movieData.poster_path}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`}
            alt={`${movieData.title} poster`}
          />
          <div className="flex flex-col px-6">
            <h1 className="text-white text-4xl font-extrabold">
              {`${movieData.title} `}
            </h1>

            <p className="text-gray-400 text-4xl font-semibold">
              {`(${new Date(movieData.release_date).getUTCFullYear()})`}
            </p>
            <div className="flex py-3 text-lg items-center">
              <p className="border rounded-md border-white w-6 h-6 flex justify-center items-center text-gray-400">
                {rating}
              </p>
              <p className="text-white px-3">
                {moment(movieData.release_date).format("MM/DD/YYYY")} (MX) •{" "}
                {movieData.genres.map((genre, i) => {
                  if (i === movieData.genres.length - 1) {
                    return genre.name;
                  } else {
                    return genre.name + ", ";
                  }
                })}{" "}
                • {durationInHours.hours} h {durationInHours.minutes} min
              </p>
            </div>

            <ButtonsContainer movieScore={movieData.vote_average} />
            <div className="text-gray-400 text-lg italic pt-16 pb-4">
              {movieData.tagline}
            </div>
            <p className="text-white font-semibold text-2xl">Overview</p>
            <p className="text-white font-normal">{movieData.overview}</p>
            <div className="w-full grid grid-cols-3 mt-8">
              {sortedCrew.map((crewMember) => (
                <div className="flex flex-col text-white space-y-1 my-3">
                  <p className="font-bold">{crewMember.name}</p>
                  <p className="">{crewMember.job}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-8 w-full">
        <div className="flex flex-col ">
          <CastSlider title="Top Billed Cast" cast={movieData.credits.cast} />
        </div>
        <div className="flex flex-col">
          <SocialMediaContainer />
          <BasicInfoCard movie={movieData} />
        </div>
      </div>
    </div>
  );
}
