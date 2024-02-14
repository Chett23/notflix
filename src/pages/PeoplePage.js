import React from "react";
import { apiOptions } from "../Constants/data";
import { getPersonDetails } from "../utils/loaderFunctions";
import { useLoaderData } from "react-router-dom";

export async function PeopleLoader({ params }) {
  const person = await getPersonDetails(apiOptions, params.person_id);

  return { person };
}

const PeoplePage = () => {
  const { person } = useLoaderData();
  return <div className="pt-24 text-font-50">{person.name}</div>;
};

export default PeoplePage;
