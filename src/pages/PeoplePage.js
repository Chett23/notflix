import React from "react";

import { useLoaderData } from "react-router-dom";

import PersonHighlight from "../components/PersonHighlight";
import { apiOptions } from "../Constants/data";
import { getPersonDetails, getTrendingPeople } from "../utils/loaderFunctions";
import KnownFor from "../components/KnownFor";
import PeopleCarosel from "../components/PeopleCarosel";
import { ImageCarosel } from "../components/ImageCarosel";

export async function PeopleLoader({ params }) {
  const person = await getPersonDetails(apiOptions, params.person_id);
  const trending = await getTrendingPeople(apiOptions);

  return { person, trending };
}

const PeoplePage = () => {
  const { person, trending } = useLoaderData();
  console.log(person);

  return (
    <>
      <PersonHighlight person={person} />
      <KnownFor person={person} />
      {/* <ImageCarosel images={person.images.profiles} /> */}
      <PeopleCarosel people={trending} heading={'Trending'}  />
    </>
  );
};

export default PeoplePage;
