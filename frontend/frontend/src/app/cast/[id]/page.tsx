import BigTextContent from "@/components/BigTextContent";
import EmblaCarousel from "@/components/EmblaCarousel";
import requests from "@/utils/requests";
import Image from "next/image";

const personimgpath = "https://image.tmdb.org/t/p/original";
async function getPersonDetails(params: any) {
    const url = requests.fetchPerson + params.id + "?api_key=e4d2477534d5a54cb6f0847a0ee853eb";
    const Personsresponse = await fetch(
        url,
        {
            cache: "no-store",
        }
    );
    console.log(url);
    if (!Personsresponse.ok) {
        return new Error("data not fetching!");
    }

    return Personsresponse.json();
}

async function getPersonImages(params: any) {
    const PersonsImgresponse = await fetch(
        `${requests.fetchPerson}${params.id}/images?api_key=e4d2477534d5a54cb6f0847a0ee853eb`,
        {
            cache: "no-store",
        }
    );

    if (!PersonsImgresponse.ok) {
        return new Error("data not fetching!");
    }

    return PersonsImgresponse.json();
}
async function getPersonsMovie(params: any) {
    const PersonsMovieresponse = await fetch(
        `${requests.fetchPerson}${params.id}/movie_credits?api_key=e4d2477534d5a54cb6f0847a0ee853eb`,
        {
            cache: "no-store",
        }
    );

    if (!PersonsMovieresponse.ok) {
        return new Error("data not fetching!");
    }

    return PersonsMovieresponse.json();
}

const Cast = async ({ params }: any) => {
    const persondetails = await getPersonDetails(params);
    const personimgCall = await getPersonImages(params);
    const personMovieCall = await getPersonsMovie(params);

    return (
        <div>
            <div className="flex md:flex-row flex-col w-100 md:h-full py-10 md:my-0 my-5 h-full">
                <div className="basis-1/3 h-full m-auto">
                    <div className="my-auto">
                        <Image
                            src={personimgpath + persondetails.profile_path}
                            alt={persondetails.name}
                            width={200}
                            height={200}
                            className="m-auto w-[300px]"
                            unoptimized
                        />
                        <h1 className="font-bold mt-3 text-xl text-center">
                            {persondetails.name}
                        </h1>
                        <p className="font-italic text-slate-300 text-center text-lg">
                            Known For:{" " + persondetails.known_for_department}
                        </p>
                    </div>
                </div>
                <div className="flex-1 h-full my-auto mr-32 md:p-10 px-2 flex items-center justify-center">
                    <div className="person_details_container md:p-0 p-3 text-lg">
                        <p>
                            {" "}
                            {persondetails.birthday != null ? (
                                <span className="font-bold">Date Of Birth: </span>
                            ) : (
                                ""
                            )}
                            {persondetails.birthday}
                        </p>
                        <p>
                            {" "}
                            {persondetails.place_of_birth != null ? (
                                <span className="font-bold">Place Of Birth: </span>
                            ) : (
                                ""
                            )}
                            {persondetails.place_of_birth}
                        </p>

                        <BigTextContent
                            textData={persondetails.biography}
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
                            {personMovieCall.cast && (<div className="heading">
                            </div>)}
                            {(<EmblaCarousel Categories={personMovieCall.cast} />)}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cast;
