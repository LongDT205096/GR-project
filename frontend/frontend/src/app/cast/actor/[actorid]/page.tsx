import BigTextContent from "@/components/BigTextContent";
import EmblaCarousel from "@/components/EmblaCarousel";
import requests from "@/utils/requests";
import Image from "next/image";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
const personimgpath = "https://image.tmdb.org/t/p/original";

async function getPersonDetails(params: any) {
    const api = requests.fetchActorDetails + params.actorid + "/";
    const ActorApiresponse = await axios.get(api)
        .then((response) => {
            return response.data;
        })
    
    return ActorApiresponse;
}

async function getPersonImages(params: any) {
    const api = requests.fetchActorDetails + params.actorid + "/images/";
    const PersonsImgresponse = await axios.get(api)
        .then((response) => {
            return response.data;
        })

    return PersonsImgresponse;
}
async function getPersonsMovie(params: any) {
    const api = requests.fetchActorDetails + params.actorid + "/movies/";
    const PersonsMovieresponse = await axios.get(api)
        .then((response) => {
            return response.data;
        })

    return PersonsMovieresponse;
}

const Actor = async ({ params }: any) => {
    const personDetails = await getPersonDetails(params);
    const personimgCall = await getPersonImages(params);
    const personMovies = await getPersonsMovie(params);

    return (
        <div>
            <div className="flex md:flex-row flex-col w-100 md:h-full py-10 md:my-0 my-5 h-full">
                <div className="basis-1/3 h-full m-auto">
                    <div className="my-auto">
                        <Image
                            src={personimgpath + personimgCall[0].image}
                            alt={personDetails.name}
                            width={200}
                            height={200}
                            className="m-auto w-[300px] rounded-md"
                            unoptimized
                        />
                        <h1 className="font-bold mt-3 text-xl text-center">
                            {personDetails.name}
                        </h1>
                        <p className="font-italic text-slate-300 text-center text-lg">
                            Known For: Acting
                        </p>
                    </div>
                </div>
                <div className="flex-1 h-full my-auto mr-32 md:p-10 px-2 flex items-center justify-center">
                    <div className="person_details_container md:p-0 p-3 text-lg">
                        <p>
                            {" "}
                            {personDetails.birthday != null ? (
                                <span className="font-bold">Birthday: </span>
                            ) : (
                                ""
                            )}
                            {personDetails.birthday}
                        </p>
                        <p>
                            {" "}
                            {personDetails.deathday != null ? (
                                <span className="font-bold">Day of Death: </span>
                            ) : (
                                ""
                            )}
                            {personDetails.deathday}
                        </p>
                        <p>
                            {" "}
                            {personDetails.place_of_birth != null ? (
                                <span className="font-bold">Place Of Birth: </span>
                            ) : (
                                ""
                            )}
                            {personDetails.place_of_birth}
                        </p>

                        <BigTextContent
                            textData={personDetails.biography}
                        />
                    </div>
                </div>
            </div>

            <div className="w-100 my-3">
                <div className="md:w-[80%] w-[95%] mx-auto">
                    <div className="heading">
                        <h1 className="text-2xl my-3">Known for</h1>
                    </div>
                    <div className="latestReleases my-5 w-full ml-auto">
                        <div className="ml-0 latestinner h-full overflow-hidden">
                            {(<EmblaCarousel Categories={personMovies} />)}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Actor;
