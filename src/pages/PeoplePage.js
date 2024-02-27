import React from "react";

import { useLoaderData } from "react-router-dom";

import PersonHighlight from "../components/PersonHighlight";
import { apiOptions } from "../Constants/data";
import { getPersonDetails } from "../utils/loaderFunctions";
import KnownFor from "../components/KnownFor";

export async function PeopleLoader({ params }) {
  const person = await getPersonDetails(apiOptions, params.person_id);

  return { person };
}

const PeoplePage = () => {
  const { person } = useLoaderData();
  console.log(person);

  return (
    <>
      <PersonHighlight person={person} />
      <KnownFor person={person} />
    </>
  );
};

export default PeoplePage;
