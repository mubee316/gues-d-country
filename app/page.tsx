"use client";
import React, { useState, useEffect } from "react";

const countries = [
  { name: "Brazil", clues: ["This country is in South America.", "It's known for the Amazon Rainforest.", "The capital is Brasília."] },
  { name: "Japan", clues: ["This country is in Asia.", "Famous for sushi and cherry blossoms.", "Its capital is Tokyo."] },
  { name: "Nigeria", clues: ["This country is in West Africa.", "It has the largest population in Africa.", "Its capital is Abuja."] },
  { name: "Canada", clues: ["This country is in North America.", "It's the second-largest country by land area.", "The capital is Ottawa."] },
  { name: "Australia", clues: ["This country is also a continent.", "It's known for kangaroos and the Great Barrier Reef.", "The capital is Canberra."] },
  { name: "Italy", clues: ["This country is in Europe.", "Famous for its art, architecture, and cuisine.", "The capital is Rome."] },
  { name: "Egypt", clues: ["This country is in North Africa.", "It is home to the ancient Pyramids of Giza.", "The capital is Cairo."] },
  { name: "India", clues: ["This country is in South Asia.", "It's known for the Taj Mahal.", "Its capital is New Delhi."] },
  { name: "Russia", clues: ["This country spans Europe and Asia.", "It is the largest country in the world.", "The capital is Moscow."] },
  { name: "United States", clues: ["This country is in North America.", "It has 50 states.", "The capital is Washington, D.C."] },
  { name: "China", clues: ["This country is in East Asia.", "It's the most populous country in the world.", "The capital is Beijing."] },
  { name: "France", clues: ["This country is in Western Europe.", "It's known for the Eiffel Tower.", "The capital is Paris."] },
  { name: "South Africa", clues: ["This country is in the southern part of Africa.", "It has three capital cities.", "One of the capitals is Pretoria."] },
  { name: "Argentina", clues: ["This country is in South America.", "It's known for tango music and dance.", "The capital is Buenos Aires."] },
  { name: "Germany", clues: ["This country is in Europe.", "It's known for its engineering and beer culture.", "The capital is Berlin."] },
  { name: "Mexico", clues: ["This country is in North America.", "Famous for its cuisine and ancient ruins.", "The capital is Mexico City."] },
  { name: "Spain", clues: ["This country is in Europe.", "Famous for flamenco music and bullfighting.", "The capital is Madrid."] },
  { name: "Kenya", clues: ["This country is in East Africa.", "Famous for its wildlife and safaris.", "The capital is Nairobi."] },
  { name: "Saudi Arabia", clues: ["This country is in the Middle East.", "It's known for Mecca, the holiest city in Islam.", "The capital is Riyadh."] },
  { name: "South Korea", clues: ["This country is in East Asia.", "It's known for K-pop and technology.", "The capital is Seoul."] },
  { name: "United Kingdom", clues: ["This country is in Europe.", "It includes England, Scotland, Wales, and Northern Ireland.", "The capital is London."] },
  { name: "Turkey", clues: ["This country bridges Europe and Asia.", "Famous for its rich history, especially in Istanbul.", "The capital is Ankara."] },
  { name: "Greece", clues: ["This country is in Southern Europe.", "Known for its ancient ruins and the Olympic Games.", "The capital is Athens."] },
  { name: "Thailand", clues: ["This country is in Southeast Asia.", "Famous for its beaches, temples, and cuisine.", "The capital is Bangkok."] },
];
type countries = { name: string; clues: string[] };

const getRandomCountries = (correctCountry, countries) => {
  const incorrectOptions = countries.filter(country => country.name !== correctCountry.name);
  const shuffledIncorrect = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
  return [correctCountry, ...shuffledIncorrect].sort(() => 0.5 - Math.random());
};

function GuessingGame() {
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [clueIndex, setClueIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  const selectNewCountry = () => {
    const selectedCountry = countries[Math.floor(Math.random() * countries.length)];
    setCurrentCountry(selectedCountry);
    setClueIndex(0);
    setOptions(getRandomCountries(selectedCountry, countries));
    setFeedback(""); 
  };

  useEffect(() => {
    selectNewCountry();
  }, []);

  const checkAnswer = (selected) => {
    if (selected === currentCountry.name) {
      setFeedback("Correct!");
      setTimeout(selectNewCountry, 1500);
    } else {
      setFeedback("Incorrect, try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Country Guessing Game</h2>
        {currentCountry && (
          <>
            <p className="text-lg text-gray-600 mb-4">Clue: {currentCountry.clues[clueIndex]}</p>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(option.name)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
                >
                  {option.name}
                </button>
              ))}
            </div>
            {feedback && (
              <p className={`text-lg ${feedback === "Correct!" ? "text-green-500" : "text-red-500"} font-semibold`}>
                {feedback}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default GuessingGame;
