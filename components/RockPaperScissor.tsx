"use client";

import { client } from "@/app/client";
import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";

type Choice = "Rock" | "Paper" | "Scissors";
type Result = "Win" | "Lose" | "Tie";

const choices: Choice[] = ["Rock", "Paper", "Scissors"];

const getComputerChoice = (): Choice =>
  choices[Math.floor(Math.random() * choices.length)];

const determineWinner = (
  playerChoice: Choice,
  computerChoice: Choice
): Result => {
  if (playerChoice === computerChoice) {
    return "Tie";
  }
  if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    return "Win";
  }
  return "Lose";
};

interface GameResult {
  playerChoice: Choice;
  computerChoice: Choice;
  gameResult: Result;
}

export default function RockPaperScissors() {
  const account = useActiveAccount();
  const [result, setResult] = useState<GameResult | null>(null);
  const [showPrize, setShowPrize] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [prizeClaimed, setPrizeClaimed] = useState<boolean>(false);

  const handleChoice = (playerChoice: Choice) => {
    const computerChoice = getComputerChoice();
    const gameResult = determineWinner(playerChoice, computerChoice);
    setResult({ playerChoice, computerChoice, gameResult });
    setShowPrize(gameResult === "Win");
  };

  const resetGame = () => {
    setResult(null);
    setShowPrize(false);
    setPrizeClaimed(false);
  };

  const clamPrize = () => {
    setShowModal(true);
  };

  return (
    <div className="flex items-center justify-center h-full w-full bg-[#f0f0f0] text-[#333]">
      <div className="p-10 m-10 w-[400px] max-w-[98%] h-[400px] bg-white rounded-lg shadow-black shadow-lg flex flex-col items-center justify-start relative">
        <h1 className="text-xl  font-bold mb-10 text-center">Mini Game</h1>
        {!account ? (
          <ConnectButton
            client={client}
            wallets={[
              inAppWallet({
                auth: {
                  options: ["email"],
                },
              }),
            ]}
          />
        ) : (
          <>
            <div>
              {!result ? (
                <div>
                  <h3 className="font-bold pt-4">Choose your option:</h3>
                  <div className="flex justify-center gap-5 m-10">
                    {choices.map((choice) => (
                      <button
                        key={choice}
                        onClick={() => handleChoice(choice)}
                        className="p-5 bg-[#007bff] text-white border-none rounded-md text-xl cursor-pointer "
                      >
                        {choice === "Rock"
                          ? "🪨"
                          : choice === "Paper"
                          ? "📄 "
                          : "✂ "}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center relative">
                  <p className="text-xl mb-5">
                    You chose: {result.playerChoice}
                  </p>
                  <p className="text-xl mb-5">
                    Computer Choice: {result.computerChoice}
                  </p>
                  <p className="text-xl mb-5 font-extrabold">
                    Result: {result.gameResult}
                  </p>
                  <div className="absolute bottom-4 flex flex-col gap-4 items-center">
                    <button
                      className="w-full p-3 bg-[#28a745] text-sm text-white border-none rounded-md cursor-pointer"
                      onClick={resetGame}
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
