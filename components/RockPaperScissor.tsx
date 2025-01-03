"use client";

import { client } from "@/app/client";
import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
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
        <h1 className="text-xl bold mb-10 text-center">Mini Game</h1>
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
      </div>
    </div>
  );
}
