import { useState } from "react";

import css from "./App.module.css";
import type { Votes } from "../../types/votes";

import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  const updateVotes = (key: keyof Votes) => {
    setVotes({
      ...votes,
      [key]: votes[key] + 1,
    });
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  // const [canReset, setCanReset] = useState(false);

  const handleVote = (voteType: keyof Votes) => {
    updateVotes(voteType);
    // setCanReset(true);
  };

  const handleResetVotes = () => {
    resetVotes();
    // setCanReset(false);
  };

  return (
    <>
      <div className={css.app}>
        <CafeInfo />

        <VoteOptions
          voteClick={{
            onVote: handleVote,
            onReset: handleResetVotes,
            canReset: totalVotes > 0,

            // Reset button visibility using useState
            // canReset:canReset
          }}
        />

        {/*умовний рендеринг компонентів залежно від значення totalVotes*/}

        {totalVotes > 0 ? (
          <VoteStats
            votes={votes}
            totalVotes={totalVotes}
            positiveRate={positiveRate}
          />
        ) : (
          <Notification />
        )}
      </div>
    </>
  );
}
